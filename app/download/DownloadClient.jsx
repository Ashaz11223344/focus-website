"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  MapPin,
  Lock,
  Zap,
  Shield,
  Smartphone,
  ChevronDown
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Germany',
  'Singapore',
  'Saudi Arabia',
  'France',
  'Japan',
  'Netherlands',
  'Brazil',
  'South Africa',
  'Other'
]

const SOURCES = [
  'Instagram',
  'Friend',
  'Google',
  'Product Hunt',
  'Other'
]

const FAQ_DATA = [
  {
    question: "Is it safe to install an APK?",
    answer: "Absolutely. An APK (Android Package) is the standard format used by the Android operating system to distribute and install mobile apps. Because Focus does not connect to the internet, there is absolutely zero risk of background tracking, payload downloads, or remote data exposure. Our sandbox build is 100% self-contained."
  },
  {
    question: "Why isn't it on the Play Store yet?",
    answer: "Focus is currently in early-stage sandbox testing. We believe in crafting software with absolute intention and no rushing. By distributing via APK to our early access queue, we can refine the private SQLite database integration and offline-first habit loops directly with our core community before launching publicly."
  },
  {
    question: "How long until I receive the app?",
    answer: "We review early access requests manually to ensure that we maintain high-quality feedback loops. Usually, our system reviews and approves requests within 24 to 48 hours. Once approved, the secure sandbox APK is dispatched directly to your registered email address."
  },
  {
    question: "Is my data stored anywhere?",
    answer: "No. Focus uses a 100% offline local SQLite Room database sandboxed inside your Android device. We have zero tracking servers, zero analytics scripts, and zero cloud backups. Your daily mood entries, badging, streaks, and journal logs never leave your physical device."
  },
  {
    question: "Which Android versions are supported?",
    answer: "Focus is optimized for modern Android architectures. We support Android 8.0 (Oreo) and above. The lightweight APK footprint ensures fluid performance even on budget or legacy devices, with zero background battery drainage."
  }
]

