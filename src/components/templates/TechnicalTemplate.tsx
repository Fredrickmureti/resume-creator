import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Terminal } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface TechnicalTemplateProps {
  resume: Resume;
}

export default function TechnicalTemplate({ resume }: TechnicalTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-slate-900 w-full max-w-[210mm] mx-auto shadow-2xl text-white">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8">
        <div className="flex items-center gap-3 mb-2">
          <Terminal className="w-8 h-8" />
          <h1 className="text-4xl font-bold">{personal_info.fullName || 'Your Name'}</h1>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {personal_info.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{personal_info.email}</span>
            </div>
          )}
          {personal_info.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{personal_info.phone}</span>
            </div>
          )}
          {personal_info.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{personal_info.location}</span>
            </div>
          )}
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-1"
            iconClassName="w-3.5 h-3.5"
          />
        </div>
      </div>

      <div className="p-8 space-y-6">
        {personal_info.summary && (
          <section className="border-l-4 border-green-500 pl-4">
            <p className="text-gray-300 leading-relaxed">{personal_info.summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <span className="text-green-500">&gt;</span> Technical Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-slate-800 rounded p-3">
                  <h3 className="font-semibold text-green-400 mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="bg-slate-700 text-gray-300 px-3 py-1 rounded text-sm font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <span className="text-green-500">&gt;</span> Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-slate-800 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">{exp.position}</h3>
                      <p className="text-green-400">{exp.company}</p>
                      <p className="text-sm text-gray-400">{exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap ml-4 font-mono">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <span className="text-green-500">&gt;</span> Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800 rounded p-4">
                  <h3 className="font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-slate-700 text-green-400 px-2 py-1 rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <p className="text-sm text-green-400 font-mono">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <span className="text-green-500">&gt;</span> Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-800 rounded p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-300">{edu.institution}</p>
                      <p className="text-sm text-gray-400">{edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-400">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap ml-4 font-mono">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span className="text-green-500">&gt;</span> Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="bg-slate-800 rounded p-3">
                      <h3 className="font-semibold text-white text-sm">{cert.name}</h3>
                      <p className="text-xs text-gray-400">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span className="text-green-500">&gt;</span> Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="bg-slate-800 rounded p-3 flex justify-between items-center">
                      <span className="font-semibold text-white text-sm">{lang.name}</span>
                      <span className="text-xs text-green-400">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
      <CustomSectionRenderer
        sections={custom_sections || []}
        headerClassName="text-lg font-mono font-bold text-green-600 mb-3 border-l-4 border-green-600 pl-3"
        itemClassName="space-y-3"
      />
    </div>
  );
}
