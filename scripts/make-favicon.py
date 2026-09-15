#!/usr/bin/env python3
"""Generate the RSTL Centre favicon / app-icon set from the client's real mark.

Why this exists: the site shipped the create-next-app default `app/favicon.ico` (the
black-circle Vercel triangle) and inherited the legacy REH lockup in the app icons. The
first fix was an interim typographic tile (charcoal, cream serif "R", red base band) built
because the client's art had not arrived. It has now arrived, so this cuts the tile from
the real monogram instead.

Source: `public/images/rstl-mark.png` — the R with its red swoosh, produced by
`scripts/make-logo-assets.py` from `brand/RSTL-Centre-logo.png`. Run that script first.

Tile treatment: **white**, because the client's artwork is dark ink (navy #05181f + red)
presented on white. A light tile keeps the mark exactly as the client drew it and reads on
both light and dark browser chrome. The mark fills ~82% of the tile so the 16px frame
still carries some red.

Run from the repo root:  python3 scripts/make-favicon.py
                         python3 scripts/make-favicon.py --check
"""
from __future__ import annotations

import argparse
import os

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_DIR = os.path.join(ROOT, "app")
MARK = os.path.join(ROOT, "public", "images", "rstl-mark.png")

TILE = 512
RADIUS = 116          # ~23% -> the iOS/Android squircle feel
FILL = (255, 255, 255)
MARK_RATIO = 0.82     # share of the tile height the mark occupies
APPLE = 180


def build_mark(height: int) -> Image.Image:
    with Image.open(MARK) as raw:
        mark = raw.convert("RGBA")
    width = max(1, round(mark.size[0] * height / mark.size[1]))
    return mark.resize((width, height), Image.Resampling.LANCZOS)


def build_tile() -> Image.Image:
    """Transparent canvas + white squircle + the client's mark centred."""
    img = Image.new("RGBA", (TILE, TILE), (0, 0, 0, 0))

    squircle = Image.new("L", (TILE, TILE), 0)
    ImageDraw.Draw(squircle).rounded_rectangle([0, 0, TILE - 1, TILE - 1], radius=RADIUS, fill=255)
    img.paste(Image.new("RGBA", (TILE, TILE), FILL + (255,)), (0, 0), squircle)

    mark = build_mark(round(TILE * MARK_RATIO))
    img.paste(mark, ((TILE - mark.size[0]) // 2, (TILE - mark.size[1]) // 2), mark)
    img.putalpha(squircle)
    return img


def build_apple() -> Image.Image:
    """180x180, opaque, full-bleed square: iOS masks its own corners and drops alpha.

    So draw a SQUARE version (no rounded corners, fill edge-to-edge) rather than
    flattening the squircle -- flattening leaves wedges of transparent canvas in the
    corners.
    """
    img = Image.new("RGB", (TILE, TILE), FILL)
    mark = build_mark(round(TILE * MARK_RATIO))
    img.paste(mark, ((TILE - mark.size[0]) // 2, (TILE - mark.size[1]) // 2), mark)
    return img.resize((APPLE, APPLE), Image.Resampling.LANCZOS)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="report current files, write nothing")
    args = ap.parse_args()

    targets = (
        os.path.join(APP_DIR, "favicon.ico"),
        os.path.join(APP_DIR, "icon.png"),
        os.path.join(APP_DIR, "apple-icon.png"),
    )

    if args.check:
        print(f"source: {MARK} ({'found' if os.path.exists(MARK) else 'MISSING'})")
        for p in targets:
            if os.path.exists(p):
                with Image.open(p) as im:
                    print(f"  {os.path.basename(p)}: {im.size} {im.mode} {os.path.getsize(p)} bytes")
            else:
                print(f"  {os.path.basename(p)}: MISSING")
        return

    if not os.path.exists(MARK):
        raise SystemExit(f"mark not found: {MARK} -- run scripts/make-logo-assets.py first")

    tile = build_tile()

    # Next.js file conventions: app/icon.png + app/apple-icon.png are served as
    # content-hashed /icon?<hash> and /apple-icon?<hash> links, so a replaced icon
    # busts every browser + crawler cache. A hand-rolled /app/icon.png URL does not.
    icon_png = os.path.join(APP_DIR, "icon.png")
    tile.save(icon_png, "PNG", optimize=True)

    apple_png = os.path.join(APP_DIR, "apple-icon.png")
    build_apple().save(apple_png, "PNG", optimize=True)

    # multi-frame .ico straight from the tile (PIL downsamples with LANCZOS)
    ico = os.path.join(APP_DIR, "favicon.ico")
    tile.save(ico, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

    for p in (icon_png, apple_png, ico):
        with Image.open(p) as im:
            frames = sorted(im.info.get("sizes", [])) if p.endswith(".ico") else []
            extra = f" frames={[s[0] for s in frames]}" if frames else ""
            print(f"wrote {p}  {im.size} {im.mode} {os.path.getsize(p)} bytes{extra}")


if __name__ == "__main__":
    main()
