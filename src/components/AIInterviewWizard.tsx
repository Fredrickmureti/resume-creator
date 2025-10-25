import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { Resume, TemplateId } from '../types/resume';
import { useToast } from '../hooks/use-toast';

interface AIInterviewWizardProps {
  templateId: TemplateId;
  userId: string;
  onComplete: (resume: Resume) => void;
  onCancel: () => void;
}

interface InterviewData {
  industry: string;
  yearsExperience: string;
  targetRole: string;
  workHistory: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
  languages: string;
  additionalInfo: string;
}

interface InterviewField {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

interface InterviewStep {
  title: string;
  fields: InterviewField[];
}

export default function AIInterviewWizard({
  templateId, 
  userId, 
  onComplete, 
  onCancel 
}: AIInterviewWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState(false);
  const [providerUsed, setProviderUsed] = useState<string | null>(null);
  const { toast } = useToast();
  const [data, setData] = useState<InterviewData>({
    industry: '',
    yearsExperience: '',
    targetRole: '',
    workHistory: '',
    education: '',
    skills: '',
    projects: '',
    certifications: '',
    languages: '',
    additionalInfo: ''
  });

  const steps: InterviewStep[] = [
    {
      title: 'Career Basics',
      fields: [
        { key: 'industry', label: 'Industry', placeholder: 'e.g., Software Development, Marketing, Finance' },
        { key: 'yearsExperience', label: 'Years of Experience', placeholder: 'e.g., 5 years' },
        { key: 'targetRole', label: 'Target Role', placeholder: 'e.g., Senior Software Engineer' }
      ]
    },
    {
      title: 'Work Experience',
      fields: [
        { 
          key: 'workHistory', 
          label: 'Work History', 
          placeholder: 'List your previous positions, companies, and key achievements...',
          multiline: true
        }
      ]
    },
    {
      title: 'Education & Skills',
      fields: [
        { key: 'education', label: 'Education', placeholder: 'Degrees, certifications, institutions...' },
        { key: 'skills', label: 'Skills', placeholder: 'Technical skills, tools, technologies...' }
      ]
    },
    {
      title: 'Projects & Additional',
      fields: [
        { key: 'projects', label: 'Projects', placeholder: 'Notable projects you\'ve worked on...' },
        { key: 'certifications', label: 'Certifications', placeholder: 'Professional certifications...' },
        { key: 'languages', label: 'Languages', placeholder: 'Languages you speak and proficiency level...' },
        { key: 'additionalInfo', label: 'Additional Information', placeholder: 'Any other relevant information...' }
      ]
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResume();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResume = async () => {
    setLoading(true);
    setError(null);
    setCanRetry(false);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('generate-resume', {
        body: { 
          interviewData: data,
          templateId,
          userId
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        
        // Check for all providers failed
        if (result?.errorType === 'all_providers_failed') {
          setError('All AI services are temporarily unavailable. Please try again in a few minutes.');
          toast({
            title: 'All Services Unavailable',
            description: 'All AI providers (Lovable, OpenRouter, Gemini) are experiencing issues.',
            variant: 'destructive'
          });
          setCanRetry(true);
          return;
        }
        
        // Handle specific error types
        if (error.message?.includes('payment') || result?.errorType === 'payment_required') {
          setError('AI credits required. Please add credits to your workspace to continue.');
          toast({
            title: 'Payment Required',
            description: 'Please add credits to your Lovable AI workspace to generate resumes.',
            variant: 'destructive'
          });
          setCanRetry(false);
          return;
        }
        
        if (error.message?.includes('rate limit') || error.message?.includes('429')) {
          setError('AI service is temporarily busy. Please try again in a moment.');
          toast({
            title: 'Service Busy',
            description: 'The AI service is experiencing high demand. Please retry in a few seconds.',
            variant: 'destructive'
          });
          setCanRetry(true);
          return;
        }
        
        // Generic error
        setError('Failed to generate resume. Please try again or create manually.');
        toast({
          title: 'Generation Failed',
          description: error.message || 'An unexpected error occurred. Please try again.',
          variant: 'destructive'
        });
        setCanRetry(true);
        return;
      }

      if (result && result.resume) {
        setProviderUsed(result.provider);
        toast({
          title: 'Success!',
          description: `Your resume has been generated using ${result.provider}.`,
        });
        onComplete(result.resume);
      } else {
        throw new Error('No resume data received from AI');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to generate resume. Please try again.',
        variant: 'destructive'
      });
      setCanRetry(true);
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">AI-Powered Create Resume</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Let's Build Your Resume</h1>
          <p className="text-muted-foreground">
            Answer a few questions and our AI will craft a professional resume for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-8">
          <h2 className="text-2xl font-bold mb-6">{currentStepData.title}</h2>
          
          <div className="space-y-6">
            {currentStepData.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-semibold mb-2">
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    value={data[field.key as keyof InterviewData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={data[field.key as keyof InterviewData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-slate-400"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Provider Success Display */}
          {providerUsed && !error && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-600" />
                <p className="text-green-800 font-medium">
                  ✅ Generated successfully using <strong>{providerUsed}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">{error}</p>
                  {canRetry && (
                    <button
                      onClick={generateResume}
                      disabled={loading}
                      className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Retry Generation
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={currentStep === 0 ? onCancel : handlePrev}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-semibold hover:bg-slate-900 hover:text-white transition-all disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </button>

            <button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Resume
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
