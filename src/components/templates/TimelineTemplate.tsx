import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Circle } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface TimelineTemplateProps {
  data: Resume;
}

const TimelineTemplate: React.FC<TimelineTemplateProps> = ({ data }) => {
  const photoUrl = data.personal_info.photo_url;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white p-12 shadow-lg print:shadow-none font-sans text-gray-900">
      {/* Header */}
      <div className="text-center mb-10 pb-8 border-b-2 border-blue-600">
        {photoUrl && (
          <img 
            src={photoUrl} 
            alt={data.personal_info.fullName}
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{data.personal_info.fullName}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>{data.personal_info.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{data.personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{data.personal_info.location}</span>
          </div>
        </div>

        {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
          <div className="flex justify-center">
            <SocialLinks socialLinks={data.personal_info.socialLinks} />
          </div>
        )}

        {data.personal_info.summary && (
          <p className="text-gray-600 leading-relaxed mt-4 max-w-3xl mx-auto">{data.personal_info.summary}</p>
        )}
      </div>

      {/* Experience - Timeline Style */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>
          <div className="relative pl-8 border-l-4 border-blue-600">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[42px] w-8 h-8 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center">
                  <Circle className="w-3 h-3 fill-white text-white" />
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-blue-700 font-semibold">{exp.company} • {exp.location}</div>
                    </div>
                    <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education - Timeline Style */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
          <div className="relative pl-8 border-l-4 border-green-600">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[42px] w-8 h-8 rounded-full bg-green-600 border-4 border-white flex items-center justify-center">
                  <Circle className="w-3 h-3 fill-white text-white" />
                </div>
                <div className="bg-green-50 p-5 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-green-700 font-semibold">{edu.institution} • {edu.location}</div>
                    </div>
                    <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.id} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Sections Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Certifications</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-3 pb-3 border-b border-gray-200 last:border-0">
                <div className="font-semibold text-gray-900">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.issuer}</div>
                <div className="text-sm text-gray-500">{cert.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Languages</h2>
            {data.languages.map((language) => (
              <div key={language.id} className="mb-3">
                <div className="font-semibold text-gray-900">{language.name}</div>
                <div className="text-sm text-gray-600">{language.proficiency}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Sections */}
      {data.custom_sections && data.custom_sections.length > 0 && (
        <div className="mb-8">
          <CustomSectionRenderer 
            sections={data.custom_sections}
            headerClassName="text-2xl font-bold text-gray-900 mb-4"
          />
        </div>
      )}
    </div>
  );
};

export default TimelineTemplate;
