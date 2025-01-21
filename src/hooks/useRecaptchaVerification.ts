import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useRecaptchaVerification = (onVerificationChange: (verified: boolean) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const verifyToken = async (token: string | null) => {
    console.log('Starting verification process...');
    setIsLoading(true);
    
    if (!token) {
      console.error('No token provided');
      toast.error("Verification failed: No token provided");
      return;
    }

    try {
      console.log('Sending token to verification endpoint...');
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      console.log('Verification response:', data);

      if (error) {
        console.error('Verification error:', error);
        throw error;
      }

      if (data && data.success === true) {
        console.log('Verification successful!');
        onVerificationChange(true);
        toast.success("Verification successful!");
      } else {
        console.error('Verification failed. Response:', data);
        onVerificationChange(false);
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error in verification:', error);
      onVerificationChange(false);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    verifyToken
  };
};