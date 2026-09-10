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
import {
  courseDeliveryModes,
  deliveryLabel,
  deliverySentence,
  schemaCourseModes,
} from "@/lib/delivery";
import CTABand from "@/components/CTABand";
import AllCoursesSidebar from "@/components/AllCoursesSidebar";
import ReviewsSection from "@/components/ReviewsSection";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_COURSES_WITH_SLUG.map((c) => ({ slug: c.slug }));
}

const BRAND = "RSTL Centre";
/** Google truncates around here; keep the templated title under it. */
const TITLE_MAX = 62;

/** Course name with any bracketed qualifier stripped, e.g. "COIDA (Compensation …)" -> "COIDA". */
function courseBase(course: CourseWithSlug): string {
  return course.name.replace(/\s*\([^)]*\)/g, "").trim();
}

/**
 * Course title WITHOUT the brand — the root layout title template appends
 * " | RSTL Centre". (Passing a brand-suffixed string here renders the brand twice,
 * and `absolute` would drop the template entirely.) Degrades "X Training Course" ->
 * "X Course" so long course names still fit inside TITLE_MAX.
 */
function metaTitle(course: CourseWithSlug): string {
  const base = courseBase(course);
  for (const suffix of [" Training Course", " Course"]) {
    const candidate = `${base}${suffix}`;
    if (`${candidate} | ${BRAND}`.length <= TITLE_MAX) return candidate;
  }
  return `${base}`.slice(0, TITLE_MAX - BRAND.length - 3).trimEnd();
}

/** Full title for contexts the root template does NOT touch (Open Graph, JSON-LD). */
function fullTitle(course: CourseWithSlug): string {
  return `${metaTitle(course)} | ${BRAND}`;
}

/** Cut at a word boundary so a description never ends mid-word. */
function clampWords(text: string, max: number, min = 0): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const keep = lastSpace > min ? lastSpace : max;
  return cut.slice(0, keep).trim().replace(/[,;:.\-–—]$/, "");
}

/**
 * Meta description for a course page: the client's own course copy, trimmed to Google's
 * window at a word boundary. A few courses ship very short blurbs, so short copy gets a
 * factual closing line instead of being padded with fluff.
 */
function courseDescription(
  course: CourseWithSlug,
  content: Awaited<ReturnType<typeof getCoursePageContent>>,
  modes: ReturnType<typeof courseDeliveryModes>
): string {
  const MIN = 120;
  const MAX = 158;
  const body = content?.description?.replace(/[•\s]+/g, " ").trim() ?? "";
  let desc = body ? clampWords(body, MAX, MIN) : `${course.name} training at ${SITE.name}.`;
  if (desc.length < MIN) {
    const price = course.price ? ` From ${course.price} per learner.` : "";
    desc += ` Accredited course, delivered ${deliverySentence(modes)}.${price}`;
  }
  return clampWords(desc, MAX, MIN);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = ALL_COURSES_WITH_SLUG.find((c) => c.slug === slug);
  if (!course) return {};
  const content = getCoursePageContent(course.name);
  const modes = courseDeliveryModes(course.categoryId, course.name);
  const desc = courseDescription(course, content, modes);
  return {
    title: metaTitle(course),
    description: desc,
    alternates: { canonical: courseUrl(course.name) },
    openGraph: {
      title: fullTitle(course),
      description: desc,
      url: `${SITE.url}${courseUrl(course.name)}`,
      type: "website",
      siteName: SITE.name,
      locale: "en_ZA",
      // No images here on purpose: app/courses/[slug]/opengraph-image.tsx supplies a
      // per-course card, and setting images explicitly would override it.
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle(course),
      description: desc,
    },
  };
}

