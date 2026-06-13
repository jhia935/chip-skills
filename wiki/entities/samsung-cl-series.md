---
title: Samsung CL Series MLCC
type: entity
created: 2026-05-19
updated: 2026-06-13
sources:
  - samsung-cl-series-mlcc-ds.md
tags:
  - series
status: complete
importance: high
---

# Samsung CL Series MLCC

The general-purpose MLCC family from [[samsung-electro-mechanics]] — SEMCO's analogue to the [[murata-grm-series]].

## Part-number structure (11 fields)
Example: `CL 10 B 104 K B 8 N N N C`
1. `CL` — Samsung MLCC prefix
2. Size code (e.g., 10 = 0603)
3. TCC code (B = X7R, A = X5R, X = X6S, F = Y5V, C = C0G, P/R/S/T/U = Class I sub-codes)
4. Nominal capacitance (3-digit + multiplier; `R` = decimal point)
5. Capacitance tolerance (A–Z, e.g., K = ±10 %)
6. Rated voltage (R=4.0V, Q=6.3V, P=10V, O=16V, A=25V, L=35V, B=50V, C=100V, D=200V, E=250V, G=500V, H=630V, I=1000V, J=2000V, K=3000V)
7. Thickness option
8. Product / plating method (A = Pd/Ag PME, N = Ni/Cu BME, G = Cu/Cu)
9. Control code (N = normal, P = automotive, L = LICC, A/B = arrays, C = high-Q)
10. Reserved
11. Packaging type

## Size codes
| SEMCO | EIA | Metric | L × W (mm) |
|---|---|---|---|
| 03 | 0201 | 0603 | 0.6 × 0.3 |
| 05 | 0402 | 1005 | 1.0 × 0.5 |
| 10 | 0603 | 1608 | 1.6 × 0.8 |
| 21 | 0805 | 2012 | 2.0 × 1.25 |
| 31 | 1206 | 3216 | 3.2 × 1.6 |
| 32 | 1210 | 3225 | 3.2 × 2.5 |
| 43 | 1812 | 4532 | 4.5 × 3.2 |
| 55 | 2220 | 5750 | 5.7 × 5.0 |

The SEMCO 2-digit internal code is **independent of either EIA or metric notation**. The (vendor-neutral) case-size resolver defaults to **JIS metric** when no suffix is given (`2012` → EIA 0805, `1608` → EIA 0603). Use `Xi` to force EIA (`0805i` → 2.0 × 1.25 mm) or `Xm` to make the metric reading explicit (`0603m` → 0.6 × 0.3 mm). Bare codes that are only valid as EIA (`0805`, `1206`, `1210`, `1812`, `2220`) are **rejected** with a hint. See [[case-size-geometry]] §"Recommended disambiguation".

## Variants in the broader SEMCO catalog
- **Automotive (AEC-Q200)**: same prefix, "P" control code; SEMCO publishes a separate January 2024 automotive catalog.
- **Low Inductance Chip Cap (LICC)**: "L" control code, reverse-geometry / 8-terminal layouts.
- **High Q (RF)**: "C" control code.

## See also
- [[samsung-electro-mechanics]]
- [[samsung-cl-series-mlcc-ds]]
- [[eia-rs-198-dielectric-classes]]
