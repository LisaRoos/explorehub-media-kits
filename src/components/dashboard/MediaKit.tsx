import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MediaKit = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "My Media Kit", path: "/dashboard" },
    { label: "Messages", path: "/dashboard/messages" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "My Packages", path: "/dashboard/packages" },
    { label: "Templates", path: "/dashboard/appearance" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold">Media Kit</h1>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.path}
                      className="cursor-pointer"
                      onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6">
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">Brand Assets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Logo Package</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download our logo in various formats and sizes
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    Download ZIP
                  </button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Brand Guidelines</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our complete brand style guide
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    View PDF
                  </button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Media Photos</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    High-resolution product and team photos
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    Browse Gallery
                  </button>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">Brand Information</h2>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Company Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    ExploreHub is a leading platform connecting creators with brands
                    for authentic partnerships and collaborations. Founded in 2024,
                    we've helped thousands of creators grow their presence and
                    monetize their content.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Key Statistics</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• 100,000+ Active Creators</li>
                    <li>• 1,000+ Brand Partners</li>
                    <li>• 95% Campaign Satisfaction Rate</li>
                    <li>• Present in 50+ Countries</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">Press Contact</h2>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">
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