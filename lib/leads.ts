/**
 * The shape of a stored quote/booking lead.
 *
 * Single source of truth: `app/api/quote/route.ts` writes these records, `lib/email.ts`
 * renders them into the office notification, and `GET /api/quote` returns them to
 * anyone holding the admin token. Keep the three in step by editing this type only.
 */

export type LeadCourseRow = { course: string; count: string };

export type LeadRecord = {
  id: string;
  source: string;
  contact_name: string;
  contact_person: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string;
  email: string | null;
  company: string | null;
  company_location: string | null;
  courses: LeadCourseRow[];
  training_matrix: string | null;
  training_location: string | null;
  timeline: string | null;
  message: string | null;
  landing_page: string | null;
  created_at: string;
};

/**
 * Outcome of trying to notify the office about a lead.
 *
 * `skipped_not_configured` is deliberately distinct from `failed`: the first means no
 * mail credentials are set up yet (safe, expected before launch), the second means we
 * tried to send and Resend said no (needs attention).
 */
export type LeadEmailStatus = "sent" | "skipped_not_configured" | "failed";

export type LeadEmailResult = {
  status: LeadEmailStatus;
  id?: string;
  error?: string;
};
