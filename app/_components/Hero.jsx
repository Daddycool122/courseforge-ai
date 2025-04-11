import React, { use } from 'react';
import { ArrowRight, BookOpen, Brain, GraduationCap } from 'lucide-react';
const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#cdffd8] to-gray-50">
     
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-50 opacity-70 blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-teal-50 opacity-60 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-[#18cf97]">
              <span className="mr-1">✨</span> AI-Powered Learning Revolution
            </div>
            
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block text-[#18cf97]">CourseForge AI</span>
              <span className="block">An Initiative towards <span className="relative inline-block">
                <span className="relative z-10">IT UTSAV</span>
                <span className="absolute bottom-2 left-0 z-0 h-3 w-full bg-[#18cf97]/20"></span>
              </span> 3.0</span>
            </h1>
            
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Transform your educational journey with with personalized learning experience.
            </p>
            
            <div>
              <a 
                href="/dashboard"
                className="group flex w-fit items-center justify-center rounded-lg bg-[#18cf97] px-6 py-3 text-base font-medium text-white shadow-lg shadow-green-200 transition-all hover:bg-[#14b887] hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-gray-${i*100}`}></div>
                ))}
              </div>
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-900">Prototype</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: <Brain className="h-8 w-8 text-[#18cf97]" />,
                title: "AI Learning Path",
                description: "Customized curriculum based on your strengths and goals"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-purple-500" />,
                title: "Smart Resources",
                description: "Hand-picked materials that match your learning style"
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
                title: "Progress Tracking",
                description: "Visualize your growth with advanced analytics"
              },
              {
                icon: <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">🚀</div>,
                title: "Accelerated Learning",
                description: "Learn up to 3x faster with adaptive techniques"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-green-50 p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-3">{feature.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;