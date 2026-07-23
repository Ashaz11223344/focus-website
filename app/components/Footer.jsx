"use client";

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B1B1B] py-12 border-t border-[#FFE7D0]/5 text-xs font-sans text-[#FFE7D0]/40 tracking-wider">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 select-none">
        <div className="text-center md:text-left space-y-1">
          <p>© {new Date().getFullYear()} Focus Motivation App. All rights reserved.</p>
          <p className="text-[10px] text-[#FFE7D0]/25">Handcrafted premium design for secure offline-first growth.</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-semibold uppercase text-[10px] tracking-widest text-[#FFE7D0]/50">
          <Link href="/about" className="hover:text-[#FC6E20] transition-colors duration-300">About Our Mission</Link>
          <span className="text-[#FFE7D0]/10">•</span>
          <Link href="/faq" className="hover:text-[#FC6E20] transition-colors duration-300">FAQ</Link>
          <span className="text-[#FFE7D0]/10">•</span>
          <Link href="/pricing" className="hover:text-[#FC6E20] transition-colors duration-300">Pricing</Link>
          <span className="text-[#FFE7D0]/10">•</span>
          <Link href="/documentation" className="hover:text-[#FC6E20] transition-colors duration-300">Documentation</Link>
          <span className="text-[#FFE7D0]/10">•</span>
          <Link href="/contact-support" className="hover:text-[#FC6E20] transition-colors duration-300">Contact Support</Link>
          <span className="text-[#FFE7D0]/10">•</span>
          <Link href="/aboutme" className="hover:text-[#FC6E20] transition-colors duration-300">Developer Profile</Link>
          <span className="text-[#FFE7D0]/10">•</span>
          <Link href="/privacy" className="hover:text-[#FC6E20] transition-colors duration-300">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

