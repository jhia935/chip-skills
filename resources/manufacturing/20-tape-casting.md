# MLCC Tape Casting (Green Sheet Formation)
_Collected: 2026-11-10 · raw research notes (immutable source material)_

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| tdk-us7632369 | Green sheet slurry, green sheet, production methods (US7632369B2) | TDK Corp | 2009 (priority 2003) | T4 | https://patents.google.com/patent/US7632369B2/en |
| lintec-us20150086749 | Release film for producing green sheet (US20150086749A1) | Lintec Corp (Fukaya, Ichikawa) | 2015 (priority 2012) | T4 | https://patents.google.com/patent/US20150086749A1/en |
| nanya-us9932452 | Release film and process for producing the same (US9932452B2) | Nan Ya Plastics (Liao et al.) | 2018 (priority 2015) | T4 | https://patents.google.com/patent/US9932452B2/en |
| murata-us5520994 | Laminated carrier film for use in ceramic green sheet (US5520994) | Murata Manufacturing (Kayama) | 1996 | T4 | https://patents.google.com/patent/US5520994 |
| steinmueller-us6682598 | Apparatus for casting and drying ceramic tape (US6682598B1) | Electronic Circuit Systems (Steinmueller, Joly) | 2004 (filed 2001) | T4 | https://patents.google.com/patent/US6682598B1/en |
| yang-2026-pvb | PVB molecular composition and ceramic slurry properties | Yang, Cheng, Zhao, Guo; J. Phys.: Conf. Ser. 3175, 012035 | 2026 | T3 | https://iopscience.iop.org/article/10.1088/1742-6596/3175/1/012035 |
| park-2023 | BaTiO3/polydopamine cover layer for MLCC | Park et al., Polymers 15(19):4014 | 2023 | T3 | https://pmc.ncbi.nlm.nih.gov/articles/PMC10575367 |
| wiki-tc | Tape casting (cites Mistler & Twiname, Tape Casting: Theory and Practice, Wiley 2000 = [mistler-2000]; Mitchell 2004; Jabbari 2016) | Wikipedia | n.d. | T6 | https://en.wikipedia.org/wiki/Tape_casting |
| ieee-technav | Tape casting overview | IEEE Technology Navigator | n.d. | T6 | https://technav.ieee.org/topic/tape-casting/ |
| ikts-tc | Tape casting and processing | Fraunhofer IKTS | n.d. | T5 | https://www.ikts.fraunhofer.de/en/departments/structural_ceramics/processes_and_components/shaping/tape_casting_processing.html |
| patsnap-2025 | Tape casting for ceramic capacitors achieving uniform dielectric layers | Patsnap Eureka explainer | n.d. | T6 | https://eureka.patsnap.com/article/tape-casting-for-ceramic-capacitors-achieving-uniform-dielectric-layers |

Not obtained: [mistler-2000] and Jabbari 2016 directly; Murata/TDK/Taiyo Yuden/SEMCO/KEMET web pages with casting data (none found); any slot-die-for-MLCC paper (none found).

## Process description
- Steps: slurry preparation, coat onto moving carrier, dry, peel/transfer to the next step (electrode printing, stacking) [yang-2026-pvb][ikts-tc].
- Carrier: PET film (doctor-blade casting onto PET) [ieee-technav][park-2023]. For thin MLCC sheets, PET is coated with a thin cured release layer: Lintec UV-cured acrylate/polyorganosiloxane layer 0.3-2 um [lintec-us20150086749]; Nan Ya silicone layer 0.04-0.8 um cured [nanya-us9932452]; Murata laminated film with silicone release layers 0.05-1.0 um on polyester/polyethylene/polyester core, whole film 25-150 um [murata-us5520994].
- Coating methods: doctor blade sets wet thickness by gap [ieee-technav]; slot-die offered as a high-volume alternative with tighter flow-rate control [ieee-technav]. Tapes thinner than 50 um are coated from the side (slot-die) or below (lip/microgravure) rather than from the top [wiki-tc]. Lintec's thin-sheet test used a die coater to a 1 um dry target, 250 mm wide x 10 m [lintec-us20150086749]. TDK's example used a wire bar coater at 50 m/min [tdk-us7632369].
- Drying: sheet dries from the exposed side only; solvent loss controlled to avoid cracking/curl [wiki-tc]. TDK: 60-70 C oven for 2 min (general 50-100 C, 1-20 min) [tdk-us7632369]. Murata example: 100 C for 4 min [murata-us5520994]. Counter-current/parallel zoned gas flow design: first chamber removes ~80-90% of solvent and slurry gels (MEK system gels near 80% solvent loss), second chamber removes the remainder [steinmueller-us6682598].
- Shrinkage on drying: dry sheet is 5-25% of wet thickness (TDK, low-solids wire-bar coat) [tdk-us7632369].
- Thin sheets (<=1 um): enabled by (a) fine, well-dispersed powder and filtered slurry (see 10-powder-and-slurry.md), (b) ultra-smooth release film (Ra of release surface <=8 nm, Rp <=50 nm) and controlled back-coat roughness so winding does not imprint, (c) low electrostatic peel charge, (d) precision coater (die/wire bar) giving low wet thickness [lintec-us20150086749][nanya-us9932452][tdk-us7632369].
- Green sheet is later peeled from the carrier; antistatic additive in slurry or release layer controls peel-off static [tdk-us7632369][nanya-us9932452].

