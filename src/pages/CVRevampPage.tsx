import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { ArrowLeft, Upload, FileText, Sparkles, CheckCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { supabase } from '../integrations/supabase/client';
import { Resume, TemplateId } from '../types/resume';

interface CVRevampPageProps {
  user: User;
}

type Step = 'upload' | 'extract' | 'configure' | 'template' | 'processing' | 'review' | 'select-source';

export default function CVRevampPage({ user }: CVRevampPageProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('select-source');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [existingResumes, setExistingResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState({ title: '', industry: '', level: 'mid' });
  const [optimizationGoals, setOptimizationGoals] = useState<string[]>(['ats', 'impact', 'keywords']);
  const [tonePreference, setTonePreference] = useState('professional');
  const [revampedData, setRevampedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scores, setScores] = useState<any>(null);
  const [retryAfter, setRetryAfter] = useState<number>(0);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  useEffect(() => {
    fetchExistingResumes();
  }, []);

  const fetchExistingResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setExistingResumes((data || []) as unknown as Resume[]);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleSelectExistingResume = async () => {
    if (!selectedResumeId) return;
    
    const resume = existingResumes.find(r => r.id === selectedResumeId);
    if (!resume) return;

    // Convert resume to extractedData format
    setExtractedData({
      personal_info: resume.personal_info,
      experience: resume.experience,
      education: resume.education,
      skills: resume.skills,
      projects: resume.projects,
      certifications: resume.certifications,
      languages: resume.languages
    });
    setCurrentStep('configure');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);
    setError('');
    
    // Auto-extract
    await extractContent(file);
  };

  const extractContent = async (file: File, isRetry = false) => {
    // Rate limit check: 10 second cooldown
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (!isRetry && timeSinceLastRequest < 10000) {
      const waitTime = Math.ceil((10000 - timeSinceLastRequest) / 1000);
      setError(`Please wait ${waitTime} seconds before trying again.`);
      return;
    }
    
    setLoading(true);
    setError('');
    setRetryAfter(0);
    
    try {
      const fileContent = await file.text();
      setLastRequestTime(Date.now());
      
      const { data, error: extractError } = await supabase.functions.invoke('parse-resume-upload', {
        body: { fileContent, fileName: file.name }
      });

      if (extractError) {
        if (extractError.message?.includes('429') || data?.retryAfter) {
          setRetryAfter(data?.retryAfter || 10);
          throw new Error(data?.error || 'Rate limit exceeded. Please wait and try again.');
        }
        if (extractError.message?.includes('402') || data?.needsCredits) {
          throw new Error(data?.error || 'AI credits exhausted. Please contact support.');
        }
        throw extractError;
      }
      
      if (data.success) {
        setExtractedData(data.resumeData);
        setCurrentStep('configure');
      } else {
        throw new Error('Failed to extract content');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to extract CV content');
      console.error('Extract error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRevamp = async (isRetry = false) => {
    // Rate limit check: 10 second cooldown
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (!isRetry && timeSinceLastRequest < 10000) {
      const waitTime = Math.ceil((10000 - timeSinceLastRequest) / 1000);
      setError(`Please wait ${waitTime} seconds before trying again.`);
      return;
    }
    
    setLoading(true);
    setError('');
    setRetryAfter(0);
    setCurrentStep('processing');
    
    try {
      setLastRequestTime(Date.now());
      
      // Parse job description if provided
      let jobData = null;
      if (jobDescription.trim()) {
        const { data: jdData, error: jdError } = await supabase.functions.invoke('parse-job-description', {
          body: { jobDescription }
        });
        
        if (jdError) throw jdError;
        jobData = jdData.jobData;
      }

      // Revamp CV content
      const { data: revampData, error: revampError } = await supabase.functions.invoke('revamp-cv-content', {
        body: {
          resumeData: extractedData,
          jobData,
          targetRole: !jobDescription ? targetRole : null,
          optimizationGoals,
          tonePreference,
          qualityMode: 'fast'
        }
      });

      if (revampError) {
        if (revampError.message?.includes('429') || revampData?.retryAfter) {
          setRetryAfter(revampData?.retryAfter || 10);
          throw new Error(revampData?.error || 'Rate limit exceeded. Please wait and try again.');
        }
        if (revampError.message?.includes('402') || revampData?.needsCredits) {
          throw new Error(revampData?.error || 'AI credits exhausted. Please contact support.');
        }
        throw revampError;
      }
      
      setRevampedData(revampData.revampedData);

      // Calculate scores
      const { data: scoresData, error: scoresError } = await supabase.functions.invoke('calculate-cv-scores', {
        body: {
          resumeData: revampData.revampedData,
          jobData
        }
      });

      if (!scoresError && scoresData.success) {
        setScores(scoresData.scores);
      }

      setCurrentStep('review');
    } catch (err: any) {
      setError(err.message || 'Failed to revamp CV');
      console.error('Revamp error:', err);
      setCurrentStep('configure');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRevampedCV = async () => {
    setLoading(true);
    try {
      const resume: Resume = {
        id: crypto.randomUUID(),
        user_id: user.id,
        template_id: 'modern' as TemplateId,
        title: `Revamped CV - ${new Date().toLocaleDateString()}`,
        personal_info: revampedData.personal_info,
        experience: revampedData.experience || [],
        education: revampedData.education || [],
        skills: revampedData.skills || [],
        projects: revampedData.projects || [],
        certifications: revampedData.certifications || [],
        languages: revampedData.languages || [],
        custom_sections: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error: saveError } = await supabase
        .from('resumes')
        .insert([resume as any]);

      if (saveError) throw saveError;

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save CV');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setOptimizationGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navigation user={user} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-slate-900">Revamp Your CV</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {['select', 'configure', 'processing', 'review'].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  (currentStep === 'select-source' && step === 'select') || (currentStep === 'upload' && step === 'select') ? 'bg-orange-600 text-white' :
                  currentStep === step || (currentStep === 'upload' && step === 'select') ? 'bg-orange-600 text-white' :
                  ['select-source', 'upload', 'configure'].indexOf(currentStep) > ['select', 'configure'].indexOf(step) ? 'bg-green-600 text-white' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  {idx + 1}
                </div>
                {idx < 3 && <div className="w-16 h-1 bg-slate-200 mx-2" />}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 mb-2">{error}</p>
              {retryAfter > 0 && uploadedFile && (
                <button
                  onClick={() => extractContent(uploadedFile, true)}
                  disabled={loading}
                  className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  Retry in {retryAfter}s
                </button>
              )}
            </div>
          )}

          {/* Step: Select Source */}
          {currentStep === 'select-source' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Choose Your CV Source</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Use Existing Resume */}
                <div className="border-2 border-slate-300 rounded-xl p-6 hover:border-orange-500 transition-colors">
                  <FileText className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Use Existing Resume</h3>
                  <p className="text-slate-600 mb-4">Select from your saved resumes</p>
                  
                  {existingResumes.length > 0 ? (
                    <>
                      <select
                        value={selectedResumeId || ''}
                        onChange={(e) => setSelectedResumeId(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4"
                      >
                        <option value="">Select a resume...</option>
                        {existingResumes.map((resume) => (
                          <option key={resume.id} value={resume.id}>
                            {resume.title} - {new Date(resume.updated_at).toLocaleDateString()}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleSelectExistingResume}
                        disabled={!selectedResumeId}
                        className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Use This Resume
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-slate-500">No saved resumes found</p>
                  )}
                </div>

                {/* Option 2: Upload File */}
                <div className="border-2 border-slate-300 rounded-xl p-6 hover:border-orange-500 transition-colors">
                  <Upload className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload CV File</h3>
                  <p className="text-slate-600 mb-4">Upload a PDF, DOCX, or TXT file</p>
                  <button
                    onClick={() => setCurrentStep('upload')}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Upload File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Upload */}
          {currentStep === 'upload' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Upload Your CV</h2>
              
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-orange-500 transition-colors">
                <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 mb-4">Drag and drop or click to upload</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="cv-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="cv-upload"
                  className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 cursor-pointer transition-colors"
                >
                  {loading ? 'Extracting...' : 'Choose File'}
                </label>
                <p className="text-sm text-slate-500 mt-4">PDF, DOCX, TXT (max 5MB)</p>
              </div>

              {uploadedFile && (
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                  <span className="font-medium">{uploadedFile.name}</span>
                  <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                </div>
              )}
            </div>
          )}

          {/* Step: Configure */}
          {currentStep === 'configure' && extractedData && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Customize Revamp</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to tailor your CV..."
                  className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {!jobDescription && (
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-900">Or Describe Target Role</h3>
                  <input
                    type="text"
                    value={targetRole.title}
                    onChange={(e) => setTargetRole({ ...targetRole, title: e.target.value })}
                    placeholder="Job Title (e.g., Senior Software Engineer)"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={targetRole.industry}
                    onChange={(e) => setTargetRole({ ...targetRole, industry: e.target.value })}
                    placeholder="Industry (e.g., Technology)"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                </div>
              )}

              <div>
                <h3 className="font-medium text-slate-900 mb-3">Optimization Goals</h3>
                <div className="space-y-2">
                  {[
                    { id: 'ats', label: 'ATS Optimization' },
                    { id: 'impact', label: 'Impact Enhancement' },
                    { id: 'keywords', label: 'Keyword Matching' },
                    { id: 'restructure', label: 'Content Restructuring' },
                    { id: 'quantify', label: 'Add Metrics & Numbers' }
                  ].map(goal => (
                    <label key={goal.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={optimizationGoals.includes(goal.id)}
                        onChange={() => toggleGoal(goal.id)}
                        className="w-5 h-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-slate-700">{goal.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-900 mb-3">Tone</h3>
                <select
                  value={tonePreference}
                  onChange={(e) => setTonePreference(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                >
                  <option value="professional">Professional</option>
                  <option value="technical">Technical</option>
                  <option value="creative">Creative</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <button
                onClick={() => handleRevamp(false)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg disabled:opacity-50"
              >
                <Sparkles className="h-5 w-5" />
                {loading ? 'Processing...' : 'Revamp My CV'}
              </button>
            </div>
          )}

          {/* Step: Processing */}
          {currentStep === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">AI is revamping your CV...</h2>
              <p className="text-slate-600">This may take 15-30 seconds</p>
            </div>
          )}

          {/* Step: Review */}
          {currentStep === 'review' && revampedData && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">✨ Your CV Has Been Revamped!</h2>
              
              {scores && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <p className="text-sm text-green-700 mb-2 font-medium">ATS Score</p>
                    <p className="text-4xl font-bold text-green-900">{scores.ats_score}<span className="text-2xl text-green-700">/100</span></p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <p className="text-sm text-blue-700 mb-2 font-medium">Impact Score</p>
                    <p className="text-4xl font-bold text-blue-900">{scores.impact_score}<span className="text-2xl text-blue-700">/100</span></p>
                  </div>
                </div>
              )}

              {/* Comprehensive Revamp Report */}
              {revampedData.changes_summary?.revamp_report && (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-orange-600" />
                    Comprehensive Revamp Report
                  </h3>
                  
                  {/* Sections Updated */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">📋 Sections Updated:</h4>
                    <div className="flex flex-wrap gap-2">
                      {revampedData.changes_summary.sections_updated?.map((section: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-orange-700 border border-orange-300">
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Improvements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {revampedData.changes_summary.revamp_report.summary_enhancements && (
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-slate-800 mb-2">💼 Summary</h5>
                        <p className="text-sm text-slate-600">{revampedData.changes_summary.revamp_report.summary_enhancements}</p>
                      </div>
                    )}
                    
                    {revampedData.changes_summary.revamp_report.experience_enhancements && (
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-slate-800 mb-2">🎯 Experience</h5>
                        <p className="text-sm text-slate-600">{revampedData.changes_summary.revamp_report.experience_enhancements}</p>
                      </div>
                    )}
                    
                    {revampedData.changes_summary.revamp_report.skills_enhancements && (
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-slate-800 mb-2">⚡ Skills</h5>
                        <p className="text-sm text-slate-600">{revampedData.changes_summary.revamp_report.skills_enhancements}</p>
                      </div>
                    )}
                    
                    {revampedData.changes_summary.revamp_report.projects_enhancements && (
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-slate-800 mb-2">🚀 Projects</h5>
                        <p className="text-sm text-slate-600">{revampedData.changes_summary.revamp_report.projects_enhancements}</p>
                      </div>
                    )}
                  </div>

                  {/* Metrics and Keywords */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {revampedData.changes_summary.revamp_report.metrics_added && (
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-slate-800 mb-2">📊 Metrics Added</h5>
                        <p className="text-2xl font-bold text-orange-600">{revampedData.changes_summary.revamp_report.metrics_added}</p>
                      </div>
                    )}
                    
                    {revampedData.changes_summary.revamp_report.ats_score_improvement && (
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-slate-800 mb-2">📈 Expected ATS Improvement</h5>
                        <p className="text-2xl font-bold text-green-600">{revampedData.changes_summary.revamp_report.ats_score_improvement}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Verbs Used */}
                  {revampedData.changes_summary.revamp_report.action_verbs_used && revampedData.changes_summary.revamp_report.action_verbs_used.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">💪 Strong Action Verbs Added:</h5>
                      <div className="flex flex-wrap gap-2">
                        {revampedData.changes_summary.revamp_report.action_verbs_used.slice(0, 10).map((verb: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">
                            {verb}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weak Phrases Removed */}
                  {revampedData.changes_summary.revamp_report.weak_phrases_removed && revampedData.changes_summary.revamp_report.weak_phrases_removed.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">🗑️ Weak Phrases Eliminated:</h5>
                      <div className="flex flex-wrap gap-2">
                        {revampedData.changes_summary.revamp_report.weak_phrases_removed.map((phrase: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm line-through">
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* New Enhanced Summary Preview */}
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Your New Professional Summary
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-slate-700 leading-relaxed">{revampedData.personal_info?.summary}</p>
                </div>
              </div>

              {/* Key Improvements (Legacy support) */}
              {revampedData.changes_summary && !revampedData.changes_summary.revamp_report && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Key Improvements</h3>
                  <ul className="space-y-2">
                    {revampedData.changes_summary.key_improvements?.map((improvement: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ATS Keywords */}
              {revampedData.changes_summary?.ats_keywords_added && revampedData.changes_summary.ats_keywords_added.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">🔑 ATS Keywords Added:</h3>
                  <div className="flex flex-wrap gap-2">
                    {revampedData.changes_summary.ats_keywords_added.map((keyword: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveRevampedCV}
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Saving...' : '✓ Save Revamped CV'}
                </button>
                <button
                  onClick={() => setCurrentStep('configure')}
                  className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  ↻ Revamp Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
