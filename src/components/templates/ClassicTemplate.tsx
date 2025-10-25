import { Resume } from '../../types/resume';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface ClassicTemplateProps {
  resume: Resume;
}

export default function ClassicTemplate({ resume }: ClassicTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto p-12 font-serif">
      {/* Classic Header - Centered */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{personal_info.fullName}</h1>
        <div className="text-sm text-gray-700 space-y-1">
          <p>{personal_info.email} • {personal_info.phone}</p>
          <p>{personal_info.location}</p>
          <div className="flex gap-2 justify-center items-center">
            <SocialLinks 
              socialLinks={personal_info.socialLinks}
              linkedin={personal_info.linkedin}
              website={personal_info.website}
              showIcons={false}
              className="flex items-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {personal_info.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-center uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{personal_info.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="italic text-gray-700">{exp.company}, {exp.location}</p>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="italic text-gray-700">{edu.institution}, {edu.location}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600">Grade Point Average: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2">
            Skills & Competencies
          </h2>
          <div className="space-y-3">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <span className="font-bold text-gray-900">{skillGroup.category}: </span>
                <span className="text-gray-700">{skillGroup.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2">
            Notable Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-1 text-justify">{project.description}</p>
                <p className="text-sm text-gray-600 italic">
                  Technologies: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  <span className="text-gray-700"> – {cert.issuer}</span>
                </div>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2">
            Languages
          </h2>
          <div className="space-y-1">
            {languages.map((lang) => (
              <p key={lang.id} className="text-gray-700">
                <span className="font-bold">{lang.name}</span> – {lang.proficiency}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      <CustomSectionRenderer
        sections={custom_sections}
        headerClassName="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide border-b border-gray-300 pb-2"
        itemClassName="space-y-4"
      />
    </div>
  );
}
