# Green-Block Cutting, Chip Separation and Side-Margin Line: Equipment and Step Order
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Note: patents were read as Google Patents full text via WebFetch (long pages read to about 100k chars unless noted). Equipment-maker pages are product listings (IPROS, made-in-china, vendor sites); they give machine structure and spec ranges, not MLCC line recipes. Brand names appear here only as citations. Builds on resources/manufacturing/40-lamination-and-dicing.md (keys [us10573466], [us11348730], [us11600441], [us10460876], [us6091598], [us8953300] are defined there).

## Sources
| key | title | publisher | year | tier | URL |
|---|---|---|---|---|---|
| [us4517144] | Method for cutting and separating green ceramic capacitor bodies | patent US4517144A (Sprague Electric) | 1985 (filed 1983) | T4 | https://patents.google.com/patent/US4517144A/en |
| [us6892616] | Cutting apparatus (green-sheet laminate knife cutter, blade parallelism) | patent US6892616B2 (UHT Corp) | n.d. (B2 grant) | T4 | https://patents.google.com/patent/US6892616B2/en |
| [us6526958] | Method of cutting ceramic green block (cure before dicing) | patent US6526958B1 | n.d. | T4 | https://patents.google.com/patent/US6526958B1/en |
| [us20240198558] | Cutting method and method for manufacturing multilayer ceramic component | patent application US 2024/0198558 A1 (KYOCERA) | 2024 | T4 | https://ipiq.io/patents/4451982 (Google Patents page not fetched) |
| [us8795454] | Manufacturing method for monolithic ceramic electronic component (expand, tumble, side-gap sheet) | patent US8795454B2 (Murata) | 2014 | T4 | https://patents.google.com/patent/US8795454B2/en |
| [us10453615] | Method for manufacturing multilayer ceramic electronic component (heated functional sheet, punch, thermocompression) | patent US10453615B2 (Murata) | n.d. | T4 | https://patents.google.com/patent/US10453615B2/en |
| [us9039859] | Method for manufacturing monolithic ceramic electronic components (edge trim, strip turning, side cut) | patent US9039859B2 (Murata) | n.d. | T4 | https://patents.google.com/patent/US9039859B2/en |
| [us5233669] | Device for and method of detecting positioning marks for cutting ceramic laminated body | patent US5233669A (Murata) | 1993 | T4 | https://patents.google.com/patent/US5233669A/en |
| [jph0855755a] | Method for determining cutting position of ceramic laminate | patent JPH0855755A (Taiyo Yuden) | 1996 | T4 | https://patents.google.com/patent/JPH0855755A/ja |
| [jp3331884b2] | Method for manufacturing multilayer ceramic electronic component (film holding, chip release without heating) | patent JP3331884B2 (Matsushita / Panasonic) | n.d. | T4 | https://patents.google.com/patent/JP3331884B2/ja |
| [hima-8012-web] | HIMA-8012 green-ceramic cutting machine (heated blade + heated vacuum stage, dual CCD) | equipment-maker listing (Himalaya, made-in-china.com) | accessed 2026-11-11 | T6 | https://himalayasemi.en.made-in-china.com/product/jGDUapYljxrR/China-High-Precision-Laser-Ceramic-Cutting-Machine.html |
| [microtec-mtc0402-web] | Cutting machine MTC-0402-2 (MLCC/LTCC/HTCC green-sheet parts) | equipment-maker listing (Micro Tech, IPROS) | accessed 2026-11-11 | T6 | https://pr.mono.ipros.com/en/e-microtec/product/detail/2000126743 |
| [sanwa-gsc-web] | Green sheet cutter (carbide knife blade) | blade-maker listing (Sanwa Creation, IPROS) | accessed 2026-11-11 | T6 | https://mono.ipros.com/product/detail/2001056898 |
| [adt-mlcc-dicing-web] | MLCC dicing application page | dicing-saw maker (ADT) | accessed 2026-11-11 | T6 | https://www.adt-co.com/mlcc-dicing/ |
| [accretech-mn-web] | Nickel bond blade, MN type (raw ceramic green sheet cutting) | blade maker (ACCRETECH) | accessed 2026-11-11 | T6 | https://www.accretech.com/en/product/semicon/supplies/blade/nickelmn.html |
| [yac-dls-web] | Two-spindle slicing machine DLS-32/25RMS | equipment-maker listing (YAC DASTECH, IPROS) | 2007 | T6 | https://mono.ipros.com/product/detail/243589006 |
| [nitto-revalpha-web] | Thermal release sheet REVALPHA | tape maker (Nitto) | accessed 2026-11-11 | T6 | https://www-origin.nitto.com/us/en/products/e_parts/electronic001 |

