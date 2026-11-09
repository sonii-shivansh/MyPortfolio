import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import "./spatial.css";
import "./responsive.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111211" };
export const metadata: Metadata = {
  metadataBase: new URL("https://shivansh-soni.vercel.app"),
  title: "Shivansh Soni — Backend & AI Engineer",
  description: "Java backends. Connected services. A new chapter in AI. Explore Shivansh Soni’s work across enterprise banking, event-driven architecture, and AI-native engineering.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Shivansh Soni — Engineering beyond the interface.", description: "Backend engineering, connected systems, and AI-native platforms.", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Shivansh Soni — Backend & AI Engineer", images: ["/og-image.png"] },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
