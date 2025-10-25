import { Resume } from '../../types/resume';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface AcademicTemplateProps {
  resume: Resume;
}

export default function AcademicTemplate({ resume }: AcademicTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="bg-white w-full max-w-[210mm] mx-auto shadow-2xl p-16">
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
          {personal_info.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && (
            <>
              <span>•</span>
              <span>{personal_info.phone}</span>
            </>
          )}
          {personal_info.location && (
            <>
              <span>•</span>
              <span>{personal_info.location}</span>
            </>
          )}
        </div>
        <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-600 mt-2">
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
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase">
            Research Interests
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{personal_info.summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700 italic">{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
            Academic & Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 italic">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-line mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
            Research & Publications
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm italic mb-1">{project.description}</p>
                {project.link && (
                  <p className="text-sm text-gray-500">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
            Skills & Expertise
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

      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
            Awards & Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <span className="font-semibold text-gray-900">{cert.name}</span>
                <span className="text-gray-700"> - {cert.issuer}, {cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase border-b border-gray-300 pb-2">
            Languages
          </h2>
          <div className="flex flex-wrap gap-6">
            {languages.map((lang) => (
              <div key={lang.id}>
                <span className="font-semibold text-gray-900">{lang.name}</span>
                <span className="text-gray-700"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      <CustomSectionRenderer
        sections={custom_sections || []}
        headerClassName="text-lg font-serif font-bold text-gray-900 mb-3 border-b border-gray-400 pb-1"
        itemClassName="space-y-3"
      />
    </div>
  );
}
