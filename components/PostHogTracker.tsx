"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

// PostHog: product analytics + session replay, served through the same-origin
// /ph proxy configured in next.config.ts. The proxy is the point -- PostHog's own
// hosts sit on every ad-blocker list, and on a lead-gen site that silently drops a
// large share of events. Through /ph the blocker never sees the real host.
//
// Initialised at module scope (guarded for SSR) so window.posthog exists before any
// click handler can call pushEvent() in lib/analytics.ts.
const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

// No token -> PostHog stays off, and pushEvent() still reaches GTM. This is the
// behaviour in local dev and in production until the env vars are set in Vercel.
export const posthogEnabled = Boolean(TOKEN);

if (typeof window !== "undefined" && posthogEnabled) {
  posthog.init(TOKEN as string, {
    // Dev talks to PostHog directly; production goes same-origin so ad blockers
    // can't match the host.
    api_host: process.env.NODE_ENV === "development" ? HOST : "/ph",
    ui_host: "https://us.posthog.com",
    // App Router navigations are client-side, so PostHog's built-in pageview
    // capture would only ever see the first load. Captured manually below.
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    // Nothing on this site logs in, so there are no profiles to identify.
    person_profiles: "identified_only",
  });
}

export default function PostHogTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!posthogEnabled) return;
    // Read the query string off window rather than via useSearchParams(): that hook
    // forces every statically rendered page into a Suspense boundary.
    posthog.capture("$pageview", {
      $current_url: window.location.origin + pathname + window.location.search,
    });
  }, [pathname]);

  return null;
}
