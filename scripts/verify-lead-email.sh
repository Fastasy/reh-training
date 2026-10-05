#!/usr/bin/env bash
#
# Verifies that a quote/booking submission actually notifies the office by email.
#
# Runs the production build against scripts/mock-resend.py instead of the real Resend
# API, so it needs no live key and cannot email the client. It asserts the whole contract:
#
#   1. a booking-modal submission is stored          -> 201, email "queued"
#   2. a contact-form submission is stored           -> 201, email "queued"
#   3. both notifications reach the transport, addressed to the office, with the
#      visitor's fields rendered and any markup escaped
#   4. a honeypot submission is stored nowhere and sends nothing
#   5. validation still rejects bad input
#   6. a rejected send still leaves the lead stored
#   7. with no RESEND_API_KEY the route reports "not_configured" and sends nothing, so
#      the browser keeps its mailto fallback and delivery is never silently lost
#
# The Blob store is the REAL one (there is no way to redirect @vercel/blob). Every lead
# this script creates is deleted at the end by scripts/cleanup-test-leads.mjs. If the run
# dies early, re-run the cleanup with the ids it printed.
#
# Usage:  bash scripts/verify-lead-email.sh
#
set -uo pipefail

cd "$(dirname "$0")/.." || exit 1
WORK=${TMPDIR:-/tmp}/rstl-lead-email-verify
PORT_A=3457   # server WITH a (mock) Resend key
PORT_B=3458   # server WITHOUT a key
MOCK_PORT=8787
mkdir -p "$WORK"
export CAPTURE_FILE="$WORK/captured.jsonl"
export MOCK_PORT
rm -f "$CAPTURE_FILE"

pids=()
cleanup() { for p in "${pids[@]:-}"; do kill "$p" 2>/dev/null; done; wait 2>/dev/null; }
trap cleanup EXIT

echo "== building"
./node_modules/.bin/next build >"$WORK/build.log" 2>&1 || { echo "FAIL: build failed"; tail -20 "$WORK/build.log"; exit 1; }

echo "== starting mock Resend on :$MOCK_PORT"
python3 scripts/mock-resend.py & pids+=($!)

echo "== starting next start on :$PORT_A (key set) and :$PORT_B (no key)"
RESEND_API_KEY="re_mock_key_for_local_test" \
RESEND_API_BASE_URL="http://127.0.0.1:$MOCK_PORT" \
LEAD_EMAIL_TO="office-test@example.com" \
LEAD_EMAIL_CC="allegro-test@example.com" \
LEAD_EMAIL_FROM="RSTL Centre <quotes@rstlcentre.co.za>" \
./node_modules/.bin/next start -p "$PORT_A" >"$WORK/next-a.log" 2>&1 & pids+=($!)

# No RESEND_API_KEY. LEAD_EMAIL_TO is irrelevant here but kept identical so the only
# difference between the two servers is the key.
LEAD_EMAIL_TO="office-test@example.com" \
./node_modules/.bin/next start -p "$PORT_B" >"$WORK/next-b.log" 2>&1 & pids+=($!)

BASE_A="http://127.0.0.1:$PORT_A"
BASE_B="http://127.0.0.1:$PORT_B"

# --- readiness: GET without a token must be 401 ----------------------------------
for base in "$BASE_A" "$BASE_B"; do
  code=""
  for _ in $(seq 1 60); do
    code=$(curl -s -o /dev/null -w '%{http_code}' "$base/api/quote" 2>/dev/null)
    [ "$code" = "401" ] && break
    sleep 1
  done
  if [ "$code" != "401" ]; then
    echo "FAIL: $base never became ready (last status '$code')"
    tail -20 "$WORK/next-a.log" "$WORK/next-b.log"
    exit 1
  fi
done
echo "== both servers ready"

