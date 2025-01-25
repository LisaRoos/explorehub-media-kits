import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import { toast } from "sonner";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BrandDashboard = lazy(() => import("./pages/BrandDashboard"));
const Messages = lazy(() => import("./components/dashboard/Messages"));
const SocialMedia = lazy(() => import("./components/dashboard/SocialMedia"));
const Analytics = lazy(() => import("./components/dashboard/Analytics"));
const Appearance = lazy(() => import("./components/dashboard/Appearance"));
const Settings = lazy(() => import("./components/dashboard/Settings"));
const PackagesList = lazy(() => import("./components/dashboard/packages/PackagesList"));
const CreatePackage = lazy(() => import("./components/dashboard/packages/CreatePackage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error('Caught error:', error);
        toast.error('An unexpected error occurred');
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/messages" element={<Messages />} />
              <Route path="/dashboard/social-media" element={<SocialMedia />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/appearance" element={<Appearance />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/packages/*" element={<PackagesList />} />
              <Route path="/dashboard/packages/create" element={<CreatePackage />} />
              <Route path="/brand-dashboard/*" element={<BrandDashboard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
