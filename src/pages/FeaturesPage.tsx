import { Brain, FileText, Wand2, Linkedin, Award, Zap, CheckCircle2, Shield, Download, Clock, Users, Share2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import heroResume from '../assets/hero-resume.jpg';
import resumeWork from '../assets/resume-work.jpg';
import templatePreview from '../assets/template-preview.jpg';

interface FeaturesPageProps {
  user?: any;
}

export default function FeaturesPage({ user }: FeaturesPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation user={user} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Your Complete AI Career Platform
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
              Everything you need to create, optimize, and manage your professional career documents - all powered by advanced AI technology
            </p>
            <button
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {user ? 'Go to Dashboard' : 'Get Started Free'}
            </button>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What We Offer</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive suite of AI-powered tools designed to accelerate your career success
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* AI Resume Builder */}
          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-3xl p-8 hover:border-purple-400 transition-all hover:shadow-2xl transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">AI Resume Builder</h3>
            </div>
            <div className="mb-6">
              <img src={heroResume} alt="AI Resume Builder" className="w-full h-64 object-cover rounded-xl shadow-lg" />
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Our intelligent AI interviews you about your experience and automatically generates a professionally formatted resume tailored to your industry. Choose from 20+ templates designed by career experts.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">20+ professional templates for every industry</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">AI-powered content optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Real-time preview and editing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">ATS-friendly formatting</span>
              </li>
            </ul>
          </div>

          {/* Cover Letter Generator */}
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-3xl p-8 hover:border-blue-400 transition-all hover:shadow-2xl transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Cover Letter Generator</h3>
            </div>
            <div className="mb-6">
              <img src={resumeWork} alt="Cover Letter Generator" className="w-full h-64 object-cover rounded-xl shadow-lg" />
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Generate personalized, compelling cover letters that perfectly match any job description. Our AI analyzes the job posting and creates tailored content that highlights your most relevant qualifications.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Job description analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Personalized content generation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Professional tone and formatting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Instant PDF export</span>
              </li>
            </ul>
          </div>

          {/* Job Application Generator */}
          <div className="group bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-3xl p-8 hover:border-pink-400 transition-all hover:shadow-2xl transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Job Application Generator</h3>
            </div>
            <div className="mb-6">
              <img src={templatePreview} alt="Job Application Generator" className="w-full h-64 object-cover rounded-xl shadow-lg" />
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Automatically craft complete job applications that emphasize your best qualifications for each position. Save hours of time while maintaining a professional, personalized approach.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Tailored to each job posting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Highlights relevant experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Professional formatting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Track all applications</span>
              </li>
            </ul>
          </div>

          {/* LinkedIn Optimizer */}
          <div className="group bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-3xl p-8 hover:border-cyan-400 transition-all hover:shadow-2xl transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">LinkedIn Optimizer</h3>
            </div>
            <div className="mb-6">
              <div className="w-full h-64 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl shadow-lg flex items-center justify-center">
                <Linkedin className="w-32 h-32 text-cyan-600 opacity-50" />
              </div>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Transform your LinkedIn profile into a recruiter magnet. Our AI analyzes your resume and generates optimized headlines, about sections, and experience descriptions for maximum visibility.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">SEO-optimized profile content</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Skill recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Recruiter-friendly formatting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700">Industry-specific optimization</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Additional Powerful Features</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Resume Optimizer</h4>
              <p className="text-slate-600">
                Get AI-powered suggestions to improve your resume's impact and ATS compatibility. Receive a detailed score and actionable recommendations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Job Application Tracker</h4>
              <p className="text-slate-600">
                Keep all your job applications organized in one place. Track companies, positions, dates, and follow-up status.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Public Resume Profile</h4>
              <p className="text-slate-600">
                Share your professional resume as a public profile website. Get a custom URL and showcase your CV to potential employers anywhere.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">PDF Export</h4>
              <p className="text-slate-600">
                Download high-quality, print-ready PDFs of all your documents. Perfect formatting guaranteed every time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Auto-Save</h4>
              <p className="text-slate-600">
                Never lose your work. All changes are automatically saved in real-time as you edit.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Email Integration</h4>
              <p className="text-slate-600">
                Send your resume directly to recruiters and hiring managers via email. Professional HTML formatting with personalized messages.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h4>
              <p className="text-slate-600">
                Your data is encrypted and secure. We never share your information with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Public Profile Feature */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-3xl overflow-hidden mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-12">
              <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Share2 className="w-4 h-4" />
                Share Your Resume
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Public Resume Profile</h3>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Turn your resume into a stunning public profile page that you can share with anyone. Perfect for job applications, networking, or showcasing your professional experience.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Custom Username URL</p>
                    <p className="text-sm text-slate-600">Create a personalized link like yoursite.com/username</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Always Up-to-Date</p>
                    <p className="text-sm text-slate-600">Your public profile automatically shows your latest resume</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Privacy Controls</p>
                    <p className="text-sm text-slate-600">Toggle your profile public or private anytime you want</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Beautiful Templates</p>
                    <p className="text-sm text-slate-600">Your chosen resume template displays perfectly on any device</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative bg-gradient-to-br from-indigo-200 to-indigo-300 p-12 flex items-center justify-center min-h-[400px]">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="h-5 bg-slate-800 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-slate-400 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                </div>
                <div className="pt-4 border-t-2 border-slate-200">
                  <div className="h-4 bg-indigo-200 rounded w-24 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Public ✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Choose Our Platform?</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            We combine cutting-edge AI technology with career expertise to give you the competitive edge
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border-2 border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 hover:shadow-lg transition-all">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-slate-900 mb-2">Lightning Fast</h4>
              <p className="text-slate-600 text-sm">Create professional documents in minutes, not hours</p>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 hover:shadow-lg transition-all">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-slate-900 mb-2">AI-Powered</h4>
              <p className="text-slate-600 text-sm">Advanced AI that understands your unique experience</p>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-xl p-6 text-center hover:border-green-400 hover:shadow-lg transition-all">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-slate-900 mb-2">Expert-Designed</h4>
              <p className="text-slate-600 text-sm">Templates created by career professionals and recruiters</p>
            </div>

            <div className="bg-white border-2 border-pink-200 rounded-xl p-6 text-center hover:border-pink-400 hover:shadow-lg transition-all">
              <Shield className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-slate-900 mb-2">ATS-Optimized</h4>
              <p className="text-slate-600 text-sm">Formatted to pass applicant tracking systems</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who are landing their dream jobs with our AI-powered platform
          </p>
          <button
            onClick={() => navigate(user ? '/dashboard' : '/auth')}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            {user ? 'Go to Dashboard' : 'Start Building for Free'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} Create Resume. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
