"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CloudOff, 
  EyeOff, 
  Sparkles, 
  TrendingUp,
  Heart,
  User,
  ArrowRight
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#FFE7D0]/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-[#FC6E20]/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.3em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none"
          >
            Our Mission & Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Built With Intention.<br />Designed for Peace.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/70 font-sans mt-8 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Focus was built to solve a modern crisis: the monetization of human attention. We design lightweight, offline-first utilities to help you reclaim your daily routine, document your emotional journey, and focus on incremental self-improvement without screen addiction.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
            Our Core Beliefs
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#FFE7D0]">
            The Focus Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Privacy is non-negotiable",
              desc: "In an era of unchecked cloud trackers, local data is the ultimate luxury. Your daily reflections, mood fluctuations, and personal growth should belong to you—fully sandboxed on your device, never exposed to any server."
            },
            {
              title: "Growth is quiet, not loud",
              desc: "We reject the design of systems built to scream for your attention. Focus offers no aggressive push notifications, no noisy social feeds, and no algorithms designed to hook your dopamine cycle. Real growth occurs in silence."
            },
            {
              title: "Tools should serve you, not track you",
              desc: "A tool should do its job with grace and then disappear. We build clean, highly responsive, single-responsibility modules that help you execute, reflect, and then put your phone down to experience the offline world."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-[#FFE7D0]/5 hover:border-[#FC6E20]/25 transition-all duration-300 flex flex-col justify-between"
            >
              <h3 className="text-lg font-serif font-bold text-[#FFE7D0] mb-4 hover:text-[#FC6E20] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-[#FFE7D0]/60 font-sans leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* "Why We Built This" Story Section */}
      <section className="relative w-full py-20 border-t border-b border-[#FFE7D0]/5 bg-[#FFE7D0]/2 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-4 font-sans">
            A Word from the Creator
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#FFE7D0] mb-8">
            Why We Built This
          </h2>
          
          <div className="space-y-6 text-sm md:text-base text-[#FFE7D0]/70 font-sans leading-relaxed">
            <p>
              A few years ago, I looked at my daily phone usage statistics and realized a painful truth: I was spending hours scrolling through feeds, getting nudged by trackers, and consuming arbitrary micro-content, yet felt completely disconnected from my own goals and mental health. Every single productivity app I installed required cloud accounts, popped advertising screens, or attempted to harvest my network behavior.
            </p>
            <p>
              I realized that what I needed wasn't another complex project manager or a corporate dashboard. I needed a peaceful, offline-first sandbox to log my daily state, clear my thoughts, and stay consistent. A space where I didn't have to worry about my personal reflections being scanned by advertising models or leaked in cloud database breaches.
            </p>
            <p>
              So, I started building Focus. An app with zero trackers. An app that operates beautifully offline. An app that stands as a silent companion on your journey to consistency. It has changed the way I build habits, and I hope it offers a quiet sanctuary for your mind as well.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
            Core Values
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#FFE7D0]">
            Our Engineering Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: CloudOff,
              title: "Offline First",
              desc: "Operates completely independent of the network, protecting your attention and battery life."
            },
            {
              icon: EyeOff,
              title: "Zero Tracking",
              desc: "Absolutely no data leaves your device. We have no analytics APIs, server loops, or cookies."
            },
            {
              icon: Heart,
              title: "Mindful Design",
              desc: "Minimalist visual aesthetics, soft lighting, and gentle badging to promote calm engagement."
            },
            {
              icon: TrendingUp,
              title: "Continuous Growth",
              desc: "Engineered to promote simple daily habits that lead to powerful compounding long-term progress."
            }
          ].map((val, idx) => {
            const Icon = val.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 hover:border-[#FC6E20]/25 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif font-semibold text-[#FFE7D0] mb-2">{val.title}</h4>
                <p className="text-xs text-[#FFE7D0]/55 font-sans leading-relaxed">{val.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Creator Profile Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 relative z-10 border-t border-[#FFE7D0]/5">
        <div className="glass-panel rounded-2xl p-8 border border-[#FFE7D0]/10 flex flex-col sm:flex-row items-center gap-8 bg-[#1B1B1B]/40">
          <div className="w-20 h-20 rounded-full bg-[#FC6E20]/10 border-2 border-[#FC6E20]/30 flex items-center justify-center shrink-0 text-[#FC6E20]">
            <User className="w-10 h-10" />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#FC6E20] uppercase font-sans">
              Founder & Creator
            </span>
            <h3 className="text-xl font-serif font-bold text-[#FFE7D0]">
              Ashaz Pathan
            </h3>
            <p className="text-xs text-[#FFE7D0]/60 font-sans leading-relaxed max-w-xl">
              Ashaz is a mindful developer who designs highly polished, local-first sandbox applications focused on human peace, privacy, and quiet consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Request Access CTA */}
      <section className="relative w-full bg-[#1B1B1B] py-24 md:py-32 border-t border-[#FFE7D0]/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[#FC6E20]/4 blur-[130px] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <span className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none">
            Join the Sanctuary
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight select-none">
            Ready to reclaim your peace?
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed max-w-xl">
            Focus is currently open for early sandbox users. Apply below to request your invitation.
          </p>
          <div className="mt-10 flex flex-col items-center select-none">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-base font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_35px_rgba(252,110,32,0.55)] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-5.5 h-5.5 text-[#1B1B1B]" />
              <span>Request Early Access</span>
            </button>
            <span className="text-xs text-[#FFE7D0]/40 font-sans mt-4 block">
              ✦ Secure sandbox invitation &bull; 100% private sandbox SQL Client
            </span>
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
