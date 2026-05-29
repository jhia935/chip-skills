---
title: "Hernández-López et al. 2018 — KEMET X7R MLCC Reliability During HALT"
type: source
created: 2026-05-29
updated: 2026-05-29
sources:
  - hernandez-lopez-2018-kemet-x7r-halt.md
tags:
  - paper
status: complete
importance: medium
---

# Hernández-López et al. 2018 — Reliability of X7R Multilayer Ceramic Capacitors During High Accelerated Life Testing (HALT)

**Source**: Hernández-López, A. M., et al. (2018). **Reliability of X7R Multilayer Ceramic Capacitors During High Accelerated Life Testing (HALT)**. *Materials*, **11** (10), 1900.
DOI: [10.3390/ma11101900](https://doi.org/10.3390/ma11101900)
Open access via [PMC6213711](https://pmc.ncbi.nlm.nih.gov/articles/PMC6213711/).

## Summary

A HALT-degradation study of **three KEMET (Kemet Charged, Mexico) Y-doped BaTiO₃ X7R MLCCs** differing only in their Ca content (Ca substitution at A-site, 0–8 mol%). Among the few academic papers that **explicitly disclose the commercial manufacturer + full structural recipe** of the parts studied — a rare and valuable [[capacitance-simulation-from-recipe-and-geometry|calibration anchor]] for the chip-sim.

## Sample geometry (all three MLCCs)

| Parameter | Value |
|---|---|
| Manufacturer | KEMET Charged, San Nicolás de los Garza, Mexico |
| Chip dimensions | **1.8 mm × 0.8 mm × 0.8 mm** (closest EIA: 0603) |
| Dielectric thickness | **7.5 µm** |
| Active layer count (N_a) | **68 layers** |
| Electrode | Ni with Cu termination |
| Capacitance | ~100 nF at 1 kHz, room T |
| HALT stress applied | 400 V / 600 V, 20–200 °C |
| Rated V (inferred) | ~200 V (d_fired / E_design ≈ 200/28 = 7.1 µm) |

## Three composition variants (Y-doped BaTiO₃ + Ca)

All share Y = 1.05 wt% (the standard rare-earth shell stabilizer). Differ only in A-site Ca substitution:

| Sample | Ca (wt%) | Ca (mol%) |
|---|---|---|
| MLCC-1 | < 0.01 | ~0.01 |
| MLCC-2 | 0.5–0.6 | ~2.8 |
| MLCC-3 | 1.3–1.5 | ~8.1 |

The Ca substitution at A-site is one of the [[class-specific-tc-engineering|T_C engineering knobs]] — modest T_C reduction, larger ε_r flattening across temperature. The paper tracks how Ca content affects HALT lifetime.

## Forward-prediction accuracy

Running the chip-sim with the disclosed geometry (assigned to 0603 case, ε_r = X7R default 3000) predicts **140 nF** vs the rated 100 nF — a **1.40× over-prediction**. Within the calibrated ±50 % band but not great. The likely sources of the gap:

1. The 1.8 × 0.8 chip is **slightly smaller than 0603 (1.6 × 0.8)** — wait, actually larger in length. The actual A_overlap may differ from the 0603-case-default.
2. **End margins (em)**: HV parts use larger end margins to prevent arcing — the simulator's 0603 default (em = 175 µm) may be too small.
3. **Y-doped BaTiO₃ effective ε_r** at 7.5 µm thick + sub-grain microstructure may be ~2000 not 3000 — Y-only without Mg/Mn co-dopant gives lower effective ε_r than the modern Dy + Mg + Mn package.

If `em` = 250 µm (HV margin) and `ε_r` = 2000, the prediction lands at ~100 nF (1.00× ratio).

## Key HALT findings (paper's primary contribution)

- **Ca-poor (MLCC-1)**: longest HALT life, 37 hours at 140 °C / 400 V before failure.
- **Ca-intermediate (MLCC-2)**: catastrophic failure within < 1 s at the same stress.
- **Ca-rich (MLCC-3)**: intermediate behavior; recovery effects observed.

The MLCC-2 catastrophic failure is attributed to oxygen-vacancy clustering at the A-site Ca content where Ca induces secondary-phase formation. Ca-rich parts (8.1 mol%) re-stabilize via a different defect-compensation mechanism.

## Implications for the simulator

1. **HV X7R parts (≥ 100 V rated)** use lower-ε_r dielectrics than thin-layer high-CV consumer parts. The chip-sim could split X7R into HV-X7R (ε_r ~ 2000) and thin-layer X7R (ε_r ~ 3000-3500) based on V_rated.
2. **End-margin design varies with V_rated** — HV parts use larger `em` to prevent arcing across the dielectric edge. The simulator's case-default em could be scaled by V_rated.
3. **Y-only doping** has different ε_r and reliability behavior than the modern Y + Mg + Mn standard package. Most academic studies use Y-only (cleaner science); commercial production uses the full package. Calibration anchors from academic papers may systematically under-predict commercial ε_r.

## Entities Mentioned

- [[kemet]] — manufacturer
- [[ana-maria-hernandez-lopez]] — first author *(stub)*

## Concepts Discussed

- [[class-specific-tc-engineering]] — Ca substitution is a peak-shifter
- [[bme-reliability-model]] — HALT vs Ca content
- [[dopant-site-occupancy-batio3]] — A-site Ca substitution
- [[oxygen-vacancy-migration]] — MLCC-2 catastrophic failure mechanism
- [[capacitance-simulation-from-recipe-and-geometry]] — calibration data
- [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978]] — original Ca-doped BT non-reducing dielectric

## References

_Open access via Materials / PMC. Calibration entries in `simulator/tier1.js` KNOWN_PARTS as `hernandez-2018-mlcc1/2/3`._
