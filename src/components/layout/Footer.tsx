"use client"

import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1120]/10 dark:border-white/5 bg-[#F8FAFC] dark:bg-[#0B1120] pt-20 pb-10 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Branding Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.jpg" alt="ImaginarsClub Services" className="h-6 w-6 object-contain rounded-sm" />
              <span className="text-lg font-semibold text-[#0B1120] dark:text-white tracking-tight">
                ImaginarsClub SERVICES
              </span>
            </Link>
            <p className="text-[#0B1120]/60 dark:text-white/50 text-sm leading-relaxed max-w-xs">
              Your partner in digital transformation and innovation.
            </p>
            <div className="flex items-center gap-4 text-[#0B1120]/40 dark:text-white/40">
              <a href="#" className="hover:text-[#0B1120] dark:hover:text-white transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#0B1120] dark:hover:text-white transition-colors"><FaLinkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#0B1120] dark:hover:text-white transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#0B1120] dark:hover:text-white transition-colors"><FaFacebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#0B1120] dark:text-white font-medium mb-2">Quick Links</h4>
            {['About Us', 'Services', 'Portfolio', 'Blog'].map(link => (
              <Link key={link} href={`/${link.split(' ')[0].toLowerCase()}`} className="text-[#0B1120]/60 dark:text-white/50 text-sm hover:text-[#0B1120] dark:hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#0B1120] dark:text-white font-medium mb-2">Services</h4>
            {['Web Development', 'Mobile Apps', 'AI Solutions', 'Digital Marketing'].map(link => (
              <Link key={link} href="/services" className="text-[#0B1120]/60 dark:text-white/50 text-sm hover:text-[#0B1120] dark:hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#0B1120] dark:text-white font-medium mb-2">Contact</h4>
            <a href="tel:+919372809022" className="text-[#0B1120]/60 dark:text-white/50 text-sm hover:text-[#0B1120] dark:hover:text-white transition-colors">+91 93728 09022</a>
            <a href="mailto:imaginarsclubservices@gmail.com" className="text-[#0B1120]/60 dark:text-white/50 text-sm hover:text-[#0B1120] dark:hover:text-white transition-colors">imaginarsclubservices@gmail.com</a>
            <p className="text-[#0B1120]/60 dark:text-white/50 text-sm leading-relaxed mt-2">
              3 Vikrant residency<br />
              Near station road, Kanjur Marg East, 400042
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-[#0B1120]/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0B1120]/40 dark:text-white/40">
          <p>© 2025 ImaginarsClubServices. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#0B1120] dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#0B1120] dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
