"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll and body lock
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3' : 'py-5 sm:py-6'}`}>
        <div className="w-full flex items-center justify-between px-5 sm:px-8 lg:px-12 pointer-events-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="ImaginarsClub Services" className="h-8 w-8 object-contain rounded-md" />
            <span className="text-lg font-semibold text-[#0B1120] dark:text-white tracking-tight">
              ImaginarsClub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <nav className="flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-1.5 py-1.5 backdrop-blur-lg">
              {['About', 'Portfolio'].map(link => (
                <Link key={link} href={`/${link.toLowerCase()}`} className="rounded-full px-4 py-1.5 text-sm font-medium text-[#0B1120]/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#0B1120] dark:hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
              <Link href="/services" className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-[#0B1120]/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#0B1120] dark:hover:text-white transition-colors">
                Services <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
              <Link href="/blog" className="rounded-full px-4 py-1.5 text-sm font-medium text-[#0B1120]/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#0B1120] dark:hover:text-white transition-colors">
                Blog
              </Link>
            </nav>
            <ThemeToggle />
            <Link href="/contact" className="self-stretch rounded-full px-6 py-1.5 flex items-center justify-center text-sm font-medium text-white bg-nexum-gradient transition-opacity border border-black/10 dark:border-white/10">
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative h-10 w-10 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-lg z-50 flex items-center justify-center text-[#0B1120] dark:text-white overflow-hidden pointer-events-auto"
            >
              <Menu className={`absolute w-5 h-5 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X className={`absolute w-5 h-5 transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Glass Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md transition-opacity duration-300 md:hidden pointer-events-auto ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />
      
      {/* Mobile Menu Drawer */}
      <div className={`fixed right-0 top-0 z-40 h-full w-72 bg-[#F8FAFC] dark:bg-[#0B1120] border-l border-black/10 dark:border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col pointer-events-auto ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col px-6 pt-24 gap-2">
          {[
            { name: 'About', i: 0, href: '/about' },
            { name: 'Portfolio', i: 1, href: '/portfolio' },
            { name: 'Services', i: 2, hasIcon: true, href: '/services' },
            { name: 'Blog', i: 3, href: '/blog' },
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-[#0B1120]/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0B1120] dark:hover:text-white transition-all duration-500 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
              style={{ transitionDelay: `${(link.i + 1) * 60}ms` }}
            >
              {link.name}
              {link.hasIcon && <ChevronDown className="w-4 h-4 opacity-50" />}
            </Link>
          ))}
        </div>
        <div className={`mt-auto px-6 pb-10 transition-all duration-400 delay-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="w-full flex justify-center items-center rounded-full py-4 text-base font-medium text-white bg-nexum-gradient border border-black/10 dark:border-white/10">
            Get started
          </Link>
        </div>
      </div>
    </>
  )
}
