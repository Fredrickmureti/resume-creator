import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoExecutiveTemplateProps {
  resume: Resume;
}

export default function CVPhotoExecutiveTemplate({ resume }: CVPhotoExecutiveTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto">
      {/* Premium Header */}
      <div className="bg-[#1e40af] text-white p-8 relative">
        <div className="flex items-start gap-6">
          {/* Large Photo with Gold Border */}
          <div className="flex-shrink-0">
            {personal_info.photo_url ? (
              <img 
                src={personal_info.photo_url} 
                alt={personal_info.fullName}
                className="w-36 h-36 object-cover rounded-full border-4 border-[#d97706]"
              />
            ) : (
              <div className="w-36 h-36 bg-blue-800 rounded-full border-4 border-[#d97706] flex items-center justify-center">
                <User className="w-20 h-20 text-blue-300" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{personal_info.fullName}</h1>
            {experience[0]?.position && (
              <p className="text-2xl text-blue-100 mb-4">{experience[0].position}</p>
            )}
            
            {/* Contact */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{personal_info.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{personal_info.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personal_info.location}</span>
              </div>
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-center gap-2"
                iconClassName="w-4 h-4"
                showIcons={true}
              />
            </div>
          </div>
        </div>

        {/* Gold Accent Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#d97706]"></div>
      </div>

      <div className="p-10">
        {/* Executive Summary */}
        {personal_info.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-3 pb-2 border-b-2 border-[#d97706]">
              EXECUTIVE SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{personal_info.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#d97706]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-semibold">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap font-semibold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution} • {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap font-semibold">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Competencies */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]">
              CORE COMPETENCIES
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id} className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-[#1e40af] mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="text-sm bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements / Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]">
              KEY ACHIEVEMENTS
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 border-[#d97706] pl-4">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Certifications */}
        {certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]">
              PROFESSIONAL CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-50 p-3 rounded">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  <p className="text-xs text-gray-600">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="font-bold text-gray-900">{lang.name}</span>
                  <span className="text-gray-600"> • {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        <CustomSectionRenderer
          sections={custom_sections}
          headerClassName="text-2xl font-bold text-[#1e40af] mb-4 pb-2 border-b-2 border-[#d97706]"
          itemClassName="space-y-4"
        />
      </div>
    </div>
  );
}
