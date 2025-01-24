import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PackageHeader } from "./PackageHeader";
import { PackageGrid } from "./PackageGrid";
import { CreatePackageForm } from "./CreatePackageForm";

const PackagesList = () => {
  const navigate = useNavigate();
  
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

  const isPaidUser = subscription?.status === 'pro';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <PackageHeader 
                      isPaidUser={isPaidUser} 
                      onUpgrade={() => navigate("/dashboard/packages/create")} 
                    />
                    <PackageGrid 
                      isPaidUser={isPaidUser} 
                      onUpgrade={() => navigate("/dashboard/packages/create")} 
                    />
                  </>
                } 
              />
              <Route 
                path="/create" 
                element={<CreatePackageForm />} 
              />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PackagesList;