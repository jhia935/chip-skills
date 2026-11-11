# MLCC Dielectric Slurry Line: Equipment Structure and Step Order
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: equipment and the order of operations from powder charging to the tape-caster feed. Composition numbers (PVB %, dispersant dose, viscosity) are already in `10-powder-and-slurry.md`; only the parts needed to place a step are repeated here.
Reading method: patents were read in full text on Google Patents (WebFetch or browser page text); vendor pages were read on the page itself; the two Japanese PDFs were read as extracted text. Anything seen only in a search-result snippet is marked "(snippet, unverified)".

## Sources
| key | title | publisher | year | tier | URL |
|---|---|---|---|---|---|
| [sem-us7229035] | Method of deagglomerating ceramic powder, deagglomeration mill ... highly dispersed slurry (US7229035B2) — re-read for apparatus and step order | Samsung Electro-Mechanics (patent) | 2007 (filed 2004) | T4 | https://patents.google.com/patent/US7229035B2/en |
| [murata-us6511564] | Method for producing ceramic slurry, ceramic green sheet, and monolithic ceramic electronic component (US6511564B2) | Murata Manufacturing (patent) | 2003 (priority 1999-12-03) | T4 | https://patents.google.com/patent/US6511564 |
| [murata-us6579394] | Method of producing ceramic slurry, ceramic slurry composition, ceramic green sheet and multilayer ceramic electronic part (US6579394B1) | Murata Manufacturing (patent) | 2003 (filed 2000-07-21) | T4 | https://patents.google.com/patent/US6579394B1/en |
| [tdk-us7744711] | Manufacturing method of ceramic slurry, green sheet and multilayer ceramic device (US7744711B2) | TDK (patent) | 2010 (priority 2003-09-12) | T4 | https://patents.google.com/patent/US7744711B2/en |
| [murata-us7503993] | Method for manufacturing multilayer ceramic electronic element (US7503993B2) — slurry tank/pump/die-coater feed | Murata Manufacturing (patent) | 2009 (filed 2004-08-25) | T4 | https://patents.google.com/patent/US7503993B2/en |
| [jph08216146] | セラミックススラリーの真空脱泡装置 (JP H08-216146 A, application withdrawn 2002) — alumina slurry example | Nippon Steel (patent application) | 1996 | T4 | https://patents.google.com/patent/JPH08216146A/ja |
| [nakamura-2011-funsai] | スラリー特性制御によるセラミックスの構造制御と高機能化 (粉砕 No.54, pp.47-51) | I. Nakamura (Murata) / Hosokawa Micron journal | 2011 | T5 | https://www.hosokawamicron.co.jp/jp/files/items/2232/File/54_2011010.pdf |
| [johokiko-mlcc-2019] | 積層セラミックコンデンサ（MLCC） book, sample chapter (pp.36, 59, 65 and ch.4 excerpt) | 情報機構 (Johokiko) | c.2019 (sample PDF dated 2019-02) | T5 | https://johokiko.co.jp/publishing/BC181202_sample.pdf |
| [vma-dispermat-sl] | Introduction to the milling technology with the bead mill DISPERMAT SL (general paints focus) | VMA-Getzmann | n.d. (PDF 2019) | T6 | https://theengineer.markallengroup.com/production/content/uploads/2014/10/Introduction-to-the-milling-technology-with-the-bead-mill-DISPERMAT-SL.pdf |
| [shibuya-mko-ipros] | MLCC材料のプレミキシング分散に コーンミル「MKO」 (product page) | Shibuya Kogyo (IKA partner) via IPROS | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/shibuya/product/detail/2001652985/ |
| [ika-mko-ipros] | MLCC原料の湿式粉砕・分散・乳化 MKO2000 cone mill (product page) | IKA Japan via IPROS | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/IKAJPN/product/detail/2000594574/ |
| [ashizawa-smax-ipros] | スターミル MAX ナノ・ゲッター (product page, last updated 2013-05-24) | Ashizawa Finetech via IPROS | 2013 | T6 | https://mono.ipros.com/product/detail/47378013 |
| [nck-scmill-ipros] | SCミル media-agitating mill (product page) | Nippon Coke & Engineering via IPROS | n.d. (accessed 2026-11-11) | T6 | https://mono.ipros.com/product/detail/2384004 |
| [mfx-m110eh-web] | M-110EH pilot-scale Microfluidizer processor (product page; not MLCC-specific) | Microfluidics | n.d. (accessed 2026-11-11) | T6 | https://www.microfluidics-mpt.com/microfluidizers/pilot-scale-m-110eh |
| [sugino-sb-ipros] | スターバースト wet micronization (contract-processing page) | Sugino Machine via IPROS | n.d. (accessed 2026-11-11) | T6 | https://www.ipros.com/product/detail/2000519692 |

