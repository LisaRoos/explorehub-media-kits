import { useState, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AuthHeader } from "./AuthHeader";
import { AuthInputs } from "./AuthInputs";
import { RoleSelector } from "./RoleSelector";
import { TermsAndPrivacy } from "./TermsAndPrivacy";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { AuthToggleLink } from "./AuthToggleLink";
import { AuthApiError } from "@supabase/supabase-js";

export const AuthForm = ({ mode = "signup" }: { mode?: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"influencer" | "brand">("influencer");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

  const handleError = (error: Error) => {
    console.error("Authentication error:", error);
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          toast.error("Invalid email or password");
          break;
        case 422:
          toast.error("Email or password is missing");
          break;
        default:
          toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred");
    }
    resetCaptcha();
  };

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
      setCaptchaToken(null);
      setCaptchaError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (mode === "signup" && !captchaToken) {
      setCaptchaError("Please complete the captcha verification");
      toast.error("Please complete the captcha verification");
      return;
    }

    setLoading(true);
    setCaptchaError(null);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Successfully logged in!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role,
            },
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account");
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl border border-white/10">
        <AuthHeader mode={mode} />

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <AuthInputs
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          {mode === "signup" && (
            <>
              <RoleSelector role={role} setRole={setRole} />
              <TermsAndPrivacy />
              <div className="flex flex-col items-center gap-2">
                <div className={`relative ${isCaptchaLoading ? 'opacity-50' : ''}`}>
                  <HCaptcha
                    ref={captchaRef}
                    sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
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
                    onError={(err) => {
                      console.error("HCaptcha Error:", err);
                      setCaptchaError("Captcha verification failed. Please try again.");
                      toast.error("Captcha verification failed. Please try again.");
                      resetCaptcha();
                    }}
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
                {captchaError && (
                  <p className="text-sm text-red-500 text-center">{captchaError}</p>
                )}
              </div>
            </>
          )}

          <AuthSubmitButton mode={mode} loading={loading} />
          <AuthToggleLink mode={mode} />
        </form>
      </div>
    </div>
  );
};