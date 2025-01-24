import { toast } from "sonner";
import { AuthApiError } from "@supabase/supabase-js";

export const useAuthError = () => {
  const handleError = (error: Error) => {
    console.error("Authentication error:", error);
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          toast.error("Invalid email or password format");
          break;
        case 422:
          toast.error("Email or password is missing");
          break;
        case 429:
          toast.error("Too many attempts. Please try again later");
          break;
        default:
          toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred. Please try again");
    }
  };

  return { handleError };
};