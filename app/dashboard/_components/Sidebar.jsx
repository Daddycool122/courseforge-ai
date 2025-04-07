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

const Sidebar = () => {
  const Menu = [
    { id: 1, name: "Home", icon: <AiOutlineHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <GoStack />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <GiArmorUpgrade />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <TbLogout />, path: "/dashboard/logout" },
  ];
  const path = usePathname();
  const { userCourseList } = useContext(UserCourseListContext);

  return (
    <div className="fixed h-full w-full md:w-64 p-4 md:p-5 shadow-md hidden md:block">
      <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      <hr className="my-4 text-gray-400" />

      <ul>
        {Menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <div
              className={`flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer mb-2
              ${item.path === path ? "bg-gray-200 text-gray-700" : ""}`}
            >
              <div className="text-2xl md:text-3xl">{item.icon}</div>
              <h2 className="text-sm md:text-base">{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-6 w-[85%] md:w-[80%]">
        <Progress className="bg-green-100" value={(userCourseList.length / 5) * 100} />
        <h2 className="text-xs md:text-sm my-2">
          {userCourseList.length} out of 5 courses selected
        </h2>
        <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited course generation</h2>
      </div>
    </div>
  );
};

export default Sidebar;