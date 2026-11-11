# MLCC Stacking and Lamination — Equipment Structure and Step Order
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: how the stacking line (sheet supply → cut → peel → align → press per layer → covers → pre-press) and the final lamination (vacuum bag → warm isostatic press, or uniaxial thermal press → unpack) are built and sequenced. Companion to `40-lamination-and-dicing.md` (process parameters; keys there such as [us6485591], [us7641727], [us8953300], [us10573466] are not repeated here).

Notes on tiers: equipment-maker datasheets / product pages are tagged T1 (they are the maker's own datasheet, but for the *equipment*, not for an MLCC). Several equipment datasheets (KEKO) are written for LTCC/HTCC as well as MLCC; where a datasheet does not name MLCC this is said in the row. Patent examples are embodiments, not production data. Every source below was read via WebFetch (PDF datasheets extracted with `pdftotext`) unless marked "(snippet, unverified)".

## Sources
| key | title | publisher | year | tier | URL |
|---|---|---|---|---|---|
| [kosnve-2014-stacker] | 적층 공정에서의 상태 기반 모니터링 (Condition monitoring in multilayer stacking processes) — Min, Lee (Samsung Electro-Mechanics), Jeong, Park, Lee | KSNVE autumn conference proceedings, pp. 739–742 | 2014 | T3 | https://koreascience.or.kr/article/CFKO201431749164725.page |
| [keko-st] | Stacking Machine ST-series datasheet | KEKO Equipment | n.d. (accessed 2026-11-11) | T1 (equipment; "high layer count"; MLCC not named) | https://www.keko-equipment.com/media/ST.pdf |
| [keko-sw] | Universal Stackers SW-/SWU-series datasheet | KEKO Equipment | n.d. | T1 (equipment; LTCC/HTCC named) | https://www.keko-equipment.com/media/SW.pdf |
| [keko-sb-web] | Stacking Machine SB-series (web page) | KEKO Equipment | n.d. | T1 (equipment; "well suitable for LTCC") | https://www.keko-equipment.com/Stacking.php |
| [keko-csm] | Cover Sheet Maker CSM-series datasheet | KEKO Equipment | n.d. | T1 (equipment) | https://www.keko-equipment.com/media/CSM.pdf |
| [keko-sc] | Automatic Green Tape Blanker SC-series datasheet | KEKO Equipment | n.d. | T1 (equipment) | https://www.keko-equipment.com/media/SC.pdf |
| [keko-ils] | Isostatic Lamination Presses ILS-series datasheet | KEKO Equipment | n.d. | T1 (equipment) | https://www.keko-equipment.com/media/ILS.pdf |
| [keko-ils-web] | Lamination page (ILS-series summary) | KEKO Equipment | n.d. | T1 (equipment) | https://www.keko-equipment.com/Lamination.php |
| [keko-tpr] | Thermal Press TPR-series datasheet | KEKO Equipment | n.d. | T1 (equipment) | https://www.keko-equipment.com/media/TPR.pdf |
| [quintus-il-web] | Isostatic Laminators (product page) | Quintus Technologies | n.d. | T1 (equipment; MLCC named) | https://quintustechnologies.com/products/material-densification/warm-isostatic-presses/isostatic-laminators/ |
| [sansho-eril] | ERIL warm isostatic press (ENERGYN), distributor product page | Sansho Industry via IPROS (page last updated 2018-12-14) | 2018 | T1 (equipment; MLCC named) | https://mono.ipros.com/product/detail/2000392956 |
| [multivac-c200] | Chamber vacuum packer C200 for CIP/WIP pre-packing | MULTIVAC Japan via IPROS | n.d. | T1 (equipment; MLCC R&D named) | https://pr.mono.ipros.com/multivac-jp/product/detail/2001631221/ |
| [multivac-r145] | Thermoforming vacuum packer R145 for CIP/WIP pre-packing | MULTIVAC Japan via IPROS | n.d. | T1 (equipment; MLCC mass production named) | https://pr.mono.ipros.com/multivac-jp/product/detail/2001631222/ |
| [dron-stacker-web] | Fully automatic stacker DL-DC-42T (product page) | Dron-tech | n.d. | T6 (equipment page; one unit error on the page) | https://www.dron-tech.com/fully-automatic-stacker-for-multi-layer-product/ |
| [basler-mlcc-2026] | High-Speed Alignment for Automotive MLCC Stacking (Basler news, reprint) | Auto-Innovations International | 2026-05-05 | T6 | https://auto-innovations.net/news/110107-high-speed-alignment-for-automotive-mlcc-stacking (Basler's own page returned HTTP 406) |
| [jp2000246718] | セラミックグリーンシートの積層方法及び積層装置 (heat-roll transfer onto cooled table, film peel) — Murata | JP2000-246718A | 1999 filing | T4 (application; page lists status "pending") | https://patents.google.com/patent/JP2000246718A/ja |
| [us6797092] | Method and apparatus for manufacturing monolithic ceramic electronic component (cutting/laminating head) — Murata | US6797092B2 | 2002 filing (JP 2001 priority) | T4 | https://patents.google.com/patent/US6797092B2/en |
| [us5174842] | Method for laminating ceramic green sheets (punch, suction transfer head with hot irons) — Murata | US5174842A | 1990 filing (JP 1989 priority) | T4 | https://patents.google.com/patent/US5174842A/en |
| [us5466330] | Handling apparatus for ceramic green sheet (kerf cut + suction head + film peel) — Murata | US5466330A | 1994 filing (JP 1993 priority) | T4 (IC-package context) | https://patents.google.com/patent/US5466330A/en |
| [us10964489] | Upper mold for MLCC lamination (vacuum pick-up head) — 21th Century Co. | US10964489B2 | 2017 filing (KR 2017 priority) | T4 | https://patents.google.com/patent/US10964489B2/en |
| [us5876549] | Method and apparatus for stacking sheets supported by carriers — IBM | US5876549A | 1996 filing | T4 (ceramic-package context) | https://patents.google.com/patent/US5876549A/en |
| [us4749421] | Method for manufacturing monolithic ceramic electronic components (vacuum pack + hydrostatic press) — Murata | US4749421A | 1985 filing (JP 1984 priority) | T4 | https://patents.google.com/patent/US4749421A/en |
| [murata-faq-process] | What is the production process of Multilayer Ceramic Capacitors? (FAQ) | Murata | n.d. | T1 | https://www.murata.com/support/faqs/capacitor/ceramiccapacitor/conf/0002 |

## Equipment structure
- **MLCC stacker (production, Samsung Electro-Mechanics co-author):** printed sheet is sent into the stacker, cut to a fixed size, detached from the film by vacuum, moved to the presser, aligned, then stacked. Fig. 1 blocks: Sheet providing → Detaching (from film) → Aligning (modify sheet location) → Press (stacking). The upper press plate carries **4 load cells** to check that the two plates are parallel (non-parallel plates make the stack slide to one side) [kosnve-2014-stacker].
- **Sheet stacker, peel-first type:** sheets loaded from cassettes (up to 8 patterns), carrier blocks loaded/unloaded from magazines (2 magazines, 20 blocks), **two high-resolution cameras** + PC vision detect sheet position, carrier film removed first, sheet pressed onto the previous one with relatively low force, sheets handled by a **vacuum chuck**; after the stack is built it moves to a **built-in pre-lamination press** with higher force. Stacks ≤12 mm on a carrier block; taller stacks (to 100 mm) in a cavity [keko-st].
- **Universal stacker:** tapes with or without carrier film; with carrier film the tape can be **pressed onto the previous layer first and the film removed automatically afterwards**, or film removed manually before stacking; two cameras + **x-y-θ alignment table** align each sheet before stacking; optional rotation station (face up/down); SW = stacking onto carrier block with flat metal top press; SWU = stacking on paper, stack held by vacuum, pressed through protective paper, Mylar removed top and bottom [keko-sw].
- **SB stacker:** sheets from foil cassettes, carrier blocks from a cassette onto a transport track, registration by pins or CCD vision, Mylar-removal station after tacking, paper sheets can be inserted to even out press force [keko-sb-web].
- **In-line (roll-fed) pick-up stacker:** thin-film sheet on a supply roll moves along a conveyor and is cut to size by a **wheel cutter**; an upper mold (vacuum head) lowers, holds the sheet by vacuum through a porous resin mesh and an etched stainless contact plate, lifts, travels on a track, lowers over the lower mold, releases by **blowing air** and presses lightly; repeats to the set count [us10964489].
- **Punch + transfer head with hot irons:** mark read by CCD through fibers in the die, feed support corrects position, sheet punched, suction transfer head carries it to a stacking block that rises to receive it; **hot irons tack the sheet ends** to the sheet below; air blown, block lowered; repeat; then full press, cut, fire [us5174842].
- **Cutting/laminating head:** long sheet on carrier film over a movable support plate; annular cutting edge driven by a cylinder cuts the sheet on the film; laminating head (suction ports, coil spring + hydraulic press unit) presses down and lifts the cut piece; the laminate builds up under the head; delivery roll, take-up roll (motor), fixed guide rollers [us6797092].
- **Kerf + suction head + peel chuck (package context):** cutting edges around the suction head cut a kerf, may slightly penetrate the carrier film; head sucks the sheet; chuck holds film end and peels gradually [us5466330].
- **Heat-roll transfer onto cooled table (Murata):** continuous PET carrier conveys pre-cut sheets; heated roll presses through the film onto the laminate held on a **water-cooled (or heat-pipe) table**; table keeps moving into a peel zone where a **peel claw / peel plate / peel roll** turns the film at a set angle; image sensor detects sheet position; optional IR preheater; optionally cooled peel claw [jp2000246718].
- **Tape blanker (upstream of sheet stackers):** unwinder → edge trimming → optional registration-hole punch → cut to length → magazine; antistatic device; options AOI (pinholes, cracks), weighing, thickness sorting, barcode; "lateral cutting – only ceramic is cut to desired width" is one cutting type [keko-sc].
- **Cover sheet maker:** carrier plate moved by belt under the dispenser; programmed number of sheets cut from the roll and placed by vacuum chuck; stack moved on the belt into a heated press; cassettes then go to the printer-stacker [keko-csm].
- **Vision optics:** cameras image fiducial marks at each layer height and compute ΔX, ΔY, Δθ; telecentric lenses keep magnification constant as the stack grows; liquid-lens autofocus refocuses per layer [basler-mlcc-2026].
- **Vacuum packer:** chamber type (bench, clean-room) for R&D; thermoforming type for mass production (MLCC listed); purpose: remove air between layers for uniform pressing, isolate ceramic from water, prevent defects/cracks; films for warm/cold water pressing incl. aluminum-containing films [multivac-c200][multivac-r145]. Covering may be rubber or vinyl [us4749421].
- **Isostatic laminator (ILS):** piston with cavity submerged in a vessel filled with deionized/distilled water; multiple heaters + temperature regulator keep piston and water at set temperature; vacuum-sealed bars placed in a basket (pre-loads bars, maximizes cavity use); operator places basket into piston; door with safety interlock; motors lower the piston into the vessel; pressure generator, o-ring seals, hydraulic components; 99 stored programs; final pressure in one step or several steps [keko-ils].
- **Other WIP:** water-based isostatic laminators for MLCC, large work zone for multiple parts [quintus-il-web]; ERIL: special heat exchanger for fast heat-up/cool-down, rectangular vessel possible for parallel chip loading, MLCC named [sansho-eril]; high-pressure vessel with water or oil, pressure controller [us4749421].
- **Uniaxial thermal press (TPR):** high-precision pressing cavity filled manually; the tool moves automatically under the hydraulic press; after the cycle the tool moves out and the block is lifted from the cavity; programmable profiles [keko-tpr]. A heated-plate stacker with servo-hydraulic press and vacuum pre-press, upper/lower heating plates, CCD alignment platform [dron-stacker-web].

## Step sequence
1. Upstream sheet preparation (sheet route): roll → unwinder → edge trim → (reg. holes) → cut to length → magazine [keko-sc]. In-line route instead cuts on the conveyor [us10964489] or on the carrier film under the head [us6797092]; transfer route uses sheets pre-cut on the continuous carrier [jp2000246718].
2. Per layer, peel-first (SEMCO-type stacker): sheet providing → cut to size → vacuum detach from film → move to presser → align → press (pressure rise, then hold) [kosnve-2014-stacker]; same order on [keko-st] (vision align, film removed, low-force press). Air-blow release from the head [us10964489].
3. Per layer, transfer-first: sheet on film pressed (heated plate or roll) onto the stack, then film peeled at an angle; table/stage indexes back [us6485591][jp2000246718]; option on [keko-sw].
4. Covers: blank cover sheets either on the same stacker or made on a separate cover-sheet maker directly on the carrier plate [keko-csm]; sub-blocks [us5935365] (in 40-notes).
5. Pre-lamination: built stack moved to a higher-force pre-lamination press [keko-st]; vacuum pre-press on a heated-plate stacker [dron-stacker-web].
6. Final lamination, WIP route: vacuum pack → load bagged bars in basket → basket into heated water vessel → close (interlock) → pressurize per programmed profile → hold → release → remove → strip covering → cut [keko-ils][us4749421].
7. Final lamination, uniaxial route: fill cavity → tool moves under press → profile → tool out → lift block [keko-tpr].
8. Overall order stacking → pressing → cutting is confirmed by the vendor FAQ [murata-faq-process].

## Parameter ranges
| parameter | value / range | key | notes |
|---|---|---|---|
| Load cells on upper press plate | 4 | [kosnve-2014-stacker] | press phase = pressure rise + hold |
| Per-layer stacking force / temp (peel-first) | up to 80 kN, up to 80 °C | [keko-st] | "relatively low force" |
| Pre-lamination force / temp | up to 200 kN, up to 120 °C | [keko-st] | |
| Stacker typical cycle | 12 s | [keko-st] | 15 s [keko-sw]; 8 s incl. 3 s pressing [keko-sb-web] |
| Stacking force (universal stacker) | up to 420 kN (opt. 200 / 700 kN), up to 80 °C | [keko-sw] | SB: up to 420 kN, upper plate ≤120 °C [keko-sb-web] |
| Stack height | ≤12 mm on block; to 100 mm in cavity | [keko-st] | |
| Carrier blocks in magazine | 20 | [keko-st] | SB: up to 24 [keko-sb-web] |
| Sheet size | 6 or 8 inch | [keko-st][keko-sw] | 203 × 203 mm max [keko-sb-web]; 450 × 450 mm [dron-stacker-web] |
| Cameras | 2 + x-y-θ table | [keko-sw] | 2 [keko-st] |
| Alignment accuracy | 0.01 mm | [dron-stacker-web] | ~12 µm pins, <5 µm optical (packages) [us5876549] |
| Layer counts | several hundred toward ~1,000 (0603/0402) | [basler-mlcc-2026] | |
| Blanker output | up to 20 cuts/min | [keko-sc] | width 160/250/350 mm; length 150–350 mm; carbide blade/punch/die; roll OD ≤350 mm |
| Heat-roll transfer | roll 80–180 °C (variable), 100 N/cm, ϕ150 mm, 10 mm/s | [jp2000246718] | example values |
| Cooled table | 5–10 °C | [jp2000246718] | water or heat pipe |
| Peel angle | ~120° (variants ~45°; any 90° to <180°) | [jp2000246718] | stainless peel claw |
| Example carrier / sheet | PET 120 mm × 0.05 mm; sheet 100 × 100 × 0.01 mm | [jp2000246718] | |
| Vacuum head contact plate | 200,000–300,000 holes ≤0.15 mm; Ra 0.02–0.06 µm | [us10964489] | resin mesh 0.15–0.2 mm; sheets ≤1.5 µm (background) |
| Cover sheet maker | plate ≤230 × 210 mm; press ≤422 kN, heated ≤120 °C | [keko-csm] | |
| Heated-plate stacker | RT–100 °C; 0–160 t; vacuum ≤ −101 kPa | [dron-stacker-web] | values as printed |
| ILS max pressure | 42 / 70 / 80 MPa by model | [keko-ils] | web page: 5–70 MPa [keko-ils-web] — conflict |
| ILS max temperature | 85 °C | [keko-ils] | |
| ILS cycle / capacity | ~12 cycles/h; up to 40 stacks | [keko-ils] | |
| ILS vessel size | 60 × 180 × 130 mm (4" bar) … 200 × 550 × 500 mm (18" bar) | [keko-ils] | web page: max bar 12" [keko-ils-web] — conflict |
| Quintus laminator pressure | up to 30,000 psi (≈207 MPa, my conversion) | [quintus-il-web] | throughput "up to 20×" vs platen presses (vendor claim) |
| ERIL WIP | 200 MPa; 250 °C (water); ϕ120 × 360 mm; ~20 °C/min | [sansho-eril] | not MLCC process values |
| Vacuum package size (R145) | up to ~500 × 500 mm | [multivac-r145] | |
| Uniaxial thermal press | up to 8" × 8"; up to 1000 kN; up to 150 °C; profiles up to 24 steps | [keko-tpr] | same sheet says "max. 400 kN or 700 kN" in text — internal conflict |
| Hydrostatic press (1984) | water or oil; values not stated | [us4749421] | |

## Gaps / unverified
- WIP hold time, ramp rates, vacuum level in the bag and bag sealing method: not stated in any source read ([keko-ils] gives profile modes only).
- Whether MLCC mass-production lines place a separate pre-lamination press between stacking and WIP: [keko-st] includes one in its stacker; MLCC-specific confirmation not found.
- Share of sheet-based (blanker + cassette) vs roll-fed in-line stackers in MLCC lines: unknown; both are described.
- KEKO datasheets mostly name LTCC/HTCC; only [keko-ils]'s family and [quintus-il-web], [sansho-eril], [multivac-*] name MLCC explicitly.
- Quintus "temperature typically up to 90 °C" for electronics lamination: (snippet, unverified) — not on the fetched page.
- Basler content read from a reprint ([basler-mlcc-2026]); the original Basler page could not be fetched (HTTP 406). No numeric accuracy is given there.
- Upward-looking cameras for a held sheet, dancer/tension control, edge-position control on the stacker unwinder: no source found (general practice).
- Dron-tech page has a size unit error ("1600*1500*2300cm"); its numbers are kept as printed.
- [us5466330] and [us5876549] are ceramic-package (LTCC/MLC substrate) contexts; used only for handling mechanics (kerf cut, carrier peel, tack rods).
