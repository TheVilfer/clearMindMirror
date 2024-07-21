import Image from "next/image";
import SignIn from "@/components/signin";
import Link from "next/link";

const Header = () => {
    return (
        <header className=" flex-shrink-0">
            <div className="flex justify-between px-10 py-3">
                <Link href={"/"}>
                    <div className="flex gap-2 items-center">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="mr-2"
                        />
                        <span className="text-[#5981A8] text-2xl font-semibold">
                            ClearMind
                        </span>
                    </div>
                </Link>
                <SignIn />
            </div>
        </header>
    );
};

export default Header;
