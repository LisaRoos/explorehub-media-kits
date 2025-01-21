import { useState } from "react";
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (mode === "signup" && !captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
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
              <div className="flex justify-center">
                <HCaptcha
                  sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                  onVerify={(token) => setCaptchaToken(token)}
                />
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