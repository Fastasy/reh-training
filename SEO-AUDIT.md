# SEO audit — rstlcentre.co.za

Audited **all 99 indexable URLs** (5 pages + 94 course pages) against a production build,
reading the RENDERED HTML rather than the source.

Two scripts back this document and can be re-run after any change:

```bash
npm run build && PORT=3108 npm run start     # in another shell
node scripts/audit-seo.mjs http://localhost:3108   # titles, descriptions, canonicals,
                                                   # cards, H1s, schema, alts, linking
node scripts/verify-sitemap.mjs http://localhost:3108  # (npm run verify:sitemap)
```

Latest run: **0 findings**, sitemap **PASS** (99 URLs, all 200, canonicals match, none noindexed).

| Check | Result |
|---|---|
| Title tags | 99/99 present, 35–62 chars, no duplicates |
| Meta descriptions | 99/99 present, 127–157 chars |
| Canonical == sitemap URL | 99/99 |
| noindex leaks | 0 |
| H1 | exactly one per page, no joined-word render bugs |
| Share cards (og + twitter) | 99/99, titles match, absolute image URLs |
| JSON-LD | valid on 99/99, no placeholder contact data |
| Image alt coverage | 100% (decorative-only exceptions) |
| Internal linking | course pages link all 94 courses; static pages 16–17 |
| Words per course page | 1,146–1,347 (money-query benchmark is 1,200+) |

## Fixed in code

1. **Share cards.** All 94 course pages defined `openGraph` but inherited the ROOT
   `twitter:` block, so every course shared as "Accredited Health & Safety Training |
   RSTL Centre" instead of its own title. Every page now carries a matching `twitter`
   block plus `og:locale: en_ZA`.
2. **Per-course Open Graph images.** `app/courses/[slug]/opengraph-image.tsx` renders a
   1200×630 card per course (category, name, published price, duration, branches).
   Verified: two courses return different 44KB/49KB PNGs at 1200×630, brand colours
   sampled at the pixel level.
3. **Default OG card.** The site shared a 1280×1280 SQUARE image carrying legacy REH
   branding. `scripts/make-og-image.py` generates `public/images/og-default.png`
   (1200×630, RSTL Centre). New filename on purpose: every cache layer keys off the URL,
   so swapping bytes under the old name would keep showing the stale card.
4. **Structured data — was missing on 4 of 5 top-level pages.**
   - `/courses`: `CollectionPage` + `ItemList` of all 94 courses + breadcrumb
   - `/medicals`, `/soft-skills`: `Service` + `OfferCatalog` + breadcrumb
   - `/contact`: `ContactPage` + `Organization` + breadcrumb
   - Home: the old node crammed **three** addresses into a single `address` property
     (no validator accepts that cleanly). Now three branch nodes, each with one address,
     `hasMap`, `telephone`, plus `areaServed`, `priceRange`, `contactPoint`, `sameAs`
     (Facebook + TikTok) and a `WebSite` node.
   - Course pages now reference the organisation by `@id` instead of re-typing a
     duplicate org node with a hardcoded Midrand address.
5. **Descriptions.** Home 184→157 chars; /courses 162→145; /medicals 188→146;
   /soft-skills 194→153; the shortest course blurb (95) now pads with a factual line.
   Course descriptions cut at a word boundary instead of mid-word.
6. **`lang="en"` → `lang="en-ZA"`**, `theme-color`, `colorScheme`.
7. **N.A.P. in one place** (`lib/site.ts`) — phones, emails and addresses are no longer
   retyped across pages, so schema can't drift from the site copy.
8. **`public/llms.txt`** dropped the `/consulting` entry (it 308s to `/soft-skills`) and
   lists soft skills instead.

## Deliberately NOT done (with reasons)

- **No `AggregateRating`/`Review` schema.** The Google reviews are of the business
  itself; self-serving review markup is against Google's policy and earns no rich
  result. Reviews stay visible on-page with a link to the Business Profile.
- **No `logo` in the Organization node** until a real RSTL Centre logo exists. The only
  logo file is the legacy REH artwork, and feeding a stale-brand image to Google's brand
  graph is worse than omitting the property.
- **No hreflang** — single language site.
- **No `Offer` on quote-only courses** — only genuinely published prices are marked up.

## Open — needs a decision or a client action

### Content (client/Ruan decision)
- **Keyword cannibalisation:** `/courses/emergency-evacuation-procedures` (1,208 words)
  and `/courses/emergency-evacuation-training` (1,185 words) are two pages targeting the
  same intent at the same R650 price, from two different content files. Consolidate into
  one and 301 the other.
- **Near-duplicate:** `/courses/mewp-operator` and `/courses/cherry-picker-operator` are
  the same machine class, both now R4,500. Consider merging (one page + 301).
- **18 machine-and-plant courses in the client's 34-course master list have no page**
  (scraper, LHD/scoop, face shovel, wheeled dozer, dragline, road miller, asphalt paver,
  screed, bitumen sprayer, service truck, mobile crane, crawler crane, overhead/gantry
  crane, heavy hydraulic crane, winch, telehandler, reach stacker, reach truck). Their
  prices are published nowhere on the site yet.
- **No consulting page.** The old site advertises OHS consulting; the new site 308s
  `/Consulting` to `/soft-skills`, a different service. Decide before the domain flip.
- **No blog.** The old site's single post now redirects here. Content is the growth
  lever once the technical base is correct.

### Client-side (their accounts — nothing we can code)
- **Google Business Profiles:** rename all three to `RSTL Centre…` (Place IDs survive the
  rename; `lib/googleLocations.ts` is already updated to read the new names).
- **Search Console:** verify `rstlcentre.co.za`, submit `/sitemap.xml`, run Change of
  Address from the old property, then Request Indexing for the key pages.
- **Google Ads:** update final URLs, sitelinks and the display name.
- **Zoho:** mailboxes on the new domain + MX records, then
  `python3 scripts/rebrand-rstl.py --email-flip` (one command, ~40 references).
- **Domain:** register `rstlcentre.co.za` (unregistered as of 2026-09-10) and point it at
  the Vercel project; the 308 map in `next.config.ts` is already in place.
- **Logo assets:** real logo → replace `public/images/reh-logo.png`, regenerate
  `app/icon.png`, `app/apple-icon.png`, `og-default.png` and the course cards.
- **Backlinks:** a new domain has zero real ones. On-page work gets you eligible; links
  get you ranked. That is the single biggest remaining constraint.

### Housekeeping
- `public/images/og-image.png` (208KB, square, legacy branding) is now unreferenced.
  Delete it once the new card is confirmed in WhatsApp/Facebook previews — the old URL
  may still be cached by the platforms messaging it.
