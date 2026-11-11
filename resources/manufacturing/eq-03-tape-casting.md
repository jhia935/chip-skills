# MLCC Tape Casting Line — Equipment Structure and Step Sequence
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: how a green-sheet casting (coating) line is built and sequenced, station by station. Complements
`20-tape-casting.md` (materials, carrier film, thickness ranges), whose keys stay valid. Sources are Google
Patents full text read via WebFetch (some truncated at ~100k chars) plus equipment-maker pages. Patent
examples are inventor embodiments, not production data. Several patents cover non-MLCC sheets (SOFC,
ceramic substrates, 150 um sheets); that is flagged per row.

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| [us6096370] | Method and apparatus for producing a green sheet with an even thickness | Murata (Mori, Iseki, Muranaka) | 2000 (priority JP 1997-09-09) | T4 | https://patents.google.com/patent/US6096370A/en |
| [us6869482] | Apparatus for manufacturing a dry sheet from a slurry | Murata | priority 2002-07-10 | T4 | https://patents.google.com/patent/US6869482B2/en |
| [us6605241] | Method and apparatus for producing ceramic green sheet (carrier-film cleaning on a support roll) | Murata (Asakawa, Iseki) | 2003 (priority JP 2000-03-03) | T4 | https://patents.google.com/patent/US6605241B2/en |
| [cn1201869c] | Casting-type (die) coating device for ceramic green sheets | Murata (Wada) | 2005 (priority 2001-07-16) | T4 | https://patents.google.com/patent/CN1201869C/en |
| [us5316602] | Method for manufacturing ceramic green sheet laminate for an electronic component | Murata | priority JP 1990-04-19 | T4 | https://patents.google.com/patent/US5316602A/en |
| [jp2005271366a] | Method and apparatus for drying ceramic green sheet | NGK Insulators | 2005 (priority 2004-03-24; refused 2010) | T4 (application) | https://patents.google.com/patent/JP2005271366A/en |
| [us8894920] | Methods and apparatus for casting ceramic sheets | Corning | priority 2008-10-31 | T4 | https://patents.google.com/patent/US8894920B2/en |
| [us5533889] | Apparatus for in-situ green sheet slitting | IBM | 1996 (priority 1994-08-29) | T4 | https://patents.google.com/patent/US5533889A/en |
| [yasui-mlcc-web] | Precision Slot Die for MLCC Manufacturing | Yasui Seiki (maker page) | n.d. (accessed 2026-11-11) | T6 | https://www.yasuiseiki.com/applications/electronic/multilayer-ceramic-capacitors/ |
| [yasui-tc2-ipros] | TC-2 demonstration coater (MLCC / functional film) | Yasui Seiki via IPROS | n.d. | T6 | https://pr.mono.ipros.com/en/yasuiseiki/product/detail/2000908679 (404 on fetch; search snippet only) |
| [ipros-gsm] | Green sheet molding machine (category listing, Creative Coatings product) | IPROS | n.d. (accessed 2026-11-11) | T6 | https://mono.ipros.com/en/cg3/Green%20sheet%20molding%20machine |
| [pnt-linkonbiz] | PNT MLCC coating machine | PNT via linkonbiz | n.d. | T6 | https://linkonbiz.com/en/product/iframe-detail/6056 |
| [yokogawa-gauge-web] | Film/sheet thickness gauge | Yokogawa | n.d. (accessed 2026-11-11) | T6 | https://www.yokogawa.com/mea/solutions/products-and-services/control/quality-control-system/filmsheet-thickness-gauge/ |
| [mhi-sr-web] | Organic solvent exhaust gas treatment system — overview and features | Mitsubishi Heavy Industries | n.d. (accessed 2026-11-11) | T5 | https://power.mhi.com/group/es/products/organic/features |

Fetched but not used as data: US7108827 (Nippon Shokubai; fired zirconia sheet inspection, not MLCC green
sheet), US9409198 (Nitto Denko; adhesive coating, not ceramic), a KEYENCE static case-study page (content did
not cover green sheets). Search results also contained one embedded instruction unrelated to the topic; ignored.

