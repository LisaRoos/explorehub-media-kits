import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const { toast } = useToast();
  const [siteKey, setSiteKey] = useState<string>("");

  useEffect(() => {
    const fetchSiteKey = async () => {
      console.log('Fetching reCAPTCHA site key...');
      try {
        const { data: { RECAPTCHA_SITE_KEY }, error } = await supabase.functions.invoke('get-recaptcha-site-key');
        if (error) {
          console.error('Error fetching site key:', error);
          throw error;
        }
        if (RECAPTCHA_SITE_KEY) {
          console.log('Site key fetched successfully');
          setSiteKey(RECAPTCHA_SITE_KEY);
        } else {
          console.error('No site key returned from function');
          throw new Error('No site key returned');
        }
      } catch (error) {
        console.error('Error in fetchSiteKey:', error);
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
    console.log('Starting verification process...');
    setIsVerified(false); // Reset verification state
    
    if (!token) {
      console.error('No token provided');
      toast({
        title: "Verification failed",
        description: "Please try again",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Sending token to verification endpoint...');
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      console.log('Verification response:', { data, error });

      if (error) {
        console.error('Verification error:', error);
        throw error;
      }

      if (data?.success) {
        console.log('Verification successful!');
        setIsVerified(true);
        toast({
          title: "Success",
          description: "Verification successful!",
        });
      } else {
        console.error('Verification failed:', data);
        setIsVerified(false);
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error in handleVerification:', error);
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