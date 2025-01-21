import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRecaptchaVerification } from "@/hooks/useRecaptchaVerification";
import { SimpleVerification } from "./SimpleVerification";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isLoading, verifyToken } = useRecaptchaVerification(setIsVerified);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Reset verification state when component mounts
    setIsVerified(false);
  }, [setIsVerified]);

  // If no site key is available, fall back to simple verification
  if (!siteKey) {
    console.log("No reCAPTCHA site key found, falling back to simple verification");
    return <SimpleVerification setIsVerified={setIsVerified} />;
  }

  const handleChange = async (token: string | null) => {
    await verifyToken(token);
    // Reset reCAPTCHA after verification attempt
    recaptchaRef.current?.reset();
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