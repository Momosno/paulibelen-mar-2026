import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Title, description and image all describe the SFW cover in <Cover />, which
// is now what every visitor and crawler actually receives at "/".
// metadataBase makes the relative og:image resolve to an absolute URL, which
// Facebook and Twitter require.
export const metadata: Metadata = {
  metadataBase: new URL("https://paulibelen.com"),
  title: "Pauli Belen - Content Creator",
  description: "Creadora de contenido argentina. Sígueme en mis redes sociales.",
  openGraph: {
    title: "Pauli Belen - Content Creator",
    description: "Creadora de contenido argentina. Sígueme en mis redes sociales.",
    url: "https://paulibelen.com",
    siteName: "Pauli Belen",
    images: [
      {
        url: "/manyvids.webp",
        width: 1200,
        height: 630,
        alt: "Pauli Belen",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pauli Belen - Content Creator",
    description: "Creadora de contenido argentina. Sígueme en mis redes sociales.",
    images: ["/principal.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#09090b]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} m-0 flex w-full justify-center overflow-x-hidden bg-[#09090b] p-0 font-sans text-[#fafafa] antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