Existing keys reused from `10-powder-and-slurry.md` (not re-read): [yang-2026-pvb], [tdk-us7632369], [ieee-technav].

## Equipment structure
- **Premix / mill feed.** Powder and EtOH are weighed and stirred 1 h at 300 rpm in a stirrer; the stirrer outlet feeds the mill inlet through a diaphragm pump (patent text says "diagram pump") [sem-us7229035].
- **Inline premixing alternative.** Inline rotor-stator cone mill placed before the bead mill to break coarse agglomerates; continuous, also circulation operation; page says one MLCC maker adopted it as the bead-mill pre-mixer [shibuya-mko-ipros]. Same machine family: stepless rotor/stator gap, up to 50,000 mPa·s, pressure operation to 16 bar, zirconia rotor/stator option for metal-free work [ika-mko-ipros].
- **Bead mill (deagglomeration mill).** Mill body with impeller (disc body with replaceable tetrahedral projections), discs, main shaft and beads all ZrO2/YSZ; outlet gap G sized so 0.2-0.3 mm beads stay in and only slurry leaves; cooling water and air are switched on before feeding [sem-us7229035]. Example mill: length 150 mm, diameter 175 mm, impeller 100 mm; conventional bead/basket mill example: diameter 185 mm, length 463 mm [sem-us7229035].
- Other bead-separation designs: gap separator over the whole rotor circumference, built for large-flow circulation, 0.2-1 mm beads [nck-scmill-ipros]; separately driven centrifugal separator allowing beads down to 0.03 mm, MLCC listed as an application [ashizawa-smax-ipros]. Beads <=50 um are now used for MLCC dielectric dispersion [johokiko-mlcc-2019].
- **Basket mill.** Used for "primary media dispersion" of the full formulation (deagglomerated powder + additive + binder + plasticizer + solvent + dispersant) [sem-us7229035]. Conventional basket/bead-mill media 0.6-1 mm ZrO2/Y-ZrO2 [sem-us7229035].
- **Ball mill.** ZrO2 balls; force comes from falling balls, so shear is small; fine for ~1 um particles, limited for sub-micron [johokiko-mlcc-2019]. Example 2 mm ZrO2 balls, 500 parts per 100 parts powder [murata-us6579394].
- **Binder vehicle line.** Binder dissolved in solvent with stirring, optionally refluxed, then filtered before it is added to the milled slurry [murata-us6511564]; binder dissolved in alcohol and filtered before combining [tdk-us7632369]. Alternative: high-pressure dispersion of the binder solution (>= ~100 kg/cm2) lowers its viscosity so a finer filter can be used [murata-us6579394]. Undissolved resin left in the binder solution causes voids after firing [johokiko-mlcc-2019].
- **High-pressure disperser.** Patent device: reaction chamber where the tube diameter drops sharply, then bends; slurry hits the wall, giving impact, shear and cavitation in sequence [sem-us7229035]. "Collide with a wall or pass a taper-reduced passage" [murata-us6579394]. Named machine in an example: Sugino Ultimaizer HJP-25005 [tdk-us7744711]. Generic processor layout: inlet reservoir, single-acting intensifier pump with electro-hydraulic drive, fixed-geometry interaction chamber with no moving parts, on-board heat exchanger downstream, optional chamber cooling bath [mfx-m110eh-web]. Media-free oblique-collision type [sugino-sb-ipros]. Wet jet mills are used for pre-treatment but are not suited to finish dispersion [johokiko-mlcc-2019].
- **Filters.** Materials metal, PTFE, PP, nylon; membrane, surface or depth type [murata-us6511564]. Fine filters clog easily with ceramic powder when the slurry is filtered [murata-us6579394].
- **Vacuum de-aerator (general ceramic, alumina example).** ~50 L vacuum vessel with agitator; wavy/uneven inner wall and wavy blade near the surface; blade top set 1-5 cm above the liquid; vessel/blade height adjustable [jph08216146].
- **Feed to caster.** Die-coater head connected to the slurry tank through a pump [murata-us7503993]. Tape caster = film unwinder, casting head, slurry supply device (metered supply to the head), dryer, winder [nakamura-2011-funsai].
- **QC.** B-type viscometer, S21 rotor, 25 C, 50 rpm; wire-bar test sheet, glossmeter, tensile tester [tdk-us7744711]. D90 by laser-scattering PSD as dispersion index [johokiko-mlcc-2019]; Microtrac PSD [murata-us6579394].

