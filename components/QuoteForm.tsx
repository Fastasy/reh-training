"use client";

import { useState } from "react";
import { REH_EMAIL } from "@/lib/courses";

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
    const subject = `Training Quotation Request - ${course}`;
    const text = [
      "Hi REH Safety Training,",
      "",
      "Please send a quotation for the following training:",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Course: ${course}`,
      message ? `Details: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${REH_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
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
      <h3 className="mt-4 font-display text-xl text-charcoal">Your email app should be opening now</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          If nothing happened, email us directly at{" "}
          <a href={`mailto:${REH_EMAIL}?subject=Training%20Quotation%20Request`} className="font-semibold text-brand">
            {REH_EMAIL}
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
        Send your details and one of our training advisors will respond with pricing and available dates.
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
          Phone number
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
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        Send via Email
      </button>
      <p className="text-center text-xs text-charcoal/50">
        Prefer to call? <a href="tel:+27107466954" className="font-semibold text-charcoal/80">010 746 6954</a> (Midrand) ·{" "}
        <a href="tel:+27769346783" className="font-semibold text-charcoal/80">076 934 6783</a> (Durban)
      </p>
    </form>
  );
}
