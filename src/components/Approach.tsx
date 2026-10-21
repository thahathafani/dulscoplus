"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { approach } from "@/lib/content";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="approach" className="section-padding bg-[var(--color-bg)]">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-16" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="section-heading"
          >
            From Enquiry to Delivery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="section-body mt-4"
          >
            A clear, dependable process that keeps you informed at every step.
          </motion.p>
        </div>

        {/* Steps — vertical connected flow */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute left-5 sm:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-brand-red)]/40 via-[var(--color-border)] to-[var(--color-border)] origin-top hidden sm:block"
          />

          <div className="flex flex-col gap-0">
            {approach.map((step, i) => {
              const isLast = i === approach.length - 1;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.13, ease: "easeOut" }}
                  className="group relative flex gap-5 sm:gap-7 pb-10 last:pb-0"
                >
                  {/* Step indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isLast
                        ? "bg-[var(--color-brand-red)] text-white shadow-lg shadow-[var(--color-brand-red)]/20"
                        : "bg-[var(--color-accent-red-light)] text-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white"
                    }`}>
                      {isLast ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <span className="font-bold text-sm sm:text-base">{step.step}</span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-2.5">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--color-brand-charcoal)] leading-snug">
                        {step.title}
                      </h3>
                      {!isLast && (
                        <ArrowRight size={14} className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0" />
                      )}
                    </div>
                    <p className="text-sm sm:text-[0.9375rem] text-[var(--color-text-secondary)] leading-relaxed max-w-md">
                      {step.description}
                    </p>
                    {!isLast && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.13 }}
                        className="h-px bg-[var(--color-border)] mt-8 origin-left"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
