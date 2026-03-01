import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import StickyHeader from "./components/StickyHeader";

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

export const metadata: Metadata = {
  title: "Pauli Belen",
  description: "Content Creator from Argentina",
  openGraph: {
    title: "Pauli Belen",
    description: "Content Creator from Argentina",
    url: "https://paulibelen.com",
    siteName: "Pauli Belen",
    images: [
      {
        url: "/principal.jpeg", // Imagen limpia para la preview
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
    title: "Pauli Belen",
    description: "Content Creator from Argentina",
    images: ["/principal.jpeg"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased w-full flex justify-center`}
      >
        <StickyHeader name="Pauli Belen" profileImage="/principal.jpeg" />
        {children}
      </body>
    </html>
  );
}
