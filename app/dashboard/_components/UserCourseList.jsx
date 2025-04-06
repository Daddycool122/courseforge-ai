"use client"
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import React, { useContext, useState } from 'react'
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { useEffect } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseList';


function UserCourseList() {
  const [courseList,setCourseList] = useState([])
  const {user} = useUser();
  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)

  useEffect(()=>{
    user&&getUserCourses()
  },[user])
  const getUserCourses=async()=>{
    const result =  await db.select().from(CourseList).where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result)
    setCourseList(result)
    setUserCourseList(result)

  }
  return (
    <div>
      <h2 className='font-bold text-lg mt-4 ml-2'>My Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-3 mt-2'>
        {courseList?.length>0?courseList?.map((course,index)=>(
          <CourseCard key={index} refreshData={()=>{getUserCourses()}} course={course} /> // Pass the course object to CourseCard  
        ))
        :
          ([1,2,3,4,5].map((item,index)=>(
            <div key={index} className='w-full bg-slate-200 animate-pulse mt-5 rounded-lg h-[300px]'></div>
          )))
        
      
      }
      </div>
    </div>
  )
}

export default UserCourseList