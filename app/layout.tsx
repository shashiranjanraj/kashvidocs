import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kashvi Docs",
    template: "%s · Kashvi Docs",
  },
  description: "Documentation for the Kashvi framework.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-white text-zinc-950 antialiased selection:bg-indigo-500/30 dark:bg-[#0a0a0a] dark:text-zinc-50 dark:selection:bg-indigo-500/30`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
