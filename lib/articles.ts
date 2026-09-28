/**
 * Article content store for RSTL Centre.
 *
 * GENERATED FILE - do not edit by hand. Regenerate with:
 *     python3 scripts/build-articles.py
 *
 * Source of truth is the reviewed markdown in the vault at
 * "REH Training/Articles/Drafts". Articles are only listed here once they have been
 * fact-checked against the regulatory notes and published to the site.
 *
 * Inline text uses two markdown-ish conventions, rendered by <InlineText>:
 *   [anchor text](/courses/some-course)  -> internal <Link>
 *   **emphasis**                          -> <strong>
 */

export type ArticleFaq = { q: string; a: string };

export type ArticleTable = { head: string[]; rows: string[][] };

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  table?: ArticleTable;
};

export type Article = {
  slug: string;
  title: string;
  /** Without the brand: the root layout title template appends " | RSTL Centre". */
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  /** Publication date, ISO. */
  date: string;
  readMinutes: number;
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  closingHeading: string;
  closing: string[];
  /** Courses mentioned in the copy, for the related-links block. */
  courseLinks: { href: string; label: string }[];
};

export const ALL_ARTICLES: Article[] = [
  {
    slug: "safety-training-mthatha",
    title: "Safety Training in Mthatha: What Local Employers Actually Need in 2026",
    metaTitle: "Safety Training in Mthatha: Employer Guide",
    metaDescription: "Safety training in Mthatha by employer type: construction, retail, government, health, education and forestry, plus the legal duty each sector carries.",
    primaryKeyword: "safety training mthatha",
    secondaryKeywords: ["health and safety training mthatha", "safety courses mthatha", "training centre mthatha", "SHE Rep course Mthatha"],
    category: "Mthatha",
    date: "2026-09-10",
    readMinutes: 7,
    excerpt: "A sector by sector guide to safety training in Mthatha, covering the legal duty each local employer carries and the course most of them book.",
    intro: [
      "Safety training in Mthatha is mostly booked through providers from other provinces, and the wait for a class date shows it. The duty sits with the employer, not the trainer, so every business in the OR Tambo District carries an obligation whether or not a suitable provider is nearby.",
      "That mismatch costs time. A construction team cannot start on a site without a fall protection plan and trained people behind it. A retail floor needs a first aider readily available during working hours. A contractor chasing municipal work needs accreditation letters and certificates attached to the tender.",
      "RSTL Centre runs three training centres, one of them in Mthatha, and delivers daily classes at a centre, on site, or online where the course allows. This guide sets out which local employers need which training, what the law asks of each, and how to book.",
    ],
    closing: [
      "To book SHE Rep, first aid, working at heights or any other course, email the branch through the [contact page](/contact) and the team will confirm a date. Start with the [full course list](/courses) if you are not sure which course fits, or go straight to the [SHE Rep course](/courses/health-and-safety-representative) that most Mthatha employers book first.",
    ],
    sections: [
      {
        heading: "Which Mthatha employers carry a legal training duty",
        paragraphs: [
          "Every employer in the district falls under the Occupational Health and Safety Act, but the specific duty turns on headcount and sector. Once a business passes 20 employees it must designate health and safety representatives in writing, and any workplace with more than 10 employees must keep a trained first aider readily available.",
          "Government, retail, health, education and services employ most of the Mthatha workforce. Construction employs roughly 10% of it, yet carries the heaviest set of obligations, because the Construction Regulations add appointments, plans and competent persons on top of the general Act.",
          "The practical result is that a retail group with 200 staff and a road contractor with 40 staff can end up booking the same SHE Rep course, but for different reasons and against different deadlines. Knowing which category you fall into is the first step.",
        ],
      },
      {
        heading: "What the law asks of construction employers",
        paragraphs: [
          "A construction contractor has to show far more than attendance registers. Under the Construction Regulations a fall protection plan is compulsory wherever there is a fall risk, scaffolding work needs a competent person appointed in writing, and machine operators must be trained and certificated.",
          "The N2 Wild Coast Road has pulled a large contractor presence into the region. Package Four is led by the WBHO-Edwin Construction Joint Venture and Package Five by the WBHO-H&I Joint Venture, and SANRAL ran a contractor development programme session in Mthatha for local firms. Subcontractors working under those main contractors inherit the same proof requirements.",
          "The district water and sanitation programme compounds it. With about 122 projects running, the civil tender documents require contractors to run a quarterly training needs analysis, so the training plan has to be documented and refreshed rather than done once at the start of a contract. [Working at Heights](/courses/working-at-heights) and [scaffolding erector](/courses/scaffolding-erector) are the courses this sector books most.",
        ],
      },
      {
        heading: "What the law asks of retail, government, health and education",
        paragraphs: [
          "Public sector buyers in Mthatha purchase safety training directly. The Eastern Cape Department of Public Works and Infrastructure issued quotation ORT5-25/26-0017 for the training of 34 employees on health and safety (SHE Rep) across the O.R. Tambo District over three days.",
          "Headcount drives the rest. OR Tambo District has 652 schools on record, plus a large early childhood development sector, and each school with more than 10 employees needs a trained first aider on site. Nelson Mandela Academic Hospital, Walter Sisulu University with about 30,000 students and 1,800 staff, King Sabata Dalindyebo Local Municipality and OR Tambo District Municipality all run representative structures under the Act.",
          "Retail carries a different ratio. In shops and offices the rule is one representative per 100 employees, so the Mall of Mthatha retail cluster needs fewer representatives per head than a warehouse of the same size, though it still needs [first aid cover](/courses/first-aid-level-1) and evacuation training that suit a public building. Government departments and larger employers usually add the [OHS Act course](/courses/ohs-act) for their safety staff.",
        ],
      },
      {
        heading: "What the law asks of agriculture, forestry and industry",
        paragraphs: [
          "Agriculture and forestry fall into the \"other workplace\" category, where the representative ratio is tighter at one per 50 employees, and where machinery training becomes the main cost line. Chain saw operators and tractor drivers need operator training, and the sawmill and forestry operations around Langeni and Singisi fall into that bracket.",
          "Industrial employers cluster at Vulindlela Heights Industrial Park, where about 866 people are employed across the tenants. Transkei Quarries' Mthatha Quarry adds a further layer, with drilling, crushing and mobile plant that all call for competent operators and documented medical fitness.",
          "Every one of these workplaces, whatever the sector, also needs the general building blocks: a risk assessment, an incident reporting process, and people who know what to do when something goes wrong. On a forestry or agricultural site, [chain saw operator training](/courses/chain-saw-operator) is usually the first booking.",
        ],
      },
      {
        heading: "Training by employer type",
        paragraphs: [
          "The training a Mthatha employer actually books follows the sector. Construction buys heights and scaffolding certificates, retail and government buy the SHE Rep course and first aid, and forestry buys machine operator training. The table below maps each type of employer to the trigger that applies and the courses usually booked, with RSTL Centre's published prices.",
        ],
        table: {"head": ["Employer type", "Typical trigger", "Training usually booked", "RSTL price"], "rows": [["Construction contractor", "Any site with a fall risk", "Working at Heights, Fall Protection Planning, Scaffolding Erector or Inspector", "R700 each"], ["Retail group or shopping centre", "More than 20 staff", "SHE Rep, First Aid Level 1, Emergency Evacuation", "R600, R650, R650"], ["Government department or municipality", "More than 20 staff", "SHE Rep, OHS Act, Risk Assessment (HIRA)", "R600, R650, R700"], ["Clinic, hospital or care centre", "More than 10 staff", "First Aid Level 1 or 2, Basic Firefighting", "R650 each"], ["School or crèche", "More than 10 staff", "First Aid Level 1, Basic Firefighting, Evacuation", "R650 each"], ["Sawmill, forestry or farm", "More than 20 staff", "Chain Saw Operator, Hand and Power Tools, First Aid", "R1250, R800, R650"], ["Quarry or industrial plant", "Mobile plant on site", "Forklift or TLB Operator, Working at Heights, Incident Investigation", "R1500, R4500, R700"]]},
      },
      {
        heading: "Why local employers wait longer than they should",
        paragraphs: [
          "Search for health and safety training in Mthatha and the results are dominated by national providers with no branch in the Eastern Cape. The searches are being answered from other provinces, so a local employer who books online waits for a trainer to travel down, or sends staff away for a week.",
          "That delay is avoidable when the provider already has a centre in town. RSTL Centre trains Monday to Friday, 08:00 to 16:30, with Saturday classes by arrangement, and runs daily classes with no waiting period. On site delivery suits teams that cannot leave the premises, and blended or online delivery is offered where the course has no practical component.",
        ],
      },
      {
        heading: "Where RSTL Centre trains in Mthatha",
        paragraphs: [
          "The Mthatha branch is at 1st Floor, Old Mutual Building, Cnr York Road and Leeds Road, Mthatha, on 078 045 2852. It sits alongside the head office at 14 Douglas Road, Glen Austin, Midrand, on 010 746 6954 or 061 580 7967, and the Durban centre at 62 Lilian Ngoyi Street, Windermere, Durban, on 076 934 6783.",
          "Local employers can book any course at the Mthatha branch, and staff from Butterworth, Libode, Ngqeleni, Qumbu and Mount Frere can travel in for a class without crossing a provincial border. The full course list is on the [courses page](/courses), and the centre also runs occupational medicals through [medicals](/medicals).",
          "Training can be delivered in isiXhosa where the site expects it, which matters on construction and municipal work around the district.",
        ],
      },
    ],
    faqs: [
      { q: "What safety training do Mthatha employers need most?", a: "The most common bookings in the district are the one day SHE Rep course, First Aid Level 1, and Working at Heights. Construction contractors add fall protection planning and scaffolding, while schools and clinics concentrate on first aid and firefighting. The right mix always starts with a risk assessment of the specific site." },
      { q: "How many SHE Reps does my Mthatha business need?", a: "A workplace with more than 20 employees must appoint representatives in writing. The minimum is one per 100 employees in shops and offices, and one per 50 employees in other workplaces. The appointment has to happen within four months of passing 20 employees." },
      { q: "Is safety training available on site in Mthatha?", a: "Yes. RSTL Centre delivers courses at its Mthatha centre, on site at the client's premises, or online where the course has no practical component. Machine and practical courses such as forklift, TLB and working at heights have to be delivered in person." },
      { q: "How much does safety training cost in Mthatha?", a: "RSTL Centre publishes its prices. The one day SHE Rep course is R600, First Aid Level 1, 2 or 3 is R650 each, Working at Heights, Fall Protection Planning and both scaffolding courses are R700 each, and the ten day Safety Officer Skills Programme is R7,900." },
      { q: "Do municipal tenders require accredited training?", a: "OR Tambo District Municipality requires accreditation letters as a mandatory condition on its training quotations. Buyers should verify a provider's accreditation before booking, and RSTL Centre states its accreditation on its course pages." },
      { q: "How soon can staff be trained?", a: "RSTL Centre runs daily classes with no waiting period, Monday to Friday from 08:00 to 16:30, with Saturday classes by arrangement. Booking is by email through the contact page, and a team can usually be placed quickly." },
      { q: "Which courses matter for contractors on the N2 Wild Coast Road?", a: "Working at Heights, Fall Protection Planning, Scaffolding Erector and Scaffolding Inspector are the courses main contractors ask for. Subcontractors also need a documented training plan, because the district's civil tenders require a quarterly training needs analysis." },
    ],
    closingHeading: "Book your Mthatha safety training",
    courseLinks: [
      { href: "/courses/working-at-heights", label: "Working at Heights" },
      { href: "/courses/scaffolding-erector", label: "scaffolding erector" },
      { href: "/courses/first-aid-level-1", label: "first aid cover" },
      { href: "/courses/ohs-act", label: "OHS Act course" },
      { href: "/courses/chain-saw-operator", label: "chain saw operator training" },
      { href: "/courses/health-and-safety-representative", label: "SHE Rep course" },
    ],
  },
  {
    slug: "incident-investigation-report-template-south-africa",
    title: "Incident Investigation Report Template: What a South African Report Must Contain",
    metaTitle: "Incident Investigation Report: SA Requirements",
    metaDescription: "A South African incident investigation report, from the first hour on scene to signed findings, plus COIDA's 7 day and 14 day duties for employers in SA.",
    primaryKeyword: "incident investigation report template south africa",
    secondaryKeywords: ["incident investigation report example", "incident investigation report format", "accident investigation report", "incident investigation course"],
    category: "Compliance",
    date: "2026-09-28",
    readMinutes: 7,
    excerpt: "What a South African incident investigation report must contain, from the first hour on scene to signed findings, plus COIDA's 7 day and 14 day reporting duties.",
    intro: [
      "Search for an incident investigation report template south africa and most of what comes back was written for another country. American and Canadian formats dominate the results, and their forms, duties and deadlines belong to their own regulators. A South African investigation answers to South African law, and the report has to reflect that.",
      "An investigation is not a hunt for somebody to blame. It is how a workplace finds out what actually caused an incident, stops the same thing happening again, protects its legal position, and gives a Compensation Fund claim the evidence it needs.",
      "The difference between a report that holds up and one that falls apart is usually the first hour on scene and the way the causes are separated at the end.",
    ],
    closing: [
      "The [Accident and Incident Investigation course](/courses/accident-and-incident-investigation) runs one day and costs R700. The [COIDA course](/courses/coida) runs one day at R650 and covers the reporting duties and the Compensation Fund process. [Risk Assessment HIRA](/courses/risk-assessment-hira) at R700 shows how to find the hazards the report will measure the site against.",
      "RSTL Centre runs these courses at its Midrand, Durban and Mthatha centres and on site nationally, Monday to Friday, 08:00 to 16:30, with Saturday sessions by arrangement. See the full list on the [courses page](/courses) and send your booking through the [contact page](/contact).",
    ],
    sections: [
      {
        heading: "Why Investigate an Incident at All",
        paragraphs: [
          "An investigation has four jobs. It finds the cause of the incident, it prevents a repeat, it protects the employer's legal position, and it supports a COIDA claim for the injured person. A report that does all four is a working document. A report written to look good in a file does none of them.",
          "Finding the cause comes first, because everything else follows from it. A workplace that knows the immediate cause and the root cause can fix both. One that stops at the immediate cause will meet the same problem again on another shift, in another area, with another person.",
          "The legal position matters more than most employers realise. A complete, dated and signed report is evidence that the employer ran a proper system. The COIDA link is practical too: the claim for an injury on duty needs the facts recorded while they are still fresh.",
        ],
      },
      {
        heading: "What to Do in the First Hour",
        paragraphs: [
          "In the first hour, make the area safe and get the injured person medical care. Then secure the scene, note who was there, photograph the position of equipment and people before anything is moved, and record the conditions at the time. Notify the people who need to know, and do not start working out whose fault it was.",
          "Equipment often has to be moved to reach someone, and that is fine. Photograph and mark the position first, then move it. Write down the time of the incident and the time help arrived.",
          "Check the reporting clock as well. An injury on duty must be reported to the Compensation Fund within 7 days of the employer receiving notice of it, so the report starts from the moment the employer is told.",
        ],
      },
      {
        heading: "How to Gather Evidence and Interview Witnesses",
        paragraphs: [
          "Evidence gathering should be broad and careful. Take photographs and sketches, keep the equipment involved, and collect the documents that describe the task: the risk assessment, training records, medical records, maintenance records and inspection logs. Interview witnesses separately and soon, ask open questions, and write their answers in their own words. Never put the answer inside the question.",
          "Leading a witness is the easiest mistake to make. Asking whether the guard was missing tells the witness what you expect to hear. Asking them to describe what they saw lets them tell you. The two questions produce very different statements, and only one of them survives scrutiny.",
          "Keep witnesses apart until each has given an account, so their memory does not merge with someone else's. Where accounts contradict each other, record the contradiction rather than smoothing it over. A written statement should be dated and signed by the witness, in their words, not yours.",
        ],
      },
      {
        heading: "Immediate Cause and Root Cause",
        paragraphs: [
          "The immediate cause is the event that produced the injury: the fall, the contact, the release, the slip. The root cause is the condition that allowed that event to happen: an unguarded opening, a task with no risk assessment, training that did not cover the method, a maintenance failure, or supervision that was not there. The report needs both.",
          "A worker falls through an open floor hatch. The immediate cause is the fall through an unguarded opening. The root cause is that the opening was never barricaded, nobody checked, and the risk assessment had not identified the hatch as a fall risk at all. Fixing the barricade addresses the immediate cause. Fixing the inspection routine and the risk assessment addresses the root cause.",
          "A report that lists only the immediate cause will produce the same incident again at the next opening. That is the reason the root cause section carries the most weight when an inspector, a client or a compensation forum reads the file.",
        ],
      },
      {
        heading: "Writing Findings That Will Stand Up",
        paragraphs: [
          "Findings stand up when they are factual, dated, attributable and free of blame. State what was observed, who observed it and when. Keep evidence separate from conclusions, and label anything that is an opinion. Name conditions and systems rather than a person as the cause, then attach the corrective actions that follow.",
          "Keep the report in the safety file, and add an addendum rather than editing the original if new information arrives. A version history is easier to defend than a document that quietly changed.",
        ],
      },
      {
        heading: "The Section by Section Structure of a South African Report",
        paragraphs: [
          "A South African report follows a fixed order. It opens with the incident details and the people involved, sets out what happened, records the evidence and the witness statements, separates the immediate cause from the root cause, reviews the risk assessment that was in place, then lists corrective actions with owners and dates, and closes with signatures.",
          "There is no single prescribed South African form for every workplace, so the structure below is a model you can build in a word processor or a spreadsheet. What matters is that each section appears and that the report is signed.",
        ],
        table: {"head": ["Section", "What belongs in it"], "rows": [["Incident details", "Date, time, location, site or department, reporter, incident number"], ["People involved", "Injured person, witnesses, supervisor, first aider, treatment given"], ["What happened", "A factual sequence in plain language, with no blame"], ["Scene and conditions", "Weather, lighting, surfaces, housekeeping, guarding, equipment state"], ["Evidence gathered", "Photographs, sketches, the equipment involved, documents and records"], ["Witness statements", "Each witness's account, in their own words, dated and signed"], ["Immediate cause", "The event that produced the injury"], ["Root cause", "The condition or system failure that allowed it"], ["Risk assessment in place", "What the risk assessment said about the task, and whether it was followed"], ["Corrective actions", "Action, owner, due date, and how completion was verified"], ["Notifications and reporting", "Who was notified, when, and any Compensation Fund report"], ["Sign off", "Investigator, health and safety representative, employer, date"]]},
      },
      {
        heading: "COIDA Reporting and the Penalties That Apply",
        paragraphs: [
          "An injury on duty must be reported to the Compensation Fund within 7 days of the employer receiving notice of it, and an occupational disease within 14 days of receiving notice. Claims go through the Compensation Fund's online claim system, and the claim number is generated once the injury is reported and the information uploaded.",
          "Failing to report carries legal risk. Under section 38 of the OHS Act, a general offence carries a maximum fine of R50 000 or imprisonment of up to 1 year, or both. An act causing injury or death, judged on the culpable homicide standard, carries a maximum fine of R100 000 or imprisonment of up to 2 years, or both. These are the maximums under the 1993 principal Act, and the OHS Amendment Bill proposes increases but is not yet law.",
        ],
      },
    ],
    faqs: [
      { q: "What must a South African incident investigation report contain?", a: "It must cover the incident details, the people involved, a factual account of what happened, the scene and conditions, the evidence gathered, the witness statements, the immediate cause, the root cause, the risk assessment that was in place, corrective actions with owners and dates, and a signed sign off." },
      { q: "How soon must an injury on duty be reported?", a: "An injury on duty must be reported to the Compensation Fund within 7 days of the employer receiving notice of it. The claim is submitted through the Compensation Fund's online claim system, and the claim number is generated once the injury is reported and the information uploaded." },
      { q: "How soon must an occupational disease be reported?", a: "An occupational disease must be reported within 14 days of the employer receiving notice. That is a longer window than an injury on duty, which is 7 days. Both are employer duties, so the clock starts when the employer is told, not when the condition itself began." },
      { q: "What is the difference between immediate cause and root cause?", a: "The immediate cause is the event that produced the injury, such as a fall or contact with machinery. The root cause is the condition that allowed it, such as an unguarded opening, missing training or an inspection that never happened. A useful report names both." },
      { q: "Who should carry out the investigation?", a: "The person leading it needs to know the work and be able to question it without protecting a supervisor. Many workplaces use a small team: a supervisor from the area, a health and safety representative, and someone from outside the department. That mix reduces the risk of a narrow conclusion." },
      { q: "What are the penalties for an OHS Act offence?", a: "Under section 38 of the 1993 principal Act, a general offence carries a maximum fine of R50 000 or up to one year in prison, or both. An act causing injury or death carries a maximum fine of R100 000 or up to two years, or both. The OHS Amendment Bill proposes increases but is not yet law." },
      { q: "Should witness statements be signed?", a: "Yes. A statement should be in the witness's own words, dated, and signed by them. Read it back to confirm it is accurate, and never ask a witness to sign a version you rewrote. Signed statements carry far more weight if the matter is later challenged." },
    ],
    closingHeading: "Book Incident Investigation Training With RSTL Centre",
    courseLinks: [
      { href: "/courses/accident-and-incident-investigation", label: "Accident and Incident Investigation course" },
      { href: "/courses/coida", label: "COIDA course" },
      { href: "/courses/risk-assessment-hira", label: "Risk Assessment HIRA" },
    ],
  },
  {
    slug: "how-to-become-a-safety-officer-south-africa",
    title: "How to Become a Safety Officer in South Africa: Routes, Cost and Time (2026)",
    metaTitle: "How to Become a Safety Officer in South Africa",
    metaDescription: "Compare the short course route and the formal qualification route to a safety officer career in South Africa, with costs, timeframes and what employers want.",
    primaryKeyword: "how to become a safety officer in south africa",
    secondaryKeywords: ["requirements to become a safety officer", "how long does it take to be a safety officer", "safety officer course", "safety officer skills programme"],
    category: "Careers",
    date: "2026-09-28",
    readMinutes: 8,
    excerpt: "The short course route and the formal qualification route to becoming a safety officer in South Africa, compared on time, cost, entry requirements and who each one suits.",
    intro: [
      "How to become a safety officer in South Africa depends on where you are starting. One person arrives after ten years on site and needs to formalise what they already do. Another is a school leaver choosing a career from scratch. Those two people need different routes, and honest advice says so rather than pushing whichever option the adviser happens to sell.",
      "There are two real routes. One is a set of short courses you build up over successive weeks. The other is a multi year qualification at a university or a TVET college. Both lead to safety work, and they suit different jobs and different people.",
      "Choosing between them is mostly a question of time, money and where you are starting from.",
    ],
    closing: [
      "The [Safety Officer Skills Programme](/courses/safety-officer-skills-programme) runs 10 days at R7,900 and is the natural starting point for anyone moving into the role. Most learners begin with the [OHS Act course](/courses/ohs-act) at R650 and [SHE Rep](/courses/health-and-safety-representative) at R600, then build from there. See the full list on the [courses page](/courses) and send your enquiry through the [contact page](/contact).",
      "RSTL Centre trains at its Midrand, Durban and Mthatha centres and on site nationally, Monday to Friday, 08:00 to 16:30, with Saturday sessions by arrangement.",
    ],
    sections: [
      {
        heading: "The Two Routes Into Health and Safety Work",
        paragraphs: [
          "The short course route builds competence one topic at a time, and it suits someone already working who wants to formalise their role or move into a safety position. The formal route is a multi year qualification at a university or a TVET college, and it suits school leavers and people aiming at senior or specialist roles.",
          "Both routes are legitimate, and neither is a shortcut around the other. The short route gets you useful on day one, because the topics map directly onto the tasks a safety officer handles in a normal week. The formal route gives you depth, theory and a qualification that opens doors in larger organisations and specialist fields.",
          "An employer mixing a night shift, a construction site and a retail floor will take a capable person with practical short course training. A mining house or a large state enterprise may insist on a full qualification for the same title. Know which of those employers you are aiming at before you spend the money.",
        ],
      },
      {
        heading: "Route One: The Short Course Route",
        paragraphs: [
          "The short course route starts with the OHS Act, one day at R650, then SHE Rep, one day at R600, Risk Assessment HIRA, one day at R700, Accident and Incident Investigation, one day at R700, and COIDA, one day at R650. The final step is the Safety Officer Skills Programme, which runs 10 days at R7,900.",
          "Each course is one day, which is the point. You can build the set over successive weeks without leaving your job, and each one has value on its own. The OHS Act gives you the framework, SHE Rep shows you how the workplace structure works, HIRA teaches you to assess risk, and the investigation and COIDA courses cover what happens after something goes wrong.",
          "The Safety Officer Skills Programme pulls those pieces together across 10 days. It suits a working person who is already carrying safety duties informally, or who wants to move into a safety role from a supervisory or maintenance background.",
        ],
      },
      {
        heading: "Route Two: The Formal Qualification Route",
        paragraphs: [
          "The formal route is a multi year qualification at a university or a TVET college. Study runs over years rather than days, and the entrance requirements are set by the institution, usually starting with a school leaving qualification. It suits a school leaver, and it suits someone aiming at a senior or specialist role.",
          "Published prices seen in search results on 10 September 2026 give a rough picture of the market. Unisa lists R7,200, iQ Academy lists R9,900, and SafetyCloud lists R4,140 for a programme. These are published prices from the providers at that date, not a survey and not an average, and they change.",
          "The formal route takes longer before you are working in the field, and it costs more overall. What it buys is a credential that carries weight in sectors where a qualification is a hiring condition rather than a preference.",
        ],
      },
      {
        heading: "Comparing the Two Routes",
        paragraphs: [
          "The table below compares the two routes on the four things people ask about first: time, cost, entry requirements and who each one suits. Read it against your own situation, because the honest answer for a working parent is often different from the answer for a school leaver.",
          "Costs and durations change, so confirm current figures with the provider or institution before you commit.",
        ],
        table: {"head": ["Route", "Time", "Cost", "Entry requirements", "Who it suits"], "rows": [["Short course route", "One day per course; the Safety Officer Skills Programme runs 10 days", "OHS Act R650, SHE Rep R600, Risk Assessment HIRA R700, Accident and Incident Investigation R700, COIDA R650, and the Safety Officer Skills Programme R7,900", "Basic literacy and numeracy, with no prior qualification needed", "People already working who want to formalise their role or move into a safety position"], ["Formal qualification route", "A multi year programme at a university or TVET college", "Published prices seen in search results on 10 September 2026 include Unisa at R7,200, iQ Academy at R9,900 and SafetyCloud at R4,140 for a programme", "A school leaving qualification, plus the institution's own admission rules", "School leavers, and people aiming at senior or specialist roles"]]},
      },
      {
        heading: "What Employers Actually Look For",
        paragraphs: [
          "Employers look for someone who can read the OHS Act and apply it on a real site, run a risk assessment, investigate an incident properly, keep records that survive an audit, and communicate with both a crew and a manager. A certificate earns the interview. The ability to do those five things earns the job.",
          "Practical extras carry weight too. Valid first aid training helps, because the officer is often the first trained person on the floor. Basic computer literacy matters, because safety files, registers and reports now live in files rather than filing cabinets. Experience in the sector the employer operates in, even from an unrelated role, is often worth more than an extra certificate.",
          "Softer skills are not soft in this job. A safety officer who cannot get a supervisor to change a habit will fail at it no matter how good the paperwork is. Being able to explain why a fix matters, without turning it into a fight, is a real requirement.",
        ],
      },
      {
        heading: "What Your First Year Actually Looks Like",
        paragraphs: [
          "The first year is mostly records, inspections and follow up. You keep the safety file current, do routine inspections, arrange medicals and training, sit in on investigations, and chase corrective actions that other people own. You will spend more time on paperwork than on stopping dramatic hazards on the floor.",
          "That is not a disappointment, it is the foundation. Once you know the records and the workplace, you get pulled into risk assessments, planning and contractor checks. The officers who last are the ones who treated the first year as learning the site rather than waiting for a title.",
        ],
      },
      {
        heading: "Check the Cost and Duration Before You Commit",
        paragraphs: [
          "Costs and durations change, so confirm current figures with the provider before you commit. The RSTL Centre course prices above are its published prices, and the formal route figures are published prices seen in search results on 10 September 2026. Treat both as a starting point and ask for a current quote or an updated fee schedule.",
        ],
      },
    ],
    faqs: [
      { q: "How do I become a safety officer in South Africa?", a: "You can take the short course route, starting with the OHS Act, SHE Rep, Risk Assessment HIRA, Accident and Incident Investigation and COIDA, then the Safety Officer Skills Programme. Or you can complete a multi year qualification at a university or TVET college. The right route depends on your situation." },
      { q: "Do I need matric to become a safety officer?", a: "Not for the short course route, which asks only for basic literacy and numeracy. A formal qualification at a university or TVET college does expect a school leaving qualification and applies its own admission rules. Check the specific institution before you apply." },
      { q: "How long does it take to become a safety officer?", a: "On the short course route, each course is one day, and the Safety Officer Skills Programme runs 10 days, so a working person can build the set over successive weeks. The formal route runs over multiple years. How quickly you can start working depends on the route and the jobs you apply for." },
      { q: "Can I become a safety officer without experience?", a: "You can start training without it, and many people move into safety from supervisory, maintenance or plant roles. What hiring managers weigh is your practical ability to do the work, so short course training plus any site experience is a stronger combination than training alone." },
      { q: "What is the Safety Officer Skills Programme?", a: "It is RSTL Centre's 10 day programme at R7,900. It builds on the individual short courses, including the OHS Act, SHE Rep, Risk Assessment HIRA, Accident and Incident Investigation and COIDA, and pulls them into a single programme for people moving into a safety role." },
      { q: "Is a short course enough, or do I need a diploma?", a: "It depends on the employer. Short course training is enough for many workplaces, especially smaller operations and contractor roles. A formal qualification carries more weight in large organisations and specialist fields where a diploma is a hiring condition rather than a preference." },
      { q: "Will the course get me a job?", a: "No course can promise a job, and anyone who does is overselling. Training gives you the knowledge and the certificate that employers ask about. Getting hired also depends on experience, the sector, your communication skills and the market at the time." },
    ],
    closingHeading: "Book Safety Officer Training With RSTL Centre",
    courseLinks: [
      { href: "/courses/safety-officer-skills-programme", label: "Safety Officer Skills Programme" },
      { href: "/courses/ohs-act", label: "OHS Act course" },
      { href: "/courses/health-and-safety-representative", label: "SHE Rep" },
    ],
  },
  {
    slug: "coida-claim-process-employers",
    title: "COIDA Claim Process for Employers: What to Do After a Workplace Injury",
    metaTitle: "COIDA Claim Process for Employers: Step by Step",
    metaDescription: "The COIDA claim process for employers, step by step: the 7 day injury reporting deadline, the claim number, the records to keep and the W.As.8 deadline.",
    primaryKeyword: "coida claim process",
    secondaryKeywords: ["how to claim from coida", "report injury on duty", "coida claim", "compensation fund"],
    category: "Compliance",
    date: "2026-09-28",
    readMinutes: 7,
    excerpt: "An employer must report an injury on duty to the Compensation Fund within 7 days, and an occupational disease within 14 days. Here is the process and the deadlines that matter.",
    intro: [
      "The COIDA claim process begins with a deadline almost no employer hears about until it has passed. An employer must report an injury on duty to the Compensation Fund within 7 days of receiving notice of it. An occupational disease must be reported within 14 days.",
      "That rule sits inside a 53 page government booklet, which is why it stays hidden. Most employers only find it when an employee is already at a clinic and someone is asking for paperwork.",
      "This guide walks through the process from the employer side. It covers the day of the injury, the medical care, the online report, the claim number, the records to keep, and the annual paperwork that keeps the account in good standing.",
    ],
    closing: [
      "If your team handles injuries without a clear process, the fix is training rather than paperwork. RSTL Centre runs [COIDA](/courses/coida) for one day at R650 and [Accident and Incident Investigation](/courses/accident-and-incident-investigation) for one day at R700. We train at our centres in Midrand, Durban and Mthatha, or on site at your premises anywhere in the country, so a whole team can be brought up to the same standard in one visit. See the full [course list](/courses) or [contact us](/contact) to book, and if your supervisors need the wider legal framework first, the [OHS Act course](/courses/ohs-act) is the natural starting point.",
    ],
    sections: [
      {
        heading: "What to do on the day of an injury",
        paragraphs: [
          "Your first duty on the day of an injury is the safety of the person, not the paperwork. Get the employee to the right medical care, make the scene safe, and record what happened and when. Then start the clock, because the 7 day reporting period runs from the moment you receive notice.",
          "Notice arrives in several ways. The employee tells a supervisor, a colleague reports it, or a clinic phones the site. All of them count. The moment someone with authority in your business knows about the injury, the deadline is live.",
          "Write down the basics immediately while they are fresh. Take the employee name and job, the time and place, the task being performed, who witnessed it, and which part of the body was injured. This becomes the raw material for both the report to the Fund and your own investigation.",
          "Do not wait for the full picture before you act. Treat the employee first, then assemble the facts in the order they arrive.",
        ],
      },
      {
        heading: "Reporting the injury to the Compensation Fund",
        paragraphs: [
          "Claims are reported through the Compensation Fund online claim system. The claim number is generated once the injury is reported and the information uploaded. Keep that number safe, because every medical account, follow up and query ties back to it.",
          "The system needs your registration details, the employee particulars, the date and nature of the injury, and the medical information that follows. If the business is not registered, the report cannot be processed. That is the second reason registration matters from day one.",
          "An employer must register with the Compensation Fund within 7 days of employing a first employee. Small businesses often treat registration as something to do later. It is not. Until you are registered, there is no account for a claim to land on.",
          "The same discipline applies to an occupational disease, where the period is 14 days from receiving notice. Conditions that develop over time, such as hearing loss or a respiratory illness linked to the workplace, fall into this category.",
        ],
      },
      {
        heading: "The deadlines that matter",
        paragraphs: [
        ],
        table: {"head": ["What must happen", "Deadline"], "rows": [["Register with the Compensation Fund", "Within 7 days of employing a first employee"], ["Report an injury on duty", "Within 7 days of receiving notice"], ["Report an occupational disease", "Within 14 days of receiving notice"], ["Submit the Return of Earnings (W.As.8)", "Not later than 31 March"], ["Pay the assessment", "Within 30 days of invoice"], ["Penalty if the account is not settled", "10%"]]},
      },
      {
        heading: "What the employee is entitled to",
        paragraphs: [
          "COIDA exists to compensate employees who are injured on duty or who contract an occupational disease because of their work. The claim is assessed and paid by the Fund rather than by the employer directly, which is exactly why the reporting duties sit with you.",
          "What an individual claim is worth is set by the Act and determined by the Fund. Do not guess at a figure in front of an employee, and do not promise an amount. Tell the employee that a claim has been lodged, give them the claim number, and let the Fund process it.",
          "Your job is to make the claim easy to work through. A clean report, correct details and prompt medical paperwork do far more for the employee than any estimate you could offer on the day.",
        ],
      },
      {
        heading: "The Return of Earnings and the assessment",
        paragraphs: [
          "The Return of Earnings form, W.As.8, is due not later than 31 March. It declares your payroll so the Fund can calculate what you owe for the year, and it has to be filed even in a year with no injuries at all.",
          "Once the assessment is issued, payment is due within 30 days of invoice. If the account is not settled, a 10% penalty applies. That penalty is avoidable, and the businesses that pay it are usually the ones that filed late and then let the invoice sit.",
          "Treat the Return of Earnings as a diary item rather than a January surprise. Reconcile your payroll figures before the deadline and file early enough that a query can still be answered.",
        ],
      },
      {
        heading: "Why the incident investigation report makes the claim simple",
        paragraphs: [
          "A competent incident investigation is what turns a messy event into a claim that moves. The report explains what happened, why it happened and what changed afterwards, in a form that still reads clearly months later. It is the record the Fund, the insurer and your own safety file all lean on.",
          "Where no investigation exists, the report to the Fund leans on memory and assumption. Details drift, witnesses move on, and the claim gets queried. Where a proper investigation was done, the facts are already written down and dated.",
          "Accident and Incident Investigation is a one day course at R700. Employers who send a supervisor or safety officer on it usually find the COIDA side becomes routine, because the same report serves the Fund, the insurer and the internal record.",
        ],
      },
      {
        heading: "What happens if reporting is late",
        paragraphs: [
          "Late reporting does not make the injury disappear, but it makes everything harder. The employee waits longer, the medical accounts pile up, and the Fund has more reason to query an event it hears about weeks after it happened. It also puts a strain on the relationship with the employee who was hurt.",
          "The practical fix is a simple internal rule. Any injury that needs more than basic first aid goes to the employer nominated person the same day, and that person starts the report immediately rather than waiting for the week to end.",
        ],
      },
    ],
    faqs: [
      { q: "How long does an employer have to report an injury on duty?", a: "Seven days from receiving notice of the injury. The clock starts when someone in the business learns about it, not when the injury occurred. Report through the Compensation Fund online claim system and keep the confirmation." },
      { q: "How long does an employer have to report an occupational disease?", a: "Fourteen days from receiving notice. Occupational diseases develop over time, so the trigger is the point at which the employer becomes aware of the condition link to work, not the first day of exposure." },
      { q: "When must a business register with the Compensation Fund?", a: "Within 7 days of employing a first employee. Registration creates the account that any future claim attaches to, so it should be done before the first person starts work rather than at the first injury." },
      { q: "What is a claim number and when is it generated?", a: "The claim number is the reference the Fund creates for the claim. It is generated once the injury is reported and the information uploaded on the online claim system. Every medical account and query is tied to it." },
      { q: "When is the Return of Earnings due and what is the penalty?", a: "The Return of Earnings form, W.As.8, is due not later than 31 March. The assessment is payable within 30 days of invoice. A 10% penalty applies if the account is not settled." },
      { q: "What happens if the report is late?", a: "The claim is delayed and more likely to be queried, and the employee waits longer for the Fund to process it. Late reporting also leaves an obvious weakness in your records if the matter is examined later." },
      { q: "What records should an employer keep for a COIDA claim?", a: "Keep the notice of injury, the investigation report, medical reports, the uploaded claim details, the claim number correspondence, the Return of Earnings, and proof of assessment payment. Store them together so the file can be produced in one place." },
    ],
    closingHeading: "Book COIDA and incident investigation training",
    courseLinks: [
      { href: "/courses/coida", label: "COIDA" },
      { href: "/courses/accident-and-incident-investigation", label: "Accident and Incident Investigation" },
      { href: "/courses/ohs-act", label: "OHS Act course" },
    ],
  },
  {
    slug: "health-and-safety-training-cost-south-africa",
    title: "How Much Does Health and Safety Training Cost in South Africa? (2026 Guide)",
    metaTitle: "What Health and Safety Training Costs in SA",
    metaDescription: "How much does safety training cost in South Africa in 2026? Real published prices, what makes quotes differ, and how to read a training quote properly.",
    primaryKeyword: "how much does safety training cost",
    secondaryKeywords: ["health and safety course prices south africa", "safety officer course price", "first aid course price", "safety training prices"],
    category: "Cost",
    date: "2026-09-28",
    readMinutes: 8,
    excerpt: "Real published South African safety training prices for 2026, from R600 for a one day short course to R7,900 for a ten day programme, plus how to compare quotes honestly.",
    intro: [
      "If you are asking how much does safety training cost in South Africa, the short answer is that it runs from a few hundred rand for a one day short course to several thousand for a programme or a machine operator certificate.",
      "That range is wide because the courses are not the same product. A one day awareness course and a ten day skills programme do different things, and a price comparison only makes sense once you know what each one contains.",
      "Below are our published prices in one table, what makes prices move between providers, the prices other providers publish, and how to read a quote so you compare on substance rather than on the headline number.",
    ],
    closing: [
      "If you want a number for your own team, start with the full [course list](/courses) and then [contact us](/contact) with the course, the group size and the location. For the two courses most employers book first, see the [Health and Safety Representative course](/courses/health-and-safety-representative) at R600 and the [Safety Officer Skills Programme](/courses/safety-officer-skills-programme) at R7,900 for ten days. One booking email is all it takes to get a quote.",
    ],
    sections: [
      {
        heading: "Our published prices for 2026",
        paragraphs: [
          "Our one day short courses run from R600 to R800. Machine operator courses run from R1,250 up to R4,500 depending on the machine and the time it needs. The Traffic Safety Officer course is R2,800 for three days, and the Safety Officer Skills Programme is R7,900 for ten days.",
          "Courses marked to quote are priced after we know the machine, the site and the group size. Where we do not publish a price for a course, ask for a quote rather than assuming a number.",
        ],
        table: {"head": ["Course", "Duration", "Price"], "rows": [["Health and Safety Representative (SHE Rep)", "1 day", "R600"], ["Occupational Health and Safety (OHS) Act", "1 day", "R650"], ["First Aid Level 1", "1 day", "R650"], ["First Aid Level 2", "1 day", "R650"], ["First Aid Level 3", "1 day", "R650"], ["Basic Firefighting", "1 day", "R650"], ["Fire Marshal", "1 day", "R650"], ["Fire Equipment Inspector", "1 day", "R650"], ["COIDA", "1 day", "R650"], ["Emergency Evacuation Training", "1 day", "R650"], ["Risk Assessment (HIRA)", "1 day", "R700"], ["Accident and Incident Investigation", "1 day", "R700"], ["Working at Heights", "1 day", "R700"], ["Fall Protection Planning", "1 day", "R700"], ["Scaffolding Erector", "1 day", "R700"], ["Scaffolding Inspector", "1 day", "R700"], ["Flagman (Stop and Go)", "1 day", "R700"], ["Chemical Hazards (HAZCHEM)", "1 day", "R800"], ["Convey Dangerous Goods by Road", "1 day", "R800"], ["Hand and Power Tools Safety", "1 day", "R800"], ["Chain Saw Operator", "1 day", "R1,250"], ["Forklift Operator", "To quote", "R1,500"], ["Traffic Safety Officer", "3 days", "R2,800"], ["TLB Operator", "To quote", "R4,500"], ["Safety Officer Skills Programme", "10 days", "R7,900"]]},
      },
      {
        heading: "What makes prices differ between providers",
        paragraphs: [
          "Five things move the price of the same course name: accreditation, class size, whether assessment and certification are included, whether the trainer travels to your site, and machine time. Two providers can advertise the same title at very different prices because they are not selling the same thing.",
          "Accreditation costs a provider money, and a buyer doing municipal or provincial work usually needs accreditation letters as a mandatory condition. Class size matters too. A small group gets more facilitator time than a hall of forty.",
          "Assessment and certification are sometimes extras rather than part of the quoted fee. Machine courses carry real costs that classroom courses do not, because a forklift or a TLB has to be available, fuelled and maintained for practical time.",
        ],
      },
      {
        heading: "What other providers publish",
        paragraphs: [
          "Published prices vary widely by course. In search results seen on 10 September 2026, SHE Rep training was advertised by NOSA at R2,950 and Funda Institute at R800. Basic Firefighting was listed by St John at R295, and St John First Aid from R239 up to R1,490, while Absolute Health listed First Aid at R975.",
          "On the safety officer side, published prices included SafetyCloud at R4,140 for a programme, Unisa at R7,200 and iQ Academy at R9,900. Machine operator training was advertised by small academies across a range from R600 to R4,500.",
          "These are published prices seen in search results, not a survey, and they are not an average. They are worth reading as a spread rather than a benchmark, because each one is attached to different content, duration and delivery.",
        ],
      },
      {
        heading: "How to read a training quote",
        paragraphs: [
          "Read a quote by asking five questions. Which unit standards are covered, what assessment and certification cost on top, who the facilitator and assessor are, whether the price is per person or per group, and what the learner receives at the end.",
          "The headline number alone tells you very little. A low price that excludes assessment, certification and learning material is often more expensive than a higher price that includes them. Ask for the total cost per learner, not the advertised course fee.",
          "Ask whether the quote is per person or per group as well. For a small team, a group rate can move the number more than haggling over the course fee, and it is the question most buyers forget to ask.",
        ],
      },
      {
        heading: "Group bookings and on site delivery",
        paragraphs: [
          "Group bookings are negotiable, and training can be delivered on site at your premises. For a team, on site delivery removes travel and accommodation cost for every delegate, which often matters more than the per head course fee. That is the figure worth testing first when you are costing a group.",
          "When a whole team travels to a centre, the invoice includes more than the course. There are travel days, accommodation and lost working time. Training on your own site keeps the team in one place and lets the trainer work with your actual equipment and layout.",
          "The same logic applies anywhere in the country. RSTL Centre has training centres in Midrand, Durban and Mthatha, and can deliver on site nationally. For a group booking, tell us the team size, the site and the dates, and we will quote on that basis.",
        ],
      },
    ],
    faqs: [
      { q: "How much does a SHE Rep course cost?", a: "RSTL Centre charges R600 for the one day Health and Safety Representative course. Other providers publish different prices for the same course, including NOSA at R2,950 and Funda Institute at R800 in search results seen on 10 September 2026." },
      { q: "How much does a first aid course cost?", a: "RSTL Centre charges R650 for each of First Aid Level 1, Level 2 and Level 3, per learner, for one day. St John listed First Aid from R239 up to R1,490 in published search results seen on 10 September 2026, and Absolute Health listed R975." },
      { q: "Why does a safety officer course cost more than a short course?", a: "The Safety Officer Skills Programme runs for ten days at R7,900, so it is priced for far more contact time and content than a one day course. Programmes published by other providers included SafetyCloud at R4,140, Unisa at R7,200 and iQ Academy at R9,900." },
      { q: "Why are machine operator courses more expensive?", a: "Machine courses need the machine, fuel, maintenance and practical time, not just a classroom. Our Forklift Operator course is R1,500 and the TLB Operator course is R4,500, with the final price confirmed by quote once the machine and site are clear." },
      { q: "Can you train my whole team on site?", a: "Yes. Training can be delivered at your premises, which removes travel and accommodation cost for every delegate. Group bookings are negotiable. RSTL Centre trains at Midrand, Durban and Mthatha and can deliver on site nationally." },
      { q: "How do I compare quotes from different providers?", a: "Compare on what is included, not on the headline number. Check whether assessment, certification and learning material are in the price, the class size, whether the quote is per person or per group, and the accreditation behind the certificate." },
      { q: "How do I check that a provider is accredited?", a: "Ask for the accreditation and verify it before you book. Municipal and provincial tenders for this training commonly require accreditation letters as a mandatory condition. RSTL Centre states its accreditation on its course pages, and it is fair to ask any provider to do the same." },
    ],
    closingHeading: "Get a course price and a quote",
    courseLinks: [
      { href: "/courses/health-and-safety-representative", label: "Health and Safety Representative course" },
      { href: "/courses/safety-officer-skills-programme", label: "Safety Officer Skills Programme" },
    ],
  },
  {
    slug: "machine-plant-operator-training-mthatha",
    title: "Machine and Plant Operator Training in Mthatha: Forklift, TLB, Excavator and Grader",
    metaTitle: "Machine and Plant Operator Training in Mthatha",
    metaDescription: "Forklift training Mthatha employers can book: 34 machine and plant courses, forklift at R1,500 and TLB at R4,500, run at our centre or on your own site.",
    primaryKeyword: "forklift training mthatha",
    secondaryKeywords: ["tlb training mthatha", "excavator training mthatha", "plant operator training mthatha", "forklift licence"],
    category: "Mthatha",
    date: "2026-09-21",
    readMinutes: 7,
    excerpt: "Machine and plant operator training in Mthatha, covering forklift, TLB, excavator and grader. What the law requires, what the courses cost and where the work is.",
    intro: [
      "Forklift training Mthatha employers arrange through RSTL Centre is practical, machine-based work, run from the branch at the Old Mutual Building on the corner of York Road and Leeds Road. The same programme covers TLB, excavator, grader, dump truck and front end loader operators, so one booking can carry a whole plant crew.",
      "RSTL Centre offers 34 machine and plant courses. Some are lifting machines governed by the Driven Machinery Regulations, and others are earthmoving and plant equipment. The course your operator needs depends on the machine they will actually run, not on the course title that sounds closest.",
      "Demand in the district is steady. The N2 Wild Coast Road packages around Mthatha keep contractors looking for machine operators, and the district water and sanitation programme of roughly 122 projects keeps plant working across the region. Plant operators are needed on site, in person.",
      "That last point matters when you plan training. Practical machine training cannot be delivered online. Operators need the machine, a load and a competent assessor watching them work, which is why the machine courses run at a centre or on your premises and never as an online session.",
    ],
    closing: [
      "Send your machine types and delegate numbers through [the contact page](/contact) and RSTL Centre will confirm dates and a quote, whether you want the [Forklift Operator course](/courses/forklift-operator), the [TLB Operator course](/courses/tlb-operator) or any of the other machines in the full [course range](/courses).",
    ],
    sections: [
      {
        heading: "What the law requires from a machine operator",
        paragraphs: [
          "Driven Machinery Regulations 2015 require an operator of a lifting machine to hold a certificate of training from a provider accredited by TETA, the Transport SETA, and approved by the Chief Inspector. The duty sits with the employer. On a Mthatha site, an inspector asks for the certificate, not for a claim of experience.",
          "That requirement is what turns operator training from a nice-to-have into a compliance item. A certificate from a trainer who is not accredited does not satisfy the regulation, which is why you should check a provider's accreditation before you pay a deposit. RSTL Centre states its accreditation on its course pages.",
          "Earthmoving machines such as the TLB and the excavator are governed by the OHS Act's general duty to provide a safe workplace and competent operators. In practice, contractors and principal contractors treat an operator certificate as the standard proof of competence, and the civil tenders running across the district ask for exactly that.",
        ],
      },
      {
        heading: "Which machines employers here actually use",
        paragraphs: [
          "The machines in daily use across the OR Tambo district are the forklift, the TLB, the excavator, the grader, the dump truck and the front end loader. Warehouses and distribution operations around the Mall of Mthatha and Vulindlela Heights run forklifts on loading bays all day.",
          "Road and water contractors run TLBs and excavators almost continuously. The N2 Wild Coast Road packages, led by joint ventures including WBHO, and the district water and sanitation programme both need plant on site for long stretches. SANRAL ran a contractor development session in Mthatha for local contractors, which tells you where the local work is heading.",
          "Forestry operations at Langeni and Singisi add another layer. Loading and hauling timber needs trained operators on front end loaders and dump trucks, often on uneven ground and in wet weather. Quarry work at Transkei Quarries adds loading cycles that punish an untrained operator quickly.",
          "Municipal and provincial work brings graders into play. Grading gravel access roads and maintaining district roads is steady work, and it is usually tied to a tender that specifies operator competence.",
        ],
      },
      {
        heading: "What changed in the operator certification regime",
        paragraphs: [
          "The National Code of Practice for Training Providers of Lifting Machine Operators says a carry card is valid for up to 24 months. That is the practical position most sites work to today, and it is why carry cards get checked and renewed as a matter of routine.",
          "The position changed on 30 January 2026. A Correction Notice from the Chief Inspector replaced re-certification with relicensing, confirmed that certificates are issued only once, and allowed providers to keep issuing carry cards while a licensing body is being set up. That body has a deadline of 29 May 2027.",
          "Treat this as a regime in transition. Do not treat a fixed validity period as settled law, and do not let a card lapse on the assumption that nothing has changed. If you are unsure what applies to your operators right now, ask the question before you book and get the answer in writing.",
        ],
      },
      {
        heading: "What the courses cost and how a booking runs",
        paragraphs: [
          "RSTL Centre charges R1,500 for the Forklift Operator course and R4,500 for the TLB Operator course, both quoted on request. The final figure depends on whether training runs at a centre or on your site, and on how many delegates you send.",
          "Training hours are Monday to Friday, 08:00 to 16:30. Saturday sessions can be arranged, classes run daily and there is no waiting period. That matters when a machine is standing idle and a contract milestone is close.",
          "Published prices from small training academies seen in search results range from about R600 to R4,500 for forklift and machine operator courses, and one Facebook operator advertises R2,300 to R6,800. That spread usually tracks accreditation, the machine, whether assessment is included and whether the provider travels to your site.",
        ],
        table: {"head": ["Machine", "Typical worksite use in the district"], "rows": [["Forklift", "Warehouse and retail distribution, loading and offloading delivery vehicles"], ["TLB (tractor loader backhoe)", "Trenching, service connections, road and water reticulation work"], ["Excavator", "Bulk earthworks, foundations and trenching on the N2 corridor and water projects"], ["Grader", "Gravel road shaping and maintenance for municipal and provincial road work"], ["Dump truck", "Hauling spoil, aggregate and timber on construction and forestry sites"], ["Front end loader", "Loading stockpiles, timber handling and general plant support"]]},
      },
      {
        heading: "How public buyers in the district procure this training",
        paragraphs: [
          "Public sector buyers in O.R. Tambo District do buy safety training locally, and they buy it against accreditation conditions. The Eastern Cape Department of Public Works and Infrastructure issued quotation ORT5-25/26-0017 for the training of 34 employees on health and safety (SHE Rep) in O.R. Tambo District over three days. That order was placed in Mthatha, not Johannesburg.",
          "The district municipality also requires accreditation letters from HWSETA and QCTO as a mandatory condition on its training quotations. Machine operator courses sit under TETA rather than those two bodies, but the discipline is identical. If a public buyer or a principal contractor asks for proof of accreditation, you want a provider who can produce it without a delay.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a licence to operate a forklift in South Africa?", a: "In everyday language people say licence, but the law refers to a certificate of training. You need one from a provider accredited by TETA and approved by the Chief Inspector. The employer must make sure the operator holds it before the machine is used on site." },
      { q: "How long does a forklift operator course take?", a: "The Forklift Operator course runs for one day, Monday to Friday, starting at 08:00. RSTL Centre runs classes daily with no waiting period, so you can usually book a delegate at short notice. The practical work is done on a machine, not online." },
      { q: "Can machine operator training be done online?", a: "No. Practical machine training cannot be delivered online. Operators have to be assessed on the machine they will run, with real loads and a competent assessor watching. Theory may be handled in a blended format, but the practical part is always in person." },
      { q: "What does TLB operator training cost in Mthatha?", a: "RSTL Centre charges R4,500 for the TLB Operator course, quoted on request depending on venue and delegate numbers. Prices from small training academies seen in search results vary widely, so compare what is included rather than the headline fee alone." },
      { q: "Which machine operators are in demand on the N2 Wild Coast Road?", a: "The N2 Wild Coast Road packages need excavator, TLB, grader and dump truck operators on an ongoing basis, and the district water programme adds more plant work. Contractors on both run operator competence checks because their tenders and safety files require it." },
      { q: "Does a forklift certificate expire?", a: "Work through this carefully. The National Code of Practice sets a carry card at up to 24 months, and a Correction Notice dated 30 January 2026 moved the regime to relicensing, with a licensing body due by 29 May 2027. Do not treat a fixed validity period as settled law." },
      { q: "Can RSTL Centre train operators on my site?", a: "Yes. Machine courses run at any of the three centres or on site at your premises. On-site training suits contractors with a machine and a crew already on a project, and it is quoted on request. Book through the contact page to confirm dates." },
    ],
    closingHeading: "Book machine and plant operator training in Mthatha",
    courseLinks: [
      { href: "/courses/forklift-operator", label: "Forklift Operator course" },
      { href: "/courses/tlb-operator", label: "TLB Operator course" },
    ],
  },
  {
    slug: "first-aid-emergency-training-schools-creches",
    title: "First Aid and Emergency Training for Schools, Creches and Care Centres in the Mthatha Area",
    metaTitle: "First Aid Training for Schools and Creches",
    metaDescription: "First aid training for schools, creches and care centres in the Mthatha area. Level 1, 2 and 3 first aid at R650 each, plus firefighting and evacuation.",
    primaryKeyword: "first aid training for schools",
    secondaryKeywords: ["first aid training for creche", "first aid training for daycare", "evacuation training for schools", "first aid training for teachers"],
    category: "Mthatha",
    date: "2026-09-21",
    readMinutes: 7,
    excerpt: "First aid and emergency training for Mthatha schools, creches and care centres, covering child injuries, fire awareness and evacuating large groups of children.",
    intro: [
      "First aid training for schools across the OR Tambo district is a practical need rather than a formality. The district has 652 schools recorded in a district report, along with a large early childhood development sector, and a normal school day produces injuries in fairly predictable ways.",
      "Principals, creche owners and care centre managers all face the same question: who on the staff can handle an injury in the first ten minutes, before an ambulance arrives? A child who falls off play equipment, chokes on a sweet or reacts to a bee sting needs someone who knows what to do.",
      "RSTL Centre runs First Aid Levels 1, 2 and 3 at R650 each, Basic Firefighting at R650 and Emergency Evacuation Training at R650. Training can be delivered on site at your school, which avoids taking teachers out of the classroom for a whole day.",
      "That on-site option matters in a small school or a creche with a tight staff complement. Nobody wants three staff members driving to town while the classes they should be teaching run short.",
    ],
    closing: [
      "Book the relevant first aid level through the [First Aid Level 1 course page](/courses/first-aid-level-1), add [Basic Firefighting](/courses/basic-firefighting) for your kitchen and maintenance staff, and cover the site with [Emergency Evacuation Training](/courses/emergency-evacuation-training). Send your staff numbers and site details through [the contact page](/contact) and RSTL Centre will confirm an on-site date, with the full list on the [course page](/courses).",
    ],
    sections: [
      {
        heading: "What the law requires from a school as an employer",
        paragraphs: [
          "Any employer with more than five employees must provide a first aid box. Once more than 10 employees are employed, at least one person in each group of up to 50 employees, or up to 100 in a shop or office, must be readily available during working hours holding a valid first aid certificate of competency.",
          "That first aider's certificate must be issued or endorsed by the SA Red Cross Society, St John Ambulance, the SA Noodhulpliga, or an organisation approved by a chief inspector. The first aider's name must appear on the first aid box, and every box location must be clearly signposted.",
          "Where dangerous or high-risk substances are used, the first aider must also be trained in first aid for acute poisoning and spillage. Science labs, art rooms and kitchen facilities are obvious places to think about that.",
          "Schools also carry their own departmental requirements on top of the general employer duty. Those requirements are set by the education authorities, not by the OHS Act, and they change. Principals should check the current requirement that applies to their school before deciding how many staff to train.",
        ],
      },
      {
        heading: "The injuries that actually happen in a school day",
        paragraphs: [
          "Falls and playground injuries are the most common. A child comes off the jungle gym, collides with another child on the field or slips on wet steps. The first response is usually the one that determines how the rest of the injury plays out.",
          "Choking is a real risk in the foundation phase and at lunchtime. Allergic reactions, including to insect stings and food, turn quickly, and staff need to recognise the difference between a mild reaction and one that needs urgent help.",
          "Burns happen in home economics kitchens and around school events where food is prepared. Cuts, nosebleeds and suspected fractures round out the list. First Aid Level 1 covers the everyday version of all of this, and Levels 2 and 3 extend into more serious emergencies for staff who carry the responsibility.",
        ],
      },
      {
        heading: "Fire awareness and firefighting for school staff",
        paragraphs: [
          "A school needs staff who know how to raise the alarm, choose the correct extinguisher and use it without making the situation worse. Basic Firefighting covers fire awareness and practical extinguisher work, which is the part most staff have never done.",
          "Fire Equipment Inspector training is also available for the staff member who keeps the extinguishers and hose reels in a serviceable state. Someone has to check them, and in most schools that job lands on an admin or maintenance person who has never been shown what to look for.",
          "The practical reality is that a small fire contained in the first two minutes rarely becomes a large one. Staff who have actually used an extinguisher on a controlled fire behave very differently from staff who have only watched a video.",
        ],
      },
      {
        heading: "Getting large groups of children out safely",
        paragraphs: [
          "Emergency evacuation training for schools has to deal with a group that includes children who cannot evacuate themselves. Toddlers and Grade R learners cannot read an exit plan, cannot move quickly, and often do not understand that the noise and smoke mean danger.",
          "Emergency Evacuation Training at RSTL Centre covers evacuation planning for large groups and the roles staff take when the alarm sounds. That includes who sweeps which building, who carries the register, where the assembly point sits and how learners are accounted for once they are out.",
          "Staff to learner ratios are at the centre of this. A creche with 30 toddlers and two adults has a very different evacuation problem from a high school with 800 learners who can walk out on their own. Training should be built around your ratio, your buildings and your youngest children, not a generic template.",
        ],
      },
      {
        heading: "First aid for creches and daycare centres",
        paragraphs: [
          "First aid training for creche and daycare staff carries its own weight, because the children are younger, the injuries are different and the supervision ratios are tighter. Choking, falls, allergic reactions, burns and febrile convulsions all appear in this setting.",
          "Care centre managers working with older adults or people with disabilities face another version of the same problem. Staff need to handle falls, medication-related incidents and emergencies where the person cannot tell them what hurts.",
          "In every case the training answer is similar. Get a proportion of the staff trained, put the trained staff on every shift, and repeat the training as staff turn over. First Aid Level 1 is the starting point, and R650 per delegate keeps it affordable for a small centre.",
        ],
        table: {"head": ["Training", "Who at the school or centre should attend"], "rows": [["First Aid Level 1", "Class teachers, front office staff, grounds staff and kitchen staff"], ["First Aid Level 2", "The designated first aiders and staff on sports or outing duty"], ["First Aid Level 3", "Senior staff who manage the first aid function across the site"], ["Basic Firefighting", "Maintenance staff, hostel staff, kitchen staff and fire team members"], ["Emergency Evacuation Training", "The principal or manager, floor wardens and every staff member with an evacuation role"]]},
      },
    ],
    faqs: [
      { q: "What first aid training do schools need in South Africa?", a: "It depends on your staff numbers and on your departmental requirements. The general employer rule is that with more than 10 employees you need at least one trained first aider available per group of up to 50. First Aid Level 1 is the usual starting point for teachers and support staff." },
      { q: "How many first aiders does a school need?", a: "Under the general employer rule, at least one person per group of up to 50 employees, or up to 100 in a shop or office. A school with 30 staff therefore needs at least one trained first aider, and most schools train more than the minimum to cover absentees." },
      { q: "Do first aid certificates expire?", a: "The law sets no expiry period for a first aid certificate of competency. A three year refresh cycle is industry practice rather than a legal rule. The issuing body and your own risk assessment should drive how often your staff retrain, so check both before setting a cycle." },
      { q: "Can first aid training be done at our school?", a: "Yes. RSTL Centre can deliver training on site at your school, which keeps staff on the premises and avoids a full day away. On-site delivery suits a whole staff complement or a group of creches sharing one venue. Book through the contact page." },
      { q: "What is the difference between First Aid Level 1, 2 and 3?", a: "Level 1 covers the basic emergencies most staff will meet, including bleeding, burns, choking and fractures. Level 2 goes further into serious emergencies, and Level 3 is aimed at the person managing first aid across a site. Each level runs for one day and costs R650." },
      { q: "Do creche and daycare centres need the same training?", a: "They need first aid training built for younger children, which is why the creche and daycare version focuses on choking, falls, allergic reactions and burns. Emergency evacuation training also matters more, because toddlers cannot evacuate themselves and staff must carry them out." },
      { q: "How does a school evacuate young children safely?", a: "Plan around ratios and roles. Staff need to know who collects which group, which children must be carried, who takes the register and where the assembly point is. Emergency Evacuation Training covers all of that, and it can be run on your own site with your own buildings." },
    ],
    closingHeading: "Book first aid and emergency training for your school",
    courseLinks: [
      { href: "/courses/first-aid-level-1", label: "First Aid Level 1 course page" },
      { href: "/courses/basic-firefighting", label: "Basic Firefighting" },
      { href: "/courses/emergency-evacuation-training", label: "Emergency Evacuation Training" },
    ],
  },
  {
    slug: "occupational-medicals-mthatha",
    title: "Occupational Medicals in Mthatha: Pre-Employment, Fitness to Work and Mobile Units",
    metaTitle: "Occupational Medicals in Mthatha: Employer Guide",
    metaDescription: "Occupational medicals Mthatha employers book: pre-employment, fitness to work and working at heights medicals at our clinic or on site with mobile units.",
    primaryKeyword: "occupational medicals mthatha",
    secondaryKeywords: ["pre-employment medical", "working at heights medical examination", "fitness to work certificate", "occupational health medicals"],
    category: "Medicals",
    date: "2026-09-21",
    readMinutes: 7,
    excerpt: "Occupational medicals in Mthatha, from pre-employment to working at heights. Why the fall protection plan makes the medical compulsory and how mobile units reach your site.",
    intro: [
      "Occupational medicals Mthatha employers book through RSTL Centre run from a real clinic in town and from mobile units that travel to a site. The branch sits at 1st Floor, Old Mutual Building, corner of York Road and Leeds Road, Mthatha, and the number is 078 045 2852.",
      "The medicals fall into four common groups: pre-employment, fitness to work, working at heights, and periodic medical surveillance. Which one your employee needs depends on the job and on the risk assessment behind it, not on a general rule of thumb.",
      "One of these medicals is not optional paperwork. For any employee working at a fall risk position, Regulation 10 of the Construction Regulations 2014 puts a medical fitness evaluation directly inside the fall protection plan.",
    ],
    closing: [
      "Send your employee numbers, the roles involved and the site location through [the contact page](/contact) and RSTL Centre will confirm a clinic appointment or a mobile unit visit. Add the [Working at Heights course](/courses/working-at-heights) or [Fall Protection Planning](/courses/fall-protection-planning) if your crew needs the training that goes with the medical, and the [full course range](/courses) covers the rest.",
    ],
    sections: [
      {
        heading: "Why a heights medical sits inside the fall protection plan",
        paragraphs: [
          "Construction Regulations 2014 Regulation 10 requires a fall protection plan that includes the processes for evaluating employees' medical fitness to work at a fall risk position, together with the records of that evaluation. A working at heights medical is therefore part of a compliant plan, not a document you add afterwards.",
          "The same regulation requires the contractor to designate a competent person to prepare the plan, and to implement, amend, maintain and enforce it. The plan must also carry a risk assessment of all work from a fall risk position, a training programme for those workers with records, and a rescue plan with the people and equipment to rescue someone who falls.",
          "That rescue plan has to be implemented immediately, which is why the training and the medical belong together. A competent person who is medically unfit for the position cannot form part of the rescue arrangement, and a fit worker who has never been trained on the rescue procedure is no better off.",
          "The construction manager must hold the most recently updated version of the plan. When an inspector or a principal contractor asks for it, the medical records must be in it.",
        ],
      },
      {
        heading: "The types of medical employers ask for",
        paragraphs: [
          "A pre-employment medical is done before somebody starts, and it establishes a baseline. It tells the employer whether the person can do the job they are being hired for, and it gives the clinic a starting point if a health issue is raised later.",
          "A fitness to work certificate answers a narrower question about a specific role. It is the document that says this person can work in this position, and it is what a contractor produces when a client or a tender asks for proof.",
          "A working at heights medical examination links the employee to the fall risk position under Regulation 10. Periodic medical surveillance is the ongoing version, done at intervals for employees exposed to particular hazards. Your risk assessment and your appointment of a medical practitioner should set the scope, so ask before you book.",
        ],
      },
      {
        heading: "Who needs occupational medicals in the district",
        paragraphs: [
          "Construction contractors working on the N2 Wild Coast Road corridor need medicals for anyone at a fall risk position, and for site staff whose roles carry health requirements. The district water and sanitation programme, with about 122 projects running, generates the same demand across many smaller contractors.",
          "Quarry and forestry employers add to it. Transkei Quarries at Mthatha runs heavy plant and haulage work, and the Langeni sawmill and Singisi forestry operations employ people in physically demanding roles. Municipalities are a steady source of pre-employment and fitness to work medicals as well.",
          "Government, retail, health, education and services employ most of the local workforce, and not every role needs a medical. The roles that do are usually the ones with a physical demand, a height risk, a driver requirement or a client contract that specifies it.",
        ],
      },
      {
        heading: "A Mthatha clinic rather than a service driving in",
        paragraphs: [
          "Occupational medicals in Mthatha are a competitive local market. Several practitioners and practices already offer them, so this is not somewhere a provider wins on novelty. The practical difference is having a physical clinic in town with mobile units that can come to you.",
          "A clinic in Mthatha means you are not waiting on a team driving in from another province to fill a slot on a route. It also means records and follow-ups stay with a local practice, and a working at heights medical can be booked in the same place as the training that goes with it.",
          "Mobile units change the maths on a construction site. If you have a crew that cannot leave the site for a day, the unit travels to the site, and your people are seen without the project losing a day of work. Ask about mobile delivery when you book, and give the location and crew numbers.",
        ],
      },
      {
        heading: "Booking medicals and heights training together",
        paragraphs: [
          "Medicals and working at heights training can be booked together, which suits contractors who need both for the same crew. Book the [Working at Heights course](/courses/working-at-heights) and the medicals in one arrangement, and the records arrive in a form you can drop straight into the fall protection pack.",
          "If you are rebuilding the plan itself, the [Fall Protection Planning course](/courses/fall-protection-planning) covers how the plan is put together, including the medical fitness and training records it has to carry. That is the cleaner route for a contractor preparing for a client audit or a discovery inspection.",
        ],
        table: {"head": ["Medical type", "Which employees usually need it"], "rows": [["Pre-employment medical", "New hires in physically demanding, driving or safety-critical roles"], ["Fitness to work certificate", "Employees whose role has a specific health requirement set by contract"], ["Working at heights medical", "Anyone working at a fall risk position under a fall protection plan"], ["Periodic medical surveillance", "Employees exposed to particular hazards, at intervals set by the risk assessment"]]},
      },
    ],
    faqs: [
      { q: "Why is a working at heights medical required?", a: "Construction Regulations 2014 Regulation 10 requires a fall protection plan to include the processes for evaluating employees' medical fitness to work at a fall risk position, with records. The medical is therefore part of the compliant plan, not an optional extra. A contractor cannot leave it out." },
      { q: "What is a fitness to work certificate?", a: "It is a document confirming that an employee is medically fit for a specific role. Employers produce it when a client, a principal contractor or a tender requires proof that the person can do the job. The scope should follow the risk assessment for that position." },
      { q: "Where is the RSTL Centre Mthatha clinic?", a: "The Mthatha branch is at 1st Floor, Old Mutual Building, corner of York Road and Leeds Road, Mthatha. The branch number is 078 045 2852. Training hours are Monday to Friday from 08:00 to 16:30, with Saturday sessions by arrangement." },
      { q: "Can medicals be done on our site instead of at the clinic?", a: "Yes. RSTL Centre runs mobile units that can travel to a site, which suits a construction crew that cannot leave the project for a day. Give the location and the number of employees when you book so the visit can be planned properly." },
      { q: "Do you need a pre-employment medical for every new employee?", a: "No. It depends on the role and on what the employer's risk assessment and client contracts require. Roles with physical demands, height risks, driving duties or specific contract conditions are the ones that normally need it before the employee starts work." },
      { q: "Can medicals and working at heights training be booked together?", a: "Yes, and it is the sensible way to do it. A crew that needs heights training almost always needs the matching medical, and booking both together keeps the records consistent. Use the contact page to arrange both in one request." },
      { q: "Do medicals have a fixed validity period?", a: "No single period applies across the board. How often a medical is repeated follows from the risk assessment, the role and any requirement set by a client or a tender. Ask the clinic to confirm the interval for your specific positions rather than working from a general assumption." },
    ],
    closingHeading: "Book occupational medicals in Mthatha",
    courseLinks: [
      { href: "/courses/working-at-heights", label: "Working at Heights course" },
      { href: "/courses/fall-protection-planning", label: "Fall Protection Planning course" },
    ],
  },
  {
    slug: "working-at-heights-certificate-validity-south-africa",
    title: "How Long Is a Working at Heights Certificate Valid in South Africa?",
    metaTitle: "Working at Heights Certificate Validity in SA",
    metaDescription: "The Construction Regulations set no expiry date for a working at heights certificate. Here is what actually drives a refresher, and how to keep records ready.",
    primaryKeyword: "working at heights certificate validity",
    secondaryKeywords: ["how long does a working at heights certificate last", "working at heights certificate expiry", "fall arrest training validity", "working at heights training"],
    category: "Compliance",
    date: "2026-09-21",
    readMinutes: 7,
    excerpt: "Search results for working at heights certificate validity in South Africa often answer for Singapore, Australia or the UK. Here is the honest South African position.",
    intro: [
      "Search for working at heights certificate validity in South Africa and you land on pages written for Singapore, Australia and the United Kingdom. Singapore runs a Work at Height Course with its own renewal rule. Australia has its own licence regime. The United Kingdom publishes refresher guidance for its own sites. None of it governs a South African workplace.",
      "The Construction Regulations 2014 do not put a number of years on a working at heights certificate. Regulation 10 sets out what a fall protection plan must contain, and a training programme with records is on that list. It never adds a line saying the certificate lapses after two, three or five years.",
      "So the useful question is not what the expiry date is. It is who decides when a refresher is due, and on what basis. On a real site that answer sits with the employer's risk assessment and with the safety specification of the client or principal contractor. A decision made without records behind it is a guess. Made with them, it is a position that holds up when a client, an inspector or an insurer asks why a person was working on the edge.",
    ],
    closing: [
      "The course most sites ask for is [Working at Heights](/courses/working-at-heights), one day at R700. Employers who need to build the plan behind the certificate usually pair it with [Fall Protection Planning](/courses/fall-protection-planning), also one day at R700, and book medical fitness evaluations through [occupational medicals](/medicals).",
      "RSTL Centre trains Monday to Friday, 08:00 to 16:30, with Saturday sessions by arrangement. Classes run daily with no waiting period, at a centre or on site. Browse the full list on the [courses page](/courses), then send your booking request through the [contact page](/contact).",
    ],
    sections: [
      {
        heading: "What the Construction Regulations Say About a Certificate Expiring",
        paragraphs: [
          "The Construction Regulations 2014 set no expiry period for a working at heights certificate. Regulation 10 requires a fall protection plan that includes a training programme for employees who work from a fall risk position, together with the records of that training. Nothing in the regulation names a number of years or a renewal interval.",
          "That single fact clears up most of the confusion. A certificate is not valid or invalid because of its age. It counts because the person is trained for the work and the equipment in front of them, and because the employer can produce the record when it is asked for.",
          "Consider what an inspector, a client or a principal contractor actually checks on site. They want to see a fall protection plan, a training programme behind that plan, medical fitness records, and an inspection regime for the equipment. A certificate with no records attached proves very little. A current training record tied to a live plan proves a great deal.",
        ],
      },
      {
        heading: "What Regulation 10 Requires the Employer to Do",
        paragraphs: [
          "Regulation 10 requires the contractor to designate a competent person to prepare a fall protection plan, then implement, amend, maintain and enforce it. The plan must include a risk assessment of all work from a fall risk position, medical fitness evaluations with records, a training programme with records, an equipment inspection and maintenance procedure, and a rescue plan.",
          "Each item on that list has a purpose. The risk assessment tells you where the fall risk sits and how the work will be done at each position. The medical fitness evaluation keeps a person whose condition makes a fall more likely away from the edge. The training programme builds the competence the work demands, and the records are what you show afterwards. The equipment procedure keeps harnesses, lanyards and anchors fit for use between inspections. The rescue plan is the part most sites leave until too late, and it is the part that matters after a fall arrest has already happened.",
          "Two rules sit underneath all of this. Fall arrest is permitted only where fall prevention is not reasonably practicable, so prevention is the first answer rather than the fallback. Every unprotected opening in a floor, edge, slab, hatchway or stairway must be adequately guarded, fenced or barricaded.",
          "The construction manager must also hold the most recently updated version of the plan. If the plan on site is a year out of date, that is a failure before anyone clips a lanyard on.",
        ],
      },
      {
        heading: "What Actually Drives a Refresher",
        paragraphs: [
          "A refresher is driven by the site, not by a calendar. A new site, a new principal contractor's safety specification, a gap in the training records, a change in the fall protection equipment used, or an incident all create a reason to retrain. The employer's own risk assessment sets the cycle, and the client can set a stricter one.",
          "Practical triggers come up more often than people expect. A new contract usually means a new safety file and a fresh set of expectations about who is competent for what. A change from a work positioning system to a fall arrest system changes the technique and the rescue plan with it. An incident, even a near miss, shows that something in the plan or the training did not hold.",
          "The table below sets out the triggers and what to do about each one.",
        ],
        table: {"head": ["Trigger", "Why it forces a refresh", "Practical action"], "rows": [["New site or project", "Different heights, access routes and hazards", "Re-check the fall protection plan and retrain against the new methods"], ["New principal contractor", "Their safety specification sets its own competency requirements", "Read the specification before mobilising and book training that matches it"], ["Gap in the training records", "You cannot show competence on the day it is asked for", "Rebuild the records and retrain where the gap is real"], ["Change of fall protection equipment", "Work positioning, rope access and fall arrest kit need different technique", "Retrain on the specific system in use"], ["Incident or near miss", "The plan or the training did not hold in practice", "Investigate, amend the plan and retrain the team"], ["Long break from height work", "Skills fade and site conditions change", "Put the person through a refresher before they go back up"]]},
      },
      {
        heading: "Why a Fixed Number of Years Keeps Appearing",
        paragraphs: [
          "Any source that states a fixed number of years as a South African legal requirement is not quoting the regulation. Singapore, Australia and the United Kingdom each run their own regime for work at height, and South African pages repeat those numbers because they rank well. A number copied from another country's rule is not law here.",
          "There is a second reason the figure keeps turning up. Many clients and principal contractors write a refresher interval into their own safety specification. That interval is contractual, not statutory. It is still binding on the contractor who signed up to it. If a mine, a state owned enterprise or a large construction group asks for a refresher every two years, the site must meet that requirement or the crew does not work.",
          "The difference matters when you quote a client. Saying that the law requires it when the regulation is silent is the kind of claim that gets pulled apart in a hearing. Saying that their specification requires it is accurate and easy to prove.",
        ],
      },
    ],
    faqs: [
      { q: "How long does a working at heights certificate last in South Africa?", a: "The Construction Regulations 2014 set no expiry period, so a certificate does not lapse after a fixed number of years. How long it stays useful depends on the employer's risk assessment, the equipment used, and the requirements of the client or principal contractor on the site." },
      { q: "Is there a legal expiry date for working at heights training?", a: "No. Regulation 10 requires a training programme and its records as part of the fall protection plan, but it names no renewal interval. Any figure you see presented as South African law is coming from another country's regime or from a training provider's own recommendation." },
      { q: "Does a working at heights certificate expire after two years?", a: "Not by law. A two year cycle is common as a contractor or client requirement, and as an industry habit, and it is a reasonable choice for many sites. It is a specification or a policy decision, not something the Construction Regulations impose on an employer." },
      { q: "Why does my site ask for an annual refresher then?", a: "Because the site can. A principal contractor or client may set a stricter interval than the law requires, and their safety specification governs who works on their property. If you signed the contract, that interval applies to you even though the regulation itself is silent." },
      { q: "What is fall arrest training validity based on?", a: "It rests on competence and records rather than a date. The person must be trained for the system in use, medically fit for the work, and covered by a current fall protection plan. Add a rescue plan that has actually been rehearsed, and the training is doing its job." },
      { q: "Do I need a medical to work at heights?", a: "Regulation 10 requires a medical fitness evaluation for anyone working from a fall risk position, with records kept. RSTL Centre runs occupational medicals, including fitness to work assessments, and the evaluation sits alongside the training rather than replacing it." },
      { q: "Where can I do working at heights training in South Africa?", a: "RSTL Centre delivers working at heights training at its Midrand, Durban and Mthatha centres, and on site at a client's premises anywhere in the country. The course runs one day and costs R700. Book through the contact page." },
    ],
    closingHeading: "Book Working at Heights Training With RSTL Centre",
    courseLinks: [
      { href: "/courses/working-at-heights", label: "Working at Heights" },
      { href: "/courses/fall-protection-planning", label: "Fall Protection Planning" },
    ],
  },
  {
    slug: "first-aid-training-mthatha",
    title: "First Aid Training in Mthatha: Level 1, 2 or 3 and What Your Team Actually Needs",
    metaTitle: "First Aid Course Mthatha: Level 1, 2 or 3 Guide",
    metaDescription: "First aid course Mthatha employers can book: the legal requirement, the difference between Level 1, 2 and 3, and what RSTL Centre charges for each of them.",
    primaryKeyword: "first aid course mthatha",
    secondaryKeywords: ["first aid training Mthatha", "first aid level 1 course price south africa", "first aid level 2 Mthatha", "first aid level 3"],
    category: "Mthatha",
    date: "2026-09-14",
    readMinutes: 7,
    excerpt: "How many first aiders a Mthatha workplace needs, which of Level 1, 2 or 3 to book, and what the law actually says about how long a certificate lasts.",
    intro: [
      "A first aid course in Mthatha is a legal requirement for most workplaces, not an optional extra. Once a business passes 10 employees, the General Safety Regulations require a trained first aider to be readily available during normal working hours, and the certificate has to come from an approved body.",
      "RSTL Centre charges R650 for First Aid Level 1, Level 2 and Level 3, each run as a one day course at the Mthatha branch or on site. The level you book depends on the risk in the workplace and what the employer's risk assessment says, not on the size of the team alone.",
      "This guide covers the legal trigger, the difference between the three levels, and the question employers get wrong most often, which is how long the certificate lasts.",
    ],
    closing: [
      "Email the branch through the [contact page](/contact) to book First Aid Level 1, 2 or 3 at R650 a delegate, or compare the three on the course pages for [Level 1](/courses/first-aid-level-1), [Level 2](/courses/first-aid-level-2) and [Level 3](/courses/first-aid-level-3). The [full course list](/courses) covers the firefighting and evacuation courses that usually get booked alongside first aid.",
    ],
    sections: [
      {
        heading: "What the law requires of a Mthatha employer",
        paragraphs: [
          "More than 5 employees means a first aid box is required. More than 10 employees means the employer must ensure that for every group of up to 50 employees, or up to 100 in a shop or office, at least one person is readily available during normal working hours with a valid certificate of competency in first aid.",
          "The certificate must be issued or endorsed by the SA Red Cross Society, St John Ambulance, the SA Noodhulpliga, or an organisation approved by a chief inspector. The first aider's name must appear on the first aid box, and every box location must be clearly signposted.",
          "Where dangerous or high-risk substances are used, the first aider needs additional training in first aid for acute poisoning and spillage. The box itself has to contain at least the items listed in the Annexure to the regulations.",
          "Notice what the rule does not say. It sets no stated expiry period, and it says nothing about the level of course. Those two gaps are where most workplace first aid policies go wrong.",
        ],
      },
      {
        heading: "Level 1, Level 2 and Level 3: what changes",
        paragraphs: [
          "Level 1 covers the basics any workplace needs: scene safety, the primary survey, CPR, choking, bleeding, shock, burns and basic fractures. It suits offices, retail, schools, crèches and smaller sites where the risk is low and the first aider is the first link in the chain.",
          "Level 2 builds on that with broader assessment and more conditions, and it is the level most construction sites, factories, warehouses and larger employers book. Level 3 is the most detailed and suits high risk operations, larger teams, and people who are expected to manage a casualty for longer before help arrives.",
          "No rule forces a business to buy the highest level. The employer's risk assessment drives the choice, and a well trained Level 1 first aider supported by a solid evacuation plan is often enough in a low risk office. The mistake is booking the cheapest level for a high risk site and calling the duty done.",
        ],
        table: {"head": ["", "Level 1", "Level 2", "Level 3"], "rows": [["Typical audience", "Offices, retail, schools, crèches", "Construction sites, factories, warehouses", "High risk sites, large teams, first aid coordinators"], ["Depth", "Core life support and common injuries", "Broader assessment and more conditions", "Most detailed, extended care until help arrives"], ["Duration at RSTL", "1 day", "1 day", "1 day"], ["Price", "R650", "R650", "R650"], ["Best suited to", "Low risk and small teams", "Medium to high risk", "High risk or several trained first aiders"]]},
      },
      {
        heading: "How long a first aid certificate lasts",
        paragraphs: [
          "The law sets no expiry period for a first aid certificate. Regulation 3 requires a valid certificate, but it does not say the certificate lapses after a set number of years, so any provider who tells you it expires after three years is describing a convention rather than a legal rule.",
          "Three years has become the accepted cycle in most industries, largely because issuing bodies and employers work to it. The real driver is the body that issued the certificate and the employer's own risk assessment, and both can set a shorter or longer interval.",
          "The sensible approach is to know who issued your certificate, follow that body's guidance, and revisit the position at each risk assessment. A booking reminder is not a legal deadline, and a lapsed-looking certificate is not automatically invalid.",
        ],
      },
      {
        heading: "What a first aid class in Mthatha looks like",
        paragraphs: [
          "Classes run Monday to Friday, 08:00 to 16:30, with Saturday sessions by arrangement. RSTL Centre delivers at its Mthatha centre at 1st Floor, Old Mutual Building, Cnr York Road and Leeds Road, on site at the client's premises, or online where the course allows.",
          "The practical sections are best done in person. For a school, a clinic, a retail floor or a construction team, the on site option keeps the whole group together and lets the trainer build scenarios around the actual workplace rather than a generic classroom.",
          "Delegates leave with a certificate, and the employer keeps a record for the safety file. Municipal and provincial work often requires those records to be produced, so a copy of each certificate is worth the few minutes it takes.",
        ],
      },
    ],
    faqs: [
      { q: "How many first aiders does my business need?", a: "The rule starts at more than 10 employees. For every group of up to 50 employees, or up to 100 in a shop or office, at least one person with a valid first aid certificate must be readily available during normal working hours. A 40 person office needs one, a 140 person factory needs three." },
      { q: "Does a first aid certificate expire?", a: "No expiry period is set in law. Regulation 3 requires a valid certificate but states no time limit. Three years is industry practice rather than a legal rule, and the issuing body and the employer's risk assessment are what drive when a refresher is actually needed." },
      { q: "Which level should a construction site book?", a: "Most construction sites and factories book Level 2, because the risk is higher and injuries are more varied. Level 1 suits low risk offices, schools and crèches, and Level 3 suits high risk operations or workplaces that need several well trained first aiders." },
      { q: "What does first aid training cost in Mthatha?", a: "RSTL Centre charges R650 for First Aid Level 1, 2 and 3, each as a one day course. Published prices seen in search results on 10 September 2026 showed St John first aid courses from R239 up to R1,490 and Absolute Health at R975." },
      { q: "Where can I do first aid training near Mthatha?", a: "RSTL Centre has a Mthatha branch at 1st Floor, Old Mutual Building, Cnr York Road and Leeds Road, on 078 045 2852. Classes also run at the Midrand and Durban centres, on site, or online where the course allows." },
      { q: "Is the certificate recognised for a tender?", a: "The certificate has to be issued or endorsed by the SA Red Cross Society, St John Ambulance, the SA Noodhulpliga, or an organisation approved by a chief inspector. OR Tambo District Municipality requires accreditation letters as a mandatory condition on its training quotations." },
      { q: "Can we train the whole team at our premises?", a: "Yes. On site delivery keeps the group together and lets the trainer work with your actual layout and equipment. It suits schools, clinics, retail groups and construction teams, and a full class can usually be arranged quickly because the centre runs daily classes with no waiting period." },
    ],
    closingHeading: "Book first aid training in Mthatha",
    courseLinks: [
      { href: "/courses/first-aid-level-1", label: "Level 1" },
      { href: "/courses/first-aid-level-2", label: "Level 2" },
      { href: "/courses/first-aid-level-3", label: "Level 3" },
    ],
  },
  {
    slug: "working-at-heights-scaffolding-mthatha",
    title: "Working at Heights and Scaffolding in Mthatha: What Contractors Must Prove on Site",
    metaTitle: "Working at Heights Mthatha: Contractor Guide",
    metaDescription: "Working at heights training in Mthatha, fall protection plans, scaffolding roles and the records contractors must produce on site under the 2014 regulations.",
    primaryKeyword: "working at heights training mthatha",
    secondaryKeywords: ["scaffolding training Mthatha", "fall protection plan", "working at heights course", "fall arrest training"],
    category: "Mthatha",
    date: "2026-09-14",
    readMinutes: 8,
    excerpt: "What the Construction Regulations require of contractors working in Mthatha, from the fall protection plan to scaffold erectors, inspectors and rescue.",
    intro: [
      "Working at heights training in Mthatha is not a formality for contractors on the N2 Wild Coast Road or the district water programme. Regulation 10 of the Construction Regulations 2014 requires a fall protection plan, and that single requirement pulls heights training, fall arrest, rescue training and occupational medicals into one package.",
      "RSTL Centre charges R700 each for Working at Heights, Fall Protection Planning, Scaffolding Erector and Scaffolding Inspector, all one day courses. On a site facing an inspection or a main contractor audit, those are the certificates that get asked for first.",
      "This guide explains what Regulation 10 and Regulation 16 require, what a fall protection plan must contain, and why the region makes both urgent right now.",
    ],
    closing: [
      "Email the branch through the [contact page](/contact) to book [Working at Heights](/courses/working-at-heights), Fall Protection Planning, Scaffolding Erector or Scaffolding Inspector at R700 each, or arrange the medicals the plan requires through [medicals](/medicals). The [course list](/courses) has everything else.",
    ],
    sections: [
      {
        heading: "What Regulation 10 requires of a contractor",
        paragraphs: [
          "The contractor must designate a competent person to prepare a fall protection plan, then implement, amend, maintain and enforce it. The plan must include a risk assessment for every work location at a fall risk, medical fitness evaluations with records, a training programme with records, an equipment inspection and maintenance procedure, and a rescue plan.",
          "That list is why one regulation justifies several courses and a medical at the same time. The plan is not a document that sits in a file. It is the reason the employer has to train the right people, medically assess them, inspect the equipment, and prove all of it with records.",
          "The construction manager must hold the most recently updated version of the plan. An out of date plan with no records behind it is the kind of finding that stops work, and it is also the finding most likely to come up when a main contractor audits a subcontractor.",
        ],
      },
      {
        heading: "What the fall protection plan must contain",
        paragraphs: [
          "A fall protection plan must contain a risk assessment of every fall risk position with a method per location, medical fitness evaluations with records, a training programme with records, an equipment inspection and maintenance procedure, and a rescue plan. Each element is a separate deliverable the contractor must be able to produce on demand.",
        ],
        table: {"head": ["Required element", "What it means in practice", "RSTL support"], "rows": [["Risk assessment", "Identify every fall risk position and set out the method for each location", "Fall Protection Planning, R700"], ["Medical fitness evaluation", "Assess everyone working at a fall risk position, and keep the records", "Occupational medicals"], ["Training programme", "Train those workers and keep competence records", "Working at Heights, R700"], ["Equipment procedure", "How fall protection equipment is inspected, tested and maintained", "Working at Heights, R700"], ["Rescue plan", "The procedure, people and equipment to rescue a fallen worker, implemented immediately", "Working at Heights and on site planning"]]},
      },
      {
        heading: "Fall prevention before fall arrest",
        paragraphs: [
          "The regulations draw a firm line here. Fall arrest is permitted only where fall prevention is not reasonably practicable, so the employer has to show why prevention was ruled out before reaching for a harness. The default answer to a fall risk is to remove the risk, not to catch the person.",
          "All unprotected openings in floors, edges, slabs, hatchways and stairways must be adequately guarded, fenced or barricaded. Where work near an edge cannot be guarded, that is where a fall arrest system and a trained, medically fit user come in.",
          "Work at heights training covers the equipment and the method, but its real value is the discipline behind the choice. Contractors who train teams in [fall protection planning](/courses/fall-protection-planning) as well as [working at heights](/courses/working-at-heights) tend to argue about prevention first, which is the way the regulation is written.",
        ],
      },
      {
        heading: "Scaffolding: three roles under Regulation 16",
        paragraphs: [
          "Regulation 16 requires the contractor to appoint a competent person in writing to supervise all scaffolding work, and to make sure all scaffold erectors, team leaders and inspectors are competent. Access scaffolding must be inspected and maintained, and it must comply with SANS 10085.",
          "The regulation names three distinct roles: erector, inspector and supervisor. They are not interchangeable. An erector builds the scaffold, an inspector checks and signs it off, and a supervisor controls the work and the persons doing it. A site that treats them as one blanket competency is exposed.",
          "RSTL Centre runs [Scaffolding Erector](/courses/scaffolding-erector) and [Scaffolding Inspector](/courses/scaffolding-inspector) as separate one day courses at R700 each, so a contractor can put the right people through the right course rather than sending everyone on the same class. The written appointment of the supervisor is a site decision the employer makes and keeps on file.",
        ],
      },
      {
        heading: "Why the Mthatha region makes this urgent",
        paragraphs: [
          "The N2 Wild Coast Road is a roughly R20 billion, 110km project in the region, with Package Four led by the WBHO-Edwin Construction Joint Venture and Package Five by the WBHO-H&I Joint Venture. Work of that scale means local subcontractors on site, and subcontractors carry the same fall protection duties as the main contractor.",
          "SANRAL ran a contractor development programme session in Mthatha for local contractors, which is a signal that local firms are being brought onto that work. Any firm that moves from smaller jobs to a project of that size needs its fall protection plan and its training records in order before it starts, not after an audit.",
          "The district water and sanitation programme adds the same pressure closer to town. With about 122 projects running and civil tender documents requiring a quarterly training needs analysis, contractors have to show a training plan that is refreshed through the contract, and heights and scaffolding training sit in that plan.",
        ],
      },
    ],
    faqs: [
      { q: "What must a fall protection plan contain?", a: "It must include a risk assessment of all work from a fall risk position with methods per location, medical fitness evaluations with records, a training programme with records, a procedure for inspection, testing and maintenance of fall protection equipment, and a rescue plan with the procedure, people and equipment to rescue a fallen worker." },
      { q: "Is fall arrest always allowed?", a: "No. Fall arrest is permitted only where fall prevention is not reasonably practicable. Prevention comes first, and the employer has to be able to explain why an edge could not be guarded, fenced or barricaded before relying on a harness system." },
      { q: "What is the difference between a scaffold erector and an inspector?", a: "An erector builds and dismantles the scaffold. An inspector checks it and signs it off as safe for use. Regulation 16 names erector, inspector and supervisor as three distinct roles, and a site should not treat one course as covering all three." },
      { q: "Which scaffolding standard applies?", a: "Access scaffolding must comply with SANS 10085 and must be inspected and maintained. The contractor must also appoint a competent person in writing to supervise all scaffolding work, and ensure that erectors, team leaders and inspectors are competent." },
      { q: "How much does heights and scaffolding training cost?", a: "RSTL Centre charges R700 each for Working at Heights, Fall Protection Planning, Scaffolding Erector and Scaffolding Inspector, each a one day course. Occupational medicals for staff working at a fall risk position are arranged separately through the centre." },
      { q: "Do workers at height need a medical?", a: "Yes. The fall protection plan must include a medical fitness evaluation for anyone working at a fall risk position, and the records have to be kept. That fitness evaluation can be arranged through the centre's occupational medicals service." },
      { q: "Can this training be done on our site?", a: "Yes. RSTL Centre delivers at its Mthatha branch, on site at the client's premises, or online where the course allows. Heights and scaffolding courses carry practical work, so those sessions are delivered in person." },
    ],
    closingHeading: "Book heights and scaffolding training in Mthatha",
    courseLinks: [
      { href: "/courses/fall-protection-planning", label: "fall protection planning" },
      { href: "/courses/working-at-heights", label: "working at heights" },
      { href: "/courses/scaffolding-erector", label: "Scaffolding Erector" },
      { href: "/courses/scaffolding-inspector", label: "Scaffolding Inspector" },
    ],
  },
  {
    slug: "she-rep-training-mthatha",
    title: "SHE Rep Training in Mthatha: Who Your Business Must Appoint, and What It Costs",
    metaTitle: "SHE Rep Course Mthatha: Who to Appoint and Cost",
    metaDescription: "SHE Rep training in Mthatha: who must be appointed, how many representatives your workplace needs, and what the one day SHE Rep course costs at RSTL Centre.",
    primaryKeyword: "she rep course mthatha",
    secondaryKeywords: ["health and safety representative training", "SHE Rep training Mthatha", "she rep appointment", "SHE Rep course price"],
    category: "Mthatha",
    date: "2026-09-10",
    readMinutes: 7,
    excerpt: "Who must be appointed as a health and safety representative in Mthatha, how many your headcount requires, and what the one day SHE Rep course costs.",
    intro: [
      "The Eastern Cape Department of Public Works and Infrastructure issued quotation ORT5-25/26-0017 for the training of 34 employees on health and safety (SHE Rep) in the O.R. Tambo District over three days. Public sector buyers were already booking a SHE Rep course in Mthatha, and private employers in the district carry exactly the same duty.",
      "A SHE Rep course in Mthatha at RSTL Centre costs R600 a delegate for a one day class. That published price matters, because the closest national alternatives are several times higher once you read their rate cards.",
      "What follows is the law on who must be appointed, how many representatives a workplace actually needs, and what the course costs against the prices competitors publish.",
    ],
    closing: [
      "Email the branch through the [contact page](/contact) to book the one day SHE Rep course at R600 a delegate, and note your headcount so the team can advise how many seats you need. Full details of the course are on the [SHE Rep page](/courses/health-and-safety-representative), and the [course list](/courses) covers the OHS Act, risk assessment and committee courses that usually follow.",
      "The Mthatha branch is on 078 045 2852 if you would rather speak to someone about a group booking.",
    ],
    sections: [
      {
        heading: "Who must appoint a health and safety representative",
        paragraphs: [
          "Any employer with more than 20 employees must designate health and safety representatives, and the designation has to be in writing. That duty begins within four months of the business starting, or of the headcount passing 20. Only full-time employees who know the workplace's conditions and activities can be appointed.",
          "The writing requirement is where many small employers slip. A verbal understanding is not a designation. The employer should keep a signed appointment for each representative, and the representative should hold a copy for the safety file.",
          "It is worth naming the duties correctly, because they get mixed up. Employees' own duties sit in section 14 of the Act, while section 13 covers the duty to inform. A representative's functions are separate from both, and the appointment letter should reflect the role the person is being given.",
        ],
      },
      {
        heading: "How many representatives a workplace needs",
        paragraphs: [
          "The ratio depends on the type of workplace, not just on headcount. The required minimum is one representative per 100 employees or part thereof in shops and offices, and one representative per 50 employees or part thereof in all other workplaces.",
          "That difference is large in practice. A distribution warehouse with 120 staff needs three representatives, because 120 falls into the third group of 50. A retail store with 120 staff needs two, because 120 falls into the second group of 100.",
          "The table below shows the minimum for common headcounts. It sets out the floor, so an employer with a higher risk profile can appoint more, but cannot appoint fewer.",
        ],
        table: {"head": ["Employees", "Shop or office (1 per 100)", "Other workplaces (1 per 50)"], "rows": [["20 or fewer", "None required", "None required"], ["21 to 50", "1", "1"], ["51 to 100", "1", "2"], ["101 to 150", "2", "3"], ["151 to 200", "2", "4"], ["201 to 250", "3", "5"]]},
      },
      {
        heading: "What the Act requires once a representative is appointed",
        paragraphs: [
          "Section 18(3) places a duty on the employer to provide the facilities, assistance and training a representative may reasonably require. Training is therefore not a favour the employer is granting, and the employer cannot reasonably refuse it where the representative needs it to do the job.",
          "Representatives carry out their duties during ordinary working hours, and that time counts as work time. Attending the SHE Rep course is covered by the same principle, so an employer cannot expect a representative to train on their own time or on unpaid leave.",
          "Once a workplace has two or more representatives, section 19 makes a health and safety committee mandatory, and that committee must meet at least once every three months. For most Mthatha employers with more than 20 staff, that means the first appointment quickly leads to a recurring meeting and a written record of it.",
        ],
      },
      {
        heading: "Which SHE Rep course to book and who should attend",
        paragraphs: [
          "The one day [SHE Rep course](/courses/health-and-safety-representative) is built around the representative's functions under the Act: inspecting the workplace, identifying hazards, investigating incidents, and taking part in the committee. It suits anyone about to be designated, and anyone already in the role who has never been formally trained.",
          "Delegates should be full-time employees who know the workplace, because that is who the Act allows to be designated. Sending a contractor or a part-time staff member to the course tends to create a representative who cannot lawfully hold the appointment.",
          "RSTL Centre runs the class from Monday to Friday, 08:00 to 16:30, at the Mthatha branch or on site for a group. Larger employers often add the [OHS Act course](/courses/ohs-act) for the people who support the representatives, and pair the appointment with [risk assessment training](/courses/risk-assessment-hira).",
        ],
      },
      {
        heading: "What SHE Rep training costs in Mthatha",
        paragraphs: [
          "RSTL Centre charges R600 for the one day SHE Rep course. Published prices seen in search results on 10 September 2026 showed the same course at R2,950 from NOSA, R800 from Funda Institute, and R1,800 from one Facebook trainer. Those are advertised rates, and they differ for reasons that are not always visible.",
          "Price on its own does not settle the decision. The certificate has to be worth something when a client, a main contractor or a municipality asks for it, so it is worth checking what the provider's course covers and whether the accreditation is stated on the course page.",
          "A directory's own estimate at the time put the average for safety training in Mthatha at about R3,250, within a range of R1,500 to R5,000. That figure is the directory's estimate rather than a surveyed average, but it does suggest local buyers are used to paying well above R600 for a day of safety training.",
        ],
      },
    ],
    faqs: [
      { q: "When must a Mthatha employer appoint a SHE Rep?", a: "The trigger is more than 20 employees. The appointment must be made in writing within four months of starting the business or of the headcount passing 20. Employers who fall under 20 employees are not required to appoint representatives, though many still do." },
      { q: "How many health and safety representatives do I need?", a: "At least one per 100 employees or part thereof in shops and offices, and at least one per 50 employees or part thereof in all other workplaces. A 60 person factory needs two representatives, while a 60 person office needs one." },
      { q: "Can I appoint someone who works part time?", a: "No. Only full-time employees who know the workplace's conditions and activities can be designated as representatives. That rule is why the person who knows the floor is usually a better choice than a manager who is rarely on site." },
      { q: "Is the training done in work time?", a: "Yes. Representatives carry out their duties during ordinary working hours, and that time counts as work time. Section 18(3) also obliges the employer to provide the training a representative may reasonably require to do the job." },
      { q: "How much does the SHE Rep course cost?", a: "RSTL Centre charges R600 for the one day SHE Rep course. For comparison, published prices seen in search results on 10 September 2026 showed the course at R2,950 from NOSA, R800 from Funda Institute, and R1,800 from one Facebook trainer." },
      { q: "Do we need a safety committee as well?", a: "Once two or more representatives are appointed, a health and safety committee is mandatory under section 19, and it must meet at least once every three months. Most workplaces with more than 20 employees will pass that threshold quickly." },
      { q: "Can the SHE Rep course be run at our premises?", a: "Yes. RSTL Centre delivers the course at its Mthatha branch at 1st Floor, Old Mutual Building, Cnr York Road and Leeds Road, on site, or online where the course allows. On site training keeps a full group together and suits shift work." },
    ],
    closingHeading: "Book SHE Rep training in Mthatha",
    courseLinks: [
      { href: "/courses/health-and-safety-representative", label: "SHE Rep course" },
      { href: "/courses/ohs-act", label: "OHS Act course" },
      { href: "/courses/risk-assessment-hira", label: "risk assessment training" },
    ],
  },
  {
    slug: "she-rep-duties-appointment-letter",
    title: "SHE Rep Duties and Responsibilities in South Africa (and How to Appoint One)",
    metaTitle: "SHE Rep Duties and How to Appoint One",
    metaDescription: "SHE Rep duties under the OHS Act: who must be appointed, how many are needed, what the employer provides, and what an appointment letter has to contain.",
    primaryKeyword: "she rep duties",
    secondaryKeywords: ["she rep duties and responsibilities", "she rep duties in construction", "she rep appointment letter template", "she rep functions"],
    category: "Compliance",
    date: "2026-09-10",
    readMinutes: 7,
    excerpt: "SHE Rep duties, the ratios that decide how many representatives a workplace needs, and a step by step appointment process, including what an appointment letter must contain.",
    intro: [
      "She rep duties are easy to list and harder to carry out, because the representative is a colleague first and a safety role second. The Act does not hand that person a clipboard and a corner office. It gives them a defined set of functions, a right to time and training, and a place in a committee that management has to answer.",
      "The Occupational Health and Safety Act 85 of 1993 covers the whole arrangement. It sets out when an employer must designate a representative, how many are needed, what the employer must provide, and when a health and safety committee becomes compulsory. Getting the appointment right takes an afternoon. Getting it wrong shows up the first time an inspector or a client audits the safety file.",
      "Most workplaces get the duties roughly right and the appointment wrong, or the other way around. Both need to be on paper, and both are simple to check.",
    ],
    closing: [
      "The [SHE Rep course](/courses/health-and-safety-representative) runs one day and costs R600. Most employers pair it with the [OHS Act course](/courses/ohs-act) at R650, and many add [Risk Assessment HIRA](/courses/risk-assessment-hira) at R700 so the representative can read the risk assessment they will be working from.",
      "RSTL Centre trains at its Midrand, Durban and Mthatha centres and on site at a client's premises nationally. Classes run daily, Monday to Friday, 08:00 to 16:30, with Saturday by arrangement. See the full list on the [courses page](/courses), then book through the [contact page](/contact).",
    ],
    sections: [
      {
        heading: "What Are the Duties of a SHE Rep?",
        paragraphs: [
          "A health and safety representative represents employees on health and safety matters. The work is to identify hazards, inspect the workplace, report unsafe conditions and unsafe practices, take part in investigations, and put the employees' view to the employer during ordinary working hours. That time counts as work time.",
          "In practice the representative is the eyes of the workforce. They walk the workplace rather than wait to be told what changed. They keep a note of what they find. They raise it with the person who can fix it, and they follow up when the answer is slow. Where an incident happens, they are part of the investigation rather than a spectator to it.",
          "One limit is worth stating. The representative does not carry the legal duty to fix the hazard. That duty stays with the employer. The representative's job is to see the problem, put it on the record, and push until it is dealt with.",
        ],
      },
      {
        heading: "Who Must Be Appointed, and When",
        paragraphs: [
          "An employer with more than 20 employees must designate health and safety representatives in writing within four months of starting business or of the headcount passing 20. The number required is at least one per 100 employees or part thereof in shops and offices, and at least one per 50 employees or part thereof in all other workplaces.",
          "The ratios decide the headcount for you. A shop with 250 employees needs at least three representatives, because the count runs one per 100 employees or part thereof. A workshop, plant or construction operation with 250 employees needs at least five, because the count there runs one per 50.",
          "Eligibility is narrow in one respect. Only full-time employees who know the workplace's conditions and activities can be designated. That rules out a contractor's casual hand who has never walked the site, and it points you towards the people who understand how the work actually runs.",
        ],
      },
      {
        heading: "What the Employer Must Provide",
        paragraphs: [
          "Section 18(3) requires the employer to provide the facilities, assistance and training that a representative may reasonably require. Duties and any training happen during ordinary working hours and count as work time. Section 19 makes a health and safety committee mandatory once there are two or more representatives, and that committee must meet at least once every three months.",
          "The facilities clause covers simple things: somewhere to keep records, access to the areas being represented, and the information needed to do the job. Assistance can mean admin support or an hour with a manager. Training is the piece most employers underestimate, and it is the reason a representative ends up unsure whether they are allowed to stop a job.",
          "Once there are two or more representatives, the committee becomes part of the structure. It is where individual findings turn into decisions that management has to answer. A representative who raises a hazard and gets no response has a next step: the committee item, minuted and dated.",
        ],
      },
      {
        heading: "Section 13, 14 and 18 Are Not the Same Duty",
        paragraphs: [
          "Section 13 is the duty to inform, section 14 holds the employees' own duties, and section 18 deals with health and safety representatives. A representative carries the section 18 functions. Every employee, representative or not, still carries the section 14 duty to take reasonable care of their own safety and that of others.",
          "The confusion matters in a dispute. An employer who says the representative should have stopped the job is mixing the two roles together. An employee who thinks the representative is responsible for compliance has the wrong end of the arrangement. Keeping the sections apart makes the whole conversation clearer.",
        ],
      },
      {
        heading: "What a SHE Rep Does Week to Week",
        paragraphs: [
          "The weekly work depends on the setting. A construction representative walks the site, checks fall protection and access equipment and records what is unsafe. A retail representative checks aisles, storerooms and fire exits. An office representative checks walkways, electrical equipment and housekeeping. All three feed their findings into the same committee structure.",
        ],
        table: {"head": ["Setting", "Common duties", "What gets reported", "Typical rhythm"], "rows": [["Construction site", "Walk work areas, check fall protection, access equipment and the first aid box, watch for unsafe acts", "Hazards, near misses, repeated unsafe practices, equipment defects", "Daily walk, weekly inspection record, monthly report to the committee"], ["Retail", "Check aisles, storerooms, fire exits, stacking and slip risks", "Blocked exits, damaged shelving, poor housekeeping, wet floors", "Weekly floor walk, report to the manager, monthly committee item"], ["Office", "Check walkways, electrical leads, kitchen areas and the first aid box", "Trailing cables, blocked fire doors, faulty equipment", "Weekly walk, monthly committee item"]]},
      },
      {
        heading: "How to Appoint a Health and Safety Representative",
        paragraphs: [
          "Appointment runs in a sequence. Work out how many representatives the ratios require, consult the employees, let them nominate or elect a candidate, designate the person in writing, give them the time and the training, and set up a committee if two or more representatives exist. Skipping the consultation step is the most common mistake.",
          "Consultation is not decoration. Employees who choose their own representative use that person, and a representative imposed from above gets ignored. Where the workforce is large, divide the workplace into areas and let each area choose.",
          "The written designation is the part an auditor will ask for. It should be a single page, signed and dated. Keep a copy in the safety file and give the representative one.",
          "The last step is the committee. Two representatives mean a committee, and a committee means minuted meetings at least every three months. From there the representative has a channel, and management has a record that the hazards were raised.",
        ],
      },
      {
        heading: "What a SHE Rep Appointment Letter Must Contain",
        paragraphs: [
          "An appointment letter must name the employer and the workplace, name the representative, state the legal basis under the OHS Act, describe the area or section represented, give the number of employees and the date the appointment takes effect, and carry the signatures of both parties.",
          "The rest of the letter does the useful work. It should confirm that duties and training happen during ordinary working hours and count as work time, set out the facilities and assistance available, and point to the health and safety committee if one exists. Each signature needs a date beside it.",
          "Write it on the employer's letterhead and keep it to one page. There is no official prescribed wording, so what matters is that every field above appears and that the document is signed and dated. RSTL Centre's SHE Rep course runs one day at R600 and covers these duties in full.",
        ],
      },
    ],
    faqs: [
      { q: "What are the duties of a SHE rep?", a: "A representative identifies hazards, inspects the workplace, reports unsafe conditions and practices, takes part in incident investigations and puts the employees' view to management. The work is done during ordinary working hours and counts as work time. The duty to fix a hazard stays with the employer." },
      { q: "How many SHE reps does a workplace need?", a: "It depends on the ratio. Shops and offices need at least one per 100 employees or part thereof. All other workplaces need at least one per 50 employees or part thereof. An employer with more than 20 employees must make those designations, in writing, within four months." },
      { q: "Must a SHE rep be appointed in writing?", a: "Yes. Where there are more than 20 employees, the employer must designate representatives in writing within four months of starting business or of the headcount passing 20. The written designation is what an inspector or a client will ask for, so keep a signed, dated copy in the safety file." },
      { q: "Does a SHE rep need training?", a: "The employer must provide the training a representative may reasonably require, under section 18(3) of the Act, and that training happens in ordinary working hours and counts as work time. RSTL Centre's SHE Rep course runs one day and costs R600." },
      { q: "Is a health and safety committee compulsory?", a: "It becomes compulsory once there are two or more health and safety representatives, under section 19 of the Act. A single representative does not trigger the committee, but two do. The committee is where individual findings turn into decisions that management must answer." },
      { q: "How often must the committee meet?", a: "A health and safety committee must meet at least once every three months. Some workplaces meet monthly, which is usually easier to keep on top of. Minutes of every meeting should be kept, because they show what hazards were raised and how they were answered." },
      { q: "Does a SHE rep do the work in their own time?", a: "No. Representatives' duties and any training happen during ordinary working hours and count as work time. An employer cannot shift the role onto a lunch break or expect it after hours. The time is part of the job, not a favour." },
    ],
    closingHeading: "Book SHE Rep Training With RSTL Centre",
    courseLinks: [
      { href: "/courses/health-and-safety-representative", label: "SHE Rep course" },
      { href: "/courses/ohs-act", label: "OHS Act course" },
      { href: "/courses/risk-assessment-hira", label: "Risk Assessment HIRA" },
    ],
  },
  {
    slug: "forklift-licence-south-africa-cost",
    title: "How Much Does a Forklift Licence Cost in South Africa? (2026 Guide)",
    metaTitle: "Forklift Licence Cost in South Africa 2026",
    metaDescription: "How much does a forklift licence cost in South Africa in 2026? RSTL Centre charges R1,500 for the one day course, with published prices from about R600.",
    primaryKeyword: "how much does a forklift licence cost in south africa",
    secondaryKeywords: ["forklift licence training", "forklift operator course fees", "forklift licence south africa", "forklift operator course"],
    category: "Machine & Plant",
    date: "2026-09-10",
    readMinutes: 7,
    excerpt: "A straight answer on forklift licence costs in South Africa in 2026, what a course price normally includes, and what the word licence actually means in law.",
    intro: [
      "How much does a forklift licence cost in South Africa? RSTL Centre charges R1,500 for its one day Forklift Operator course. Published prices from small training academies that appeared in search results on 10 September 2026 range from about R600 to R4,500, and one Facebook operator advertises R2,300 to R6,800.",
      "That spread is wide because the quotes are not all for the same thing. Some are for a short course with assessment included, some are for a refresher, and some are for a group rate or a site visit. Two prices that look comparable often are not.",
      "This guide sets out what a forklift course price normally covers, what pushes the number up or down, and what the everyday word licence actually refers to in South African law. If you are budgeting for a crew, the last part matters more than the first.",
      "The figures below are for the forklift operator course specifically. Machine operator training for a TLB, excavator or grader sits in a different price band, and RSTL Centre quotes those on request.",
    ],
    closing: [
      "Send your delegate numbers and the machine types you run through [the contact page](/contact) and RSTL Centre will confirm a date and a quote. The [Forklift Operator course](/courses/forklift-operator) runs daily with no waiting period, and the [full machine and plant range](/courses) covers TLB, excavator, grader and the rest of the fleet.",
    ],
    sections: [
      {
        heading: "What a forklift operator course price normally includes",
        paragraphs: [
          "A forklift operator course price normally covers a day of training, the practical assessment on a machine, and the issuing of a certificate of training. At RSTL Centre that is one day, Monday to Friday, 08:00 to 16:30, at a centre or on your site.",
          "Some providers quote the training only and add the assessment as a separate charge. Others roll everything into one figure but limit how many delegates can share a machine in a day. Ask what the fee covers before you compare it with a lower quote, because the cheapest headline often grows once the extras are added.",
          "A few things sit outside most course prices. Travel to a remote site, machine hire, and re-assessment after a failed practical are the usual extras. If your crew is working on the N2 corridor or a district water project, ask about travel before you confirm.",
        ],
      },
      {
        heading: "What drives the price up or down",
        paragraphs: [
          "Accreditation is the first factor. A provider accredited by TETA and approved by the Chief Inspector carries the cost of maintaining that status, and its price reflects it. A cheaper trainer without that standing may not issue a certificate that satisfies the regulation, which makes the saving worthless.",
          "The machine type is the second factor. A forklift course and a TLB course are not priced the same, because the machine, the fuel, the load and the risk differ. RSTL Centre charges R1,500 for the [Forklift Operator course](/courses/forklift-operator) and R4,500 for the [TLB Operator course](/courses/tlb-operator), quoted on request.",
          "Travel, group size and whether assessment is included make up the rest. On-site training saves a fleet of vehicles a trip to town, and a group booking spreads the trainer's day across more delegates. Ask for both figures, the centre price and the on-site price.",
        ],
      },
      {
        heading: "What a forklift licence actually means in South African law",
        paragraphs: [
          "In South African law the everyday word licence refers to a certificate of training. The Driven Machinery Regulations 2015 require an operator of a lifting machine to hold a certificate of training from a provider accredited by TETA, the Transport SETA, and approved by the Chief Inspector.",
          "The duty falls on the employer. Before a forklift is used, the employer must be satisfied that the operator holds the certificate, and an inspector who arrives on site will ask for it. Experience alone does not answer the question.",
          "That is why a certificate from an unaccredited trainer is not a bargain at any price. If it does not come from an accredited provider, it does not satisfy the regulation, and the employer carries the consequence. Check a provider's accreditation before you pay, and keep the certificate on file.",
        ],
      },
      {
        heading: "What changed on 30 January 2026",
        paragraphs: [
          "The National Code of Practice for Training Providers of Lifting Machine Operators says a carry card is valid for up to 24 months. That is the practical position most workplaces work to today, and it is why carry cards get checked and renewed as a routine.",
          "The position changed on 30 January 2026. A Correction Notice from the Chief Inspector replaced re-certification with relicensing, confirmed that certificates are issued only once, and allowed providers to keep issuing carry cards while a licensing body is being set up. That body has a deadline of 29 May 2027.",
          "Treat this as a regime in transition. Do not treat a fixed validity period as settled law, and do not assume a card that looks current will still be current once the licensing body begins its work. Ask before you book, and get the answer in writing.",
        ],
        table: {"head": ["Price element", "What it usually covers"], "rows": [["Training day", "Theory and machine time with a competent assessor, normally one day"], ["Practical assessment", "Observation of the operator on the machine, with real loads"], ["Certificate issuing", "The certificate of training from the accredited provider"], ["Course material", "Workbook or notes, where the provider supplies them"], ["Travel to site", "The provider's trip to your premises, often quoted separately"], ["Re-assessment", "A second practical assessment after a failed attempt, usually charged again"]]},
      },
    ],
    faqs: [
      { q: "How much does a forklift licence cost in South Africa?", a: "RSTL Centre charges R1,500 for the one day Forklift Operator course. Published prices from small training academies seen in search results on 10 September 2026 run from about R600 to R4,500, and one Facebook operator advertises R2,300 to R6,800. Compare what each fee includes." },
      { q: "How long does the forklift operator course take?", a: "One day. Training at RSTL Centre runs Monday to Friday from 08:00 to 16:30, with Saturday sessions by arrangement and no waiting period between classes. The day includes theory and practical assessment on the machine, so the delegate must be present in person." },
      { q: "Is a forklift licence the same as a certificate of training?", a: "In everyday language people say licence. In law, the Driven Machinery Regulations 2015 refer to a certificate of training from a provider accredited by TETA and approved by the Chief Inspector. Employers should ask for the certificate, not for a licence card." },
      { q: "Does a forklift certificate expire?", a: "Be careful here. The National Code of Practice sets a carry card at up to 24 months, and a Correction Notice dated 30 January 2026 moved the regime to relicensing with a licensing body due by 29 May 2027. Do not treat a fixed validity period as settled law." },
      { q: "Can I do forklift training online?", a: "No. Forklift training is practical and cannot be delivered online. The operator has to be assessed on a machine with real loads and a competent assessor watching. Theory may be handled in a blended format, but the practical assessment is always in person." },
      { q: "What is included in the R1,500 forklift course fee?", a: "It covers the one day operator course, the practical assessment on the machine and the issuing of the certificate of training. Training can run at a centre or on your site, and the final price is quoted on request once RSTL Centre knows your venue and delegate numbers." },
      { q: "Does RSTL Centre also train TLB and other machine operators?", a: "Yes. RSTL Centre runs 34 machine and plant courses, including TLB, excavator, grader, dump truck and front end loader operators. The TLB Operator course costs R4,500 and is quoted on request. The full range is listed on the course page." },
    ],
    closingHeading: "Book a forklift operator course",
    courseLinks: [
      { href: "/courses/forklift-operator", label: "Forklift Operator course" },
      { href: "/courses/tlb-operator", label: "TLB Operator course" },
    ],
  },
];

/** Newest first is the publishing order we want on the index, so keep array order. */
export const PUBLISHED_ARTICLES: Article[] = ALL_ARTICLES;

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ALL_ARTICLES.map((a) => [a.slug, a])
);

export function articleUrl(article: Article | string): string {
  const slug = typeof article === "string" ? article : article.slug;
  return `/articles/${slug}`;
}

/** Other articles to cross-link, excluding the current one. */
export function otherArticles(slug: string, limit = 3): Article[] {
  return ALL_ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
}
