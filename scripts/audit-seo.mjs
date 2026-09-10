#!/usr/bin/env node
/**
 * Full-site SEO audit against a running server (local build or live).
 *
 *   node scripts/audit-seo.mjs http://localhost:3108
 *
 * Checks every URL in the sitemap, from the RENDERED HTML (not the source):
 * titles, meta descriptions, canonicals, robots, H1s, share cards, JSON-LD,
 * image alts, internal links, word count. Prints a findings report and JSON.
 */
import { writeFileSync } from "node:fs";

const BASE = (process.argv[2] || "http://localhost:3108").replace(/\/$/, "");
const CANONICAL = "https://www.rstlcentre.co.za";
const BRAND = "RSTL Centre";

const TITLE_MAX = 62;
const DESC_MIN = 120;
const DESC_MAX = 165;

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.log(`auditing ${locs.length} URLs from ${BASE}\n`);

const tag = (html, re) => html.match(re)?.[1]?.trim() ?? null;
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
/** Rendered HTML escapes entities; measure what a human/Google actually sees. */
const decode = (s) =>
  s == null
    ? s
    : s
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&mdash;/g, "—")
        .replace(/&ndash;/g, "–");

const rows = [];
const batch = 8;
for (let i = 0; i < locs.length; i += batch) {
  await Promise.all(
    locs.slice(i, i + batch).map(async (loc) => {
      const path = loc.slice(CANONICAL.length) || "/";
      const html = await (await fetch(BASE + path)).text();

      const h1s = all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map((h) =>
        h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
      );
      const text = html
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<style[\s\S]*?<\/style>/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-z]+;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      // NOTE: no capture group in this pattern, so take the whole match.
      const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
      const alts = imgs.filter((t) => /alt="[^"]+"/.test(t)).length;
      const ld = all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
      const types = [];
      for (const block of ld) {
        try {
          const parsed = JSON.parse(block);
          const walk = (n) => {
            if (Array.isArray(n)) return n.forEach(walk);
            if (n && typeof n === "object") {
              if (n["@type"]) types.push(...[].concat(n["@type"]));
              Object.values(n).forEach(walk);
            }
          };
          walk(parsed);
        } catch {
          types.push("INVALID-JSON-LD");
        }
      }

      rows.push({
        path,
        title: decode(tag(html, /<title>([\s\S]*?)<\/title>/)),
        desc: decode(tag(html, /<meta name="description" content="([^"]*)"/)),
        canonical: tag(html, /<link rel="canonical" href="([^"]*)"/),
        robots: tag(html, /<meta name="robots" content="([^"]*)"/) ?? "(none)",
        h1: h1s.map(decode),
        h2count: all(html, /<h2[^>]*>/g).length,
        ogTitle: tag(html, /<meta property="og:title" content="([^"]*)"/),
        ogDesc: tag(html, /<meta property="og:description" content="([^"]*)"/),
        ogImage: tag(html, /<meta property="og:image" content="([^"]*)"/),
        ogType: tag(html, /<meta property="og:type" content="([^"]*)"/),
        twitterCard: tag(html, /<meta name="twitter:card" content="([^"]*)"/),
        twitterTitle: tag(html, /<meta name="twitter:title" content="([^"]*)"/),
        ldTypes: [...new Set(types)],
        imgs: imgs.length,
        alts,
        links: all(html, /href="(\/[^"?#]*)"/g).length,
        words: text.split(" ").filter(Boolean).length,
      });
    })
  );
}
rows.sort((a, b) => a.path.localeCompare(b.path));

// ---------- findings ----------
const F = [];
const add = (level, issue, detail) => F.push({ level, issue, detail });

const byTitle = {};
rows.forEach((r) => ((byTitle[r.title] ??= []).push(r.path)));
for (const [t, paths] of Object.entries(byTitle))
  if (paths.length > 1) add("HIGH", "Duplicate <title>", `"${t}" on ${paths.length} pages: ${paths.slice(0, 4).join(", ")}`);

