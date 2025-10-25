import { Resume } from '../../types/resume';
import { User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoMinimalistTemplateProps {
  resume: Resume;
}

export default function CVPhotoMinimalistTemplate({ resume }: CVPhotoMinimalistTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto p-12">
      {/* Minimal Header with Photo */}
      <div className="flex items-center gap-6 mb-10">
        {/* Photo */}
        {personal_info.photo_url ? (
          <img 
            src={personal_info.photo_url} 
            alt={personal_info.fullName}
            className="w-24 h-24 object-cover rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-300" />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-light text-gray-900 mb-2">{personal_info.fullName}</h1>
          {experience[0]?.position && (
            <p className="text-gray-600 mb-3">{experience[0].position}</p>
          )}
          
          {/* Contact - Minimal */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{personal_info.email}</span>
            <span>•</span>
            <span>{personal_info.phone}</span>
            <span>•</span>
            <span>{personal_info.location}</span>
            <SocialLinks 
              socialLinks={personal_info.socialLinks}
              linkedin={personal_info.linkedin}
              website={personal_info.website}
              className="flex items-center gap-1"
              iconClassName="w-4 h-4"
              showIcons={false}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {personal_info.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600">{edu.institution} • {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4">
            Skills
          </h2>
          <div className="space-y-3">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{skillGroup.category}</h3>
                <p className="text-gray-700">{skillGroup.items.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-1">{project.description}</p>
                <p className="text-sm text-gray-500">{project.technologies.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  <span className="text-gray-600"> • {cert.issuer}</span>
                </div>
                <span className="text-sm text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4">
            Languages
          </h2>
          <p className="text-gray-700">
            {languages.map((lang, idx) => (
              <span key={lang.id}>
                {lang.name} ({lang.proficiency})
                {idx < languages.length - 1 && ' • '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Custom Sections */}
      <CustomSectionRenderer
        sections={custom_sections}
        headerClassName="text-sm font-semibold text-[#60a5fa] uppercase tracking-wider mb-4"
        itemClassName="space-y-4"
      />
    </div>
  );
}
