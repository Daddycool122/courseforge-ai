"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-green-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="relative">
              <Image 
                className="transition-transform group-hover:scale-105" 
                src="/logo.svg" 
                alt="CourseForge AI" 
                width={50} 
                height={40}
                priority
              />
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900 group-hover:text-[#18cf97] transition-colors">
              CourseForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-[#18cf97] font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/create-course" className="text-gray-700 hover:text-[#18cf97] font-medium transition-colors">
              Create Course
            </Link>
            <Button className="bg-gradient-to-r from-[#18cf97] to-[#14b887] hover:from-[#14b887] hover:to-[#10a574] text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-4 border-t border-gray-100">
            <Link 
              href="/dashboard" 
              className="block py-2 px-4 text-gray-700 hover:text-[#18cf97] hover:bg-green-50 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/create-course" 
              className="block py-2 px-4 text-gray-700 hover:text-[#18cf97] hover:bg-green-50 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Course
            </Link>
            <div className="px-4">
              <Button 
                className="w-full bg-gradient-to-r from-[#18cf97] to-[#14b887] hover:from-[#14b887] hover:to-[#10a574] text-white shadow-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header