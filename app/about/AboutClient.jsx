"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Heart, HeartHandshake, EyeOff, ShieldAlert } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

export default function AboutClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Intro Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-20 md:mb-32 select-none">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4"
          >
            The Focus Philosophy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Built for Peace,<br className="hidden sm:inline" /> Not for Profit.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed"
          >
            We believe that modern technology has lost its way. Focus is a quiet rebellion—a local-first companion app designed to bring you back to your physical self.
          </motion.p>
        </section>

        {/* Dynamic Core Manifesto Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 md:mb-36">
          {[
            {
              icon: EyeOff,
              title: "Absolute Privacy",
              desc: "Zero tracking. Zero telemetry. No email registration required. Your daily mood entries and reflective thoughts are sandboxed locally in SQLite Room storage."
            },
            {
              icon: ShieldAlert,
              title: "Local-First Core",
              desc: "By removing remote cloud servers entirely, we eliminate background payload drains, sync latencies, and third-party data vulnerability risks."
            },
            {
              icon: HeartHandshake,
              title: "Anti-Addiction by Design",
              desc: "No dark UX patterns, infinite scroll loops, or high-octane notifications. We schedule gentle offline nudges only when they are highly constructive."
            }
          ].map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl border border-[#FFE7D0]/5 hover:border-[#FC6E20]/25 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] mb-6 group-hover:bg-[#FC6E20] group-hover:text-[#1B1B1B] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#FFE7D0] mb-3">{card.title}</h3>
                  <p className="text-sm text-[#FFE7D0]/60 font-sans leading-relaxed">{card.desc}</p>
                </div>
                <div className="w-8 h-[1px] bg-[#FFE7D0]/10 mt-6 group-hover:w-16 group-hover:bg-[#FC6E20] transition-all duration-300" />
              </motion.div>
            )
          })}
        </section>

        {/* Detailed Story & Founder Profile */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 md:mb-36">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block font-sans">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFE7D0] leading-snug">
              Why We Built Focus
            </h2>
            <div className="space-y-4 text-[#FFE7D0]/70 font-sans text-sm md:text-base leading-relaxed">
              <p>
                In 2025, we took a step back and looked at the productivity apps on our smartphones. What we saw was deeply concerning: simple daily tools that required full cloud authentication, rather than functioning as a lightweight local-first mood tracker, connected to heavy telemetry trackers, and pushed notifications to compete for screen time.
              </p>
              <p>
                We wanted a companion that respected our silence. We wanted elegant calligraphy and book-grade typesetting that turned everyday reflection into a grounding, artistic experience.
              </p>
              <p>
                When we couldn't find it, we built it. Focus is structured using modern native system containers that sandboxes your personal space, keeping it strictly on your physical Android device.
              </p>
            </div>
          </div>
          
          {/* Founder Bio Card */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel-heavy border border-[#FFE7D0]/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#FC6E20]/5 blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6 select-none">
                <div className="w-14 h-14 rounded-full bg-[#FC6E20]/20 border border-[#FC6E20]/40 flex items-center justify-center font-serif text-[#FC6E20] text-xl font-bold">
                  AP
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-[#FFE7D0]">Ashaz Pathan</h4>
                  <p className="text-[10px] text-[#FC6E20] font-sans font-semibold tracking-wider uppercase">Founder & Architect</p>
                </div>
              </div>

              <blockquote className="text-xs md:text-sm text-[#FFE7D0]/80 italic leading-relaxed font-serif relative">
                "Our software choices represent our values. In an era where human attention is packaged and auctioned off, maintaining a 100% offline private space on our personal screens is a deliberate act of sanity."
              </blockquote>
              
              <div className="mt-6 pt-6 border-t border-[#FFE7D0]/5 flex items-center justify-between text-xs text-[#FFE7D0]/40 font-sans select-none">
                <span>📍 Pune, India</span>
                <span>✉️ ashaz@getfocus.online</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative glass-panel rounded-3xl border border-[#FFE7D0]/10 p-8 md:p-12 overflow-hidden text-center max-w-4xl mx-auto select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FC6E20]/5 blur-3xl pointer-events-none" />
          
          <span className="text-[10px] tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
            Ready to Begin?
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0] mb-4">
            Reclaim your focus space
          </h3>
          <p className="text-xs md:text-sm text-[#FFE7D0]/60 max-w-lg mx-auto mb-8 font-sans leading-relaxed">
            Ready to experience a genuinely private daily routine? Fill out our Sandbox application and try out the verified offline build.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] transition-colors duration-300 shadow-md cursor-pointer"
          >
            <span>Request Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
