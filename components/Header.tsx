"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/consulting", label: "OHS Consulting" },
  { href: "/medicals", label: "Medicals" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-cream shadow-lg shadow-ink/20">
      {/* top info bar */}
      <div className="hidden border-b border-white/10 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-cream/80 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              SAQA-aligned training · Accredited providers
            </span>
            <span className="hidden lg:inline">Midrand &amp; Durban · Daily classes, no waiting period</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+27107466954" className="hover:text-white">
              010 746 6954
            </a>
            <a href="mailto:info@rehtraining.co.za" className="hover:text-white">
              info@rehtraining.co.za
            </a>
          </div>
        </div>
      </div>

      {/* main nav */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white p-1.5">
            <Image
              src="/images/reh-logo.png"
              alt="REH Safety Training logo"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="leading-tight">
            <span className="block font-display text-lg text-white sm:text-xl">REH Safety Training</span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-cream/70">
              Accredited Health &amp; Safety
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-white/10 text-white" : "text-cream/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
            data-booking
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
            Request a Quote
          </a>
        </nav>

        {/* mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="border-t border-white/10 bg-charcoal px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-lg px-3 text-base font-semibold ${
                    active ? "bg-white/10 text-white" : "text-cream/90 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
              data-booking
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-base font-bold text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              Request a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
