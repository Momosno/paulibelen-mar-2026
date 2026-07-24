"use client";

import { useSyncExternalStore } from "react";
import Cover from "./Cover";
import AdultContent from "./AdultContent";
import AgeModal from "./AgeModal";
import { track } from "@/lib/tracking/track";

const STORAGE_KEY = "age-verified";

/**
 * Age gate.
 *
 * The server always renders the cover: `getServerSnapshot` returns false
 * unconditionally, so the explicit content is not in the initial HTML for
 * anyone — it is mounted client side only after the visitor confirms. Nothing
 * is hidden with CSS and nothing branches on user agent; crawlers get exactly
 * the same document a first-time human gets.
 */

let listeners: Array<() => void> = [];

// Survives a storage write being rejected (private browsing / storage blocked),
// which would otherwise leave the visitor stuck on the modal forever.
let confirmedThisSession = false;

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function isVerified() {
  if (confirmedThisSession) return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

const notVerified = () => false;
const isHydrated = () => true;
const noopSubscribe = () => () => {};

export default function AgeGate() {
  const verified = useSyncExternalStore(subscribe, isVerified, notVerified);
  // Keeps the modal out of the server HTML too, so a returning visitor does not
  // get a flash of the gate before their confirmation is read back.
  const hydrated = useSyncExternalStore(noopSubscribe, isHydrated, notVerified);

  const handleConfirm = () => {
    track("age_gate_confirm");
    confirmedThisSession = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* in-memory flag above already carries this session */
    }
    listeners.forEach((l) => l());
  };

  const handleExit = () => {
    window.location.href = "https://google.com";
  };

  if (verified) return <AdultContent />;

  return (
    <>
      <Cover />
      {hydrated && <AgeModal onConfirm={handleConfirm} onExit={handleExit} />}
    </>
  );
}
