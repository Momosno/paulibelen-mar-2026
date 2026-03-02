"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SiOnlyfans,  SiTelegram,  } from "react-icons/si";
import { HiChevronDown, HiEyeOff } from "react-icons/hi";
import { BiCoffeeTogo } from "react-icons/bi";
import { handleClientScriptLoad } from "next/script";
import { GiLockedHeart } from "react-icons/gi";
import { BsCupHot } from "react-icons/bs";
import { TbRating18Plus } from "react-icons/tb";
import { GiCrownedHeart } from "react-icons/gi";

interface LinkOption {
  label: string;
  url: string;
  isAdult?: boolean;
}

interface GridItem {
  id: number;
  imageUrl: string;
  link?: string;
  links?: LinkOption[];
  isAdult?: boolean;
  platform?: string;
  colSpan?: number;
  icon?: React.ReactNode;
}

interface ImageGridProps {
  items?: GridItem[];
}

const defaultItems: GridItem[] = [
  {
    id: 1,
    imageUrl: "/onlyfans.webp",
    platform: "OnlyFans",
    icon: <SiOnlyfans size={18} />,
    colSpan: 2,
    links: [
      { label: "OnlyFans VIP", url: "https://onlyfans.com/paulibelen1", isAdult: true },
      { label: "OnlyFans Novia Virtual", url: "https://onlyfans.com/paulibelen.gfe", isAdult: true },
      { label: "OnlyFans Free", url: "https://onlyfans.com/paulibelenfree", isAdult: true },
    ],
  },
    {
    id: 2,
    imageUrl: "/telegram.webp",
    platform: "Telegram",
    icon: <SiTelegram size={18} />,
    colSpan: 2,
    links: [
      { label: "Canal Free ", url: "https://t.me/paulibelenfree", isAdult: true },
      { label: "Catálogo", url: "https://t.me/paulibelencatalogo", isAdult: false },
      { label: "Canal secundario", url: "https://t.me/paulibelenfree2", isAdult: true },
    ],
  },
    {
    id: 3,
    imageUrl: "/fansly.webp",
    platform: "Fansly",
    icon: <GiLockedHeart size={18} />,
    link: "https://fansly.com/paulibelen1",
    isAdult: false,
  },
  {
    id: 4,
    imageUrl: "/tecito.webp",
    platform: "Tecito",
    icon: <BsCupHot size={18} />,
    link: "https://tecito.app/paulibelen1/post",
    isAdult: false,
  },


  {
    id: 5,
    imageUrl: "/onlyfans_novia_virtual.webp",
    link: "https://onlyfans.com/paulibelen.gfe",
    isAdult: true,
    platform: "OnlyFans",
    icon: <SiOnlyfans size={18} />,
  },
  {
    id: 6,
    imageUrl: "/onlyfans_free.webp",
    link: "https://onlyfans.com/paulibelenfree",
    isAdult: true,
    platform: "OnlyFans",
    icon: <SiOnlyfans size={18} />,
  },
  {
    id: 7,
    imageUrl: "/ph.webp",
    link: "https://es.pornhub.com/model/pauli-belen",
    isAdult: true,
    platform: "PH",
    icon: <TbRating18Plus  size={18} />,
  },
  {
    id: 8,
    imageUrl: "/manyvids.webp",
    link: "https://www.manyvids.com/Activity/paulibelen1/1006233631/club",
    isAdult: true,
    platform: "ManyVids",
    icon: <GiCrownedHeart  size={18} />,
  },
];

export default function ImageGrid({ items = defaultItems }: ImageGridProps) {
  const [adultWarning, setAdultWarning] = useState<{
    show: boolean;
    link: string;
  }>({ show: false, link: "" });
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    setMounted(true);
  }, []);

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

    // Single link with adult warning
    if (item.isAdult && item.link) {
      e.preventDefault();
      setAdultWarning({ show: true, link: item.link });
    }
  };

  const handleLinkClick = (linkOption: LinkOption, e: React.MouseEvent) => {
    if (linkOption.isAdult) {
      e.preventDefault();
      setAdultWarning({ show: true, link: linkOption.url });
      setOpenDropdown(null);
    } else {
      setOpenDropdown(null);
    }
  };

  const handleConfirmAdult = () => {
    window.open(adultWarning.link, "_blank");
    setAdultWarning({ show: false, link: "" });
  };

  const handleCancelAdult = () => {
    setAdultWarning({ show: false, link: "" });
  };

  const hasMultipleLinks = (item: GridItem) => item.links && item.links.length > 0;

  return (
    <>
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
              href={hasMultipleLinks(item) ? "#" : item.isAdult ? "#" : item.link}
              onClick={(e) => handleClick(item, e)}
              target={hasMultipleLinks(item) || item.isAdult ? undefined : "_blank"}
              rel="noopener noreferrer"
              className=" group relative block aspect-square overflow-hidden rounded-xl bg-zinc-800 transition-transform duration-200 hover:scale-[1.02]"
            >
              {/* Image shown clearly */}
              <img
                src={item.imageUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 "
             
              />

              {/* Platform name with gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 flex h-1/2 items-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                <span className="text-lg z-99 font-bold text-white drop-shadow-xl">{item.platform}</span>
              </div>

              {/* Platform badge */}
              {item.icon && (
                <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#00aff0] shadow-lg">
                  {item.icon}
                </div>
              )}

              {/* 18+ badge for adult content */}
              {item.isAdult && (
                <div className="absolute right-2 top-2 rounded-full bg-pink-600 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
                  18+
                </div>
              )}

              {/* Multiple links indicator */}
              {hasMultipleLinks(item) && (
                <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white shadow-lg">
                  <HiChevronDown size={16} />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute  inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </a>

            {/* Dropdown menu overlay for multiple links */}
            {hasMultipleLinks(item) && (
              <div
                className={`scale-105 px-5 absolute inset-0 z-50 flex flex-col items-center justify-center rounded-xl bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                  openDropdown === item.id ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="flex w-full flex-col gap-2 px-4">
                  {item.links!.map((linkOption, index) => (
                    <a
                      key={index}
                      href={linkOption.isAdult ? "#" : linkOption.url}
                      onClick={(e) => handleLinkClick(linkOption, e)}
                      target={linkOption.isAdult ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
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

      {/* Adult content warning modal - rendered via portal to body */}
      {mounted && adultWarning.show && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm animate-fade-in rounded-2xl bg-zinc-900 p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
              <HiEyeOff className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Mature Content Disclaimer
            </h3>
            <p className="mb-6 text-sm text-zinc-400">
              This link may contain graphic or adult content. You must be 18+ to continue.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmAdult}
                className="w-full rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Continue (18+)
              </button>
              <button
                onClick={handleCancelAdult}
                className="w-full rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-400 transition-colors hover:bg-zinc-800"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
