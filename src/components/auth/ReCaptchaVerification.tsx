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
      const { data: { RECAPTCHA_SITE_KEY } } = await supabase.functions.invoke('get-hcaptcha-site-key');
      if (RECAPTCHA_SITE_KEY) {
        setSiteKey(RECAPTCHA_SITE_KEY);
      }
    };
    
    fetchSiteKey();
  }, []);

  const handleVerification = (token: string | null) => {
    if (token) {
      setIsVerified(true);
      toast({
        title: "Verification successful",
        description: "You've been verified successfully!",
      });
    } else {
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