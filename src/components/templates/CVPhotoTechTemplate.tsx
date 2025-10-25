import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoTechTemplateProps {
  resume: Resume;
}

export default function CVPhotoTechTemplate({ resume }: CVPhotoTechTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-[#1e293b] text-white shadow-lg print:shadow-none mx-auto">
      {/* Header */}
      <div className="p-8 bg-gradient-to-r from-[#1e293b] to-[#334155]">
        <div className="flex items-start gap-6">
          {/* Photo with Cyan Glow */}
          <div className="flex-shrink-0">
            {personal_info.photo_url ? (
              <img 
                src={personal_info.photo_url} 
                alt={personal_info.fullName}
                className="w-28 h-28 object-cover rounded-full border-4 border-[#06b6d4] shadow-lg shadow-cyan-500/50"
              />
            ) : (
              <div className="w-28 h-28 bg-slate-700 rounded-full border-4 border-[#06b6d4] shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                <User className="w-16 h-16 text-slate-400" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-[#06b6d4]">{personal_info.fullName}</h1>
            {experience[0]?.position && (
              <p className="text-xl text-cyan-200 mb-4 font-mono">{experience[0].position}</p>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#06b6d4]" />
                <span>{personal_info.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#06b6d4]" />
                <span>{personal_info.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#06b6d4]" />
                <span>{personal_info.location}</span>
              </div>
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-center gap-2"
                iconClassName="w-4 h-4 text-[#06b6d4]"
                showIcons={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {personal_info.summary && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; ABOUT</h2>
            <p className="text-slate-300 leading-relaxed">{personal_info.summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; TECH_STACK</h2>
            <div className="space-y-3">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-2 font-mono">// {skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="bg-slate-700 text-[#06b6d4] px-3 py-1 rounded text-sm font-mono border border-cyan-900">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-slate-800 p-4 rounded border-l-4 border-[#06b6d4]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-white">{exp.position}</h3>
                      <p className="text-slate-400 text-sm">{exp.company} | {exp.location}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap font-mono">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; PROJECTS</h2>
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800 p-4 rounded border border-cyan-900">
                  <h3 className="font-bold text-[#06b6d4] mb-1">{project.name}</h3>
                  <p className="text-slate-300 text-sm mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs text-cyan-300 font-mono">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; EDUCATION</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{edu.degree} in {edu.field}</h3>
                    <p className="text-slate-400 text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; CERTIFICATIONS</h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="text-white font-semibold">{cert.name}</span>
                  <p className="text-slate-400 text-xs">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#06b6d4] mb-3 font-mono">&gt; LANGUAGES</h2>
            <div className="flex gap-4">
              {languages.map((lang) => (
                <span key={lang.id} className="text-slate-300 text-sm">
                  {lang.name} <span className="text-slate-500">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <CustomSectionRenderer sections={custom_sections} headerClassName="text-xl font-bold text-[#06b6d4] mb-3 font-mono" itemClassName="space-y-4" />
      </div>
    </div>
  );
}
