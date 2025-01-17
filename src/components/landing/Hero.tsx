import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="text-center space-y-8 max-w-4xl animate-scale-in">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-300">
          Where{" "}
          <span className="gradient-text bg-300% animate-gradient">
            Brands & Creators
          </span>
          <br /> Connect & Thrive
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
          A powerful platform connecting brands with influencers. Create stunning media kits, 
          showcase analytics, and build meaningful partnerships.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};