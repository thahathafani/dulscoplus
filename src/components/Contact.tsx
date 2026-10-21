"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contact } from "@/lib/content";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Please describe your requirements";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof form]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setFormState("loading");

    // Demo state: no real backend configured yet
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-[var(--color-text-primary)] bg-white placeholder-[var(--color-text-muted)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--color-brand-red)]/30 focus:border-[var(--color-brand-red)] ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
    }`;

  return (
    <section id="contact" className="section-padding bg-[var(--color-brand-charcoal)]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-14 items-start">
          {/* Info column */}
          <div className="lg:col-span-2">
            <motion.p
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[var(--color-brand-red)] text-xs font-bold tracking-widest uppercase mb-3"
            >
              {contact.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-white font-bold tracking-tight leading-[1.15] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              {contact.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="text-white/65 text-[1.0625rem] leading-[1.75] mb-10"
            >
              {contact.subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-col gap-5"
            >
              {[
                { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
                { icon: MapPin, label: "Location", value: contact.address, href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-[var(--color-brand-red)]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-medium mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white/85 text-sm hover:text-[var(--color-brand-red)] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/85 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-2xl"
          >
            {formState === "success" ? (
              <div className="flex flex-col items-center text-center gap-4 py-12">
                <CheckCircle size={52} className="text-green-500" />
                <h3 className="text-xl font-bold text-[var(--color-brand-charcoal)]">Enquiry Received</h3>
                <p className="text-[var(--color-text-secondary)] text-sm max-w-sm">
                  Thank you for reaching out. Our team will review your enquiry and be in touch shortly.
                </p>
                <p className="text-xs text-[var(--color-text-muted)] italic mt-2 max-w-sm">
                  Preview mode: enquiry stored locally. Configure email service before production launch.
                </p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" }); }}
                  className="btn-primary mt-4"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-[var(--color-brand-charcoal)] mb-1">Send an Enquiry</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your organisation"
                      value={form.company}
                      onChange={handleChange}
                      className={inputClass("company")}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+974 ..."
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass("phone")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass("service") + " cursor-pointer"}
                  >
                    <option value="">Select a service...</option>
                    <option value="people">People Solutions</option>
                    <option value="environmental">Environmental Solutions</option>
                    <option value="hazardous-waste">Hazardous Waste Management</option>
                    <option value="industrial-supply">Industrial Supply Solutions</option>
                    <option value="integrated-technical">Integrated Technical Solutions</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Your Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Briefly describe what you need..."
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass("message") + " resize-none"}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <p className="text-[var(--color-text-muted)] text-xs italic">{contact.formNote}</p>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Enquiry
                    </>
                  )}
                </button>

                {formState === "error" && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 rounded-lg p-3">
                    <AlertCircle size={16} />
                    <p className="text-sm">Something went wrong. Please try again or contact us directly.</p>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
