"use client";

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PhoneMockup from './PhoneMockup'

const CAROUSEL_SCREENS = [
  { image: '/screenshots/home-sceen.jpeg', label: 'Daily New Quotes', desc: 'Daily wisdom quotes' },
  { image: '/screenshots/favorites.jpeg', label: 'Favorites Vault', desc: 'Permanent offline bookmarks' },
  { image: '/screenshots/search.jpeg', label: 'Smart Search', desc: 'Instant quote and author filter' },
  { image: '/screenshots/mood-tracker.png', label: 'Mood Log', desc: 'Secure emotional tracking' },
  { image: '/screenshots/journal.jpeg', label: 'Personal Journal', desc: 'Reflective serif diary' },
  { image: '/screenshots/history.jpeg', label: 'Wisdom History', desc: 'Past quotes archives' },
  { image: '/screenshots/notification.jpeg', label: 'Quiet Control', desc: 'Sleep suppression & settings' },
  { image: '/screenshots/quote_widget.png', label: 'Quote Widget', desc: 'Add quotes to your home screen' },
  { image: '/screenshots/journal_widget.png', label: 'Journal Widget', desc: 'Add your thoughts on home screen' },
  { image: '/screenshots/mood_journey.png', label: 'Mood Journey', desc: 'Track your mood and emotions' },
  { image: '/screenshots/mood_card.png', label: 'Mood Card', desc: 'Share your mood with friends' },
  { image: '/screenshots/pin_code.png', label: 'Pin Code', desc: 'Secure your journal with pin code' }
]

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_SCREENS.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_SCREENS.length) % CAROUSEL_SCREENS.length)
  }

  // Auto sliding logic with hover pause
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext()
      }, 3500)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered])

  return (
    <section
      id="showcase"
      className="relative w-full bg-[#1B1B1B] py-24 border-b border-[#FFE7D0]/5 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Decorative Glow Elements */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[60vw] h-[200px] bg-[#FC6E20]/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Title Block */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-[12px] font-sans tracking-[0.2em] font-semibold text-[#FC6E20] uppercase">Screenshot Showcase</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] mt-3 leading-tight">
            A serene interface designed from scratch
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-4 text-base leading-relaxed">
            Take a complete look at Focus. Clean layout, book-grade Literata text hierarchy, and a quiet dark HSL palette.
          </p>
        </div>

        {/* 3D Centered Carousel Track */}
        <div className="relative w-full flex items-center justify-center min-h-[460px] md:min-h-[580px] px-4">

          {/* Centering phone container */}
          <div className="relative w-full max-w-[900px] flex items-center justify-center">

            <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-30 px-2 md:-px-10">

              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="pointer-events-auto w-12 h-12 rounded-full glass-panel text-[#FFE7D0] hover:text-[#FC6E20] hover:border-[#FC6E20]/40 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer group"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="pointer-events-auto w-12 h-12 rounded-full glass-panel text-[#FFE7D0] hover:text-[#FC6E20] hover:border-[#FC6E20]/40 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer group"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Slider track displaying centered and neighboring slides */}
            <div className="relative w-full flex justify-center items-center h-[420px] md:h-[540px]">
              {CAROUSEL_SCREENS.map((screen, idx) => {
                // Calculate cyclic index offsets
                let offset = idx - activeIndex

                // Keep offset in bound [-2, 2] for cyclical display
                const count = CAROUSEL_SCREENS.length
                if (offset < -count / 2) offset += count
                if (offset > count / 2) offset -= count

                const isCenter = offset === 0
                const isLeft = offset === -1
                const isRight = offset === 1
                const isVisible = Math.abs(offset) <= 2

                if (!isVisible) return null

                return (
                  <motion.div
                    key={screen.image}
                    onClick={() => setActiveIndex(idx)}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: isCenter ? 1 : isLeft || isRight ? (isMobile ? 0.35 : 0.45) : (isMobile ? 0 : 0.12),
                      scale: isCenter ? 1 : isLeft || isRight ? (isMobile ? 0.72 : 0.8) : (isMobile ? 0 : 0.65),
                      x: isMobile ? offset * 138 : offset * 240, // Space them horizontally
                      z: isCenter ? 10 : 0,
                      rotateY: isLeft ? (isMobile ? 12 : 15) : isRight ? (isMobile ? -12 : -15) : 0,
                      cursor: isCenter ? 'default' : 'pointer'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className="absolute w-[190px] md:w-[270px] origin-center select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                      zIndex: isCenter ? 30 : 10, // Ensure the active center card is painted in front
                    }}
                  >
                    <PhoneMockup
                      image={screen.image}
                      alt={screen.label}
                      className={`shadow-2xl border-[#FFE7D0]/5 transition-shadow duration-300 ${isCenter ? 'shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-[#FFE7D0]/20' : 'shadow-[0_10px_25px_rgba(0,0,0,0.5)]'}`}
                    />
                  </motion.div>
                )
              })}
            </div>

          </div>

        </div>

        {/* Carousel Text Details & Indicators */}
        <div className="text-center mt-6 z-10 max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-serif text-[#FC6E20] font-semibold tracking-wide">
                {CAROUSEL_SCREENS[activeIndex].label}
              </h3>
              <p className="text-xs text-[#FFE7D0]/60 font-sans mt-1">
                {CAROUSEL_SCREENS[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator Track */}
          <div className="flex gap-2 justify-center mt-6 select-none">
            {CAROUSEL_SCREENS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? 'w-8 bg-[#FC6E20]' : 'w-2.5 bg-zinc-700 hover:bg-zinc-600'}`}
                aria-label={`Go to screenshot ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
