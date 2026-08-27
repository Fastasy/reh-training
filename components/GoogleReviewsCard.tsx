// Google Reviews card — real Google Business Profile for REH Safety Training.
// Place ID: ChIJ7ctwo2ZvlR4RfvD4cUs5rV4 (resolved 2026-08-27 via maps embed lookup).
// NOTE: Google has no free official widget for review cards. The keyless embed below
// shows the live place card (rating + review link). For live Google review CARDS on
// the site, the client can register a free/paid widget (Trustindex, Elfsight or
// EmbedSocial) and paste its snippet into the slot marked <-- WIDGET SLOT -->.
const PLACE_QUERY =
  "REH%20Safety%20Training%2C%2014%20Douglas%20Rd%2C%20Glen%20Austin%20AH%2C%20Midrand";
const PLACE_URL = "https://www.google.com/maps/place/?q=place_id:ChIJ7ctwo2ZvlR4RfvD4cUs5rV4";
// Direct link to the Google review form for this Place ID — one tap from a phone.
const REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ7ctwo2ZvlR4RfvD4cUs5rV4";

export default function GoogleReviewsCard() {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </span>
          <div>
            <p className="font-display text-lg text-charcoal">Google Reviews</p>
            <a
              href={PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              See all reviews on Google →
            </a>
          </div>
        </div>
      </div>

      <a
        href={REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
          <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Review us on Google
      </a>

      <div className="mt-4 overflow-hidden rounded-xl border border-line">
        <iframe
          title="REH Safety Training on Google Maps"
          src={`https://maps.google.com/maps?q=${PLACE_QUERY}&z=15&output=embed`}
          width="100%"
          height="220"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* <-- WIDGET SLOT: paste Trustindex/Elfsight Google-reviews snippet here when the client registers --> */}
      <p className="mt-3 text-xs text-charcoal/50">
        Rating and reviews shown are from REH Safety Training&apos;s Google Business Profile.
      </p>
    </div>
  );
}
