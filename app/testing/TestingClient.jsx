"use client";

import React, { useState, useEffect } from 'react'
import { 
  Lock, 
  Unlock, 
  AlertTriangle, 
  Copy, 
  Check, 
  Info,
  ChevronRight,
  Flame,
  Bell,
  Smartphone,
  Quote,
  Bug,
  Layout,
  HelpCircle
} from 'lucide-react'
import Header from '../components/Header'
import RequestAccessModal from '../components/RequestAccessModal'

export default function TestingClient() {
  const [passcode, setPasscode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Checklist state
  const totalTasks = 5
  const [completedTasks, setCompletedTasks] = useState({})
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  // Check sessionStorage for passcode verification session
  useEffect(() => {
    const verified = sessionStorage.getItem('focus_testing_verified')
    if (verified === 'true') {
      setIsUnlocked(true)
    }

    // Load progress from localStorage
    try {
      const stored = localStorage.getItem('focus_tester_progress')
      if (stored) {
        setCompletedTasks(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Could not load progress from localStorage', e)
    }
  }, [])

  // Passcode verification handler
  const handleVerify = (e) => {
    e.preventDefault()
    if (passcode === 'Focus786') {
      setIsUnlocked(true)
      setErrorMsg('')
      sessionStorage.setItem('focus_testing_verified', 'true')
    } else {
      setErrorMsg('Incorrect passcode. Please try again.')
    }
  }

  // Toggling a task item
  const toggleTask = (taskId) => {
    const updated = { ...completedTasks }
    if (updated[taskId]) {
      delete updated[taskId]
    } else {
      updated[taskId] = true
    }
    setCompletedTasks(updated)
    try {
      localStorage.setItem('focus_tester_progress', JSON.stringify(updated))
    } catch (e) {
      console.error('Could not save progress to localStorage', e)
    }
  }

  // Calculations for progress indicator
  const completedCount = Object.keys(completedTasks).length
  const percent = Math.round((completedCount / totalTasks) * 100)
  
  const radius = 14
  const circumference = 2 * Math.PI * radius // ~87.96
  const strokeDashoffset = circumference - (percent / 100) * circumference

  // Copying Feedback Format Template to clipboard
  const copyTemplate = () => {
    const templateText = `Device: \nAndroid Version: \nIssue: \nSteps to Reproduce: \nScreenshot (if possible):`
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(templateText).then(() => {
        triggerToast('Feedback template copied to clipboard!')
      }).catch(err => {
        fallbackCopy(templateText)
      })
    } else {
      fallbackCopy(templateText)
    }
  }

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      triggerToast('Feedback template copied to clipboard!')
    } catch (e) {
      console.error('Failed to copy text', e)
      triggerToast('Failed to copy. Please select and copy manually.')
    }
    document.body.removeChild(textarea)
  }

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 2500)
  }

  // Passcode Gate Interface
  if (!isUnlocked) {
    return (
      <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] flex flex-col justify-center items-center px-4 font-sans select-none antialiased">
        {/* Soft background glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[25%] w-[25rem] h-[25rem] rounded-full bg-[#FC6E20]/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[25%] w-[30rem] h-[30rem] rounded-full bg-[#FFE7D0]/3 blur-[140px]" />
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex flex-col items-center gap-3 mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#FFE7D0]/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <img src="/favicon.png" alt="Focus Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-wide text-[#FFE7D0]">Focus</h1>
            <p className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase">
              Beta Testing Portal
            </p>
          </div>
        </div>

        {/* Lock Card Container */}
        <div className="relative z-10 w-full max-w-sm glass-panel p-8 rounded-2xl border border-[#FFE7D0]/10 shadow-2xl flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] mb-6">
            <Lock className="w-5 h-5" />
          </div>

          <h2 className="text-lg font-serif font-bold text-[#FFE7D0] mb-2 text-center">
            Enter Access Code
          </h2>
          <p className="text-xs text-[#FFE7D0]/50 text-center mb-6 leading-relaxed">
            Please enter your official beta testing access code to view the guidelines and checklist.
          </p>

          <form onSubmit={handleVerify} className="w-full space-y-4">
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-[#1b1b1b]/80 border border-[#FFE7D0]/10 rounded-xl py-3.5 px-4 text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/30 focus:outline-none focus:border-[#FC6E20] transition-colors font-mono tracking-widest text-center"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 text-center font-medium mt-2">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_20px_rgba(252,110,32,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Guide</span>
            </button>
          </form>
        </div>

        {/* Tiny footer */}
        <div className="relative z-10 text-[9px] font-mono text-[#FFE7D0]/20 tracking-wider mt-8">
          SECURE CONNECTION • BETA PROGRAM
        </div>
      </div>
    )
  }

  // Beta Tester Guide Interface
  return (
    <div className="relative w-full bg-[#1B1B1B] text-[#FFE7D0] antialiased min-h-screen flex flex-col font-sans select-none">
      
      {/* Fixed UI Header */}
      <Header onOpenModal={() => setIsModalOpen(true)} />
      
      {/* Ambient background glow decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[40rem] h-[25rem] rounded-full bg-[#FC6E20]/4 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[25rem] h-[25rem] rounded-full bg-[#FFE7D0]/2 blur-[100px]" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 px-4 pt-28 pb-16 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        
        {/* HEADER CARD */}
        <header className="glass-panel p-8 rounded-2xl border border-[#FFE7D0]/5 shadow-lg flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#FFE7D0]/10 shadow-[0_8px_24px_rgba(252,110,32,0.15)] flex items-center justify-center">
            <img src="/favicon.png" alt="Focus Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-extrabold tracking-wide text-[#FFE7D0] mb-1">
              Focus
            </h1>
            <p className="text-xs font-sans tracking-[0.15em] font-semibold text-[#FC6E20] uppercase">
              Beta Tester Program
            </p>
          </div>
        </header>

        {/* IMPORTANT ALERT BANNER */}
        <section className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#FC6E20] border-y-[#FFE7D0]/5 border-r-[#FFE7D0]/5 shadow-md">
          <div className="flex items-center gap-3 mb-3 text-[#FC6E20]">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <h2 className="text-sm font-sans font-bold tracking-wider uppercase text-[#FFE7D0]">
              Google Play Requirement
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#FFE7D0]/70 leading-relaxed font-sans">
            Google Play requires testers to <span className="text-[#FC6E20] font-bold">remain enrolled</span> in the testing program for at least <span className="text-[#FC6E20] font-bold">14 continuous days</span>. Please do not leave the testing program during this period.
          </p>
        </section>

        {/* CHECKLIST (WHAT TO TEST) */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#FFE7D0]/5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#FFE7D0]/5 pb-4 mb-6">
            <h2 className="text-xs font-sans tracking-[0.15em] font-bold text-[#FC6E20] uppercase">
              What To Test
            </h2>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 -rotate-90">
                <circle 
                  className="fill-none stroke-[#FFE7D0]/5 stroke-[3.5px]" 
                  cx="16" 
                  cy="16" 
                  r="14"
                />
                <circle 
                  className="fill-none stroke-[#FC6E20] stroke-[3.5px] transition-[stroke-dashoffset] duration-300 ease-in-out" 
                  cx="16" 
                  cy="16" 
                  r="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-sans font-bold text-[#FC6E20] min-w-[36px] text-right">
                {percent}%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Task 1 */}
            <div 
              onClick={() => toggleTask(1)}
              className={`flex items-start gap-4 p-4 rounded-xl border border-[#FFE7D0]/5 transition-all duration-200 cursor-pointer select-none bg-[#20201f]/30 hover:bg-[#2a2a2a]/30 ${completedTasks[1] ? 'border-[#FC6E20]/20 bg-[#FC6E20]/3' : ''}`}
            >
              <div className={`w-5.5 h-5.5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedTasks[1] ? 'border-[#FC6E20] bg-[#FC6E20]' : 'border-[#FFE7D0]/40'}`}>
                {completedTasks[1] && <Check className="w-3.5 h-3.5 text-[#1B1B1B] stroke-[3.5px]" />}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-sm font-sans font-bold text-[#FFE7D0] transition-all ${completedTasks[1] ? 'line-through text-[#FFE7D0]/40' : ''}`}>
                  1. Daily Quotes
                </span>
                <div className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Open the app regularly.</li>
                    <li>Check if quotes load correctly.</li>
                    <li>Verify that refreshing shows a different quote.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div 
              onClick={() => toggleTask(2)}
              className={`flex items-start gap-4 p-4 rounded-xl border border-[#FFE7D0]/5 transition-all duration-200 cursor-pointer select-none bg-[#20201f]/30 hover:bg-[#2a2a2a]/30 ${completedTasks[2] ? 'border-[#FC6E20]/20 bg-[#FC6E20]/3' : ''}`}
            >
              <div className={`w-5.5 h-5.5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedTasks[2] ? 'border-[#FC6E20] bg-[#FC6E20]' : 'border-[#FFE7D0]/40'}`}>
                {completedTasks[2] && <Check className="w-3.5 h-3.5 text-[#1B1B1B] stroke-[3.5px]" />}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-sm font-sans font-bold text-[#FFE7D0] transition-all ${completedTasks[2] ? 'line-through text-[#FFE7D0]/40' : ''}`}>
                  2. Mood Tracking
                </span>
                <div className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Add moods.</li>
                    <li>Check if moods are saved correctly.</li>
                    <li>Verify mood history and statistics.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Task 3 */}
            <div 
              onClick={() => toggleTask(3)}
              className={`flex items-start gap-4 p-4 rounded-xl border border-[#FFE7D0]/5 transition-all duration-200 cursor-pointer select-none bg-[#20201f]/30 hover:bg-[#2a2a2a]/30 ${completedTasks[3] ? 'border-[#FC6E20]/20 bg-[#FC6E20]/3' : ''}`}
            >
              <div className={`w-5.5 h-5.5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedTasks[3] ? 'border-[#FC6E20] bg-[#FC6E20]' : 'border-[#FFE7D0]/40'}`}>
                {completedTasks[3] && <Check className="w-3.5 h-3.5 text-[#1B1B1B] stroke-[3.5px]" />}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-sm font-sans font-bold text-[#FFE7D0] transition-all ${completedTasks[3] ? 'line-through text-[#FFE7D0]/40' : ''}`}>
                  3. Streak System
                </span>
                <div className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Use the app daily.</li>
                    <li>Check if streaks update correctly.</li>
                    <li>Report any incorrect streak counts.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Task 4 */}
            <div 
              onClick={() => toggleTask(4)}
              className={`flex items-start gap-4 p-4 rounded-xl border border-[#FFE7D0]/5 transition-all duration-200 cursor-pointer select-none bg-[#20201f]/30 hover:bg-[#2a2a2a]/30 ${completedTasks[4] ? 'border-[#FC6E20]/20 bg-[#FC6E20]/3' : ''}`}
            >
              <div className={`w-5.5 h-5.5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedTasks[4] ? 'border-[#FC6E20] bg-[#FC6E20]' : 'border-[#FFE7D0]/40'}`}>
                {completedTasks[4] && <Check className="w-3.5 h-3.5 text-[#1B1B1B] stroke-[3.5px]" />}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-sm font-sans font-bold text-[#FFE7D0] transition-all ${completedTasks[4] ? 'line-through text-[#FFE7D0]/40' : ''}`}>
                  4. Notifications
                </span>
                <div className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Enable notifications.</li>
                    <li>Verify notifications arrive on time.</li>
                    <li>Tap notifications and confirm they open the correct screen.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Task 5 */}
            <div 
              onClick={() => toggleTask(5)}
              className={`flex items-start gap-4 p-4 rounded-xl border border-[#FFE7D0]/5 transition-all duration-200 cursor-pointer select-none bg-[#20201f]/30 hover:bg-[#2a2a2a]/30 ${completedTasks[5] ? 'border-[#FC6E20]/20 bg-[#FC6E20]/3' : ''}`}
            >
              <div className={`w-5.5 h-5.5 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedTasks[5] ? 'border-[#FC6E20] bg-[#FC6E20]' : 'border-[#FFE7D0]/40'}`}>
                {completedTasks[5] && <Check className="w-3.5 h-3.5 text-[#1B1B1B] stroke-[3.5px]" />}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-sm font-sans font-bold text-[#FFE7D0] transition-all ${completedTasks[5] ? 'line-through text-[#FFE7D0]/40' : ''}`}>
                  5. General Usage
                </span>
                <div className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Navigate through all screens.</li>
                    <li>Check for crashes, freezes, or loading issues.</li>
                    <li>Test buttons and settings.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FEEDBACK CARD */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#FFE7D0]/5 shadow-lg flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-sans tracking-[0.15em] font-bold text-[#FC6E20] uppercase mb-4">
              Feedback Needed
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#20201f]/30 p-3 rounded-xl border border-[#FFE7D0]/5 flex items-center gap-3 text-xs sm:text-sm font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6E20]" />
                <span>Bugs or crashes</span>
              </div>
              <div className="bg-[#20201f]/30 p-3 rounded-xl border border-[#FFE7D0]/5 flex items-center gap-3 text-xs sm:text-sm font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6E20]" />
                <span>Incorrect data</span>
              </div>
              <div className="bg-[#20201f]/30 p-3 rounded-xl border border-[#FFE7D0]/5 flex items-center gap-3 text-xs sm:text-sm font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6E20]" />
                <span>Slow performance</span>
              </div>
              <div className="bg-[#20201f]/30 p-3 rounded-xl border border-[#FFE7D0]/5 flex items-center gap-3 text-xs sm:text-sm font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6E20]" />
                <span>UI issues</span>
              </div>
              <div className="bg-[#20201f]/30 p-3 rounded-xl border border-[#FFE7D0]/5 flex items-center gap-3 text-xs sm:text-sm font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6E20]" />
                <span>Feature suggestions</span>
              </div>
              <div className="bg-[#20201f]/30 p-3 rounded-xl border border-[#FFE7D0]/5 flex items-center gap-3 text-xs sm:text-sm font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6E20]" />
                <span>Anything confusing/difficult</span>
              </div>
            </div>
          </div>

          {/* TEMPLATE FORMAT */}
          <div className="border-t border-[#FFE7D0]/5 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <span className="text-xs font-mono tracking-wider text-[#FFE7D0]/60 uppercase">
                Feedback Format Template
              </span>
              <button 
                onClick={copyTemplate}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2a2a2a]/60 border border-[#FFE7D0]/10 text-xs font-sans font-bold tracking-wider uppercase text-[#FFE7D0] hover:border-[#FC6E20] hover:text-[#FC6E20] transition-colors duration-200 cursor-pointer self-start sm:self-auto"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Template</span>
              </button>
            </div>
            
            <div className="bg-[#1b1b1b] border border-[#FFE7D0]/5 rounded-xl p-4 font-mono text-xs sm:text-sm text-[#FFE7D0] whitespace-pre-wrap leading-relaxed shadow-inner">
{`Device: 
Android Version: 
Issue: 
Steps to Reproduce: 
Screenshot (if possible):`}
            </div>
          </div>

          {/* EXAMPLE BOX */}
          <div className="bg-[#2a1306]/20 border border-dashed border-[#FC6E20]/20 rounded-xl p-4 mt-2">
            <span className="inline-block text-[10px] font-sans font-bold tracking-widest text-[#FC6E20] uppercase bg-[#FC6E20]/10 px-2 py-0.5 rounded-md mb-3">
              Example Report
            </span>
            <div className="font-mono text-xs text-[#FFE7D0]/70 whitespace-pre-wrap leading-relaxed">
{`Device: Samsung Galaxy A54
Android Version: 14
Issue: App crashes when refreshing quotes
Steps:
1. Open app
2. Tap refresh button
3. App closes`}
            </div>
          </div>
        </section>

        {/* TESTING FREQUENCY */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#FFE7D0]/5 shadow-lg flex flex-col gap-3">
          <h2 className="text-xs font-sans tracking-[0.15em] font-bold text-[#FC6E20] uppercase">
            Testing Frequency
          </h2>
          <p className="text-xs sm:text-sm text-[#FFE7D0]/70 leading-relaxed font-sans">
            Please use the app naturally during the 14-day testing period.
          </p>
          <p className="text-xs sm:text-sm text-[#FFE7D0] font-bold leading-relaxed font-sans">
            Even a few minutes of usage every couple of days helps provide valuable feedback.
          </p>
        </section>

        {/* FOOTER & THANK YOU */}
        <footer className="flex flex-col items-center gap-2 pt-4 text-center">
          <div className="text-sm font-sans font-bold text-[#FFE7D0]">
            Thank you for helping improve <span className="text-[#FC6E20]">Focus</span>! 🚀
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#FFE7D0]/40 uppercase tracking-widest">
            <span>Focus Beta Guide</span>
            <span className="w-1 h-1 rounded-full bg-[#FFE7D0]/25" />
            <span>Active Testing Cycle</span>
          </div>
        </footer>

      </main>

      {/* Copy Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#FC6E20] text-[#1B1B1B] py-3.5 px-6 rounded-xl font-sans font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 tracking-wide uppercase transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
      >
        <Check className="w-4 h-4 stroke-[3px]" />
        <span>{toastMsg}</span>
      </div>

      {/* Early Access Dialog */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
