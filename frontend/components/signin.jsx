import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import ChatHistory from "./history";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";

export default function SignIn() {
    const { data: session, status } = useSession()
    const [open, setOpen] = useState(false);

    if (status === "authenticated")
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button>Profile</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Profile</SheetTitle>
                        <SheetDescription asChild>
                            <div>Hello, {
                                session.user.name
                            }!</div>
                        </SheetDescription>
                        <Separator />
                    </SheetHeader>
                    <ChatHistory setOpen={setOpen} session={session} />
                    <SheetFooter>
                        <div className="flex flex-col mt-5">
                            <div>
                                <Button type="submit" onClick={
                                    () => signOut({ callbackUrl: "/" })
                                }>Sign out</Button>
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );
    return (
        <Button onClick={() => signIn()}>Sign in</Button>
    )
}
