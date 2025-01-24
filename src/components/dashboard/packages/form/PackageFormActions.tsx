import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface PackageFormActionsProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onShare: () => Promise<void>;
}

export const PackageFormActions = ({ onSubmit, onShare }: PackageFormActionsProps) => {
  return (
    <div className="mt-6 flex gap-4">
      <Button type="submit" className="flex-1" onClick={onSubmit}>
        Create Package
      </Button>
      <Button type="button" variant="outline" onClick={onShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
};