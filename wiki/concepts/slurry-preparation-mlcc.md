---
title: Dielectric Slurry Preparation (Deagglomeration, Dispersion, Binder)
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/10-powder-and-slurry.md
tags:
  - paper
status: complete
importance: high
---

# Dielectric Slurry Preparation

The step between finished [[batio3-powder-synthesis|BaTiO₃ powder]] (already [[dopant-powder-coating|dopant-coated]]) and [[tape-casting-mlcc|tape casting]]. It breaks up agglomerates, puts the powder into a stable suspension, and adds the binder and plasticizer that give the green sheet its strength. Step 2 of the [[mlcc-manufacturing-process|process map]].

Thin layers are made or lost here. The particle-size tail (D90) and the filter rating set the largest particle that can reach the casting head. That particle has to be well below the target green-sheet thickness.

## Standard sequence

1. **Premix**: powder, dopants, solvent, and dispersant are stirred together.
2. **Primary dispersion and deagglomeration milling**: ball mill or bead mill with ZrO₂ media.
3. **Binder addition**: pre-dissolved (and filtered) binder and plasticizer solution is added, then milled again to dissolve and distribute it.
4. **High-pressure dispersion** (optional, thin-layer lines): multiple passes through a high-pressure disperser.
5. **Filtration** through 1–2 µm cartridges, then **de-airing** (standing, or vacuum).

Two published recipes follow this order: a two-step ball-mill route [yang-2026-pvb] and a SEMCO bead-mill + high-pressure route aimed at active layers of 3 µm or thinner [sem-us7229035]. TDK's patent route pre-grinds for 20 h and filters the binder solution separately before combining [tdk-us7632369].

## Parameter windows (published examples)

| Parameter | Value | Source |
|---|---|---|
| Fine-bead deagglomeration media | 0.2–0.3 mm ZrO₂ (conventional ≥0.65 mm) | [sem-us7229035] |
| Mill peripheral speed | 6–10 m/s | [sem-us7229035] |
| Mill solids during deagglomeration | 10–50 wt%, 30 wt% optimum in test | [sem-us7229035] |
| PSD after deagglomeration | D50 0.233 µm, D90 0.447 µm (from D90 1.01 µm) | [sem-us7229035] |
| High-pressure dispersion | 10,000–25,000 psi, 3–7 passes | [sem-us7229035] |
| Filter rating | 1–2 µm | [sem-us7229035], [tdk-us7632369] |
| Ball-mill time (150 nm BaTiO₃) | 20 h optimum; mean 223 nm at 20 h, 411–473 nm at 22–24 h | [yang-2026-pvb] |
| Dispersant | 2.0 wt% optimum [yang-2026-pvb]; 0.5–1.5 parts/100 powder, PEG-type, HLB 5–6 [tdk-us7632369] | — |
| PVB binder | 12 wt% of powder [yang-2026-pvb]; 6 parts/100 powder, DP 1400 [tdk-us7632369]; 11.5 wt% [sem-us7229035] | — |
| PVB molecular-weight blend | 110k : 53k = 7 : 3 → tensile 17.06 MPa, elongation ~15.7% | [yang-2026-pvb] |
| Plasticizer | DOP 50 parts / 100 binder (40–70) | [tdk-us7632369] |
| Ceramic fraction of dried solids | 67.31 vol% (62.42–72.69) | [tdk-us7632369] |
| Casting viscosity | 180 mPa·s (wire-bar) vs 400–700 cP (doctor blade) | [tdk-us7632369], [yang-2026-pvb] |

> [!note] Units do not line up across sources
> Dispersant dose appears in wt%, in parts per 100 powder, and in mol%. These are different chemistries and cannot be converted into one window. The viscosity gap (180 vs 400–700 mPa·s) probably reflects the coating method (wire bar vs doctor blade) and the solids loading, but no source says so directly.

The 67 vol% figure is **ceramic / (ceramic + binder + plasticizer)** in the dried sheet. It is a different quantity from the ~50–55 vol% *slurry* solids loading quoted on [[dielectric-layer-thickness-floor]], so the two numbers do not contradict each other.

## Solvent systems

- **Toluene / ethanol** with PVB is the traditional system [sem-us7229035]. TDK uses ethanol / n-propanol with 10–20 parts toluene [tdk-us7632369].
- **Ethanol / ethyl acetate** has been proposed as a toluene-free alternative [yang-2026-pvb].
- **Aqueous** (water-soluble acrylic + PEG) is environmentally preferable but dries slower [murata-us5520994], [ieee-technav]. The quantitative aqueous thin-tape data lives on [[aqueous-tape-casting-ultrathin-batio3-2025]].

## Failure modes set here

| Cause | Consequence |
|---|---|
| Under-milling | Hard agglomerates survive (mean 407 nm at 14 h vs 223 nm at 20 h) [yang-2026-pvb] and become shorts or thin spots in the fired layer |
| Over-milling | Re-agglomeration plus ZrO₂ wear contamination [yang-2026-pvb] |
| Dispersant under- or over-dose | Agglomeration, or free-dispersant micelles that raise viscosity [yang-2026-pvb]; a phosphate-ester simulation shows viscosity falling as surface coverage rises [nakata-2021] |
| Too little PVB | Weak green sheet, microcracks, closed pores [yang-2026-pvb] |
| Too much PVB | Incomplete [[binder-burnout-debinding|debinding]], residual carbon, suppressed grain growth, lower εᵣ and higher tan δ [yang-2026-pvb] |
| Bubbles or aggregates left in | Cast-layer pinholes [ieee-technav] |

## Gating role

- **Minimum layer thickness**: the D90 after deagglomeration (~0.45 µm in the SEMCO example) and the filter rating set the largest particle that reaches the sheet. This is the upstream half of the [[dielectric-layer-thickness-floor]].
- **Handling strength**: the binder/plasticizer balance must give roughly **≥15 MPa tensile strength and 15–25% elongation** [yang-2026-pvb] so that sub-µm sheets survive peel, printing, and [[stacking-and-lamination-mlcc|stacking]].
- **Debinding load**: every extra % of binder becomes a burden in [[binder-burnout-debinding]] and changes [[green-density-vs-shrinkage|green density]].

## Open questions

- No vendor (Tier-1 MLCC maker) slurry recipe or production solids loading (vol%) was found. All numbers come from patent examples or one lab paper.
- No rheology (viscosity vs shear rate) target for thin-layer slurry was found.

## Cross-references
- [[batio3-powder-synthesis]] · [[dopant-powder-coating]] (upstream)
- [[tape-casting-mlcc]] (downstream)
- [[dielectric-layer-thickness-floor]] · [[green-density-vs-shrinkage]] · [[binder-burnout-debinding]]
- [[ni-electrode-paste-formulation]]: the same dispersion physics on the electrode side

## References
- [[mlcc-slurry-tape-casting-research-notes]]: source summary for `resources/manufacturing/10-powder-and-slurry.md` and `20-tape-casting.md`
- [[mistler-twiname-tape-casting-textbook]]
