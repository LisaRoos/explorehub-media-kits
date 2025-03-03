import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { memo } from "react";

const ErrorFallback = () => (
  <div className="text-center p-4">
    <p>Something went wrong. Please try again.</p>
  </div>
);

const HeroContent = memo(() => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Navigating to signup page...");
    navigate("/signup");
  };

  const handleSignIn = () => {
    console.log("Navigating to login page...");
    navigate("/login");
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="text-center space-y-6 sm:space-y-8 max-w-4xl animate-fade-in pt-16 sm:pt-0">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-primary text-transparent bg-clip-text animate-gradient">
          Where Brands & Creators
          <br /> Connect & Thrive
        </h1>
        <p className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
          A powerful platform connecting brands with influencers. Create stunning media kits, 
          showcase analytics, and build meaningful partnerships.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="default"
            className="bg-gradient-secondary hover:opacity-90 text-white px-6 py-2 text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button
            size="default"
            variant="outline"
            className="border-2 border-primary/20 hover:border-primary/40 text-primary px-6 py-2 text-base rounded-full transition-all duration-300 hover:scale-105"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";

export const Hero = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeroContent />
    </ErrorBoundary>
  );
};