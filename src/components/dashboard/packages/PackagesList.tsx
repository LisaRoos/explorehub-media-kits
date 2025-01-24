import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Package, PackageFeature, PackageMedia } from "./types";
import { PackageCard } from "./PackageCard";

const PackagesList = () => {
  const navigate = useNavigate();
  
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('influencer_packages')
        .select('*');
      
      if (error) throw error;

      return (data || []).map(pkg => ({
        id: pkg.id,
        profile_id: pkg.profile_id,
        title: pkg.title,
        description: pkg.description,
        price: pkg.price,
        media: pkg.media as PackageMedia,
        features: Array.isArray(pkg.features) 
          ? pkg.features.map(feature => ({
              title: String(feature.title || ''),
              description: feature.description ? String(feature.description) : undefined
            }))
          : [],
        created_at: pkg.created_at,
        updated_at: pkg.updated_at
      }));
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

export default PackagesList;