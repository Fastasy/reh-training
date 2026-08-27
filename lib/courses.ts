// REH Safety Training — full course catalogue.
// Sources: REH price list PDF (2026-08, client-provided) + rehtraining.co.za/courses scrape.
// price: "R650" string | null (null = "Request a Quote").
// popular: true = featured on home page.

export type Course = {
  name: string;
  duration: string;
  price: string | null;
  popular?: boolean;
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
    id: "working-at-heights",
    title: "Working at Heights & Fall Protection",
    blurb:
      "Scaffolding, fall arrest, rigging and confined space training for teams operating at height — the most requested courses in the industry.",
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
    id: "emergency-fire",
    title: "Emergency, First Aid & Fire Safety",
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
      "HAZMAT, dangerous goods handling, spill response and chemical safety for workplaces that move or store hazardous loads.",
    courses: [
      { name: "Controlling Hazardous & Dangerous Goods", duration: "1 Day", price: "R800" },
      { name: "Convey Dangerous Goods by Road", duration: "1 Day", price: "R800" },
      { name: "Chemical Hazards (HAZCHEM)", duration: "1 Day", price: null },
      { name: "Hazardous Materials Awareness", duration: "1 Day", price: null },
      { name: "Asbestos Awareness", duration: "1 Day", price: null },
      { name: "Dangerous Goods – Identification", duration: "1 Day", price: null },
      { name: "Respond to & Clean Up a Spill", duration: "1 Day", price: "R700" },
      { name: "Spill Training Workshop", duration: "1 Day", price: "R700" },
      { name: "Spill Kit Responder", duration: "1 Day", price: "R700" },
      { name: "Move & Store Hazardous Loads", duration: "1 Day", price: "R700" },
    ],
  },
  {
    id: "hand-power-tools",
    title: "Hand & Power Tools",
    blurb:
      "Safe operation of hand tools, power tools, grinders and cut-off saws — operator competence that protects people and plant.",
    courses: [
      { name: "Hand & Power Tools Safety", duration: "1 Day", price: "R800" },
      { name: "Power (Electrical) Tools", duration: "1 Day", price: "R700" },
      { name: "Manual (Hand) Tools", duration: "1 Day", price: "R700" },
      { name: "Grinders Operator", duration: "1 Day", price: "R700" },
      { name: "Chain Saw Operator", duration: "1 Day", price: "R800" },
      { name: "Cut-Off Saw Operator", duration: "1 Day", price: "R700" },
      { name: "Portable Power Tools", duration: "1 Day", price: "R700" },
    ],
  },
  {
    id: "civil-construction",
    title: "Construction & Civil Skills",
    blurb:
      "Practical construction skills training — bricklaying, formwork, steel fixing, concrete works, paving and roadworks.",
    courses: [
      { name: "Bricklaying", duration: "To Quote", price: null },
      { name: "Formwork", duration: "To Quote", price: null },
      { name: "Steel Fixing", duration: "To Quote", price: null },
      { name: "Concrete Works", duration: "To Quote", price: null },
      { name: "Surveying Techniques", duration: "To Quote", price: null },
      { name: "Roadworks", duration: "To Quote", price: null },
      { name: "Paving & Kerbs", duration: "To Quote", price: null },
      { name: "Road Signage & Markings", duration: "To Quote", price: null },
      { name: "Stormwater", duration: "To Quote", price: null },
    ],
  },
  {
    id: "plumbing",
    title: "Plumbing & Water Systems",
    blurb:
      "From general plumbing skills to hot water systems, drainage and solar water heating — theory and hands-on practice.",
    courses: [
      { name: "Plumbing General Skills", duration: "To Quote", price: null },
      { name: "Plumbing Safety & Legal Compliance", duration: "To Quote", price: null },
      { name: "Cold Water Plumbing Systems", duration: "To Quote", price: null },
      { name: "Hot Water Systems (Geysers & Boilers)", duration: "To Quote", price: null },
      { name: "Drainage & Rainwater Systems Installation", duration: "To Quote", price: null },
      { name: "Solar Water Heating Course", duration: "To Quote", price: null },
      { name: "Pipe Laying & Jointing", duration: "To Quote", price: null },
      { name: "Leak Detection & Basic Maintenance", duration: "To Quote", price: null },
    ],
  },
  {
    id: "machine-plant",
    title: "Machine & Plant Operator",
    blurb:
      "Operator training for forklifts, excavators, TLBs, cranes and earthmoving plant — licensing and competence for the modern site.",
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
    ],
  },
];

export const ALL_COURSES = COURSE_CATEGORIES.flatMap((c) =>
  c.courses.map((course) => ({ ...course, category: c.title, categoryId: c.id }))
);

export const POPULAR_COURSES = ALL_COURSES.filter((c) => c.popular);

export const COURSE_COUNT = ALL_COURSES.length;

export const REH_EMAIL = "info@rehtraining.co.za";

export function emailQuoteLink(courseName?: string): string {
  const subject = courseName
    ? `Training Quotation Request - ${courseName}`
    : "Training Quotation Request";
  return `mailto:${REH_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
