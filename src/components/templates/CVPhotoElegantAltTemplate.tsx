import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User, Heart } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoElegantAltTemplateProps {
  resume: Resume;
}

export default function CVPhotoElegantAltTemplate({ resume }: CVPhotoElegantAltTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg print:shadow-none mx-auto">
      {/* Elegant rose gold header */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="relative flex items-center gap-8">
          {/* Elegant circular photo */}
          {personal_info.photo_url ? (
            <img 
              src={personal_info.photo_url} 
              alt={personal_info.fullName}
              className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-2xl ring-8 ring-rose-200/50"
            />
          ) : (
            <div className="w-36 h-36 bg-white/40 rounded-full border-4 border-white shadow-2xl ring-8 ring-rose-200/50 flex items-center justify-center">
              <User className="w-20 h-20 text-white" />
            </div>
          )}

          <div className="flex-1 text-white">
            <h1 className="text-5xl font-serif font-bold mb-2 tracking-wide">{personal_info.fullName}</h1>
            {experience[0]?.position && (
              <p className="text-2xl font-light text-rose-50 mb-4 italic">{experience[0].position}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {personal_info.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {personal_info.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {personal_info.location}
              </div>
            </div>
            
            <div className="mt-2">
              <SocialLinks 
                socialLinks={personal_info.socialLinks}
                linkedin={personal_info.linkedin}
                website={personal_info.website}
                className="flex items-center gap-4"
                iconClassName="w-4 h-4 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Elegant summary */}
        {personal_info.summary && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-md border-t-4 border-rose-400">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h2 className="text-2xl font-serif font-bold text-gray-900">Profile</h2>
            </div>
            <p className="text-gray-700 leading-relaxed italic">{personal_info.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-3xl font-serif font-bold text-rose-600 mb-4 pb-2 border-b-2 border-rose-300">
                  Professional Experience
                </h2>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-rose-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-serif font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-rose-600 font-semibold italic">{exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.location}</div>
                        </div>
                        <div className="text-sm text-rose-700 bg-rose-100 px-4 py-2 rounded-full font-semibold">
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
                <h2 className="text-3xl font-serif font-bold text-rose-600 mb-4 pb-2 border-b-2 border-rose-300">
                  Featured Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white p-5 rounded-2xl shadow-md">
                      <h3 className="font-serif font-bold text-gray-900 text-lg">{project.name}</h3>
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
              <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-rose-300">
                <h2 className="text-xl font-serif font-bold text-rose-600 mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-rose-600 italic">{edu.field}</div>
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
              <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-rose-300">
                <h2 className="text-xl font-serif font-bold text-rose-600 mb-4">Expertise</h2>
                <div className="space-y-4">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 italic">{skillGroup.category}</h3>
                      <div className="space-y-1">
                        {skillGroup.items.map((skill, idx) => (
                          <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
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
              <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-rose-300">
                <h2 className="text-xl font-serif font-bold text-rose-600 mb-4">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-bold text-gray-900 text-sm">{cert.name}</div>
                      <div className="text-xs text-gray-600 italic">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-rose-300">
                <h2 className="text-xl font-serif font-bold text-rose-600 mb-4">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span className="text-gray-900 font-semibold">{lang.name}</span>
                      <span className="text-rose-600 italic">{lang.proficiency}</span>
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
              headerClassName="text-3xl font-serif font-bold text-rose-600 mb-4 pb-2 border-b-2 border-rose-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
