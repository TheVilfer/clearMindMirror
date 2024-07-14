"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useConversation } from "@/hooks/useConversation";

export default function ChatHistory() {
  const { removeConversation } = useConversation();
  return (
    <div>
      <h1>Chat History</h1>
      <button onClick={removeConversation}>Clear Chat History </button>
    </div>
  );
}
