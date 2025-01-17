import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/theme/theme-provider";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const Appearance = () => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    // Load saved font size preference
    const savedFontSize = localStorage.getItem("font-size") || "medium";
    setFontSize(savedFontSize);
    document.documentElement.setAttribute("data-font-size", savedFontSize);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    localStorage.setItem("font-size", size);
    document.documentElement.setAttribute("data-font-size", size);
    toast.success(`Font size changed to ${size}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-4">Appearance</h1>
          <div className="grid gap-6 max-w-2xl">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Theme Settings</h2>
              <div className="grid gap-4">
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Color Scheme</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => handleThemeChange("light")}
                      className="flex-1"
                    >
                      Light
                    </Button>
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => handleThemeChange("dark")}
                      className="flex-1"
                    >
                      Dark
                    </Button>
                    <Button 
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => handleThemeChange("system")}
                      className="flex-1"
                    >
                      System
                    </Button>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Font Size</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={fontSize === "small" ? "default" : "outline"}
                      onClick={() => handleFontSizeChange("small")}
                      className="flex-1"
                    >
                      Small
                    </Button>
                    <Button 
                      variant={fontSize === "medium" ? "default" : "outline"}
                      onClick={() => handleFontSizeChange("medium")}
                      className="flex-1"
                    >
                      Medium
                    </Button>
                    <Button 
                      variant={fontSize === "large" ? "default" : "outline"}
                      onClick={() => handleFontSizeChange("large")}
                      className="flex-1"
                    >
                      Large
                    </Button>
                  </div>
                </Card>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Preview</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Sample Text</h3>
                  <p className="text-muted-foreground">
                    This is how your content will look with the current settings.
                  </p>
                  <div className="grid gap-2">
                    <p className="text-sm">Small text example</p>
                    <p>Regular text example</p>
                    <p className="text-lg">Large text example</p>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Appearance;
