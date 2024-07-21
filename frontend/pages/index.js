import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/useConversation";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const { conversation, addMessage } = useConversation();

  const [firstMessage, setFirstMessage] = useState("");

  const handleSendMessage = () => {
    if (!firstMessage.trim()) return;
    addMessage(firstMessage, true);
  };




  return (
    <>
      <div className="grid place-items-center w-full">
        <div className="text-center text-[#5981A8] text-2xl">
          <div>Hello! I’m first aid AI-psychologist</div>
          <div className="mt-5 text-4xl font-medium">How can I help you?</div>
          <div>
            <div
              className="mt-10 flex gap-3"
            >
              <Input
                onChange={(e) => setFirstMessage(e.target.value)}
                className="rounded-xl"
                placeholder="I feel ..."
              />
              <Link href={"/chat"}>
                <Button onClick={() => handleSendMessage()} className="rounded-full px-5 py-2 bg-[#106B9E]">
                  <Image src="/arrowUP.svg" alt="Send" width={24} height={24} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
