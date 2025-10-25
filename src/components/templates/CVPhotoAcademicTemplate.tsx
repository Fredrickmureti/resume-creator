import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoAcademicTemplateProps {
  resume: Resume;
}

export default function CVPhotoAcademicTemplate({ resume }: CVPhotoAcademicTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto p-10">
      {/* Header with Photo */}
      <div className="flex justify-between items-start mb-6 pb-6 border-b-2 border-[#991b1b]">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal_info.fullName}</h1>
          {experience[0]?.position && (
            <p className="text-lg text-gray-600 mb-3">{experience[0].position}</p>
          )}
          
          {/* Contact */}
          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personal_info.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personal_info.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personal_info.location}</span>
            </div>
            <SocialLinks 
              socialLinks={personal_info.socialLinks}
              linkedin={personal_info.linkedin}
              website={personal_info.website}
              className="flex items-center gap-2"
              iconClassName="w-4 h-4"
            />
          </div>
        </div>

        {/* Photo - Small Square in Corner */}
        <div className="ml-6 flex-shrink-0">
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-20 h-20 object-cover rounded border-2 border-[#991b1b]"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded border-2 border-[#991b1b] flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal_info.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
        </div>
      )}

      {/* Education - First for Academic CV */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution}, {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1">
            Academic & Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-1">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="text-gray-700">{exp.company}, {exp.location}</p>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects / Research */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1">
            Research & Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-1">{project.description}</p>
                <p className="text-sm text-gray-600 italic">
                  Methodologies: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1">
            Skills & Expertise
          </h2>
          <div className="space-y-2">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <span className="font-bold text-gray-900">{skillGroup.category}: </span>
                <span className="text-gray-700">{skillGroup.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1">
            Certifications & Awards
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold text-gray-900">{cert.name}</span>
                    <span className="text-gray-700"> - {cert.issuer}</span>
                  </div>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1">
            Languages
          </h2>
          <div className="space-y-1">
            {languages.map((lang) => (
              <p key={lang.id} className="text-gray-700">
                <span className="font-semibold">{lang.name}</span> - {lang.proficiency}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      <CustomSectionRenderer
        sections={custom_sections}
        headerClassName="text-xl font-bold text-[#991b1b] mb-3 border-b border-[#991b1b] pb-1"
        itemClassName="space-y-4"
      />
    </div>
  );
}
