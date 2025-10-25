/*
  # Create resumes table

  1. New Tables
    - `resumes`
      - `id` (uuid, primary key) - Unique identifier for each resume
      - `user_id` (uuid) - Reference to the user who owns this resume (for future auth)
      - `template_id` (text) - Template design identifier (modern, professional, minimalist, creative)
      - `title` (text) - Resume title/name for organization
      - `personal_info` (jsonb) - Personal information (name, email, phone, location, summary)
      - `experience` (jsonb) - Array of work experience entries
      - `education` (jsonb) - Array of education entries
      - `skills` (jsonb) - Array of skills with categories
      - `projects` (jsonb) - Array of project entries
      - `certifications` (jsonb) - Array of certifications
      - `languages` (jsonb) - Array of language proficiencies
      - `custom_sections` (jsonb) - Array of custom user-defined sections
      - `created_at` (timestamptz) - Timestamp when resume was created
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `resumes` table
    - Add policy for public access (allowing anyone to create/read/update for now)
    - Note: In production, this should be locked down to authenticated users only
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  template_id text NOT NULL DEFAULT 'modern',
  title text NOT NULL DEFAULT 'My Resume',
  personal_info jsonb DEFAULT '{
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "summary": "",
    "linkedin": "",
    "website": ""
  }'::jsonb,
  experience jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  projects jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  languages jsonb DEFAULT '[]'::jsonb,
  custom_sections jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create resumes"
  ON resumes FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view resumes"
  ON resumes FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update resumes"
  ON resumes FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete resumes"
  ON resumes FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resumes_template_id ON resumes(template_id);
