import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pauli Belen - Content Creator",
  description: "Creadora de contenido argentina. Sígueme en mis redes sociales.",
  openGraph: {
    title: "Pauli Belen - Content Creator",
    description: "Creadora de contenido argentina. Sígueme en mis redes sociales.",
    images: ["/principal.webp"],
  },
};

const safeLinks = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@paulibelen1_?_r=1&_t=ZS-948km0YyNd7",
    color: "#000000",
    label: "TikTok",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@paulibelen1?si=-hWmO44HFsXZ7PH6",
    color: "#FF0000",
    label: "YouTube",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1AxvDmRk5M/?mibextid=wwXIfr",
    color: "#1877F2",
    label: "Facebook",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/paulibelen1",
    color: "#E4405F",
    label: "Instagram",
  },
];

export default function PreviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Profile image */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(236, 72, 153, 0.5)",
          }}
        >
          <Image
            src="/principal.webp"
            alt="Pauli Belen"
            width={96}
            height={96}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* Name */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
            Pauli Belen
          </h1>
          <p style={{ color: "#71717a", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
            @paulibelen1 · Content Creator 🇦🇷
          </p>
        </div>

        {/* Safe links */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {safeLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "0.875rem 1.25rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.75rem",
                color: "#ffffff",
                textDecoration: "none",
                textAlign: "center",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