## Equipment structure
- Line order in a Murata green-sheet apparatus: supply reel 15 -> guide roll 13 -> backing roll 6 (holds the
  carrier against the coater opening) -> slurry coater 5 (first slurry room 8, narrow channel 9, second slurry
  room 11 with opening 10 and doctor edge 12) -> drying while conveyed -> film thickness meter 22 -> winding
  reel 18 [us6096370].
- Slurry supply path: slurry tank 19 -> pump 20 -> flow-rate controlling means 27 (e.g. valve; alternatives:
  tank back-pressure, gear-pump speed) -> flow meter 21 (electromagnetic, Coriolis mass, ultrasonic or
  differential; mass flow meter preferred in claims) -> first slurry room; optional absolute filter removes
  aggregates >= 10x the mean powder particle size [us6096370].
- Feedback: a flow-rate calculating means 26 (e.g. a PC) takes actual flow (from 21) and actual thickness
  (from 22) and outputs a corrected flow setpoint to 27. The actuator is the supply flow, not the roll or
  coater [us6096370].
- Second Murata line: slurry tank 2 -> feed channel 8 with density meter 10 -> slurry pump 9 (discharge set by
  control signal) -> coating section 4 (coater 4a facing backing roll 4b across a gap set by actuator 4c;
  film from feeding roll 11) -> area-weight measuring section 5 (non-contact radiation gauge on the WET coat)
  -> drying oven 6 -> reeling roll 12; control section 7 (microcomputer + memory 13) computes the expected
  dry thickness and sends adjustments [us6869482]. Gauge named: Yokogawa WG21 "WEBFREX" [us6869482].
- Die (casting) head: two plates form the flow path, a liquid reservoir (manifold) and a slit discharge port;
  upstream and downstream lips project from the body; a barrel-shaped backup roll supports the web; the line
  has an unwind reel, tension pulleys, coating station, drying device, take-up reel [cn1201869c].
- Carrier-film cleaning before coating: delivery roll + take-up roll + rotational drive keep film tension
  constant; film wraps a support roll that turns it about 90 deg; a foreign-substance remover sits at the
  middle of the wrap arc: contact type = adhesive roll (or cloth/paper pad, wiping blade), non-contact type =
  suction nozzle or compressed-gas blower; then slurry applying device (doctor blade preferred; roll or die
  possible); in a second embodiment the film is reversed so the cleaned face meets the backing roll and the
  slurry goes on the other face [us6605241]. Ionizers not described there.
- Carrier film recommended: low-elongation resin film such as PET [us6605241].
- Drying (Murata, after electrode printing on cast composite): hot-air nozzle on the upper surface plus a
  heating panel heating the lower surface by conduction; infrared may be used instead [us5316602].
- Drying (NGK): box dryer with 3 zones (initial/middle/late); resin mesh belt over rollers carries carrier +
  cast slurry; below the belt a heating chamber with 10 nozzle outlets across the width, each with a damper,
  partition plates and exhaust duct; airflow highest at width centre; top-side air kept minimal in initial and
  middle zones (only to carry away solvent vapour); late zone blows top air counter-flow (downstream ->
  upstream) [jp2005271366a].
- Static control and cleanliness (Corning, SOFC electrolyte sheets, not MLCC): anti-static (ionized-air)
  blower near the delivery and/or take-up roll; ion discharge bars in the drying chamber; grounding brush on
  the film underside; caster in a class 10,000, preferably class 1,000 filtered-air environment; heaters
  beneath the casting bed; take-up motor sets draw rate and, with support bars, tension [us8894920].
- Commercial MLCC green-sheet coaters: web-tensioned die coating; film unwinding and coating sections kept in
  a clean environment; in-line film-thickness measurement and defect inspection can be built in [ipros-gsm].
  Unwinder-to-rewinder automatic line that does not stop for roll changes [pnt-linkonbiz]. Slot die chosen by
  a large MLCC maker [yasui-mlcc-web].
