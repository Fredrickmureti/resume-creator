import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Globe } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';
import SocialLinks from './SocialLinks';

interface InfographicTemplateProps {
  resume: Resume;
}

export default function InfographicTemplate({ resume }: InfographicTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg print:shadow-none mx-auto">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{personal_info.fullName}</h1>
        {experience[0]?.position && (
          <p className="text-xl text-purple-100">{experience[0].position}</p>
        )}
        
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <span>{personal_info.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span>{personal_info.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span>{personal_info.location}</span>
          </div>
          <SocialLinks 
            socialLinks={personal_info.socialLinks}
            linkedin={personal_info.linkedin}
            website={personal_info.website}
            className="flex items-center gap-2"
            iconClassName="w-4 h-4"
          />
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personal_info.summary && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed ml-12">{personal_info.summary}</p>
          </div>
        )}

        {/* Skills with Progress Bars */}
        {skills.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            </div>
            <div className="ml-12 space-y-4">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <h3 className="font-bold text-[#a855f7] mb-2">{skillGroup.category}</h3>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill, skillIdx) => (
                      <div key={skillIdx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#a855f7] to-[#ec4899]"
                            style={{ width: `${85 - (skillIdx * 5) % 30}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
            </div>
            <div className="ml-12 space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-purple-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-[#a855f7] rounded-full" />
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            <div className="ml-12 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution} • {edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            </div>
            <div className="ml-12 grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-white px-2 py-0.5 rounded-full text-purple-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
            </div>
            <div className="ml-12 grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-[#a855f7]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                    <p className="text-xs text-gray-700">{cert.issuer}</p>
                    <p className="text-xs text-gray-600">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Languages</h2>
            </div>
            <div className="ml-12 space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{lang.name}</span>
                  <span className="text-sm text-gray-600 bg-purple-100 px-3 py-1 rounded-full">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        <CustomSectionRenderer
          sections={custom_sections}
          headerClassName="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2"
          itemClassName="space-y-4 ml-12"
        />
      </div>
    </div>
  );
}
