"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Lock,
  Zap,
  Shield,
  Smartphone,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const FAQ_DATA = [
  {
    question: "How much does Focus cost?",
    answer: "Focus requires a simple one-time purchase of 20 Rupees (₹20). There are no monthly subscriptions, no ads, and we collect zero user data, giving you a completely private space."
  },
  {
    question: "Is it available on the Play Store?",
    answer: "Yes, Focus is officially available on the Google Play Store. You can download and install it directly by clicking the download link on this page."
  },
  {
    question: "Is my data stored anywhere?",
    answer: "No. Focus uses a 100% offline local SQLite database sandboxed inside your Android device. We have zero tracking servers, zero analytics scripts, and zero cloud backups. Your daily mood entries, badging, streaks, and journal logs never leave your physical device."
  },
  {
    question: "Which Android versions are supported?",
    answer: "Focus is optimized for modern Android architectures. We support Android 8.0 (Oreo) and above. The lightweight APK footprint ensures fluid performance even on budget or legacy devices, with zero background battery drainage."
  }
]

export default function DownloadClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  
  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#FFE7D0]/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-[#FC6E20]/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.3em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none"
          >
            Instant Distribution
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Your Digital Sanctuary<br />is Ready
          </motion.h1>
        </div>
      </section>

      {/* Main Process Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* 3-Step Visual Process Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Go to Play Store', desc: 'Click the download link to navigate to the official Google Play Store listing.' },
            { step: '2', title: 'Install Focus', desc: 'Download and install the application directly to your Android device.' },
            { step: '3', title: 'Start Stoic Routine', desc: 'Open Focus and start journaling and tracking your mood 100% offline.' }
          ].map((item, idx) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 relative flex flex-col items-center text-center group hover:border-[#FC6E20]/25 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] font-sans font-bold text-sm mb-4 group-hover:bg-[#FC6E20] group-hover:text-[#1B1B1B] transition-all duration-300">
                {item.step}
              </div>
              <h3 className="text-base font-serif font-semibold text-[#FFE7D0] mb-2">{item.title}</h3>
              <p className="text-xs text-[#FFE7D0]/60 font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Trust Badges, Install Guide, Accordion */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-between items-center gap-4 bg-[#FFE7D0]/3 border border-[#FFE7D0]/10 rounded-xl px-6 py-4 select-none"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFE7D0]/70 font-sans">
                <Lock className="w-3.5 h-3.5 text-[#FC6E20]" />
                <span>🔒 100% Private</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFE7D0]/70 font-sans">
                <Zap className="w-3.5 h-3.5 text-[#FC6E20]" />
                <span>⚡ Offline First</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFE7D0]/70 font-sans">
                <Shield className="w-3.5 h-3.5 text-[#FC6E20]" />
                <span>✦ Early Access Only</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFE7D0]/70 font-sans">
                <Smartphone className="w-3.5 h-3.5 text-[#FC6E20]" />
                <span>0% Trackers</span>
              </div>
            </motion.div>

            {/* Install Guide */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-[#FFE7D0]/5"
            >
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
                Post-Delivery Tutorial
              </span>
              <h2 className="text-xl font-serif font-bold text-[#FFE7D0] mb-6">Install Guide (After Receiving APK)</h2>
              
              <div className="space-y-6">
                {[
                  { step: 'Step 1', title: 'Open the APK file', desc: 'Tap the download notification or locate the APK inside your email client or "Downloads" folder.' },
                  { step: 'Step 2', title: 'Allow unknown sources if prompted', desc: 'Android may request file deployment permissions. Navigate to Settings and toggle "Allow installation from this source".' },
                  { step: 'Step 3', title: 'Install and open Focus', desc: 'Tap "Install" on the bottom confirmation prompt. Once installed, fire up Focus and begin your mindful daily routine.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="px-3 py-1 rounded bg-[#FFE7D0]/5 border border-[#FFE7D0]/10 text-[#FC6E20] font-sans font-bold text-[10px] uppercase tracking-wider mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-semibold text-[#FFE7D0]">{item.title}</h4>
                      <p className="text-xs text-[#FFE7D0]/50 font-sans mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contextual Related Links */}
              <div className="mt-8 pt-6 border-t border-[#FFE7D0]/10 flex flex-col sm:flex-row justify-between gap-4 text-xs font-sans text-[#FFE7D0]/50 select-none">
                <span>Need setup help? Read our <Link href="/documentation" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors">Documentation guide</Link>.</span>
                <span>Want to learn more? Explore all <Link href="/features" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors">App features</Link>.</span>
              </div>
            </motion.div>

            {/* FAQ Accordion Section */}
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
                Common Questions
              </span>
              <h2 className="text-xl font-serif font-bold text-[#FFE7D0] mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-3">
                {FAQ_DATA.map((faq, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div 
                      key={index} 
                      className="glass-panel border border-[#FFE7D0]/5 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => handleFaqToggle(index)}
                        className="w-full flex items-center justify-between px-6 py-4.5 text-left text-sm font-serif font-semibold text-[#FFE7D0] hover:text-[#FC6E20] transition-colors duration-300"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 text-inherit ${isOpen ? 'rotate-180 text-[#FC6E20]' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-5 text-xs text-[#FFE7D0]/60 font-sans leading-relaxed border-t border-[#FFE7D0]/5 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Download Card */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel-heavy border border-[#FFE7D0]/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden sticky top-28"
            >
              {/* Top gradient border */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FC6E20]/20 via-[#FC6E20] to-[#FC6E20]/20" />

              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFE7D0] tracking-wide">
                    Get Focus for Android
                  </h3>
                  <p className="text-[9px] text-[#FFE7D0]/40 font-sans tracking-widest uppercase mt-0.5">
                    Official Play Store Release
                  </p>
                </div>
              </div>

              <div className="space-y-6 py-4 flex flex-col items-center text-center">
                <p className="text-xs text-[#FFE7D0]/70 leading-relaxed font-sans max-w-xs">
                  Focus is now live on the Google Play Store. Download the app directly to start your stoic, offline-first personal growth journey.
                </p>

                <a
                  href="https://play.google.com/store/apps/details?id=com.ashaz.focus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_25px_rgba(252,110,32,0.55)] transition-all duration-300 text-sm shadow-xl cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#1B1B1B]" />
                  <span>Download on Google Play</span>
                </a>

                <div className="flex flex-col gap-2 w-full pt-4 border-t border-[#FFE7D0]/10 text-left">
                  <div className="text-[11px] text-[#FFE7D0]/50 font-sans flex items-center gap-2">
                    <span className="text-[#FC6E20]">✦</span> ₹20 One-Time & No Ads
                  </div>
                  <div className="text-[11px] text-[#FFE7D0]/50 font-sans flex items-center gap-2">
                    <span className="text-[#FC6E20]">✦</span> No Registration Required
                  </div>
                  <div className="text-[11px] text-[#FFE7D0]/50 font-sans flex items-center gap-2">
                    <span className="text-[#FC6E20]">✦</span> Completely Offline & Private
                  </div>
                </div>
              </div>
            </motion.div>
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
