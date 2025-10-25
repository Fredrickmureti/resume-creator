import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface EdgeTemplateProps {
  data: Resume;
}

const EdgeTemplate: React.FC<EdgeTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none font-sans">
      {/* Angular header with sharp geometric design */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden print:bg-slate-900" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 opacity-10 transform rotate-45 translate-x-32 -translate-y-32 print:hidden"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500 opacity-10 transform -rotate-45 -translate-x-24 translate-y-24 print:hidden"></div>
        
        <div className="relative p-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-16 bg-cyan-400 transform -skew-x-12 print:transform-none print:w-1"></div>
            <h1 className="text-5xl font-black tracking-tight print:text-4xl">{data.personal_info.fullName}</h1>
          </div>
          
          {data.personal_info.summary && (
            <p className="text-slate-300 text-lg ml-6 max-w-3xl">{data.personal_info.summary}</p>
          )}
        </div>
      </div>

      {/* Angular contact strip */}
      <div className="bg-cyan-500 text-white py-4 px-10 flex justify-between items-center transform -skew-x-2 print:transform-none print:bg-slate-100 print:text-slate-900 print:border-y print:border-slate-300" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
        <div className="flex gap-6 text-sm transform skew-x-2 print:transform-none print:text-slate-900">
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
        </div>
        {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
          <div className="transform skew-x-2 print:transform-none">
            <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-white print:text-slate-900" />
          </div>
        )}
      </div>

      <div className="p-10">
        <div className="grid grid-cols-3 gap-8">
          {/* Main content - 2 columns */}
          <div className="col-span-2 space-y-8">
            {/* Experience with angular accents */}
            {data.experience.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-cyan-500 transform -skew-x-12 print:transform-none"></div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wide print:text-2xl">Experience</h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-cyan-500 to-transparent print:bg-slate-300"></div>
                </div>
                
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 print:pl-4">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-slate-200 print:bg-cyan-500"></div>
                      
                      <div className="bg-slate-50 p-5 border-l-4 border-cyan-500 hover:border-slate-900 transition-colors print:bg-white print:border-l-2">
                        <div className="flex justify-between items-start mb-3 print:flex-col print:gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 print:text-lg">
                              <ChevronRight className="w-5 h-5 text-cyan-500 print:w-4 print:h-4" />
                              {exp.position}
                            </h3>
                            <div className="text-cyan-600 font-semibold ml-7 print:ml-6">{exp.company}</div>
                            <div className="text-sm text-slate-600 ml-7 print:ml-6">{exp.location}</div>
                          </div>
                          <div className="text-sm text-white bg-slate-900 px-4 py-2 transform -skew-x-6 print:transform-none print:bg-slate-200 print:text-slate-900 print:px-3 print:py-1 print:ml-6" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                            <span className="inline-block transform skew-x-6 print:transform-none">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed ml-7 whitespace-pre-wrap print:ml-6 print:text-sm">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education with angular styling */}
            {data.education.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-cyan-500 transform -skew-x-12 print:transform-none"></div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wide print:text-2xl">Education</h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-cyan-500 to-transparent print:bg-slate-300"></div>
                </div>
                
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="bg-slate-50 p-5 border-l-4 border-cyan-500 print:bg-white print:border-l-2 print:p-4">
                      <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 print:text-base">
                        <ChevronRight className="w-5 h-5 text-cyan-500 print:w-4 print:h-4" />
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-cyan-600 font-semibold ml-7 print:ml-6 print:text-slate-700">{edu.institution}</div>
                      <div className="text-sm text-slate-600 ml-7 print:ml-6">
                        {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-8">
            {/* Skills with angular blocks */}
            {data.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-cyan-500 transform -skew-x-12 print:transform-none"></div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase print:text-xl">Skills</h2>
                </div>
                
                <div className="space-y-4">
                  {data.skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <div className="bg-slate-900 text-white px-4 py-2 mb-2 transform -skew-x-6 print:transform-none print:bg-slate-200 print:text-slate-900" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                        <h3 className="font-bold text-sm transform skew-x-6 print:transform-none">{skillGroup.category}</h3>
                      </div>
                      <div className="space-y-2 pl-4">
                        {skillGroup.items.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 bg-cyan-500 transform rotate-45"></div>
                            {skill}
                          </div>
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
              headerClassName="text-3xl font-black text-slate-900 uppercase tracking-wide mb-6 flex items-center gap-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EdgeTemplate;
