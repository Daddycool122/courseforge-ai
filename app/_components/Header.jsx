import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
const Header = () => {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <Link href={"/dashboard"}>
      <Image className="py-2" src="/logo.svg" alt="logo" width={60} height={50} />
      </Link>
        
        <Link href="/dashboard" className="hidden md:flex items-center space-x-2">
        <Button  className="bg-[#18cf97]  text-white">Get Started</Button>
        </Link>
    </div>
  )
}

export default Header