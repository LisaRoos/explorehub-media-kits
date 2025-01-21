import { AuthHeader } from "./AuthHeader";
import { AuthInputs } from "./AuthInputs";
import { RoleSelector } from "./RoleSelector";
import { TermsAndPrivacy } from "./TermsAndPrivacy";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { AuthToggleLink } from "./AuthToggleLink";
import { SimpleVerification } from "./SimpleVerification";
import { AuthFormContainer } from "./AuthFormContainer";
import { useAuthForm } from "@/hooks/useAuthForm";

export const AuthForm = ({ mode = "signup" }: { mode?: "login" | "signup" }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    loading,
    isVerified,
    setIsVerified,
    handleSubmit,
  } = useAuthForm(mode);

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
            <SimpleVerification setIsVerified={setIsVerified} />
          </>
        )}

        <AuthSubmitButton mode={mode} loading={loading} />
        <AuthToggleLink mode={mode} />
      </form>
    </AuthFormContainer>
  );
};