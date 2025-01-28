import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormProps {
  name: string;
  email: string;
  bio: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onBioChange: (value: string) => void;
}

export const ProfileForm = ({
  name,
  email,
  bio,
  onNameChange,
  onEmailChange,
  onBioChange,
}: ProfileFormProps) => {
  return (
    <div className="flex-1 space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Tell us about yourself"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};