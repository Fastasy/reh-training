import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import CTABand from "@/components/CTABand";
import {
  COURSE_CATEGORIES,
  COURSE_COUNT,
  HOME_POPULAR_COURSES,
} from "@/lib/courses";
import HomeReviewsSection from "@/components/HomeReviewsSection";

// Home "Browse by Category" cards derive from COURSE_CATEGORIES so naming stays in
// sync with /courses. Icons + punchy one-liners keyed by category id.
const CATEGORY_CARD_COPY: Record<string, { desc: string; icon: string }> = {
  "safety-compliance": {
    desc: "OHS Act, SHE Rep, risk assessment, incident investigation, safety officer programmes.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  "technical-courses": {
    desc: "Plumbing, water systems, bricklaying, formwork, steel fixing, concrete and roadworks.",
    icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  },
  "machines-tools": {
    desc: "Forklift, excavator, TLB, crane and plant operators, plus hand & power tools.",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H3.375A1.125 1.125 0 002.25 15.75v4.5c0 .621.504 1.125 1.125 1.125h14.25a1.125 1.125 0 001.125-1.125v-4.5a1.125 1.125 0 00-1.125-1.125zm0 0h4.5m-4.5 0a1.125 1.125 0 011.125-1.125h4.5a1.125 1.125 0 011.125 1.125v2.25a1.125 1.125 0 01-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-2.25z",
  },
  "heights-and-access": {
    desc: "Working at heights, fall arrest, scaffolding erector, inspector & supervisor, rigging.",
    icon: "M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 8a2 2 0 00-2 2v4h3m19-6a2 2 0 012 2v4h-3m-16 0h16m-16 0a2 2 0 01-2 2H2m18 0a2 2 0 002 2h2M9 20h6m-3-6v6",
  },
  "emergency-courses": {
    desc: "First aid levels 1–3, fire awareness, firefighting, fire marshal, evacuation procedures.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  "dangerous-goods": {
    desc: "HAZMAT, dangerous goods handling, spill response and chemical safety.",
    icon: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z M12 9v4 M12 17h.01",
  },
};

const FALLBACK_CAT_ICON = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";

// Home card order: Safety first, then Heights & Emergency on row one (client request),
// followed by Technical, Machines & Tools and Dangerous Goods.
const HOME_CATEGORY_ORDER = [
  "safety-compliance",
  "heights-and-access",
  "emergency-courses",
  "technical-courses",
  "machines-tools",
  "dangerous-goods",
];

const CATEGORY_CARDS = HOME_CATEGORY_ORDER.map((id) => {
  const cat = COURSE_CATEGORIES.find((c) => c.id === id);
  if (!cat) throw new Error(`Missing home category card: ${id}`);
  return {
    id: cat.id,
    title: cat.title,
    desc: CATEGORY_CARD_COPY[cat.id]?.desc ?? cat.blurb,
    icon: CATEGORY_CARD_COPY[cat.id]?.icon ?? FALLBACK_CAT_ICON,
    count: cat.courses.length,
  };
});

const WHY = [
  {
    title: "Flexible — Daily Classes",
    desc: "No waiting for a full class. Daily classes across Midrand, Durban and Mthatha fit around your schedule.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "No Waiting Period",
    desc: "Book today, train this week. We keep class sizes small so you get practical, hands-on time.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Group Discounts",
    desc: "Training a team? Prices are negotiable based on group size — the more learners, the better the rate.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Online, On-Site & Centres",
    desc: "Train at one of our centres, at your premises, or online/blended — wherever your team works.",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Email us",
    desc: "Tell us the course, group size and preferred dates. A training advisor replies fast.",
  },
  {
    n: "02",
    title: "Get your quote & book",
    desc: "We confirm pricing, delivery mode (on-site, online or centre) and the next available date.",
  },
  {
    n: "03",
    title: "Train & get certified",
    desc: "Attend your practical course and receive your accredited certificate.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "REH Safety Training",
  url: "https://www.rehtraining.co.za",
  telephone: "+27107466954",
  email: "info@rehtraining.co.za",
  description:
    "Accredited health and safety training, soft skills development and occupational medicals in South Africa.",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "14 Douglas Road, Glen Austin",
      addressLocality: "Midrand",
      addressRegion: "Gauteng",
      postalCode: "1685",
      addressCountry: "ZA",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "62 Lilian Ngoyi Street, Windermere",
      addressLocality: "Durban",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "CNR Leads & York Road, 1st Floor Old Mutual",
      addressLocality: "Mthatha",
      addressRegion: "Eastern Cape",
      addressCountry: "ZA",
    },
  ],
  sameAs: ["https://www.facebook.com/rehtraining"],
};

