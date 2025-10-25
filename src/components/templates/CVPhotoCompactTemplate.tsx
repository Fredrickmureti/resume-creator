import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoCompactTemplateProps {
  resume: Resume;
}

export default function CVPhotoCompactTemplate({ resume }: CVPhotoCompactTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto p-8 text-sm">
      {/* Compact header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-300">
        {personal_info.photo_url ? (
          <img 
            src={personal_info.photo_url} 
            alt={personal_info.fullName}
            className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{personal_info.fullName}</h1>
          {experience[0]?.position && (
            <p className="text-base text-gray-600 font-semibold">{experience[0].position}</p>
          )}
        </div>

        <div className="text-right text-xs text-gray-600 space-y-1">
          <div className="flex items-center justify-end gap-1">
            <Mail className="w-3 h-3" />
            {personal_info.email}
          </div>
          <div className="flex items-center justify-end gap-1">
            <Phone className="w-3 h-3" />
            {personal_info.phone}
          </div>
          <div className="flex items-center justify-end gap-1">
            <MapPin className="w-3 h-3" />
            {personal_info.location}
          </div>
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center justify-end gap-2 mt-1"
            iconClassName="w-3 h-3"
          />
        </div>
      </div>

      {/* Compact grid layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* Main content - 3 columns */}
        <div className="col-span-3 space-y-4">
          {personal_info.summary && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-1 uppercase">Summary</h2>
              <p className="text-gray-700 leading-snug">{personal_info.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">Experience</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-gray-700 font-semibold">{exp.company} | {exp.location}</div>
                    <p className="text-gray-600 leading-snug whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">Education</h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <div className="text-gray-700">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
                    {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">Projects</h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 leading-snug whitespace-pre-wrap">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-4">
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">Skills</h2>
              {skills.map((skillGroup) => (
                <div key={skillGroup.id} className="mb-2">
                  <h3 className="font-bold text-gray-900 text-xs mb-1">{skillGroup.category}</h3>
                  <div className="space-y-0.5">
                    {skillGroup.items.map((skill, idx) => (
                      <div key={idx} className="text-xs text-gray-700">• {skill}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-bold text-gray-900">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}</div>
                    <div className="text-gray-500">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">Languages</h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-xs">
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {custom_sections && custom_sections.length > 0 && (
        <div className="mt-4">
          <CustomSectionRenderer 
            sections={custom_sections}
            headerClassName="text-base font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1"
          />
        </div>
      )}
    </div>
  );
}
