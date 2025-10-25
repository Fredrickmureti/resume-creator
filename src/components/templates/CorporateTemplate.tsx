import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CorporateTemplateProps {
  resume: Resume;
}

export default function CorporateTemplate({ resume }: CorporateTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto">
      <div className="flex">
        {/* Left Sidebar - 30% */}
        <div className="w-[30%] bg-[#1e3a8a] text-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{personal_info.fullName}</h1>
            <p className="text-blue-200 text-sm">{experience[0]?.position || 'Professional'}</p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 border-b border-blue-400 pb-1">CONTACT</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personal_info.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{personal_info.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{personal_info.location}</span>
              </div>
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-start gap-2"
                iconClassName="w-3 h-3 mt-0.5 flex-shrink-0"
              />
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-blue-400 pb-1">SKILLS</h2>
              <div className="space-y-3">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.id}>
                    <h3 className="text-xs font-semibold mb-1 text-blue-200">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillGroup.items.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-blue-700 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 border-b border-blue-400 pb-1">LANGUAGES</h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-blue-200"> - {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content - 70% */}
        <div className="w-[70%] p-8">
          {/* Summary */}
          {personal_info.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-2 border-b-2 border-[#1e3a8a] pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">{personal_info.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3 border-b-2 border-[#1e3a8a] pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-sm text-gray-700">{exp.company} | {exp.location}</p>
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3 border-b-2 border-[#1e3a8a] pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className="text-sm text-gray-700">{edu.institution} | {edu.location}</p>
                        {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3 border-b-2 border-[#1e3a8a] pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                        <p className="text-xs text-gray-700">{cert.issuer}</p>
                      </div>
                      <span className="text-xs text-gray-600">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3 border-b-2 border-[#1e3a8a] pb-1">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                    <p className="text-xs text-gray-600">
                      Technologies: {project.technologies.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          <CustomSectionRenderer
            sections={custom_sections}
            headerClassName="text-xl font-bold text-[#1e3a8a] mb-3 border-b-2 border-[#1e3a8a] pb-1"
            itemClassName="space-y-3"
          />
        </div>
      </div>
    </div>
  );
}
