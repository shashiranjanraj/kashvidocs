"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "../_data/content";
import { HeroTyping } from "./HeroTyping";

export function HeroSection() {
  return (
    <section className="relative mb-20 sm:mb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-emerald-500/5 ring-1 ring-white/5 sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {profile.location} · {profile.role}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-400 sm:text-xl">
              {profile.role} — <span className="text-zinc-200">{profile.subtitle}</span>
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">{profile.tagline}</p>
            <HeroTyping />
          </div>

          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={profile.resumePath}
              download
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              Download resume
            </Link>
            <Link
              href="/profile/kashvi"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Kashvi framework
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
