import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Profile } from '../types/profile';
import { User, Globe, Upload, Link as LinkIcon, Check, X, ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Navigation from '../components/Navigation';

interface ProfileSettingsPageProps {
  user: any;
}

export default function ProfileSettingsPage({ user }: ProfileSettingsPageProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (username && username !== profile?.username) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(username);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setUsernameAvailable(null);
    }
  }, [username]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfile(data as Profile);
        setUsername(data.username || '');
        setIsPublic(data.is_public);
        setImagePreview(data.profile_image_url);
        setSelectedResumeId(data.selected_resume_id);
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        setProfile(newProfile as Profile);
      }

      // Fetch user's resumes
      const { data: resumesData, error: resumesError } = await supabase
        .from('resumes')
        .select('id, title, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (!resumesError && resumesData) {
        setResumes(resumesData);
        // Set first resume as default if none selected
        if (!data?.selected_resume_id && resumesData.length > 0) {
          setSelectedResumeId(resumesData[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck || usernameToCheck.length < 3) {
      setUsernameAvailable(false);
      return;
    }

    setCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', usernameToCheck)
        .neq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setUsernameAvailable(!data);
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) return profile?.profile_image_url;

    const fileExt = profileImage.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, profileImage, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSave = async () => {
    if (!username || username.length < 3) {
      toast({
        title: 'Invalid username',
        description: 'Username must be at least 3 characters',
        variant: 'destructive',
      });
      return;
    }

    if (profile?.username && username !== profile.username) {
      toast({
        title: 'Username cannot be changed',
        description: 'You have already set a username and it cannot be changed',
        variant: 'destructive',
      });
      return;
    }

    if (!usernameAvailable && username !== profile?.username) {
      toast({
        title: 'Username not available',
        description: 'Please choose a different username',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const imageUrl = await uploadProfileImage();

      const updates: any = {
        is_public: isPublic,
        profile_image_url: imageUrl,
        selected_resume_id: selectedResumeId,
      };

      // Only set username if it hasn't been set before
      if (!profile?.username) {
        updates.username = username;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile settings saved successfully',
      });

      await fetchProfile();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save profile settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const copyProfileLink = () => {
    if (profile?.username) {
      const url = `${window.location.origin}/${profile.username}/resume`;
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied',
        description: 'Profile link copied to clipboard',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Navigation user={user} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation user={user} />
      
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
          <h1 className="text-5xl font-bold mb-3">Profile Settings</h1>
          <p className="text-xl text-purple-100">Customize your public professional profile</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-slate-200">

          <div className="space-y-8">
            {/* Profile Image */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-4">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-16 w-16 text-purple-400" />
                  )}
                </div>
                <div>
                  <label className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg font-semibold">
                    <Upload className="h-5 w-5" />
                    Upload New Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-slate-500 mt-2">JPG, PNG or GIF. Max 5MB</p>
                </div>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-3">
                Username {profile?.username && <span className="text-slate-500 text-sm font-normal">(cannot be changed)</span>}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  disabled={!!profile?.username}
                  placeholder="your-username"
                  className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 transition-all"
                />
                {!profile?.username && username && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {checkingUsername ? (
                      <div className="h-6 w-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    ) : usernameAvailable ? (
                      <Check className="h-6 w-6 text-green-500" />
                    ) : (
                      <X className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {!profile?.username && username && usernameAvailable === false && (
                <p className="text-sm text-red-600 mt-2 font-medium">Username not available or too short (min 3 characters)</p>
              )}
              {!profile?.username && username && usernameAvailable && (
                <p className="text-sm text-green-600 mt-2 font-medium flex items-center gap-1">
                  <Check className="h-4 w-4" /> Username available!
                </p>
              )}
            </div>

            {/* Public Toggle */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-lg">Make Profile Public</p>
                  <p className="text-sm text-slate-600">
                    Share your professional resume with anyone via your custom URL
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
              </label>
            </div>

            {/* Resume Selection */}
            {resumes.length > 0 && (
              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-3">
                  Select Resume for Public Profile
                </label>
                <select
                  value={selectedResumeId || ''}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
                >
                  {resumes.map((resume) => (
                    <option key={resume.id} value={resume.id}>
                      {resume.title}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-500 mt-2">
                  This resume will be displayed on your public profile
                </p>
              </div>
            )}

            {resumes.length === 0 && (
              <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
                <p className="text-slate-900 font-semibold mb-2">No Resume Found</p>
                <p className="text-sm text-slate-600 mb-4">
                  You need to create a resume before your public profile can display content.
                </p>
                <button
                  onClick={() => navigate('/resume-builder')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Resume
                </button>
              </div>
            )}

            {/* Profile Link */}
            {profile?.username && (
              <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <LinkIcon className="h-5 w-5 text-purple-600" />
                  <p className="text-lg font-semibold text-slate-900">Your Public Profile URL</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={`${window.location.origin}/${profile.username}/resume`}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-700 font-mono"
                  />
                  <button
                    onClick={copyProfileLink}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg font-semibold"
                  >
                    <LinkIcon className="h-5 w-5" />
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex gap-4 pt-6 border-t-2 border-slate-200">
              <button
                onClick={handleSave}
                disabled={saving || (!profile?.username && !usernameAvailable)}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Changes...
                  </span>
                ) : (
                  'Save Settings'
                )}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
