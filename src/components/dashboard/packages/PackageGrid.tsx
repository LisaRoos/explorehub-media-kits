import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PackageGridProps {
  isPaidUser: boolean;
  onUpgrade: () => void;
}

export const PackageGrid = ({ isPaidUser, onUpgrade }: PackageGridProps) => {
  const { data: packages } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data: packages } = await supabase
        .from('influencer_packages')
        .select('*');
      return packages;
    },
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages?.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">
              {pkg.title}
              {!isPaidUser && (
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  PRO
                </span>
              )}
            </h3>
            <p className="text-muted-foreground mb-4">
              {pkg.description}
            </p>
            <Button
              className="w-full"
              variant={!isPaidUser ? "outline" : "default"}
              onClick={() => {
                if (!isPaidUser) {
                  onUpgrade();
                } else {
                  // Handle package selection
                }
              }}
            >
              {!isPaidUser ? "Upgrade to Use" : "Use Package"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};