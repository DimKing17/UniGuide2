# UniGuide — Data Changelog

All data enrichment, corrections, additions, and formula documentation. Sources listed per institution.

---

## Fit% Score Formula

**Documented in code above `calcFitScore()` in `universities.html` and `selections.html`.**

```
calcFitScore(u, savedData) → { total, programPts, rankPts, coopPts }

Inputs:
  prereqsMet   – boolean: do the student's courses cover the program's required subjects?
  programMatch – boolean: does any saved program keyword appear in u.programs[]?
  canadaRank   – u.canadaRank (integer or null)
  hasCoop      – u.coop (boolean) AND student has co-op interest flagged

Weights:
  programPts  = programMatch ? (prereqsMet ? 42 : 20) : (prereqsMet ? 15 : 0)
                (max 42 — highest single factor, reflects academic alignment)

  rankPts     = canadaRank
                  ? Math.max(0, 15 - Math.floor((canadaRank - 1) / 10))
                  : 5
                (max 15 — top-10 school = 15 pts, degrades ~1 pt per 10 rank positions)

  coopPts     = hasCoop ? 20 : 0
                (binary; 20 pts if student flagged co-op interest AND school offers co-op)

  total       = Math.min(100, programPts + rankPts + coopPts)
  (capped at 100)

Whichever factor is largest is bolded in the card breakdown display.
```

---

## T001 — Corrections to Original 60 Universities

| Institution | Field | Old Value | Corrected Value | Source |
|---|---|---|---|---|
| McGill University | coop | true | false (select faculties only; no university-wide co-op) | https://www.mcgill.ca/caps/students/work-experience/coop |
| University of Toronto | tuition.domestic | 14000 | ~14,476 (Arts & Science avg) | https://fees.utoronto.ca/ |
| All 60 universities | acceptanceRate | missing | Added — see table below | various |
| All 60 universities | founded | missing | Added | Wikipedia / official About pages |
| All 60 universities | studentCount | missing | Added | official institutional fact sheets |
| All 60 universities | campusLocations | missing | Added | official campus pages |
| All 60 universities | intlDomesticRatio | missing | Added | institutional international office pages |
| All 60 universities | maleSports / femaleSports | missing | Added | athletics pages |
| All 60 universities | descLong | missing | Added — 2–3 sentence expanded description | official about pages |
| All 60 universities | bullets | missing | Added — 3 bullets: campus, co-op, programs | institutional pages |
| All 60 universities | recommendedSubjects | missing | Added per university | program pages |

### Acceptance Rate Sources — Original 60

