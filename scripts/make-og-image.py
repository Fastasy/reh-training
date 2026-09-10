#!/usr/bin/env python3
"""Generate the default Open Graph card (1200x630) for RSTL Centre.

The old og-image.png was 1280x1280 (square, so WhatsApp/Facebook/LinkedIn crop it) and
carried the legacy REH branding. This writes a correct-ratio, current-brand card under a
NEW filename, because every cache layer keys off the URL: swapping bytes under the same
name leaves the old card showing.

Run from the repo root:  python3 scripts/make-og-image.py
"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images", "og-default.png")

CHARCOAL = (37, 36, 35)
INK = (26, 25, 24)
CREAM = (245, 240, 236)
BRAND = (226, 28, 20)
SAND = (156, 106, 61)

SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

f = lambda path, size: ImageFont.truetype(path, size)

img = Image.new("RGB", (W, H), CHARCOAL)
d = ImageDraw.Draw(img)

# top brand strip + left accent
d.rectangle([0, 0, W, 14], fill=BRAND)
d.rectangle([0, 14, 16, H], fill=BRAND)

# faint diagonal hazard motif, bottom-right
for i in range(-H, W, 46):
    d.line([(i + H, H), (i, 0)], fill=(45, 44, 42), width=10)

# eyebrow
d.text((84, 96), "ACCREDITED  TRAINING", font=f(SANS_BOLD, 24), fill=SAND)

# title
d.text((80, 150), "RSTL Centre", font=f(SERIF_BOLD, 104), fill=CREAM)

# rule
d.rectangle([84, 292, 84 + 120, 297], fill=BRAND)

# subtitle
d.text((84, 330), "Health & Safety Training", font=f(SANS_BOLD, 52), fill=CREAM)

# services
d.text(
    (84, 412),
    "Courses  ·  Occupational medicals  ·  Soft skills",
    font=f(SANS, 30),
    fill=(205, 198, 190),
)

# branches + contact
d.text((84, 528), "Midrand  ·  Durban  ·  Mthatha", font=f(SANS, 26), fill=(165, 158, 150))

contact = "010 746 6954   rstlcentre.co.za"
w = d.textlength(contact, font=f(SANS_BOLD, 26))
d.text((W - 84 - w, 528), contact, font=f(SANS_BOLD, 26), fill=CREAM)

img.save(OUT, "PNG", optimize=True)

got = Image.open(OUT)
print(f"wrote {OUT}")
print(f"  size={got.size} mode={got.mode} bytes={os.path.getsize(OUT)}")
assert got.size == (W, H), "wrong dimensions"
# sanity: the card must not be a flat colour
stat = got.convert("L").getextrema()
print(f"  luminance range={stat} (flat if both equal)")
