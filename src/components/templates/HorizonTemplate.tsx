import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface HorizonTemplateProps {
  data: Resume;
}

const HorizonTemplate: React.FC<HorizonTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white p-8 shadow-lg print:shadow-none font-sans">
      {/* Wide horizontal header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 print:bg-sky-600 text-white py-8 px-10 rounded-lg mb-6">
        <h1 className="text-5xl font-bold mb-3">{data.personal_info.fullName}</h1>
        {data.personal_info.summary && (
          <p className="text-lg text-sky-50 max-w-4xl">{data.personal_info.summary}</p>
        )}
      </div>

      {/* Horizontal contact strip */}
      <div className="flex justify-between items-center bg-sky-50 py-4 px-10 rounded-lg mb-8 border-l-4 border-sky-500">
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-600" />
            <span className="text-slate-700">{data.personal_info.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-sky-600" />
            <span className="text-slate-700">{data.personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span className="text-slate-700">{data.personal_info.location}</span>
          </div>
        </div>
        {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
          <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-sky-600" />
        )}
      </div>

      {/* Content sections - wide horizontal emphasis */}
      <div className="space-y-6">
        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <div className="bg-sky-500 text-white py-3 px-6 rounded-lg mb-4">
              <h2 className="text-2xl font-bold">PROFESSIONAL EXPERIENCE</h2>
            </div>
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-slate-50 p-6 rounded-lg mb-4 border-l-4 border-sky-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                    <div className="text-sky-600 font-semibold">{exp.company} | {exp.location}</div>
                  </div>
                  <div className="text-sm text-slate-600 bg-white px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills - Horizontal layout */}
        {data.skills.length > 0 && (
          <div>
            <div className="bg-sky-500 text-white py-3 px-6 rounded-lg mb-4">
              <h2 className="text-2xl font-bold">SKILLS & EXPERTISE</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {data.skills.map((skillGroup) => (
                <div key={skillGroup.id} className="bg-sky-50 p-4 rounded-lg">
                  <h3 className="font-bold text-sky-700 mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-white text-slate-700 px-2 py-1 rounded border border-sky-200">
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
        {data.education.length > 0 && (
          <div>
            <div className="bg-sky-500 text-white py-3 px-6 rounded-lg mb-4">
              <h2 className="text-2xl font-bold">EDUCATION</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-4 rounded-lg border-l-4 border-sky-500">
                  <h3 className="font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                  <div className="text-sky-600 font-semibold">{edu.institution}</div>
                  <div className="text-sm text-slate-600">{edu.startDate} - {edu.endDate}</div>
                  {edu.gpa && <div className="text-sm text-slate-700 mt-1">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {data.custom_sections && data.custom_sections.length > 0 && (
          <CustomSectionRenderer 
            sections={data.custom_sections}
            headerClassName="bg-sky-500 text-white py-3 px-6 rounded-lg mb-4 text-2xl font-bold"
          />
        )}
      </div>
    </div>
  );
};

export default HorizonTemplate;
