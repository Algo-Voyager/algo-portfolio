"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Floating 3D interface cards for the hero midground — a terminal, a live
 * metrics card, and an API response. They track the cursor with spring
 * parallax (each at a different depth) and bob gently on their own loop.
 */

function useMousePosition() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return { mx, my };
}

function FloatingCard({
  mx,
  my,
  depth,
  baseRotate,
  bobDelay,
  enterDelay,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  baseRotate: number;
  bobDelay: number;
  enterDelay: number;
  className?: string;
  children: React.ReactNode;
}) {
  const spring = { stiffness: 50, damping: 18 };
  const x = useSpring(useTransform(mx, (v) => v * depth * -44), spring);
  const y = useSpring(useTransform(my, (v) => v * depth * -32), spring);
  const rotateY = useSpring(useTransform(mx, (v) => v * depth * -7), spring);
  const rotateX = useSpring(useTransform(my, (v) => v * depth * 7), spring);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay: enterDelay }}
      className={`pointer-events-none absolute z-[12] hidden lg:block ${className ?? ""}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ x, y, rotateX, rotateY, rotate: baseRotate, transformStyle: "preserve-3d" }}
        className="transform-gpu"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: bobDelay }}
          className="rounded-xl border border-white/[0.1] bg-[#0b0d12]/80 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Terminal window ── */
function TerminalCard() {
  return (
    <div className="w-[300px] font-mono text-[11px] leading-[1.7]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-white/30">prod — zsh</span>
      </div>
      <div className="px-4 py-3.5">
        <p>
          <span className="text-accent-emerald">$</span>{" "}
          <span className="text-white/75">kubectl get pods -n audit</span>
        </p>
        <p className="text-white/35">NAME{"           "}READY{"  "}STATUS</p>
        <p className="text-white/55">
          api-7d4f9{"      "}1/1{"    "}<span className="text-accent-emerald">Running</span>
        </p>
        <p className="text-white/55">
          worker-c2x{"     "}1/1{"    "}<span className="text-accent-emerald">Running</span>
        </p>
        <p className="mt-1">
          <span className="text-accent-emerald">$</span>{" "}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="inline-block h-3 w-[7px] translate-y-[2px] bg-accent-cyan"
          />
        </p>
      </div>
    </div>
  );
}

/* ── Live metrics card ── */
function MetricsCard() {
  return (
    <div className="w-[230px] px-4 py-3.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.15em] text-white/35 uppercase">
          API latency · p99
        </span>
        <span className="relative flex h-2 w-2">
          <motion.span
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald"
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
        </span>
      </div>
      <p className="mt-1.5 text-2xl font-bold tabular-nums text-white/90">
        42<span className="text-sm font-medium text-white/40">ms</span>
      </p>
      <svg viewBox="0 0 200 48" className="mt-2 h-12 w-full" fill="none">
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 38 L20 30 L40 34 L60 22 L80 26 L100 14 L120 20 L140 10 L160 16 L180 8 L200 12 L200 48 L0 48 Z"
          fill="url(#spark-fill)"
        />
        <motion.path
          d="M0 38 L20 30 L40 34 L60 22 L80 26 L100 14 L120 20 L140 10 L160 16 L180 8 L200 12"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 1.8 }}
        />
      </svg>
      <p className="mt-1 font-mono text-[10px] text-white/30">
        <span className="text-accent-emerald">▲ 99.98%</span> uptime · 30d
      </p>
    </div>
  );
}

/* ── API response card ── */
function ApiCard() {
  return (
    <div className="w-[260px] font-mono text-[11px] leading-[1.75]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <span className="rounded bg-accent-violet/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-violet">
          POST
        </span>
        <span className="text-white/45">/v1/audit/run</span>
        <span className="ml-auto text-accent-emerald">200</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-white/35">{"{"}</p>
        <p className="pl-3">
          <span className="text-accent-cyan">&quot;vms_audited&quot;</span>
          <span className="text-white/35">: </span>
          <span className="text-accent-amber">6000</span>
          <span className="text-white/35">,</span>
        </p>
        <p className="pl-3">
          <span className="text-accent-cyan">&quot;clouds&quot;</span>
          <span className="text-white/35">: [</span>
          <span className="text-accent-emerald">&quot;aws&quot;</span>
          <span className="text-white/35">, </span>
          <span className="text-accent-emerald">&quot;azure&quot;</span>
          <span className="text-white/35">, </span>
          <span className="text-accent-emerald">&quot;gcp&quot;</span>
          <span className="text-white/35">],</span>
        </p>
        <p className="pl-3">
          <span className="text-accent-cyan">&quot;calls_saved&quot;</span>
          <span className="text-white/35">: </span>
          <span className="text-accent-emerald">&quot;72%&quot;</span>
        </p>
        <p className="text-white/35">{"}"}</p>
      </div>
    </div>
  );
}

export function FloatingUI() {
  const { mx, my } = useMousePosition();

  return (
    <div className="absolute inset-0 z-[12] overflow-hidden" style={{ perspective: 1200 }}>
      <FloatingCard
        mx={mx} my={my}
        depth={1.4}
        baseRotate={-5}
        bobDelay={0}
        enterDelay={1.3}
        className="left-[3%] top-[16%] xl:left-[6%]"
      >
        <TerminalCard />
      </FloatingCard>

      <FloatingCard
        mx={mx} my={my}
        depth={2.2}
        baseRotate={4}
        bobDelay={1.6}
        enterDelay={1.5}
        className="right-[4%] top-[20%] xl:right-[7%]"
      >
        <MetricsCard />
      </FloatingCard>

      <FloatingCard
        mx={mx} my={my}
        depth={1.8}
        baseRotate={3}
        bobDelay={3}
        enterDelay={1.7}
        className="bottom-[14%] right-[8%] xl:right-[12%]"
      >
        <ApiCard />
      </FloatingCard>
    </div>
  );
}
