import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthInputsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const AuthInputs = ({
  email,
  setEmail,
  password,
  setPassword,
}: AuthInputsProps) => (
  <>
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm sm:text-base">
        Email
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full sm:text-base"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="password" className="text-sm sm:text-base">
        Password
      </Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full sm:text-base"
        placeholder="••••••••"
      />
    </div>
  </>
);