"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowLeft, Sparkles, BookOpen } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RequestAccessModal from '../../components/RequestAccessModal'

// Simple robust markdown to React elements renderer
function MarkdownContent({ rawContent }) {
  const blocks = rawContent.split(/\n\s*\n/)
  
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const text = block.trim()
        if (!text) return null

        // Header 3
        if (text.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] pt-4 select-none">
              {text.replace('### ', '')}
            </h3>
          )
        }

        // Header 2
        if (text.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0] pt-6 border-b border-[#FFE7D0]/5 pb-2 select-none">
              {text.replace('## ', '')}
            </h2>
          )
        }

        // Bulleted lists
        if (text.startsWith('- ') || text.startsWith('* ')) {
          const items = text.split('\n').map(li => li.replace(/^[-*]\s+/, ''))
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-[#FFE7D0]/75 font-sans text-sm md:text-base leading-relaxed">
              {items.map((item, lIdx) => (
                <li key={lIdx}>{item}</li>
              ))}
            </ul>
          )
        }

        // Numbered lists
        if (/^\d+\.\s+/.test(text)) {
          const items = text.split('\n').map(li => li.replace(/^\d+\.\s+/, ''))
          return (
            <ol key={idx} className="list-decimal pl-6 space-y-2 text-[#FFE7D0]/75 font-sans text-sm md:text-base leading-relaxed">
              {items.map((item, lIdx) => (
                <li key={lIdx}>{item}</li>
              ))}
            </ol>
          )
        }

        // Default Paragraph
        return (
          <p key={idx} className="text-[#FFE7D0]/70 font-sans text-sm md:text-base leading-relaxed">
            {text}
          </p>
        )
      })}
    </div>
  )
}

export default function BlogArticleClient({ article, relatedArticles = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Tracking reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      if (totalScroll > 0) {
        const pct = (currentScroll / totalScroll) * 100
        setScrollProgress(Math.min(pct, 100))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Fixed top scroll progress indicator bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#FC6E20] z-[100] transition-all duration-100 shadow-[0_0_10px_rgba(252,110,32,0.6)]" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Article Container */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-[#FFE7D0]/50 hover:text-[#FC6E20] transition-colors duration-300 mb-8 select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Metadata Header */}
        <div className="space-y-6 mb-12 border-b border-[#FFE7D0]/10 pb-8 select-none">
          <span className="px-3 py-1 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 text-[10px] font-sans font-bold tracking-widest text-[#FC6E20] uppercase inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FFE7D0] leading-tight tracking-wide">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 items-center text-xs text-[#FFE7D0]/45 font-sans pt-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#FFE7D0]/70">
              <User className="w-4 h-4 text-[#FC6E20]/60" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Parsed Prose Content */}
        <article className="prose prose-invert max-w-none mb-20">
          <MarkdownContent rawContent={article.content} />
        </article>

        {/* End of post CTA line */}
        <div className="border-t border-[#FFE7D0]/10 pt-16 pb-20 text-center select-none relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#FC6E20] to-transparent" />
          <div className="w-12 h-12 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center mx-auto mb-6 text-[#FC6E20]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] mb-4">
            Finished Reading?
          </h3>
          <p className="text-xs md:text-sm text-[#FFE7D0]/50 max-w-md mx-auto mb-8 leading-relaxed font-sans">
            Apply today to secure your sandbox invitation. Start cultivating Stoic consistency in a 100% private, local-first mobile sandbox.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-sm font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_25px_rgba(252,110,32,0.45)] transition-all duration-300 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4.5 h-4.5" />
            <span>Request Early Access</span>
          </button>
        </div>

        {/* Related Posts at bottom */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-[#FFE7D0]/5 pt-16">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans select-none text-center">
              Keep Reading
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#FFE7D0] text-center mb-10 select-none">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedArticles.map((art) => (
                <article
                  key={art.slug}
                  className="glass-panel border border-[#FFE7D0]/5 rounded-2xl p-6 hover:border-[#FC6E20]/25 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center select-none text-[10px] text-[#FFE7D0]/40 font-sans">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFE7D0]/5 border border-[#FFE7D0]/10 font-bold uppercase tracking-wider text-[#FC6E20]/80">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <Link href={`/blog/${art.slug}`}>
                      <h4 className="text-base font-serif font-bold text-[#FFE7D0] group-hover:text-[#FC6E20] transition-colors duration-300 leading-snug">
                        {art.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#FFE7D0]/55 font-sans leading-relaxed line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                  <Link 
                    href={`/blog/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-[#FC6E20] mt-6 group-hover:gap-3 transition-all duration-300"
                  >
                    <span>Read Article</span>
                    <span className="text-base">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
