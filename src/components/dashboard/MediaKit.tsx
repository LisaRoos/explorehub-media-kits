import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, Download, Eye, FileImage, Users, Instagram, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";

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
            <div className="mx-auto w-[280px] h-[560px] bg-black rounded-[3rem] p-4 shadow-2xl relative overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-10"></div>
              {/* Phone screen */}
              <div className="w-full h-full bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900 rounded-[2.5rem] overflow-y-auto">
                <Card className="p-4 glass-card">
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-gray-400">Travel & Adventure Creator</p>
                    </div>
                  </div>

                  {/* Social Stats */}
                  <div className="flex gap-2 mb-6">
                    <Badge className="bg-pink-500">
                      <Instagram className="w-4 h-4 mr-1" />
                      156K
                    </Badge>
                    <Badge className="bg-black">
                      <TikTokIcon className="w-4 h-4 mr-1" />
                      892K
                    </Badge>
                    <Badge className="bg-red-500">
                      <Youtube className="w-4 h-4 mr-1" />
                      245K
                    </Badge>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-3 rounded-lg bg-primary/10">
                      <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">85K</p>
                      <p className="text-[10px] text-gray-400">Total Followers</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-primary/10">
                      <Eye className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">12.5K</p>
                      <p className="text-[10px] text-gray-400">Profile Views</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-primary/10">
                      <FileImage className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium">4.8%</p>
                      <p className="text-[10px] text-gray-400">Eng. Rate</p>
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
                </Card>
              </div>
            </div>

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