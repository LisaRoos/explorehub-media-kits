import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleSelectorProps {
  role: "influencer" | "brand";
  setRole: (role: "influencer" | "brand") => void;
}

export const RoleSelector = ({ role, setRole }: RoleSelectorProps) => (
  <RadioGroup
    defaultValue={role}
    onValueChange={(value) => setRole(value as "influencer" | "brand")}
    className="flex flex-col space-y-2 sm:space-y-3"
  >
    <div className="flex items-center space-x-3">
      <RadioGroupItem value="influencer" id="influencer" />
      <Label htmlFor="influencer" className="text-sm sm:text-base">I am an Influencer</Label>
    </div>
    <div className="flex items-center space-x-3">
      <RadioGroupItem value="brand" id="brand" />
      <Label htmlFor="brand" className="text-sm sm:text-base">I am a Brand</Label>
    </div>
  </RadioGroup>
);