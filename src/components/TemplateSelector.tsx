import { FileText, Briefcase, Minimize2, Palette, Crown, Terminal, GraduationCap, FileCheck, UserCircle, UserCheck, Sparkles, Award, Building2, Zap, Layers, BarChart3, BookOpen, Building, Circle, Code2, Newspaper, ArrowRight, AlignLeft, Square, TrendingUp, Target, Waves, User, Users, Scissors, Star, Shield } from 'lucide-react';
import { Template, TemplateId } from '../types/resume';

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold accents',
    preview: 'Perfect for tech and creative industries',
    documentType: 'resume'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional corporate style for formal industries',
    preview: 'Two-column layout with conservative styling',
    documentType: 'resume'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant with focus on content',
    preview: 'Clean typography and whitespace',
    documentType: 'resume'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and unique for creative professionals',
    preview: 'Vibrant colors and dynamic sections',
    documentType: 'resume'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior leadership',
    preview: 'Premium feel for C-level positions',
    documentType: 'resume'
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Developer-focused with dark theme',
    preview: 'Code-inspired design for engineers',
    documentType: 'resume'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Scholarly format for research positions',
    preview: 'Traditional academic CV layout',
    documentType: 'resume'
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'No-frills straightforward design',
    preview: 'Basic and ATS-optimized',
    documentType: 'resume'
  },
  {
    id: 'cv-photo-modern',
    name: 'CV Modern Photo',
    description: 'Modern CV with circular profile photo',
    preview: 'Professional CV with photo - Blue theme',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-professional',
    name: 'CV Professional Photo',
    description: 'Classic CV with square photo layout',
    preview: 'Traditional CV with photo - Gray theme',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-creative',
    name: 'CV Creative Photo',
    description: 'Creative CV with rounded photo border',
    preview: 'Vibrant CV with photo - Colorful theme',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-elegant',
    name: 'CV Elegant Photo',
    description: 'Elegant CV with bordered photo',
    preview: 'Premium CV with photo - Gold accents',
    documentType: 'cv'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Conservative two-column for finance & legal',
    preview: 'Navy blue accents - Banking & consulting',
    documentType: 'resume'
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Eye-catching with large typography',
    preview: 'Orange accents - Sales & marketing',
    documentType: 'resume'
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient for extensive experience',
    preview: 'Teal theme - Mid-career professionals',
    documentType: 'resume'
  },
  {
    id: 'infographic',
    name: 'Infographic',
    description: 'Visual with skill bars and icons',
    preview: 'Purple gradients - Designers & analysts',
    documentType: 'resume'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless serif fonts and layout',
    preview: 'Traditional - Academic & editorial',
    documentType: 'resume'
  },
  {
    id: 'cv-photo-business',
    name: 'CV Business Photo',
    description: 'Professional sidebar with photo',
    preview: 'Charcoal gray - Business consultants',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-academic',
    name: 'CV Academic Photo',
    description: 'Traditional academic with small photo',
    preview: 'Burgundy - Professors & researchers',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-minimalist',
    name: 'CV Minimalist Photo',
    description: 'Clean design with subtle photo',
    preview: 'Soft blue - International CVs',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-executive',
    name: 'CV Executive Photo',
    description: 'Premium for senior leadership',
    preview: 'Navy & gold - C-level positions',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-tech',
    name: 'CV Tech Photo',
    description: 'Modern tech-focused dark theme',
    preview: 'Dark slate & cyan - Tech professionals',
    documentType: 'cv'
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Elegant sidebar layout with colored panel',
    preview: 'Slate sidebar - Modern professionals',
    documentType: 'resume'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Chronological timeline with visual flow',
    preview: 'Blue timeline - Career progression',
    documentType: 'resume'
  },
  {
    id: 'sidebar',
    name: 'Sidebar Premium',
    description: 'Gradient sidebar with premium feel',
    preview: 'Indigo gradient - Creative professionals',
    documentType: 'resume'
  },
  {
    id: 'split',
    name: 'Split Screen',
    description: 'Balanced split-screen design',
    preview: 'Teal split - Modern design',
    documentType: 'resume'
  },
  {
    id: 'grid',
    name: 'Grid Cards',
    description: 'Card-based grid layout',
    preview: 'Blue cards - Contemporary style',
    documentType: 'resume'
  },
  {
    id: 'magazine',
    name: 'Magazine',
    description: 'Editorial-style multi-column layout',
    preview: 'Bold headers - Editorial & media',
    documentType: 'resume'
  },
  {
    id: 'horizon',
    name: 'Horizon',
    description: 'Wide horizontal sections with emphasis',
    preview: 'Sky blue - Marketing & communications',
    documentType: 'resume'
  },
  {
    id: 'vertical',
    name: 'Vertical Pro',
    description: 'Strong vertical lines and sections',
    preview: 'Forest green - Project managers',
    documentType: 'resume'
  },
  {
    id: 'cornerstone',
    name: 'Cornerstone',
    description: 'Classic corner accent design',
    preview: 'Burgundy corners - Finance & law',
    documentType: 'resume'
  },
  {
    id: 'edge',
    name: 'Edge',
    description: 'Sharp angular design with modern flair',
    preview: 'Electric blue - Tech startups',
    documentType: 'resume'
  },
  {
    id: 'nexus',
    name: 'Nexus',
    description: 'Interconnected sections with flow',
    preview: 'Teal connectors - Data analysts',
    documentType: 'resume'
  },
  {
    id: 'cascade',
    name: 'Cascade',
    description: 'Flowing waterfall-style sections',
    preview: 'Ocean gradient - Creative directors',
    documentType: 'resume'
  },
  {
    id: 'cv-photo-modern-alt',
    name: 'CV Modern Alternative',
    description: 'Contemporary CV with large photo header',
    preview: 'Bright accents - Young professionals',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-corporate',
    name: 'CV Corporate Elite',
    description: 'Premium corporate CV with photo',
    preview: 'Platinum theme - Senior management',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-clean',
    name: 'CV Clean Lines',
    description: 'Ultra-minimalist CV with photo',
    preview: 'White space - Architects & designers',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-bold',
    name: 'CV Bold Statement',
    description: 'Eye-catching CV with large photo',
    preview: 'Vibrant colors - Creative industries',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-compact',
    name: 'CV Compact Pro',
    description: 'Space-efficient CV with photo',
    preview: 'Dense layout - Experienced professionals',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-elegant-alt',
    name: 'CV Elegant Plus',
    description: 'Refined CV with decorative elements',
    preview: 'Rose gold - Luxury industries',
    documentType: 'cv'
  },
  {
    id: 'cv-photo-premium',
    name: 'CV Premium Edition',
    description: 'High-end CV with sophisticated styling',
    preview: 'Charcoal & gold - Executives',
    documentType: 'cv'
  }
];

