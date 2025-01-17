import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { Services } from "@/components/landing/Services";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandFeatures } from "@/components/landing/BrandFeatures";
import { InfluencerShowcase } from "@/components/landing/InfluencerShowcase";
import { Navigation } from "@/components/landing/Navigation";
import { CustomCursor } from "@/components/ui/custom-cursor";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background transition-colors duration-300 ease-in-out">
        <CustomCursor />
        <Navigation />
        <ThemeToggle />
        <div className="space-y-20 opacity-0 animate-fade-in">
          <Hero />
          <Services />
          <BrandFeatures />
          <Benefits />
          <InfluencerShowcase />
          <Pricing />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;