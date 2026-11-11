# Equipment and step order: MLCC test, sort, visual inspection, taping and packing
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: equipment structure and the order of operations after termination plating, written for the 3D page
`visualizations/10-test-sort-packaging-3d.html`. Builds on `80-test-sort-and-packaging.md` (keys from that file,
e.g. [esi-allegro-xp-2020], [murata-meas-web], [johanson-tape-reel], [nepp-guidelines-2012], are reused, not repeated here).

Evidence grade: **R** = page or patent text read via WebFetch; **S** = seen only in a search-result summary
(page not read, blocked or timed out), treat as unverified. Patent examples are inventor embodiments, not production data.
Several patents are 1995–2004 filings; current machines may differ.

## Sources
| key | title | publisher | year | tier | URL | grade |
|---|---|---|---|---|---|---|
| [us5842579] | Electrical circuit component handler (test plate with seat rings, contactor modules, ejection manifold) | Electro Scientific Industries (patent) | 1998 (filed 1995) | T4 | https://patents.google.com/patent/US5842579A/en | R (first 100k chars) |
| [us6479777] | Electronic parts conveying apparatus and method (peripheral-slot conveying table, per-slot selector valve, direct taping) | Murata Manufacturing (patent) | 2002 (prio. 1997) | T4 | https://patents.google.com/patent/US6479777B2/en | R |
| [us6448525] | Capacitor characteristics measurement and packing apparatus (turntable: C, IR prediction, reject, air insert into tape) | Murata Manufacturing (patent) | 2002 (prio. 1997) | T4 | https://patents.google.com/patent/US6448525B1/en | R (first 100k chars) |
| [us9404732] | Electronic component thickness measurement ... and inspection apparatus (glass disk, 4 cameras, laser thickness, 3-way air sort) | Murata Manufacturing (patent) | 2016 (prio. 2013) | T4 | https://patents.google.com/patent/US9404732B2/en | R (first 100k chars) |
| [us6294747] | Inspection machine for surface mount passive component (loader wheel + transfer wheel, 6 surfaces) | Electro Scientific Industries (patent) | 2001 (prio. 1999) | T4 | https://patents.google.com/patent/US6294747B1/en | R (first 100k chars) |
| [us6820401] | Method and apparatus for tensioning cover tape (taper: COT camera, tension rollers, sealing shoe, CASI camera) | Intl. Product Technology (patent) | 2004 (prio. 2001) | T4 | https://patents.google.com/patent/US6820401B2/en | R |
| [tokyo-weld-dempa] | Trade-press article on six-sided optical inspection and measuring/taping machines | AEI (Dempa Publications) | n.d. (page images dated 2022/04) | T5 | https://aei.dempa.net/?p=7252 | R |
| [shibuya-etm486] | High-speed inspection taping machine ETM486 (product page) | Shibuya Corp. via IPROS | n.d. | T1 (equipment) | https://mono.ipros.com/product/detail/2000737302 | R |
| [kemet-pack] | Tantalum, Ceramic and Aluminum Chip Capacitors — Packaging Information | KEMET (third-party mirror) | n.d. | T1 | https://pdf.jiepei.com/c0201c103b1pa-13795164.html?page=5 | R (mirror; some symbols lost) |
| [vtek-tm401] | TM-401 taper user manual, sealer settings page | V-TEK (via manualslib) | n.d. | T6 (equipment manual) | https://www.manualslib.com/manual/1259630/V-Tek-Tm-401.html?page=62 | R |
| [advantek-huc] | Type HUC antistatic cover tape technical datasheet (in an ADI PCN) | Advantek | n.d. | T1 (material) | https://wcm-cce.cldnet.analog.com/media/en/PCN/ADI_PCN_21_0241_Rev_-_HUC0054-500%20SDS%20(TECHNICAL%20DATASHEET).pdf | S (connection refused) |
| [3m-2672] | 3M Non-Conductive Heat Activated Cover Tape 2672 | 3M | n.d. | T1 (material) | https://multimedia.3m.com/mws/media/87084O/3m-non-conductive-heat-activated-cover-tape-2672.pdf | S (403) |
| [ecia-peel-note] | Alternate Peel Strength Test (EIA standards knowledge note) | ECIA | 2023 rev. | T2 | https://www.ecianow.org/assets/docs/EIAStandards/V1%20No1_Alternate%20Peel%20Strength%20Test_R2023_FINAL.pdf | S (404) |
| [jinsung-jt310] | Chip component auto taping machine JT-310 (product listing) | Jinsung Hi-Tech via Komachine | n.d. | T1 (equipment) | https://komachine.com/en/companies/jinsung-hi-tech/products/28426-chip-component-auto-taping-machine-taping-machine-jt-310 | S (empty page) |

