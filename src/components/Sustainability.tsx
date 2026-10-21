"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Leaf, ShieldCheck, Heart } from "lucide-react";
import { sustainability } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={22} />,
  ShieldCheck: <ShieldCheck size={22} />,
  Heart: <Heart size={22} />,
};

export default function Sustainability() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sustainability" className="section-padding bg-[var(--color-bg-warm)]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.p
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-3"
            >
              {sustainability.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="section-heading mb-5"
            >
              {sustainability.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="section-body mb-10"
            >
              {sustainability.body}
            </motion.p>

            <div className="flex flex-col gap-5">
              {sustainability.pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[var(--color-accent-red-light)] text-[var(--color-brand-red)] flex items-center justify-center mt-0.5">
                    {iconMap[pillar.icon]}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-brand-charcoal)] text-base mb-1">{pillar.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden aspect-[16/11] shadow-xl"
          >
            <Image
              src="/sustainability.png"
              alt="Sustainability operations in Qatar"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-charcoal)]/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
