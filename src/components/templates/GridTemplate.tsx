import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface GridTemplateProps {
  data: Resume;
}

const GridTemplate: React.FC<GridTemplateProps> = ({ data }) => {
  const photoUrl = data.personal_info.photo_url;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-gradient-to-br from-slate-50 to-blue-50 p-8 shadow-lg print:shadow-none font-sans text-gray-900">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
        <div className="flex items-start gap-6">
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={data.personal_info.fullName}
              className="w-28 h-28 rounded-xl object-cover border-4 border-blue-100"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{data.personal_info.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{data.personal_info.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{data.personal_info.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{data.personal_info.location}</span>
              </div>
            </div>
            {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
              <SocialLinks socialLinks={data.personal_info.socialLinks} />
            )}
          </div>
        </div>
        {data.personal_info.summary && (
          <p className="text-gray-600 leading-relaxed mt-4 pt-4 border-t border-gray-100">
            {data.personal_info.summary}
          </p>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Experience - Spans 2 columns */}
        {data.experience.length > 0 && (
          <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5 pb-5 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <div className="text-blue-600 font-medium text-sm">{exp.company} • {exp.location}</div>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills - Spans 1 column */}
        {data.skills.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              Skills
            </h2>
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.id} className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{skillGroup.category}</h3>
                <div className="space-y-1.5">
                  {skillGroup.items.map((skill, idx) => (
                    <div key={idx} className="text-sm bg-blue-50 px-3 py-1.5 rounded-lg text-gray-700">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education - Spans 2 columns */}
        {data.education.length > 0 && (
          <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <div className="text-blue-600 font-medium text-sm">{edu.institution} • {edu.location}</div>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Languages - Spans 1 column */}
        <div className="space-y-4">
          {data.certifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                Certifications
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                  <div className="text-xs text-gray-600">{cert.issuer}</div>
                  <div className="text-xs text-gray-500">{cert.date}</div>
                </div>
              ))}
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                Languages
              </h2>
              {data.languages.map((language) => (
                <div key={language.id} className="mb-2">
                  <div className="font-semibold text-gray-900 text-sm">{language.name}</div>
                  <div className="text-xs text-gray-600">{language.proficiency}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects - Spans 3 columns */}
        {data.projects.length > 0 && (
          <div className="col-span-3 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((project) => (
                <div key={project.id} className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-white text-blue-700 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections - Spans 3 columns */}
        {data.custom_sections && data.custom_sections.length > 0 && (
          <div className="col-span-3 bg-white rounded-2xl shadow-md p-6">
            <CustomSectionRenderer 
              sections={data.custom_sections}
              headerClassName="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridTemplate;
