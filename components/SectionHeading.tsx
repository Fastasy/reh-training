type Props = {
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
};

export default function SectionHeading({ eyebrow, title, sub, dark, center }: Props) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${
            dark ? "text-brand" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-cream/75" : "text-charcoal/70"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
