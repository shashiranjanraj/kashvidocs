import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsappFloatingButton } from "./WhatsappFloatingButton";

type Props = {
  children: ReactNode;
};

export function ProfileShell({ children }: Props) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-zinc-950 text-zinc-100">
      {/* Grid + subtle gradient — developer terminal vibe */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-emerald-950/20 via-transparent to-indigo-950/30" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-white">
            <Image src="/kashvi.png" alt="" width={100} height={36} className="h-8 w-auto opacity-90" />
            <span className="hidden sm:inline">Kashvi</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/docs"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/profile/kashvi"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              Kashvi
            </Link>
            <Link
              href="/profile#contact"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">{children}</main>

      <footer className="border-t border-white/5 py-10 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Shashi Ranjan · Built on Next.js & Tailwind</p>
      </footer>

      <WhatsappFloatingButton />
    </div>
  );
}
