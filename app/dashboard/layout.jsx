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
      <div className="flex min-h-screen bg-gray-50/50">
        {/* Sidebar for desktop */}
        <div className="hidden lg:block fixed inset-y-0 left-0 w-72 z-30">
          <Sidebar />
        </div>
        
        {/* Sidebar overlay for mobile/tablet */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 lg:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} isMobile={true} />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-72">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center px-4 py-3 lg:px-6">
              {/* Sidebar toggle for mobile/tablet */}
              <button
                className="lg:hidden mr-4 p-2 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#15b989]/20 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Open sidebar"
              >
                <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-1">
                <Header />
              </div>
            </div>
          </div>
          
          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout