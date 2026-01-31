import React from 'react';
import { ArrowRight, BookOpen, Brain, GraduationCap, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen flex items-center">
      {/* Background decorations */}
      <div className="absolute -top-32 -right-32 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-gradient-to-br from-green-200/40 to-emerald-300/40 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 -left-32 h-96 w-96 sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-tr from-teal-200/30 to-green-300/30 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-gradient-to-t from-emerald-200/20 to-green-200/20 blur-2xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="animate-fade-in-up">
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-semibold text-[#18cf97] shadow-md hover:shadow-lg transition-shadow duration-300">
                <Sparkles className="mr-2 h-4 w-4" />
                AI-Powered Learning Revolution
              </div>
            </div>
            
            <div className="animate-fade-in-up delay-200">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block bg-gradient-to-r from-[#18cf97] to-[#14b887] bg-clip-text text-transparent mb-2">
                  CourseForge AI
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                  An Initiative towards{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                      IT UTSAV
                    </span>
                    <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-gradient-to-r from-purple-200 to-blue-200 rounded"></span>
                  </span>
                  {' '}3.0
                </span>
              </h1>
            </div>
            
            <div className="animate-fade-in-up delay-300">
              <p className="text-lg sm:text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Transform your educational journey with AI-powered personalized learning experiences. Create, learn, and excel with intelligent course generation.
              </p>
            </div>
            
            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="/dashboard"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#18cf97] to-[#14b887] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl hover:from-[#14b887] hover:to-[#10a574] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#features"
                className="group inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 hover:border-[#18cf97] hover:text-[#18cf97] transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </a>
            </div>
            
            <div className="animate-fade-in-up delay-500 flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="h-10 w-10 rounded-full border-3 border-white shadow-md" 
                    style={{backgroundColor: `hsl(${i * 90}, 70%, 80%)`}}
                  ></div>
                ))}
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">Trusted by 1000+ learners</span>
              </div>
            </div>
          </div>
          
          {/* Right column - Feature Grid */}
          <div className="animate-fade-in-up delay-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { 
                  icon: <Brain className="h-8 w-8 text-[#18cf97]" />,
                  title: "AI Learning Path",
                  description: "Customized curriculum based on your strengths and goals",
                  gradient: "from-green-400 to-emerald-500"
                },
                {
                  icon: <BookOpen className="h-8 w-8 text-purple-500" />,
                  title: "Smart Resources",
                  description: "Hand-picked materials that match your learning style",
                  gradient: "from-purple-400 to-indigo-500"
                },
                {
                  icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
                  title: "Progress Tracking",
                  description: "Visualize your growth with advanced analytics",
                  gradient: "from-blue-400 to-cyan-500"
                },
                {
                  icon: <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-sm font-bold">🚀</div>,
                  title: "Accelerated Learning",
                  description: "Learn up to 3x faster with adaptive techniques",
                  gradient: "from-amber-400 to-orange-500"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
                  }`}
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-20 w-20 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Courses Created" },
              { number: "50K+", label: "Happy Learners" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{animationDelay: `${800 + index * 100}ms`}}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#18cf97] to-[#14b887] bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;