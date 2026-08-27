import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/courses", label: "All Courses" },
  { href: "/consulting", label: "OHS Consulting" },
  { href: "/medicals", label: "OHS Medicals" },
  { href: "/contact", label: "Request a Quote" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* hazard stripe accent */}
      <div className="hazard-stripes h-1.5 w-full" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-xl bg-white p-1.5">
                <Image
                  src="/images/reh-logo.png"
                  alt="REH Safety Training logo"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-display text-lg text-white">REH Safety Training</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Accredited health &amp; safety training, OHS consulting and occupational medicals —
              part of the SM Safety and Technical Learning Group.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/rehtraining"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REH Safety Training on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-cream transition-colors hover:bg-brand"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
                </svg>
              </a>
              <a
                href="https://wa.me/27615807967"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp REH Safety Training"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-cream transition-colors hover:bg-brand"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@rehsafetytraining"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REH Safety Training on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-cream transition-colors hover:bg-brand"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12v-3.15a5.76 5.76 0 0 0-.77-.05 5.74 5.74 0 1 0 5.74 5.74V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.3-1.48Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h3 className="font-display text-base text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* JHB */}
          <div>
            <h3 className="font-display text-base text-white">Johannesburg Branch</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">14 Douglas Road, Glen Austin, Midrand, Johannesburg, 1685</p>
            <div className="mt-3 space-y-1.5 text-sm">
              <a href="tel:+27615807967" className="block text-cream/80 hover:text-white">061 580 7967</a>
              <a href="tel:+27107466954" className="block text-cream/80 hover:text-white">010 746 6954</a>
              <a href="mailto:info@rehtraining.co.za" className="block text-cream/80 hover:text-white">info@rehtraining.co.za</a>
            </div>
          </div>

          {/* DBN */}
          <div>
            <h3 className="font-display text-base text-white">Durban Branch</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">62 Lilian Ngoyi Street, Windermere, Durban</p>
            <div className="mt-3 space-y-1.5 text-sm">
              <a href="tel:+27769346783" className="block text-cream/80 hover:text-white">076 934 6783</a>
              <a href="tel:+27107466954" className="block text-cream/80 hover:text-white">010 746 6954</a>
              <a href="mailto:info@rehtraining.co.za" className="block text-cream/80 hover:text-white">info@rehtraining.co.za</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} REH Safety Training. All rights reserved.</p>
          <p>
            Website by{" "}
            <a
              href="https://www.allegrodigital.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cream/70 underline decoration-cream/30 underline-offset-2 transition-colors hover:text-white"
            >
              Allegro Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
