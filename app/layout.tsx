import type { Metadata } from "next";
// Self-hosted fonts (no network fetch at build - works behind TLS-intercepting proxies)
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Any WeCon - Freelance Developer",
  description:
    "Custom web, mobile & desktop apps for businesses. Offline-first, licensed, delivered.",
  openGraph: {
    title: "Any WeCon - Freelance Developer",
    description: "Custom web, mobile & desktop apps. Offline-first, licensed, delivered.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body className="bg-ink text-fog font-body antialiased">{children}</body>
    </html>
  );
}
