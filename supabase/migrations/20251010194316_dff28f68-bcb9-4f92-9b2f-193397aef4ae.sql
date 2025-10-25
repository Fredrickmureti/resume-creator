-- Create enum for revamp status
CREATE TYPE public.revamp_status AS ENUM ('processing', 'completed', 'failed');

-- Create cv_revamps table
CREATE TABLE public.cv_revamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  original_resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  revamped_resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  
  -- Input data
  uploaded_file_name TEXT,
  uploaded_file_path TEXT,
  job_description TEXT,
  target_role_description JSONB,
  optimization_goals TEXT[],
  tone_preference TEXT,
  
  -- Processing results
  extracted_content JSONB,
  revamped_content JSONB,
  changes_tracked JSONB,
  
  -- Metrics
  original_ats_score INTEGER,
  revamped_ats_score INTEGER,
  original_impact_score INTEGER,
  revamped_impact_score INTEGER,
  keyword_match_percentage INTEGER,
  
  -- Metadata
  processing_time_seconds INTEGER,
  ai_model_used TEXT,
  status revamp_status DEFAULT 'processing',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cv_revamps ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own revamps"
  ON public.cv_revamps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own revamps"
  ON public.cv_revamps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own revamps"
  ON public.cv_revamps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own revamps"
  ON public.cv_revamps FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_cv_revamps_updated_at
  BEFORE UPDATE ON public.cv_revamps
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();