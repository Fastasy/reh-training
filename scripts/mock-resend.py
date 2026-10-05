#!/usr/bin/env python3
"""Stand-in for Resend's /emails endpoint, so the lead-notification path can be tested
end to end without a live key and without emailing the client.

Accepts POST /emails, records the JSON body to captured.jsonl, and replies the way Resend
does. Anything whose subject contains [force-fail] is answered 422 so the failure branch
is exercised too.
"""
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

OUT = os.environ.get("CAPTURE_FILE", "/tmp/rstl-email-test/captured.jsonl")
PORT = int(os.environ.get("MOCK_PORT", "8787"))
counter = {"n": 0}


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):  # noqa: N802
        length = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(length)
        try:
            body = json.loads(raw)
        except Exception:
            body = {"_unparseable": raw.decode("utf-8", "replace")}

        record = {
            "path": self.path,
            "auth": self.headers.get("Authorization"),
            "body": body,
        }
        counter["n"] += 1
        with open(OUT, "a") as fh:
            fh.write(json.dumps(record) + "\n")

        subject = str(body.get("subject", ""))
        if "[force-fail]" in subject:
            payload = json.dumps({"message": "mock rejection"}).encode()
            self.send_response(422)
        else:
            payload = json.dumps({"id": f"mock-{counter['n']}"}).encode()
            self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *args):  # keep stdout clean
        pass


if __name__ == "__main__":
    HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
