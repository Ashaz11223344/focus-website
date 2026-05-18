"use client";

import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B1B1B] py-12 border-t border-[#FFE7D0]/5 text-center text-xs font-sans text-[#FFE7D0]/40 tracking-wider">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 select-none">
        <p>© {new Date().getFullYear()} Focus Motivation App. All rights reserved.</p>
        <p>Handcrafted premium design for secure offline-first growth.</p>
      </div>
    </footer>
  )
}
