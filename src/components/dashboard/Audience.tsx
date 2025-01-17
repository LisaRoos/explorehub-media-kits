import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Audience = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Audience</h1>
          <div className="grid gap-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Audience Demographics</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Age Range</h3>
                  <p className="text-2xl font-bold mt-2">18-34</p>
                  <p className="text-sm text-muted-foreground">Primary age group</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Gender Distribution</h3>
                  <p className="text-2xl font-bold mt-2">65% F / 35% M</p>
                  <p className="text-sm text-muted-foreground">Female majority</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Top Location</h3>
                  <p className="text-2xl font-bold mt-2">United States</p>
                  <p className="text-sm text-muted-foreground">45% of audience</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Audience;
