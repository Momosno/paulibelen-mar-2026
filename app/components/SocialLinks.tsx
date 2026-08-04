"use client";

import { useState, useRef, useEffect } from "react";
import { BsCupHot, BsSnapchat } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiOnlyfans, SiX, SiTiktok, SiYoutube, SiInstagram, SiTelegram } from "react-icons/si";
import { LINKS, type LinkTarget } from "@/lib/links";
import { track } from "@/lib/tracking/track";
import { GiLockedHeart } from "react-icons/gi";


interface LinkOption {
  label: string;
  url: string;
  /** Slug reported as `target` on the cta_click event. */
  target: LinkTarget;
  isAdult?: boolean;
}

interface SocialLink {
  name: string;
  url?: string;
  target?: LinkTarget;
  urls?: LinkOption[];
  icon: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  isAdult?: boolean;
}

interface SocialLinksProps {
  links?: SocialLink[];
}

const defaultLinks: SocialLink[] = [
  // {
  //   name: "OnlyFans",
  //   icon: <SiOnlyfans size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-[#00AFF0]",
  //   urls: [
  //     { label: "OnlyFans VIP", url: LINKS.onlyfans_vip, target: "onlyfans_vip", isAdult: true },
  //     { label: "OnlyFans Novia Virtual", url: LINKS.onlyfans_gfe, target: "onlyfans_gfe", isAdult: true },
  //     { label: "OnlyFans Free", url: LINKS.onlyfans_free, target: "onlyfans_free", isAdult: true },
  //   ],
  // },
  // {
  //   name: "Twitter",
  //   icon: <SiX size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-white",
  //   urls: [
  //     { label: "Twitter principal", url: LINKS.twitter_main, target: "twitter_main", isAdult: true },
  //     { label: "Twitter secundario", url: LINKS.twitter_alt, target: "twitter_alt", isAdult: true },
  //   ],
  // },
  // {
  //   name: "TikTok",
  //   url: LINKS.tiktok,
  //   target: "tiktok",
  //   icon: <SiTiktok size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-white",
  // },
  // {
  //   name: "YouTube",
  //   url: LINKS.youtube,
  //   target: "youtube",
  //   icon: <SiYoutube size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-[#FF0000]",
  // },
  {
    name: "Fansly",
    icon: <GiLockedHeart size={24} />,
    url: LINKS.fansly,
    target: "fansly",
    isAdult: true,
  },
  {
    name: "Tecito",
    icon: <BsCupHot size={24} />,
    url: LINKS.tecito,
    target: "tecito",
    isAdult: true,
  },
  {
    name: "Telegram",
    icon: <SiTelegram size={24} />,
    bgColor: "bg-white",
    iconColor: "text-[#0088cc]",
    urls: [
      { label: "Canal Free ", url: LINKS.telegram_free, target: "telegram_free", isAdult: true },
      { label: "Catálogo", url: LINKS.telegram_catalogo, target: "telegram_catalogo", isAdult: false },
      { label: "Canal secundario", url: LINKS.telegram_free2, target: "telegram_free2", isAdult: true },
    ],
  },
  // {
  //   name: "Instagram",
  //   icon: <SiInstagram size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-[#E4405F]",
  //   urls: [
  //     { label: "Instagram Principal", url: LINKS.instagram_main, target: "instagram_main", isAdult: true },
  //     { label: "Instagram Secundario", url: LINKS.instagram_alt, target: "instagram_alt", isAdult: true },
  //   ],
  // },
  // {
  //   name: "Facebook",
  //   icon: <FaFacebook size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-[#1877F2]",
  //   urls: [
  //     { label: "Facebook", url: LINKS.facebook_main, target: "facebook_main", isAdult: true },
  //     { label: "Facebook secundario", url: LINKS.facebook_alt, target: "facebook_alt", isAdult: true },
  //   ]
  // },
  // {
  //   name: "Snapchat",
  //   icon: <BsSnapchat size={24} />,
  //   bgColor: "bg-white",
  //   iconColor: "text-yellow-500",
  //   url: LINKS.snapchat, target: "snapchat", isAdult: true
  // },
];

export default function SocialLinks({ links = defaultLinks }: SocialLinksProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasMultipleLinks = (link: SocialLink) => link.urls && link.urls.length > 0;

  const handleClick = (link: SocialLink, e: React.MouseEvent) => {
    if (hasMultipleLinks(link)) {
      e.preventDefault();
      setOpenDropdown(openDropdown === link.name ? null : link.name);
      return;
    }
    // Direct outbound link: record it and let the browser navigate normally.
    if (link.target) track("cta_click", link.target);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLink = links.find((link) => link.name === openDropdown);

  return (
    <div ref={containerRef} className="w-full">
      {/* Icons row */}
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={hasMultipleLinks(link) ? "#" : link.url}
            onClick={(e) => handleClick(link, e)}
            target={hasMultipleLinks(link) ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#171719] shadow-[0_5px_18px_rgba(0,0,0,.35)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#242428] ${link.iconColor || "text-white"} ${openDropdown === link.name ? "scale-110 ring-2 ring-white/50" : ""
              }`}
            title={link.name}
          >
            {link.icon}
            {/* Indicator dot for items with multiple links */}
            {hasMultipleLinks(link) && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0d0d0f] bg-pink-500" />
            )}
          </a>
        ))}
      </div>

      {/* Dropdown section with animated height */}
      <div className={`grid w-full transition-[grid-template-rows] duration-300 ease-out ${openDropdown ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="pt-4">
            {activeLink && activeLink.urls && (
              <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-black/55 p-3 shadow-xl backdrop-blur-xl">
                {activeLink.urls.map((option, index) => (
                  <a
                    key={index}
                    href={option.url}
                    onClick={() => track("cta_click", option.target)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
                  >
                    <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{option.label}</span>
                    {option.isAdult && (
                      <span className="rounded-full bg-pink-600 px-2 py-0.5 text-xs font-bold shadow-[0_0_10px_rgba(219,39,119,0.5)]">
                        18+
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
