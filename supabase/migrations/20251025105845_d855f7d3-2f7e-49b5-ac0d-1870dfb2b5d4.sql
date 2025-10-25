-- Create email_logs table to track all sent emails
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  letter_id UUID,
  letter_type TEXT CHECK (letter_type IN ('cover_letter', 'application_letter')),
  resume_id UUID,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  error_message TEXT,
  attachments_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_logs
CREATE POLICY "Users can view their own email logs"
  ON public.email_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own email logs"
  ON public.email_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_email_logs_user_id ON public.email_logs(user_id);
CREATE INDEX idx_email_logs_sent_at ON public.email_logs(sent_at DESC);

-- Add letter_type to cover_letters and job_applications for unified management
ALTER TABLE public.cover_letters 
ADD COLUMN IF NOT EXISTS letter_type TEXT DEFAULT 'cover_letter',
ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS letter_type TEXT DEFAULT 'application_letter',
ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMP WITH TIME ZONE;

-- Create view for unified letters management
CREATE OR REPLACE VIEW public.user_letters AS
SELECT 
  id,
  user_id,
  job_title as title,
  company_name,
  content,
  'cover_letter' as letter_type,
  created_at,
  updated_at,
  last_notified_at
FROM public.cover_letters
UNION ALL
SELECT 
  id,
  user_id,
  job_title as title,
  company_name,
  content,
  'application_letter' as letter_type,
  created_at,
  updated_at,
  last_notified_at
FROM public.job_applications;

-- Function to get old letters (>30 days) that need cleanup notification
CREATE OR REPLACE FUNCTION public.get_old_letters_needing_notification()
RETURNS TABLE (
  user_id UUID,
  user_email TEXT,
  old_letters_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH old_letters AS (
    SELECT 
      cl.user_id,
      COUNT(*) as count
    FROM cover_letters cl
    WHERE cl.created_at < NOW() - INTERVAL '30 days'
      AND (cl.last_notified_at IS NULL OR cl.last_notified_at < NOW() - INTERVAL '7 days')
    GROUP BY cl.user_id
    
    UNION ALL
    
    SELECT 
      ja.user_id,
      COUNT(*) as count
    FROM job_applications ja
    WHERE ja.created_at < NOW() - INTERVAL '30 days'
      AND (ja.last_notified_at IS NULL OR ja.last_notified_at < NOW() - INTERVAL '7 days')
    GROUP BY ja.user_id
  )
  SELECT 
    ol.user_id,
    COALESCE(au.email, 'unknown') as user_email,
    SUM(ol.count) as old_letters_count
  FROM old_letters ol
  LEFT JOIN auth.users au ON au.id = ol.user_id
  GROUP BY ol.user_id, au.email
  HAVING SUM(ol.count) > 0;
END;
$$;

-- Function to mark letters as notified
CREATE OR REPLACE FUNCTION public.mark_letters_notified(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE cover_letters
  SET last_notified_at = NOW()
  WHERE user_id = p_user_id 
    AND created_at < NOW() - INTERVAL '30 days';
  
  UPDATE job_applications
  SET last_notified_at = NOW()
  WHERE user_id = p_user_id 
    AND created_at < NOW() - INTERVAL '30 days';
END;
$$;