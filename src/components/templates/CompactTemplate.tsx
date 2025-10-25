import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CompactTemplateProps {
  resume: Resume;
}

export default function CompactTemplate({ resume }: CompactTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto p-6 text-sm">
      {/* Compact Header */}
      <div className="mb-4 pb-3 border-b-2 border-[#14b8a6]">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personal_info.fullName}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>{personal_info.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>{personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{personal_info.location}</span>
          </div>
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-1"
            iconClassName="w-3 h-3"
          />
        </div>
      </div>

      {/* Summary */}
      {personal_info.summary && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#14b8a6] mb-1 uppercase">Summary</h2>
          <p className="text-gray-700 leading-tight">{personal_info.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-4">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5">
                Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-600 whitespace-nowrap ml-2">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">{exp.company} | {exp.location}</p>
                    <p className="text-xs text-gray-700 leading-snug whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-sm">{edu.degree} in {edu.field}</h3>
                      <span className="text-xs text-gray-600 whitespace-nowrap ml-2">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">{edu.institution} | {edu.location}</p>
                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5">
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                    <p className="text-xs text-gray-700 leading-snug mb-0.5">{project.description}</p>
                    <p className="text-xs text-gray-600">Tech: {project.technologies.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-4">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5">
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.id}>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillGroup.items.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-gray-900 text-xs">{cert.name}</h3>
                    <p className="text-xs text-gray-700">{cert.issuer}</p>
                    <p className="text-xs text-gray-600">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <span className="font-semibold text-gray-900">{lang.name}</span>
                    <span className="text-gray-600"> - {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Sections - Full Width */}
      <div className="mt-4">
        <CustomSectionRenderer
          sections={custom_sections}
          headerClassName="text-base font-bold text-[#14b8a6] mb-2 uppercase border-b border-[#14b8a6] pb-0.5"
          itemClassName="space-y-2"
        />
      </div>
    </div>
  );
}
