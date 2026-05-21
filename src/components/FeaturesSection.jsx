import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Search, Smile, BookOpen, Shield, Lock, Clock } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneMockup from './PhoneMockup'

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    title: 'Daily Inspiration',
    subtitle: 'Stunning Calligraphy presentation',
    description: 'Delivers high-fidelity quotes in a beautifully presented calligraphy layout. Tap to copy or share, and refresh instantly to draw new wisdom from your offline database.',
    image: '/screenshots/home-sceen.jpeg',
    icon: Sparkles,
    color: '#FC6E20',
  },
  {
    title: 'Offline Favorites Vault',
    subtitle: 'Keep wisdom permanently close',
    description: 'Save quotes that strike your soul directly into a personal favorites folder. Access them instantaneously anywhere, even deep in the wilderness without cellular signal.',
    image: '/screenshots/favorites.jpeg',
    icon: Heart,
    color: '#FFE7D0',
  },
  {
    title: 'Smart Offline Search',
    subtitle: 'Instant concepts & author filters',
    description: 'Easily navigate through a massive collection of offline quotes. Filter instantly by topics, authors, or categories to find exact thoughts matching your mindset.',
    image: '/screenshots/search.jpeg',
    icon: Search,
    color: '#FC6E20',
  },
  {
    title: 'Precise Mood Logging',
    subtitle: 'Overwriting single-log analytics',
    description: 'Keep a clean record of your feelings. Enforces a smart single-log daily rule: new logs update the previous choice, guaranteeing your emotional history and charts remain 100% accurate.',
    image: '/screenshots/mood-tracker.png',
    icon: Smile,
    color: '#FFE7D0',
  },
  {
    title: 'Mood Card',
    subtitle: 'Share Your Moods with Friends',
    description: 'Share your current mood with friends and loved ones. Let them know how you are feeling and brighten their day with your positive vibes.',
    image: '/screenshots/mood_card.png',
    icon: Smile,
    color: '#FFE7D0',
  },
  {
    title: 'Reflective Zen Journal',
    subtitle: 'Book-grade Literata typography',
    description: 'An elegant personal diary directly inside your pocket. Put down thoughts, aspirations, and lessons in a highly peaceful writing space using beautiful serif text formatting.',
    image: '/screenshots/journal.jpeg',
    icon: BookOpen,
    color: '#FC6E20',
  },
  {
    title: 'PIN protection',
    subtitle: 'Privacy first approach',
    description: 'Add PIN protection to keep your private thoughts and records safe and accessible only to you.',
    image: '/screenshots/pin_code.png',
    icon: Lock,
    color: '#FC6E20',
  },
  {
    title: 'Quiet Control & Privacy',
    subtitle: '100% Secure offline sandboxing',
    description: 'We respect your tranquility. Customize Quiet Hours to silence status bar badges during sleep. Because all records stay in a sandboxed SQLite database, your data is yours alone.',
    image: '/screenshots/notification.png',
    icon: Shield,
    color: '#FFE7D0',
  },
  {
    title: 'Custom Quote Timings',
    subtitle: 'Quotes exactly when you need them',
    description: 'Set custom, specific times throughout your day to receive your daily quotes. Whether it\'s with your morning coffee, during your lunch break, or right before bed, your wisdom arrives exactly on your schedule.',
    image: '/screenshots/specific_time.png',
    icon: Clock,
    color: '#FC6E20',
  }
]

// Reusable Typewriter component with staged rendering and cancellation hooks
function TypewriterText({ text, speed = 15, delay = 0, onComplete }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    setDisplayedText('')
    let isCancelled = false

    const timeout = setTimeout(() => {
      let index = 0
      const timer = setInterval(() => {
        if (isCancelled) {
          clearInterval(timer)
          return
        }
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index))
          index++
        } else {
          clearInterval(timer)
          if (onComplete) onComplete()
        }
      }, speed)
    }, delay)

    return () => {
      isCancelled = true
      clearTimeout(timeout)
    }
  }, [text, speed, delay])

  return <span>{displayedText}</span>
}

