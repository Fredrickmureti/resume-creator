import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEORouteProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  children: React.ReactNode;
}

export const SEORoute: React.FC<SEORouteProps> = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  children 
}) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
    {children}
  </>
);

// SEO-optimized route configurations
export const seoRoutes = {
  home: {
    title: 'Create Resume Online Free - Professional Resume Builder & CV Maker | CreateResume.tech',
    description: 'Build professional resumes & CVs in minutes with our AI-powered resume builder. 50+ ATS-friendly templates, free download. Best online resume creator for job seekers.',
    keywords: 'create resume, resume builder, cv maker, curriculum vitae builder, professional resume, free resume builder, online resume creator, resume template, cv template, ats resume',
    canonical: 'https://createresume.tech/'
  },
  
  resumeBuilder: {
    title: 'Free Online Resume Builder - Create Professional Resumes | CreateResume.tech',
    description: 'Create professional resumes online with our free resume builder. Choose from ATS-friendly templates, customize your CV, and download in PDF format instantly.',
    keywords: 'free resume builder, online resume maker, professional resume creator, ats resume builder, cv builder online, resume maker free',
    canonical: 'https://createresume.tech/resume-builder'
  },
  
  cvMaker: {
    title: 'CV Maker Online - Create Curriculum Vitae Free | CreateResume.tech',
    description: 'Professional CV maker for creating stunning curriculum vitae online. Free CV builder with academic and professional templates. Download your CV in minutes.',
    keywords: 'cv maker, curriculum vitae builder, cv creator online, professional cv templates, cv builder free, academic cv maker',
    canonical: 'https://createresume.tech/cv-maker'
  },
  
  resumeTemplates: {
    title: 'Professional Resume Templates - Free CV Templates Download | CreateResume.tech', 
    description: 'Download 50+ professional resume templates for free. Modern, creative, and ATS-friendly CV templates for all industries. Customize and download instantly.',
    keywords: 'resume templates, cv templates, professional resume design, modern resume templates, ats resume templates, free resume templates download',
    canonical: 'https://createresume.tech/resume-templates'
  },
  
  coverLetterGenerator: {
    title: 'AI Cover Letter Generator - Create Professional Cover Letters | CreateResume.tech',
    description: 'Generate personalized cover letters with AI in seconds. Professional cover letter templates tailored to job descriptions. Free cover letter maker.',
    keywords: 'cover letter generator, ai cover letter, cover letter maker, professional cover letter templates, job application letter',
    canonical: 'https://createresume.tech/cover-letter-generator'
  },
  
  jobApplicationGenerator: {
    title: 'Job Application Generator - AI-Powered Applications | CreateResume.tech',
    description: 'Create tailored job applications with AI. Generate personalized application letters that match job requirements and increase your hiring chances.',
    keywords: 'job application generator, ai job application, application letter maker, personalized job applications',
    canonical: 'https://createresume.tech/job-application-generator'
  },
  
  linkedinOptimizer: {
    title: 'LinkedIn Profile Optimizer - Boost Your Professional Profile | CreateResume.tech',
    description: 'Optimize your LinkedIn profile with AI suggestions. Improve your professional summary, headlines, and experience descriptions for better recruiter visibility.',
    keywords: 'linkedin optimizer, linkedin profile optimization, professional linkedin profile, linkedin summary generator',
    canonical: 'https://createresume.tech/linkedin-optimizer'
  },
  
  resumeOptimizer: {
    title: 'Resume Optimizer - ATS Resume Checker & Optimization | CreateResume.tech',
    description: 'Optimize your resume for ATS systems and recruiters. Get suggestions to improve your resume content, format, and keyword optimization.',
    keywords: 'resume optimizer, ats resume checker, resume optimization, resume improvement, ats friendly resume',
    canonical: 'https://createresume.tech/resume-optimizer'
  },
  
  features: {
    title: 'Resume Builder Features - AI-Powered Career Tools | CreateResume.tech',
    description: 'Discover all features of our professional resume builder. AI-powered resume creation, ATS optimization, multiple formats, and career tools.',
    keywords: 'resume builder features, ai resume tools, ats optimization, career tools, professional resume features',
    canonical: 'https://createresume.tech/features'
  },
  
  jobTracker: {
    title: 'Job Application Tracker - Manage Your Job Search | CreateResume.tech',
    description: 'Track your job applications, manage interview schedules, and organize your job search. Free job tracker for efficient career management.',
    keywords: 'job tracker, job application tracker, job search management, interview tracker, career management',
    canonical: 'https://createresume.tech/job-tracker'
  }
};

// Template-specific SEO routes
export const templateSeoRoutes = {
  modern: {
    title: 'Modern Resume Templates - Contemporary CV Designs | CreateResume.tech',
    description: 'Professional modern resume templates with clean, contemporary designs. ATS-friendly modern CV formats perfect for today\'s job market.',
    keywords: 'modern resume template, contemporary cv design, modern resume format, sleek resume template',
    canonical: 'https://createresume.tech/templates/modern'
  },
  
  professional: {
    title: 'Professional Resume Templates - Business CV Formats | CreateResume.tech', 
    description: 'Download professional resume templates for corporate and business roles. Classic, elegant CV designs that impress hiring managers.',
    keywords: 'professional resume template, business cv template, corporate resume format, executive resume template',
    canonical: 'https://createresume.tech/templates/professional'
  },
  
  creative: {
    title: 'Creative Resume Templates - Artistic CV Designs | CreateResume.tech',
    description: 'Stand out with creative resume templates. Artistic CV designs for designers, marketers, and creative professionals.',
    keywords: 'creative resume template, artistic cv design, designer resume template, creative cv format',
    canonical: 'https://createresume.tech/templates/creative'
  },
  
  executive: {
    title: 'Executive Resume Templates - C-Suite CV Formats | CreateResume.tech',
    description: 'Executive resume templates for senior leadership roles. Professional C-suite CV formats that showcase executive experience.',
    keywords: 'executive resume template, c-suite cv template, senior executive resume, leadership resume format',
    canonical: 'https://createresume.tech/templates/executive'
  },
  
  ats: {
    title: 'ATS Resume Templates - Applicant Tracking System Friendly | CreateResume.tech',
    description: 'ATS-optimized resume templates that pass applicant tracking systems. Simple, clean CV formats that get past automated screening.',
    keywords: 'ats resume template, ats friendly cv, applicant tracking system resume, ats optimized template',
    canonical: 'https://createresume.tech/templates/ats'
  }
};