- (snippet, unverified) Yasui TC-2: slot die on-roll/off-roll; after coating, the section before the oven is a
  suction roll so coating-section and oven tension are separated; oven uses roll support for low-tension
  transport; horizontal oven [yasui-tc2-ipros].
- Edge slitting inside the oven (IBM, MLC substrate sheets, doctor-blade caster with 5 heating zones):
  indenting wheels score the partly dried sheet on the carrier, back-up rollers support; stripping bar
  separates carrier before take-up [us5533889]. No MLCC source found for edge slitting.
- Composite (cast sheet on carrier) feeding the printing line: supply reel with tension and cross-direction
  position control -> defect detecting station (optical detector, reports to controller) -> printing (no
  electrode printed on defective portions) -> print inspection -> drying -> dancer roller -> punching/stacking
  [us5316602]. This is the downstream hand-off, i.e. the cast roll is printed roll-fed in this patent.
- Thickness gauges: Yokogawa film/sheet gauges list MLCC among applications [yokogawa-gauge-web].
- Solvent exhaust treatment (generic, not MLCC-specific): granular activated carbon adsorption, steam
  desorption, recovered solvent reused; mixtures separated/purified by distillation, dehydration tower for
  water-azeotropic solvents [mhi-sr-web].

## Step sequence (synthesised from the rows above)
1. Unwind release-coated PET with constant tension [us6605241]; tension + cross-direction position control
   at the supply reel [us5316602] (printing-line example); anti-static blower near the delivery roll
   [us8894920] (SOFC).
2. Clean the carrier on a support roll (adhesive roll or suction nozzle) [us6605241]; clean environment
   around unwinding/coating [ipros-gsm].
3. Slurry supply: tank -> (filter) -> pump -> flow control -> flow meter -> coater [us6096370]; density
   meter on the feed [us6869482].
4. Coat on the backup roll: die head [cn1201869c] or slurry room + doctor edge [us6096370]; doctor blade also
   named [us6605241].
5. Measure wet area weight (X-ray / beta) before the oven [us6869482].
6. Dry in zoned oven: top hot air + bottom heating [us5316602][jp2005271366a]; ~80-90 % solvent out in zone 1
   [steinmueller-us6682598].
7. Exhaust from the oven to solvent treatment [mhi-sr-web] (generic).
8. Measure dry thickness (laser / X-ray / beta / capacitance) and feed back to flow [us6096370].
9. In-line defect inspection [ipros-gsm]; or at the printing-line entry [us5316602].
10. Wind the green sheet with its carrier [us6096370][cn1201869c]; anti-static near the take-up roll
    [us8894920] (SOFC).
11. Offline tests on samples: roughness, pinholes, tensile, peel (see 20-tape-casting.md keys).

