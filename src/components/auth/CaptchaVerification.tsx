import { useRef, useState, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CaptchaVerificationProps {
  setCaptchaToken: (token: string | null) => void;
  setCaptchaError: (error: string | null) => void;
}

export const CaptchaVerification = ({
  setCaptchaToken,
  setCaptchaError,
}: CaptchaVerificationProps) => {
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-hcaptcha-site-key');
        if (error) throw error;
        setSiteKey(data.siteKey);
      } catch (error) {
        console.error("Failed to fetch hCaptcha site key:", error);
        setCaptchaError("Unable to load captcha. Please try again later.");
        toast.error("Unable to load captcha");
      }
    };

    fetchSiteKey();
  }, [setCaptchaError]);

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
      setCaptchaToken(null);
      setCaptchaError(null);
    }
  };

  const handleVerify = (token: string) => {
    console.log("Verification successful");
    setCaptchaToken(token);
    setCaptchaError(null);
    toast.success("Verification successful");
  };

  const handleError = (err: string) => {
    console.error("HCaptcha Error:", err);
    setCaptchaError("Verification failed. Please try again.");
    toast.error("Verification failed. Please try again.");
    resetCaptcha();
  };

  const handleExpire = () => {
    console.log("Captcha expired");
    setCaptchaToken(null);
    setCaptchaError("Verification expired. Please verify again.");
    toast.error("Verification expired. Please verify again.");
    resetCaptcha();
  };

  if (!siteKey) {
    return (
      <div className="text-center text-red-500">
        Loading captcha...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${isCaptchaLoading ? 'opacity-50' : ''}`}>
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onLoad={() => {
            console.log("HCaptcha loaded successfully");
            setIsCaptchaLoading(false);
          }}
          onVerify={handleVerify}
          onError={handleError}
          onExpire={handleExpire}
          onOpen={() => {
            console.log("Captcha opened");
            setIsCaptchaLoading(true);
          }}
          onClose={() => {
            console.log("Captcha closed");
            setIsCaptchaLoading(false);
          }}
        />
        {isCaptchaLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};