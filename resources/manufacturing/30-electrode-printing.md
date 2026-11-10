# MLCC Internal-Electrode Printing (screen / gravure / inkjet) and Step-Height Compensation
_Collected: 2026-11-10 · raw research notes (immutable source material)_

Note: all patents were read via Google Patents full text (WebFetch, which sometimes truncated at ~100k chars). Patent examples are inventor embodiments, not production data. Assignees are given only where the fetched page stated them.

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| [murata-gs-web] | Green Sheet Process Technology | Murata (corporate site) | n.d. (accessed 2026-11-10) | T1 | https://corporate.murata.com/technology/technology-platform/production-technology/green-sheet-process |
| [us10449795] | Printing plate, laminated ceramic electronic component producing method, and printer | patent US10449795B2 | n.d. | T4 | https://patents.google.com/patent/US10449795B2/en |
| [us6485591] | Method for manufacturing laminated-ceramic electronic components (sheet-transfer stacking, screen + gravure examples) | patent US6485591 | n.d. | T4 | https://patents.google.com/patent/US6485591B1/en |
| [us5935365] | Manufacturing method and apparatus for ceramic electronic components (image-processed registration) | patent US5935365 | n.d. | T4 | https://patents.google.com/patent/US5935365A/en |
| [us7641727] | Electrode level difference absorbing print paste (assignee TDK per page) | patent US7641727B2 | n.d. | T4 | https://patents.google.com/patent/US7641727B2/en |
| [us9001493] | Multilayered ceramic electronic component and manufacturing method (step-compensation cover; Samsung per search listing, not on fetched text) | patent US9001493B2 | n.d. | T4 | https://patents.google.com/patent/US9001493B2/en |
| [us10573466] | Method of manufacturing multilayer ceramic capacitor (100-1000 layer ranges) | patent US10573466B2 | n.d. | T4 | https://patents.google.com/patent/US10573466B2/en |
| [us7505247] | Multi-layer ceramic capacitor and production method (inkjet electrode + dielectric) | patent US7505247B2 | n.d. | T4 | https://patents.google.com/patent/US7505247B2/en |
| [us6979416] | Method of forming an electronic component using ink (inkjet) | patent US6979416B2 | n.d. | T4 | https://patents.google.com/patent/US6979416B2/en |
| [us8953300] | MLCC and method of manufacturing (screen/gravure mention) | patent US8953300B2 | n.d. | T4 | https://patents.google.com/patent/US8953300B2/en |

## Process description
- Murata describes the chain as slurry -> sheet forming -> internal-electrode printing -> sheet lamination -> pressing; Ni electrode patterns are printed on the green sheet with "high accuracy and repeatability", and it says printing mechanisms and pastes were refined for finer patterns [murata-gs-web]. The page gives no thicknesses, tolerances or layer counts.
- Screen or gravure printing of conductive paste onto green sheets is the baseline in the patents [us9001493][us8953300][us10573466 (screen, Ni paste)]. Gravure is stated to be widely used for productivity [us10449795].
- Gravure: roll dips in a paste tank, a doctor blade removes excess, a back roll presses the green sheet against the roll to transfer the pattern; printing onto a carrier film followed by transfer to the sheet is also possible [us10449795]. A conventional impression cylinder pressures the sheet/electrode and can damage already-printed electrode [us6485591].
- Gravure plate design: partition-wall geometry (bent vs straight walls, recessed coupling walls, notches) governs paste transfer and thickness uniformity; bent-wall designs make transfer depend on paste viscosity and degrade shape accuracy [us10449795].
- Screen example: Ni ink printed on 75 um PET with stainless 400-mesh screen, 10 um emulsion, 3.5 x 1.0 mm electrodes; dried in an IR belt furnace at about 125 C [us6485591].
- Direct-print vs transfer: organic-solvent electrode inks (about 30 wt% diethylene glycol monobutyl ether) can swell/corrode the green sheet, so printing on a carrier film then transferring is used [us6485591]. Another patent states solvent-based inks cause shorts in sheets <=15 um and proposes water-based ink [us6979416].
- Inkjet: separate heads for Ni(or Pd/Cu/W/Mo) electrode ink and BaTiO3 dielectric ink onto carrier film, with symmetric stacking [us7505247]; ink design (<=2 poise, 0.001-10 um particles, 1-80 wt% solids, 720 dpi, circulation) in [us6979416]. Both are patent proposals; no production use evidenced in fetched pages.
- Registration: electrodes printed using first target marks read by four cameras, table corrected in X, Y, theta; second target marks printed with electrodes for later stacking alignment [us5935365].
- Drying: hot air 45-80 C for coated sheet [us5935365]; electrode/blank paste 70-120 C, 1-10 min [us7641727]; green-sheet drying 50-100 C, 1-20 min [us7641727].
- Step-height compensation, three approaches seen:
  1. Blank (inverse) pattern printed in the electrode-free area at about electrode thickness (1 um in example) with "electrode level-difference absorbing" ceramic paste [us7641727].
  2. High-viscosity ceramic cover on top/bottom of the stack over the recessed margin (not in-plane margin printing) [us9001493].
  3. Margin dielectric printing at or below electrode thickness is cited as prior art needing separate pastes of tuned viscosity and solids [us9001493 search-excerpt only; prior-art KR2002-0009451 not independently read].

