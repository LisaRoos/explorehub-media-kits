import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center">
        <Button variant="link" className="text-xl font-bold" onClick={() => navigate("/")}>
          ExploreHub
        </Button>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">For Creators</h4>
                      <p className="text-sm text-muted-foreground">
                        Build your brand and connect with audiences
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">For Brands</h4>
                      <p className="text-sm text-muted-foreground">
                        Find and collaborate with creators
                      </p>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
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
        <Button variant="ghost" onClick={() => navigate("/login")}>
          Sign In
        </Button>
        <Button onClick={() => navigate("/signup")}>Get Started</Button>
      </div>
    </div>
  );
};