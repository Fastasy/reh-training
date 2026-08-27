import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL_COURSES_WITH_SLUG,
  COURSE_BY_SLUG,
  courseUrl,
  courseSlug,
  type CourseWithSlug,
} from "@/lib/slugs";
import { COURSE_CATEGORIES } from "@/lib/courses";
import { getCoursePageContent } from "@/lib/coursePages";
import CTABand from "@/components/CTABand";
import AllCoursesSidebar from "@/components/AllCoursesSidebar";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_COURSES_WITH_SLUG.map((c) => ({ slug: c.slug }));
}

function metaTitle(course: CourseWithSlug): string {
  const base = course.name.replace(/\s*\([^)]*\)/g, "").trim();
  const t = `${base} Training Course | REH Safety Training`;
  return t.length <= 62 ? t : `${base} Course | REH Safety Training`.slice(0, 62);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = ALL_COURSES_WITH_SLUG.find((c) => c.slug === slug);
  if (!course) return {};
  const content = getCoursePageContent(course.name);
  const desc =
    content?.description
      ?.replace(/[•\s]+/g, " ")
      .slice(0, 155) ||
    `${course.name} training at REH Safety Training. SAQA-aligned, delivered online, on-site or at our Midrand and Durban centres. WhatsApp us for a quote.`;
  return {
    title: metaTitle(course),
    description: desc,
    alternates: { canonical: courseUrl(course.name) },
    openGraph: {
      title: metaTitle(course),
      description: desc,
      url: `https://www.rehtraining.co.za${courseUrl(course.name)}`,
      type: "website",
      siteName: "REH Safety Training",
      images: [{ url: "/images/og-image.png", width: 1280, height: 1280, alt: "REH Safety Training" }],
    },
  };
}

