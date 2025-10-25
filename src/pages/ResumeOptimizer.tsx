import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Resume } from '../types/resume';
import { ArrowLeft, Sparkles, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Navigation from '../components/Navigation';

interface ResumeOptimizerProps {
  user: any;
  onBack: () => void;
}

export default function ResumeOptimizer({ user, onBack }: ResumeOptimizerProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [optimizationGoals, setOptimizationGoals] = useState<string[]>(['ats', 'content']);
  const [optimization, setOptimization] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setResumes(data as unknown as Resume[]);
    }
  };

  const optimizeResume = async () => {
    if (!selectedResumeId) {
      toast({
        title: 'Missing information',
        description: 'Please select a resume',
        variant: 'destructive',
      });
      return;
    }

    setIsOptimizing(true);

    try {
      const resume = resumes.find(r => r.id === selectedResumeId);
      
      const { data, error } = await supabase.functions.invoke('optimize-resume', {
        body: {
          resume,
          jobDescription: jobDescription || null,
          optimizationGoals,
        },
      });

      if (error) throw error;

      if (data.success) {
        setOptimization(data.optimization);
        toast({
          title: 'Resume analyzed',
          description: `Score: ${data.optimization.score}/100`,
        });
      }
    } catch (error) {
      console.error('Error optimizing resume:', error);
      toast({
        title: 'Optimization failed',
        description: 'Failed to optimize resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setOptimizationGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Resume Optimizer</h1>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Select Resume <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  >
                    <option value="">Choose a resume to optimize</option>
                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Target Job Description (Optional)
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description to optimize for specific role..."
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Optimization Goals
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'ats', label: 'ATS Optimization', desc: 'Optimize for applicant tracking systems' },
                      { id: 'content', label: 'Content Enhancement', desc: 'Improve descriptions and achievements' },
                      { id: 'keywords', label: 'Keyword Matching', desc: 'Match keywords from job description' },
                      { id: 'length', label: 'Length Optimization', desc: 'Optimize content length' },
                    ].map(goal => (
                      <label key={goal.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={optimizationGoals.includes(goal.id)}
                          onChange={() => toggleGoal(goal.id)}
                          className="mt-1 w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{goal.label}</div>
                          <div className="text-sm text-slate-500">{goal.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={optimizeResume}
                  disabled={isOptimizing || !selectedResumeId}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Optimize Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Optimization Results</h2>

              {optimization ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-5xl font-bold text-slate-900 mb-2">
                      {optimization.score}/100
                    </div>
                    <div className="text-sm font-medium text-slate-600">Resume Score</div>
                  </div>

                  {optimization.general_feedback && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Overall Assessment</h3>
                      <p className="text-sm text-blue-800">{optimization.general_feedback}</p>
                    </div>
                  )}

                  {optimization.keywords_missing?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {optimization.keywords_missing.map((keyword: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {optimization.ats_issues?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">ATS Issues</h3>
                      <div className="space-y-2">
                        {optimization.ats_issues.map((issue: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{issue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {optimization.improvements?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Suggested Improvements</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {optimization.improvements.map((improvement: any, idx: number) => (
                          <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-green-900 capitalize">
                                {improvement.section}
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-semibold text-red-700">Current:</span>
                                <p className="text-slate-700 mt-1">{improvement.current}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-green-700">Suggested:</span>
                                <p className="text-slate-700 mt-1">{improvement.suggested}</p>
                              </div>
                              <div className="text-xs text-slate-600 italic">
                                {improvement.reason}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-slate-400">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Optimization results will appear here</p>
                    <p className="text-sm mt-2">Select a resume and click "Optimize Resume"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
