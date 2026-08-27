"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/analytics";

// Global conversion-event tracking. Fires dataLayer events on the actions that
// matter to the client's Google Ads reporting — phone calls, emails, WhatsApp
// messages, and booking-CTA clicks. The events are picked up by the GTM
// container (see lib/analytics.ts); conversion actions in GTM/Google Ads can
// be triggered on them without touching this code again.
//
// NOTE: an element can match several categories (e.g. a "Request a Quote" CTA
// is an <a href="mailto:…" data-booking>). Do NOT early-return after the
// first match — fire every event that applies.
export default function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const tel = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (tel) {
        pushEvent("phone_call_click", { phone: tel.getAttribute("href") });
      }

      const mail = target.closest('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (mail) {
        pushEvent("email_click", { email: mail.getAttribute("href") });
      }

      const wa = target.closest(
        'a[href^="https://wa.me"], a[href^="http://wa.me"]'
      ) as HTMLAnchorElement | null;
      if (wa) {
        pushEvent("whatsapp_click", { target: wa.getAttribute("href") });
      }

      const booking = target.closest("[data-booking]") as HTMLElement | null;
      if (booking) {
        pushEvent("booking_cta_click", {
          course: booking.getAttribute("data-course") || undefined,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
