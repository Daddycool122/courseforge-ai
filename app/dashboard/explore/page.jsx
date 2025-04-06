"use client"
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db'
import CourseCard from '../_components/CourseCard'
import { Button } from '@/components/ui/button'


const Explore = () => {

  const [courseList,setCourseList] = useState([])
  const [pageIndex , setPageIndex] = useState(0)
  
  useEffect(()=>{
   GetAllCourse();
  },[pageIndex])
  const GetAllCourse = async()=>{
    const result = await db.select().from(CourseList)
    .limit(9)
    .offset(pageIndex*9)
    setCourseList(result)
    console.log(result);
    
  }
  return (
    <div >
      <h2 className='font-bold text-3xl'>Explore more Projects</h2>
      <p>Explore more projects with AI</p>

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
        {courseList.map((course,index)=>(
          <CourseCard key={index} course={course} displayUser={true}/>
        ))}
      </div>

      <div className='flex justify-between mt-5 '>
        {pageIndex!=0&&
        <Button  className={"bg-[#15b989] hover:bg-[#15b989] "} onClick={()=>{setPageIndex(pageIndex-1)}}>Prev</Button>}
        <Button className={"bg-[#15b989] hover:bg-[#15b989] "} onClick={()=>{setPageIndex(pageIndex+1)}}>Next</Button>
        
      </div>
      </div>
  )
}

export default Explore