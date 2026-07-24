import { createClient } from "@supabase/supabase-js";
import {
  ALLOWED_EVENTS,
  ALLOWED_SITES,
  MAX_LEN,
} from "@/lib/tracking/config";

/**
 * First-party event collector.
 *
 * The browser never talks to Supabase directly — it posts here and this handler
 * inserts with the service role key, which stays server side. Being on the same
 * origin as the site also keeps it off adblock filter lists.
 *
 * Privacy: no cookies, no IP, no user agent. The only coarse signal kept is the
 * ISO-2 country that Vercel puts in `x-vercel-ip-country` at the edge.
 */

// Reads env at request time, so a missing var can't break the build.
function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Coerces to a trimmed, length-capped string; anything else becomes null. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

const NO_CONTENT = () => new Response(null, { status: 204 });
const REJECTED = () => new Response(null, { status: 400 });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return REJECTED();
  }

  if (!body || typeof body !== "object") return REJECTED();
  const input = body as Record<string, unknown>;

  // Allowlists, not free text: otherwise anyone could write rows under any
  // tenant name or invent event names that poison the reports.
  const site = clean(input.site, MAX_LEN.site);
  if (!site || !ALLOWED_SITES.includes(site)) return REJECTED();

  const eventName = clean(input.event_name, MAX_LEN.event_name);
  if (!eventName || !ALLOWED_EVENTS.includes(eventName)) return REJECTED();

  const sessionId = clean(input.session_id, MAX_LEN.session_id);
  if (!sessionId) return REJECTED();

  const country = clean(
    request.headers.get("x-vercel-ip-country"),
    MAX_LEN.country,
  );

  const row = {
    site,
    event_name: eventName,
    target: clean(input.target, MAX_LEN.target),
    path: clean(input.path, MAX_LEN.path),
    referrer: clean(input.referrer, MAX_LEN.referrer),
    utm_source: clean(input.utm_source, MAX_LEN.utm_source),
    utm_medium: clean(input.utm_medium, MAX_LEN.utm_medium),
    utm_campaign: clean(input.utm_campaign, MAX_LEN.utm_campaign),
    session_id: sessionId,
    country: country ? country.toUpperCase() : null,
  };

  // From here on the client always gets 204: a broken analytics pipeline must
  // never surface as an error in the user's browser, and error text would leak
  // details about the backend.
  try {
    const supabase = getClient();
    if (!supabase) {
      console.error("[track] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set");
      return NO_CONTENT();
    }

    const { error } = await supabase.from("events").insert(row);
    if (error) console.error("[track] insert failed:", error.message);
  } catch (err) {
    console.error("[track] unexpected failure:", err);
  }

  return NO_CONTENT();
}
