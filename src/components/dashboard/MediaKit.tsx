import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { PhoneFrame } from "./media-kit/PhoneFrame";
import { MediaKitContent } from "./media-kit/MediaKitContent";
import { BrandAssets } from "./media-kit/BrandAssets";

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
          
          <div className="p-3 md:p-6 space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div className="flex justify-center">
              <PhoneFrame>
                <MediaKitContent />
              </PhoneFrame>
            </div>
            <div className="space-y-6">
              <BrandAssets />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MediaKit;