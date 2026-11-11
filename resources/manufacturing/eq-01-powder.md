# MLCC Dielectric Powder Line — Equipment Structure and Step Order (BaTiO3 synthesis to packed powder)
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: how a BaTiO3 powder line is built and sequenced, for the 3D page `visualizations/01-powder-3d.html`. Dopant coating is covered in the wiki concept `dopant-powder-coating`; slurry making is in `10-powder-and-slurry.md`. Patent examples are lab or pilot embodiments, not production recipes. Google Patents pages were read via WebFetch (long pages truncated at ~100k characters; claims sometimes not reached). The Micromeritics article was read as text extracted from the open-access PDF (CC BY 2.1 JP); the PDF itself was not kept.

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| [us9771274] | Method for producing barium titanate powder (US9771274B2) | Sakai Chemical Industry | 2017 (filed 2014, priority 2013) | T4 | https://patents.google.com/patent/US9771274 |
| [us6129903] | Hydrothermal process for making barium titanate powders (US6129903A) | Cabot Corp (Kerchner) | 2000 (priority 1998) | T4 | https://patents.google.com/patent/US6129903 |
| [us4643984] | Process for producing a composition which includes perovskite compounds (US4643984A) | Sakai Chemical Industry | 1987 (priority 1984) | T4 | https://patents.google.com/patent/US4643984A/en |
| [us9005568] | Process for production of powder of perovskite compound (US9005568B2) | Sakai Chemical Industry | 2015 (priority 2004) | T4 | https://patents.google.com/patent/US9005568B2/en |
| [us7431911] | Barium titanate and production and process thereof (US7431911B2) | Showa Denko (now Resonac) | 2008 (filed 2002) | T4 | https://patents.google.com/patent/US7431911B2 |
| [us20090264276] | Production method of dielectric particles (US20090264276A1, application) | TDK Corp | 2009 (priority 2008) | T4 (application, grant status not checked) | https://patents.google.com/patent/US20090264276A1/en |
| [us5783165] | Method of making barium titanate (US5783165A, oxalate route) | Ferro Corp | 1998 | T4 | https://patents.google.com/patent/US5783165A/en |
| [us7179441] | Method for preparing barium-titanate based powder (US7179441B2, oxalate route) | Samsung Electro-Mechanics / Samsung Fine Chemicals | 2007 (priority 2001) | T4 | https://patents.google.com/patent/US7179441B2/en |
| [hosokawa-bt-web] | Barium titanate (MLCC dielectric) grinding and drying application page | Hosokawa Micron (equipment maker) | n.d. (accessed 2026-11-11) | T6 | https://hosokawamicron.co.jp/en/applications/1019 ; https://www.hosokawamicron.co.jp/en/product/industries/detail/259.html |
| [kawamura-2025] | Development of all-solid-state batteries and fuel cells utilizing the material technology of MLCCs (section 2: solid-state BaTiO3 synthesis) | Kawamura, Ito, Yamagishi (Taiyo Yuden), The Micromeritics No.68, 9-20, doi:10.24611/micromeritics.2025006 | 2025 | T3 (industry technical journal published by Hosokawa Micron; review status not checked) | https://hosokawamicron.co.jp/jp/files/items/28432/File/No__68_03.pdf |
| [hayashi-2018] | Effect of hydrothermal temperature on the tetragonality of BaTiO3 nanoparticles (abstract only) | Hayashi, Ebina (AIST), J. Ceram. Soc. Jpn 126(3) 214-220 | 2018 | T3 | https://www.jstage.jst.go.jp/article/jcersj2/126/3/126_17125/_article/-char/ja |
| [hongo-2018] | Stabilization mechanism of tetragonal structure in hydrothermal synthesized BaTiO3 nanocrystal (abstract only) | Hongo et al., Inorg. Chem. 57, 5413-5419 (arXiv:1804.02865) | 2018 | T3 | https://arxiv.org/abs/1804.02865 |
| [qi-2005] | Low-temperature paraelectric-ferroelectric phase transformation in hydrothermal BaTiO3 particles (abstract only) | Qi, Lee et al., Mater. Lett. 59(22) 2794-2798 | 2005 | T3 | https://www.pnnl.gov/publications/low-temperature-paraelectric-ferroelectric-phase-transformation-hydrothermal-batio3 |
| [takasago-rk-web] | Rotary kiln for chemical materials (product listing) | Takasago Industry, on IPROS | n.d. (accessed 2026-11-11) | T6 | https://mono.ipros.com/product/detail/2329003 |
| [nci-pulserum-web] | Dielectric material "Pulserum BT" (oxalate BaTiO3; product listing) | Nippon Chemical Industrial, on IPROS | n.d. (accessed 2026-11-11) | T1 | https://mono.ipros.com/product/detail/2000286147 |

