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
    console.log("Creating profile for user:", userId, "with role:", role);
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

      if (error) {
        console.error("Error creating profile:", error);
        throw error;
      }
      console.log("Profile created successfully");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile. Please contact support.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted. Mode:", mode);
    console.log("Form state:", { email, password, role, isVerified });
    
    if (loading) {
      console.log("Already processing, skipping submission");
      return;
    }

    if (!email || !password) {
      console.log("Missing email or password");
      toast.error("Please fill in all fields");
      return;
    }

    if (mode === "signup" && !isVerified) {
      console.log("Verification required");
      toast.error("Please complete the verification");
      return;
    }

    if (password.length < 6) {
      console.log("Password too short");
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    console.log("Starting authentication process...");

    try {
      if (mode === "login") {
        console.log("Attempting login...");
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Successfully logged in!");
        navigate("/dashboard");
      } else {
        console.log("Attempting signup...");
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
          console.log("User created successfully:", data.user.id);
          await createProfile(data.user.id);
          toast.success("Account created! Please check your email to confirm your account.");
          navigate("/signup-success");
        } else {
          console.log("No user data returned from signup");
          toast.error("Something went wrong during signup");
        }
      }
    } catch (error) {
      console.error("Authentication error occurred:", error);
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