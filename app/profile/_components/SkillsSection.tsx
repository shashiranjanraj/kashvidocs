"use client";

import { motion } from "framer-motion";
import { skillCategories } from "../_data/content";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="mb-20 scroll-mt-24 sm:mb-28">
      <SectionHeading
        eyebrow="Stack"
        title="Tools I reach for"
        description="Golang is the headline — the rest supports shipping and operating in production."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 ring-1 ring-white/5"
          >
            <h3 className="mb-4 text-sm font-semibold text-zinc-200">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item.label}
                  className={
                    item.highlight
                      ? "rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-200"
                      : "rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300"
                  }
                >
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
