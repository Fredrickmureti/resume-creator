-- Add custom_sections column to resumes table
ALTER TABLE public.resumes 
ADD COLUMN IF NOT EXISTS custom_sections jsonb DEFAULT '[]'::jsonb;