## Equipment structure

**Electrical test and sort handler**
- Feed, ESI patent: hopper → gravity feeder tray on a shaker, perforated mesh section drops undersized parts into a catch tray → motor-moved funnel → stationary arcuate loading frame with one fence per seat ring; parts tumble along fences and drop into empty seats; optical sensors watch for gaps without parts; optional air knife [us5842579].
- Feed, Murata patent: parts-feeder linear-track outlet placed as close as possible to the conveying table; parts are sucked into slots one by one through an air hole [us6479777].
- Test plate (ESI): flat ring inclined about 60°, four concentric rings of through-hole seats, stationary chrome-plated steel vacuum plate below with four annular vacuum channels, incremental indexing by one seat pitch [us5842579].
- Conveying table (Murata): disk with concave slots on the outer periphery; air hole on each slot's inner wall with its own electromagnetic selector valve (negative pressure to hold against centrifugal force, positive pressure to blow out); can be an upper notched plate over a lower plate with grooved air passages [us6479777] [us6448525].
- Contacts (ESI patent): five contactor modules; upperside contacts are resilient cantilever leaves at about 30° with tips angled about 5°; underside contacts are replaceable cylinders with spring-loaded pogo pins [us5842579]. Production datasheet instead lists roller upper contacts and BeCu/silver/tungsten lower contacts [esi-allegro-xp-2020] (in 80-file).
- Contacts (Murata): raisable terminal stand lowers a pair of terminals onto the two outer electrodes while vacuum holds the part; variant with contact electrodes in the slot bottom and a cushion pressing the part down [us6479777].
- IR circuit (Murata): DC supply + switch, measurement amplifier, logarithmic amplifier, two A/D converters, CPU; amplifiers are switched at a threshold to cover a wide current range [us6448525].
- Ejection (ESI): pneumatic valves beneath the seats fire air bursts that overcome the vacuum and push parts up through an ejection manifold (44 holes = 11 rows × 4 rings: 5 reject rows, 5 good rows, 1 "not ejected" row) into tubes → routing plate → bins on trays of four; a four-beam jam sensor checks for parts left in seats [us5842579].
- Ejection (Murata): reject parts get positive pressure at the reject section and are blown into a collection box [us6479777] [us6448525].

**Visual (appearance) inspection**
- Murata glass-disk inspector: chip feeder vibrates and aligns chips and places them one at a time, lengthwise along the travel direction and spaced apart, on a glass (or resin) disk; rotary encoder; infrared sensor detects each part; control unit tracks and numbers each part [us9404732].
- Cameras: 141 above the plate inside the track (one side face), 142 above outside the track (other side face), 143 above the track (top main face), 144 below the plate (bottom main face through the glass); optional end-face camera [us9404732].
- Thickness meter above the track: light-section method, two laser sources of different polarization combined by a half mirror and spread into a fan, blue light, HDR CMOS camera receiving the reflection [us9404732].
- Sorting: three air blowers → container 161 (both inspections pass), 162 (appearance good, thickness out), 163 (appearance defect); a swing member may replace a blower [us9404732].
- ESI alternative: loader wheel and transfer wheel, both inclined about 45°, meeting nearly tangentially; vacuum holds chips (stronger on the transfer wheel); station 1 camera views the rear surface, station 2 views top, bottom, front, left and right via mirrors; downward air blast sends rejects to a reject bin, upward blast sends good parts to the good bin; bins have a raised centre floor to absorb impact [us6294747].
- Six-sided commercial inspectors check front/back, top/bottom and left/right for cracks, chips and dirt by image processing; an AI-equipped model exists [tokyo-weld-dempa].

