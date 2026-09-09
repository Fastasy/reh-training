"use client";

import { useMemo, useState } from "react";
import { COURSE_CATEGORIES, ALL_COURSES } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default function CourseBrowser() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ALL_COURSES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.usId && c.usId.toLowerCase().includes(q)) ||
        (c.duration.toLowerCase().includes(q) && q.length > 2)
    );
  }, [query]);

  return (
    <div>
      {/* search + filter bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses — e.g. forklift, first aid, scaffolding or a unit standard ID..."
              className="w-full rounded-xl border border-line bg-white py-3.5 pl-12 pr-4 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              aria-label="Search courses"
            />
          </div>
          <div className="cat-tile-grid mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {COURSE_CATEGORIES.map((cat) => {
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCat(activeCat === cat.id ? null : cat.id);
                    setQuery("");
                  }}
                  aria-pressed={isActive}
                  className={`tile-shine flex min-h-[86px] flex-col items-center justify-between gap-2 rounded-2xl px-3 py-3.5 text-center transition-all ${
                    isActive
                      ? "bg-brand text-white shadow-lg shadow-brand/30 ring-2 ring-brand ring-offset-2 ring-offset-paper"
                      : "bg-charcoal text-white shadow-md shadow-charcoal/20 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25"
                  }`}
                >
                  <span className="relative z-[1] text-[13px] font-bold leading-snug sm:text-sm">
                    {cat.title}
                  </span>
                  <span
                    className={`relative z-[1] inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-extrabold leading-none tracking-wide uppercase ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-white/10 text-cream/85"
                    }`}
                  >
                    {cat.courses.length} course{cat.courses.length === 1 ? "" : "s"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* search results */}
      {results && (
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-charcoal">
            {results.length === 0 ? "No courses match your search" : `${results.length} course${results.length === 1 ? "" : "s"} found`}
          </h2>
          {results.length > 0 && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((c) => (
                <CourseCard key={c.name} course={c} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* category sections */}
      {!results && (
        <div className="mt-14 space-y-16">
          {COURSE_CATEGORIES.filter((c) => !activeCat || c.id === activeCat).map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-32">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl text-charcoal sm:text-3xl">{cat.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal/65">{cat.blurb}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-sand">
                    {cat.courses.length} courses
                  </span>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.courses.map((course) => (
                    <CourseCard key={course.name} course={{ ...course, category: cat.title, categoryId: cat.id }} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
