export interface Message {
  id: number;
  message: string;
  isUser: boolean;
}

export interface Conversation {
  messages: Message[];
  conversationID: string;
}