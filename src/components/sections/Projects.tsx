"use client";

import { useRef, MouseEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/portfolio";

/* ── Desktop: museum exhibit card inside the horizontal track ── */
function ExhibitCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="group relative flex h-[60vh] w-[56vw] max-w-[780px] shrink-0 flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-10">
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(700px circle at 20% 0%, ${project.accent}16, transparent 60%)` }}
      />
      {/* Ghost exhibit number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-4 select-none font-black leading-none text-white/[0.03]"
        style={{ fontSize: "16rem" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl font-black text-2xl"
            style={{ background: `${project.accent}18`, color: project.accent }}
          >
            {project.name[0]}
          </div>
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan transform-gpu"
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          )}
        </div>

        <h3 className="mt-8 text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-[1.75] text-white/55">
          {project.blurb}
        </p>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/[0.08] px-3 py-1.5 font-mono text-xs text-white/40"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile / tablet fallback: vertical tilt cards ── */
function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 130, damping: 20, delay: index * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-8 transition-all duration-500 hover:border-white/[0.15] transform-gpu"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(500px circle at 30% 0%, ${project.accent}18, transparent 65%)` }}
      />
      <div style={{ transform: "translateZ(24px)" }} className="relative">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl font-black text-xl"
            style={{ background: `${project.accent}18`, color: project.accent }}
          >
            {project.name[0]}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
        <h3 className="mt-4 text-xl font-bold">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">{project.blurb}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md border border-white/[0.08] px-2.5 py-1 font-mono text-xs text-white/40">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });
  // 4 cards × 56vw + gaps + lead-in padding ≈ 250vw of track; travel the overflow
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-158vw"]);

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <SectionHeading
          index="04 — Projects"
          title="Things I've built"
          subtitle="Scroll through the gallery — each project is an exhibit."
        />
      </div>

      {/* Desktop: pinned horizontal narrative */}
      <div ref={trackRef} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-10 pl-[8vw] transform-gpu">
            {projects.map((p, i) => (
              <ExhibitCard key={p.name} project={p} index={i} />
            ))}
          </motion.div>

          {/* Tour progress */}
          <div className="mx-auto mt-10 h-px w-48 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent-cyan to-accent-violet"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 pt-2 md:grid-cols-2 lg:hidden" style={{ perspective: 1200 }}>
        {projects.map((p, i) => (
          <TiltCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
