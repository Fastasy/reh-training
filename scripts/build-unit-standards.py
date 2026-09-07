import json, re

src = open('lib/courses.ts').read()
names = set(re.findall(r'name:\s*"([^"]+)"', src))

# Authoritative table: catalogue course -> client-site LP page data.
# us_id may contain ' & ' for pages that align to more than one unit standard.
T = {
  # ---- Safety & Legal Compliance ----
  "Accident & Incident Investigation": ("244288", "Investigate incidents", "4"),
  "Health & Safety Representative (SHE Rep)": ("259622", "Describe the functions of the workplace health and safety representative", "2"),
  "OHS Supervisor": ("259622", "Supervise health and safety in the workplace", "4"),
  "COIDA (Compensation for Occupational Injuries & Diseases Act)": ("259638", "Explain compensation for occupational injuries and diseases", "3"),
  "Risk Assessment (HIRA)": ("242811", "Conduct a risk assessment", "4"),
  "Legal Liability & Compliance Training": ("259615", "Explain legal liability in the workplace", "4"),
  "Safe Stacking & Storage": ("259601", "Demonstrate knowledge of safe stacking and storage", "2"),
  "Construction Housekeeping": ("116231", "Maintain a clean and safe construction site", "2"),
  "Flagman (Stop & Go)": ("242974", "Apply flagging procedures to control traffic", "2"),
  "Construction Supervisor Course": ("13964", "Supervise a construction site", "4"),
  # ---- Technical Courses ----
  "Plumbing Safety & Legal Compliance": ("13224", "Monitor the application of safety, health and environmental protection procedures", "4"),
  "Cold Water Plumbing Systems": ("244507", "Install, maintain and test cold water supply systems", "4"),
  "Hot Water Systems (Geysers & Boilers)": ("244496", "Install, maintain and test hot water supply systems", "4"),
  "Drainage & Rainwater Systems Installation": ("244498 & 244495", "Install, maintain and test below ground drainage systems / rainwater systems", "4"),
  "Solar Water Heating Course": ("244499", "Install and maintain solar water heating systems", "4"),
  "Pipe Laying & Jointing": ("12903", "Install storm water pipelines", "2"),
  "Leak Detection & Basic Maintenance": ("244494", "Perform specialised fault-finding and repairs to plumbing systems", "4"),
  # ---- Machines & Tools ----
  "Hand & Power Tools Safety": ("12878", "Use and maintain Power Hand Tools", "2"),
  "Power (Electrical) Tools": ("10255", "Select, use and care for power tools", "2"),
  "Manual (Hand) Tools": ("12877", "Use and maintain hand tools on a construction site", "2"),
  "Grinders Operator": ("10255", "Select, use and care for power tools", "2"),
  "Cut-Off Saw Operator": ("10255", "Select, use and care for power tools", "2"),
  "Portable Power Tools": ("10255", "Select, use and care for power tools", "2"),
  # ---- Heights and Access ----
  "Working at Heights": ("120362", "Monitor, report and advise on activities performed in a working at heights environment", "3"),
  "Fall Arrest Techniques": ("229998", "Explain and perform fall arrest techniques when working at height", "1"),
  "Fall Arrest Rescue": ("229995", "Install, use and perform basic rescues from fall arrest", "3"),
  "Fall Protection Plan Developer": ("229994", "Assess a worksite for work at height and prepare a fall protection plan", "2"),
  "Scaffolding Erector": ("263245", "Erect, alter and dismantle scaffolding", "2"),
  "Scaffolding Inspector": ("263244", "Inspect scaffolding and ensure compliance with safety standards", "3"),
  "Ladder Inspector": ("259639", "Inspect and use ladders", "2"),
  "Cherry Picker Operator": ("243272", "Operate a self-propelled elevating work platform", "2"),
  "Basic Rigging & Slinging": ("116229", "Perform basic rigging and slinging operations", "2"),
  "Confined Space Entry": ("116206", "Conduct confined space entry", "2"),
  "Confined Space Rescue": ("252245", "Perform confined space rescue operations", "2–3"),
  "Safe Use of Breathing Apparatus": ("123259", "Use and maintain self-contained breathing apparatus", "2"),
  "Mobile Elevating Work Platform (MEWP)": ("243272", "Operate a self-propelled elevating work platform", "2"),
  "Scaffolding Supervisor": (None, "Scaffolding Supervision, Inspections & Legal Compliance", "4"),
  # ---- Emergency Courses ----
  "First Aid Level 1": ("119567", "Provide first aid as an advanced first responder", "1"),
  "First Aid Level 2": ("120496", "Provide first aid in the workplace", "2"),
  "First Aid Level 3": ("120497", "Provide first aid in the workplace", "3"),
  "Emergency Evacuation Procedures": ("259589", "Demonstrate knowledge and understanding of emergency preparedness", "2"),
  "Basic Fire Awareness": ("12484", "Fight fires in the workplace", "2"),
  "Basic Firefighting": ("120331", "Apply basic fire fighting procedures", "2"),
  "Fire Marshal": ("259585", "Demonstrate knowledge of fire prevention and firefighting equipment", "2"),
  "Fire Equipment Inspector": ("259584", "Inspect firefighting equipment", "2"),
  # ---- Dangerous Goods & Environmental ----
  "Controlling Hazardous & Dangerous Goods": ("244073", "Control hazardous chemical substances", "2"),
  "Convey Dangerous Goods by Road": ("123259", "Convey dangerous goods by road", "2"),
  "Dangerous Goods – Identification": ("119558", "Identify and classify dangerous goods for transport", "2"),
  "Move & Store Hazardous Loads": ("260837", "Move and store hazardous loads", "2"),
  "Spill Kit Responder": ("242999", "Respond to and clean up a spill", "2"),
  "Chemical Hazards (HAZCHEM)": ("120370", "Monitor and make recommendations on the application of health and safety principles regarding hazardous substances in the workplace", "4"),
  "Hazardous Materials Awareness": ("120370", "Monitor and make recommendations on the application of health and safety principles regarding hazardous substances in the workplace", "3"),
}

bad = [k for k in T if k not in names]
assert not bad, f"not in catalogue: {bad}"

out = {k: {"us_id": v[0], "us_name": v[1], "nqf": v[2]} for k, v in T.items()}
with open('lib/course-content/unit-standards.json', 'w') as f:
    json.dump(out, f, indent=1, ensure_ascii=False)
print("wrote", len(out), "courses to lib/course-content/unit-standards.json")

still = sorted(names - set(T))
print("courses with NO unit-standard source on old site:", len(still))
for n in still:
    print("  -", n)
