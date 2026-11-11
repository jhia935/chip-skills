# MLCC External Termination and Plating: Equipment Structure and Step Order
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Scope: equipment and step sequence for page 09 (termination dip, dry, termination firing, barrel plating, media separation, inspection). Complements `60-termination-and-plating.md` (process chemistry and parameter windows; its keys are reused here, not repeated). Patents were read on Google Patents via WebFetch (long pages truncated at ~100k characters); datasheets were read as PDF text. Patent examples are inventor embodiments, not production settings. Equipment-maker names appear only as citations.

## Sources
| key | title | publisher | year | tier | URL |
|---|---|---|---|---|---|
| [us4381321] | Method of processing miniature electronic components such as capacitors or resistors | Palomar Systems & Machines (later ESI); inventor D. Braden | 1983 | T4 | https://patents.google.com/patent/US4381321 |
| [us5226382] | Apparatus for automatically metalizing the terminal ends of monolithic capacitor chips | D. Braden (assignees Chip Star, ESI) | 1993 | T4 | https://patents.google.com/patent/US5226382 |
| [us5863331] | IPC (chip) termination machine | ESI; D. Braden, R. V. DeVera | 1999 | T4 | https://patents.google.com/patent/US5863331 |
| [us5551979] | Apparatus for applying termination paste to electronic components | ESI; E. D. Shealey | 1996 | T4 | https://patents.google.com/patent/US5551979 |
| [us5248340] | Dipping apparatus | Murata; T. Nakagawa, S. Tazuke | 1993 | T4 | https://patents.google.com/patent/US5248340 |
| [us5894033] | Method of profiling the termination paste for chip capacitor electrodes | ESI; D. J. Garcia | 1999 | T4 | https://patents.google.com/patent/US5894033 |
| [us7895969] | Method and apparatus for forming outer electrode of electronic component | Murata; K. Ogata, K. Aoki | 2011 | T4 | https://patents.google.com/patent/US7895969B2/en |
| [us11602766] | Electronic component manufacturing method and apparatus (pub. US20210308717A1) | Creative Coatings; E. Sato, H. Sakamoto | 2023 (prio. 2018) | T4 | https://patents.google.com/patent/US20210308717A1/en |
| [heraeus-et1826] | ET1826 End Termination (Ag/Pt) data sheet | Heraeus Electronics | version 2026-10-16 | T1 | https://pim.heraeus.com/datasheets/HET/TFM/ET1826.pdf |
| [us9799449] | Multilayered ceramic capacitor with improved lead frame attachment (Cu dip/fire example) | KEMET | 2017 | T4 | https://patents.google.com/patent/US9799449B2/en |
| [hengli-3dincites] | Thermal process and equipment for MLCC manufacturing, from binder burnout and co-firing to termination firing | 3D InCites (vendor article, Torrey Hills / XMZ for Hengli furnaces) | 2026-07-22 | T6 | https://www.3dincites.com/2026/07/thermal-process-and-equipment-for-mlcc-manufacturing-from-binder-burnout-and-co-firing-to-termination-firing/ |
| [shinko-meshbelt-web] | Continuous mesh-belt kiln product page (general purpose, not MLCC-specific) | Shinko Yogyo (ipros listing) | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/shinkoyogyo/product/detail/2000364622/ |
| [us6558524] | Barrel plating method and apparatus | Murata; Y. Sanada, K. Hayashi | 2003 | T4 | https://patents.google.com/patent/US6558524B2/en |
| [us8329005] | Barrel plating apparatus | Samsung Electro-Mechanics; J. C. Lee | 2012 | T4 | https://patents.google.com/patent/US8329005B2/en |
| [us7379288] | Monolithic ceramic electronic component and method for manufacturing the same (media pre-treatment, barrel Ni/Sn) | Murata | 2008 | T4 | https://patents.google.com/patent/US7379288B2/en |
| [us6358390] | Method for forming electrode (example 7: MLCC barrel Ni/Sn after alkaline clean) | Murata; Y. Yoshida, T. Kunishi | 2002 | T4 | https://patents.google.com/patent/US6358390B1/en |
| [jph02166300] | メッキ品の選別方法及び装置 (sorting plated chips from steel-ball dummies) | Renesas Semiconductor Mfg / Kansai NEC; M. Tazaki | 1990 | T4 | https://patents.google.com/patent/JPH02166300A/ja |
| [us5887728] | Separator and separation method (magnetic separation of plating media and chips) | Murata; Y. Muranaka, S. Yaichi | 1999 | T4 | https://patents.google.com/patent/US5887728A/en |
| [semco-cl31y226-spec] | Spec sheet CL31Y226MOK6PN (metal-epoxy termination, Ni/Sn, AEC-Q200) | Samsung Electro-Mechanics (via Digi-Key) | 2025-08-21 | T1 | https://mm.digikey.com/Volume0/opasdata/d220001/medias/docus/7179/SpecSheet_CL31Y226MOK6PN_20250821.pdf |

