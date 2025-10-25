import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Resume } from '../types/resume';
import { ArrowLeft, Sparkles, Copy, RefreshCw, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Navigation from '../components/Navigation';

interface LinkedInOptimizerProps {
  user: any;
  onBack: () => void;
}

export default function LinkedInOptimizer({ user, onBack }: LinkedInOptimizerProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>(['headline', 'about']);
  const [linkedinContent, setLinkedinContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const generateLinkedInContent = async () => {
    if (!selectedResumeId) {
      toast({
        title: 'Missing information',
        description: 'Please select a resume',
        variant: 'destructive',
      });
      return;
    }

    if (selectedSections.length === 0) {
      toast({
        title: 'Missing information',
        description: 'Please select at least one section to optimize',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const resume = resumes.find(r => r.id === selectedResumeId);
      
      const { data, error } = await supabase.functions.invoke('optimize-linkedin', {
        body: {
          resume,
          sections: selectedSections,
        },
      });

      if (error) throw error;

      if (data.success) {
        setLinkedinContent(data.linkedinContent);
        toast({
          title: 'LinkedIn content generated',
          description: 'Your optimized LinkedIn content is ready',
        });
      }
    } catch (error) {
      console.error('Error generating LinkedIn content:', error);
      toast({
        title: 'Generation failed',
        description: 'Failed to generate LinkedIn content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSection = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const copySection = (content: string, sectionName: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied to clipboard',
      description: `${sectionName} has been copied`,
    });
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
              <h1 className="text-3xl font-bold text-slate-900 mb-6">LinkedIn Profile Optimizer</h1>

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
                    <option value="">Choose a resume as source</option>
                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Sections to Optimize
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'headline', label: 'Headline', desc: 'Professional headline (120 chars)' },
                      { id: 'about', label: 'About Section', desc: 'Compelling summary (2000 chars)' },
                      { id: 'experience', label: 'Experience Descriptions', desc: 'LinkedIn-optimized work history' },
                      { id: 'skills', label: 'Skills Recommendations', desc: 'Top skills to highlight' },
                      { id: 'featured', label: 'Featured Content', desc: 'Portfolio and project descriptions' },
                    ].map(section => (
                      <label key={section.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSections.includes(section.id)}
                          onChange={() => toggleSection(section.id)}
                          className="mt-1 w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{section.label}</div>
                          <div className="text-sm text-slate-500">{section.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateLinkedInContent}
                  disabled={isGenerating || !selectedResumeId}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate LinkedIn Content
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Optimized Content</h2>

              {linkedinContent ? (
                <div className="space-y-6">
                  {linkedinContent.headline && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-blue-900">Headline</h3>
                        <button
                          onClick={() => copySection(linkedinContent.headline, 'Headline')}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-blue-800">{linkedinContent.headline}</p>
                      <p className="text-xs text-blue-600 mt-2">
                        {linkedinContent.headline.length}/120 characters
                      </p>
                    </div>
                  )}

                  {linkedinContent.about && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-green-900">About Section</h3>
                        <button
                          onClick={() => copySection(linkedinContent.about, 'About section')}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-green-800 whitespace-pre-wrap">{linkedinContent.about}</p>
                      <p className="text-xs text-green-600 mt-2">
                        {linkedinContent.about.length}/2000 characters
                      </p>
                    </div>
                  )}

                  {linkedinContent.experience_suggestions?.length > 0 && (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-3">Experience Descriptions</h3>
                      <div className="space-y-3">
                        {linkedinContent.experience_suggestions.map((exp: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded border border-purple-200">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium text-purple-900">{exp.position}</p>
                                <p className="text-sm text-purple-700">{exp.company}</p>
                              </div>
                              <button
                                onClick={() => copySection(exp.description, `${exp.position} description`)}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-sm text-purple-800">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {linkedinContent.skills_recommendations?.length > 0 && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h3 className="font-semibold text-orange-900 mb-3">Recommended Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {linkedinContent.skills_recommendations.map((skill: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {linkedinContent.featured_content?.length > 0 && (
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <h3 className="font-semibold text-indigo-900 mb-3">Featured Content</h3>
                      <div className="space-y-3">
                        {linkedinContent.featured_content.map((item: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded border border-indigo-200">
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-indigo-900">{item.title}</p>
                              <button
                                onClick={() => copySection(item.description, item.title)}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-sm text-indigo-800">{item.description}</p>
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
                    <p className="text-lg">Optimized LinkedIn content will appear here</p>
                    <p className="text-sm mt-2">Select a resume and sections to optimize</p>
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
