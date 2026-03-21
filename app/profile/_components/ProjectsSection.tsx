"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "../_data/content";
import { SectionHeading } from "./SectionHeading";

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-20 scroll-mt-24 sm:mb-28">
      <SectionHeading
        eyebrow="Work"
        title="Projects that shaped how I build"
        description="From a ground-up framework to production systems under real constraints."
      />
      <div className="grid gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className={
              project.featured
                ? "relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-zinc-900/90 to-emerald-950/30 p-6 ring-1 ring-emerald-500/20 sm:p-8"
                : "rounded-2xl border border-white/10 bg-zinc-900/40 p-6 ring-1 ring-white/5 sm:p-8"
            }
          >
            {project.featured ? (
              <span className="mb-3 inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-200">
                Featured · Product
              </span>
            ) : null}
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
            {project.href && project.cta ? (
              <div className="mt-5">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-500/40 transition hover:bg-emerald-500/30"
                >
                  {project.cta}
                  <span aria-hidden>→</span>
                </a>
              </div>
            ) : null}
            {project.featured ? (
              <Link
                href="/profile/kashvi"
                className="mt-4 inline-block text-sm font-medium text-emerald-300/90 hover:text-emerald-200"
              >
                Why Kashvi is different →
              </Link>
            ) : null}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
