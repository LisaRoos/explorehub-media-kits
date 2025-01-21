import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthHeader } from "./AuthHeader";
import { AuthInputs } from "./AuthInputs";
import { RoleSelector } from "./RoleSelector";
import { TermsAndPrivacy } from "./TermsAndPrivacy";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { AuthToggleLink } from "./AuthToggleLink";
import { CaptchaVerification } from "./CaptchaVerification";
import { AuthFormContainer } from "./AuthFormContainer";
import { AuthApiError } from "@supabase/supabase-js";

export const AuthForm = ({ mode = "signup" }: { mode?: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"influencer" | "brand">("influencer");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

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
    <AuthFormContainer>
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
            <CaptchaVerification
              setCaptchaToken={setCaptchaToken}
              setCaptchaError={setCaptchaError}
            />
            {captchaError && (
              <p className="text-sm text-red-500 text-center">{captchaError}</p>
            )}
          </>
        )}

        <AuthSubmitButton mode={mode} loading={loading} />
        <AuthToggleLink mode={mode} />
      </form>
    </AuthFormContainer>
  );
};