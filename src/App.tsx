import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from './integrations/supabase/client';
import { Resume, TemplateId } from './types/resume';
import LandingPage from './components/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './components/Dashboard';
import TemplateSelector from './components/TemplateSelector';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import PublicProfile from './pages/PublicProfile';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import { exportToPDF } from './utils/pdfExport';
import AdminDashboard from './pages/AdminDashboard';
import AIInterviewWizard from './components/AIInterviewWizard';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import JobApplicationGenerator from './pages/JobApplicationGenerator';
import ResumeOptimizer from './pages/ResumeOptimizer';
import LinkedInOptimizer from './pages/LinkedInOptimizer';
import JobTracker from './pages/JobTracker';
import FeaturesPage from './pages/FeaturesPage';
import CVRevampPage from './pages/CVRevampPage';
import EmailIntegration from './pages/EmailIntegration';
import ResumeNameDialog from './components/ResumeNameDialog';
import { calculateResumeCompletion, CompletionInfo } from './utils/resumeCompletion';

type AppView = 'dashboard' | 'template-select' | 'ai-interview' | 'editor';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppView>('dashboard');
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const [selectedTemplateForAI, setSelectedTemplateForAI] = useState<TemplateId | null>(null);
  const [completionInfo, setCompletionInfo] = useState<CompletionInfo | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<TemplateId | null>(null);

  // Initialize auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update completion info whenever resume changes
  useEffect(() => {
    if (currentResume) {
      const info = calculateResumeCompletion(currentResume);
      setCompletionInfo(info);
    }
  }, [currentResume]);

  const createNewResume = async (templateId: TemplateId, customTitle?: string) => {
    if (!user) return;
    
    // Generate proper UUID for temporary resume
    const tempId = crypto.randomUUID();
    
    const tempResume: Resume = {
      id: tempId,
      user_id: user.id,
      template_id: templateId,
      title: customTitle || 'My Resume',
      personal_info: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        website: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      custom_sections: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setCurrentResume(tempResume);
    setView('editor');
  };

  const saveResume = async (resume: Resume) => {
    if (!user) return;

    // Always save to sessionStorage (for draft recovery)
    sessionStorage.setItem('currentResume', JSON.stringify(resume));

    // Check completion before database save
    const completion = calculateResumeCompletion(resume);
    if (completion.score < 80) {
      return; // Don't save to database, but sessionStorage is updated
    }

    try {
      setIsSaving(true);
      
      // Check if resume exists in DB
      const { data: existing } = await supabase
        .from('resumes')
        .select('id')
        .eq('id', resume.id)
        .maybeSingle();

      if (existing) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update({
            title: resume.title,
            template_id: resume.template_id,
            personal_info: resume.personal_info as any,
            experience: resume.experience as any,
            education: resume.education as any,
            skills: resume.skills as any,
            projects: resume.projects as any,
            certifications: resume.certifications as any,
            languages: resume.languages as any,
            custom_sections: (resume.custom_sections || []) as any,
            updated_at: new Date().toISOString()
          })
          .eq('id', resume.id);

        if (error) throw error;
      } else {
        // Insert new resume
        const { error } = await supabase
          .from('resumes')
          .insert([{
            id: resume.id,
            user_id: user.id,
            title: resume.title,
            template_id: resume.template_id,
            personal_info: resume.personal_info as any,
            experience: resume.experience as any,
            education: resume.education as any,
            skills: resume.skills as any,
            projects: resume.projects as any,
            certifications: resume.certifications as any,
            languages: resume.languages as any,
            custom_sections: (resume.custom_sections || []) as any
          }]);

        if (error) throw error;
      }

      setCurrentResume(resume);
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (currentResume) {
      sessionStorage.setItem('currentResume', JSON.stringify(currentResume));
    }
  }, [currentResume]);

  useEffect(() => {
    const savedResume = sessionStorage.getItem('currentResume');
    if (savedResume) {
      try {
        const resume = JSON.parse(savedResume);
        setCurrentResume(resume);
        setView('editor');
      } catch (error) {
        console.error('Error loading saved resume:', error);
        sessionStorage.removeItem('currentResume');
      }
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentResume) {
      timeoutId = setTimeout(() => {
        saveResume(currentResume);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentResume]);

  const handleUpdateResume = (updatedResume: Resume) => {
    setCurrentResume(updatedResume);
  };

  const handleBack = () => {
    sessionStorage.removeItem('currentResume');
    setView('dashboard');
    setCurrentResume(null);
  };

  const handleEditResume = (resume: Resume) => {
    setCurrentResume(resume);
    setView('editor');
  };

  const handleExportPDF = () => {
    exportToPDF();
  };

  const handleCreateWithAI = () => {
    setIsAIMode(true);
    setView('template-select');
  };

  const handleCreateManual = () => {
    setIsAIMode(false);
    setShowNameDialog(true);
  };

  const handleTemplateSelect = (templateId: TemplateId) => {
    if (isAIMode) {
      setSelectedTemplateForAI(templateId);
      setView('ai-interview');
    } else {
      setPendingTemplateId(templateId);
      setShowNameDialog(true);
    }
  };

  const handleResumeNameConfirm = (name: string) => {
    setShowNameDialog(false);
    if (pendingTemplateId) {
      createNewResume(pendingTemplateId, name);
      setPendingTemplateId(null);
    } else {
      setView('template-select');
    }
  };

  const handleResumeNameCancel = () => {
    setShowNameDialog(false);
    setPendingTemplateId(null);
    if (view === 'dashboard') {
      // If canceling from dashboard, stay on dashboard
    } else {
      setView('dashboard');
    }
  };

  const handleAIInterviewComplete = (resume: Resume) => {
    setCurrentResume(resume);
    setView('editor');
    setIsAIMode(false);
    setSelectedTemplateForAI(null);
  };

  const handleAIInterviewCancel = () => {
    setView('dashboard');
    setIsAIMode(false);
    setSelectedTemplateForAI(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        
        <Route path="/auth" element={
          user ? <Navigate to="/dashboard" replace /> : <AuthPage />
        } />
        
        <Route path="/dashboard" element={
          user ? (
            view === 'dashboard' ? (
              <Dashboard
                user={user}
                onCreateWithAI={handleCreateWithAI}
                onCreateManual={handleCreateManual}
                onEditResume={handleEditResume}
              />
            ) : view === 'template-select' ? (
              <TemplateSelector onSelectTemplate={handleTemplateSelect} />
            ) : view === 'ai-interview' && selectedTemplateForAI ? (
              <AIInterviewWizard
                templateId={selectedTemplateForAI}
                userId={user.id}
                onComplete={handleAIInterviewComplete}
                onCancel={handleAIInterviewCancel}
              />
            ) : view === 'editor' && currentResume ? (
              <div className="flex flex-col lg:flex-row h-screen print:block">
                <div className={`${showPreview ? 'hidden lg:block' : 'block'} lg:flex-1 overflow-y-auto print:hidden`}>
                  <ResumeEditor
                    resume={currentResume}
                    onUpdateResume={handleUpdateResume}
                    onBack={handleBack}
                    onExportPDF={handleExportPDF}
                    completionInfo={completionInfo}
                    showPreview={showPreview}
                    onTogglePreview={() => setShowPreview(!showPreview)}
                  />
                </div>
                <div className={`${showPreview ? 'block' : 'hidden lg:block'} lg:flex-1 overflow-y-auto border-l border-slate-200 relative print:block print:border-0 print:overflow-visible`}>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="lg:hidden fixed top-4 right-4 z-50 px-4 py-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-slate-800 transition-colors print:hidden"
                  >
                    Close Preview
                  </button>
                  <ResumePreview resume={currentResume} />
                </div>
              </div>
            ) : null
          ) : (
            <Navigate to="/auth" replace />
          )
        } />

        <Route path="/cover-letter" element={
          user ? <CoverLetterGenerator user={user} onBack={() => window.history.back()} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/job-application" element={
          user ? <JobApplicationGenerator user={user} onBack={() => window.history.back()} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/optimize-resume" element={
          user ? <ResumeOptimizer user={user} onBack={() => window.history.back()} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/optimize-linkedin" element={
          user ? <LinkedInOptimizer user={user} onBack={() => window.history.back()} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/job-tracker" element={
          user ? <JobTracker user={user} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/revamp-cv" element={
          user ? <CVRevampPage user={user} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/features" element={<FeaturesPage user={user} />} />

        <Route path="/email-integration" element={
          user ? <EmailIntegration user={user} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/settings" element={
          user ? <ProfileSettingsPage user={user} /> : <Navigate to="/auth" replace />
        } />

        <Route path="/:username/resume" element={<PublicProfile />} />
        <Route path="/:username" element={<PublicProfile />} />
        
        <Route path="/users_access_admin" element={
          user ? <AdminDashboard user={user} /> : <Navigate to="/auth" replace />
        } />
      </Routes>

      {showNameDialog && (
        <ResumeNameDialog
          onConfirm={handleResumeNameConfirm}
          onCancel={handleResumeNameCancel}
        />
      )}

      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg">
          Saving...
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
