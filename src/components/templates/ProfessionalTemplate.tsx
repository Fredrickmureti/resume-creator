import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface ProfessionalTemplateProps {
  resume: Resume;
}

export default function ProfessionalTemplate({ resume }: ProfessionalTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-white w-full max-w-[210mm] mx-auto shadow-2xl">
      <div className="grid grid-cols-[35%_65%]">
        <div className="bg-gray-800 text-white p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6 break-words">{personal_info.fullName || 'Your Name'}</h1>
            <div className="space-y-3 text-sm">
              {personal_info.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{personal_info.email}</span>
                </div>
              )}
              {personal_info.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{personal_info.phone}</span>
                </div>
              )}
              {personal_info.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{personal_info.location}</span>
                </div>
              )}
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-start gap-2"
                iconClassName="w-4 h-4 mt-0.5 flex-shrink-0"
              />
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-600">Skills</h2>
              <div className="space-y-3 text-sm">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3 className="font-semibold mb-1">{skill.category}</h3>
                    <ul className="space-y-1 text-gray-300">
                      {skill.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-600">Languages</h2>
              <div className="space-y-2 text-sm">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <span className="font-semibold">{lang.name}</span>
                    <p className="text-gray-300">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-600">Certifications</h2>
              <div className="space-y-3 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-gray-300">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          {personal_info.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-800">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{personal_info.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-800">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-1">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 text-sm">{exp.company} • {exp.location}</p>
                      <p className="text-xs text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-800">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700 text-sm">{edu.institution} • {edu.location}</p>
                    <p className="text-xs text-gray-600">
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-gray-800">
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Tech:</span> {project.technologies.join(', ')}
                    </p>
                    {project.link && (
                      <p className="text-xs text-gray-600">{project.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          <CustomSectionRenderer
            sections={custom_sections || []}
            headerClassName="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide"
            itemClassName="space-y-3"
          />
        </div>
      </div>
    </div>
  );
}
