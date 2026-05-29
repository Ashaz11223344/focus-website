"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BookOpen, ChevronDown } from 'lucide-react';

export default function NotFound() {
  const [renderState, setRenderState] = useState({ angle: 0, offsetX: 0, offsetY: 0 });
  const eyeRef = useRef(null);
  
  // High-performance LERP (Linear Interpolation) mouse target coordinates
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set initial targetMouse to the center of the window to prevent initial jump
    targetMouse.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.45 };
    currentMouse.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.45 };

    let animId;

    const updateLerp = () => {
      // 0.06 easing factor creates a gorgeous, fluid, organic lag/ease-out
      const ease = 0.06;

      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * ease;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * ease;

      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = currentMouse.current.x - eyeX;
        const dy = currentMouse.current.y - eyeY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 1. Calculate eased searchlight angle
        const angleRad = Math.atan2(dy, dx);
        const angleDeg = angleRad * (180 / Math.PI);

        // 2. Calculate eased pupil offset (max 8px limit)
        const maxOffset = 8;
        let offsetX = 0;
        let offsetY = 0;
        if (dist > 0) {
          offsetX = (dx / dist) * Math.min(maxOffset, dist / 20);
          offsetY = (dy / dist) * Math.min(maxOffset, dist / 20);
        }

        setRenderState({
          angle: angleDeg,
          offsetX: offsetX,
          offsetY: offsetY
        });
      }

      animId = requestAnimationFrame(updateLerp);
    };

    updateLerp();

    const handleMouseMove = (e) => {
      targetMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[175vh] bg-[#1B1B1B] text-[#FFE7D0] antialiased select-none scroll-smooth">
      
      {/* -------------------------------------------------------------
          0. FLOATING TOP-LEFT HOME BUTTON (Always Present)
          ------------------------------------------------------------- */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#FFE7D0]/60 hover:text-[#FC6E20] hover:border-[#FC6E20]/45 hover:shadow-[0_0_20px_rgba(252,110,32,0.3)] transition-all duration-300 pointer-events-auto cursor-pointer"
        aria-label="Go to Home"
      >
        <Home className="w-5 h-5" />
      </Link>

      {/* -------------------------------------------------------------
          1. DESKTOP STICKY VIEWPORT: Fullscreen Interactive Eye of Sauron
          ------------------------------------------------------------- */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center z-10 pointer-events-none">
        
        {/* Fullscreen Symmetrical Vector Illustration */}
        <svg 
          viewBox="150 40 500 460" 
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 select-none pointer-events-none opacity-80"
        >
          <defs>
            {/* Outer glowing orange radial gradient */}
            <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FC6E20" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#FC6E20" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FC6E20" stopOpacity="0" />
            </radialGradient>

            {/* Main eye yellow-orange radial gradient */}
            <radialGradient id="eye-sphere" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE7D0" />
              <stop offset="30%" stopColor="#FFC837" />
              <stop offset="70%" stopColor="#FC6E20" />
              <stop offset="100%" stopColor="#7F2700" />
            </radialGradient>

            {/* Light beam fading linear gradient */}
            <linearGradient id="beam-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FC6E20" stopOpacity="0.65" />
              <stop offset="25%" stopColor="#FC6E20" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#FC6E20" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FC6E20" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* A. Symmetrical Background Landscape Silhouettes */}
          <path d="M0,500 Q200,410 400,510 T800,470 L800,600 L0,600 Z" fill="#221711" opacity="0.35" />
          <path d="M0,530 Q150,450 350,540 T800,510 L800,600 L0,600 Z" fill="#1B120C" opacity="0.55" />
          <path d="M0,560 Q250,500 500,570 T800,550 L800,600 L0,600 Z" fill="#140D09" opacity="0.75" />
          <path d="M0,580 Q280,530 550,590 T800,580 L800,600 L0,600 Z" fill="#0C0705" />

          {/* B. Symmetrical Eased Searchlight Beam (Rotates centered at 400, 270) */}
          <g transform={`rotate(${renderState.angle}, 400, 270)`}>
            <polygon 
              points="400,270 1600,120 1600,420" 
              fill="url(#beam-gradient)" 
              opacity="0.35" 
            />
          </g>

          {/* C. Sauron's Dark Tower (Centered horizontally at 400) */}
          <g className="drop-shadow-[0_0_35px_rgba(0,0,0,0.85)]">
            <path 
              d="M340,600 
                 L350,480 
                 L340,430 
                 L365,390 
                 L360,320 
                 L370,250 
                 L360,200 
                 L345,120 
                 L365,220 
                 L380,240 
                 L390,300 
                 L395,350 
                 L405,350 
                 L410,300 
                 L420,240 
                 L435,220 
                 L455,120 
                 L440,200 
                 L430,250 
                 L440,320 
                 L435,390 
                 L460,430 
                 L450,480 
                 L460,600 Z" 
              fill="#080503" 
            />
            {/* Architectural detail polygons */}
            <polygon points="370,250 380,300 365,390" fill="#040201" />
            <polygon points="430,250 420,300 435,390" fill="#040201" />
          </g>

          {/* D. Interactive Eye of Sauron (Positioned symmetrically between claws) */}
          <g ref={eyeRef} className="drop-shadow-[0_0_25px_rgba(252,110,32,0.65)]">
            {/* Glowing aura */}
            <circle cx="400" cy="270" r="52" fill="url(#eye-glow)" />

            {/* Main eye sphere */}
            <circle cx="400" cy="270" r="32" fill="url(#eye-sphere)" />

            {/* Pupil (Iris) - Black Slit (LERPed offset coordinates) */}
            <ellipse 
              cx={400 + renderState.offsetX} 
              cy={270 + renderState.offsetY} 
              rx="5.5" 
              ry="22" 
              fill="#000000" 
            />

            {/* Reflection highlight */}
            <circle 
              cx={393 + renderState.offsetX * 0.7} 
              cy={262 + renderState.offsetY * 0.7} 
              r="2.5" 
              fill="#FFFFFF" 
              opacity="0.85"
            />
          </g>

          {/* E. Symmetrical 4 [EYE] 4 Typography */}
          <text 
            x="320" 
            y="292" 
            fill="#FFE7D0" 
            fontSize="76" 
            fontFamily="Literata, serif" 
            fontWeight="bold"
            opacity="0.95"
            textAnchor="end"
            className="select-none"
          >
            4
          </text>
          <text 
            x="480" 
            y="292" 
            fill="#FFE7D0" 
            fontSize="76" 
            fontFamily="Literata, serif" 
            fontWeight="bold"
            opacity="0.95"
            textAnchor="start"
            className="select-none"
          >
            4
          </text>
        </svg>

        {/* Pulsating Scroll Indicator (First Viewport Bottom) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-30 animate-bounce">
          <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#FFE7D0]/40 uppercase">
            Scroll Down
          </span>
          <ChevronDown className="w-4 h-4 text-[#FC6E20]/75" />
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. SECOND STAGE: Scroll-To-Reveal Text and Buttons (Parallax Effect)
          ------------------------------------------------------------- */}
      <div className="relative w-full min-h-[75vh] flex flex-col justify-center items-center text-center px-6 z-20 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B] to-transparent pt-12 pb-32 pointer-events-auto">
        <div className="glass-panel border border-[#FFE7D0]/5 p-10 md:p-14 rounded-3xl max-w-xl shadow-[0_30px_60px_rgba(0,0,0,0.65)] relative">
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#FC6E20]/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-6 flex flex-col items-center">
            <span className="px-3 py-1 rounded bg-[#FC6E20]/10 border border-[#FC6E20]/25 text-[10px] font-sans font-bold tracking-[0.25em] text-[#FC6E20] uppercase select-none">
              404 Error
            </span>

            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-serif font-black tracking-wide leading-tight text-[#FFE7D0] glow-cream">
                Oops...
              </h2>
              <p className="text-lg md:text-xl font-sans font-semibold tracking-widest text-[#FC6E20] uppercase">
                You are lost.
              </p>
            </div>

            <p className="text-xs md:text-sm text-[#FFE7D0]/60 font-sans leading-relaxed max-w-sm">
              The page you are looking for doesn't exist. Let's get you back on track.
            </p>

            {/* Simple CTA Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 select-none">
              <Link 
                href="/"
                className="flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#FFE7D0] hover:shadow-[0_0_25px_rgba(252,110,32,0.45)] transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Go Home</span>
              </Link>
              <Link 
                href="/blog"
                className="flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 text-[#FFE7D0] text-xs font-sans font-bold uppercase tracking-wider hover:border-[#FC6E20] hover:text-[#FC6E20] hover:bg-[#FC6E20]/5 transition-all duration-300 cursor-pointer"
              >
                <span>Read Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#FC6E20]/2 blur-[150px] pointer-events-none z-0" />
    </div>
  );
}
