import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProfileCreation = () => {
  const createProfile = async (userId: string, role: "influencer" | "brand", email: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            role: role,
            username: email.split('@')[0],
          }
        ]);

      if (error) throw error;
      console.log("Profile created successfully");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile. Please contact support.");
    }
  };

  return { createProfile };
};