import { useState } from "react";
import { Overview } from "@/components/dashboard/Overview";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackgroundCustomizer } from "@/components/dashboard/BackgroundCustomizer";

const Dashboard = () => {
  const [background, setBackground] = useState("linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)");

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen flex w-full transition-all duration-300"
        style={{ background }}
      >
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Overview />
        </main>
        <BackgroundCustomizer onBackgroundChange={setBackground} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;