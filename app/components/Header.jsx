"use client";

import React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function Header({ onOpenModal }) {
  return (
    <header className="fixed top-0 inset-x-0 h-20 glass-panel-heavy border-b border-[#FFE7D0]/5 z-50 flex items-center select-none">
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#FFE7D0]/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:border-[#FC6E20]/30 transition-all duration-300">
            <img src="/favicon.png" alt="Focus Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-serif font-bold text-[#FFE7D0] tracking-wide group-hover:text-[#FC6E20] transition-colors duration-300">
            Focus
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] tracking-widest font-semibold text-[#FFE7D0]/60 uppercase">
          <Link href="/features" className="hover:text-[#FC6E20] transition-colors duration-300">Features</Link>
          <Link href="/pricing" className="hover:text-[#FC6E20] transition-colors duration-300">Pricing</Link>
          <Link href="/documentation" className="hover:text-[#FC6E20] transition-colors duration-300">Docs</Link>
          <Link href="/blog" className="hover:text-[#FC6E20] transition-colors duration-300">Blog</Link>
          <Link href="/download" className="hover:text-[#FC6E20] transition-colors duration-300">Download</Link>
        </nav>

        {/* Download Focus CTA Button */}
        <a
          href="https://play.google.com/store/apps/details?id=com.ashaz.focus"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_20px_rgba(252,110,32,0.4)] transition-all duration-300 cursor-pointer select-none"
        >
          <Sparkles className="w-4 h-4 text-[#1B1B1B]" />
          <span>Download Focus</span>
        </a>

      </div>
    </header>
  )
}

