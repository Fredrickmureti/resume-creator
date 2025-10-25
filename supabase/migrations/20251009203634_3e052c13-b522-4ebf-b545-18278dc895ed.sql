-- Add document_type and photo_url to resumes table
ALTER TABLE public.resumes
ADD COLUMN IF NOT EXISTS document_type TEXT DEFAULT 'resume',
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Create cover_letters table
CREATE TABLE IF NOT EXISTS public.cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_description TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on cover_letters
ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;

-- RLS policies for cover_letters
CREATE POLICY "Users can view their own cover letters"
ON public.cover_letters FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cover letters"
ON public.cover_letters FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cover letters"
ON public.cover_letters FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cover letters"
ON public.cover_letters FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_cover_letters_updated_at
BEFORE UPDATE ON public.cover_letters
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create profile-photos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile photos
CREATE POLICY "Users can upload their own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public photo access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');