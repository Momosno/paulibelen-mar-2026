import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Social media crawlers that should see the clean version
const BOT_SIGNATURES = [
  "facebookexternalhit",
  "facebot",
  "facebookcatalog",
  "instagram",
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
