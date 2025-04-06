import React, { useEffect } from 'react'
import { MdOutlineTimer } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import EditChapters from './EditChapters';
function ChapterList({course,refreshData,edit=true}) {
    const chapters = course?.courseOutput?.Chapters
    
    
  return (
    <div className=' p-6 rounded-xl  mt-3'>
        <h2 className='font-bold text-2xl'>Modules</h2>
        <div className='mt-2  shadow-lg'>
           {chapters?.map((chapter,index)=>{
            return (
                <div key={index} className='flex gap-2 items-center border-gray-200 justify-between border px-3 rounded-2xl py-2'>
                    <div className='
                    grid px-4 py-4 grid-cols  gap-1'>
                        {chapter?.["Chapter Name" ]?
                        <div className='flex justify-between items-center'>
                        <h2 className='text-lg flex  font-semibold'>{chapter?.["Chapter Name" ]}</h2>
                        {edit && <EditChapters index={index}   refreshData={refreshData} course=
                    {course}  />}
                    </div>
                        :
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg flex  font-semibold'>{chapter?.["Chapter name" ]}</h2>
                            {edit && <EditChapters index={index}   refreshData={refreshData} course=
                    {course}  />}
                        </div>
                        }
                    
                    <h2 className='text-sm ml-5'>{chapter?.["About"]}</h2>
                    <h2 className='text-sm p-2 ml-3 flex gap-2 text-[#18cf97]'><MdOutlineTimer className='text-[#18cf97]  mt-1'/>({chapter?.["Duration"]})</h2>
                    </div>
                    <IoIosCheckmarkCircleOutline className='text-gray-300 text-3xl flex-none'/>
                </div>
                
            )
           })}
           
        </div>
    </div>
  )
}

export default ChapterList