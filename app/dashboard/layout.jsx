"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_context/UserCourseList'
const DashboardLayout = ({children}) => {
  const [userCourseList,setUserCourseList]=useState([]);
  return (
    <UserCourseListContext.Provider value={{userCourseList,setUserCourseList}}>
    <div>
        <div className='md:w-64 hidden md:block'>
            <Sidebar/>
        </div>
        <div className='md:ml-64 p-10 '>
          <div className='w-256 ml-20 rounded-2xl fixed z-10 bg-white'> <Header/></div>
           
            <div className='p-10 m-10 '>
            {children}
            </div>
            
        </div>
        
    </div>
    </UserCourseListContext.Provider>
  )
}

export default DashboardLayout