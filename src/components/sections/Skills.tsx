"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skills } from "@/data/portfolio";

const icon = (name: string) => `/icons/${name}.svg`;

type Orbit = { icons: { src: string; alt: string }[]; radius: number; duration: number; reverse?: boolean };

const orbits: Orbit[] = [
  {
    radius: 110,
    duration: 26,
    icons: [
      { src: icon("java"), alt: "Java" },
      { src: icon("python"), alt: "Python" },
      { src: icon("typescript"), alt: "TypeScript" },
      { src: icon("go"), alt: "Go" },
    ],
  },
  {
    radius: 180,
    duration: 36,
    reverse: true,
    icons: [
      { src: icon("aws"), alt: "AWS" },
      { src: icon("azure"), alt: "Azure" },
      { src: icon("gcp"), alt: "GCP" },
      { src: icon("docker"), alt: "Docker" },
      { src: icon("kubernetes"), alt: "Kubernetes" },
    ],
  },
  {
    radius: 250,
    duration: 46,
    icons: [
      { src: icon("react"), alt: "React" },
      { src: icon("nodejs"), alt: "Node.js" },
      { src: icon("spring"), alt: "Spring" },
      { src: icon("postgresql"), alt: "PostgreSQL" },
      { src: icon("mongodb"), alt: "MongoDB" },
      { src: icon("redis"), alt: "Redis" },
    ],
  },
];

function OrbitRing({ orbit }: { orbit: Orbit }) {
  const n = orbit.icons.length;
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.06]"
      style={{
        width: orbit.radius * 2,
        height: orbit.radius * 2,
        marginLeft: -orbit.radius,
        marginTop: -orbit.radius,
        animation: `spin ${orbit.duration}s linear infinite${orbit.reverse ? " reverse" : ""}`,
      }}
    >
      {orbit.icons.map((ic, i) => {
        const angle = (i / n) * 2 * Math.PI;
        const x = orbit.radius + orbit.radius * Math.cos(angle);
        const y = orbit.radius + orbit.radius * Math.sin(angle);
        return (
          <motion.div
            key={ic.alt}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-white/10 bg-white p-2 shadow-lg transition-shadow hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transform-gpu"
            style={{
              left: x,
              top: y,
              animation: `spin ${orbit.duration}s linear infinite${orbit.reverse ? "" : " reverse"}`,
            }}
            title={ic.alt}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ic.src} alt={ic.alt} className="h-full w-full object-contain" loading="lazy" />
          </motion.div>
        );
      })}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="03 — Skills"
        title="My tech stack"
        subtitle="The tools I reach for to build and ship at scale."
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Constellation orbit */}
        <div className="relative hidden h-[560px] w-full lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            {orbits.map((o) => (
              <OrbitRing key={o.radius} orbit={o} />
            ))}
            {/* Core */}
            <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet shadow-[0_0_60px_rgba(34,211,238,0.5),0_0_120px_rgba(34,211,238,0.2)]">
              <span className="font-mono text-2xl font-black text-background">{"{ }"}</span>
            </div>
          </div>
        </div>

        {/* Categorized skill groups */}
        <div className="space-y-6">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.07}>
              <div className="rounded-[var(--radius-card)] border border-white/[0.06] bg-[var(--bg-surface)] p-4">
                <h3 className="mb-3 font-mono text-xs tracking-[0.2em] text-accent-violet/70 uppercase">
                  {group.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="cursor-default rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-white/60 transition-colors hover:border-accent-cyan/30 hover:text-white/90 transform-gpu"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
