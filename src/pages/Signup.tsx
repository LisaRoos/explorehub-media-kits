import { useState } from "react";
import { useSignupForm } from "@/hooks/useSignupForm";
import { toast } from "sonner";

export default function Signup() {
  const { handleSubmit, register, formState: { errors } } = useSignupForm();
  const [role, setRole] = useState<'influencer' | 'brand'>('influencer');

  const onSubmit = async (data: SignupFormData) => {
    if (role === 'brand') {
      toast.info("Brand registration is coming soon!");
      return;
    }
    // Handle the signup logic for influencers
    // ...
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <input
              type="radio"
              value="influencer"
              checked={role === 'influencer'}
              onChange={() => setRole('influencer')}
            />
            Influencer
          </label>
          <label>
            <input
              type="radio"
              value="brand"
              checked={role === 'brand'}
              onChange={() => setRole('brand')}
              disabled
            />
            Brand (Coming Soon)
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
