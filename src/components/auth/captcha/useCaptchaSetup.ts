import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useCaptchaSetup = (
  setCaptchaError: (error: string | null) => void
) => {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);

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

  return { siteKey, isCaptchaLoading, setIsCaptchaLoading };
};