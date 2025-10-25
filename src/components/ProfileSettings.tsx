import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Profile } from '../types/profile';
import { User, Globe, Upload, Link as LinkIcon, Check, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ProfileSettingsProps {
  user: any;
  onClose: () => void;
}

export default function ProfileSettings({ user, onClose }: ProfileSettingsProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
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
        setFullName(data.full_name || '');
        setIsPublic(data.is_public);
        setImagePreview(data.profile_image_url);
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
        full_name: fullName,
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background rounded-xl p-8 max-w-2xl w-full mx-4">
          <p className="text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-background rounded-xl p-8 max-w-2xl w-full mx-4 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Public Profile Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <label className="cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Smith"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Username {profile?.username && <span className="text-muted-foreground text-xs">(cannot be changed)</span>}
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                disabled={!!profile?.username}
                placeholder="your-username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {!profile?.username && username && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {checkingUsername ? (
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : usernameAvailable ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {!profile?.username && username && usernameAvailable === false && (
              <p className="text-sm text-red-500 mt-1">Username not available or too short (min 3 characters)</p>
            )}
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Make Profile Public</p>
                <p className="text-sm text-muted-foreground">
                  Allow anyone to view your resume at your profile URL
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
              <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Profile Link */}
          {profile?.username && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Your Profile URL</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={`${window.location.origin}/${profile.username}/resume`}
                  readOnly
                  className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm"
                />
                <button
                  onClick={copyProfileLink}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <LinkIcon className="h-4 w-4" />
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || (!profile?.username && !usernameAvailable)}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
