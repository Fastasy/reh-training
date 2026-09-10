#!/usr/bin/env node
/**
 * Sitemap audit. Proves the sitemap is actually proper, rather than assuming it is.
 *
 *   node scripts/verify-sitemap.mjs                       # audit production
 *   node scripts/verify-sitemap.mjs http://localhost:3108 # audit a local build/preview
 *
 * Checks: valid XML + namespace, URLs unique, all on the canonical origin, no query
 * strings, no redirect/API/404 routes, and every URL returns 200 HTML with no redirect.
 * Exit code 1 if any check fails, so it can gate a deploy.
 */
const TEST_BASE = (process.argv[2] || "https://rstlcentre.co.za").replace(/\/$/, "");
const CANONICAL = "https://www.rstlcentre.co.za";

/** Routes that must never appear in a sitemap for this site. */
const BANNED = ["/consulting", "/api", "/_next", "/404", "/500", "?", "#", "/_not-found"];

const fail = [];
const note = (ok, msg) => {
  console.log(`${ok ? "  ok  " : " FAIL "} ${msg}`);
  if (!ok) fail.push(msg);
};

const xml = await (await fetch(`${TEST_BASE}/sitemap.xml`)).text();

// --- structure ---
note(xml.trimStart().startsWith("<?xml"), "starts with an XML declaration");
note(/<urlset[^>]+sitemaps\.org\/schemas\/sitemap/.test(xml), "has the sitemap 0.9 namespace");
note(!/<sitemapindex/.test(xml), "is a urlset (single sitemap, not an index)");

const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
note(locs.length > 0, `contains ${locs.length} URLs`);
note(new Set(locs).size === locs.length, "no duplicate URLs");

const offOrigin = locs.filter((u) => !u.startsWith(CANONICAL));
note(offOrigin.length === 0, `every URL on the canonical origin (${offOrigin.length} off-origin)`);
if (offOrigin.length) console.log("        ", offOrigin.slice(0, 5).join("\n         "));

const bad = locs.filter((u) => BANNED.some((b) => u.slice(CANONICAL.length).includes(b)));
note(bad.length === 0, `no redirect / API / error / parameterised URLs (${bad.length} found)`);
if (bad.length) console.log("        ", bad.slice(0, 5).join("\n         "));

// --- lastmod sanity ---
const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
const future = lastmods.filter((d) => new Date(d).getTime() > Date.now() + 60_000);
note(lastmods.length === locs.length, `every URL carries a lastmod (${lastmods.length}/${locs.length})`);
note(future.length === 0, `no lastmod in the future (${future.length} found)`);
const distinct = new Set(lastmods).size;
console.log(`  info  ${distinct} distinct lastmod value(s) across ${locs.length} URLs`);

// --- every URL resolves, declares itself canonical, and is indexable ---
let ok = 0;
const broken = [];
const canonMismatch = [];
const noindexed = [];
const batch = 8;
for (let i = 0; i < locs.length; i += batch) {
  await Promise.all(
    locs.slice(i, i + batch).map(async (loc) => {
      const target = TEST_BASE + loc.slice(CANONICAL.length);
      try {
        const r = await fetch(target, { redirect: "manual" });
        const ct = r.headers.get("content-type") || "";
        if (r.status !== 200) broken.push(`${r.status} ${loc}`);
        else if (!ct.includes("text/html")) broken.push(`content-type ${ct} ${loc}`);
        else {
          ok++;
          const body = await r.text();
          // A page in the sitemap must point its canonical at itself (same host, no
          // trailing-slash or www/non-www drift) or Google drops it as a duplicate.
          const c = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
          const expected = loc.replace(/\/$/, "");
          if (c !== expected) canonMismatch.push(`${loc} -> canonical ${c ?? "MISSING"}`);
          if (/<meta name="robots" content="[^"]*noindex/i.test(body)) noindexed.push(loc);
        }
      } catch (e) {
        broken.push(`${e.message} ${loc}`);
      }
    })
  );
}
note(broken.length === 0, `all ${locs.length} URLs return 200 HTML (${broken.length} broken)`);
if (broken.length) console.log("        ", broken.slice(0, 10).join("\n         "));
note(canonMismatch.length === 0, `every page's canonical matches its sitemap URL (${canonMismatch.length} mismatched)`);
if (canonMismatch.length) console.log("        ", canonMismatch.slice(0, 10).join("\n         "));
note(noindexed.length === 0, `no sitemap URL is noindexed (${noindexed.length} found)`);
if (noindexed.length) console.log("        ", noindexed.slice(0, 10).join("\n         "));

// --- robots.txt advertises it ---
const robots = await (await fetch(`${TEST_BASE}/robots.txt`)).text();
const advertised = robots.split("\n").some((l) => /^sitemap:/i.test(l.trim()) && l.includes("sitemap.xml"));
note(advertised, "robots.txt points at the sitemap");
if (advertised) {
  const declared = robots.split("\n").find((l) => /^sitemap:/i.test(l.trim())).split(":").slice(1).join(":").trim();
  note(declared.startsWith(CANONICAL), `robots.txt advertises the canonical origin (${declared})`);
}

console.log(
  fail.length
    ? `\nFAILED: ${fail.length} check(s) on ${TEST_BASE}`
    : `\nPASS: sitemap on ${TEST_BASE} is valid, complete and crawlable (${locs.length} URLs)`
);
process.exit(fail.length ? 1 : 0);
