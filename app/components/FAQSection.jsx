"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    question: "What is Focus App?",
    answer: "Focus App is an offline-first Android productivity and mental wellbeing application that combines daily mood tracking with structured Stoic journaling. It is designed to help users log their emotions, view beautiful calligraphic Stoic quotes, and build consistent habits in complete privacy."
  },
  {
    question: "Does Focus App work without internet?",
    answer: "Yes, Focus App is built to work 100% offline. It does not require any active internet connection, cellular data, or online sign-in. All databases, typography files, and features are fully self-contained on your device."
  },
  {
    question: "Is my data private with Focus App?",
    answer: "Absolutely. Your personal reflections, journal entries, and emotional logs are stored strictly inside a sandboxed local database on your Android device. Focus App collects zero telemetry, has no cloud servers, requires no user account, and does not share data with any third parties."
  },
  {
    question: "What is Stoic journaling?",
    answer: "Stoic journaling is a daily reflection practice based on Stoic philosophy, focusing on distinguishing between what you can control and what you cannot control. Focus App integrates this practice by presenting inspiring quotes and structured prompts to help you build emotional clarity and resilience."
  },
  {
    question: "How much does Focus App cost?",
    answer: "Focus App requires a small, one-time purchase of 20 Rupees (₹20). There are no monthly subscriptions, no ads, and no in-app purchases, providing a distraction-free, completely private environment for your mindfulness journey."
  },
  {
    question: "What Android versions does Focus App support?",
    answer: "Focus App is optimized for modern Android versions, supporting devices running Android 8.0 (Oreo) and above. It is designed to be lightweight, preserving both storage space and battery life."
  }
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#FFE7D0]/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
      >
        <span className={`text-base md:text-lg font-serif tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#FC6E20]' : 'text-[#FFE7D0] group-hover:text-[#FC6E20]'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="ml-4 text-[#FFE7D0]/40 group-hover:text-[#FC6E20] transition-colors duration-300 shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm md:text-base text-[#FFE7D0]/65 font-sans leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative w-full bg-[#1B1B1B] py-24 border-b border-[#FFE7D0]/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-[35vw] h-[35vw] rounded-full bg-[#FC6E20]/2 blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[12px] font-sans tracking-[0.2em] font-semibold text-[#FC6E20] uppercase flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#FC6E20]" />
            <span>Support &amp; FAQ</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] mt-3 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-4 text-base leading-relaxed">
            Have questions about Focus App? Here are short, direct answers regarding privacy, pricing, offline usage, and philosophy.
          </p>
        </div>

        {/* FAQ Accordion container */}
        <div className="glass-panel px-6 md:px-10 py-4 rounded-3xl">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
