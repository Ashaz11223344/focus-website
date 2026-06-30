"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, User, Clock, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const CATEGORIES = ['All', 'Productivity', 'Mindfulness', 'Focus Tips', 'App Updates']

const isNewArticle = (dateStr) => {
  if (!dateStr) return false;
  try {
    const articleDate = new Date(dateStr);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - articleDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    // Returns true if posted within the last 3 days (timezone-safe)
    return diffDays <= 3 && diffDays >= -1;
  } catch (e) {
    return false;
  }
};

export default function BlogIndexClient({ initialArticles = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter articles based on active category pill
  const filteredArticles = selectedCategory === 'All'
    ? initialArticles
    : initialArticles.filter(art => art.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#FFE7D0]/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-[#FC6E20]/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.3em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none"
          >
            Insights & Guides
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            The Quiet Sanctuary Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Explore our curated research, stoic logs, and actionable habits focused on offline productivity, mental well-being, and personal growth.
          </motion.p>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10 min-h-[400px]">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 select-none">
          {CATEGORIES.map((cat, idx) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#FC6E20] border-[#FC6E20] text-[#1B1B1B] font-bold shadow-[0_0_15px_rgba(252,110,32,0.35)]'
                    : 'bg-[#1B1B1B]/40 border-[#FFE7D0]/10 text-[#FFE7D0]/60 hover:text-[#FC6E20] hover:border-[#FC6E20]/30'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Dynamic Glassmorphic Articles Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art, idx) => (
              <motion.article
                key={art.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel border border-[#FFE7D0]/5 rounded-2xl overflow-hidden hover:border-[#FC6E20]/25 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="p-6 space-y-4">
                  {/* Category & Read Time Row */}
                  <div className="flex justify-between items-center select-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 text-[9px] font-sans font-bold tracking-widest text-[#FC6E20] uppercase">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-[#FFE7D0]/40 font-sans font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${art.slug}`}>
                    <h3 className="text-xl font-serif font-bold text-[#FFE7D0] leading-snug group-hover:text-[#FC6E20] transition-colors duration-300">
                      {art.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs text-[#FFE7D0]/55 font-sans leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                {/* Card Footer Info */}
                <div className="px-6 py-4.5 border-t border-[#FFE7D0]/5 flex items-center justify-between bg-[#FFE7D0]/1 text-[10px] text-[#FFE7D0]/45 font-sans select-none">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <User className="w-3.5 h-3.5 text-[#FC6E20]/60" />
                    <span>{art.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isNewArticle(art.date) && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-sans font-bold text-emerald-400 uppercase tracking-wider animate-pulse select-none">
                        New
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.date}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Slide CTA overlay */}
                <Link 
                  href={`/blog/${art.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 text-[#1B1B1B]" />
                </Link>

              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-[#FFE7D0]/40 font-sans tracking-wide">
              No articles found in this category. Check back shortly for updates!
            </p>
          </div>
        )}

      </section>

      {/* Bottom Request Access CTA */}
      <section className="relative w-full bg-[#1B1B1B] py-24 md:py-32 border-t border-[#FFE7D0]/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[#FC6E20]/4 blur-[130px] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <span className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none">
            Digital Sanctuary
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight select-none">
            Read enough? Experience Focus.
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed max-w-xl">
            Download our completely private offline mobile application today.
          </p>
          <div className="mt-10 flex flex-col items-center select-none">
            <a
              href="https://play.google.com/store/apps/details?id=com.ashaz.focus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-base font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_35px_rgba(252,110,32,0.55)] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-5.5 h-5.5 text-[#1B1B1B]" />
              <span>Download Focus</span>
            </a>
            <span className="text-xs text-[#FFE7D0]/40 font-sans mt-4 block">
              ✦ Available now on Google Play &bull; 100% private sandbox client
            </span>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
