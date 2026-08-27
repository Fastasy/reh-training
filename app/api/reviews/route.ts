import { NextResponse } from "next/server";
import { list, get, put } from "@vercel/blob";

// Reviews API — Vercel Blob-backed (store: reh-reviews, linked to this project).
// Each review is one immutable blob at reviews/<timestamp>-<rand>.json
// GET /api/reviews?course=<slug>  -> approved reviews (optionally filtered by course)
// POST /api/reviews               -> submit a review (email required, honeypot spam trap)


function isValidEmail(v: string): boolean {
  const at = v.indexOf("@");
  if (at <= 0 || at !== v.lastIndexOf("@")) return false;
  if (/[\s]/.test(v)) return false;
  return v.indexOf(".", at + 1) > at + 1 && !v.endsWith(".");
}

type ReviewRecord = {
  id: string;
  author_name: string;
  author_email: string;
  rating: number;
  comment: string;
  course_slug: string | null;
  course_name: string | null;
  approved: boolean;
  source: string;
  created_at: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const course = searchParams.get("course");

  try {
    const { blobs } = await list({ prefix: "reviews/", limit: 500 });
    const reviews: ReviewRecord[] = [];
    for (const b of blobs) {
      try {
        const result = await get(b.url, { access: "private" });
        if (!result) continue;
        const text = await new Response(result.stream).text();
        const rec = JSON.parse(text) as ReviewRecord;
        if (!rec.approved) continue;
        if (course && rec.course_slug !== course) continue;
        reviews.push(rec);
      } catch {
        // skip unreadable/corrupt review blobs
      }
    }
    reviews.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    return NextResponse.json({ reviews: reviews.slice(0, 50) });
  } catch (e) {
    console.error("reviews GET failed", e);
    return NextResponse.json({ error: "failed to load reviews" }, { status: 502 });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // honeypot: bots fill the hidden website field
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const rating = Number(body.rating);
  const email = String(body.author_email || body.email || "").trim().toLowerCase();
  const comment = String(body.comment || "").trim();
  const authorName = String(body.author_name || "").trim();
  const courseSlug = String(body.course_slug || "").trim() || null;
  const courseName = String(body.course_name || "").trim() || null;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "rating must be between 1 and 5" }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 120) {
    return NextResponse.json({ error: "a valid email address is required" }, { status: 400 });
  }
  if (comment.length < 3 || comment.length > 2000) {
    return NextResponse.json({ error: "review must be between 3 and 2000 characters" }, { status: 400 });
  }
  if (authorName.length > 80) {
    return NextResponse.json({ error: "name too long" }, { status: 400 });
  }

  const rec: ReviewRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    author_name: authorName || "Anonymous",
    author_email: email,
    rating,
    comment,
    course_slug: courseSlug,
    course_name: courseName,
    approved: true,
    source: "site",
    created_at: new Date().toISOString(),
  };

  try {
    await put(`reviews/${rec.id}.json`, JSON.stringify(rec), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, review: rec }, { status: 201 });
  } catch (e) {
    console.error("reviews POST failed", e);
    return NextResponse.json({ error: "failed to save review" }, { status: 502 });
  }
}
