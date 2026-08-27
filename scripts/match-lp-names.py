#!/usr/bin/env python3
"""Match parsed LP page titles to canonical REH course names.

Reads lib/course-content/lp-full.json + lib/courses.ts, writes
lib/course-content/lp-name-map.json {lpTitle: canonicalName}
for exact/normalized matches and prints fuzzy candidates for manual review.
"""
import difflib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LP_FULL = ROOT / "lib" / "course-content" / "lp-full.json"
COURSES_TS = ROOT / "lib" / "courses.ts"
OUT = ROOT / "lib" / "course-content" / "lp-name-map.json"


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def main() -> None:
    lp_full = json.loads(LP_FULL.read_text(encoding="utf-8"))
    ts = COURSES_TS.read_text(encoding="utf-8")
    names = re.findall(r'name:\s*"([^"]+)"', ts)
    # dedupe preserving order
    seen = set()
    canon = []
    for n in names:
        if n not in seen:
            seen.add(n)
            canon.append(n)

    canon_norm = {norm(n): n for n in canon}

    exact = {}
    fuzzy = []
    for title in lp_full:
        key = norm(title)
        if key in canon_norm:
            exact[title] = canon_norm[key]
        else:
            # candidate fuzzy matches
            cands = difflib.get_close_matches(title, canon, n=3, cutoff=0.6)
            fuzzy.append((title, cands))

    OUT.write_text(json.dumps(exact, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"exact/normalized matches: {len(exact)}/{len(lp_full)}")
    print(f"unmatched: {len(fuzzy)}")
    for title, cands in fuzzy:
        print(f"  ? {title!r} -> {cands}")


if __name__ == "__main__":
    main()
