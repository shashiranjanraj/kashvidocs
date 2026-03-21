"use client";

import { motion } from "framer-motion";
import { githubStatsDummy } from "../_data/content";

export function GithubStatsCard() {
  const s = githubStatsDummy;
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 ring-1 ring-white/5"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{s.label}</p>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-white">{s.repos}</p>
          <p className="text-[11px] text-zinc-500">Repos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{s.stars}</p>
          <p className="text-[11px] text-zinc-500">Stars</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{s.contributions}</p>
          <p className="text-[11px] text-zinc-500">Contribs/yr</p>
        </div>
      </div>
    </motion.aside>
  );
}
