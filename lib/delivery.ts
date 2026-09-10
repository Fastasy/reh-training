// Which delivery modes RSTL actually offers, per course category (and a few
// per-course overrides). Practical operator/artisan courses (plant, tools,
// construction, plumbing, heights, fire) cannot be completed online — the theory
// part may be, but the course as a whole runs on-site or at a centre.
// Theory/legal courses (compliance, supervision) and awareness courses can run
// fully online.
//
// If the client's delivery model differs for a specific course, add the course
// name to ONLINE_DISABLED_COURSES (forces On-site + Centre) or extend the
// category list. Kept in one place so the course pages, meta descriptions and
// JSON-LD stay consistent.

export type CourseDeliveryMode = "Online" | "On-site" | "Centre";

export const DELIVERY_BY_CATEGORY: Record<string, CourseDeliveryMode[]> = {
  // Legal, compliance & supervision theory — legitimately online.
  "safety-compliance": ["Online", "On-site", "Centre"],
  // Bricklaying, steel fixing, concrete, roadworks, plumbing — hands-on trade skills.
  "technical-courses": ["On-site", "Centre"],
  // Forklifts, excavators, TLBs, cranes, hand & power tools — cannot be done online.
  "machines-tools": ["On-site", "Centre"],
  // Working at heights, fall arrest, scaffolding, rigging — physical training only.
  "heights-and-access": ["On-site", "Centre"],
  // First aid, firefighting, evacuation — practical training only.
  "emergency-courses": ["On-site", "Centre"],
  // Awareness/identification/control classes can be online; the hands-on
  // response, spill-cleanup and driver courses below are overridden.
  "dangerous-goods": ["Online", "On-site", "Centre"],
};

// Physical dangerous-goods & plant-adjacent courses where online is misleading.
export const ONLINE_DISABLED_COURSES = new Set<string>([
  "Respond to & Clean Up a Spill",
  "Spill Kit Responder",
  "Spill Training Workshop",
  "Move & Store Hazardous Loads",
  "Convey Dangerous Goods by Road",
]);

export function courseDeliveryModes(
  categoryId?: string | null,
  courseName?: string
): CourseDeliveryMode[] {
  if (courseName && ONLINE_DISABLED_COURSES.has(courseName)) {
    return ["On-site", "Centre"];
  }
  return DELIVERY_BY_CATEGORY[categoryId ?? ""] ?? ["Online", "On-site", "Centre"];
}

export function deliveryLabel(modes: CourseDeliveryMode[]): string {
  return modes.join(" · ");
}

/** Human sentence fragment, e.g. "online, on-site or at our centres". */
export function deliverySentence(modes: CourseDeliveryMode[]): string {
  const hasOnline = modes.includes("Online");
  const parts: string[] = [];
  if (hasOnline) parts.push("online");
  if (modes.includes("On-site")) parts.push("on-site at your premises");
  if (modes.includes("Centre"))
    parts.push("at our centres in Midrand, Durban and Mthatha");
  if (parts.length === 0) return "at our centres in Midrand, Durban and Mthatha";
  if (parts.length === 1) return parts[0];
  return parts.slice(0, -1).join(", ") + " or " + parts[parts.length - 1];
}

/** Schema.org courseMode values for JSON-LD ("Centre" is a physical venue → onsite). */
export function schemaCourseModes(modes: CourseDeliveryMode[]): string[] {
  const out = new Set<string>();
  if (modes.includes("Online")) out.add("online");
  if (modes.includes("On-site") || modes.includes("Centre")) out.add("onsite");
  return Array.from(out);
}
