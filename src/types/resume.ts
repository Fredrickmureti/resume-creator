export interface SocialLink {
  id: string;
  platform: string; // "LinkedIn", "GitHub", "Twitter", "Portfolio", "Website", etc.
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  socialLinks?: SocialLink[];
  photo_url?: string;
  // Keep for backward compatibility
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CustomSectionItem {
  id: string;
  [key: string]: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
  fields: CustomField[];
}

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date';
}

export interface Resume {
  id: string;
  user_id?: string;
  template_id: string;
  title: string;
  document_type?: 'resume' | 'cv';
  personal_info: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  custom_sections: CustomSection[];
  created_at: string;
  updated_at: string;
}

export type TemplateId = 'modern' | 'professional' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'academic' | 'simple' | 'corporate' | 'bold' | 'compact' | 'infographic' | 'classic' | 'cv-photo-modern' | 'cv-photo-professional' | 'cv-photo-creative' | 'cv-photo-elegant' | 'cv-photo-business' | 'cv-photo-academic' | 'cv-photo-minimalist' | 'cv-photo-executive' | 'cv-photo-tech' | 'two-column' | 'timeline' | 'sidebar' | 'split' | 'grid' | 'magazine' | 'horizon' | 'vertical' | 'cornerstone' | 'edge' | 'nexus' | 'cascade' | 'cv-photo-modern-alt' | 'cv-photo-corporate' | 'cv-photo-clean' | 'cv-photo-bold' | 'cv-photo-compact' | 'cv-photo-elegant-alt' | 'cv-photo-premium';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  documentType?: 'resume' | 'cv';
}

export interface CoverLetter {
  id: string;
  user_id: string;
  resume_id?: string;
  job_title: string;
  company_name: string;
  job_description: string;
  content: string;
  created_at: string;
  updated_at: string;
}