for (const r of rows) {
  if (!r.title) add("HIGH", "Missing title", r.path);
  else if (r.title.length > TITLE_MAX) add("MED", "Title over 62 chars", `${r.path} (${r.title.length}): ${r.title}`);
  if (!r.desc) add("HIGH", "Missing meta description", r.path);
  else if (r.desc.length < DESC_MIN) add("MED", "Short meta description", `${r.path} (${r.desc.length})`);
  else if (r.desc.length > DESC_MAX) add("MED", "Long meta description", `${r.path} (${r.desc.length})`);
  if (r.canonical !== (CANONICAL + r.path).replace(/\/$/, "")) add("HIGH", "Canonical mismatch", `${r.path} -> ${r.canonical}`);
  if (/noindex/i.test(r.robots)) add("HIGH", "noindex", `${r.path} (${r.robots})`);
  if (r.h1.length === 0) add("HIGH", "No H1", r.path);
  if (r.h1.length > 1) add("MED", "Multiple H1", `${r.path}: ${r.h1.length}`);
  if (r.h1.some((h) => /[a-z][A-Z]/.test(h) && !/iPhone|iPhone|MacBook/.test(h) && /[a-z]{2}[A-Z][a-z]/.test(h)))
    add("MED", "H1 possible joined words", `${r.path}: "${r.h1[0]}"`);
  if (!r.ogImage) add("HIGH", "No og:image", r.path);
  if (!r.ogTitle) add("HIGH", "No og:title", r.path);
  if (!r.ogDesc) add("MED", "No og:description", r.path);
  if (!r.ogType) add("LOW", "No og:type", r.path);
  if (!r.twitterCard) add("MED", "No twitter:card", r.path);
  if (r.twitterTitle && r.ogTitle && r.twitterTitle !== r.ogTitle)
    add("MED", "twitter:title != og:title", `${r.path}: "${r.twitterTitle}" vs "${r.ogTitle}"`);
  if (r.ldTypes.includes("INVALID-JSON-LD")) add("HIGH", "Invalid JSON-LD", r.path);
  if (r.imgs > 0 && r.alts < r.imgs) add("LOW", `Images missing alt (${r.imgs - r.alts}/${r.imgs})`, r.path);
  if (!r.ldTypes.length) add("MED", "No structured data", r.path);
  if (r.links < 10) add("LOW", `Thin internal linking (${r.links} links)`, r.path);
  if (r.path.startsWith("/courses/") && r.words < 300) add("MED", `Thin content (${r.words} words)`, r.path);
}

const levels = { HIGH: "🔴", MED: "🟠", LOW: "🟡" };
for (const lvl of ["HIGH", "MED", "LOW"]) {
  const items = F.filter((f) => f.level === lvl);
  if (!items.length) continue;
  console.log(`\n${levels[lvl]} ${lvl} (${items.length})`);
  for (const f of items) console.log(`   ${f.issue}: ${f.detail}`);
}

// distribution summary
const ldAll = [...new Set(rows.flatMap((r) => r.ldTypes))].sort();
console.log(`\nstructured data types in the wild: ${ldAll.join(", ") || "none"}`);
console.log(`titles: ${Math.min(...rows.map((r) => r.title?.length ?? 0))}-${Math.max(...rows.map((r) => r.title?.length ?? 0))} chars`);
console.log(`descriptions: ${Math.min(...rows.map((r) => r.desc?.length ?? 0))}-${Math.max(...rows.map((r) => r.desc?.length ?? 0))} chars`);
console.log(`words per course page: ${Math.min(...rows.filter((r) => r.path.startsWith("/courses/")).map((r) => r.words))}-${Math.max(...rows.filter((r) => r.path.startsWith("/courses/")).map((r) => r.words))}`);
console.log(`\nTOTAL findings: ${F.length} (HIGH ${F.filter((f) => f.level === "HIGH").length})`);

writeFileSync("/tmp/seo-audit.json", JSON.stringify({ rows, findings: F }, null, 2));
console.log("raw data: /tmp/seo-audit.json");
