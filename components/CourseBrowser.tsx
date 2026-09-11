"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COURSE_CATEGORIES, ALL_COURSES } from "@/lib/courses";
import { categoryImage } from "@/lib/categoryImages";
import CourseCard from "@/components/CourseCard";

const CATEGORY_IDS = COURSE_CATEGORIES.map((c) => c.id);

/**
 * ?category=<id> is how the home page's "Browse by Category" cards hand a filter
 * over to this page, e.g. /courses?category=emergency-courses. Unknown values are
 * ignored so a stale or hand-typed link falls back to the full catalogue.
 */
function categoryFromParam(value: string | null): string | null {
  return value && CATEGORY_IDS.includes(value) ? value : null;
}

export default function CourseBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlCategory = categoryFromParam(searchParams.get("category"));

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(urlCategory);
  const barRef = useRef<HTMLDivElement>(null);

  // The URL is the source of truth: home-page cards, shared links and back/forward
  // all land on the right filter.
  useEffect(() => {
    setActiveCat(urlCategory);
    setQuery("");
  }, [urlCategory]);

  // Landed here from a category card? Put the catalogue in view instead of the page
  // hero above it. Runs once per arrival; the card links navigate with scroll={false}
  // so this is the only thing moving the page.
  useEffect(() => {
    if (!urlCategory) return;
    barRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCategory = (id: string | null) => {
    setActiveCat(id);
    setQuery("");
    router.replace(id ? `${pathname}?category=${id}` : pathname, { scroll: false });
  };

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

  const activeCategory = COURSE_CATEGORIES.find((c) => c.id === activeCat) ?? null;

  return (
    <div>
      {/* search + filter bar */}
      <div ref={barRef} className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-6 lg:px-8">
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
              const image = categoryImage(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(isActive ? null : cat.id)}
                  aria-pressed={isActive}
                  className={`tile-shine group relative flex min-h-[118px] flex-col justify-end gap-1.5 rounded-2xl bg-charcoal px-3 py-3.5 text-left shadow-md shadow-charcoal/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/25 ${
                    isActive ? "ring-2 ring-brand ring-offset-2 ring-offset-paper shadow-lg shadow-brand/30" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute inset-0 ${
                      isActive
                        ? "bg-brand/70"
                        : "bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/10 transition-colors group-hover:from-brand-dark/90 group-hover:via-brand-dark/55"
                    }`}
                    aria-hidden
                  />
                  <span className="relative z-[1] text-[13px] font-bold leading-snug text-white sm:text-sm">
                    {cat.title}
                  </span>
                  <span className="relative z-[1] inline-flex w-fit items-center justify-center rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-extrabold leading-none tracking-wide text-white uppercase">
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

      {/* active filter notice — only when the catalogue is filtered by category */}
      {!results && activeCategory && (
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-charcoal/70">
            Showing{" "}
            <span className="font-bold text-charcoal">{activeCategory.title}</span> —{" "}
            {activeCategory.courses.length} course{activeCategory.courses.length === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={() => selectCategory(null)}
            className="text-sm font-bold text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:text-brand-dark"
          >
            Show all courses
          </button>
        </div>
      )}

      {/* category sections */}
      {!results && (
        <div className={`${activeCategory ? "mt-8" : "mt-14"} space-y-16`}>
          {COURSE_CATEGORIES.filter((c) => !activeCat || c.id === activeCat).map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-32">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* category cover — same photo language as the home-page cards, but the
                    photo keeps its 16:10 crop beside the copy instead of being squeezed
                    into a wide band (a 7:1 crop decapitates most of these shots). */}
                <div className="grid items-center gap-5 rounded-3xl border border-line bg-paper p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-charcoal">
                    <Image
                      src={categoryImage(cat.id).src}
                      alt={categoryImage(cat.id).alt}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 60vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                      {cat.courses.length} courses
                    </span>
                    <h2 className="mt-2 font-display text-2xl text-charcoal sm:text-3xl">{cat.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{cat.blurb}</p>
                  </div>
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
