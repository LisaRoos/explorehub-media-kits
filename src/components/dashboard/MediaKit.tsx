import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";

const MediaKit = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1">
          <DashboardHeader 
            title="Media Kit" 
            description="Manage your brand assets and information"
          />
          
          <div className="p-3 md:p-6 space-y-4 md:space-y-6">
            <section className="space-y-3">
              <h2 className="text-base md:text-lg font-semibold">Brand Assets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Logo Package</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Download our logo in various formats and sizes
                  </p>
                  <button className="text-xs text-primary hover:underline">
                    Download ZIP
                  </button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Brand Guidelines</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Our complete brand style guide
                  </p>
                  <button className="text-xs text-primary hover:underline">
                    View PDF
                  </button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Media Photos</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    High-resolution product and team photos
                  </p>
                  <button className="text-xs text-primary hover:underline">
                    Browse Gallery
                  </button>
                </div>
              </div>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-base md:text-lg font-semibold">Brand Information</h2>
              <div className="grid gap-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Company Overview</h3>
                  <p className="text-xs text-muted-foreground">
                    ExploreHub is a leading platform connecting creators with brands
                    for authentic partnerships and collaborations. Founded in 2024,
                    we've helped thousands of creators grow their presence and
                    monetize their content.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Key Statistics</h3>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li>• 100,000+ Active Creators</li>
                    <li>• 1,000+ Brand Partners</li>
                    <li>• 95% Campaign Satisfaction Rate</li>
                    <li>• Present in 50+ Countries</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base md:text-lg font-semibold">Press Contact</h2>
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground">
                  For press inquiries, please contact:<br />
                  press@explorehub.com<br />
                  +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MediaKit;