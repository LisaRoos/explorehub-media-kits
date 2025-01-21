import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRecaptchaVerification } from "@/hooks/useRecaptchaVerification";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isLoading, verifyToken } = useRecaptchaVerification(setIsVerified);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-recaptcha-site-key');
        if (error) throw error;
        if (!data?.RECAPTCHA_SITE_KEY) {
          throw new Error('No site key returned from server');
        }
        setSiteKey(data.RECAPTCHA_SITE_KEY);
      } catch (err) {
        console.error("Failed to fetch reCAPTCHA site key:", err);
        setError("Failed to load verification system. Please try again later.");
      }
    };

    fetchSiteKey();
    setIsVerified(false);
  }, [setIsVerified]);

  if (error || !siteKey) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>
          {error || "Verification system is not properly configured. Please try again later or contact support."}
        </AlertDescription>
      </Alert>
    );
  }

  const handleChange = async (token: string | null) => {
    if (!token) {
      console.error("No token provided");
      toast.error("Verification failed. Please try again.");
      setIsVerified(false);
      return;
    }

    try {
      await verifyToken(token);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.");
      setIsVerified(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleChange}
          theme="light"
        />
      </div>
    </div>
  );
};