import { Button } from "@/components/ui/button";
import { Share2, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PackageFormActionsProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onShare: () => Promise<void>;
  isSubmitting?: boolean;
}

export const PackageFormActions = ({ 
  onSubmit, 
  onShare,
  isSubmitting = false 
}: PackageFormActionsProps) => {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="flex-1" 
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Creating..." : "Create Package"}
          </Button>
          <Button type="button" variant="outline" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};