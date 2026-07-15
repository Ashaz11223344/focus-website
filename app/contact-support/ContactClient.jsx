"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Shield, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

export default function ContactClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Quick validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setStatus({ submitting: false, success: false, error: 'Full Name must be at least 2 characters.' })
      return
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ submitting: false, success: false, error: 'A valid email address is required.' })
      return
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      setStatus({ submitting: false, success: false, error: 'Subject must be at least 3 characters.' })
      return
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, error: 'Message must be at least 10 characters.' })
      return
    }

    setStatus({ submitting: true, success: false, error: null })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus({ submitting: false, success: true, error: null })
        setFormData({ fullName: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ submitting: false, success: false, error: data.error || 'Failed to submit message. Please try again.' })
      }
    } catch (err) {
      console.error(err)
      setStatus({ submitting: false, success: false, error: 'Network error. Please try again later.' })
    }
  }

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
            Support Channel
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide"
          >
            Contact & Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFE7D0]/60 font-sans mt-4 text-sm md:text-base leading-relaxed"
          >
            Have feedback, feature ideas, or troubleshooting inquiries? Send us a message and we'll get back to you as soon as possible.
          </motion.p>
        </section>

        {/* Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel-heavy p-8 rounded-3xl border border-[#FFE7D0]/10 shadow-xl"
            >
              <h3 className="text-xl font-serif font-bold text-[#FFE7D0] mb-6">Send Support Request</h3>
              
              {status.success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FC6E20]/10 border border-[#FC6E20]/30 rounded-2xl p-6 text-center space-y-4 flex flex-col items-center py-10"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#FC6E20]" />
                  <h4 className="text-lg font-serif font-bold text-[#FFE7D0]">Message Sent Successfully</h4>
                  <p className="text-xs sm:text-sm text-[#FFE7D0]/60 max-w-xs font-sans leading-relaxed">
                    Thank you for reaching out. We have received your support request and will follow up shortly at your provided email address.
                  </p>
                  <button
                    onClick={() => setStatus({ submitting: false, success: false, error: null })}
                    className="mt-4 px-6 py-2.5 rounded-full border border-[#FC6E20]/40 text-[#FC6E20] text-xs uppercase font-sans tracking-wider hover:bg-[#FC6E20] hover:text-[#1B1B1B] transition-all duration-300 font-bold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {status.error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-400 text-xs sm:text-sm font-sans"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{status.error}</span>
                    </motion.div>
                  )}

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-[10px] uppercase font-mono tracking-wider text-[#FFE7D0]/50">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      disabled={status.submitting}
                      className="w-full bg-[#1B1B1B] border border-[#FFE7D0]/10 focus:border-[#FC6E20]/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none text-[#FFE7D0] transition-colors"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-wider text-[#FFE7D0]/50">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      disabled={status.submitting}
                      className="w-full bg-[#1B1B1B] border border-[#FFE7D0]/10 focus:border-[#FC6E20]/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none text-[#FFE7D0] transition-colors"
                      required
                    />
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-[10px] uppercase font-mono tracking-wider text-[#FFE7D0]/50">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Inquiry or Feedback category"
                      disabled={status.submitting}
                      className="w-full bg-[#1B1B1B] border border-[#FFE7D0]/10 focus:border-[#FC6E20]/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none text-[#FFE7D0] transition-colors"
                      required
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] uppercase font-mono tracking-wider text-[#FFE7D0]/50">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us details about your request..."
                      disabled={status.submitting}
                      className="w-full bg-[#1B1B1B] border border-[#FFE7D0]/10 focus:border-[#FC6E20]/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none text-[#FFE7D0] transition-colors resize-none custom-scrollbar"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] disabled:opacity-50 transition-all duration-300 text-xs sm:text-sm cursor-pointer"
                  >
                    {status.submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1B1B1B] border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5 text-[#1B1B1B]" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: Support Info / Details */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Channels */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 space-y-4"
            >
              <h4 className="text-base font-serif font-bold text-[#FFE7D0]">Alternate Support Channels</h4>
              
              <div className="space-y-4 font-sans text-xs sm:text-sm text-[#FFE7D0]/70 leading-relaxed">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#FC6E20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#FFE7D0]">Primary Email Support</span>
                    <a href="mailto:support@getfocus.online" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors">support@getfocus.online</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-[#FFE7D0]/10 pt-4">
                  <Mail className="w-5 h-5 text-[#FC6E20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#FFE7D0]">Developer Direct Inbox</span>
                    <a href="mailto:ashazpathan8@gmail.com" className="text-[#FC6E20] underline hover:text-[#FFE7D0] transition-colors">ashazpathan8@gmail.com</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Offline Safeguard Note */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 flex items-start gap-3"
            >
              <Shield className="w-6 h-6 text-[#FC6E20] shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-xs text-[#FFE7D0]/50 font-sans leading-relaxed">
                <span className="font-semibold block text-[#FFE7D0]/60 uppercase tracking-wider">Privacy Notice</span>
                By submitting this form, you authorize us to use your provided email address exclusively to respond to your support request. We do not aggregate or track contacts.
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
