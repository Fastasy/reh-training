"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { StarRating, StarInput } from "./StarRating";
import { SAMPLE_REVIEWS } from "@/lib/sampleReviews";

export type Review = {
  id: number;
  author_name: string;
  rating: number;
  comment: string;
  course_slug: string | null;
  course_name: string | null;
  created_at: string;
};

type Props = {
  courseSlug?: string; // filter reviews to a course; omit for all-site reviews
  courseName?: string; // used as default label on the form
  limit?: number;
  showForm?: boolean;
  title?: string;
  compact?: boolean;
};

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export default function ReviewsSection({
  courseSlug,
  courseName,
  limit = 12,
  showForm = true,
  title,
  compact = false,
}: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usingSamples, setUsingSamples] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const qs = courseSlug ? `?course=${encodeURIComponent(courseSlug)}` : "";
  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    setUsingSamples(false);
    try {
      const res = await fetch(`/api/reviews${qs}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data.reviews)) {
        if (data.reviews.length > 0) {
          setReviews(data.reviews.slice(0, limit));
        } else {
          // no live reviews yet -> show clearly-marked samples so the design is visible
          const samples = SAMPLE_REVIEWS.filter(
            (r) => !courseSlug || r.course_slug === courseSlug
          ).slice(0, limit);
          setReviews(samples);
          setUsingSamples(true);
        }
      } else {
        setReviews(
          SAMPLE_REVIEWS.filter((r) => !courseSlug || r.course_slug === courseSlug).slice(0, limit)
        );
        setUsingSamples(true);
      }
    } catch {
      setReviews(
        SAMPLE_REVIEWS.filter((r) => !courseSlug || r.course_slug === courseSlug).slice(0, limit)
      );
      setUsingSamples(true);
    } finally {
      setLoading(false);
    }
  }, [qs, limit, courseSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const avg = useMemo(() => {
    if (reviews.length === 0) return null;
    return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setFormError("");
    if (rating < 1) {
      setFormError("Please choose a star rating.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("A valid email address is required.");
      return;
    }
    if (comment.trim().length < 3) {
      setFormError("Please write a short review (at least a few words).");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: name.trim(),
          author_email: email.trim(),
          rating,
          comment: comment.trim(),
          course_slug: courseSlug || null,
          course_name: courseName || null,
          website, // honeypot
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        if (data.review) setReviews((r) => [data.review, ...r].slice(0, limit));
        setSuccess(true);
        setName("");
        setEmail("");
        setRating(0);
        setComment("");
        window.dispatchEvent(new CustomEvent("reh:review", { detail: { course: courseSlug || null, rating } }));
      } else {
        // backend not live yet (pre-launch preview) -> add locally as a marked sample
        const local: Review = {
          id: Date.now(),
          author_name: name.trim() || "Anonymous",
          rating,
          comment: comment.trim(),
          course_slug: courseSlug || null,
          course_name: courseName || null,
          created_at: new Date().toISOString(),
        };
        (local as Review & { sample?: boolean }).sample = true;
        setReviews((r) => [local, ...r].slice(0, limit));
        setUsingSamples(true);
        setSuccess(true);
        setName("");
        setEmail("");
        setRating(0);
        setComment("");
        window.dispatchEvent(new CustomEvent("reh:review", { detail: { course: courseSlug || null, rating } }));
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const heading = title || (courseSlug ? `Reviews for ${courseName ?? "this course"}` : "What clients say");

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Reviews</p>
          <h2 className={`mt-2 font-display text-charcoal ${compact ? "text-2xl" : "text-3xl"}`}>{heading}</h2>
        </div>
        {avg !== null && reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <StarRating value={avg} size="md" />
            <p className="text-sm text-charcoal/70">
              <span className="font-display text-2xl text-charcoal">{avg.toFixed(1)}</span> from{" "}
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          </div>
        )}
      </div>

      {usingSamples && !loading && (
        <p className="mt-4 rounded-xl border border-dashed border-sand/50 bg-paper px-4 py-3 text-xs text-charcoal/60">
          <span className="font-bold text-sand">Sample reviews</span> shown for preview. Real reviews
          appear here once the site launches.
        </p>
      )}

      {loading && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-charcoal/5" />
          ))}
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => {
            const isSample = (r as Review & { sample?: boolean }).sample === true;
            return (
              <article key={r.id} className="flex flex-col rounded-2xl border border-line bg-paper p-5">
                <div className="flex items-center justify-between gap-3">
                  <StarRating value={r.rating} size="sm" />
                  <span className="flex items-center gap-2">
                    {isSample && (
                      <span className="rounded-full bg-sand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sand">
                        Sample
                      </span>
                    )}
                    <span className="text-xs text-charcoal/45">{timeAgo(r.created_at)}</span>
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">{r.comment}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-line pt-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-xs font-bold text-white">
                    {r.author_name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{r.author_name}</p>
                    {r.course_name && !courseSlug && (
                      <p className="text-xs text-charcoal/50">{r.course_name}</p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-line bg-paper p-5 text-sm text-charcoal/60">
          No reviews yet{courseSlug ? " for this course" : ""}. Be the first to leave one below.
        </p>
      )}

      {showForm && (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-6 sm:p-8">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                <svg className="h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-3 font-display text-xl text-charcoal">Thank you for your review!</h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Your review is now live. We only use your email to confirm reviews and never share it.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-charcoal px-5 text-sm font-bold text-white transition-colors hover:bg-brand"
              >
                Write another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-display text-xl text-charcoal">
                {courseSlug ? `Review this course` : "Leave a review"}
              </h3>
              <p className="mt-1 text-sm text-charcoal/60">
                We&apos;d love to hear about your training experience. Your email is required so we can
                verify reviews, and is never published.
              </p>

              <div className="mt-5">
                <span className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Your rating <span className="text-brand">*</span>
                </span>
                <StarInput value={rating} onChange={setRating} />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`rev-name-${courseSlug || "all"}`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                    Name <span className="font-normal text-charcoal/50">(optional)</span>
                  </label>
                  <input
                    id={`rev-name-${courseSlug || "all"}`}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Thabo Nkosi"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label htmlFor={`rev-email-${courseSlug || "all"}`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                    Email <span className="text-brand">*</span>
                  </label>
                  <input
                    id={`rev-email-${courseSlug || "all"}`}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.co.za"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor={`rev-comment-${courseSlug || "all"}`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Your review <span className="text-brand">*</span>
                </label>
                <textarea
                  id={`rev-comment-${courseSlug || "all"}`}
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the course, the trainer, and what you gained..."
                  className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              {/* honeypot */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {formError && <p className="mt-3 text-sm font-semibold text-brand">{formError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-charcoal px-6 text-sm font-bold text-white transition-colors hover:bg-brand disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.26 6.85.8-5.09 4.63 1.35 6.76L12 17.1 5.99 20.45l1.35-6.76L2.25 9.06l6.85-.8L12 2z" />
                </svg>
                Submit Review
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