**Taping machine**
- Murata measure-and-pack: parts feeder → intermittently rotating turntable with rectangular holders (air hole + selector valve) → capacitance section → IR prediction section (elevatable terminal base) → quality decision → defective ejection by air → sensor checks each holder is occupied → at the extraction section the turntable and base tape stop together and air pushes the capacitor into the tape recess; if a holder is empty the taping device pauses while the table keeps turning so no recess is left empty → cover tape from a supply roll pressed on by a compressive roll → reel-up roller advances one pitch in sync with the turntable [us6448525] [us6479777].
- Generic taper (semiconductor example): infeed reel → drive roller pinching flanges against a backup wheel, sprocket pins, guide rails → pick-and-place vacuum head → COT camera inspects parts in pockets → cover tape reel, laid on downstream of the COT module → tensioning rollers → sealing shoe (spool wheel or flat shoe) with downward force; ramp in the guide rail lifts the flange during bonding; heating elements only for heat-activated tape → CASI camera checks seal (shoe position errors, inconsistent sealing perimeter) → output reel [us6820401].
- Cover tape types: heat-activated tape has adhesive over the whole surface; pressure-sensitive tape has two adhesive strips over the flanges [us6820401].
- Measuring/sorting taping machines test electrical characteristics and run optical inspection before taping [tokyo-weld-dempa]. Inspection taping machine options: characteristic-inspection probes (high-frequency probes or conductive rubber), five-side inspection unit (sides and bottom at once), image-based alignment, classification, and auto-repair that checks attitude and appearance after the part is in the tape, ejects bad parts and re-inserts good ones; parts-feeder supply; thermo-compression seal; 8 or 12 mm tape [shibuya-etm486].
- Sealer settings: seal type heat or PSA; dwell time = time the heat-seal shoes touch the cover tape, set in ms; temperature set point and measured value per shoe; shoe temperature raised or lowered after a peel force test [vtek-tm401].

**Peel test, labeling, packing**
- Peel test conditions: cover tape pulled at 165–180° from the plane of the carrier tape, opposite to the tape travel direction, at 300 (±)10 mm/min [kemet-pack]. Purpose: tape must hold parts in pockets yet not resist peeling in the feeder; EIA-481 §4.11 [ecia-peel-note] (S).
- Reel labeling: bar-code label on the side of the reel opposite the sprocket holes; EIA-556 referenced [kemet-pack].

## Step sequence
Default high-volume route, as built on the page (inline measurement, commercial grade):
1. Feed → vacuum pick-up into turntable pockets [us6479777] [us5842579].
2. C/DF at one or more stations [esi-allegro-xp-2020] [us5842579].
3. IR: pre-charge → pre-soak → IR/current [esi-allegro-xp-2020]; patent example: low-voltage IR (e.g. 50 V), rated-voltage soak, IR again [us5842579]; IR prediction from early charge current [us6448525].
4. Flash (DWV) [esi-allegro-xp-2020] [us5842579]. Order varies: the ESI patent example runs C/DF → flash → low-V IR → rated soak → IR → C recheck [us5842579]; the page puts flash after IR (model station order kept).
5. Bin ejection: valve under seat → manifold → tube → bin [us5842579].
6. Appearance inspection (glass disk, 4–6 faces, thickness) → 3-way sort; only the good group is taped [us9404732] [tokyo-weld-dempa].
7. (High-rel only) burn-in → second sort → Group A (from 80-file, [murata-space-2019]).
8. Taping machine feed + re-measure (C, IR) + reject [us6448525] [tokyo-weld-dempa].
9. Air insertion into the carrier-tape pocket; empty-holder sensor holds the tape [us6448525] [us6479777].
10. Pocket check camera before cover tape; optional auto-repair [us6820401] [shibuya-etm486].
11. Cover tape tensioning and heat sealing [us6820401] [vtek-tm401].
12. Seal inspection camera, take-up reel synced to the table [us6820401] [us6448525].
13. Peel strength test on samples (frequency not found) [kemet-pack] [vtek-tm401].
14. Reel label (EIA-556) and packing [kemet-pack]; boxes/cart (g).

