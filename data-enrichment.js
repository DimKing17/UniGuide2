// ═══════════════════════════════════════════════════════════
//  UniGuide — University Enrichment Data
//  Adds: acceptanceRate, founded, studentCount, campusLocations,
//        intlDomesticRatio, maleSports, femaleSports,
//        descLong, bullets, recommendedSubjects
//
//  Applied at runtime via Object.assign() to each UNIVERSITIES entry.
//  Source: Official admissions pages, Statistics Canada, Maclean's 2024,
//          QS World Rankings 2025, USports.ca, individual university websites.
// ═══════════════════════════════════════════════════════════

const UNI_ENRICHMENT = {

  uoft: {
    acceptanceRate: "43%",
    founded: 1827,
    studentCount: "97,000 students",
    campusLocations: ["St. George (Downtown Toronto)", "Scarborough (UTSC)", "Mississauga (UTM)"],
    intlDomesticRatio: "27% international, 73% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Rowing"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Volleyball", "Rowing"],
    descLong: "The University of Toronto is Canada's most research-intensive university and one of the world's top 25 institutions. Spanning three campuses in the Greater Toronto Area, it offers unparalleled breadth of programs, world-class faculty, and deep ties to industry, government, and hospitals. Students thrive in a city of six million with limitless internship, cultural, and professional opportunities.",
    bullets: [
      "97,000 students across three campuses; largest university in Canada by enrolment",
      "Co-op available via PEY (16-month paid work term) in Engineering, CS, and Sciences",
      "Signature programs: Engineering Science, Rotman Commerce, Computer Science, Medicine, Law"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "History"]
  },

  ubc: {
    acceptanceRate: "52%",
    founded: 1908,
    studentCount: "66,000 students",
    campusLocations: ["Point Grey (Vancouver)", "Okanagan (Kelowna)"],
    intlDomesticRatio: "29% international, 71% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Rowing", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Volleyball", "Rugby", "Rowing", "Swimming", "Softball", "Track & Field"],
    descLong: "The University of British Columbia ranks among the world's top 35 universities and is Canada's leading institution on the West Coast. Its stunning 400-hectare Point Grey campus overlooks the Pacific Ocean, while its Okanagan campus in Kelowna serves interior BC. UBC excels in environmental science, forestry, medicine, and business, attracting students and researchers from over 160 countries.",
    bullets: [
      "66,000 students across Vancouver and Kelowna campuses; 400-hectare Pacific-view main campus",
      "Strong co-op in Engineering, Sciences, CS, Commerce, and Forestry with 3,000+ employer partners",
      "Signature programs: Forestry, Environmental Sciences, Sauder Commerce, Pharmaceutical Sciences"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Statistics", "Environmental Science"]
  },

  mcgill: {
    acceptanceRate: "46%",
    founded: 1821,
    studentCount: "40,000 students",
    campusLocations: ["Downtown Campus (Montréal)", "Macdonald Campus (Ste-Anne-de-Bellevue)"],
    intlDomesticRatio: "29% international, 71% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Tennis"],
    descLong: "McGill University, founded in 1821, is Canada's oldest English-language research university and consistently ranked among the world's top 30 institutions. Located in the heart of Montréal with a second agricultural campus on the island, McGill is world-renowned for its Medicine, Law, and Natural Sciences programs. Its culturally rich, bilingual city environment creates graduates who are exceptionally prepared for global careers.",
    bullets: [
      "40,000 students; two campuses on the island of Montréal; Canada's 'Harvard' reputation",
      "Co-op and internship programs in Engineering (select) and Desautels Management; limited co-op overall",
      "Signature programs: Medicine, Law (McGill), Engineering, Desautels Faculty of Management"
    ],
    recommendedSubjects: ["English", "French", "Biology", "Chemistry", "Mathematics"]
  },

  alberta: {
    acceptanceRate: "58%",
    founded: 1908,
    studentCount: "40,000 students",
    campusLocations: ["North Campus (Edmonton)", "South Campus (Edmonton)", "Campus Saint-Jean (Edmonton)", "Augustana Campus (Camrose)"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Wrestling"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Volleyball", "Cross Country"],
    descLong: "The University of Alberta is a flagship research university in Canada's energy capital, consistently ranked among the world's top 110 institutions. With four campuses and a heritage of excellence in Engineering, Law, and Agricultural Sciences, it offers students world-class facilities and strong connections to Alberta's resource, tech, and healthcare sectors. Edmonton's affordable cost of living makes it a standout value among Canada's top-tier universities.",
    bullets: [
      "40,000 students across four Alberta campuses; #4 in Canada by research output",
      "Co-op available in Engineering, Computing, Business, and Science with strong energy sector ties",
      "Signature programs: Petroleum Engineering, Law, Agricultural Sciences, Medicine"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "Physics"]
  },

  mcmaster: {
    acceptanceRate: "58%",
    founded: 1887,
    studentCount: "32,000 students",
    campusLocations: ["Main Campus (Hamilton, Ontario)"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Soccer", "Rugby", "Swimming", "Track & Field", "Cross Country"],
    femaleSports: ["Basketball", "Soccer", "Rugby", "Swimming", "Track & Field", "Volleyball", "Cross Country"],
    descLong: "McMaster University is a pioneering research institution best known for inventing problem-based learning in health sciences — a model now used worldwide. Located in Hamilton, just 45 minutes from Toronto, McMaster combines world-class research infrastructure with a collaborative, inquiry-driven culture. Its health sciences, engineering, and business programs regularly rank among Canada's very best.",
    bullets: [
      "32,000 students on a single beautiful campus; close to Toronto without Toronto's costs",
      "Co-op in Engineering, Business (DeGroote), and select Science programs",
      "Signature programs: Health Sciences (problem-based), Engineering, DeGroote Business, Nursing"
    ],
    recommendedSubjects: ["Biology", "Chemistry", "English", "Mathematics", "Physics"]
  },

  queens: {
    acceptanceRate: "42%",
    founded: 1841,
    studentCount: "27,000 students",
    campusLocations: ["Main Campus (Kingston, Ontario)"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Rowing"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Rowing"],
    descLong: "Queen's University, founded in 1841, is known for its extraordinary school spirit, legendary alumni network, and the iconic Gaels athletic culture. Set on a classic limestone campus in Kingston, Ontario, it offers intimate class sizes by Canadian research-university standards. Smith School of Business is consistently ranked #1 in Canada for undergraduate business, and its Law and Engineering programs draw top students nationwide.",
    bullets: [
      "27,000 students on a compact, highly walkable campus in historic Kingston",
      "Co-op available in Engineering and Applied Science; Smith Commerce offers internship terms",
      "Signature programs: Smith Commerce, Engineering, Law (Queen's), Life Sciences"
    ],
    recommendedSubjects: ["English", "Mathematics", "Biology", "Chemistry", "Economics"]
  },

  waterloo: {
    acceptanceRate: "53%",
    founded: 1957,
    studentCount: "42,000 students",
    campusLocations: ["Main Campus (Waterloo)", "North Campus (Waterloo)"],
    intlDomesticRatio: "22% international, 78% domestic",
    maleSports: ["Hockey", "Basketball", "Soccer", "Rugby", "Badminton", "Football", "Swimming", "Track & Field"],
    femaleSports: ["Hockey", "Basketball", "Soccer", "Rugby", "Volleyball", "Swimming", "Cross Country", "Track & Field"],
    descLong: "The University of Waterloo operates the world's largest post-secondary co-operative education program, sending over 20,000 students per year on paid work terms with 7,000+ employers globally. Its entrepreneurial culture has produced more tech startup founders than any other Canadian university. Located in the heart of Canada's Silicon Valley, Waterloo graduates are the #1 most recruited by employers nationwide.",
    bullets: [
      "42,000 students; #1 in Canada for employer recruitment and startup founder rate",
      "World's largest co-op program: 6 work terms (20 months) mandatory in Engineering and CS",
      "Signature programs: Computer Science, Software Engineering, Mathematics, Mechatronics, Nanotechnology"
    ],
    recommendedSubjects: ["Advanced Functions", "Calculus", "Physics", "Computer Science", "English"]
  },

  western: {
    acceptanceRate: "57%",
    founded: 1878,
    studentCount: "40,000 students",
    campusLocations: ["Main Campus (London)", "King's University College", "Huron University College", "Brescia University College"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Fencing"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Fencing"],
    descLong: "Western University is celebrated for its beautiful riverside campus, vibrant social life, and the renowned Ivey Business School — Canada's #1 MBA program. With strong programs across Engineering, Health Sciences, and Law, Western combines academic excellence with an unparalleled campus experience. Its tight-knit alumni network, spanning business, law, and medicine, is one of the most powerful in the country.",
    bullets: [
      "40,000 students on one of Canada's most beautiful campuses; legendary school spirit",
      "Co-op in Engineering and Science; Ivey HBA has competitive industry placements",
      "Signature programs: Ivey HBA (Business), Medical Sciences, Engineering, Law"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "Economics"]
  },

  calgary: {
    acceptanceRate: "74%",
    founded: 1966,
    studentCount: "33,000 students",
    campusLocations: ["Main Campus (NW Calgary)", "Downtown Campus"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Curling"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Curling"],
    descLong: "The University of Calgary is one of Canada's most innovative research universities, earning the title of 'Canada's startup university' through its entrepreneurial culture and Eyes High strategy. Situated at the gateway to the Canadian Rockies in a booming economic hub, UCalgary offers strong professional programs with deep industry connections to energy, tech, and healthcare. Its medical school is modelled on McMaster's problem-based approach.",
    bullets: [
      "33,000 students; located in Calgary, gateway city to the Canadian Rockies",
      "Co-op in Engineering, Sciences, and Haskayne Business School; strong energy sector connections",
      "Signature programs: Petroleum Engineering, Medicine (problem-based), Haskayne Business, Law"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "Physics"]
  },

  uottawa: {
    acceptanceRate: "77%",
    founded: 1848,
    studentCount: "44,000 students",
    campusLocations: ["Main Campus (Downtown Ottawa, Ontario)"],
    intlDomesticRatio: "14% international, 86% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Badminton"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Badminton"],
    descLong: "The University of Ottawa is Canada's and the world's largest bilingual (English-French) university, uniquely positioned in the nation's capital with unparalleled access to federal government, Parliament Hill, and international organizations. Its co-op program, one of Canada's largest with 9,000+ students and 5,000+ employers, is especially strong for government and public-sector placements. uOttawa's Law school and Social Sciences programs are among the country's finest.",
    bullets: [
      "44,000 students in downtown Ottawa; only fully bilingual (EN/FR) major research university",
      "One of Canada's largest co-op programs with direct Government of Canada placement pipelines",
      "Signature programs: Law (Civil and Common Law), Social Sciences, Telfer Management, Engineering"
    ],
    recommendedSubjects: ["English", "French", "Biology", "Mathematics", "Political Science"]
  },

  sfu: {
    acceptanceRate: "61%",
    founded: 1965,
    studentCount: "35,000 students",
    campusLocations: ["Burnaby Mountain Campus", "Downtown Vancouver (Woodward's)", "Surrey Central"],
    intlDomesticRatio: "24% international, 76% domestic",
    maleSports: ["Football", "Basketball", "Soccer", "Rugby", "Wrestling", "Swimming", "Cross Country"],
    femaleSports: ["Basketball", "Soccer", "Rugby", "Wrestling", "Swimming", "Volleyball", "Golf"],
    descLong: "Simon Fraser University is BC's second-largest university, renowned for its architecturally striking hilltop Burnaby campus and one of Canada's strongest co-op programs with 3,000+ positions annually. Its Beedie School of Business and School of Computing Science are top-ranked programs nationally, and its downtown Vancouver campus gives urban-minded students city access with mountain views.",
    bullets: [
      "35,000 students across three campuses; stunning hilltop Burnaby campus plus downtown Vancouver",
      "One of Canada's best co-op programs: 3,000+ positions/year in CS, Business, and Engineering",
      "Signature programs: Computing Science, Beedie Business, Interactive Arts & Technology, Criminology"
    ],
    recommendedSubjects: ["English", "Mathematics", "Computer Science", "Biology", "Economics"]
  },

  umontreal: {
    acceptanceRate: "60%",
    founded: 1878,
    studentCount: "67,000 students",
    campusLocations: ["Main Campus (Mount Royal area, Montréal)", "Longueuil Campus", "Laval Campus"],
    intlDomesticRatio: "21% international, 79% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Badminton", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Badminton", "Swimming", "Track & Field"],
    descLong: "Université de Montréal is Canada's second-largest university and the premier French-language research institution in North America. Home to the Mila AI institute — the world's largest academic AI research centre — UdeM is a global leader in artificial intelligence, medicine, and law. Students benefit from Québec's ultra-affordable tuition while living in one of the world's most liveable and culturally vibrant cities.",
    bullets: [
      "67,000 students at three campuses; Canada's largest French-language research university",
      "Co-op in Engineering, Computing (AI-focused), and Pharmacy; strong industry and hospital partnerships",
      "Signature programs: Medicine, Dentistry, Law, Artificial Intelligence (Mila), Veterinary Medicine"
    ],
    recommendedSubjects: ["French", "Biology", "Chemistry", "Mathematics", "English"]
  },

  dalhousie: {
    acceptanceRate: "65%",
    founded: 1818,
    studentCount: "19,000 students",
    campusLocations: ["Studley Campus (Halifax)", "Carleton Campus (Halifax)", "Agricultural Campus (Truro)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Volleyball"],
    descLong: "Dalhousie University, founded in 1818, is the top-ranked university on Canada's East Coast, globally recognized for its Ocean Sciences, Marine Engineering, and Law programs. Located in vibrant and affordable Halifax — regularly named one of Canada's best cities for young people — Dal offers a perfect blend of world-class research and a welcoming, tight-knit community. Its Schulich Law School is consistently among Canada's best.",
    bullets: [
      "19,000 students across Halifax and Truro; best research university on the East Coast",
      "Co-op in Engineering, Computing, Commerce, and Ocean-related Sciences",
      "Signature programs: Ocean and Naval Architecture, Law (Schulich), Medicine, Marine Biology"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "Physics"]
  },

  york: {
    acceptanceRate: "78%",
    founded: 1959,
    studentCount: "56,000 students",
    campusLocations: ["Keele Campus (Toronto)", "Glendon Campus (Toronto — bilingual)"],
    intlDomesticRatio: "21% international, 79% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Tennis"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Tennis"],
    descLong: "York University is Canada's third-largest university, home to two internationally top-ranked professional schools: Schulich School of Business (consistently in the global top 50 for MBA) and Osgoode Hall Law School (one of Canada's top three law schools). Its Lassonde School of Engineering is rapidly growing in space and computer engineering. York's Glendon campus is Canada's only bilingual liberal arts college.",
    bullets: [
      "56,000 students across two Toronto campuses; Glendon is Canada's only bilingual liberal arts college",
      "Co-op and work-integrated learning in Schulich Business, Lassonde Engineering, and select programs",
      "Signature programs: Schulich Business, Osgoode Law, Lassonde Engineering, Space Engineering"
    ],
    recommendedSubjects: ["English", "Mathematics", "Economics", "Business", "Computer Science"]
  },

  umanitoba: {
    acceptanceRate: "73%",
    founded: 1877,
    studentCount: "28,000 students",
    campusLocations: ["Fort Garry Campus (Winnipeg)", "Bannatyne Campus (Health Sciences, downtown Winnipeg)"],
    intlDomesticRatio: "16% international, 84% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Volleyball"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Volleyball", "Cross Country"],
    descLong: "The University of Manitoba, founded in 1877, is Western Canada's oldest university and Manitoba's largest research institution. Known for its strength in Medicine, Agriculture, and Engineering, U of M offers students some of the most affordable tuition among major Canadian research universities while maintaining world-class facilities and faculty. Its close-knit campus culture and proximity to Indigenous communities foster excellent Indigenous research programs.",
    bullets: [
      "28,000 students across two Winnipeg campuses; most affordable major research university in the Prairies",
      "Co-op in Engineering, Computing, Business, and Science with strong agricultural industry connections",
      "Signature programs: Medicine, Agriculture, Engineering, Indigenous Studies, Architecture"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "Indigenous Studies"]
  },

  ulaval: {
    acceptanceRate: "72%",
    founded: 1663,
    studentCount: "45,000 students",
    campusLocations: ["Main Campus (Sainte-Foy, Québec City)"],
    intlDomesticRatio: "13% international, 87% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Volleyball", "Cross Country", "Swimming"],
    descLong: "Université Laval, founded in 1663, is North America's oldest French-language university and one of Canada's most complete research institutions. Its self-contained campus in historic Québec City — a UNESCO World Heritage Site — gives students a unique campus-town experience while studying in one of the continent's most culturally rich cities. Laval is world-renowned for Forestry, Architecture, and Agricultural Sciences.",
    bullets: [
      "45,000 students on a fully self-contained campus in historic Québec City",
      "Co-op (coopérative) in Engineering, Forestry, and Business; strong government and forestry industry ties",
      "Signature programs: Forestry, Architecture, Medicine, Dentistry, Agricultural Sciences, Law"
    ],
    recommendedSubjects: ["French", "Biology", "Chemistry", "Mathematics", "History"]
  },

  usask: {
    acceptanceRate: "73%",
    founded: 1907,
    studentCount: "25,000 students",
    campusLocations: ["Main Campus (Saskatoon, Saskatchewan)"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Wrestling", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Cross Country"],
    descLong: "The University of Saskatchewan is home to Canada's only veterinary college west of Ontario (WCVM) and is a world leader in Agriculture, Indigenous research, and Synchrotron science. Set on a beautiful 930-hectare campus along the South Saskatchewan River, it offers a welcoming, tight-knit community with affordable tuition and strong connections to the province's agricultural and resource industries.",
    bullets: [
      "25,000 students on a picturesque 930-hectare riverside campus; home to Canadian Light Source synchrotron",
      "Co-op in Engineering, Computing, Agriculture, and Business",
      "Signature programs: Veterinary Medicine (WCVM), Agriculture, Engineering, Indigenous Studies"
    ],
    recommendedSubjects: ["Biology", "Chemistry", "Mathematics", "English", "Agriculture"]
  },

  concordia: {
    acceptanceRate: "77%",
    founded: 1974,
    studentCount: "46,000 students",
    campusLocations: ["Sir George Williams Campus (Downtown Montréal)", "Loyola Campus (Côte-Saint-Luc)"],
    intlDomesticRatio: "19% international, 81% domestic",
    maleSports: ["Football", "Basketball", "Soccer", "Rugby", "Swimming", "Badminton", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Rugby", "Swimming", "Volleyball", "Badminton", "Track & Field"],
    descLong: "Concordia University is Montréal's most vibrant urban university, celebrated for its Fine Arts (one of North America's best fine arts schools), John Molson Business School, and innovative media and film programs. With 46,000 students across two Montréal campuses, Concordia attracts creative, entrepreneurial students who benefit from Québec's low tuition while immersed in one of the world's greatest arts cities.",
    bullets: [
      "46,000 students across two Montréal campuses; one of North America's top fine arts schools",
      "Internship programs in John Molson Business and Engineering; limited formal co-op",
      "Signature programs: Fine Arts, Film Production, John Molson Business, Engineering (Concordia)"
    ],
    recommendedSubjects: ["English", "Art", "Mathematics", "Business", "Film Studies"]
  },

  unb: {
    acceptanceRate: "75%",
    founded: 1785,
    studentCount: "12,000 students",
    campusLocations: ["Fredericton Campus", "Saint John Campus"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Volleyball"],
    descLong: "The University of New Brunswick, founded in 1785, is Canada's oldest English-language university, with a proud tradition in Engineering, Forestry, and Computer Science. Its main campus sits atop a hill in Fredericton with stunning river views, while a second campus in the port city of Saint John offers unique programs in applied health and business. UNB's strong industry connections in forestry, cybersecurity, and advanced manufacturing make graduates highly employable.",
    bullets: [
      "12,000 students across Fredericton and Saint John campuses; Canada's oldest English-language university",
      "Co-op in Engineering, Computing, Business, and Science; strong forestry and cybersecurity industry ties",
      "Signature programs: Forestry, Engineering, Cybersecurity, Computer Science, Renaissance College Leadership"
    ],
    recommendedSubjects: ["English", "Mathematics", "Biology", "Physics", "Chemistry"]
  },

  mun: {
    acceptanceRate: "81%",
    founded: 1925,
    studentCount: "18,000 students",
    campusLocations: ["St. John's Campus", "Marine Institute (St. John's)", "Corner Brook (Sir Wilfred Grenfell College)", "Labrador Campus"],
    intlDomesticRatio: "23% international, 77% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country"],
    descLong: "Memorial University of Newfoundland offers the lowest tuition of any comprehensive university in Canada, making it a standout value for students from all provinces. Internationally recognized for Ocean Sciences, Marine Engineering, and Ocean Technology through its Marine Institute, MUN is uniquely positioned to study the North Atlantic ocean environment. Its welcoming, tight-knit campus culture reflects the warmth and resilience of Newfoundland and Labrador.",
    bullets: [
      "18,000 students across four campuses; lowest tuition of any comprehensive Canadian university",
      "Co-op in Engineering, Computing, Business, and Sciences; Marine Institute placements in ocean industries",
      "Signature programs: Ocean and Naval Architecture, Marine Engineering, Folklore, Ocean Sciences"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "Chemistry", "Physics"]
  },

  guelph: {
    acceptanceRate: "68%",
    founded: 1964,
    studentCount: "30,000 students",
    campusLocations: ["Main Campus (Guelph, Ontario)", "Ridgetown Campus"],
    intlDomesticRatio: "15% international, 85% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "The University of Guelph is Canada's top university for Agriculture and Food Science, consistently ranked in the world's top 20 for these disciplines. Its idyllic campus in the small city of Guelph features state-of-the-art research facilities including an Ontario Veterinary College — one of North America's finest — and an Ontario Agricultural College with global reach. A friendly, outdoorsy culture and strong co-op program round out an excellent student experience.",
    bullets: [
      "30,000 students on a beautiful self-contained campus with Ontario Veterinary College on site",
      "Strong co-op across Agriculture, Food Science, Engineering, Computing, and Business with 3,500+ employers",
      "Signature programs: Veterinary Medicine (OVC), Agriculture, Food Science, Biosciences, Hotel and Food Administration"
    ],
    recommendedSubjects: ["Biology", "Chemistry", "English", "Mathematics", "Environmental Science"]
  },

  carleton: {
    acceptanceRate: "77%",
    founded: 1942,
    studentCount: "32,000 students",
    campusLocations: ["Main Campus (Rideau River, Ottawa, Ontario)"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Rowing"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Rowing"],
    descLong: "Carleton University in Ottawa is celebrated for its award-winning journalism school, innovative architecture program, and outstanding Engineering faculty — particularly in Aerospace and Systems Design. Its location in the nation's capital provides unmatched access to government co-op placements, international organizations, and public policy careers. Carleton's compact, fully connected campus on the Rideau River is among the most walkable in Canada.",
    bullets: [
      "32,000 students on a compact, tunnel-connected Rideau River campus in the nation's capital",
      "Co-op in Engineering, CS, and Sprott Business with strong federal government placement pipelines",
      "Signature programs: Journalism, Architecture (Industrial Design), Aerospace Engineering, Public Policy"
    ],
    recommendedSubjects: ["English", "Mathematics", "Computer Science", "History", "Physics"]
  },

  uvic: {
    acceptanceRate: "72%",
    founded: 1963,
    studentCount: "23,000 students",
    campusLocations: ["Main Campus (Victoria, British Columbia)"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Rowing", "Cross Country", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Rowing", "Volleyball", "Swimming", "Track & Field"],
    descLong: "The University of Victoria offers a unique combination of world-class academics, an outstanding co-op program, and one of Canada's most liveable cities — with the mildest year-round climate in the country. Internationally recognized for its Law school (strongest in Western Canada), Environmental Sciences, and Ocean research, UVic nurtures collaborative, socially conscious graduates. The campus sits minutes from the Pacific Ocean, cycling trails, and Canada's warmest winters.",
    bullets: [
      "23,000 students on a single campus minutes from the Pacific Ocean; Canada's mildest city",
      "One of BC's top co-op programs with 1,600+ employer partners in tech, government, and environmental sectors",
      "Signature programs: Law, Environmental Studies, Ocean Sciences, Engineering, Indigenous Language Revitalization"
    ],
    recommendedSubjects: ["English", "Biology", "Environmental Science", "Mathematics", "Chemistry"]
  },

  sherbrooke: {
    acceptanceRate: "68%",
    founded: 1954,
    studentCount: "31,000 students",
    campusLocations: ["Main Campus (Sherbrooke)", "Health Sciences Campus (Sherbrooke)"],
    intlDomesticRatio: "15% international, 85% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "Université de Sherbrooke pioneered cooperative education in Québec and remains the province's leading co-op university. Most Engineering and Science programs are structured entirely around alternating study and work terms, giving graduates 12–20 months of paid industry experience before convocation. Sherbrooke also operates a renowned problem-based medical program and a well-regarded Faculty of Law, all at Québec's exceptionally affordable tuition rates.",
    bullets: [
      "31,000 students across two Sherbrooke campuses; pioneer of co-op education in Québec",
      "Most Engineering and Science programs are 100% co-op by default — up to 5 work terms",
      "Signature programs: Engineering (co-op), Medicine (problem-based), Law, Business Administration"
    ],
    recommendedSubjects: ["French", "Mathematics", "Physics", "Chemistry", "Biology"]
  },

  laurier: {
    acceptanceRate: "72%",
    founded: 1911,
    studentCount: "19,000 students",
    campusLocations: ["Waterloo Campus", "Brantford Campus", "Milton Campus"],
    intlDomesticRatio: "13% international, 87% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Curling", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country", "Curling"],
    descLong: "Wilfrid Laurier University is renowned for its Lazaridis School of Business and Economics — consistently ranked among Canada's top-10 undergraduate business schools — and its exceptional Music faculty. Situated steps from the University of Waterloo in Canada's technology hub, Laurier students benefit from a tight-knit campus community with easy access to one of North America's fastest-growing innovation ecosystems.",
    bullets: [
      "19,000 students across Waterloo, Brantford, and Milton campuses; steps from Waterloo's tech hub",
      "Co-op in Business, Computing, and Science; strong Waterloo Region employer connections",
      "Signature programs: Lazaridis Business, Music (and Music Therapy), Education, Psychology"
    ],
    recommendedSubjects: ["English", "Mathematics", "Economics", "Music", "Biology"]
  },

  brock: {
    acceptanceRate: "76%",
    founded: 1964,
    studentCount: "19,000 students",
    campusLocations: ["Main Campus (St. Catharines, Ontario)"],
    intlDomesticRatio: "13% international, 87% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Badminton"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Badminton"],
    descLong: "Brock University sits on the Niagara Escarpment overlooking the Niagara Peninsula, offering students the unique advantage of proximity to both Toronto and the US border while enjoying a small-city lifestyle in Canada's wine country. Known for strong programs in Tourism and Hospitality, Kinesiology, Business, and Education, Brock emphasizes experiential learning and has a welcoming, accessible admissions profile.",
    bullets: [
      "19,000 students on a scenic escarpment campus in Canada's Niagara wine country; 90 minutes from Toronto",
      "Co-op in Computer Science, Business, and Science programs; Tourism and Niagara industry connections",
      "Signature programs: Tourism, Kinesiology, Education, Business Administration, Child and Youth Studies"
    ],
    recommendedSubjects: ["English", "Biology", "Physical Education", "Business", "Mathematics"]
  },

  tmu: {
    acceptanceRate: "75%",
    founded: 1948,
    studentCount: "46,000 students",
    campusLocations: ["Main Campus (Downtown Toronto — Yonge-Dundas area)"],
    intlDomesticRatio: "23% international, 77% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country"],
    descLong: "Toronto Metropolitan University (formerly Ryerson) is Canada's most urban university, located at the heart of Toronto's Yonge-Dundas Square. With 46,000 students, TMU is renowned for its Ted Rogers School of Business, Engineering programs, and highly career-focused Media, Journalism, and Fashion programs. Its downtown location means students are embedded in Canada's largest job market from day one, with industry partnerships across every faculty.",
    bullets: [
      "46,000 students in the heart of downtown Toronto; most career-integrated urban university in Canada",
      "Co-op in Engineering, Computing, Business, and Communication programs; direct Toronto industry access",
      "Signature programs: Ted Rogers Business, Media Production (Radio-TV), Fashion Design, Architectural Science"
    ],
    recommendedSubjects: ["English", "Mathematics", "Business", "Media Studies", "Computer Science"]
  },

  ontariotech: {
    acceptanceRate: "80%",
    founded: 2002,
    studentCount: "10,000 students",
    campusLocations: ["North Campus (Oshawa)", "Downtown Oshawa Campus"],
    intlDomesticRatio: "17% international, 83% domestic",
    maleSports: ["Basketball", "Soccer", "Hockey", "Esports", "Rugby", "Cross Country"],
    femaleSports: ["Basketball", "Soccer", "Hockey", "Volleyball", "Rugby", "Cross Country"],
    descLong: "Ontario Tech University is Canada's newest science and technology-focused university, established in 2002 in Oshawa (Durham Region). With a strong focus on nuclear, automotive, and game development engineering, it fills a unique niche in the Ontario post-secondary landscape. Its modern facilities, accessible admissions, and strong industry partnerships with General Motors, Ontario Power Generation, and tech firms make it a practical career-launching choice.",
    bullets: [
      "10,000 students across two Oshawa campuses; Canada's most tech-focused newer university",
      "Co-op in Engineering, CS, and Business; partnerships with GM, OPG, and Durham tech sector",
      "Signature programs: Nuclear Engineering, Automotive Engineering, Game Development, Cybersecurity"
    ],
    recommendedSubjects: ["Mathematics", "Physics", "Computer Science", "English", "Chemistry"]
  },

  windsor: {
    acceptanceRate: "79%",
    founded: 1857,
    studentCount: "16,000 students",
    campusLocations: ["Main Campus (Windsor, Ontario)"],
    intlDomesticRatio: "28% international, 72% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Wrestling"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Wrestling"],
    descLong: "The University of Windsor is uniquely situated on the US-Canada border directly across the Detroit River, giving students unparalleled access to North America's largest automotive manufacturing corridor. Its Faculty of Law is particularly respected for its focus on US-Canadian cross-border legal practice, and its Engineering faculty has deep ties to the automotive industry. Windsor's diverse international student population creates a globally connected campus culture.",
    bullets: [
      "16,000 students on a compact campus; only Canadian university on the US border with cross-border industry access",
      "Co-op in Engineering, CS, and Business; automotive industry placements via Detroit-Windsor corridor",
      "Signature programs: Law (cross-border specialization), Automotive Engineering, Odette Business, Social Work"
    ],
    recommendedSubjects: ["English", "Mathematics", "Physics", "Business", "Chemistry"]
  },

  uregina: {
    acceptanceRate: "82%",
    founded: 1961,
    studentCount: "14,000 students",
    campusLocations: ["Main Campus (Regina, Saskatchewan)", "First Nations University of Canada (federated)"],
    intlDomesticRatio: "26% international, 74% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Curling", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Curling", "Cross Country"],
    descLong: "The University of Regina is Saskatchewan's capital city university, offering accessible admissions and affordable tuition while hosting strong programs in Engineering, Journalism, Social Work, and Indigenous Education. Its federated First Nations University of Canada is the only institution of its kind in North America, dedicated to Indigenous-centred higher education. Regina's growing tech and creative sectors provide increasing career opportunities for graduates.",
    bullets: [
      "14,000 students in Regina; home to federated First Nations University of Canada",
      "Co-op in Engineering, Computing, Business, and select Science programs",
      "Signature programs: Journalism, Engineering, Social Work, Indigenous Studies, Paul J. Hill Business"
    ],
    recommendedSubjects: ["English", "Mathematics", "Social Studies", "Indigenous Studies", "Biology"]
  },

  trent: {
    acceptanceRate: "78%",
    founded: 1963,
    studentCount: "10,000 students",
    campusLocations: ["Symons Campus (Peterborough)", "Durham Campus (Oshawa)"],
    intlDomesticRatio: "24% international, 76% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Volleyball"],
    descLong: "Trent University is a liberal arts and sciences university renowned for its small class sizes, stunning natural campus on the Otonabee River, and exceptional programs in Environmental Studies and Indigenous Studies. Trent's commitment to sustainability and reconciliation is embedded in its curriculum and campus culture, making it a first choice for students passionate about the environment, Indigenous rights, and community engagement.",
    bullets: [
      "10,000 students across Peterborough and Oshawa campuses; smallest class sizes among Ontario universities",
      "Co-op in select Computing, Business, and Environmental programs; ecological fieldwork placements",
      "Signature programs: Environmental Studies, Indigenous Studies, Forensic Science, Computing Systems"
    ],
    recommendedSubjects: ["English", "Biology", "Environmental Science", "Indigenous Studies", "Chemistry"]
  },

  lakehead: {
    acceptanceRate: "80%",
    founded: 1965,
    studentCount: "9,000 students",
    campusLocations: ["Thunder Bay Campus", "Orillia Campus"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Nordic Skiing", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Volleyball", "Cross Country", "Nordic Skiing"],
    descLong: "Lakehead University is Northern Ontario's flagship institution, offering a close-knit campus community with outstanding access to boreal forests, Great Lakes ecosystems, and Indigenous communities. Known for its Forestry, Engineering, and Indigenous Studies programs, Lakehead is an ideal choice for students who want small class sizes, personalized mentorship, and a campus embedded in Canada's great north.",
    bullets: [
      "9,000 students across Thunder Bay and Orillia campuses; surrounded by boreal forest and the Great Lakes",
      "Co-op in Engineering, Computing, and Business; Ontario Ministry of Natural Resources field placements",
      "Signature programs: Forestry, Mining Engineering, Indigenous Learning, Nursing, Outdoor Recreation"
    ],
    recommendedSubjects: ["Biology", "Environmental Science", "Mathematics", "English", "Indigenous Studies"]
  },

  upei: {
    acceptanceRate: "83%",
    founded: 1969,
    studentCount: "4,500 students",
    campusLocations: ["Main Campus (Charlottetown, Prince Edward Island)"],
    intlDomesticRatio: "31% international, 69% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Volleyball", "Swimming", "Cross Country"],
    descLong: "The University of Prince Edward Island is one of Canada's smallest universities but punches well above its weight — it is home to one of only four veterinary colleges in Canada (the Atlantic Veterinary College) and has a vibrant, welcoming campus on Canada's most charming province. UPEI's small size means students benefit from exceptional faculty-student relationships and a true sense of community that larger universities cannot match.",
    bullets: [
      "4,500 students on a beautiful island campus; one of four veterinary colleges in Canada",
      "Co-op in Computer Science, Business, and Sustainable Design Engineering",
      "Signature programs: Veterinary Medicine (AVC), Sustainable Design Engineering, Business, Nursing"
    ],
    recommendedSubjects: ["Biology", "Chemistry", "Mathematics", "English", "Physics"]
  },

  stmarys: {
    acceptanceRate: "80%",
    founded: 1802,
    studentCount: "8,000 students",
    campusLocations: ["Main Campus (Halifax, Nova Scotia)"],
    intlDomesticRatio: "29% international, 71% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Cross Country", "Badminton", "Football"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country", "Badminton"],
    descLong: "Saint Mary's University in Halifax has a 200-year history of educating diverse, globally minded graduates. Its Sobey School of Business is well-regarded in Atlantic Canada, and the campus is home to one of the few astronomical observatories at a Canadian undergraduate institution. SMU's strong international student community makes it one of the most culturally diverse campuses in the Maritimes.",
    bullets: [
      "8,000 students in Halifax; one of Atlantic Canada's most culturally diverse campuses",
      "Co-op in Business, Computing, and select Science programs",
      "Signature programs: Sobey Business, Astronomy/Astrophysics, Criminology, Environmental Science"
    ],
    recommendedSubjects: ["English", "Mathematics", "Physics", "Economics", "Chemistry"]
  },

  acadia: {
    acceptanceRate: "72%",
    founded: 1838,
    studentCount: "3,500 students",
    campusLocations: ["Main Campus (Wolfville, Nova Scotia — Annapolis Valley)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "Acadia University is one of Canada's top-ranked primarily undergraduate universities, consistently recognized for student satisfaction, teaching excellence, and its famous Acadia Advantage laptop program — every student receives a Mac. Its small campus in the Annapolis Valley wine country fosters exceptional student-faculty relationships and a true residential college experience. Acadia's programs in Computer Science, Business, and Kinesiology have national recognition.",
    bullets: [
      "3,500 students on a beautiful valley campus; every student receives a MacBook through Acadia Advantage",
      "Co-op in Computer Science, Business, and Science programs; strong Atlantic region placements",
      "Signature programs: Computer Science, Business Administration, Kinesiology, Music, Environmental Science"
    ],
    recommendedSubjects: ["English", "Mathematics", "Computer Science", "Biology", "Music"]
  },

  stfx: {
    acceptanceRate: "75%",
    founded: 1853,
    studentCount: "4,500 students",
    campusLocations: ["Main Campus (Antigonish, Nova Scotia)"],
    intlDomesticRatio: "15% international, 85% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field", "Cross Country"],
    descLong: "St. Francis Xavier University is legendary in Atlantic Canada for its extraordinary community spirit, the famous X-Ring ceremony, and its Coady International Institute — a global leader in community development and social enterprise education. Its intimate campus in Antigonish fosters lifelong friendships and an alumni loyalty that is unmatched in the region. StFX excels in Health Sciences, Education, and Celtic Studies.",
    bullets: [
      "4,500 students on a close-knit Antigonish campus; famous for the X-Ring and exceptional school spirit",
      "Internship programs in Business and Health; limited formal co-op but strong experiential learning",
      "Signature programs: Health Sciences, Nursing, Kinesiology, Celtic Studies, Education, Coady Institute"
    ],
    recommendedSubjects: ["English", "Biology", "Chemistry", "Mathematics", "History"]
  },

  mountroyal: {
    acceptanceRate: "79%",
    founded: 1910,
    studentCount: "15,000 students",
    campusLocations: ["Main Campus (Southwest Calgary, Alberta)"],
    intlDomesticRatio: "12% international, 88% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Track & Field", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Swimming", "Volleyball", "Track & Field"],
    descLong: "Mount Royal University is Calgary's undergraduate-focused university, where small class sizes and teaching excellence are the primary mission. It offers practical, career-oriented programs in Nursing, Business, Communication, and Criminal Justice, with strong relationships with Calgary's healthcare and corporate sectors. Its Southwest Calgary campus is modern, accessible, and close to both the mountains and the city centre.",
    bullets: [
      "15,000 students on a modern SW Calgary campus; undergraduate-only focus means small classes",
      "Co-op in Business, Health, and Communication programs; Calgary industry connections",
      "Signature programs: Nursing, Business Administration, Communication, Criminal Justice, Kinesiology"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "Business", "Physical Education"]
  },

  macewan: {
    acceptanceRate: "82%",
    founded: 1971,
    studentCount: "17,000 students",
    campusLocations: ["Downtown Edmonton Campus"],
    intlDomesticRatio: "14% international, 86% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "MacEwan University is a downtown Edmonton institution known for its welcoming, accessible approach to higher education and outstanding programs in Music, Theatre, Health Sciences, and Social Work. Its vibrant arts culture — centred on the Conservatory of Music and Centre for the Arts — distinguishes it from other Alberta institutions. Urban location, affordable tuition, and small class sizes make MacEwan a popular choice for students who want city life without big-city university costs.",
    bullets: [
      "17,000 students in the heart of downtown Edmonton; strong arts and health sciences culture",
      "Practicum and internship programs in Nursing, Social Work, and Business",
      "Signature programs: Music (Conservatory), Social Work, Nursing, Business Administration, Theatre Arts"
    ],
    recommendedSubjects: ["English", "Music", "Biology", "Mathematics", "Drama"]
  },

  ulethbridge: {
    acceptanceRate: "83%",
    founded: 1967,
    studentCount: "9,000 students",
    campusLocations: ["Main Campus (Lethbridge, Alberta)", "Calgary Campus"],
    intlDomesticRatio: "18% international, 82% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "The University of Lethbridge is renowned for its striking Brutalist-modernist architecture campus set above the Oldman River coulees, and for its internationally recognized Neuroscience research program. A primarily undergraduate teaching university, ULeth offers personalized attention, unique Neuroscience and Fine Arts strengths, and strong Agricultural programs in Southern Alberta's fertile growing region.",
    bullets: [
      "9,000 students on a famously architecturally bold campus above the Lethbridge river valley",
      "Co-op in Management, Computing, and Science; strong southern Alberta agricultural and tech connections",
      "Signature programs: Neuroscience, Fine Arts (Studio Art, Music), Agriculture, Computer Science"
    ],
    recommendedSubjects: ["Biology", "Mathematics", "English", "Art", "Chemistry"]
  },

  uqam: {
    acceptanceRate: "78%",
    founded: 1969,
    studentCount: "43,000 students",
    campusLocations: ["Downtown Montréal Campus (Latin Quarter, integrated into city blocks)"],
    intlDomesticRatio: "16% international, 84% domestic",
    maleSports: ["Football", "Basketball", "Soccer", "Rugby", "Badminton", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Rugby", "Volleyball", "Badminton", "Track & Field"],
    descLong: "Université du Québec à Montréal is the most progressive and arts-driven French-language university in Québec, physically integrated into the Latin Quarter of downtown Montréal. Known for its Social Sciences, Communication, and Fine Arts programs, UQAM attracts students who want affordable education in a politically engaged, culturally rich urban environment. Its Dance, Theatre, and Design programs are among the strongest in eastern Canada.",
    bullets: [
      "43,000 students; campus is woven into Montréal's Latin Quarter neighbourhood blocks",
      "Internship programs across multiple faculties; limited formal co-op",
      "Signature programs: Social Sciences, Communication, Fine Arts, Dance, Theatre, Urban Studies"
    ],
    recommendedSubjects: ["French", "Social Studies", "Art", "Mathematics", "English"]
  },

  unbc: {
    acceptanceRate: "82%",
    founded: 1990,
    studentCount: "4,000 students",
    campusLocations: ["Prince George Campus", "Prince Rupert Campus", "Terrace and Quesnel Partner Sites"],
    intlDomesticRatio: "17% international, 83% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country"],
    descLong: "The University of Northern British Columbia is the university for Canada's northern BC interior, offering small class sizes, personal faculty mentorship, and outstanding access to boreal forests, salmon rivers, and Indigenous communities. Internationally recognized for its Environmental Sciences and Indigenous health research programs, UNBC is the ideal choice for students who want to study the natural world in an environment as spectacular as the subjects they study.",
    bullets: [
      "4,000 students in Prince George with satellite sites; one of Canada's most spectacular natural settings",
      "Co-op in Business, Computing, and Environmental programs; northern BC industry connections",
      "Signature programs: Environmental Science, Forestry, First Nations Studies, Nursing, Natural Resources Management"
    ],
    recommendedSubjects: ["Biology", "Environmental Science", "Mathematics", "English", "Indigenous Studies"]
  },

  tru: {
    acceptanceRate: "84%",
    founded: 1970,
    studentCount: "25,000 students",
    campusLocations: ["Main Campus (Kamloops, BC)", "Williams Lake Campus"],
    intlDomesticRatio: "28% international, 72% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country", "Rugby"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country", "Rugby"],
    descLong: "Thompson Rivers University in Kamloops is a comprehensive open-access institution serving students from across BC and internationally. Home to Canada's only standalone law school west of Manitoba that offers a full JD program in a smaller setting, TRU also offers strong programs in Business, Nursing, and Environmental Sciences. Kamloops' dry, sunny climate and proximity to ski hills and rivers make for an outstanding quality of life.",
    bullets: [
      "25,000 students (including online); open-access admissions; Kamloops is sunny and outdoor-recreation rich",
      "Co-op in Business, Computing, and Technology programs; trades and open-learning options",
      "Signature programs: Law (JD), Nursing, Business, Adventure Studies, Environmental Science"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "Social Studies", "Chemistry"]
  },

  umoncton: {
    acceptanceRate: "78%",
    founded: 1963,
    studentCount: "6,000 students",
    campusLocations: ["Moncton Campus", "Edmundston Campus", "Shippagan Campus"],
    intlDomesticRatio: "16% international, 84% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Volleyball", "Swimming"],
    descLong: "Université de Moncton is the most comprehensive Francophone university in Atlantic Canada, serving the Acadian community across three New Brunswick campuses. Its Engineering, Business, and Science programs are strong, and its location in Moncton — one of Canada's fastest-growing bilingual cities — gives students access to a booming tech sector and government jobs. UdeM graduates are prized by employers seeking bilingual talent across Canada.",
    bullets: [
      "6,000 students across three NB campuses; heart of Acadian higher education in Atlantic Canada",
      "Co-op in Engineering, Business, and Computing; Moncton's growing tech and logistics sectors",
      "Signature programs: Engineering, Business Administration, Nursing, Acadian Studies, Marine Biology"
    ],
    recommendedSubjects: ["French", "English", "Mathematics", "Biology", "Chemistry"]
  },

  laurentian: {
    acceptanceRate: "80%",
    founded: 1960,
    studentCount: "8,500 students",
    campusLocations: ["Main Campus (Sudbury, Ontario — lakeside)"],
    intlDomesticRatio: "17% international, 83% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Swimming", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Volleyball", "Cross Country", "Swimming"],
    descLong: "Laurentian University, Ontario's only bilingual (English-French) research university, is uniquely positioned in Sudbury — the heart of Canada's mining industry. Its internationally recognized Mining Engineering and Mineral Sciences programs attract students from around the world, and its beautiful lakeside campus provides a quality of life that larger urban universities cannot match. Strong Indigenous Studies programs reflect the university's deep connection to Northern Ontario's First Nations communities.",
    bullets: [
      "8,500 students on a lakeside campus in Sudbury; only bilingual research university in Ontario",
      "Co-op in Engineering, Business, and Science; world-class mining industry connections",
      "Signature programs: Mining Engineering, Indigenous Studies, Nursing, Sciences, Bilingual Education"
    ],
    recommendedSubjects: ["English", "French", "Mathematics", "Chemistry", "Physics"]
  },

  brandon: {
    acceptanceRate: "88%",
    founded: 1899,
    studentCount: "3,200 students",
    campusLocations: ["Main Campus (Brandon, Manitoba)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: ["Basketball", "Volleyball", "Soccer", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Volleyball", "Soccer", "Cross Country", "Track & Field"],
    descLong: "Brandon University in Manitoba's second city is best known for its nationally recognized Faculty of Music — one of Canada's finest — and its welcoming, accessible approach to higher education. Small class sizes and a tight-knit community make it an excellent choice for students seeking personal attention and mentorship. Brandon's rural setting in the agricultural heartland gives unique context to its Environmental Science and Indigenous Studies programs.",
    bullets: [
      "3,200 students in Brandon; nationally recognized Music faculty — one of Canada's best",
      "Practicum programs in Education, Nursing, and Social Work; limited formal co-op",
      "Signature programs: Music (BM/BMEd), Education, Rural Development, Indigenous Studies, Psychiatric Nursing"
    ],
    recommendedSubjects: ["Music", "English", "Biology", "Mathematics", "History"]
  },

  bishops: {
    acceptanceRate: "79%",
    founded: 1843,
    studentCount: "2,800 students",
    campusLocations: ["Main Campus (Lennoxville, Québec — Eastern Townships)"],
    intlDomesticRatio: "25% international, 75% domestic",
    maleSports: ["Football", "Basketball", "Hockey", "Soccer", "Rugby", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "Bishop's University is Québec's only English-language liberal arts university outside Montréal, offering an intimate residential college experience at Québec's remarkably low tuition rates. With 95% of first-year students living on campus and a student-to-faculty ratio of just 13:1, Bishop's fosters the close intellectual community more typically found at small American liberal arts colleges. Its Eastern Townships campus is set amid stunning natural landscapes near Sherbrooke.",
    bullets: [
      "2,800 students; 95% of first-year students live on campus — true residential college experience",
      "Internship programs in Business; limited formal co-op but excellent experiential opportunities",
      "Signature programs: Business Administration, Education (Physical), Kinesiology, Psychology, Liberal Arts"
    ],
    recommendedSubjects: ["English", "French", "Business", "Mathematics", "History"]
  },

  capecbreton: {
    acceptanceRate: "88%",
    founded: 1974,
    studentCount: "4,500 students",
    campusLocations: ["Main Campus (Sydney, Cape Breton Island, Nova Scotia)"],
    intlDomesticRatio: "45% international, 55% domestic",
    maleSports: ["Basketball", "Soccer", "Hockey", "Rugby", "Cross Country"],
    femaleSports: ["Basketball", "Soccer", "Hockey", "Volleyball", "Cross Country"],
    descLong: "Cape Breton University has one of the highest proportions of international students of any Canadian university, creating an exceptionally multicultural campus on the scenic shores of Cape Breton Island. Its Unama'ki College is Canada's only Indigenous-focused college within a university, offering programs grounded in Mi'kmaw language and culture. CBU's Business, Information Technology, and Community Studies programs are well-regarded in Atlantic Canada.",
    bullets: [
      "4,500 students; ~45% international — one of Canada's most globally diverse campuses",
      "Co-op in Business, IT, and Health programs; tourism and hospitality industry connections",
      "Signature programs: Business, Unama'ki College (Indigenous), IT, Community Studies, Hospitality"
    ],
    recommendedSubjects: ["English", "Business", "Mathematics", "Biology", "Social Studies"]
  },

  msvu: {
    acceptanceRate: "82%",
    founded: 1873,
    studentCount: "4,000 students",
    campusLocations: ["Main Campus (Halifax, Nova Scotia)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: ["Basketball", "Soccer", "Swimming", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Swimming", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "Mount Saint Vincent University in Halifax is one of Canada's few universities with a historical focus on women's education, now co-educational but retaining a strong commitment to gender equity and women's leadership. Known for its Nutrition, Education, and Tourism programs, MSVU emphasizes student success through small class sizes and a highly supportive faculty-student culture, making it one of Atlantic Canada's most student-centred institutions.",
    bullets: [
      "4,000 students in Halifax; historic women's-focused university now co-ed with equity mission",
      "Co-op in Business, Tourism, and Technology programs; Halifax industry connections",
      "Signature programs: Nutrition and Dietetics, Education, Tourism, Communication, Women's Studies"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "Chemistry", "Social Studies"]
  },

  stthomas: {
    acceptanceRate: "85%",
    founded: 1910,
    studentCount: "2,500 students",
    campusLocations: ["Main Campus (Fredericton, NB — shared grounds with UNB)"],
    intlDomesticRatio: "15% international, 85% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country"],
    descLong: "St. Thomas University is a small Catholic liberal arts university located on the same grounds as UNB in Fredericton, creating a unique dual-campus resource for its 2,500 students. Known for its Social Work program (one of Atlantic Canada's finest), Journalism, and Human Rights, STU's 16:1 student-faculty ratio ensures close mentorship and personal growth. Its curriculum integrates faith, ethics, and social justice throughout all programs.",
    bullets: [
      "2,500 students sharing the Fredericton campus with UNB; one of Canada's smallest liberal arts universities",
      "Practicum programs in Social Work, Education, and Journalism; strong NB community placements",
      "Signature programs: Social Work, Journalism, Human Rights, Criminology, Theology/Religious Studies"
    ],
    recommendedSubjects: ["English", "Social Studies", "History", "Philosophy", "Religion"]
  },

  nipissing: {
    acceptanceRate: "84%",
    founded: 1992,
    studentCount: "4,500 students",
    campusLocations: ["Main Campus (North Bay, Ontario)", "Brantford Campus"],
    intlDomesticRatio: "15% international, 85% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Cross Country"],
    descLong: "Nipissing University in North Bay is widely known across Ontario for its highly respected Bachelor of Education programs — consistently producing excellent teachers for Ontario classrooms. With small class sizes averaging under 25 students, personalized mentorship is a hallmark of the Nipissing experience. Its Northern Ontario setting offers access to stunning natural environments that enrich programs in Environmental Science, Outdoor Recreation, and Indigenous Studies.",
    bullets: [
      "4,500 students in North Bay and Brantford; Ontario's most recognized teacher education university",
      "Practicum placements in Education, Nursing, and Social Work throughout Ontario",
      "Signature programs: Education (BEd), Nursing, Social Work, Environmental Science, Indigenous Studies"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "History", "Physical Education"]
  },

  algoma: {
    acceptanceRate: "88%",
    founded: 1993,
    studentCount: "2,800 students",
    campusLocations: ["Sault Ste. Marie Campus (former Shingwauk residential school site)", "Brampton Campus"],
    intlDomesticRatio: "35% international, 65% domestic",
    maleSports: ["Basketball", "Soccer", "Hockey", "Cross Country"],
    femaleSports: ["Basketball", "Soccer", "Hockey", "Volleyball"],
    descLong: "Algoma University has a unique and important mandate built on reconciliation: its main campus is on the historic Shingwauk residential school site in Sault Ste. Marie, operating in partnership with the Shingwauk Kinoomaage Gamig to promote Indigenous learning and healing. Algoma's small size enables close faculty-student relationships, and its Indigenous-centred programming is among the most thoughtful in Ontario. Open-access admissions welcome diverse learners.",
    bullets: [
      "2,800 students with unique reconciliation mandate; main campus on Shingwauk residential school site",
      "Practicum programs in Social Work and Education; limited formal co-op",
      "Signature programs: Indigenous Studies, Anishinaabe Languages, Social Work, Computer Science, Business"
    ],
    recommendedSubjects: ["English", "Social Studies", "Biology", "Mathematics", "Indigenous Studies"]
  },

  kpu: {
    acceptanceRate: "86%",
    founded: 1981,
    studentCount: "20,000 students",
    campusLocations: ["Surrey Campus", "Richmond Campus", "Langley Campus", "Cloverdale Campus"],
    intlDomesticRatio: "30% international, 70% domestic",
    maleSports: ["Basketball", "Soccer", "Badminton", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Volleyball", "Badminton"],
    descLong: "Kwantlen Polytechnic University serves Metro Vancouver's South of Fraser communities through four campuses, offering accessible degree programs alongside applied technical credentials. Known for its nationally recognized Design programs, Brewing and Brewery Operations (one of Canada's only degree-level programs), and Horticulture programs, KPU blends academic and applied learning in a welcoming, open-access environment.",
    bullets: [
      "20,000 students across four Metro Vancouver campuses; open-access polytechnic degree programs",
      "Co-op in Business, Technology, and Design programs; strong Lower Mainland industry connections",
      "Signature programs: Design (Interior, Fashion, Graphic), Brewing, Horticulture, Business Administration, Criminology"
    ],
    recommendedSubjects: ["English", "Mathematics", "Art", "Business", "Biology"]
  },

  viu: {
    acceptanceRate: "85%",
    founded: 1969,
    studentCount: "13,000 students",
    campusLocations: ["Nanaimo Campus (main)", "Powell River Campus", "Duncan Campus (Cowichan)"],
    intlDomesticRatio: "22% international, 78% domestic",
    maleSports: ["Basketball", "Soccer", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Volleyball", "Cross Country"],
    descLong: "Vancouver Island University offers degree programs deeply connected to Vancouver Island's marine, forestry, and Indigenous communities. Its Fisheries and Aquaculture program is one of the finest in BC, and Indigenous language revitalization programs have brought VIU international recognition. Students enjoy the island lifestyle — ocean, mountains, and old-growth forests — at one of BC's most affordable post-secondary institutions.",
    bullets: [
      "13,000 students across three Vancouver Island campuses; strong marine and Indigenous focus",
      "Co-op in Business and select Health programs; tourism and marine industry connections",
      "Signature programs: Fisheries and Aquaculture, Marine Biology, Indigenous Languages, Business, Education"
    ],
    recommendedSubjects: ["Biology", "English", "Environmental Science", "Mathematics", "Indigenous Studies"]
  },

  ufv: {
    acceptanceRate: "87%",
    founded: 1974,
    studentCount: "15,000 students",
    campusLocations: ["Abbotsford Campus (main)", "Chilliwack Campus", "Mission Campus"],
    intlDomesticRatio: "25% international, 75% domestic",
    maleSports: ["Basketball", "Soccer", "Wrestling", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Soccer", "Volleyball", "Wrestling", "Cross Country"],
    descLong: "The University of the Fraser Valley serves the Fraser Valley with accessible, teaching-focused degree programs and strong community ties to the region's diverse South Asian, Indigenous, and agricultural communities. Known for its strong Criminology and Nursing programs, UFV also offers distinctive programs in Agricultural Science and South Asian Studies that reflect its community context. Its affordable tuition and open admissions make higher education accessible to a wide range of students.",
    bullets: [
      "15,000 students across three Fraser Valley campuses; accessible and deeply community-rooted",
      "Co-op in Business, IT, and select programs; Fraser Valley agricultural and tech connections",
      "Signature programs: Criminology, Nursing, Agricultural Science, South Asian Studies, Business Administration"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "Social Studies", "Chemistry"]
  },

  rmc: {
    acceptanceRate: "15%",
    founded: 1876,
    studentCount: "1,000 students",
    campusLocations: ["Fort Henry Hill Campus (Kingston, Ontario)"],
    intlDomesticRatio: "5% international, 95% Canadian Forces",
    maleSports: ["Hockey", "Basketball", "Soccer", "Rugby", "Rowing", "Track & Field", "Fencing", "Triathlon"],
    femaleSports: ["Basketball", "Soccer", "Rugby", "Rowing", "Volleyball", "Track & Field", "Triathlon"],
    descLong: "The Royal Military College of Canada is the only degree-granting military college in Canada and one of the most selective institutions in the country, accepting fewer than 300 officer cadets per year. Fully funded by the Canadian Armed Forces, RMC provides a rigorous STEM-focused education combined with military training, leadership development, and bilingual requirements. Graduates serve as officers in Canada's Army, Navy, and Air Force.",
    bullets: [
      "~1,000 officer cadets; fully funded (no tuition) for Canadian Armed Forces candidates",
      "Military service placements are integrated throughout the degree — no traditional co-op",
      "Signature programs: Engineering (all disciplines), Military and Strategic Studies, Computer Science, Mathematics"
    ],
    recommendedSubjects: ["Mathematics", "Physics", "English", "French", "Computer Science"]
  },

  athabasca: {
    acceptanceRate: "100%",
    founded: 1970,
    studentCount: "40,000 students (online)",
    campusLocations: ["No physical campus required — fully online; administrative office in Athabasca, Alberta"],
    intlDomesticRatio: "10% international, 90% domestic",
    maleSports: [],
    femaleSports: [],
    descLong: "Athabasca University is Canada's leading open and online university, offering flexible, self-paced degree programs to over 40,000 students worldwide — with no minimum admission requirements for most programs. Designed for working adults, mature students, and anyone who needs flexibility, AU allows students to start a course at any time and study from anywhere. Its accredited degrees in Business, Computing, Nursing, and Social Sciences are well-recognized by employers.",
    bullets: [
      "40,000+ students worldwide; 100% online — Canada's only open-admission research university",
      "No formal co-op; online schedule accommodates full-time work alongside studies",
      "Signature programs: Business Administration (MBA pathway), Computer Science, Nursing (completion), Psychology"
    ],
    recommendedSubjects: ["English", "Mathematics", "Computer Science", "Social Studies", "Biology"]
  },

  twu: {
    acceptanceRate: "77%",
    founded: 1962,
    studentCount: "4,500 students",
    campusLocations: ["Main Campus (Langley, BC)", "Richmond Campus", "Laurentian Leadership Centre (Ottawa)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: ["Basketball", "Hockey", "Soccer", "Rugby", "Golf", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Hockey", "Soccer", "Volleyball", "Golf", "Cross Country", "Track & Field"],
    descLong: "Trinity Western University is Canada's leading Christian liberal arts university, offering undergraduate and graduate programs grounded in a faith-based values framework. Known for Nursing, Business, Education, and its Laurentian Leadership Centre in Ottawa, TWU attracts students who want academic rigour combined with a strong sense of community and purpose. Its BC campus is surrounded by mountains and easy access to Vancouver.",
    bullets: [
      "4,500 students in Langley BC; Canada's leading faith-based liberal arts university",
      "Co-op in Nursing and Business programs; community health and business placements",
      "Signature programs: Nursing, Education, Business Administration, Psychology, Leadership"
    ],
    recommendedSubjects: ["English", "Biology", "Mathematics", "Philosophy", "Chemistry"]
  },

  uwinnipeg: {
    acceptanceRate: "84%",
    founded: 1967,
    studentCount: "9,000 students",
    campusLocations: ["Downtown Winnipeg Campus"],
    intlDomesticRatio: "25% international, 75% domestic",
    maleSports: ["Basketball", "Volleyball", "Cross Country", "Track & Field"],
    femaleSports: ["Basketball", "Volleyball", "Cross Country", "Track & Field"],
    descLong: "The University of Winnipeg is a downtown liberal arts and sciences university with a strong commitment to social justice, environmental sustainability, and urban engagement. Known for its Indigenous Studies, Environmental Science, and Humanities programs, UWinnipeg offers intimate class sizes and a politically engaged community. Its location in downtown Winnipeg gives students direct access to government, arts, and non-profit organizations.",
    bullets: [
      "9,000 students in downtown Winnipeg; urban liberal arts focus with social justice mission",
      "Practicum and internship programs in Social Work, Education, and select programs",
      "Signature programs: Indigenous Studies, Environmental Studies, Urban and Regional Studies, Rhetoric and Professional Writing"
    ],
    recommendedSubjects: ["English", "Social Studies", "Biology", "History", "Indigenous Studies"]
  },

  royalroads: {
    acceptanceRate: "84%",
    founded: 1995,
    studentCount: "4,000 students",
    campusLocations: ["Hatley Castle Campus (Colwood, BC — near Victoria)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: [],
    femaleSports: [],
    descLong: "Royal Roads University operates on one of Canada's most spectacular heritage sites — the Gothic Revival Hatley Castle estate in Colwood, BC — and specializes in applied, cohort-based professional degrees. Most programs are designed for working professionals and blend face-to-face residency periods with flexible online learning. Royal Roads is particularly recognized for Environmental Management, Leadership, and Tourism programs.",
    bullets: [
      "4,000 students on the stunning Hatley Castle heritage estate near Victoria, BC",
      "Work-integrated learning embedded throughout all programs; designed for working professionals",
      "Signature programs: Environmental Management, Leadership (MBA), Tourism, Communication, Justice Studies"
    ],
    recommendedSubjects: ["English", "Environmental Science", "Business", "Social Studies", "Mathematics"]
  },

  ocad: {
    acceptanceRate: "55%",
    founded: 1876,
    studentCount: "4,200 students",
    campusLocations: ["Main Campus (Downtown Toronto — McCaul Street)"],
    intlDomesticRatio: "20% international, 80% domestic",
    maleSports: [],
    femaleSports: [],
    descLong: "OCAD University — Canada's largest and oldest art and design university — occupies a distinctive tabletop building above a Victorian heritage building in downtown Toronto. Portfolio-based admission selects students with genuine artistic talent, and the curriculum spans drawing, ceramics, digital media, industrial design, and critical theory. OCAD graduates fill creative leadership roles in Toronto's booming tech, fashion, film, and design industries.",
    bullets: [
      "4,200 students in the heart of Toronto's arts district; portfolio-based admission required",
      "Work-integrated learning through industry studios and co-ops; direct Toronto design and media industry access",
      "Signature programs: Industrial Design, Illustration, Graphic Design, Interaction Design, Game Development, Drawing and Painting"
    ],
    recommendedSubjects: ["Visual Arts", "English", "Design Technology", "Art History", "Digital Media"]
  }
};

// ═══════════════════════════════════════════════════════════
//  PROGRAM_DATA enrichment — adds recommendedSubjects to each
//  entry (not required for admission, but strengthen your app)
// ═══════════════════════════════════════════════════════════
const PROGRAM_ENRICHMENT = {
  "waterloo__mechanical-engineering": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "TDJ4M (Technological Design)", "MDM4U (Data Management)", "ICS4U (Computer Science)"]
  },
  "waterloo__computer-science": {
    recommendedSubjects: ["MDM4U (Data Management)", "TEJ4M (Computer Engineering Tech)", "ICS4C (Intro Computer Studies)", "MCV4U (Calculus & Vectors)"]
  },
  "mcmaster__health-sciences": {
    recommendedSubjects: ["SES4U (Earth & Space Science)", "HSB4U (Challenge & Change in Society)", "HHG4M (Human Development)", "PSK4U (Kinesiology)"]
  },
  "mcmaster__engineering": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "TDJ4M (Technological Design)", "MDM4U (Data Management)", "ICS4U (Computer Science)"]
  },
  "queens__commerce": {
    recommendedSubjects: ["BAT4M (Financial Accounting)", "BOH4M (Business Leadership)", "BBB4M (International Business)", "MDM4U (Data Management)"]
  },
  "uoft__engineering": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "ICS4U (Computer Science)", "MDM4U (Data Management)", "TDJ4M (Technological Design)"]
  },
  "ubc__science": {
    recommendedSubjects: ["SES4U (Earth & Space Science)", "SVN4M (Environmental Science)", "MDM4U (Data Management)", "ICS4U (Computer Science)"]
  },
  "uoft__mechanical-engineering": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "TDJ4M (Technological Design)", "TMJ4M (Manufacturing Engineering Tech)", "ICS4U (Computer Science)"]
  },
  "uoft__computer-science": {
    recommendedSubjects: ["MDM4U (Data Management)", "TEJ4M (Computer Engineering Tech)", "ICS4C (Intro Computer Studies)", "MCV4U (Calculus & Vectors)"]
  },
  "uoft__life-sciences": {
    recommendedSubjects: ["SES4U (Earth & Space Science)", "SVN4M (Environmental Science)", "PSK4U (Kinesiology)", "HHG4M (Human Development)"]
  },
  "mcmaster__engineering-i": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "TDJ4M (Technological Design)", "MDM4U (Data Management)", "ICS4U (Computer Science)"]
  },
  "queens__engineering": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "ICS4U (Computer Science)", "MDM4U (Data Management)", "TDJ4M (Technological Design)"]
  },
  "western__ivey": {
    recommendedSubjects: ["BAT4M (Financial Accounting)", "BOH4M (Business Leadership)", "BBB4M (International Business)", "CIA4U (Current Economic Issues)"]
  },
  "mcgill__engineering": {
    recommendedSubjects: ["TEJ4M (Computer Engineering Tech)", "ICS4U (Computer Science)", "MDM4U (Data Management)", "FEF4U (French Immersion) — useful for McGill"]
  }
};

// Apply PROGRAM_DATA enrichment
if (typeof PROGRAM_DATA !== 'undefined') {
  Object.entries(PROGRAM_ENRICHMENT).forEach(([key, enrichment]) => {
    if (PROGRAM_DATA[key]) {
      Object.assign(PROGRAM_DATA[key], enrichment);
    }
  });
}

// ── Apply enrichment to all UNIVERSITIES entries ───────────────
if (typeof UNIVERSITIES !== 'undefined') {
  UNIVERSITIES.forEach(u => {
    if (UNI_ENRICHMENT[u.id]) {
      Object.assign(u, UNI_ENRICHMENT[u.id]);
    }
    // ── T002: Recompute comp / compLabel from acceptanceRate ──
    if (u.acceptanceRate) {
      const pct = parseInt(u.acceptanceRate, 10);
      if (!isNaN(pct)) {
        if (pct < 30) {
          u.comp = 'very';
          u.compLabel = 'Very Competitive';
        } else if (pct <= 60) {
          u.comp = 'comp';
          u.compLabel = 'Competitive';
        } else {
          u.comp = 'mod';
          u.compLabel = 'Moderate';
        }
      }
    }
  });
}
