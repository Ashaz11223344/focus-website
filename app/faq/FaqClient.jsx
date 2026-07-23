"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  BookOpen, 
  AlertCircle, 
  PiggyBank 
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const FAQ_ITEMS = [
  {
    question: "What is Focus App?",
    answer: "Focus App is a premium, 100% offline personal growth companion for Android. It combines a zero-telemetry daily mood tracker with a structured Stoic journal and beautifully typeset daily calligraphy quotes. It is built to help you cultivate mindfulness and consistency in complete privacy.",
    icon: Sparkles
  },
  {
    question: "Is Focus App free?",
    answer: "Focus App requires a small, one-time purchase of 20 Rupees (₹20) to support independent development. There are no monthly subscriptions, no ads, and no in-app purchases. All databases and features are fully self-contained on your device, meaning we have zero server cost dependencies.",
    icon: PiggyBank
  },
  {
    question: "Which is the best focus app?",
    answer: "If you value privacy, simplicity, and aesthetics, Focus App is the best choice. Unlike other productivity apps that require cloud sign-ins and upload your private thoughts to external servers, Focus operates 100% offline and keeps all your reflections sandboxed locally in a secure SQLite database.",
    icon: ShieldCheck
  },
  {
    question: "How to use Focus App?",
    answer: "Focus App fits seamlessly into your daily routine: First, log your mood once a day using our minimalist interface. Second, reflect on a Stoic journaling prompt to ground yourself. Third, read the daily calligraphy quote card to inspire your day. Finally, build long-term habits with offline streak badges.",
    icon: BookOpen
  },
  {
    question: "Can I use Focus App on iPhone or iOS?",
    answer: "No, Focus App is currently exclusive to Android. To ensure complete privacy, local-first performance, and secure sandboxing, the app is engineered specifically on top of Android's native SQLite Room database without utilizing any cloud sync APIs.",
    icon: Smartphone
  },
  {
    question: "Which is the best quotes app?",
    answer: "Focus App stands out as a premium quotes app by combining daily wisdom cards with interactive reflection. Instead of random quotes, it cycles through curated calligraphic cards of Stoic thinkers (Marcus Aurelius, Seneca, Epictetus) to help you build daily resilience.",
    icon: Sparkles
  },
  {
    question: "What is daily focus and how does the app help?",
    answer: "Daily focus is the practice of setting a single, mindful priority for your day. Focus App facilitates this by providing quiet daily journaling prompts that encourage you to reflect on what is within your control, with zero social media distraction.",
    icon: AlertCircle
  },
  {
    question: "Is Focus App worth it compared to other motivation apps?",
    answer: "Yes. Most free motivation apps monetize your mental health data and push intrusive notifications to capture your screen time. Focus App offers a completely clean, zero-telemetry environment. For a tiny one-time cost of ₹20, you get a lifetime of distraction-free mindfulness.",
    icon: ShieldCheck
  }
]

function FAQAccordionItem({ item, isOpen, onToggle }) {
  const Icon = item.icon
  return (
    <div className="border-b border-[#FFE7D0]/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-[#FC6E20]/10 border-[#FC6E20]/30 text-[#FC6E20]' : 'bg-[#FFE7D0]/5 border-[#FFE7D0]/10 text-[#FFE7D0]/60 group-hover:bg-[#FC6E20]/10 group-hover:border-[#FC6E20]/20 group-hover:text-[#FC6E20]'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-base md:text-lg font-serif tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#FC6E20]' : 'text-[#FFE7D0] group-hover:text-[#FC6E20]'}`}>
            {item.question}
          </span>
        </div>
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
            <div className="pb-6 pl-14 text-sm md:text-base text-[#FFE7D0]/65 font-sans leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Got Questions?
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Frequently Asked<br />Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed"
          >
            Everything you need to know about Focus App. Find direct answers regarding data privacy, pricing model, app functionality, and Stoic philosophy.
          </motion.p>
        </section>

        {/* FAQs Accordion Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="glass-panel px-6 md:px-10 py-4 rounded-3xl border border-[#FFE7D0]/5 shadow-xl">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQAccordionItem 
                key={idx}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative glass-panel rounded-3xl border border-[#FFE7D0]/10 p-8 md:p-12 overflow-hidden text-center max-w-4xl mx-auto select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FC6E20]/5 blur-3xl pointer-events-none" />

          <span className="text-[10px] tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
            Ready to Begin?
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0] mb-4">
            Reclaim your focus space
          </h2>
          <p className="text-xs md:text-sm text-[#FFE7D0]/60 max-w-lg mx-auto mb-8 font-sans leading-relaxed">
            Ready to experience a genuinely private daily routine? Download Focus from the Google Play Store and start today.
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.ashaz.focus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] transition-colors duration-300 shadow-md cursor-pointer"
          >
            <span>Download Focus</span>
            <ArrowRight className="w-4 h-4 text-[#1B1B1B]" />
          </a>
        </section>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
