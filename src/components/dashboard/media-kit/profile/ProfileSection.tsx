import { ProfileData } from "@/types/profile";
import { ProfilePhoto } from "./ProfilePhoto";

interface ProfileSectionProps {
  profile: ProfileData | null;
  refetchProfile: () => void;
  isEditable: boolean;
}

export const ProfileSection = ({ profile, refetchProfile, isEditable }: ProfileSectionProps) => {
  return (
    <div className="flex items-start gap-4">
      <ProfilePhoto 
        profile={profile} 
        refetchProfile={refetchProfile}
        isEditable={isEditable}
      />
      <div>
        <h2 className="text-2xl font-bold">{profile?.full_name || "Your Name"}</h2>
        <p className="text-gray-500">{profile?.bio || "Your Bio"}</p>
      </div>
    </div>
  );
};