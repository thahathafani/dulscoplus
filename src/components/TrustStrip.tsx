"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, CheckCircle2, Globe2, Handshake } from "lucide-react";

const pillars = [
  { icon: CheckCircle2, label: "HSE-First Operations" },
  { icon: Globe2, label: "Qatar National Vision 2030 Aligned" },
  { icon: Award, label: "Compliance-Grade Standards" },
  { icon: Handshake, label: "Long-Term Client Partnerships" },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section aria-label="Value propositions" className="bg-[var(--color-bg-muted)] border-y border-[var(--color-border)] py-8">
      <div className="container-wide">
        <div
          ref={ref}
          className="flex flex-wrap justify-center lg:justify-between items-center gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <pillar.icon size={18} className="text-[var(--color-brand-red)] flex-shrink-0" />
              <span className="text-sm font-semibold text-[var(--color-brand-charcoal)] whitespace-nowrap">
                {pillar.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
