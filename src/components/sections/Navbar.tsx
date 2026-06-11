"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 80) { setVisible(true); }
      else { setVisible(y < lastY.current); }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
        >
          <div
            className={`flex items-center gap-8 rounded-full px-6 py-3 transition-all duration-300 ${
              scrolled
                ? "border border-white/[0.1] bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            }`}
          >
            <a
              href="#"
              className="font-mono text-sm font-bold tracking-tight text-gradient"
            >
              {"<PK/>"}
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </nav>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-1.5 font-mono text-xs font-medium text-accent-cyan transition-colors hover:border-accent-cyan/60 hover:bg-accent-cyan/20"
            >
              Hire me
            </motion.a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      href={href}
      style={{ x: springX }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
      }}
      onMouseLeave={() => x.set(0)}
      className="relative text-sm text-white/50 transition-colors hover:text-white/90 transform-gpu"
    >
      {label}
    </motion.a>
  );
}
