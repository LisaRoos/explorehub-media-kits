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
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center">
        <Button variant="link" className="text-xl font-bold" onClick={() => navigate("/")}>
          ExploreHub
        </Button>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button variant="link" onClick={() => scrollToSection('brands')}>
                For Brands
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="link" onClick={() => scrollToSection('influencers')}>
                For Influencers
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="link" asChild>
                <NavigationMenuLink href="#services">Services</NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="link" asChild>
                <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
          </>
        )}
      </div>
    </div>
  );
};