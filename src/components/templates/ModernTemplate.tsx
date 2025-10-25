import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Twitter, Facebook, Instagram } from 'lucide-react';
import CustomSectionRenderer from './CustomSectionRenderer';

interface ModernTemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: ModernTemplateProps) {
  const { personal_info, experience, education, skills, projects, certifications, languages, custom_sections } = resume;

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white w-full max-w-[210mm] mx-auto shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{personal_info.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-blue-50">
          {personal_info.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personal_info.email}</span>
            </div>
          )}
          {personal_info.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personal_info.phone}</span>
            </div>
          )}
          {personal_info.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personal_info.location}</span>
            </div>
          )}
          {(personal_info.socialLinks || []).map((link) => (
            <div key={link.id} className="flex items-center gap-1">
              {getSocialIcon(link.platform)}
              <span>{link.url}</span>
            </div>
          ))}
          {/* Backward compatibility */}
          {!personal_info.socialLinks && personal_info.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{personal_info.linkedin}</span>
            </div>
          )}
          {!personal_info.socialLinks && personal_info.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{personal_info.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {personal_info.summary && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution} • {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
                  <span className="text-gray-700">{skill.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                  {project.link && (
                    <p className="text-sm text-blue-600">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <span className="font-semibold text-gray-900">{cert.name}</span>
                    <span className="text-gray-700"> - {cert.issuer}</span>
                  </div>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <span className="font-semibold text-gray-900">{lang.name}</span>
                  <span className="text-gray-700"> - {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <CustomSectionRenderer
          sections={custom_sections || []}
          headerClassName="text-xl font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-600"
          itemClassName="space-y-4"
        />
      </div>
    </div>
  );
}
