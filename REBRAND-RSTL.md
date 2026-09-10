# Rebrand: REH Safety Training → RSTL Centre

**Client decision (2026-09-10):** whole name changes to **RSTL Centre**. Every `REH`
mention becomes `RSTL` (including `REH Medicals` → `RSTL Medicals`). Domain moves to
**www.rstlcentre.co.za**, with the old domain 301'd across.

Applied by `scripts/rebrand-rstl.py` (re-runnable: `--check`, `--apply`, `--revert`,
`--email-flip`). The script refuses to touch `next.config.ts` on a re-run — that file
now holds the legacy hostnames on purpose for the 301.

## Done in code

| Area | Change |
|---|---|
| Brand strings | 68× `REH Safety Training` → `RSTL Centre`; `REH Medicals` → `RSTL Medicals`; all standalone `REH` → `RSTL` |
| URLs | 280× `rehtraining.co.za` → `rstlcentre.co.za` (metadata, canonical, sitemap, robots, JSON-LD, FAQ answers, llms.txt) |
| Code identifier | `REH_EMAIL` → `RSTL_EMAIL` (`lib/courses.ts` + BookingModal + QuoteForm) |
| Redirects | `next.config.ts`: host-based **308** for `rehtraining.co.za` / `www.rehtraining.co.za` → `https://www.rstlcentre.co.za/:path*`, plus non-www → www on the new domain |
| Maps embeds | `lib/googleLocations.ts` `embedQuery` switched to **address-only**, so the embed resolves before *and* after Google renames the Business Profiles (Place IDs unchanged) |
| Titles | Course-page titles fixed (brand was being rendered twice); soft-skills + medicals titles trimmed to fit Google's ~62-char cut-off |
| Content bug | `emergency-fire.json`: "our accredited, accredited approach" → "our accredited approach" |

Verified: `tsc --noEmit` clean, `next build` clean (104 pages), 0 doubled titles,
0 course titles over 62 chars, 0 `REH` in built HTML.

## Deliberately NOT changed (and why)

| Left as-is | Reason |
|---|---|
| `info@rehtraining.co.za` (mailbox in ~40 places) | The Zoho mailbox lives on the old domain. Pointing the site's primary conversion path at `info@rstlcentre.co.za` before the new mailbox + MX exist sends every quote request into the void. Flip it the moment mail is live — see checklist. |
| `facebook.com/rehtraining`, `tiktok.com/@rehsafetytraining` | Client-owned pages. Changing the URL before they rename the page creates broken social links in the footer. |
| GTM events `reh:quote`, `reh:review` and the `reh-reviews` blob store | Live interface contracts with the client's GTM container (GTM-T8J7SZQB) / Vercel storage. Renaming them silently breaks conversion tracking. |
| Vercel project `reh-training` | Renaming changes the preview URL (`reh-training.vercel.app`). Cosmetic; do it when everything else is settled. |
| `public/images/reh-logo.png` (nav + footer), `public/images/og-image.png`, `accreditations.jpg` | REH branding is baked into the pixels. Awaiting the client's new logo. The favicon/app icons are off this list — see below. |
| `.firecrawl/**` scrape archives | Historical record of the old site's content. |

## Favicon / app icons (fixed 2026-09-10)

The site was still serving the **create-next-app default `app/favicon.ico` — the black
circle with the white Vercel triangle** — because nobody had replaced it. The app icons
`public/app/icon.png` + `apple-icon.png` were the legacy REH lockup, which is illegible
at 16px anyway.

