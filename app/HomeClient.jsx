"use client";

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sparkles } from 'lucide-react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'

// Dynamically load heavy components client-side to keep the first-load JS size low
const FeaturesSection = dynamic(() => import('./components/FeaturesSection'), { ssr: false })
const WhyFocus = dynamic(() => import('./components/WhyFocus'), { ssr: false })
const CarouselSection = dynamic(() => import('./components/CarouselSection'), { ssr: false })
const Testimonials = dynamic(() => import('./components/Testimonials'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const RequestAccessModal = dynamic(() => import('./components/RequestAccessModal'), { ssr: false })

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-x-hidden antialiased">
      
      {/* Premium Glassmorphic Header */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />

      {/* Features GSAP Scroll Pinning Showcase */}
      <FeaturesSection />

      {/* Why Focus Offline Advantage Cards */}
      <WhyFocus />

      {/* Centered Cyclic Carousel Showcase */}
      <CarouselSection />

      {/* User Reviews */}
      <Testimonials />

      {/* Bottom Request Access Call-to-Action */}
      <section className="relative w-full bg-[#1B1B1B] py-24 md:py-32 border-b border-[#FFE7D0]/5 overflow-hidden">
        
        {/* Soft background lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-[#FC6E20]/4 blur-[130px] pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          
          <span className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4 select-none">
            Get Focus
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#FFE7D0] leading-tight select-none">
            Cultivate your inner oasis
          </h2>

          <p className="text-[#FFE7D0]/60 font-sans mt-6 text-sm md:text-base leading-relaxed max-w-xl">
            Join the waiting list for our private sandbox build and take the first step towards a peaceful, consistent daily routine.
          </p>

          <div className="mt-10 flex flex-col items-center select-none">
            {/* Primary Request Access Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-base font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] hover:shadow-[0_0_35px_rgba(252,110,32,0.55)] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-5.5 h-5.5 text-[#1B1B1B]" />
              <span>Join the Waiting List</span>
            </button>

            <span className="text-xs text-[#FFE7D0]/40 font-sans mt-4 block">
              ✦ Secure sandbox invitation &bull; 100% private sandbox SQL Client
            </span>
          </div>

        </div>
      </section>

      {/* Footer Block */}
      <Footer />

      {/* Request Access Form Dialog Modal */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  )
}
