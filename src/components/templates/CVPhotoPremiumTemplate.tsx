import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User, Crown, Award } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoPremiumTemplateProps {
  resume: Resume;
}

export default function CVPhotoPremiumTemplate({ resume }: CVPhotoPremiumTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg print:shadow-none mx-auto">
      {/* Premium charcoal & gold header */}
      <div className="relative p-10 border-b-4 border-yellow-600">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
        
        <div className="flex items-center gap-8">
          {/* Executive photo with gold frame */}
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-40 h-40 object-cover rounded-lg border-4 border-yellow-600 shadow-2xl ring-4 ring-yellow-600/30"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-700 rounded-lg border-4 border-yellow-600 shadow-2xl ring-4 ring-yellow-600/30 flex items-center justify-center">
              <User className="w-24 h-24 text-gray-500" />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-8 h-8 text-yellow-600" />
              <h1 className="text-5xl font-bold text-white tracking-tight">{personal_info.fullName}</h1>
            </div>
            {experience[0]?.position && (
              <p className="text-2xl text-yellow-500 font-semibold mb-4">{experience[0].position}</p>
            )}
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-yellow-600"></div>
                <Mail className="w-4 h-4 text-yellow-600" />
                {personal_info.email}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-yellow-600"></div>
                <Phone className="w-4 h-4 text-yellow-600" />
                {personal_info.phone}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-yellow-600"></div>
                <MapPin className="w-4 h-4 text-yellow-600" />
                {personal_info.location}
              </div>
            </div>
            
            <div className="mt-3">
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-center gap-4"
                iconClassName="w-4 h-4 text-yellow-600"
                textClassName="text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Executive Summary */}
        {personal_info.summary && (
          <div className="mb-8 bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-600 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-500 mb-3 uppercase tracking-wider">Executive Summary</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{personal_info.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Professional Experience */}
            {experience.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-yellow-600">
                  <div className="w-2 h-8 bg-yellow-600"></div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                    Professional Experience
                  </h2>
                </div>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id} className="bg-gray-800 p-6 rounded-lg shadow-xl border-l-4 border-yellow-600 hover:bg-gray-750 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                          <div className="text-yellow-500 font-bold text-lg">{exp.company}</div>
                          <div className="text-sm text-gray-400">{exp.location}</div>
                        </div>
                        <div className="text-sm text-gray-900 bg-yellow-600 px-4 py-2 rounded font-bold shadow-md">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-yellow-600">
                  <div className="w-2 h-8 bg-yellow-600"></div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Key Projects</h2>
                </div>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800 p-5 rounded-lg shadow-xl">
                      <h3 className="font-bold text-white text-lg">{project.name}</h3>
                      <p className="text-gray-300 mt-2 whitespace-pre-wrap">{project.description}</p>
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
              <div className="bg-gray-800 p-5 rounded-lg shadow-xl border-t-4 border-yellow-600">
                <h2 className="text-xl font-bold text-yellow-500 mb-4 uppercase tracking-wider">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-white">{edu.degree}</h3>
                      <div className="text-yellow-500 font-semibold">{edu.field}</div>
                      <div className="text-sm text-gray-400">{edu.institution}</div>
                      <div className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                      {edu.gpa && <div className="text-xs text-yellow-500 font-semibold">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-gray-800 p-5 rounded-lg shadow-xl border-t-4 border-yellow-600">
                <h2 className="text-xl font-bold text-yellow-500 mb-4 uppercase tracking-wider">Core Skills</h2>
                <div className="space-y-4">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-bold text-white text-sm mb-2">{skillGroup.category}</h3>
                      <div className="space-y-1">
                        {skillGroup.items.map((skill, idx) => (
                          <div key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-600 rotate-45"></div>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="bg-gray-800 p-5 rounded-lg shadow-xl border-t-4 border-yellow-600">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-xl font-bold text-yellow-500 uppercase tracking-wider">Certifications</h2>
                </div>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-bold text-white text-sm">{cert.name}</div>
                      <div className="text-xs text-gray-400">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="bg-gray-800 p-5 rounded-lg shadow-xl border-t-4 border-yellow-600">
                <h2 className="text-xl font-bold text-yellow-500 mb-4 uppercase tracking-wider">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span className="text-white font-semibold">{lang.name}</span>
                      <span className="text-yellow-500">{lang.proficiency}</span>
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
              headerClassName="text-2xl font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b-2 border-yellow-600"
            />
          </div>
        )}
      </div>

      {/* Premium footer accent */}
      <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
    </div>
  );
}
