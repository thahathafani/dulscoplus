import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { brand, nav, contact } from "@/lib/content";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#111c26] text-white/70">
      <div className="container-wide py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label={`${brand.name} home`} className="inline-block mb-5">
              <Image
                src="/logo.svg"
                alt={`${brand.name} logo`}
                width={200}
                height={56}
                className="h-20 lg:h-30 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/55 max-w-sm">
              {brand.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 hover:text-[var(--color-brand-red)] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[var(--color-brand-red)] flex-shrink-0 mt-0.5" />
                <span className="text-white/55">{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[var(--color-brand-red)] flex-shrink-0" />
                <a href={`tel:${contact.phone}`} className="text-white/55 hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[var(--color-brand-red)] flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-white/55 hover:text-white transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/35">© {currentYear} {brand.copyrightBase}</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-xs text-white/35 hover:text-white/65 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/35 hover:text-white/65 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
