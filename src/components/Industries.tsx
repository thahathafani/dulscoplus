"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import {
  Leaf,
  Landmark,
  Wrench,
  HardHat,
  Factory,
  Truck,
} from "lucide-react";
import { industries } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Leaf,
  Landmark,
  Wrench,
  HardHat,
  Factory,
  Truck,
};

function IndustryCard({ industry, index, inView }: {
  industry: (typeof industries)[number];
  index: number;
  inView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);

  const Icon = iconMap[industry.icon];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.07, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mouseX.set(0.5); mouseY.set(0.5); }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-[var(--color-brand-red)]/30 rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-default"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-brand-red)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-white/[0.06] group-hover:bg-[var(--color-brand-red)]/15 flex items-center justify-center mb-4 transition-all duration-300">
          {Icon && <Icon size={22} className="text-white/50 group-hover:text-[var(--color-brand-red)] transition-colors duration-300" />}
        </div>
        <h3 className="text-white font-bold text-[0.9375rem] leading-snug mb-2 group-hover:text-white transition-colors">
          {industry.name}
        </h3>
        <p className="text-white/40 text-[0.8125rem] leading-relaxed group-hover:text-white/60 transition-colors duration-300">
          {industry.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" className="section-padding bg-[var(--color-brand-charcoal)]">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-14" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-brand-red)] text-xs font-bold tracking-widest uppercase mb-3"
          >
            Industries We Serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-white font-bold tracking-tight leading-[1.15]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Trusted Across Qatar&apos;s Key Sectors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/55 text-[1.0625rem] leading-[1.75] mt-4"
          >
            Our capabilities span the sectors that power Qatar&apos;s economy and communities.
          </motion.p>
        </div>

        {/* Industry grid — 6 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
