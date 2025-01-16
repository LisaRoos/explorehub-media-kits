import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BrandDashboard from "./pages/BrandDashboard";
import { Messages } from "./components/dashboard/Messages";
import { SocialMedia } from "./components/dashboard/SocialMedia";
import { MediaKit } from "./components/dashboard/MediaKit";
import { Analytics } from "./components/dashboard/Analytics";
import { Audience } from "./components/dashboard/Audience";
import { Appearance } from "./components/dashboard/Appearance";
import { Settings } from "./components/dashboard/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

function App() {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/messages" element={<Messages />} />
            <Route path="/dashboard/social-media" element={<SocialMedia />} />
            <Route path="/dashboard/media-kit" element={<MediaKit />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/audience" element={<Audience />} />
            <Route path="/dashboard/appearance" element={<Appearance />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/brand-dashboard/*" element={<BrandDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </TooltipProvider>
  );
}

export default App;