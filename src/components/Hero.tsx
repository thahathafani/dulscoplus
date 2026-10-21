"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { hero } from "@/lib/content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Hero() {
  const lines = hero.headline.split("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Dulsco Plus operations team in Qatar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-charcoal)]/85 via-[var(--color-brand-charcoal)]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-charcoal)]/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide py-24 lg:py-32">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-red)] animate-pulse" />
            <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">
              Qatar — Integrated Services
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.1] text-white tracking-tight mb-6">
            {lines.map((line, i) => (
              <motion.span
                key={i}
                custom={i + 1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className={`block ${i === 1 ? "text-[var(--color-brand-red)]" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Sub-headline */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <Link href={hero.primaryCta.href} className="btn-primary text-base py-3 px-7">
              {hero.primaryCta.label}
              <ArrowRight size={17} />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold text-base rounded-md py-3 px-7 transition-all duration-200"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center pb-8 gap-1"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-white/40 animate-bounce" size={18} />
      </motion.div>
    </section>
  );
}
