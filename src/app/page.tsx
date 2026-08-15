"use client"

import React, { useState, useEffect } from 'react'
import { 
  ChevronDown, Menu, X, Code, Smartphone, Brain, 
  TrendingUp, Video, Users, ArrowRight, Star 
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll and body lock
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
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
    <div className="w-full bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500">

      {/* 1. HERO SECTION */}
      <section className="relative h-[100svh] w-full flex flex-col overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Subtle gradient overlay to transition smoothly to the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0B1120] via-black/20 to-black/40" />
        </div>

        {/* Bottom Anchored Hero Content */}
        <div className="relative z-10 mt-auto px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-24 w-full">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white mb-6">
              Transform Your <br /> Digital Vision.
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed font-light">
              Comprehensive digital solutions that drive innovation, engagement, and growth for forward-thinking businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto rounded-full px-8 py-4 text-center text-sm font-medium text-[#0B1120] bg-white border border-white hover:bg-gray-100 transition-all shadow-xl">
                Get Started
              </Link>
              <Link href="/services" className="w-full sm:w-auto rounded-full px-8 py-4 text-center text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "200", suffix: "+", label: "Projects Delivered" },
              { value: "150", suffix: "+", label: "Happy Clients" },
              { value: "98", suffix: "%", label: "Client Satisfaction" },
              { value: "24", suffix: "/7", label: "Support Available" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="font-silkscreen text-4xl lg:text-5xl text-[#0B1120] dark:text-white tracking-tight">{stat.value}</span>
                  <span className="font-silkscreen text-2xl text-blue-600 dark:text-blue-500">{stat.suffix}</span>
                </div>
                <p className="text-sm text-[#0B1120]/60 dark:text-white/50 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-4">Our Core Services</h2>
            <p className="text-[#0B1120]/60 dark:text-white/60 leading-relaxed text-lg font-light">
              We provide comprehensive digital services designed to elevate brands and accelerate growth in the modern technology landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: "Web Development", desc: "Cutting-edge websites and web applications" },
              { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile solutions" },
              { icon: Brain, title: "AI Solutions", desc: "AI-powered websites and intelligent automation" },
              { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven strategies that convert" },
              { icon: Video, title: "Video Editing", desc: "Professional content creation and editing" },
              { icon: Users, title: "Brand Management", desc: "Complete brand strategy and collaboration" },
            ].map((service, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-white dark:bg-white/[0.02] shadow-xl dark:shadow-none border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 flex flex-col items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-[#0B1120] dark:text-white group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500">
                  <service.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#0B1120] dark:text-white mb-3">{service.title}</h3>
                  <p className="text-[#0B1120]/60 dark:text-white/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
                <Link href="/services" className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-[#0B1120]/40 dark:text-white/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/services" className="rounded-full px-8 py-4 text-sm font-medium text-[#0B1120] dark:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-y border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-4">Why Choose ImaginarsClub?</h2>
            <p className="text-[#0B1120]/60 dark:text-white/60 leading-relaxed text-lg font-light">
              We combine elite engineering with visionary design to put you leagues ahead of the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: "01",
                title: "Innovation-Driven",
                desc: "We utilize cutting-edge technologies and AI-powered solutions to provide businesses with an undeniable competitive advantage."
              },
              {
                num: "02",
                title: "Results-Focused",
                desc: "Every line of code and design element is driven by data-focused strategies aimed at measurable ROI, performance, and aggressive business growth."
              },
              {
                num: "03",
                title: "Client-Centric",
                desc: "We don't just build software; we build partnerships. Experience personalized solutions and dedicated support tailored exactly to your unique requirements."
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col gap-5">
                <div className="font-silkscreen text-5xl text-[#0B1120]/10 dark:text-white/10">{feature.num}</div>
                <h3 className="text-xl font-medium text-[#0B1120] dark:text-white">{feature.title}</h3>
                <p className="text-[#0B1120]/60 dark:text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/about" className="rounded-full px-8 py-4 text-sm font-medium text-white bg-nexum-gradient border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all shadow-lg shadow-black/10">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-[#0B1120]/60 dark:text-white/60 leading-relaxed text-lg font-light">
              Don't just take our word for it - hear from businesses we've helped transform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                role: "CEO, TechVenture",
                quote: "ImaginarsClub transformed our digital presence completely. Their AI-driven website solution increased our conversions by 240% in just 3 months.",
                avatar: "https://i.pravatar.cc/150?img=33"
              },
              {
                name: "Priya Sharma",
                role: "Marketing Director, GrowthHub",
                quote: "The team's expertise in digital marketing and Meta ads management delivered exceptional ROI. We saw a 3x increase in qualified leads.",
                avatar: "https://i.pravatar.cc/150?img=5"
              },
              {
                name: "Amit Patel",
                role: "Founder, StartupX",
                quote: "From brand strategy to video content, they handled everything seamlessly. Their comprehensive approach to digital transformation exceeded all expectations.",
                avatar: "https://i.pravatar.cc/150?img=11"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-white/[0.02] shadow-lg dark:shadow-none border border-black/5 dark:border-white/5 flex flex-col gap-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-[#0B1120]/70 dark:text-white/70 leading-relaxed text-lg italic font-medium">"{testimonial.quote}"</p>
                <div className="mt-auto flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-black/10 dark:border-white/10" />
                  <div>
                    <h4 className="text-[#0B1120] dark:text-white font-medium">{testimonial.name}</h4>
                    <p className="text-[#0B1120]/40 dark:text-white/40 text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent border border-black/10 dark:border-white/10 p-10 sm:p-20 text-center relative overflow-hidden bg-white dark:bg-transparent shadow-2xl dark:shadow-none">
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-6">
              Ready to Transform Your <br /> Digital Presence?
            </h2>
            <p className="text-xl text-[#0B1120]/60 dark:text-white/60 mb-10 max-w-2xl mx-auto font-light">
              Let's discuss how our comprehensive digital solutions can accelerate your business growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto rounded-full px-10 py-5 text-center text-sm font-medium text-white bg-nexum-gradient border border-black/20 dark:border-white/20 hover:scale-105 transition-all shadow-xl">
                Get Started Today
              </Link>
              <Link href="/portfolio" className="w-full sm:w-auto rounded-full px-10 py-5 text-center text-sm font-medium text-[#0B1120] dark:text-white bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
