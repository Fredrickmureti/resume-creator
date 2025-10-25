import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface ExecutiveTemplateProps {
  resume: Resume;
}

export default function ExecutiveTemplate({ resume }: ExecutiveTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-white w-full max-w-[210mm] mx-auto shadow-2xl">
      <div className="border-t-8 border-slate-900 pt-10 px-12 pb-8">
        <h1 className="text-5xl font-bold text-slate-900 mb-2 tracking-tight">
          {personal_info.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
          {personal_info.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <span>{personal_info.email}</span>
            </div>
          )}
          {personal_info.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>{personal_info.phone}</span>
            </div>
          )}
          {personal_info.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{personal_info.location}</span>
            </div>
          )}
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-1.5"
            iconClassName="w-4 h-4"
          />
        </div>

        {personal_info.summary && (
          <div className="border-l-4 border-slate-900 pl-6 mb-8">
            <p className="text-slate-700 leading-relaxed text-base">{personal_info.summary}</p>
          </div>
        )}
      </div>

      <div className="px-12 pb-12 space-y-8">
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                      <p className="text-lg text-slate-700">{exp.company}</p>
                      <p className="text-sm text-slate-600">{exp.location}</p>
                    </div>
                    <span className="text-sm text-slate-600 font-medium whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-slate-700">{edu.institution}</p>
                    <p className="text-sm text-slate-600">{edu.location}</p>
                    {edu.gpa && <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-slate-600 font-medium whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider">
                Key Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3 className="font-bold text-slate-900 mb-1">{skill.category}</h3>
                    <p className="text-slate-700">{skill.items.join(' • ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-semibold text-slate-900">{lang.name}</span>
                    <span className="text-slate-700">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-bold text-slate-900">{cert.name}</h3>
                  <p className="text-slate-700">{cert.issuer}</p>
                  <p className="text-sm text-slate-600">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Key Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-slate-900 text-lg">{project.name}</h3>
                  <p className="text-slate-600 mb-2">{project.description}</p>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                  {project.link && (
                    <p className="text-sm text-slate-600">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <CustomSectionRenderer
        sections={custom_sections || []}
        headerClassName="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900"
        itemClassName="space-y-4"
      />
    </div>
  );
}
