"use client";

import { motion } from "framer-motion";
import { experience } from "../_data/content";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-20 scroll-mt-24 sm:mb-28">
      <SectionHeading
        eyebrow="Timeline"
        title="Experience"
        description="Leadership through code, reviews, and clear system boundaries."
      />
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-white/20 to-transparent sm:left-3" />
        <ul className="space-y-10">
          {experience.map((job, i) => (
            <motion.li
              key={job.period}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative pl-8 sm:pl-12"
            >
              <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center sm:left-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] ring-4 ring-zinc-950" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">{job.period}</p>
              <h3 className="mt-1 text-lg font-bold text-white">{job.title}</h3>
              <p className="text-sm text-zinc-500">{job.company}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
