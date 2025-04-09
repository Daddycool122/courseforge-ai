"use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./robot-gesturing.jpg"
          alt="AI Learning Platform"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Centered SignIn Component */}
      <div className="z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl  p-6">
        <SignUp />
      </div>
    </div>
  );
}