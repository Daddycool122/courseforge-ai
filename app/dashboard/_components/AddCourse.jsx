"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { PlusCircle, BookOpen, Share2, TrendingUp } from 'lucide-react'
import React from 'react'
import { UserCourseListContext } from '@/app/_context/UserCourseList'
import Link from 'next/link'
import { useContext } from 'react'

const AddCourse = () => {
  const { user } = useUser()
    const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  
  
  return (
    <div className="rounded-xl bg-white p-8 shadow-md border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left side content */}
        <div className="space-y-3">
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-[#18cf97]/10 border border-[#18cf97]/20">
            <span className="text-xs font-medium text-[#18cf97]">✨ AI-POWERED</span>
          </div>
          
          <h2 className="text-3xl font-semibold text-gray-800">
            Hello, <span className="font-bold text-[#18cf97]">{user?.fullName || 'Creator'}</span>
          </h2>
          
          <p className="text-gray-600">
            Create new courses with AI, share with your network, and build a revenue stream.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#18cf97]" />
              <span className="text-sm text-gray-600">Course Builder</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-[#18cf97]" />
              <span className="text-sm text-gray-600">Share Easily</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#18cf97]" />
              <span className="text-sm text-gray-600">Earn Revenue</span>
            </div>
          </div>
        </div>
        
        {/* Right side - CTA button */}
        <Link href={userCourseList.length>=5?"/dashboard/upgrade":"/create-course"} className="w-full md:w-auto">
        <Button 
          className="bg-[#18cf97] hover:bg-[#15b989] text-white px-6 py-6 rounded-lg text-md font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Create AI Course
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default AddCourse