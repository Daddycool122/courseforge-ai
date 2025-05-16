"use client"
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import Header from '@/app/_components/Header';
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';

function Course({params}) {
    const [course,setCourse]= useState()

    useEffect(()=>{
        params&&GetCourse();
    },[params])
    const GetCourse = async()=>{
        const result = await db.select().from(CourseList)
        .where(eq(CourseList?.courseId,params?.courseId))

        setCourse(result[0])
        console.log(result);
        
    }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Responsive fixed header */}
      <div className='fixed w-full top-0 left-0 z-50'>
        <Header />
      </div>
      {/* Responsive content container with top padding to avoid header overlap */}
      <div className='pt-20 px-2 sm:px-4 md:px-10 lg:px-20 xl:px-44 max-w-screen-xl mx-auto w-full'>
        <CourseBasicInfo course={course} edit={false}/>
        <CourseDetails course={course}/>
        <ChapterList course={course} edit={false}/>
      </div>
    </div>
  )
}

export default Course