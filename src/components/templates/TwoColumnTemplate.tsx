import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface TwoColumnTemplateProps {
  data: Resume;
}

const TwoColumnTemplate: React.FC<TwoColumnTemplateProps> = ({ data }) => {
  const photoUrl = data.personal_info.photo_url;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white p-8 shadow-lg print:shadow-none font-sans text-gray-900">
      <div className="grid grid-cols-[300px_1fr] gap-0">
        {/* Left Column - Sidebar */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8 -ml-8 -mt-8 -mb-8">
          {/* Photo */}
          {photoUrl && (
            <div className="mb-6">
              <img 
                src={photoUrl} 
                alt={data.personal_info.fullName}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20"
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-300">Contact</h3>
            <div className="space-y-2 text-sm">
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
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-300">Connect</h3>
              <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-white" />
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-300">Skills</h3>
              {data.skills.map((skillGroup) => (
                <div key={skillGroup.id} className="mb-3">
                  <h4 className="text-xs font-semibold mb-1.5 text-slate-400">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-300">Languages</h3>
              {data.languages.map((language) => (
                <div key={language.id} className="mb-2 text-sm">
                  <div className="font-medium">{language.name}</div>
                  <div className="text-xs text-slate-400">{language.proficiency}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-300">Certifications</h3>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3 text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-xs text-slate-400">{cert.issuer}</div>
                  <div className="text-xs text-slate-500">{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="pl-8 pr-2">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{data.personal_info.fullName}</h1>
            {data.personal_info.summary && (
              <p className="text-slate-600 leading-relaxed">{data.personal_info.summary}</p>
            )}
          </div>

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-800">
                Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <div className="text-slate-700">{exp.company} • {exp.location}</div>
                    </div>
                    <div className="text-sm text-slate-600 text-right whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-800">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-slate-700">{edu.institution} • {edu.location}</div>
                    </div>
                    <div className="text-sm text-slate-600 text-right whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-800">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{project.name}</h3>
                    <div className="text-sm text-slate-600 text-right whitespace-nowrap ml-4">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
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
            <div className="mb-6">
              <CustomSectionRenderer 
                sections={data.custom_sections}
                headerClassName="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-800"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnTemplate;
