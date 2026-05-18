import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, CheckCircle2, AlertCircle, Globe, MapPin } from 'lucide-react'

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
  'Other'
]

export default function RequestAccessModal({ isOpen, onClose }) {
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
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Escape key close handler
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Disable scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Full Name is required.'
    if (!formData.email.trim()) return 'Email Address is required.'
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) return 'Please enter a valid email address.'
    
    if (!formData.country) return 'Please select your country.'
    if (!formData.city.trim()) return 'City is required.'
    
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

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess(true)
        // Reset form data after short timeout
        setTimeout(() => {
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
        }, 1000)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Request access API error:', err)
      setError('Connection failed. Please ensure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1B1B1B]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg glass-panel-heavy rounded-2xl border border-[#FFE7D0]/10 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] flex flex-col"
          >
            {/* Upper Accent Ring */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FC6E20]/20 via-[#FC6E20] to-[#FC6E20]/20" />

            {/* Header */}
            <div className="p-6 border-b border-[#FFE7D0]/5 flex items-center justify-between bg-[#1B1B1B] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#FC6E20] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#FFE7D0] tracking-wide">
                    Request Early Access
                  </h3>
                  <p className="text-[10px] text-[#FFE7D0]/40 font-sans tracking-widest uppercase mt-0.5">
                    Focus Motivation App Sanctuary
                  </p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#FFE7D0]/5 flex items-center justify-center text-[#FFE7D0]/55 hover:text-[#FC6E20] hover:border-[#FC6E20]/20 hover:bg-[#FFE7D0]/5 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Content - Scrollable if content overflows */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#1B1B1B]">
              <AnimatePresence mode="wait">
                {success ? (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-12 px-4 flex flex-col items-center text-center justify-center min-h-[350px]"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/30 flex items-center justify-center mb-6 text-[#FC6E20]"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                    
                    <h4 className="text-2xl font-serif text-[#FFE7D0] font-bold">
                      Application Submitted
                    </h4>
                    
                    <p className="text-sm text-[#FFE7D0]/65 mt-3 max-w-xs leading-relaxed font-sans">
                      Your request has been successfully recorded. We are manually reviewing candidates to maintain sanctuary tranquility.
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 px-6 py-2.5 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 text-[#FC6E20] text-xs font-semibold tracking-wider uppercase font-sans animate-pulse"
                    >
                      We'll reach out soon ✦
                    </motion.div>
                    
                    <button
                      onClick={onClose}
                      className="mt-8 text-xs text-[#FFE7D0]/40 hover:text-[#FC6E20] tracking-wider uppercase font-bold transition-all duration-300"
                    >
                      Return to Website
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Form State */
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Intro block */}
                    <p className="text-xs text-[#FFE7D0]/50 leading-relaxed font-sans -mt-1">
                      Fill out this quick assessment profile to request a sandbox invite keys to our private build client. All fields marked with <span className="text-[#FC6E20] font-bold">*</span> are required.
                    </p>

                    {/* Error display */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 flex items-start gap-2 text-red-300 text-xs font-sans leading-relaxed"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
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
                          className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
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
                          className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone / WhatsApp */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                          Phone / WhatsApp <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>

                      {/* Occupation / Role */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="occupation" className="text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                          Occupation / Role <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          placeholder="e.g. Student, Developer"
                          className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Country Dropdown */}
                      <div className="flex flex-col gap-1.5 relative">
                        <label htmlFor="country" className="text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
                          Country <span className="text-[#FC6E20]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans appearance-none"
                          >
                            <option value="" disabled className="text-[#FFE7D0]/30 bg-[#1B1B1B]">Select Country</option>
                            {COUNTRIES.map((ct) => (
                              <option key={ct} value={ct} className="bg-[#1B1B1B] text-[#FFE7D0]">{ct}</option>
                            ))}
                          </select>
                          <Globe className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFE7D0]/30 pointer-events-none" />
                        </div>
                      </div>

                      {/* City Text */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="city" className="text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
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
                            placeholder="e.g. Mumbai, New York"
                            className="w-full pl-4 pr-10 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                          />
                          <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFE7D0]/30 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* How did you hear about Focus dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="source" className="text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                        How did you hear about Focus? <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                      </label>
                      <select
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans appearance-none"
                      >
                        <option value="" className="text-[#FFE7D0]/30 bg-[#1B1B1B]">Select Referral</option>
                        {SOURCES.map((sc) => (
                          <option key={sc} value={sc} className="bg-[#1B1B1B] text-[#FFE7D0]">{sc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Why do you want access textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reason" className="text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                        Why do you want access? <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows={2}
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Share a short sentence on your growth journey..."
                        className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans resize-none"
                      />
                    </div>

                    {/* Action Footer Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 mt-2 px-6 py-3.5 rounded-full bg-[#FC6E20] text-[#1B1B1B] font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_20px_rgba(252,110,32,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FC6E20] transition-all duration-300 text-xs select-none"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          {/* Spinner */}
                          <svg className="animate-spin h-4 w-4 text-[#1B1B1B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Request...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Early Access</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
