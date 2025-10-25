import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoBusinessTemplateProps {
  resume: Resume;
}

export default function CVPhotoBusinessTemplate({ resume }: CVPhotoBusinessTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto flex">
      {/* Left Sidebar - 35% Dark */}
      <div className="w-[35%] bg-[#374151] text-white p-6">
        {/* Photo */}
        <div className="mb-6">
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <User className="w-20 h-20 text-gray-400" />
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-gray-500">CONTACT</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="break-all">{personal_info.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{personal_info.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{personal_info.location}</span>
            </div>
            <SocialLinks 
              socialLinks={personal_info.socialLinks}
              linkedin={personal_info.linkedin}
              website={personal_info.website}
              className="flex items-start gap-2"
              iconClassName="w-4 h-4 mt-0.5 flex-shrink-0"
            />
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-gray-500">SKILLS</h2>
            <div className="space-y-3">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <h3 className="text-sm font-semibold mb-2 text-gray-300">{skillGroup.category}</h3>
                  <div className="space-y-1">
                    {skillGroup.items.map((skill, idx) => (
                      <div key={idx} className="text-sm text-gray-200">• {skill}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-gray-500">LANGUAGES</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <div className="font-semibold">{lang.name}</div>
                  <div className="text-gray-300 text-xs">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content - 65% */}
      <div className="w-[65%] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal_info.fullName}</h1>
          {experience[0]?.position && (
            <p className="text-xl text-gray-600">{experience[0].position}</p>
          )}
        </div>

        {/* Summary */}
        {personal_info.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-[#374151]">
              PROFILE
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-[#374151]">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-[#374151]">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution} • {edu.location}</p>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-[#374151]">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-[#374151]">
              PROJECTS
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-1">{project.description}</p>
                  <p className="text-sm text-gray-600">
                    Technologies: {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        <CustomSectionRenderer
          sections={custom_sections}
          headerClassName="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-[#374151]"
          itemClassName="space-y-3"
        />
      </div>
    </div>
  );
}
