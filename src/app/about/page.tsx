"use client"

import React from 'react'

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0B1120] dark:text-white font-sans overflow-x-hidden transition-colors duration-500">
      
      {/* Fixed Background Video Layer */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradient overlay to ensure text legibility and deep cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/40 dark:from-[#0B1120]/40 via-transparent to-[#F8FAFC]/95 dark:to-[#0B1120]/95" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center px-6 pt-[20svh] sm:pt-[28svh] pb-24 sm:pb-32 min-h-screen">
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] leading-[0.95] tracking-[-0.02em] max-w-6xl font-serif font-normal text-[#0B1120] dark:text-white animate-fade-rise">
            Engineering <em className="not-italic text-blue-600 dark:text-blue-400">masterpieces</em> that transform the <em className="not-italic text-blue-600 dark:text-blue-400">digital world.</em>
          </h1>
          
          <p className="text-[#0B1120]/70 dark:text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-medium">
            We are a project-based SaaS company dedicated to empowering businesses through comprehensive digital transformation solutions.
          </p>
          
          <button className="rounded-full px-14 py-5 text-base text-white dark:text-[#0B1120] bg-[#0B1120] dark:bg-white font-medium mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2 shadow-xl border border-black/10 dark:border-white/10">
            Explore Our Story
          </button>
        </section>

        {/* Content Flow */}
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-32 space-y-24">
          
          {/* Our Story */}
          <section className="animate-fade-rise">
            <div className="bg-white/80 dark:bg-[#111A30]/80 backdrop-blur-xl p-10 sm:p-16 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl">
              <h3 className="font-serif text-4xl sm:text-5xl text-[#0B1120] dark:text-white mb-8">Our Story</h3>
              <div className="space-y-6 text-[#0B1120]/70 dark:text-white/70 text-lg leading-relaxed max-w-4xl font-medium">
                <p>
                  Founded with a vision to democratize digital excellence, ImaginarsClubServices has grown from a small startup to a trusted partner for businesses seeking comprehensive digital transformation.
                </p>
                <p>
                  Our journey began when our founders recognized a critical gap in the market: businesses needed more than just individual services—they needed an integrated partner who could handle their entire digital ecosystem with expertise and care.
                </p>
                <p>
                  Today, we serve clients across industries, from innovative startups to established enterprises, delivering solutions that combine cutting-edge technology with strategic business insight.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white/80 dark:bg-[#111A30]/80 backdrop-blur-xl p-10 sm:p-14 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl flex flex-col justify-center text-left hover:-translate-y-2 transition-transform duration-500">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#0B1120] dark:text-white mb-4">Our Mission</h3>
              <p className="text-[#0B1120]/70 dark:text-white/70 text-base sm:text-lg leading-relaxed font-medium">
                To empower businesses of all sizes with world-class digital solutions that drive growth, enhance efficiency, and create lasting competitive advantages in an ever-evolving digital landscape.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-[#111A30]/80 backdrop-blur-xl p-10 sm:p-14 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl flex flex-col justify-center text-left hover:-translate-y-2 transition-transform duration-500">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#0B1120] dark:text-white mb-4">Our Vision</h3>
              <p className="text-[#0B1120]/70 dark:text-white/70 text-base sm:text-lg leading-relaxed font-medium">
                To be the most trusted and innovative digital transformation partner globally, recognized for our comprehensive approach, exceptional results, and unwavering commitment to client success.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <div className="text-center mb-12">
              <h3 className="font-serif text-4xl sm:text-5xl text-[#0B1120] dark:text-white mb-4">Our Core Values</h3>
              <p className="text-[#0B1120]/70 dark:text-white/70 text-lg font-medium">The principles that guide everything we do and every decision we make.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Innovation", desc: "We stay ahead of the curve with cutting-edge technologies and creative solutions." },
                { title: "Client Success", desc: "Your success is our success. We're committed to delivering exceptional results." },
                { title: "Excellence", desc: "We maintain the highest standards in everything we do, from code to customer service." },
                { title: "Agility", desc: "We adapt quickly to changing market needs and deliver solutions with speed." }
              ].map((val, i) => (
                <div key={i} className="bg-white/80 dark:bg-[#111A30]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-lg hover:-translate-y-2 transition-transform duration-500">
                  <h4 className="font-serif text-2xl text-[#0B1120] dark:text-white mb-3">{val.title}</h4>
                  <p className="text-[#0B1120]/70 dark:text-white/70 text-sm leading-relaxed font-medium">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team & Achievements */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white/80 dark:bg-[#111A30]/80 backdrop-blur-xl p-10 sm:p-14 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl">
              <h3 className="font-serif text-4xl text-[#0B1120] dark:text-white mb-4">Our Talented Team</h3>
              <p className="text-[#0B1120]/70 dark:text-white/70 text-lg mb-10 font-medium">A diverse group of experts passionate about delivering exceptional digital solutions.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { num: "8", label: "Leadership Team", desc: "Seasoned professionals with 15+ years experience" },
                  { num: "25", label: "Developers", desc: "Expert engineers across web, mobile, and AI" },
                  { num: "12", label: "Designers", desc: "Creative minds crafting beautiful experiences" },
                  { num: "15", label: "Marketing Specialists", desc: "Data-driven strategists and content creators" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-serif text-[#0B1120] dark:text-white mb-1">{stat.num}</div>
                    <div className="text-base font-bold text-[#0B1120]/80 dark:text-white/80 mb-1">{stat.label}</div>
                    <div className="text-sm font-medium text-[#0B1120]/60 dark:text-white/60">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#111A30]/80 backdrop-blur-xl p-10 sm:p-14 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl">
              <h3 className="font-serif text-4xl text-[#0B1120] dark:text-white mb-10">Our Achievements</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {[
                  { num: "200+", label: "Projects Completed" },
                  { num: "150+", label: "Satisfied Clients" },
                  { num: "98%", label: "Client Retention Rate" },
                  { num: "5+", label: "Years of Excellence" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10">
                    <div className="text-4xl font-serif text-blue-600 dark:text-blue-400 mb-2">{stat.num}</div>
                    <div className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70 text-center">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
