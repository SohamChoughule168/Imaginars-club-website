"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { portfolioData } from '@/data/portfolio'

export default function PortfolioPage() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Construct projects array by putting the Case Studies intro first, then the actual projects
  const projects = [
    {
      slug: "",
      label: "Case Studies",
      badge: "Real projects, real impact, real growth.",
      headingLine1: "World-Class Work",
      headingLine2: "For Visionary Brands",
      subtext: "Explore our success stories and see how we've helped businesses transform their digital presence and achieve remarkable results.",
      videoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
      isDark: false
    },
    ...portfolioData.map(p => ({
      slug: p.slug,
      label: p.client,
      badge: p.badge,
      headingLine1: p.headingLine1,
      headingLine2: p.headingLine2,
      subtext: p.subtext,
      videoSrc: p.videoSrc,
      isDark: p.isDark
    }))
  ]

  const handleSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return
    setActiveVideo(index)
    setIsTransitioning(true)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }

  const activeProject = projects[activeVideo]
  const isDark = activeProject.isDark
  const textColorClass = isDark ? "text-[#0B1120]" : "text-white"
  const glassStyle = isDark ? { background: "rgba(11, 17, 32, 0.05)" } : {}

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[100svh] overflow-hidden bg-[#0B1120] font-sans select-none">
        
        {/* 1. Background Video Layer */}
        {projects.map((proj, idx) => (
          <video
            key={idx}
            src={proj.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* 2. Transparent PNG Overlay */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          <img 
            src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png" 
            alt="Overlay texture" 
            className="w-full h-full object-cover animate-train-bob opacity-80"
          />
        </div>

        {/* 3. Content Layer */}
        <div className="relative z-[2] flex flex-col h-full pt-24 sm:pt-32 pb-8 px-5 sm:px-8">
          
          {/* Main Hero Content */}
          <div className={`flex flex-col items-center justify-center text-center flex-grow transition-colors duration-700 ${textColorClass}`}>
            
            <div 
              className="liquid-glass rounded-full px-4 sm:px-5 py-1.5 mb-6 sm:mb-8 text-xs sm:text-sm font-medium transition-colors duration-700"
              style={glassStyle}
            >
              {activeProject.badge}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl tracking-tight mb-6 sm:mb-8 transition-colors duration-700">
              {activeProject.headingLine1} <br />
              {activeProject.headingLine2}
            </h1>

            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed opacity-90 transition-colors duration-700 mb-10 sm:mb-12">
              {activeProject.subtext}
            </p>

            {activeProject.slug ? (
              <Link 
                href={`/portfolio/${activeProject.slug}`}
                className={`rounded-full px-8 py-4 text-sm sm:text-base font-semibold transition-colors duration-700 ${isDark ? "bg-[#0B1120] text-white" : "bg-white text-[#0B1120]"} hover:scale-105 transition-transform shadow-xl`}
              >
                View Full Case Study
              </Link>
            ) : (
              <a 
                href="/contact"
                className={`rounded-full px-8 py-4 text-sm sm:text-base font-semibold transition-colors duration-700 ${isDark ? "bg-[#0B1120] text-white" : "bg-white text-[#0B1120]"} hover:scale-105 transition-transform shadow-xl`}
              >
                Start Your Project
              </a>
            )}

            {/* Video Switcher */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 text-sm sm:text-base font-medium max-w-4xl">
              {projects.map((proj, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSwitch(idx)}
                  className={`relative pb-1.5 transition-all duration-300 ${activeVideo === idx ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                >
                  {proj.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 ${activeVideo === idx ? (isDark ? "bg-[#0B1120]" : "bg-white") : "bg-transparent"}`} />
                </button>
              ))}
            </div>

          </div>

          {/* Bottom Stats (Always White) */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-white/90 text-xs sm:text-sm font-medium tracking-wide w-full pt-8">
            <span>350% Average ROI Increase</span>
            <span className="hidden sm:inline">|</span>
            <span>150+ Successful Projects</span>
            <span className="hidden sm:inline">|</span>
            <span>98% Client Satisfaction</span>
          </div>

        </div>
      </section>

      {/* ARCHIVE GRID SECTION */}
      <section className="bg-[#F8FAFC] dark:bg-[#0B1120] py-32 px-5 sm:px-8 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl sm:text-5xl font-serif text-[#0B1120] dark:text-white mb-6">Work Archive</h2>
            <p className="text-[#0B1120]/60 dark:text-white/60 max-w-2xl mx-auto font-sans text-lg">
              A comprehensive collection of our digital transformation projects, showcasing our expertise across various industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.map((project, idx) => (
              <Link key={idx} href={`/portfolio/${project.slug}`} className="group block h-full">
                <div className="bg-white dark:bg-[#111A30] rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <video 
                      src={project.videoSrc} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex gap-3 mb-4">
                      <span className="text-xs font-semibold text-[#0B1120] dark:text-white bg-black/5 dark:bg-white/10 px-4 py-1.5 rounded-full">
                        {project.industry}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif text-[#0B1120] dark:text-white mb-3">
                      {project.headingLine1} {project.headingLine2}
                    </h3>
                    <p className="text-sm text-[#0B1120]/60 dark:text-white/60 mb-8 line-clamp-2 leading-relaxed flex-grow">
                      {project.subtext}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-[#0B1120] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      View Case Study &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