post() { # post <base> <json> -> "body|status"
  curl -s -w '|%{http_code}' -X POST "$1/api/quote" \
    -H 'Content-Type: application/json' --data-binary "$2"
}
json() { python3 -c "import sys,json;print(json.load(sys.stdin).get('$1'))"; }

pass=0; fail=0
check() { # check <label> <expected> <actual>
  if [ "$2" = "$3" ]; then echo "  PASS  $1"; pass=$((pass+1));
  else echo "  FAIL  $1 -- expected [$2] got [$3]"; fail=$((fail+1)); fi
}

ids=()

echo
echo "== 1. booking modal submission"
r=$(post "$BASE_A" '{"source":"booking_modal","contact_name":"Sipho Dlamini","contact_person":"Sipho Dlamini","first_name":"Sipho","last_name":"Dlamini","phone":"082 123 4567","email":"sipho@buildco.co.za","company":"Dlamini Build & Co <script>alert(1)</script>","company_location":"Mthatha","courses":[{"course":"Working at Heights","count":"12"},{"course":"First Aid Level 1","count":"4"}],"training_location":"On site, Mthatha","timeline":"Within 30 days","message":"Need it before the N2 contract starts","landing_page":"/courses/working-at-heights"}')
check "status 201" "201" "${r##*|}"
check "email queued" "queued" "$(printf '%s' "${r%|*}" | json email)"
id1=$(printf '%s' "${r%|*}" | json id); [ -n "$id1" ] && ids+=("$id1")

echo
echo "== 2. contact form submission"
r=$(post "$BASE_A" '{"source":"contact_form","contact_name":"Nomsa Mbeki","phone":"078 045 2852","courses":[{"course":"OHS Act","count":""}],"message":"Quote for 6 staff","landing_page":"/contact"}')
check "status 201" "201" "${r##*|}"
id2=$(printf '%s' "${r%|*}" | json id); [ -n "$id2" ] && ids+=("$id2")

echo
echo "== 3. honeypot submission (must store nothing, send nothing)"
r=$(post "$BASE_A" '{"source":"contact_form","contact_name":"Bot Bot","phone":"0820000000","website":"http://spam.example","courses":[{"course":"OHS Act","count":""}]}')
check "status 201" "201" "${r##*|}"
check "no id returned" "None" "$(printf '%s' "${r%|*}" | json id)"

echo
echo "== 4. validation still rejects bad input"
r=$(post "$BASE_A" '{"source":"contact_form","contact_name":"No Phone"}')
check "missing phone -> 400" "400" "${r##*|}"
r=$(post "$BASE_A" '{"source":"booking_modal","contact_name":"X","phone":"0821234567","email":"not-an-email","courses":[{"course":"OHS Act"}]}')
check "bad email -> 400" "400" "${r##*|}"

echo
echo "== 5. waiting for after() to run the sends"
for _ in $(seq 1 15); do
  n=$(wc -l < "$CAPTURE_FILE" 2>/dev/null | tr -d ' ' || echo 0)
  [ "${n:-0}" -ge 2 ] && break
  sleep 1
done

python3 - "$CAPTURE_FILE" <<'PY'
import json, os, sys
path = sys.argv[1]
rows = [json.loads(l) for l in open(path)] if os.path.exists(path) else []
print(f"  captured {len(rows)} email request(s)")
ok = True
def expect(label, cond, extra=""):
    global ok
    print(("  PASS  " if cond else "  FAIL  ") + label + ("" if cond else f" -- {extra}"))
    ok = ok and cond

