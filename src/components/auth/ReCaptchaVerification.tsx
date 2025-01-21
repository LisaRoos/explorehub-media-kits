import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRecaptchaVerification } from "@/hooks/useRecaptchaVerification";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isLoading, verifyToken } = useRecaptchaVerification(setIsVerified);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    setIsVerified(false);
  }, [setIsVerified]);

  if (!siteKey) {
    console.error("No reCAPTCHA site key found in environment variables");
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>
          Verification system is not properly configured. Please try again later or contact support.
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