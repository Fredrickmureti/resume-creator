import { useState, useEffect } from 'react';
import { Resume, Experience, Education, Skill, Project, Certification, Language, CustomSection, TemplateId, SocialLink } from '../types/resume';
import { Plus, Trash2, Download, ArrowLeft, Eye, Menu, X } from 'lucide-react';
import CustomSectionEditor from './CustomSectionEditor';
import PhotoUpload from './PhotoUpload';
import { CompletionInfo, getCompletionColor } from '../utils/resumeCompletion';
import ResumeCompletionGuide from './ResumeCompletionGuide';
import TemplateSwitcher from './TemplateSwitcher';

interface ResumeEditorProps {
  resume: Resume;
  onUpdateResume: (resume: Resume) => void;
  onBack: () => void;
  onExportPDF: () => void;
  completionInfo: CompletionInfo | null;
  showPreview?: boolean;
  onTogglePreview?: () => void;
}

export default function ResumeEditor({ resume, onUpdateResume, onBack, onExportPDF, completionInfo, onTogglePreview }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(resume.title);

  // Migration: Convert old linkedin/website to socialLinks
  useEffect(() => {
    if (!resume.personal_info.socialLinks && (resume.personal_info.linkedin || resume.personal_info.website)) {
      const socialLinks: SocialLink[] = [];
      if (resume.personal_info.linkedin) {
        socialLinks.push({
          id: Date.now().toString(),
          platform: 'LinkedIn',
          url: resume.personal_info.linkedin
        });
      }
      if (resume.personal_info.website) {
        socialLinks.push({
          id: (Date.now() + 1).toString(),
          platform: 'Website',
          url: resume.personal_info.website
        });
      }
      onUpdateResume({
        ...resume,
        personal_info: {
          ...resume.personal_info,
          socialLinks
        }
      });
    }
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    onUpdateResume({
      ...resume,
      personal_info: { ...resume.personal_info, [field]: value }
    });
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'LinkedIn',
      url: ''
    };
    onUpdateResume({
      ...resume,
      personal_info: {
        ...resume.personal_info,
        socialLinks: [...(resume.personal_info.socialLinks || []), newLink]
      }
    });
  };

  const updateSocialLink = (id: string, field: 'platform' | 'url', value: string) => {
    onUpdateResume({
      ...resume,
      personal_info: {
        ...resume.personal_info,
        socialLinks: (resume.personal_info.socialLinks || []).map(link =>
          link.id === id ? { ...link, [field]: value } : link
        )
      }
    });
  };

  const removeSocialLink = (id: string) => {
    onUpdateResume({
      ...resume,
      personal_info: {
        ...resume.personal_info,
        socialLinks: (resume.personal_info.socialLinks || []).filter(link => link.id !== id)
      }
    });
  };

  const handleTemplateChange = (templateId: TemplateId) => {
    onUpdateResume({
      ...resume,
      template_id: templateId as string
    });
  };

  const handleTitleSave = () => {
    if (editableTitle.trim()) {
      onUpdateResume({
        ...resume,
        title: editableTitle.trim()
      });
    } else {
      setEditableTitle(resume.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setEditableTitle(resume.title);
      setIsEditingTitle(false);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdateResume({ ...resume, experience: [...resume.experience, newExp] });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    onUpdateResume({
      ...resume,
      experience: resume.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onUpdateResume({
      ...resume,
      experience: resume.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    onUpdateResume({ ...resume, education: [...resume.education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onUpdateResume({
      ...resume,
      education: resume.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onUpdateResume({
      ...resume,
      education: resume.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: '',
      items: []
    };
    onUpdateResume({ ...resume, skills: [...resume.skills, newSkill] });
  };

  const updateSkill = (id: string, field: string, value: string | string[]) => {
    onUpdateResume({
      ...resume,
      skills: resume.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id: string) => {
    onUpdateResume({
      ...resume,
      skills: resume.skills.filter(skill => skill.id !== id)
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    };
    onUpdateResume({ ...resume, projects: [...resume.projects, newProject] });
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    onUpdateResume({
      ...resume,
      projects: resume.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const removeProject = (id: string) => {
    onUpdateResume({
      ...resume,
      projects: resume.projects.filter(proj => proj.id !== id)
    });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    };
    onUpdateResume({ ...resume, certifications: [...resume.certifications, newCert] });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    onUpdateResume({
      ...resume,
      certifications: resume.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const removeCertification = (id: string) => {
    onUpdateResume({
      ...resume,
      certifications: resume.certifications.filter(cert => cert.id !== id)
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: ''
    };
    onUpdateResume({ ...resume, languages: [...resume.languages, newLang] });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    onUpdateResume({
      ...resume,
      languages: resume.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const removeLanguage = (id: string) => {
    onUpdateResume({
      ...resume,
      languages: resume.languages.filter(lang => lang.id !== id)
    });
  };

  const addCustomSection = () => {
    const sectionNumber = (resume.custom_sections || []).length + 1;
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: `Custom Section ${sectionNumber}`,
      items: [],
      fields: [
        {
          id: Date.now().toString(),
          name: 'field_1',
          label: 'Field 1',
          type: 'text'
        }
      ]
    };
    onUpdateResume({ ...resume, custom_sections: [...(resume.custom_sections || []), newSection] });
    setActiveSection(`custom_${newSection.id}`);
  };

  const updateCustomSection = (id: string, section: CustomSection) => {
    onUpdateResume({
      ...resume,
      custom_sections: resume.custom_sections.map(cs => cs.id === id ? section : cs)
    });
  };

  const removeCustomSection = (id: string) => {
    onUpdateResume({
      ...resume,
      custom_sections: resume.custom_sections.filter(cs => cs.id !== id)
    });
    setActiveSection('personal');
  };

  const sections = [
    { id: 'personal', name: 'Personal Info' },
    { id: 'experience', name: 'Experience' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'certifications', name: 'Certifications' },
    { id: 'languages', name: 'Languages' },
    ...(resume.custom_sections || []).map(cs => ({
      id: `custom_${cs.id}`,
      name: cs.title
    }))
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            {isEditingTitle ? (
              <input
                type="text"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyPress}
                className="text-lg md:text-2xl font-bold text-slate-900 border-2 border-indigo-500 rounded px-2 py-1 min-w-0"
                autoFocus
                maxLength={100}
              />
            ) : (
              <h1 
                className="text-lg md:text-2xl font-bold text-slate-900 truncate cursor-pointer hover:text-indigo-600 transition-colors"
                onClick={() => setIsEditingTitle(true)}
                title="Click to edit resume title"
              >
                {resume.title}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {completionInfo && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                <span className="text-sm text-slate-600">Completion:</span>
                <span className={`text-sm font-bold ${getCompletionColor(completionInfo.percentage)}`}>
                  {completionInfo.percentage}%
                </span>
                {completionInfo.percentage < 80 && (
                  <span className="text-xs text-slate-500">(80% needed to save)</span>
                )}
              </div>
            )}
            <TemplateSwitcher 
              currentTemplate={resume.template_id as TemplateId}
              onTemplateChange={handleTemplateChange}
            />
            {onTogglePreview && (
              <button
                onClick={onTogglePreview}
                className="lg:hidden flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            )}
            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
        
        {/* Completion Progress Bar */}
        {completionInfo && (
          <div className="w-full bg-gray-200 h-2">
            <div 
              className={`h-2 transition-all duration-300 ${
                completionInfo.percentage >= 80 ? 'bg-green-600' : 
                completionInfo.percentage >= 50 ? 'bg-yellow-600' : 
                'bg-red-600'
              }`}
              style={{ width: `${completionInfo.percentage}%` }}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Completion Guide */}
        {completionInfo && completionInfo.percentage < 80 && (
          <div className="mb-4 md:mb-6">
            <ResumeCompletionGuide 
              completionInfo={completionInfo}
              onSectionClick={(section) => setActiveSection(section)}
            />
          </div>
        )}
        
        {/* Mobile Section Selector */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <span className="font-medium text-slate-900">
              {sections.find(s => s.id === activeSection)?.name || 'Select Section'}
            </span>
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          
          {showSidebar && (
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSidebar(false)}>
              <div 
                className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900">Sections</h2>
                  <button onClick={() => setShowSidebar(false)}>
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <nav className="p-4 space-y-1">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setShowSidebar(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      addCustomSection();
                      setShowSidebar(false);
                    }}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Section
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Sections</h2>
              <nav className="space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {section.name}
                  </button>
                ))}
              </nav>
              <button
                onClick={addCustomSection}
                className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:text-slate-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Custom Section
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h2>
                  
                  {/* Photo Upload for Templates with Photo Support */}
                  {(resume.template_id?.startsWith('cv-photo') || 
                    ['grid', 'sidebar', 'split', 'timeline', 'two-column'].includes(resume.template_id || '')) && (
                    <div className="mb-6 pb-6 border-b border-slate-200">
                      <PhotoUpload
                        currentPhotoUrl={resume.personal_info.photo_url}
                        onPhotoUploaded={(url) => updatePersonalInfo('photo_url', url)}
                        onPhotoRemoved={() => updatePersonalInfo('photo_url', '')}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={resume.personal_info.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={resume.personal_info.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={resume.personal_info.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={resume.personal_info.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    />
                    <textarea
                      placeholder="Professional Summary"
                      value={resume.personal_info.summary}
                      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                      rows={4}
                      className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Social Links Section */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Social Links (Optional)</h3>
                      <button
                        onClick={addSocialLink}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Social Link
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(resume.personal_info.socialLinks || []).map((link) => (
                        <div key={link.id} className="flex items-center gap-3">
                          <select
                            value={link.platform}
                            onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                          >
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Website">Website</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Other">Other</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Enter URL"
                            value={link.url}
                            onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                          />
                          <button
                            onClick={() => removeSocialLink(link.id)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {(!resume.personal_info.socialLinks || resume.personal_info.socialLinks.length === 0) && (
                        <p className="text-sm text-slate-500 text-center py-4">
                          No social links added yet. Click "Add Social Link" to include LinkedIn, GitHub, or other profiles.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Experience</h2>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </button>
                  </div>
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Start Date (e.g., Jan 2020)"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none disabled:bg-slate-100"
                        />
                        <label className="flex items-center gap-2 px-4 py-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-slate-700">Currently working here</span>
                        </label>
                        <textarea
                          placeholder="Description (responsibilities, achievements)"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={4}
                          className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Education
                    </button>
                  </div>
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Degree (e.g., Bachelor of Science)"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Field of Study"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional)"
                          value={edu.gpa || ''}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skill Category
                    </button>
                  </div>
                  {resume.skills.map((skill) => (
                    <div key={skill.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Category (e.g., Programming Languages)"
                        value={skill.category}
                        onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Skills (comma-separated, e.g., JavaScript, Python, Java)"
                        value={skill.items.join(', ')}
                        onBlur={(e) => updateSkill(skill.id, 'items', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                        onChange={(e) => updateSkill(skill.id, 'items', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>
                  {resume.projects.map((project) => (
                    <div key={project.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeProject(project.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                          className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <textarea
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          rows={3}
                          className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                        />
                        <input
                          type="text"
                          placeholder="Technologies (comma-separated)"
                          value={project.technologies.join(', ')}
                          onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                          className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Project Link (optional)"
                          value={project.link || ''}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'certifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
                    <button
                      onClick={addCertification}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Certification
                    </button>
                  </div>
                  {resume.certifications.map((cert) => (
                    <div key={cert.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeCertification(cert.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                          className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Date (e.g., Jan 2023)"
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'languages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Languages</h2>
                    <button
                      onClick={addLanguage}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Language
                    </button>
                  </div>
                  {resume.languages.map((lang) => (
                    <div key={lang.id} className="p-6 border border-slate-200 rounded-lg space-y-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeLanguage(lang.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Language"
                          value={lang.name}
                          onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Proficiency (e.g., Native, Fluent, Intermediate)"
                          value={lang.proficiency}
                          onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection.startsWith('custom_') && (
                resume.custom_sections.find(cs => `custom_${cs.id}` === activeSection) && (
                  <CustomSectionEditor
                    section={resume.custom_sections.find(cs => `custom_${cs.id}` === activeSection)!}
                    onUpdate={(section) => updateCustomSection(section.id, section)}
                    onRemove={() => removeCustomSection(resume.custom_sections.find(cs => `custom_${cs.id}` === activeSection)!.id)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
