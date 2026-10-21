"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/content";

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-[var(--color-bg-warm)]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/about.jpg"
                alt="Dulsco Plus professional team in Qatar"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Decorative accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--color-brand-charcoal)]/30 to-transparent" />

              {/* Stat overlay card
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-5 flex justify-between">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-[var(--color-brand-red)] font-bold text-lg leading-tight">{stat.value}</p>
                    <p className="text-[var(--color-text-muted)] text-xs font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </AnimatedSection>

          {/* Text content */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.1}>
              <p className="eyebrow">{about.eyebrow}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <h2 className="section-heading">{about.heading}</h2>
            </AnimatedSection>
            <div className="flex flex-col gap-4">
              {about.body.map((para, i) => (
                <AnimatedSection key={i} delay={0.2 + i * 0.07}>
                  <p className="section-body">{para}</p>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={0.4}>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-px flex-1 bg-[var(--color-border)]" />
                <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-widest">
                  Qatar National Vision 2030 Aligned
                </span>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
