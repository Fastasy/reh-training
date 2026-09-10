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
    metaTitle: "Safety Training in Mthatha: Local Employer Guide",
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
    metaTitle: "SHE Rep Duties and How to Appoint One in South Africa",
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
    metaTitle: "Forklift Licence Cost in South Africa 2026 | RSTL",
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
