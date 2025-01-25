import { AuthHeader } from "./AuthHeader";
import { AuthInputs } from "./AuthInputs";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { AuthFormContainer } from "./AuthFormContainer";
import { useAuthForm } from "@/hooks/useAuthForm";

export const AuthForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
  } = useAuthForm("login");

  return (
    <AuthFormContainer>
      <AuthHeader mode="login" />
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <AuthInputs
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />

        <AuthSubmitButton mode="login" loading={loading} />
      </form>
    </AuthFormContainer>
  );
};