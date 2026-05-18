"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PhoneMockup({ image, alt = 'Focus App Screen', className = '' }) {
  return (
    <div className={`relative mx-auto shrink-0 aspect-[9/19.5] rounded-[24px] md:rounded-[48px] p-0 md:p-[10px] bg-transparent md:bg-[#323232] border-0 md:border-[4px] md:border-[#FFE7D0]/20 shadow-none md:shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] ${className}`}>

      {/* Volume Buttons (Left Side) */}
      <div className="hidden md:block absolute top-28 -left-[6px] w-[3px] h-12 bg-[#FFE7D0]/20 rounded-l-md border-l border-t border-b border-[#FFE7D0]/40 z-10"></div>
      <div className="hidden md:block absolute top-44 -left-[6px] w-[3px] h-12 bg-[#FFE7D0]/20 rounded-l-md border-l border-t border-b border-[#FFE7D0]/40 z-10"></div>

      {/* Power Button (Right Side) */}
      <div className="hidden md:block absolute top-36 -right-[6px] w-[3px] h-16 bg-[#FFE7D0]/20 rounded-r-md border-r border-t border-b border-[#FFE7D0]/40 z-10"></div>

      {/* Screen Frame Container */}
      <div className="relative w-full h-full rounded-[24px] md:rounded-[38px] bg-[#1B1B1B] overflow-hidden border border-black/40 md:border-black z-20">

        {/* Screen Content Wrapper (Full Absolute Height) */}
        <div className="absolute inset-0 w-full h-full select-none z-10 bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={image}
              src={image}
              alt={alt}
              initial={{ opacity: 0.1, scale: 0.96, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0.1, scale: 0.96, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </AnimatePresence>

          {/* Premium Ambient Light Reflection Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] mix-blend-overlay z-15"></div>

          {/* Edge Glare Shadow */}
          <div className="absolute inset-0 pointer-events-none rounded-[24px] md:rounded-[36px] shadow-[inset_0_0_12px_rgba(0,0,0,0.6)] z-25"></div>
        </div>

        {/* Home Indicator Bar Overlay (Absolute, Transparent Background) */}
        <div className="hidden md:flex absolute bottom-0 inset-x-0 h-7 items-center justify-center z-30 select-none bg-gradient-to-t from-black/35 to-transparent">
          <div className="w-24 h-1 bg-[#FFE7D0]/30 rounded-full"></div>
        </div>

      </div>
    </div>
  )
}
