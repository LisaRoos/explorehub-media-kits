import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: boolean;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastMessage: "Looking forward to our collaboration!",
    unread: true,
  },
  {
    id: 2,
    name: "Tech Brands Co",
    avatar: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    lastMessage: "We'd love to work with you on our next campaign",
    unread: false,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hi! I saw your profile and I'm really impressed with your content.",
    timestamp: "10:30 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    sender: "You",
    content: "Thank you! I'd love to hear more about potential collaborations.",
    timestamp: "10:32 AM",
    avatar: "/placeholder.svg",
  },
];

export const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "/placeholder.svg",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4">
      <Card className="w-80 p-4 flex flex-col">
        <div className="mb-4">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{contact.name}</p>
                      {contact.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm truncate text-muted-foreground">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex-1 p-4 flex flex-col">
        {selectedContact ? (
          <>
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
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a contact to start messaging
          </div>
        )}
      </Card>
    </div>
  );
};