Interim mark (until the client's art lands): charcoal `#252423` tile, cream `#f5f0ec`
serif `R`, red `#e21c14` base band — the same language as `og-default.png`, and the same
charcoal as the `themeColor`, so the Android chrome bar and the tile agree.
`scripts/make-favicon.py` generates the whole set (`--check` reports without writing).

Icons now live under Next's **file conventions** in `app/`: `favicon.ico`, `icon.png`
(512), `apple-icon.png` (180). Next emits them as content-hashed URLs
(`/icon.png?icon.0cbo39okelpye.png`), so replacing an icon busts the browser and crawler
cache automatically. The previous hand-rolled `/app/icon.png` path was **unhashed** and
would have kept serving the old icon after any swap; `public/app/` is deleted and the
old URLs 404. Because of that, the explicit `icons` block was removed from
`app/layout.tsx` — do not re-add one pointing at `/public` paths.

Verified 2026-09-10: `tsc --noEmit` clean, `next build` clean, served
`/favicon.ico`, `/icon.png`, `/apple-icon.png` byte-identical to the files on disk,
`.ico` holds six PNG-compressed frames (16/32/48/64/128/256), old `/app/*` URLs 404.

## Legacy URL map (for the 301s)

The old Zoho site is **still live** on `www.rehtraining.co.za` (verified 2026-09-10: HTTP 200, `server: ZGS`), so the host-based 308 in `next.config.ts` has never fired. It publishes two sitemaps: `sitemap-cms.xml` and `sitemap-post.xml`. Between them the old site has only **six URLs**:

| Old URL | New destination | Status |
|---|---|---|
| `/` | `/` | Covered by the host catch-all, path exists |
| `/contact` | `/contact` | Covered, path exists |
| `/courses` | `/courses` | Covered, path exists |
| `/medicals` | `/medicals` | Covered, path exists |
| `/Consulting` | `/soft-skills` | Covered by the explicit rule in `next.config.ts` |
| `/blogs/post/working-at-heights` | `/courses/working-at-heights` | **Covered** — explicit absolute rule in `next.config.ts` (was going to 404) |

**Details that matter:**

- The catch-all host rule is `source: "/:path*"` with a host condition, so a legacy-only path such as `/blogs/post/working-at-heights` would forward to the new domain **at the same path**, where nothing exists. Hence the explicit `LEGACY_PATHS` entries.
- Legacy path rules live in `LEGACY_PATHS` in `next.config.ts`, **before** the host catch-all, with **absolute** destinations so any legacy URL resolves in one hop rather than bouncing through the old host first. Verified 2026-09-10 on all six old URLs with `Host:` headers: every one returns a single 308 to a live destination.
- `/blogs/post/working-at-heights` is the old site's **only** blog post (published 2026-01-04). It duplicates the old Working at Heights landing page: Unit Standard 120362, NQF Level 3, 1 day, R700. It carries the only content URL with any age on the domain, so redirect it to the new course page rather than letting it 404.
- **The old site still advertises OHS consulting** (`/Consulting`: risk assessments, HIRA, legal compliance audits and gap analysis) and occupational health medicals. The new site removed consulting and serves it as a 308 to `/soft-skills`. So the two domains currently publish different service lists, and a visitor comparing them will see consulting disappear. Resolve the consulting decision before the flip rather than after.

## Launch checklist

**Code / deploy**
- [x] Rebrand committed and pushed (Vercel auto-deploys)
- [x] Favicon + app icons: replaced the create-next-app default (Vercel triangle) and the legacy REH lockup with the interim RSTL tile — `scripts/make-favicon.py` writes `app/favicon.ico` (16/32/48/64/128/256), `app/icon.png` (512), `app/apple-icon.png` (180)
- [ ] Client sends logo files → replace `public/images/reh-logo.png` (nav + footer; alt text already updated), regenerate `og-image.png` (1200×630 ideally, currently 1280×1280) and the icon set via `scripts/make-favicon.py`; eyeball `accreditations.jpg`
- [ ] Request favicon refresh in Search Console after the client's real logo lands (Google caches favicons separately from page data)
- [ ] Register `rstlcentre.co.za` (unregistered as of 2026-09-10; `rstl.co.za` is taken by a third party)
- [ ] Add `rstlcentre.co.za` + `www.rstlcentre.co.za` as domains in the Vercel project; DNS to Vercel
- [ ] Keep `rehtraining.co.za` pointed at Vercel too (the 308 in `next.config.ts` only fires once the host resolves here)
- [ ] Flip the email once Zoho mail is live: `python3 scripts/rebrand-rstl.py --email-flip`
- [ ] Rename the Vercel project + repo when convenient (optional)

**Client-side (their accounts, our instructions)**
- [ ] Google Business Profiles: rename all three (Midrand, Durban, Mthatha) to `RSTL Centre…` — Place IDs survive the rename, then update `profileName` in `lib/googleLocations.ts`
- [ ] Google Ads: update final URLs + sitelinks/display name from `rehtraining.co.za` to `rstlcentre.co.za`
- [ ] Search Console: verify the new domain, submit `/sitemap.xml`, use Change of Address from the old property
- [ ] Zoho: new mailboxes on `rstlcentre.co.za` + MX records
- [ ] Facebook / TikTok pages renamed → send us the new URLs and they go in the footer
- [ ] Directory/citation listings (QCTO, professional bodies, past invoices, email signatures)
