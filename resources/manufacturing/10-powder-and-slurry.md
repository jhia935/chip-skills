# MLCC Dielectric Powder Conditioning and Slurry Preparation
_Collected: 2026-11-10 · raw research notes (immutable source material)_

Scope note: BaTiO3 powder synthesis routes and dopant coating are covered in the wiki concept `batio3-powder-synthesis`; this file covers only what happens once powder exists (deagglomeration, dispersion, binder addition, de-airing, filtration).

## Sources
| key | title | publisher/authors | year | tier | URL |
|---|---|---|---|---|---|
| yang-2026-pvb | Study on the effect of polyvinyl butyral molecular composition on ceramic slurry properties | Yang, Cheng, Zhao, Guo (BUPT/Tsinghua), J. Phys.: Conf. Ser. 3175, 012035 | 2026 | T3 | https://iopscience.iop.org/article/10.1088/1742-6596/3175/1/012035 |
| sem-us7229035 | Method of deagglomerating ceramic powder, deagglomeration mill... highly dispersed slurry (US7229035B2) | Samsung Electro-Mechanics (Na et al.) | 2007 (filed 2004) | T4 | https://patents.google.com/patent/US7229035B2/en |
| tdk-us7632369 | Green sheet slurry, green sheet, production methods (US7632369B2) | TDK Corp | 2009 (priority 2003) | T4 | https://patents.google.com/patent/US7632369B2/en |
| murata-us5520994 | Laminated carrier film for use in ceramic green sheet (US5520994) | Murata Manufacturing (Kayama) | 1996 | T4 | https://patents.google.com/patent/US5520994 |
| nakata-2021 | Effect of surface phosphate ester dispersant on viscosity by coarse-grain modeling of BaTiO3 slurry | Nakata (Kyocera), Kiguchi, Hino; arXiv:2111.08876 | 2021 | T3 | https://arxiv.org/pdf/2111.08876 |
| karas-1988 | Casting behavior and tensile strength of cast BaTiO3 tape (abstract only) | Karas, Kumagai, Cannon; Adv. Ceram. Mater. 3(4) | 1988 | T3 | https://www.osti.gov/biblio/6108585 |
| park-2023 | BaTiO3/polydopamine cover layer for MLCC mechanical properties | Park et al., Polymers 15(19):4014 | 2023 | T3 | https://pmc.ncbi.nlm.nih.gov/articles/PMC10575367 |
| wiki-tc | Tape casting (cites Mistler & Twiname, Tape Casting: Theory and Practice, Wiley 2000 [mistler-2000]) | Wikipedia | n.d. | T6 | https://en.wikipedia.org/wiki/Tape_casting |
| ieee-technav | Tape casting overview | IEEE Technology Navigator | n.d. | T6 | https://technav.ieee.org/topic/tape-casting/ |

Not obtained: [mistler-2000] itself (only via Wikipedia citation); Murata/TDK/Taiyo Yuden/KEMET vendor technology pages gave no slurry data in searches; ScienceDirect/ResearchGate/Academia pages returned 403.

## Process description
- Typical sequence: powder + dopants + solvent + dispersant are first milled (deagglomeration/dispersion), then binder/plasticizer solution is added and milled again, then degassed/filtered and cast [yang-2026-pvb][tdk-us7632369][ieee-technav].
- Two-step ball milling [yang-2026-pvb]: step 1 powder:ethanol:ethyl acetate = 1:1:1 by mass, ZrO2 beads at 2.5x powder mass, dispersant added, 14-24 h. Step 2: pre-dissolved binder solution (plasticizer:PVB:ethanol:ethyl acetate = 1:4:18:18 by mass) added, milled again to dissolve binder. Then degassed by standing 6 h, cast with doctor blade on PET.
- Dispersant is added in the first milling stage (steric/electrostatic deagglomeration, aims at low viscosity + high solids); binder in the second stage for green strength; plasticizer improves extensibility and crack resistance, said to be especially crucial for ultrathin layers [yang-2026-pvb].
- Samsung EM route [sem-us7229035]: stir premix 1 h at 300 rpm; basket mill primary dispersion (Example 2: 750 rpm, 3 h); then bead-type deagglomeration mill with 0.2-0.3 mm ZrO2 beads (conventional beads were >=0.65 mm); then high-pressure dispersion (10,000-25,000 psi, 3-7 passes) and filtration through a 1-2 um filter. Claim is applicability to active layers of 3 um or thinner.
- TDK route [tdk-us7632369]: powder + subcomponents pre-ground in a ball mill 20 h with solvent; binder dissolved in alcohol and filtered before combining; filtered with a 1 um filter (Advantech 5C) as a filterability check.
- Solvent: traditional PVB/toluene-ethanol; ethanol/ethyl acetate proposed as toluene-free alternative [yang-2026-pvb]. Wikipedia/IEEE note aqueous systems are environmentally preferred, ketone/alcohol systems dry faster and suit binders better [ieee-technav]. Aqueous example in Murata patent: 100 BaTiO3 : 12 water-soluble acrylic polymer : 8 PEG : water, ball milled [murata-us5520994].
- Role of PVB in suspension: rheology and stability contributions as binder and dispersant (general statement, BaTiO3) [yang-2026-pvb].
- De-airing/filtration: slurry is milled, then filtered and deaerated to remove bubbles and aggregates that cause cast-layer defects [ieee-technav]; Yang degasses by 6 h standing [yang-2026-pvb].
- Dispersant mechanism (simulation): CGMD of BaTiO3 in toluene/ethanol with butyral binder and didodecyl hydrogen phosphate (DHP) showed viscosity falling as DHP population at particle surface rises; excessive DHP/BTO = 0.1 weight ratio was judged excessive for 8 and 15 nm particles [nakata-2021].

