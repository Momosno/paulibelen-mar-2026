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
  username = "@paulibelen1",
  bio,
  profileImage = "/principal.jpeg",
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
    <div className="relative w-full">
      {/* Hero Image - full width with gradient overlay */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
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

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Name and username positioned over the gradient */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold text-white drop-shadow-lg">{name}</h1>
          <span className="text-sm text-zinc-400">{username}</span>
        </div>
      </div>

      {/* Bio - if provided */}
      {bio && (
        <p className="mt-4 text-center text-sm leading-relaxed text-zinc-300">
          {bio}
        </p>
      )}

      {/* Visit counter badge */}
      {visitCount !== undefined && (
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-400">
            <HiEye className="h-3.5 w-3.5" />
            <span>{visitCount.toLocaleString()} visits</span>
          </div>
        </div>
      )}
    </div>
  );
}
