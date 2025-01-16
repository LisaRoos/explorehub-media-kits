import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Contact, Message } from "./types";

interface ChatWindowProps {
  selectedContact: Contact | null;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const ChatWindow = ({
  selectedContact,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
}: ChatWindowProps) => {
  if (!selectedContact) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a contact to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex items-center gap-3 pb-4 border-b">
        <Avatar>
          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
          <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{selectedContact.name}</h3>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "You" ? "justify-end" : ""
              }`}
            >
              {message.sender !== "You" && (
                <Avatar>
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "You"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70">{message.timestamp}</span>
              </div>
              {message.sender === "You" && (
                <Avatar>
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-4 border-t mt-4">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};