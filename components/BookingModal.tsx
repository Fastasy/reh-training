"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import CourseSelect from "./CourseSelect";
import { REH_EMAIL } from "@/lib/courses";

type BookingContextType = {
  openBooking: (course?: string) => void;
};

const BookingContext = createContext<BookingContextType>({ openBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

type CourseRow = { course: string; count: string };

const TIMELINE_OPTIONS = [
  "Urgent (within 7 days)",
  "Within 30 days",
  "1 to 3 months",
  "Planning / budgeting stage",
];

const EMPTY_ROW: CourseRow = { course: "", count: "" };

function extractCourseFromElement(link: HTMLAnchorElement): string | null {
  return link.getAttribute("data-course");
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // ---- form state ----
  const [contactPerson, setContactPerson] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [rows, setRows] = useState<CourseRow[]>([{ ...EMPTY_ROW }]);
  const [fileName, setFileName] = useState("");
  const [trainingLocation, setTrainingLocation] = useState("");
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const openBooking = useCallback((course?: string) => {
    setRows(course ? [{ course, count: "" }] : [{ ...EMPTY_ROW }]);
    setSent(false);
    setErrors({});
    setOpen(true);
  }, []);

  // global interceptor: any booking CTA (a[data-booking]) opens the modal instead
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.button === 1) return; // let new-tab/middle-click through
      const target = e.target as HTMLElement;
      const link = target.closest('a[data-booking]') as HTMLAnchorElement | null;
      if (!link) return;
      e.preventDefault();
      openBooking(extractCourseFromElement(link) ?? undefined);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openBooking]);

  // lock scroll + ESC close while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // let a focused combobox close its own dropdown; only close the modal otherwise
      const t = e.target as HTMLElement | null;
      if (t && typeof t.closest === "function" && t.closest('[role="combobox"]')) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const addRow = () => setRows((r) => [...r, { ...EMPTY_ROW }]);
  const updateRow = (i: number, patch: Partial<CourseRow>) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  const removeRow = (i: number) => setRows((r) => (r.length > 1 ? r.filter((_, idx) => idx !== i) : r));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!contactPerson.trim()) e.contactPerson = "Required";
    if (!firstName.trim()) e.firstName = "Required";
    if (!lastName.trim()) e.lastName = "Required";
    if (!phone.trim()) e.phone = "Required";
    else if (!/^[+0-9 ()-]{7,}$/.test(phone.trim())) e.phone = "Enter a valid phone number";
    if (!email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address";
    if (!company.trim()) e.company = "Required";
    if (!companyLocation.trim()) e.companyLocation = "Required";
    const validRows = rows.filter((r) => r.course.trim() || r.count.trim());
    if (validRows.length === 0) e.rows = "Add at least one course";
    if (!trainingLocation.trim()) e.trainingLocation = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting || !validate()) return;
    setSubmitting(true);

    const courseList = rows
      .filter((r) => r.course.trim())
      .map((r) => `${r.course.trim()}${r.count.trim() ? ` - ${r.count.trim()}` : ""}`)
      .join(", ");

    const subject = `Training Quotation Request - ${company.trim() || courseList || "New enquiry"}`;
    const body = [
      "Hi REH Safety Training,",
      "",
      "Please send a quotation for the following training:",
      "",
      `Contact Person: ${contactPerson.trim()}`,
      `Name: ${firstName.trim()} ${lastName.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      `Company: ${company.trim()}`,
      `Company Location: ${companyLocation.trim()}`,
      `Courses Required: ${courseList}`,
      fileName
        ? `Training Matrix: ${fileName} (attached to this email)`
        : "Training Matrix: to follow",
      `Training Location: ${trainingLocation.trim()}`,
      `When: ${timeline}`,
      "",
      "Thank you,",
      `${firstName.trim()} ${lastName.trim()}`,
      company.trim() ? company.trim() : "",
    ]
      .filter((l) => l !== "")
      .join("\n");

    const url = `mailto:${REH_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.dispatchEvent(new CustomEvent("reh:quote", { detail: url }));
    window.location.href = url;
    setSent(true);
    setSubmitting(false);
  };

  const close = () => setOpen(false);

  if (!open) {
    return <BookingContext.Provider value={{ openBooking }}>{children}</BookingContext.Provider>;
  }

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {/* backdrop */}
      <div
        className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Request a booking quotation"
      >
        <div
          ref={panelRef}
          className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper px-6 py-4">
            <div>
              <h2 className="font-display text-xl text-charcoal">Request a Booking Quotation</h2>
              <p className="text-xs text-charcoal/60">
                We&apos;ll open your email app with your details pre-filled to{" "}
                <span className="font-semibold text-charcoal">{REH_EMAIL}</span>. A training advisor replies fast.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-charcoal/70 transition-colors hover:border-charcoal hover:text-charcoal"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </div>

          {sent ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
                <svg className="h-7 w-7 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-xl text-charcoal">Your email app should be opening now</h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Attach your training matrix if you have one, then hit send. If your email app
                didn&apos;t open, email{" "}
                <a
                  href={`mailto:${REH_EMAIL}?subject=Training%20Quotation%20Request`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-brand"
                >
                  {REH_EMAIL}
                </a>{" "}
                directly with your details.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-charcoal px-6 text-sm font-bold text-white transition-colors hover:bg-brand"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 px-6 py-6">
              {/* contact person */}
              <Field label="Contact Person" required error={errors.contactPerson}>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Site Manager / HR / Training Coordinator"
                  className={inputCls(!!errors.contactPerson)}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First Name" required error={errors.firstName}>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={inputCls(!!errors.firstName)}
                  />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className={inputCls(!!errors.lastName)}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" required error={errors.phone}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 082 123 4567"
                    className={inputCls(!!errors.phone)}
                  />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.co.za"
                    className={inputCls(!!errors.email)}
                  />
                </Field>
              </div>

              <Field label="Company Name" required error={errors.company} hint="Enter the company name exactly as it should appear on the quotation.">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. ABC Construction (Pty) Ltd"
                  className={inputCls(!!errors.company)}
                />
              </Field>

              <Field label="Company Location" required error={errors.companyLocation}>
                <input
                  type="text"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                  placeholder="e.g. Port Elizabeth, Eastern Cape"
                  className={inputCls(!!errors.companyLocation)}
                />
              </Field>

              {/* required courses */}
              <div>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <label className="block text-sm font-semibold text-charcoal">
                    Required Courses <span className="text-brand">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addRow}
                    className="inline-flex items-center gap-1 rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add course
                  </button>
                </div>
                <div className="space-y-2.5">
                  {rows.map((row, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CourseSelect
                        value={row.course}
                        onChange={(v) => updateRow(i, { course: v })}
                        exclude={rows.filter((_, idx) => idx !== i).map((r) => r.course)}
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        value={row.count}
                        onChange={(e) => updateRow(i, { count: e.target.value.replace(/[^\d]/g, "") })}
                        placeholder="No."
                        className={`w-20 ${inputCls(false)}`}
                        aria-label={`Course ${i + 1} delegate count`}
                      />
                      {rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow(i)}
                          aria-label="Remove course row"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-charcoal/60 transition-colors hover:border-brand hover:text-brand"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12" />
                            <path d="M18 6L6 18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-charcoal/60">
                  List the required courses and approximate number of delegates for each.
                </p>
                {errors.rows && <p className="mt-1 text-xs font-semibold text-brand">{errors.rows}</p>}
              </div>

              {/* file upload */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal">Training Requirements Document</label>
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-charcoal/30 bg-paper px-4 py-3 transition-colors hover:border-brand">
                  <span className="flex min-w-0 items-center gap-2 text-sm">
                    <svg className="h-5 w-5 shrink-0 text-sand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
                    </svg>
                    <span className={`truncate ${fileName ? "font-semibold text-charcoal" : "text-charcoal/50"}`}>
                      {fileName || "Choose file"}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-lg bg-charcoal px-3 py-1.5 text-xs font-bold text-white">Browse</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />
                </label>
                <p className="mt-1.5 text-xs text-charcoal/60">
                  If available, upload your training matrix or a list of required courses and number of delegates per course to receive an accurate quotation.
                </p>
              </div>

              <Field label="Training Location" required error={errors.trainingLocation}>
                <input
                  type="text"
                  value={trainingLocation}
                  onChange={(e) => setTrainingLocation(e.target.value)}
                  placeholder="e.g. Our site in Midrand / at your premises / online"
                  className={inputCls(!!errors.trainingLocation)}
                />
              </Field>

              <Field label="When is the training required?" required>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className={inputCls(false)}
                >
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark disabled:opacity-60"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Send Quotation Request via Email
              </button>
              <p className="text-center text-xs text-charcoal/50">
                Prefer to talk? Call{" "}
                <a href="tel:+27107466954" className="font-semibold text-charcoal/80">010 746 6954</a> (Midrand) ·{" "}
                <a href="tel:+27769346783" className="font-semibold text-charcoal/80">076 934 6783</a> (Durban)
              </p>
            </form>
          )}
        </div>
      </div>
    </BookingContext.Provider>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-charcoal/60">{hint}</p>}
      {error && <p className="mt-1.5 text-xs font-semibold text-brand">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-brand ring-brand/20"
      : "border-line focus:border-brand focus:ring-brand/20"
  }`;
}
