import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Resume } from '../types/resume';
import { FileText, Plus, Trash2, Edit, Settings, Sparkles, FileCheck, Briefcase, Linkedin, RefreshCw, Mail } from 'lucide-react';
import Navigation from './Navigation';
import { calculateResumeCompletion, getCompletionColor } from '../utils/resumeCompletion';
import ResumeScoreCard from './ResumeScoreCard';
import CoverLettersSection from './CoverLettersSection';

interface DashboardProps {
  user: any;
  onCreateWithAI: () => void;
  onCreateManual: () => void;
  onEditResume: (resume: Resume) => void;
}

export default function Dashboard({ user, onCreateWithAI, onCreateManual, onEditResume }: DashboardProps) {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIOption, setShowAIOption] = useState(false);
  const [selectedResumeForScore, setSelectedResumeForScore] = useState<Resume | null>(null);
  const [renamingResumeId, setRenamingResumeId] = useState<string | null>(null);
  const [newResumeTitle, setNewResumeTitle] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes((data || []) as unknown as Resume[]);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setResumes(resumes.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume');
    }
  };

  const renameResume = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .update({ title: newTitle.trim(), updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setResumes(resumes.map(r =>
        r.id === id ? { ...r, title: newTitle.trim() } : r
      ));
      setRenamingResumeId(null);
    } catch (error) {
      console.error('Error renaming resume:', error);
      alert('Failed to rename resume');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const [profile, setProfile] = useState<any>(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateFullName = async (name: string) => {
    if (!name.trim()) {
      setEditingName(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: name.trim() })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setProfile({ ...profile, full_name: name.trim() });
      setEditingName(false);
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Failed to update name');
    }
  };

  const handleCopyProfileLink = () => {
    const profileUrl = `${window.location.origin}/${profile?.username || user.id}/resume`;
    navigator.clipboard.writeText(profileUrl);
    alert('Profile link copied to clipboard!');
  };

  const handleVisitProfile = () => {
    const username = profile?.username || user.id;
    navigate(`/${username}/resume`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation user={user} />
      
      {/* Hero Section with Public Profile CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {editingName ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={() => {
                      if (newName.trim()) {
                        updateFullName(newName);
                      } else {
                        setEditingName(false);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newName.trim()) {
                        updateFullName(newName);
                      } else if (e.key === 'Escape') {
                        setEditingName(false);
                      }
                    }}
                    className="text-4xl md:text-5xl font-bold bg-white/10 border-2 border-white rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/80"
                    placeholder="Enter your name"
                    autoFocus
                    maxLength={100}
                  />
                ) : (
                  <h1 
                    className="text-4xl md:text-5xl font-bold cursor-pointer hover:text-blue-100 transition-colors"
                    onClick={() => {
                      setEditingName(true);
                      setNewName(profile?.full_name || '');
                    }}
                    title="Click to edit name"
                  >
                    Welcome back{profile?.full_name ? `, ${profile.full_name}` : profile?.username ? `, ${profile.username}` : ''}!
                    {!profile?.full_name && (
                      <span className="text-xl ml-2 text-blue-200">(click to set your name)</span>
                    )}
                  </h1>
                )}
              </div>
              <p className="text-blue-100 text-lg">Create, manage, and share your professional resumes</p>
            </div>
            {profile && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-3">Your Public Profile</h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleVisitProfile}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
                  >
                    Visit Your Profile
                  </button>
                  <button
                    onClick={handleCopyProfileLink}
                    className="px-6 py-2 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-sm"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setShowAIOption(!showAIOption)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
              >
                <Sparkles className="h-5 w-5" />
                Create with AI
              </button>
              
              {showAIOption && (
                <div className="absolute top-full mt-2 left-0 bg-white border-2 border-slate-200 rounded-xl shadow-xl p-4 z-10 w-64">
                  <p className="text-sm mb-3">AI will help you create a professional resume by asking you questions.</p>
                  <button
                    onClick={() => {
                      setShowAIOption(false);
                      onCreateWithAI();
                    }}
                    className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
                  >
                    Start AI Interview
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/revamp-cv')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-5 w-5" />
              Revamp Existing CV
            </button>

            <button
              onClick={onCreateManual}
              className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all shadow-md"
            >
              <Plus className="h-5 w-5" />
              Start from Scratch
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all shadow-md"
            >
              <Settings className="h-5 w-5" />
              Profile Settings
            </button>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Career Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/cover-letter')}
              className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-400 transition-all shadow-md"
            >
              <FileText className="h-6 w-6" />
              <span>Cover Letter Generator</span>
            </button>
            <button
              onClick={() => navigate('/job-application')}
              className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-400 transition-all shadow-md"
            >
              <Briefcase className="h-6 w-6" />
              <span>Job Application</span>
            </button>
            <button
              onClick={() => navigate('/job-tracker')}
              className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-orange-200 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 hover:border-orange-400 transition-all shadow-md"
            >
              <Briefcase className="h-6 w-6" />
              <span>Job Tracker</span>
            </button>
            <button
              onClick={() => navigate('/optimize-resume')}
              className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-green-200 text-green-700 rounded-xl font-semibold hover:bg-green-50 hover:border-green-400 transition-all shadow-md"
            >
              <FileCheck className="h-6 w-6" />
              <span>Resume Optimizer</span>
            </button>
            <button
              onClick={() => navigate('/optimize-linkedin')}
              className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-cyan-200 text-cyan-700 rounded-xl font-semibold hover:bg-cyan-50 hover:border-cyan-400 transition-all shadow-md"
            >
              <Linkedin className="h-6 w-6" />
              <span>LinkedIn Optimizer</span>
            </button>
            <button
              onClick={() => navigate('/email-integration')}
              className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-teal-200 text-teal-700 rounded-xl font-semibold hover:bg-teal-50 hover:border-teal-400 transition-all shadow-md"
            >
              <Mail className="h-6 w-6" />
              <span>Email Integration</span>
            </button>
          </div>
        </div>

        {/* Cover Letters Section */}
        <CoverLettersSection />

        <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">My Resumes</h3>
        
        {/* AI Resume Insights */}
        {selectedResumeForScore && (
          <div className="mb-6">
            <ResumeScoreCard resume={selectedResumeForScore} />
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12 text-slate-600">
            Loading your resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-slate-200">
            <FileText className="h-16 w-16 mx-auto text-indigo-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">No resumes yet</h2>
            <p className="text-slate-600 mb-6">Create your first resume to get started on your career journey</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const completion = calculateResumeCompletion(resume);
              
              return (
                <div
                  key={resume.id}
                  className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText className="h-8 w-8 text-slate-900 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        {renamingResumeId === resume.id ? (
                          <input
                            type="text"
                            value={newResumeTitle}
                            onChange={(e) => setNewResumeTitle(e.target.value)}
                            onBlur={() => {
                              if (newResumeTitle.trim()) {
                                renameResume(resume.id, newResumeTitle);
                              } else {
                                setRenamingResumeId(null);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (newResumeTitle.trim()) {
                                  renameResume(resume.id, newResumeTitle);
                                }
                              } else if (e.key === 'Escape') {
                                setRenamingResumeId(null);
                              }
                            }}
                            className="font-semibold text-lg text-slate-900 border-2 border-indigo-500 rounded px-2 py-1 w-full"
                            autoFocus
                            maxLength={100}
                          />
                        ) : (
                          <h3 
                            className="font-semibold text-lg text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors truncate"
                            onClick={() => {
                              setRenamingResumeId(resume.id);
                              setNewResumeTitle(resume.title);
                            }}
                            title="Click to rename"
                          >
                            {resume.title}
                          </h3>
                        )}
                        <p className="text-sm text-slate-600 capitalize">
                          {resume.template_id} template
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                      completion.percentage >= 80 ? 'bg-green-100 text-green-700' :
                      completion.percentage >= 50 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {completion.percentage}%
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-4">
                    Last updated: {formatDate(resume.updated_at)}
                  </p>

                  {/* Completion Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600">Completion</span>
                      <span className={`text-xs font-semibold ${getCompletionColor(completion.percentage)}`}>
                        {completion.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          completion.percentage >= 80 ? 'bg-green-600' : 
                          completion.percentage >= 50 ? 'bg-yellow-600' : 
                          'bg-red-600'
                        }`}
                        style={{ width: `${completion.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedResumeForScore(resume)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-md"
                    >
                      <Sparkles className="h-4 w-4" />
                      AI Score
                    </button>
                    <button
                      onClick={() => onEditResume(resume)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteResume(resume.id)}
                      className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
