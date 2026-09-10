import Link from "next/link";

/**
 * Renders the two markdown-ish conventions used in the article data store:
 *   [anchor text](/courses/some-course)  -> internal <Link>
 *   **emphasis**                          -> <strong>
 *
 * Kept deliberately small: article copy needs links and emphasis and nothing else, and
 * a full markdown dependency for two patterns would be more surface area than the job
 * justifies. Anything not matching a pattern passes through as plain text.
 */
const PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

export default function InlineText({ text }: { text: string }) {
  const parts = text.split(PATTERN).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) {
          return (
            <strong key={i} className="font-semibold text-charcoal">
              {bold[1]}
            </strong>
          );
        }

        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const className =
            "font-semibold text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={className}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={className} rel="noopener">
              {label}
            </a>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
