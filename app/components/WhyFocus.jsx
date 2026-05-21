"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, EyeOff, Zap, Moon } from 'lucide-react'

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: '100% Offline Sanctuary',
    description: 'Every thought, journal entry, and logged emotional state remains securely inside your sandboxed local database, acting as a private single log mood tracker.',
    color: '#FC6E20',
  },
  {
    icon: EyeOff,
    title: 'Zero Tracking & Profiling',
    description: 'No accounts to create, no social sign-ins, and zero cookies. We do not transmit a single byte of your writing or routines to third-party servers.',
    color: '#FFE7D0',
  },
  {
    icon: Zap,
    title: 'Instant Local Launch',
    description: 'Pre-bundled typography asset files and optimized SQLite indices deliver instant boot times and a fluid, zero-latency experience with zero buffering blocks.',
    color: '#FC6E20',
  },
  {
    icon: Moon,
    title: 'Silent Quiet Scheduler',
    description: 'Protect your peace. Set customizable quiet hours quotes reminder and sleep intervals to restrict daily notification popups, letting you work and think completely undisturbed.',
    color: '#FFE7D0',
  }
]

export default function WhyFocus() {
  return (
    <section id="why-focus" className="relative w-full bg-[#1B1B1B] py-24 md:py-32 border-b border-[#FFE7D0]/5">
      
      {/* Subtle background lighting */}
      <div className="absolute top-1/2 left-10 w-[35vw] h-[35vw] rounded-full bg-[#FC6E20]/3 blur-[120px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[12px] font-sans tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3">
            Why Focus
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight">
            An application that works solely in your interest
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-4 text-base md:text-lg leading-relaxed max-w-2xl">
            In a world of constant attention harvesting, Focus acts as an offline sanctuary. It asks nothing of you and saves everything local.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ADVANTAGES.map((adv, index) => {
            const Icon = adv.icon
            
            return (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-start relative group overflow-hidden transition-all duration-300"
              >
                
                {/* Decorative border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FC6E20]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

                {/* Floating Circle Icon */}
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-300 shadow-sm"
                  style={{
                    backgroundColor: 'rgba(50, 50, 50, 0.4)',
                    borderColor: 'rgba(255, 231, 208, 0.08)',
                    color: adv.color,
                  }}
                >
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif text-[#FFE7D0] mt-6 select-none">
                  {adv.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-[#FFE7D0]/65 font-sans mt-4 leading-relaxed">
                  {adv.description}
                </p>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
