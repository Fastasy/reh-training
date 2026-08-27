import Link from "next/link";
import { COURSE_CATEGORIES } from "@/lib/courses";
import { courseSlug } from "@/lib/slugs";

export default function AllCoursesSidebar({ current }: { current: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg text-charcoal">All Courses</h2>
        <Link
          href="/courses"
          className="text-xs font-bold text-brand transition-colors hover:text-brand-dark"
        >
          Browse all →
        </Link>
      </div>
      <div className="mt-4 max-h-[55vh] space-y-5 overflow-y-auto pr-1">
        {COURSE_CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-sand">
              {cat.title}
            </h3>
            <ul className="mt-2 space-y-0.5">
              {cat.courses.map((c) => {
                const href = `/courses/${courseSlug(c.name)}`;
                const active = c.name === current;
                return (
                  <li key={c.name}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors ${
                        active
                          ? "bg-brand-soft font-bold text-brand"
                          : "text-charcoal/75 hover:bg-cream hover:text-charcoal"
                      }`}
                    >
                      <span className="min-w-0">{c.name}</span>
                      <span className={`shrink-0 text-[11px] ${active ? "text-brand/80" : "text-charcoal/45"}`}>
                        {c.price ?? "Quote"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
