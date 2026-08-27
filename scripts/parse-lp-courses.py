#!/usr/bin/env python3
"""Parse scraped LP course pages (.firecrawl/lp/*.md) into structured JSON.

Output: lib/course-content/lp-full.json keyed by course title:
  us_id, us_name, nqf, duration, price, description, outline[],
  outcomes[], audience[], certification, entry_requirements[]

Usage: python3 scripts/parse-lp-courses.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LP_DIR = ROOT / ".firecrawl" / "lp"
OUT = ROOT / "lib" / "course-content" / "lp-full.json"

DETAIL_KEYS = {
    "unit standard id": "us_id",
    "unit standard name": "us_name",
    "nqf level": "nqf",
    "duration": "duration",
    "price": "price",
}

SECTION_ALIASES = {
    "course description": "description",
    "description": "description",
    "course outline": "outline",
    "course content / outline": "outline",
    "outline": "outline",
    "learning outcomes": "outcomes",
    "course outcomes": "outcomes",
    "target audience": "audience",
    "who should attend": "audience",
    "certification": "certification",
    "entry requirements": "entry_requirements",
    "entry requirement": "entry_requirements",
}

# Some pages lack a proper H1/H2 title — map by source filename.
TITLE_OVERRIDES = {
    "plumbingsafetycourse.md": "Plumbing Safety & Legal Compliance",
}


def clean(text: str) -> str:
    text = re.sub(r"\*+", "", text)  # strip bold/italic artifacts
    return re.sub(r"\s+", " ", text).strip()


def parse_md(path: Path) -> dict | None:
    raw = path.read_text(encoding="utf-8", errors="replace")
    # cut footer noise at the All Courses / accreditations block
    for marker in ["## **All Courses**", "# **Our Accreditations", "## **Connect with Us"]:
        idx = raw.find(marker)
        if idx != -1:
            raw = raw[:idx]
            break

    lines = raw.splitlines()

    # title: override, then first "## Title" (bold or plain) that isn't a known section header
    title = TITLE_OVERRIDES.get(path.name)
    if not title:
        for ln in lines:
            m = re.match(r"^#{1,3}\s*\*?\*?(.+?)\*?\*?\s*$", ln.strip())
            if m:
                t = clean(m.group(1))
                if t.lower() not in SECTION_ALIASES and t.lower() != "course details":
                    title = t
                    break
    if not title:
        return None

    out = {"_source": path.name, "title": title}
    detail_keys = {k.lower(): v for k, v in DETAIL_KEYS.items()}

    # 1) course details block: **Label:** Value pairs (value may or may not be bold)
    for ln in lines:
        m = re.match(r"^\*\*(.+?):\*\*\s*\*?\*?(.*?)\*?\*?\s*$", ln.strip())
        if m:
            label = clean(m.group(1)).lower()
            val = clean(m.group(2))
            if label in detail_keys and val and detail_keys[label] not in out:
                out[detail_keys[label]] = val
            continue
        # fallback: **Label: Value** (no ":** after label, e.g. "**Price: Novice ... – R3 900**")
        m = re.match(r"^\*\*(Price|Duration|NQF Level|Unit Standard ID|Unit Standard Name):\s*(.+?)\*\*\s*$", ln.strip())
        if m:
            label = clean(m.group(1)).lower()
            val = clean(m.group(2))
            if label in detail_keys and val and detail_keys[label] not in out:
                out[detail_keys[label]] = val

    # 2) sections: header may be H2-H6, bold or plain; bullets may be "- " or plain lines
    section = None
    for ln in lines:
        s = ln.strip()
        if not s:
            continue
        h = re.match(r"^#{1,6}\s*\*?\*?(.+?)\*?\*?\s*$", s)
        if h:
            label = clean(h.group(1)).lower().rstrip(":")
            if label in SECTION_ALIASES:
                section = SECTION_ALIASES[label]
                continue
            # unknown header ends the current section
            if section:
                section = None
            continue
        if section is None:
            continue
        # skip detail lines / links / images inside sections
        if s.startswith("**") or s.startswith("!["):
            continue
        if s.startswith(("-", "*", "•")):
            item = clean(s.lstrip("-*• ").strip())
        else:
            item = clean(s)
        if not item:
            continue
        if section in ("outline", "outcomes", "audience", "entry_requirements"):
            if len(item) > 3 and not item.startswith("By the end"):
                out.setdefault(section, []).append(item)
        elif section in ("description", "certification"):
            if len(item) > 15 and not item.startswith("By the end") and item != "Accredited Certificates":
                out[section] = item

    return out if ("description" in out or "outline" in out or "certification" in out) else None


def main() -> int:
    if not LP_DIR.exists():
        print("no .firecrawl/lp dir", file=sys.stderr)
        return 1
    results = {}
    skipped = []
    for path in sorted(LP_DIR.glob("*.md")):
        try:
            parsed = parse_md(path)
        except Exception as e:  # noqa: BLE001
            skipped.append((path.name, f"error: {e}"))
            continue
        if parsed is None:
            skipped.append((path.name, "no title/content"))
            continue
        key = parsed.pop("title")
        results[key] = parsed

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(results, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"parsed {len(results)} pages -> {OUT}")
    if skipped:
        print("SKIPPED:")
        for name, why in skipped:
            print(f"  {name}: {why}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
