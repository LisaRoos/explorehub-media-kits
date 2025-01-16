import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Appearance = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Appearance</h1>
          <div className="grid gap-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Theme Settings</h2>
              <div className="grid gap-4">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Color Scheme</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">Light</Button>
                    <Button variant="outline">Dark</Button>
                    <Button variant="outline">System</Button>
                  </div>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Font Size</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">Small</Button>
                    <Button variant="outline">Medium</Button>
                    <Button variant="outline">Large</Button>
                  </div>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};