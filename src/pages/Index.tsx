import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandFeatures } from "@/components/landing/BrandFeatures";
import { InfluencerShowcase } from "@/components/landing/InfluencerShowcase";
import { Navigation } from "@/components/landing/Navigation";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen dark:bg-gray-950">
        <Navigation />
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Hero />
        <Benefits />
        <BrandFeatures />
        <InfluencerShowcase />
        <Pricing />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;