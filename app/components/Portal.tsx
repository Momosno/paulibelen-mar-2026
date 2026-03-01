"use client";

import { useState, useEffect } from "react";

const PORTAL_STORAGE_KEY = "portal-entered";

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const [hasEntered, setHasEntered] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const entered = localStorage.getItem(PORTAL_STORAGE_KEY);
    setHasEntered(entered === "true");
  }, []);

  const handleEnter = () => {
    setIsAnimating(true);
    localStorage.setItem(PORTAL_STORAGE_KEY, "true");

    // Wait for animation to complete before showing content
    setTimeout(() => {
      setHasEntered(true);
    }, 1200);
  };

  // Initial loading state - prevents flash
  if (hasEntered === null) {
    return (
      <div className="fixed inset-0 bg-[#030303]" />
    );
  }

  // User has already entered before
  if (hasEntered && !isAnimating) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Main content (hidden behind portal) */}
      <div
        className={`transition-opacity duration-700 ${
          isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>

      {/* Portal overlay - split curtain effect */}
      <div
        className={`fixed inset-0 z-[100] ${
          isAnimating ? "pointer-events-none" : ""
        }`}
      >
        {/* Left curtain */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 bg-[#030303] transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isAnimating ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            boxShadow: isAnimating ? "none" : "20px 0 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* Decorative edge */}
          <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-pink-500/30 to-transparent" />
        </div>

        {/* Right curtain */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-[#030303] transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isAnimating ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            boxShadow: isAnimating ? "none" : "-20px 0 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* Decorative edge */}
          <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-pink-500/30 to-transparent" />
        </div>

        {/* Portal content - centered, fades out */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Background image layer */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/onlyfans_novia_virtual.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.15) saturate(0.8)",
            }}
          />

          {/*
          ====== VIDEO BACKGROUND ALTERNATIVE ======
          Uncomment this block and comment out the background image div above to use video:

          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{
              filter: "brightness(0.15) saturate(0.8)",
            }}
          >
            <source src="/background-video.mp4" type="video/mp4" />
          </video>
          =========================================
          */}

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-[1]" />

          {/* Subtle animated grain texture */}
          <div
            className="absolute inset-0 z-[2] opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-[20] flex flex-col items-center px-6 text-center">
            {/* Decorative top element */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-pink-400/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50" />
            </div>

            {/* Name - using elegant serif styling */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl tracking-wide text-white"
              style={{
                fontFamily: "var(--font-playfair), 'Times New Roman', Georgia, serif",
                textShadow: "0 0 80px rgba(236, 72, 153, 0.3), 0 4px 20px rgba(0,0,0,0.5)",
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
            >
              Pauli Belen
            </h1>

            {/* Subtle tagline */}
            <p
              className="mt-4 text-sm md:text-base tracking-[0.3em] uppercase text-zinc-400"
              style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontWeight: 300,
              }}
            >
              Content Creator
            </p>

            {/* Decorative divider */}
            <div className="mt-10 mb-10 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-500/40 to-pink-500/40" />
              <div className="h-2 w-2 rounded-full border border-pink-500/40" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-pink-500/40 to-pink-500/40" />
            </div>

            {/* Enter button */}
            <button
              onClick={handleEnter}
              className="group relative overflow-hidden rounded-full px-12 py-4 transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)",
                border: "1px solid rgba(236, 72, 153, 0.3)",
                boxShadow: "0 0 40px rgba(236, 72, 153, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
                }}
              />

              {/* Shimmer effect on hover */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
              />

              <span
                className="relative z-10 text-sm md:text-base tracking-[0.25em] uppercase text-white/90 group-hover:text-white transition-colors duration-300"
                style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontWeight: 400,
                }}
              >
                Entrar
              </span>
            </button>

            {/* Social proof hint */}
            <p className="mt-8 text-xs text-zinc-600 tracking-wider">
              🇦🇷 Argentina
            </p>
          </div>

          {/* Bottom decorative gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[3]" />
        </div>
      </div>

    </>
  );
}
