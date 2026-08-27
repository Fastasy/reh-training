import type { Metadata } from "next";
import { Work_Sans, Lustria } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const lustria = Lustria({
  weight: "400",
  variable: "--font-lustria",
  subsets: ["latin"],
  display: "swap",
});

const site = {
  name: "REH Safety Training",
  url: "https://www.rehtraining.co.za",
  phone: "+27107466954",
  phoneLink: "tel:+27107466954",
  whatsapp: "27615807967",
  email: "info@rehtraining.co.za",
  jhb: "14 Douglas Road, Glen Austin, Midrand, Johannesburg, 1685",
  dbn: "62 Lilian Ngoyi Street, Windermere, Durban",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Accredited Health & Safety Training | REH Safety Training",
    template: "%s | REH Safety Training",
  },
  description:
    "SAQA-aligned health & safety training, OHS consulting and occupational medicals. Online, on-site and centre-based courses in Midrand & Durban — daily classes, no waiting period.",
  keywords: [
    "health and safety training South Africa",
    "working at heights training",
    "fall arrest course",
    "first aid level 1",
    "safety officer course",
    "forklift training",
    "OHS consulting",
    "occupational medicals",
    "REH Safety Training",
  ],
  openGraph: {
    title: "Accredited Health & Safety Training | REH Safety Training",
    description:
      "SAQA-aligned health & safety courses, OHS consulting and occupational medicals. Online, on-site and centre-based — daily classes, no waiting period.",
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1280,
        height: 1280,
        alt: "REH Safety Training — Accredited Health & Safety Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accredited Health & Safety Training | REH Safety Training",
    description:
      "SAQA-aligned health & safety courses, OHS consulting and occupational medicals.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/app/icon.png",
    apple: "/app/apple-icon.png",
  },
};

export { site };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${lustria.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
