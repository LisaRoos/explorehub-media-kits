import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const { toast } = useToast();
  const [siteKey, setSiteKey] = useState<string>("");

  useEffect(() => {
    const fetchSiteKey = async () => {
      const { data: { RECAPTCHA_SITE_KEY } } = await supabase.functions.invoke('get-recaptcha-site-key');
      if (RECAPTCHA_SITE_KEY) {
        setSiteKey(RECAPTCHA_SITE_KEY);
      }
    };
    
    fetchSiteKey();
  }, []);

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
        title: "Verification successful",
        description: "You've been verified successfully!",
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
    return <div className="flex justify-center my-4">Loading verification...</div>;
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