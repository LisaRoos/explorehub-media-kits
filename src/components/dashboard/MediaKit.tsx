import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, Download, Eye, FileImage, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
          
          <div className="p-3 md:p-6 space-y-6">
            {/* Phone Mockup Style Display */}
            <Card className="max-w-[280px] mx-auto bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900 p-4 rounded-[2rem] shadow-xl">
              <div className="space-y-4">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10">
                    <img
                      src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Name</h3>
                    <p className="text-sm text-muted-foreground">Content Creator</p>
                  </div>
                </div>

                {/* Social Stats */}
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="bg-pink-500">
                    <Users className="w-3 h-3 mr-1" />
                    85K
                  </Badge>
                  <Badge variant="secondary" className="bg-primary">
                    <Eye className="w-3 h-3 mr-1" />
                    12.5K
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">85K</p>
                    <p className="text-[10px] text-gray-400">Followers</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <Eye className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">4.8%</p>
                    <p className="text-[10px] text-gray-400">Eng. Rate</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <FileImage className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">2.1K</p>
                    <p className="text-[10px] text-gray-400">Posts</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full glass-card group hover:scale-105 transition-transform text-xs"
                  >
                    <MessageCircle className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
                    Chat Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full glass-card group hover:scale-105 transition-transform text-xs"
                  >
                    <Package className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
                    View Packages
                  </Button>
                </div>
              </div>
            </Card>

            {/* Brand Assets Section */}
            <section className="space-y-3">
              <h2 className="text-base md:text-lg font-semibold">Brand Assets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-medium mb-2">Logo Package</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Download our logo in various formats and sizes
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <Download className="w-3 h-3 mr-1" />
                    Download ZIP
                  </Button>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-medium mb-2">Brand Guidelines</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Our complete brand style guide
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <Eye className="w-3 h-3 mr-1" />
                    View PDF
                  </Button>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-sm font-medium mb-2">Media Photos</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    High-resolution product and team photos
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <FileImage className="w-3 h-3 mr-1" />
                    Browse Gallery
                  </Button>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MediaKit;