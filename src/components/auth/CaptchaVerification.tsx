import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { toast } from "sonner";

interface CaptchaVerificationProps {
  setCaptchaToken: (token: string | null) => void;
  setCaptchaError: (error: string | null) => void;
}

export const CaptchaVerification = ({
  setCaptchaToken,
  setCaptchaError,
}: CaptchaVerificationProps) => {
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
      setCaptchaToken(null);
      setCaptchaError(null);
    }
  };

  const handleCaptchaError = (err: string) => {
    console.error("HCaptcha Error:", err);
    setCaptchaError("Captcha verification failed. Please try again.");
    toast.error("Captcha verification failed. Please try again.");
    resetCaptcha();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${isCaptchaLoading ? 'opacity-50' : ''}`}>
        <HCaptcha
          ref={captchaRef}
          sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
          onLoad={() => {
            console.log("HCaptcha loaded successfully");
            setIsCaptchaLoading(false);
          }}
          onVerify={(token) => {
            console.log("Verification successful");
            setCaptchaToken(token);
            setCaptchaError(null);
            toast.success("Captcha verification successful");
          }}
          onError={(err) => handleCaptchaError(err)}
          onExpire={() => {
            console.log("Captcha expired");
            setCaptchaToken(null);
            setCaptchaError("Captcha expired. Please verify again.");
            toast.error("Captcha expired. Please verify again.");
            resetCaptcha();
          }}
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