import { useLocalStorage } from "usehooks-ts";

interface Message {
  id: number;
  message: string;
  isUser: boolean;
}

interface Conversation {
  messages: Message[];
  conversationID: string;
}

export const useConversation = () => {
  const [conversation, setConversation, removeConversation] =
    useLocalStorage<Conversation>("conversation", {
      messages: [],
      conversationID: Math.random().toString().slice(2),
    });

  const addMessage = (message: string, isUser: boolean) => {
    const newMessage: Message = {
      id: conversation.messages.length,
      message,
      isUser,
    };

    setConversation({
      ...conversation,
      messages: [...conversation.messages, newMessage],
    });
  };

  const getId = () => {
    return conversation.conversationID;
  };

  return { conversation, addMessage, removeConversation, getId };
};
