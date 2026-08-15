"use client"

import React, { useState, useEffect, useRef } from 'react'

// --- Custom Hooks ---

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let interval: NodeJS.Timeout

    timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        setDisplayed(text.substring(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// --- Main Page Component ---

export default function ContactPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [showPills, setShowPills] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Typewriter
  const { displayed: typedText, done: typingDone } = useTypewriter(
    "Ready to transform your digital presence? Let's discuss how we can help your business grow.", 
    38, 
    600
  )

  // Initialization & Pill Buttons Delay
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowPills(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // Video Scrubbing Logic
  useEffect(() => {
    if (!mounted || !videoRef.current) return

    const video = videoRef.current
    const SENSITIVITY = 0.8
    let prevX = window.innerWidth / 2
    let targetTime = video.currentTime
    let isSeeking = false
    let nextTime: number | null = null
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration) return
      
      const currentX = e.clientX
      const delta = currentX - prevX
      prevX = currentX

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTime = Math.max(0, Math.min(video.duration, targetTime + timeOffset))

      if (!isSeeking && nextTime === null) {
        nextTime = targetTime
        rafId = requestAnimationFrame(processSeek)
      } else {
        nextTime = targetTime
      }
    }

    const processSeek = () => {
      if (nextTime !== null && !isSeeking) {
        isSeeking = true
        video.currentTime = nextTime
        nextTime = null
      }
    }

    const handleSeeked = () => {
      isSeeking = false
      if (nextTime !== null) {
        rafId = requestAnimationFrame(processSeek)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    video.addEventListener('seeked', handleSeeked)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      video.removeEventListener('seeked', handleSeeked)
      cancelAnimationFrame(rafId)
    }
  }, [mounted])

  const copyEmail = () => {
    navigator.clipboard.writeText('imaginarsclubservices@gmail.com')
    alert("Email copied to clipboard!")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      service: formData.get('service'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset()
      } else {
        setFormStatus('error')
        console.error('Failed to send email')
      }
    } catch (error) {
      setFormStatus('error')
      console.error('Error sending form:', error)
    }
  }

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full font-mainframe-body bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0B1120] dark:text-white transition-colors duration-500">
      
      {/* Fixed Background Video */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60"
          style={{ objectPosition: '70% center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0B1120] via-[#F8FAFC]/50 dark:via-[#0B1120]/50 to-transparent backdrop-blur-[2px] transition-colors duration-500" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl pt-24">
            
            <h1 className="font-mainframe-heading text-4xl sm:text-6xl md:text-7xl mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0B1120] to-[#0B1120]/70 dark:from-white dark:to-white/70">
              Get In Touch
            </h1>

            {/* Typewriter Text */}
            <p 
              className="text-[#0B1120]/90 dark:text-white/90 mb-8 font-medium min-h-[54px]"
              style={{ fontSize: 'clamp(18px, 3vw, 24px)', lineHeight: 1.4 }}
            >
              {typedText}
              {!typingDone && (
                <span className="inline-block w-[2px] bg-[#0B1120] dark:bg-white align-middle ml-[2px]" style={{ height: '1.1em', animation: 'blink 1s step-end infinite' }} />
              )}
            </p>

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}} />

            {/* Action Pills */}
            <div 
              className={`flex flex-wrap gap-3 transition-all duration-400 ease-out ${showPills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <a 
                href="#contact-form-section"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center bg-[#0B1120] dark:bg-white text-white dark:text-black border border-[#0B1120] dark:border-white rounded-full text-sm sm:text-base font-medium px-6 py-3 hover:bg-black dark:hover:bg-gray-200 transition-all duration-300 shadow-xl"
              >
                Send Us a Message
              </a>

              <button 
                onClick={copyEmail}
                className="inline-flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-md text-[#0B1120] dark:text-white border border-black/20 dark:border-white/20 rounded-full text-sm sm:text-base font-medium px-6 py-3 gap-2 hover:bg-white dark:hover:bg-white hover:text-black dark:hover:text-black transition-all duration-300 shadow-xl"
              >
                <span>imaginarsclubservices@gmail.com</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div id="contact-form-section" className="bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 w-full py-24 px-5 sm:px-8 md:px-12 transition-colors duration-500 shadow-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Form */}
            <div>
              <h2 className="font-mainframe-heading text-3xl sm:text-4xl mb-8 font-medium">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70">Full Name *</label>
                    <input required type="text" name="name" id="name" className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[#0B1120] dark:text-white placeholder:text-[#0B1120]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm dark:shadow-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70">Email *</label>
                    <input required type="email" name="email" id="email" className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[#0B1120] dark:text-white placeholder:text-[#0B1120]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm dark:shadow-none" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70">Phone</label>
                    <input type="tel" name="phone" id="phone" className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[#0B1120] dark:text-white placeholder:text-[#0B1120]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm dark:shadow-none" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70">Company</label>
                    <input type="text" name="company" id="company" className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[#0B1120] dark:text-white placeholder:text-[#0B1120]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm dark:shadow-none" placeholder="Your Company Ltd" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70">Service Interested In</label>
                  <select name="service" id="service" className="w-full bg-white dark:bg-[#111A30] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[#0B1120] dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer shadow-sm dark:shadow-none">
                    <option value="">Select a service...</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="ai">AI-Driven Solutions</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="video">Video Editing</option>
                    <option value="brand">Brand Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#0B1120]/70 dark:text-white/70">Message *</label>
                  <textarea required name="message" id="message" rows={5} className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[#0B1120] dark:text-white placeholder:text-[#0B1120]/30 dark:placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-sm dark:shadow-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className="w-full sm:w-auto bg-[#0B1120] dark:bg-white text-white dark:text-black font-medium rounded-xl px-8 py-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : formStatus === 'error' ? 'Error Sending' : 'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">Thank you! We'll get back to you within 24 hours.</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">Something went wrong. Please check your email configuration.</p>
                )}
              </form>
            </div>

            {/* Right Column: Info & Why Contact Us */}
            <div className="space-y-16">
              
              {/* Contact Info */}
              <div>
                <h3 className="font-mainframe-heading text-2xl mb-6 text-[#0B1120] dark:text-white font-medium">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#0B1120]/50 dark:text-white/50 mb-1">Phone & Availability</span>
                    <a href="tel:+919372809022" className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">+91 93728 09022</a>
                    <span className="text-sm text-[#0B1120]/70 dark:text-white/70">Mon-Sat, 9am-7pm IST</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#0B1120]/50 dark:text-white/50 mb-1">Email & Response Time</span>
                    <button onClick={copyEmail} className="text-lg text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">imaginarsclubservices@gmail.com</button>
                    <span className="text-sm text-[#0B1120]/70 dark:text-white/70">We respond within 24 hours</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#0B1120]/50 dark:text-white/50 mb-1">Office Location</span>
                    <span className="text-lg leading-relaxed font-medium">
                      3 Vikrant residency<br />
                      Near station road, Kanjur Marg East, 400042
                    </span>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-none">
                <h3 className="font-mainframe-heading text-2xl mb-8 font-medium">Why Contact Us?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-[#0B1120] dark:text-white mb-2">Free Consultation</h4>
                    <p className="text-sm text-[#0B1120]/60 dark:text-white/60 leading-relaxed font-medium">Get expert advice on your project with no obligation. We'll help you understand the best path forward.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0B1120] dark:text-white mb-2">Custom Solutions</h4>
                    <p className="text-sm text-[#0B1120]/60 dark:text-white/60 leading-relaxed font-medium">We don't believe in one-size-fits-all. Every solution is tailored to your specific needs and goals.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0B1120] dark:text-white mb-2">Quick Response</h4>
                    <p className="text-sm text-[#0B1120]/60 dark:text-white/60 leading-relaxed font-medium">We typically respond within 24 hours. Your time is valuable, and we respect that.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0B1120] dark:text-white mb-2">Transparent Pricing</h4>
                    <p className="text-sm text-[#0B1120]/60 dark:text-white/60 leading-relaxed font-medium">No hidden fees or surprises. We provide clear, detailed proposals with transparent pricing.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-white dark:bg-[#111A30] py-24 border-t border-black/5 dark:border-white/5 text-center px-5 transition-colors duration-500 shadow-inner dark:shadow-none">
          <h2 className="font-mainframe-heading text-3xl sm:text-5xl mb-6 font-medium">Ready to Get Started?</h2>
          <p className="text-lg text-[#0B1120]/60 dark:text-white/60 max-w-2xl mx-auto mb-10 font-medium">
            Join 150+ satisfied clients who have transformed their business with our comprehensive digital solutions.
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="font-mainframe-heading text-4xl sm:text-5xl text-blue-600 dark:text-blue-400">98%</span>
              <span className="text-sm font-medium text-[#0B1120]/50 dark:text-white/50 uppercase tracking-wider">Client Satisfaction</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
