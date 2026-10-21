"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Flame,
  Heart,
  Building2,
  Landmark,
  Wrench,
  HardHat,
  Factory,
  Truck,
} from "lucide-react";
import { industries } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame size={24} />,
  Heart: <Heart size={24} />,
  Building2: <Building2 size={24} />,
  Landmark: <Landmark size={24} />,
  Wrench: <Wrench size={24} />,
  HardHat: <HardHat size={24} />,
  Factory: <Factory size={24} />,
  Truck: <Truck size={24} />,
};

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" className="section-padding bg-[var(--color-brand-charcoal)]">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <motion.p
            ref={ref}
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
            className="text-white/65 text-[1.0625rem] leading-[1.75] mt-4"
          >
            Our capabilities span the sectors that power Qatar&apos;s economy and communities.
          </motion.p>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center gap-3 bg-white/5 hover:bg-[var(--color-brand-red)]/15 border border-white/10 hover:border-[var(--color-brand-red)]/40 rounded-xl p-6 transition-all duration-250 cursor-default"
            >
              <div className="text-white/60 group-hover:text-[var(--color-brand-red)] transition-colors duration-250">
                {iconMap[industry.icon]}
              </div>
              <span className="text-white/85 font-semibold text-sm text-center leading-snug group-hover:text-white transition-colors duration-250">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
