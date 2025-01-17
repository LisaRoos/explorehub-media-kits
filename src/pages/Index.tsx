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
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to ExploreHub! 👋",
      description: "Discover the future of influencer marketing.",
      duration: 5000,
    });

    // Add smooth scroll behavior
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          el.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toast]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background transition-colors duration-300 ease-in-out">
        <CustomCursor />
        <Navigation />
        <ThemeToggle />
        <div className="space-y-20">
          <div className="animate-fade-in">
            <Hero />
          </div>
          <div className="animate-on-scroll opacity-0">
            <Services />
          </div>
          <div className="animate-on-scroll opacity-0">
            <BrandFeatures />
          </div>
          <div className="animate-on-scroll opacity-0">
            <Benefits />
          </div>
          <div className="animate-on-scroll opacity-0">
            <InfluencerShowcase />
          </div>
          <div className="animate-on-scroll opacity-0">
            <Pricing />
          </div>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;