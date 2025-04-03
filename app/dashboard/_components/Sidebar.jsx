"use client"
import React from 'react'
import Image from 'next/image'
import { AiOutlineHome } from "react-icons/ai";
import { GiArmorUpgrade } from "react-icons/gi";
import { GoStack } from "react-icons/go";
import { TbLogout } from "react-icons/tb";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// Import only if you're using shadcn/ui's Progress
// import { Progress } from "@/components/ui/progress"

const Sidebar = () => {
    const Menu= [
        {
            id:1,
            name:'Home',
            icon: <AiOutlineHome/>,
            path: '/dashboard'
        },
        {
            id:2,
            name:'Explore',
            icon: <GoStack />,
            path: '/dashboard/explore'
        },
        {
            id:3,
            name:'Upgrade',
            icon: <GiArmorUpgrade />,
            path: '/dashboard/upgrade'
        },
        {
            id:4,
            name:'Logout',
            icon: <TbLogout/>,
            path: '/dashboard/logout'
        },
    ]
    const path = usePathname()
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={'/logo.svg'} alt='no' width={50} height={50}/>
        <hr className='py-4 mt-4 text-gray-400' />

        <ul>
            {Menu.map((item,index)=>(
                <Link key={index} href={item.path}>
                <div 
                className={`flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer  mb-2
                ${item.path==path ? 'bg-gray-200 text-gray-700' : ''}`} 
                key={index}>
                    <div className='text-3xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            ))}
        </ul>
        <div className='absolute bottom-10 w-[80%]'>
            {/* Custom progress bar implementation */}
            <div className="mt-4 rounded-full h-2 w-full bg-green-200 overflow-hidden">
                <div 
                    className="bg-[#18cf97] h-full rounded-full" 
                    style={{ width: '60%' }}
                ></div>
            </div>
            <h2 className='text-sm my-2'>3 out of 5 courses selected</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generation</h2>
        </div>
    </div>
  )
}

export default Sidebar