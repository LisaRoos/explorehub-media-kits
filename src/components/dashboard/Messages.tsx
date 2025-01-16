import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ContactList } from "./messages/ContactList";
import { ChatWindow } from "./messages/ChatWindow";
import { Contact, Message } from "./messages/types";

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

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4">
      <Card className="w-80">
        <ContactList
          contacts={mockContacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Card>

      <Card className="flex-1">
        <ChatWindow
          selectedContact={selectedContact}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </Card>
    </div>
  );
};