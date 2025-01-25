import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ShareableLinkProps {
  view: "analytics" | "public";
}

export const ShareableLink = ({ view }: ShareableLinkProps) => {
  const [copying, setCopying] = useState(false);

  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .maybeSingle();
      return subscription;
    },
  });

  const handleCopyLink = async () => {
    if (view === "analytics" && subscription?.status !== "brand") {
      toast.error("You need a brand subscription to share analytics view");
      return;
    }

    try {
      setCopying(true);
      const shareableLink = `${window.location.origin}/dashboard?view=${view}`;
      await navigator.clipboard.writeText(shareableLink);
      toast.success(`${view === "analytics" ? "Analytics" : "Public"} link copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy link");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="flex justify-center w-full p-4">
      <Button
        variant="outline"
        onClick={handleCopyLink}
        disabled={copying}
        className="w-40"
      >
        Copy {view === "analytics" ? "Analytics" : "Public"} Link
      </Button>
    </div>
  );
};