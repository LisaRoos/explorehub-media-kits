import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfilePhotoUpload } from "./settings/ProfilePhotoUpload";
import { ProfileForm } from "./settings/ProfileForm";
import { SocialMediaUrls } from "./settings/SocialMediaUrls";
import { SettingsLayout } from "./settings/SettingsLayout";
import { useSettings } from "@/hooks/useSettings";

const Settings = () => {
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
    refetchProfile
  } = useSettings();

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

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </SettingsLayout>
  );
};

export default Settings;