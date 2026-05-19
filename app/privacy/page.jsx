"use client";

import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

export default function PrivacyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Smooth scroll helper
  const scrollToAnchor = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Page title and Last Updated */}
        <div className="border-b border-[#FFE7D0]/10 pb-8 mb-10 select-none">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-3 font-sans">
            Legal Sanctuary
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FFE7D0] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#FFE7D0]/40 font-sans mt-3">
            Last Updated: May 20, 2026
          </p>
        </div>

        {/* Dynamic Table of Contents (Anchor links) */}
        <nav className="mb-12 p-6 rounded-xl border border-[#FFE7D0]/10 bg-[#FFE7D0]/2 font-sans select-none">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FC6E20] mb-4">
            Table of Contents
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#FFE7D0]/70 font-medium">
            <li>
              <button onClick={() => scrollToAnchor('introduction')} className="hover:text-[#FC6E20] transition-colors text-left">
                1. Introduction
              </button>
            </li>
            <li>
              <button onClick={() => scrollToAnchor('data-collection')} className="hover:text-[#FC6E20] transition-colors text-left">
                2. What Data We Collect
              </button>
            </li>
            <li>
              <button onClick={() => scrollToAnchor('data-storage')} className="hover:text-[#FC6E20] transition-colors text-left">
                3. How Data is Stored
              </button>
            </li>
            <li>
              <button onClick={() => scrollToAnchor('third-party')} className="hover:text-[#FC6E20] transition-colors text-left">
                4. Third-Party Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToAnchor('notifications')} className="hover:text-[#FC6E20] transition-colors text-left">
                5. Notifications
              </button>
            </li>
            <li>
              <button onClick={() => scrollToAnchor('contact')} className="hover:text-[#FC6E20] transition-colors text-left">
                6. Contact Us
              </button>
            </li>
          </ul>
        </nav>

        {/* Prominent Callout Box */}
        <div className="mb-12 border-l-2 border-[#FC6E20] bg-[#FC6E20]/5 px-6 py-5 rounded-r-xl select-none">
          <p className="text-sm md:text-base font-serif font-bold text-[#FFE7D0] leading-relaxed">
            "Focus does not collect, transmit, or sell any personal data. Ever."
          </p>
        </div>

        {/* Legal Prose Content */}
        <div className="space-y-10 text-sm md:text-base text-[#FFE7D0]/80 leading-relaxed font-sans prose prose-invert max-w-none">
          
          {/* Section 1 */}
          <section id="introduction" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] border-b border-[#FFE7D0]/5 pb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to the Focus mobile application (the "Service"). Your privacy is not a feature we configure; it is the core foundation of why this app was built. We believe that tools should serve you, not track you.
            </p>
            <p>
              This Privacy Policy explains exactly how your data is handled. By using Focus, you agree to the practices outlined in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="data-collection" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] border-b border-[#FFE7D0]/5 pb-2">
              2. What Data We Collect
            </h2>
            <p>
              <strong>We collect nothing.</strong> Focus is built as an offline-first system. All details you enter into the application, including your mood logs, reflective journal notes, daily streaks, habits, explore hubs, and custom milestones, remain entirely local.
            </p>
            <p>
              There are no registration requirements to use the app, no mandatory email logins within the container, and no remote servers designed to track user IDs.
            </p>
          </section>

          {/* Section 3 */}
          <section id="data-storage" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] border-b border-[#FFE7D0]/5 pb-2">
              3. How Data is Stored
            </h2>
            <p>
              Any data generated during your focus sessions is saved on your physical device using a local sandboxed SQLite Room database. This storage is completely isolated from other applications running on your operating system and cannot be read by external packages.
            </p>
            <p>
              Since we do not run cloud backup nodes for your records, your entries stay safe inside your device. If you uninstall Focus or physically lose your device, your local data cannot be restored by us. We recommend making manual backups if needed.
            </p>
          </section>

          {/* Section 4 */}
          <section id="third-party" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] border-b border-[#FFE7D0]/5 pb-2">
              4. Third-Party Services
            </h2>
            <p>
              We do not integrate any external analytics platforms, ad networks, tracking scripts, or cloud-based hosting providers inside the mobile app. There are no cookies, no advertising SDKs, and no tracking pixels embedded within our container.
            </p>
          </section>

          {/* Section 5 */}
          <section id="notifications" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] border-b border-[#FFE7D0]/5 pb-2">
              5. Notifications
            </h2>
            <p>
              Focus uses your operating system's local triggers to display intelligent motivation prompts or daily streaks nudges. These notifications are scheduled locally on your device by the app's offline scheduler. We do not use third-party push notification networks or remote server pings.
            </p>
          </section>

          {/* Section 6 */}
          <section id="contact" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] border-b border-[#FFE7D0]/5 pb-2">
              6. Contact Us
            </h2>
            <p>
              If you have any questions or reflections regarding this Privacy Policy, please reach out to our team at:
            </p>
            <p className="font-semibold text-[#FC6E20] font-mono">
              <a href="mailto:support@getfocus.online" className="hover:underline">support@getfocus.online</a>
            </p>
            <p>
              We are committed to maintaining the highest ethical standard of software engineering and respect for human peace of mind.
            </p>
          </section>

        </div>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
