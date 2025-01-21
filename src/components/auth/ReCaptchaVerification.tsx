import dynamic from 'next/dynamic'
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

// Dynamically import ReCAPTCHA with no SSR
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
});

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const { toast } = useToast();
  const [siteKey, setSiteKey] = useState<string>("");

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const { data: { RECAPTCHA_SITE_KEY }, error } = await supabase.functions.invoke('get-recaptcha-site-key');
        if (error) throw error;
        if (RECAPTCHA_SITE_KEY) {
          setSiteKey(RECAPTCHA_SITE_KEY);
        }
      } catch (error) {
        console.error('Error fetching site key:', error);
        toast({
          title: "Error",
          description: "Could not load verification component",
          variant: "destructive",
        });
      }
    };
    
    fetchSiteKey();
  }, [toast]);

  const handleVerification = async (token: string | null) => {
    if (!token) {
      setIsVerified(false);
      toast({
        title: "Verification failed",
        description: "Please try again",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      if (error) throw error;

      setIsVerified(true);
      toast({
        title: "Success",
        description: "Verification successful!",
      });
    } catch (error) {
      console.error('Verification error:', error);
      setIsVerified(false);
      toast({
        title: "Verification failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (!siteKey) {
    return (
      <div className="flex justify-center my-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleVerification}
      />
    </div>
  );
};