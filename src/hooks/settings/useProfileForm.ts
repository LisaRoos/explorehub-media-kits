import { useState } from "react";
import { ProfileData } from "@/types/profile";

export const useProfileForm = (profile: ProfileData | null) => {
  const [name, setName] = useState(profile?.full_name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [bio, setBio] = useState(profile?.bio || "");

  const resetProfileForm = () => {
    if (profile) {
      setName(profile.full_name || "");
      setBio(profile.bio || "");
      setEmail(profile.email || "");
    }
  };

  return {
    name,
    email,
    bio,
    setName,
    setEmail,
    setBio,
    resetProfileForm
  };
};