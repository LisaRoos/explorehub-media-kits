import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ChatButton = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile;
    },
  });

  const handleChatClick = () => {
    window.location.href = `mailto:lisaroos904@icloud.com`;
  };

  return (
    <div className="px-4">
      <Button 
        onClick={handleChatClick}
        className="w-full glass-card group hover:scale-105 transition-transform"
        variant="outline"
      >
        <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Contact via Email
      </Button>
    </div>
  );
};