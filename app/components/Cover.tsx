"use client";

import Image from "next/image";
import { LINKS, type LinkTarget } from "@/lib/links";
import { track } from "@/lib/tracking/track";

/**
 * The public cover. This is what every visitor and every crawler gets in the
 * initial HTML — there is no user-agent branching, the explicit content simply
 * is not rendered until the +18 gate is confirmed.
 *
 * Keep this SFW: og:image / og:title are derived from it.
 */

const safeLinks: { name: string; url: string; target: LinkTarget; color: string; label: string }[] = [
  {
    name: "TikTok",
    url: LINKS.tiktok,
    target: "tiktok",
    color: "#000000",
    label: "TikTok",
  },
  {
    name: "YouTube",
    url: LINKS.youtube,
    target: "youtube",
    color: "#FF0000",
    label: "YouTube",
  },
  {
    name: "Facebook",
    url: LINKS.facebook_share,
    target: "facebook_share",
    color: "#1877F2",
    label: "Facebook",
  },
  {
    name: "Instagram",
    url: LINKS.instagram_main,
    target: "instagram_main",
    color: "#E4405F",
    label: "Instagram",
  },
];

export default function Cover() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-8 font-sans">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-6">
        {/* Profile image */}
        <div className="size-24 overflow-hidden rounded-full border-2 border-pink-500/50">
          <Image
            src="/principal-new.webp"
            alt="Pauli Belen"
            width={96}
            height={96}
            className="size-full object-cover"
            priority
          />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="m-0 text-2xl font-semibold text-white">
            Pauli Belen
          </h1>
          <p className="mb-0 mt-1 text-sm text-zinc-500">
            @paulibelen1 · Content Creator 🇦🇷
          </p>
        </div>

        {/* Safe links */}
        <div className="flex w-full flex-col gap-3">
          {safeLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              onClick={() => track("cta_click", link.target)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-center text-[.9rem] font-medium text-white no-underline transition-colors hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