## Parameter ranges
| parameter | value | source key | notes |
|---|---|---|---|
| Aggregate filter cut | >= 10x mean ceramic particle size | [us6096370] | optional absolute filter |
| Die lip-to-web gap h | < 100 um; 10-50 um preferred; example 20 um | [cn1201869c] | |
| Downstream lip thickness L | < 5 mm in examples; example 2.8 mm | [cn1201869c] | |
| Lip protrusion ratio X/L | 0.25-0.5 | [cn1201869c] | <= 0.25 -> width-direction thickness variation |
| Width-direction thickness difference | ~0.3 um at X/L ~0.25; < 0.2 um above ~0.3 | [cn1201869c] | |
| Backup roll radius | example 50 mm; L/R 0-0.1; h/L 0-0.02 | [cn1201869c] | |
| Coating speed (die) | ~0.2 m/s preferred; up to ~1 m/s | [cn1201869c] | wire bar 50 m/min [tdk-us7632369] |
| Slurry viscosity at die | ~0.05 Pa.s or more, up to ~1 Pa.s | [cn1201869c] | covers 180 mPa.s [tdk-us7632369] and 400-700 cP [yang-2026-pvb] |
| Radiation gauge choice | X-ray <= 500 g/m2; beta > 500-2000 g/m2 | [us6869482] | wet area weight |
| Example wet area weights | 758-808 g/m2 (100 um set); 1326-1378 g/m2 (200 um set); carrier 50.0 g/m2 | [us6869482] | thick-sheet examples, not thin MLCC |
| Slurry density used in conversion | 3.00-3.18 | [us6869482] | |
| Support-roll wrap angle | ~90 deg or more; remover at middle of wrap | [us6605241] | |
| Bottom nozzle divisions across width | 10, each with damper | [jp2005271366a] | 150 um sheet, 1 m wide |
| Width temperature difference (bottom) | 1-3 deg C across test conditions | [jp2005271366a] | |
| Top-side air speed | ~0.2 m/s (above/below in test conditions) | [jp2005271366a] | |
| Required thickness accuracy | 2 % or less | [jp2005271366a] | 150 um sheet, not MLCC |
| Coating uniformity (vendor claim) | 1-2 % tolerance | [yasui-mlcc-web] | maker marketing |
| Drying zones (examples) | 3 [jp2005271366a]; 5 heating zones [us5533889]; 2 chambers [steinmueller-us6682598] | | different products |
| Clean room | class 10,000; preferably 1,000 | [us8894920] | SOFC casting |
| SOFC caster slot gap / die-film distance | 25-250 um / 25-300 um | [us8894920] | not MLCC |
| SOFC caster film speed | ~2-500 cm/min; example 45 cm/min | [us8894920] | not MLCC |
| SOFC drying | 0-150 C (pref. ~100 C, most pref. < 60 C); air 40-3000 ft/min; 1-15 min | [us8894920] | not MLCC |
| Solvent capture (generic VOC plant) | >= 99 % | [mhi-sr-web] | not MLCC-specific |
| Murata transfer pressure (punch/stack line) | ~20 kg/cm2 at ~90 C belt | [us5316602] | downstream, not casting |

## Gaps / unverified
- No source gives MLCC casting-line tension values, edge-guide (EPC) sensor type or tolerance, or a splice
  method. Side-shift EPC, dancer and load-cell rolls in the model are general practice (g).
- Ionizer placement for MLCC lines specifically: only SOFC (Corning) and release-film patents; MLCC casting
  ionizer specs not found.
- Suction-roll tension separation and roll-supported low-tension oven are from a search snippet only
  [yasui-tc2-ipros] (page 404).
- Dryer temperature profile per zone for sub-um MLCC sheets: not found. NGK dryer is for 150 um sheets; Murata
  top-nozzle/bottom-panel dryer is the post-printing dryer.
- Solvent recovery: only a generic VOC plant page; alternating two-tower adsorption seen only in a search
  snippet of a generic adsorber patent (US5110328, not fetched). No MLCC exhaust flow/concentration data.
- In-line defect camera type, lighting and resolution for MLCC green sheets: not found (vendor listings only
  say it "can be built in").
- Thickness measurement precision for 0.5-2 um sheets: not found; the 1-2 % and 2 % figures are a maker claim
  and a non-MLCC patent.
- Edge slitting/trim of the cast sheet: only IBM substrate patent [us5533889].
- Hypothesis "casting -> cutting into sheets -> printing" (sheet-fed printing) not confirmed; the only
  hand-off found is roll-fed printing of the cast composite [us5316602].
- Murata process video (video.murata.com, "Manufacturing Process Image of MLCC") not transcribed.
- "Top surface dries too fast -> skin -> cracks/wrinkles" and "air flow normally enters at the dryer exit,
  counter to the tape" for [steinmueller-us6682598] were seen only in a search snippet in this session
  (snippet, unverified); the existing 20-tape-casting.md notes on that patent do not contain them.
