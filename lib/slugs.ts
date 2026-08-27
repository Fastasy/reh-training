// Slug generation for course pages with explicit overrides for awkward names.
import { ALL_COURSES } from "./courses";

const OVERRIDES: Record<string, string> = {
  "COIDA (Compensation for Occupational Injuries & Diseases Act)": "coida",
  "Health & Safety Representative (SHE Rep)": "health-and-safety-representative",
  "Occupational Health & Safety (OHS) Act": "ohs-act",
  "OHS Act Advanced Legislation": "ohs-act-advanced",
  "Risk Assessment (HIRA)": "risk-assessment-hira",
  "Mobile Elevating Work Platform (MEWP)": "mewp-operator",
  "Controlling Hazardous & Dangerous Goods": "controlling-hazardous-dangerous-goods",
  "Convey Dangerous Goods by Road": "convey-dangerous-goods-by-road",
  "Dangerous Goods – Identification": "dangerous-goods-identification",
  "Bobcat (Skid Steer Loader) Operator": "bobcat-operator",
  "Articulated Dump Truck (ADT)": "articulated-dump-truck",
  "Manual (Hand) Tools": "hand-tools",
  "Power (Electrical) Tools": "power-tools",
  "Hand & Power Tools Safety": "hand-and-power-tools",
  "Chemical Hazards (HAZCHEM)": "hazchem",
  "Hot Water Systems (Geysers & Boilers)": "hot-water-systems",
  "Flagman (Stop & Go)": "flagman",
  "General Machinery Regulations (GMRs)": "gmrs",
  "Safe Use of Breathing Apparatus": "breathing-apparatus",
  "Move & Store Hazardous Loads": "move-store-hazardous-loads",
  "Drainage & Rainwater Systems Installation": "drainage-rainwater-systems",
  "Pipe Laying & Jointing": "pipe-laying-jointing",
  "Leak Detection & Basic Maintenance": "leak-detection-maintenance",
  "Construction Supervisor Course": "construction-supervisor",
  "Temporary Works Supervisor Course": "temporary-works-supervisor",
  "Health & Safety for Supervisors": "health-safety-supervisors",
  "Apply Health & Safety to a Work Area": "apply-health-safety-work-area",
  "OHS Management & Leadership": "ohs-management-leadership",
  "Safety Officer Skills Programme": "safety-officer-skills-programme",
  "Traffic Safety Officer": "traffic-safety-officer",
  "Basic Rigging & Slinging": "basic-rigging-slinging",
  "Advanced Rigging & Slinging": "advanced-rigging-slinging",
  "Fall Arrest Techniques": "fall-arrest-techniques",
  "Fall Arrest Rescue": "fall-arrest-rescue",
  "Fall Protection Plan Developer": "fall-protection-plan-developer",
  "Working at Heights": "working-at-heights",
  "Confined Space Entry": "confined-space-entry",
  "Confined Space Rescue": "confined-space-rescue",
  "Cherry Picker Operator": "cherry-picker-operator",
  "Solar Water Heating Course": "solar-water-heating",
  "Plumbing Safety & Legal Compliance": "plumbing-safety-legal-compliance",
  "Cold Water Plumbing Systems": "cold-water-plumbing-systems",
  "Spill Kit Responder": "spill-kit-responder",
  "Respond to & Clean Up a Spill": "respond-to-clean-up-a-spill",
  "Spill Training Workshop": "spill-training-workshop",
  "Hazardous Materials Awareness": "hazardous-materials-awareness",
  "Emergency Evacuation Procedures": "emergency-evacuation-procedures",
  "Emergency Evacuation Training": "emergency-evacuation-training",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function courseSlug(name: string): string {
  return OVERRIDES[name] ?? slugify(name);
}

export type CourseWithSlug = (typeof ALL_COURSES)[number] & { slug: string };

export const ALL_COURSES_WITH_SLUG: CourseWithSlug[] = ALL_COURSES.map((c) => ({
  ...c,
  slug: courseSlug(c.name),
}));

export const COURSE_BY_SLUG: Record<string, CourseWithSlug> = Object.fromEntries(
  ALL_COURSES_WITH_SLUG.map((c) => [c.slug, c])
);

export function courseUrl(name: string): string {
  return `/courses/${courseSlug(name)}`;
}
