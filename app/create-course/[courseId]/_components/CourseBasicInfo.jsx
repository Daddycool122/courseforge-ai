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
    <div className='p-10 bg-gradient-to-b from-[#cdffd8] to-gray-50  border rounded-2xl shadow-sm mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <div className='flex items-center justify-between'>
            <h1 className='font-bold text-3xl'>{course?.courseOutput?.["Course name"]}</h1>
            <div className='flex-shrink-0 text-3xl'>
              {edit && <EditCourseBasicInfo course={course}  refreshData={()=>refreshData(true)}/>}
            </div>
          </div>
          <p className='text-sm text-gray-500 mt-3'>{course?.courseOutput?.Description}</p>
          <h2 className='font-md mt-2  flex gap-2 items-center text-[#18cf97]'>
            <HiOutlinePuzzlePiece />
            {course?.category}
          </h2>
          {!edit&&
          <Link href={`/create-course/${course?.courseId}/start`} className='w-full'>
          <Button className=" mt-6 w-full">Start</Button>
        </Link>}
        </div>
        <div className='flex flex-col items-center justify-center'>
          <label htmlFor='upload-image' className='cursor-pointer'>
          <Image 
            className='w-full rounded-xl h-[270px]' 
            src={"https://i.pinimg.com/1200x/55/30/89/553089e42cf4dd07f0364a768a5bd669.jpg"} 
            width={100} 
            height={100} 
            alt='course thumbnail'
          />
          <input type='file' id='upload-image' className='opacity-0' onChange={onFileSelected}/>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo