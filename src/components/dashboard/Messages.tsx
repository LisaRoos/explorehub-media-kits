import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { ContactList } from "./messages/ContactList";
import { ChatWindow } from "./messages/ChatWindow";
import { useState } from "react";
import { Contact, Message } from "./messages/types";

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg",
    lastMessage: "Hey, how are you?",
    unread: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/placeholder.svg",
    lastMessage: "Looking forward to our meeting!",
    unread: false,
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Let's catch up soon!",
    unread: true,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    content: "Hey there!",
    sender: "John Doe",
    timestamp: "10:00 AM",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    content: "Looking forward to our meeting!",
    sender: "Jane Smith",
    timestamp: "10:05 AM",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    content: "Let's catch up soon!",
    sender: "Alice Johnson",
    timestamp: "10:10 AM",
    avatar: "/placeholder.svg",
  },
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Logic to send the message
    setNewMessage("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            title="Messages" 
            description="Chat with your contacts"
          />
          <div className="flex-1 flex">
            <ContactList
              contacts={mockContacts}
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <ChatWindow
              selectedContact={selectedContact}
              messages={mockMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Messages;
