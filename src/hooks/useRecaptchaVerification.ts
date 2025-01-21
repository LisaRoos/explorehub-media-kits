import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useRecaptchaVerification = (onVerificationChange: (verified: boolean) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const verifyToken = async (token: string) => {
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

      if (data?.success) {
        console.log('reCAPTCHA verification successful!');
        onVerificationChange(true);
      } else {
        console.error('Verification failed:', data);
        onVerificationChange(false);
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error in verification:', error);
      onVerificationChange(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    verifyToken
  };
};