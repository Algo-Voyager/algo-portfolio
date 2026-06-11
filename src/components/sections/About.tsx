"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, education } from "@/data/portfolio";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="01 — About" title="A bit about me" />

      <div ref={ref} className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Bio paragraphs */}
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 160, damping: 20, delay: i * 0.1 }}
              className="text-[1.0625rem] leading-[1.75] text-white/55"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.2 }}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
          className="group h-fit rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-accent-violet/25 hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)] transform-gpu"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(300px circle at 50% -10%, rgba(167,139,250,0.06), transparent 70%)" }}
          />
          <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent-violet/70 uppercase">
            Education
          </p>
          <p className="font-semibold leading-snug text-white/90">
            {education.school}
          </p>
          <p className="mt-2 text-sm text-white/50">{education.degree}</p>
          <p className="mt-3 font-mono text-xs text-white/30">{education.period}</p>
        </motion.div>
      </div>
    </section>
  );
}
