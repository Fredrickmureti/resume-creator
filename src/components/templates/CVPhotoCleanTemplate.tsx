import { Resume } from '../../types/resume';
import { User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoCleanTemplateProps {
  resume: Resume;
}

export default function CVPhotoCleanTemplate({ resume }: CVPhotoCleanTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto p-12">
      {/* Ultra-minimal header */}
      <div className="flex items-start gap-8 mb-10 pb-8 border-b border-gray-200">
        {/* Minimal photo */}
        {personal_info.photo_url ? (
          <img 
            src={personal_info.photo_url} 
            alt={personal_info.fullName}
            className="w-24 h-24 object-cover rounded-full grayscale"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-300" />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-4xl font-light text-gray-900 mb-2">{personal_info.fullName}</h1>
          {experience[0]?.position && (
            <p className="text-lg text-gray-500 mb-4 font-light">{experience[0].position}</p>
          )}
          
          {/* Minimal contact */}
          <div className="flex gap-8 text-sm text-gray-600 font-light">
            <span>{personal_info.email}</span>
            <span>{personal_info.phone}</span>
            <span>{personal_info.location}</span>
          </div>
          
          <div className="mt-2">
            <SocialLinks 
              socialLinks={personal_info.socialLinks}
              linkedin={personal_info.linkedin}
              website={personal_info.website}
              className="flex items-center gap-4"
              iconClassName="w-4 h-4 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {personal_info.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed font-light">{personal_info.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                    <div className="text-gray-600">{exp.company} • {exp.location}</div>
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-light whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <div className="text-gray-600 text-sm">{edu.institution} • {edu.startDate} – {edu.endDate}</div>
                {edu.gpa && <div className="text-sm text-gray-500">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest">Skills</h2>
          {skills.map((skillGroup) => (
            <div key={skillGroup.id} className="mb-3">
              <span className="text-gray-900 font-semibold text-sm">{skillGroup.category}: </span>
              <span className="text-gray-600 text-sm font-light">{skillGroup.items.join(' • ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Additional Sections in Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <div className="font-semibold text-gray-900">{cert.name}</div>
                  <div className="text-gray-600 font-light">{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-sm">
                  <span className="text-gray-900">{lang.name}</span>
                  <span className="text-gray-600 font-light">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                <p className="text-gray-700 text-sm font-light whitespace-pre-wrap">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {custom_sections && custom_sections.length > 0 && (
        <div className="mt-8">
          <CustomSectionRenderer 
            sections={custom_sections}
            headerClassName="text-lg font-normal text-gray-900 mb-4 uppercase tracking-widest"
          />
        </div>
      )}
    </div>
  );
}