// Sub-component for structured single feature text block to isolate typewriter states
function FeatureTextBlock({ feature, activeIndex }) {
  const [isTitleDone, setIsTitleDone] = useState(false)
  const Icon = feature.icon

  // Reset title staged state when the active index changes
  useEffect(() => {
    setIsTitleDone(false)
  }, [activeIndex])

  return (
    <motion.div
      key={activeIndex}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-start text-left"
    >
      {/* Feature Subtitle category */}
      <span className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-3">
        {feature.subtitle}
      </span>

      {/* Title with Icon */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#FC6E20]/10 border border-[#FC6E20]/25 flex items-center justify-center text-[#FC6E20]">
          <Icon className="w-5.5 h-5.5" />
        </div>
        <h3 className="text-3xl md:text-4xl font-serif text-[#FFE7D0] tracking-wide leading-tight">
          <TypewriterText
            text={feature.title}
            speed={18}
            onComplete={() => setIsTitleDone(true)}
          />
        </h3>
      </div>

      {/* Description paragraph with minimum height to avoid layout jumps during typewriter reveal */}
      <p className="text-sm md:text-base text-[#FFE7D0]/65 font-sans leading-relaxed max-w-md min-h-[96px]">
        {isTitleDone && (
          <TypewriterText
            text={feature.description}
            speed={8}
          />
        )}
      </p>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const viewportRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return // Do not initialize ScrollTrigger on mobile viewports

    // Setup ScrollTrigger pinned timeline inside GSAP context to auto clean up
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: viewportRef.current,
        pinSpacing: false, // Pinned viewport acts inside container space
        scrub: 0.8, // Snappy scrolling scrubbing
        snap: {
          snapTo: 1 / (FEATURES.length - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.05,
          ease: 'power2.out'
        },
        onUpdate: (self) => {
          const progress = self.progress
          // Divide scroll progress into equivalent feature blocks
          const index = Math.min(
            Math.floor(progress * FEATURES.length),
            FEATURES.length - 1
          )
          setActiveIndex(index)
          setScrollProgress(progress)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile])

  const handleFeatureClick = (index) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const containerTop = rect.top + scrollTop

    // Total height of the scroll container minus the viewport height
    const containerHeight = container.offsetHeight
    const scrollableHeight = containerHeight - window.innerHeight

    // Position within the scrollable height (linear mapping of index to snap progress)
    const progress = index / (FEATURES.length - 1)
    const targetScroll = containerTop + (progress * scrollableHeight)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  if (isMobile) {
    return (
      <section id="features" className="w-full bg-[#1B1B1B] py-20 px-6 border-b border-[#FFE7D0]/5 relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#FC6E20]/2 blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full bg-[#FFE7D0]/2 blur-[120px] pointer-events-none z-0"></div>

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center select-none text-center mb-16">
          <span className="text-[12px] font-sans tracking-[0.2em] font-semibold text-[#FC6E20] uppercase">Features Walkthrough</span>
          <h2 className="text-4xl font-serif text-[#FFE7D0] mt-3 leading-tight">
            Designed for mindful presence
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-3 text-sm leading-relaxed">
            Take a natural tour of the high-fidelity tools built directly inside your growth sanctuary.
          </p>
        </div>

        {/* Stack of Feature Cards */}
        <div className="max-w-md mx-auto flex flex-col gap-12 relative z-10">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="glass-panel p-8 rounded-3xl border border-[#FFE7D0]/5 flex flex-col items-center text-center relative overflow-hidden group shadow-lg"
              >
                {/* Feature Category */}
                <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-3">
                  {feature.subtitle}
                </span>

                {/* Badge Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#FC6E20]/10 border border-[#FC6E20]/25 flex items-center justify-center text-[#FC6E20] mb-4">
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif text-[#FFE7D0] tracking-wide mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#FFE7D0]/65 font-sans leading-relaxed mb-8">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative w-full h-[480vh] bg-[#1B1B1B] overflow-visible border-b border-[#FFE7D0]/5"
    >
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#FC6E20]/3 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-[#FFE7D0]/2 blur-[140px] pointer-events-none z-0"></div>

      {/* Sticky Viewport pinned by GSAP */}
      <div
        ref={viewportRef}
        className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 h-full flex flex-col md:flex-row items-center relative z-10 gap-12 md:gap-8">

          {/* LEFT SIDE: Interactive Stepper + Typewriter text details */}
          <div className="w-full md:w-[58%] flex items-center h-[40%] md:h-full gap-8 lg:gap-12">

            {/* INTERACTIVE PROGRESS SIDEBAR */}
            <div className="hidden md:flex flex-col items-center h-[320px] lg:h-[400px] w-6 relative py-4 select-none mr-2 shrink-0">
              <div className="relative w-full h-full">
                {/* Background Line (Track) */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#FFE7D0]/10 rounded-full" />

                {/* Active Progress Line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#FC6E20] to-[#FC6E20]/40 rounded-full transition-all duration-150 ease-out origin-top"
                  style={{ height: `${scrollProgress * 100}%` }}
                />

                {/* Stepper Dots */}
                {FEATURES.map((feature, idx) => {
                  const isActive = activeIndex === idx

                  return (
                    <div
                      key={idx}
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-20"
                      style={{ top: `${(idx / (FEATURES.length - 1)) * 100}%` }}
                    >
                      {/* Interactive Dot button */}
                      <button
                        onClick={() => handleFeatureClick(idx)}
                        className="group flex items-center justify-center w-6 h-6 rounded-full relative focus:outline-none cursor-pointer"
                        aria-label={`Go to ${feature.title}`}
                      >
                        {/* Tooltip Label (Fades in/out on hover or when active) */}
                        <div className="absolute right-8 flex items-center justify-end pointer-events-none">
                          <span
                            className={`whitespace-nowrap font-sans text-[11px] tracking-wider transition-all duration-300 px-3 py-1.5 rounded-lg border bg-[#1B1B1B]/95 shadow-xl backdrop-blur-md ${isActive
                              ? 'text-[#FC6E20] border-[#FC6E20]/20 font-semibold opacity-100 translate-x-0'
                              : 'text-[#FFE7D0]/40 border-transparent group-hover:text-[#FFE7D0] group-hover:border-[#FFE7D0]/10 opacity-0 group-hover:opacity-100 translate-x-2'
                              }`}
                          >
                            {feature.title}
                          </span>
                        </div>

                        {/* Outer pulsing ring for active item */}
                        {isActive ? (
                          <motion.div
                            layoutId="activeDotOuter"
                            className="absolute w-6 h-6 border border-[#FC6E20] rounded-full bg-[#1B1B1B] shadow-[0_0_12px_rgba(252,110,32,0.5)] flex items-center justify-center"
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          >
                            {/* Tiny glowing core dot */}
                            <div className="w-2 h-2 bg-[#FC6E20] rounded-full animate-pulse shadow-[0_0_6px_rgba(252,110,32,0.8)]" />
                          </motion.div>
                        ) : (
                          // Inactive dot
                          <div className="absolute w-2.5 h-2.5 bg-[#FFE7D0]/20 border border-[#FFE7D0]/10 rounded-full group-hover:bg-[#FC6E20]/60 group-hover:border-[#FC6E20]/30 group-hover:scale-125 transition-all duration-300" />
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* TEXT CONTAINER */}
            <div className="flex-1 min-w-0 pr-0 md:pr-4">
              <AnimatePresence mode="wait">
                <FeatureTextBlock
                  key={activeIndex}
                  feature={FEATURES[activeIndex]}
                  activeIndex={activeIndex}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: Fixed phone mockup */}
          <div className="w-full md:w-[42%] flex justify-center items-center h-[50%] md:h-full">
            <div className="relative">
              {/* Outer soft shadow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-[420px] bg-black/55 blur-3xl rounded-[60px] pointer-events-none -z-10"></div>

              <PhoneMockup
                image={FEATURES[activeIndex].image}
                alt={FEATURES[activeIndex].title}
                className="w-[190px] sm:w-[210px] md:w-[220px] lg:w-[235px] xl:w-[250px] border border-[#FFE7D0]/10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] transition-shadow duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
