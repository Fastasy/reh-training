"use client";

import { useState } from "react";

const COURSE_OPTIONS = [
  "Working at Heights",
  "First Aid Level 1",
  "Health & Safety Representative (SHE Rep)",
  "Safety Officer Skills Programme",
  "Forklift Operator",
  "Risk Assessment (HIRA)",
  "OHS Act",
  "Scaffolding Erector",
  "Fire Marshal",
  "Other / Not sure yet",
];

export default function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState(COURSE_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "Hi REH Safety Training! I'd like a quote.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Course: ${course}`,
      message ? `Details: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/27615807967?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
          <svg className="h-7 w-7 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-xl text-charcoal">WhatsApp should be opening now</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          If nothing happened, message us directly on{" "}
          <a href="https://wa.me/27615807967" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand">
            061 580 7967
          </a>{" "}
          — a training advisor will get back to you fast.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-line bg-paper p-6 shadow-lg shadow-charcoal/5 sm:p-8"
    >
      <h3 className="font-display text-xl text-charcoal">Request a Quote</h3>
      <p className="text-sm text-charcoal/70">
        Send your details on WhatsApp — a training advisor responds quickly with pricing and available dates.
      </p>

      <div>
        <label htmlFor="q-name" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Your name
        </label>
        <input
          id="q-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Thabo Nkosi"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="q-phone" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Phone / WhatsApp number
        </label>
        <input
          id="q-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 082 123 4567"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="q-course" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Course of interest
        </label>
        <select
          id="q-course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-charcoal focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          {COURSE_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="q-msg" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Message <span className="font-normal text-charcoal/50">(optional)</span>
        </label>
        <textarea
          id="q-msg"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Number of learners, preferred dates, on-site or centre-based..."
          className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <button
        type="submit"
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
        </svg>
        Send on WhatsApp
      </button>
      <p className="text-center text-xs text-charcoal/50">
        Prefer to call? <a href="tel:+27107466954" className="font-semibold text-charcoal/80">010 746 6954</a> (Midrand) ·{" "}
        <a href="tel:+27769346783" className="font-semibold text-charcoal/80">076 934 6783</a> (Durban)
      </p>
    </form>
  );
}
