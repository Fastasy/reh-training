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
| `lib/leads.ts` | **new (2026-10-05).** The `LeadRecord` type and the email-status union — one place that defines what a stored lead is. |
| `lib/email.ts` | **new (2026-10-05).** Renders and sends the office notification for a stored lead, over Resend's HTTP API. Never throws. |
| `scripts/mock-resend.py` + `scripts/verify-lead-email.sh` | **new (2026-10-05).** End-to-end proof that a submission actually emails the office, run against a mock transport. |

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

## Lead notification email (2026-10-05)

Storing the lead was never the same thing as telling anyone about it. Between the route
going live on 2026-09-16 and this change, **13 enquiries were stored and the office was
told about them only when the visitor's own mail client happened to open and they pressed
send** — meaning an unknown share of them (Destiny House, Pro Earthworks, Baycity
Projects, Morganite SA, the SA Medical Research Council, Accend Group …) reached nobody.

**What now happens on submit**

1. Browser `POST`s the lead to `/api/quote`.
2. The route validates, stores the lead in Blob, and **returns 201 immediately**.
3. `after()` then emails the office from the server. The visitor never waits on the mail
   provider, and a mail outage cannot turn a stored lead into an error — the worst case is
   a stored lead nobody was notified about, which the server log records.
4. The browser only falls back to opening the visitor's email app when the server did
   **not** send (store failed, or no `RESEND_API_KEY` yet). On success it shows a plain
   "Request received" instead, because the email is already on its way.

That last point is what makes this shippable before the key exists: with no key the route
answers `email: "not_configured"`, the client keeps the old `mailto:` handoff, and the
behaviour flips over on its own the moment the key is set. No second deploy needed.

The transport is Resend's HTTP API via `fetch` — no SDK, no dependency, and no outbound
SMTP, which serverless functions cannot be relied on to open.

### To switch it on (one-time, ~10 minutes)

1. Create a free Resend account (3,000 emails/month) on the **client's** or Allegro's
   address — whoever should own it long-term. Confirm the email.
2. Resend → Domains → **Add domain** → `rstlcentre.co.za`. It will show a DKIM `TXT` and
   an SPF `TXT`/`MX` on the `send.` subdomain. Add them at the registrar
   (`ns1.tld-ns.net` / `ns2.tld-ns.com` — the same DNS panel that already holds the
   `google-site-verification` TXT record). **Do not touch the root MX records**; the
   subdomain records do not affect the client's existing mail.
3. Wait for Resend to report **Verified**.
4. Create an API key, then set it in all three Vercel environments:

```bash
printf '%s' "re_xxxxxxxx" | vercel env add RESEND_API_KEY production
printf '%s' "re_xxxxxxxx" | vercel env add RESEND_API_KEY preview
printf '%s' "re_xxxxxxxx" | vercel env add RESEND_API_KEY development
```

5. Optional but recommended — a copy to Allegro so a lead never depends on one inbox:

```bash
printf '%s' "ruan@allegrodigital.co.za" | vercel env add LEAD_EMAIL_CC production
```

6. Redeploy, then send one real submission and confirm it lands in the client's inbox.
   `LEAD_EMAIL_TO` defaults to `info@rehtraining.co.za`; leave it unset.

## Environment variables

Set in Vercel (Production, Preview **and** Development) as of 2026-09-10.

| Variable | Value / Notes |
|---|---|
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | `phc_zwA6…` (US project). Public by design; changing it needs a **redeploy** — `NEXT_PUBLIC_*` is inlined at build time. |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` |
| `QUOTE_ADMIN_TOKEN` | Secret, generated 2026-09-10. Stored in Vercel and in `.env.local` (gitignored). Unset ⇒ `GET /api/quote` returns 401 to everyone. |
| `BLOB_READ_WRITE_TOKEN` | Pre-existing (also backs `/api/reviews`). |
| `RESEND_API_KEY` | **2026-10-05 — NOT YET SET.** Unset ⇒ leads are stored but the office is not emailed, and the browser keeps its `mailto:` fallback. See "To switch it on" above. |
| `LEAD_EMAIL_FROM` | Optional. Defaults to `RSTL Centre <quotes@rstlcentre.co.za>`. Must be on a domain verified in Resend. |
| `LEAD_EMAIL_TO` | Optional. Defaults to `info@rehtraining.co.za`. Comma-separate for several recipients. |
| `LEAD_EMAIL_CC` | Optional. Empty by default. Set to an Allegro address so a lead never depends on one inbox. |
| `RESEND_API_BASE_URL` | Optional test seam. Defaults to `https://api.resend.com`; `scripts/verify-lead-email.sh` points it at the mock. Leave unset in Vercel. |

