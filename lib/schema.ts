/**
 * Structured data builders. One place for every JSON-LD graph the site emits, so the
 * organisation node is identical wherever it appears and branch/N.A.P. details come
 * from lib/site.ts rather than being re-typed per page.
 *
 * Deliberately no `logo`: the only logo file on the site is the legacy REH artwork, and
 * feeding a stale-brand image to Google's brand knowledge graph is worse than omitting
 * the field. Add it here once the client supplies the RSTL Centre logo.
 */
import { SITE } from "./site";
import { getGoogleLocation } from "./googleLocations";
import { COURSE_CATEGORIES } from "./courses";
import { courseUrl } from "./slugs";

const abs = (path: string) => `${SITE.url}${path}`;

/** Primary organisation node. */
export function organizationSchema() {
  return {
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "RSTL",
    url: SITE.url,
    description:
      "Accredited health and safety training, soft skills courses and occupational medicals, delivered online, on site and at our centres in Midrand, Durban and Mthatha.",
    email: SITE.email,
    telephone: SITE.phone,
    image: abs("/images/og-default.png"),
    priceRange: SITE.priceRange,
    areaServed: SITE.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [SITE.social.facebook, SITE.social.tiktok],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: "ZA",
        availableLanguage: ["en", "af"],
      },
    ],
    // Each branch is its own node with one address, rather than three addresses crammed
    // into a single `address` property (which no validator accepts cleanly).
    department: SITE.branches.map((b) => branchSchema(b.id)),
  };
}

/** A single training centre, with its map link from the Google Business Profile data. */
export function branchSchema(id: string) {
  const b = SITE.branches.find((x) => x.id === id) ?? SITE.branches[0];
  const place = getGoogleLocation(id);
  return {
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}/#branch-${b.id}`,
    name: b.name,
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    telephone: b.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.street,
      addressLocality: b.city,
      addressRegion: b.region,
      ...("postalCode" in b ? { postalCode: b.postalCode } : {}),
      addressCountry: b.country,
    },
    areaServed: { "@type": "City", name: b.city },
    hasMap: place.mapsUrl,
  };
}

/** WebSite node — tells Google the site's own name and canonical host. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-ZA",
  };
}

/** Breadcrumb trail. Pass the trail in order, starting with Home. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** The full catalogue as an ordered ItemList — feeds the /courses page. */
export function courseListSchema() {
  let position = 1;
  const items: Record<string, unknown>[] = [];
  for (const cat of COURSE_CATEGORIES) {
    for (const course of cat.courses) {
      items.push({
        "@type": "ListItem",
        position: position++,
        name: course.name,
        url: abs(courseUrl(course.name)),
      });
    }
  }
  return {
    "@type": "ItemList",
    "@id": `${SITE.url}/courses#courselist`,
    name: `${SITE.name} course catalogue`,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items,
  };
}

/** A service page (medicals, soft skills). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  services?: Record<string, unknown>[];
}) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    serviceType: opts.name,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "South Africa" },
    ...(opts.services
      ? { hasOfferCatalog: { "@type": "OfferCatalog", name: opts.name, itemListElement: opts.services } }
      : {}),
  };
}

/** Contact page node, tied to the organisation by @id. */
export function contactPageSchema(description: string) {
  return {
    "@type": "ContactPage",
    "@id": `${SITE.url}/contact#page`,
    url: abs("/contact"),
    name: `Contact ${SITE.name}`,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
  };
}

/** Wrap any nodes into a single graph document. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