const icons: Record<TemplateId, any> = {
  modern: FileText,
  professional: Briefcase,
  minimalist: Minimize2,
  creative: Palette,
  executive: Crown,
  technical: Terminal,
  academic: GraduationCap,
  simple: FileCheck,
  'cv-photo-modern': UserCircle,
  'cv-photo-professional': UserCheck,
  'cv-photo-creative': Sparkles,
  'cv-photo-elegant': Award,
  corporate: Building2,
  bold: Zap,
  compact: Layers,
  infographic: BarChart3,
  classic: BookOpen,
  'cv-photo-business': Building,
  'cv-photo-academic': GraduationCap,
  'cv-photo-minimalist': Circle,
  'cv-photo-executive': Crown,
  'cv-photo-tech': Code2,
  'two-column': Layers,
  'timeline': Circle,
  'sidebar': Building2,
  'split': Layers,
  'grid': BarChart3,
  'magazine': Newspaper,
  'horizon': ArrowRight,
  'vertical': AlignLeft,
  'cornerstone': Square,
  'edge': TrendingUp,
  'nexus': Target,
  'cascade': Waves,
  'cv-photo-modern-alt': User,
  'cv-photo-corporate': Users,
  'cv-photo-clean': Scissors,
  'cv-photo-bold': Star,
  'cv-photo-compact': Layers,
  'cv-photo-elegant-alt': Sparkles,
  'cv-photo-premium': Shield
};

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: TemplateId) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Build Your Perfect Resume
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates and create a resume that stands out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => {
            const Icon = icons[template.id];
            return (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-slate-300"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-slate-700" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {template.name}
                  </h3>

                  <p className="text-slate-600 mb-4 flex-grow">
                    {template.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 italic">
                      {template.preview}
                    </p>
                  </div>

                  <button className="mt-6 w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors group-hover:bg-slate-800">
                    Use Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Easy to Edit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>PDF Export</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>ATS Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
