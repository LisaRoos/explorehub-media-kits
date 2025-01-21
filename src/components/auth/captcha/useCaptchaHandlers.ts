import { useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const useCaptchaHandlers = (
  setCaptchaToken: (token: string | null) => void,
  setCaptchaError: (error: string | null) => void
) => {
  const captchaRef = useRef<HCaptcha>(null);

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
      setCaptchaToken(null);
      setCaptchaError(null);
    }
  };

  const handleVerify = async (token: string) => {
    try {
      const { error } = await supabase.functions.invoke('verify-hcaptcha', {
        body: { token }
      });
      
      if (error) throw error;
      
      console.log("Verification successful");
      setCaptchaToken(token);
      setCaptchaError(null);
      toast.success("Verification successful");
    } catch (error) {
      console.error("Verification failed:", error);
      setCaptchaError("Verification failed. Please try again.");
      toast.error("Verification failed. Please try again.");
      resetCaptcha();
    }
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

  return {
    captchaRef,
    handleVerify,
    handleError,
    handleExpire,
  };
};