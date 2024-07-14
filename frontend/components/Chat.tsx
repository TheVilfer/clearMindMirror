"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import type { Conversation, Message } from "@/types/conversation";

interface ChatProps {
  conversation: Conversation;
  addMessage: (arg0: string, arg1: boolean) => void;
}

export default function Chat({ conversation, addMessage }: ChatProps) {
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    addMessage(input, true);
    setInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="w-full grid justify-center py-3">
      <div className="w-full max-w-lg  flex flex-col gap-2 overflow-scroll p-4 boarder border-gray-300 rounded-lg bg-gray-50">
        {conversation.messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`px-5 py-2 rounded-lg bg-blue-100 max-w-[80%] ${
                msg.isUser ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none outline-none p-2 text-base"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-100 text-black rounded-lg ml-2 hover:bg-blue-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
