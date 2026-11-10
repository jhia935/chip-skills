# MLCC End-of-Line Test, Sort, Screening and Packaging
_Collected: 2026-11-10 · raw research notes (immutable source material)_

Evidence grade: **[R]** = page/PDF text actually read; **[S]** = only seen as a web-search result summary (page itself returned 403/timeout or was not fetched) — treat as unverified until re-read.

## Sources
| key | title | publisher/authors | year | tier | URL | grade |
|---|---|---|---|---|---|---|
| [esi-allegro-xp-2020] | Allegro XP — High-speed testing and sorting of MLCCs (datasheet) | ESI / MKS Instruments | 2020 | T1 (equipment) | https://api.p1.mks.com/medias/sys_master/resources/h37/h25/9954776023070/Allegro%20XP%20Data%20Sheet/Allegro-XP-Data-Sheet.pdf | R |
| [esi-allegro-web] | Allegro MLCC testing system product pages (and Allegro data sheet) | ESI / MKS | n.d. | T1 (equipment) | https://www.esi.com/f/allegro-mlcc-testing-system | S |
| [murata-meas-web] | Common technology: measurement / production process | Murata | n.d. | T1 | https://corporate.murata.com/technology/technology-platform/common-technology/measurement/production-process | R |
| [murata-guide-3] | Capacitor Guide, Basics of capacitors lesson 3 (process step 8) | Murata | n.d. | T1 | https://article.murata.com/article/basics-of-capacitors-3 | R |
| [murata-space-2019] | Introduction of Small Size MLCC to Aero-Space Application and its Technology | Y. Yamada, Fukui Murata Mfg. | n.d. | T1/T5 | https://escies.org/download/webDocumentFile?id=60963 | R (flow diagram only) |
| [nepp-crack-teverovsky] | Cracking Failures in MLCCs and Military Specifications | A. Teverovsky, NASA NEPP/GSFC | n.d. | T5 (NASA) | https://ntrs.nasa.gov/api/citations/20240003605/downloads/Teverovsky-20240003605.pdf | R |
| [nepp-guidelines-2012] | Screening Techniques for Ceramic Capacitors: Guidelines for Selection, Screening and Qualification of Low-Voltage COTS MLCCs | A. Teverovsky, NASA NEPP | 2012 | T5 (NASA) | https://escies.org/download/webDocumentFile?id=62187 | R |
| [nepp-etw-2022] | Burn-in / life testing / HALT presentation, NEPP ETW | A. Teverovsky, NASA NEPP | 2022 | T5 (NASA) | https://ntrs.nasa.gov/api/citations/20220007287/downloads/Teverovsky-2022-NEPP-ETW-Presentation.pdf | R (slides, partial) |
| [johanson-tape-reel] | Tape & Reel Packaging (tech note) | Johanson Technology | n.d. | T1 | https://www.johansontechnology.com/tech-notes/tape-reel-packaging/ | R |
| [digikey-mlcc-meas] | How to measure the capacitance of MLCC SMT capacitors (checklist) | DigiKey forum | n.d. | T6 | https://forum.digikey.com/t/how-to-measure-the-capacitance-of-mlcc-smt-capacitors/3224 | R |
| [tdk-faq-0008] | Capacitance measurement FAQ (EIA-198-1F / JIS C 5101 conditions, ALC) | TDK | n.d. | T1 | https://product.tdk.com/en/contact/faq/capacitors-0008.html | S (403) |
| [yageo-sad-grades] | Space, Avionics, Defense components comparison table | KEMET / YAGEO Group | n.d. | T1 | https://www.kemet.com/content/dam/kemet/lightning/documents/ec-content/Space-Avionics-Defense-Components-YAGEO-Group.pdf | S (redirect 404) |

## Process description
**Position in flow.** Test/sort sits after termination plating and before taping. Murata describes the final step as checking that finished chips have the prescribed electrical characteristics, then taping or other packing, then shipping [murata-guide-3]. A Murata aerospace flow chart shows: sheet casting, cutting, electrode printing, stacking and pressing, firing, termination, termination firing, termination plating, then SORTING and OUTGOING INSPECTION; the automotive-grade flow ends there [murata-space-2019]. Space grade adds hot solder dipping, C-SAM and burn-in, a second sorting, group A inspection and periodic QCI [murata-space-2019].

**100% electrical sort.** Murata states that full (100%) measurement of capacitance, impedance and ESR is done even in mass production, with automated handling exceeding 10,000 units/min, multi-channel scanning, millisecond-level electrode contact and compensation software for line noise [murata-meas-web]. Measurement data and defect modes go to a database; defect removal and trends in characteristic variation are fed back to upstream processes [murata-meas-web].

