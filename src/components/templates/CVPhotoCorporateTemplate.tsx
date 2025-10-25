import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User, Award, Briefcase } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoCorporateTemplateProps {
  resume: Resume;
}

export default function CVPhotoCorporateTemplate({ resume }: CVPhotoCorporateTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto">
      {/* Premium platinum header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white p-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2 tracking-tight">{personal_info.fullName}</h1>
            {experience[0]?.position && (
              <p className="text-2xl text-slate-300 mb-4 font-light">{experience[0].position}</p>
            )}
            
            {/* Contact - Premium styling */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-300 mt-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{personal_info.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{personal_info.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personal_info.location}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-center gap-4"
                iconClassName="w-4 h-4 text-slate-300"
              />
            </div>
          </div>

          {/* Premium photo frame */}
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-36 h-36 object-cover rounded-lg border-4 border-slate-600 shadow-xl"
            />
          ) : (
            <div className="w-36 h-36 bg-slate-600 rounded-lg border-4 border-slate-600 shadow-xl flex items-center justify-center">
              <User className="w-20 h-20 text-slate-400" />
            </div>
          )}
        </div>
      </div>

      <div className="p-10">
        {/* Executive Summary */}
        {personal_info.summary && (
          <div className="mb-8 bg-slate-50 p-6 border-l-4 border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{personal_info.summary}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Professional Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-4 border-slate-700">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="bg-slate-50 p-5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                          <div className="text-slate-700 font-semibold text-lg">{exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.location}</div>
                        </div>
                        <div className="text-sm text-white bg-slate-700 px-4 py-2 rounded font-semibold">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mt-3">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-4 border-slate-700">
                  Key Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-bold text-slate-900 text-lg">{project.name}</h3>
                      <p className="text-gray-700 mt-2 whitespace-pre-wrap">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-700">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <div className="text-slate-700 font-semibold">{edu.field}</div>
                      <div className="text-sm text-gray-600">{edu.institution}</div>
                      <div className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                      {edu.gpa && <div className="text-xs text-gray-600">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-700">
                  Core Competencies
                </h2>
                <div className="space-y-4">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-bold text-slate-900 text-sm mb-2">{skillGroup.category}</h3>
                      <div className="space-y-1">
                        {skillGroup.items.map((skill, idx) => (
                          <div key={idx} className="text-sm text-gray-700">• {skill}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-700 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-bold text-slate-900 text-sm">{cert.name}</div>
                      <div className="text-xs text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-700">
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span className="text-gray-900 font-semibold">{lang.name}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Sections */}
        {custom_sections && custom_sections.length > 0 && (
          <div className="mt-8">
            <CustomSectionRenderer 
              sections={custom_sections}
              headerClassName="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-4 border-slate-700"
            />
          </div>
        )}
      </div>
    </div>
  );
}
