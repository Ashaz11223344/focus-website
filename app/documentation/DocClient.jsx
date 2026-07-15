"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Smile, FileText, Shield, Moon, Play } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const DOC_SECTIONS = [
  {
    id: 'getting-started',
    icon: Play,
    title: 'Getting Started Guide',
    content: (
      <div className="space-y-4">
        <p>
          Welcome to Focus App. Focus is an Android productivity and mental wellbeing application that combines Stoic journaling with daily mood tracking. Because Focus runs 100% offline, getting started is simple:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Download:</strong> Get the app on the Google Play Store or download the official APK.</li>
          <li><strong>First Launch:</strong> Open the app. There are no registration forms, logins, or social authentications. You are immediately placed into your private workspace.</li>
          <li><strong>Main Dashboard:</strong> The home screen displays your daily calligraphy quote and quick access buttons for journaling, mood tracking, and your favorites vault.</li>
        </ol>
      </div>
    )
  },
  {
    id: 'mood-tracking',
    icon: Smile,
    title: 'How to Mood Track',
    content: (
      <div className="space-y-4">
        <p>
          Tracking your emotions daily helps build self-awareness and mindful consistency. Focus uses a clean, single-log mood calendar tracker:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Select Emoji/Mood:</strong> Click on the mood tracker button and select your current emotional state (e.g. Joy, Serenity, Anxiety, Melancholy, Focus).</li>
          <li><strong>Daily Single-Log:</strong> Focus allows one primary mood log per day. If you choose to log again, it will overwrite the previous entry. This prevents analytics skew and maintains clear historical trends.</li>
          <li><strong>Viewing History:</strong> Your past logs are presented inside a local calendar grid. Different colors represent different emotional metrics.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'stoic-journaling',
    icon: BookOpen,
    title: 'Stoic Journaling & Quotes',
    content: (
      <div className="space-y-4">
        <p>
          Stoic journaling is the practice of dividing your thoughts into what is within your control and what is not:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Read Calligraphy Quotes:</strong> Contemplate the daily Stoic quote rendered in elegant book-grade typography. Tap the quote to cycle/refresh to a new one from your offline vault of 500+ quotes.</li>
          <li><strong>Reflective Journal:</strong> Open the journal tab. The layout uses premium Literata serif font styling. Focus provides guided reflection prompts or a clean free-form writing container.</li>
          <li><strong>Favorites Vault:</strong> When you read a quote or complete a journal entry that resonates deeply, click the heart icon. This saves the entry locally to your favorites vault for instant retrieval.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'offline-architecture',
    icon: Shield,
    title: 'Offline Architecture & Security',
    content: (
      <div className="space-y-4">
        <p>
          Your reflections represent your innermost self. We secure them through physical isolation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Local SQLite Database:</strong> All mood entries, journal logs, and favorites are written to a sandboxed local database file (Room SQLite database container) inside your Android device's secure storage.</li>
          <li><strong>Zero Cloud Sync:</strong> We have no databases, authentication servers, or external sync APIs. Your data never leaves your physical phone.</li>
          <li><strong>Zero Telemetry:</strong> Focus does not ping background trackers or log usage behavior. It requires zero network permissions, making it safe from breaches.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'quiet-scheduler',
    icon: Moon,
    title: 'Quiet Scheduler & Widgets',
    content: (
      <div className="space-y-4">
        <p>
          Minimize distractions and keep your reflection moments consistent:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Quiet Hours:</strong> Navigate to Settings and configure Quiet Hours. This disables daily widget and quote notification alerts during your sleeping intervals, ensuring zero background disturbance.</li>
          <li><strong>Home Screen Widgets:</strong> Focus includes premium widgets for daily quotes and mood trackers. Long press your home screen, select Focus App, and drag the widget to your dashboard.</li>
          <li><strong>Custom Timing:</strong> Set specific times (e.g. 8:00 AM, 9:00 PM) to receive notifications. The scheduler runs locally via Android WorkManager, using zero internet connection.</li>
        </ul>
      </div>
    )
  }
]

export default function DocClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('getting-started')

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Header component */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Page Hero */}
        <section className="text-center max-w-3xl mx-auto mb-16 md:mb-20 select-none">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4"
          >
            User Codex
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Focus Documentation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-4 text-sm md:text-base leading-relaxed"
          >
            Guides and detailed references on installation, Stoic journaling, local SQLite security, and quiet scheduler configuration.
          </motion.p>
        </section>

        {/* Tabbed Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Tabs */}
          <div className="lg:col-span-4 space-y-2 select-none">
            {DOC_SECTIONS.map((sec) => {
              const Icon = sec.icon
              const isActive = activeTab === sec.id
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isActive 
                      ? 'bg-[#FC6E20]/15 border-[#FC6E20]/30 text-[#FC6E20] font-bold shadow-md' 
                      : 'glass-panel border-transparent text-[#FFE7D0]/60 hover:text-[#FC6E20] hover:border-[#FFE7D0]/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#FC6E20]' : 'text-inherit'}`} />
                  <span className="text-sm font-sans tracking-wide">{sec.title}</span>
                </button>
              )
            })}
          </div>

          {/* Right Column: Content Viewer */}
          <div className="lg:col-span-8">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-panel-heavy p-8 rounded-3xl border border-[#FFE7D0]/10 shadow-xl min-h-[400px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFE7D0] mb-6 flex items-center gap-3">
                  {React.createElement(DOC_SECTIONS.find(s => s.id === activeTab).icon, { className: 'w-7 h-7 text-[#FC6E20]' })}
                  <span>{DOC_SECTIONS.find(s => s.id === activeTab).title}</span>
                </h2>
                <div className="text-sm sm:text-base text-[#FFE7D0]/80 font-sans leading-relaxed space-y-4">
                  {DOC_SECTIONS.find(s => s.id === activeTab).content}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#FFE7D0]/5 text-xs text-[#FFE7D0]/40 font-mono flex items-center justify-between">
                <span>Codex Ref: {activeTab.toUpperCase()}</span>
                <span>Security Level: Sandboxed Local Client</span>
              </div>
            </motion.div>
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
