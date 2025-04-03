"use client" 
import { SignIn } from '@clerk/nextjs'
import React from 'react';

export default function SignInPage() {
  return(
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - SignIn component */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6 md:hidden">
            <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-r from-[#18cf97] to-[#18cf97] flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          {/* Clerk SignIn Component */}
          <SignIn />
          
          {/* Additional sign up link if needed */}
          
        </div>
      </div>
      
      {/* Right side - Full image */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        {/* Image covering entire right side */}
        <img
          src="https://i.pinimg.com/1200x/89/0f/cc/890fccafba1a3de72267ad062e5a4ba5.jpg"
          alt="Course Creation Platform"
          className="absolute inset-0 h-full w-full object-center"
        />
        
        {/* Optional overlay to ensure text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
    </div>
  )
}