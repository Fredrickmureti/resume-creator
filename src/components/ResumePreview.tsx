import { Resume, TemplateId } from '../types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import TechnicalTemplate from './templates/TechnicalTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import SimpleTemplate from './templates/SimpleTemplate';
import CVPhotoModernTemplate from './templates/CVPhotoModernTemplate';
import CVPhotoProfessionalTemplate from './templates/CVPhotoProfessionalTemplate';
import CVPhotoCreativeTemplate from './templates/CVPhotoCreativeTemplate';
import CVPhotoElegantTemplate from './templates/CVPhotoElegantTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import BoldTemplate from './templates/BoldTemplate';
import CompactTemplate from './templates/CompactTemplate';
import InfographicTemplate from './templates/InfographicTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CVPhotoBusinessTemplate from './templates/CVPhotoBusinessTemplate';
import CVPhotoAcademicTemplate from './templates/CVPhotoAcademicTemplate';
import CVPhotoMinimalistTemplate from './templates/CVPhotoMinimalistTemplate';
import CVPhotoExecutiveTemplate from './templates/CVPhotoExecutiveTemplate';
import CVPhotoTechTemplate from './templates/CVPhotoTechTemplate';
import TwoColumnTemplate from './templates/TwoColumnTemplate';
import TimelineTemplate from './templates/TimelineTemplate';
import SidebarTemplate from './templates/SidebarTemplate';
import SplitTemplate from './templates/SplitTemplate';
import GridTemplate from './templates/GridTemplate';
import MagazineTemplate from './templates/MagazineTemplate';
import HorizonTemplate from './templates/HorizonTemplate';
import VerticalTemplate from './templates/VerticalTemplate';
import CornerstoneTemplate from './templates/CornerstoneTemplate';
import EdgeTemplate from './templates/EdgeTemplate';
import NexusTemplate from './templates/NexusTemplate';
import CascadeTemplate from './templates/CascadeTemplate';
import CVPhotoModernAltTemplate from './templates/CVPhotoModernAltTemplate';
import CVPhotoCorporateTemplate from './templates/CVPhotoCorporateTemplate';
import CVPhotoCleanTemplate from './templates/CVPhotoCleanTemplate';
import CVPhotoBoldTemplate from './templates/CVPhotoBoldTemplate';
import CVPhotoCompactTemplate from './templates/CVPhotoCompactTemplate';
import CVPhotoElegantAltTemplate from './templates/CVPhotoElegantAltTemplate';
import CVPhotoPremiumTemplate from './templates/CVPhotoPremiumTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resume.template_id as TemplateId) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      case 'minimalist':
        return <MinimalistTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} />;
      case 'technical':
        return <TechnicalTemplate resume={resume} />;
      case 'academic':
        return <AcademicTemplate resume={resume} />;
      case 'simple':
        return <SimpleTemplate resume={resume} />;
      case 'cv-photo-modern':
        return <CVPhotoModernTemplate resume={resume} />;
      case 'cv-photo-professional':
        return <CVPhotoProfessionalTemplate resume={resume} />;
      case 'cv-photo-creative':
        return <CVPhotoCreativeTemplate resume={resume} />;
      case 'cv-photo-elegant':
        return <CVPhotoElegantTemplate resume={resume} />;
      case 'corporate':
        return <CorporateTemplate resume={resume} />;
      case 'bold':
        return <BoldTemplate resume={resume} />;
      case 'compact':
        return <CompactTemplate resume={resume} />;
      case 'infographic':
        return <InfographicTemplate resume={resume} />;
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'cv-photo-business':
        return <CVPhotoBusinessTemplate resume={resume} />;
      case 'cv-photo-academic':
        return <CVPhotoAcademicTemplate resume={resume} />;
      case 'cv-photo-minimalist':
        return <CVPhotoMinimalistTemplate resume={resume} />;
      case 'cv-photo-executive':
        return <CVPhotoExecutiveTemplate resume={resume} />;
      case 'cv-photo-tech':
        return <CVPhotoTechTemplate resume={resume} />;
      case 'two-column':
        return <TwoColumnTemplate data={resume} />;
      case 'timeline':
        return <TimelineTemplate data={resume} />;
      case 'sidebar':
        return <SidebarTemplate data={resume} />;
      case 'split':
        return <SplitTemplate data={resume} />;
      case 'grid':
        return <GridTemplate data={resume} />;
      case 'magazine':
        return <MagazineTemplate data={resume} />;
      case 'horizon':
        return <HorizonTemplate data={resume} />;
      case 'vertical':
        return <VerticalTemplate data={resume} />;
      case 'cornerstone':
        return <CornerstoneTemplate data={resume} />;
      case 'edge':
        return <EdgeTemplate data={resume} />;
      case 'nexus':
        return <NexusTemplate data={resume} />;
      case 'cascade':
        return <CascadeTemplate data={resume} />;
      case 'cv-photo-modern-alt':
        return <CVPhotoModernAltTemplate resume={resume} />;
      case 'cv-photo-corporate':
        return <CVPhotoCorporateTemplate resume={resume} />;
      case 'cv-photo-clean':
        return <CVPhotoCleanTemplate resume={resume} />;
      case 'cv-photo-bold':
        return <CVPhotoBoldTemplate resume={resume} />;
      case 'cv-photo-compact':
        return <CVPhotoCompactTemplate resume={resume} />;
      case 'cv-photo-elegant-alt':
        return <CVPhotoElegantAltTemplate resume={resume} />;
      case 'cv-photo-premium':
        return <CVPhotoPremiumTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-slate-100 p-8">
      <div id="resume-preview" className="mx-auto">
        {renderTemplate()}
      </div>
    </div>
  );
}
