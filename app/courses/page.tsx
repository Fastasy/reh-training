import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import CourseBrowser from "@/components/CourseBrowser";
import CTABand from "@/components/CTABand";
import { COURSE_COUNT } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Health & Safety Courses — Prices & Booking",
  description:
    `Browse more than ${COURSE_COUNT} accredited health and safety courses with transparent pricing — working at heights, first aid, safety officer, forklift, scaffolding and more.`,
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      {/* page hero */}
      <section className="relative overflow-hidden bg-white text-charcoal">
        <div className="hero-grid-light absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Health &amp; Safety Courses</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
              Let&apos;s Find the Right Safety Course for You
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/75">
              Explore more than {COURSE_COUNT} hands-on courses tailored to South African
              industry standards. Search the catalogue below, or message us for a group quote.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
                data-booking
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
                Request a Quote
              </a>
              <span className="inline-flex min-h-12 items-center rounded-xl border border-line bg-paper px-5 text-sm text-charcoal/85">
                Accredited training · Certificates issued
              </span>
            </div>
            </div>

            {/* header image — same treatment as the home hero */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl shadow-charcoal/15">
                <Image
                  src="/images/ohs-consulting.jpg"
                  alt="Occupational health and safety training and consulting with RSTL Centre"
                  width={814}
                  height={458}
                  priority
                  className="aspect-video h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-6 z-10 flex items-center gap-3 rounded-2xl border border-line bg-paper px-5 py-4 shadow-xl shadow-charcoal/15">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
                  <svg className="h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">{COURSE_COUNT}+ Courses</p>
                  <p className="text-xs text-charcoal/60">Accredited unit-standard training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-cream py-14 lg:py-16">
        {/* CourseBrowser reads ?category= (the home-page category cards link to it),
            so it needs a Suspense boundary to keep this route statically rendered. */}
        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="h-44 rounded-2xl border border-line bg-paper shadow-sm" />
            </div>
          }
        >
          <CourseBrowser />
        </Suspense>
      </div>

      <CTABand
        title="Don't See Your Course?"
        sub="We deliver a wide range of additional training — message us and we'll find the right course and price for your team."
      />
    </>
  );
}
