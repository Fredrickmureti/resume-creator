import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEORoute, seoRoutes } from '../components/SEORoutes';
import Navigation from '../components/Navigation';
import { GraduationCap, FileText, Download, Check, Globe, Award } from 'lucide-react';

const CVMakerLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SEORoute {...seoRoutes.cvMaker}>
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Professional CV Maker Online
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 mb-8">
                Create Stunning Curriculum Vitae Free
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                Build your professional CV online with our comprehensive curriculum vitae maker. 
                Perfect for academic positions, research roles, and international job applications. 
                Choose from academic and professional CV templates designed by career experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Create My CV Free
                </button>
                <button
                  onClick={() => navigate('/resume-templates')}
                  className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all"
                >
                  Browse CV Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CV vs Resume Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                CV Maker for Academic & International Careers
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Create comprehensive curriculum vitae that showcase your complete academic and professional journey
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">What is a Curriculum Vitae (CV)?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Comprehensive Academic Document</h4>
                      <p className="text-slate-600">A CV is a detailed document that covers your entire academic and professional history, including publications, research, and achievements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">International Standard</h4>
                      <p className="text-slate-600">CVs are the standard job application document in Europe, Asia, Africa, and for academic positions worldwide.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">No Length Restrictions</h4>
                      <p className="text-slate-600">Unlike resumes, CVs can be multiple pages long to accommodate extensive academic credentials and research experience.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Perfect for:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <span className="text-slate-700">Academic Positions (Professor, Researcher)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <span className="text-slate-700">International Job Applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <span className="text-slate-700">Research & Scientific Roles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span className="text-slate-700">Fellowship Applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-indigo-600" />
                    <span className="text-slate-700">Grant Applications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CV Sections */}
        <div className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Essential CV Sections
              </h2>
              <p className="text-xl text-slate-600">
                Our CV maker includes all the sections you need for a comprehensive curriculum vitae
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Personal Information",
                  description: "Contact details, professional photo (where appropriate), and personal statement or objective."
                },
                {
                  title: "Education & Qualifications",
                  description: "Detailed academic history including degrees, certifications, honors, and relevant coursework."
                },
                {
                  title: "Research Experience",
                  description: "Research projects, thesis work, lab experience, and academic collaborations."
                },
                {
                  title: "Publications & Papers",
                  description: "Academic publications, research papers, book chapters, and conference presentations."
                },
                {
                  title: "Teaching Experience", 
                  description: "Teaching positions, courses taught, curriculum development, and student supervision."
                },
                {
                  title: "Grants & Funding",
                  description: "Research grants received, scholarship awards, and funding achievements."
                },
                {
                  title: "Professional Experience",
                  description: "Work history, internships, and relevant professional positions with detailed descriptions."
                },
                {
                  title: "Skills & Languages",
                  description: "Technical skills, research methodologies, language proficiency, and software expertise."
                },
                {
                  title: "References",
                  description: "Academic and professional references with complete contact information."
                }
              ].map((section, index) => (
                <div key={index} className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-indigo-400 transition-all">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Create Your Professional CV?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Build a comprehensive curriculum vitae that showcases your academic achievements and professional experience. 
              Used by researchers, academics, and international job seekers worldwide.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Creating My CV - Free!
            </button>
          </div>
        </div>
      </div>
    </SEORoute>
  );
};

export default CVMakerLandingPage;