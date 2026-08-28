import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import CopyLinkButton from '@/components/ui/CopyLinkButton'
import { blogPosts } from '@/data/blog'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Article not found | ImaginarsClubServices' }
  return {
    title: `${post.title} | ImaginarsClubServices`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = blogPosts.find(p => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative w-full min-h-screen  text-[#0B1120] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1120] selection:bg-blue-600 dark:selection:bg-blue-500 selection:text-white pt-32 pb-24 transition-colors duration-500">
      
      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#0B1120]/50 dark:text-white/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12 font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/10 px-4 py-1.5 rounded-full flex items-center gap-2">
              <Tag className="w-4 h-4" /> {post.category}
            </span>
            <span className="text-sm text-[#0B1120]/50 dark:text-white/50 font-bold flex items-center gap-2"><Calendar className="w-4 h-4"/> {post.date}</span>
            <span className="text-sm text-[#0B1120]/50 dark:text-white/50 font-bold flex items-center gap-2"><Clock className="w-4 h-4"/> {post.readTime}</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl text-[#0B1120] dark:text-white mb-8 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-black/10 dark:border-white/10 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[#0B1120]/40 dark:text-white/60" />
              </div>
              <div>
                <div className="text-base font-bold text-[#0B1120] dark:text-white">{post.author}</div>
                <div className="text-sm font-medium text-[#0B1120]/50 dark:text-white/50">ImaginarsClub Thought Leader</div>
              </div>
            </div>
            
            <CopyLinkButton />
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-[#0B1120] dark:prose-headings:text-white prose-p:text-[#0B1120]/80 dark:prose-p:text-white/80 prose-p:font-medium prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-[#0B1120] dark:prose-strong:text-white">
          {/* We'll parse the simple markdown from our data object manually for safety, or just split by paragraphs and headings */}
          {post.content.split('\n\n').map((block, i) => {
            const trimmed = block.trim()
            if (!trimmed) return null
            if (trimmed.startsWith('### ')) {
              return <h3 key={i} className="text-2xl mt-12 mb-6">{trimmed.replace('### ', '')}</h3>
            }
            if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
              return <p key={i} className="italic text-[#0B1120]/60 dark:text-white/60 text-xl border-l-4 border-blue-600 dark:border-blue-400 pl-6 my-10">{trimmed.replace(/\*/g, '')}</p>
            }
            return <p key={i} className="mb-6">{trimmed}</p>
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-10 bg-blue-600/5 dark:bg-blue-400/5 rounded-[2rem] text-center border border-blue-600/10 dark:border-blue-400/10 shadow-lg dark:shadow-none">
          <h3 className="font-sans text-2xl mb-4 text-[#0B1120] dark:text-white">Ready to apply these insights?</h3>
          <p className="text-[#0B1120]/70 dark:text-white/70 font-medium mb-8 max-w-md mx-auto">
            Our team of experts can help you implement these strategies directly into your business.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-full px-8 py-4 hover:scale-105 transition-transform shadow-xl">
            Consult with our experts
          </Link>
        </div>

      </div>
    </div>
  )
}
