-- Create resume uploads table for tracking uploaded resume files
CREATE TABLE IF NOT EXISTS public.resume_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  extracted_content JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.resume_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resume_uploads
CREATE POLICY "Users can view their own uploads"
  ON public.resume_uploads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own uploads"
  ON public.resume_uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploads"
  ON public.resume_uploads FOR DELETE
  USING (auth.uid() = user_id);

-- Create job applications table (more formal than cover letters)
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_description TEXT NOT NULL,
  content TEXT NOT NULL,
  salary_expectation TEXT,
  availability_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_applications
CREATE POLICY "Users can view their own applications"
  ON public.job_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON public.job_applications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
  ON public.job_applications FOR DELETE
  USING (auth.uid() = user_id);

-- Create LinkedIn optimizations table
CREATE TABLE IF NOT EXISTS public.linkedin_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  headline TEXT,
  about_section TEXT,
  optimized_experience JSONB,
  suggested_skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.linkedin_optimizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for linkedin_optimizations
CREATE POLICY "Users can view their own LinkedIn optimizations"
  ON public.linkedin_optimizations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own LinkedIn optimizations"
  ON public.linkedin_optimizations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own LinkedIn optimizations"
  ON public.linkedin_optimizations FOR DELETE
  USING (auth.uid() = user_id);

-- Create resume optimization history table
CREATE TABLE IF NOT EXISTS public.resume_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  optimized_resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  optimization_type TEXT,
  score_before INTEGER,
  score_after INTEGER,
  improvements_applied JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.resume_optimizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resume_optimizations
CREATE POLICY "Users can view their own resume optimizations"
  ON public.resume_optimizations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resume optimizations"
  ON public.resume_optimizations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for resume uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume-uploads', 'resume-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resume uploads
CREATE POLICY "Users can upload their own resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resume-uploads' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own resume uploads"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resume-uploads' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own resume uploads"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resume-uploads' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Add trigger for job_applications updated_at
CREATE OR REPLACE FUNCTION public.handle_job_application_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_job_application_updated_at();