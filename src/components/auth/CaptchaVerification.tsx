import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CaptchaLoader } from "./captcha/CaptchaLoader";
import { useCaptchaSetup } from "./captcha/useCaptchaSetup";
import { useCaptchaHandlers } from "./captcha/useCaptchaHandlers";

interface CaptchaVerificationProps {
  setCaptchaToken: (token: string | null) => void;
  setCaptchaError: (error: string | null) => void;
}

export const CaptchaVerification = ({
  setCaptchaToken,
  setCaptchaError,
}: CaptchaVerificationProps) => {
  const { siteKey, isCaptchaLoading, setIsCaptchaLoading } = useCaptchaSetup(setCaptchaError);
  const { captchaRef, handleVerify, handleError, handleExpire } = useCaptchaHandlers(
    setCaptchaToken,
    setCaptchaError
  );

  if (!siteKey) {
    return (
      <div className="text-center text-red-500">
        Loading captcha...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <CaptchaLoader isLoading={isCaptchaLoading}>
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
          reCaptchaCompat={false}
          theme="light"
        />
      </CaptchaLoader>
    </div>
  );
};