import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface MagazineTemplateProps {
  data: Resume;
}

const MagazineTemplate: React.FC<MagazineTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none font-sans">
      {/* Magazine-style Header with large typography */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-12">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-black mb-4 tracking-tight uppercase">{data.personal_info.fullName}</h1>
          {data.personal_info.summary && (
            <p className="text-xl text-slate-200 leading-relaxed border-l-4 border-orange-500 pl-6 italic">
              {data.personal_info.summary}
            </p>
          )}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-orange-500 text-white py-4 px-12">
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{data.personal_info.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{data.personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{data.personal_info.location}</span>
          </div>
          {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
            <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-white" />
          )}
        </div>
      </div>

      {/* Three-column magazine layout */}
      <div className="grid grid-cols-3 gap-8 p-12">
        {/* Column 1 - Experience */}
        <div className="col-span-2 space-y-8">
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-3xl font-black uppercase mb-6 text-slate-900 border-b-4 border-orange-500 pb-2">
                Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-6 pb-6 border-b border-slate-200 last:border-0">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.position}</h3>
                  <div className="text-orange-600 font-semibold mb-1">{exp.company}</div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-3xl font-black uppercase mb-6 text-slate-900 border-b-4 border-orange-500 pb-2">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                  <div className="text-orange-600 font-semibold">{edu.institution}</div>
                  <div className="text-sm text-slate-600">
                    {edu.location} • {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.gpa && <div className="text-sm text-slate-700 mt-1">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2 - Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase mb-4 text-slate-900">Skills</h2>
              {data.skills.map((skillGroup) => (
                <div key={skillGroup.id} className="mb-4">
                  <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-slate-900 text-white px-3 py-1 rounded-full">
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
            <div>
              <h2 className="text-2xl font-black uppercase mb-4 text-slate-900">Languages</h2>
              {data.languages.map((language) => (
                <div key={language.id} className="mb-3">
                  <div className="font-bold text-slate-900">{language.name}</div>
                  <div className="text-sm text-slate-600">{language.proficiency}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase mb-4 text-slate-900">Certifications</h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <div className="font-bold text-slate-900 text-sm">{cert.name}</div>
                  <div className="text-xs text-orange-600">{cert.issuer}</div>
                  <div className="text-xs text-slate-500">{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects - Full width */}
      {data.projects.length > 0 && (
        <div className="px-12 pb-12">
          <h2 className="text-3xl font-black uppercase mb-6 text-slate-900 border-b-4 border-orange-500 pb-2">
            Projects
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-slate-50 p-4 rounded">
                <h3 className="font-bold text-slate-900 mb-2">{project.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {data.custom_sections && data.custom_sections.length > 0 && (
        <div className="px-12 pb-12">
          <CustomSectionRenderer 
            sections={data.custom_sections}
            headerClassName="text-3xl font-black uppercase mb-6 text-slate-900 border-b-4 border-orange-500 pb-2"
          />
        </div>
      )}
    </div>
  );
};

export default MagazineTemplate;
