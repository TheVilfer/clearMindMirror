'use client'

import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="px-4 py-4">
          <div className="container mx-auto flex justify-between items-center bg-blue-500">
            <div></div>
            <div className="flex gap-2 items-center">
              <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
              <span className="text-blue-500 text-2xl font-semibold">ClearMind</span>
            </div>
            <Link href="/profile" className="text-blue-700 border border-blue-700 px-4 py-2 rounded">
              Profile
            </Link>
          </div>
        </header>
    )
} 