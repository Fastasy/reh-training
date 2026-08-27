import type { Metadata } from "next";
import Image from "next/image";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Occupational Medicals — Pre-Employment, WAH & Fitness to Work",
  description:
    "Occupational health medicals in South Africa: pre-employment, working at heights, fitness to work, PDP driver, exit and annual medicals — at our Midrand clinic or on-site via mobile units.",
  alternates: { canonical: "/medicals" },
};

const SERVICES = [
  "Pre-Employment Medicals",
  "Working At Heights Medicals",
  "Fitness To Work Assessments",
  "PDP Drivers' Medicals",
  "Exit And Annual Medicals",
  "Aviation And Food Handler Medicals",
];

const TESTS = [
  "Medical And Occupational History",
  "Blood Pressure, Height, Weight And Urine Analysis",
  "Lung Function Testing (FEV1, FVC, FEV/FVC %)",
  "Vision Screening (Snellen And Keystone)",
  "Physical Examination",
  "Chest X-Ray (Where Required)",
];

const COVERAGE = ["Gauteng", "Mpumalanga", "Limpopo", "Free State"];

const WAH_ROLES = [
  "Construction And Maintenance Workers",
  "Scaffolders And Riggers",
  "Fall Arrest And Rope Access Workers",
  "Operators Working On Elevated Platforms",
];

const WAH_TESTS = [
  "Medical And Occupational History Review",
  "Fitness To Work Clearance",
  "Physical Examination",
  "Lung Function Testing",
  "Vision Screening",
  "Blood Pressure And Vital Signs",
];

export default function MedicalsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">REH Medicals</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
                Occupational Medicals That Keep Your Workforce Fit &amp; Compliant
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
                Professional occupational health services to ensure your employees are fit for work,
                compliant with legislation and protected against health risks.
              </p>
              <a
                href="https://wa.me/27615807967?text=Hi%20REH%20Safety%20Training!%20I%27d%20like%20to%20book%20occupational%20medicals."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                </svg>
                Book a Medical
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
              <Image
                src="/images/medicals.jpg"
                alt="Occupational medical assessment at REH Medicals"
                width={1600}
                height={896}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Our Medical Services</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
              Full Range of Occupational Medicals
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-brand/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                  <svg className="h-4.5 w-4.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-semibold text-charcoal">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tests + clinic */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-8">
              <h3 className="font-display text-2xl text-charcoal">Medical Tests Conducted</h3>
              <ul className="mt-6 space-y-3.5">
                {TESTS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-charcoal/80">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-8">
              <h3 className="font-display text-2xl text-charcoal">Fixed Occupational Clinic</h3>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Our Midrand-based clinic serves Johannesburg and Pretoria, with capacity for up to{" "}
                <strong className="text-charcoal">35 medicals per day</strong> and same-day bookings
                available. The clinic is convenient for both individual medicals and group bookings.
              </p>
              <h4 className="mt-7 font-display text-lg text-charcoal">Mobile Occupational Medicals</h4>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                On-site medicals conducted at your premises to reduce downtime and improve
                efficiency. Our mobile units are fully equipped to perform comprehensive
                occupational assessments.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {COVERAGE.map((c) => (
                  <span key={c} className="rounded-full bg-cream px-3.5 py-1.5 text-sm font-semibold text-charcoal">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* working at heights medicals */}
      <section className="bg-navy py-16 text-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Working At Heights Medicals</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">
                Ensure Employees Are Medically Fit To Work At Height
              </h2>
              <p className="mt-4 leading-relaxed text-cream/75">
                Working at heights medicals are mandatory for employees exposed to elevated work
                environments. REH Medicals conducts comprehensive assessments to ensure workers are
                fit and cleared for height work.
              </p>
              <h3 className="mt-8 font-display text-lg text-white">Who Requires This Medical</h3>
              <ul className="mt-4 space-y-3">
                {WAH_ROLES.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-cream/80">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="font-display text-xl text-white">Medical Assessments Included</h3>
              <ul className="mt-5 space-y-3.5">
                {WAH_TESTS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-cream/80">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20">
                      <svg className="h-3.5 w-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-5 text-xs text-cream/60">
                All assessments are conducted in line with occupational health and safety requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Book Occupational Medicals Today"
        sub="Same-day bookings available at our Midrand clinic — or bring the mobile unit to your site."
      />
    </>
  );
}
