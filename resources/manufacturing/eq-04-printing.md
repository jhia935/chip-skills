# MLCC Internal-Electrode Printing Line: Equipment Structure and Step Order (paste make-up → print → dry → inspect → rewind)
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: equipment and step sequence for page `visualizations/04-electrode-printing-3d.html`. Complements `30-electrode-printing.md` (keys used there, e.g. [us6485591], [us5935365], [us7641727], [us10449795], [us10573466], [us9001493], are not repeated here).

Method: Google Patents full text and equipment-maker web pages, read via WebFetch (patent pages often truncated at ~100k chars; noted per source). One brochure PDF was read with `pdftotext`. Patent examples are inventor embodiments, not production data. Equipment-maker names appear only as citations; tiers: patents T4, equipment-maker product pages/brochures T6 (vendor material, marketing claims).

## Sources
| key | title | publisher | year | tier | URL |
|---|---|---|---|---|---|
| [cn102254585] | Method for manufacturing conductive paste (Ni internal-electrode paste; heated premix, nozzle pre-dispersion, high-pressure homogenizer, filtration) | patent CN102254585A, assignee Sumitomo Metal Mining (per Google Patents) | n.d. | T4 | https://patents.google.com/patent/CN102254585A/en |
| [wo2017018228] | Nickel paste and method for producing nickel paste (vehicle, kneading, vacuum de-airing, viscosity test) | patent WO2017018228A1, applicant Sumitomo Metal Mining | 2016 filing | T4 | https://patents.google.com/patent/WO2017018228A1/en |
| [us7485244] | Internal electrode paste and production method of electronic device (ball-mill kneading, viscosity, drying) | patent US7485244B2, TDK | n.d. | T4 | https://patents.google.com/patent/US7485244B2/en |
| [us7661361] | Printing and drying method, method of production of electronic device, and printing and drying system | patent US7661361B2, TDK | filed 2006, granted 2010 | T4 | https://patents.google.com/patent/US7661361 |
| [us5716481] | Manufacturing method and manufacturing apparatus for ceramic electronic components (vacuum print table, X-Y-θ-Z, cameras, hot-air dryer) | patent US5716481A, TDK | 1998 | T4 | https://patents.google.com/patent/US5716481 |
| [us5935358] | Method of producing a laminate ceramic capacitor (two-color take-up screen press with dryers) | patent US5935358A (Google lists New Create Corp; may be inaccurate) | n.d. | T4 | https://patents.google.com/patent/US5935358 |
| [us12300442] | Multilayer ceramic capacitor (electrode print S1 → overlapping dielectric S2; screen-plate peripheral tension) | patent US12300442B2, Murata | n.d. | T4 | https://patents.google.com/patent/US12300442B2/en |
| [us6962111] | Screen-printing plate for laminated ceramic devices (stainless plate, frame, mesh holes) | patent US6962111, Murata | 2005 | T4 | https://patents.google.com/patent/US6962111 |
| [us20050016661] | Murata application: die coat → dry → gravure unit 1 (electrode) → dryer → gravure unit 2 (ceramic) → dryer → punch/transfer stacking | patent appl. US20050016661A1, Murata | n.d. | T4 | https://patents.google.com/patent/US20050016661A1/en |
| [us7739950] | Method for manufacturing ceramic electronic component and gravure printing method (print/trigger marks, cameras, compensator roll, axial roll shift) | patent US7739950B2, Murata | n.d. | T4 | https://patents.google.com/patent/US7739950 |
| [us7063014] | Photogravure press and method for manufacturing multilayer-ceramic electronic component | patent US7063014B2, Murata | n.d. | T4 | https://patents.google.com/patent/US7063014 |
| [us6936123] | Apparatus for producing laminated electronic part (thickness gauge, CCD electrode imaging before lamination) | patent US6936123B2, Murata | 2005 | T4 | https://patents.google.com/patent/US6936123B2/en |
| [nissei-gs-aoi] | Ceramic-device green-sheet appearance inspection equipment (LTCC catalog; targets include green sheets for multilayer capacitors) | Nissei (ipros product page) | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/en/nissei/product/detail/2000383929 |
| [sakurai-msdr] | MSDR series cylinder-type R2R screen printing machine | Sakurai Graphic Systems (ipros product page) | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/en/sakurai-gs/product/detail/2001510673 |
| [sakurai-msdr-fine] | MSDR fine-line (40 µm) verification: squeegee / plate settings | Sakurai Graphic Systems (ipros page) | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/en/sakurai-gs/product/detail/2001665515/ |
| [sakurai-mlcc-case] | Case study: cylinder screen printers adopted for MLCC mass production, ~30 µm overlay | Sakurai Graphic Systems (ipros page) | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/en/sakurai-gs/product/detail/2001637524/ |
| [komori-gapless-2024] | Gapless synchronized screen printing machine (brochure, EN, 1 page) | Komori (PDF, PDF metadata 2024-02) | 2024 | T6 | https://prod-komori-america-umb-webapp.azurewebsites.net/media/uzojo5dp/pe_ryurone-35sz_en_2401.pdf |

