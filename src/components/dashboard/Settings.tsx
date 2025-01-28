import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfilePhotoUpload } from "./settings/ProfilePhotoUpload";
import { ProfileForm } from "./settings/ProfileForm";
import { SocialMediaUrls } from "./settings/SocialMediaUrls";
import { SettingsLayout } from "./settings/SettingsLayout";
import { useSettings } from "@/hooks/useSettings";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Settings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const {
    name,
    email,
    bio,
    profile,
    platformUrls,
    thumbnails,
    setName,
    setEmail,
    setBio,
    handleUrlChange,
    handleSave,
    resetForm,
    refetchProfile
  } = useSettings();

  const handleCancel = () => {
    resetForm();
    toast.info("Changes discarded");
    navigate('/dashboard/media-kit');
  };

  const handleSaveChanges = async () => {
    try {
      await handleSave();
      // Invalidate and refetch profile data to update all components
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success("Profile updated successfully");
      navigate('/dashboard/media-kit');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <SettingsLayout>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <ProfilePhotoUpload
              profileId={profile?.id}
              avatarUrl={profile?.avatar_url}
              onPhotoUpdate={refetchProfile}
            />
            <ProfileForm
              name={name}
              email={email}
              bio={bio}
              onNameChange={setName}
              onEmailChange={setEmail}
              onBioChange={setBio}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Social Media Content</h2>
        <SocialMediaUrls
          platformUrls={platformUrls}
          thumbnails={thumbnails}
          onUrlChange={handleUrlChange}
        />
      </Card>

      <div className="flex justify-end space-x-4 mt-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </SettingsLayout>
  );
};

export default Settings;