function jsonLd(course: CourseWithSlug, content: Awaited<ReturnType<typeof getCoursePageContent>>) {
  const price = course.price ? course.price.replace(/[^\d]/g, "") : null;
  const modes = courseDeliveryModes(course.categoryId, course.name);
  const nodes: Record<string, unknown>[] = [
    // The organisation node is repeated here (same @id as on the home page) so the
    // provider/branch references below resolve inside this document.
    organizationSchema(),
    {
      "@type": "Course",
      "@id": `${SITE.url}${courseUrl(course.name)}#course`,
      name: `${course.name} Training Course`,
      description: content?.description ?? `${course.name} training in South Africa.`,
      url: `${SITE.url}${courseUrl(course.name)}`,
      provider: { "@id": `${SITE.url}/#organization` },
      offers: price
        ? {
            "@type": "Offer",
            price,
            priceCurrency: "ZAR",
            availability: "https://schema.org/InStock",
            url: `${SITE.url}${courseUrl(course.name)}`,
          }
        : undefined,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: schemaCourseModes(modes),
        location: SITE.branches.map((b) => ({
          "@type": "Place",
          name: b.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: b.street,
            addressLocality: b.city,
            addressRegion: b.region,
            addressCountry: b.country,
          },
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Courses", path: "/courses" },
      { name: course.name, path: courseUrl(course.name) },
    ]),
  ];

  if (content?.faqs?.length) {
    nodes.push({
      "@type": "FAQPage",
      mainEntity: content.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return graph(...nodes);
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
  const deliveryModes = courseDeliveryModes(course.categoryId, course.name);
  const metaLine = [
    content?.us_id ? `Unit Standard ${content.us_id}` : null,
    content?.nqf ? `NQF Level ${content.nqf}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const waLink = `mailto:info@rehtraining.co.za?subject=${encodeURIComponent(
    `Training Quotation Request - ${course.name}`
  )}`;

  const whyBullets = [
    "Daily classes, no waiting period",
    deliveryModes.includes("Online")
      ? "Online, on-site or centre-based"
      : "On-site at your premises or centre-based",
    "Accredited courses",
    "Midrand, Durban & Mthatha training centres",
    "Group booking discounts",
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(course, content)) }} />

      {/* page hero */}
      <section className="relative overflow-hidden bg-white text-charcoal">
        <div className="hero-grid-light absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-charcoal/60">
              <li>
                <Link href="/" className="hover:text-brand">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/courses" className="hover:text-brand">Courses</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-charcoal/90">{course.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              {category?.title ?? "Safety Training"}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
              {course.name} Training
            </h1>
            {metaLine && <p className="mt-3 text-sm font-semibold text-charcoal/70">{metaLine}</p>}
            <p className="mt-4 text-lg leading-relaxed text-charcoal/75">
              Accredited {course.name.toLowerCase()} training delivered{" "}
              {deliverySentence(deliveryModes)}. Daily classes, no waiting period.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waLink}
                data-booking
                data-course={course.name}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
                Get a Quote
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-charcoal/25 px-6 py-3 text-sm font-bold text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-white"
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

              {/* course outline / modules */}
              {content?.outline && content.outline.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    Course outline
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/60">
                    What the {course.name} course covers, module by module.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {content.outline.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-charcoal/80">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                          <svg className="h-3.5 w-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* learning outcomes */}
              {content?.outcomes && content.outcomes.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    Learning outcomes
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/60">
                    By the end of this course, learners will be able to:
                  </p>
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

              {/* entry requirements */}
              {content?.entryRequirements && content.entryRequirements.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                    Entry requirements
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {content.entryRequirements.map((a) => (
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
                    <dd className="text-right font-semibold text-charcoal">{deliveryLabel(deliveryModes)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                    <dt className="text-charcoal/60">Certification</dt>
                    <dd className="text-right font-semibold leading-snug text-charcoal">
                      {content?.certification || "Accredited certificate"}
                    </dd>
                  </div>
                  {content?.nqf && (
                    <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                      <dt className="text-charcoal/60">NQF level</dt>
                      <dd className="font-bold text-charcoal">{content.nqf}</dd>
                    </div>
                  )}
                  {content?.us_id && (
                    <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                      <dt className="text-charcoal/60">Unit Standard ID</dt>
                      <dd className="font-bold text-charcoal">{content.us_id}</dd>
                    </div>
                  )}
                  {content?.us_name && (
                    <div className="border-t border-line pt-4">
                      <dt className="text-charcoal/60">Unit standard</dt>
                      <dd className="mt-1 font-semibold leading-snug text-charcoal">{content.us_name}</dd>
                    </div>
                  )}
                </dl>
                <a
                  href={waLink}
                  data-booking
                  data-course={course.name}
                  className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
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
                <h2 className="font-display text-lg text-white">Why train with RSTL?</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
                  {whyBullets.map((t) => (
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

          {/* reviews for this course */}
          <div className="mt-16">
            <ReviewsSection
              courseSlug={course.slug}
              courseName={course.name}
              title={`Reviews for ${course.name}`}
              limit={6}
            />
          </div>
        </div>
      </section>

      <CTABand
        title={`Ready to book ${course.name}?`}
        sub="Email us for pricing, dates and group discounts. A training advisor responds fast."
      />
    </>
  );
}
