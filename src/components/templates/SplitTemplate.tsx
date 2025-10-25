import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface SplitTemplateProps {
  data: Resume;
}

const SplitTemplate: React.FC<SplitTemplateProps> = ({ data }) => {
  const photoUrl = data.personal_info.photo_url;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none font-sans text-gray-900">
      {/* Top Split Header */}
      <div className="grid grid-cols-2 min-h-[250px]">
        {/* Left Header - Colored */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-10 flex flex-col justify-center">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.personal_info.fullName}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white/40 shadow-xl mb-4"
            />
          )}
          <h1 className="text-4xl font-bold mb-2">{data.personal_info.fullName}</h1>
          <div className="space-y-2 text-sm mt-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{data.personal_info.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{data.personal_info.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{data.personal_info.location}</span>
            </div>
          </div>
          {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
            <div className="mt-4">
              <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-white" />
            </div>
          )}
        </div>

        {/* Right Header - White */}
        <div className="p-10 flex flex-col justify-center bg-gray-50">
          {data.personal_info.summary && (
            <>
              <h2 className="text-xl font-bold text-teal-600 mb-3">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{data.personal_info.summary}</p>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area - Split Layout */}
      <div className="grid grid-cols-2 gap-0">
        {/* Left Column */}
        <div className="p-10 bg-white">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600">
                Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <div className="text-teal-600 font-medium text-sm">{exp.company}</div>
                  <div className="text-gray-500 text-xs mb-2">
                    {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    {project.startDate} - {project.endDate}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="p-10 bg-gray-50">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <div className="text-teal-600 font-medium text-sm">{edu.field}</div>
                  <div className="text-sm text-gray-700">{edu.institution}</div>
                  <div className="text-xs text-gray-500">
                    {edu.location} • {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600">
                Skills
              </h2>
              {data.skills.map((skillGroup) => (
                <div key={skillGroup.id} className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{skillGroup.category}</h3>
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
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600">
                Certifications
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <div className="font-semibold text-gray-900">{cert.name}</div>
                  <div className="text-sm text-gray-700">{cert.issuer}</div>
                  <div className="text-xs text-gray-500">{cert.date}</div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600">
                Languages
              </h2>
              {data.languages.map((language) => (
                <div key={language.id} className="mb-2">
                  <span className="font-semibold text-gray-900">{language.name}</span>
                  <span className="text-sm text-gray-600"> - {language.proficiency}</span>
                </div>
              ))}
            </div>
          )}

          {/* Custom Sections */}
          {data.custom_sections && data.custom_sections.length > 0 && (
            <div className="mb-8">
              <CustomSectionRenderer 
                sections={data.custom_sections}
                headerClassName="text-2xl font-bold text-teal-600 mb-4 pb-2 border-b-2 border-teal-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitTemplate;
