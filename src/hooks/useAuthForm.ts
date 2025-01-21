import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthApiError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "signup";

export const useAuthForm = (mode: AuthMode) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"influencer" | "brand">("influencer");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

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

  const createProfile = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            role: role,
            username: email.split('@')[0], // Create a temporary username from email
          }
        ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile. Please contact support.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (mode === "signup" && !isVerified) {
      toast.error("Please complete the verification");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Successfully logged in!");
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role,
            },
          },
        });
        
        if (error) throw error;
        
        if (data.user) {
          await createProfile(data.user.id);
          toast.success("Account created! Please check your email to confirm your account.");
          navigate("/signup-success"); // Navigate to success page after signup
        }
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};