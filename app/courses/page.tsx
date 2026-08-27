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
                href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
                className="inline-flexdata-booking
 min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
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
