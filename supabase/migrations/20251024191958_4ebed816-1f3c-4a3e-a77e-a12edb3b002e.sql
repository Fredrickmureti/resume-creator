-- Add selected_resume_id to profiles table
ALTER TABLE profiles ADD COLUMN selected_resume_id uuid REFERENCES resumes(id) ON DELETE SET NULL;