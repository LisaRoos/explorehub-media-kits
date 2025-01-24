import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuthError } from "./useAuthError";
import { useProfileCreation } from "./useProfileCreation";

type AuthMode = "login" | "signup";

export const useAuthForm = (mode: AuthMode) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"influencer" | "brand">("influencer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleError } = useAuthError();
  const { createProfile } = useProfileCreation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
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
        });
        
        if (error) throw error;
        
        if (data.user) {
          await createProfile(data.user.id, role, email);
          toast.success("Account created! Please check your email to confirm your account.");
          navigate("/signup-success");
        } else {
          toast.error("Something went wrong during signup");
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
    handleSubmit,
  };
};