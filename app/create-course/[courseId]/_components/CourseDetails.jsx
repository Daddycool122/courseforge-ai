import React from 'react'
import { IoBarChart } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";



function CourseDetails({course}) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-2'>
            <div className='flex gap-2 items-center'>
            <IoBarChart className='text-4xl text-[#18cf97]'/>
            <div>
                <h2 className='text-xs text-gray-500'>Skill Difficulty</h2>
                <h2 className='font-md text-lg'>{course?.difficulty}</h2>
            </div>
            </div>
            <div className='flex gap-2 items-center'>
            <MdOutlineTimer className='text-4xl text-[#18cf97]'/>
            <div>
                <h2 className='text-xs text-gray-500'>Duration</h2>
                <h2 className='font-md text-lg'>{course?.courseOutput?.["Total Duration"]}</h2>
            </div>
            </div>
            <div className='flex gap-2 items-center'>
            <MdFormatListNumbered className='text-4xl text-[#18cf97]'/>
            <div>
                <h2 className='text-xs text-gray-500'>No of Modules</h2>
                <h2 className='font-md text-lg'>{course?.courseOutput?.["Number of lessons"]}</h2>
            </div>
            </div>
            <div className='flex gap-2 items-center'>
            <MdOutlineOndemandVideo className='text-4xl text-[#18cf97]'/>
            <div>
                <h2 className='text-xs text-gray-500'>Video Included?</h2>
                <h2 className='font-md text-lg'>{course?.includeVideo}</h2>
            </div>
            </div>
        </div>
        
    </div>
  )
}

export default CourseDetails