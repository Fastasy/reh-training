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
| `public/images/reh-logo.png`, `og-image.png`, `app/icon.png`, `apple-icon.png` | REH branding is baked into the pixels. Awaiting the client's new logo. |
| `.firecrawl/**` scrape archives | Historical record of the old site's content. |

## Launch checklist

**Code / deploy**
- [x] Rebrand committed and pushed (Vercel auto-deploys)
- [ ] Client sends logo files → replace `public/images/reh-logo.png` (+ alt text already updated), regenerate `og-image.png` (1200×630 ideally, currently 1280×1280), `app/icon.png`, `apple-icon.png`; eyeball `accreditations.jpg`
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