**ESI Allegro XP-style handler sequence** (rotary, pulse-actuated contacts): up to 25 test stations running C and DF at 120 Hz / 1 kHz / 1 MHz, IR pre-charge, IR pre-soak, then IR/current measurement; optional 100% data collection; sorts into up to 7 capacitance-tolerance bins, up to 7 reject bins and 1 retest bin [esi-allegro-xp-2020]. Flash and IR use source-measure units with 2–600 V standard (2–1000 V option) [esi-allegro-xp-2020].

**Measurement conditions.** Per a TDK note citing EIA-198-1F / JIS C 5101, Class II parts of 10 µF and below are measured at 1 kHz ± 10 % and 1.0 ± 0.2 Vrms; above 10 µF at 120 Hz ± 20 % and 0.5 ± 0.2 Vrms; frequency is chosen away from SRF [tdk-faq-0008] (S). The same note says meters with automatic level control (ALC) are needed because high-C parts load the source: an NIC example is quoted as 10.08 µF with ALC at 1.0 Vrms vs 7.24 µF with ALC off and level sagging to 0.2 Vrms [tdk-faq-0008/NIC via search summary] (S). Class I (1 MHz) conditions were NOT confirmed in any read source — see Open questions.

**De-aging before measurement (Class II).** The measurement checklist specifies heat treatment at 150 °C (+0/−10 °C) for 1 h, then 24 ± 2 h at ambient before measuring capacitance; Class I (C0G) is said not to need it [digikey-mlcc-meas]. Production sort handlers measure inline, so the reading is taken at some point on the aging curve; how factories correlate this to the spec's de-aged value was not found (Open questions).

**Screening beyond sort (high-rel).** Voltage conditioning / monitored burn-in at 2×VR and 125 °C: NEPP COTS guidelines tier it by level: 168 h (Level 1), 96 h (Level 2), 48 h (Level 3) per MIL-PRF-123 approach [nepp-guidelines-2012]. Currents are logged at 1 h and at end; end-of-BI leakage must stay below 10 nA or 150 % of the 1 h value, whichever is larger [nepp-guidelines-2012]. Military specs compared: M123 and M32535 use 168–264 h at 125 °C, 2×VR; M55681 uses 2×VR at Tmax for 100 h; M49470 uses 168–264 h (T) or 96 h (B) [nepp-crack-teverovsky]. KEMET COTS datasheets are reported to include voltage conditioning per MIL-PRF-55681 [yageo-sad-grades] (S).

**IR in screening.** NEPP recommends IR at VR after 2 min ± 0.1 min electrification; readings within seconds mostly reflect absorption, not defects; lot-to-lot leakage distributions are tight so a simple 3-sigma outlier criterion catches out-of-family parts [nepp-guidelines-2012]. Production handlers use a shorter charge+soak scheme (pre-charge, pre-soak, measure) [esi-allegro-xp-2020]; actual soak times were not published.

**Visual / optical.** Murata describes image-processing inspection with its own optics and transport handling to check dimensions and shape, detect colour unevenness, shape defects and sub-visible abnormalities, down to 0.4 × 0.2 mm parts [murata-meas-web]. NEPP military spec comparison lists visual exam per MIL-PRF-123 in the screening table [nepp-guidelines-2012].

**Packaging.** Chip capacitors ship on 8 mm paper or embossed tape per EIA-481; paper for thin chips (EIA 0603 and smaller), embossed plastic for thicker/larger; reels 5", 7", 13" [johanson-tape-reel].

