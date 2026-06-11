"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { stats, achievements } from "@/data/portfolio";

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 160, damping: 20, delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className="group relative rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-6 text-center transition-all duration-300 hover:border-accent-amber/20 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)] transform-gpu"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(300px circle at 50% -20%, rgba(245,158,11,0.06), transparent 70%)" }}
      />
      {/* Masked wipe reveal — number rises behind a clip as it counts */}
      <span className="block overflow-hidden">
        <motion.p
          initial={{ y: "100%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ type: "spring", stiffness: 140, damping: 20, delay: index * 0.07 + 0.1 }}
          className="text-[clamp(2.25rem,5vw,3rem)] font-black text-gradient tabular-nums"
        >
          {inView ? <Counter to={stat.value} suffix={stat.suffix} /> : "0"}
        </motion.p>
      </span>
      <p className="mt-2 text-sm font-semibold text-white/75">{stat.label}</p>
      <p className="mt-0.5 font-mono text-xs text-white/35">{stat.note}</p>
    </motion.div>
  );
}

export function Stats() {
  const trophyRef = useRef<HTMLDivElement>(null);
  const trophyInView = useInView(trophyRef, { once: true, margin: "-40px" });

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>

      {/* Achievements — trophy case */}
      <motion.div
        ref={trophyRef}
        initial={{ opacity: 0, y: 24 }}
        animate={trophyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.15 }}
        className="mt-6 rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-7"
      >
        <p className="mb-5 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent-amber uppercase">
          <span>★</span>
          <span>Achievements</span>
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <motion.li
              key={a}
              initial={{ opacity: 0, x: -12 }}
              animate={trophyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.2 + i * 0.06 }}
              className="flex gap-3 text-sm text-white/60"
            >
              <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-amber/70" />
              {a}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
