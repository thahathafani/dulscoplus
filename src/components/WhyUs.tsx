"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ShieldCheck, Users, Leaf } from "lucide-react";
import { differentiators } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={22} />,
  ShieldCheck: <ShieldCheck size={22} />,
  Users: <Users size={22} />,
  Leaf: <Leaf size={22} />,
};

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="section-padding bg-[var(--color-bg-muted)]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20 items-start">
          {/* Left: editorial header */}
          <div className="lg:col-span-2 lg:sticky lg:top-28" ref={ref}>
            <motion.p
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
              className="section-heading mb-5"
            >
              Built on Trust,<br />Delivered with Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.13 }}
              className="section-body"
            >
              We earn our clients confidence through operational consistency, transparent communication, and a relentless focus on safety and quality.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="h-px bg-[var(--color-brand-red)]/30 mt-8 origin-left"
            />
          </div>

          {/* Right: staggered cards */}
          <div className="lg:col-span-3 grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.09, ease: "easeOut" }}
                className="group card-base bg-white hover:bg-[var(--color-bg-warm)] flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-red-light)] text-[var(--color-brand-red)] flex items-center justify-center group-hover:bg-[var(--color-brand-red)] group-hover:text-white transition-all duration-300">
                  {iconMap[item.icon]}
                </div>
                <div>
                  <h3 className="text-[0.9375rem] font-bold text-[var(--color-brand-charcoal)] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
