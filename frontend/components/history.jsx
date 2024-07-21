import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useConversation } from "@/hooks/useConversation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ChatHistory({ session, setOpen }) {
    const { removeConversation, setConversation } = useConversation();

    const [historyDialog, setHistoryDialog] = useState(null);

    const getHistory = async () => {
        const resp = await fetch("/api/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: session.uuid,
            }),
        });
        const data = await resp.json();

        console.log(data);

        setHistoryDialog(data);
    }

    useEffect(() => {
        getHistory();
    }, []);

    async function setConver(key, obj) {
        const newConv = {
            messages: [],
            conversationID: key,
        }
        obj.forEach((element) => {
            newConv.messages.push({
                id: newConv.messages.length,
                message: element.data.content,
                isUser: element.type == "human" ? true : false
            })
        })
        setConversation(newConv);
        console.log(newConv);
        setOpen(false);
    }

    return (
        <div>
            <h1 className=" font-mono py-5">Chat History</h1>
            <div className="flex flex-col gap-3">
                {
                    historyDialog &&
                    // iterate in object historyDialog
                    Object.keys(historyDialog).map((key) => {
                        return (
                            <Link href={"/"} key={key}>
                                <Button className=" whitespace-nowrap w-full max-w-full" key={key} onClick={() => setConver(key, historyDialog[key])}>
                                    {historyDialog[key][0].data.content}
                                </Button>
                            </Link>
                        );
                    })
                }
            </div>
            <div className="mt-5">
                <Button variant="ghost" onClick={() => { setOpen(false); removeConversation() }}>Create new chat</Button>
            </div>
        </div>
    );
}
