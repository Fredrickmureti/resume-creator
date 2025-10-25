import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Profile } from '../types/profile';
import { Resume } from '../types/resume';
import { User, FileText } from 'lucide-react';

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPublicProfile();
  }, [username]);

  const fetchPublicProfile = async () => {
    if (!username) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('is_public', true)
        .single();

      if (profileError || !profileData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(profileData as Profile);

      // Fetch selected resume or most recent resume
      let resumeData = null;
      
      if (profileData.selected_resume_id) {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', profileData.selected_resume_id)
          .eq('user_id', profileData.user_id)
          .maybeSingle();
        
        if (!error && data) {
          resumeData = data;
        }
      }
      
      // Fallback to most recent resume if no selected resume
      if (!resumeData) {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', profileData.user_id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (!error && data) {
          resumeData = data;
        }
      }

      if (resumeData) {
        setResume(resumeData as unknown as Resume);
      }
    } catch (error) {
      console.error('Error fetching public profile:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    if (!resume) return null;

    // Import ResumePreview component to ensure consistency
    const ResumePreview = React.lazy(() => import('../components/ResumePreview'));
    
    return (
      <React.Suspense fallback={<div className="text-center py-8">Loading template...</div>}>
        <ResumePreview resume={resume} />
      </React.Suspense>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center max-w-md mx-4">
          <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The profile you're looking for doesn't exist or is not public.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {profile.profile_image_url ? (
                <img
                  src={profile.profile_image_url}
                  alt={profile.username || 'Profile'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">@{profile.username}</h1>
              {resume?.personal_info && (
                <p className="text-muted-foreground mt-1">
                  {resume.personal_info.fullName}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Resume Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resume ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderTemplate()}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">No Resume Available</h2>
              <p className="text-muted-foreground mb-6">
                {profile?.username} hasn't added a resume to their public profile yet.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Create Your Own Resume
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>
            Created with{' '}
            <a 
              href="/" 
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
            >
              Create Resume
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