Reused from `60-termination-and-plating.md`: [us4517155], [us8953300], [us9336952], [us8941971], [us5712758], [us7083744], [murata-guide], [teverovsky-cdr35-2017], [brusse-whisker-2002].

## Equipment structure

### A. Carrier (holding) plate and insertion press
- Plate = metal plate with recesses and bores filled with pliable silicone rubber, leaving part-receiving passageways with resilient walls; passageway length >= 150 % of max part length; plate about 0.350 in thick; 2,135 or 4,233 holes per plate in the examples [us4381321].
- Variants: elastomeric sheet with slightly undersized perforations holding chips by friction, ends protruding a uniform distance [us5551979]; hard substrate with an embedded rubber-like member whose receiving holes are smaller than the substrate holes, with side grooves for chucking pawls [us5248340]; elastically deformable carrier such as adhesive tape [us11602766]; endless stainless tape (about 0.005 in x 2 in) with removable rubber masks [us5226382].
- Loading: parts poured into a hopper body; loading plate placed over it; vibration and vacuum fill the loading-plate holes (8-10 s, 100 % fill for the 2,135-hole plate); a press with a bank of pin pushers pushes parts from the loading plate into the carrier until the first ends stand proud [us4381321]. Wheel/groove feeders with transfer pins are the tape-machine alternative [us5226382][us5863331].
- The same pin-pusher press later pushes the parts through to expose the second end, and finally pushes them out into an unloading plate that is dumped [us4381321].

### B. Dip coater
- Dip head: carrier mounted on the underside of a dipping head, lowered by a ball screw driven by a servo or stepper, four guide bearings [us5551979]; chucking pawls grip the plate, two ball screws + two guide shafts, holder-to-vessel parallelism strictly adjusted, in/out conveyors with no vibration [us5248340]; X/Y/Z drives under a controller [us11602766].
- Paste film forming: reservoir with doctor blade, film thickness set by blade gap [us5551979]; levelling blade height set by bosses and fine-tuned by position-control motors, separate recovery blade collecting paste at one end [us5248340]; paste tank with squeegee blade over a flat board several holding-plates long, board indexed one plate per dip, collecting blade separate in one example [us7895969]; squeegee unit with blade forming a dip layer of height H, then scraping it off [us11602766].
- Paste handling: downstream scraper to V-trough, pneumatic piston pumps, filter screen catching chips/debris, return to reservoir; porous cleaning tape on the belt; laser height gauge on reservoir level with pinch-valve refill from a pressure/vacuum reservoir [us5551979]. Collected paste reused after solvent adjustment [us7895969].
- Blotting: coated ends touched to a surface plate from which the dip layer was scraped (conventional, JP-A-63-45813 as cited), or to a second plate, optionally pre-wetted with paste; the patent moves the parts on a circle/spiral while raising (thicker film) or lowering (thinner film) [us11602766]. Older tape machine: "dobber" roller flat spot touching the ends to pull off excess [us5226382]. A commercial paste is sold for "machine dip and blot or no blot" [heraeus-et1826].
- Corner profile: a profiling blade drawn through the paste layer before dipping to straighten the band edge [us5894033].

### C. Dryer
- Oven/heating section after each end [us4381321][us5226382][us5894033]. Conditions in Section "Parameter ranges".

### D. Termination firing furnace
- Belt-type termination furnace; may start with low-O2 debinding, then fire in N2 or wet N2; dedicated debinding muffle and atmosphere system (high flow, low O2), partially removable for binder cleaning; generic feature list (not termination-specific): N2/H2/humidified gas, automatic O2 and dew-point control, automatic pressure control, automatic belt tracking and tensioning [hengli-3dincites].
- Example mesh-belt kiln structure (general purpose, not MLCC-specific): SUS310S muffle, belt width 450 mm, length 7 m, max 900 C, air/N2/Ar flow, <= 1000 ppm O2 capable, water-jacket cooling section [shinko-meshbelt-web].

