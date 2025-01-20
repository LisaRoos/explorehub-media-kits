import { Link } from "react-router-dom";

interface AuthToggleLinkProps {
  mode: "login" | "signup";
}

export const AuthToggleLink = ({ mode }: AuthToggleLinkProps) => (
  <div className="text-center">
    {mode === "login" ? (
      <p className="text-sm sm:text-base text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    ) : (
      <p className="text-sm sm:text-base text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    )}
  </div>
);