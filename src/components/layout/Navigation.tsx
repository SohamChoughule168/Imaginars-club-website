"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Assuming siteData exports something like navigationLinks
// import { navigationLinks } from '@/data/siteData';

// Fallback if siteData doesn't exist yet
const navigationLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-4' : 'py-6 bg-transparent'}`}>
      <div className="container-grid items-center px-6 mx-auto max-w-7xl">
        <div className="col-span-2 md:col-span-3">
          <Link href="/" className="text-3xl font-display font-bold text-gold tracking-tighter">
            IC
          </Link>
        </div>
        
        <nav className="hidden md:flex col-span-6 justify-center gap-8">
          {navigationLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="font-body text-secondary hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="col-span-10 md:col-span-3 flex justify-end">
          <Link href="/contact" className="btn-gold px-6 py-2 rounded-full font-body font-medium transition-all hover:scale-105">
            Get Started
          </Link>
        </div>
      </div>
      <div className="hairline-divider mt-4 absolute bottom-0 w-full opacity-20" />
    </header>
  );
}
