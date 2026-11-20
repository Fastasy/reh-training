"use client";

import { useEffect } from "react";
import { EVENTS, pushEvent } from "@/lib/analytics";

/**
 * Global conversion-event and activity tracking.
 *
 * Fires dataLayer events on the actions that matter to the client's Google Ads
 * reporting and GA4 property — phone calls, emails, WhatsApp messages, booking
 * CTAs, social clicks, navigation and course interactions.
 *
 * DESIGN RULE: an element can match several categories.
 * Do NOT early-return after the first match — fire every event that applies.
 */
export default function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // ── Existing: phone, email, WhatsApp ─────────────────────
      const tel = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (tel) {
        pushEvent(EVENTS.PHONE_CALL_CLICK, {
          phone: tel.getAttribute("href"),
          branch: guessBranch(tel.getAttribute("href") || ""),
        });
      }

      const mail = target.closest('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (mail) {
        pushEvent(EVENTS.EMAIL_CLICK, {
          email: mail.getAttribute("href"),
        });
      }

      const wa = target.closest(
        'a[href^="https://wa.me"], a[href^="http://wa.me"]',
      ) as HTMLAnchorElement | null;
      if (wa) {
        pushEvent(EVENTS.WHATSAPP_CLICK, {
          target: wa.getAttribute("href"),
        });
      }

      // ── Booking CTAs (already fires quote_request separately) ─
      const booking = target.closest("[data-booking]") as HTMLElement | null;
      if (booking) {
        pushEvent(EVENTS.BOOKING_CTA_CLICK, {
          course: booking.getAttribute("data-course") || undefined,
        });
      }

      // ── NEW: Social link clicks (Facebook, TikTok, etc.) ──────
      const social = target.closest(
        'a[href*="facebook.com"], a[href*="tiktok.com"]',
      ) as HTMLAnchorElement | null;
      if (social) {
        const href = social.getAttribute("href") || "";
        pushEvent(EVENTS.SOCIAL_LINK_CLICK, {
          platform: href.includes("facebook") ? "facebook" : "tiktok",
        });
      }

      // ── NEW: Map / directions clicks ──────────────────────────
      const map = target.closest(
        'a[href*="maps.google"]',
      ) as HTMLAnchorElement | null;
      if (map) {
        pushEvent(EVENTS.MAP_DIRECTIONS_CLICK, {
          branch: guessBranchFromMap(map.getAttribute("href") || ""),
        });
      }

      // ── NEW: Navigation link clicks ───────────────────────────
      const nav = target.closest("[aria-label='Main'] a, [aria-label='Mobile'] a") as HTMLAnchorElement | null;
      if (nav) {
        const href = nav.getAttribute("href") || "";
        // Only track internal nav links, not the "Request a Quote" button
        if (href.startsWith("/") && !href.includes("@")) {
          pushEvent(EVENTS.NAV_LINK_CLICK, {
            page: href,
            label: nav.textContent?.trim().slice(0, 40),
          });
        }
      }

      // ── NEW: General CTA clicks (non-booking site CTAs) ───────
      // Catches: "Browse All Courses", "View Price List", "View Full Course List",
      // "Talk to a Training Advisor" and "Get Quote" on course cards.
      const ctaLink = target.closest(
        'a:not([data-booking])' +
        ':not([href^="tel:"])' +
        ':not([href^="mailto:"])' +
        ':not([href*="facebook"])' +
        ':not([href*="tiktok"])' +
        ':not([href*="maps.google"])',
      ) as HTMLAnchorElement | null;
      if (ctaLink) {
        const text = ctaLink.textContent?.trim() || "";
        const href = ctaLink.getAttribute("href") || "";
        // Known CTA patterns on the site
        if (
          /^(browse|view|explore|talk|get\s+quote)/i.test(text) ||
          (text.includes("Price") && href.startsWith("/")) ||
          (text.includes("Course") && href.startsWith("/"))
        ) {
          pushEvent(EVENTS.CTA_CLICK, {
            cta: text.slice(0, 60),
            page: href,
          });
        }
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

// ──── Helpers ──────────────────────────────────────────────────────

/** Roughly guess the branch from a phone number. */
function guessBranch(phone: string): string {
  const p = phone.replace(/\D/g, "");
  if (p.endsWith("6954")) return "midrand";
  if (p.endsWith("6783")) return "durban";
  if (p.endsWith("2852")) return "mthatha";
  if (p.endsWith("7967")) return "midrand";
  return "unknown";
}

/** Guess branch from a Google Maps URL. */
function guessBranchFromMap(url: string): string {
  const u = url.toLowerCase();
  if (u.includes("midrand") || u.includes("glen austin") || u.includes("douglas road")) return "midrand";
  if (u.includes("durban") || u.includes("windermere")) return "durban";
  if (u.includes("mthatha") || u.includes("umtata")) return "mthatha";
  return "unknown";
}