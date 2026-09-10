/**
 * Single source of truth for brand and contact details.
 *
 * Used by metadata (app/layout.tsx), structured data (lib/schema.ts) and any page or
 * component that needs the trading name, URLs or branch contact details. Update here
 * and every consumer follows, so the site cannot drift out of sync with what Google
 * reads in the schema.
 *
 * NOTE on the email: the trading name is RSTL Centre but the mailbox is still
 * info@rehtraining.co.za, because the Zoho mailbox lives on the old domain until the
 * new one's MX records exist. Flip it with scripts/rebrand-rstl.py --email-flip.
 */
export const SITE = {
  name: "RSTL Centre",
  tagline: "Accredited Health & Safety Training",
  url: "https://www.rstlcentre.co.za",
  email: "info@rehtraining.co.za",
  /** Main switchboard, displayed and in E.164. */
  phoneDisplay: "010 746 6954",
  phone: "+27107466954",
  /** WhatsApp uses the Midrand mobile. */
  whatsapp: "27615807967",
  whatsappDisplay: "061 580 7967",
  social: {
    facebook: "https://www.facebook.com/rehtraining",
    tiktok: "https://www.tiktok.com/@rehsafetytraining",
  },
  /** Service area: national delivery, three training centres. */
  areaServed: ["South Africa", "Midrand", "Johannesburg", "Durban", "Mthatha"],
  /** Prices on the site start here; helps Google render the price range. */
  priceRange: "R600 - R7,900",
  branches: [
    {
      id: "midrand",
      name: "RSTL Centre Midrand",
      street: "14 Douglas Road, Glen Austin",
      city: "Midrand",
      region: "Gauteng",
      postalCode: "1685",
      country: "ZA",
      phone: "+27615807967",
    },
    {
      id: "durban",
      name: "RSTL Centre Durban",
      street: "62 Lilian Ngoyi Street, Windermere",
      city: "Durban",
      region: "KwaZulu-Natal",
      country: "ZA",
      phone: "+27769346783",
    },
    {
      id: "mthatha",
      name: "RSTL Centre Mthatha",
      street: "CNR Leeds & York Road, 1st Floor Old Mutual",
      city: "Mthatha",
      region: "Eastern Cape",
      country: "ZA",
      phone: "+27780452852",
    },
  ],
} as const;

export type BranchId = (typeof SITE.branches)[number]["id"];
