import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="group flex items-center space-x-3">
          <div className="relative">
            <Image 
              className="transition-transform group-hover:scale-105" 
              src="/logo.svg" 
              alt="CourseForge AI" 
              width={32} 
              height={32}
              priority 
            />
          </div>
          <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-[#15b989] to-[#0ead7a] bg-clip-text text-transparent">
            CourseForge
          </span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15b989]/20 focus:border-[#15b989] transition-all duration-200 w-64"
          />
        </div>
        
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back!</p>
            <p className="text-xs text-gray-500">Ready to learn?</p>
          </div>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 border-2 border-[#15b989]/20 hover:border-[#15b989]/40 transition-colors"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;