## Step sequence
1. Weigh powder, additive, solvent, dispersant; mix [sem-us7229035] (conventional flow, FIG. 1). Flow per Murata author: powder + dispersion medium + dispersant mixed, then binder mixed, then sheet forming [nakamura-2011-funsai]. Dispersion = wetting -> deagglomeration -> stabilisation [nakamura-2011-funsai].
2. Route A (conventional two-stage milling): primary milling 12-24 h -> add binder, plasticizer, solvent -> secondary milling ~12 h -> filter [sem-us7229035]; ball mill 20 h pre-grind [tdk-us7632369]; two-step ball mill [yang-2026-pvb].
3. Route B (patent, bead mill first): powder + EtOH stirred -> bead-mill deagglomeration in passes -> full formulation incl. binder -> basket mill 3-5 h (3 h pref.) -> high-pressure dispersion 3-7 passes -> 1-2 um filter [sem-us7229035].
4. Route C: ball/bead mill primary dispersion -> add filtered binder solution -> secondary dispersion by high-pressure disperser -> optional filter -> sheet [murata-us6511564]; ball mill 5 h -> high-pressure 20 passes [murata-us6579394].
5. Route D: high-pressure dispersion of a preliminary slurry containing <10 wt% (>=1, pref. >=4 wt%) of the binder -> add the rest of the binder lacquer -> ball mill 16 h [tdk-us7744711].
6. After the last mill: filter [sem-us7229035][murata-us6511564]; filter and de-aerate before casting [ieee-technav]; 6 h standing de-gas [yang-2026-pvb].
7. Slurry tank -> pump -> die-coater head [murata-us7503993].

Bead mill operating mode: pass (collect after each pass) vs re-circulation (outlet back to the feed vessel); re-circulation called more efficient for hard-to-disperse solids [vma-dispermat-sl]. The patent example runs passes ("number of passages") [sem-us7229035].

