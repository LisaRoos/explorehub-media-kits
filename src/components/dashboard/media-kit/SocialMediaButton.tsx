import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SocialMediaButtonProps {
  icon: LucideIcon;
  platform: string;
  followers: string;
  url: string;
  color: string;
}

export const SocialMediaButton = ({
  icon: Icon,
  platform,
  followers,
  url,
  color
}: SocialMediaButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Button
        variant="outline"
        className={`w-full justify-between hover:scale-105 transition-transform ${color} text-white`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <span>{platform}</span>
        </div>
        <span className="font-semibold">{followers}</span>
      </Button>
    </a>
  );
};