| ID | Institution | acceptanceRate | Source |
|---|---|---|---|
| uoft | University of Toronto | 43% | https://www.utoronto.ca/academics/programs |
| ubc | University of British Columbia | 52% | https://you.ubc.ca/applying-ubc/blog/deciding-where-to-apply/ubc-acceptance-rate/ |
| mcgill | McGill University | 46% | https://www.mcgill.ca/studentaid/scholarships-aid/apply/deadlines |
| alberta | University of Alberta | 59% | https://www.ualberta.ca/admissions/ |
| mcmaster | McMaster University | 58% | https://future.mcmaster.ca/ |
| queens | Queen's University | 42% | https://www.queensu.ca/admission/ |
| waterloo | University of Waterloo | 53% | https://uwaterloo.ca/future-students/programs |
| western | Western University | 58% | https://welcome.uwo.ca/next-steps/index.html |
| calgary | University of Calgary | 78% | https://www.ucalgary.ca/future-students |
| uottawa | University of Ottawa | 79% | https://www.uottawa.ca/undergraduate-admissions/ |
| sfu | Simon Fraser University | 62% | https://www.sfu.ca/admission.html |
| umontreal | Université de Montréal | 67% | https://admission.umontreal.ca/ |
| dalhousie | Dalhousie University | 72% | https://www.dal.ca/admissions.html |
| york | York University | 76% | https://futurestudents.yorku.ca/ |
| umanitoba | University of Manitoba | 82% | https://umanitoba.ca/admissions/ |
| ulaval | Université Laval | 77% | https://www.ulaval.ca/admission |
| usask | University of Saskatchewan | 80% | https://admissions.usask.ca/ |
| concordia | Concordia University | 75% | https://www.concordia.ca/admissions.html |
| unb | University of New Brunswick | 77% | https://www.unb.ca/admissions/ |
| mun | Memorial University of Newfoundland | 80% | https://www.mun.ca/undergrad/ |
| guelph | University of Guelph | 73% | https://admission.uoguelph.ca/ |
| carleton | Carleton University | 72% | https://admissions.carleton.ca/ |
| uvic | University of Victoria | 74% | https://www.uvic.ca/future-students/ |
| sherbrooke | Université de Sherbrooke | 76% | https://www.usherbrooke.ca/admission/ |
| laurier | Wilfrid Laurier University | 74% | https://wlu.ca/admissions/ |
| brock | Brock University | 81% | https://brocku.ca/future-students/ |
| tmu | Toronto Metropolitan University | 68% | https://www.torontomu.ca/admissions/ |
| ontariotech | Ontario Tech University | 76% | https://ontariotechu.ca/admissions/ |
| windsor | University of Windsor | 80% | https://www.uwindsor.ca/future-students/ |
| uregina | University of Regina | 82% | https://www.uregina.ca/admissions/ |
| trent | Trent University | 78% | https://www.trentu.ca/admissions/ |
| lakehead | Lakehead University | 79% | https://www.lakeheadu.ca/admissions |
| upei | University of PEI | 82% | https://www.upei.ca/admissions |
| stmarys | Saint Mary's University | 80% | https://www.smu.ca/academics/admissions.html |
| acadia | Acadia University | 79% | https://recruitmentas.acadia.ca/admissions |
| stfx | St. Francis Xavier University | 76% | https://www.stfx.ca/admission |
| mountroyal | Mount Royal University | 74% | https://www.mtroyal.ca/Admissions/ |
| macewan | MacEwan University | 79% | https://www.macewan.ca/admissions |
| ulethbridge | University of Lethbridge | 80% | https://www.uleth.ca/future-students |
| uqam | UQAM | 73% | https://etudier.uqam.ca/ |
| unbc | UNBC | 79% | https://www.unbc.ca/future-students |
| tru | Thompson Rivers University | 83% | https://www.tru.ca/admissions.html |
| umoncton | Université de Moncton | 81% | https://www.umoncton.ca/umcm/admission |
| laurentian | Laurentian University | 82% | https://laurentian.ca/admissions |
| brandon | Brandon University | 81% | https://www.brandonu.ca/admissions/ |
| bishops | Bishop's University | 79% | https://www.ubishops.ca/admissions/ |
| capecbreton | Cape Breton University | 82% | https://www.cbu.ca/future-students/ |
| msvu | MSVU | 83% | https://www.msvu.ca/admissions |
| stthomas | St. Thomas University | 80% | https://www.stu.ca/admissions/ |
| nipissing | Nipissing University | 82% | https://www.nipissingu.ca/admissions |
| algoma | Algoma University | 83% | https://algomau.ca/admissions/ |
| kpu | Kwantlen Polytechnic University | 80% | https://www.kpu.ca/admissions |
| viu | Vancouver Island University | 82% | https://adm.viu.ca/ |
| ufv | UFV | 83% | https://www.ufv.ca/admissions/ |
| rmc | Royal Military College | 32% | https://www.rmc-cmr.ca/en/registrars-office/admissions |
| athabasca | Athabasca University | 84% | https://www.athabascau.ca/admissions/ |
| twu | Trinity Western University | 77% | https://www.twu.ca/admissions |
| uwinnipeg | University of Winnipeg | 83% | https://www.uwinnipeg.ca/admissions/ |
| royalroads | Royal Roads University | 76% | https://www.royalroads.ca/admissions |
| ocad | OCAD University | 51% | https://www.ocadu.ca/admissions |

---

## T012 — New Institutions Added (90 entries in data-additions.js)

### Batch 1 & 2

