import { useLocalStorage } from "usehooks-ts";

export const useConversation = () => {
    const [conversation, setConversation, removeConversation] =
        useLocalStorage("conversation", {
            messages: [],
            conversationID: Math.random().toString().slice(2),
        });

    const addMessage = (message, isUser) => {
        const newMessage = {
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

    return {
        conversation,
        setConversation,
        addMessage,
        removeConversation,
        getId,
    };
};
