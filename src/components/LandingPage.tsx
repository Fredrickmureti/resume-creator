import { FileText, Briefcase, Minimize2, Palette, Crown, Terminal, GraduationCap, FileCheck, Check, Download, Edit, Zap, Star, Sparkles, Award, Brain, Wand2, Linkedin, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import heroResume from '../assets/hero-resume.jpg';
import resumeWork from '../assets/resume-work.jpg';
import templatePreview from '../assets/template-preview.jpg';
import Navigation from './Navigation';

interface LandingPageProps {
  user?: any;
}

const templates = [
  { id: 'modern', name: 'Modern', icon: FileText, color: 'from-blue-500 to-blue-600' },
  { id: 'professional', name: 'Professional', icon: Briefcase, color: 'from-slate-700 to-slate-800' },
  { id: 'minimalist', name: 'Minimalist', icon: Minimize2, color: 'from-gray-500 to-gray-600' },
  { id: 'creative', name: 'Creative', icon: Palette, color: 'from-orange-500 to-red-500' },
  { id: 'executive', name: 'Executive', icon: Crown, color: 'from-yellow-600 to-yellow-700' },
  { id: 'technical', name: 'Technical', icon: Terminal, color: 'from-green-600 to-teal-600' },
  { id: 'academic', name: 'Academic', icon: GraduationCap, color: 'from-indigo-500 to-indigo-600' },
  { id: 'simple', name: 'Simple', icon: FileCheck, color: 'from-slate-500 to-slate-600' }
];

export default function LandingPage({ user }: LandingPageProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation user={user} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg">
                <Brain className="w-4 h-4" />
                <span>AI-Powered Career Suite</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Create Resume Online<br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Professional CV Builder
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
                Build professional resumes and CVs with our free online resume builder. Choose from 50+ ATS-friendly resume templates. Create, customize, and download your curriculum vitae in minutes - the best resume maker for job seekers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold text-base sm:text-lg hover:bg-purple-50 transition-all"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/auth')}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Start Building Your Resume
                    </button>
                    <button
                      onClick={() => navigate('/auth')}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold text-base sm:text-lg hover:bg-purple-50 transition-all"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="w-full px-4 sm:px-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-3xl transform rotate-3 opacity-20"></div>
                <img
                  src={heroResume}
                  alt="Professional resume template example created with CreateResume.tech online resume builder - modern CV design with ATS-friendly formatting"
                  className="relative rounded-3xl shadow-2xl w-full h-auto max-w-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8" />
                <div className="text-3xl sm:text-4xl font-bold">50K+</div>
              </div>
              <div className="text-purple-100 text-sm sm:text-base">AI-Generated Documents</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
                <div className="text-3xl sm:text-4xl font-bold">3 min</div>
              </div>
              <div className="text-purple-100 text-sm sm:text-base">Average Creation Time</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                <div className="text-3xl sm:text-4xl font-bold">95%</div>
              </div>
              <div className="text-purple-100 text-sm sm:text-base">Application Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Free Resume Builder & CV Maker Tools</h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Create professional resumes, build stunning CVs, and generate job-winning cover letters with our comprehensive online resume creator suite
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 sm:p-8 hover:border-purple-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Resume Builder</h3>
            <p className="text-slate-600 leading-relaxed">
              Create ATS-friendly resumes with our intelligent resume maker. Choose from modern, professional resume templates designed to get you hired faster.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 sm:p-8 hover:border-blue-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">CV Maker & Cover Letter Generator</h3>
            <p className="text-slate-600 leading-relaxed">
              Build curriculum vitae and generate personalized cover letters. Our CV creator helps you craft compelling job applications that stand out.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-2xl p-6 sm:p-8 hover:border-pink-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Application Generator</h3>
            <p className="text-slate-600 leading-relaxed">
              Automatically craft tailored job applications that highlight your best qualifications for each position
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-2xl p-6 sm:p-8 hover:border-indigo-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
              <Linkedin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">LinkedIn Optimizer</h3>
            <p className="text-slate-600 leading-relaxed">
              AI-powered suggestions to optimize your LinkedIn profile for maximum recruiter visibility and engagement
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 sm:p-12 mb-12 sm:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Get hired faster with our simple 3-step process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Edit className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Tell Us About You</h3>
                <p className="text-slate-600">
                  Upload your existing resume or enter your work experience and skills
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. AI Does the Magic</h3>
                <p className="text-slate-600">
                  Our AI analyzes and optimizes your content for maximum impact
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Get Hired Faster</h3>
                <p className="text-slate-600">
                  Download and apply with confidence using professionally optimized materials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plus These Essential Tools Section */}
      <div className="bg-slate-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Plus These Essential Tools</h2>
            <p className="text-lg sm:text-xl text-slate-600">Everything else you need for career success</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 sm:p-8 hover:border-purple-300 transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Easy to Use</h3>
            <p className="text-slate-600">
              Intuitive editor with real-time preview. See your changes instantly as you type.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 sm:p-8 hover:border-blue-300 transition-all hover:shadow-lg transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
            <p className="text-slate-600">
              Create professional resumes in minutes, not hours. Auto-save keeps your work safe.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-2xl p-6 sm:p-8 hover:border-pink-300 transition-all hover:shadow-lg transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Export to PDF</h3>
            <p className="text-slate-600">
              Download high-quality PDFs ready to send to employers. Print-optimized formatting.
            </p>
          </div>
        </div>

        </div>
      </div>

      {/* Template Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mb-12 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">8 Professional Templates</h2>
            <p className="text-lg sm:text-xl text-slate-600">Designed for every industry and career level</p>
          </div>

          {/* Scrolling Images Container */}
          <div className="relative overflow-hidden mb-12">
            <div className="flex gap-6 animate-scroll-left">
              <img src={heroResume} alt="Modern professional resume template - ATS-friendly CV design for job applications" className="h-64 sm:h-80 w-auto rounded-2xl shadow-xl flex-shrink-0" loading="lazy" />
              <img src={templatePreview} alt="Creative resume template preview - professional CV layout with modern design" className="h-64 sm:h-80 w-auto rounded-2xl shadow-xl flex-shrink-0" loading="lazy" />
              <img src={resumeWork} alt="Executive resume example - professional curriculum vitae template for senior roles" className="h-64 sm:h-80 w-auto rounded-2xl shadow-xl flex-shrink-0" loading="lazy" />
              <img src={heroResume} alt="Clean minimalist resume template - simple CV design for professional applications" className="h-64 sm:h-80 w-auto rounded-2xl shadow-xl flex-shrink-0" loading="lazy" />
              <img src={templatePreview} alt="Industry-specific resume template - tailored CV formats for different career fields" className="h-64 sm:h-80 w-auto rounded-2xl shadow-xl flex-shrink-0" loading="lazy" />
              <img src={resumeWork} alt="Academic CV template - comprehensive curriculum vitae design for education sector" className="h-64 sm:h-80 w-auto rounded-2xl shadow-xl flex-shrink-0" loading="lazy" />
            </div>
          </div>

          {/* Template Icons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="bg-white border-2 border-slate-200 rounded-xl p-4 sm:p-6 hover:border-purple-300 transition-all hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-center font-semibold text-slate-900 text-sm sm:text-base">{template.name}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-purple-100 text-lg mb-8">
              One-time payment for unlimited access to all features
            </p>

            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  $1.40
                </div>
                <div className="text-slate-600">One-time payment • Lifetime Access</div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">AI Resume Design & Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Unlimited AI Cover Letters</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Unlimited Job Applications</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">LinkedIn Profile Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Access to all 8 professional templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Create unlimited resumes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Export unlimited PDFs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Real-time preview & auto-save</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">ATS-friendly formatting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Lifetime access - No subscriptions!</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/auth')}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Now
              </button>
            </div>

            <p className="text-purple-100 text-sm">
              🔒 Secure payment processing • ❌ No subscription • ✨ No hidden fees
            </p>
          </div>
        </div>
      </div>

      {/* SEO Footer Content */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Resume Builder Tools</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="/resume-builder" className="hover:text-white transition-colors">Free Resume Builder</a></li>
                <li><a href="/cv-maker" className="hover:text-white transition-colors">CV Maker Online</a></li>
                <li><a href="/resume-templates" className="hover:text-white transition-colors">Professional Resume Templates</a></li>
                <li><a href="/cover-letter-generator" className="hover:text-white transition-colors">Cover Letter Generator</a></li>
                <li><a href="/ats-resume-checker" className="hover:text-white transition-colors">ATS Resume Checker</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resume Templates</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="/templates/modern" className="hover:text-white transition-colors">Modern Resume Templates</a></li>
                <li><a href="/templates/professional" className="hover:text-white transition-colors">Professional CV Templates</a></li>
                <li><a href="/templates/creative" className="hover:text-white transition-colors">Creative Resume Designs</a></li>
                <li><a href="/templates/executive" className="hover:text-white transition-colors">Executive Resume Format</a></li>
                <li><a href="/templates/entry-level" className="hover:text-white transition-colors">Entry Level Resume Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Career Resources</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="/resume-examples" className="hover:text-white transition-colors">Resume Examples by Industry</a></li>
                <li><a href="/cv-examples" className="hover:text-white transition-colors">CV Examples & Samples</a></li>
                <li><a href="/resume-tips" className="hover:text-white transition-colors">Resume Writing Tips</a></li>
                <li><a href="/interview-preparation" className="hover:text-white transition-colors">Interview Preparation</a></li>
                <li><a href="/job-search-guide" className="hover:text-white transition-colors">Job Search Strategy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">About CreateResume.tech</h3>
              <p className="text-sm text-slate-300 mb-4">
                The best free online resume builder helping millions create professional resumes and CVs. 
                Build ATS-friendly resumes with our easy-to-use curriculum vitae maker.
              </p>
              <div className="flex space-x-4">
                <a href="/contact" className="text-slate-300 hover:text-white transition-colors text-sm">Contact</a>
                <a href="/privacy" className="text-slate-300 hover:text-white transition-colors text-sm">Privacy</a>
                <a href="/terms" className="text-slate-300 hover:text-white transition-colors text-sm">Terms</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-sm text-slate-400">
                © 2024 CreateResume.tech - Professional Resume Builder & CV Maker. All rights reserved.
              </div>
              <div className="text-sm text-slate-400 md:text-right">
                Keywords: create resume online, free resume builder, CV maker, professional resume templates, ATS resume, curriculum vitae creator
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}