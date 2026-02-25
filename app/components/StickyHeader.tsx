"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface StickyHeaderProps {
  name: string;
  profileImage: string;
}

export default function StickyHeader({ name, profileImage }: StickyHeaderProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const startFade = 50;
      const endFade = 200;

      if (scrollY <= startFade) {
        setOpacity(0);
      } else if (scrollY >= endFade) {
        setOpacity(1);
      } else {
        setOpacity((scrollY - startFade) / (endFade - startFade));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[9999] bg-zinc-900/95 backdrop-blur-xl transition-opacity duration-200 self-center"
      style={{ opacity }}
    >
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        <div className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-pink-500/30">
          <Image
            src={profileImage}
            alt={name}
            width={40}
            height={40}
            className="size-full object-cover"
          />
        </div>
        <span className="font-medium text-white">{name}</span>
      </div>
    </header>
  );
}
