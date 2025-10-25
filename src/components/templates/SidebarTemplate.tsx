import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface SidebarTemplateProps {
  data: Resume;
}

const SidebarTemplate: React.FC<SidebarTemplateProps> = ({ data }) => {
  const photoUrl = data.personal_info.photo_url;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none font-sans text-gray-900 flex">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8 flex-shrink-0">
        {photoUrl && (
          <div className="mb-6">
            <img 
              src={photoUrl} 
              alt={data.personal_info.fullName}
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white/30 shadow-xl"
            />
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{data.personal_info.fullName}</h1>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="break-all">{data.personal_info.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{data.personal_info.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{data.personal_info.location}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Connect</h3>
            <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-white" />
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Skills</h3>
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.id} className="mb-4">
                <h4 className="text-xs font-semibold mb-2 text-white/90">{skillGroup.category}</h4>
                <div className="space-y-1">
                  {skillGroup.items.map((skill, idx) => (
                    <div key={idx} className="text-sm bg-white/10 backdrop-blur-sm px-2 py-1 rounded">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Languages</h3>
            {data.languages.map((language) => (
              <div key={language.id} className="mb-2 text-sm">
                <div className="font-medium">{language.name}</div>
                <div className="text-xs text-white/70">{language.proficiency}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Certifications</h3>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-3 text-sm">
                <div className="font-medium">{cert.name}</div>
                <div className="text-xs text-white/70">{cert.issuer}</div>
                <div className="text-xs text-white/60">{cert.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Summary */}
        {data.personal_info.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-indigo-600">About Me</h2>
            <p className="text-gray-600 leading-relaxed">{data.personal_info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-600">
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <div className="text-indigo-600 font-medium">{exp.company} • {exp.location}</div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap ml-4 bg-gray-100 px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-600">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-5">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{edu.degree} in {edu.field}</h3>
                    <div className="text-indigo-600 font-medium">{edu.institution} • {edu.location}</div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap ml-4 bg-gray-100 px-3 py-1 rounded">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.gpa && <p className="text-sm text-gray-700 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-600">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {data.custom_sections && data.custom_sections.length > 0 && (
          <div className="mb-8">
            <CustomSectionRenderer 
              sections={data.custom_sections}
              headerClassName="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-600"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarTemplate;
