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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="text-center space-y-8 max-w-4xl animate-fade-in">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-primary text-transparent bg-clip-text animate-gradient">
          Where Brands & Creators
          <br /> Connect & Thrive
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
          A powerful platform connecting brands with influencers. Create stunning media kits, 
          showcase analytics, and build meaningful partnerships.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-secondary hover:opacity-90 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary/20 hover:border-primary/40 text-primary px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/login")}
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