## Parameter ranges
| parameter | typical range | source key | notes |
|---|---|---|---|
| MLCC green sheet dry thickness | 0.5-30 um; preferably 0.5-10 um; <=3 um preferred | tdk-us7632369 | patent claim range |
| Ultrathin focus | 5 um or less, particularly 0.5-2 um; coating test target 1 um | lintec-us20150086749 | |
| Ultrathin problem range | 0.5-1.0 um sheets stick to conventional release films | nanya-us9932452 | |
| General tape casting thickness (all ceramics) | 20 um to 1 mm (dried green tape); 20 um to 2 mm overall | ikts-tc; ieee-technav | not MLCC specific |
| Thin film capability (general) | as thin as 5 um; first tapes <5 um cast in 1996 | wiki-tc | citing Mistler 2000/Mitchell 2004; MLCC sheets now thinner (see conflicts) |
| Example doctor-blade wet thickness | 20 um wet (cover layer, PET) | park-2023 | dried thickness not stated |
| Line speed | 50 m/min (wire bar, 2 um dry sheet) | tdk-us7632369 | the only numeric casting speed found |
| Die coat test size | 250 mm wide, 10 m long, 1 um dry | lintec-us20150086749 | speed/gap/pressure not in extracted text |
| Release roll handling | 400 mm wide x 5000 m long roll; 50 m/min unwind | lintec-us20150086749 | |
| Wet-to-dry ratio | dry = 5-25% of wet | tdk-us7632369 | |
| Drying oven | 60-70 C / 2 min (example); 50-100 C / 1-20 min (range) | tdk-us7632369 | |
| Drying (Murata example) | 100 C / 4 min, bar-levelled | murata-us5520994 | dip + metal bar, BaTiO3/PVB/DBP/toluene-ethanol |
| Drying tunnel gas velocity | 1-5 in/s (claim 1-6 in/s first chamber); solvent:gas mass ratio 0.5-2.0 | steinmueller-us6682598 | tapes >0.005 in (~127 um); not MLCC thin sheet |
| Drying tunnel length | up to 35 m cited for prior art | steinmueller-us6682598 | |
| Release layer thickness | 0.3-2 um (Lintec, preferred 0.5-1.5); 0.04-0.8 um (Nan Ya, preferred 0.06-0.3); 0.05-1.0 um (Murata) | respective | |
| Release layer smoothness | Ra <=8 nm, Rp <=50 nm | lintec-us20150086749 | protrusions >=10 nm cover <=10% of area |
| Back-coat roughness | Ra 5-40 nm (pref 10-30), Rp 60-500 nm | lintec-us20150086749 | too rough transfers to sheet (thin spots/shorts); too smooth causes blocking |
| PET base film | 10-300 um (pref 15-200); examples 30-38 um | lintec-us20150086749; nanya-us9932452 | |
| Peel electrostatic charge (200x200 mm) | 0.8-1.6 kV inventive; 2-12 kV comparative | nanya-us9932452 | |
| Pinhole criterion | depressions >=500 nm; count >=4 = poor | lintec-us20150086749 | |
| Green tape mechanical targets | tensile >=15 MPa, elongation 15-25% | yang-2026-pvb | |
| Peel strength sheet-to-release | 5-6 g/25 mm (organic example), 12 g/25 mm (aqueous example) | murata-us5520994 | |
| Slurry viscosity at casting | 180 mPa.s (TDK); 400-700 cP (Yang) | tdk-us7632369; yang-2026-pvb | |
| Casting-room conditions (temperature, humidity) | not quantified | patsnap-2025 | "controlled temperature and humidity" only |

