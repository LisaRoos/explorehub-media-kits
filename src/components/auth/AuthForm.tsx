import { AuthHeader } from "./AuthHeader";
import { AuthInputs } from "./AuthInputs";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { AuthFormContainer } from "./AuthFormContainer";
import { AuthToggleLink } from "./AuthToggleLink";
import { RoleSelector } from "./RoleSelector";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useSignupForm } from "@/hooks/useSignupForm";

interface AuthFormProps {
  mode: "login" | "signup";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const loginForm = useAuthForm(mode);
  const signupForm = useSignupForm();
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
  } = mode === "login" ? loginForm : signupForm;

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
          <RoleSelector
            role={signupForm.role}
            setRole={signupForm.setRole}
          />
        )}

        <AuthSubmitButton mode={mode} loading={loading} />
        <AuthToggleLink mode={mode} />
      </form>
    </AuthFormContainer>
  );
};