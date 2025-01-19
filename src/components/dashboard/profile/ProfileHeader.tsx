import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ProfileHeader = () => {
  return (
    <div className="text-center space-y-6">
      <Avatar className="w-32 h-32 mx-auto hover:scale-105 transition-transform">
        <AvatarImage src="/placeholder.svg" alt="Profile" className="object-cover" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">@username</h1>
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
            Lifestyle Influencer
          </span>
        </div>
      </div>

      <p className="text-muted-foreground max-w-md mx-auto">
        Digital creator sharing daily inspiration and creative content
      </p>
    </div>
  );
};