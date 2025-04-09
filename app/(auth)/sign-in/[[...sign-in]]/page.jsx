"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./Graident Ai Robot.jpg"
          alt="AI Learning Platform"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Centered SignIn Component */}
      <div className="z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl  p-6">
        <SignIn />
      </div>
    </div>
  );
}