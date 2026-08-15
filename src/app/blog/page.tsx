"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, LockKeyhole, Fingerprint, ArrowRightCircle, Calendar, Tag, User, Clock } from 'lucide-react'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

const categories = [
  "All",
  "AI & Technology",
  "Digital Marketing",
  "Web Development",
  "Mobile Development",
  "SEO & Search",
  "Content Marketing",
  "Brand Management"
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  )

  const featuredPost = blogPosts.find(p => p.featured)

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  }

  return (
    <div className="relative w-full min-h-screen font-vault-body text-[#0B1120] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1120] selection:bg-blue-600 dark:selection:bg-blue-500 selection:text-white transition-colors duration-500">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[85svh] min-h-[600px] overflow-hidden flex flex-col justify-center">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0B1120] via-transparent to-transparent z-0" />
        
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 mt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md p-8 sm:p-12 rounded-[2rem] border border-white/20 dark:border-white/10"
          >
            <motion.h1
              variants={fadeUp}
              className="font-vault-heading text-[#0B1120] dark:text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: '1.05', letterSpacing: '-0.01em' }}
            >
              Our Blog
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-vault-body text-[#0B1120]/80 dark:text-white/80 mb-8 font-medium"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: '1.65' }}
            >
              Insights, strategies, and thought leadership on digital transformation, technology, and business growth. Stay updated with the latest trends and expert advice.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED & ALL POSTS SECTION */}
      <section className="relative z-10 py-24 sm:py-32 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          
          {/* Featured Post (Only show on 'All' category) */}
          {activeCategory === "All" && featuredPost && (
            <div className="mb-24">
              <h2 className="font-vault-heading text-2xl sm:text-3xl text-[#0B1120] dark:text-white mb-8 tracking-tight">Featured Article</h2>
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <div className="bg-white dark:bg-[#111A30] rounded-[2rem] p-8 sm:p-12 border border-black/5 dark:border-white/5 shadow-xl flex flex-col lg:flex-row gap-12 items-center cursor-pointer hover:shadow-2xl transition-shadow duration-500 group">
                  <div className="w-full lg:w-1/2 aspect-video bg-blue-600/5 dark:bg-blue-400/5 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 dark:from-blue-400/20 to-transparent mix-blend-multiply z-10 pointer-events-none" />
                    <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Featured AI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0" />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col items-start relative z-20">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                        <Tag className="w-4 h-4" /> {featuredPost.category}
                      </span>
                      <span className="text-sm text-[#0B1120]/50 dark:text-white/50 font-medium flex items-center gap-2"><Calendar className="w-4 h-4"/> {featuredPost.date}</span>
                      <span className="text-sm text-[#0B1120]/50 dark:text-white/50 font-medium flex items-center gap-2"><Clock className="w-4 h-4"/> {featuredPost.readTime}</span>
                    </div>
                    <h3 className="font-vault-heading text-3xl sm:text-4xl lg:text-5xl mb-6 text-[#0B1120] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-[#0B1120]/70 dark:text-white/70 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#0B1120]/60 dark:text-white/60" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B1120] dark:text-white">{featuredPost.author}</div>
                        <div className="text-xs font-medium text-[#0B1120]/50 dark:text-white/50">Author</div>
                      </div>
                    </div>
                    <button className="font-vault-body font-semibold text-white dark:text-[#0B1120] bg-blue-600 dark:bg-blue-400 rounded-full px-8 py-4 inline-flex items-center gap-4 group-hover:scale-105 transition-transform">
                      Read Full Article <ArrowRightCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="mb-12">
            <h2 className="font-vault-heading text-3xl sm:text-4xl text-[#0B1120] dark:text-white mb-8 tracking-tight">Latest Articles</h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-[#0B1120] dark:bg-white text-white dark:text-[#0B1120] border-[#0B1120] dark:border-white shadow-md" 
                      : "bg-white dark:bg-[#111A30] text-[#0B1120] dark:text-white border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.filter(p => !p.featured || activeCategory !== "All").map((post, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={post.title}
                  className="h-full"
                >
                  <Link href={`/blog/${post.slug}`} className="group cursor-pointer p-8 rounded-3xl bg-white dark:bg-[#111A30] border border-black/5 dark:border-white/5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </div>
                    </div>
                    
                    <h3 className="font-vault-heading text-xl sm:text-2xl mb-4 text-[#0B1120] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#0B1120]/60 dark:text-white/60 text-sm leading-relaxed mb-8 flex-grow font-medium">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-[#0B1120] dark:text-white">{post.author}</span>
                        <div className="flex items-center gap-3 text-xs text-[#0B1120]/50 dark:text-white/50 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredPosts.length === 0 && (
              <div className="col-span-full py-20 text-center text-[#0B1120]/50 dark:text-white/50 font-medium text-lg">
                No articles found in this category.
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
