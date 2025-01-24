import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PackageGridProps {
  isPaidUser: boolean;
  onUpgrade: () => void;
}

export const PackageGrid = ({ isPaidUser, onUpgrade }: PackageGridProps) => {
  const { data: packages, isLoading, error } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      console.log('Fetching packages...');
      const { data: packages, error } = await supabase
        .from('influencer_packages')
        .select('*');
      
      if (error) {
        console.error('Error fetching packages:', error);
        throw error;
      }
      
      console.log('Fetched packages:', packages);
      return packages;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error in component:', error);
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600">Error loading packages. Please try again later.</p>
      </div>
    );
  }

  if (!packages?.length) {
    return (
      <div className="text-center p-8 bg-accent/10 rounded-lg">
        <p className="text-muted-foreground">No packages found. Create your first package to get started!</p>
        <Button
          onClick={onUpgrade}
          className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Create Your First Package
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
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