import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Circle } from 'lucide-react';
import SocialLinks from './SocialLinks';
import CustomSectionRenderer from './CustomSectionRenderer';

interface NexusTemplateProps {
  data: Resume;
}

const NexusTemplate: React.FC<NexusTemplateProps> = ({ data }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-gradient-to-br from-slate-50 to-slate-100 print:bg-white shadow-lg print:shadow-none font-sans p-10">
      {/* Header with connection nodes */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-md print:shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 border-4 border-indigo-200 rounded-full -translate-y-16 translate-x-16 opacity-30 print:hidden"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-indigo-200 rounded-full translate-y-12 -translate-x-12 opacity-30 print:hidden"></div>
        
        <div className="relative">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">{data.personal_info.fullName}</h1>
          {data.personal_info.summary && (
            <p className="text-slate-600 text-lg leading-relaxed max-w-4xl">{data.personal_info.summary}</p>
          )}
        </div>
      </div>

      {/* Contact info with connection line */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-md print:shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <Mail className="w-4 h-4 text-indigo-500" />
              {data.personal_info.email}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <Phone className="w-4 h-4 text-indigo-500" />
              {data.personal_info.phone}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <MapPin className="w-4 h-4 text-indigo-500" />
              {data.personal_info.location}
            </div>
          </div>
          {data.personal_info.socialLinks && data.personal_info.socialLinks.length > 0 && (
            <SocialLinks socialLinks={data.personal_info.socialLinks} className="text-indigo-600" />
          )}
        </div>
      </div>

      {/* Two-column layout with connecting elements */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main content - 2 columns */}
        <div className="col-span-2 space-y-6">
          {/* Experience with interconnected nodes */}
          {data.experience.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-md print:shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Circle className="w-8 h-8 text-indigo-500 fill-indigo-100" />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Professional Experience</h2>
              </div>
              
              <div className="space-y-6 relative">
                {/* Connection line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-300 to-indigo-100"></div>
                
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-12">
                    {/* Node connector */}
                    <div className="absolute left-0 top-6 w-8 h-8 bg-white border-4 border-indigo-500 rounded-full z-10"></div>
                    <div className="absolute left-4 top-10 w-4 h-0.5 bg-indigo-300"></div>
                    
                    <div className="bg-slate-50 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                          <div className="text-indigo-600 font-semibold">{exp.company}</div>
                          <div className="text-sm text-slate-600">{exp.location}</div>
                        </div>
                        <div className="text-sm text-white bg-indigo-500 px-4 py-2 rounded-full">
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

          {/* Education with connections */}
          {data.education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-md print:shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Circle className="w-8 h-8 text-indigo-500 fill-indigo-100" />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Education</h2>
              </div>
              
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-slate-50 p-5 rounded-xl relative pl-8">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <h3 className="font-bold text-slate-900 text-lg">{edu.degree} in {edu.field}</h3>
                    <div className="text-indigo-600 font-semibold">{edu.institution}</div>
                    <div className="text-sm text-slate-600">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Skills with network nodes */}
          {data.skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-md print:shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Circle className="w-6 h-6 text-indigo-500 fill-indigo-100" />
                <h2 className="text-xl font-bold text-slate-900 uppercase">Skills</h2>
              </div>
              
              <div className="space-y-4">
                {data.skills.map((skillGroup) => (
                  <div key={skillGroup.id} className="relative">
                    <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg mb-3">
                      <h3 className="font-bold text-sm">{skillGroup.category}</h3>
                    </div>
                    <div className="space-y-2 pl-4">
                      {skillGroup.items.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                          <div className="w-4 h-0.5 bg-indigo-200"></div>
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
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-md print:shadow-sm">
          <CustomSectionRenderer 
            sections={data.custom_sections}
            headerClassName="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6 flex items-center gap-3"
          />
        </div>
      )}
    </div>
  );
};

export default NexusTemplate;
