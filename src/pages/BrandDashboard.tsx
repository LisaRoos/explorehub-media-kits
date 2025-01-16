import { BrandOverview } from "@/components/brand/BrandOverview";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const BrandDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <BrandOverview />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BrandDashboard;