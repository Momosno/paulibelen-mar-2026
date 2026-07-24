/**
 * Shared tracking config. Imported by both the browser module and the
 * /api/e route handler, so it must never contain secrets.
 *
 * Portable across sites: to reuse this tracker on another project, copy the
 * `lib/tracking` folder + `app/api/e` and change SITE / ALLOWED_SITES here.
 */

/** Identifier written to `events.site` for this deployment. */
export const SITE = "paulibelen.com";

/**
 * Only these values are accepted by the endpoint. Anything else is rejected,
 * so a random POST cannot pollute another tenant's data.
 */
export const ALLOWED_SITES: readonly string[] = ["paulibelen.com"];

export const ALLOWED_EVENTS: readonly string[] = [
  "pageview",
  "age_gate_confirm",
  "cta_click",
];

/** Path of the first-party collector. Same origin on purpose (adblockers). */
export const TRACK_ENDPOINT = "/api/e";

/** Max stored length per text column. Longer values are truncated, not rejected. */
export const MAX_LEN = {
  site: 64,
  event_name: 64,
  target: 128,
  path: 512,
  referrer: 512,
  utm_source: 128,
  utm_medium: 128,
  utm_campaign: 128,
  session_id: 64,
  country: 2,
} as const;

export type TrackedEvent = {
  site: string;
  event_name: string;
  target?: string | null;
  path?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  session_id: string;
};
