"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Quote, 
  Compass, 
  Search, 
  Heart, 
  Smile, 
  BookOpen, 
  Award, 
  Zap, 
  Bell,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const FEATURES_DATA = [
  {
    id: 'quotes',
    title: 'Dynamic Quotes Engine',
    tagline: 'Fuel your focus with curated offline wisdom.',
    description: 'Our proprietary on-device logic algorithmically cycles through high-impact motivational philosophy. No network connection required, keeping your focus uninterrupted and 100% private.',
    tags: ['Offline', 'Dynamic', 'Wisdom'],
    icon: Quote,
  },
  {
    id: 'explore',
    title: 'Categorized Explore Hub',
    tagline: 'Curated knowledge paths designed for peace of mind.',
    description: 'Browse neatly segmented categories such as Stoicism, Deep Work, Mindfulness, and Habit Building. Find exactly what resonates with your current state of mind in seconds.',
    tags: ['Categorized', 'Mindful', 'Offline'],
    icon: Compass,
  },
  {
    id: 'search',
    title: 'Advanced Search & Filtering',
    tagline: 'Retrieve inspiration instantly from our rich content vault.',
    description: 'Instantly search by author, topic, or keyword. Use granular filters to match your energy level, objective, or time budget. Safe, lightning fast, and entirely local.',
    tags: ['Advanced', 'Instant', 'Filtering'],
    icon: Search,
  },
  {
    id: 'vault',
    title: 'Offline Favorites Vault',
    tagline: 'Your personal sanctuary of high-resonance insights.',
    description: 'Save quotes, prompts, and insights that impact you the most. Your vault is fully encrypted on your device, ensuring your reflections remain yours and yours alone.',
    tags: ['Private', 'Encrypted', 'Local-Only'],
    icon: Heart,
  },
  {
    id: 'mood',
    title: 'Daily Mood Tracking',
    tagline: 'Connect the dots between your habits and state of mind.',
    description: 'A minimal, friction-free interface designed to help you log your daily emotional state in three taps. Spot visual trends over weeks and months without external server tracking.',
    tags: ['Self-Reflection', 'Tracking', 'Private'],
    icon: Smile,
  },
  {
    id: 'journal',
    title: 'Reflective Journal',
    tagline: 'Unburden your mind in a beautiful sandbox.',
    description: 'Process your thoughts with guided, quiet prompts or free-form offline writing. Built on a sandboxed local SQLite database, meaning not a single keystroke ever leaves your device.',
    tags: ['Secure', 'SQLite', 'No-Cloud'],
    icon: BookOpen,
  },
  {
    id: 'badge',
    title: 'Gamified Badge System',
    tagline: 'Honor your small victories along the way.',
    description: 'Earn elegant, carefully illustrated badges for milestone journal entries, consistent tracking, and focus blocks. Designed to motivate without triggering dopamine loops.',
    tags: ['Gamified', 'Achievements', 'No-Addiction'],
    icon: Award,
  },
  {
    id: 'streak',
    title: 'Streak Tracker',
    tagline: 'Celebrate progress through silent, consistent growth.',
    description: 'Keep track of your consecutive mindful days. A quiet, visual calendar shows your progress. It acts as a gentle mirror to help you hold yourself accountable without guilt.',
    tags: ['Streak', 'Consistency', 'Encouragement'],
    icon: Zap,
  },
  {
    id: 'notifications',
    title: 'Intelligent Notifications',
    tagline: 'Reclaim your focus with local, mindful prompts.',
    description: 'Enjoy smart, highly customizable prompts delivered completely via local Android triggers. Zero tracking servers, zero background data drain, and 100% control over when you are nudged.',
    tags: ['Local-Triggers', 'Zero-Drain', 'Custom'],
    icon: Bell,
  }
]

