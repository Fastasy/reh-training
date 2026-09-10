# Analytics & conversion tracking — RSTL Centre

Audit date **2026-09-10**. Runbook for what was built in this repo, and the work that
still has to happen in the client's Google account.

## The state we found (verified, not assumed)

Pulled the live container `GTM-T8J7SZQB` from
`https://www.googletagmanager.com/gtm.js?id=GTM-T8J7SZQB` and inspected both domains.

| Check | Result |
|---|---|
| `GTM-T8J7SZQB` on `www.rstlcentre.co.za` | present |
| Same container on legacy `www.rehtraining.co.za` (Zoho) | present |
| Google Ads tag | `AW-17191998312` (`__googtag`) |
| Active Ads conversion tags | 2 — labels `BO5cCPONm90bEOim5IVA`, `4e7HCPXosOlbEOim5IVA` |
| Paused conversion tag | 1 (`__paused`, original type `awct`) |
| Conversion linker + enhanced-conversion user data | configured (`__gclidw`, `__cl`, `__lcl`, `__awud`) |
| **GA4 property** | **none** — no `G-` id in the container, none on either domain |
| Facebook pixel | **dead** — `__html` tag with the placeholder id `XXXXXXXXXXXXXXX` |
| Custom events referenced by the container | none of ours — only `gtm.js`, `gtm.dom`, `gtm.click`, `gtm.linkClick`, `gtm.formSubmit`, `page_view` |
| URL-based triggers | none, so the domain flip broke nothing |

**Conclusions that drove the work**

1. The client had **no analytics platform at all** — only an Ads conversion container.
   No traffic sources, no channel attribution, no funnel, no page behaviour.
2. The site was already publishing five clean conversion events and **the container
   subscribed to none of them**. They were firing into a void.
3. The primary conversion was **not a lead**. `quote_request` fired when the modal
   opened the visitor's mail client, which proves an email app launched — nothing was
   recorded anywhere, and if their mail app failed the enquiry vanished without trace.
   Google Ads was therefore bidding toward a soft signal.
4. The contact-page `QuoteForm` fired **no event whatsoever**, so every enquiry it
   produced was invisible.

## What was built here

| File | Change |
|---|---|
| `app/api/quote/route.ts` | **new.** Stores leads in Vercel Blob under `leads/`. `POST` validates + honeypot, `GET` lists leads behind `Authorization: Bearer $QUOTE_ADMIN_TOKEN` (fails closed when the token is unset). |
| `components/BookingModal.tsx` | Submits to `/api/quote` first (4s cap via `AbortController`), then fires `quote_request`. The `mailto:` handoff is unchanged and fires either way. |
| `components/QuoteForm.tsx` | Same treatment — this path previously tracked nothing. |
| `lib/analytics.ts` | `pushEvent()` now writes to `dataLayer` **and** PostHog. One funnel, two destinations; a PostHog failure can never stop the GTM push. |
| `components/PostHogTracker.tsx` | **new.** PostHog init + App Router pageview capture. |
| `next.config.ts` | `/ph/*` → PostHog same-origin proxy (plus `/ph/static/*` → `us-assets`). |
| `scripts/cleanup-test-leads.mjs` | **new.** Deletes specific test leads by id; refuses to run with no arguments. |

**Why the conversion is now real:** `quote_request` fires only after `/api/quote`
returns `201`. If the lead cannot be stored the visitor still gets their email handoff,
but the event is reported as `quote_request_unconfirmed` instead — the failure stays
visible rather than silently inflating the conversion count.

**Why the `/ph` proxy matters:** PostHog's own hosts sit on every ad-blocker list.
On a lead-gen site that silently drops a large share of events. Through `/ph` the
blocker never sees the real host.

## Deployed and verified live (2026-09-10)

Commit `3ef5967` → production. Verified against `https://www.rstlcentre.co.za`, not
against localhost:

| Check | Result |
|---|---|
| Unauthenticated `GET /api/quote` | **401** (route live, fails closed) |
| `POST /api/quote` valid lead | **201**, real id stored |
| Authenticated `GET /api/quote` | returned the stored lead (read-back confirmed) |
| `POST /api/quote` missing phone | **400** (validation live) |
| `POST /ph/decide?v=3` with the project token | **200 `application/json`**, valid config, `requestId` present |
| Project token inlined in the live bundle | present in `/_next/static/immutable/chunks/2pll717ja-yei.js` |

Probe leads were deleted afterwards; the live endpoint reports `count: 0`.

**PostHog region is US.** The token returns 200 on `us.i.posthog.com` and **401 on
`eu.i.posthog.com`**, confirming the `/ph` rewrites point at the right host. Re-check
this if the project is ever recreated in another region.

