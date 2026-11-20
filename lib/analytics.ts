// Google Tag Manager + GA4 + activity log for RSTL Centre.
//
// === Architecture ===
// Everything flows through pushEvent(), which writes to TWO destinations:
//   window.dataLayer → GTM container (Google Ads conversions now, GA4 once
//                       the property is created and linked — see ANALYTICS-PLAN.md)
//   window.posthog   → PostHog product analytics + session replay
//
// Either destination can be missing (ad blocker eating the GTM script, or
// PostHog token not yet set) and the other still receives the event.
//
// === Activity log ===
// A client-side buffer of the last 300 events, exposed via window.__activityLog
// for real-time debugging. Also available via /api/activity-log if the auth
// token matches QUOTE_ADMIN_TOKEN (see app/api/activity-log/route.ts).
//
// === Event catalogue ===
// Every event the site fires is listed below with its parameter schema.
// Style: snake_case names, flat params (no nesting), consistent types.
// This file IS the source of truth — add new events here first.
//
// ────────────────────────── Conversion events ──────────────────────────
// quote_request             Primary conversion. Fired only after /api/quote
//                             returns 201. Params: source, course, course_list,
//                             company, training_location, stored_server_side,
//                             office_emailed.
// quote_request_unconfirmed Fired when /api/quote could not store the lead
//                             but the visitor got the email handoff. Same params.
// booking_cta_click         Any "Request a Quote" / "Get Price" / "Get Quote"
//                           CTA clicked. Params: course (optional).
//
// ────────────────────────── Contact events ─────────────────────────────
// phone_call_click          tel: link clicked. Params: phone, branch.
// email_click               mailto: link clicked. Params: email.
// whatsapp_click            wa.me link clicked. Params: target.
// social_link_click         Facebook / TikTok / social link. Params: platform.
// map_directions_click      "Get Directions" link clicked. Params: branch.
//
// ────────────────────────── Navigation events ──────────────────────────
// nav_link_click            Any main-nav link clicked. Params: page.
// cta_click                 Non-booking CTAs (Browse All Courses, View Price
//                           List, Talk to an Advisor, etc.). Params: cta, page.
//
// ────────────────────────── Course events ──────────────────────────────
// course_search             A course search was performed. Params: query,
//                           result_count.
// course_category_filter    A category filter was toggled. Params: category.
// course_card_click         A course card was clicked (Details or Get Quote).
//                             Params: course, action.
// course_page_view          A course detail page was viewed. Params: course,
//                           category, price.
//
// ────────────────────────── Content events ─────────────────────────────
// article_view              An article page was viewed. Params: article,
//                           word_count.
// quick_answer_view         The AEO quick-answer section was scrolled into view.
//                             Params: course.
// reviews_loaded            Reviews were loaded for a course or site-wide.
//                             Params: course (optional), count.

export const GTM_ID = "GTM-T8J7SZQB";
export const GA_MEASUREMENT_ID = "G-18B7CB3S1E";

/** Every named event this site fires. */
export const EVENTS = {
  QUOTE_REQUEST: "quote_request",
  QUOTE_REQUEST_UNCONFIRMED: "quote_request_unconfirmed",
  BOOKING_CTA_CLICK: "booking_cta_click",
  PHONE_CALL_CLICK: "phone_call_click",
  EMAIL_CLICK: "email_click",
  WHATSAPP_CLICK: "whatsapp_click",
  SOCIAL_LINK_CLICK: "social_link_click",
  MAP_DIRECTIONS_CLICK: "map_directions_click",
  NAV_LINK_CLICK: "nav_link_click",
  CTA_CLICK: "cta_click",
  COURSE_SEARCH: "course_search",
  COURSE_CATEGORY_FILTER: "course_category_filter",
  COURSE_CARD_CLICK: "course_card_click",
  COURSE_PAGE_VIEW: "course_page_view",
  ARTICLE_VIEW: "article_view",
  QUICK_ANSWER_VIEW: "quick_answer_view",
  REVIEWS_LOADED: "reviews_loaded",
  REVIEW_SUBMITTED: "review_submitted",
} as const;

type DataLayer = Record<string, unknown>[];

declare global {
  interface Window {
    dataLayer?: DataLayer;
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
    /** Activity log: last N events with timestamps, for debugging. */
    __activityLog?: ActivityEntry[];
  }
}

// ─────────────────────── Activity log ─────────────────────────

const MAX_LOG = 300;

export type ActivityEntry = {
  event: string;
  params: Record<string, unknown>;
  timestamp: string;
  url: string;
};

let _activityLog: ActivityEntry[] = [];

/** Access the in-memory activity buffer. */
export function getActivityLog(): readonly ActivityEntry[] {
  return _activityLog;
}

/** Clear the buffer (e.g. after a successful flush). */
export function clearActivityLog(): void {
  _activityLog = [];
}

/** Expose the buffer globally so /api/activity-log and browser debug tools can read it. */
function publishActivityLog(): void {
  if (typeof window === "undefined") return;
  (window as unknown as { __activityLog?: ActivityEntry[] }).__activityLog = _activityLog;
}

// ─────────────────────── Push event ───────────────────────────

/** Pre-process params: flatten, clamp strings, remove PII-like values. */
function sanitizeParams(
  event: string,
  params: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    // Drop internal keys and anything that looks like a raw phone/email value.
    if (k.startsWith("_")) continue;
    if (k === "phone" && typeof v === "string" && /^[+0-9]{5,}$/.test(v.replace(/[\s()-]/g, ""))) {
      out[k] = "redacted";
      continue;
    }
    if (k === "email" && typeof v === "string" && v.includes("@")) {
      out[k] = "redacted";
      continue;
    }
    // Clamp string params to 200 chars.
    if (typeof v === "string") {
      out[k] = v.length > 200 ? v.slice(0, 200) : v;
    } else {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Route every event through this single funnel: dataLayer (GTM → GA4 → Google Ads)
 * and PostHog. A failure in either destination never blocks the other.
 *
 * Call from any component:
 *   pushEvent(EVENTS.COURSE_PAGE_VIEW, { course: "Forklift", category: "machines-tools" });
 */
export function pushEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const clean = sanitizeParams(event, params);

  // ── GTM / dataLayer ─────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });

  // ── GA4 via gtag (direct, not through GTM) ───────────────────
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, clean);
    }
  } catch {
    // gtag is a nice-to-have; GTM is the conversion path of record.
  }

  // ── PostHog ────────────────────────────────────────────────
  try {
    window.posthog?.capture(event, clean);
  } catch {
    // PostHog is a nice-to-have; GTM is the conversion path of record.
  }

  // ── Activity log ───────────────────────────────────────────
  _activityLog.push({
    event,
    params: clean,
    timestamp: new Date().toISOString(),
    url: window.location.pathname,
  });
  if (_activityLog.length > MAX_LOG) {
    _activityLog = _activityLog.slice(-MAX_LOG);
  }
  publishActivityLog();
}