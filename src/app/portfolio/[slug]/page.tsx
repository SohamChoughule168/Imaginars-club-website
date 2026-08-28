import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowLeft, Target, Lightbulb, Trophy } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

export function generateStaticParams() {
  return portfolioData.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = portfolioData.find((p) => p.slug === slug)
  if (!project) return { title: 'Case study not found | ImaginarsClubServices' }
  return {
    title: `${project.headingLine1} ${project.headingLine2} | ImaginarsClubServices`,
    description: project.subtext,
    openGraph: {
      title: `${project.headingLine1} ${project.headingLine2}`,
      description: project.subtext,
      type: 'article',
    },
  }
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = portfolioData.find(p => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0B1120] min-h-screen relative transition-colors duration-500">
      
      {/* Background Video Layer */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          src={project.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/60 to-[#F8FAFC] transition-colors duration-500 dark:from-[#0B1120]/90 dark:via-[#0B1120]/60 dark:to-[#0B1120]" />
      </div>

      {/* Transparent PNG Overlay */}
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none opacity-50">
        <Image
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
          alt=""
          fill
          sizes="100vw"
          className="w-full h-full object-cover animate-train-bob mix-blend-overlay"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-32 text-[#0B1120] dark:text-white transition-colors duration-500">
        
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-[#0B1120]/60 dark:text-white/50 hover:text-[#0B1120] dark:hover:text-white transition-colors mb-16 font-sans text-sm tracking-wide uppercase font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0B1120]/80 dark:text-white/80 border border-black/20 dark:border-white/20 px-4 py-1.5 rounded-full">
              {project.industry}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0B1120]/80 dark:text-white/80 border border-black/20 dark:border-white/20 px-4 py-1.5 rounded-full">
              {project.client}
            </span>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[5.5rem] leading-[1.05] tracking-tight mb-8">
            {project.headingLine1} <br/> {project.headingLine2}
          </h1>
          
          <p className="font-sans text-xl sm:text-2xl text-[#0B1120]/80 dark:text-white/80 max-w-2xl leading-relaxed font-light">
            {project.subtext}
          </p>
        </div>

        {/* Case Study Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 font-sans">
          
          <div className="md:col-span-8 space-y-16">
            
            <section>
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-6 h-6 text-[#0B1120]/60 dark:text-white/50" />
                <h2 className="text-2xl font-serif tracking-wide text-[#0B1120] dark:text-white/90">The Challenge</h2>
              </div>
              <p className="text-lg text-[#0B1120]/80 dark:text-white/70 leading-relaxed font-medium">
                {project.challenge}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-6">
                <Lightbulb className="w-6 h-6 text-[#0B1120]/60 dark:text-white/50" />
                <h2 className="text-2xl font-serif tracking-wide text-[#0B1120] dark:text-white/90">Our Solution</h2>
              </div>
              <p className="text-lg text-[#0B1120]/80 dark:text-white/70 leading-relaxed font-medium">
                {project.solution}
              </p>
            </section>

          </div>

          <div className="md:col-span-4">
            <div className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl sticky top-32 shadow-xl dark:shadow-none transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <Trophy className="w-6 h-6 text-[#0B1120] dark:text-white" />
                <h2 className="text-xl font-serif tracking-wide text-[#0B1120] dark:text-white">The Results</h2>
              </div>
              
              <ul className="space-y-6">
                {project.results.map((result, idx) => (
                  <li key={idx} className="flex flex-col gap-2">
                    <span className="w-8 h-[1px] bg-black/20 dark:bg-white/20"></span>
                    <span className="text-[#0B1120]/90 dark:text-white/90 font-medium leading-relaxed">
                      {result}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
                <Link href="/contact" className="flex items-center justify-center w-full bg-[#0B1120] dark:bg-white text-white dark:text-black font-semibold rounded-full py-4 hover:opacity-90 transition-opacity shadow-lg">
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