### E. Barrel plating line
- Barrel: approximately hexagonal column with a mesh-screen section, 8 L; cathode-lead connections pass through the end surfaces along the rotation axis (insulated, stationary), cathodes inside the barrel below the axis; cone attachments at the end faces stop chips piling at the ends [us6558524].
- Barrel: hollow bushing pivots, center bar along the axis with insulated copper pipe, cathode rods perpendicular to it with exposed "dangler" tips touching media/chips, ring Hall current sensors on each rod reporting to a control unit, motor gear drive, one rotation direction [us8329005].
- Hexagonal barrel with slits moved by a carrier (rotate, lift, traverse) between tank and loading position; cathode bar + anode plate [jph02166300].
- Conductive media: steel balls ("dummies") mixed with chips improve contact with the cathode [jph02166300]; steel balls 1.5 mm [us6558524]; steel / Sn-coated steel / Sn balls 1.6 mm [us7379288].
- Bath order: Ni (Watts) then neutral Sn [us6558524]; Ni then Sn generally [us8329005][murata-guide].
- Pre-treatment examples: chips + media rotated in water before plating, then mild electrolysis in the Ni bath [us7379288] (invention-specific); alkaline cleaner then water wash [us6358390] (example with additional resist/Pd steps specific to that invention).

### F. Media separation
- Magnetic: vibrating feed hopper -> belt conveyor (planar layer) -> magnetic drum + rubber belt + tension roller lifts steel media into a media box -> second drum lifts Ni-plated chips into a good-product box -> chips with insufficient plating fall off the belt end into a reject box; gap set with a dial gauge, electromagnet strength adjustable [us5887728].
- Mechanical: inclined trough with a high-friction rubber sheet and upward vibration; balls roll down, chips creep up [jph02166300].

### G. Inspection
- Plating defect screening by solder-pot immersion or XRF [us8941971] (from 60-notes).
- Customer-spec solderability: 95 % of terminations wetted evenly and continuously after (a) 155 C 4 h preheat or (b) 8 h steam aging, then 5 s in solder at 245 +-5 C; (c) 8 h steam aging then 120 s at 260 +-5 C [semco-cl31y226-spec].

## Step sequence (as supported)
1. Load carrier: hopper + loading plate (vibration + vacuum) -> press pushes chips into silicone-rubber passageways, first ends proud [us4381321].
2. Form paste film on platen with doctor/levelling blade [us5551979][us5248340][us7895969].
3. Dip first ends; optionally multiple films/dips [us7895969].
4. Blot on scraped or second plate [us11602766] (or dobber [us5226382]; paste spec "dip and blot or no blot" [heraeus-et1826]).
5. Dry first end [us4381321][us5894033][us7895969 background].
6. Invert plate, press pushes chips through to expose second ends [us4381321].
7. Film -> dip -> blot second ends (same machine) [us5894033][us4381321].
8. Dry second end [us4381321][us5894033].
9. Push chips out into unloading plate and dump [us4381321].
10. Termination firing in belt furnace, N2 / wet N2, low-O2 debinding first [hengli-3dincites][us4517155].
11. (Soft-termination route) conductive resin layer and cure, then plating [us9336952]; product example with "metal epoxy" termination under Ni/Sn [semco-cl31y226-spec].
12. Load barrel with chips + steel-ball media; pre-treatment [us6558524][us7379288][us6358390].
13. Ni barrel plating [us6558524][us8329005].
14. Rinse between baths: general practice, no source (g).
15. Sn barrel plating [us6558524].
16. Rinse and dry: no source (g).
17. Separate media from chips (magnetic or vibrating tray) [us5887728][jph02166300]. Position relative to rinse/dry not stated in either source.
18. Thickness (XRF) and solderability checks [us8941971][semco-cl31y226-spec].

