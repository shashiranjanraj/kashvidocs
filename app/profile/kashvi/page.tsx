import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProfileShell } from "../_components/ProfileShell";
import { profile } from "../_data/content";

export const metadata: Metadata = {
  title: "Kashvi — Golang Framework",
  description:
    "Kashvi is a Golang framework for scalable backends: microservices, clean architecture, and developer productivity. Built by Shashi Ranjan.",
};

export default function KashviProfilePage() {
  const k = profile.kashvi;
  return (
    <ProfileShell>
      {/* Primary navigation: back to documentation */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/docs"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-white"
        >
          <span aria-hidden className="text-lg leading-none">
            ←
          </span>
          Back to Docs
        </Link>
        <Link href="/profile" className="text-sm font-medium text-zinc-500 transition hover:text-zinc-300">
          ← Full profile
        </Link>
      </div>

      <article className="relative overflow-hidden rounded-3xl border border-emerald-500/35 bg-gradient-to-br from-emerald-950/90 via-zinc-950 to-indigo-950/80 p-8 shadow-2xl shadow-emerald-900/25 sm:p-12 lg:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

        <header className="relative max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-100">
              {k.badge}
            </span>
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-zinc-300">
              Major product · not a demo
            </span>
          </div>

          <div className="mb-8 flex items-center gap-4">
            <Image src="/kashvi.png" alt="Kashvi" width={160} height={56} className="h-12 w-auto sm:h-14" priority />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {k.title} — {k.titleAccent}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-emerald-100/90 sm:text-xl">{k.description}</p>

          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            Most developers use frameworks. A smaller group <span className="text-zinc-200">authors</span> one. Kashvi
            is my answer to recurring pain: too much boilerplate, too little structure, and docs that don&apos;t match
            how teams actually ship. It&apos;s Go-first, microservice-friendly, and opinionated where it helps — flexible
            where your domain matters.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {k.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-zinc-100"
              >
                {t}
              </span>
            ))}
            <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              Golang expertise
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={k.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-300"
            >
              Visit Website
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Documentation
            </Link>
            <a
              href="https://github.com/shashiranjanraj/kashvi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/25 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </header>

        <section className="relative mt-14 grid gap-8 border-t border-white/10 pt-12 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400/90">Why it exists</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
              <li className="flex gap-2">
                <span className="text-emerald-500">—</span>
                Clean architecture hooks so services don&apos;t turn into spaghetti as they grow.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">—</span>
                Batteries included where it saves weeks: routing, validation, auth patterns, jobs, realtime.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">—</span>
                Documentation you can follow without guessing — this very site is the proof.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-xs text-zinc-300 ring-1 ring-white/5">
            <p className="mb-3 text-[10px] uppercase tracking-wider text-zinc-500">From the creator</p>
            <p className="leading-relaxed text-zinc-400">
              &ldquo;Kashvi is the framework I wished existed when I was tired of stitching the same infra story on
              every new service. If you care about Go, clarity, and shipping — start with the site, then dig into the
              docs.&rdquo;
            </p>
            <p className="mt-4 text-emerald-400/90">— Shashi Ranjan</p>
          </div>
        </section>

        <div className="relative mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-10">
          <p className="text-sm text-zinc-500">Continue reading in the official documentation.</p>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
          >
            ← Back to Docs
          </Link>
        </div>
      </article>
    </ProfileShell>
  );
}