## Equipment structure
- **Ti precursor station (hydrothermal route).** Neutralization vessel at 55 C: TiCl4 solution and pure water are fed at the same time while 30 wt% NaOH holds pH 2.5; the hydrous TiO2 is filtered and water-washed to remove Na+ and Cl-, then re-slurried to 110 g/L as TiO2 [us9771274]. Alternative: TiCl4 hydrolysed near boiling in acid to a brookite TiO2 sol, concentrated to 15 mass % [us7431911]; or TiOCl2 + NH4OH gel at pH ~3-4, hot-water washed to remove NH4Cl [us6129903].
- **Barium charge.** Solid Ba(OH)2·8H2O added to the vessel and dissolved on heating (preferred), carbonate <0.51 wt% in the feed; alternative is a Ba(OH)2 solution heated to ~95 C and passed through an in-line filter to strip BaCO3 (lower yield) [us6129903]. Weighed charge 959 g Ba(OH)2·8H2O into 567 mL water in a 5 L vessel, dissolved at 100 C [us9771274].
- **Nitrogen.** Autoclave purged with N2 and sealed; carbonate contamination traced to CO2 in the gel, incomplete N2 purging and air exposure during washing [us6129903]. Reagent additions under N2 in some examples [us4643984][us9005568].
- **Autoclave.** Titanium reaction vessel inside the autoclave, mechanical agitator [us6129903]; 1 L Hastelloy autoclave with stirring [us4643984]; 1 L autoclave stirred at 200-250 rpm [us9005568]. Pressure gauges, heater type and cooling method are not described in any source read.
- **Unreacted-Ba fixing.** CO2 blown into the post-reaction slurry to pH 6.5, fixing dissolved Ba as an insoluble compound so Ba/Ti = 1.00 (checked by fluorescent X-ray) [us4643984]. Alternative: wash it out with pH 10.7 ammoniated water to limit incongruent Ba dissolution; post-reaction mesh filter removes BaCO3 >1 um [us6129903].
- **Filtration / washing.** Filter and water-wash until no chloride is detected [us4643984]; centrifuge filtration, wash until filtrate pH >6 (oxalate route) [us7179441]. Filter type for the hydrothermal route is not stated.
- **Drying.** Wet cake at a few dozen % W.B. moisture must go to <1 % W.B.; flash dryer or media-agitating dryer (ceramic contact parts) named [hosokawa-bt-web]. Patent examples just say "dried at" 110-130 C [us9771274][us4643984][us9005568]; oven 120 C 12 h [us7179441].
- **Heat treatment / calcination (optional on hydrothermal route).** Sakai's 2014 process "needs no calcination" or disintegration [us9771274]. Others heat the hydrothermal powder (general range 100-1400 C) [us9005568] or calcine at 880 C 2 h in air, 20 C/min, after a 300 C 5 h dry [us7431911].
- **Solid-state mixing.** 50 L ball mill, 2 mm ZrO2 balls, 72 h, 40 wt% solids, 0.5 wt% polycarboxylate dispersant, Ba/Ti weighed to 0.997 [us20090264276]. Wet bead mill on the BaCO3 + TiO2 slurry before drying, optionally a dry planetary ball mill after drying [kawamura-2025]. Raw-material fine grinding by impact or classifier mills before reaction [hosokawa-bt-web].
- **Spray dryer.** The wet-mixed BaCO3 + TiO2 slurry is spray dried to mixed powder [us20090264276]. Dryer settings not given (a 250 C maximum drying condition is mentioned only for a comparative example).
- **Calcination furnaces (solid-state).** Two-step: rotary kiln first heat treatment at 600-700 C with ~0.3 h mean residence, air flow keeping CO2 <=15 mol%; then batch furnace 900-1000 C, 2-12 h, alumina containers. The rotary kiln gave the highest crystallinity K-value and was judged preferable for the first step [us20090264276]. A rotary kiln vendor lists barium titanate among its applications and stresses gas-tight atmosphere control [takasago-rk-web]. Ferro calcines oxalate cake in alumina saggers in a box kiln [us5783165].
- **Post-calcination size reduction.** Compressed-air jet mill for de-agglomeration, chosen to avoid attritor or wet milling that adds contamination [us5783165]. Calcined BaTiO3 has ~100 nm primaries but >1 um sintered secondaries; preliminary grinding with an impact mill with built-in classifier (tungsten-carbide or ceramic contact parts for low metal pickup), then wet ball/bead milling to primary size, then drying [hosokawa-bt-web]. Oxalate route: dry pulverization; general text lists atomizer, jet mill or wet milling [us7179441].
- **QC instruments named.** XRD (c/a by WPPF), single-point BET, SEM [us9771274]; laser-diffraction PSD after ultrasonic dispersion, BET, fluorescent X-ray, plasma-emission spectrometer for impurities, SEM [us9005568]; BET, XRD Rietveld, laser diffraction D10/D50/D90, chloride by steam distillation + ion chromatography [us20090264276]; TEM, XRD, BET [us6129903].

