import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoProfessionalTemplateProps {
  resume: Resume;
}

export default function CVPhotoProfessionalTemplate({ resume }: CVPhotoProfessionalTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-lg print:shadow-none" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="bg-slate-800 text-white p-8">
        <div className="flex items-start gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-lg overflow-hidden bg-white/10 border-2 border-white/30 flex items-center justify-center">
              {personal_info.photo_url ? (
                <img 
                  src={personal_info.photo_url} 
                  alt={personal_info.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-14 h-14 text-white/50" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>{personal_info.fullName}</h1>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-200">
              {personal_info.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>{personal_info.email}</span>
                </div>
              )}
              {personal_info.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{personal_info.phone}</span>
                </div>
              )}
              {personal_info.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{personal_info.location}</span>
                </div>
              )}
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-center gap-2"
                iconClassName="w-3 h-3"
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
            <h2 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide border-b border-slate-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-gray-700 font-medium">{exp.company}, {exp.location}</div>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-gray-700">{edu.institution}, {edu.location}</div>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
              Skills & Competencies
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
                  <span className="text-gray-700">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
              Notable Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages in two columns */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-semibold text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-gray-600"> - {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        <CustomSectionRenderer 
          sections={custom_sections}
          headerClassName="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide border-b border-slate-300 pb-1"
        />
      </div>
    </div>
  );
}
