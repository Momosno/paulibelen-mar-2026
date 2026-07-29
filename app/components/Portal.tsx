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
          className={`absolute inset-y-0 left-0 w-1/2 bg-[#030303] transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isAnimating ? "-translate-x-full shadow-none" : "translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* Decorative edge */}
          <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-pink-500/30 to-transparent" />
        </div>

        {/* Right curtain */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-[#030303] transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isAnimating ? "translate-x-full shadow-none" : "translate-x-0 shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
          }`}
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
          <div className="absolute inset-0 z-0 bg-[url('/onlyfans_novia_virtual.webp')] bg-cover bg-center brightness-[.15] saturate-[.8]" />

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-[1]" />

          {/* Content */}
          <div className="relative z-[20] flex flex-col items-center px-6 text-center">
            {/* Decorative top element */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-pink-400/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50" />
            </div>

            {/* Name - using elegant serif styling */}
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-normal tracking-[.1em] text-white [text-shadow:0_0_80px_rgba(236,72,153,.3),0_4px_20px_rgba(0,0,0,.5)] md:text-7xl lg:text-8xl">
              Pauli Belen
            </h1>

            {/* Subtle tagline */}
            <p className="mt-4 font-sans text-sm font-light uppercase tracking-[0.3em] text-zinc-400 md:text-base">
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
              className="group relative cursor-pointer overflow-hidden rounded-full border border-pink-500/30 bg-gradient-to-br from-pink-500/15 to-pink-500/5 px-12 py-4 shadow-[0_0_40px_rgba(236,72,153,.15),inset_0_1px_0_rgba(255,255,255,.1)] transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,.2)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

              <span className="relative z-10 font-sans text-sm font-normal uppercase tracking-[0.25em] text-white/90 transition-colors duration-300 group-hover:text-white md:text-base">
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
