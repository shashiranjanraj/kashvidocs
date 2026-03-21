"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildingNow } from "../_data/content";
import { SectionHeading } from "./SectionHeading";

export function BuildingNowSection() {
  return (
    <section id="building" className="mb-20 scroll-mt-24 sm:mb-28">
      <SectionHeading eyebrow="Now" title={buildingNow.title} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-indigo-500/25 bg-indigo-950/30 p-6 ring-1 ring-indigo-500/20 sm:p-8"
      >
        <p className="leading-relaxed text-zinc-300">{buildingNow.body}</p>
        <Link
          href={buildingNow.kashviDocsHref}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
        >
          Open Kashvi docs
          <span aria-hidden>→</span>
        </Link>
      </motion.div>
    </section>
  );
}
