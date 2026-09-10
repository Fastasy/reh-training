import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Work_Sans, Lustria } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteFloat from "@/components/QuoteFloat";
import Tracking from "@/components/Tracking";
import PostHogTracker from "@/components/PostHogTracker";
import { BookingProvider } from "@/components/BookingModal";
import { GTM_ID } from "@/lib/analytics";
import { SITE } from "@/lib/site";

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

/** Kept for backwards compatibility with anything importing the layout's site object. */
const site = {
  name: SITE.name,
  url: SITE.url,
  phone: SITE.phoneDisplay,
  phoneLink: `tel:${SITE.phone}`,
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  jhb: "14 Douglas Road, Glen Austin, Midrand, Johannesburg, 1685",
  dbn: "62 Lilian Ngoyi Street, Windermere, Durban",
};

const TITLE_DEFAULT = "Accredited Health & Safety Training | RSTL Centre";
const DESCRIPTION =
  "Accredited health and safety training, occupational medicals and soft skills in Midrand, Durban and Mthatha. 94 courses, published prices, daily classes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE_DEFAULT,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "health and safety training South Africa",
    "working at heights training",
    "fall arrest course",
    "first aid level 1",
    "safety officer course",
    "forklift training",
    "soft skills training",
    "occupational medicals",
    "RSTL Centre",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "RSTL Centre — accredited health and safety training in South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: ["/images/og-default.png"],
  },
  // Icons come from the file conventions in this directory: app/favicon.ico,
  // app/icon.png (512) and app/apple-icon.png (180). Next emits them as
  // content-hashed URLs, so a new icon busts the browser/crawler cache on its own.
  // Do NOT re-add an `icons` block pointing at hand-rolled /public paths -- those
  // URLs are unhashed and will keep serving the old icon after a swap.
};

/** Browser chrome colour on Android/iOS matches the brand charcoal. */
export const viewport: Viewport = {
  themeColor: "#252423",
  colorScheme: "light",
};

export { site };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* en-ZA, not "en": this is a South African business and hreflang signals should agree. */
    <html
      lang="en-ZA"
      className={`${workSans.variable} ${lustria.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Tracking />
        <PostHogTracker />
        <BookingProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteFloat />
        </BookingProvider>
      </body>
    </html>
  );
}
