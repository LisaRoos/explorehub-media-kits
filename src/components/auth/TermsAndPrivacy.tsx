import { Link } from "react-router-dom";

export const TermsAndPrivacy = () => (
  <div className="text-xs sm:text-sm text-muted-foreground">
    By signing up, you agree to our{" "}
    <Link to="/terms-of-service" className="text-primary hover:underline" target="_blank">
      Terms of Service
    </Link>{" "}
    and{" "}
    <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
      Privacy Policy
    </Link>
  </div>
);