import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SignUpCTA = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="px-4 pb-8 flex flex-col items-center">
      <Button 
        onClick={handleSignupClick}
        className="w-56 bg-[#9b87f5] hover:bg-[#8B5CF6] text-white group hover:scale-105 transition-transform"
      >
        <UserPlus className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
        Create Your Own Profile
      </Button>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Join our community of creators and start showcasing your content
      </p>
    </div>
  );
};