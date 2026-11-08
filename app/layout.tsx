import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://shivansh-soni-engineered.mirroredaster.chatgpt.site"),
  title: "Shivansh Soni — Backend & AI Engineer",
  description: "Java backends. Connected services. A new chapter in AI. Explore Shivansh Soni’s work across enterprise banking, event-driven architecture, and AI-native engineering.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Shivansh Soni — Engineering what’s next.", description: "Backend engineering, connected systems, and AI-native platforms.", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: "Shivansh Soni — Backend & AI Engineer", images: ["/og-image.png"] },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
