"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ShieldCheck, Users, Leaf } from "lucide-react";
import { differentiators } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Users: <Users size={24} />,
  Leaf: <Leaf size={24} />,
};

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="section-padding bg-[var(--color-bg-muted)]">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-3"
          >
            Why Dulsco Plus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="section-heading"
          >
            Built on Trust,<br />Delivered with Expertise
          </motion.h2>
        </div>

        {/* Differentiators */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card-base bg-white text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-accent-red-light)] text-[var(--color-brand-red)] flex items-center justify-center mb-5">
                {iconMap[item.icon]}
              </div>
              <h3 className="text-base font-bold text-[var(--color-brand-charcoal)] mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
