"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Sparkles } from 'lucide-react'
import PhoneMockup from './PhoneMockup'

export default function HeroSection({ onOpenModal }) {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 border-b border-[#FFE7D0]/5 overflow-hidden">

      {/* Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-[#FC6E20]/5 blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-10 right-10 w-[30vw] h-[30vw] rounded-full bg-[#FFE7D0]/2 blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT: Text Blocks */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rgba(50, 50, 50, 0.4) glass-panel border border-[#FFE7D0]/10 text-xs font-sans tracking-wide text-[#FFE7D0]/80 mb-6 select-none"
            >
              <Shield className="w-3.5 h-3.5 text-[#FC6E20]" />
              <span>100% Private & Fully Offline</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-[#FFE7D0] leading-[1.1] tracking-tight"
            >
              Small steps.<br />
              <span className="text-[#FC6E20] glow-orange">Big change.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#FFE7D0]/70 font-sans text-base md:text-xl leading-relaxed mt-6 max-w-xl"
            >
              A high-fidelity no account self improvement app and growth companion. Reflect through beautiful calligraphy quotes, journal in complete privacy, and log daily emotions completely offline.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
            >
              {/* Request Access Button */}
              <button
                onClick={onOpenModal}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_25px_rgba(252,110,32,0.45)] transition-all duration-300 text-sm cursor-pointer select-none"
              >
                <Sparkles className="w-5 h-5 text-[#1B1B1B]" />
                <span>Request Early Access</span>
              </button>

              {/* Explore Button */}
              <a
                href="#features"
                className="flex items-center justify-center px-8 py-4 rounded-full glass-panel text-[#FFE7D0] border border-[#FFE7D0]/10 hover:border-[#FC6E20]/40 hover:text-[#FC6E20] font-sans font-bold tracking-wider uppercase transition-all duration-300 text-sm select-none"
              >
                <span>Explore Features</span>
              </a>
            </motion.div>

            {/* Bullet Features summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-12 md:mt-16 w-full border-t border-[#FFE7D0]/10 pt-8"
            >
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif text-[#FC6E20] font-bold">0%</span>
                <span className="text-xs text-[#FFE7D0]/50 mt-1 uppercase tracking-wider font-semibold">Trackers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif text-[#FC6E20] font-bold">Early access</span>
                <span className="text-xs text-[#FFE7D0]/50 mt-1 uppercase tracking-wider font-semibold">Get Early access</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif text-[#FC6E20] font-bold">100%</span>
                <span className="text-xs text-[#FFE7D0]/50 mt-1 uppercase tracking-wider font-semibold">Offline</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT: Floating Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">

            {/* Soft Ambient glowing backing circle */}
            <div className="absolute w-[280px] h-[480px] bg-[#FC6E20]/15 blur-[60px] rounded-[50px] -z-10 animate-pulse pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotateY: -2, rotateX: 3, scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative shrink-0 flex items-center justify-center"
            >
              <PhoneMockup
                image="/screenshots/home-sceen.jpeg"
                alt="Focus App Daily Quote Screen"
                className="w-[280px] md:w-[310px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-[#FFE7D0]/10"
              />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
