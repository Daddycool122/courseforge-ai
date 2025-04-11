"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'
function CreateCourseLayout({children}) {
    const [userCourseInput,setUserCourseInput] = useState([]);
  return (
    <div className='px-10'>
        <UserInputContext.Provider value={{userCourseInput,setUserCourseInput}}>
        
        <div className='fixed w-screen pr-24   z-100 bg-white'>
        <Header />
        </div>
        
        {children}
        
        </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout