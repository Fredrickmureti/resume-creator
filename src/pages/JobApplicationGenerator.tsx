import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Resume } from '../types/resume';
import { ArrowLeft, Sparkles, Copy, Save, RefreshCw, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Navigation from '../components/Navigation';
import ResumeUploader from '../components/ResumeUploader';

interface JobApplicationGeneratorProps {
  user: any;
  onBack: () => void;
}

export default function JobApplicationGenerator({ user, onBack }: JobApplicationGeneratorProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [uploadedResume, setUploadedResume] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'database' | 'upload' | 'none'>('database');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [responseLength, setResponseLength] = useState<'concise' | 'balanced' | 'comprehensive'>('balanced');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const generateApplication = async () => {
    if (!jobTitle || !companyName || !jobDescription) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      let resumeData = null;
      
      if (activeTab === 'database' && selectedResumeId) {
        resumeData = resumes.find(r => r.id === selectedResumeId);
      } else if (activeTab === 'upload' && uploadedResume) {
        resumeData = uploadedResume;
      }
      
      const { data, error } = await supabase.functions.invoke('generate-job-application', {
        body: {
          jobTitle,
          companyName,
          jobDescription,
          resume: resumeData,
          salaryExpectation,
          availabilityDate,
          responseLength,
        },
      });

      if (error) throw error;

      setGeneratedContent(data.applicationLetter);
      toast({
        title: 'Application generated',
        description: 'Your job application letter has been generated successfully',
      });
    } catch (error) {
      console.error('Error generating application:', error);
      toast({
        title: 'Generation failed',
        description: 'Failed to generate application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied to clipboard',
      description: 'Application content has been copied',
    });
  };

  const saveApplication = async () => {
    if (!generatedContent || !jobTitle || !companyName) {
      toast({
        title: 'Cannot save',
        description: 'Please generate an application first',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.from('job_applications').insert({
        user_id: user.id,
        resume_id: activeTab === 'database' ? selectedResumeId : null,
        job_title: jobTitle,
        company_name: companyName,
        job_description: jobDescription,
        content: generatedContent,
        salary_expectation: salaryExpectation || null,
        availability_date: availabilityDate || null,
      });

      if (error) throw error;

      toast({
        title: 'Saved successfully',
        description: 'Your job application has been saved',
      });
    } catch (error) {
      console.error('Error saving application:', error);
      toast({
        title: 'Save failed',
        description: 'Failed to save application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadPDF = () => {
    // Create a print-friendly version
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Job Application Letter</title>
          <style>
            body {
              font-family: Georgia, serif;
              line-height: 1.8;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .letter-content {
              white-space: pre-wrap;
              font-size: 12pt;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="letter-content">${generatedContent}</div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
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
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Job Application Generator</h1>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Resume Source</label>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab('database')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === 'database'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      My Resumes
                    </button>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === 'upload'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Upload Resume
                    </button>
                    <button
                      onClick={() => setActiveTab('none')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === 'none'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      No Resume
                    </button>
                  </div>

                  {activeTab === 'database' && (
                    <select
                      value={selectedResumeId}
                      onChange={(e) => setSelectedResumeId(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    >
                      <option value="">Select a resume</option>
                      {resumes.map((resume) => (
                        <option key={resume.id} value={resume.id}>
                          {resume.title}
                        </option>
                      ))}
                    </select>
                  )}

                  {activeTab === 'upload' && (
                    <ResumeUploader onResumeExtracted={setUploadedResume} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google Inc."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Salary Expectation (Optional)
                  </label>
                  <input
                    type="text"
                    value={salaryExpectation}
                    onChange={(e) => setSalaryExpectation(e.target.value)}
                    placeholder="e.g., $120,000 - $150,000"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Availability Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={availabilityDate}
                    onChange={(e) => setAvailabilityDate(e.target.value)}
                    placeholder="e.g., Immediately / Two weeks notice"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Response Length
                  </label>
                  <select
                    value={responseLength}
                    onChange={(e) => setResponseLength(e.target.value as 'concise' | 'balanced' | 'comprehensive')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none bg-white"
                  >
                    <option value="concise">Concise (~150 words, 2-3 paragraphs)</option>
                    <option value="balanced">Balanced (~300 words, 3-4 paragraphs) - Recommended</option>
                    <option value="comprehensive">Comprehensive (~500 words, 4-6 paragraphs)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Choose how detailed you want your application letter to be</p>
                </div>

                <button
                  onClick={generateApplication}
                  disabled={isGenerating || !jobTitle || !companyName || !jobDescription}
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
                      Generate Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Generated Application</h2>
                {generatedContent && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={saveApplication}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      title="Download as PDF"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </div>
                )}
              </div>

              <div className="min-h-[600px] p-6 bg-slate-50 rounded-lg border border-slate-200">
                {generatedContent ? (
                  <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="w-full min-h-[560px] p-4 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                    style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-[560px] text-slate-400">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Your application letter will appear here</p>
                      <p className="text-sm mt-2">Fill in the details and click "Generate Application"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
