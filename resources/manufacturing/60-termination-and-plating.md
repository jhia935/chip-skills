# MLCC Post-Firing Processing: Chamfering, External Termination, Plating
_Collected: 2026-11-10 · raw research notes (immutable source material)_

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| [us4517155] | Copper base metal termination for multilayer ceramic capacitors (US 4,517,155) | Prakash & Snyder; Union Carbide, now KEMET | 1985 | T4 | https://patents.google.com/patent/US4517155 |
| [us7083744] | Terminal electrode compositions for multilayer ceramic capacitors (US 7,083,744 B2) | Cu paste patent (assignee not captured in fetched text) | n/a (not captured) | T4 | https://patents.google.com/patent/US7083744B2/en |
| [us5712758] | Multilayer ceramic chip capacitor and a process for its manufacture (US 5,712,758) | Rohm (Amano, Ogura) | 1998 | T4 | https://patents.google.com/patent/US5712758 |
| [us8941971] | Multilayer ceramic electronic component and fabrication method (US 8,941,971 B2) | Samsung Electro-Mechanics | 2015 | T4 | https://patents.google.com/patent/US8941971B2/en |
| [us8953300] | Multilayer ceramic capacitor and method of manufacturing the same (US 8,953,300; embedded thin MLCC, dip limits) | Samsung Electro-Mechanics | 2015 | T4 | https://patents.google.com/patent/US8953300B2/en |
| [us9336952] | Multilayer ceramic electronic part and method of manufacturing the same (US 9,336,952; band-width control, conductive resin) | Samsung Electro-Mechanics | 2016 | T4 | https://patents.google.com/patent/US9336952B2/en |
| [us10020117] | Multi-layer ceramic capacitor and method of producing the same (US 10,020,117 B2) | Taiyo Yuden | 2018 | T4 | https://patents.google.com/patent/US10020117B2/en |
| [teverovsky-cdr35-2017] | Susceptibility to Cracking of Different Lots of CDR35 Capacitors (NEPP) | A. Teverovsky, NASA GSFC | 2017 | T3/T5 | https://ntrs.nasa.gov/api/citations/20180001976/downloads/20180001976.pdf |
| [brusse-whisker-2002] | Tin Whisker Observations on Pure Tin-Plated Ceramic Chip Capacitors (AESF SUR/FIN) | J. Brusse, NASA GSFC | 2002 | T5 | https://nepp.nasa.gov/Whisker/reference/tech_papers/brusse2002-slides-tin-whiskers-observed-on-ceramic-capacitor.pdf |
| [murata-guide] | Capacitor Guide (basics of capacitors 3) | Murata | n/a | T1 | https://article.murata.com/article/basics-of-capacitors-3 |

Search-snippet-only leads, NOT fetched/verified (do not cite numerically): KEMET FLEX/FT-CAP technical overview (Mouser PDF; both fetch attempts timed out); Murata/other patents giving Ni 0.5-7 um and Sn 0.5-12 um (patent number not captured); a patent with ridge radius ~30-70 um after barrel polishing (number not captured).

## Process description

### 1. Chamfering / barrel polishing
- Purpose (as stated in patents): corners and ridges that stay sharp chip or crack when bodies collide during handling, so ridges are rounded [us10020117]. Rounding is also the step that exposes internal-electrode ends at the end faces (stated generally; see Open questions).
- Method: bodies, polishing medium and liquid are loaded into a barrel container that is rotated or vibrated; can be done on unsintered (green) or sintered bodies [us10020117].
- Rohm example on fired chips: 50/50 electrofused alumina + tungsten carbide, 40 mesh abrasive; 12 h at 78 rpm gave R = 0.13 mm; a 6 h run gave R = 0.08 mm [us5712758].
- Green-chip polishing risks cracking/peel-off between the chip and side margins, because side margins are lower density before sintering [us10020117].