export default function Home() {
  const popular = HOME_POPULAR_COURSES;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-white text-charcoal">
        <div className="hero-grid-light absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* copy */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-charcoal/80">
                <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                Accredited Health &amp; Safety Courses
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl">
                We Make Workplace <span className="text-brand">Safety Easy</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">
                Accredited health &amp; safety training, soft skills development and occupational
                medicals for South African businesses. Train online, on-site or at our centres in
                Midrand, Durban and Mthatha — with daily classes and no waiting period.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
                  data-booking
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
                  Request a Quote
                </a>
                <a
                  href="/courses"
                  className="inline-flex min-h-13 items-center justify-center rounded-xl border-2 border-charcoal/25 px-7 py-3.5 text-base font-bold text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-white"
                >
                  View Price List
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-charcoal/75">
                {["Accredited training", "Group discounts", "Daily classes · no waiting"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* hero image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border-2 border-white shadow-2xl shadow-charcoal/15">
                <Image
                  src="/images/hero-training.jpg"
                  alt="Safety training course in session at REH Safety Training"
                  width={1600}
                  height={896}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              {/* trust badge */}
              <div className="absolute -bottom-5 left-6 z-10 flex items-center gap-3 rounded-2xl border border-line bg-paper px-5 py-4 shadow-xl shadow-charcoal/15">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft">
                  <svg className="h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">Accredited</p>
                  <p className="text-xs text-charcoal/60">Certificates issued per unit standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { v: `${COURSE_COUNT}+`, l: "Courses on offer" },
              { v: "3", l: "Delivery modes — online, on-site, centre" },
              { v: "3", l: "Training centres — Midrand, Durban & Mthatha" },
              { v: "Daily", l: "Classes with no waiting period" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl text-white">{s.v}</p>
                <p className="mt-1 text-sm text-cream/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Browse by Category"
            title="Find the Right Safety Course"
            sub="Browse our full range of occupational health and safety training programmes by category. All courses are practical, industry-relevant, and aligned with South African unit standards."
            center
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_CARDS.map((cat) => (
              <Link
                key={cat.id}
                href="/courses"
                className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-charcoal/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-cream transition-colors group-hover:bg-brand">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={cat.icon} />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg leading-snug text-charcoal">{cat.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{cat.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  {cat.count} courses
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR COURSES ============ */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Most Requested"
              title="Popular Courses & Pricing"
              sub="Transparent pricing on the courses South African companies book most. Prices negotiable for group bookings."
            />
            <Link
              href="/courses"
              className="shrink-0 rounded-xl border-2 border-charcoal px-5 py-3 text-sm font-bold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
            >
              View Full Course List
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <CourseCard key={c.name} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY REH ============ */}
      <section className="bg-charcoal py-16 text-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why REH Safety Training"
            title="Training That Fits Your Business"
            sub="We specialise in industry-recognised health and safety courses designed to empower individuals and organisations — led by experts, with practical outcomes."
            dark
            center
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-brand/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={w.icon} />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONSTRUCTION TEASER ============ */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Construction &amp; Technical Courses</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Hands-On Construction Skills for Site Teams
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Bricklaying, formwork, steel fixing, concrete works, roadworks and plumbing.
                Practical technical training that gives artisans and site teams the skills to
                deliver quality work, safely.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Bricklaying, formwork & steel fixing",
                  "Concrete works, roadworks & paving",
                  "Plumbing & water systems installation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-charcoal/80">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/courses"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand"
              >
                Browse Construction Courses
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-8 shadow-sm">
              <h3 className="font-display text-2xl text-charcoal">Popular construction courses</h3>
              <div className="mt-6 space-y-3">
                {[
                  "Bricklaying",
                  "Steel Fixing",
                  "Concrete Works",
                  "Plumbing General Skills",
                ].map((c) => (
                  <Link
                    key={c}
                    href="/courses"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-charcoal/10"
                  >
                    <span className="font-semibold text-charcoal">{c}</span>
                    <svg className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEDICALS TEASER ============ */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Occupational Health</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Occupational Medicals That Keep Your Workforce Fit &amp; Compliant
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Pre-employment, working-at-heights, fitness-to-work, PDP driver and exit medicals —
                at our Midrand clinic or on-site at your premises via our fully equipped mobile units.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Up to 35 medicals per day, same-day bookings available",
                  "Mobile units covering Gauteng, Mpumalanga, Limpopo & Free State",
                  "Lung function, vision, blood pressure & physical examinations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-charcoal/80">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/medicals"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand"
              >
                Explore Medicals
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-xl shadow-charcoal/15">
                <Image
                  src="/images/medicals.jpg"
                  alt="Occupational medical assessment at REH Medicals"
                  width={1600}
                  height={896}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOFT SKILLS TEASER ============ */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Soft Skills Training</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                Practical Courses for Everyday Workplace Skills
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Excel basics, customer service, time management, clear communication. Short,
                hands-on courses your team can put to work right away, delivered online, on-site
                or at our centres in Midrand, Durban and Mthatha.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Basic Microsoft Excel",
                  "Customer service that keeps clients coming back",
                  "Time management & personal productivity",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-charcoal/80">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/soft-skills"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand"
              >
                Explore Soft Skills Courses
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-8 shadow-sm">
              <h3 className="font-display text-2xl text-charcoal">Popular soft skills courses</h3>
              <div className="mt-6 space-y-3">
                {[
                  "Basic Microsoft Excel",
                  "Customer Service Excellence",
                  "Time Management & Productivity",
                  "Effective Communication in the Workplace",
                ].map((c) => (
                  <Link
                    key={c}
                    href="/soft-skills"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-charcoal/10"
                  >
                    <span className="font-semibold text-charcoal">{c}</span>
                    <svg className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple Process"
            title="Book Training in 3 Steps"
            center
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-line bg-paper p-7 text-center">
                <span className="font-display text-5xl text-brand/20">{s.n}</span>
                <h3 className="mt-3 font-display text-xl text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
              data-booking
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* ============ ACCREDITATIONS ============ */}
      <section className="bg-navy py-16 text-cream lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Trusted &amp; Accredited</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">
                Our Accreditations &amp; Professional Bodies
              </h2>
              <p className="mt-4 leading-relaxed text-cream/75">
                REH Safety Training forms part of the SM Safety and Technical Learning Group, one of
                South Africa&apos;s established providers of OHS training and auditing.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Image
                src="/images/accreditations.jpg"
                alt="REH Safety Training accreditation and professional body logos including QCTO"
                width={1264}
                height={162}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS + LOCATIONS ============ */}
      <HomeReviewsSection />

      {/* ============ FINAL CTA ============ */}
      <CTABand
        title="Ready to Make Your Workplace Safer?"
        sub="Email us for a quote today — daily classes, group discounts and no waiting period."
      />
    </>
  );
}
