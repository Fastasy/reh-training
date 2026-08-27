type Props = {
  title: string;
  sub?: string;
};

export default function CTABand({ title, sub }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="hazard-stripes h-1.5 w-full" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">{title}</h2>
            {sub && <p className="mt-3 text-cream/75">{sub}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/27615807967?text=Hi%20REH%20Safety%20Training!%20I%27d%20like%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-bold text-white shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
              </svg>
              Request a Quote
            </a>
            <a
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-cream/30 px-6 py-3 text-base font-bold text-cream transition-colors hover:border-cream hover:bg-white/5"
            >
              Browse All Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