## Equipment structure
- **Knife (press) cutter, ram side.** Column on a machine bed; cutter ram moves vertically on guide rails by ball screw and servomotor; cutter holder carries a long knife-edge blade. Alternative drives: hydraulic servo, linear motor, air cylinder with stopper, cam [us6892616].
- **Blade parallelism.** Support tilt in the blade-length direction set by a cam with damping spring and held by a hydraulic brake; a sensing portion (contact body, optical sensor or probe) on a jig measures blade lowering at both ends, the controller computes the tilt, then the half-cut height is added to the lowering data. Edge breakage/abrasion detection raises an alarm (lamp/buzzer) [us6892616].
- **Index table.** Vacuum holes to tack the workpiece; turned 90 degrees between the two cutting directions; column (or table) steps a set pitch in Y between strokes [us6892616]. 1983 manual version: single long razor blade pressed down, withdrawn, table moved one spacing, repeated; then 90-degree rotation and a different spacing [us4517144].
- **Heated cutter (vendor listing).** 8-inch vacuum cutting stage with micro-vacuum pores; Y, Z and theta axes on servo motors with encoders; left/right CCD cameras on stepper motors with LED lighting and crosshair centering; cutting-tool unit = blade holder + cutting separator (adjustable spring pressure) + blade heater; blade and stage heated by two independent PID controllers; industrial PC with 17-inch LCD [hima-8012-web]. Listing title says "laser" but the body describes only a heated blade (listing error, my reading).
- **Cutter options (vendor listing).** Air-balance system to reduce cutting stress; blade-chip inspection; dual head; automatic blade bottom-dead-center adjustment; loader/unloader [microtec-mtc0402-web]. Cutting method is not named; "alignment cut / pitch cut per shot" and "blade bottom dead center" imply a vertical-stroke knife (my inference).
- **Knife blades.** Carbide green-sheet cutter blade [sanwa-gsc-web]. Draw-cut variant: linear edge inclined to the moving direction, double-edged, carbon steel or cemented carbide; support may carry a heater to soften the binder and a magnet; uncut portion held by a plate [us20240198558].
- **Rotary dicing route.** Dicing machine [us10573466]; 4-inch nickel or steel-core nickel blades, standard or serrated, frequent dressing; dry or wet dicing [adt-mlcc-dicing-web]; nickel MN blade sold for raw ceramic green sheet cutting [accretech-mn-web]; two-spindle slicer allowing multi-blades of different pitch, MLCC delivery record [yac-dls-web].
- **Mark recognition.** Camera at the side of the mother laminate images cut-exposed positioning marks; A/D binarization, area/length filtering, grouping, midpoint of outermost marks; stage moves in Y and theta [us5233669]. Alternative: holes punched/lasered in the top cover sheet expose lower conductors; CCD + image processing set X/Y cut lines [jph0855755a]. Edge of the laminate is cut off first to expose conductive films or cutting marks [us9039859].
- **Holding sheet.** Expandable adhesive sheet (PVC base, acrylic adhesive) [us8795454]. Film on a metal base with adhesive layer; prior art = foaming-agent adhesive sheet released by heating [jp3331884b2]. Thermal release tape: adheres at room temperature, peels on heating [nitto-revalpha-web].
- **Separation.** Expander: sheet stretched to about 160 % (expander not illustrated) [us8795454]. Rod-shaped projections (250 mm) pressed several times on the film back, optional vibration/ultrasound [jp3331884b2]. Knife edge presses the adhesive sheet so it bends and bodies drop [us8795454]. Liquid-nitrogen chill then gentle rocking [us4517144].
- **Side-gap (side margin) unit.** Silicone-rubber support base + tumbling action plate (rotates all chips 90 degrees at once); optional adhesive application plate; affixation elastic body; compression-bonding elastic body; sheet excess removed by roll separation [us8795454]. Heating plate for sheet, air fan / Peltier cooling, tabular elastic body for punching, heating plate for thermocompression [us10453615].

## Step sequence
1. Pressed mother block fixed on a holding sheet (adhesive/expandable/thermal-release) [us8795454][jp3331884b2].
2. Cut off the laminate edge to expose conductive films or cutting marks [us9039859].
3. Read marks (side camera on cut-exposed marks [us5233669]; or top CCD through cover-sheet holes [jph0855755a]); correct Y and theta [us5233669][hima-8012-web].
4. First cut set: blade down, withdraw, step one pitch, repeat [us4517144][us6892616]. Press cut along CL1 in the stacking (z) direction forms end surfaces and strips [us9039859].
5. Turn table 90 degrees; second cut set at a different pitch [us4517144][us6892616]. Preferred side cut in [us9039859]: turn strips so the first side faces up, hold on an elastic base, move blade in x (perpendicular to stacking).
6. Expand sheet (~160 %) to separate chips and avoid re-adhesion [us8795454].
7. (Side-gap route) tumble 90 degrees -> optional adhesive transfer -> press chips into side sheet on elastic body (punch) -> roll off excess sheet -> thermocompression -> tumble twice and repeat for the second side -> collect by knife-edge bending -> fire [us8795454]. Variant: hold chip, heat functional sheet in contact (50-100 C), cool, punch against elastic body, fold back excess, optional thermocompression, repeat [us10453615].
8. Release and collect (heat foaming release or mechanical) [jp3331884b2][nitto-revalpha-web][us8795454].

