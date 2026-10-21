"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { approach } from "@/lib/content";

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="approach" className="section-padding bg-[var(--color-bg)]">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            ref={ref}
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

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-[var(--color-border)] -z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {approach.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start lg:items-center text-left lg:text-center"
              >
                {/* Step bubble */}
                <div className="relative z-10 w-12 h-12 rounded-full border-2 border-[var(--color-brand-red)] bg-white flex items-center justify-center mb-5">
                  <span className="text-[var(--color-brand-red)] font-bold text-sm">{step.step}</span>
                </div>

                <h3 className="text-base font-bold text-[var(--color-brand-charcoal)] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
