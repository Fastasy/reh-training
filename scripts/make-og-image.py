#!/usr/bin/env python3
"""Generate the default Open Graph card (1200x630) for RSTL Centre.

The first version of this card predated the client's artwork, so it set the brand as
DejaVu serif text ("RSTL Centre") — a stand-in that never matched the real letterforms.
The client's logo has now landed, so the card carries the actual RSTL/CENTRE lockup on a
white plate: the artwork is dark ink drawn for light backgrounds, and charcoal would
swallow it.

Correct ratio matters: the old og-image.png was 1280x1280, so WhatsApp/Facebook/LinkedIn
cropped the wordmark off. This writes 1200x630, matching the width/height declared in
app/layout.tsx.

Run from the repo root:  python3 scripts/make-og-image.py
                         (run scripts/make-logo-assets.py first — this reads its output)
"""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images", "og-default.png")
LOGO = os.path.join(ROOT, "public", "images", "rstl-logo.png")

W, H = 1200, 630

CHARCOAL = (37, 36, 35)
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
d.text((84, 84), "ACCREDITED  TRAINING", font=f(SANS_BOLD, 24), fill=SAND)

# the client's actual lockup, on the light plate its dark ink needs
if not os.path.exists(LOGO):
    raise SystemExit(f"logo not found: {LOGO} -- run scripts/make-logo-assets.py first")

with Image.open(LOGO) as raw:
    logo = raw.convert("RGBA")
logo_h = 150
logo = logo.resize((round(logo.size[0] * logo_h / logo.size[1]), logo_h), Image.Resampling.LANCZOS)

PAD = 18
plate_w, plate_h = logo.size[0] + PAD * 2, logo.size[1] + PAD * 2
plate = Image.new("RGBA", (plate_w, plate_h), (0, 0, 0, 0))
ImageDraw.Draw(plate).rounded_rectangle([0, 0, plate_w - 1, plate_h - 1], radius=16, fill=(255, 255, 255, 255))
plate.paste(logo, ((plate_w - logo.size[0]) // 2, (plate_h - logo.size[1]) // 2), logo)

PLATE_X, PLATE_Y = 80, 120
img.paste(plate, (PLATE_X, PLATE_Y), plate)

# rule
rule_y = PLATE_Y + plate_h + 34
d.rectangle([84, rule_y, 84 + 120, rule_y + 5], fill=BRAND)

# subtitle
d.text((84, rule_y + 34), "Health & Safety Training", font=f(SANS_BOLD, 52), fill=CREAM)

# services
d.text(
    (84, rule_y + 116),
    "Courses  ·  Occupational medicals  ·  Soft skills",
    font=f(SANS, 30),
    fill=(205, 198, 190),
)

# branches + contact
d.text((84, 552), "Midrand  ·  Durban  ·  Mthatha", font=f(SANS, 26), fill=(165, 158, 150))

contact = "010 746 6954   rstlcentre.co.za"
w = d.textlength(contact, font=f(SANS_BOLD, 26))
d.text((W - 84 - w, 552), contact, font=f(SANS_BOLD, 26), fill=CREAM)

img.save(OUT, "PNG", optimize=True)

got = Image.open(OUT)
print(f"wrote {OUT}")
print(f"  size={got.size} mode={got.mode} bytes={os.path.getsize(OUT)}")
assert got.size == (W, H), "wrong dimensions"
# sanity: the card must not be a flat colour
stat = got.convert("L").getextrema()
print(f"  luminance range={stat} (flat if both equal)")
