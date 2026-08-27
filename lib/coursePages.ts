// Per-course page content: merges full scraped landing-page content (lp-full.json)
// with writer-generated copy (course-content/<category>.json).
import lpContentRaw from "./course-content/lp-content.json";
import lpFullRaw from "./course-content/lp-full.json";
import lpNameMapRaw from "./course-content/lp-name-map.json";
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
  outline?: string[]; // course modules/syllabus (from the client's original LP pages)
  outcomes?: string[]; // learning outcomes
  audience: string[];
  certification?: string;
  entryRequirements?: string[];
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

type LpFull = {
  us_id?: string;
  us_name?: string;
  nqf?: string;
  duration?: string;
  price?: string;
  description?: string;
  outline?: string[];
  outcomes?: string[];
  audience?: string[];
  certification?: string;
  entry_requirements?: string[];
};

const LP_FULL = lpFullRaw as Record<string, LpFull>;
const LP_NAME_MAP = lpNameMapRaw as Record<string, string>;

function lpFullFor(name: string): LpFull | undefined {
  const key = Object.keys(LP_NAME_MAP).find((k) => LP_NAME_MAP[k] === name);
  return key ? LP_FULL[key] : undefined;
}

export function getCoursePageContent(name: string): CoursePageContent | null {
  const writer = WRITER_CONTENT[name];
  const lp = LP_CONTENT[name];
  const full = lpFullFor(name);
  if (!writer && !lp && !full) return null;

  // Full LP scrape wins (real client content); older partial scrape + writer fill gaps.
  const description = full?.description || lp?.description || writer?.description;
  const outline = full?.outline?.length ? full.outline : lp?.outline;
  const outcomes =
    full?.outcomes?.length
      ? full.outcomes
      : writer?.outcomes ?? (outline?.length ? outline : undefined);
  const audience = full?.audience?.length ? full.audience : writer?.audience ?? [];

  return {
    description,
    outline,
    outcomes,
    audience,
    certification: full?.certification,
    entryRequirements: full?.entry_requirements,
    faqs: writer?.faqs ?? [],
    us_id: full?.us_id ?? lp?.us_id ?? null,
    us_name: full?.us_name ?? lp?.us_name ?? null,
    nqf: full?.nqf ?? lp?.nqf ?? null,
  };
}

export { COURSE_CATEGORIES } from "./courses";
