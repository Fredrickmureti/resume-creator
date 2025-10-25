import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface CascadeTemplateProps {
  data: Resume;
}

const CascadeTemplate: React.FC<CascadeTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none font-sans">
      {/* Cascading header with waterfall effect */}
      <div className="relative overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-10 pl-8">
          <h1 className="text-5xl font-bold mb-3">{data.personal_info.fullName}</h1>
          {data.personal_info.summary && (
            <p className="text-teal-50 text-lg max-w-3xl">{data.personal_info.summary}</p>
          )}
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white py-4 px-10 pl-16">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {data.personal_info.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {data.personal_info.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {data.personal_info.location}
            </div>
            {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
              <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-white" />
            )}
          </div>
        </div>
      </div>

      <div className="px-10 pb-10">
        {/* Cascading staggered layout */}
        <div className="space-y-8">
          {/* Experience - flowing cascade */}
          {data.experience.length > 0 && (
            <div className="relative">
              <div className="bg-teal-500 text-white py-3 px-6 inline-block mb-6 rounded-r-full">
                <h2 className="text-2xl font-bold uppercase tracking-wide">Professional Experience</h2>
              </div>
              
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div 
                    key={exp.id} 
                    className="relative"
                    style={{ marginLeft: `${(idx % 3) * 2}rem` }}
                  >
                    <div className="bg-gradient-to-r from-teal-50 to-white p-6 rounded-lg border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                          <div className="text-teal-600 font-semibold">{exp.company} | {exp.location}</div>
                        </div>
                        <div className="text-sm text-white bg-teal-600 px-4 py-2 rounded-full whitespace-nowrap">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - cascading boxes */}
          {data.skills.length > 0 && (
            <div className="relative mt-12">
              <div className="bg-teal-500 text-white py-3 px-6 inline-block mb-6 rounded-r-full ml-8">
                <h2 className="text-2xl font-bold uppercase tracking-wide">Skills & Expertise</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {data.skills.map((skillGroup, idx) => (
                  <div 
                    key={skillGroup.id}
                    className="bg-gradient-to-br from-teal-50 to-white p-5 rounded-lg border-t-4 border-teal-500 shadow-sm"
                    style={{ marginTop: `${(idx % 3) * 1}rem` }}
                  >
                    <h3 className="font-bold text-teal-700 mb-3 text-lg">{skillGroup.category}</h3>
                    <div className="space-y-2">
                      {skillGroup.items.map((skill, skillIdx) => (
                        <div key={skillIdx} className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education - cascading flow */}
          {data.education.length > 0 && (
            <div className="relative mt-12">
              <div className="bg-teal-500 text-white py-3 px-6 inline-block mb-6 rounded-r-full ml-16">
                <h2 className="text-2xl font-bold uppercase tracking-wide">Education</h2>
              </div>
              
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div 
                    key={edu.id}
                    className="bg-gradient-to-r from-teal-50 to-white p-5 rounded-lg border-l-4 border-teal-500 shadow-sm"
                    style={{ marginLeft: `${(idx % 2) * 3}rem` }}
                  >
                    <h3 className="font-bold text-slate-900 text-lg">{edu.degree} in {edu.field}</h3>
                    <div className="text-teal-600 font-semibold">{edu.institution}</div>
                    <div className="text-sm text-slate-600">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {data.custom_sections && data.custom_sections.length > 0 && (
            <div className="relative mt-12">
              <div className="bg-teal-500 text-white py-3 px-6 inline-block mb-6 rounded-r-full ml-24">
                <h2 className="text-2xl font-bold uppercase tracking-wide">Additional Information</h2>
              </div>
              <CustomSectionRenderer 
                sections={data.custom_sections}
                headerClassName="text-2xl font-bold text-teal-600 uppercase tracking-wide mb-6"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CascadeTemplate;
