"use client";

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
  'Product Hunt',
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
  const [loadingStep, setLoadingStep] = useState(0)
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
    // 1. Full Name: Required, Min 2 characters
    if (!formData.fullName.trim()) {
      return 'Full Name is required.'
    }
    if (formData.fullName.trim().length < 2) {
      return 'Full Name must be at least 2 characters.'
    }

    // 2. Email Address: Required, Valid email format
    if (!formData.email.trim()) {
      return 'Email Address is required.'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address.'
    }

    // 3. Phone / WhatsApp: Optional, E.164 format if provided (e.g. +1234567890)
    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.trim().replace(/[\s\-()]/g, '')
      const phoneRegex = /^\+?[1-9]\d{6,14}$/
      if (!phoneRegex.test(cleanPhone)) {
        return 'Phone / WhatsApp format is invalid. Please use a valid number (e.g., +1234567890).'
      }
    }

    // 4. Occupation / Role: Optional, Max 50 characters
    if (formData.occupation.trim().length > 50) {
      return 'Occupation must not exceed 50 characters.'
    }

    // 5. Country: Required, selected from dropdown
    if (!formData.country || formData.country === '') {
      return 'Please select your country.'
    }
    if (!COUNTRIES.includes(formData.country)) {
      return 'Please select a valid country from the dropdown.'
    }

    // 6. City: Required, Min 2 characters
    if (!formData.city.trim()) {
      return 'City is required.'
    }
    if (formData.city.trim().length < 2) {
      return 'City must be at least 2 characters.'
    }

    // 7. Why do you want access: Optional, Max 300 characters
    if (formData.reason.trim().length > 300) {
      return 'Why do you want access textarea must not exceed 300 characters.'
    }

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

    // Step animation interval (cycles every 600ms)
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

      // Enforce premium loader visibility for a minimum of 1.8 seconds
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, 1800 - elapsedTime)

      await new Promise(resolve => setTimeout(resolve, remainingTime))
      clearInterval(stepInterval)

      if (response.ok && data.success) {
        setSuccess(true)
        
        // Auto-close modal after 2.5 seconds
        setTimeout(() => {
          onClose()
        }, 2500)

        // Reset state after animation ends
        setTimeout(() => {
          setSuccess(false)
          setLoading(false)
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
        }, 3200)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Request access Next.js API error:', err)
      clearInterval(stepInterval)
      setError('Connection failed. Please ensure the app dev server is running.')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1B1B1B]/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg glass-panel-heavy rounded-2xl border border-[#FFE7D0]/10 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-10 max-h-[95vh] sm:max-h-[90vh] flex flex-col m-1"
          >
            {/* Upper Accent Ring */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FC6E20]/20 via-[#FC6E20] to-[#FC6E20]/20 animate-pulse" />

            {/* Header */}
            <div className="px-4 py-3 sm:px-6 sm:py-5 border-b border-[#FFE7D0]/5 flex items-center justify-between bg-[#1B1B1B] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#FC6E20] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFE7D0] tracking-wide">
                    Join the Waiting List
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-[#FFE7D0]/40 font-sans tracking-widest uppercase mt-0.5">
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

            {/* Form / Loading / Success Container */}
            <div className="px-4 py-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#1B1B1B]">
              <AnimatePresence mode="wait">
                {success ? (
                  /* Success State View */
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 sm:py-12 px-2 flex flex-col items-center text-center justify-center min-h-[300px]"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mb-6 text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                      <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </motion.div>
                    
                    <h4 className="text-xl sm:text-2xl font-serif text-[#FFE7D0] font-bold">
                      Joined the Waiting List!
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-[#FFE7D0]/65 mt-3 max-w-xs leading-relaxed font-sans">
                      We have received your details for the waiting list. We will review it shortly and get in touch with you!
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] sm:text-xs font-semibold tracking-wider uppercase font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>✓ Joined Waiting List</span>
                    </motion.div>
                    
                    <span className="text-[9px] sm:text-[10px] text-[#FFE7D0]/30 font-sans mt-5">
                      Closing dialog...
                    </span>
                  </motion.div>
                ) : loading ? (
                  /* Premium Loading State View */
                  <motion.div
                    key="loading-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 sm:py-12 px-2 flex flex-col items-center text-center justify-center min-h-[300px]"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-8 flex items-center justify-center">
                      {/* Outer spinning ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-t-[#FC6E20] border-r-transparent border-b-[#FFE7D0]/10 border-l-transparent"
                      />
                      {/* Middle reverse spinning ring */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-b-[#FC6E20]/40 border-l-transparent border-t-transparent border-r-[#FFE7D0]/20"
                      />
                      {/* Pulsing inner icon */}
                      <motion.div
                        animate={{ scale: [0.9, 1.1, 0.9] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center"
                      >
                        <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#FC6E20]" />
                      </motion.div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-serif text-[#FFE7D0] font-bold tracking-wide">
                      Sending Request
                    </h4>

                    {/* Step-by-step progress status texts */}
                    <div className="mt-4 h-6 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={loadingStep}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[11px] sm:text-xs text-[#FFE7D0]/60 font-sans tracking-wide text-center"
                        >
                          {loadingStep === 0 && "✦ Checking details..."}
                          {loadingStep === 1 && "✦ Connecting..."}
                          {loadingStep === 2 && "✦ Submitting..."}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Faux indicator bar */}
                    <div className="w-40 sm:w-48 h-1 bg-[#FFE7D0]/5 rounded-full overflow-hidden mt-6 relative">
                      <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#FC6E20] to-transparent"
                      />
                    </div>
                  </motion.div>
                ) : (
                  /* Standard Form State View */
                  <motion.form
                    key="form-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Intro block */}
                    <p className="text-[11px] sm:text-xs text-[#FFE7D0]/50 leading-relaxed font-sans -mt-1">
                      Fill out this form to join the waiting list for Focus. All fields marked with <span className="text-[#FC6E20] font-bold">*</span> are required.
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
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
                          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
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
                          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Phone / WhatsApp */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                          Phone / WhatsApp <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>

                      {/* Occupation / Role */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="occupation" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                          Occupation / Role <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          placeholder="e.g. Student, Developer"
                          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Country Dropdown */}
                      <div className="flex flex-col gap-1.5 relative">
                        <label htmlFor="country" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
                          Country <span className="text-[#FC6E20]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans appearance-none pr-10"
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
                        <label htmlFor="city" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/65 tracking-wider uppercase font-sans">
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
                            className="w-full pl-3 pr-10 py-2 sm:pl-4 sm:pr-10 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans"
                          />
                          <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFE7D0]/30 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* How did you hear about Focus dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="source" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans">
                        How did you hear about Focus? <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          id="source"
                          name="source"
                          value={formData.source}
                          onChange={handleChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans appearance-none pr-10"
                        >
                          <option value="" className="text-[#FFE7D0]/30 bg-[#1B1B1B]">Select Referral</option>
                          {SOURCES.map((sc) => (
                            <option key={sc} value={sc} className="bg-[#1B1B1B] text-[#FFE7D0]">{sc}</option>
                          ))}
                        </select>
                        <Globe className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFE7D0]/30 pointer-events-none" />
                      </div>
                    </div>

                    {/* Why do you want access textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reason" className="text-[10px] sm:text-[11px] font-semibold text-[#FFE7D0]/40 tracking-wider uppercase font-sans flex justify-between">
                        <span>Why join the waiting list? <span className="text-[#FFE7D0]/25 text-[9px] font-normal lowercase">(Optional)</span></span>
                        <span className={`text-[9px] ${formData.reason.length > 300 ? 'text-red-400 font-bold' : 'text-[#FFE7D0]/25'}`}>
                          {formData.reason.length}/300
                        </span>
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows={2}
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Share a short sentence on your growth journey..."
                        className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1B1B1B] border border-[#FFE7D0]/10 rounded-lg text-base sm:text-sm text-[#FFE7D0] placeholder-[#FFE7D0]/20 focus:outline-none focus:border-[#FC6E20]/50 focus:shadow-[0_0_10px_rgba(252,110,32,0.1)] transition-all duration-300 font-sans resize-none"
                      />
                    </div>

                    {/* Action Footer Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 mt-2 px-6 py-3 sm:py-3.5 rounded-full bg-[#FC6E20] text-[#1B1B1B] font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_20px_rgba(252,110,32,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FC6E20] transition-all duration-300 text-xs select-none cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Join the Waiting List</span>
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
