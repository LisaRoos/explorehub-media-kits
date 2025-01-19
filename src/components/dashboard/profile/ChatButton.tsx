import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ChatButton = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/dashboard/messages");
  };

  return (
    <div className="px-4">
      <Button 
        onClick={handleChatClick}
        className="w-full glass-card group hover:scale-105 transition-transform"
        variant="outline"
      >
        <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Chat Now
      </Button>
    </div>
  );
};