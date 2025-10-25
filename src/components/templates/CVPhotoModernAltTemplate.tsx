import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoModernAltTemplateProps {
  resume: Resume;
}

export default function CVPhotoModernAltTemplate({ resume }: CVPhotoModernAltTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto">
      {/* Large Photo Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 h-48">
        <div className="absolute -bottom-16 left-10 flex items-end gap-6">
          {/* Large circular photo */}
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          {/* Name on header */}
          <div className="pb-4 text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">{personal_info.fullName}</h1>
            {experience[0]?.position && (
              <p className="text-xl text-blue-100">{experience[0].position}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 px-10 pb-10">
        {/* Contact Info Bar */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex flex-wrap gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>{personal_info.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>{personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{personal_info.location}</span>
          </div>
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-4"
            iconClassName="w-4 h-4 text-blue-600"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Summary */}
            {personal_info.summary && (
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Profile</h2>
                <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-blue-600 font-semibold">{exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.location}</div>
                        </div>
                        <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Projects</h2>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-sm">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-blue-600">{edu.field}</div>
                      <div className="text-gray-600">{edu.institution}</div>
                      <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                      {edu.gpa && <div className="text-xs text-gray-600">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Skills</h2>
                <div className="space-y-3">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
            {languages && languages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">Certifications</h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-sm">
                      <div className="font-bold text-gray-900">{cert.name}</div>
                      <div className="text-xs text-gray-600">{cert.issuer} | {cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Sections */}
        {custom_sections && custom_sections.length > 0 && (
          <div className="mt-6">
            <CustomSectionRenderer 
              sections={custom_sections}
              headerClassName="text-2xl font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}
