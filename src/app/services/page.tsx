"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { servicesData } from '@/data/services'

// --- Animations Components ---

function WordsPullUp({ text, showAsterisk, className }: { text: string, showAsterisk?: boolean, className?: string }) {
  const container = useRef(null)
  const inView = useInView(container, { once: true, margin: "-100px" })
  const words = text.split(" ")

  return (
    <div ref={container} className={`flex flex-wrap ${className || ""}`}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mr-[0.25em] relative inline-block text-white font-prisma font-medium leading-[0.85] tracking-[-0.07em]"
          >
            {word}
            {showAsterisk && isLastWord && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

function WordsPullUpMultiStyle({ segments, className }: { segments: { text: string, className?: string }[], className?: string }) {
  const container = useRef(null)
  const inView = useInView(container, { once: true, margin: "-100px" })

  const words: { word: string, className?: string }[] = []
  segments.forEach(seg => {
    const splitWords = seg.text.split(" ")
    splitWords.forEach(w => words.push({ word: w, className: seg.className }))
  })

  return (
    <div ref={container} className={`inline-flex flex-wrap justify-center ${className || ""}`}>
      {words.map((obj, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`mr-[0.25em] relative inline-block ${obj.className || ""}`}
        >
          {obj.word}
        </motion.span>
      ))}
    </div>
  )
}

function AnimatedLetter({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

function ScrollTextReveal({ text, className }: { text: string, className?: string }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.2"]
  })

  const words = text.split(" ")
  let charIndex = 0
  const totalChars = text.length

  return (
    <p ref={container} className={`flex flex-wrap justify-center ${className || ""}`}>
      {words.map((word, i) => {
        return (
          <span key={i} className="mr-[0.25em] flex">
            {word.split("").map((char, j) => {
              const charProgress = charIndex / totalChars
              const range: [number, number] = [charProgress - 0.1, charProgress + 0.05]
              charIndex++
              return (
                <AnimatedLetter key={j} progress={scrollYProgress} range={range}>
                  {char}
                </AnimatedLetter>
              )
            })}
          </span>
        )
      })}
    </p>
  )
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const container = useRef(null)
  const inView = useInView(container, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: (index % 3) * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-[#111A30] rounded-[2rem] p-8 flex flex-col h-full font-prisma border border-black/5 dark:border-white/5 shadow-xl dark:shadow-none group hover:border-black/10 dark:hover:bg-[#15203A] transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
          <service.icon className="w-6 h-6 text-[#0B1120] dark:text-[#DEDBC8]" />
        </div>
        <span className="text-[#0B1120]/40 dark:text-gray-500 text-sm font-medium">{(index + 1).toString().padStart(2, '0')}</span>
      </div>
      
      <h3 className="text-2xl font-medium text-[#0B1120] dark:text-[#DEDBC8] mb-3 leading-tight">{service.title}</h3>
      <p className="text-[#0B1120]/60 dark:text-gray-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {service.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-[#0B1120] dark:text-[#DEDBC8] mt-0.5 shrink-0" />
            <span className="text-[#0B1120]/60 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link href={`/services/${service.slug}`} className="flex items-center gap-2 text-[#0B1120] dark:text-[#DEDBC8] text-sm font-medium mt-auto w-fit group/link pt-4">
        Explore Service
        <ArrowRight className="w-4 h-4 -rotate-45 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
      </Link>
    </motion.div>
  )
}

// --- Main Page Component ---

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500 min-h-screen font-prisma selection:bg-black/20 dark:selection:bg-white/20 pt-16">
      
      {/* SECTION 1: HERO */}
      <section className="h-[100svh] p-4 md:p-6 w-full">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black flex flex-col">
          {/* Background Video */}
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0B1120]/90 pointer-events-none" />

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              
              <div className="md:col-span-8">
                <WordsPullUp 
                  text="Services" 
                  showAsterisk={true} 
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] -ml-[2vw]"
                />
              </div>

              <div className="md:col-span-4 flex flex-col items-start gap-6 pb-[2vw]">
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/80 text-xs sm:text-sm md:text-base leading-[1.2] font-medium"
                >
                  From web development to AI solutions, digital marketing to brand management—we provide end-to-end digital services to transform your business.
                </motion.p>
                
                <motion.a 
                  href="#catalog"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center bg-white rounded-full pr-1 pl-6 py-1 cursor-pointer transition-all hover:bg-gray-200"
                >
                  <span className="text-[#0B1120] font-medium text-sm sm:text-base mr-3 group-hover:mr-5 transition-all duration-300">
                    Explore Catalog
                  </span>
                  <div className="bg-[#0B1120] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </motion.a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO */}
      <section className="py-32 px-5 sm:px-8 transition-colors duration-500">
        <div className="bg-white dark:bg-[#111A30] shadow-2xl dark:shadow-none max-w-6xl mx-auto rounded-[2rem] p-8 md:p-16 lg:p-24 text-center border border-black/5 dark:border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay" />
          
          <div className="relative z-10">
            <p className="text-[10px] sm:text-xs tracking-widest uppercase font-bold mb-12 text-[#0B1120] dark:text-[#DEDBC8]">
              Comprehensive Solutions
            </p>

            <WordsPullUpMultiStyle 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#0B1120] dark:text-[#DEDBC8] mb-16"
              segments={[
                { text: "We are ImaginarsClub,", className: "font-prisma font-normal" },
                { text: "a digital transformation agency.", className: "font-serif italic text-blue-600 dark:text-white" },
                { text: "We provide end-to-end services.", className: "font-prisma font-normal" }
              ]}
            />

            <div className="max-w-2xl mx-auto text-[#0B1120] dark:text-[#DEDBC8] text-xs sm:text-sm md:text-base font-medium leading-[1.6]">
              <ScrollTextReveal text="Our comprehensive service catalog is designed to meet every digital need your business has. From custom software to global marketing campaigns, our in-house experts execute with precision." />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES GRID */}
      <section id="catalog" className="min-h-screen relative py-24 px-5 sm:px-8 transition-colors duration-500">
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <WordsPullUpMultiStyle 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal w-full justify-start text-left flex-col items-start gap-2"
              segments={[
                { text: "Our Service Catalog.", className: "text-[#0B1120] dark:text-[#DEDBC8] block w-full text-left justify-start font-medium" },
                { text: "Built for pure vision. Powered by art.", className: "text-[#0B1120]/60 dark:text-gray-500 block w-full text-left justify-start" }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section className="py-32 px-5 sm:px-8 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#0B1120] dark:text-[#DEDBC8] mb-6 font-medium">Our Process</h2>
            <p className="text-[#0B1120]/60 dark:text-gray-400 text-lg sm:text-xl font-light">A proven methodology that ensures successful project delivery every time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your business, goals, and requirements" },
              { step: "02", title: "Strategy", desc: "Creating a customized roadmap for success" },
              { step: "03", title: "Execution", desc: "Building and implementing your solution" },
              { step: "04", title: "Optimization", desc: "Continuous improvement and support" }
            ].map((p, i) => (
              <div key={i} className="flex flex-col gap-6 p-8 rounded-[2rem] bg-white dark:bg-[#111A30] shadow-xl dark:shadow-none border border-black/5 dark:border-white/5 hover:border-black/10 transition-colors">
                <span className="text-[#0B1120]/20 dark:text-[#DEDBC8]/50 font-serif italic text-5xl">{p.step}</span>
                <h3 className="text-[#0B1120] dark:text-[#DEDBC8] text-2xl font-medium">{p.title}</h3>
                <p className="text-[#0B1120]/60 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="py-32 px-5 sm:px-8 border-t border-black/5 dark:border-white/5 text-center transition-colors duration-500">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#111A30] p-16 rounded-[3rem] shadow-2xl dark:shadow-none border border-black/5 dark:border-white/5">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#0B1120] dark:text-[#DEDBC8] mb-8 font-medium">Ready to Get Started?</h2>
          <p className="text-[#0B1120]/60 dark:text-gray-400 text-lg sm:text-xl font-light mb-12 max-w-2xl mx-auto">
            Let's discuss which services are right for your business and create a customized solution.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#0B1120] dark:bg-[#DEDBC8] text-white dark:text-[#0B1120] font-medium rounded-full px-10 py-5 text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
            Contact Us Today
          </Link>
        </div>
      </section>

    </div>
  )
}
