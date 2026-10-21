"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, CheckCircle2, Globe2, Handshake } from "lucide-react";

const pillars = [
  { icon: CheckCircle2, label: "HSE-First Operations" },
  { icon: Globe2, label: "Qatar National Vision 2030" },
  { icon: Award, label: "Compliance-Grade Standards" },
  { icon: Handshake, label: "Long-Term Partnerships" },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section aria-label="Value propositions" className="bg-[var(--color-bg-muted)] border-y border-[var(--color-border)] py-5 sm:py-7">
      <div className="container-wide">
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-2.5 sm:gap-3"
            >
              <pillar.icon size={16} className="text-[var(--color-brand-red)] flex-shrink-0" strokeWidth={2.5} />
              <span className="text-xs sm:text-sm font-semibold text-[var(--color-brand-charcoal)] leading-tight">
                {pillar.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