## Parameter ranges
| parameter | typical range | source key | notes |
|---|---|---|---|
| BaTiO3 particle size (slurry examples) | 150 nm (Yang); <=0.4 um, preferably 0.1-3.0 um (TDK); 0.2 um (SEM background example) | yang-2026-pvb; tdk-us7632369; sem-us7229035 | |
| Mill beads (fine) | 0.2-0.3 mm ZrO2 (0.3 mm in example); conventional >=0.65 mm | sem-us7229035 | deagglomeration mill |
| Mill peripheral speed | 6-10 m/s (1146-1910 rpm, 100 mm impeller) | sem-us7229035 | |
| Mill solids (deagglomeration) | 10-50 wt% general; 30 wt% optimal in test | sem-us7229035 | |
| Mill discharge flow | 600/1000 ml/min tested; 800 optimal | sem-us7229035 | lab mill |
| Particle size after deagglomeration | D10 0.12, D50 0.233, D90 0.447 um (from D90 1.01 um) | sem-us7229035 | |
| High-pressure dispersion | 10,000-25,000 psi, 3-7 passes | sem-us7229035 | description says 15,000-25,000 psi; claims 10,000-25,000 |
| Filter rating | 1-2 um | sem-us7229035; tdk-us7632369 | |
| Ball-mill time | 20 h optimal (14-24 h tested; D mean 407 -> 223 nm, rebounds to 411/473 nm at 22/24 h) | yang-2026-pvb | over-milling re-agglomerates / media wear |
| Ball-mill time (TDK) | 20 h pre-grind | tdk-us7632369 | |
| Dispersant dose | 2.0 wt% of powder optimal (1.0-3.0 tested; viscosity minimum at 2.0; mean size 398 -> 223 nm) | yang-2026-pvb | BYK-LPC22552 |
| Dispersant dose (TDK) | 0.5-1.5 parts/100 powder, PEG-based nonionic, HLB 5-6 | tdk-us7632369 | |
| Dispersant (SEM Ex. 2) | 2.5 mol% RE 610 (Toho Chemical) | sem-us7229035 | |
| PVB content | 12 wt% of powder optimal (9-13 tested) | yang-2026-pvb | 9-11% microcracks/closed pores; 13% incomplete debinding |
| PVB content (TDK) | 6 parts/100 powder (preferred 5-6.5) | tdk-us7632369 | PVB DP 1400, butyralation 69+-3% |
| PVB content (SEM Ex. 2) | 11.5 wt% | sem-us7229035 | |
| PVB molecular weight blend | 110,000 : 53,000 = 7:3 best; tensile 17.06 MPa, elongation ~15.7% | yang-2026-pvb | elongation 11.3% (8:2) to 24.4% (2:8) |
| Green-tape targets for MLCC | tensile >=15 MPa, elongation 15-25% | yang-2026-pvb | cites an external reference for these |
| Plasticizer | DOP 50 parts per 100 binder (40-70) | tdk-us7632369 | DOP 3.165 wt% in SEM Ex. 2 [sem-us7229035] |
| Plasticizer in Yang binder solution | plasticizer:PVB = 1:4 by mass | yang-2026-pvb | type not named in extracted text |
| Ceramic fraction of solids | 67.31 vol% (62.42-72.69 preferred) | tdk-us7632369 | ceramic+binder+plasticizer |
| Solvents | toluene/ethanol 1:1 (SEM); ethanol/n-propanol 1:1 with toluene 10-20 parts per 100 solvent (TDK); ethanol/ethyl acetate (Yang) | as listed | |
| Other TDK additives | water 1-3 parts, mineral spirits 3-15 parts, antistatic (imidazoline) 0.1-0.75 part per 100 powder | tdk-us7632369 | antistatic against peel-off static |
| Slurry viscosity | 400-700 cP needed for casting (Yang); 180 mPa.s at 25 C, B-type, S21 rotor, 50 rpm (TDK, wire-bar coat) | yang-2026-pvb; tdk-us7632369 | see conflicts |
| Slurry solids (powder:solvent) | powder:solvent = 1:2 by mass (Yang) => ~33 wt% powder before binder | yang-2026-pvb | derived from stated 1:1:1 |
| Filterability test | 200 g through 28.26 cm2 at 0.2 MPa; <=3 min 50 s good | tdk-us7632369 | 1 um filter |
| Rutgers rheology trends | binder/plasticizer up -> viscosity and strength up; powder/organics up -> viscosity and density up, strength peaks; optimum dispersant for viscosity/density | karas-1988 | qualitative |

