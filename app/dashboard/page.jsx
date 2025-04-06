"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const Dashboard = ({children}) => {
  
  return (
    
    <div>
      {/* <UserButton/> */}
      <AddCourse/>
      {/* Display List of Course */}
      <UserCourseList/>
    </div>
    
  )
}

export default Dashboard