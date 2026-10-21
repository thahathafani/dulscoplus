"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Leaf,
  ShieldCheck,
  Package,
  Settings,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={26} />,
  Leaf: <Leaf size={26} />,
  ShieldCheck: <ShieldCheck size={26} />,
  Package: <Package size={26} />,
  Settings: <Settings size={26} />,
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding bg-[var(--color-bg)]">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="section-heading"
          >
            Integrated Solutions,<br />End to End
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="section-body mt-4"
          >
            From workforce management to environmental care, we bring proven expertise across a wide range of service disciplines.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <div className="card-base group flex flex-col h-full">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-red-light)] text-[var(--color-brand-red)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[var(--color-brand-red)] group-hover:text-white">
        {iconMap[service.icon]}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-[var(--color-brand-charcoal)] mb-3 leading-snug">
        {service.title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
        {service.description}
      </p>

      {/* CTA */}
      <Link
        href={service.href}
        className="inline-flex items-center gap-1.5 mt-6 text-[var(--color-brand-red)] text-sm font-semibold group/link hover:gap-2.5 transition-all duration-200"
        aria-label={`Enquire about ${service.title}`}
      >
        Enquire Now
        <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
      </Link>
    </div>
  );
}
