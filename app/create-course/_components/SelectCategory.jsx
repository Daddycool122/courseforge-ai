"use client"

import React from 'react'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import { useContext , useState } from 'react';
import { UserInputContext } from '@/app/_context/UserInputContext'
function SelectCategory() {
    const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
    const handleCategoryChange = (category) => {
        setUserCourseInput((prev) => ({ ...prev, category: category }));
    }
  return (
    <div className='px-10 md:px:20'>
        
        <h2 className='my-5'>Select the course category</h2>

    <div className='grid grid-cols-3 gap-10 '>
        
        {CategoryList.map((item, index) => (
            <div 
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-[#15b989] hover:bg-green-200 hover:shadow-md transition-all duration-200 cursor-pointer ${userCourseInput?.category===item.name&& 'bg-green-200 border-[#15b989]'}` }
            key={index}
            onClick={()=>handleCategoryChange(item.name)}>
                <Image src={item.icon} alt='no' width={50} height={50}/>
                <h2>{item.name}</h2>
            </div>
        ))}
    </div>
    </div>
  )
}

export default SelectCategory