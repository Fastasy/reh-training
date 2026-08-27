export default function QuoteFloat() {
  return (
    <a
      href="mailto:info@rehtraining.co.za?subject=Training%20Quotation%20Request"
      data-booking
      aria-label="Request a training quotation via email"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-xl shadow-black/25 transition-transform hover:scale-110"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    </a>
  );
}
