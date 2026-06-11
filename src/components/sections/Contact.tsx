"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { profile } from "@/data/portfolio";

const NetworkScene = dynamic(
  () => import("@/components/three/NetworkScene").then((m) => m.NetworkScene),
  { ssr: false }
);

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Github, label: "GitHub", value: "Algo-Voyager", href: profile.socials.github },
  { icon: Linkedin, label: "LinkedIn", value: "in/iampkumar", href: profile.socials.linkedin },
  { icon: Code2, label: "LeetCode", value: "vukoga · Knight", href: profile.socials.leetcode },
];

function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet px-9 py-4 text-base font-semibold text-background shadow-[0_0_50px_rgba(34,211,238,0.2)] transition-shadow hover:shadow-[0_0_80px_rgba(34,211,238,0.4)] transform-gpu"
    >
      <Mail className="h-4 w-4" />
      {children}
    </motion.a>
  );
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      {/* 3D distributed-network backdrop — data packets traveling between nodes */}
      <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]">
        <NetworkScene />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 130, damping: 20 }}
        className="text-center"
      >
        <p className="mb-3 font-mono text-xs tracking-[0.25em] text-white/30 uppercase">
          <span className="text-accent-cyan text-sm font-semibold">05</span>
          {"  —  "}Contact
        </p>

        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight leading-[1.05]">
          Let&apos;s build something{" "}
          <span className="text-gradient">great.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/45">
          Open to interesting backend, cloud, or applied-AI problems.
          Drop a line — I respond fast.
        </p>

        <MagneticCTA href={`mailto:${profile.email}`}>
          Say hello
        </MagneticCTA>
      </motion.div>

      {/* Channel cards */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.1 + i * 0.07 }}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            className="group flex flex-col items-center gap-2.5 rounded-[var(--radius-card)] border border-white/[0.07] bg-[var(--bg-surface)] p-5 transition-all duration-300 hover:border-accent-cyan/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transform-gpu"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 transition-colors group-hover:border-accent-cyan/30 group-hover:text-accent-cyan">
              <c.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-white/80">{c.label}</span>
            <span className="font-mono text-xs text-white/35">{c.value}</span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-white/[0.06] pt-8 text-center">
        <p className="text-xs text-white/25">
          Designed &amp; built by{" "}
          <span className="text-white/40">{profile.name}</span> · {new Date().getFullYear()}
        </p>
      </div>
      </div>
    </section>
  );
}
