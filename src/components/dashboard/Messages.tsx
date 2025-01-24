import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { ContactList } from "./messages/ContactList";
import { ChatWindow } from "./messages/ChatWindow";
import { useState } from "react";
import { Contact, Message } from "./messages/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowChat(true);
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
            <div className={`flex-1 transition-all ${showChat ? 'hidden md:block md:w-1/3' : 'w-full'}`}>
              <ContactList
                contacts={mockContacts}
                selectedContact={selectedContact}
                setSelectedContact={handleContactClick}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className={`flex-1 ${!showChat ? 'hidden' : 'block'}`}>
              {showChat && (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setShowChat(false)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    {selectedContact?.name}
                  </div>
                  <ChatWindow
                    selectedContact={selectedContact}
                    messages={mockMessages}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSendMessage={handleSendMessage}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Messages;