## Equipment structure

### A. Paste make-up
- Vehicle: binder resin dissolved in solvent with heating and stirring; example 120 g dihydroterpineol + 10.5 g ethyl cellulose at 80 °C [wo2017018228]. Carrier A = 13 % ethyl cellulose in 87 % terpineol; carrier B = 18 % ethyl hydroxyethyl cellulose in isobornyl propionate [cn102254585]. PVB / polyvinyl acetal binder + terpineol in TDK paste [us7485244].
- Mixing/kneading equipment named: stirrer, self-revolving (planetary centrifugal) mixer, planetary mixer for additive mixing; roll mill, ball mill, homogenizer, kneader or planetary mixer for kneading Ni into the vehicle [wo2017018228]. Ball-mill kneading of Ni + ceramic + PVB + terpineol [us7485244].
- Three-roll mill: used as the conventional dispersion route (comparative examples 4, 5) [cn102254585]; no gap or pass data. Search excerpt of the same patent says fine Ni (≤0.2 µm) is hard to disperse by 3-roll shear alone (snippet, unverified in fetched text). CN103903676A excerpt: paste "predispersed and mixed with a three-roll mill" (snippet, unverified).
- High-pressure route [cn102254585]: (1) heated coarse paste (≈60 °C) pushed through a train of throttle nozzles (pre-dispersion; 0.2–0.5 mm orifice, ≥2 in series, example 6 nozzles, OD 4.7 mm, length 10 mm, feed ≥5 kg/cm²); (2) high-pressure homogenizer, orifice 0.05–0.2 mm, 50–250 MPa, jet 100–1000 m/s; cooler on the outlet side preferred; (3) filtration.
- Filtration: filter with 99 % filtering precision, rated 5 µm or finer; examples 3 µm and 1 µm [cn102254585].
- De-airing / dehydration under reduced pressure (vacuum pump or aspirator), example 0.098 MPa, 60 °C, 20 min [wo2017018228].
- Viscosity instruments: Brookfield-type at 10 rpm (4 s⁻¹), read 8 h after manufacture, drift after 30 days at 25 °C [cn102254585]; rheometer at 4.0 s⁻¹, 25 °C [wo2017018228]; cone-disc viscometer at 8 s⁻¹, 25 °C [us7485244].
- Dry-film QC: paste applied on PET, dried 120 °C × 40 min, gloss (60°) and film density [cn102254585]; 200 µm applicator, 120 °C × 40 min, φ40 mm punch for density [wo2017018228].

