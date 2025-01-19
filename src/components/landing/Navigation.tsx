import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

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
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <Button 
            variant="link" 
            className="text-xl font-bold bg-gradient-primary text-transparent bg-clip-text" 
            onClick={() => navigate("/")}
          >
            ExploreHub
          </Button>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="rounded-full"
                  onClick={() => scrollToSection('brands')}
                >
                  For Brands
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="rounded-full"
                  onClick={() => scrollToSection('influencers')}
                >
                  For Influencers
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="rounded-full"
                  onClick={() => scrollToSection('services')}
                >
                  Services
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="rounded-full"
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Button 
                variant="ghost" 
                className="rounded-full"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="rounded-full"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-secondary text-white rounded-full hover:opacity-90"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};