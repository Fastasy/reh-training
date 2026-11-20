"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EVENTS, pushEvent } from "@/lib/analytics";

/**
 * Page-level view events for GA4.
 *
 * Fires structured events when the user lands on a specific type of page:
 * course detail pages, article pages, the contact page, and the course index.
 *
 * Uses usePathname() for path detection and fires on every client-side
 * navigation. The $pageview in PostHogTracker.tsx handles PostHog's pageview
 * separately; this fires named events with page-type-specific parameters.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Course detail page: /courses/[slug]
    const courseMatch = pathname.match(/^\/courses\/(.+)$/);
    if (courseMatch) {
      pushEvent(EVENTS.COURSE_PAGE_VIEW, {
        course: courseMatch[1].replace(/-/g, " "),
        page: pathname,
      });
      return;
    }

    // Article detail page: /articles/[slug]
    const articleMatch = pathname.match(/^\/articles\/(.+)$/);
    if (articleMatch) {
      pushEvent(EVENTS.ARTICLE_VIEW, {
        article: articleMatch[1].replace(/-/g, " "),
        page: pathname,
      });
      return;
    }

    // Contact page: /contact
    if (pathname === "/contact") {
      pushEvent("contact_page_view", {
        page: pathname,
      });
      return;
    }

    // Course index: /courses
    if (pathname === "/courses") {
      pushEvent("course_index_view", {
        page: pathname,
      });
      return;
    }

    // Article index: /articles
    if (pathname === "/articles") {
      pushEvent("article_index_view", {
        page: pathname,
      });
      return;
    }

    // Home page
    if (pathname === "/") {
      pushEvent("home_page_view", {
        page: pathname,
      });
      return;
    }

    // Other pages
    pushEvent("page_view", {
      page: pathname,
    });
  }, [pathname]);

  return null;
}