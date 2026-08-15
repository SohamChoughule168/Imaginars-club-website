import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { servicesData } from '@/data/services'

// In Next.js 15+, page params are an async Promise
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const service = servicesData.find(s => s.slug === resolvedParams.slug)

  if (!service) {
    notFound()
  }

  const Icon = service.icon

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500 min-h-screen font-prisma selection:bg-black/20 dark:selection:bg-white/20 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        
        <Link href="/services" className="inline-flex items-center gap-2 text-[#0B1120]/60 dark:text-gray-500 hover:text-[#0B1120] dark:hover:text-[#DEDBC8] transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        <div className="mb-12">
          <div className="w-16 h-16 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10 text-[#0B1120] dark:text-[#DEDBC8] mb-8">
            <Icon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium text-[#0B1120] dark:text-[#DEDBC8] mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-xl sm:text-2xl text-[#0B1120]/60 dark:text-gray-400 font-light leading-relaxed max-w-3xl font-serif italic">
            {service.desc}
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-16">
          <div className="text-[#0B1120]/80 dark:text-gray-300 leading-relaxed font-medium">
            {service.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111A30] shadow-xl dark:shadow-none rounded-[2rem] p-8 sm:p-12 border border-black/5 dark:border-white/5 mb-16 transition-colors">
          <h3 className="text-2xl font-medium text-[#0B1120] dark:text-[#DEDBC8] mb-8">Key Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#DEDBC8]/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#0B1120] dark:text-[#DEDBC8]" />
                </div>
                <span className="text-[#0B1120]/80 dark:text-gray-300 font-medium pt-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-white dark:bg-white/[0.02] shadow-xl dark:shadow-none border border-black/5 dark:border-white/5 rounded-[2rem] p-12 transition-colors">
          <h2 className="text-3xl sm:text-4xl text-[#0B1120] dark:text-[#DEDBC8] mb-6 font-medium">Ready to transform your business?</h2>
          <p className="text-[#0B1120]/60 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Let's discuss how our {service.title} expertise can drive massive growth for your brand.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#0B1120] dark:bg-[#DEDBC8] text-white dark:text-[#0B1120] font-medium rounded-full px-8 py-4 text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
            Start Your Project
          </Link>
        </div>

      </div>
    </div>
  )
}
