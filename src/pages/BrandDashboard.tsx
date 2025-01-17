import { Routes, Route } from "react-router-dom";
import BrandOverview from "@/components/brand/BrandOverview";
import { BrandAnalytics } from "@/components/brand/BrandAnalytics";
import { BrandTeam } from "@/components/brand/BrandTeam";
import { BrandSettings } from "@/components/brand/BrandSettings";
import { BrandMessages } from "@/components/brand/BrandMessages";
import { BrandFavorites } from "@/components/brand/BrandFavorites";
import { BrandSidebar } from "@/components/brand/BrandSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const BrandDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <BrandSidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route index element={<BrandOverview />} />
            <Route path="analytics" element={<BrandAnalytics />} />
            <Route path="team" element={<BrandTeam />} />
            <Route path="settings" element={<BrandSettings />} />
            <Route path="messages" element={<BrandMessages />} />
            <Route path="favorites" element={<BrandFavorites />} />
            <Route path="find" element={<BrandOverview />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BrandDashboard;