import { useState } from "react";
import { Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfileData } from "@/types/profile";

interface ProfilePhotoProps {
  profile: ProfileData | null;
  refetchProfile: () => void;
  isEditable: boolean;
}

export const ProfilePhoto = ({ profile, refetchProfile, isEditable }: ProfilePhotoProps) => {
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || !event.target.files[0]) return;
      
      const file = event.target.files[0];
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile_photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile_photos')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile?.id);

      if (updateError) throw updateError;

      toast.success('Profile photo updated successfully');
      refetchProfile();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload profile photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <img
        src={profile?.avatar_url || "/placeholder.svg"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />
      {isEditable && (
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <label htmlFor="avatar-upload" className="cursor-pointer text-white">
            <Pencil className="w-6 h-6" />
          </label>
          <input 
            type="file" 
            id="avatar-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handlePhotoUpload}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
};