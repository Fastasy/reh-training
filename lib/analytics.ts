// Google Tag Manager + conversion-event tracking for REH Safety Training.
//
// The client's existing GTM container (GTM-T8J7SZQB) is installed on the OLD
// Zoho site (www.rehtraining.co.za) and holds their Google Ads conversion tags
// + GA4 property. Installing the SAME container here keeps every Ads/GA tag
// working after the domain flips to the new site — no reconfiguration on the
// client's side.
//
// Custom events pushed to dataLayer (wire these to conversions in GTM, or
// import as GA4 events into Google Ads):
//   quote_request      — booking modal submitted (primary conversion)
//   booking_cta_click  — any "Request a Quote" / "Get Price" CTA clicked
//   phone_call_click   — tel: link clicked
//   email_click        — mailto: link clicked
//   whatsapp_click     — wa.me link clicked
export const GTM_ID = "GTM-T8J7SZQB";

type DataLayer = Record<string, unknown>[];

declare global {
  interface Window {
    dataLayer?: DataLayer;
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
