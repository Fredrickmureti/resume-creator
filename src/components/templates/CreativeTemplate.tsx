import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Award, Languages } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CreativeTemplateProps {
  resume: Resume;
}

export default function CreativeTemplate({ resume }: CreativeTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 w-full max-w-[210mm] mx-auto shadow-2xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3">{personal_info.fullName || 'Your Name'}</h1>
          <div className="grid grid-cols-2 gap-3 text-sm">
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
            />
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {personal_info.summary && (
          <section className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-orange-600" />
              </div>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-orange-600" />
              </div>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className={idx > 0 ? 'pt-4 border-t border-orange-100' : ''}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                      <p className="text-orange-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.location}</p>
                    </div>
                    <span className="text-sm text-white bg-orange-500 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Now' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {education.length > 0 && (
            <section className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-orange-600" />
                </div>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.field}</p>
                    <p className="text-sm text-orange-600">{edu.institution}</p>
                    <p className="text-xs text-gray-600">
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                  <Code className="w-4 h-4 text-orange-600" />
                </div>
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3 className="font-semibold text-gray-900 mb-1">{skill.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, idx) => (
                        <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {projects.length > 0 && (
          <section className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                <Code className="w-4 h-4 text-orange-600" />
              </div>
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 border-orange-400 pl-4">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <p className="text-xs text-orange-600">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && (
            <section className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-orange-600" />
                </div>
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                    <p className="text-xs text-orange-600">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                  <Languages className="w-4 h-4 text-orange-600" />
                </div>
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 text-sm">{lang.name}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <CustomSectionRenderer
        sections={custom_sections || []}
        headerClassName="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3"
        itemClassName="space-y-4"
      />
    </div>
  );
}
