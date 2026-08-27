import type { Metadata } from "next";
import Image from "next/image";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "OHS Consulting — Risk Assessments, Audits & Safety Files",
  description:
    "Professional OHS consulting in South Africa: workplace risk assessments (HIRA), legal compliance audits, gap analysis and safety file development that reduce risk and ensure compliance.",
  alternates: { canonical: "/consulting" },
};

const SERVICES = [
  {
    title: "Workplace Risk Assessments (Including HIRA)",
    desc: "We identify potential hazards in your workplace and evaluate the likelihood and severity of associated risks — including structured Hazard Identification and Risk Assessment to drive corrective action.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Legal Compliance Audits & Gap Analysis",
    desc: "We evaluate your current health and safety systems against statutory requirements, industry standards and client specifications — and give you a clear, actionable corrective action plan.",
    icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
  },
  {
    title: "Safety File Development & Documentation Support",
    desc: "A comprehensive safety file is essential for demonstrating compliance — especially on construction sites and operational facilities. We prepare, organise and maintain yours.",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    title: "Incident Investigation Support",
    desc: "When incidents happen, our consultants help you investigate root causes, document findings and implement corrective measures that prevent recurrence and protect your compliance record.",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
];

const WHY = [
  "Trusted safety consultants with industry expertise",
  "Practical solutions tailored to your workplace",
  "Clear documentation and corrective action plans",
  "Support for internal audits and external inspections",
  "Focus on real-world risk reduction and compliance",
];

export default function ConsultingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">OHS Consulting</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
                Consulting That Reduces Risk &amp; Ensures Compliance
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
                REH Safety Training offers professional occupational health and safety consulting
                designed to help businesses reduce risk, improve legal compliance and build a strong
                safety-first culture.
              </p>
              <a
                href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
                data-booking
                className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
                Request a Consult
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
              <Image
                src="/images/ohs-consulting.jpg"
                alt="REH OHS consultant reviewing compliance documentation"
                width={814}
                height={458}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Our Services</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
              How We Help Your Business Stay Compliant
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-line bg-paper p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-charcoal/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-cream">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-xl text-charcoal">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Why Choose Us</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Why Choose REH OHS Consulting
              </h2>
              <ul className="mt-7 space-y-4">
                {WHY.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-charcoal/80">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                      <svg className="h-3.5 w-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
                data-booking
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-3 text-base font-bold text-white transition-colors hover:bg-brand"
              >
                Discuss Your Compliance Needs
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-8">
              <h3 className="font-display text-2xl text-charcoal">What to Expect</h3>
              <ol className="mt-6 space-y-6">
                {[
                  { t: "Site walkthrough & document review", d: "We assess your current safety systems, documentation and workplace conditions." },
                  { t: "Gap analysis & prioritised findings", d: "You receive a clear report of compliance gaps ranked by risk and legal exposure." },
                  { t: "Corrective action plan & support", d: "We help you implement fixes — policies, files, training and monitoring." },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-charcoal font-display text-sm text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-charcoal">{step.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Compliance Is Non-Negotiable — Get It Right"
        sub="Book a consulting assessment today and get a clear picture of your legal exposure."
      />
    </>
  );
}
