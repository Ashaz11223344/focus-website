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
  Lock,
  Layers,
  Activity,
  Shield,
  Palette,
  Sparkles
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PhoneMockup from '../components/PhoneMockup'
import RequestAccessModal from '../components/RequestAccessModal'

const FEATURES_DATA = [
  {
    id: 'quotes',
    title: 'Dynamic Quotes Engine',
    tagline: 'Fuel your focus with curated offline calligraphy wisdom.',
    description: 'Delivers high-fidelity curated quotes in a stunning calligraphy presentation utilizing the handcrafted Google Font "Playwrite GB S". Swiftly slide, share, copy, or refresh instantly from your offline catalog without active network dependencies.',
    tags: ['Calligraphy', 'Offline-First', 'Wisdom'],
    icon: Quote,
    image: '/screenshots/home_screen.png'
  },
  {
    id: 'explore',
    title: 'Categorized Explore Hub',
    tagline: 'Curated knowledge paths for every state of mind.',
    description: 'Dive into tailored mental categories matching your current mood: Motivation, Calm, Focus, Hard Work, Love, and Success. Features a responsive wrapping grid optimized for phones, tablets, and foldables.',
    tags: ['Categorized', 'Mindful', 'Universal-Grid'],
    icon: Compass,
    image: '/screenshots/categories.png'
  },
  {
    id: 'search',
    title: 'Advanced Search & Dynamic Chips',
    tagline: 'Session-aware recommendations and runtime tag filters.',
    description: 'Search through thousands of offline quotes instantly by topic, author, or keyword. Enjoy auto-suggestions under "Suggested for You ✦", session-history deduplication, and dynamic capitalized filter chips extracted from the localized database at runtime.',
    tags: ['Smart-Search', 'Dynamic-Chips', 'Suggestions'],
    icon: Search,
    image: '/screenshots/search.png'
  },
  {
    id: 'vault',
    title: 'Offline Favorites Vault',
    tagline: 'Permanent, fast offline reflection for high-resonance thoughts.',
    description: 'Bookmark quotes that speak directly to your soul. Your vault is permanently cataloged on your device for lightning-fast retrieval even without cellular signal, with streamlined single-tap actions.',
    tags: ['Private', 'Bookmarks', 'Local-Only'],
    icon: Heart,
    image: '/screenshots/favorites.png'
  },
  {
    id: 'mood',
    title: 'Daily Mood Tracking',
    tagline: 'Truthful monthly emotional analytics with single-log protection.',
    description: 'Log your emotional state once per day. If you log again on the same day, it intelligently overwrites your previous choice, guaranteeing your monthly averages and trends are 100% accurate and never skewed by accidental double-logs.',
    tags: ['Single-Log', 'No-Telemetry', 'Accurate-Trends'],
    icon: Smile,
    image: '/screenshots/mood_tracker.png'
  },
  {
    id: 'journal',
    title: 'Reflective Public Journal',
    tagline: 'Unburden your mind in a distraction-free serif sandbox.',
    description: 'An elegant personal diary system integrated directly inside the app. Write daily reflections, goals, or notes with book-grade typography using the sleek "Literata" font family, saved locally in a secure SQLite container.',
    tags: ['Book-Grade', 'Literata-Font', 'SQLite-Sandbox'],
    icon: BookOpen,
    image: '/screenshots/journal.png'
  },
  {
    id: 'badge',
    title: 'Gamified Milestone System',
    tagline: 'Honor your victories with 11 aesthetic habit badges.',
    description: 'Earn and unlock customized achievement badges like Mood Tracker, Journal Keeper, Focus Ninja, and Mythic Master for your consistency. Gamifies your personal growth journey without triggering toxic social media loops.',
    tags: ['11-Milestones', 'Achievements', 'No-Addiction'],
    icon: Award,
    image: '/screenshots/achievements.png'
  },
  {
    id: 'streak',
    title: 'Self-Disciplines Streak Tracker',
    tagline: 'Celebrate progress through quiet, unbroken habit momentum.',
    description: 'Track consecutive days of mindful check-ins with an encouraging daily streak affirmation dashboard ("Intent Affirmed!"). A gentle mirror that keeps you accountable without guilt or spammy push alerts.',
    tags: ['Streak', 'Consistency', 'Daily-Intent'],
    icon: Zap,
    image: '/screenshots/intent.png'
  },
  {
    id: 'zen-lock',
    title: 'Zen Journal & PIN Protection',
    tagline: 'Cryptographic SHA-256 privacy and screenshot masking.',
    description: 'Keep your deepest thoughts private with Zen Journal. Features local PIN setup, encrypted backup passwords, SHA-256 validation, and WindowManager FLAG_SECURE protection to block screenshots and mask app switcher previews.',
    tags: ['SHA-256-PIN', 'FLAG_SECURE', 'Encrypted-Backup'],
    icon: Lock,
    image: '/screenshots/private_journal.png'
  },
  {
    id: 'multi-select',
    title: 'Double-Tap Multi-Select System',
    tagline: 'Batch operations on your favorite wisdom entries.',
    description: 'Double-tap any quote across Home, Favorites, History, Search, or Explore to enter batch selection mode. Smooth contracted scaling (0.97f) and vibrant orange highlight overlays let you batch favorite, share, copy, or delete in bulk.',
    tags: ['Batch-Actions', 'Double-Tap', 'Smooth-Scaling'],
    icon: Layers,
    image: '/screenshots/favorites.png'
  },
  {
    id: 'analytics',
    title: 'Mindfulness Weekly Analytics',
    tagline: 'Canvas-drawn Bezier mood curve and report card sharing.',
    description: 'Visualize your weekly emotional journey with a custom Canvas Bezier curve with emoji nodes and neutral 3.0f fallback scores. Includes public journal word clouds, weekly highlights, and high-resolution bitmap report card export.',
    tags: ['Bezier-Curve', 'Report-Card', 'Word-Cloud'],
    icon: Activity,
    image: '/screenshots/mood_graph.png'
  },
  {
    id: 'focus-guard',
    title: 'Focus Guard & App Blocker',
    tagline: 'Automated DND silencer & persistent app blocker shield.',
    description: 'Program distraction-free windows that automatically engage Do Not Disturb mode. The persistent AppBlockerService polls foreground apps every 500ms and intercepts distracting apps with a pulsing shield overlay, quotes, and 5-minute override timers.',
    tags: ['App-Blocker', 'DND-Silencer', 'Shield-Overlay'],
    icon: Shield,
    image: '/screenshots/app_blocker.png'
  },
  {
    id: 'wallpaper',
    title: 'Dynamic Wallpaper Generator',
    tagline: 'Turn your favorite quotes into aesthetic film-grain wallpapers.',
    description: 'Craft bespoke typography wallpapers using curated HSL color themes (Noir, etc.), custom fonts (Literata, Inter, Lora), text alignment options, and adjustable film grain texture (0% to 8%). Set as Home/Lock screen or export to gallery.',
    tags: ['Wallpaper-Maker', 'Film-Grain', 'Typography'],
    icon: Palette,
    image: '/screenshots/setting_1.png'
  }
]