### B. Web handling around the printer (roll-to-roll)
- TDK printing/drying system [us7661361]: feed roll → guide rolls incl. dancer roll → screen printer → inspection unit → suction roll (holds sheet back by suction; stops during print, then index-feeds one print length) → buffer zone (sheet hangs slack) → continuous drying chamber → EPC detector + EPC drive roll → tension-detection roll → dancer → take-up roll. Optional take-up zone adds buffer, suction roll, destaticizer (blows destaticizing gas on the support-sheet surface) and tension pickup.
- Inside the drying chamber, a metal sheet (or roller conveyor) supports the web over the first L1 = 1.8–2.5 m from the inlet, then a belt conveyor [us7661361].
- Murata R2R line with screen-printing unit + drying unit (hot air, far-IR or heaters) printing at a constant pitch, then take-up [us6936123].
- Two-color take-up screen printing machine: payout unit, first-color head, first-color dryer, second-color head, second-color dryer, take-up unit [us5935358]. Same effect possible by passing twice through a one-color press [us5935358].

### C. Screen printer
- Printing table whose receptacle surface is a vacuum suction surface; four drives move the table in X, Y, θ and Z; light-receiving parts of four image-processing cameras are embedded in the table's four corners to read first target marks; separate cameras with projection lamps check first vs second marks at a correction stage; rollers touch only the non-printed face [us5716481].
- Screen plate: stainless plate with mesh-hole patterns, supported by a frame at its periphery; squeegee pressed onto the plate and moved in one direction [us6962111]. Peripheral tension on the plate adjusted location by location to reduce pattern displacement/distortion [us12300442].
- Flat-table screen printing has a gap (snap-off) between stencil and substrate: the plate peel-off angle gets shallower over the stroke and printing pressure differs between center and edge (plate reaction force), causing thickness/dimension variation; a gapless synchronized cylinder machine is offered as the remedy and said to be effective for MLCC-type printing of many small patterns [komori-gapless-2024].
- Cylinder-type R2R screen printer: 25 µm film, CCD position detection and correction, direct drive (no gears/belts), continuous printing, conductive paste [sakurai-msdr]; adopted for MLCC mass production with ~30 µm overlay by automatic correction [sakurai-mlcc-case]. It has both a squeegee and a "doctor" (flood/scraper) stroke with set speeds [sakurai-msdr-fine].

### D. Gravure printer
- Gravure roll immersed in paste tank/pan; doctor blade removes excess; elastic impression (pressure) roll forms a nip of width N with the gravure roll; substrate = green sheet lined with carrier film [us7063014]. Sheet faces downward in the gravure unit [us20050016661].
- Tandem: gravure unit 1 (conductive paste, electrodes) → drying furnace → gravure unit 2 (ceramic paste, step-smoothing layer in electrode-free areas) → drying furnace [us20050016661][us7739950].
- Registration between units [us7739950]: unit 1 prints print marks and trigger marks with the electrodes; trigger sensors + cameras + image processors feed a controller that compares mark positions with stored targets; a compensator roll corrects length-direction position; a moving device (air cylinder, hydraulic cylinder or motor + rack-and-pinion) shifts the second gravure roll along its axis to correct width displacement. Second roll: projections matching the electrodes plus a grid-shaped groove for the ceramic paste.

### E. Dryer
- Hot-air drying chambers with supply/discharge passages, optional far-IR heaters, hot-air generator, HEPA filter, return (recirculation) passage [us5716481].
- Drying chamber with heater (ceramic heater or hot air) [us7661361]; furnaces with heaters between/after gravure units [us20050016661].

### F. Inspection
- Non-contact sheet-thickness head (radiation or laser; contact micrometer alternative) measured at non-printed positions with intermittent feed; CCD camera (≥1 Mpx, non-interlaced, square pixels) with telecentric lens NA ≥ 0.05; ring luminaire ≥ 10,000 lx with illuminance feedback; measuring table holding the sheet by vacuum suction or static electricity; calibration with a pin gauge on a matte-black stand [us6936123].
- Appearance inspection items: sheet scratches, foreign matter, stains; electrode unevenness, thickening, thinning, disconnection, short, pattern position accuracy; 2D + 3D inspection with multi-angle illumination; used before stacking [nissei-gs-aoi].
- An "inspection unit" right after the screen printer, type not described [us7661361].

