#!/usr/bin/env python3
"""One-off rebrand: REH Safety Training -> RSTL Centre, rehtraining.co.za -> rstlcentre.co.za.

Client decision (2026-09-10, Ruan):
  * brand string            "RSTL Centre"
  * every REH mention       -> RSTL (incl. "REH Medicals" -> "RSTL Medicals")
  * domain                  rstlcentre.co.za becomes primary (www.)
  * images                  left as-is until the client sends the new logo
  * email + social handles  LEFT UNTOUCHED (see KEEP below)

Usage:
  python3 scripts/rebrand-rstl.py --check         # report, change nothing
  python3 scripts/rebrand-rstl.py --apply         # perform the rename
  python3 scripts/rebrand-rstl.py --revert        # undo the rename
  python3 scripts/rebrand-rstl.py --email-flip    # info@rehtraining.co.za -> info@rstlcentre.co.za
                                                  # ONLY once the new mailbox + MX are live.
                                                  # (--apply leaves the mailbox alone on purpose.)

Case-sensitivity matters: "warehouse" contains "reh", so the REH pass is
case-sensitive and word-bounded. Lower-case identifiers ("reh:quote" GTM custom
events, the "reh-reviews" blob store) are deliberately NOT renamed -- they are
live interface contracts with the client's GTM/Ads container and Vercel storage.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {"node_modules", ".next", ".git", ".vercel", ".firecrawl", "shots"}
SKIP_FILES = {"package-lock.json", "tsconfig.tsbuildinfo", "rebrand-rstl.py"}
EXTS = {".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt", ".css", ".mjs", ".html", ".svg", ".xml"}
TARGETS = ["app", "components", "lib", "public", "next.config.ts"]

# Forward replacements, applied in this order. ("pattern", "replacement", is_regex)
RULES = [
    ("REH Safety Training", "RSTL Centre", False),
    ("REH Medicals", "RSTL Medicals", False),
    (r"\bREH_EMAIL\b", "RSTL_EMAIL", True),
    (r"\bREH\b", "RSTL", True),
    ("rehtraining.co.za", "rstlcentre.co.za", False),
]

# Strings that must survive the rename untouched, in both directions.
KEEP = [
    "info@rehtraining.co.za",                      # mailbox still on the old domain (MX not moved)
    "https://www.facebook.com/rehtraining",        # client-owned page, renamed by them
    "https://www.tiktok.com/@rehsafetytraining",   # client-owned page, renamed by them
    "lp.rehtraining.co.za",                        # provenance: old site the content was scraped from
]

# Special-cased provenance comments (mechanical pass would falsify these).
COMMENT_FIXES = [
    ("/* RSTL palette — scraped from rstlcentre.co.za + logo (2026-08) */",
     "/* RSTL palette — scraped from rehtraining.co.za (legacy brand) + logo (2026-08) */"),
    ("// (lp.rstlcentre.co.za). Keyed by catalogue course name; wins over the scrapes.",
     "// (lp.rehtraining.co.za, legacy). Keyed by catalogue course name; wins over the scrapes."),
    ("// Zoho site (www.rstlcentre.co.za) and holds their Google Ads conversion tags",
     "// Zoho site (legacy www.rehtraining.co.za) and holds their Google Ads conversion tags"),
]

# The fixed comments must also survive re-runs, or --check would keep re-reporting them.
KEEP.extend(fixed for _, fixed in COMMENT_FIXES)

# Provenance line kept verbatim (the scrape source really was the old domain).
KEEP.append("// Sources: client price list PDF (2026-08) + the legacy rehtraining.co.za/courses scrape.")

# Files that must NEVER be run through the mechanical pass again: next.config.ts now
# holds the legacy hostnames ON PURPOSE (the 301 rule), and rewriting them would
# silently break the redirect.
SKIP_TRANSFORM = {"next.config.ts"}


def targets():
    for t in TARGETS:
        p = os.path.join(ROOT, t)
        if os.path.isfile(p):
            yield p
        else:
            for dp, dn, fs in os.walk(p):
                dn[:] = [d for d in dn if d not in SKIP_DIRS]
                for f in fs:
                    if f in SKIP_FILES or os.path.splitext(f)[1].lower() not in EXTS:
                        continue
                    yield os.path.join(dp, f)


def transform(text, reverse):
    keep = {}
    for i, s in enumerate(KEEP):
        tok = f"\x00K{i}\x00"
        if s in text:
            text = text.replace(s, tok)
            keep[tok] = s
    rules = [(b, a, is_re) if reverse else (a, b, is_re) for a, b, is_re in RULES]
    for pat, rep, is_re in rules:
        text = re.sub(pat, lambda m: rep, text) if is_re else text.replace(pat, rep)
    for tok, s in keep.items():
        text = text.replace(tok, s)
    return text


def leftover_lines(text):
    keep = {}
    for i, s in enumerate(KEEP):
        keep[f"\x00K{i}\x00"] = s
    for tok, s in keep.items():
        text = text.replace(s, "")
    text = text.replace("RSTL", "")
    out = []
    for i, line in enumerate(text.split("\n"), 1):
        if re.search(r"REH\b|\bREH|rehtraining", line):
            out.append((i, line.strip()[:150]))
    return out


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "--check"
    if mode not in ("--check", "--apply", "--revert", "--email-flip"):
        print(__doc__)
        return 2

    if mode == "--email-flip":
        old, new = "info@rehtraining.co.za", "info@rstlcentre.co.za"
        hits = 0
        for p in sorted(targets()):
            try:
                text = open(p, encoding="utf-8").read()
            except (UnicodeDecodeError, OSError):
                continue
            if old not in text:
                continue
            open(p, "w", encoding="utf-8").write(text.replace(old, new))
            n = text.count(old)
            hits += n
            print(f"updated: {os.path.relpath(p, ROOT)} ({n})")
        print(f"\n--email-flip: {hits} mailbox references moved to {new}")
        print("Confirm the mailbox exists and MX is live before deploying this.")
        return 0

    reverse = mode == "--revert"
    changed = total = 0
    for p in sorted(targets()):
        if os.path.basename(p) in SKIP_TRANSFORM:
            continue
        try:
            orig = open(p, encoding="utf-8").read()
        except (UnicodeDecodeError, OSError):
            continue
        new = transform(orig, reverse)
        for a, b in COMMENT_FIXES:
            new = new.replace(b if reverse else a, a if reverse else b)
        if new != orig:
            if mode != "--check":
                open(p, "w", encoding="utf-8").write(new)
            changed += 1
            n = sum(1 for l in new.split("\n") if re.search(r"RSTL", l)) - sum(
                1 for l in orig.split("\n") if re.search(r"RSTL", l)
            )
            total += max(n, 1)
            print(f"{'would update' if mode == '--check' else 'updated'}: {os.path.relpath(p, ROOT)} (+{n} RSTL)")
    print(f"\n{mode}: {changed} files, ~{total} replacements")
    print("\nRemaining REH / rehtraining references (expected: social handles, info@ mailbox, provenance comments):")
    for p in sorted(targets()):
        try:
            hits = leftover_lines(open(p, encoding="utf-8").read())
        except (UnicodeDecodeError, OSError):
            continue
        for i, line in hits:
            print(f"  {os.path.relpath(p, ROOT)}:{i}: {line}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