expect("exactly 2 emails sent (honeypot and rejected sends excluded)", len(rows) == 2, f"got {len(rows)}")
if len(rows) == 2:
    bm, cf = rows[0]["body"], rows[1]["body"]

    expect("transport is POST /emails", rows[0]["path"] == "/emails", rows[0]["path"])
    expect("bearer key forwarded", rows[0]["auth"] == "Bearer re_mock_key_for_local_test", str(rows[0]["auth"]))
    expect("mail goes to the office", bm["to"] == ["office-test@example.com"], str(bm["to"]))
    expect("allegro cc'd", bm["cc"] == ["allegro-test@example.com"], str(bm.get("cc")))
    expect("from is the configured sender", "quotes@rstlcentre.co.za" in bm["from"], bm.get("from"))
    expect("reply-to is the enquirer", bm.get("reply_to") == "sipho@buildco.co.za", str(bm.get("reply_to")))
    expect("subject names company and courses",
           bm["subject"] == "[Quote request] Dlamini Build & Co <script>alert(1)</script> - Working at Heights - 12, First Aid Level 1 - 4",
           bm["subject"])
    expect("delegate counts in html", "Working at Heights - 12" in bm["html"])
    expect("timeline in html", "Within 30 days" in bm["html"])
    expect("landing page in html", "/courses/working-at-heights" in bm["html"])
    expect("markup escaped in html", "<script>" not in bm["html"] and "&lt;script&gt;" in bm["html"])
    expect("text alternative present", "New quote request from the website." in bm["text"])
    expect("reference id in the mail", "Lead reference:" in bm["text"])
    expect("sast timestamp used", "SAST" in bm["text"])

    expect("contact form has no reply-to", cf.get("reply_to") is None, str(cf.get("reply_to")))
    expect("contact form tells the office to phone", "phone them back" in cf["text"])
    expect("contact form mail carries the message", "Quote for 6 staff" in cf["html"])
sys.exit(0 if ok else 1)
PY
email_check=$?

echo
echo "== 6. a rejected send must not cost us the lead"
# mock-resend.py answers 422 for any subject containing [force-fail]
r=$(post "$BASE_A" '{"source":"booking_modal","contact_name":"Koos van Wyk","phone":"083 555 1234","email":"koos@example.co.za","company":"[force-fail] Test Co","courses":[{"course":"Basic Firefighting","count":"2"}],"training_location":"Midrand","timeline":"Urgent (within 7 days)"}')
check "rejected send still returns 201" "201" "${r##*|}"
id3=$(printf '%s' "${r%|*}" | json id)
check "lead still stored, id returned" "True" "$([ -n "$id3" ] && [ "$id3" != "None" ] && echo True || echo False)"
[ -n "$id3" ] && [ "$id3" != "None" ] && ids+=("$id3")
sleep 3
check "the rejected send was attempted (3rd capture)" "3" "$(wc -l < "$CAPTURE_FILE" 2>/dev/null | tr -d ' ')"
grep -i "rejected the send" "$WORK/next-a.log" | tail -1 | sed 's/^/  logged: /'

echo
echo "== 7. with no RESEND_API_KEY the fallback must survive"
r=$(post "$BASE_B" '{"source":"contact_form","contact_name":"No Key Test","phone":"082 000 1111","courses":[{"course":"OHS Act","count":""}]}')
check "status 201 (lead still stored)" "201" "${r##*|}"
check "reports not_configured" "not_configured" "$(printf '%s' "${r%|*}" | json email)"
idb=$(printf '%s' "${r%|*}" | json id); [ -n "$idb" ] && [ "$idb" != "None" ] && ids+=("$idb")
sleep 2
check "no email attempted without a key" "3" "$(wc -l < "$CAPTURE_FILE" 2>/dev/null | tr -d ' ')"

echo
echo "== 8. cleaning up the test leads from the real store"
printf '  %s\n' "${ids[@]}"
if [ -f .env.local ]; then set -a; . ./.env.local; set +a; fi
node scripts/cleanup-test-leads.mjs "${ids[@]}" 2>&1 | tail -8

echo
echo "== summary: $pass passed, $fail failed, email assertions exit=$email_check"
if [ "$fail" -eq 0 ] && [ "$email_check" -eq 0 ]; then echo "ALL GREEN"; else echo "FAILURES PRESENT"; exit 1; fi
