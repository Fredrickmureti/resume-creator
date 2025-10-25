import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface CVPhotoCreativeTemplateProps {
  resume: Resume;
}

export default function CVPhotoCreativeTemplate({ resume }: CVPhotoCreativeTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-lg print:shadow-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Creative Header with Asymmetric Design */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 h-48"></div>
        
        <div className="absolute top-8 left-8 right-8">
          <div className="flex items-end gap-6">
            {/* Photo with Creative Border */}
            <div className="flex-shrink-0">
              <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white/20 border-4 border-white shadow-2xl flex items-center justify-center">
                {personal_info.photo_url ? (
                  <img 
                    src={personal_info.photo_url} 
                    alt={personal_info.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-18 h-18 text-white/70" />
                )}
              </div>
            </div>

            {/* Name on gradient */}
            <div className="pb-4">
              <h1 className="text-5xl font-black text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {personal_info.fullName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Banner */}
      <div className="bg-gray-50 px-8 py-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {personal_info.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-600" />
              <span>{personal_info.email}</span>
            </div>
          )}
          {personal_info.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-pink-600" />
              <span>{personal_info.phone}</span>
            </div>
          )}
          {personal_info.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>{personal_info.location}</span>
            </div>
          )}
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-2"
            iconClassName="w-4 h-4"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Summary with creative styling */}
        {personal_info.summary && (
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-600">
            <h2 className="text-2xl font-bold text-purple-900 mb-3">About Me</h2>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-purple-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-600"></div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <div className="text-purple-600 font-semibold">{exp.company}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <div className="text-orange-700 font-medium">{edu.institution}</div>
                  <div className="text-sm text-gray-600">
                    {edu.location} • {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills with Creative Layout */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-4">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                  <h3 className="font-bold text-purple-900 mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-purple-700 text-sm rounded-full shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-2 border-pink-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-purple-700 mb-3">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-bold text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}</div>
                    <div className="text-xs text-purple-600">{cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-pink-700 mb-3">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center bg-pink-50 p-3 rounded-lg">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-sm text-pink-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        <CustomSectionRenderer 
          sections={custom_sections}
          headerClassName="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-4"
        />
      </div>
    </div>
  );
}