## Parameter ranges
| parameter | typical range | source key | notes |
|---|---|---|---|
| Handler throughput, large chips (0603–1210) | up to 16,666 parts/min (1.0 M/h) | [esi-allegro-xp-2020] | vendor-rated max |
| Handler throughput, small chips (to 0201) | up to 20,000 parts/min (1.2 M/h) | [esi-allegro-web] (S) | Allegro; vendor marketing |
| Murata in-house automated measurement | >10,000 units/min, 100 % sort | [murata-meas-web] | |
| Meter accuracy (Murata R&D claim) | 0.1 % or better (pF-level) | [murata-meas-web] | generic components page, not MLCC-specific |
| Test stations per handler | up to 25 | [esi-allegro-xp-2020] | |
| Sort bins | 9 total: ≤7 tolerance, ≤7 reject, 1 retest | [esi-allegro-xp-2020] | older Allegro listing: 5 tol + 3 reject + 1 retest [esi-allegro-web] (S) |
| C/DF test frequencies available | 120 Hz, 1 kHz, 1 MHz | [esi-allegro-xp-2020] | |
| Flash / IR source voltage | 2–600 V std; to 1000 V opt. | [esi-allegro-xp-2020] | |
| Charge current | 2–250 mA std | [esi-allegro-xp-2020] | |
| Measured current range | 1 pA – 2 mA | [esi-allegro-xp-2020] | |
| C measurement, Class II ≤10 µF | 1 kHz ±10 %, 1.0 ±0.2 Vrms | [tdk-faq-0008] (S) | EIA-198-1F / JIS C 5101 |
| C measurement, Class II >10 µF | 120 Hz ±20 %, 0.5 ±0.2 Vrms | [tdk-faq-0008] (S) | |
| De-aging bake | 150 °C (+0/−10), 1 h; rest 24 ±2 h | [digikey-mlcc-meas] | Class II only |
| Voltage conditioning (NEPP) | 2×VR, 125 °C; 168/96/48 h by level | [nepp-guidelines-2012] | |
| BI per MIL specs | 2×VR, 125 °C, 100–264 h | [nepp-crack-teverovsky] | spec-dependent |
| BI end-point current | <10 nA or <150 % of 1 h value | [nepp-guidelines-2012] | |
| Allowable percent defective in BI/screen (PDA) | 10 % / 15 % / 20 % (Level 1/2/3) | [nepp-guidelines-2012] | |
| IR electrification time (screen) | 2 min ±0.1 min at VR | [nepp-guidelines-2012] | |
| DWV level | 2.5×VR | [nepp-crack-teverovsky], [nepp-guidelines-2012] | |
| Low-V MLCC breakdown voltage vs VR | 10–100× VR | [nepp-guidelines-2012] | explains weak DWV |
| Suggested VBR critical value | VBRcr = 0.5 × (VBRavg − 2σ) | [nepp-crack-teverovsky] | NEPP proposal, not production practice |
| Equivalence of 96 h @125 °C/2VR | >1000 years at 50 °C/0.5VR (BME model, n=4–9, Ea 1–1.8 eV) | [nepp-guidelines-2012] | model-based |
| Paper tape pocket pitch | 2 mm (0201–0402 class) / 4 mm (0603) | [johanson-tape-reel] pitch not labelled; (S) in earlier search summary | reel codes only confirm sizes, not pitch |
| Qty/reel 0201 | 15,000 (and 500 min.) | [johanson-tape-reel] | 7" reel assumed |
| Qty/reel 0402 | 10,000 (and 500) | [johanson-tape-reel] | |
| Qty/reel 0603 | 4,000 or 10,000 (and 500) | [johanson-tape-reel] | thickness/reel-size dependent |
| Qty/reel 01005 | 20,000 / 30,000 | [johanson-tape-reel] | |
| Qty/reel 0805 | 500 / 4,000 / 10,000 | [johanson-tape-reel] | |
| Qty/reel 1111 | 500 / 2,000 / 10,000 | [johanson-tape-reel] | |
| Qty/reel 2525, 3838 | 250 / 1,000 | [johanson-tape-reel] | |
| Bulk case (01005) | 500,000 per case vs 20,000 per reel | Murata news Apr 2026 (search summary, S) | no read source |

## Equipment
- **Rotary-turret MLCC test handlers** (ESI Allegro / Allegro XP): vacuum-driven rotary handling, roller upper contacts with programmable constant force, BeCu / silver / tungsten lower contacts, pulse-actuated contacts aimed at minimal termination marking; Agilent 4981 capacitance meters (2 per C/DF station); ESI 620/720 source-measure units for flash and IR; touch-screen UI, optional printer/network; facility needs include 16 mm hose, vacuum 55 kPa, compressed air 340 LPM, <10 ppm water [esi-allegro-xp-2020].
- **In-house Murata systems**: multi-channel scanning measurement with noise compensation; optical inspection with dedicated lighting, transport stabilization and algorithms; also cryogenic (< −50 °C) and humidity measurement environments for characterization [murata-meas-web].
- **Ultrasonic / C-SAM** is used at pre-termination or in-process for MIL-PRF-123 (100 %) and as a screen for MIL-PRF-32535 (T-case, ≥0805) [nepp-crack-teverovsky]; Murata space flow includes C-SAM and burn-in [murata-space-2019].
- Burn-in ovens / monitored BI racks: no equipment vendor data found.
- Tape-and-reel machines and AOI machine makers (Tokyo Weld, Humo etc.): not found/read.

