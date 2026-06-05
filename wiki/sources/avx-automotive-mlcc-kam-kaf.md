---
title: "KYOCERA AVX Automotive MLCC — KAM / KAF Series"
type: source
created: 2026-06-05
updated: 2026-06-05
sources:
  - avx-automotive-kam-kaf-dimensions.md
tags:
  - datasheet
status: complete
importance: medium
---

# KYOCERA AVX Automotive MLCC — KAM / KAF Series

The [[kyocera-avx|KYOCERA AVX]] AEC-Q200 automotive MLCC lines: **KAM** (plated Ni/Sn, BME) and **KAF** (same family with **[[soft-termination-mlcc|FLEXITERM]]** soft termination). Their value here is the **chip outer-dimension tables** (L×W×T with tolerances) that the NASA/MIL DPA data lacked, plus the real automotive design envelope.

Sources: [KAM TDS-0033](https://datasheets.kyocera-avx.com/AutoMLCCKAM.pdf), [KAF TDS-0034](https://datasheets.kyocera-avx.com/AutoMLCCKAF.pdf), [FLEXITERM](https://datasheets.kyocera-avx.com/FlexitermMLCC.pdf). Raw PDFs + dumps: `resources/market/avx/`; tables: `resources/market/avx-automotive-kam-kaf-dimensions.md`.

## Chip outer dimensions — KAM X7R (mm), verbatim
| | 0201 | 0402 | 0603 | 0805 | 1206 | 1210 | 1812 | 2220 |
|---|---|---|---|---|---|---|---|---|
| L | 0.6±0.09 | 1.0±0.10 | 1.6±0.15 | 2.01±0.20 | 3.2±0.2 | 3.2±0.2 | 4.5±0.3 | 5.7±0.5 |
| W | 0.3±0.09 | 0.5±0.10 | 0.81±0.15 | 1.25±0.20 | 1.6±0.2 | 2.5±0.2 | 3.2±0.2 | 5.0±0.4 |
| t (band) | 0.18±0.09 | 0.25±0.15 | 0.35±0.15 | 0.5±0.25 | 0.5±0.25 | 0.5±0.25 | 0.61±0.36 | 0.64±0.39 |

These are **finished-part (fired + terminated) outer dimensions** — post-sintering, including the plated termination band — not green/pre-sinter values. The ±tolerances are exactly the [[mlcc-dimensional-tolerance|`Ltol`/`Wtol`]] the simulator models — e.g. 0603 max-footprint build = 1.75 × 0.96 mm. **Thickness T is a per-size letter-coded max** (A=0.33 … 7=3.30 mm), confirming T is the layer-count-dependent dimension, not a tight nominal. KAF FLEXITERM dimensions are identical to KAM per shared size.

## Design envelope
- **Dielectrics:** C0G/NP0, X7R, X7T, **X8R / X8L (150 °C)**, X8G — see [[x8r-x8l-x9r-high-temperature-dielectrics]].
- **Voltage:** 2.5 V – 3000 V (HV 630–3000 V on 1206–2220 only).
- **Capacitance:** to **22 µF** (X7R/X8L at 1210/2220); C0G to 0.1 µF; X8R to 1 µF.
- **BME** (Ni) electrode system throughout.

## FLEXITERM (KAF) — flexure & temperature cycling
Soft/flexible termination (a compliant conductive-polymer layer in the [[soft-termination-mlcc|termination stack]], described only functionally — no layer thicknesses published). AEC-Q200 + VW 80808.
- Board bend (90 mm span, FR4): conventional >2 mm → FLEXITERM **>5 mm** (2–4× improvement); beyond 5 mm fails *open*; >5 mm guaranteed even at +150 °C.
- Temp cycling (−55…+125 °C): **0 % fail / no ESR change to 3000 cycles** (vs AEC-Q200's 1000).

## Gaps
No µm margin / cover / active-dielectric numbers; no FLEXITERM layer thicknesses; no internal electrode count per size (vendor datasheets, not DPA). Full cap-range × voltage grids preserved in `resources/market/avx/*.txt`.

## Cross-references
- [[kyocera-avx]] — manufacturer (also only S-311-P-838 qualified supplier)
- [[mlcc-dimensional-tolerance]] — the L/W/T tolerances tabulated here
- [[case-size-geometry]] — vendor confirmation of nominal dimensions
- [[soft-termination-mlcc]] — FLEXITERM mechanism
- [[aec-q200-rev-e-2023]] — the automotive qualification spec
- [[x8r-x8l-x9r-high-temperature-dielectrics]] — 150 °C dielectrics
- [[mlcc-margin-cover-design-rules]] — automotive margin grade (100–125 µm)

## References
- `resources/market/avx-automotive-kam-kaf-dimensions.md`
- `resources/market/avx/` (raw datasheet PDFs + text)
