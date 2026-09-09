// REH Safety Training — full course catalogue.
// Sources: REH price list PDF (2026-08, client-provided) + rehtraining.co.za/courses scrape.
// price: "R650" string | null (null = "Request a Quote").
// popular: true = featured on home page.
import unitStandardsRaw from "./course-content/unit-standards.json";

const UNIT_STANDARDS = unitStandardsRaw as Record<
  string,
  { us_id?: string | null; us_name?: string | null; nqf?: string | null }
>;

export type Course = {
  name: string;
  duration: string;
  price: string | null;
  popular?: boolean;
  /** Unit Standard ID (from the client's LP pages), e.g. "120362" or "244498 & 244495". */
  usId?: string | null;
};

export type CourseCategory = {
  id: string;
  title: string;
  blurb: string;
  courses: Course[];
};

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: "safety-compliance",
    title: "Safety & Legal Compliance",
    blurb:
      "The legal backbone of a safe workplace — OHS Act, risk assessment, incident investigation and supervisor-level compliance training.",
    courses: [
      { name: "Basic Health & Safety", duration: "1 Day", price: "R650" },
      { name: "Health & Safety Representative (SHE Rep)", duration: "1 Day", price: "R600", popular: true },
      { name: "Health & Safety for Supervisors", duration: "1 Day", price: "R700" },
      { name: "Occupational Health & Safety (OHS) Act", duration: "1 Day", price: "R650" },
      { name: "OHS Act Advanced Legislation", duration: "1 Day", price: null },
      { name: "Risk Assessment (HIRA)", duration: "1 Day", price: "R700" },
      { name: "Apply Health & Safety to a Work Area", duration: "1 Day", price: "R700" },
      { name: "Accident & Incident Investigation", duration: "1 Day", price: "R700" },
      { name: "Legal Liability & Compliance Training", duration: "1 Day", price: "R700" },
      { name: "COIDA (Compensation for Occupational Injuries & Diseases Act)", duration: "1 Day", price: "R650" },
      { name: "OHS Supervisor", duration: "1 Day", price: "R700" },
      { name: "OHS Management & Leadership", duration: "1 Day", price: null },
      { name: "Construction Supervisor Course", duration: "1 Day", price: null },
      { name: "Temporary Works Supervisor Course", duration: "1 Day", price: null },
      { name: "General Machinery Regulations (GMRs)", duration: "1 Day", price: null },
      { name: "Safe Stacking & Storage", duration: "1 Day", price: "R650" },
      { name: "Construction Housekeeping", duration: "1 Day", price: null },
      { name: "Emergency Evacuation Training", duration: "1 Day", price: "R650" },
      { name: "Flagman (Stop & Go)", duration: "1 Day", price: "R700" },
      { name: "Safety Officer Skills Programme", duration: "10 Days", price: "R7900" },
      { name: "Traffic Safety Officer", duration: "3 Days", price: "R2800" },
    ],
  },
  {
    id: "technical-courses",
    title: "Technical Courses",
    blurb:
      "Practical trade and water systems skills — plumbing, drainage, geysers and solar heating, plus bricklaying, formwork, steel fixing, concrete and roadworks.",
    courses: [
      { name: "Plumbing General Skills", duration: "6 Days", price: "R4500" },
      { name: "Cold Water Plumbing Systems", duration: "To Quote", price: null },
      { name: "Hot Water Systems (Geysers & Boilers)", duration: "To Quote", price: null },
      { name: "Drainage & Rainwater Systems Installation", duration: "5 Days", price: "R4500" },
      { name: "Solar Water Heating Course", duration: "To Quote", price: null },
      { name: "Pipe Laying & Jointing", duration: "5 Days", price: "R4500" },
      { name: "Leak Detection & Basic Maintenance", duration: "To Quote", price: null },
      { name: "Bricklaying", duration: "6 Days", price: "R5200" },
      { name: "Formwork", duration: "3 Days", price: "R2500" },
      { name: "Steel Fixing", duration: "5 Days", price: "R3800" },
      { name: "Concrete Works", duration: "2 Days", price: "R2200" },
      { name: "Surveying Techniques", duration: "2 Days", price: "R2000" },
      { name: "Roadworks", duration: "5 Days", price: "R3800" },
      { name: "Paving & Kerbs", duration: "5 Days", price: "R3500" },
      { name: "Road Signage & Markings", duration: "To Quote", price: null },
      { name: "Stormwater", duration: "4 Days", price: "R3300" },
    ],
  },
  {
    id: "machines-tools",
    title: "Machines & Tools",
    blurb:
      "Operator competence for forklifts, excavators, TLBs, cranes and earthmoving plant, plus safe use of hand and power tools — protecting people and plant.",
    courses: [
      { name: "Forklift Operator", duration: "To Quote", price: null },
      { name: "Excavator Operator", duration: "To Quote", price: null },
      { name: "TLB Operator", duration: "To Quote", price: null },
      { name: "Grader Operator", duration: "To Quote", price: null },
      { name: "Bulldozer Operator", duration: "To Quote", price: null },
      { name: "Tipper Truck Operator", duration: "To Quote", price: null },
      { name: "Truck Mounted Crane", duration: "To Quote", price: null },
      { name: "Tower Crane Operator", duration: "To Quote", price: null },
      { name: "Roller Operator", duration: "To Quote", price: null },
      { name: "Bobcat (Skid Steer Loader) Operator", duration: "To Quote", price: null },
      { name: "Operate a Front-End Loader", duration: "To Quote", price: null },
      { name: "Tractor Operator", duration: "To Quote", price: null },
      { name: "Banksman", duration: "To Quote", price: null },
      { name: "Articulated Dump Truck (ADT)", duration: "To Quote", price: null },
      { name: "Water Tanker Operator", duration: "To Quote", price: null },
      { name: "Rigid Body Dump Truck", duration: "To Quote", price: null },
      { name: "Hand & Power Tools Safety", duration: "1 Day", price: "R800", popular: true },
      { name: "Power (Electrical) Tools", duration: "1 Day", price: "R700" },
      { name: "Manual (Hand) Tools", duration: "1 Day", price: "R700" },
      { name: "Grinders Operator", duration: "1 Day", price: "R1250" },
      { name: "Chain Saw Operator", duration: "1 Day", price: "R1250" },
      { name: "Cut-Off Saw Operator", duration: "1 Day", price: "R1250" },
      { name: "Portable Power Tools", duration: "1 Day", price: "R700" },
    ],
  },
  {
    id: "heights-and-access",
    title: "Heights and Access",
    blurb:
      "Working at height, scaffolding, fall arrest and access equipment — ladders, MEWPs, rigging and confined space for teams operating above ground.",
    courses: [
      { name: "Working at Heights", duration: "1 Day", price: "R700", popular: true },
      { name: "Fall Arrest Techniques", duration: "1 Day", price: "R700" },
      { name: "Fall Arrest Rescue", duration: "4 Days", price: "R3500" },
      { name: "Fall Protection Planning", duration: "1 Day", price: "R700" },
      { name: "Fall Protection Plan Developer", duration: "1 Day", price: "R700" },
      { name: "Scaffolding Erector", duration: "1 Day", price: "R700", popular: true },
      { name: "Scaffolding Inspector", duration: "1 Day", price: "R700", popular: true },
      { name: "Scaffolding Supervisor", duration: "1 Day", price: "R700" },
      { name: "Ladder Inspector", duration: "1 Day", price: "R700" },
      { name: "Cherry Picker Operator", duration: "1 Day", price: null },
      { name: "Basic Rigging & Slinging", duration: "1 Day", price: "R1500" },
      { name: "Advanced Rigging & Slinging", duration: "4 Days", price: "R3500" },
      { name: "Confined Space Entry", duration: "1 Day", price: null },
      { name: "Confined Space Rescue", duration: "1 Day", price: null },
      { name: "Safe Use of Breathing Apparatus", duration: "1 Day", price: "R800" },
      { name: "Mobile Elevating Work Platform (MEWP)", duration: "1 Day", price: null },
    ],
  },
  {
    id: "emergency-courses",
    title: "Emergency Courses",
    blurb:
      "First aid levels 1–3, fire awareness and firefighting — practical emergency response training that keeps your team ready.",
    courses: [
      { name: "First Aid Level 1", duration: "1 Day", price: "R650", popular: true },
      { name: "First Aid Level 2", duration: "1 Day", price: "R650", popular: true },
      { name: "First Aid Level 3", duration: "1 Day", price: "R650", popular: true },
      { name: "Emergency Evacuation Procedures", duration: "1 Day", price: "R650" },
      { name: "Basic Fire Awareness", duration: "1 Day", price: "R650" },
      { name: "Basic Firefighting", duration: "1 Day", price: "R650", popular: true },
      { name: "Fire Marshal", duration: "1 Day", price: "R650" },
      { name: "Fire Equipment Inspector", duration: "1 Day", price: "R650" },
    ],
  },
  {
    id: "dangerous-goods",
    title: "Dangerous Goods & Environmental",
    blurb:
      "Conveying dangerous goods for drivers, Hazchem, dangerous goods handling, spill response, and chemical safety for workplaces that move or store hazardous loads.",
    courses: [
      { name: "Controlling Hazardous & Dangerous Goods", duration: "1 Day", price: "R800" },
      { name: "Convey Dangerous Goods by Road", duration: "1 Day", price: "R800" },
      { name: "Chemical Hazards (HAZCHEM)", duration: "1 Day", price: "R800" },
      { name: "Hazardous Materials Awareness", duration: "1 Day", price: null },
      { name: "Asbestos Awareness", duration: "1 Day", price: null },
      { name: "Dangerous Goods – Identification", duration: "1 Day", price: null },
      { name: "Respond to & Clean Up a Spill", duration: "1 Day", price: "R700" },
      { name: "Spill Training Workshop", duration: "1 Day", price: "R700" },
      { name: "Spill Kit Responder", duration: "1 Day", price: "R700" },
      { name: "Move & Store Hazardous Loads", duration: "1 Day", price: "R700" },
    ],
  },
];

