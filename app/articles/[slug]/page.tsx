import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL_ARTICLES,
  ARTICLE_BY_SLUG,
  articleUrl,
  otherArticles,
  type Article,
} from "@/lib/articles";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import InlineText from "@/components/InlineText";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLE_BY_SLUG[slug];
  if (!article) return {};

  // Title deliberately omits the brand: the root layout template appends it.
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    alternates: { canonical: articleUrl(article) },
    openGraph: {
      title: `${article.metaTitle} | ${SITE.name}`,
      description: article.metaDescription,
      url: `${SITE.url}${articleUrl(article)}`,
      type: "article",
      siteName: SITE.name,
      locale: "en_ZA",
      publishedTime: article.date,
      modifiedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.metaTitle} | ${SITE.name}`,
      description: article.metaDescription,
    },
  };
}

function jsonLd(article: Article) {
  const url = `${SITE.url}${articleUrl(article)}`;
  return graph(
    organizationSchema(),
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.metaDescription,
      url,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: "en-ZA",
      articleSection: article.category,
      // The organisation owns the content: the practice publishes as RSTL Centre, and
      // inventing an individual byline would be a fact the client has not given us.
      author: { "@id": `${SITE.url}/#organization` },
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      about: { "@type": "Thing", name: article.primaryKeyword },
      keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
    },
    {
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Articles", path: "/articles" },
      { name: article.title, path: articleUrl(article) },
    ])
  );
}

function readableDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLE_BY_SLUG[slug];
  if (!article) notFound();

  const related = otherArticles(article.slug, 3);
  const quoteLink = `mailto:${SITE.email}?subject=${encodeURIComponent("Training Quotation Request")}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(article)) }}
      />

      <article className="bg-white text-charcoal">
        {/* hero */}
        <header className="relative overflow-hidden border-b border-line bg-cream">
          <div className="hero-grid-light absolute inset-0" aria-hidden />
          <div className="hazard-stripes h-1.5 w-full" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal/60">
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/articles" className="hover:text-brand">
                Articles
              </Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-sand">
              <span>{article.category}</span>
              <span className="text-charcoal/25">|</span>
              <span className="text-charcoal/50">{article.readMinutes} min read</span>
            </div>
            <h1 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-charcoal/75 sm:text-lg">
              {article.excerpt}
            </p>
            <p className="mt-6 text-xs text-charcoal/50">
              Published <time dateTime={article.date}>{readableDate(article.date)}</time> · {SITE.name}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
          {/* intro */}
          <div className="space-y-5 text-base leading-relaxed text-charcoal/80 sm:text-[1.0625rem]">
            {article.intro.map((p, i) => (
              <p key={i}>
                <InlineText text={p} />
              </p>
            ))}
          </div>

          {/* body sections */}
          {article.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-display text-2xl leading-snug text-charcoal sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-5 text-base leading-relaxed text-charcoal/80 sm:text-[1.0625rem]">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>
                    <InlineText text={p} />
                  </p>
                ))}
              </div>

              {section.list && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed text-charcoal/80">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                      <span>
                        <InlineText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-charcoal text-cream">
                      <tr>
                        {section.table.head.map((h) => (
                          <th key={h} className="px-4 py-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, r) => (
                        <tr key={r} className={r % 2 ? "bg-cream/60" : "bg-white"}>
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className={`border-t border-line px-4 py-3 align-top ${
                                c === 0 ? "font-semibold text-charcoal" : "text-charcoal/75"
                              }`}
                            >
                              <InlineText text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* FAQs */}
          {article.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl leading-snug text-charcoal sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-5 divide-y divide-line rounded-xl border border-line">
                {article.faqs.map((f) => (
                  <div key={f.q} className="p-5">
                    <h3 className="font-semibold leading-snug text-charcoal">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                      <InlineText text={f.a} />
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* closing call to action */}
          {article.closing.length > 0 && (
            <section className="mt-12 rounded-2xl border border-line bg-brand-soft p-6 sm:p-8">
              <h2 className="font-display text-2xl leading-snug text-charcoal">
                {article.closingHeading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-charcoal/80">
                {article.closing.map((p, i) => (
                  <p key={i}>
                    <InlineText text={p} />
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={quoteLink}
                  data-booking
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-bold text-white shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
                >
                  Request a Quote
                </a>
                <Link
                  href="/courses"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-charcoal/20 px-6 py-3 text-base font-bold text-charcoal transition-colors hover:border-charcoal"
                >
                  Browse all courses
                </Link>
              </div>
            </section>
          )}

          {/* related courses mentioned in the copy */}
          {article.courseLinks.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
                Courses mentioned in this article
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {article.courseLinks.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-brand hover:text-brand"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      {/* more articles */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl text-charcoal sm:text-3xl">More articles</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {related.map((a) => (
                <article
                  key={a.slug}
                  className="flex flex-col rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-charcoal/10"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-sand">
                    {a.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg leading-snug text-charcoal">
                    <Link href={articleUrl(a)} className="hover:text-brand">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{a.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
