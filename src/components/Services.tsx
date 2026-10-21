"use client";

import React, { useRef } from "react";
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
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-[var(--color-bg-warm)]"
    >
      {/* Dotted background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(29, 23, 55, 0.1) 1.5px, transparent 0.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Radial fade mask so dots fade toward edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,var(--color-bg-warm)_100%)]" />

      <div className="relative z-10 container-wide">
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
            Integrated Solutions,
            <br />
            End to End
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="section-body mt-4"
          >
            From workforce management to environmental care, we bring proven
            expertise across a wide range of service disciplines.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
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
    <div className="card-dotted group flex flex-col h-full">
      {/* Subtle inner dot pattern on hover */}
      <div
        className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(232,64,42,0.06) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 w-13 h-13 rounded-xl bg-[var(--color-accent-red-light)] text-[var(--color-brand-red)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[var(--color-brand-red)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--color-brand-red)]/20"
        style={{ width: "3.25rem", height: "3.25rem" }}
      >
        {iconMap[service.icon]}
      </div>

      {/* Content */}
      <h3 className="relative z-10 text-lg font-bold text-[var(--color-brand-charcoal)] mb-3 leading-snug">
        {service.title}
      </h3>
      <p className="relative z-10 text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
        {service.description}
      </p>

      {/* CTA */}
      <Link
        href={service.href}
        className="relative z-10 inline-flex items-center gap-1.5 mt-6 text-[var(--color-brand-red)] text-sm font-semibold group/link hover:gap-2.5 transition-all duration-200"
        aria-label={`Enquire about ${service.title}`}
      >
        Enquire Now
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </Link>
    </div>
  );
}