**Readiness gotcha when verifying a deploy:** do NOT wait for "a chunk reference appears in
the HTML" — the old build has those too, so the check passes immediately and you test the
previous deployment. Wait for `/api/quote` to stop returning **404** (401 = the new route is
live instead).

## Outstanding — client's Google account (no code required)

### 1. Create the GA4 property and add it as a Google tag destination
GA4 must live behind the container that is already installed, so nothing about the
site changes.

1. GA4 → Admin → Create property for RSTL Centre → copy the `G-XXXXXXXXXX` id.
2. GTM → Tags → the existing **Google Tag** (`AW-17191998312`) → Configuration →
   **Add destination** → the new `G-XXXXXXXXXX` measurement id. Save.
3. Confirm the Google tag fires on **Initialization – All Pages** and on `gtm.dom`.

### 2. Point the Ads conversions at the real event instead of a generic trigger
The 2 active `awct` tags currently key off generic triggers, which is why the numbers
are soft. In GTM:

1. Variables → New → **Data Layer Variable** `course_list`, then `company`,
   `training_location`, `stored_server_side`.
2. Triggers → New → **Custom Event**, event name `quote_request`
   (name it `CE - quote_request`).
3. Open each of the 2 `awct` tags → set the trigger to `CE - quote_request` only.
4. Delete or re-point the `__paused` tag so nobody re-enables it by accident.
5. Optional but recommended: a GA4 Event tag on `quote_request` (and on
   `phone_call_click` / `email_click` / `booking_cta_click` as secondary conversions),
   with `course_list` passed as an event parameter.
6. Optional: a second Custom Event trigger for `quote_request_unconfirmed` feeding an
   alert/annotation, so a broken API is noticed rather than mistaken for low demand.

### 3. Kill or fix the dead Facebook pixel
The `__html` tag still contains the gallery placeholder `fbq("init","XXXXXXXXXXXXXXX")`.
It has never tracked anything. Either paste the real pixel id or delete the tag.

### 4. Google Ads final URLs
Already on the launch checklist in `REBRAND-RSTL.md` — update final URLs, sitelinks
and the display name to `rstlcentre.co.za`.

## Environment variables

Set in Vercel (Production, Preview **and** Development) as of 2026-09-10.

| Variable | Value / Notes |
|---|---|
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | `phc_zwA6…` (US project). Public by design; changing it needs a **redeploy** — `NEXT_PUBLIC_*` is inlined at build time. |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` |
| `QUOTE_ADMIN_TOKEN` | Secret, generated 2026-09-10. Stored in Vercel and in `.env.local` (gitignored). Unset ⇒ `GET /api/quote` returns 401 to everyone. |
| `BLOB_READ_WRITE_TOKEN` | Pre-existing (also backs `/api/reviews`). |

To read the leads:

```bash
curl -H "Authorization: Bearer $QUOTE_ADMIN_TOKEN" https://www.rstlcentre.co.za/api/quote
```

When adding a var from the CLI, use `printf` — `echo` appends a trailing newline that
corrupts the value:
printf '%s' "$VALUE" | vercel env add NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN production
```

## Verification

```bash
# build + types
npx tsc --noEmit && npm run build

# lead capture round-trip (expect 201, then the lead comes back)
curl -X POST localhost:3000/api/quote -H 'Content-Type: application/json' \
  -d '{"source":"booking_modal","contact_name":"Test","phone":"0821234567","courses":[{"course":"OHS Act"}]}'
curl -H "Authorization: Bearer $QUOTE_ADMIN_TOKEN" localhost:3000/api/quote

# auth fails closed (expect 401)
curl -i localhost:3000/api/quote

# ad-blocker proxy is live (expect PostHog JSON with a requestId, NOT index.html)
curl -s 'https://www.rstlcentre.co.za/ph/decide?v=3'
```

Verified locally 2026-09-10: `tsc --noEmit` clean, `next build` clean (112 pages),
all five POST cases correct (valid 201 / missing phone 400 / bad email 400 /
honeypot 201 / contact-form-without-email 201), authenticated GET returned the stored
leads, unauthenticated GET 401, and `/ph/decide?v=3` returned PostHog JSON with a
`requestId`. Test leads were deleted afterwards — the store was left empty.

## Known limitations / next upgrades

- **Email still goes through the visitor's mail client.** The lead is now always
  captured server-side, but the office is notified only if the visitor actually sends.
  Direct sending (Zoho SMTP via `nodemailer`, or Resend) would remove that step and
  allow dropping the `mailto:` entirely — needs mailbox credentials.
- **The training-matrix file is not uploaded**, only its filename recorded. Accepting
  the file into Blob would make "attached to this email" literally true.
- **No server-side conversion signal to Google Ads yet.** Once `quote_request` is solid,
  an offline/enhanced import would recover conversions lost to ad blockers entirely.
- **No POPIA retention policy on stored leads.** Blob entries currently live forever;
  decide a retention window and add deletion.
