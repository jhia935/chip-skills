# MLCC Stacking, Lamination Pressing, Cutting and Side-Margin Formation
_Collected: 2026-11-10 · raw research notes (immutable source material)_

Note: sources are Google Patents full text read via WebFetch (some truncated at ~100k chars) plus one vendor web page. Patent examples are inventor embodiments, not production data.

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| [murata-gs-web] | Green Sheet Process Technology | Murata (corporate site) | n.d. (accessed 2026-11-10) | T1 | https://corporate.murata.com/technology/technology-platform/production-technology/green-sheet-process |
| [us8953300] | MLCC and method of manufacturing (WIP example) | patent US8953300B2 | n.d. | T4 | https://patents.google.com/patent/US8953300B2/en |
| [us7641727] | Electrode level difference absorbing print paste (TDK per page; transfer/press conditions) | patent US7641727B2 | n.d. | T4 | https://patents.google.com/patent/US7641727B2/en |
| [us6485591] | Method for manufacturing laminated-ceramic electronic components (sheet transfer stacking) | patent US6485591 | n.d. | T4 | https://patents.google.com/patent/US6485591B1/en |
| [us5935365] | Manufacturing method/apparatus for ceramic electronic components | patent US5935365 | n.d. | T4 | https://patents.google.com/patent/US5935365A/en |
| [us7861759] | Lamination unit of ceramic green sheets | patent US7861759 | n.d. | T4 | https://patents.google.com/patent/US7861759B2/en |
| [us10573466] | Method of manufacturing multilayer ceramic capacitor | patent US10573466B2 | n.d. | T4 | https://patents.google.com/patent/US10573466B2/en |
| [us9001493] | Step-compensation cover for MLCC lamination | patent US9001493B2 | n.d. | T4 | https://patents.google.com/patent/US9001493B2/en |
| [us10460876] | MLCC / side margin attach by elastic-body shearing | patent US10460876 | 2016 priority (JP 2016-209785) | T4 | https://patents.google.com/patent/US10460876B2/en |
| [us11348730] | MLCC and method of manufacturing (side margin sheet, rubber punching pad) | patent US11348730B2 | n.d. | T4 | https://patents.google.com/patent/US11348730B2/en |
| [us11600441] | Multilayer electronic component (side margin sheet) | patent US11600441B2 | n.d. | T4 | https://patents.google.com/patent/US11600441B2/en |
| [us6091598] | Cut-position inspection via partial blank in electrode pattern (EP0876089) | patent US6091598 | n.d. | T4 | https://patents.google.com/patent/US6091598 (only search-result excerpt read; full page not fetched) |

## Process description
- Sequence per Murata: sheets with printed electrodes are stacked, pressed and cut into a multilayer structure; stacking is done with "almost no misalignment" and without damaging thin sheets (no numbers) [murata-gs-web].
- Sheet-transfer stacking: electrode-printed sheet on PET base film is pressed (heated plate or heated roll) onto a stage-fixed base body, then film is peeled; repeated until target layer count; positioning by pins through the film or die [us6485591]. Transfer at 80 C and 15 kg/cm (vs conventional 80 C, 500 kg/cm2) [us6485591]. TDK-type process: electrode/adhesive-layer transfer at 40-100 C, 0.2-15 MPa via roll pair (ex. 80 C, 1 MPa); adhesive layer 0.02-0.3 um [us7641727].
- Alternative: laminate the printed sheets as sub-blocks (75 or 150 layers per laminated sheet in example), peel from film after cutting both edges, then stack on protective (cover) layers up to about 160 um, then press [us5935365].
- Final press: 40-100 C, 10-200 MPa [us7641727]. Warm isostatic press at 1000 kgf/cm2 (about 98 MPa, my conversion) and about 85 C, duration unstated [us8953300]. Rigid or isostatic pressing named; a resin sheet of constant thickness may be placed on the outermost layer so pressure also reaches regions without electrode [us10573466]. Uniaxial press unit: loads >100 kgf/cm2 every few seconds [us7861759].
- Cutting: pressed block is cut by dicing in [us10573466]; patent lists name dicing machine, push-cut, laser (search excerpts, not verified in fetched text). Cuts along two orthogonal lines C1, C2 through electrode-overlap centers so electrode ends alternate on cut faces [us11348730][us11600441].
- Side margins ("attached side margin"): bar laminate is cut into individual bodies along C2 first, electrodes exposed on both side faces; a ceramic sheet is pressed onto each side against a rubber/PDMS/silicone punching pad so the sheet wraps to the corner, excess trimmed; body rotated 90/180 deg for the other side; then fired [us11348730][us11600441]. Variant: chip pressed into an elastic body with sheet; shear force cuts sheet and leaves a piece on the side; gaps between side face and margin can become "entry portions" later filled with electrode material, kept <=30% of end-margin dimension [us10460876].
- Why: coated/printed slurry side margins vary in width (center thicker) so A1/A ratio drops below 0.9, wasting active area; attached sheet gives 0.9-1.0 [us11600441].
- Post-cut: binder removal 230 C for 60 h in air then firing about 1200 C reducing [us8953300]; barrel polishing rounds corners/ridges [us10573466].

