"use client";

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  ArrowRight, 
  Code2, 
  Cpu, 
  Palette, 
  Terminal, 
  ExternalLink, 
  Compass, 
  Monitor, 
  Smartphone,
  ChevronDown
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RequestAccessModal from '../components/RequestAccessModal'

export default function AboutMeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  // Automatic mobile viewport detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track scroll position of the entire scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Apply spring physics for extra butter-smooth inertia on 3D animations
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 70,
    mass: 0.5
  })

  // =========================================================================
  // DESKTOP ONLY: 3D ANIMATION TRANSFORMS (called unconditionally at the top)
  // =========================================================================
  
  // CHAPTER 1: THE CODEX GATE (Scroll: 0% -> 25%)
  const bookCoverRotateY = useTransform(smoothProgress, [0, 0.22], [0, -135])
  const bookCoverZ = useTransform(smoothProgress, [0, 0.22], [0, -200])
  const bookCoverOpacity = useTransform(smoothProgress, [0.18, 0.22], [1, 0])
  
  const heroTranslateZ = useTransform(smoothProgress, [0, 0.25], [0, 250])
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 1.1])
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.08, 0.16, 0.22, 0.26], [0, 0, 1, 1, 0])

  // CHAPTER 2: FLOATING MANIFESTO (Scroll: 20% -> 55%)
  // Card 1: Built with Care
  const card1Z = useTransform(smoothProgress, [0.20, 0.32, 0.38], [-900, 0, 800])
  const card1RotateX = useTransform(smoothProgress, [0.20, 0.32, 0.38], [25, 0, -20])
  const card1Opacity = useTransform(smoothProgress, [0.20, 0.25, 0.32, 0.35, 0.38], [0, 1, 1, 1, 0])
  const card1X = useTransform(smoothProgress, [0.20, 0.38], ["-10%", "-2%"])

  // Card 2: No Distractions
  const card2Z = useTransform(smoothProgress, [0.28, 0.40, 0.46], [-900, 0, 800])
  const card2RotateX = useTransform(smoothProgress, [0.28, 0.40, 0.46], [25, 0, -20])
  const card2Opacity = useTransform(smoothProgress, [0.28, 0.33, 0.40, 0.43, 0.46], [0, 1, 1, 1, 0])
  const card2X = useTransform(smoothProgress, [0.28, 0.46], ["10%", "2%"])

  // Card 3: 100% Private
  const card3Z = useTransform(smoothProgress, [0.36, 0.48, 0.54], [-900, 0, 800])
  const card3RotateX = useTransform(smoothProgress, [0.36, 0.48, 0.54], [25, 0, -20])
  const card3Opacity = useTransform(smoothProgress, [0.36, 0.41, 0.48, 0.51, 0.54], [0, 1, 1, 1, 0])
  const card3X = useTransform(smoothProgress, [0.36, 0.54], ["-8%", "4%"])

  // CHAPTER 3: CREATIVE FAN STACK (Scroll: 50% -> 78%)
  const fanSectionOpacity = useTransform(smoothProgress, [0.48, 0.52, 0.74, 0.78], [0, 1, 1, 0])
  const fanSectionZ = useTransform(smoothProgress, [0.48, 0.52, 0.74, 0.78], [-300, 0, 0, 400])

  const stackRotateY1 = useTransform(smoothProgress, [0.52, 0.70], [0, -24])
  const stackX1 = useTransform(smoothProgress, [0.52, 0.70], [0, -320])
  const stackZ1 = useTransform(smoothProgress, [0.52, 0.70], [0, -100])

  const stackRotateY2 = useTransform(smoothProgress, [0.52, 0.70], [0, 0])
  const stackZ2 = useTransform(smoothProgress, [0.52, 0.70], [0, 50])

  const stackRotateY3 = useTransform(smoothProgress, [0.52, 0.70], [0, 24])
  const stackX3 = useTransform(smoothProgress, [0.52, 0.70], [0, 320])
  const stackZ3 = useTransform(smoothProgress, [0.52, 0.70], [0, -100])

  // CHAPTER 4: THE DIGITAL SANCTUARY (Scroll: 72% -> 100%)
  const sanctuaryOpacity = useTransform(smoothProgress, [0.72, 0.82], [0, 1])
  const sanctuaryZ = useTransform(smoothProgress, [0.72, 0.84, 0.96], [-600, 0, 0])
  const sanctuaryScale = useTransform(smoothProgress, [0.72, 0.84, 0.96], [0.7, 1.0, 1.0])
  const gridRotateX = useTransform(smoothProgress, [0.72, 1.0], [60, 45])
  const gridY = useTransform(smoothProgress, [0.72, 1.0], ["-20%", "10%"])

  // Immersive footer fade-in and slide-up at the very end of scroll (90% - 96%)
  const footerOpacity = useTransform(smoothProgress, [0.90, 0.96], [0, 1])
  const footerY = useTransform(smoothProgress, [0.90, 0.96], [80, 0])
  const footerPointerEvents = useTransform(smoothProgress, p => p > 0.93 ? "auto" : "none")
  
  // State to safely manage mounting of the footer to prevent overlap and client-side exceptions
  const [showFooter, setShowFooter] = useState(false)
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setShowFooter(latest > 0.90)
    })
    return () => unsubscribe()
  }, [smoothProgress])

  // =========================================================================
  // MOBILE RENDER (Clean, simple, non-3D scrolling layout)
  // =========================================================================
  if (isMobile) {
    return (
      <div className="relative w-full bg-[#1B1B1B] text-[#FFE7D0] antialiased min-h-screen flex flex-col font-sans select-none">
        
        {/* Fixed UI Header */}
        <Header onOpenModal={() => setIsModalOpen(true)} />
        
        {/* Soft background glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[18rem] h-[18rem] rounded-full bg-[#FC6E20]/5 blur-[90px]" />
          <div className="absolute bottom-[20%] right-[5%] w-[22rem] h-[22rem] rounded-full bg-[#FFE7D0]/3 blur-[110px]" />
        </div>

        {/* Main Linear Content */}
        <main className="relative z-10 px-6 pt-28 pb-16 flex flex-col gap-20 max-w-xl mx-auto">
          
          {/* Chapter 1: Hero */}
          <section className="text-center py-8 flex flex-col items-center justify-center">
            <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-3">
              About Me
            </span>
            <h1 className="text-3xl font-serif text-[#FFE7D0] leading-tight tracking-wide font-bold">
              I build apps that make life simpler.
            </h1>
            <div className="w-12 h-0.5 bg-[#FC6E20]/40 my-5" />
            <p className="text-[#FFE7D0]/70 font-sans text-xs sm:text-sm leading-relaxed">
              Hello, I'm Ashaz Pathan. I made Focus because I wanted a quiet, private place to write down my thoughts and track my mood without being interrupted by notifications or worrying about my data.
            </p>
          </section>

          {/* Chapter 2: Philosophy Cards */}
          <section className="flex flex-col gap-5">
            <div className="text-center mb-4">
              <span className="text-[9px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block font-sans">
                My Philosophy
              </span>
              <h2 className="text-xl font-serif font-bold text-[#FFE7D0] mt-1">How I Design Software</h2>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-[#FC6E20]/10 flex items-center justify-center text-[#FC6E20] mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#FFE7D0] mb-2">1. Built with Care</h3>
              <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                Every part of Focus is made with careful attention. From the colors to the calligraphy quotes, everything is placed on purpose to help you relax.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-[#FFE7D0]/5 flex items-center justify-center text-[#FFE7D0] mb-4">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#FFE7D0] mb-2">2. No Distractions</h3>
              <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                I believe technology should stay quiet. Focus has no annoying notifications, no endless feeds to scroll, and no ad popups to steal your attention.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-[#FC6E20]/10 flex items-center justify-center text-[#FC6E20] mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#FFE7D0] mb-2">3. 100% Private</h3>
              <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                Your thoughts belong to you. Focus saves your diaries directly on your phone. Nothing is ever sent to the internet, and no one else can ever read it.
              </p>
            </div>
          </section>

          {/* Chapter 3: Creations Stack */}
          <section className="flex flex-col gap-5">
            <div className="text-center mb-4">
              <span className="text-[9px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block font-sans">
                Creations & Skills
              </span>
              <h2 className="text-xl font-serif font-bold text-[#FFE7D0] mt-1">What I Love to Build</h2>
            </div>

            <div className="flex flex-col gap-5">
              <div className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 shadow-md">
                <Smartphone className="w-6 h-6 text-[#FC6E20] mb-3" />
                <h3 className="text-base font-serif font-bold text-[#FFE7D0] mb-2">Simple Phone Apps</h3>
                <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  I build simple, fast phone apps. They are designed to save your battery life and work perfectly without needing any internet connection.
                </p>
                <div className="mt-4 pt-3 border-t border-[#FFE7D0]/5 text-[9px] font-mono text-[#FC6E20]">
                  PHONE APPS • OFFLINE • SPEED
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-[#FC6E20]/20 shadow-md">
                <Compass className="w-6 h-6 text-[#FC6E20] mb-3" />
                <h3 className="text-base font-serif font-bold text-[#FFE7D0] mb-2">Clean Websites</h3>
                <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  I create clean, easy-to-use websites. I love designing smooth layouts that look beautiful on both phones and computers.
                </p>
                <div className="mt-4 pt-3 border-t border-[#FFE7D0]/5 text-[9px] font-mono text-[#FFE7D0]/70">
                  WEBSITES • EASY TO USE • BEAUTIFUL
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-[#FFE7D0]/5 shadow-md">
                <Palette className="w-6 h-6 text-[#FC6E20] mb-3" />
                <h3 className="text-base font-serif font-bold text-[#FFE7D0] mb-2">Beautiful Designs</h3>
                <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                  I love clean designs, elegant layouts, and smooth transitions. I want apps to feel natural—like writing in a real paper notebook.
                </p>
                <div className="mt-4 pt-3 border-t border-[#FFE7D0]/5 text-[9px] font-mono text-[#FC6E20]">
                  DESIGN • NATURAL • SMOOTH
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 4: Gateway to Portfolio */}
          <section className="text-center flex flex-col items-center justify-center pt-4">
            <span className="text-[9px] tracking-[0.3em] font-semibold text-[#FC6E20] uppercase block mb-2">
              My Portfolio
            </span>
            <h2 className="text-xl font-serif font-bold text-[#FFE7D0] mb-2">
              Step Into My App Hub
            </h2>
            <p className="text-xs text-[#FFE7D0]/60 max-w-sm mx-auto mb-5 leading-relaxed font-sans">
              This page is just a small part of what I do. Visit my main website to see all the simple phone apps, clean websites, and friendly tools I have built!
            </p>

            <div className="w-full bg-[#232323] border border-[#FFE7D0]/10 rounded-xl overflow-hidden text-left mb-5 shadow-lg">
              <div className="bg-[#1b1b1b] px-3 py-2 flex items-center justify-between border-b border-[#FFE7D0]/5">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#FC6E20]/40" />
                  <div className="w-2 h-2 rounded-full bg-[#FFE7D0]/20" />
                </div>
                <div className="bg-[#252525] rounded py-0.5 px-2 text-[9px] font-mono text-[#FFE7D0]/40">
                  ashazapps.qzz.io
                </div>
                <div className="w-6" />
              </div>
              <div className="p-5">
                <h3 className="text-[#FFE7D0] font-serif font-bold text-sm mb-1">ASHAZ APPS</h3>
                <p className="text-[10px] text-[#FFE7D0]/50 font-sans leading-relaxed">
                  A collection of my phone apps, websites, and clean designs that are easy to use.
                </p>
              </div>
            </div>

            <a 
              href="https://ashazapps.qzz.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#FFE7D0] transition-colors"
            >
              <span>Explore My Creations</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </section>

        </main>

        <Footer />
        <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    )
  }

  // =========================================================================
  // DESKTOP RENDER (Immersive 3D Scroll Perspective Layout)
  // =========================================================================
  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#1B1B1B] text-[#FFE7D0] antialiased select-none"
      style={{ height: "450vh" }} // Multiplies the height to generate long, premium scroll length
    >
      {/* Fixed UI Header */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* 3D Canvas Viewport Sticky wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#1B1B1B] z-10">
        
        {/* Soft immersive dark background ambient glow */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-[#FC6E20]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-[#FFE7D0]/3 blur-[140px] pointer-events-none" />
        </div>

        {/* The 3D CSS Rendering Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center z-10"
          style={{ 
            perspective: "1200px", 
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            transform: "translateY(36px)" // Elegant 36px top clearance shift to prevent navigation bar collision
          }}
        >

          {/* ============================================================ */}
          {/* CHAPTER 1: THE CODEX GATE & OPENING LOGO                      */}
          {/* ============================================================ */}
          <motion.div 
            className="absolute w-full flex items-center justify-center"
            style={{ 
              top: "50%",
              y: "-50%",
              z: heroTranslateZ, 
              scale: heroScale,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Revealed content under the cover - hidden initially and fades in as cover opens */}
            <motion.div 
              className="max-w-4xl px-6 text-center flex flex-col items-center justify-center pt-16"
              style={{
                opacity: heroTextOpacity
              }}
            >
              <span className="text-[12px] font-sans tracking-[0.25em] font-semibold text-[#FC6E20] uppercase block mb-4">
                About Me
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#FFE7D0] leading-tight select-none tracking-wide font-bold">
                I build apps that make life simpler.
              </h1>
              <p className="text-[#FFE7D0]/60 font-sans mt-5 max-w-xl text-xs md:text-sm leading-relaxed">
                Hello, I'm Ashaz Pathan. I made Focus because I wanted a quiet, private place to write down my thoughts and track my mood without being interrupted by notifications or worrying about my data.
              </p>

              <div className="mt-10 flex flex-col items-center text-[10px] text-[#FFE7D0]/30 font-sans select-none">
                <span className="mb-2 tracking-widest uppercase">Begin Scrolling</span>
                <ChevronDown className="w-5 h-5 text-[#FC6E20]/70 animate-bounce" />
              </div>
            </motion.div>

            {/* Split Cover gate representing opening a book - Responsive sizing & padding */}
            <motion.div 
              className="absolute bg-[#1e1e1e] border-2 border-[#FC6E20]/15 rounded-3xl p-8 md:p-12 flex flex-col justify-between text-left shadow-[0_25px_60px_rgba(0,0,0,0.8)] pointer-events-none select-none w-[90vw] max-w-[420px] h-[65vh] max-h-[500px] min-h-[380px]"
              style={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                transformOrigin: "left center",
                rotateY: bookCoverRotateY,
                z: bookCoverZ,
                opacity: bookCoverOpacity,
                backfaceVisibility: "hidden"
              }}
            >
              <div>
                <div className="flex items-center gap-3 text-[#FC6E20] mb-8">
                  <Terminal className="w-5 h-5" />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">My Story</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#FFE7D0] leading-snug">
                  MEET THE MAKER OF FOCUS
                </h2>
                <div className="w-12 h-0.5 bg-[#FC6E20]/50 mt-6" />
              </div>

              <div className="space-y-4">
                <p className="text-[10px] md:text-xs text-[#FFE7D0]/40 font-mono tracking-wider">
                  SCROLL TO READ MY STORY
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-[#FC6E20]">
                  <span>START HERE</span>
                  <ArrowRight className="w-3.5 h-3.5 animate-bounce-horizontal" />
                </div>
              </div>
            </motion.div>
          </motion.div>


          {/* ============================================================ */}
          {/* CHAPTER 2: FLOATING MANIFESTO PANELS                         */}
          {/* ============================================================ */}
          
          {/* Card 1: Built with Care */}
          <motion.div 
            className="absolute max-w-md w-full glass-panel-heavy p-8 rounded-2xl border border-[#FFE7D0]/10 shadow-2xl flex flex-col justify-between"
            style={{
              top: "50%",
              y: "-50%",
              z: card1Z,
              rotateX: card1RotateX,
              opacity: card1Opacity,
              left: "15%",
              x: card1X,
              height: "340px",
              transformStyle: "preserve-3d"
            }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FFE7D0] mb-4">1. Built with Care</h3>
              <p className="text-xs md:text-sm text-[#FFE7D0]/60 leading-relaxed font-sans">
                Every part of Focus is made with careful attention. From the colors to the calligraphy quotes, everything is placed on purpose to help you relax.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#FC6E20] tracking-wider uppercase pt-4 border-t border-[#FFE7D0]/5">
              Made by Hand
            </div>
          </motion.div>

          {/* Card 2: No Distractions */}
          <motion.div 
            className="absolute max-w-md w-full glass-panel-heavy p-8 rounded-2xl border border-[#FFE7D0]/10 shadow-2xl flex flex-col justify-between"
            style={{
              top: "50%",
              y: "-50%",
              z: card2Z,
              rotateX: card2RotateX,
              opacity: card2Opacity,
              right: "15%",
              x: card2X,
              height: "340px",
              transformStyle: "preserve-3d"
            }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FFE7D0]/5 border border-[#FFE7D0]/10 flex items-center justify-center text-[#FFE7D0] mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FFE7D0] mb-4">2. No Distractions</h3>
              <p className="text-xs md:text-sm text-[#FFE7D0]/60 leading-relaxed font-sans">
                I believe technology should stay quiet. Focus has no annoying notifications, no endless feeds to scroll, and no ad popups to steal your attention.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#FFE7D0]/40 tracking-wider uppercase pt-4 border-t border-[#FFE7D0]/5">
              Friendly and Quiet
            </div>
          </motion.div>

          {/* Card 3: 100% Private */}
          <motion.div 
            className="absolute max-w-md w-full glass-panel-heavy p-8 rounded-2xl border border-[#FC6E20]/10 shadow-2xl flex flex-col justify-between"
            style={{
              top: "50%",
              y: "-50%",
              z: card3Z,
              rotateX: card3RotateX,
              opacity: card3Opacity,
              left: "25%",
              x: card3X,
              height: "340px",
              transformStyle: "preserve-3d"
            }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FC6E20]/10 border border-[#FC6E20]/20 flex items-center justify-center text-[#FC6E20] mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FFE7D0] mb-4">3. 100% Private</h3>
              <p className="text-xs md:text-sm text-[#FFE7D0]/60 leading-relaxed font-sans">
                Your thoughts belong to you. Focus saves your diaries directly on your phone. Nothing is ever sent to the internet, and no one else can ever read it.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#FC6E20] tracking-wider uppercase pt-4 border-t border-[#FFE7D0]/5">
              Safe & Private
            </div>
          </motion.div>


          {/* ============================================================ */}
          {/* CHAPTER 3: CREATIVE FAN STACK (PROJECT AREAS)               */}
          {/* ============================================================ */}
          <motion.div 
            className="absolute w-full max-w-6xl px-6 flex flex-col items-center justify-center"
            style={{
              top: "50%",
              y: "-50%",
              z: fanSectionZ,
              opacity: fanSectionOpacity,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="text-center mb-12 max-w-xl">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FC6E20] uppercase block font-sans mb-2">
                Creations & Skills
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#FFE7D0] leading-snug">
                What I Love to Build
              </h2>
              <p className="text-xs text-[#FFE7D0]/50 mt-3 leading-relaxed font-sans">
                I focus on making apps that are fast, beautiful, and keep your data safe.
              </p>
            </div>

            {/* Fanning Card Container */}
            <div className="relative w-full h-[360px] flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Stack 1: Simple Phone Apps (Left) */}
              <motion.div 
                className="absolute w-[300px] h-[350px] glass-panel p-8 rounded-2xl flex flex-col justify-between border border-[#FFE7D0]/5 shadow-2xl select-none"
                style={{
                  x: stackX1,
                  rotateY: stackRotateY1,
                  z: stackZ1,
                  transformStyle: "preserve-3d"
                }}
              >
                <div>
                  <Smartphone className="w-8 h-8 text-[#FC6E20] mb-6" />
                  <h3 className="text-lg font-serif font-bold text-[#FFE7D0] mb-3">Simple Phone Apps</h3>
                  <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                    I build simple, fast phone apps. They are designed to save your battery life and work perfectly without needing any internet connection.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#FFE7D0]/5 text-[9px] font-mono text-[#FC6E20]">
                  <span>PHONE APPS</span> • <span>OFFLINE</span> • <span>SPEED</span>
                </div>
              </motion.div>

              {/* Stack 2: Clean Websites (Center) */}
              <motion.div 
                className="absolute w-[300px] h-[350px] glass-panel-heavy p-8 rounded-2xl flex flex-col justify-between border border-[#FC6E20]/20 shadow-[0_20px_50px_rgba(252,110,32,0.15)] z-20 select-none"
                style={{
                  rotateY: stackRotateY2,
                  z: stackZ2,
                  transformStyle: "preserve-3d"
                }}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <Compass className="w-8 h-8 text-[#FC6E20]" />
                    <span className="px-2 py-0.5 rounded bg-[#FC6E20]/15 text-[#FC6E20] font-mono text-[8px] uppercase tracking-wider font-bold">CORE SKILL</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#FFE7D0] mb-3">Clean Websites</h3>
                  <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                    I create clean, easy-to-use websites. I love designing smooth layouts that look beautiful on both phones and computers.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#FFE7D0]/5 text-[9px] font-mono text-[#FFE7D0]/70">
                  <span>WEBSITES</span> • <span>EASY TO USE</span> • <span>BEAUTIFUL</span>
                </div>
              </motion.div>

              {/* Stack 3: Beautiful Designs (Right) */}
              <motion.div 
                className="absolute w-[300px] h-[350px] glass-panel p-8 rounded-2xl flex flex-col justify-between border border-[#FFE7D0]/5 shadow-2xl select-none"
                style={{
                  x: stackX3,
                  rotateY: stackRotateY3,
                  z: stackZ3,
                  transformStyle: "preserve-3d"
                }}
              >
                <div>
                  <Palette className="w-8 h-8 text-[#FC6E20] mb-6" />
                  <h3 className="text-lg font-serif font-bold text-[#FFE7D0] mb-3">Beautiful Designs</h3>
                  <p className="text-xs text-[#FFE7D0]/60 leading-relaxed font-sans">
                    I love clean designs, elegant layouts, and smooth transitions. I want apps to feel natural—like writing in a real paper notebook.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#FFE7D0]/5 text-[9px] font-mono text-[#FC6E20]">
                  <span>DESIGN</span> • <span>NATURAL</span> • <span>SMOOTH</span>
                </div>
              </motion.div>

            </div>
          </motion.div>


          {/* ============================================================ */}
          {/* CHAPTER 4: THE DIGITAL SANCTUARY (PORTFOLIO HUB)            */}
          {/* ============================================================ */}
          <motion.div 
            className="absolute w-full max-w-2xl px-6 flex flex-col items-center justify-center text-center"
            style={{
              top: "50%",
              y: "-50%",
              opacity: sanctuaryOpacity,
              z: sanctuaryZ,
              scale: sanctuaryScale,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Background grid plane for 3D alignment */}
            <motion.div 
              className="absolute -bottom-16 w-[120%] h-[300px] border-t border-b border-[#FC6E20]/20 pointer-events-none opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(252, 110, 32, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(252, 110, 32, 0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                transformOrigin: "center top",
                rotateX: gridRotateX,
                y: gridY,
                z: -100
              }}
            />

            <span className="text-[9px] tracking-[0.3em] font-semibold text-[#FC6E20] uppercase block mb-1 font-sans">
              My Portfolio
            </span>
            <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-[#FFE7D0] leading-tight mb-2.5">
              Step Into My App Hub
            </h2>
            <p className="text-[10px] md:text-xs text-[#FFE7D0]/60 max-w-md mx-auto mb-4 leading-relaxed font-sans">
              This page is just a small part of what I do. Visit my main website to see all the simple phone apps, clean websites, and friendly tools I have built!
            </p>

            {/* Beautiful, premium interactive browser mockup showing portfolio URL - Compact Max-Width */}
            <div className="w-full max-w-sm bg-[#232323] border border-[#FFE7D0]/10 rounded-xl shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(252,110,32,0.08)] overflow-hidden text-left mb-4 select-none">
              
              {/* Window Header bar */}
              <div className="bg-[#1b1b1b] px-3.5 py-2 flex items-center justify-between border-b border-[#FFE7D0]/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FC6E20]/40" />
                  <div className="w-2 h-2 rounded-full bg-[#FFE7D0]/20" />
                  <div className="w-2 h-2 rounded-full bg-[#FFE7D0]/10" />
                </div>
                {/* URL Address Bar */}
                <div className="w-3/5 bg-[#252525] rounded-md py-0.5 px-3 text-[9px] font-mono text-[#FFE7D0]/40 flex items-center justify-between border border-[#FFE7D0]/5">
                  <span className="tracking-wide text-[9px] md:text-[10px]">https://ashazapps.qzz.io</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FC6E20] animate-pulse" />
                </div>
                <div className="w-8" />
              </div>

              {/* Mockup Content Page View */}
              <div className="p-4 relative bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] min-h-[80px] flex items-center justify-between">
                <div>
                  <h3 className="text-[#FFE7D0] font-serif font-bold text-base mb-1">ASHAZ APPS</h3>
                  <p className="text-[10px] text-[#FFE7D0]/50 font-sans max-w-xs leading-relaxed">
                    A collection of my phone apps, websites, and clean designs that are easy to use.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-dashed border-[#FC6E20]/25 flex items-center justify-center text-[#FC6E20] animate-[spin_20s_linear_infinite]">
                  <Monitor className="w-4.5 h-4.5" />
                </div>
              </div>
            </div>

            {/* Call to action portal link */}
            <a 
              href="https://ashazapps.qzz.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-[#FFE7D0] hover:scale-105 transition-all duration-300 shadow-[0_12px_24px_rgba(252,110,32,0.25)] cursor-pointer"
            >
              <span>Explore My Creations</span>
              <ExternalLink className="w-3 h-3" />
            </a>

          </motion.div>

        </div>
      </div>

      {/* The scroll-depth boundary marker to show scroll progress indicator */}
      <div className="fixed bottom-8 left-8 z-50 select-none flex items-center gap-3 font-mono text-[9px] font-bold text-[#FFE7D0]/40 bg-[#1B1B1B]/80 py-1.5 px-3 rounded-full border border-[#FFE7D0]/5 backdrop-blur-md">
        <span>CODEX PROG</span>
        <div className="w-16 h-[2px] bg-[#FFE7D0]/10 rounded overflow-hidden">
          <motion.div 
            className="h-full bg-[#FC6E20]"
            style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
        <motion.span>
          {useTransform(smoothProgress, p => `${Math.min(100, Math.round(p * 100))}%`)}
        </motion.span>
      </div>

      {/* 
        CRITICAL FIX: Position the Footer as a smooth-fading absolute block at the very end of 
        the 450vh container. It is controlled by useTransform and only fades in and becomes interactive 
        when the scroll progress is near 90%-96%, completely eliminating any overlap at 10% scroll depth.
      */}
      {showFooter && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 z-30 w-full bg-[#1B1B1B]"
          style={{
            opacity: footerOpacity,
            y: footerY,
            pointerEvents: footerPointerEvents
          }}
        >
          <Footer />
        </motion.div>
      )}

      {/* Request Access Form dialog */}
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
