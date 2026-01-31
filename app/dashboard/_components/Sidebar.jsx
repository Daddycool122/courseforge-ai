"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { GiArmorUpgrade } from "react-icons/gi";
import { GoStack } from "react-icons/go";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserCourseListContext } from "@/app/_context/UserCourseList";
import { Progress } from "@/components/ui/progress";
import { X, BookOpen, Star, Award } from "lucide-react";

const Sidebar = ({ onClose, className = "", isMobile = false }) => {
  const Menu = [
    { id: 1, name: "Home", icon: <AiOutlineHome />, path: "/dashboard", description: "Your dashboard" },
    { id: 2, name: "Explore", icon: <GoStack />, path: "/dashboard/explore", description: "Discover courses" },
    { id: 3, name: "Upgrade", icon: <GiArmorUpgrade />, path: "/dashboard/upgrade", description: "Premium features" },
    { id: 4, name: "Logout", icon: <TbLogout />, path: "/dashboard/logout", description: "Sign out" },
  ];
  const path = usePathname();
  const { userCourseList } = useContext(UserCourseListContext);

  return (
    <aside className={`h-full bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/60 shadow-lg ${className}`}>
      <div className="flex flex-col h-full p-4 md:p-6">
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex justify-between items-center mb-6 md:hidden">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="CourseForge AI" width={32} height={32} />
              <span className="text-lg font-bold bg-gradient-to-r from-[#15b989] to-[#0ead7a] bg-clip-text text-transparent">
                CourseForge
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#15b989]/20"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Logo for desktop */}
        {!isMobile && (
          <div className="flex items-center space-x-3 mb-8">
            <Image src="/logo.svg" alt="CourseForge AI" width={40} height={40} />
            <span className="hidden lg:block text-xl font-bold bg-gradient-to-r from-[#15b989] to-[#0ead7a] bg-clip-text text-transparent">
              CourseForge
            </span>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2">
          {Menu.map((item) => (
            <Link key={item.id} href={item.path} onClick={onClose}>
              <div
                className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer
                ${item.path === path 
                  ? "bg-gradient-to-r from-[#15b989]/10 to-[#0ead7a]/10 text-[#15b989] shadow-sm border border-[#15b989]/20" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <div className={`text-xl transition-transform group-hover:scale-110 ${
                  item.path === path ? "text-[#15b989]" : ""
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Progress Section */}
        <div className="mt-auto space-y-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <BookOpen className="h-4 w-4 text-[#15b989]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">Course Progress</h3>
                <p className="text-xs text-gray-600">{userCourseList.length}/5 courses created</p>
              </div>
            </div>
            
            <Progress 
              className="h-2 bg-green-100" 
              value={(userCourseList.length / 5) * 100} 
            />
            
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-600">
                {5 - userCourseList.length} remaining
              </span>
              <div className="flex items-center gap-1 text-[#15b989]">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-medium">Free Plan</span>
              </div>
            </div>
          </div>

          {/* Upgrade prompt */}
          <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-purple-500" />
              <span className="font-medium text-purple-800 text-sm">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-purple-700 leading-relaxed">
              Get unlimited course generation and premium features
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;