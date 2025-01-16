import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    message: "Hi! I'm interested in collaborating with your brand.",
    time: "10:30 AM",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    sender: "Mike Chen",
    message: "Thanks for the opportunity! Looking forward to working together.",
    time: "11:45 AM",
    avatar: "/placeholder.svg",
  },
];

export const BrandMessages = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="w-64 pl-9"
            />
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-4">
              <img
                src={message.avatar}
                alt={message.sender}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{message.sender}</h3>
                  <span className="text-sm text-muted-foreground">
                    {message.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};