import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Share2 } from "lucide-react";
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
    <div className="flex items-center gap-2 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <Input
        value={shareUrl}
        readOnly
        className="flex-1 bg-background/50"
      />
      <Button
        variant="secondary"
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