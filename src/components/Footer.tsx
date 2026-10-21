"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Share2, MessageCircle, ExternalLink } from "lucide-react";
import { brand, nav, contact } from "@/lib/content";

/* ── Marching-ant SVG text for brand display ──────────── */
function SVGTextStroke({ text }: { text: string }) {
  return (
    <svg
      viewBox="0 0 900 160"
      className="w-full select-none pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stroke-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8402a" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e8402a" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        textAnchor="middle"
        y="130"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="150"
        fill="none"
        stroke="url(#stroke-grad)"
        strokeWidth="1"
        strokeDasharray="2000"
        style={{
          strokeDashoffset: 2000,
          animation: "footer-text-reveal 2.5s ease forwards 0.4s",
        }}
      >
        {text}
      </text>
    </svg>
  );
}

/* ── Radial spotlight gradient ───────────────────────── */
function FooterGradient() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="absolute inset-0 z-0 transition-all duration-300"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(232,64,42,0.12) 0%, transparent 60%)`,
      }}
    />
  );
}

const socialLinks = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Share2, label: "LinkedIn", href: brand.linkedIn },
  { icon: MessageCircle, label: "Twitter", href: brand.twitter },
  { icon: ExternalLink, label: "More", href: "#" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#0a1520] text-white/60 overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(rgba(232,64,42,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Interactive spotlight */}
      <FooterGradient />

      {/* Top border accent */}
      <div className="relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-brand-red)]/50 to-transparent" />
      </div>

      <div className="relative z-10 container-wide pt-16 pb-0">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14"
          ref={ref}
        >
          {/* Brand column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <Link href="/" aria-label={`${brand.name} home`} className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt={`${brand.name} logo`}
                width={220}
                height={70}
                className="h-16 lg:h-20 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/45 max-w-[240px]">
              {brand.description}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-7">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:border-[var(--color-brand-red)]/60 hover:text-[var(--color-brand-red)] hover:bg-[var(--color-brand-red)]/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <h3 className="text-white font-semibold text-sm mb-6 tracking-wide">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-sm text-white/45 hover:text-[var(--color-brand-red)] transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[var(--color-brand-red)] transition-all duration-300 rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services quick links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            <h3 className="text-white font-semibold text-sm mb-6 tracking-wide">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                "People Solutions",
                "Environmental Solutions",
                "Hazardous Waste",
                "Industrial Supply",
                "Technical Solutions",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="#services"
                    className="group text-sm text-white/45 hover:text-[var(--color-brand-red)] transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[var(--color-brand-red)] transition-all duration-300 rounded-full" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-sm mb-6 tracking-wide">
              Contact
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[var(--color-brand-red)] flex-shrink-0 mt-0.5" />
                <span className="text-white/45 leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[var(--color-brand-red)] flex-shrink-0" />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-white/45 hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[var(--color-brand-red)] flex-shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/45 hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.07] py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25">
            © {currentYear} {brand.copyrightBase}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="text-xs text-white/25 hover:text-white/55 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/25 hover:text-white/55 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Large decorative text — visible only on lg+ */}
        <div className="lg:block -mt-2 -mb-2 ml-7 mr-7 overflow-hidden opacity-30 pointer-events-none">
          <SVGTextStroke text="Dulsco Plus" />
        </div>
      </div>
    </footer>
  );
}