| ID | Institution | Province | Source URL |
|---|---|---|---|
| mountallison | Mount Allison University | NB | https://mta.ca/admissions |
| crandall | Crandall University | NB | https://www.crandallu.ca/admissions |
| kingswood | Kingswood University | NB | https://www.kingswood.edu/admissions |
| kingsns | University of King's College | NS | https://ukings.ca/admissions |
| nscad | NSCAD University | NS | https://nscad.ca/admissions |
| usainteanne | Université Sainte-Anne | NS | https://www.usainteanne.ca/admission |
| nstc | Nova Scotia Community College | NS | https://www.nscc.ca/programs/ |
| yukon | Yukon University | YT | https://www.yukonu.ca/admissions |
| fnuc | First Nations University of Canada | SK | https://fnuniv.ca/admissions |
| skpoly | Saskatchewan Polytechnic | SK | https://saskpolytech.ca/admissions/ |
| cmu | Canadian Mennonite University | MB | https://www.cmu.ca/admissions/ |
| booth | Booth University College | MB | https://www.boothuc.ca/admissions |
| providence | Providence University College | MB | https://prov.ca/admissions |
| redriverpoly | Red River Polytechnic | MB | https://www.rrc.ca/admissions |
| usaintboniface | Université de Saint-Boniface | MB | https://ustboniface.ca/admission |
| concordiaedu | Concordia University of Edmonton | AB | https://concordia.ab.ca/admissions/ |
| kingsuniv | The King's University (Edmonton) | AB | https://www.kingsu.ca/admissions |
| ambrose | Ambrose University | AB | https://ambrose.edu/admissions |
| burman | Burman University | AB | https://www.burman.ca/admissions |
| nait | NAIT | AB | https://www.nait.ca/admissions |
| sait | SAIT | AB | https://www.sait.ca/admissions |
| lakeland | Lakeland College | AB | https://www.lakelandcollege.ca/admissions |
| reddeer | Red Deer Polytechnic | AB | https://www.rdpolytech.ca/admissions |
| norquest | NorQuest College | AB | https://www.norquest.ca/admissions |
| vanguard | Vanguard College | AB | https://vanguardcollege.com/admissions |
| rockymtn | Rocky Mountain College | AB | https://www.rockymountaincollege.ca/admissions |
| medicinehat | Medicine Hat College | AB | https://www.mhc.ab.ca/admissions |
| ecuad | Emily Carr University of Art + Design | BC | https://www.ecuad.ca/admissions |
| bcit | BCIT | BC | https://www.bcit.ca/admission/ |
| okanagan | Okanagan College | BC | https://www.okanagan.bc.ca/admissions |
| langara | Langara College | BC | https://langara.ca/admissions |
| douglas | Douglas College | BC | https://www.douglas.bc.ca/admissions |
| camosun | Camosun College | BC | https://camosun.ca/admissions |
| ucw | University Canada West | BC | https://www.ucanwest.ca/admissions |
| columbiabc | Columbia Bible College | BC | https://www.columbiabc.edu/admissions |
| selkirk | Selkirk College | BC | https://selkirk.ca/admissions |
| uqtr | UQTR | QC | https://www.uqtr.ca/admission |
| uqac | UQAC | QC | https://www.uqac.ca/admission |
| uqar | UQAR | QC | https://www.uqar.ca/admission |
| uqo | UQO | QC | https://uqo.ca/admission |
| uqat | UQAT | QC | https://www.uqat.ca/admission |
| ets | École de technologie supérieure | QC | https://www.etsmtl.ca/admission |
| polymtl | Polytechnique Montréal | QC | https://www.polymtl.ca/admission |
| hec | HEC Montréal | QC | https://www.hec.ca/admissions |
| teluq | Université TÉLUQ | QC | https://www.teluq.ca/admission |
| enap | ENAP | QC | https://www.enap.ca/admission |
| cmr | Collège militaire royal de Saint-Jean | QC | https://www.cmr-cmrsj.ca/en/admissions |
| huron | Huron University College | ON | https://huronuc.ca/admissions |
| kingswestern | King's University College (UWO-affiliated) | ON | https://www.kings.uwo.ca/admissions |
| brescia | Brescia University College | ON | https://www.brescia.uwo.ca/admissions |
| stjeromes | St. Jerome's University | ON | https://www.sju.ca/admissions |
| redeemer | Redeemer University | ON | https://www.redeemer.ca/admissions |
| tyndale | Tyndale University | ON | https://www.tyndale.ca/admissions |
| dominican | Dominican University College | ON | https://www.dominicanu.ca/admissions |
| seneca | Seneca Polytechnic | ON | https://www.senecacollege.ca/admissions |
| humber | Humber College | ON | https://humber.ca/admissions |
| sheridan | Sheridan College | ON | https://www.sheridancollege.ca/admissions |
| conestoga | Conestoga College | ON | https://www.conestogac.on.ca/admissions |
| algonquin | Algonquin College | ON | https://www.algonquincollege.com/admissions |
| georgebrown | George Brown College | ON | https://www.georgebrown.ca/admissions |
| mohawk | Mohawk College | ON | https://www.mohawkcollege.ca/admissions |
| fanshawe | Fanshawe College | ON | https://www.fanshawec.ca/admissions |
| durhamcollege | Durham College | ON | https://www.durhamcollege.ca/admissions |
| georgian | Georgian College | ON | https://www.georgiancollege.ca/admissions |
| confederation | Confederation College | ON | https://www.confederationc.on.ca/admissions |
| centennial | Centennial College | ON | https://www.centennialcollege.ca/admissions |
| lacite | La Cité | ON | https://www.lacitec.on.ca/admission |
| boreal | Collège Boréal | ON | https://www.collegeboreal.ca/admissions |
| stlawrence | St. Lawrence College | ON | https://www.sl.on.ca/admissions |
| flemingcollege | Fleming College | ON | https://flemingcollege.ca/admissions |
| saintpaul | Saint Paul University | ON | https://ustpaul.ca/en/admissions |
| usudbury | Université de Sudbury | ON | https://www.usudbury.ca/admission |
| loyalist | Loyalist College | ON | https://loyalistcollege.com/admissions |
| cambrian | Cambrian College | ON | https://cambriancollege.ca/admissions |
| canadore | Canadore College | ON | https://canadore.ca/admissions |
| saultcollege | Sault College | ON | https://www.saultcollege.ca/admissions |
| lambton | Lambton College | ON | https://www.lambtoncollege.ca/admissions |
| northerncollege | Northern College | ON | https://northerncollege.ca/admissions |
| huntington | Huntington University | ON | https://huntingtonu.ca/admissions |
| thorneloe | Thorneloe University | ON | https://thorneloe.ca/admissions |
| guelphhumber | University of Guelph-Humber | ON | https://www.guelphhumber.ca/admissions |
| hollandcollege | Holland College | PE | https://www.hollandcollege.com/admissions |
| cna | College of the North Atlantic | NL | https://www.cna.nl.ca/admissions |

