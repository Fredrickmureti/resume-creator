import { Linkedin, Globe, Github, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { SocialLink } from '../../types/resume';

interface SocialLinksProps {
  socialLinks?: SocialLink[];
  linkedin?: string;
  website?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showIcons?: boolean;
}

const getPlatformIcon = (platform: string, className?: string) => {
  const lowerPlatform = platform.toLowerCase();
  
  if (lowerPlatform.includes('linkedin')) return <Linkedin className={className} />;
  if (lowerPlatform.includes('github')) return <Github className={className} />;
  if (lowerPlatform.includes('twitter')) return <Twitter className={className} />;
  if (lowerPlatform.includes('facebook')) return <Facebook className={className} />;
  if (lowerPlatform.includes('instagram')) return <Instagram className={className} />;
  if (lowerPlatform.includes('youtube')) return <Youtube className={className} />;
  return <Globe className={className} />;
};

export default function SocialLinks({ 
  socialLinks, 
  linkedin, 
  website, 
  className = '', 
  iconClassName = 'w-4 h-4',
  textClassName = '',
  showIcons = true 
}: SocialLinksProps) {
  // Combine legacy fields with socialLinks array
  const allLinks: SocialLink[] = [];
  
  // Add socialLinks if they exist
  if (socialLinks && socialLinks.length > 0) {
    allLinks.push(...socialLinks);
  }
  
  // Add legacy fields if they exist and aren't already in socialLinks
  if (linkedin && !allLinks.some(link => link.url === linkedin)) {
    allLinks.push({ id: 'legacy-linkedin', platform: 'LinkedIn', url: linkedin });
  }
  if (website && !allLinks.some(link => link.url === website)) {
    allLinks.push({ id: 'legacy-website', platform: 'Website', url: website });
  }

  if (allLinks.length === 0) return null;

  return (
    <>
      {allLinks.map((link, index) => (
        <div key={link.id || index} className={className}>
          {showIcons && getPlatformIcon(link.platform, iconClassName)}
          <span className={textClassName}>{link.url}</span>
        </div>
      ))}
    </>
  );
}
