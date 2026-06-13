---
title: "Chun et al. 2024 — Thermal Activation Energy on Electrical Degradation in BaTiO₃ MLCC"
type: source
created: 2026-05-29
updated: 2026-06-13
sources:
  - chun-2024-screp-batio3-mlcc-degradation.md
tags:
  - paper
status: complete
importance: high
---

# Chun et al. 2024 — Thermal Activation Energy on Electrical Degradation in BaTiO₃ MLCC

**Source**: Chun, J., Heo, J., Lee, K., Ye, B.U., Kang, B.S., & Yoon, S.-H. (2024). **Thermal activation energy on electrical degradation process in BaTiO₃ based multilayer ceramic capacitors for lifetime reliability**. *Scientific Reports*, **14**, 616.
DOI: [10.1038/s41598-024-51254-w](https://doi.org/10.1038/s41598-024-51254-w)
Open access via [PMC10770127](https://pmc.ncbi.nlm.nih.gov/articles/PMC10770127/).

## Summary

A lifetime-reliability study of **three modern Samsung Electro-Mechanics rare-earth-doped X7R MLCC prototypes** at three different operating points (cap × case × V). The samples are disclosed with **case size, capacitance, voltage rating, and dielectric thickness**; layer count is not stated explicitly. Useful for the [[capacitance-simulation-from-recipe-and-geometry|chip-sim simulator]] as a calibration reference for modern post-2020 SEMCO thin-layer X7R geometry.

## Sample table

| Sample | Case (EIA / metric) | Cap | V_rated | d_fired |
|---|---|---|---|---|
| Sample 1 | 0805 / 2012 | **4.7 µF** | 50 V | **4.2 µm** |
| Sample 2 | 0402 / 1005 | **0.22 µF** | 25 V | **4.5 µm** |
| Sample 3 | 0805 / 2012 | **10 µF** | 25 V | **3.2 µm** |

These are all **SEMCO production-class** parts (the paper identifies the manufacturer explicitly as Samsung Electro-Mechanics — a rare disclosure).

## Implied recipes (back-calculated from disclosed C + d_fired)

Using the chip-sim's calibrated `A_eff` (coverage 0.90, disc 0.15) and a representative ε_r ≈ 3000 for X7R:

| Sample | A_eff (0805 or 0402) | Implied N_a | Implied ε_r (if N_a fits Hmax) |
|---|---|---|---|
| 1 (4.7 µF / 0805 / 50 V) | 1.10 mm² | ~700 *(overflows H_max)* | ~6000 if N_a ≈ 250 |
| 2 (0.22 µF / 0402 / 25 V) | 0.21 mm² | ~190 *(overflows H_max for 0402)* | ~6000 if N_a ≈ 100 |
| 3 (10 µF / 0805 / 25 V) | 1.10 mm² | ~1130 *(overflows H_max)* | ~6000 if N_a ≈ 400 |

The forward-prediction with default ε_r = 3000 doesn't fit — the implied N_a exceeds the case H_max budget. The interpretation: **SEMCO's 2020s rare-earth-doped composition has ε_r ≈ 6000**, roughly 2× the X7R class default. This is consistent with [[us-11222749-samsung-dy-nb-thin-layer|Samsung's Dy-Nb thin-layer patent]] reports of nano-grain compositions with peak ε_r in the 5000-8000 range.

## Reliability findings (paper's primary contribution)

The paper focuses on a **non-Arrhenius behavior** in lifetime estimation during HALT for X7R MLCCs — the conventional single-mode Arrhenius / Prokopowicz-Vaskas model under-predicts measured time-to-failure for these modern thin-layer parts (consistent with [[nasa-general-reliability-model-ni-batio3|Liu 2014's two-mode framework]]). Activation energies for the slow-degradation mode fall in the 1.0–1.5 eV range — close to the wiki's existing range from earlier NEPP work.

## Implications for the simulator

1. **These post-2020 thin-layer prototypes show ε_r well above the X7R class default** (≈ 6000). The simulator captures elevated thin-layer ε_r through its grain-size ε_r curve + the real-data calibration layer, not a per-vendor constant.
2. **Layer count is NOT disclosed** for these samples — the paper provides geometry-only data. Back-calculating N_a from cap+d+ε_r is the user's job. The chip-sim's `solveRecipe` can do this directly.
3. **HALT pass/fail tied to geometry**: thinner dielectric + higher CV → more HALT failures. Consistent with [[bme-reliability-model|Liu's N-amplifier]].

## Entities Mentioned

- [[samsung-electro-mechanics]] — manufacturer (explicit identification)
- [[jinhyuk-chun]] — first author *(stub)*
- [[seok-hyun-yoon]] — corresponding author; SEMCO research lead

## Concepts Discussed

- [[capacitance-simulation-from-recipe-and-geometry]] — calibration data
- [[bme-reliability-model]] — non-Arrhenius lifetime
- [[layer-thickness-and-metal-ceramic-ratio]] — modern thin-layer benchmark
- [[us-11222749-samsung-dy-nb-thin-layer]] — likely composition family
- [[nasa-general-reliability-model-ni-batio3]] — Liu's two-mode framework

## References

_Open access via Sci. Rep. / PMC. Calibration entries in `simulator/tier1.js` KNOWN_PARTS as `chun-2024-S1/S2/S3`._