## Parameter ranges
| parameter | value | key | notes |
|---|---|---|---|
| Test plate inclination (ESI) | about 60° | [us5842579] | 4 seat rings |
| Upper contact leaf angle / tip | about 30° / about 5° | [us5842579] | patent design |
| Flash test | about 2–2.5 × VR for 40–50 ms | [us5842579] | patent example |
| Low-voltage IR | e.g. 50 V | [us5842579] | |
| Rated-voltage soak before IR | hundreds of ms | [us5842579] | |
| Ejection manifold | 44 holes (11 rows × 4 rings) | [us5842579] | |
| IR prediction window | charge current at 1–10 ms; evaluation 5–80 ms; predicts value at about 60 s | [us6448525] | |
| Conveying-table slot width | one to several mm; position tolerance about 1 mm | [us6479777] | |
| Glass disk thickness | 1.2–5.0 mm (1.2 preferred) | [us9404732] | |
| Glass disk speed | about 100 mm/s | [us9404732] | |
| Thickness laser | 400–500 nm, incidence 10–43.5° (22.5° ex.), about 240 µs exposure | [us9404732] | |
| Thickness spread within a taped series | about 10 µm or less (thickest about 0.25 mm) | [us9404732] | thin-chip example |
| Wheel inspector speed | upwards of 70,000 chips/h; smallest 0402 | [us6294747] | |
| Wheel vacuum | about 1 inHg loader, 3 inHg transfer | [us6294747] | |
| Six-sided inspector throughput | 12,000 pcs/min | [tokyo-weld-dempa] | |
| Measuring/taping machine throughput | 5,000 pcs/min | [tokyo-weld-dempa] | |
| Inspection taping machine (semiconductor/SMD) | 500 pcs/min; tape 8 or 12 mm; 1350 × 900 × 2350 mm, 800 kg | [shibuya-etm486] | MLCC use only in search summary |
| Chip taping machine | max 1,300 pcs/min at 1005-0.35t | [jinsung-jt310] | S |
| Peel strength, 8 mm tape | 0.1–1.0 N (10–100 g) | [kemet-pack] | |
| Peel strength, 12 mm tape | 0.1–1.3 N (10–130 g) | [kemet-pack] | ECIA table 0.1–1.3 N for 12–56 mm [ecia-peel-note] (S) |
| Peel strength, 24 mm tape | 0.1–1.6 N | KEMET table (S) | search summary only |
| Peel angle / speed | 165–180°; 300 (±)10 mm/min | [kemet-pack] | ± lost in mirror text |
| Cover tape break force | 1.0 kg min | [kemet-pack] | |
| Chip rotation in pocket | ≤20° in all three planes | [kemet-pack] | |
| P0 / P1 (8 mm embossed table) | 4.0 ±0.10 mm / 4.0 ±0.10 mm | [kemet-pack] | symbols not defined in the excerpt read |
| Sealer start / max temperature | 90 °C / 160 °C | [vtek-tm401] | semiconductor taper |
| Cover tape sealing window | 150–200 °C, 0.02–0.40 s, 30–70 psi | [advantek-huc] | S |
| Cover tape sealing window | 170–230 °C at 1 bar, 100 ms, 0.5 mm shoe | [3m-2672] | S |

## Gaps / unverified
- Bowl feeder as such is not named in any source read; sources say "parts feeder", "chip feeder vibrates and aligns", or hopper + shaker tray. Bowl shape on the page is (g).
- Number of turntable holders, test voltages and table speeds in the Murata taping patents: not stated.
- Production soak and flash dwell times: only patent examples (hundreds of ms soak; 40–50 ms flash).
- Sealer temperature conflict: taper manual set points (90 °C start, 160 °C max) vs cover-tape datasheets (150–230 °C, S); likely set point vs film temperature or different machines, not resolved.
- Peel test sampling frequency and who runs it (maker or customer): not found; [us6820401] mentions customers testing on peel strength analyzers.
- Reel label content beyond "bar code", box/pack specifications, moisture-barrier requirements: not found.
- Pocket-check camera lighting, AOI escape rates, reel winding speed: not found.
- Whether today's high-volume lines use separate sorters + separate taping machines or one measuring/taping machine: both exist in sources ([esi-allegro-xp-2020] sorter with bins; [us6448525] and [tokyo-weld-dempa] measure-and-tape); share by maker unknown.
- Search-summary-only items: [advantek-huc], [3m-2672], [ecia-peel-note], [jinsung-jt310], 24 mm peel range, maker-specific 0.1–0.6 N / 0.1–0.7 N peel limits, MLCC application of [shibuya-etm486].
