"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Home, BookOpen, Wind } from 'lucide-react';

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [breathState, setBreathState] = useState('idle'); // 'idle', 'inhale', 'hold', 'exhale'
  const [breathText, setBreathText] = useState('Take a Mindful Breath');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const canvasRef = useRef(null);

  // 1. Interactive 3D Parallax Rotation
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    // Calculate coordinates relative to center, scaled between -1 and 1
    const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    setMousePos({ x, y });
  };

  // 2. HTML5 3D Projected Perspective Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class inside 3D space
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        // Random 3D coordinates
        this.x = (Math.random() - 0.5) * window.innerWidth * 1.5;
        this.y = (Math.random() - 0.5) * window.innerHeight * 1.5;
        this.z = Math.random() * 1000 + 100; // Depth (100 to 1100)
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = -Math.random() * 0.8 - 0.2; // Move forward in Z space
      }

      update(targetX, targetY) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        // Interactive mouse gravity effect in 3D
        if (targetX !== undefined && targetY !== undefined) {
          // Normalize target coordinates into 3D space
          const currentScreenX = this.x / (this.z / 500);
          const currentScreenY = this.y / (this.z / 500);
          const dx = targetX - currentScreenX;
          const dy = targetY - currentScreenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 300) {
            // Apply slight magnetic pull
            this.x += (dx / dist) * 0.8;
            this.y += (dy / dist) * 0.8;
          }
        }

        // Reset if particle goes past screen or goes negative
        if (this.z <= 10) {
          this.reset();
        }
      }

      draw() {
        const fov = 500; // Field of view
        const scale = fov / this.z;
        const screenX = this.x * scale + canvas.width / 2;
        const screenY = this.y * scale + canvas.height / 2;

        // Only draw if within bounds
        if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
          const alpha = Math.max(0, Math.min(1, (1 - this.z / 1100) * 0.7)); // Fade out in distance
          ctx.beginPath();
          ctx.arc(screenX, screenY, this.size * scale, 0, Math.PI * 2);
          
          // Emerald glow during inhale, Orange glow default
          if (breathState === 'inhale') {
            ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
          } else if (breathState === 'hold') {
            ctx.fillStyle = `rgba(255, 231, 208, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(252, 110, 32, ${alpha})`;
          }
          
          ctx.fill();
        }
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());

    // Render loop
    const render = () => {
      // Sleek dark fading trail for motion blur
      ctx.fillStyle = 'rgba(27, 27, 27, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert mouse 2D into relative coordinates
      const currentMouseX = mousePos.x * (canvas.width / 2);
      const currentMouseY = mousePos.y * (canvas.height / 2);

      particles.forEach(p => {
        p.update(currentMouseX, currentMouseY);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, breathState]);

  // 3. Interactive Guided Stoic Breathing Loop
  useEffect(() => {
    if (breathState === 'idle') return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Advance breath state machine
          if (breathState === 'inhale') {
            setBreathState('hold');
            setBreathText('Hold Still...');
            return 4;
          } else if (breathState === 'hold') {
            setBreathState('exhale');
            setBreathText('Exhale Slowly...');
            return 4;
          } else if (breathState === 'exhale') {
            setBreathState('inhale');
            setBreathText('Inhale Deeply...');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathState]);

  const startBreathing = () => {
    if (breathState !== 'idle') {
      setBreathState('idle');
      setBreathText('Take a Mindful Breath');
      setSecondsLeft(4);
    } else {
      setBreathState('inhale');
      setBreathText('Inhale Deeply...');
      setSecondsLeft(4);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#1B1B1B] text-[#FFE7D0] overflow-hidden antialiased flex flex-col justify-center items-center"
    >
      {/* Background Interactive 3D Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none" 
      />

      {/* Floating 3D Parallax Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        className="glass-panel-heavy border border-[#FFE7D0]/10 p-10 md:p-14 rounded-3xl max-w-lg mx-6 text-center shadow-[0_30px_70px_rgba(0,0,0,0.65)] relative z-10 flex flex-col items-center gap-6"
      >
        {/* Glow Element */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#FC6E20]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* Floating Icon */}
        <div 
          style={{ transform: 'translateZ(40px)' }}
          className="w-16 h-16 rounded-2xl bg-[#FC6E20]/10 border border-[#FC6E20]/25 flex items-center justify-center text-[#FC6E20]"
        >
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* 3D Title */}
        <div style={{ transform: 'translateZ(30px)' }} className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-serif font-black tracking-wide text-[#FC6E20] glow-orange-lg">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFE7D0] tracking-wide">
            Sanctuary Lost
          </h2>
        </div>

        {/* Stoic Message */}
        <p 
          style={{ transform: 'translateZ(20px)' }}
          className="text-xs md:text-sm text-[#FFE7D0]/65 font-sans leading-relaxed max-w-sm"
        >
          The digital noise has led you astray. You have wandered into empty, non-existent coordinates. Take this moment to step away from the panic.
        </p>

        {/* Interactive Guided Breath Container */}
        <div 
          style={{ transform: 'translateZ(50px)' }}
          className="w-full flex flex-col items-center gap-4 py-4"
        >
          <button 
            onClick={startBreathing}
            className={`w-48 h-48 rounded-full border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-700 relative overflow-hidden group ${
              breathState === 'inhale' 
                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.35)]' 
                : breathState === 'hold'
                ? 'bg-[#FFE7D0]/10 border-[#FFE7D0]/50 shadow-[0_0_35px_rgba(255,231,208,0.25)]'
                : breathState === 'exhale'
                ? 'bg-[#FC6E20]/10 border-[#FC6E20]/50 shadow-[0_0_35px_rgba(252,110,32,0.35)]'
                : 'bg-[#1B1B1B]/40 border-[#FFE7D0]/10 hover:border-[#FC6E20]/30 hover:bg-[#FC6E20]/5'
            }`}
          >
            {/* Pulsating Breathing Ring */}
            <span 
              className={`absolute inset-2 rounded-full border border-dashed transition-transform duration-1000 ${
                breathState === 'inhale'
                  ? 'scale-110 border-emerald-400/30 animate-spin'
                  : breathState === 'hold'
                  ? 'scale-120 border-[#FFE7D0]/20'
                  : breathState === 'exhale'
                  ? 'scale-75 border-[#FC6E20]/30 animate-spin'
                  : 'scale-95 border-[#FFE7D0]/5 group-hover:scale-100 group-hover:border-[#FC6E20]/10'
              }`}
              style={{ animationDuration: '12s' }}
            />

            <Wind className={`w-6 h-6 transition-colors duration-500 ${
              breathState === 'inhale' 
                ? 'text-emerald-400' 
                : breathState === 'hold'
                ? 'text-[#FFE7D0]'
                : breathState === 'exhale'
                ? 'text-[#FC6E20]'
                : 'text-[#FFE7D0]/40 group-hover:text-[#FC6E20]'
            }`} />

            <span className={`text-[10px] uppercase font-sans font-bold tracking-widest transition-colors duration-500 ${
              breathState === 'inhale'
                ? 'text-emerald-400'
                : breathState === 'hold'
                ? 'text-[#FFE7D0]'
                : breathState === 'exhale'
                ? 'text-[#FC6E20]'
                : 'text-[#FFE7D0]/50 group-hover:text-[#FFE7D0]'
            }`}>
              {breathText}
            </span>

            {breathState !== 'idle' && (
              <span className="text-xl font-serif font-black animate-pulse transition-colors duration-500">
                {secondsLeft}s
              </span>
            )}
          </button>
        </div>

        {/* Premium CTA Buttons */}
        <div 
          style={{ transform: 'translateZ(30px)' }}
          className="flex flex-col sm:flex-row gap-4 w-full mt-2"
        >
          <Link 
            href="/"
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FC6E20] text-[#1B1B1B] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#FFE7D0] hover:shadow-[0_0_25px_rgba(252,110,32,0.45)] transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link 
            href="/blog"
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1B1B1B]/40 border border-[#FFE7D0]/10 text-[#FFE7D0] text-xs font-sans font-bold uppercase tracking-wider hover:border-[#FC6E20] hover:text-[#FC6E20] hover:bg-[#FC6E20]/5 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Blog</span>
          </Link>
        </div>
      </motion.div>

      {/* Floating coordinates indicator in bottom corners */}
      <div className="absolute bottom-6 left-6 text-[8px] font-mono tracking-widest text-[#FFE7D0]/20 select-none hidden md:block">
        X: {mousePos.x.toFixed(4)} | Y: {mousePos.y.toFixed(4)}
      </div>
      <div className="absolute bottom-6 right-6 text-[8px] font-mono tracking-widest text-[#FFE7D0]/20 select-none hidden md:block">
        SYSTEM_STATUS: OFFLINE_SANCTUARY_LOST
      </div>
    </div>
  );
}
