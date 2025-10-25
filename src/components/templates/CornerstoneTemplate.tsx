import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface CornerstoneTemplateProps {
  data: Resume;
}

const CornerstoneTemplate: React.FC<CornerstoneTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none font-sans relative">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-8 border-l-8 border-purple-600"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-purple-600"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-8 border-l-8 border-purple-600"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-8 border-r-8 border-purple-600"></div>

      <div className="p-12">
        {/* Header with corner frame styling */}
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-5xl font-bold text-slate-900 mb-3">{data.personal_info.fullName}</h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
          </div>
          {data.personal_info.summary && (
            <p className="text-slate-600 mt-6 max-w-3xl mx-auto leading-relaxed">{data.personal_info.summary}</p>
          )}
        </div>

        {/* Contact info with corner accent styling */}
        <div className="flex justify-center flex-wrap gap-6 mb-10 text-sm text-slate-700 pb-6 border-b-2 border-purple-100">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-600" />
            {data.personal_info.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-600" />
            {data.personal_info.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            {data.personal_info.location}
          </div>
          {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
            <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-purple-600" />
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left column - 2/3 width */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {data.experience.length > 0 && (
              <div>
                <div className="relative mb-6">
                  <h2 className="text-2xl font-bold text-purple-600 uppercase tracking-wide inline-block">
                    Professional Experience
                  </h2>
                  <div className="absolute -left-3 -top-2 w-6 h-6 border-t-2 border-l-2 border-purple-300"></div>
                </div>
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-purple-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                          <div className="text-purple-600 font-semibold">{exp.company} | {exp.location}</div>
                        </div>
                        <div className="text-sm text-slate-600 bg-purple-50 px-3 py-1 rounded">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <div className="relative mb-6">
                  <h2 className="text-2xl font-bold text-purple-600 uppercase tracking-wide inline-block">
                    Education
                  </h2>
                  <div className="absolute -left-3 -top-2 w-6 h-6 border-t-2 border-l-2 border-purple-300"></div>
                </div>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative pl-4 border-l-2 border-purple-200">
                      <h3 className="font-bold text-slate-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-purple-600 font-semibold">{edu.institution}</div>
                      <div className="text-sm text-slate-600">
                        {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar - 1/3 width */}
          <div className="space-y-8">
            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <div className="relative mb-6">
                  <h2 className="text-xl font-bold text-purple-600 uppercase tracking-wide">
                    Skills
                  </h2>
                  <div className="absolute -right-3 -top-2 w-6 h-6 border-t-2 border-r-2 border-purple-300"></div>
                </div>
                <div className="space-y-4">
                  {data.skills.map((skillGroup) => (
                    <div key={skillGroup.id} className="bg-purple-50 p-4 rounded-lg border-2 border-purple-100">
                      <h3 className="font-bold text-purple-700 mb-2 text-sm">{skillGroup.category}</h3>
                      <div className="space-y-1">
                        {skillGroup.items.map((skill, idx) => (
                          <div key={idx} className="text-xs text-slate-700">• {skill}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Sections */}
        {data.custom_sections && data.custom_sections.length > 0 && (
          <div className="mt-8">
            <CustomSectionRenderer 
              sections={data.custom_sections}
              headerClassName="text-2xl font-bold text-purple-600 uppercase tracking-wide mb-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CornerstoneTemplate;