export const ALL_COURSES = COURSE_CATEGORIES.flatMap((c) =>
  c.courses.map((course) => ({
    ...course,
    category: c.title,
    categoryId: c.id,
    usId: UNIT_STANDARDS[course.name]?.us_id ?? null,
  }))
);

export const POPULAR_COURSES = ALL_COURSES.filter((c) => c.popular);

// Display order for the home-page "Popular Courses" section (client list, 2026-09).
// SHE Rep first, then heights, scaffolding, first aid, firefighting, hand & power tools.
const POPULAR_ORDER = [
  "Health & Safety Representative (SHE Rep)",
  "Working at Heights",
  "Scaffolding Inspector",
  "Scaffolding Erector",
  "First Aid Level 1",
  "First Aid Level 2",
  "First Aid Level 3",
  "Basic Firefighting",
  "Hand & Power Tools Safety",
];

export const HOME_POPULAR_COURSES = POPULAR_ORDER.map((name) => {
  const course = ALL_COURSES.find((c) => c.name === name);
  if (!course) throw new Error(`Popular course not found: ${name}`);
  return course;
});

export const COURSE_COUNT = ALL_COURSES.length;

export const REH_EMAIL = "info@rehtraining.co.za";

export function emailQuoteLink(courseName?: string): string {
  const subject = courseName
    ? `Training Quotation Request - ${courseName}`
    : "Training Quotation Request";
  return `mailto:${REH_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