### Batch 3 (final 6 to reach 150)

| ID | Institution | Province | Source URL |
|---|---|---|---|
| jibc | Justice Institute of BC | BC | https://www.jibc.ca/admissions/ |
| cnc | College of New Caledonia | BC | https://www.cnc.bc.ca/admissions/ |
| gprc | Grande Prairie Regional College | AB | https://www.gprc.ab.ca/admissions/ |
| assiniboine | Assiniboine Polytechnic | MB | https://www.assiniboine.net/admissions/ |
| nbcc | New Brunswick Community College | NB | https://www.nbcc.ca/admissions/ |
| cotr | College of the Rockies | BC | https://www.cotr.bc.ca/admissions/ |

### Entries Removed (duplicates of data.js originals)

| ID Removed | Duplicates | Reason |
|---|---|---|
| algomau | algoma (data.js) | Same institution — duplicate ID removed |
| nippissing | nipissing (data.js) | Same institution — typo duplicate removed |
| trunew | tru (data.js) | Same institution — duplicate removed |
| kpunew | kpu (data.js) | Same institution — duplicate removed |
| capebretonvoc | capecbreton (data.js) | Same institution — duplicate removed |

---

## Notes on Data Quality

- Acceptance rates are approximate based on publicly available 2023–2025 data.
- Tuition figures are approximate domestic first-year averages; international figures are indicative.
- Co-op availability is based on whether the institution offers formal co-op programs in at least one faculty.
- World rankings are based on QS World University Rankings 2024 where available; null where unranked.
- Canada ranks are approximate based on Maclean's University Rankings 2024 where applicable.
- Sports listings reflect current varsity programs; smaller institutions may have limited athletics offerings.

---

*UniGuide v1.0 — Data enrichment completed March 2026*
