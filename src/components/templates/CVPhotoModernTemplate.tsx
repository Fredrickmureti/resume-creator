import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoModernTemplateProps {
  resume: Resume;
}

export default function CVPhotoModernTemplate({ resume }: CVPhotoModernTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-lg print:shadow-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header with Photo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <div className="flex items-start gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 border-4 border-white/20 flex items-center justify-center">
              {personal_info.photo_url ? (
                <img 
                  src={personal_info.photo_url} 
                  alt={personal_info.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white/50" />
              )}
            </div>
          </div>

          {/* Header Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{personal_info.fullName}</h1>
            <div className="space-y-2 text-blue-50">
              {personal_info.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{personal_info.email}</span>
                </div>
              )}
              {personal_info.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{personal_info.phone}</span>
                </div>
              )}
              {personal_info.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personal_info.location}</span>
                </div>
              )}
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
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {personal_info.summary && (
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-blue-600 font-medium">{exp.company}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-blue-600 font-medium">{edu.institution}</div>
                      <div className="text-sm text-gray-600">
                        {edu.location} • {edu.startDate} - {edu.endDate}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Skills</h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <h3 className="font-semibold text-gray-900 mb-1">{skill.category}</h3>
                      <div className="flex flex-wrap gap-1">
                        {skill.items.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Certifications</h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-semibold text-gray-900">{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1">Languages</h2>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-600 text-sm">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Custom Sections */}
        <CustomSectionRenderer 
          sections={custom_sections}
          headerClassName="text-2xl font-bold text-blue-700 mb-3 border-b-2 border-blue-700 pb-1"
        />
      </div>
    </div>
  );
}
