"use client";

import { SITE, TRACK_ENDPOINT, type TrackedEvent } from "./config";

/**
 * Browser side of the tracker. No cookies: the session id lives in
 * sessionStorage, so it dies with the tab and never crosses origins.
 */

const SESSION_KEY = "trk_sid";
const UTM_KEY = "trk_utm";

type Utms = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

/** sessionStorage throws in private mode / when storage is blocked. */
function readStorage(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* storage unavailable — tracking degrades, the page must not */
  }
}

function randomId(): string {
  // crypto.randomUUID needs a secure context; fall back on plain http (local dev).
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Returns the tab's session id, creating it on first call. */
export function getSessionId(): string {
  const existing = readStorage(SESSION_KEY);
  if (existing) return existing;

  const id = randomId();
  writeStorage(SESSION_KEY, id);
  return id;
}

function getStoredUtms(): Utms {
  const raw = readStorage(UTM_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Utms;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Persists the UTMs from the entry URL for the whole session.
 *
 * The UTM only exists on the landing URL, but the click that matters (the CTA
 * out to OnlyFans/Telegram/...) happens later, on a URL with no query string.
 * Without this the attribution of the only event worth attributing is lost.
 * Later navigations without UTMs must NOT clear what the entry URL set.
 */
export function captureUtms(): Utms {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return getStoredUtms();
  }

  const incoming: Utms = {};
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  if (source) incoming.utm_source = source;
  if (medium) incoming.utm_medium = medium;
  if (campaign) incoming.utm_campaign = campaign;

  if (Object.keys(incoming).length === 0) {
    return getStoredUtms();
  }

  writeStorage(UTM_KEY, JSON.stringify(incoming));
  return incoming;
}

function send(payload: TrackedEvent): void {
  const body = JSON.stringify(payload);

  // sendBeacon, not fetch: clicking a CTA navigates away and the browser
  // cancels in-flight requests. A beacon is handed to the browser and survives
  // the destruction of the page.
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(TRACK_ENDPOINT, blob)) return;
    }
  } catch {
    /* fall through to fetch */
  }

  try {
    void fetch(TRACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never let tracking break the page */
  }
}

/**
 * Records an event. Always safe to call: any failure is swallowed.
 *
 * @param eventName one of ALLOWED_EVENTS
 * @param target    destination slug for cta_click (e.g. "onlyfans_vip")
 */
export function track(eventName: string, target?: string): void {
  if (typeof window === "undefined") return;

  try {
    const utms = getStoredUtms();
    send({
      site: SITE,
      event_name: eventName,
      target: target ?? null,
      path: window.location.pathname,
      referrer: document.referrer || null,
      utm_source: utms.utm_source ?? null,
      utm_medium: utms.utm_medium ?? null,
      utm_campaign: utms.utm_campaign ?? null,
      session_id: getSessionId(),
    });
  } catch {
    /* never let tracking break the page */
  }
}

/** Called once per page load by <Analytics />. */
export function initTracking(): void {
  if (typeof window === "undefined") return;
  getSessionId();
  captureUtms();
  track("pageview");
}
