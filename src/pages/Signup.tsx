import { useState } from "react";
import { useSignupForm } from "@/hooks/useSignupForm";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const { email, setEmail, password, setPassword, role, setRole, loading, handleSubmit: submitForm } = useSignupForm();
  const [username, setUsername] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'brand') {
      toast.info("Brand registration is coming soon!");
      return;
    }
    await submitForm(e);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <Form>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                value="influencer"
                checked={role === 'influencer'}
                onChange={(e) => setRole(e.target.value as "influencer" | "brand")}
                className="mr-2"
              />
              Influencer
            </label>
            <label>
              <input
                type="radio"
                value="brand"
                checked={role === 'brand'}
                onChange={(e) => setRole(e.target.value as "influencer" | "brand")}
                className="mr-2"
                disabled
              />
              Brand (Coming Soon)
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}