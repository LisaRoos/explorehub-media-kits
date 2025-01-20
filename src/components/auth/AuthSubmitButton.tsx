import { Button } from "@/components/ui/button";

interface AuthSubmitButtonProps {
  mode: "login" | "signup";
  loading: boolean;
}

export const AuthSubmitButton = ({ mode, loading }: AuthSubmitButtonProps) => (
  <Button 
    type="submit" 
    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base h-auto sm:h-11"
    disabled={loading}
  >
    {loading ? (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
      </div>
    ) : mode === "login" ? (
      "Sign In"
    ) : (
      "Sign Up"
    )}
  </Button>
);