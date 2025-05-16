import React, { useState } from 'react'
import Image from 'next/image'
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import {storage} from '@/configs/firebaseConfig'
import { ref } from 'firebase/storage';
function CourseBasicInfo({ course,refreshData ,edit=true}) {
  const [selectedfile,setSelectedFile]= useState();
  const onFileSelected = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now()+'.jpg'

  };
  return (
    <div className='p-4 sm:p-6 md:p-10 bg-gradient-to-b from-[#cdffd8] to-gray-50 border rounded-2xl shadow-sm mt-10 sm:mt-16 md:mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <div className='flex items-center justify-between gap-2'>
            <h1 className='font-bold text-lg sm:text-2xl md:text-3xl truncate max-w-[10rem] sm:max-w-xs md:max-w-md'>
              {course?.courseOutput?.["Course name"]}
            </h1>
            <div className='flex-shrink-0 text-xl sm:text-2xl md:text-3xl'>
              {edit && <EditCourseBasicInfo course={course}  refreshData={()=>refreshData(true)}/>}
            </div>
          </div>
          <p className='text-xs sm:text-sm md:text-base text-gray-500 mt-2 sm:mt-3'>
            {course?.courseOutput?.Description}
          </p>
          <h2 className='font-medium mt-2 flex gap-2 items-center text-[#18cf97] text-xs sm:text-base'>
            <HiOutlinePuzzlePiece />
            {course?.category}
          </h2>
          {!edit &&
            <Link href={`/create-course/${course?.courseId}/start`} className='w-full'>
              <Button className="mt-4 sm:mt-6 w-full text-xs sm:text-base">Start</Button>
            </Link>
          }
        </div>
        <div className='flex flex-col items-center justify-center'>
          <label htmlFor='upload-image' className='cursor-pointer block w-full max-w-xs sm:max-w-sm md:max-w-md'>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-white">
              <Image 
                className='object-cover w-full h-full'
                src={"https://i.pinimg.com/1200x/55/30/89/553089e42cf4dd07f0364a768a5bd669.jpg"} 
                fill
                alt='course thumbnail'
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <input type='file' id='upload-image' className='opacity-0 absolute w-0 h-0' onChange={onFileSelected}/>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo