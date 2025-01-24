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
        <PackageCard 
          key={pkg.id} 
          package={pkg} 
          isPaidUser={isPaidUser} 
          onUpgrade={onUpgrade} 
        />
      ))}
    </div>
  );
};

interface PackageCardProps {
  package: any;
  isPaidUser: boolean;
  onUpgrade: () => void;
}

const PackageCard = ({ package: pkg, isPaidUser, onUpgrade }: PackageCardProps) => {
  return (
    <Card className="overflow-hidden">
      <img 
        src={pkg.media?.[0] || "/placeholder.svg"}
        alt={pkg.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">
          {pkg.title}
          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            ${pkg.price}
          </span>
        </h3>
        <p className="text-muted-foreground mb-4">
          {pkg.description}
        </p>
        <Button
          className="w-full"
          variant="default"
          onClick={() => {
            // Handle package selection
          }}
        >
          Edit Package
        </Button>
      </div>
    </Card>
  );
};