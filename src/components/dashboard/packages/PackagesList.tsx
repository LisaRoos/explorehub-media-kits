import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Package } from "./types";
import { PackageCard } from "./PackageCard";
import { PackageHeader } from "./PackageHeader";
import { PackageLoading } from "./PackageLoading";

const PackagesList = () => {
  const navigate = useNavigate();
  
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('influencer_packages')
        .select('*');
      
      if (error) throw error;
      
      return data as Package[];
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