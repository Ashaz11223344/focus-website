"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Shield, HelpCircle, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const PRICING_FAQ = [
  {
    question: "Why is Focus App a paid app?",
    answer: "Focus App requires a small one-time purchase of 20 Rupees (₹20). This helps us cover ongoing development costs and keep the app independent of outside investors or ad-tech monetization."
  },
  {
    question: "How do you fund the app without ads or subscriptions?",
    answer: "Focus App is fully self-contained. Since the application operates completely offline (running locally on your device with zero server sync costs), our maintenance expenses are minimal. We fund development through this simple ₹20 one-time fee."
  },
  {
    question: "Will you sell my journaling data in the future?",
    answer: "Never. All your reflections, logs, and entries remain stored solely inside your Android device's secure SQLite database sandbox. We collect zero telemetry data, have no access to your logs, and do not track you."
  }
]

export default function PricingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Page Hero */}
        <section className="text-center max-w-3xl mx-auto mb-16 md:mb-24 select-none">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4"
          >
            Pricing & Value
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Premium Reflection,<br />Just 20 Rupees.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed"
          >
            We believe that mental wellness tools should be affordable, transparent, and completely free from commercial exploitation and data tracking.
          </motion.p>
        </section>

        {/* Pricing Card Details */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Free Plan Details Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel-heavy p-8 rounded-3xl border border-[#FC6E20]/30 shadow-xl flex flex-col justify-between"
            >
              <div>
                <span className="px-3 py-1 rounded bg-[#FC6E20]/15 text-[#FC6E20] font-mono text-[9px] uppercase tracking-wider font-bold">
                  One-Time Purchase
                </span>
                <h3 className="text-3xl font-serif font-black text-[#FFE7D0] mt-4 mb-2">Focus App</h3>
                <p className="text-xs text-[#FFE7D0]/50 font-sans mb-8">For personal growth and Stoic reflection.</p>
                
                <div className="flex items-baseline text-[#FFE7D0] mb-8">
                  <span className="text-5xl font-serif font-extrabold tracking-tight">₹20</span>
                  <span className="text-sm text-[#FFE7D0]/50 font-sans ml-2">/ one-time cost</span>
                </div>

                <ul className="space-y-4 border-t border-[#FFE7D0]/15 pt-6 text-xs sm:text-sm text-[#FFE7D0]/70 font-sans">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FC6E20] shrink-0" />
                    <span>Unlimited mood tracking entries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FC6E20] shrink-0" />
                    <span>Full Stoic journaling prompts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FC6E20] shrink-0" />
                    <span>500+ curated mindfulness quotes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FC6E20] shrink-0" />
                    <span>No advertisements or banners</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FC6E20] shrink-0" />
                    <span>100% Offline (SQLite secure sandbox)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 select-none">
                <a
                  href="https://play.google.com/store/apps/details?id=com.ashaz.focus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] transition-colors duration-300 shadow-md cursor-pointer"
                >
                  <span>Get Focus App</span>
                  <ArrowRight className="w-4 h-4 text-[#1B1B1B]" />
                </a>
              </div>
            </motion.div>

            {/* Why Pricing matters details card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel p-8 rounded-3xl border border-[#FFE7D0]/5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-bold text-[#FFE7D0] mb-4">Why a paid model?</h3>
                
                <div className="space-y-4 text-xs sm:text-sm text-[#FFE7D0]/70 font-sans leading-relaxed">
                  <p>
                    Most journaling apps store your private diary entries in cloud databases, requiring account logins and using tracking scripts to package your emotional data. 
                  </p>
                  <p>
                    We built Focus App to challenge this model. By prioritizing a local-first SQLite database container, we remove the burden of remote hosting, server architecture, and maintenance costs.
                  </p>
                  <p>
                    Our simple ₹20 one-time cost supports ongoing development and maintenance. With zero trackers, advertisements, or subscription traps, your reflections remain 100% yours.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#FFE7D0]/10 pt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFE7D0]/5 border border-[#FFE7D0]/10 flex items-center justify-center text-[#FC6E20]">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-[10px] text-[#FFE7D0]/40 font-sans leading-tight">
                  <span className="font-semibold block text-[#FFE7D0]/60 uppercase">Local-First Sandbox</span>
                  All calculations and entries reside on your personal device.
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block font-sans mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0]">Pricing FAQ</h2>
          </div>

          <div className="space-y-6">
            {PRICING_FAQ.map((faq, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5">
                <h4 className="text-base font-serif font-semibold text-[#FFE7D0] flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#FC6E20] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#FFE7D0]/60 font-sans mt-3.5 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
