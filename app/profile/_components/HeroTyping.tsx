"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "Backend at scale.",
  "Go · microservices · clean architecture.",
  "Shipping Kashvi & real-time systems.",
];

export function HeroTyping() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-4 flex min-h-[1.75rem] items-center sm:min-h-[2rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={PHRASES[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="font-mono text-sm text-emerald-400/95 sm:text-base"
        >
          <span className="mr-2 text-zinc-600">$</span>
          {PHRASES[index]}
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-emerald-400 align-middle sm:h-5" />
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
