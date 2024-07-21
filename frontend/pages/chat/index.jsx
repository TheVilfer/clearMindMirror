import { useEffect, useState } from "react";
import { useConversation } from "@/hooks/useConversation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";


export default function Home() {
    const { conversation, addMessage, getId, } = useConversation();
    const [conversationState, setConversationState] = useState(null);
    const { data: session } = useSession();

    const generateResponse = async (message) => {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                conversationID: getId(),
                userID: session.uuid
            }),
        });
        const data = await response.json();
        console.log(data, "output");
        addMessage(data.output.content, false);
    };

    useEffect(() => {
        setConversationState(conversation);
    }, [conversation]);

    useEffect(() => {
        if (!conversationState) return;
        console.log(conversationState);
        if (conversationState.messages.length === 0) {
            addMessage("Hi! I think i need your help", true);
        }
        if (conversationState.messages[conversationState.messages.length - 1]?.isUser) {
            console.log("last message is from user");
            generateResponse(
                conversationState.messages[conversationState.messages.length - 1].message
            );
        }
    }, [conversationState]);

    if (!conversationState) return null;

    return <Chat conversation={conversationState} addMessage={addMessage} />;
}

function Chat({ conversation, addMessage }) {
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        addMessage(input, true);
        setInput("");
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="w-full flex flex-col max-w-md min-w-sm py-3">
            <div className="w-full max-w-lg flex-grow flex flex-col gap-2 overflow-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
                {conversation.messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                        <span
                            className={`px-4 py-2 rounded-lg max-w-[80%] ${msg.isUser ? "bg-blue-100" : "bg-green-100"} shadow`}
                        >
                            {msg.message}
                        </span>
                    </div>
                ))}
            </div>
            <div className="w-full max-w-lg flex items-center border border-gray-300 rounded-lg p-2 bg-white mt-3">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border-none outline-none p-2 text-base bg-transparent"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-500 text-white rounded-lg ml-2 hover:bg-blue-600 transition-colors"
                >
                    Send
                </button>
            </div>
        </div>

    );
}
