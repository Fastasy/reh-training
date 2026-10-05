/**
 * Outbound email for quote/booking leads.
 *
 * WHY THIS EXISTS
 * /api/quote used to store the lead and then hand the visitor off to their own mail
 * client with a `mailto:` link. Nothing was ever sent from the server, so a submission
 * only reached the office if the visitor's device had a mail app configured AND they
 * pressed send. On a phone that is frequently not the case, and the lead then sat in
 * Blob storage where no human ever looked at it. The client was effectively receiving
 * an unknown fraction of his own enquiries.
 *
 * TRANSPORT
 * Resend's HTTP API, called with `fetch`. HTTP rather than SMTP on purpose: serverless
 * functions cannot be relied on to open outbound SMTP connections, and an HTTP call
 * means no extra SDK dependency in a project that otherwise only ships `next`,
 * `@vercel/blob`, `react` and `posthog-js`.
 *
 * FAILS SAFE
 * Nothing here throws. Every path returns a status, because an email outage must never
 * cost us the lead itself. The caller stores the lead first and attempts the email
 * second, so the worst case is a stored lead that nobody was notified about — never a
 * lost enquiry.
 */

import { SITE } from "./site";
import type { LeadEmailResult, LeadRecord } from "./leads";

/**
 * Verified sending identity. Must be an address on a domain verified in Resend, or
 * Resend will reject the send. Defaults to a subdomain of the site's own domain so the
 * client's own domain carries the mail — better deliverability than a shared sender.
 */
const DEFAULT_FROM = `RSTL Centre <quotes@rstlcentre.co.za>`;

