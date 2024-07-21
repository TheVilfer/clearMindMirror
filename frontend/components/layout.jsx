import Header from "./header"
import { useSession } from "next-auth/react"

export default function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen max-h-screen">
            <Header />
            <main className="bg-[#EBF5F9] flex-grow flex justify-center overflow-hidden">
                {children}
            </main>
        </div>
    )
}