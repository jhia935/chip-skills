---
title: MLCC Manufacturing Process (End-to-End)
type: concept
created: 2026-05-19
updated: 2026-11-10
status: complete
importance: high
sources:
  - escies-bme-mlcc-high-reliability.md
  - nasa-cracking-low-voltage-mlcc.md
  - octopart-tdk-cga8l3c0g-product-guide.md
  - resources/manufacturing/10-powder-and-slurry.md
  - resources/manufacturing/20-tape-casting.md
  - resources/manufacturing/30-electrode-printing.md
  - resources/manufacturing/40-lamination-and-dicing.md
  - resources/manufacturing/60-termination-and-plating.md
  - resources/manufacturing/80-test-sort-and-packaging.md
tags:
  - paper
---

# MLCC Manufacturing Process (End-to-End)

A multi-step ceramic-electronic packaging pipeline that takes powder + paste + green-tape inputs to a finished surface-mount chip with three sintered, plated terminations on a five-axis controlled chip body. End-to-end yield and quality depend on **shrinkage matching** and **atmosphere control** at multiple steps.

## Process map (BME stack, modern Tier-1 line)

```
1.  Dielectric powder synthesis (BaTiO₃ ~100–300 nm core-shell powder)
2.  Slurry preparation (solvent + binder + plasticizer + dispersant + powder)
3.  Tape casting (doctor blade → 0.5–10 µm green tape on PET carrier)
4.  Screen printing internal electrode (Ni paste + dielectric additive, 0.5–1 µm wet)
5.  Stacking + lamination (alternating dielectric/electrode → green block)
6.  Isostatic pressing (∼50–200 MPa to densify and pre-shape)
7.  Dicing (mechanical or laser → green chips)
8.  Binder burnout / debinding (200–600 °C, controlled atmosphere)
9.  Sintering (1100–1300 °C, reducing atmosphere PO₂ 10⁻¹⁰–10⁻¹²)
10. Re-oxidation anneal (~900–1100 °C, slightly higher PO₂)
11. Corner rounding (tumble polish or barrel rounding to expose internal electrodes)
12. Termination (Cu paste dip → sinter → forms outer electrode)
13. Ni barrier plating (electrolytic, 2–3 µm)
14. Sn finish plating (matte tin, 5–10 µm; SnPb option for legacy)
15. Electrical sort / test
16. Tape & reel
```

Each step has its own page covering parameters, defect modes, and yield-critical knobs:

| Step(s) | Page |
|---|---|
| 1 | [[batio3-powder-synthesis]] · [[dopant-powder-coating]] |
| 2 | [[slurry-preparation-mlcc]] |
| 3 | [[tape-casting-mlcc]] |
| 4 | [[internal-electrode-printing]] · [[ni-electrode-paste-formulation]] · [[step-height-compensation]] |
| 5–6 | [[stacking-and-lamination-mlcc]] |
| 7 | [[green-chip-cutting-and-side-margin]] |
| 8 | [[binder-burnout-debinding]] |
| 9 | [[sintering-profile-mlcc]] · [[bme-sintering-atmosphere]] |
| 10 | [[re-oxidation-anneal]] |
| 11 | [[barrel-chamfering-mlcc]] |
| 12–14 | [[termination-and-plating]] |
| 15–16 | [[production-test-and-screening-mlcc]] |

> [!note] Patent values vs this overview
> The 2026-11 survey suggests some numbers in the map above should be read as broad ranges:
> - Electrode print thickness: modern patents give **0.4–0.7 µm fired** [us10573466].
> - Lamination pressure: 10–200 MPa at 40–100 °C [us7641727].
> - Ni plating: observed values span 2–10 µm (see the contradiction on [[termination-and-plating]]).
>
> High-CV parts may skip printed side margins and attach a **~2–11 µm side-margin sheet** after cutting ([[green-chip-cutting-and-side-margin]]).

## Key kinetic coupling: shrinkage matching
The dielectric and electrode layers must shrink **in lockstep** during sintering, or the part delaminates or develops electrode discontinuity. Modern BME does this by:
1. **Adding BaTiO₃ ceramic powder (≈50 nm)** to the Ni paste — slows the Ni shrinkage in the sintering window so it tracks the dielectric.
2. **Using bimodal Ni powders** for tighter shrinkage profile.
3. **Sintering aids** (glass formers, transient liquid-phase additives) in the dielectric to lower its sintering temperature.

## Atmosphere control — the BME-specific challenge
- **Debinding** in Ar + 1 vol % O₂ (a mild oxidizing window) — removes 74 % of binder while limiting Ni oxidation (∼1600 ppm O pickup).
- **Sintering** in N₂/H₂ reducing atmosphere with PO₂ in the 10⁻¹⁰ to 10⁻¹² atm range — keeps Ni metallic but creates oxygen vacancies in the dielectric.
- **Re-oxidation** at lower T with slightly higher PO₂ to refill some O vacancies near grain boundaries (improves IR) without oxidizing Ni.

Closed-loop O₂ control is now the state of the art in pusher furnaces ([[bme-sintering-atmosphere]]).

## Defect / failure modes per step
| Step | Defect | Symptom |
|---|---|---|
| Tape casting | non-uniform thickness | yield loss at thin spots, capacitance variation |
| Electrode print | misalignment, voids | electrode discontinuity, reduced effective area |
| Lamination | trapped air, margin step | post-sinter delamination ([[step-height-compensation]]) |
| Dicing | edge chipping | reduced creepage distance |
| Debinding | too fast | bulk cracking, [[failure-modes-mlcc|parallel-plate cracks]] |
| Sintering | shrinkage mismatch | delamination, electrode breaks |
| Re-oxidation | over-oxidize | Ni inner electrode degradation, raised ESR |
| Termination | poor coverage | open termination, dropped chips |
| Plating | porosity, H uptake, thick Ni | solderability fail, humidity ingress, termination delamination |
| Test/sort | weak DWV, short IR | cracked parts escape ([[production-test-and-screening-mlcc]]) |

## Production scale
World-wide MLCC production: **~2 trillion pieces/year** ([[escies-bme-mlcc-high-reliability]]). A single Tier-1 fab can output billions of pieces/month.

## Cross-references
- [[mlcc-process-substeps-and-equipment]]: sub-step and equipment list
- [[bme-vs-pme]]
- [[bme-sintering-atmosphere]]
- [[re-oxidation-anneal]]
- [[case-size-geometry]]
- [[core-shell-batio3]]
- [[failure-modes-mlcc]]
- [[oxygen-vacancy-migration]]

## References
- [[mlcc-slurry-tape-casting-research-notes]] · [[mlcc-printing-lamination-research-notes]] · [[mlcc-termination-plating-research-notes]] · [[mlcc-test-sort-packaging-research-notes]]: 2026-11 per-step survey
- [[escies-bme-mlcc-high-reliability]]
- [[nasa-cracking-low-voltage-mlcc]] — Section 2 has the most comprehensive open-literature process survey
- [[octopart-tdk-cga8l3c0g-product-guide]] — vendor side