## Parameter ranges
| parameter | value | key | notes |
|---|---|---|---|
| Paste layer on termination plate | usually 0.005 in (~127 um) | [us5894033] | scraped level layer |
| Dip (band) depth | 0.005 in | [us5894033] | 0.040 in chip example |
| Multi-dip | up to 3 films/dips per end; later film may be thicker | [us7895969] | no thickness numbers |
| Blot result | TOP film-thickness spread 7-8 um (conventional) -> ~2 um | [us11602766] | parts L <= 500 um |
| Part length spread on carrier | several tens of um | [us11602766] | why elastic carrier |
| Paste viscosity (Ag/Pt, dip & blot) | 25-35 kcps, Brookfield, 10 rpm, 25 C | [heraeus-et1826] | not a Cu BME paste |
| Firing (Ag/Pt paste) | 780-810 C peak, 5-6 min dwell | [heraeus-et1826] | air-fire metal system; not Cu |
| Dry (Cu, KEMET example) | 140 C, 20 min, air | [us9799449] | compare 85 C/30 min + 120 C/10 min [us4517155] |
| Fire (Cu, KEMET example) | 900 C, 10 min, inert | [us9799449] | above 600-900 (pref 650-750) [us4517155] and <=750 [us8941971] |
| Cure per end (silver compound) | about 2.5-5 min | [us4381321] | 1980s Ag process |
| Press cycle | about 10 s each: orient, coat each end, re-orient, unload | [us4381321] | |
| Holes per plate | 2,135 / 4,233 | [us4381321] | |
| Tape-machine throughput | 60,000-75,000 chips/h | [us5863331] | stripe machine |
| Barrel volume / load | 8 L barrel; 1.5 L steel balls (1.5 mm) + 0.5 L MLCC (2.0 x 1.25 mm) | [us6558524] | |
| Barrel load (count) | 50,000 chips + 200,000 balls (1.6 mm) | [us7379288] | |
| Ni plating | Watts bath, 0.2 A/dm2, 60 min | [us6558524] | vs 0.03 A/dm2, 50 C, 2 h [us5712758] |
| Sn plating | neutral Sn bath, 0.1 A/dm2, 60 min; Sn 2.37-2.56 um, CV 7.8-18.5 % | [us6558524] | |
| Ni / Sn plating (current) | 30 A x 60 min / 15 A x 60 min | [us7379288] | barrel at 10 rpm in pre-treatment |
| Pre-treatment rotation | 5-30 rpm, 10-30 min in water; rpm x min >= 150 | [us7379288] | invention-specific |
| Ni bath (citrate, pH 7.0) | 60 C, 0.5 -> 2.0 A/dm2 after 10 min, 1 h -> ~3 um | [us6358390] | |
| Sn bath (citrate) | 25 C, 0.25 A/dm2, ~1 h -> ~4 um | [us6358390] | |
| Solderability | 245 +-5 C, 5 s, >= 95 % coverage after 155 C 4 h or 8 h steam aging | [semco-cl31y226-spec] | 260 +-5 C 120 s variant |
| Mesh-belt kiln (generic) | 900 C max, 450 mm belt, 7 m, <= 1000 ppm O2 | [shinko-meshbelt-web] | not MLCC-specific |

## Gaps / unverified
- Search-snippet only (snippet, unverified): ESI silicone-rubber carrier plates "loaded by automatic or manual loading machines", uniform positioning -> bandwidth/registration (esi.com page rendered empty); Kumar 2002, Active and Passive Electronic Components 25(2) 169-179 abstract: Cu terminations fired in N2, acrylic binder, mooning/peaking defects tied to paste rheology, dipping and drying conditions, Cu termination processed at 800-825 C (full text not reached); Air Products passive-components page: Cu oxidation in N2 termination firing traced to O2 in supply, seal leaks or moisture, check O2 and dew point at supply and furnace inlet (403); Hitachi XRF technical report XRF128 (phi 0.3 mm collimator, 30 s, Ni/Sn on Cu alloy, connector) and title of XRF83 "Sn/Ni layer in ceramic chip component" (403).
- Not found: inter-bath rinse and final rinse/dry conditions for MLCC barrel lines; dryer type (IR vs hot air) and belt speed for termination drying; whether loose chips ride on setters/trays on the furnace belt; termination furnace zone count and lengths for current Cu BME lines; Ni bath type in current production (Watts vs sulfamate); where media separation sits relative to rinse/dry; XRF collimator/time for MLCC.
- Blotting is documented for the plate-dip machine family [us11602766][heraeus-et1826]; whether every production line blots is not stated.
- The dip-coater sources are a mix of 1980s-1990s US machines (ESI/Palomar) and later Japanese patents (Murata, Creative Coatings); current high-volume machine layouts are not public in what was read.