/** Resend's API base. Overridable so tests can point at a local mock. */
function apiBase(): string {
  return (process.env.RESEND_API_BASE_URL || "https://api.resend.com").replace(/\/+$/, "");
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Where the notification lands. Defaults to the client's live mailbox. */
function toAddresses(): string[] {
  const raw = process.env.LEAD_EMAIL_TO || SITE.email;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Optional carbon copy (e.g. Allegro, so a lead never depends on one inbox). */
function ccAddresses(): string[] {
  return (process.env.LEAD_EMAIL_CC || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const SOURCE_LABELS: Record<string, string> = {
  booking_modal: "Booking modal",
  contact_form: "Contact page form",
};

function sourceLabel(source: string): string {
  return SOURCE_LABELS[source] || source;
}

/**
 * Escape every value that reaches the HTML body. Lead fields are visitor-controlled, so
 * without this a submission containing markup would be injected into the email the
 * client opens. The plain-text part needs no escaping.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "OHS Act - 3, First Aid Level 1 - 2" — the course list as the office reads it. */
function courseSummary(lead: LeadRecord): string {
  return lead.courses
    .map((r) => (r.count ? `${r.course} - ${r.count}` : r.course))
    .join(", ");
}

function applicantName(lead: LeadRecord): string {
  const full = [lead.first_name, lead.last_name].filter(Boolean).join(" ").trim();
  return full || lead.contact_name || lead.phone;
}

/** Rows for the email body, in the order the office reads them. Empty fields drop out. */
function rows(lead: LeadRecord): Array<[string, string]> {
  const out: Array<[string, string | null | undefined]> = [
    ["Company", lead.company],
    ["Contact person", lead.company ? lead.contact_person : null],
    ["Name", applicantName(lead)],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Company location", lead.company_location],
    ["Courses", courseSummary(lead)],
    ["Training location", lead.training_location],
    ["Timeline", lead.timeline],
    [
      "Training matrix",
      lead.training_matrix
        ? `${lead.training_matrix} (the visitor was told to attach it to a follow-up email)`
        : null,
    ],
    ["Message", lead.message],
    ["Came from", sourceLabel(lead.source)],
    ["Landing page", lead.landing_page],
  ];
  return out
    .filter((r): r is [string, string] => Boolean(r[1] && String(r[1]).trim()))
    .map(([k, v]) => [k, String(v).trim()]);
}

/** "Wed 08 Oct 2026, 14:23 SAST" — the office's own timezone, not UTC. */
function sastStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const formatted = new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return `${formatted} SAST`;
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

/**
 * Build the notification. Kept exportable and pure so it can be asserted in tests
 * without touching the network or the Resend account.
 */
export function buildLeadEmail(lead: LeadRecord): {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
} {
  const who = lead.company || applicantName(lead);
  const courses = courseSummary(lead);
  const subject = truncate(
    `[Quote request] ${who}${courses ? ` - ${courses}` : ""}`,
    150
  );

  const fields = rows(lead);
  const stamp = sastStamp(lead.created_at);

  const text = [
    "New quote request from the website.",
    "",
    ...fields.map(([k, v]) => `${k}: ${v}`),
    "",
    `Received: ${stamp}`,
    `Lead reference: ${lead.id}`,
    "",
    lead.email
      ? "Reply to this email to answer the enquirer directly."
      : "No email address was given - phone them back.",
    `If the email address fails, the full record is in GET /api/quote (lead ${lead.id}).`,
  ].join("\n");

  const htmlRows = fields
    .map(
      ([k, v]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;vertical-align:top;color:#6b6560;font-size:13px;white-space:nowrap;border-bottom:1px solid #eee7df;">${escapeHtml(
              k
            )}</td>
            <td style="padding:8px 0;vertical-align:top;color:#252423;font-size:14px;font-weight:600;border-bottom:1px solid #eee7df;">${escapeHtml(
              v
            )}</td>
          </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f0ec;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f0ec;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#fffdfb;border:1px solid #e4ddd5;border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <tr>
              <td style="background:#252423;padding:18px 24px;">
                <span style="color:#ffffff;font-size:15px;font-weight:700;letter-spacing:0.04em;">RSTL CENTRE</span>
                <span style="color:#e21c14;font-size:15px;font-weight:700;letter-spacing:0.04em;"> &middot; NEW QUOTE REQUEST</span>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px 4px;">
                <p style="margin:0 0 4px;color:#252423;font-size:16px;font-weight:700;">${escapeHtml(
                  who
                )}</p>
                <p style="margin:0 0 16px;color:#6b6560;font-size:13px;">Someone submitted the website quote form. Their details are below.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  ${htmlRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 24px 24px;">
                <p style="margin:0;color:#252423;font-size:13px;line-height:1.5;">
                  ${
                    lead.email
                      ? "Hit reply to answer them directly."
                      : "No email address was given, so phone them back."
                  }
                </p>
                <p style="margin:10px 0 0;color:#9a938c;font-size:11px;line-height:1.5;">
                  Received ${escapeHtml(stamp)} &middot; lead reference ${escapeHtml(
                    lead.id
                  )}<br />
                  If this email is ever missing, every lead is also stored on the server.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject,
    html,
    text,
    replyTo: lead.email || undefined,
  };
}

/**
 * Send the office notification for a stored lead.
 *
 * Never throws: a network error, a missing key or a Resend rejection all come back as a
 * status the caller can log. The lead is already saved by this point, so the only
 * consequence of a failure is that the office is not told about it by email.
 */
export async function sendLeadEmail(lead: LeadRecord): Promise<LeadEmailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(
      `lead ${lead.id}: RESEND_API_KEY is not set, so no notification email was sent. ` +
        "The lead is stored and readable via GET /api/quote."
    );
    return { status: "skipped_not_configured" };
  }

  const { subject, html, text, replyTo } = buildLeadEmail(lead);

  try {
    const res = await fetch(`${apiBase()}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || DEFAULT_FROM,
        to: toAddresses(),
        cc: ccAddresses().length ? ccAddresses() : undefined,
        reply_to: replyTo,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`lead ${lead.id}: Resend rejected the send (${res.status})`, body);
      return { status: "failed", error: `resend_${res.status}` };
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    console.log(`lead ${lead.id}: notification emailed to ${toAddresses().join(", ")}`);
    return { status: "sent", id: data.id };
  } catch (e) {
    console.error(`lead ${lead.id}: notification email threw`, e);
    return { status: "failed", error: "network" };
  }
}
