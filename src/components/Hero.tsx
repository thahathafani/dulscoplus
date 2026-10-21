"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { hero } from "@/lib/content";

/* ── Animated particle canvas ─────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let mouse = { x: -9999, y: -9999 };

    type Particle = {
      x: number; y: number;
      baseX: number; baseY: number;
      vx: number; vy: number;
      size: number; opacity: number;
      color: string;
    };

    const COLORS = [
      "rgba(232,64,42,",
      "rgba(255,255,255,",
      "rgba(26,48,64,",
    ];

    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      buildGrid();
    };

    const buildGrid = () => {
      particles = [];
      const cols = Math.ceil(width / 44);
      const rows = Math.ceil(height / 44);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = (c + 0.5) * (width / cols);
          const by = (r + 0.5) * (height / rows);
          particles.push({
            x: bx, y: by,
            baseX: bx, baseY: by,
            vx: 0, vy: 0,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 120 - dist) / 120;
        p.vx += -dx * force * 0.025;
        p.vy += -dy * force * 0.025;

        // Drift back to base
        p.vx += (p.baseX - p.x) * 0.04;
        p.vy += (p.baseY - p.y) * 0.04;

        // Damping
        p.vx *= 0.78;
        p.vy *= 0.78;

        p.x += p.vx;
        p.y += p.vy;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
        ctx.fill();

        // Faint line to nearest neighbours
        for (const q of particles) {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 55 && d > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(232,64,42,${(0.06 * (1 - d / 55)).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: "block" }}
    />
  );
}

/* ── Fade-up variant ──────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.13, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
      aria-label="Hero"
      style={{ background: "linear-gradient(135deg, #0a1520 0%, #0f1e2c 50%, #1a2535 100%)" }}
    >
      {/* Interactive particle canvas */}
      <ParticleCanvas />

      {/* Radial accent glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(232,64,42,0.12) 0%, transparent 65%)",
            animation: "hero-pulse-glow 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-5%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(26,48,64,0.8) 0%, transparent 65%)",
            animation: "hero-float 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* Dotted grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-[5.5rem] pb-12 lg:pb-16">
        <div className="container-wide w-full">
          <div className="max-w-[680px]">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 mb-8"
            >
              {/* <span className="block w-10 h-px bg-[var(--color-brand-red)]" />
              <span className="text-white/70 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
                Qatar — Integrated Services
              </span> */}
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-3"
            >
              Integrated Solutions
            </motion.h1>
            <motion.h1
              custom={1.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-brand-red)] mb-8"
              aria-hidden="true"
            >
              for a Thriving Qatar
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              custom={2.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[1.0625rem] sm:text-lg text-white/75 leading-[1.7] mb-10 max-w-[540px]"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <Link href={hero.primaryCta.href} className="btn-primary text-base py-3.5 px-8">
                {hero.primaryCta.label}
                <ArrowRight size={17} />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/35 font-semibold text-base rounded-lg py-3.5 px-8 transition-all duration-250"
              >
                {hero.secondaryCta.label}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center pb-7 gap-1.5"
      >
        <span className="text-white/40 text-[0.625rem] tracking-[0.25em] uppercase font-medium">
          Scroll
        </span>
        <ChevronDown className="text-white/30 animate-bounce" size={16} />
      </motion.div>
    </section>
  );
}