function jsonLd(course: CourseWithSlug, content: Awaited<ReturnType<typeof getCoursePageContent>>) {
  const price = course.price ? course.price.replace(/[^\d]/g, "") : null;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Course",
      name: `${course.name} Training Course`,
      description: content?.description ?? `${course.name} training in South Africa.`,
      provider: {
        "@type": "EducationalOrganization",
        name: "REH Safety Training",
        url: "https://www.rehtraining.co.za",
        telephone: "+27107466954",
        email: "info@rehtraining.co.za",
        address: {
          "@type": "PostalAddress",
          streetAddress: "14 Douglas Road, Glen Austin",
          addressLocality: "Midrand",
          addressRegion: "Gauteng",
          postalCode: "1685",
          addressCountry: "ZA",
        },
      },
      offers: price
        ? {
            "@type": "Offer",
            price,
            priceCurrency: "ZAR",
            availability: "https://schema.org/InStock",
            url: `https://www.rehtraining.co.za${courseUrl(course.name)}`,
          }
        : undefined,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["onsite", "online"],
        location: [
          {
            "@type": "Place",
            name: "REH Safety Training Midrand",
            address: "14 Douglas Road, Glen Austin, Midrand, Gauteng, 1685",
          },
          {
            "@type": "Place",
            name: "REH Safety Training Durban",
            address: "62 Lilian Ngoyi Street, Windermere, Durban",
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rehtraining.co.za/" },
        { "@type": "ListItem", position: 2, name: "Courses", item: "https://www.rehtraining.co.za/courses" },
        { "@type": "ListItem", position: 3, name: course.name },
      ],
    },
  ];

  if (content?.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: content.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = ALL_COURSES_WITH_SLUG.find((c) => c.slug === slug);
  if (!course) notFound();

  const content = getCoursePageContent(course.name);
  const category = COURSE_CATEGORIES.find((c) => c.id === course.categoryId);
  const related = (category?.courses ?? [])
    .filter((c) => c.name !== course.name)
    .slice(0, 4)
    .map((c) => ({ ...c, slug: courseSlug(c.name) }));

  const price = course.price;
  const metaLine = [
    content?.us_id ? `Unit Standard ${content.us_id}` : null,
    content?.nqf ? `NQF Level ${content.nqf}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const waLink = `https://wa.me/27615807967?text=${encodeURIComponent(
    `Hi REH Safety Training! I'd like a quote for the ${course.name} course.`
  )}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(course, content)) }} />

      {/* page hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-cream/60">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/courses" className="hover:text-white">Courses</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-cream/90">{course.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              {category?.title ?? "Safety Training"}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
              {course.name} Training
            </h1>
            {metaLine && <p className="mt-3 text-sm font-semibold text-cream/70">{metaLine}</p>}
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              SAQA-aligned {course.name.toLowerCase()} training delivered online, on-site or at our
              centres in Midrand and Durban. Daily classes, no waiting period.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waLink}
                data-course={course.name}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                </svg>
                Get a Quote on WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-cream/30 px-6 py-3 text-sm font-bold text-cream transition-colors hover:border-cream hover:bg-white/5"
              >
                Talk to a Training Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* main content */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <div className="min-w-0">
              {/* quick-answer AEO block */}
              {content?.description && (
                <div className="rounded-2xl border-l-4 border-brand bg-paper p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Quick answer</p>
                  <h2 className="mt-2 font-display text-xl text-charcoal">
                    What is the {course.name} course?
                  </h2>
                  <p className="mt-2 leading-relaxed text-charcoal/75">{content.description}</p>
                </div>
              )}

              {/* what you'll learn */}
              {content?.outcomes && content.outcomes.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    What you will learn
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {content.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 rounded-xl border border-line bg-paper p-4 text-sm leading-relaxed text-charcoal/80">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* who should attend */}
              {content?.audience && content.audience.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    Who should attend
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {content.audience.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-charcoal/80">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                          <svg className="h-3.5 w-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ — AEO */}
              {content?.faqs && content.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6 space-y-4">
                    {content.faqs.map((f) => (
                      <div key={f.q} className="rounded-2xl border border-line bg-paper p-6">
                        <h3 className="font-semibold text-charcoal">{f.q}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* related */}
              {related.length > 0 && (
                <div className="mt-14">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    Related courses
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {related.map((r) => (
                      <Link
                        key={r.name}
                        href={`/courses/${r.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-charcoal/10"
                      >
                        <div>
                          <p className="font-semibold text-charcoal">{r.name}</p>
                          <p className="mt-1 text-sm text-charcoal/60">
                            {r.duration}
                            {r.price ? ` · ${r.price}` : " · Request a Quote"}
                          </p>
                        </div>
                        <svg className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* sidebar */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-6">
              <div className="rounded-2xl border border-line bg-paper p-7 shadow-sm">
                <h2 className="font-display text-xl text-charcoal">Course details</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-charcoal/60">Duration</dt>
                    <dd className="font-bold text-charcoal">{course.duration}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                    <dt className="text-charcoal/60">Price</dt>
                    <dd className="font-bold text-charcoal">
                      {price ? price : <span className="text-sand">Request a Quote</span>}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                    <dt className="text-charcoal/60">Delivery</dt>
                    <dd className="text-right font-semibold text-charcoal">Online · On-site · Centre</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                    <dt className="text-charcoal/60">Certification</dt>
                    <dd className="text-right font-semibold text-charcoal">SAQA-aligned certificate</dd>
                  </div>
                  {content?.us_name && (
                    <div className="border-t border-line pt-4">
                      <dt className="text-charcoal/60">Unit standard</dt>
                      <dd className="mt-1 font-semibold leading-snug text-charcoal">{content.us_name}</dd>
                    </div>
                  )}
                </dl>
                <a
                  href={waLink}
                  data-course={course.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                  </svg>
                  {price ? `Book ${price}` : "Get a Quote"}
                </a>
                <p className="mt-3 text-center text-xs text-charcoal/50">
                  Group discounts available · Prices negotiable per group size
                </p>
              </div>

              {/* all courses list — like the client's original site */}
              <AllCoursesSidebar current={course.name} />

              <div className="rounded-2xl bg-navy p-6 text-cream">
                <h2 className="font-display text-lg text-white">Why train with REH?</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
                  {["Daily classes, no waiting period", "Online, on-site or centre-based", "SAQA-aligned unit standards", "Midrand & Durban training centres", "Group booking discounts"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABand
        title={`Ready to book ${course.name}?`}
        sub="Message us on WhatsApp for pricing, dates and group discounts. A training advisor responds fast."
      />
    </>
  );
}
