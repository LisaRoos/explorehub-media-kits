import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

interface RoleSelectorProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>I am a...</Label>
      <RadioGroup
        value={role}
        onValueChange={(value) => setRole(value as UserRole)}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="influencer" id="influencer" />
          <Label htmlFor="influencer" className="cursor-pointer">
            Content Creator / Influencer
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="brand" id="brand" />
          <Label htmlFor="brand" className="cursor-pointer">
            Brand / Business
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};