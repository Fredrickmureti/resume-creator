import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface BoldTemplateProps {
  resume: Resume;
}

export default function BoldTemplate({ resume }: BoldTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto">
      {/* Bold Header */}
      <div className="bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white p-8">
        <h1 className="text-5xl font-black mb-2">{personal_info.fullName}</h1>
        {experience[0]?.position && (
          <p className="text-2xl font-bold text-orange-100">{experience[0].position}</p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>{personal_info.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{personal_info.location}</span>
          </div>
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-1"
            iconClassName="w-4 h-4"
            showIcons={true}
          />
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personal_info.summary && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-3">
              <h2 className="text-2xl font-black">ABOUT ME</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-4">
              <h2 className="text-2xl font-black">EXPERIENCE</h2>
            </div>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-[#f97316] pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-semibold">{exp.company} | {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap font-semibold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-4">
              <h2 className="text-2xl font-black">SKILLS</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <h3 className="text-lg font-bold text-[#f97316] mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="bg-orange-100 text-[#f97316] px-3 py-1 rounded-full text-sm font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-4">
              <h2 className="text-2xl font-black">EDUCATION</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-[#f97316] pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution} | {edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap font-semibold">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-4">
              <h2 className="text-2xl font-black">PROJECTS</h2>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 border-[#f97316] pl-4">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-1">{project.description}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Tech Stack:</span> {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-4">
              <h2 className="text-2xl font-black">CERTIFICATIONS</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-orange-50 p-3 rounded">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  <p className="text-xs text-gray-600">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <div className="bg-[#f97316] text-white px-4 py-2 mb-4">
              <h2 className="text-2xl font-black">LANGUAGES</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <div key={lang.id} className="bg-orange-100 px-4 py-2 rounded-full">
                  <span className="font-bold text-gray-900">{lang.name}</span>
                  <span className="text-gray-600"> - {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        <CustomSectionRenderer
          sections={custom_sections}
          headerClassName="bg-[#f97316] text-white px-4 py-2 mb-4 text-2xl font-black"
          itemClassName="space-y-4"
        />
      </div>
    </div>
  );
}
