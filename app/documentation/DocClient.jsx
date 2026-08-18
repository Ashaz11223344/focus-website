"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Smile, 
  Shield, 
  Moon, 
  Play, 
  Lock, 
  Activity, 
  Palette, 
  Layers,
  Sparkles 
} from 'lucide-react'
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
          Welcome to Focus App. Focus is an Android productivity and mental wellbeing application that combines Stoic journaling, Focus Guard deep work protection, and daily mood tracking. Because Focus runs 100% offline, getting started is completely friction-free:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Download:</strong> Get the app on the Google Play Store.</li>
          <li><strong>First Launch:</strong> Open the app. There are no registration forms, logins, email submissions, or social authentications. You are immediately placed into your private offline workspace.</li>
          <li><strong>Main Dashboard:</strong> The home screen displays your daily calligraphy quote and quick access buttons for Explore, Favorites, History, Search, Mood Tracking, Reflective Journal, and Focus Guard.</li>
        </ol>
      </div>
    )
  },
  {
    id: 'focus-guard',
    icon: Shield,
    title: 'Focus Guard & App Blocker',
    content: (
      <div className="space-y-4">
        <p>
          Focus Guard is an on-device digital boundary engine designed to protect your deep work and mental tranquility:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Notification Silencer (DND):</strong> Program quiet time windows that automatically engage Android's Do Not Disturb mode, suppressing ringers, vibration, and incoming disruption during deep focus blocks.</li>
          <li><strong>App Blocker Service:</strong> Select distracting social media or game apps and configure blocking schedules (e.g. 09:00 - 17:00 on weekdays). A persistent background service (<code className="text-[#FC6E20]">AppBlockerService</code>) monitors the active foreground task using <code className="text-[#FC6E20]">UsageStatsManager</code> every 500ms.</li>
          <li><strong>Pulsing Shield Overlay:</strong> If an intercepted app is launched during a blocked block, <code className="text-[#FC6E20]">BlockOverlayActivity</code> intercepts it, displaying an aesthetic pulsing shield, a Stoic quote, a direct "Go Back to Focus" trigger, and a temporary 5-minute override timer if strictly necessary.</li>
          <li><strong>Status-Aware Home Card:</strong> View real-time protection status directly from the home screen shortcut card.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'zen-journal',
    icon: Lock,
    title: 'Zen Journal & PIN Protection',
    content: (
      <div className="space-y-4">
        <p>
          Your most intimate thoughts deserve military-grade privacy. Focus separates journaling into Public and PIN-secured Zen entries:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>SHA-256 PIN Hashing:</strong> Set up a custom numeric PIN. Focus validates your credentials using one-way SHA-256 cryptographic hashing without ever storing plain text passwords to disk.</li>
          <li><strong>Encrypted Backup Passwords:</strong> Create a separate backup recovery password to safeguard export and restore operations.</li>
          <li><strong>Window Masking (FLAG_SECURE):</strong> When entering the Zen Journal, Focus enables <code className="text-[#FC6E20]">WindowManager.LayoutParams.FLAG_SECURE</code> at the Android OS level, blocking screen capture/recordings and blacking out recent app switcher previews.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'mindfulness-analytics',
    icon: Activity,
    title: 'Mindfulness Analytics & Reports',
    content: (
      <div className="space-y-4">
        <p>
          Gain clarity into your emotional wellbeing and mental trends over the weeks:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Bezier Mood Curve:</strong> A custom Canvas-drawn weekly Bezier curve graphs daily mood progression accompanied by emoji node indicators. If you write a journal entry on a day without logging a mood, a smart neutral score (<code className="text-[#FC6E20]">3.0f / 😐</code>) maintains an unbroken, continuous visual curve.</li>
          <li><strong>Public Journal Word Cloud:</strong> Visualizes the most prominent themes and recurring vocabulary from your public reflections, while rigorously excluding private Zen entries.</li>
          <li><strong>Visual Export & Sharing:</strong> Generate a high-resolution bitmap screenshot of your weekly summary card with one tap and share it to your favorite messaging or social channels.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'wallpaper-generator',
    icon: Palette,
    title: 'Dynamic Wallpaper Generator',
    content: (
      <div className="space-y-4">
        <p>
          Transform inspiring Stoic thoughts into minimalist, book-aesthetic device wallpapers:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Quick Wallpaper on Hold:</strong> Long-press any quote card across the app to instantly open the wallpaper designer suite.</li>
          <li><strong>Curated HSL Color Themes:</strong> Choose between deep Noir palettes, warm parchment beige, and subtle ambient gradients.</li>
          <li><strong>Film Grain Texture:</strong> Enhance visual depth with an analog film-grain slider adjustable from 0% to 8% opacity.</li>
          <li><strong>Instant OS Deployment:</strong> Set the generated composition directly as your Home Screen, Lock Screen, or both wallpapers with one click, or export the raw image to your device photo gallery.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'mood-tracking',
    icon: Smile,
    title: 'Daily Mood Tracking (Single-Log)',
    content: (
      <div className="space-y-4">
        <p>
          Tracking your emotions daily helps build self-awareness and mindful consistency. Focus uses a truthful single-log calendar:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Select Emoji/Mood:</strong> Click on the mood tracker button and select your current emotional state (Happy, Inspired, Neutral, Low, Calm).</li>
          <li><strong>Enforced Single-Log:</strong> Focus allows one primary mood entry per day. If you choose to log again, it intelligently overwrites the previous entry, preventing data skew and keeping monthly averages pristine.</li>
          <li><strong>Weekly Focus Wrapped:</strong> Access condensed summaries of emotional milestones and consistency highlights directly from the tracker header.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'stoic-journaling',
    icon: BookOpen,
    title: 'Stoic Journaling & Multi-Select',
    content: (
      <div className="space-y-4">
        <p>
          Stoic journaling is the practice of dividing your thoughts into what is within your control and what is not:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Calligraphy Daily Wisdom:</strong> Contemplate curated Stoic quotes rendered in handcrafted Playwrite calligraphy font. Tap the quote to cycle/refresh to a new one from your offline vault of 500+ quotes.</li>
          <li><strong>Double-Tap Multi-Select:</strong> Double-tap any quote item on Home, Favorites, History, Search, or Explore to activate batch mode. Selected cards smoothly contract (<code className="text-[#FC6E20]">0.97f scale</code>) with an orange overlay, enabling batch favoriting, sharing, copying, or deletion.</li>
          <li><strong>Book-Grade Typography:</strong> Open the journal tab. The layout uses premium Literata serif font styling with guided prompts or clean free-form writing.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'offline-architecture',
    icon: Shield,
    title: 'Offline Architecture & Physical Isolation',
    content: (
      <div className="space-y-4">
        <p>
          Your reflections represent your innermost self. We secure them through physical isolation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Local SQLite Database:</strong> All mood entries, journal logs, and favorites are written to a sandboxed local database file (Room SQLite database container) inside your Android device's secure internal storage.</li>
          <li><strong>Zero Cloud Sync:</strong> We have no databases, analytics clusters, or external sync APIs. Your data never leaves your physical phone.</li>
          <li><strong>Zero Telemetry:</strong> Focus does not ping background analytics or track user behavior. It requires zero network permissions, making it completely immune to server-side breaches.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'quiet-scheduler',
    icon: Moon,
    title: 'Quiet Scheduler & Notifications',
    content: (
      <div className="space-y-4">
        <p>
          Minimize distractions and keep your reflection moments consistent:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#FFE7D0]/70 pl-2">
          <li><strong>Quiet Hours:</strong> Navigate to Settings and configure Quiet Hours. This suppresses status bar alerts during your sleeping intervals, ensuring zero background disturbance.</li>
          <li><strong>Monochrome Outline Icons:</strong> Features a standard-compliant monochrome quote mark outline (<code className="text-[#FC6E20]">R.drawable.ic_quote_mark</code>) eliminating Android status bar white box glitches.</li>
          <li><strong>Custom Timing:</strong> Set specific times to receive notifications. The scheduler runs locally via Android WorkManager with zero internet requirements.</li>
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
            User Codex &amp; Architecture
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Documentation &amp;<br />User Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed"
          >
            Everything you need to know about setting up Focus Guard, configuring SHA-256 PIN security, mastering Stoic journaling, and tracking mindful consistency offline.
          </motion.p>
        </section>

        {/* Documentation Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-4 glass-panel rounded-2xl p-4 border border-[#FFE7D0]/5 sticky top-28">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block px-3 py-2 select-none">
              Topics
            </span>
            <nav className="flex flex-col gap-1 mt-2">
              {DOC_SECTIONS.map((sec) => {
                const Icon = sec.icon
                const isActive = activeTab === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTab(sec.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-sans font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FC6E20] text-[#1B1B1B] font-bold shadow-[0_0_15px_rgba(252,110,32,0.2)]'
                        : 'text-[#FFE7D0]/60 hover:text-[#FC6E20] hover:bg-[#FFE7D0]/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1B1B1B]' : 'text-inherit'}`} />
                    <span>{sec.title}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Active Documentation Article Content */}
          <article className="lg:col-span-8 glass-panel-heavy p-8 md:p-12 rounded-3xl border border-[#FFE7D0]/10 min-h-[500px]">
            {DOC_SECTIONS.map((sec) => {
              if (sec.id !== activeTab) return null
              const Icon = sec.icon
              return (
                <motion.div
                  key={sec.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 border-b border-[#FFE7D0]/10 pb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FC6E20]/15 border border-[#FC6E20]/30 flex items-center justify-center text-[#FC6E20]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block">
                        Focus Codex
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FFE7D0]">
                        {sec.title}
                      </h2>
                    </div>
                  </div>

                  <div className="font-sans text-sm md:text-base leading-relaxed text-[#FFE7D0]/80">
                    {sec.content}
                  </div>
                </motion.div>
              )
            })}
          </article>

        </div>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
