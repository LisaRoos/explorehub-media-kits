export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: boolean;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}