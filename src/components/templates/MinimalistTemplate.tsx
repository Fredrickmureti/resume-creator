import { Resume } from '../../types/resume';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface MinimalistTemplateProps {
  resume: Resume;
}

export default function MinimalistTemplate({ resume }: MinimalistTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-white w-full max-w-[210mm] mx-auto shadow-2xl p-12">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">
          {personal_info.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>•</span>}
          {personal_info.phone && <span>{personal_info.phone}</span>}
          {personal_info.location && <span>•</span>}
          {personal_info.location && <span>{personal_info.location}</span>}
        </div>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600 mt-1">
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            showIcons={false}
          />
        </div>
      </div>

      {personal_info.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            {personal_info.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-line mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-300 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">
            Skills
          </h2>
          <div className="space-y-2 border-l-2 border-gray-300 pl-6">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
                <span className="text-gray-600">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-gray-300 pl-6">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {project.technologies.join(' • ')}
                </p>
                {project.link && (
                  <p className="text-sm text-gray-500 mt-1">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">
            Certifications
          </h2>
          <div className="space-y-2 border-l-2 border-gray-300 pl-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
                <span className="font-semibold text-gray-900">{cert.name}</span>
                <span className="text-gray-600"> - {cert.issuer}, {cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-widest uppercase">
            Languages
          </h2>
          <div className="flex flex-wrap gap-6 border-l-2 border-gray-300 pl-6">
            {languages.map((lang) => (
              <div key={lang.id} className="text-sm">
                <span className="font-semibold text-gray-900">{lang.name}</span>
                <span className="text-gray-600"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <CustomSectionRenderer
        sections={custom_sections || []}
        headerClassName="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider"
        itemClassName="space-y-2"
      />
    </div>
  );
}