## Step sequence
1. Vehicle make-up: dissolve binder (EC or PVB) in solvent with heating and stirring [wo2017018228][cn102254585][us7485244].
2. Premix: Ni powder + BaTiO₃ co-material + dispersant into the vehicle, stirred (heated ~60 °C in one route) [wo2017018228][cn102254585].
3. Dispersion — alternatives: three-roll mill (conventional) [cn102254585]; ball mill [us7485244]; nozzle pre-dispersion + high-pressure homogenizer with outlet cooler [cn102254585].
4. Filtration ≤5 µm [cn102254585]; vacuum de-air/dehydrate [wo2017018228]; viscosity adjustment with solvent [wo2017018228]; viscosity and dry-film checks [cn102254585][wo2017018228][us7485244].
5. Unwind carrier sheet; dancer roll holds print tension F1 [us7661361].
6. Screen route: vacuum table + camera alignment (X-Y-θ) [us5716481][us5935365] → screen print (squeegee stroke, flood return) [us6962111] → index feed by suction roll [us7661361]. Gravure route: continuous gravure print with print/trigger marks [us20050016661][us7739950].
7. Intermediate drying of the electrode print [us7661361 (primary print dried 75 °C, 1.5 min)][us5935358][us20050016661 (partial or full dry)].
8. Step-compensation print (ceramic paste in electrode-free areas) registered to the first print [us7661361][us12300442][us20050016661][us7739950]. Order in all three: electrode first, then ceramic; [us7661361] says reversing the order is predicted to give the same effect.
9. Main drying (continuous chamber after a buffer loop) [us7661361]; second dry 90 °C in TDK example [us7661361].
10. Inspection (camera, thickness) [us6936123][nissei-gs-aoi]; position varies (right after printer [us7661361], offline before stacking [us6936123]).
11. EPC correction, tension detection, dancer, destaticizer, take-up [us7661361].
12. To stacking: punch/cut, transfer, peel film, stack [us20050016661][us6936123].

