#!/usr/bin/env python3
"""Cut the site's RSTL Centre logo assets out of the client's supplied artwork.

Source art: `brand/RSTL-Centre-logo.png` — the client's original file, kept verbatim
(1254x1254, RGB, flat white background, ~1002x561 of ink). Everything the site serves is
derived from it by this script, so the artwork can be re-cut after a fresh clone without
hunting for the email it arrived in. Override with `--source` if the client sends a
revised file.

Two assets come out of one file:

* `public/images/rstl-logo.png` — the full RSTL/CENTRE lockup, background removed,
  trimmed to its ink. Used wherever the complete logo belongs (footer, OG card).
* `public/images/rstl-mark.png` — the monogram: the R with its red swoosh, cut just
  before the S. Used where the stack is illegible (navbar tile, favicon, app icons).
  Navbars show the mark plus the HTML wordmark; a stacked lockup at 40px turns the
  CENTRE line into a smudge.

Background removal: the art is flat dark ink on flat white, so alpha comes from
`255 - min(r,g,b)` and the colour channels are de-premultiplied back out of it. A plain
luminance mask would leave the red swoosh half-transparent (its luminance sits mid-range
while its blue channel is near zero), and a bare threshold would leave a white fringe on
every antialiased edge.

Run from the repo root:  python3 scripts/make-logo-assets.py
                         python3 scripts/make-logo-assets.py --check
"""
from __future__ import annotations

import argparse
import os

from typing import Any

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_SOURCE = os.path.join(ROOT, "brand", "RSTL-Centre-logo.png")
IMAGES = os.path.join(ROOT, "public", "images")

# The R's right edge. The S begins at x=477 in the source; the red swoosh's tip reaches
# x=476, so cutting at 477 exclusive keeps the whole swoosh and none of the S.
MARK_RIGHT = 477

# The lockup is three stacked bands: "RSTL" (y 325-725), the rule (741-751) and "CENTRE"
# (774-885). The mark is the first band only, so cut above the rule rather than letting
# the CENTRE line's left letters ("CEN") ride along underneath.
MARK_GAP = 6

# Even breathing room around the trimmed ink, as a fraction of the ink height. Trimmed
# flush, the artwork looks cramped inside its white plate and in the OG composition.
PAD_RATIO = 0.035


def keyed_out(src: Image.Image) -> Image.Image:
    """Flat white -> transparent, preserving antialiased edges and the red swoosh."""
    im = src.convert("RGB")
    # Pillow's stubs type load() as a None-able union for every mode; it is a PixelAccess.
    px: Any = im.load()
    w, h = im.size
    out = Image.new("RGBA", (w, h))
    op: Any = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            a = 255 - min(r, g, b)
            if a <= 6:  # background / sensor noise
                op[x, y] = (0, 0, 0, 0)
                continue
            f = 255.0 / a
            op[x, y] = (
                max(0, min(255, int(255 - (255 - r) * f + 0.5))),
                max(0, min(255, int(255 - (255 - g) * f + 0.5))),
                max(0, min(255, int(255 - (255 - b) * f + 0.5))),
                a,
            )
    return out


def trim(img: Image.Image) -> Image.Image:
    """Alpha bbox, plus even padding so the ink does not touch its own edge."""
    box = img.getchannel("A").getbbox()
    if box is None:
        raise SystemExit("source art is empty after background removal")
    cut = img.crop(box)
    pad = max(2, int(cut.size[1] * PAD_RATIO))
    canvas = Image.new("RGBA", (cut.size[0] + pad * 2, cut.size[1] + pad * 2), (0, 0, 0, 0))
    canvas.paste(cut, (pad, pad))
    return canvas


def first_band_bottom(img: Image.Image) -> int:
    """Lowest row of the first contiguous band of ink (the RSTL row, above the rule).

    Measured off the alpha channel rather than hardcoded, so a re-cut from revised client
    art with slightly different proportions still isolates the wordmark row.
    """
    alpha = img.getchannel("A")
    w, h = alpha.size
    px: Any = alpha.load()
    started = False
    for y in range(h):
        row_has_ink = any(px[x, y] > 8 for x in range(0, w, 2))
        if row_has_ink:
            started = True
        elif started:
            return y - 1
    return h - 1


def build(source: str) -> dict[str, Image.Image]:
    with Image.open(source) as raw:
        keyed = keyed_out(raw)
    full = trim(keyed)
    # Cut the mark out of the keyed artwork before trimming, so both assets share the
    # same background removal and the same padding rule.
    mark_bottom = min(keyed.size[1], first_band_bottom(keyed) + MARK_GAP)
    mark = trim(keyed.crop((0, 0, MARK_RIGHT, mark_bottom)))
    return {"rstl-logo.png": full, "rstl-mark.png": mark}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="report current files, write nothing")
    ap.add_argument("--source", default=DEFAULT_SOURCE, help="client artwork to cut from")
    args = ap.parse_args()

    if args.check:
        print(f"source: {args.source} ({'found' if os.path.exists(args.source) else 'MISSING'})")
        for name in ("rstl-logo.png", "rstl-mark.png"):
            p = os.path.join(IMAGES, name)
            if os.path.exists(p):
                with Image.open(p) as im:
                    box = im.getchannel("A").getbbox()
                    print(f"  {name}: {im.size} {im.mode} {os.path.getsize(p)} bytes ink={box}")
            else:
                print(f"  {name}: MISSING")
        return

    if not os.path.exists(args.source):
        raise SystemExit(f"source artwork not found: {args.source}")

    for name, img in build(args.source).items():
        out = os.path.join(IMAGES, name)
        img.save(out, "PNG", optimize=True)
        print(f"wrote {out}  {img.size} {img.mode} {os.path.getsize(out)} bytes")


if __name__ == "__main__":
    main()