## Parameter ranges
| parameter | value | key | notes |
|---|---|---|---|
| Blade / stage temperature | RT ~ 100 C, uniformity +/-3 C | [hima-8012-web] | vendor listing, not an MLCC recipe |
| Blade (holder) size | L 203 mm, H 22.4 mm, T 0.1-0.4 mm | [hima-8012-web] | |
| Carbide knife | L 80-250 mm, W 22.4 mm, T 0.4 mm, edge 0.03-0.1 mm, angle 8 deg | [sanwa-gsc-web] | |
| Draw-cut blade | T <= 100 um, tip angle 30-75 deg, inclination 15-80 deg | [us20240198558] | degree/micro signs garbled in source text |
| Max cutting thickness | 6 mm | [hima-8012-web] | product dependent |
| Strokes | Z max 500 mm/s; max 6 cuts/s; Y stroke 300 mm, Z 30 mm, rotation 150 deg | [hima-8012-web] | |
| Alignment accuracy | Y/Z +/-0.005 mm, theta +/-0.001 deg, repeat +/-0.005 mm | [hima-8012-web] | |
| Cut tact | alignment cut 0.29 s/shot, pitch cut 0.12 s/shot; Y repeatability +/-1 um; min cut size 0201 | [microtec-mtc0402-web] | |
| Dicing blade | OD 2-4 in, T 0.15-0.35 mm, diamond 30-70 um, feed 50-250 mm/s, spindle 12-30 krpm | [adt-mlcc-dicing-web] | page does not say green or fired |
| Dicing a cured block | uncured needs 2 mm/s for the Ra that a 150 C x 5 h cured block gives at 50 mm/s (time 1/25); heat 50-200 C; binder 4-20 wt%; Hv 20-100 kg/cm2 | [us6526958] | |
| Press-cut stroke depth | half-cut height added to lowering data | [us6892616] | no number |
| Expand ratio | about 160 % | [us8795454] | |
| Holding film | 25-100 um thick, Ra <= 10 um, film-sheet 30-150 gf/50 mm, base-film 0.5-20 gf/50 mm | [jp3331884b2] | |
| Foaming release (prior art) | about 130 C | [jp3331884b2] | binder softens, chips re-adhere |
| Thermal release tape | standard 100-120 C x 1 min; 120 / 150 / 170 C types | [nitto-revalpha-web] | general product, MLCC not named |
| Low-temp release | 5 or 10 C film, light vibration, no re-adhesion | [jp3331884b2] | |
| LN2 separation | < -100 C (LN2 90 s), rocking ~2 Hz, 45 deg, ~5 s; >80 % free after dicing | [us4517144] | 1983, thick layers |
| Side-gap sheet | 10-50 um, break strength 1-50 MPa, break strain <= 50 % | [us8795454] | |
| Elastic bodies | modulus <= 50 MPa, thickness <= 5 mm | [us8795454] | |
| Pressing depth | <= half the gap between adjacent chips | [us8795454] | |
| Thermocompression | <= 200 C (below sheet softening point) | [us8795454] | |
| Thermocompression | 50-100 C, 1-15 MPa per laminate; optional | [us10453615] | conflicts in range with <=200 C above (different patents) |
| Sheet heating before punch | 50 C to < 100 C, then cool to <= 30 C | [us10453615] | |
| Side-cut defects (z-direction vs x-direction cut) | 1.5 um: 95 % vs 3 %; 0.7 um: 100 % vs 18 % | [us9039859] | ~200 checked per condition |

## Gaps / unverified
- No MLCC-maker (T1) page describes the cutting line; Murata's process page says only "stacked, pressed, and cut" [murata-gs-web in 40-lamination-and-dicing.md].
- Heated-stage temperature for MLCC press cutting is only the vendor range RT~100 C [hima-8012-web]; [us20240198558] names a support heater without a temperature.
- [microtec-mtc0402-web] cutting method is inferred (press knife), not stated. Vendor official site (micro-tec.co.jp) failed TLS; not read.
- Expander mechanism (ring/drum, frame clamp) is not shown in any source read; only the 160 % ratio [us8795454].
- Tape mounter / ring frame for green blocks: no source; general practice.
- Green-chip appearance/dimension inspection after cutting: no source found (only cut-position inspection [us6091598], search excerpt).
- KYOCERA application read via ipiq.io mirror, not Google Patents. A "chip sticking due to binder" remark seen only in a search snippet (snippet, unverified).
- Basler "MLCC cutting blade chipping inspection" page returned HTTP 406; not read.
- [us6892616] does not mention a heater or camera; its workpiece is "ceramic green sheet having an electrode circuit" (MLCC not named).
- [adt-mlcc-dicing-web] does not state whether the diced parts are green or fired.
