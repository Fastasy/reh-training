// Per-course page content: merges scraped landing-page content (lp-content.json)
// with writer-generated copy (course-content/<category>.json).
import lpContentRaw from "./course-content/lp-content.json";
import safetyCompliance from "./course-content/safety-compliance.json";
import workingAtHeights from "./course-content/working-at-heights.json";
import emergencyFire from "./course-content/emergency-fire.json";
import dangerousGoods from "./course-content/dangerous-goods.json";
import handPowerTools from "./course-content/hand-power-tools.json";
import civilConstruction from "./course-content/civil-construction.json";
import plumbing from "./course-content/plumbing.json";
import machinePlant from "./course-content/machine-plant.json";

export type Faq = { q: string; a: string };

export type CoursePageContent = {
  description?: string;
  outcomes?: string[];
  audience: string[];
  faqs: Faq[];
  us_id?: string | null;
  us_name?: string | null;
  nqf?: string | null;
};

const WRITER_CONTENT: Record<string, { description?: string; outcomes?: string[]; audience: string[]; faqs: Faq[] }> =
  Object.fromEntries(
    [
      ...safetyCompliance,
      ...workingAtHeights,
      ...emergencyFire,
      ...dangerousGoods,
      ...handPowerTools,
      ...civilConstruction,
      ...plumbing,
      ...machinePlant,
    ].map((c) => [c.name, c])
  );

const LP_CONTENT = lpContentRaw as Record<
  string,
  { us_id?: string | null; us_name?: string | null; nqf?: string | null; description?: string; outline?: string[] }
>;

export function getCoursePageContent(name: string): CoursePageContent | null {
  const writer = WRITER_CONTENT[name];
  const lp = LP_CONTENT[name];
  if (!writer && !lp) return null;

  // LP description/outline wins when present (real scraped content); writer fills gaps.
  const description = lp?.description || writer?.description;
  const outcomes = lp?.outline?.length ? lp.outline : writer?.outcomes;

  return {
    description,
    outcomes,
    audience: writer?.audience ?? [],
    faqs: writer?.faqs ?? [],
    us_id: lp?.us_id ?? null,
    us_name: lp?.us_name ?? null,
    nqf: lp?.nqf ?? null,
  };
}

export { COURSE_CATEGORIES } from "./courses";
