"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "../_data/content";

const badgeStyles: Record<string, string> = {
  "Open Source":
    "border-emerald-400/45 bg-emerald-500/15 text-emerald-100 shadow-[0_0_24px_-4px_rgba(52,211,153,0.35)]",
  "Custom Built":
    "border-violet-400/40 bg-violet-500/15 text-violet-100 shadow-[0_0_24px_-4px_rgba(167,139,250,0.3)]",
  "Built from Scratch":
    "border-amber-400/45 bg-amber-500/15 text-amber-100 shadow-[0_0_24px_-4px_rgba(251,191,36,0.25)]",
};

export function KashviHighlight() {
  const k = profile.kashvi;

  return (
    <section id="kashvi" className="relative z-10 mb-24 scroll-mt-20 sm:mb-32">
      {/* Pull forward visually: first thing after hero */}
      <div className="relative">
        {/* Animated rim — draws the eye before copy */}
        <div className="absolute -inset-[1px] rounded-[1.75rem] bg-gradient-to-br from-emerald-400/70 via-fuchsia-500/40 to-indigo-500/60 opacity-90 blur-[1px]" />
        <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_80px_-20px_rgba(16,185,129,0.35),0_40px_100px_-30px_rgba(99,102,241,0.25)]"
        >
          {/* Background layers */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(52,211,153,0.22),transparent_55%)]" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[24rem] w-[24rem] rounded-full bg-indigo-600/15 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
              {/* Left: hierarchy = badges → headline → hook → CTAs */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400/90 sm:text-[11px]">
                      Flagship work
                    </span>
                    <span className="hidden h-px flex-1 min-w-[2rem] bg-gradient-to-r from-emerald-500/50 to-transparent sm:block" />
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.07 } },
                    }}
                  >
                    {k.showcaseBadges.map((label) => (
                      <motion.span
                        key={label}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide sm:px-3.5 sm:py-2 sm:text-xs ${badgeStyles[label] ?? "border-white/20 bg-white/5 text-zinc-200"}`}
                      >
                        {label === "Open Source" && (
                          <svg className="mr-1.5 h-3.5 w-3.5 opacity-90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.8 8.21 11.39.6.11.79-.26.79-.58 0-.29-.01-1.13-.02-2.22-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.85 2.81 1.32 3.49 1 .1-.79.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.41c1.02.01 2.05.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.19.69.8.58C20.57 21.8 24 17.31 24 12 24 5.37 18.63 0 12 0z" />
                          </svg>
                        )}
                        {label === "Custom Built" && (
                          <span className="mr-1.5 text-[10px]" aria-hidden>
                            ⚙
                          </span>
                        )}
                        {label === "Built from Scratch" && (
                          <span className="mr-1.5 text-[10px]" aria-hidden>
                            ✦
                          </span>
                        )}
                        {label}
                      </motion.span>
                    ))}
                  </motion.div>

                  <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                    <Image
                      src="/kashvi.png"
                      alt="Kashvi"
                      width={180}
                      height={62}
                      className="h-11 w-auto drop-shadow-[0_0_20px_rgba(52,211,153,0.25)] sm:h-12"
                      priority
                    />
                  </div>

                  <h2 className="font-black tracking-tighter text-white">
                    <span className="block text-4xl leading-[0.95] sm:text-5xl lg:text-6xl xl:text-7xl">{k.title}</span>
                    <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                      {k.titleAccent}
                    </span>
                  </h2>

                  <p className="max-w-2xl text-base font-medium leading-relaxed text-white sm:text-lg lg:text-xl">
                    <span className="text-emerald-300/95">{k.recruiterHook}</span>
                  </p>

                  <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">{k.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {k.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 backdrop-blur-sm sm:text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick stats — scannable proof */}
                <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-6 sm:gap-6">
                  {k.quickStats.map((row) => (
                    <div key={row.label} className="text-center sm:text-left">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:text-xs">{row.label}</dt>
                      <dd className="mt-1 text-xs font-semibold text-zinc-100 sm:text-sm">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Primary CTA dominates */}
                <div className="mt-8 flex flex-col gap-3 sm:mt-10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <motion.a
                      href={k.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 px-8 py-4 text-base font-black text-emerald-950 shadow-[0_0_40px_-8px_rgba(52,211,153,0.65),0_12px_40px_-12px_rgba(20,184,166,0.5)] ring-2 ring-emerald-300/50 transition hover:shadow-[0_0_50px_-6px_rgba(52,211,153,0.75)] sm:min-w-[260px] sm:flex-none sm:px-10 sm:text-lg"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <span className="relative">Explore Kashvi</span>
                      <span className="relative text-xl transition group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </motion.a>
                    <Link
                      href="/docs"
                      className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10 sm:flex-none sm:px-8 sm:text-base"
                    >
                      Read the docs
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <Link
                      href="/profile/kashvi"
                      className="font-semibold text-emerald-400/90 underline-offset-4 transition hover:text-emerald-300 hover:underline"
                    >
                      Full story &amp; context
                    </Link>
                    <span className="hidden text-zinc-600 sm:inline">·</span>
                    <a
                      href="https://github.com/shashiranjanraj/kashvi"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-zinc-400 transition hover:text-white"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.8 8.21 11.39.6.11.79-.26.79-.58 0-.29-.01-1.13-.02-2.22-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.85 2.81 1.32 3.49 1 .1-.79.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.41c1.02.01 2.05.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.19.69.8.58C20.57 21.8 24 17.31 24 12 24 5.37 18.63 0 12 0z" />
                      </svg>
                      Source on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: terminal — secondary focal point */}
              <div className="flex w-full flex-col justify-between lg:max-w-md lg:flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                  className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-black/50 p-5 font-mono shadow-[0_0_40px_-12px_rgba(52,211,153,0.25)] ring-1 ring-emerald-500/20"
                >
                  <div className="mb-4 flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500/90 shadow-sm" />
                      <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-sm" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-sm" />
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-500/80">go · kashvi</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-zinc-300 sm:text-xs">
                    <span className="text-emerald-500/90">$ </span>
                    <span className="text-zinc-500"># author-owned stack</span>
                    {"\n\n"}
                    <span className="text-violet-400">package</span> main{"\n\n"}
                    <span className="text-zinc-500">// CLI · ORM · queues · realtime</span>
                    {"\n"}
                    <span className="text-emerald-400/90">go run . serve</span>
                    <span className="inline-block h-4 w-0.5 animate-pulse bg-emerald-400 align-middle" />
                  </pre>
                </motion.div>

                <p className="mt-5 text-center text-[11px] leading-relaxed text-zinc-500 lg:text-left">
                  Recruiters: this is <span className="font-semibold text-zinc-400">original IP</span> — design, implementation, and
                  documentation shipped end-to-end.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
