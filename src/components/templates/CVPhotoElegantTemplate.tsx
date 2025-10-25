import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoElegantTemplateProps {
  resume: Resume;
}

export default function CVPhotoElegantTemplate({ resume }: CVPhotoElegantTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-lg print:shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
      {/* Elegant Header */}
      <div className="bg-gradient-to-b from-amber-50 to-white border-b-2 border-amber-200 p-8">
        <div className="flex items-start gap-8">
          {/* Elegant Photo with Border */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-amber-400 shadow-xl flex items-center justify-center">
                {personal_info.photo_url ? (
                  <img 
                    src={personal_info.photo_url} 
                    alt={personal_info.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-amber-400" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-amber-200" style={{ margin: '-8px' }}></div>
            </div>
          </div>

          {/* Header Text */}
          <div className="flex-1 pt-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {personal_info.fullName}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-200 mb-4"></div>
            
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              {personal_info.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>{personal_info.email}</span>
                </div>
              )}
              {personal_info.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>{personal_info.phone}</span>
                </div>
              )}
              {personal_info.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{personal_info.location}</span>
                </div>
              )}
              {personal_info.linkedin && (
                <SocialLinks 
                  socialLinks={personal_info.socialLinks}
                  linkedin={personal_info.linkedin}
                  website={personal_info.website}
                  className="flex items-center gap-2"
                  iconClassName="w-4 h-4 text-amber-600"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {personal_info.summary && (
          <section>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-900">Professional Profile</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent"></div>
            </div>
            <p className="text-gray-700 leading-relaxed italic">{personal_info.summary}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Professional Experience</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent"></div>
                </div>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-amber-700 font-semibold italic">{exp.company}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Notable Projects</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent"></div>
                </div>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border-l-2 border-amber-300 pl-4">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-amber-50 text-amber-800 text-xs border border-amber-200 rounded">
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Education</h2>
                  <div className="flex-1 h-px bg-amber-200"></div>
                </div>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-b border-amber-100 pb-3 last:border-0">
                      <div className="font-bold text-gray-900">{edu.degree}</div>
                      <div className="text-sm text-gray-700">{edu.field}</div>
                      <div className="text-sm text-amber-700 italic">{edu.institution}</div>
                      <div className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</div>
                      {edu.gpa && <div className="text-xs text-gray-600">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                  <div className="flex-1 h-px bg-amber-200"></div>
                </div>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <h3 className="font-semibold text-amber-800 mb-1">{skill.category}</h3>
                      <div className="space-y-1">
                        {skill.items.map((item, index) => (
                          <div key={index} className="text-sm text-gray-700">• {item}</div>
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
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
                  <div className="flex-1 h-px bg-amber-200"></div>
                </div>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-sm">
                      <div className="font-semibold text-gray-900">{cert.name}</div>
                      <div className="text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-amber-600">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Languages</h2>
                  <div className="flex-1 h-px bg-amber-200"></div>
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
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
          headerClassName="text-2xl font-bold text-gray-900 mb-3 border-b border-amber-200 pb-2"
        />
      </div>
    </div>
  );
}