export default function FeaturesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('quotes')

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#FFE7D0]/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-[#FC6E20]/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.3em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none"
          >
            Core Modules
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Everything You Need.<br className="hidden sm:inline" /> Nothing You Don't.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Focus is engineered from the ground up to operate completely offline. Explore the 9 interconnected local-first modules built to foster mindful consistency.
          </motion.p>
        </div>
      </section>

      {/* Main Feature Layout */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sticky Sidebar Navigation (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-4 glass-panel rounded-2xl p-6 border border-[#FFE7D0]/5">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-2 select-none">
                Navigation
              </span>
              <nav className="flex flex-col gap-2">
                {FEATURES_DATA.map((feat) => {
                  const Icon = feat.icon
                  const isActive = activeSection === feat.id
                  return (
                    <button
                      key={feat.id}
                      onClick={() => scrollToSection(feat.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-sans tracking-wide transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#FC6E20] text-[#1B1B1B] font-bold shadow-[0_0_15px_rgba(252,110,32,0.2)]' 
                          : 'text-[#FFE7D0]/55 hover:text-[#FC6E20] hover:bg-[#FFE7D0]/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1B1B1B]' : 'text-inherit'}`} />
                      <span>{feat.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Feature Sections */}
          <div className="lg:col-span-3 space-y-24 md:space-y-36">
            {FEATURES_DATA.map((feat, index) => {
              const Icon = feat.icon
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={feat.id}
                  id={feat.id}
                  viewport={{ once: true, margin: '-100px' }}
                  onViewportEnter={() => setActiveSection(feat.id)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="scroll-mt-28"
                >
                  <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Visual Card Side */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                      <div className="relative w-full max-w-sm aspect-video sm:aspect-square rounded-2xl glass-panel border border-[#FFE7D0]/10 flex flex-col items-center justify-center p-8 hover:border-[#FC6E20]/30 transition-all duration-500 group shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FC6E20]/0 to-[#FC6E20]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                        <div className="w-16 h-16 rounded-2xl bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-[#FC6E20] group-hover:text-[#1B1B1B] transition-all duration-300 z-10 text-[#FC6E20]">
                          <Icon className="w-8 h-8 transition-transform duration-300" />
                        </div>
                        <span className="text-[10px] tracking-[0.2em] font-sans font-semibold text-[#FFE7D0]/30 uppercase z-10 group-hover:text-[#FFE7D0]/60 transition-colors duration-300">
                          Module 0{index + 1}
                        </span>
                        <h3 className="text-xl font-serif text-[#FFE7D0] mt-3 font-semibold z-10 select-none">
                          {feat.title}
                        </h3>
                        {/* Subtle aesthetic line */}
                        <div className="w-8 h-[1px] bg-[#FFE7D0]/10 mt-4 group-hover:w-20 group-hover:bg-[#FC6E20]/50 transition-all duration-500" />
                      </div>
                    </div>

                    {/* Text Details Side */}
                    <div className="w-full md:w-1/2 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {feat.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2.5 py-0.5 rounded-full bg-[#FFE7D0]/5 border border-[#FFE7D0]/10 text-[9px] font-sans font-bold tracking-widest text-[#FC6E20]/80 uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0] leading-snug">
                        {feat.title}
                      </h2>
                      
                      <p className="text-[#FC6E20] font-sans font-bold text-sm">
                        {feat.tagline}
                      </p>
                      
                      <p className="text-[#FFE7D0]/60 font-sans text-sm md:text-base leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Bottom Request Access CTA */}
      <section className="relative w-full bg-[#1B1B1B] py-24 md:py-32 border-t border-[#FFE7D0]/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[#FC6E20]/4 blur-[130px] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <span className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight select-none">
            Experience complete focus today
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed max-w-xl">
            Join a small, mindful group of early adopters testing our sandbox offline build. No servers, no tracking, just progress.
          </p>
          <div className="mt-10 flex flex-col items-center select-none">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-base font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_35px_rgba(252,110,32,0.55)] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-5.5 h-5.5 text-[#1B1B1B]" />
              <span>Request Early Access</span>
            </button>
            <span className="text-xs text-[#FFE7D0]/40 font-sans mt-4 block">
              ✦ Secure invitation &bull; 100% private sandbox client
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