## Step sequence
Hydrothermal (Sakai example) [us9771274]: TiCl4 neutralization at pH 2.5 / 55 C -> filter + wash (Na, Cl out) -> re-slurry 110 g/L -> dissolve Ba(OH)2·8H2O at 100 C -> add Ti slurry over 1 h at 100 C -> precursor reaction 2 h at normal pressure (charge Ba/Ti 2.3) -> autoclave 160-200 C for 24-180 h -> cool -> filter, wash -> dry 130 C. No calcination, no disintegration.

Hydrothermal (Cabot example) [us6129903]: TiOCl2 + NH4OH gel, washed, frozen/thawed -> solid Ba(OH)2·8H2O + gel into Ti vessel in autoclave -> N2 purge, seal -> 350 rpm, ~1.4 C/min to 200 C, hold 20 min -> cool -> mesh filter for BaCO3 -> wash with pH 10.7 ammoniated water -> wet cake or slurry (can go straight to coating or slip).

Hydrothermal (Sakai 1984 example) [us4643984]: BaCl2 + partially hydrolysed TiCl4 into NaOH at 40 C -> autoclave ~150 C reached over 90 min, 550-600 rpm, 5 h -> CO2 to pH 6.5 (Ba fixing) -> wash until Cl- free -> dry 110 C.

Atmospheric-pressure variant [us7431911]: TiCl4 -> brookite sol; Ba(OH)2·8H2O + TMAH at 95 C, pH 14 -> 110 C 4 h -> filter -> dry 300 C 5 h -> calcine 880 C 2 h.

Solid-state [us20090264276]: weigh BaCO3 (BET 30 m2/g) + TiO2 (rutile <=30 %, BET >=20 m2/g) to Ba/Ti 0.997 -> ball mill 72 h -> spray dry -> rotary kiln 600-700 C -> batch furnace 900-1000 C -> pulverize "in accordance with need".
Solid-state [hosokawa-bt-web]: raw-material fine grinding -> mixing + calcination -> preliminary grinding of calcined lumps -> wet milling to primary size -> drying (<1 % W.B.).

Oxalate [us7179441]: TiCl4 + BaCl2 sprayed into oxalic acid at 90 C, 150 rpm, 6 m3 reactor -> centrifuge -> wash to filtrate pH >6 -> bead-mill wet pulverize -> dry 120 C -> calcine 700-1200 C (1200 C in ex.) -> dry pulverize. Ferro [us5783165]: oxalate cake calcined 1125 C 5 h in saggers -> jet mill. Oxalate BaTiO3 is sold commercially as an MLCC dielectric raw material in 0.3 / 0.6 / 2.0 um grades [nci-pulserum-web].