### 2. External termination (paste, dip, fire)
- Paste is applied to both end faces of the chip. Copper is used with Ni internal electrodes [murata-guide]; Ag, Pd, Pt, Cu are listed as possible metals in older art, with Ag used in the Rohm examples [us5712758].
- Dip behaviour: paste is thinnest at corners and thicker elsewhere; lowering viscosity to thin the film worsens corner coverage, and firing shrinkage can leave corners exposed, allowing moisture ingress [us8953300]. Dipping makes bands below ~12 um difficult [us8953300].
- Paste flows from the dip centre toward the chip body in a half-moon shape, giving non-uniform band widths; oversized bands cause appearance, pick-up and tombstone defects, undersized bands cause adhesion shortfalls [us9336952]. A Si/F-containing coating on the chip surface controlled paste flow; band-width ratio a/a' of ~1.0-1.12 on 1608, 100 nF parts [us9336952].
- Firing: Cu paste is fired in N2 with ppm-level O2 control. Stages: dry ~85 C/30 min then ~120 C/10 min; binder burnout 300-500 C in >20 ppm O2 (preferably 50-150); sinter 600-900 C (pref. 650-750 C) for 15-70 min at 30-180 ppm O2 (pref. 40-80); cool in same atmosphere to <=~50 C [us4517155]. Newer Cu paste fired at 700-770 C in N2 [us7083744]; Samsung gives <=750 C to avoid connection defects with internal electrodes [us8941971]; Murata guide says ~800 C (atmosphere not stated) [murata-guide].
- Two-layer concept (Rohm, Ag-based): glass-rich undercoat blocking plating solution plus low-frit topcoat for plating adhesion, sintered 600 C/20 min [us5712758].
- Conductive-resin layer (if used): thermoset <300 C, typically 150-200 C, then Ni and Sn plated on the resin layer [us9336952].

### 3. Plating
- Electrolytic (barrel) Ni then Sn onto fired terminations; Ni for reliability (barrier), Sn for solderability [murata-guide]. Rohm bath conditions (Ni, neutral, 500 g/L, 0.03 A/dm2, 50 C, 2 h; Sn-Pb, 25 g/L, 0.02 A/dm2, 30 C, 2 h) [us5712758].
- Plating-defect screening by solder-pot immersion or XRF [us8941971].

## Parameter ranges
| parameter | typical range | source key | notes |
|---|---|---|---|
| Chamfer radius, fired chip, 2.0x1.25x0.6 mm | R >= 0.10 mm; preferred 0.13-0.15 mm | [us5712758] | R=0.08 mm worse in thermal cycling |
| Chamfer time (example) | 12 h at 78 rpm -> R 0.13 mm | [us5712758] | 40-mesh alumina/WC media |
| Cu paste: Cu content | 45-85 wt% of paste | [us7083744] | |
| Cu paste: glass frit | 5-15 wt% (pref 8-12) | [us7083744] | softening 500-650 C, Pb/Cd/Bi-free borosilicate |
| Cu paste (older): solids Cu/frit | 75-97 / 3-25 wt% (pref 91-94 / 6-9) | [us4517155] | Cu 1-10 um; frit softening 425-550 C |
| Cu paste: metal oxide additive | 0.1-10 wt% (SnO2, V2O5, MoO3) | [us7083744] | suppresses glass rise at 775 C; 11.4% SnO2 raised resistivity |
| Cu paste: Cu powder size | 0.3-30 um (example 3 um) | [us7083744] | |
| Glass/Cu ratio (fired electrode) | 0.4-2.0 | [us8941971] | 0.3: IR failures 2/10,000; 2.1: IR failures 726/10,000 |
| Glass area, mid-thickness of electrode | 35-80 % | [us8941971] | 85%: 8/2000 plating defects; 90%: 184/2000 |
| Termination firing temp | 600-900 (pref 650-750) C; 700-770 C; <=750 C; ~800 C | [us4517155][us7083744][us8941971][murata-guide] | all N2 or unspecified |
| Termination firing O2 | 30-180 ppm in N2 (pref 40-80) | [us4517155] | |
| Termination firing time | 15-70 min | [us4517155] | |
| Fired Cu electrode thickness | 3-30 um (pref >=5) | [us8941971] | thin electrode admits plating solution at corners |
| Dip-formed minimum thickness | ~12 um practical floor | [us8953300] | |
| Ag undercoat/topcoat (Rohm) | 5-20 um / 20-100 um; frit 22-40 / 0-7 wt% | [us5712758] | <5 um undercoat: plating solution entry |
| Ni plating (Rohm example) | ~3 um (range 3-5 um) | [us5712758] | |
| Sn-Pb plating (Rohm example) | ~3 um (range 3-5 um) | [us5712758] | |
| Ni plating, field-failed CDR35 lots | 6-10 um (Mfr A), 4-6 um (Mfr C) | [teverovsky-cdr35-2017] | thick Ni cited as delamination factor |
| Ni / Sn / Ag-frit stack on whiskered MLCCs | Ni 6.5 um, Sn 6.5 um, Ag frit 17 um; another Ni ~6, Sn ~10, Ag ~30 um | [brusse-whisker-2002] | |
| Ni underplate / matte Sn in manufacturer claims | Ni >2 um; Sn 5-10 um; Sn grain >5 um | [brusse-whisker-2002] | claims later contradicted by whisker findings |
| Conductive resin cure | <300 C, typ. 150-200 C | [us9336952] | |
| Bath: Ni / Sn-Pb | 50 C, 2 h / 30 C, 2 h | [us5712758] | |