## Parameter ranges
| parameter | range | source key | notes |
|---|---|---|---|
| Ni content of paste | 50–70 mass% | [wo2017018228] | 30–70 wt% [cn102254585]; 47 wt% example [us7485244][cn102254585] |
| Ni particle size | 0.03–0.5 µm (BET) | [cn102254585] | 0.05–0.5 µm [wo2017018228]; 0.2 µm example [us7485244] |
| Ceramic co-material | 3–25 parts / 100 Ni, 0.01–0.2 µm | [cn102254585] | |
| Binder | 1.0–5.0 wt%, Mw 20,000–200,000 | [cn102254585] | PVB 2.5–5.5 parts/100 powder, DP ≥1400 [us7485244] |
| Vehicle dissolution | 80 °C, stirring | [wo2017018228] | example only |
| Premix temperature | ~60 °C | [cn102254585] | lowers viscosity; >70 °C undesirable |
| Pre-dispersion nozzle | 0.2–0.5 mm, ≥2 in series (ex. 6), ≥5 kg/cm² | [cn102254585] | |
| Homogenizer pressure | 50–250 MPa (pref. 100–200) | [cn102254585] | orifice 0.05–0.2 mm; jet 100–1000 m/s |
| Homogenizer passes | 1–10 (examples) | [cn102254585] | 27 Pa·s (1 pass) → 24 Pa·s (3–5 passes); Ra 0.26 → 0.24 µm |
| Filter rating | ≤5 µm at 99 % precision (ex. 3 µm, 1 µm) | [cn102254585] | |
| De-air / dehydrate | 0.098 MPa, 60 °C, 20 min | [wo2017018228] | residual moisture <1 mass% |
| Paste viscosity | 8–150 Pa·s (4 s⁻¹, 25 °C) | [wo2017018228] | ≥4 (pref ≥6) Pa·s at 8 s⁻¹ [us7485244]; 0.1–40 Pa·s for gravure [us7063014] |
| Print tension F1 | 0.28–0.83 N/cm (ex. 0.53) | [us7661361] | per unit width |
| Drying tension F2 | 0.16–1.22 N/cm (ex. 0.39) | [us7661361] | prevents length shrinkage |
| Take-up tension F3 | 0.5–0.8 N/cm | [us7661361] | |
| Feed rate | 3–12 m/min (ex. 5.9) | [us7661361] | |
| Drying chamber | 4–8 m long; metal support L1 1.8–2.5 m | [us7661361] | |
| Drying | 70–100 °C, 0.3–4 min (ex. 75 °C/1.5 min primary, 90 °C secondary) | [us7661361] | 45–80 °C hot air, prior art 90 °C/180 s gave 102 µm carrier deformation vs ≤20 µm [us5716481] |
| Carrier sheet | 5–100 µm (ex. 38 µm × 150 mm; 16 µm) | [us7661361] | |
| Layer-to-layer deviation (example) | up to −15.8 µm feed / −12.0 µm width | [us7661361] | blank vs design up to −19.2 µm |
| Step-smoothing ceramic thickness | 40–90 % of electrode (ex. ~60 %) | [us12300442] | conflicts with "≈ electrode thickness" [us7641727] |
| Electrode thickness | 0.2–0.6 µm (pref 0.2–0.4) | [us12300442] | |
| Gravure cell wall | 5–20 µm | [us7063014] | 1–25 µm [us10449795] |
| Overlay (cylinder screen, MLCC case) | ~30 µm | [sakurai-mlcc-case] | vendor claim |
| Squeegee settings (40 µm Ag line test, not MLCC) | angle 45–75°, hardness 70–80, insertion 0.3–0.6 mm, speed 50–200 mm/s, doctor 50–200 mm/s, plate clearance 1 mm | [sakurai-msdr-fine] | cylinder machine verification |
| Inspection optics | CCD ≥1 Mpx, NA ≥0.05, ring light ≥10,000 lx | [us6936123] | threshold example: gray 100 (electrode ≈60–70, sheet ≈240–250) |

## Gaps / unverified
- No production mesh count / emulsion thickness / snap-off value for sub-µm Ni electrodes found; only the single 400-mesh / 10 µm example in [us6485591] and a non-MLCC squeegee test [sakurai-msdr-fine].
- Three-roll mill gap, roll speeds, pass count for Ni paste: not found. "3-roll shear limit for ≤0.2 µm Ni" is a search excerpt of [cn102254585]; JP7857079B2 claim that flakes/poor dispersion remain after 3-roll mixing is a search excerpt only.
- Intensifier (hydraulic) construction of the homogenizer is not described in [cn102254585]; only nozzle/orifice/pressure/cooler.
- Unwind-side EPC and ionizer bar: general practice; [us7661361] places EPC after the dryer and the destaticizer at take-up.
- Screen-printer inspection unit type in [us7661361] not described. Camera-table location: [us5716481] embeds cameras in table corners; [us5935365] (other notes) uses four cameras; overhead vs under-table not resolved for production.
- Gravure dryer temperatures, line speeds for MLCC Ni: not stated in [us20050016661][us7739950][us7063014].
- Automatic screen cleaning (under-screen wipe) named only in a generic web article (patsnap eureka), not used.
- Truncated reads: [us7739950] (to 100k of 130k), [us20050016661] (to 100k of 120k), [us7661361] (read fully in two parts), [us5716481] (to 100k of 339k), [us6936123] (to 100k of 115k), [us12300442] (to 100k of 140k), [cn102254585] (to 100k of 101k), [wo2017018228] (to 100k of 121k), [us7485244] (to 100k of 165k).
- Sakurai main site (sakurai-gs.co.jp) refused connection; product facts taken from its ipros pages.
