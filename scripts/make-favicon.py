#!/usr/bin/env python3
"""Generate the RSTL Centre favicon / app-icon set.

Why this exists: the site shipped the create-next-app default `app/favicon.ico`
(the black-circle Vercel triangle) and inherited the legacy REH lockup in
`public/app/icon.png` + `apple-icon.png`. Both are wrong for the RSTL brand, and the
lockup is illegible at 16px anyway.

Interim mark (until the client's real logo art lands) matches the language already
used on `public/images/og-default.png`: charcoal #252423 tile, cream #f5f0ec serif
"R", red #e21c14 base band. It also sits on the charcoal `themeColor`, so the
Android chrome bar and the tile agree.

Swap to real client art later by replacing `--source` handling with the client's mark:
crop the mark to its alpha bbox, scale to ~70% of the tile, centre it, and keep the
tile fill.

Run from the repo root:  python3 scripts/make-favicon.py
"""
from __future__ import annotations

import argparse
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_DIR = os.path.join(ROOT, "app")

TILE = 512
RADIUS = 116          # ~22% -> the iOS/Android squircle feel
BAND_H = 74           # red base band; survives downscale to 16px (~2.3px)
GLYPH = "R"

CHARCOAL = (37, 36, 35)     # --color-charcoal
CREAM = (245, 240, 236)     # --color-cream
BRAND = (226, 28, 20)       # --color-brand

SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"


def _ink(d: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> tuple[int, int, int, int]:
    """textbbox() is typed as returning a float-or-box union; pin it to an int box."""
    l, t, r, b = (int(v) for v in d.textbbox((0, 0), text, font=font))  # type: ignore[misc]
    return l, t, r, b


def build_tile() -> Image.Image:
    """Transparent canvas + charcoal squircle, red base band, cream serif R."""
    img = Image.new("RGBA", (TILE, TILE), (0, 0, 0, 0))

    # charcoal squircle
    squircle = Image.new("L", (TILE, TILE), 0)
    ImageDraw.Draw(squircle).rounded_rectangle([0, 0, TILE - 1, TILE - 1], radius=RADIUS, fill=255)
    img.paste(Image.new("RGBA", (TILE, TILE), CHARCOAL + (255,)), (0, 0), squircle)

    # red base band, clipped by the squircle so the bottom corners stay rounded
    band = Image.new("RGBA", (TILE, TILE), (0, 0, 0, 0))
    ImageDraw.Draw(band).rectangle([0, TILE - BAND_H, TILE, TILE], fill=BRAND + (255,))
    img.paste(band, (0, 0), squircle)
    img.putalpha(squircle)

    # cream serif R, optically centred in the area above the band
    d = ImageDraw.Draw(img)
    size = 330
    font = ImageFont.truetype(SERIF_BOLD, size)
    while _ink(d, GLYPH, font)[3] > (TILE - BAND_H) - 40 and size > 40:
        size -= 10
        font = ImageFont.truetype(SERIF_BOLD, size)
    l, t, r, b = _ink(d, GLYPH, font)
    x = (TILE - (r - l)) / 2 - l
    # centre the glyph ink in the plate above the band, then nudge up for optical balance
    y = ((TILE - BAND_H) - (b - t)) / 2 - t - 12
    d.text((x, y), GLYPH, font=font, fill=CREAM + (255,))
    return img


def build_apple() -> Image.Image:
    """180x180, opaque, full-bleed square: iOS masks its own corners and drops alpha.

    So draw a SQUARE version (no rounded corners, band edge-to-edge) rather than
    flattening the squircle -- flattening leaves charcoal wedges in the corners of
    the band.
    """
    img = Image.new("RGB", (TILE, TILE), CHARCOAL)
    d = ImageDraw.Draw(img)
    d.rectangle([0, TILE - BAND_H, TILE, TILE], fill=BRAND)
    size = 330
    font = ImageFont.truetype(SERIF_BOLD, size)
    while _ink(d, GLYPH, font)[3] > (TILE - BAND_H) - 40 and size > 40:
        size -= 10
        font = ImageFont.truetype(SERIF_BOLD, size)
    l, t, r, b = _ink(d, GLYPH, font)
    d.text(((TILE - (r - l)) / 2 - l, ((TILE - BAND_H) - (b - t)) / 2 - t - 12), GLYPH, font=font, fill=CREAM)
    return img.resize((180, 180), Image.Resampling.LANCZOS)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="report current files, write nothing")
    args = ap.parse_args()

    if args.check:
        for p in (
            os.path.join(APP_DIR, "favicon.ico"),
            os.path.join(APP_DIR, "icon.png"),
            os.path.join(APP_DIR, "apple-icon.png"),
        ):
            if os.path.exists(p):
                with Image.open(p) as im:
                    print(f"{p}: {im.size} {im.mode} {os.path.getsize(p)} bytes")
        return

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
