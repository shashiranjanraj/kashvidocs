"use client";

import { motion } from "framer-motion";
import { about } from "../_data/content";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="mb-20 scroll-mt-24 sm:mb-28">
      <SectionHeading
        eyebrow="About"
        title="Practical engineer, systems-first mindset"
        description="Short version: I like useful software that survives contact with production."
      />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-4 text-zinc-400"
        >
          {about.paragraphs.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 ring-1 ring-white/5"
        >
          <li className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Strengths</li>
          {about.strengths.map((s) => (
            <li
              key={s}
              className="flex gap-3 border-b border-white/5 py-3 text-sm text-zinc-300 last:border-0 last:pb-0"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400/80" />
              {s}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
