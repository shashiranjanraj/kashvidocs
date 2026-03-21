"use client";

import { motion } from "framer-motion";
import { blogPosts, profile } from "../_data/content";
import { SectionHeading } from "./SectionHeading";

const sourceStyles: Record<string, string> = {
  Medium: "border-amber-500/35 bg-amber-500/10 text-amber-200",
  LinkedIn: "border-sky-500/35 bg-sky-500/10 text-sky-200",
};

export function BlogSection() {
  return (
    <section id="blog" className="mb-20 scroll-mt-24 sm:mb-28">
      <SectionHeading
        eyebrow="Writing"
        title="Articles & posts"
        description={
          <>
            Long-form pieces on Go, system design, and when to reach for AI — on{" "}
            <a
              href={profile.social.medium}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-400/95 hover:text-emerald-300"
            >
              Medium
            </a>{" "}
            and{" "}
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-400/95 hover:text-emerald-300"
            >
              LinkedIn
            </a>
            .
          </>
        }
      />
      <ul className="flex flex-col gap-4">
        {blogPosts.map((post, i) => (
          <motion.li
            key={post.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 ring-1 ring-white/5 transition hover:border-emerald-500/30 hover:bg-zinc-900/80 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
            >
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${sourceStyles[post.source] ?? "border-white/20 bg-white/5 text-zinc-300"}`}
                >
                  {post.source}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-white transition group-hover:text-emerald-200 sm:text-lg">
                  {post.title}
                </h3>
              </div>
              <span className="flex-shrink-0 text-sm font-semibold text-emerald-400/90 transition group-hover:translate-x-0.5 group-hover:text-emerald-300">
                Read →
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
