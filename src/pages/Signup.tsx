import { useState } from "react";
import { useSignupForm } from "@/hooks/useSignupForm";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export default function Signup() {
  const { email, setEmail, password, setPassword, role, setRole, loading, handleSubmit: submitForm } = useSignupForm();
  const [username, setUsername] = useState("");
  
  const form = useForm<SignupFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "influencer" as UserRole,
    },
  });

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
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setRole(value as UserRole);
                    }}
                    defaultValue="influencer"
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="influencer" id="influencer" />
                      <FormLabel htmlFor="influencer">Influencer</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="brand" id="brand" disabled />
                      <FormLabel htmlFor="brand" className="flex items-center gap-2">
                        Brand
                        <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    onChange={(e) => {
                      field.onChange(e);
                      setEmail(e.target.value);
                    }}
                    placeholder="Email"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    onChange={(e) => {
                      field.onChange(e);
                      setPassword(e.target.value);
                    }}
                    placeholder="Password"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}