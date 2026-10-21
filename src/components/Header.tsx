"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, brand } from "@/lib/content";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]"
          : "bg-white/80 backdrop-blur-sm"
          }`}
        style={{ willChange: "transform" }}
      >
        <div className="container-wide flex items-center justify-between h-[5rem] lg:h-[5.75rem]">
          {/* Logo — larger, correct aspect ratio */}
          <Link
            href="/"
            className="relative flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)] rounded-sm"
            aria-label={`${brand.name} home`}
          >
            <Image
              src="/logo.svg"
              alt={`${brand.name} logo`}
              width={260}
              height={80}
              priority
              className="h-20 sm:h-30 lg:h-34 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.8125rem] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-red)] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[var(--color-brand-red)] transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="#contact" className="btn-primary text-sm py-2.5 px-5">
              Enquire Now
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-[var(--color-brand-charcoal)] hover:bg-[var(--color-bg-muted)] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-0 z-40 bg-white pt-[4.25rem] flex flex-col"
          >
            <nav className="flex-1 flex flex-col px-6 pt-8 gap-2" aria-label="Mobile navigation">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-3.5 text-xl font-semibold text-[var(--color-brand-charcoal)] border-b border-[var(--color-border)] hover:text-[var(--color-brand-red)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-6">
              <Link
                href="#contact"
                onClick={closeMenu}
                className="btn-primary w-full justify-center text-base py-3.5"
              >
                Enquire Now
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