## Parameter ranges
| parameter | value / range | key | notes |
|---|---|---|---|
| Hydrous TiO2 neutralization | pH 2.5 (2.0-3.5 in ex.), 45-55 C | [us9771274] | NaOH 30 wt% |
| Ti slurry for precursor | 110 g/L as TiO2 | [us9771274] | |
| Precursor reaction | 100 C, 2 h, normal pressure; charge Ba/Ti 2.3 | [us9771274] | |
| Hydrothermal temperature | 160-200 C in examples; claim <=250 C | [us9771274] | wiki range 100-250 C |
| Hydrothermal temperature | 120-220 C preferred; 200 C in example | [us6129903] | |
| Hydrothermal temperature | ~150 C | [us4643984] | |
| Hydrothermal time | 24-180 h (claim >=24 h) | [us9771274] | |
| Hydrothermal time | 20 min hold at 200 C | [us6129903] | conflicts with Sakai by orders of magnitude; different precursor and target size |
| Hydrothermal time | 5 h | [us4643984] | |
| Heat-up rate | ~1.4 C/min | [us6129903] | 100 C/h in [us9005568] |
| Agitation | 350 rpm | [us6129903] | 550-600 rpm [us4643984]; 200-250 rpm [us9005568] |
| Ba/Ti in feed | >=1.2 (solution feed); <=1.1 possible with solid octahydrate | [us6129903] | |
| Carbonate in Ba(OH)2·8H2O feed | <0.51 wt% | [us6129903] | |
| Ba fixing | CO2 to pH 6.5; Ba/Ti 1.00 by XRF; Ba conversion 98.3 % | [us4643984] | |
| Wash water | pH 10.7 ammoniated water | [us6129903] | |
| Drying | 110-130 C (general 100-200 C) | [us9771274][us4643984] | |
| Moisture before/after dryer | few dozen % W.B. -> <1 % W.B. | [hosokawa-bt-web] | |
| Hydrothermal product | BET 4.9-11.7 m2/g, c/a 1.008-1.010 | [us9771274] | no calcination |
| Hydrothermal product | ~50 nm avg (30-90 nm), BET 15.2 m2/g, cubic | [us6129903] | |
| Post-heat on hydrothermal-type powder | 880 C 2 h air, 20 C/min; c/a 1.0104, BET 7.1 m2/g | [us7431911] | atmospheric 110 C synthesis |
| Post-heat general range | 100-1400 C | [us9005568] | |
| Solid-state mix | 50 L ball mill, ZrO2 2 mm, 72 h, 40 wt% solids | [us20090264276] | |
| Solid-state 1st heat | rotary kiln 600-700 C, ~0.3 h residence, CO2 <=15 mol% | [us20090264276] | ramp 3.3 C/min (range 1.5-20) |
| Solid-state 2nd heat | batch furnace 900-1000 C, 2-12 h | [us20090264276] | wiki: 1100-1400 C |
| Solid-state calcination (lab) | 1000 C 2 h: c/a 1.0078 (stirred or bead-milled mix) vs 1.0095 (bead + dry planetary mill) | [kawamura-2025] | 40 nm single-phase BaTiO3 at 800 C from ultrafine raw materials |
| Ba2TiO4 by-phase | forms >=850 C where BaCO3 segregates; avoid by uniform mixing and finishing reaction <=850 C | [kawamura-2025] | |
| Raw materials (lab) | BaCO3 500 nm acicular, TiO2 50 nm | [kawamura-2025] | |
| Calcined BaTiO3 size | ~100 nm primary, >1 um sintered secondary | [hosokawa-bt-web] | |
| Oxalate calcination | 1125 C 5 h; general 800-1250 C | [us5783165] | 700-1200 C [us7179441] |
| Target powder for <1 um layers | <=200 nm, sharp distribution, high tetragonality, weak agglomeration | [kawamura-2025] | |

## Gaps / unverified
- No source gives an industrial autoclave size, pressure rating, heater type or cooling method; the page draws a generic jacketed, agitated vessel (g).
- Lattice OH vs tetragonality is contested: OH decreases at higher hydrothermal temperature and the 400 C sample is inferred most tetragonal [hayashi-2018]; lattice-hydroxyl removal (by solvothermal treatment) raised tetragonality 30 % -> 80 % [qi-2005]; but ab-initio + FTIR work argues OH can stabilize the tetragonal form in nanorods [hongo-2018]. A search snippet (arXiv 1804.02865 full text) said OH and c/a both fell with heat treatment to 800 C (snippet, unverified). Treat "heat treat to remove OH and raise c/a" as a hypothesis.
- No source found for a magnetic separator (Fe removal) on BaTiO3 powder lines; vendor pages only discuss magnetic separation of fine iron from powders in general. Kept as (g) on the page.
- No source for final sieving or packaging equipment for BaTiO3 powder (a wet-sieving unit appears on the Hosokawa page only as a lab measuring tool [hosokawa-bt-web]). Vibrating sieve and drum packing stay (g).
- Flash-dryer, spray-dryer and jet-mill internal structures (rotor, atomizer, nozzle ring, cyclone, bag filter) are general practice, not described in the sources read (g).
- Chugai Ro multi-tube externally heated rotary kiln, max 1000 C, 3 individually controlled zones (search snippet, unverified; PDF not opened).
- "Solid-phase BT has higher dielectric reliability and is often preferred for MLCC" (search snippet of a Samsung-related patent, unverified).
- [us8770499] (jet milling of fine BaTiO3 with glycol additive, with pressure and feed settings) could not be read; fetch failed.
- Sakai's own commercial BT product pages were not found; [us9771274] etc. show claimed methods, not necessarily the production line.
