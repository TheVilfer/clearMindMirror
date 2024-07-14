"use client";
import Chat from "@/components/Chat";
import { useEffect } from "react";
import { useConversation } from "@/hooks/useConversation";

export default function Home() {
  const { conversation, addMessage } = useConversation();

  const generateResponse = async (message: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationID: conversation.conversationID,
      }),
    });
    const data = await response.json();
    console.log(data, "output");
    addMessage(data.data.output.output, false);
  };

  useEffect(() => {
    if (!conversation) return;
    console.log(conversation);
    if (conversation.messages.length === 0) {
      addMessage("I feel ...", true);
    }
    if (conversation.messages[conversation.messages.length - 1]?.isUser) {
      console.log("last message is from user");
      generateResponse(
        conversation.messages[conversation.messages.length - 1].message
      );
    }
  }, [conversation]);

  return <Chat conversation={conversation} addMessage={addMessage} />;
}