## Parameter ranges
| parameter | typical range | source key | notes |
|---|---|---|---|
| Layer count (inner) | 100-1000 (ex. 560) | [us10573466] | 1.13 x 0.85 x 0.75 mm body |
| Layer count | >=400 (0603 side-margin embodiments) | [us11348730][us11600441] | 0.6 x 0.3 x 0.3 mm |
| Layers per pre-laminated sheet | 75 or 150 | [us5935365] | thick-sheet examples (2.5-8 um) |
| Final press temperature | 40-100 C | [us7641727] | WIP example ~85 C [us8953300] |
| Final press pressure | 10-200 MPa | [us7641727] | 1000 kgf/cm2 (~98 MPa) [us8953300] |
| Press time | not stated | [us8953300][us7641727] | gap |
| Sheet-transfer pressure | 0.2-15 MPa at 40-100 C | [us7641727] | roll pair; 15 kg/cm line load plate at 80 C [us6485591] |
| Cover (outer) thickness | 15-70 um per side | [us10573466] | <=20 um [us11348730]; >=30 um lower cover [us11600441] |
| Side margin width (attached) | 2-10 um (avg) [us11348730]; 5-15 um (10-15 pref.) [us11600441] | | <2 um: strength/shorts; >10-15: capacitance loss |
| Thickness uniformity ratio of side margin (A1/A) | 0.9-1.0 | [us11600441] | related art <0.9 |
| Chip size tolerance example | 0.950 x 0.500 mm +-0.1 mm (1005 fired) | [us8953300] | |
| Debinder | 230 C, 60 h, air | [us8953300] | |
| Electrode misalignment (printing/stack) | 8-11 um vs ~250 um prior | [us5935365] | |
| Stack thickness deviation | 5-10 um (51 layers), 7-15 um (101 layers) | [us6485591] | thick-electrode case |
| Step-cover slurry viscosity | 10,000-300,000 cps | [us9001493] | pressed cover sheet 300,001-1,000,000 |

## Equipment
- Heated plate / heated roll transfer-lamination with pin or vision alignment [us6485591][us5935365].
- Pressing bar-based lamination unit; patent addresses bolt fatigue and plate deflection from >100 kgf/cm2 cycles, which deforms green bar [us7861759].
- Warm isostatic press [us8953300]; rigid press alternative [us10573466].
- Dicing machine used in example [us10573466]; push-cut/laser named elsewhere (unverified).
- Side-margin applicator: rubber/PDMS/silicone punching pad with 90-degree body rotation; adhesive-tape chip re-holding [us11348730][us10460876].

## Defect / yield modes
- Delamination: from margin step [us9001493], reduced by smoother sheets and transfer stability, near zero with optimized sintering time [us6485591]; peeling/stack deformation addressed by level-difference paste [us7641727]; after-press delamination reduced by alternating sheet/electrode formation [us5935365].
- Misalignment/cut-position shift moves electrodes off design, hurting insulation/environmental resistance; thin layers make microscope judgment hard; inspection via a partial blank in the electrode pattern at the cut line (also similar with wet rotary vs dry force cutting) [us6091598 -- search excerpt only].
- Voids at body/side-margin interface -> field concentration and lower BDV; lower sintered density of margin lowers moisture resistance [us11348730].
- Thin side margin (<=2 um) weak and moisture-prone; moisture-resistance test failure at IR <10 Mohm (45 C/95% RH/10 V), kept <=10% when entry portions < end margins [us10460876]; 85 C/85% RH/4 V and 105 C/6 V life tests, 400 samples [us11600441].
- Green bar deformation from press-unit fatigue [us7861759]; static-charge wrinkling reduces stacking accuracy [us7641727].

## Gating effects
- Layer count: stack step height and accumulated misalignment limit stackable layers unless compensated; examples reach 400-560 layers [us10573466][us11348730][us9001493].
- Minimum side margin: attached-sheet method pushes average margin to 2-15 um vs >=20 um for printed margin ("Test No.1" case) [us11348730][us11600441]. This raises active overlap (CV density) in 0603-and-below.
- Cutting position tolerance sets electrode exposure/margin consistency [us6091598 excerpt][us11348730].
- Cover thickness 15-70 um per side consumes body height [us10573466].

## Open questions / conflicts
- Press time, vacuum/packaging, and pressure ramp for WIP not found; no T1 vendor values. NASA NEPP search found no process-specific report; an OSTI PDF fetch returned unreadable binary.
- WIP pressure unit mismatch across sources: MPa (10-200) [us7641727] vs kgf/cm2 (1000) [us8953300]; they are consistent only after conversion (~98 MPa) which is my calculation.
- Transfer pressure 15 kg/cm (line load) vs 0.2-15 MPa vs conventional 500 kg/cm2 are not directly comparable [us6485591][us7641727].
- Side margin widths differ: 2-10 um [us11348730] vs 5-15 um [us11600441] (different patents/embodiments, same 0603 size).
- Cutting accuracy numbers (blade kerf, tolerance) not found; push-cut vs rotary blade comparison is only qualitative (search excerpt). Need T1/T3 source.
- Cover thickness: 15-70 um [us10573466] vs <=20 um [us11348730] -- different design intents.
- Truncated reads: [us11348730], [us11600441], [us10460876], [us7641727], [us10573466] were read only to char 100k.
