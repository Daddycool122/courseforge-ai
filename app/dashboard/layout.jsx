"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_context/UserCourseList'

const DashboardLayout = ({children}) => {
  const [userCourseList, setUserCourseList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar for desktop */}
        <div className="hidden md:block fixed inset-y-0 left-0 w-64 z-30">
          <Sidebar />
        </div>
        {/* Sidebar overlay for mobile */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
          onClick={() => setSidebarOpen(false)}
        />
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
          className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 md:hidden bg-white ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        />
        {/* Main content */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white shadow-md flex items-center px-4 py-3">
            {/* Sidebar toggle for mobile */}
            <button
              className="md:hidden mr-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#15b989]"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open sidebar"
            >
              <svg className="h-6 w-6 text-[#15b989]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1">
              <Header />
            </div>
          </div>
          {/* Page content */}
          <main className="flex-1 p-4 md:p-10">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UserCourseListContext.Provider>
  )
}

export default DashboardLayout