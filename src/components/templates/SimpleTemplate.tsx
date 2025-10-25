import { Resume } from '../../types/resume';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface SimpleTemplateProps {
  resume: Resume;
}

export default function SimpleTemplate({ resume }: SimpleTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-white w-full max-w-[210mm] mx-auto shadow-2xl p-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personal_info.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          {personal_info.email && <div>{personal_info.email}</div>}
          {personal_info.phone && <div>{personal_info.phone}</div>}
          {personal_info.location && <div>{personal_info.location}</div>}
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            showIcons={false}
          />
        </div>
      </div>

      {personal_info.summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1">{exp.company}, {exp.location}</p>
                <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{edu.institution}, {edu.location}</p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">
            Skills
          </h2>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
                <span className="text-gray-700">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-700">
                  {project.technologies.join(', ')}
                </p>
                {project.link && (
                  <p className="text-sm text-gray-600">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
                <span className="font-semibold text-gray-900">{cert.name}</span>{' '}
                <span className="text-gray-700">- {cert.issuer}, {cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">
            Languages
          </h2>
          <div className="space-y-1">
            {languages.map((lang) => (
              <div key={lang.id} className="text-sm">
                <span className="font-semibold text-gray-900">{lang.name}</span>{' '}
                <span className="text-gray-700">- {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <CustomSectionRenderer
        sections={custom_sections || []}
        headerClassName="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1"
        itemClassName="space-y-2"
      />
    </div>
  );
}
