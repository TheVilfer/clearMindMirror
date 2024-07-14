import { signIn, auth, signOut } from "@/auth";
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

export default async function SignIn() {
  const session = await auth();
  if (session) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Profile</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            <SheetDescription>
              <p>Hello, {session.user?.name}!</p>
            </SheetDescription>
            <Separator />
          </SheetHeader>
          <ChatHistory />
          <SheetFooter>
            <div className="flex flex-col mt-5">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit">Sign out</Button>
              </form>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Sign in with Google</Button>
    </form>
  );
}
