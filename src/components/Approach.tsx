"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { approach } from "@/lib/content";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Approach() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="approach"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1520 0%, #0f1c2a 100%)" }}
    >
      {/* Dotted background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Glow accents */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,64,42,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,48,64,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container-wide">
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20" ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-brand-red)] text-xs font-bold tracking-[0.12em] uppercase mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-white font-bold leading-[1.15] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            From Enquiry to Delivery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-white/55 text-[1.0625rem] leading-[1.75]"
          >
            A clear, dependable process that keeps you informed at every step.
          </motion.p>
        </div>

        {/* Steps — horizontal scroll-snap on mobile, grid on desktop */}
        <div className="relative">
          {/* Desktop: horizontal connector bar */}
          <div className="hidden lg:block absolute top-[3.75rem] left-0 right-0 z-0 px-16">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              className="h-px origin-left"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-brand-red) 0%, rgba(232,64,42,0.3) 60%, transparent 100%)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {approach.map((step, i) => {
              const isLast = i === approach.length - 1;
              return (
                <StepCard key={step.step} step={step} index={i} isLast={isLast} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  isLast,
}: {
  step: { step: string; title: string; description: string };
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-start lg:items-center"
    >
      {/* Number badge */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.25 + index * 0.15, type: "spring", bounce: 0.4 }}
        className={`relative z-10 mb-6 w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isLast
            ? "bg-[var(--color-brand-red)] text-white shadow-2xl shadow-[var(--color-brand-red)]/30"
            : "bg-white/10 backdrop-blur-sm border border-white/20 text-white group-hover:bg-[var(--color-brand-red)] group-hover:border-[var(--color-brand-red)] group-hover:shadow-xl group-hover:shadow-[var(--color-brand-red)]/25"
        }`}
      >
        {isLast ? (
          <CheckCircle2 size={28} />
        ) : (
          <span className="font-black text-xl tracking-tight">{step.step}</span>
        )}

        {/* Animated ring on hover */}
        <span
          className="absolute inset-0 rounded-2xl border-2 border-[var(--color-brand-red)] opacity-0 group-hover:opacity-100 scale-[1.18] group-hover:scale-100 transition-all duration-300"
        />
      </motion.div>

      {/* Content */}
      <div className="lg:text-center">
        <div className="flex lg:justify-center items-center gap-2.5 mb-2.5">
          <h3 className="font-bold text-white text-base lg:text-[1.0625rem] leading-snug">
            {step.title}
          </h3>
          {!isLast && (
            <ArrowRight
              size={13}
              className="text-[var(--color-brand-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 flex-shrink-0"
            />
          )}
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">
          {step.description}
        </p>
      </div>

      {/* Left border accent (mobile) */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
        className="lg:hidden absolute left-[2.2rem] top-[4.5rem] bottom-0 w-px bg-gradient-to-b from-[var(--color-brand-red)]/50 to-transparent origin-top last:hidden"
      />
    </motion.div>
  );
}
