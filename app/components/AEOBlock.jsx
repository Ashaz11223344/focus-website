"use client";

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Eye, HelpCircle, CheckCircle } from 'lucide-react'

export default function AEOBlock() {
  return (
    <section id="faq-details" className="relative w-full bg-[#1B1B1B] py-24 border-b border-[#FFE7D0]/5">
      {/* Background glowing circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#FC6E20]/3 blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-[12px] font-sans tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block mb-3">
            In-Depth Insights
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight">
            Stoic Journaling &amp; Offline Architecture Details
          </h2>
          <p className="text-[#FFE7D0]/60 font-sans mt-4 text-base leading-relaxed">
            Understand how our sandbox technology keeps your reflective space completely private, and how Stoicism integrates with daily habit tracking.
          </p>
        </div>

        {/* Content Block Grid */}
        <div className="space-y-12 lg:space-y-16">
          
          {/* Question 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-[#FFE7D0] flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#FC6E20] shrink-0" />
              <span>Is Focus App really offline?</span>
            </h3>
            <p className="text-sm md:text-base text-[#FFE7D0]/75 font-sans mt-4 leading-relaxed max-w-4xl">
              Yes, Focus App operates 100% offline with zero cloud synchronization, trackers, or online account requirements. All your reflections, mood logs, and personal data remain stored solely in a secure, sandboxed database on your physical Android device.
            </p>
            <p className="text-sm md:text-base text-[#FFE7D0]/75 font-sans mt-3 leading-relaxed max-w-4xl">
              By designing the application with local-first database models, we ensure that your digital sanctuary is completely secure from telemetry harvests and server breaches. To learn more about our commitment to secure data localism, you can read our comprehensive <Link href="/privacy" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors duration-300">Focus Privacy Charter</Link>.
            </p>
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs md:text-sm text-[#FFE7D0]/65">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-[#FC6E20] shrink-0 mt-0.5" />
                <span><strong>No Cloud Sync:</strong> Data never leaves your physical hardware.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-[#FC6E20] shrink-0 mt-0.5" />
                <span><strong>SQLite Sandboxing:</strong> Uses Android's internal secure storage container.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-[#FC6E20] shrink-0 mt-0.5" />
                <span><strong>Zero Network Pings:</strong> Runs completely without internet permissions.</span>
              </li>
            </ul>
          </motion.div>

          {/* Question 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-[#FFE7D0] flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#FC6E20] shrink-0" />
              <span>How does the Stoic journal work?</span>
            </h3>
            <p className="text-sm md:text-base text-[#FFE7D0]/75 font-sans mt-4 leading-relaxed max-w-4xl">
              The Stoic journal combines daily mood tracking with structured prompts inspired by Stoic philosophy, helping you build emotional resilience. It provides a distraction-free, book-aesthetic interface to record your thoughts and reflect on daily quotes.
            </p>
            <p className="text-sm md:text-base text-[#FFE7D0]/75 font-sans mt-3 leading-relaxed max-w-4xl">
              Through daily journaling, users learn to divide thoughts into what they can control (actions, values, reactions) and what they cannot (external events, others' opinions). This practice is backed by scientific research; studies show that expressive writing and journaling significantly improves mental well-being and reduces stress levels (read the full report at the <a href="https://www.cambridge.org/core/journals/advances-in-psychiatric-treatment/article/emotional-and-physical-health-benefits-of-expressive-writing/ED29A57C7F319AA4097B670114F23B7C" target="_blank" rel="noopener noreferrer" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors duration-300">Cambridge University Press study</a>).
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-6 justify-between items-start border-t border-[#FFE7D0]/10 pt-6">
              <div className="space-y-3 max-w-md">
                <h4 className="text-sm font-sans font-bold text-[#FC6E20]">Core Daily Flow</h4>
                <ol className="list-decimal list-inside text-xs md:text-sm text-[#FFE7D0]/65 space-y-2">
                  <li><strong>Select Daily Emotions:</strong> Log your mood state on our quick-entry calendar interface.</li>
                  <li><strong>Read Calligraphy Quotes:</strong> Contemplate curated, beautifully rendered Stoic thoughts.</li>
                  <li><strong>Freeform Journaling:</strong> Reflect using the premium book-grade typography system.</li>
                </ol>
              </div>
              <div className="text-xs md:text-sm text-[#FFE7D0]/50 max-w-sm">
                ✦ Focus App combines all these reflection practices into a silent client that issues no push alerts or nagging streak emails, respecting your digital boundary. Review our <Link href="/features" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors duration-300">detailed offline features</Link> to see them in action.
              </div>
            </div>
          </motion.div>

          {/* Question 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-[#FFE7D0] flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-[#FC6E20] shrink-0" />
              <span>How does Focus App compare to typical trackers?</span>
            </h3>
            <p className="text-sm md:text-base text-[#FFE7D0]/75 font-sans mt-4 leading-relaxed max-w-4xl">
              Most modern mood trackers and journaling apps store your data in the cloud, require sign-in accounts, and monetize through advertisements. Focus App provides a completely self-contained, ad-free alternative.
            </p>
            
            {/* Comparison Table */}
            <div className="mt-8 overflow-x-auto border border-[#FFE7D0]/10 rounded-2xl">
              <table className="w-full text-left border-collapse font-sans text-sm">
                <thead>
                  <tr className="bg-[#FFE7D0]/5 border-b border-[#FFE7D0]/10">
                    <th className="p-4 md:p-5 font-semibold text-[#FFE7D0]">Feature</th>
                    <th className="p-4 md:p-5 font-semibold text-[#FC6E20]">Focus App</th>
                    <th className="p-4 md:p-5 font-semibold text-[#FFE7D0]/60">Typical Trackers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFE7D0]/5">
                  <tr>
                    <td className="p-4 md:p-5 font-medium text-[#FFE7D0]">Cloud Synchronization</td>
                    <td className="p-4 md:p-5 text-[#FC6E20] font-semibold">100% Offline (Local Only)</td>
                    <td className="p-4 md:p-5 text-[#FFE7D0]/60">Required (Server Stored)</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-medium text-[#FFE7D0]">User Accounts</td>
                    <td className="p-4 md:p-5 text-[#FC6E20] font-semibold">No Registration / Account</td>
                    <td className="p-4 md:p-5 text-[#FFE7D0]/60">Email / Social Login Required</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-medium text-[#FFE7D0]">Advertising &amp; Analytics</td>
                    <td className="p-4 md:p-5 text-[#FC6E20] font-semibold">100% Ad-free, Zero Trackers</td>
                    <td className="p-4 md:p-5 text-[#FFE7D0]/60">Often Ad-supported / Tracked</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-medium text-[#FFE7D0]">Data Control</td>
                    <td className="p-4 md:p-5 text-[#FC6E20] font-semibold">You own it (Stored in Sandbox)</td>
                    <td className="p-4 md:p-5 text-[#FFE7D0]/60">Company Server Controlled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
