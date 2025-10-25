import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User, Sparkles } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoBoldTemplateProps {
  resume: Resume;
}

export default function CVPhotoBoldTemplate({ resume }: CVPhotoBoldTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 shadow-lg print:shadow-none mx-auto">
      {/* Bold colorful header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white p-8">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-2 tracking-tight">{personal_info.fullName}</h1>
            {experience[0]?.position && (
              <p className="text-2xl font-bold text-white/90 mb-4">{experience[0].position}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                <Mail className="w-4 h-4" />
                <span>{personal_info.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                <Phone className="w-4 h-4" />
                <span>{personal_info.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
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
                iconClassName="w-4 h-4 text-white"
              />
            </div>
          </div>

          {/* Bold photo frame */}
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-2xl ring-4 ring-pink-400"
            />
          ) : (
            <div className="w-32 h-32 bg-white/30 rounded-full border-4 border-white shadow-2xl ring-4 ring-pink-400 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="p-10">
        {/* Vibrant summary */}
        {personal_info.summary && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg border-l-8 border-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{personal_info.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-purple-600 font-bold text-lg">{exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.location}</div>
                        </div>
                        <div className="text-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full font-bold shadow-md">
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
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-4">
                  PROJECTS
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-orange-500">
                      <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
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
              <div className="bg-white p-5 rounded-2xl shadow-lg">
                <h2 className="text-xl font-black text-purple-600 mb-4 uppercase">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-purple-600 font-semibold">{edu.field}</div>
                      <div className="text-sm text-gray-600">{edu.institution}</div>
                      <div className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                      {edu.gpa && <div className="text-xs text-gray-600 font-semibold">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-lg">
                <h2 className="text-xl font-black text-pink-600 mb-4 uppercase">Skills</h2>
                <div className="space-y-3">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold shadow-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-lg">
                <h2 className="text-xl font-black text-orange-600 mb-4 uppercase">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-bold text-gray-900 text-sm">{cert.name}</div>
                      <div className="text-xs text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-lg">
                <h2 className="text-xl font-black text-purple-600 mb-4 uppercase">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span className="text-gray-900 font-bold">{lang.name}</span>
                      <span className="text-purple-600 font-semibold">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Sections */}
        {custom_sections && custom_sections.length > 0 && (
          <div className="mt-6">
            <CustomSectionRenderer 
              sections={custom_sections}
              headerClassName="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
