import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Package } from "./types";
import { PackageCard } from "./PackageCard";
import { PackageHeader } from "./PackageHeader";
import { PackageLoading } from "./PackageLoading";
import { toast } from "sonner";

const PackagesList = () => {
  const navigate = useNavigate();
  
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('influencer_packages')
        .select('*');
      
      if (error) {
        toast.error("Failed to load packages");
        throw error;
      }
      
      // Transform the raw data to match the Package type
      return (data || []).map((item): Package => ({
        id: item.id,
        profile_id: item.profile_id,
        title: item.title,
        description: item.description || null,
        price: item.price || null,
        features: Array.isArray(item.features) 
          ? item.features.map(feature => ({
              title: String(feature.title || ''),
              description: feature.description || undefined
            }))
          : null,
        media: item.media ? {
          images: Array.isArray(item.media.images) ? item.media.images : undefined,
          videos: Array.isArray(item.media.videos) ? item.media.videos : undefined
        } : null,
        created_at: item.created_at || null,
        updated_at: item.updated_at || null
      }));
    },
  });

  if (isLoading) {
    return <PackageLoading />;
  }

  return (
    <div className="space-y-6">
      <PackageHeader onCreateClick={() => navigate("/dashboard/packages/new")} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages?.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default PackagesList;