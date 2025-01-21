import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRecaptchaVerification } from "@/hooks/useRecaptchaVerification";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isLoading, verifyToken } = useRecaptchaVerification(setIsVerified);

  useEffect(() => {
    // Reset verification state when component mounts
    setIsVerified(false);
  }, [setIsVerified]);

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
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
          onChange={handleChange}
          theme="light"
        />
      </div>
    </div>
  );
};