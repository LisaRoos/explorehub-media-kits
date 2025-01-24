import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PackageCard } from "./PackageCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Package, PackageFeature, PackageMedia } from "./types";

export const PackagesList = () => {
  const navigate = useNavigate();
  
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('influencer_packages')
        .select('*');
      
      if (error) throw error;

      // Transform the data to match our Package type with proper type checking
      return (data || []).map(pkg => {
        // Safely transform features
        const features = Array.isArray(pkg.features) 
          ? pkg.features.map(feature => {
              if (typeof feature === 'object' && feature !== null && 'title' in feature) {
                return feature as PackageFeature;
              }
              return null;
            }).filter((f): f is PackageFeature => f !== null)
          : null;

        // Safely transform media
        const media = pkg.media as PackageMedia | null;

        return {
          ...pkg,
          media,
          features,
        } as Package;
      });
    },
  });

  if (isLoading) {
    return <div>Loading packages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Packages</h2>
        <Button onClick={() => navigate("/dashboard/packages/new")} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Package
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages?.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </div>
  );
};