export default function FeaturesClient() {
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
            All 13 Core Modules
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
            Focus is engineered from the ground up to operate completely offline. Explore all 13 interconnected local-first modules built for deep work, private journaling, and mindful consistency.
          </motion.p>
        </div>
      </section>

      {/* Main Feature Layout */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sticky Sidebar Navigation (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-4 glass-panel rounded-2xl p-6 border border-[#FFE7D0]/5 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-2 select-none">
                Navigation (13 Modules)
              </span>
              <nav className="flex flex-col gap-1.5">
                {FEATURES_DATA.map((feat, idx) => {
                  const Icon = feat.icon
                  const isActive = activeSection === feat.id
                  return (
                    <button
                      key={feat.id}
                      onClick={() => scrollToSection(feat.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-sans tracking-wide transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#FC6E20] text-[#1B1B1B] font-bold shadow-[0_0_15px_rgba(252,110,32,0.2)]' 
                          : 'text-[#FFE7D0]/55 hover:text-[#FC6E20] hover:bg-[#FFE7D0]/5'
                      }`}
                    >
                      <span className="text-[10px] opacity-60 font-mono">0{idx + 1}</span>
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#1B1B1B]' : 'text-inherit'}`} />
                      <span className="truncate">{feat.title}</span>
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
                    
                    {/* Visual Mockup Card Side */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                      <div className="relative group flex items-center justify-center">
                        <div className="absolute w-[240px] h-[380px] bg-[#FC6E20]/10 blur-[50px] rounded-[40px] -z-10 group-hover:bg-[#FC6E20]/20 transition-all duration-500 pointer-events-none" />
                        <PhoneMockup
                          image={feat.image}
                          alt={feat.title}
                          className="w-[240px] sm:w-[270px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[#FFE7D0]/10 group-hover:border-[#FC6E20]/40 transition-all duration-500"
                        />
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
                      
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0] leading-snug">
                          {feat.title}
                        </h2>
                      </div>
                      
                      <p className="text-[#FC6E20] font-sans font-bold text-sm">
                        {feat.tagline}
                      </p>
                      
                      <p className="text-[#FFE7D0]/70 font-sans text-sm md:text-base leading-relaxed">
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

      {/* Dynamic Comparison Callout Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 relative z-10 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl p-8 md:p-12 border border-[#FFE7D0]/10 bg-[#FFE7D0]/2 text-center relative overflow-hidden group hover:border-[#FC6E20]/20 transition-all duration-300"
        >
          {/* Subtle accent glow */}
          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#FC6E20]/5 blur-xl group-hover:bg-[#FC6E20]/10 transition-all duration-300" />
          
          <h3 className="text-xl md:text-3xl font-serif text-[#FFE7D0] leading-snug tracking-wide max-w-2xl mx-auto font-medium">
            Looking for a <span className="text-[#FC6E20]">Daylio alternative</span> with no account?<br />
            A <span className="text-[#FC6E20]">Reflectly alternative</span> with no cloud sync?
          </h3>
          <div className="w-12 h-[1px] bg-[#FFE7D0]/10 my-6 mx-auto group-hover:w-24 group-hover:bg-[#FC6E20]/30 transition-all duration-500" />
          <p className="text-sm md:text-base text-[#FFE7D0]/70 font-sans max-w-xl mx-auto leading-relaxed">
            Focus is the only offline-first mood tracker, Stoic journal, and app blocker that requires zero registration. Your self-reflection belongs entirely on your device.
          </p>
        </motion.div>
      </section>

      {/* Bottom Download CTA */}
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
            Download Focus to experience all 13 offline modules. No servers, no tracking, just mindful progress.
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
