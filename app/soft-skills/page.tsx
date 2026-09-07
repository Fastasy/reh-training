import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import { emailQuoteLink } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Soft Skills Courses — Excel, Customer Service & Time Management",
  description:
    "Practical soft skills courses in South Africa: basic Excel, customer service, time management, communication and presentation skills. Online, on-site or at our Midrand & Durban centres.",
  alternates: { canonical: "/soft-skills" },
};

const COURSES = [
  {
    title: "Basic Microsoft Excel",
    desc: "Work confidently with spreadsheets: data entry, formulas, formatting, sorting, filters and simple reports.",
    icon: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  },
  {
    title: "Customer Service Excellence",
    desc: "Handle enquiries, complaints and difficult customers professionally, in person, on the phone and online.",
    icon: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm18 0h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5ZM3 14v-3a9 9 0 0 1 18 0v3",
  },
  {
    title: "Time Management & Productivity",
    desc: "Plan your day, cut out the time-wasters and get the important work done with techniques you can use immediately.",
    icon: "M12 7v5l3 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z",
  },
  {
    title: "Effective Communication in the Workplace",
    desc: "Get your message across clearly, in person and in writing, whether you are talking to colleagues, customers or managers.",
    icon: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  },
  {
    title: "Professional Email & Telephone Etiquette",
    desc: "Write emails people actually read and answer the phone in a way that leaves clients with a good impression.",
    icon: "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M3 7l9 6 9-6",
  },
  {
    title: "Presentation Skills",
    desc: "Prepare and deliver clear, confident presentations to small teams or a full boardroom, without the nerves taking over.",
    icon: "M8 21h8 M12 17v4 M4 4h16v12H4z",
  },
  {
    title: "Conflict Resolution Skills",
    desc: "De-escalate disagreements, separate the person from the problem and reach outcomes everyone can accept.",
    icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01l-3-3",
  },
  {
    title: "Teamwork & Collaboration",
    desc: "Share the load, give useful feedback and work toward shared goals instead of working around each other.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  },
];

const AUDIENCE = [
  "Office and administration teams",
  "Retail and customer-facing staff",
  "Supervisors and new managers",
  "Anyone who works with spreadsheets, email or clients daily",
];

const STEPS = [
  {
    t: "Tell us what your team needs",
    d: "Email the course, group size and preferred dates to info@rehtraining.co.za.",
  },
  {
    t: "Get your quote",
    d: "We confirm pricing and delivery: online, at your premises or at one of our centres.",
  },
  {
    t: "Train and get certified",
    d: "Your team completes the course and receives certificates of completion.",
  },
];

export default function SoftSkillsPage() {
  return (
    <>
      {/* page hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Soft Skills Training</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
              Practical Training for Everyday Workplace Skills
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              Short, hands-on courses in Excel, customer service, time management, communication
              and more. Your team trains online, on-site or at our centres in Midrand and Durban,
              then puts what they learn to work the same week.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={emailQuoteLink("Soft Skills")}
                data-booking
                data-course="Soft Skills"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Request a Quote
              </a>
              <span className="inline-flex min-h-12 items-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-cream/85">
                Online · On-site · Centre-based
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* course grid */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Our Courses</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
              Pick the Skills Your Team Needs
            </h2>
            <p className="mt-3 text-charcoal/65">
              Every course is delivered by a facilitator and can run at your premises, online or at
              one of our centres. Email us for group pricing, dates and a custom programme if you
              want to combine a few courses.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COURSES.map((c) => (
              <div
                key={c.title}
                className="group flex flex-col rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-charcoal/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-cream transition-colors group-hover:bg-brand">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg leading-snug text-charcoal">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{c.desc}</p>
                <a
                  href={emailQuoteLink(c.title)}
                  data-booking
                  data-course={c.title}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-colors hover:text-brand-dark"
                >
                  Request a Quote
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* who it's for + how it works */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Who It&apos;s For</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Built for Teams That Deal With People Every Day
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Soft skills show up in every role, not just management. These courses work for a
                new administrator still finding their feet in Excel, a cashier handling a queue of
                difficult customers, or a supervisor running their first team meeting.
              </p>
              <ul className="mt-7 space-y-4">
                {AUDIENCE.map((item) => (
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
            </div>
            <div className="rounded-2xl border border-line bg-paper p-8">
              <h3 className="font-display text-2xl text-charcoal">How Booking Works</h3>
              <ol className="mt-6 space-y-6">
                {STEPS.map((step, i) => (
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
              <a
                href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
                data-booking
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-3 text-base font-bold text-white transition-colors hover:bg-brand"
              >
                Book Soft Skills Training
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Small Skills, Big Difference at Work"
        sub="Email us the course you are interested in and we will send pricing and available dates."
      />
    </>
  );
}
