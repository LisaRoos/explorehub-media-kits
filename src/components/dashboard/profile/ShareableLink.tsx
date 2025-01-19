import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";

interface ShareableLinkProps {
  view: "analytics" | "public";
}

export const ShareableLink = ({ view }: ShareableLinkProps) => {
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/dashboard?view=${view}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="gap-2"
      >
        <Link className="h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
};