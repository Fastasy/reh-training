import { NextResponse } from "next/server";
import { list, get, put } from "@vercel/blob";

// Quote API -- server-side lead capture (added 2026-09-10).
//
// Before this route existed the booking modal and the contact-page form only opened
// a mailto: link. That made "a conversion" mean "the visitor's mail client opened",
// which is not a lead: nothing was recorded anywhere, and if their mail app failed
// the enquiry was lost with no trace. Now the form POSTs here first, the lead is
// stored in Vercel Blob, and only a 201 response fires the quote_request conversion
// that Google Ads bids on.
//
// POST /api/quote -> store a lead (honeypot + validation)
// GET  /api/quote -> list stored leads; requires Authorization: Bearer $QUOTE_ADMIN_TOKEN
//
// The client's email workflow is deliberately unchanged: the browser still opens
// the mailto: handoff after posting, so nothing about how the office works moves.
// This route is the safety net, not a replacement.

type CourseRow = { course: string; count: string };

type QuoteRecord = {
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
  courses: CourseRow[];
  training_matrix: string | null;
  training_location: string | null;
  timeline: string | null;
  message: string | null;
  landing_page: string | null;
  created_at: string;
};

function str(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

function isValidEmail(v: string): boolean {
  const at = v.indexOf("@");
  if (at <= 0 || at !== v.lastIndexOf("@")) return false;
  if (/\s/.test(v)) return false;
  return v.indexOf(".", at + 1) > at + 1 && !v.endsWith(".");
}

function isValidPhone(v: string): boolean {
  return /^[+0-9 ()-]{7,25}$/.test(v);
}

function isAuthorised(req: Request): boolean {
  const expected = process.env.QUOTE_ADMIN_TOKEN;
  // Fail closed: an unset token means nobody can read the leads endpoint rather
  // than everybody can.
  if (!expected) return false;
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  // Length check first so the comparison does not leak length via timing.
  return token.length === expected.length && token === expected;
}

export async function GET(req: Request) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "leads/", limit: 1000 });
    const leads: QuoteRecord[] = [];
    for (const b of blobs) {
      try {
        const result = await get(b.url, { access: "private" });
        if (!result) continue;
        const text = await new Response(result.stream).text();
        leads.push(JSON.parse(text) as QuoteRecord);
      } catch {
        // skip unreadable/corrupt lead blobs
      }
    }
    leads.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    return NextResponse.json({ count: leads.length, leads });
  } catch (e) {
    console.error("quote GET failed", e);
    return NextResponse.json({ error: "failed to load leads" }, { status: 502 });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // honeypot: bots fill the hidden field. Answer 201 so they do not learn anything.
  if (body.website) {
    return NextResponse.json({ ok: true, id: null }, { status: 201 });
  }

  const source = str(body.source, 40) || "booking_modal";
  const contactName = str(body.contact_name, 120);
  const phone = str(body.phone, 25);
  const email = str(body.email, 120).toLowerCase();
  const message = str(body.message, 2000);

  if (!contactName) {
    return NextResponse.json({ error: "a contact name is required" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "a valid phone number is required" }, { status: 400 });
  }
  // Email is optional: the contact-page form collects a phone number, not an
  // address. Validate it only when it is actually supplied.
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "enter a valid email address" }, { status: 400 });
  }

  // Normalise the course rows. The booking modal sends a list of {course, count};
  // the contact-page form sends a single course string.
  const rawCourses = Array.isArray(body.courses) ? body.courses : [];
  const courses: CourseRow[] = rawCourses
    .map((r) => {
      const row = (r ?? {}) as Record<string, unknown>;
      return { course: str(row.course, 120), count: str(row.count, 10) };
    })
    .filter((r) => r.course);

  if (source === "booking_modal" && courses.length === 0) {
    return NextResponse.json({ error: "add at least one course" }, { status: 400 });
  }
  if (source === "contact_form" && courses.length === 0 && !message) {
    return NextResponse.json(
      { error: "a course or a message is required" },
      { status: 400 }
    );
  }

  const rec: QuoteRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source,
    contact_name: contactName,
    contact_person: str(body.contact_person, 120) || null,
    first_name: str(body.first_name, 80) || null,
    last_name: str(body.last_name, 80) || null,
    phone,
    email: email || null,
    company: str(body.company, 160) || null,
    company_location: str(body.company_location, 160) || null,
    courses,
    training_matrix: str(body.training_matrix, 200) || null,
    training_location: str(body.training_location, 200) || null,
    timeline: str(body.timeline, 80) || null,
    message: message || null,
    landing_page: str(body.landing_page, 200) || null,
    created_at: new Date().toISOString(),
  };

  try {
    await put(`leads/${rec.id}.json`, JSON.stringify(rec), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, id: rec.id }, { status: 201 });
  } catch (e) {
    // 502 tells the client to fire quote_request_unconfirmed instead of a
    // conversion: the visitor still gets their email handoff, but we must not
    // report a lead we never stored.
    console.error("quote POST failed", e);
    return NextResponse.json({ error: "failed to save lead" }, { status: 502 });
  }
}