## Equipment
- Barrel polisher (rotating or vibrating container, media + liquid) [us10020117]; bodies may be held in a holder during polishing (snippet only, unverified).
- Dip-coating apparatus with paste film plate; dryer (85-120 C) and belt/batch furnace with N2 + ppm O2 control [us4517155].
- Barrel electroplating line (Ni bath, Sn or Sn-Pb bath) [us5712758]; XRF / solder-pot test for plating defects [us8941971].
- Failure analysis: acoustic microscopy, cross-section, terminal solder dip test [teverovsky-cdr35-2017].

## Defect / yield modes
- Plating-solution ingress via porous or thin termination (esp. corners) -> IR degradation, loss of mechanical strength [us5712758][us8941971][us7083744].
- Too little glass: porous film, plating solution permeation, poor air-tightness/high-temp IR; too much glass: glass elution/rise to surface, plating defects, corner damage and poor contact [us8941971][us7083744].
- Corner thinning/uncovered corners from low-viscosity paste and firing shrinkage [us8953300].
- Band-width non-uniformity (half-moon flow) -> tombstoning, pick-up defects [us9336952].
- Hydrogen from Ni/Sn electroplating diffuses into the ceramic; greater flux at corners; in Ag/Pd (PME) parts it reduces PdO, causing delamination and promoting Ag migration; cracking from Ni plating said to occur more often in PME than BME [teverovsky-cdr35-2017]. Prior art noted Pd electrodes adsorbing hydrogen during plating and cracking [us5712758].
- Thick Ni (several um and above) increases cracking/delamination risk; Ni CTE 13.4 vs ceramic ~9.6 ppm/K [teverovsky-cdr35-2017]. In one CDR35 lot, up to ~50% of parts had termination-area delaminations/cracks [teverovsky-cdr35-2017].
- Thermal-shock cracking: unchamfered/low-R corners and single-layer glass terminations failed within several hundred cycles (-55/125 C); R=0.13 mm chamfer + dual-layer termination: 0 rejects after 1000 cycles [us5712758].
- Pure-Sn whiskers on MLCCs, up to 240 um with Ni barrier present [brusse-whisker-2002].
- Green-chip barrel polishing: crack/peel at chip-to-side-margin interface [us10020117].

## Gating effects
- Frit fraction trades plating blocking/density against plating adhesion and glass rise (windows above) [us7083744][us8941971].
- Undercoat thickness: <5 um fails plating-ingress/adhesion; >20 um loses capacitance [us5712758].
- Firing temperature >~750 C risks connection defects with internal electrodes [us8941971]; glass rise grows at 775 C without oxide additive [us7083744].
- Ni thickness vs delamination and moisture-sealing behavior [teverovsky-cdr35-2017].
- Chamfer R vs thermal-shock life [us5712758].
- Coating that governs paste flow sets band-width uniformity [us9336952].

## Open questions / conflicts
- Firing temperature: 600-900 C (broad) vs ~800 C (Murata) vs <=750 C (Samsung); claim 1 of [us4517155] says 300-800 C vs 600-900 C in its description. Different generations/chemistries; no vendor-confirmed production number.
- Ni thickness: Rohm example 3-5 um; field-failed CDR35 6-10 um; Brusse parts 6-6.5 um; manufacturers claimed >2 um as whisker barrier [brusse-whisker-2002]. No consensus optimum found.
- Whisker: manufacturer assertion that Ni underlayer + matte Sn prevents whiskers contradicted by observed whiskers [brusse-whisker-2002]; current practice unknown.
- Not found in fetched pages: termination atmosphere/dwell for current commercial parts, band width values (um), blotting step details, plating barrel parameters beyond Rohm, flexible-termination (resin) thickness and Ag-filler specifics (KEMET fetch failed), chamfer media/time for current production, industry R values at 0402 and below, tin-whisker data after 2004.
- Search-snippet-only (unverified): Ni 0.5-7 um / Sn 0.5-12 um range; ~70 um (30-70) ridge radius after polishing; side margin >=10 um after polishing; Samsung conductive-resin placement. Verify before use.
- [us7083744] assignee/date not captured in fetched text.
- Whether chamfering is what exposes internal electrodes (vs. dedicated grinding) is not stated explicitly in a fetched page.
