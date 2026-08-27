import type { Course } from "@/lib/courses";
import { waQuoteLink } from "@/lib/courses";
import { courseSlug } from "@/lib/slugs";

type Props = {
  course: Course & { category: string; categoryId: string };
};

export default function CourseCard({ course }: Props) {
  const href = `/courses/${courseSlug(course.name)}`;
  return (
    <div className="group flex flex-col rounded-2xl border border-line bg-paper p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-charcoal/10">
      <div className="flex items-start justify-between gap-3">
        <a href={href} className="font-semibold leading-snug text-charcoal hover:text-brand">
          {course.name}
        </a>
        {course.popular && (
          <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
            Popular
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs text-charcoal/60">
          <svg className="h-4 w-4 text-sand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          {course.duration}
        </span>
        <span className="text-lg font-bold text-charcoal">
          {course.price ? (
            course.price
          ) : (
            <span className="text-sm font-semibold text-sand">Request a Quote</span>
          )}
        </span>
      </div>
      {/* equal-size action row */}
      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
        <a
          href={href}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border-2 border-line px-3 text-sm font-bold text-charcoal transition-colors hover:border-charcoal"
        >
          Details
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </a>
        <a
          href={waQuoteLink(course.name)}
          data-course={course.name}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-charcoal px-3 text-sm font-bold text-white transition-colors hover:bg-brand"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
          </svg>
          Get Price
        </a>
      </div>
    </div>
  );
}
