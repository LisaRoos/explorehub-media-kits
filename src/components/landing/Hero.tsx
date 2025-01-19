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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-purple-50/5 dark:to-purple-950/5">
      <div className="text-center space-y-8 max-w-4xl animate-scale-in">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-300% animate-gradient bg-clip-text text-transparent">
          Your Digital
          <br />
          Media Kit
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
          One link to showcase your content, analytics, and brand value
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25"
            onClick={() => navigate("/signup")}
          >
            Create Your Kit
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
      
      <div className="mt-20 w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "10K+", label: "Creators" },
            { number: "50M+", label: "Audience Reach" },
            { number: "1M+", label: "Brand Connections" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
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