import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just navigate to dashboard
    toast({
      title: "Success!",
      description: mode === "login" ? "Welcome back!" : "Account created successfully!",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="glass-card w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Start your journey with ExploreHub"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
          <div className="text-center text-sm">
            <span className="text-gray-400">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <Button
              variant="link"
              className="text-primary p-0"
              onClick={() => navigate(mode === "login" ? "/signup" : "/login")}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};