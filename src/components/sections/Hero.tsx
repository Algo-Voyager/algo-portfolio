"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

const HeroBackground = dynamic(
  () => import("@/components/three/HeroBackground").then((m) => m.HeroBackground),
  { ssr: false }
);

const FloatingUI = dynamic(
  () => import("@/components/three/FloatingUI").then((m) => m.FloatingUI),
  { ssr: false }
);

function WordReveal({ text, className, delayBase = 0 }: { text: string; className?: string; delayBase?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: delayBase + i * 0.07,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet px-7 py-3.5 font-semibold text-background shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-shadow hover:shadow-[0_0_60px_rgba(34,211,238,0.35)] transform-gpu"
    >
      <span className="relative z-10">Explore my work</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -40]);

  const socialLinks = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Three.js background with parallax */}
      <motion.div className="absolute inset-0 z-0 transform-gpu" style={{ y: bgY }}>
        <HeroBackground />
      </motion.div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-background" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Floating 3D interface cards — midground layer */}
      <FloatingUI />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 mx-auto max-w-5xl px-6 text-center transform-gpu"
      >
        {/* Location chip */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-white/50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          {profile.location.toUpperCase()}
        </motion.p>

        {/* Name — word-by-word spring reveal */}
        <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-black leading-[0.95] tracking-[-0.04em]">
          <WordReveal text={profile.name} delayBase={0.25} />
        </h1>

        {/* Role — gradient, staggered after name */}
        <h2 className="mt-4 text-[clamp(1.4rem,3.5vw,2.5rem)] font-semibold tracking-tight">
          <WordReveal
            text={profile.role}
            className="text-gradient"
            delayBase={0.5}
          />
        </h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.85 }}
          className="mx-auto mt-6 max-w-xl text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-white/50"
        >
          Distributed systems. Multicloud scale. Real-world impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects">Explore my work</MagneticButton>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/50 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan transform-gpu"
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-11 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 13, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}
