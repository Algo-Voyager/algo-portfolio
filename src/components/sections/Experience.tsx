"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";

function ExperienceCard({ job, index }: { job: (typeof experience)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 140, damping: 20, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Number watermark */}
      <div
        className="pointer-events-none absolute -top-4 right-6 select-none font-black text-[6rem] leading-none text-white/[0.025] transition-all duration-700 group-hover:text-white/[0.05]"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-7 transition-all duration-500 group-hover:border-accent-cyan/20 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(600px circle at 30% 0%, rgba(34,211,238,0.04), transparent 60%)" }}
        />

        <div className="relative">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-[1.4rem] font-bold leading-tight">
                {job.role}
              </h3>
              <p className="mt-1 text-lg font-semibold text-accent-cyan">
                {job.company}
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-white/35 tabular-nums">{job.period}</span>
              <p className="mt-0.5 font-mono text-xs text-white/25">{job.location}</p>
            </div>
          </div>

          {/* Separator */}
          <div className="my-5 h-px w-full bg-white/[0.07]" />

          {/* Points */}
          <ul className="space-y-3">
            {job.points.map((pt, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.2 + j * 0.05 }}
                className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/60"
              >
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent-violet" />
                <span>{pt}</span>
              </motion.li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="mt-6 flex flex-wrap gap-2">
            {job.stack.map((s) => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.06, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="cursor-default rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-xs text-white/45 transition-colors hover:border-accent-cyan/30 hover:text-accent-cyan/80 transform-gpu"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-24">
      <SectionHeading
        index="02 — Experience"
        title="Where I've worked"
        subtitle="Building production systems that scale."
      />
      <div className="space-y-6">
        {experience.map((job, i) => (
          <ExperienceCard key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
