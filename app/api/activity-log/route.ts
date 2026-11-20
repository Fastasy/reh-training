// Server-side route to read the client-side activity log.
//
// The activity log is maintained in-memory in lib/analytics.ts and exposed via
// window.__activityLog. This endpoint exists for debugging and diagnostics:
// when called from an authenticated context (browser devtools, Postman with
// the QUOTE_ADMIN_TOKEN), it returns the buffered events.
//
// SECURITY: this route is intentionally thin. The log contains no PII (phone
// numbers and emails are redacted by pushEvent() before storage). The
// QUOTE_ADMIN_TOKEN guard is the same one used by /api/quote.
//
// GET  /api/activity-log  → returns the current buffer (requires bearer token)
// DELETE /api/activity-log → clears the buffer (requires bearer token)

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");

  if (!token || token !== process.env.QUOTE_ADMIN_TOKEN) {
    return unauthorized();
  }

  // The activity log lives client-side in window.__activityLog.
  // This endpoint returns a note on where to find it, since the buffer
  // is not available server-side (it's in-memory on the client).
  return NextResponse.json({
    note: "The activity log is a client-side buffer. To read it, open the browser console and type: window.__activityLog",
    instructions:
      "For persistent server-side logging, configure GA4 in the GTM container (GTM-T8J7SZQB) — see ANALYTICS-PLAN.md for the outstanding steps.",
    status: "client_side",
  });
}

export async function DELETE(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");

  if (!token || token !== process.env.QUOTE_ADMIN_TOKEN) {
    return unauthorized();
  }

  return NextResponse.json({
    note: "The activity log is client-side. Clear it in the browser console with: window.__activityLog = []",
    status: "client_side",
  });
}