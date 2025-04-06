import React from 'react'
import { FaRegClock } from "react-icons/fa6";

function ChapterListCard({chapter,index}) {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b'>
        <div>
        <h2 className='p-1 bg-[#18cf97]  text-center w-8 h-8 text-white rounded-full'>{index+1}</h2>
        </div>
        <div className=' col-span-4'>
        <h2>{chapter?.["Chapter Name"]?chapter?.["Chapter Name"]:chapter?.["Chapter name"]}</h2>
        <h2 className='text-sm text-center flex gap-2 text-[#18cf97]'><FaRegClock className='mt-1'/>{chapter?.Duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard