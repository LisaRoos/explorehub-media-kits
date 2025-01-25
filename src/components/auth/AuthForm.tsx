import { AuthHeader } from "./AuthHeader";
import { AuthInputs } from "./AuthInputs";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { AuthFormContainer } from "./AuthFormContainer";
import { AuthToggleLink } from "./AuthToggleLink";
import { useAuthForm } from "@/hooks/useAuthForm";

interface AuthFormProps {
  mode: "login" | "signup";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
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

        <AuthSubmitButton mode={mode} loading={loading} />
        <AuthToggleLink mode={mode} />
      </form>
    </AuthFormContainer>
  );
};