## Equipment
- Doctor-blade caster onto PET, drying oven/tunnel, wind-up [ieee-technav][steinmueller-us6682598]. Blade shapes: flat thick/thin edge, rounded, knife [wiki-tc].
- Slot-die / lip / microgravure coaters for <50 um [wiki-tc]; die coater used by Lintec for 1 um sheets [lintec-us20150086749]; wire bar coater (TDK) [tdk-us7632369].
- Release-film makers (Lintec, Nan Ya, Murata film patent) are part of the supply chain for thin sheets.
- Drying tunnels with zoned gas flow; conventional machines described as long forced-air ovens (up to 35 m in prior art) [steinmueller-us6682598].
- Inspection: roughness (Ra/Rp/Rz), density, tensile tests, pinhole counting at 500 nm depth [lintec-us20150086749][tdk-us7632369].

## Defect / yield modes
- Cracking and curl from uncontrolled solvent loss; streaks from slip flow at the blade [wiki-tc].
- Warping, cracking, thickness variation, microstructural defects from uneven drying [patsnap-2025].
- Pinholes and local thin spots from rough release-film back surface transferring when rolled; short-circuit risk in capacitor [lintec-us20150086749].
- Blocking/poor winding if back coat is too smooth [lintec-us20150086749].
- Sheet breakage on peel from electrostatic force, 0.5-1.0 um sheets [nanya-us9932452]; wrinkling from peel static [tdk-us7632369].
- Delamination of sheet from the carrier layer when release is poorly set (Murata comparative example) [murata-us5520994].
- Bubbles and aggregates in slurry become cast-layer defects [ieee-technav]; roughness rises with poor dispersion, excess binder, water or aromatic solvent [tdk-us7632369].
- Shrinkage mismatch between layers later causes delamination/warping at sintering [ieee-technav].
- Layer-to-layer thickness variation attributed to different casting batches is mentioned in a search summary only (not verified on a fetched page).

## Gating effects (what this step limits)
- Minimum dielectric thickness is gated jointly by powder/slurry quality, the smoothness of the carrier release layer (nm-level Ra), and peel-off electrostatics; sources show 0.5-2 um sheets as practical targets [lintec-us20150086749][nanya-us9932452][tdk-us7632369].
- Layer count and capacitance: patsnap-2025 states only qualitatively that thickness control directly affects capacitance and voltage rating; no numbers.
- Dry thickness uniformity (single-layer and batch-to-batch) feeds directly into voltage rating margins; no quantified tolerance (CV) found in T1-T4 sources.
- Throughput: drying zone length/speed (50 m/min example; tunnels up to 35 m) [tdk-us7632369][steinmueller-us6682598].

## Open questions / conflicts
- Thickness floor: Wikipedia (citing Mistler 2000) says tapes as thin as 5 um, first <5 um in 1996 [wiki-tc]; TDK and Lintec patents describe 0.5-2 um MLCC sheets [tdk-us7632369][lintec-us20150086749]; IKTS/IEEE give 20 um lower limit for general ceramics [ikts-tc][ieee-technav]. Different scopes, not strictly contradictory, but not reconciled by any source.
- Viscosity at casting: 180 mPa.s [tdk-us7632369] vs 400-700 cP [yang-2026-pvb].
- Not found: numeric thickness uniformity tolerance (e.g. +-%), casting speeds for doctor blade vs slot-die in MLCC, blade gap vs final thickness, slot-die coating window for BaTiO3, drying zone temperature profiles for sub-um sheets, green density (%) values for production sheets, sub-um tape from other sources (a sub-1 um BaTiO3 tape report with 20-25 nm roughness and a 9.5 um aqueous tape with density 3.65 g/cm3 appeared only in search snippets; not fetched, so not recorded as data).
- Patent examples are 1-2 um with wire bar/die; whether commercial lines use slot-die or gravure for 0.5-1 um sheets is not confirmed by any T1 vendor source.
- Murata, TDK, Taiyo Yuden, SEMCO, KEMET, KYOCERA AVX web pages: no casting-process details found.
- Mistler & Twiname (2000) requires direct access.
