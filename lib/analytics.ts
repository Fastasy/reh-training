// Google Tag Manager + conversion-event tracking for RSTL Centre.
//
// The client's existing GTM container (GTM-T8J7SZQB) is installed on the OLD
// Zoho site (legacy www.rehtraining.co.za) and holds their Google Ads conversion
// tags. Installing the SAME container here keeps every Ads tag working after the
// domain flip to the new site -- no reconfiguration on the client's side.
//
// NOTE (verified 2026-09-10): that container holds NO GA4 property and does NOT
// reference any of the custom events below. The GTM/GA4 work still outstanding in
// the client's Google account is tracked in ANALYTICS-PLAN.md -- until it is done
// these events reach PostHog only.
//
// pushEvent() is the single funnel for every conversion event on this site, and it
// writes to two destinations at once:
//   - window.dataLayer -> consumed by GTM (Google Ads, and GA4 once it is added)
//   - window.posthog   -> PostHog product analytics + session replay
// Either destination can be missing (no PostHog token, or an ad blocker eating the
// GTM script) and the other still receives the event.
//
// Custom events pushed to dataLayer:
//   quote_request              -- quote captured by /api/quote (primary conversion)
//   quote_request_unconfirmed  -- visitor submitted but the lead could not be stored
//   booking_cta_click          -- any "Request a Quote" / "Get Price" CTA clicked
//   phone_call_click           -- tel: link clicked
//   email_click                -- mailto: link clicked
//   whatsapp_click             -- wa.me link clicked
export const GTM_ID = "GTM-T8J7SZQB";

type DataLayer = Record<string, unknown>[];

declare global {
  interface Window {
    dataLayer?: DataLayer;
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  // Attached to window by components/PostHogTracker.tsx. Optional: absent when
  // NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not set (including local dev by default).
  // Wrapped so an analytics failure can never stop an event reaching GTM -- the
  // dataLayer push above must always be the one that survives.
  try {
    window.posthog?.capture(event, params);
  } catch {
    // PostHog is a nice-to-have; GTM is the conversion path of record.
  }
}
