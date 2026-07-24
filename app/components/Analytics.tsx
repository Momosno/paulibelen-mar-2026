"use client";

import { useEffect, useRef } from "react";
import { initTracking } from "@/lib/tracking/track";

/**
 * Boots the tracker once per page load: ensures a session id, captures the
 * entry UTMs and fires the `pageview`. Renders nothing.
 */
export default function Analytics() {
  // StrictMode runs effects twice in dev; without this the numbers you see
  // while developing are double the real ones.
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    initTracking();
  }, []);

  return null;
}