## Parameter ranges
| parameter | typical range | source key | notes |
|---|---|---|---|
| Fired/printed electrode thickness (modern) | 0.4-0.7 um (example 0.55 um) | [us10573466] | patent range; example 560 electrode layers |
| Electrode thickness (general) | 0.1-2 um, preferred 0.1-1.0 um (ex. 1 um) | [us7641727] | |
| Electrode thickness | 0.2-1.0 um | [us9001493] | dielectric <=1.0 um |
| Electrode thickness (old, thick) | 4 um | [us6485591] | 16-20 um sheets, early-generation |
| Green sheet thickness | 0.5-30 um before drying, preferred 0.5-10; <=3 um after drying (ex. 1.2) | [us7641727] | shrinks 5-25% on drying |
| Green sheet thickness | 0.4-3.0 um | [us10573466] | |
| Blank/level-difference pattern thickness | about equal to electrode (ex. 1 um) | [us7641727] | |
| Level-difference paste viscosity | 4-30 Pa.s (pref. 7-15) at 25 C, 8 1/s | [us7641727] | <4: mesh flow-out; >=30: poor leveling |
| Paste binder polymerization degree | >=1400 (pref >=1700; ceiling ~3300); >= green-sheet binder | [us7641727] | PVB/polyacetal |
| Gravure roll diameter | 30-300 mm | [us10449795] | |
| Gravure print speed | 5-150 m/min | [us10449795] | other example 10 m/min on 2 cm plate [us6485591] |
| Gravure cell depth | 1-100 um | [us10449795] | wall width 1-25 um |
| Screen | 400 mesh SUS, 10 um emulsion | [us6485591] | single example |
| Electrode drying | 70-120 C 1-10 min; IR furnace ~125 C | [us7641727][us6485591] | |
| Registration error (max electrode misalignment) | 8-11 um with camera/target-mark system vs ~250 um prior art | [us5935365] | accumulates over layers |
| Step-compensation cover viscosity | 10,000-1,000,000 cps (slurry 10k-300k; cover sheet 300k-1M) | [us9001493] | <10k leaves unfilled margin; >1M won't flow |
| Recession ratio target | 0-0.15 | [us9001493] | (t1-t2)/(t1-ta) |
| Inkjet ink | <=2 poise; 0.001-10 um particles; 1-80 wt% solids; 720 dpi | [us6979416] | |
| Ceramic content of level paste | 30-55 wt% (pref 35-50) | [us7641727] | |

## Equipment
- Gravure printer with engraved roll, doctor blade, back roll (impression cylinder optional/removable in test rigs) [us10449795][us6485591].
- Flat/rotary screen printer with stainless mesh [us6485591]; four-camera vision registration with X-Y-theta stage [us5935365].
- Hot-air / IR-belt drying ovens [us5935365][us6485591].
- Inkjet heads (electrode + dielectric) with ink-circulation loop [us7505247][us6979416].
- Static meter used for green sheet charge (charge wrinkles sheet, hurting stacking accuracy) [us7641727].

## Defect / yield modes
- Step-induced delamination/cracks/electrode disconnection in margin region, worse at high layer count [us9001493][us7641727].
- Accumulated thickness difference center vs edge of stack: >20 um beyond ~10 layers (prior art, 4 um electrodes); measured 5-10 um at 51 layers and 7-15 um at 101 layers with transfer approach; acceptable surface irregularity ~3 um [us6485591].
- Sheet damage / shorts from solvent-based ink on thin sheets (<=15 um) [us6979416][us6485591]; pinholes in greenware cause shorts [us6485591].
- Paste flow-out through mesh (low viscosity), poor leveling and film breakage (high viscosity) [us7641727].
- Gravure thickness unevenness and shape inaccuracy from wall geometry [us10449795]; electrode damage by impression cylinder [us6485591].
- Registration: shorting rate 33.2% (prior art) vs 0.4-0.7%, yield ~33% vs ~92%, BDV 150 V vs 230 V with the vision-aligned, extrusion-coated process (large-pattern, thick-layer examples; 8.0 um/75 layers, 2.5 um/150 layers) [us5935365].
- Center-filled margin dielectric differs in grain density/size from electrode region -> may lower BDV (search excerpt of [us9001493]; not seen in fetched text).

## Gating effects
- Print thickness ties directly to step height: each layer adds ~electrode thickness only over the electrode area, so step grows with layer count; limits unmitigated stack to tens-to-low-hundreds of layers [us6485591][us9001493].
- Electrode thickness floor (~0.4 um in patent ranges [us10573466]) interacts with paste/screen/gravure ability; patents say screen/gravure may limit thinness (search excerpt, unverified).
- Registration error accumulates through the stack and sets minimum margin/overlap tolerance [us5935365].
- Solvent compatibility with sub-3 um sheets forces transfer printing or water-based inks [us6979416][us6485591].

## Open questions / conflicts
- No peer-reviewed (T3) or vendor-spec source found giving production screen mesh/emulsion, wet vs dry print thickness for 0.5-1.5 um, or modern print speeds. Only single patent examples exist.
- Murata page gives no numbers; "tens of microns" electrode width is the only dimension [murata-gs-web].
- [us7641727] gives paste polymerization degree preference as 2000 in one passage and 2400 in another (internal inconsistency noted by fetch).
- Whether the production industry has moved to gravure vs screen for sub-um electrodes is not established by these sources; [us10449795] only states gravure is widely used.
- [us7641727] was only read through char 100,000 of 173,000; [us10449795] to 100,000 of 113,758.
- Inkjet MLCC production use: unverified. Prior-art KR2002-0009451 margin-printing claims unverified.
