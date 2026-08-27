import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Us — Request a Quote",
  description:
    "Contact REH Safety Training for quotes and bookings: email info@rehtraining.co.za, call 010 746 6954, or visit our Midrand or Durban training centres.",
  alternates: { canonical: "/contact" },
};

const BRANCHES = [
  {
    city: "Johannesburg Branch",
    address: "14 Douglas Road, Glen Austin, Midrand, Johannesburg, 1685",
    phones: ["061 580 7967", "010 746 6954"],
    map: "https://www.google.com/maps/search/?api=1&query=14+Douglas+Road+Glen+Austin+Midrand",
  },
  {
    city: "Durban Branch",
    address: "62 Lilian Ngoyi Street, Windermere, Durban",
    phones: ["076 934 6783", "010 746 6954"],
    map: "https://www.google.com/maps/search/?api=1&query=62+Lilian+Ngoyi+Street+Windermere+Durban",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="hazard-stripes h-1.5 w-full" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Contact Us</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
              Training Quotation Request
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              Submit your details and one of our training advisors will contact you to assist with
              information or bookings — fast, via email.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <QuoteForm />

              {/* direct contact cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href="https://wa.me/27615807967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-brand/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#1da851]">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-charcoal/60">WhatsApp</p>
                    <p className="font-bold text-charcoal">061 580 7967</p>
                  </div>
                </a>
                <a
                  href="tel:+27107466954"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-brand/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-charcoal/60">Phone</p>
                    <p className="font-bold text-charcoal">010 746 6954</p>
                  </div>
                </a>
              </div>
            </div>

            {/* branches */}
            <div className="space-y-6">
              {BRANCHES.map((b) => (
                <div key={b.city} className="rounded-2xl border border-line bg-paper p-7">
                  <h2 className="font-display text-xl text-charcoal">{b.city}</h2>
                  <p className="mt-3 leading-relaxed text-charcoal/70">{b.address}</p>
                  <div className="mt-4 space-y-1.5">
                    {b.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="block font-semibold text-charcoal transition-colors hover:text-brand"
                      >
                        {p}
                      </a>
                    ))}
                    <a href="mailto:info@rehtraining.co.za" className="block font-semibold text-charcoal transition-colors hover:text-brand">
                      info@rehtraining.co.za
                    </a>
                  </div>
                  <a
                    href={b.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-charcoal px-4 py-2.5 text-sm font-bold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              ))}

              <div className="rounded-2xl bg-navy p-7 text-cream">
                <h2 className="font-display text-xl text-white">Training Hours</h2>
                <ul className="mt-4 space-y-2 text-sm text-cream/80">
                  <li className="flex justify-between">
                    <span>Mon – Fri</span>
                    <span className="font-semibold text-white">08:00 – 16:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold text-white">By arrangement</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Daily classes</span>
                    <span className="font-semibold text-white">No waiting period</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-cream/60">
                  Hours are indicative — book via email for your exact slot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
