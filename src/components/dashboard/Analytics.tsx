import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Analytics</h1>
          {/* Analytics content */}
          <p>This is the analytics page where you can view various metrics and data insights.</p>
        </main>
      </div>
    </SidebarProvider>
  );
};
