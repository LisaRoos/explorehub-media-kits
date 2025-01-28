import { useState } from "react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfilePhotoUploadProps {
  profileId: string | undefined;
  avatarUrl: string | null;
  onPhotoUpdate: () => void;
}

export const ProfilePhotoUpload = ({ profileId, avatarUrl, onPhotoUpdate }: ProfilePhotoUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      if (!profileId) return;
      
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
        .eq('id', profileId);

      if (updateError) throw updateError;

      toast.success('Profile photo updated successfully');
      onPhotoUpdate();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload profile photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <img
        src={avatarUrl || "/placeholder.svg"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />
      <Input
        type="file"
        id="photo-upload"
        className="hidden"
        onChange={handlePhotoUpload}
        accept="image/*"
        disabled={uploading}
      />
      <label
        htmlFor="photo-upload"
        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </label>
    </div>
  );
};