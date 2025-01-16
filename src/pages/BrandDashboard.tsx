import { BrandOverview } from "@/components/brand/BrandOverview";
import { BrandSidebar } from "@/components/brand/BrandSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const BrandDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <BrandSidebar />
        <main className="flex-1 p-8">
          <BrandOverview />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BrandDashboard;