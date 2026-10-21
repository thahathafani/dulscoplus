"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { hero } from "@/lib/content";

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
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Dulsco Plus operations in Qatar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        {/* Layered gradient overlays — navy/charcoal editorial tones */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e2c]/92 via-[#0f1e2c]/72 to-[#0f1e2c]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e2c]/60 via-transparent to-[#0f1e2c]/25" />
        {/* Subtle green-tinted accent glow */}
        <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-gradient-to-tr from-[#2a7a5a]/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-[5.5rem] pb-12 lg:pb-16">
        <div className="container-wide w-full">
          <div className="max-w-[680px]">
            {/* Eyebrow line */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 mb-8"
            >
              <span className="block w-10 h-px bg-[var(--color-brand-red)]" />
              <span className="text-white/70 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
                Qatar — Integrated Services
              </span>
            </motion.div>

            {/* Headline — large editorial type */}
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
        <span className="text-white/40 text-[0.625rem] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <ChevronDown className="text-white/30 animate-bounce" size={16} />
      </motion.div>
    </section>
  );
}
