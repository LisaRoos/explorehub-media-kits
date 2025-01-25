interface AuthHeaderProps {
  mode: "login" | "signup";
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => (
  <div className="text-center space-y-2">
    <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent sm:text-3xl">
      {mode === "login" ? "Welcome Back" : "Create Account"}
    </h2>
    <p className="text-muted-foreground text-sm sm:text-base">
      {mode === "login" ? "Sign in to your account" : "Sign up for a new account"}
    </p>
  </div>
);