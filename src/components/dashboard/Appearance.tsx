import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and minimal design for a professional look",
    preview: "/placeholder.svg",
    isPro: true,
  },
  {
    id: 2,
    name: "Creative",
    description: "Showcase your creativity with this dynamic template",
    preview: "/placeholder.svg",
    isPro: true,
  },
  {
    id: 3,
    name: "Basic",
    description: "Simple and effective layout for your content",
    preview: "/placeholder.svg",
    isPro: false,
  },
];

const Appearance = () => {
  const navigate = useNavigate();
  
  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .maybeSingle();
      return subscription;
    },
  });

  const isPaidUser = subscription?.status === 'pro';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Templates</h1>
              {!isPaidUser && (
                <Button 
                  onClick={() => navigate("/pricing")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  Upgrade to Pro
                </Button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {template.name}
                      {template.isPro && !isPaidUser && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          PRO
                        </span>
                      )}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <Button
                      className="w-full"
                      variant={template.isPro && !isPaidUser ? "outline" : "default"}
                      onClick={() => {
                        if (template.isPro && !isPaidUser) {
                          navigate("/pricing");
                        } else {
                          // Handle template selection
                        }
                      }}
                    >
                      {template.isPro && !isPaidUser ? "Upgrade to Use" : "Use Template"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Appearance;
