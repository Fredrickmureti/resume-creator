import { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Upload, X, User } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface PhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoUploaded: (url: string) => void;
  onPhotoRemoved: () => void;
}

export default function PhotoUpload({ currentPhotoUrl, onPhotoUploaded, onPhotoRemoved }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file (JPG, PNG, WEBP)',
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 5MB',
          variant: 'destructive',
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      onPhotoUploaded(publicUrl);
      
      toast({
        title: 'Photo uploaded',
        description: 'Your profile photo has been uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    onPhotoRemoved();
    toast({
      title: 'Photo removed',
      description: 'Your profile photo has been removed',
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-900">Profile Photo</label>
      
      <div className="flex items-center gap-6">
        {/* Photo Preview */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-300 flex items-center justify-center">
            {currentPhotoUrl ? (
              <img 
                src={currentPhotoUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-slate-400" />
            )}
          </div>
          
          {currentPhotoUrl && (
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upload Button */}
        <div>
          <label className="cursor-pointer">
            <div className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Uploading...' : currentPhotoUrl ? 'Change Photo' : 'Upload Photo'}</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="text-sm text-slate-500 mt-2">
            JPG, PNG or WEBP. Max 5MB.
          </p>
        </div>
      </div>
    </div>
  );
}
