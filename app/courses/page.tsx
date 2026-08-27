import type { Metadata } from "next";
import CourseBrowser from "@/components/CourseBrowser";
import CTABand from "@/components/CTABand";
import { COURSE_COUNT } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Health & Safety Courses — Prices & Booking",
  description:
    `Browse ${COURSE_COUNT}+ SAQA-aligned health and safety courses with transparent pricing — working at heights, first aid, safety officer, forklift, scaffolding and more.`,
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      {/* page hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Health &amp; Safety Courses</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
              Let&apos;s Find the Right Safety Course for You
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              {COURSE_COUNT}+ practical, industry-relevant courses aligned with South African unit
              standards. Search the catalogue below, or message us for a group quote.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/27615807967?text=Hi%20REH%20Safety%20Training!%20I%27d%20like%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                </svg>
                Request a Quote
              </a>
              <span className="inline-flex min-h-12 items-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-cream/85">
                SAQA-aligned training · Certificates issued
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-cream py-14 lg:py-16">
        <CourseBrowser />
      </div>

      <CTABand
        title="Don't See Your Course?"
        sub="We deliver a wide range of additional training — message us and we'll find the right course and price for your team."
      />
    </>
  );
}
