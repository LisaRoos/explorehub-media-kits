import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useRecaptchaVerification = (onVerificationChange: (verified: boolean) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const verifyToken = async (token: string): Promise<boolean> => {
    console.log('Starting reCAPTCHA verification...');
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      if (error) {
        console.error('Verification error:', error);
        onVerificationChange(false);
        throw error;
      }

      console.log('Verification response:', data);

      if (data?.success) {
        console.log('reCAPTCHA verification successful!');
        onVerificationChange(true);
        return true;
      } else {
        console.error('Verification failed:', data);
        onVerificationChange(false);
        return false;
      }
    } catch (error) {
      console.error('Error in verification:', error);
      onVerificationChange(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    verifyToken
  };
};