export default function DownloadClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  
  // Inline Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    country: '',
    city: '',
    source: '',
    reason: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Full Name is required.'
    if (formData.fullName.trim().length < 2) return 'Full Name must be at least 2 characters.'
    if (!formData.email.trim()) return 'Email Address is required.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) return 'Please enter a valid email address.'
    
    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.trim().replace(/[\s\-()]/g, '')
      const phoneRegex = /^\+?[1-9]\d{6,14}$/
      if (!phoneRegex.test(cleanPhone)) {
        return 'Phone / WhatsApp format is invalid. Please use a valid number (e.g., +1234567890).'
      }
    }
    
    if (formData.occupation.trim().length > 50) return 'Occupation must not exceed 50 characters.'
    if (!formData.country) return 'Please select your country.'
    if (!COUNTRIES.includes(formData.country)) return 'Please select a valid country.'
    if (!formData.city.trim()) return 'City is required.'
    if (formData.city.trim().length < 2) return 'City must be at least 2 characters.'
    if (formData.reason.trim().length > 300) return 'Why do you want access must not exceed 300 characters.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')
    setLoadingStep(0)

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < 2 ? prev + 1 : prev))
    }, 600)

    const startTime = Date.now()

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, 1800 - elapsedTime)

      await new Promise(resolve => setTimeout(resolve, remainingTime))
      clearInterval(stepInterval)

      if (response.ok && data.success) {
        setSuccess(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          occupation: '',
          country: '',
          city: '',
          source: '',
          reason: ''
        })
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Request access API error:', err)
      clearInterval(stepInterval)
      setError('Connection failed. Please ensure the app dev server is running.')
      setLoading(false)
    }
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
            Your Copy of Focus is<br />One Step Away
          </motion.h1>
        </div>
      </section>

      {/* Main Process Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* 3-Step Visual Process Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Request Access', desc: 'Fill out the rapid secure form below with your sandbox application details.' },
            { step: '2', title: 'We Review', desc: 'Our team reviews all candidate submissions within 24-48 hours.' },
            { step: '3', title: 'APK Delivered', desc: 'Receive a secure, verified custom sandbox APK link directly to your inbox.' }
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

          {/* Right Column: Inline Embedded Access Form */}
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
                    Request Sandbox Build
                  </h3>
                  <p className="text-[9px] text-[#FFE7D0]/40 font-sans tracking-widest uppercase mt-0.5">
                    Focus App Access Center
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center justify-center min-h-[350px]"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mb-6 text-[#10B981]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-serif text-[#FFE7D0] font-bold">Request Received!</h4>
                    <p className="text-xs text-[#FFE7D0]/65 mt-3 max-w-xs leading-relaxed font-sans">
                      We have logged your application profile. Once vetted, your secure sandbox installer will be dispatched via email.
                    </p>
                    <div className="mt-8 px-6 py-3 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] font-semibold tracking-wider uppercase font-sans flex items-center gap-2">
                      <span>✓ Sandbox Invitation Locked</span>
                    </div>
                  </motion.div>
                ) : loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center justify-center min-h-[350px]"
                  >
                    <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-t-[#FC6E20] border-r-transparent border-b-[#FFE7D0]/10 border-l-transparent"
                      />
                      <Sparkles className="w-5 h-5 text-[#FC6E20] animate-pulse" />
                    </div>
                    <h4 className="text-lg font-serif text-[#FFE7D0] font-bold">Submitting Application</h4>
                    <div className="mt-4 h-6 text-xs text-[#FFE7D0]/60 font-sans tracking-wide text-center">
                      {loadingStep === 0 && "✦ Verifying details..."}
                      {loadingStep === 1 && "✦ Establishing tunnel..."}
                      {loadingStep === 2 && "✦ Registering whitelist..."}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {error && (
                      <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 flex items-start gap-2 text-red-300 text-xs font-sans">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-[10px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
                        Full Name <span className="text-[#FC6E20]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ashaz Pathan"
                        className="w-full px-4 py-2.5 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
                        Email Address <span className="text-[#FC6E20]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans"
                      />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-[10px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                          Phone <span className="text-[#FFE7D0]/20 font-normal lowercase">(Opt)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+12345..."
                          className="w-full px-3 py-2 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-xs text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="occupation" className="text-[10px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                          Role <span className="text-[#FFE7D0]/20 font-normal lowercase">(Opt)</span>
                        </label>
                        <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          placeholder="e.g. Student"
                          className="w-full px-3 py-2 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-xs text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans"
                        />
                      </div>
                    </div>

                    {/* Grid Country & City */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="country" className="text-[10px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
                          Country <span className="text-[#FC6E20]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full pl-3 pr-8 py-2 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-xs text-[#FFE7D0] focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans appearance-none font-medium"
                          >
                            <option value="" disabled className="text-[#FFE7D0]/20 bg-[#1B1B1B]">Country</option>
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c} className="bg-[#1B1B1B] text-[#FFE7D0]">{c}</option>
                            ))}
                          </select>
                          <Globe className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#FFE7D0]/30 pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="city" className="text-[10px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
                          City <span className="text-[#FC6E20]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. London"
                            className="w-full pl-3 pr-8 py-2 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-xs text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans"
                          />
                          <MapPin className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#FFE7D0]/30 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Source */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="source" className="text-[10px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                        Referral <span className="text-[#FFE7D0]/20 font-normal lowercase">(Optional)</span>
                      </label>
                      <select
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-xs text-[#FFE7D0] focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans appearance-none pr-8 font-medium"
                      >
                        <option value="" className="text-[#FFE7D0]/20 bg-[#1B1B1B]">Select Referral</option>
                        {SOURCES.map((s) => (
                          <option key={s} value={s} className="bg-[#1B1B1B] text-[#FFE7D0]">{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Reason */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reason" className="text-[10px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans flex justify-between">
                        <span>Why Focus? <span className="text-[#FFE7D0]/20 font-normal lowercase">(Optional)</span></span>
                        <span className="text-[9px] text-[#FFE7D0]/20">{formData.reason.length}/300</span>
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows={2}
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Briefly state your offline focus goal..."
                        className="w-full px-3 py-2 bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 rounded-lg text-xs text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 transition-colors font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-full bg-[#FC6E20] text-[#1B1B1B] font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_20px_rgba(252,110,32,0.4)] disabled:opacity-50 transition-all text-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
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