## Parameter ranges
| parameter | value | key | notes |
|---|---|---|---|
| Premix | 300 rpm, 1 h | [sem-us7229035] | powder + EtOH only in Example 1 |
| Bead size (deagglomeration) | 0.2-0.3 mm ZrO2; <0.2 mm escapes the gap, >0.3 mm crushes primaries | [sem-us7229035] | |
| Bead-mill optimum | 30 wt% solids, 10 m/s, 800 ml/min, 3 passes | [sem-us7229035] | test grid 10/30 wt%, 6/10 m/s, 600/1000 ml/min, 2/4 passes |
| D90 model | D90 = 0.680 + 0.00461 solids - 0.0253 v + 0.000377 Q - 0.101 passes | [sem-us7229035] | empirical fit from Table 1 |
| Basket-mill time | 3-5 h (3 h pref.); 750 rpm x 3 h in Ex. 2 | [sem-us7229035] | <3 h uneven, >5 h pulverizes |
| Bead charge | up to ~80% | [vma-dispermat-sl] | general bead mills |
| Beads for MLCC | <=50 um in use; Y-ZrO2; contamination rises quickly past a usage time | [johokiko-mlcc-2019] | bead management needed |
| Particle size needing bead mill | 0.15-0.4 um (ball mill ok near 1 um) | [johokiko-mlcc-2019] | |
| Ball-mill time | 5 h (2 mm balls) | [murata-us6579394] | 12-24 h [sem-us7229035]; 20 h [tdk-us7632369]; 16 h post-binder [tdk-us7744711] |
| Binder reflux | ~40-100 C (ex. 65 C, 5 h) | [murata-us6511564] | optional |
| Binder-solution filter | pore <= ~2 um at ~99% cutoff (ex. 1 um, 0.1 um) | [murata-us6511564] | |
| Binder-solution HP | >= ~100 kg/cm2 (ex. 1000 kg/cm2) | [murata-us6579394][murata-us6511564] | |
| Binder amount (general) | 8-14% of powder weight | [nakamura-2011-funsai] | binder must burn out fully below ~400 C |
| Lacquer | 15% PVB in ethanol/n-propanol 1:1 | [tdk-us7744711] | |
| HP pressure / passes | 10,000-25,000 psi, 3-7 passes | [sem-us7229035] | detailed text says 15,000-25,000 psi |
| HP pressure / passes | 1300 kg/cm2, 5 passes, 300 cc/min | [murata-us6511564] | 20 passes in [murata-us6579394] |
| HP pressure / temperature | 100 MPa -> slurry 42 C after; 160 MPa -> 63 C; ref. case 70 C ~ solvent boiling | [tdk-us7744711] | why the outlet heat exchanger matters |
| HP shear rate | 1e7-1e8 1/s | [tdk-us7744711] | |
| Oblique-collision HP | 100-245 MPa, up to 441 L/h | [sugino-sb-ipros] | contract processing page |
| Pilot HP processor | up to 30,000 psi, 295-450 ml/min, 3.7 kW drive | [mfx-m110eh-web] | not MLCC-specific |
| Cone mill | up to 50,000 mPa·s, up to 16 bar | [ika-mko-ipros] | |
| Final filter | 1-2 um | [sem-us7229035] | pore < 5x sheet thickness at ~99% cutoff [murata-us6511564] |
| D90 after ball mill only / + HP | 0.45 / 0.41 um; sheet shorts 2.8% / 0.6% | [murata-us6511564] | sand mill instead of HP: D90 0.62, shorts 51% |
| D90 after ball 5 h + HP 20 passes | 0.45 um, SSA +8% | [murata-us6579394] | |
| Final slurry viscosity | ~0.003-0.1 Pa·s | [murata-us6511564] | conflicts with "hundreds to tens of thousands mPa·s" [johokiko-mlcc-2019] and 400-700 cP [yang-2026-pvb] |
| Viscosity method | B-type, S21, 25 C, 50 rpm | [tdk-us7744711] | |
| Test-sheet pass marks | gloss >= 70%, strength >= 4.5 MPa | [tdk-us7744711] | |
| Vacuum de-aeration | atmospheric to about -650/-750 mmHg; blade top 1-5 cm above surface | [jph08216146] | alumina aqueous example; no time or rpm given |

## Gaps / unverified
- No MLCC maker states the line order outright; the order on the 3D page combines patent examples (routes A-D above). Earlier page version put the basket mill before the bead mill; [sem-us7229035] puts the bead mill (powder + solvent) first and the basket mill after binder addition. Changed to follow the patent.
- Weighing equipment (load cells, auto-dosing) for MLCC slurry: no source; general practice.
- Let-down/transfer tanks, agitated storage tank, duplex filter housings, differential-pressure gauges, vacuum pump type, jacket heating of the binder tank: no source; general practice.
- One-pass bead milling has temperature-rise issues and needs extra pumps/de-aeration at scale (METI SME report, snippet, unverified). Water-jacketed mills are increasingly common (JP patent snippet, unverified). Bühler large-screen/ceramic-liner claims (snippet only).
- [sem-us7229035] mill orientation (horizontal/vertical) is not stated; the page draws a representative horizontal mill.
- Die coater "about 10 um or thinner with high accuracy" and supply-tank level affecting thickness (US6096370) seen only in search snippets.
- [mfx-m110eh-web] and [vma-dispermat-sl] are general equipment sources, not MLCC lines.
- Fetch failures: Microfluidics "how it works" page and Sugino Star Burst page (tool refusal); NETZSCH MLCC page (403); METI PDF (403).
