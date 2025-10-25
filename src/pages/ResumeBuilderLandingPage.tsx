import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEORoute, seoRoutes } from '../components/SEORoutes';
import Navigation from '../components/Navigation';
import { FileText, Download, Check, Zap, Users, Award } from 'lucide-react';

const ResumeBuilderLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SEORoute {...seoRoutes.resumeBuilder}>
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Free Online Resume Builder
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-8">
                Create Professional Resumes in Minutes
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                Build your professional resume with our free online resume builder. Choose from 50+ ATS-friendly resume templates, 
                customize your CV content, and download your resume in PDF format instantly. No registration required to start.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Building Your Resume Free
                </button>
                <button
                  onClick={() => navigate('/resume-templates')}
                  className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all"
                >
                  Browse Resume Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Our Resume Builder */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Our Free Resume Builder?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Create professional resumes that get you hired with our comprehensive online resume maker
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">ATS-Friendly Templates</h3>
                <p className="text-slate-600 leading-relaxed">
                  All our resume templates are optimized for Applicant Tracking Systems (ATS). 
                  Your resume will pass automated screening and reach human recruiters.
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8 hover:border-purple-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">AI-Powered Suggestions</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get intelligent content suggestions powered by AI. Our resume builder helps you 
                  write compelling bullet points and optimize your resume content.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 hover:border-green-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Download className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Instant PDF Download</h3>
                <p className="text-slate-600 leading-relaxed">
                  Download your professional resume in high-quality PDF format instantly. 
                  Perfect formatting that looks great on screen and in print.
                </p>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 hover:border-orange-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Used by Millions</h3>
                <p className="text-slate-600 leading-relaxed">
                  Trusted by over 2 million job seekers worldwide. Join thousands who have 
                  successfully landed their dream jobs using our resume builder.
                </p>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-8 hover:border-indigo-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Industry-Specific</h3>
                <p className="text-slate-600 leading-relaxed">
                  Resume templates tailored for specific industries and job roles. 
                  From tech to healthcare, find the perfect resume format for your field.
                </p>
              </div>

              <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-8 hover:border-pink-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">100% Free</h3>
                <p className="text-slate-600 leading-relaxed">
                  Completely free resume builder with no hidden costs. Create unlimited resumes, 
                  access all templates, and download PDFs without any subscription fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                How to Create Your Resume Online
              </h2>
              <p className="text-xl text-slate-600">
                Build your professional resume in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Choose a Resume Template</h3>
                <p className="text-slate-600">
                  Select from 50+ professional resume templates designed by career experts. 
                  All templates are ATS-friendly and recruiter-approved.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Fill in Your Information</h3>
                <p className="text-slate-600">
                  Add your personal details, work experience, education, and skills. 
                  Use our AI suggestions to write compelling resume content.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Download Your Resume</h3>
                <p className="text-slate-600">
                  Preview your resume and download it as a PDF. Your professional resume 
                  is ready to send to employers and land interviews.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create My Resume Now - It's Free!
              </button>
            </div>
          </div>
        </div>

        {/* SEO Footer */}
        <div className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Your Professional Resume?</h3>
              <p className="text-slate-300 mb-6 max-w-3xl mx-auto">
                Join millions of job seekers who trust CreateResume.tech for their career success. 
                Create your professional resume online free and land your dream job faster.
              </p>
              <div className="text-sm text-slate-400">
                Keywords: free resume builder, online resume maker, professional resume creator, 
                ats resume builder, cv builder online, resume templates, resume maker free
              </div>
            </div>
          </div>
        </div>
      </div>
    </SEORoute>
  );
};

export default ResumeBuilderLandingPage;