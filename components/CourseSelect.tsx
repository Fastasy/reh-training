"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_COURSES } from "@/lib/courses";

type Props = {
  value: string;
  onChange: (course: string) => void;
  exclude?: string[];
};

export default function CourseSelect({ value, onChange, exclude = [] }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    const excluded = new Set(exclude);
    const base = q
      ? ALL_COURSES.filter((c) => c.name.toLowerCase().includes(q))
      : ALL_COURSES;
    return base.filter((c) => !excluded.has(c.name)).slice(0, 40);
  }, [query, exclude]);

  // close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => setActive(0), [query, open]);

  const select = (name: string) => {
    onChange(name);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const clear = () => {
    onChange("");
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.stopPropagation();
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (open && options[active]) select(options[active].name);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative min-w-0 flex-1">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-label="Course name"
          value={open ? query : value}
          onFocus={() => {
            setQuery("");
            setOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKey}
          placeholder="Select a course…"
          className="w-full rounded-xl border border-line bg-white py-3 pl-4 pr-10 text-charcoal placeholder:text-charcoal/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        {value && !open ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear course"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-charcoal/50 transition-colors hover:bg-cream hover:text-charcoal"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        ) : (
          <svg
            className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-line bg-paper shadow-xl shadow-charcoal/15">
          {options.length === 0 ? (
            <p className="px-4 py-3 text-sm text-charcoal/50">
              No courses match &quot;{query}&quot;. Email us at info@rehtraining.co.za if you can&apos;t find it.
            </p>
          ) : (
            <ul role="listbox" aria-label="Courses">
              {options.map((c, i) => (
                <li key={c.name} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(c.name)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-brand-soft" : ""
                    }`}
                  >
                    <span className="truncate font-medium text-charcoal">{c.name}</span>
                    <span className="shrink-0 text-xs text-charcoal/50">
                      {c.duration}
                      {c.price ? ` · ${c.price}` : " · Quote"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