To read the leads:

```bash
curl -H "Authorization: Bearer $QUOTE_ADMIN_TOKEN" https://www.rstlcentre.co.za/api/quote
```

When adding a var from the CLI, use `printf` — `echo` appends a trailing newline that
corrupts the value:

```bash
printf '%s' "$VALUE" | vercel env add NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN production
```

## Verification

```bash
# build + types
npx tsc --noEmit && npm run build

# the lead notification, end to end, against a mock transport (no key needed, no email
# can reach the client). Deletes its own test leads from the real store at the end.
bash scripts/verify-lead-email.sh
```

That script is the authoritative check for the email path. It builds, boots two servers
(one with a key pointed at `scripts/mock-resend.py`, one without any key) and asserts:

| Case | Expected |
|---|---|
| booking-modal submission | `201`, `email: "queued"` |
| contact-form submission | `201`, `email: "queued"` |
| notification payload | to the office, Allegro cc'd, reply-to the enquirer, fields and delegate counts rendered, markup escaped, SAST timestamp |
| honeypot filled | `201` with `id: null` — stored nowhere, nothing sent |
| missing phone / bad email | `400` |
| transport rejects the send | still `201`, lead still stored, rejection logged |
| no `RESEND_API_KEY` | `201` + `email: "not_configured"`, nothing sent (fallback preserved) |

Ad-hoc lead-capture checks against a running server:

```bash
# round trip (expect 201, then the lead comes back)
curl -X POST localhost:3000/api/quote -H 'Content-Type: application/json' \
  -d '{"source":"booking_modal","contact_name":"Test","phone":"0821234567","courses":[{"course":"OHS Act"}]}'
curl -H "Authorization: Bearer $QUOTE_ADMIN_TOKEN" localhost:3000/api/quote

# auth fails closed (expect 401)
curl -i localhost:3000/api/quote

# ad-blocker proxy is live (expect PostHog JSON with a requestId, NOT index.html)
curl -s 'https://www.rstlcentre.co.za/ph/decide?v=3'
```

Verified locally 2026-10-05: `tsc --noEmit` clean, `next build` clean (122 pages),
`scripts/verify-lead-email.sh` 13/13 green, and the test leads it created were deleted —
the store was left holding only the 13 genuine enquiries.

Verified locally 2026-09-10: `tsc --noEmit` clean, `next build` clean (112 pages),
all five POST cases correct (valid 201 / missing phone 400 / bad email 400 /
honeypot 201 / contact-form-without-email 201), authenticated GET returned the stored
leads, unauthenticated GET 401, and `/ph/decide?v=3` returned PostHog JSON with a
`requestId`. Test leads were deleted afterwards — the store was left empty.

## Known limitations / next upgrades

- **The notification email is sent once `RESEND_API_KEY` is set** — until then the office
  still depends on the visitor's mail client. Nothing else is needed in code; see "To
  switch it on".
- **The training-matrix file is not uploaded**, only its filename recorded. Accepting
  the file into Blob and attaching it to the notification would make "attached to this
  email" literally true.
- **No server-side conversion signal to Google Ads yet.** Once `quote_request` is solid,
  an offline/enhanced import would recover conversions lost to ad blockers entirely.
- **No POPIA retention policy on stored leads.** Blob entries currently live forever;
  decide a retention window and add deletion.
- **Nothing alerts anyone if the mail path breaks.** A rejected send is logged and the
  lead is stored, but no human is told. If the office inbox stays quiet, check the Vercel
  logs for `Rejected the send` before assuming demand dried up.
