"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/useConversation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { conversation, addMessage } = useConversation();

  const [firstMessage, setFirstMessage] = useState("");

  const router = useRouter();

  const handleSendMessage = () => {
    addMessage(firstMessage, true);
    router.push("/chat");
  };

  return (
    <>
      <div className="grid place-items-center w-full">
        <div className="text-center text-[#5981A8] text-2xl">
          <div>Hello! I’m first aid AI-psychologist</div>
          <div className="mt-5 text-4xl font-medium">How can I help you?</div>
          <div>
            <form
              action={() => handleSendMessage()}
              className="mt-10 flex gap-3"
            >
              <Input
                onChange={(e) => setFirstMessage(e.target.value)}
                className="rounded-xl"
                placeholder="I feel ..."
              />
              <Button className="rounded-full px-5 py-2 bg-[#106B9E]">
                <Image src="/arrowUP.svg" alt="Send" width={24} height={24} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
