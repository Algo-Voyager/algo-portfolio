"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [num, label] = index.split(" — ");

  const words = title.split(" ");

  return (
    <div ref={ref} className="mb-14 overflow-hidden">
      {/* Chapter marker */}
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-white/30 uppercase"
      >
        <span className="text-accent-cyan font-semibold text-sm">{num}</span>
        <span className="h-px w-8 bg-white/20" />
        {label}
      </motion.p>

      {/* Title — word-by-word spring */}
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20,
                delay: 0.1 + i * 0.06,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.35 }}
          className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/45"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