## Defect / escape modes (what slips through screening)
- **Cracks**: capacitance is the least sensitive parameter to cracks; cracking gives only a ~15 % DF increase; IR measurement efficiency for cracks is low, and raising temperature or voltage does not help [nepp-crack-teverovsky]. Longer electrification (leakage at ≥1000 s) and current monitoring during BI are far better detectors [nepp-crack-teverovsky].
- **DWV weakness**: only ~20 % of gross-defect parts failed DWV; 19 of 30 lots (63 %) of parts mechanically damaged by cross-section and thermal shock had <1 % DWV failure probability [nepp-crack-teverovsky]. Cause: breakdown is 10–100× VR so 2.5×VR does not stress defects [nepp-guidelines-2012].
- **Cracked parts that survive BI**: capacitors with cracks might not fail short during BI; failures show only in post-test measurements unless currents are monitored [nepp-crack-teverovsky].
- **Delamination / cracks** in PME MLCCs can be found by ultrasonic exam but ultrasonic is not required for CDR capacitors; several system-level failures traced to PME parts built to M55681-type specs [nepp-crack-teverovsky].
- **Margins**: EIA-469 permits margins as small as 25 µm and delamination up to 20 % of interface area [nepp-crack-teverovsky].
- **BI itself**: efficiency rises at higher stress voltage but high-voltage BI carries risk (infant-mortality failures increase with V/VR in HALT); a Weibull grading test works poorly for new-technology COTS; 3 of 8 COTS+ lots had BI failures [nepp-etw-2022].
- **COTS lots without VC heritage**: NEPP reports voltage conditioning not found useful as a reliability indicator for them [search summary of NEPP HALT work] (S).
- **Handling damage**: contact marking and chip damage in handlers is a stated design concern (low-impact handling) [esi-allegro-xp-2020].
- **Post-soldering cracking** is now the majority failure source, which factory screens do not address [nepp-crack-teverovsky].

## Gating effects
- Throughput of ~1 M parts/h is limited by the slowest test; IR pre-charge/soak time per part vs. charge-current limits (2–250 mA) is the gating step for large-C parts (inferred; vendor does not state soak time).
- Large-C chips load the meter source: ALC needed to hold 1.0 Vrms, otherwise C reads low [tdk-faq-0008] (S).
- Class II aging means sort reading depends on time since last >Tc excursion (firing/solder dip/plating bake) — handler measurement vs. spec de-aged value is a bias source (inference; not found in sources).
- Tape carrier choice (paper vs embossed) is gated by chip thickness and size [johanson-tape-reel].
- Allowed percent defective (PDA 10–20 %) can reject a whole lot after BI [nepp-guidelines-2012].
- Higher test voltage (to 1 kV) requires HV-protect charge current limit of 2–90 mA [esi-allegro-xp-2020].

## Open questions / conflicts
1. **Bin count conflict**: Allegro web page (search summary) says 5 cap bins + 3 reject + 1 retest; Allegro XP datasheet (read) says up to 7 + 7 + 1 = 9 bins. Likely different models; the "9 bins" in the old data sheet per search summary needs confirmation.
2. **BI duration conflict**: NEPP Level 1/2/3 = 168/96/48 h; MIL spec table gives 100 h (M55681), 168–264 h (M123, M32535), 96 h (B) vs 168–264 h (T) (M49470) [nepp-guidelines-2012] vs [nepp-crack-teverovsky]. Not a true conflict (different specs) but no single "production" value.
3. Class I measurement conditions (1 MHz, 1 Vrms) and the IR/DWV production test voltage/time (often listed as VR or 2.5×VR for 5–60 s on datasheets) were NOT confirmed in a read source. NIC/Farnell/AEC datasheets blocked or timed out.
4. Production IR soak/charge times and DWV (flash) dwell time per part: unknown.
5. How factories de-age or correct Class II readings at inline sort: unknown.
6. AOI machine specs, defect classes and escape rates; reeling machine throughput; moisture-barrier requirements for MLCCs (generally not MSL-rated): not found.
7. PAT (statistical screens) and AEC-Q200 production screening details: only NEPP 3-sigma IR outlier suggestion found; no automotive-vendor PAT source read.
8. Pitch values: Johanson page did not label pitch; the 2 mm/4 mm statement came from search-result summaries (S) of other vendors — verify against EIA-481 text.
9. Dates for [murata-meas-web], [nepp-crack-teverovsky] not shown in fetched text; years left n.d.
10. Allegro (to 0201, 20,000 ppm) from search summary only (S).