## Equipment
- Ball mill with ZrO2 media (Yang: media 2.5x powder mass; TDK 20 h) [yang-2026-pvb][tdk-us7632369].
- Basket mill (primary dispersion, 750 rpm / 3 h) then bead-type deagglomeration mill with 0.2-0.3 mm beads, then high-pressure (up to 25,000 psi) disperser [sem-us7229035]. Bead mills are claimed more effective than conventional mills; the patent does not quote the equipment vendor.
- Rotational viscometers (Brookfield DV2T; B-type) and dynamic light scattering (Malvern Zetasizer) for QC [yang-2026-pvb][tdk-us7632369].
- Pressure filtration cartridges 1-2 um [sem-us7229035][tdk-us7632369].

## Defect / yield modes
- Under-milled: hard agglomerates remain (D mean 407 nm at 14 h vs 223 nm at 20 h) [yang-2026-pvb]. Over-milled: re-agglomeration and ZrO2 wear contamination [yang-2026-pvb].
- Dispersant under-dose: incomplete coverage, agglomeration; overdose: micelles/free dispersant raise viscosity [yang-2026-pvb].
- Too little PVB: weak green body, microcracks, closed pores; too much: incomplete debinding, residual organics, suppressed grain growth, lower er and higher tan d [yang-2026-pvb].
- Poor dispersion, excess binder, excess water or aromatic solvent raise sheet roughness or lower strength [tdk-us7632369].
- Bubbles and aggregates in slurry become cast-layer defects [ieee-technav].
- Static charge during carrier-film peel causes sheet wrinkling [tdk-us7632369].

## Gating effects (what this step limits)
- Particle size distribution of the slurry (D90 ~0.45 um after deagglomeration) sets the minimum practical dielectric layer thickness; the SEM patent targets active layers <=3 um [sem-us7229035]. Rule of thumb of grains-per-layer is not in these sources.
- Filter rating (1-2 um) caps oversize agglomerates reaching the casting head [sem-us7229035][tdk-us7632369].
- Binder/plasticizer balance gates handleability (strength >=15 MPa, elongation 15-25%) for stacking and lamination [yang-2026-pvb].
- Solvent choice gates drying speed (see 20-tape-casting.md).

## Open questions / conflicts
- Viscosity: Yang requires 400-700 cP; TDK Example is 180 mPa.s (1 cP = 1 mPa.s). Plausibly different coating methods (doctor blade vs wire bar) and solids, but not stated in sources; no cross-resolution possible.
- Dispersant dose: 2.0 wt% (Yang) vs 0.5-1.5 parts (TDK) vs 2.5 mol% (SEM); units/chemistries differ (not comparable).
- No numeric solids-loading (vol%) for ultra-thin production slurries found; no commercial MLCC maker bead-mill recipe (bead size, residence time) found beyond the Samsung patent.
- Aqueous MLCC slurry numbers (a 9.5 um aqueous BaTiO3 tape study; green density, strength) appeared only in search snippets; ScienceDirect fetch returned 403 - not recorded.
- Murata, TDK, Taiyo Yuden, KEMET, KYOCERA AVX technology pages: no slurry content found.
- Mistler & Twiname (2000) not read directly.
- Viscosity vs shear-rate (rheology) targets for thin-layer slurries not found.
- Nakata CGMD is a simulation of coarse-grained models with 2-15 nm particles, not production particle sizes.
