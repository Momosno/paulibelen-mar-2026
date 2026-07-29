"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SiOnlyfans, SiTelegram, } from "react-icons/si";
import { HiChevronDown } from "react-icons/hi";
import { GiLockedHeart } from "react-icons/gi";
import { BsCupHot } from "react-icons/bs";
import { TbRating18Plus } from "react-icons/tb";
import { GiCrownedHeart } from "react-icons/gi";
import { LINKS, type LinkTarget } from "@/lib/links";
import { track } from "@/lib/tracking/track";

interface LinkOption {
  label: string;
  url: string;
  /** Slug reported as `target` on the cta_click event. */
  target: LinkTarget;
  isAdult?: boolean;
}

interface GridItem {
  id: number;
  imageUrl: string;
  link?: string;
  target?: LinkTarget;
  links?: LinkOption[];
  isAdult?: boolean;
  platform?: string;
  colSpan?: number;
  icon?: React.ReactNode;
}

interface ImageGridProps {
  items?: GridItem[];
}

const allItems: GridItem[] = [
  {
    id: 1,
    imageUrl: "/onlyfans.webp",
    platform: "OnlyFans",
    icon: <SiOnlyfans size={18} />,
    colSpan: 2,
    links: [
      { label: "OnlyFans VIP", url: LINKS.onlyfans_vip, target: "onlyfans_vip", isAdult: true },
      { label: "OnlyFans Novia Virtual", url: LINKS.onlyfans_gfe, target: "onlyfans_gfe", isAdult: true },
      { label: "OnlyFans Free", url: LINKS.onlyfans_free, target: "onlyfans_free", isAdult: true },
    ],
  },
  {
    id: 2,
    imageUrl: "/telegram.webp",
    platform: "Telegram",
    icon: <SiTelegram size={18} />,
    colSpan: 2,
    links: [
      { label: "Canal Free ", url: LINKS.telegram_free, target: "telegram_free", isAdult: true },
      { label: "Catálogo", url: LINKS.telegram_catalogo, target: "telegram_catalogo", isAdult: false },
      { label: "Canal secundario", url: LINKS.telegram_free2, target: "telegram_free2", isAdult: true },
    ],
  },
  {
    id: 3,
    imageUrl: "/fansly.webp",
    platform: "Fansly",
    icon: <GiLockedHeart size={18} />,
    link: LINKS.fansly,
    target: "fansly",
    isAdult: false,
  },
  {
    id: 4,
    imageUrl: "/tecito.webp",
    platform: "Tecito",
    icon: <BsCupHot size={18} />,
    link: LINKS.tecito,
    target: "tecito",
    isAdult: false,
  },


  {
    id: 5,
    imageUrl: "/onlyfans_novia_virtual.webp",
    link: LINKS.onlyfans_gfe,
    target: "onlyfans_gfe",
    isAdult: true,
    platform: "OnlyFans",
    icon: <SiOnlyfans size={18} />,
  },
  {
    id: 6,
    imageUrl: "/onlyfans_free.webp",
    link: LINKS.onlyfans_free,
    target: "onlyfans_free",
    isAdult: true,
    platform: "OnlyFans",
    icon: <SiOnlyfans size={18} />,
  },
  {
    id: 7,
    imageUrl: "/ph.webp",
    link: LINKS.pornhub,
    target: "pornhub",
    isAdult: true,
    platform: "PH",
    icon: <TbRating18Plus size={18} />,
  },
  {
    id: 8,
    imageUrl: "/manyvids.webp",
    link: LINKS.manyvids,
    target: "manyvids",
    isAdult: true,
    platform: "ManyVids",
    icon: <GiCrownedHeart size={18} />,
  },
];

// Keep the remaining Pauli Belen cards configured above, but hidden while the
// page mirrors Sofi Maure's single featured-content layout.
const defaultItems: GridItem[] = allItems.slice(0, 2);

export default function ImageGrid({ items = defaultItems }: ImageGridProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown !== null) {
        const dropdownEl = dropdownRefs.current.get(openDropdown);
        if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleClick = (item: GridItem, e: React.MouseEvent) => {
    // If item has multiple links, toggle dropdown
    if (item.links && item.links.length > 0) {
      e.preventDefault();
      setOpenDropdown(openDropdown === item.id ? null : item.id);
      return;
    }

    if (item.target) track("cta_click", item.target);
  };

  const handleLinkClick = (linkOption: LinkOption) => {
    track("cta_click", linkOption.target);
    setOpenDropdown(null);
  };

  const hasMultipleLinks = (item: GridItem) => item.links && item.links.length > 0;

  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {items.map((item) => (
        <div
          key={item.id}
          ref={(el) => {
            if (el) dropdownRefs.current.set(item.id, el);
          }}
          className={`relative ${item.colSpan === 2 ? "col-span-2" : ""}`}
        >
          <a
            href={hasMultipleLinks(item) ? "#" : item.link}
            onClick={(e) => handleClick(item, e)}
            target={hasMultipleLinks(item) ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`group relative block overflow-hidden rounded-lg border border-white/10 bg-zinc-800 shadow-[0_10px_32px_rgba(0,0,0,.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,.45)] ${item.colSpan === 2 ? "aspect-[16/10]" : "aspect-[4/5]"}`}
          >
            {/* Image shown clearly */}
            <Image
              src={item.imageUrl}
              alt={item.platform || "Pauli Belen link"}
              fill
              sizes={item.colSpan === 2 ? "(max-width: 720px) 100vw, 640px" : "(max-width: 720px) 50vw, 310px"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />

            {/* Platform name with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end p-3 sm:p-4">
              <span className="z-10 text-lg font-extrabold text-white drop-shadow-xl sm:text-xl">{item.platform}</span>
            </div>

            {/* Platform badge */}
            {item.icon && (
              <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#00aff0] shadow-lg">
                {item.icon}
              </div>
            )}

            {/* 18+ badge for adult content */}
            {item.isAdult && (
              <div className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                18+
              </div>
            )}

            {/* Multiple links indicator */}
            {hasMultipleLinks(item) && (
              <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white shadow-lg backdrop-blur-md">
                <HiChevronDown size={16} />
              </div>
            )}

          </a>

          {/* Dropdown menu overlay for multiple links */}
          {hasMultipleLinks(item) && (
            <div
              className={`absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-black/75 px-5 shadow-xl backdrop-blur-md transition-opacity duration-300 ${openDropdown === item.id ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            >
              <div className="flex w-full flex-col gap-2 px-4">
                {item.links!.map((linkOption, index) => (
                  <a
                    key={index}
                    href={linkOption.url}
                    onClick={() => handleLinkClick(linkOption)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
                  >
                    <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{linkOption.label}</span>
                    {linkOption.isAdult && (
                      <span className="rounded-full bg-pink-600 px-2 py-0.5 text-xs font-bold shadow-[0_0_10px_rgba(219,39,119,0.5)]">
                        18+
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

  );
}
