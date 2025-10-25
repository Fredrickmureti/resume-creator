import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface VerticalTemplateProps {
  data: Resume;
}

const VerticalTemplate: React.FC<VerticalTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white p-8 shadow-lg print:shadow-none font-sans">
      {/* Header with vertical accent lines */}
      <div className="flex items-start mb-8 border-l-8 border-emerald-500 pl-6">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-slate-900 mb-2">{data.personal_info.fullName}</h1>
          {data.personal_info.summary && (
            <p className="text-slate-600 text-lg mb-4">{data.personal_info.summary}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              {data.personal_info.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              {data.personal_info.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              {data.personal_info.location}
            </div>
          </div>
          {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
            <div className="mt-3">
              <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-emerald-600" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Experience - Strong vertical line emphasis */}
        {data.experience.length > 0 && (
          <div className="border-l-4 border-emerald-500 pl-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6 uppercase tracking-wide">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                  {/* Vertical timeline dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                      <div className="text-emerald-600 font-semibold">{exp.company}</div>
                      <div className="text-sm text-slate-600">{exp.location}</div>
                    </div>
                    <div className="text-sm text-slate-600 bg-emerald-50 px-3 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education - Vertical line emphasis */}
        {data.education.length > 0 && (
          <div className="border-l-4 border-emerald-500 pl-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                  <h3 className="font-bold text-slate-900 text-lg">{edu.degree} in {edu.field}</h3>
                  <div className="text-emerald-600 font-semibold">{edu.institution}</div>
                  <div className="text-sm text-slate-600">
                    {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills - Vertical column layout */}
        {data.skills.length > 0 && (
          <div className="border-l-4 border-emerald-500 pl-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6 uppercase tracking-wide">Skills</h2>
            <div className="grid grid-cols-2 gap-6">
              {data.skills.map((skillGroup) => (
                <div key={skillGroup.id} className="border-l-2 border-emerald-300 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">{skillGroup.category}</h3>
                  <div className="space-y-1">
                    {skillGroup.items.map((skill, idx) => (
                      <div key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {data.custom_sections && data.custom_sections.length > 0 && (
          <div className="border-l-4 border-emerald-500 pl-6">
            <CustomSectionRenderer 
              sections={data.custom_sections}
              headerClassName="text-2xl font-bold text-emerald-600 mb-6 uppercase tracking-wide"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalTemplate;
