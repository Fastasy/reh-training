import type { Metadata } from "next";
import Link from "next/link";
import { PUBLISHED_ARTICLES, articleUrl } from "@/lib/articles";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import CTABand from "@/components/CTABand";
import SectionHeading from "@/components/SectionHeading";

const PATH = "/articles";

export const metadata: Metadata = {
  title: "Health & Safety Training Articles",
  description:
    "Practical guides to South African health and safety training: who needs what, what the law requires, what courses cost, and how Mthatha employers get staff trained without waiting.",
  alternates: { canonical: PATH },
  openGraph: {
    title: `Health & Safety Training Articles | ${SITE.name}`,
    description:
      "Practical guides to South African health and safety training: who needs what, what the law requires and what it costs.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    siteName: SITE.name,
    locale: "en_ZA",
  },
  twitter: { card: "summary_large_image" },
};

function jsonLd() {
  return graph(
    organizationSchema(),
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}${PATH}#collection`,
      name: `Health & Safety Training Articles | ${SITE.name}`,
      url: `${SITE.url}${PATH}`,
      description:
        "Practical guides to South African health and safety training, covering legal duties, course costs and requirements.",
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en-ZA",
      hasPart: PUBLISHED_ARTICLES.map((a) => ({
        "@type": "Article",
        headline: a.title,
        url: `${SITE.url}${articleUrl(a)}`,
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Articles", path: PATH },
    ])
  );
}

/** "10 September 2026" — a date a South African reader reads without translating. */
function readableDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export default function ArticlesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="relative overflow-hidden bg-white text-charcoal">
        <div className="hero-grid-light absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal/60">
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">Articles</span>
          </nav>
          <SectionHeading
            eyebrow="Guides"
            title="Health and safety training, explained"
            sub="Who needs which course, what South African law actually requires, and what it costs. Written for employers and safety officers who need a straight answer, not a sales page."
          />
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {PUBLISHED_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-charcoal/10"
              >
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-sand">
                  <span>{article.category}</span>
                  <span className="text-charcoal/25">|</span>
                  <span className="text-charcoal/50">{article.readMinutes} min read</span>
                </div>
                <h2 className="mt-3 font-display text-2xl leading-snug text-charcoal">
                  <Link href={articleUrl(article)} className="hover:text-brand">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{article.excerpt}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <time dateTime={article.date} className="text-xs text-charcoal/50">
                    {readableDate(article.date)}
                  </time>
                  <Link
                    href={articleUrl(article)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-line px-4 text-sm font-bold text-charcoal transition-colors hover:border-charcoal"
                  >
                    Read
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden
                    >
                      <path d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need a course booked, not just read about?"
        sub="Tell us the courses, the number of staff and the branch, and we will send a quotation."
      />
    </>
  );
}
