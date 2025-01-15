import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          Transform Your <span className="gradient-text">Social Presence</span> Into
          <br /> Professional Success
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Create stunning media kits, showcase your analytics, and connect with brands
          all in one powerful platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};