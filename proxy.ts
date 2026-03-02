import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Social media crawlers that should see the clean version
// These match only the actual crawler/scraper bots, NOT Instagram's in-app browser.
// Instagram's in-app browser also sends "instagram" in the UA, so we must NOT include it here.
const BOT_SIGNATURES = [
  "facebookexternalhit",
  "facebot",
  "facebookcatalog",
  "meta-externalagent",
];

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  const isBot = BOT_SIGNATURES.some((sig) => userAgent.includes(sig));

  if (isBot && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/preview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
