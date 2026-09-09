"use client";

import { useState } from "react";
import GoogleReviewsCard from "./GoogleReviewsCard";
import ReviewsSection from "./ReviewsSection";
import { GOOGLE_LOCATIONS, getGoogleLocation } from "@/lib/googleLocations";

// Home-page reviews + location section. The three centred buttons at the top let
// visitors switch between REH's Google Business Profiles (Midrand / Durban /
// Mthatha) — each branch has its own profile, map pin and review link.
export default function HomeReviewsSection() {
  const [activeId, setActiveId] = useState<string>("midrand");
  const active = getGoogleLocation(activeId);

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Location switcher */}
        <div
          role="group"
          aria-label="Choose a training centre"
          className="flex flex-col items-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {GOOGLE_LOCATIONS.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveId(loc.id)}
                  aria-pressed={isActive}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors sm:px-6 ${
                    isActive
                      ? "bg-brand text-white shadow-lg shadow-brand/25"
                      : "border-2 border-line bg-white text-charcoal/70 hover:border-brand hover:text-brand"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {loc.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-sm text-charcoal/60">
            {active.label}: {active.address} — see the centre&apos;s Google profile,
            map and reviews below.
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <GoogleReviewsCard location={active} />
            <div className="mt-6 rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-lg text-charcoal">Trained with us?</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Leave a review on the site after your course — it takes under a minute
                and helps other companies choose the right training.
              </p>
              <a
                href="#site-reviews"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-charcoal px-5 text-sm font-bold text-white transition-colors hover:bg-brand"
              >
                Write a review
              </a>
              <a
                href={active.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-brand px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand-soft"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Leave a Google review
              </a>
            </div>
          </div>
          <div id="site-reviews" className="scroll-mt-32">
            <ReviewsSection
              title="What clients say about REH Safety Training"
              limit={9}
              gridClass="sm:grid-cols-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
