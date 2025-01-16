import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Contact } from "./types";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ContactList = ({
  contacts,
  selectedContact,
  setSelectedContact,
  searchQuery,
  setSearchQuery,
}: ContactListProps) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 p-4 flex flex-col">
      <div className="mb-4 relative">
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8"
        />
        <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
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
    </div>
  );
};