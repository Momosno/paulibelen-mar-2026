"use client";

import Image from "next/image";
import { useState } from "react";
import { HiEye } from "react-icons/hi";

interface ProfileSectionProps {
  name?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  visitCount?: number;
}

export default function ProfileSection({
  name = "Pauli Belen",
  bio,
  profileImage = "/header.webp",
  visitCount,
}: ProfileSectionProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden pb-2 text-center">
      <div className="relative h-[320px] w-full sm:h-[360px]">
        {!imageError ? (
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover object-top"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
            <span className="text-6xl font-bold text-white">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-black/10 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-2">
          <h1 className="text-[32px] font-extrabold tracking-tight text-white drop-shadow-lg sm:text-[38px]">{name}</h1>
          <p className="mt-2 flex items-center gap-2 text-base font-semibold text-white/90">
            <span className="size-2.5 rounded-full bg-emerald-500" /> Activa ahora
          </p>
          <p className="mt-2 mb-2 flex items-center gap-2 text-base font-bold text-white/90">
            <span className="" /> Hablamos? 😍
          </p>
        </div>
      </div>
      <p className="mt-3 text-lg font-medium text-white">{bio || "Content Creator 🇦🇷"}</p>

      {/* Visit counter badge */}
      {visitCount !== undefined && (
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-400">
            <HiEye className="h-3.5 w-3.5" />
            <span>{visitCount.toLocaleString()} visits</span>
          </div>
        </div>
      )}
    </section>
  );
}
