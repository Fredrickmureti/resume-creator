import { useState } from 'react';
import { Palette, Check, X, FileText, Briefcase, Minimize2, Crown, Terminal, GraduationCap, FileCheck, UserCircle, UserCheck, Sparkles, Award, Building2, Zap, Layers, BarChart3, BookOpen, Building, Circle, Code2, Newspaper, ArrowRight, AlignLeft, Square, TrendingUp, Target, Waves, User, Users, Scissors, Star, Shield } from 'lucide-react';
import { TemplateId } from '../types/resume';

interface Template {
  id: TemplateId;
  name: string;
  description: string;
  category: 'resume' | 'cv';
}

const templates: Template[] = [
  { id: 'modern', name: 'Modern', description: 'Clean & contemporary', category: 'resume' },
  { id: 'professional', name: 'Professional', description: 'Traditional corporate', category: 'resume' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple & elegant', category: 'resume' },
  { id: 'creative', name: 'Creative', description: 'Bold & unique', category: 'resume' },
  { id: 'executive', name: 'Executive', description: 'Sophisticated design', category: 'resume' },
  { id: 'technical', name: 'Technical', description: 'Developer-focused', category: 'resume' },
  { id: 'academic', name: 'Academic', description: 'Scholarly format', category: 'resume' },
  { id: 'simple', name: 'Simple', description: 'No-frills design', category: 'resume' },
  { id: 'corporate', name: 'Corporate', description: 'Conservative style', category: 'resume' },
  { id: 'bold', name: 'Bold', description: 'Eye-catching', category: 'resume' },
  { id: 'compact', name: 'Compact', description: 'Space-efficient', category: 'resume' },
  { id: 'infographic', name: 'Infographic', description: 'Visual with charts', category: 'resume' },
  { id: 'classic', name: 'Classic', description: 'Timeless serif', category: 'resume' },
  { id: 'two-column', name: 'Two Column', description: 'Elegant sidebar layout', category: 'resume' },
  { id: 'timeline', name: 'Timeline', description: 'Chronological flow', category: 'resume' },
  { id: 'sidebar', name: 'Sidebar Premium', description: 'Gradient sidebar', category: 'resume' },
  { id: 'split', name: 'Split Screen', description: 'Balanced split design', category: 'resume' },
  { id: 'grid', name: 'Grid Cards', description: 'Card-based layout', category: 'resume' },
  { id: 'magazine', name: 'Magazine', description: 'Editorial multi-column', category: 'resume' },
  { id: 'horizon', name: 'Horizon', description: 'Wide horizontal sections', category: 'resume' },
  { id: 'vertical', name: 'Vertical Pro', description: 'Strong vertical lines', category: 'resume' },
  { id: 'cornerstone', name: 'Cornerstone', description: 'Corner accent design', category: 'resume' },
  { id: 'edge', name: 'Edge', description: 'Sharp angular design', category: 'resume' },
  { id: 'nexus', name: 'Nexus', description: 'Interconnected sections', category: 'resume' },
  { id: 'cascade', name: 'Cascade', description: 'Flowing waterfall style', category: 'resume' },
  { id: 'cv-photo-modern', name: 'CV Modern', description: 'Modern with photo', category: 'cv' },
  { id: 'cv-photo-professional', name: 'CV Professional', description: 'Classic with photo', category: 'cv' },
  { id: 'cv-photo-creative', name: 'CV Creative', description: 'Creative with photo', category: 'cv' },
  { id: 'cv-photo-elegant', name: 'CV Elegant', description: 'Elegant with photo', category: 'cv' },
  { id: 'cv-photo-business', name: 'CV Business', description: 'Business with photo', category: 'cv' },
  { id: 'cv-photo-academic', name: 'CV Academic', description: 'Academic with photo', category: 'cv' },
  { id: 'cv-photo-minimalist', name: 'CV Minimalist', description: 'Minimalist with photo', category: 'cv' },
  { id: 'cv-photo-executive', name: 'CV Executive', description: 'Executive with photo', category: 'cv' },
  { id: 'cv-photo-tech', name: 'CV Tech', description: 'Tech with photo', category: 'cv' },
  { id: 'cv-photo-modern-alt', name: 'CV Modern Alt', description: 'Modern with large photo', category: 'cv' },
  { id: 'cv-photo-corporate', name: 'CV Corporate Elite', description: 'Premium corporate CV', category: 'cv' },
  { id: 'cv-photo-clean', name: 'CV Clean Lines', description: 'Ultra-minimalist CV', category: 'cv' },
  { id: 'cv-photo-bold', name: 'CV Bold Statement', description: 'Eye-catching CV', category: 'cv' },
  { id: 'cv-photo-compact', name: 'CV Compact Pro', description: 'Space-efficient CV', category: 'cv' },
  { id: 'cv-photo-elegant-alt', name: 'CV Elegant Plus', description: 'Refined decorative CV', category: 'cv' },
  { id: 'cv-photo-premium', name: 'CV Premium Edition', description: 'High-end CV', category: 'cv' },
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

interface TemplateSwitcherProps {
  currentTemplate: TemplateId;
  onTemplateChange: (templateId: TemplateId) => void;
}

export default function TemplateSwitcher({ currentTemplate, onTemplateChange }: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'resume' | 'cv'>('all');

  const filteredTemplates = templates.filter(t => 
    filter === 'all' ? true : t.category === filter
  );

  const handleSelectTemplate = (templateId: TemplateId) => {
    onTemplateChange(templateId);
    setIsOpen(false);
  };

  const currentTemplateName = templates.find(t => t.id === currentTemplate)?.name || 'Modern';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Change Template</span>
        <span className="sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Switch Template</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Current: <span className="font-semibold">{currentTemplateName}</span>
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Templates
                </button>
                <button
                  onClick={() => setFilter('resume')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'resume'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Resumes
                </button>
                <button
                  onClick={() => setFilter('cv')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'cv'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  CVs with Photo
                </button>
              </div>
            </div>

            {/* Template Grid */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => {
                  const Icon = icons[template.id];
                  const isActive = template.id === currentTemplate;

                  return (
                    <button
                      key={template.id}
                      onClick={() => handleSelectTemplate(template.id)}
                      className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                        isActive
                          ? 'border-purple-600 bg-purple-50 shadow-lg'
                          : 'border-slate-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? 'bg-purple-600' : 'bg-slate-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 mb-1">{template.name}</h3>
                          <p className="text-sm text-slate-600">{template.description}</p>
                          <div className="mt-2">
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                              template.category === 'cv'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {template.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  <strong>Note:</strong> Your content will remain the same, only the design will change.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
