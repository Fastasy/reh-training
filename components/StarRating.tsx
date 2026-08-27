type DisplayProps = {
  value: number; // 0-5, supports fractions
  size?: "sm" | "md" | "lg";
};

export function StarRating({ value, size = "md" }: DisplayProps) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const cls = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="relative inline-flex" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <div className="flex gap-0.5 text-charcoal/15">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={cls} />
        ))}
      </div>
      <div className="absolute inset-0 flex gap-0.5 overflow-hidden text-amber-400" style={{ width: `${pct}%` }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={`${cls} shrink-0`} />
        ))}
      </div>
    </div>
  );
}

type InputProps = {
  value: number;
  onChange: (v: number) => void;
};

export function StarInput({ value, onChange }: InputProps) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onClick={() => onChange(i)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <svg
            className={`h-8 w-8 ${i <= value ? "text-amber-400" : "text-charcoal/20"} transition-colors`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.9 6.26 6.85.8-5.09 4.63 1.35 6.76L12 17.1 5.99 20.45l1.35-6.76L2.25 9.06l6.85-.8L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function Star({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.26 6.85.8-5.09 4.63 1.35 6.76L12 17.1 5.99 20.45l1.35-6.76L2.25 9.06l6.85-.8L12 2z" />
    </svg>
  );
}
