"use client";

import { useState, useRef, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { SiOnlyfans, SiX, SiTiktok, SiYoutube, SiInstagram, SiTelegram } from "react-icons/si";


interface LinkOption {
  label: string;
  url: string;
  isAdult?: boolean;
}

interface SocialLink {
  name: string;
  url?: string;
  urls?: LinkOption[];
  icon: React.ReactNode;
  bgColor?: string;
  isAdult?: boolean;
}

interface SocialLinksProps {
  links?: SocialLink[];
}

const defaultLinks: SocialLink[] = [
  {
    name: "OnlyFans",
    icon: <SiOnlyfans size={24} />,
    bgColor: "bg-[#00aff0]",
    urls: [
      { label: "OnlyFans VIP", url: "https://onlyfans.com/paulibelen1", isAdult: true },
      { label: "OnlyFans Novia Virtual", url: "https://onlyfans.com/paulibelen.gfe", isAdult: true },
      { label: "OnlyFans Free", url: "https://onlyfans.com/paulibelenfree", isAdult: true },
    ],
  },
  {
    name: "Twitter",
    icon: <SiX size={24} />,
    bgColor: "bg-zinc-800",
    urls: [
      { label: "Twitter principal", url: "https://x.com/paulibelenof", isAdult: true },
      { label: "Twitter secundario", url: "https://x.com/xpaulibelen1x?s=21", isAdult: true },
    ],
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@paulibelen1_?_r=1&_t=ZS-948km0YyNd7",
    icon: <SiTiktok size={24} />,
    bgColor: "bg-zinc-800",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@paulibelen1?si=-hWmO44HFsXZ7PH6",
    icon: <SiYoutube size={24} />,
    bgColor: "bg-red-600",
  },

  {
    name: "Telegram",
    icon: <SiTelegram size={24} />,
    bgColor: "bg-[#0088cc]",
    urls: [
      { label: "Canal Free ", url: "https://t.me/paulibelenfree", isAdult: true },
      { label: "Catálogo", url: "https://t.me/paulibelencatalogo", isAdult: false },
      { label: "Canal secundario", url: "https://t.me/paulibelenfree2", isAdult: true },
    ],
  },
    {
    name: "Instagram",
    icon: <SiInstagram size={24} />,
    bgColor: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    urls: [
      { label: "Instagram Principal", url: "https://www.instagram.com/paulibelen1", isAdult: true },
      { label: "Instagram Secundario", url: "https://www.instagram.com/soypaulibelen", isAdult: true },
    ],
  },
  {
    name: "Facebook",
    icon: <FaFacebook size={24} />,
    bgColor: "bg-[#0088cc]",
 url: "https://www.facebook.com/share/1AxvDmRk5M/?mibextid=wwXIfr",
  },
];

export default function SocialLinks({ links = defaultLinks }: SocialLinksProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasMultipleLinks = (link: SocialLink) => link.urls && link.urls.length > 0;

  const handleClick = (link: SocialLink, e: React.MouseEvent) => {
    if (hasMultipleLinks(link)) {
      e.preventDefault();
      setOpenDropdown(openDropdown === link.name ? null : link.name);
    }
  };

  // Calculate dropdown height for animation
  useEffect(() => {
    if (openDropdown && dropdownContentRef.current) {
      setDropdownHeight(dropdownContentRef.current.scrollHeight);
    } else {
      setDropdownHeight(0);
    }
  }, [openDropdown]);

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
            className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 hover:shadow-lg ${link.bgColor || "bg-zinc-800"} ${
              openDropdown === link.name ? "scale-110 ring-2 ring-white/50" : ""
            }`}
            title={link.name}
          >
            {link.icon}
            {/* Indicator dot for items with multiple links */}
            {hasMultipleLinks(link) && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-pink-500" />
            )}
          </a>
        ))}
      </div>

      {/* Dropdown section with animated height */}
      <div
        className="w-full overflow-hidden transition-all duration-300 ease-out"
        style={{ height: dropdownHeight }}
      >
        <div ref={dropdownContentRef} className="pt-4">
          {activeLink && activeLink.urls && (
            <div className="flex flex-col gap-2 p-4">
              {activeLink.urls.map((option, index) => (
                <a
                  key={index}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
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
  );
}
