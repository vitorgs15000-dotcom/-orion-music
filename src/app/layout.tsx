import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Orion Music",
  description: "MVP real de um app musical futurista premium.",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#050712",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
