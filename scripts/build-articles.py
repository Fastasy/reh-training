#!/usr/bin/env python3
"""
Build lib/articles.ts from the reviewed markdown drafts in the Obsidian vault.

The drafts are the editorial source of truth (written and verified in the vault), and
this script is the only thing that turns them into site data. It exists so a published
article can never drift from the version that was fact-checked, and so re-publishing a
draft is one command rather than hand-editing TypeScript.

Usage:
    python3 scripts/build-articles.py            # rebuild from the PUBLISHED list below
    python3 scripts/build-articles.py --check     # exit 1 if lib/articles.ts is stale

To publish an article: add its draft filename to PUBLISHED and set its date, then re-run.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

VAULT_DRAFTS = Path(
    "/mnt/c/Users/Administrator/Documents/Hermes Obsidian/REH Training/Articles/Drafts"
)
OUT = Path(__file__).resolve().parent.parent / "lib" / "articles.ts"

# --- what is live -------------------------------------------------------------------
# Order here is the order shown on /articles. The hub goes first so every later article
# has something to link back to. Dates are the publication date, not the build date.
PUBLISHED: list[tuple[str, str]] = [
    ("2026-09-rstl-01-safety-training-mthatha.md", "2026-09-10"),
    ("2026-09-rstl-02-she-rep-training-mthatha.md", "2026-09-10"),
    ("2026-09-rstl-10-she-rep-duties-appointment-letter.md", "2026-09-10"),
    ("2026-09-rstl-09-forklift-licence-south-africa-cost.md", "2026-09-10"),
]

FAQ_HEADINGS = {"frequently asked questions", "faqs"}
CLOSING_PREFIXES = ("book", "get ", "talk to", "next step", "ready to")

# The root layout title template appends this to every page title.
TITLE_SUFFIX = " | RSTL Centre"
TITLE_LIMIT = 62


def normalise_meta_title(meta_title: str, name: str) -> str:
    """Guarantee the rendered <title> has one brand and fits Google's window.

    Two ways a draft gets this wrong: carrying its own "| RSTL" suffix, which the layout
    template then doubles up, and running long enough that Google truncates it mid-word.
    Cheaper to normalise here than to trust every writer to remember.
    """
    cleaned = re.sub(r"\s*\|\s*(RSTL|REH)[^|]*$", "", meta_title).strip()
    if cleaned != meta_title:
        print(f"  note: {name} metaTitle carried its own brand, stripped")
    rendered = len(cleaned) + len(TITLE_SUFFIX)
    if rendered > TITLE_LIMIT:
        print(f"  WARN: {name} renders a {rendered} char title (> {TITLE_LIMIT}): {cleaned!r}")
    return cleaned


def parse_frontmatter(block: str) -> dict:
    out: dict = {}
    for line in block.split("\n"):
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key, val = key.strip(), val.strip()
        if val.startswith("[") and val.endswith("]"):
            out[key] = [v.strip().strip('"').strip("'") for v in val[1:-1].split(",") if v.strip()]
        elif re.fullmatch(r"\d+", val):
            out[key] = int(val)
        else:
            out[key] = val.strip('"').strip("'")
    return out


def parse_table(rows: list[str]) -> dict:
    cells = lambda r: [c.strip() for c in r.strip().strip("|").split("|")]
    head = cells(rows[0])
    body = [cells(r) for r in rows[2:] if not re.fullmatch(r"\|[\s:|-]+\|", r.strip())]
    return {"head": head, "rows": body}


def split_blocks(lines: list[str]) -> list[tuple[str, object]]:
    """Turn raw markdown lines into (kind, payload) blocks: para, bullet, table, sub."""
    blocks: list[tuple[str, object]] = []
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line.strip():
            i += 1
            continue
        if line.startswith("| "):
            tbl = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                tbl.append(lines[i].rstrip())
                i += 1
            blocks.append(("table", parse_table(tbl)))
            continue
        if line.startswith("- "):
            items = []
            while i < len(lines) and lines[i].strip().startswith("- "):
                items.append(lines[i].strip()[2:].strip())
                i += 1
            blocks.append(("bullets", items))
            continue
        if line.startswith("#### ") or line.startswith("### "):
            text = line.lstrip("#").strip()
            i += 1
            sub = []
            while i < len(lines) and lines[i].strip() and not lines[i].startswith(("#", "- ", "| ")):
                sub.append(lines[i].strip())
                i += 1
            blocks.append(("sub", {"heading": text, "paragraphs": sub}))
            continue
        # A standalone bold line is a FAQ question. The drafts put the answer on the
        # very next line with no blank line between, so this must be its own block or
        # the paragraph joiner below swallows it and every FAQ is lost.
        if re.fullmatch(r"\*\*[^*].*\*\*", line):
            blocks.append(("qmark", line.strip("*").strip()))
            i += 1
            continue
        # plain paragraph
        para = [line.strip()]
        i += 1
        while (
            i < len(lines)
            and lines[i].strip()
            and not lines[i].startswith(("#", "- ", "| "))
            and not re.fullmatch(r"\*\*[^*].*\*\*", lines[i].strip())
        ):
            para.append(lines[i].strip())
            i += 1
        blocks.append(("para", " ".join(para)))
    return blocks


def parse_article(path: Path, date: str) -> dict:
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", raw, re.S)
    if not m:
        raise SystemExit(f"{path.name}: no frontmatter")
    fm = parse_frontmatter(m.group(1))
    body = raw[m.end():].strip()

    # drop the H1 (title is already in frontmatter and the page renders it)
    body = re.sub(r"^#\s+.*?\n", "", body, count=1).strip()

    # split into H2 sections
    chunks = re.split(r"\n##\s+", "\n" + body)
    intro_raw, *section_raw = [c for c in chunks if c.strip()]

    def blocks_of(text: str):
        return split_blocks(text.split("\n"))

    intro = [b[1] for b in blocks_of(intro_raw) if b[0] == "para"]

    sections: list[dict] = []
    faqs: list[dict] = []
    closing_heading, closing = "", []

    for idx, chunk in enumerate(section_raw):
        lines = chunk.split("\n")
        heading = lines[0].strip()
        rest = "\n".join(lines[1:])
        low = heading.lower()

        if low in FAQ_HEADINGS:
            q, buf = None, []
            for kind, payload in blocks_of(rest) + [("end", None)]:
                if kind == "qmark":
                    if q:
                        faqs.append({"q": q, "a": " ".join(buf).strip()})
                    q, buf = payload, []
                elif kind == "para":
                    buf.append(payload)
                elif kind == "bullets":
                    buf.append(" ".join(payload))
                elif kind == "end" and q:
                    faqs.append({"q": q, "a": " ".join(buf).strip()})
                    q = None
            continue

        is_last = idx == len(section_raw) - 1
        if is_last and low.startswith(CLOSING_PREFIXES):
            closing_heading = heading
            closing = [b[1] for b in blocks_of(rest) if b[0] == "para"]
            continue

        sec: dict = {"heading": heading, "paragraphs": []}
        for kind, payload in blocks_of(rest):
            if kind == "para":
                sec["paragraphs"].append(payload)
            elif kind == "bullets":
                sec["list"] = payload
            elif kind == "table":
                sec["table"] = payload
            elif kind == "sub":
                sec["paragraphs"].append(f"**{payload['heading']}**")
                sec["paragraphs"].extend(payload["paragraphs"])
        sections.append(sec)

    # courses referenced in the copy, surfaced as a related-links block
    course_links, seen = [], set()
    for label, href in re.findall(r"\[([^\]]+)\]\((/courses/[^)\s]+)\)", body):
        if href not in seen:
            seen.add(href)
            course_links.append({"href": href, "label": label})

    return {
        "slug": fm["slug"],
        "title": fm["title"],
        "metaTitle": normalise_meta_title(str(fm["metaTitle"]), path.name),
        "metaDescription": fm["metaDescription"],
        "primaryKeyword": fm["primaryKeyword"],
        "secondaryKeywords": fm.get("secondaryKeywords", []),
        "category": fm["category"],
        "date": date,
        "readMinutes": fm.get("readMinutes", 6),
        "excerpt": fm["excerpt"],
        "intro": intro,
        "sections": sections,
        "faqs": faqs,
        "closingHeading": closing_heading,
        "closing": closing,
        "courseLinks": course_links,
    }


def j(obj) -> str:
    """JSON is a subset of TS: valid string literals, no escaping guesswork."""
    return json.dumps(obj, ensure_ascii=False)


def render(articles: list[dict]) -> str:
    parts: list[str] = []
    parts.append('''/**
 * Article content store for RSTL Centre.
 *
 * GENERATED FILE - do not edit by hand. Regenerate with:
 *     python3 scripts/build-articles.py
 *
 * Source of truth is the reviewed markdown in the vault at
 * "REH Training/Articles/Drafts". Articles are only listed here once they have been
 * fact-checked against the regulatory notes and published to the site.
 *
 * Inline text uses two markdown-ish conventions, rendered by <InlineText>:
 *   [anchor text](/courses/some-course)  -> internal <Link>
 *   **emphasis**                          -> <strong>
 */

export type ArticleFaq = { q: string; a: string };

export type ArticleTable = { head: string[]; rows: string[][] };

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  table?: ArticleTable;
};

export type Article = {
  slug: string;
  title: string;
  /** Without the brand: the root layout title template appends " | RSTL Centre". */
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  /** Publication date, ISO. */
  date: string;
  readMinutes: number;
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  closingHeading: string;
  closing: string[];
  /** Courses mentioned in the copy, for the related-links block. */
  courseLinks: { href: string; label: string }[];
};
''')

    parts.append("\nexport const ALL_ARTICLES: Article[] = [\n")
    for a in articles:
        parts.append("  {\n")
        for key in (
            "slug", "title", "metaTitle", "metaDescription", "primaryKeyword",
            "secondaryKeywords", "category", "date", "readMinutes", "excerpt",
        ):
            parts.append(f"    {key}: {j(a[key])},\n")
        for key in ("intro", "closing"):
            parts.append(f"    {key}: [\n")
            for p in a[key]:
                parts.append(f"      {j(p)},\n")
            parts.append("    ],\n")
        parts.append("    sections: [\n")
        for s in a["sections"]:
            parts.append("      {\n")
            parts.append(f"        heading: {j(s['heading'])},\n")
            parts.append("        paragraphs: [\n")
            for p in s["paragraphs"]:
                parts.append(f"          {j(p)},\n")
            parts.append("        ],\n")
            if "list" in s:
                parts.append("        list: [\n")
                for li in s["list"]:
                    parts.append(f"          {j(li)},\n")
                parts.append("        ],\n")
            if "table" in s:
                parts.append(f"        table: {j(s['table'])},\n")
            parts.append("      },\n")
        parts.append("    ],\n")
        parts.append("    faqs: [\n")
        for f in a["faqs"]:
            parts.append(f"      {{ q: {j(f['q'])}, a: {j(f['a'])} }},\n")
        parts.append("    ],\n")
        parts.append(f"    closingHeading: {j(a['closingHeading'])},\n")
        parts.append("    courseLinks: [\n")
        for c in a["courseLinks"]:
            parts.append(f"      {{ href: {j(c['href'])}, label: {j(c['label'])} }},\n")
        parts.append("    ],\n")
        parts.append("  },\n")
    parts.append("];\n")

    parts.append('''
/** Newest first is the publishing order we want on the index, so keep array order. */
export const PUBLISHED_ARTICLES: Article[] = ALL_ARTICLES;

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ALL_ARTICLES.map((a) => [a.slug, a])
);

export function articleUrl(article: Article | string): string {
  const slug = typeof article === "string" ? article : article.slug;
  return `/articles/${slug}`;
}

/** Other articles to cross-link, excluding the current one. */
export function otherArticles(slug: string, limit = 3): Article[] {
  return ALL_ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
}
''')
    return "".join(parts)


def main() -> int:
    articles = [parse_article(VAULT_DRAFTS / name, date) for name, date in PUBLISHED]
    out = render(articles)
    if "--check" in sys.argv:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current != out:
            print("lib/articles.ts is STALE - re-run scripts/build-articles.py")
            return 1
        print("lib/articles.ts is up to date")
        return 0
    OUT.write_text(out, encoding="utf-8")
    print(f"wrote {OUT.relative_to(Path.cwd())} with {len(articles)} articles")
    for a in articles:
        print(f"  {a['slug']:<58} {len(a['sections'])} sections, {len(a['faqs'])} faqs, "
              f"{len(a['courseLinks'])} course links, closing={bool(a['closing'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
