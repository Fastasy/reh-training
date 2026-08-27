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
              href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
              data-booking
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-bold text-white shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
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
