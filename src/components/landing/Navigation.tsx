import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

export const Navigation = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="link" 
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              onClick={() => navigate("/")}
            >
              ExploreHub
            </Button>
            
            <div className="hidden md:flex items-center space-x-1">
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => scrollToSection('brands')}
              >
                For Brands
              </Button>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => scrollToSection('influencers')}
              >
                For Influencers
              </Button>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => scrollToSection('pricing')}
              >
                Pricing
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-sm"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-sm"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};