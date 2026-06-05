---
title: "Liu & Sampson 2011 — NASA GSFC MLCC Construction / DPA Database"
type: source
created: 2026-06-05
updated: 2026-06-05
sources:
  - nasa-gsfc-liu-mlcc-construction-2011.md
tags:
  - paper
status: complete
importance: high
---

# Liu & Sampson 2011 — NASA GSFC MLCC Construction / DPA Database

**Source:** Liu, D. (Donhang) & Sampson, M. J., *Reliability Evaluation of Base-Metal-Electrode Multilayer Ceramic Capacitors for Potential Space Applications*, CARTS USA 2011. [[donhang-liu]] / [[michael-sampson]], [[nasa-nepp|NASA NEPP]] / GSFC Code 562 Parts Analysis Laboratory.
Raw: `resources/literature/nasa-gsfc-liu-mlcc-construction-2011.md`. PDF: [nepp.nasa.gov/files/21703](https://nepp.nasa.gov/files/21703/GSFC_Liu_Sampson_Reliability_Eval_BME_Multilayer_Ceramic.pdf)

## Why this page exists
This is the **measured-DPA layer** of the NASA MLCC database — destructive cross-section of 30 commercial BME + military PME parts, giving per-part **fired dielectric thickness, inner-electrode thickness, active-layer count, cover-plate thickness, and side/end margins**. It is the direct ground-truth check for the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]]'s geometry model and the empirical companion to the design-rule *envelope* in [[mlcc-margin-cover-design-rules]] and [[gsfc-mlcc-space-specs]]. Distinct from [[nasa-nepp-bme-mlcc-reliability]] (the 2013 EEE-Bulletin reliability synthesis).

> [!note] Measurement state — all values are FIRED (post-sintering)
> Every dimension on this page is measured by **destructive physical analysis (cross-section) of the finished, fired part — i.e. after sintering.** They are as-built/fired values, **not** green (pre-sinter) dimensions. Green is larger by the shrinkage factor: in-plane `green = fired/(1−s_xy)` (chip-level s ≈ 12 %), and more in thickness ([[green-tape-shrinkage-anisotropy]]). So this database validates the simulator's **fired** outputs (`d_fired`, fired overlap, fired footprint) — its **green** inputs (`hBT` green, the green print pattern) are not disclosed in any public source and must be back-computed via `s`. The MIL/GSFC specs likewise state dielectric thickness is "measured after firing"; the [[avx-automotive-mlcc-kam-kaf|AVX]] catalog L×W×T are finished-part (fired + terminated) dimensions. See [[electrode-overlap-and-registration]] for the green↔fired bridge.

**ID scheme:** `[mfr][case][X=X7R/C=C0G][cap code][rated V]`; mfr **A/B/C = BME**, **D = PME**. Dielectric thickness with **(electrode thickness)** in parens.

## Table II — construction analysis (30 parts), verbatim
*All dimensions FIRED (post-sinter DPA cross-section).*

| Capacitor ID | Diel. µm (elec.) | # layers | Cover µm | Side margin µm | End margin µm |
|---|---|---|---|---|---|
| A04C33116 | 4.5 (1.8) | 46 | 100 | 100 | 100 |
| A04C33125 | 10.0 (2.2) | 29 | 70 | 140 | 110 |
| A06X47425 | 4.2 (1.3) | 150 | 60 | 125 | 100 |
| A06X10425 | 7.9 (2.5) | 62 | 85 | 160 | 100 |
| A06C10225 | 12.0 (2.2) | 36 | 130 | 175 | 175 |
| A08X22525 | 4.4 (2.0) | 275 | 62 | 135 | 150 |
| **A12X22606** | **2.0 (1.3)** | **750** | 75 | 160 | 140 |
| A12X10616 | 3.5 (1.4) | 300 | 65 | 190 | 150 |
| A12X47425 | 10.5 (2.3) | 75 | 175 | 340 | 220 |
| B04X10406 | 2.5 (1.5) | 70 | 85 | 110 | 110 |
| B04X10416 | 2.0 (2.2) | 65 | 100 | 95 | 95 |
| B04X47325 | 4.0 (2.2) | 49 | 125 | 125 | 110 |
| B04X18325 | 6.2 (1.6) | 33 | 130 | 120 | 120 |
| B06X22425 | 4.2 (1.8) | 120 | 100 | 140 | 120 |
| B08X10525 | 4.6 (1.6) | 150 | 80 | 120 | 120 |
| B08X33425 | 5.8 (1.8) | 110 | 120 | 140 | 115 |
| B12X10606 | 3.5 (1.3) | 250 | 75 | 120 | 115 |
| C04X10410 | 2.6 (1.7) | 77 | 65 | 105 | 90 |
| C04X10416 | 3.4 (1.5) | 80 | 60 | 105 | 95 |
| C04X47325 | 4.4 (1.7) | 60 | 55 | 105 | 90 |
| C04C10250 | 4.0 (1.0) | 77 | 65 | 105 | 100 |
| **C08X10606** | **2.0 (1.2)** | **575** | 75 | 65 | 105 |
| C06X10525 | 3.1 (1.2) | 150 | 75 | 125 | 110 |
| C06C39250 | 3.5 (1.2) | 150 | 75 | 190 | 165 |
| C08X56425 | 4.0 (1.4) | 170 | 80 | 120 | 110 |
| C08X47516 | 2.5 (1.5) | 250 | 110 | 105 | 100 |
| D04X10310 (PME) | 15.1 (2.0) | 22 | 65 | 100 | 120 |
| D06X10405 (PME) | 12.4 (2.2) | 24 | 80 | 120 | 160 |
| D08X10425 (PME) | 20.2 (2.2) | 23 | 120 | 260 | 220 |
| D12X39350 (PME) | 22.5 (2.4) | 22 | 150 | 350 | 350 |

**What it tells the simulator:** BME inner electrodes measure **1.2–2.5 µm** fired; dielectric **2.0–12 µm**; layer count up to **750** (A12X22606, 22 µF/6.3 V/1206); margins **65–340 µm**; cover **55–175 µm**. EDX: BME electrodes pure Ni, PME Pd/Ag. BME volumetric efficiency ~**27×** the same-case PME.

## Microstructure & the grain-stacking rule
Tables IV/V (+ [CARTS 2012](https://nepp.nasa.gov/files/24291/carts2012_liu_batio3.pdf) Table II): BME grain **0.31–0.47 µm**, PME **0.61–0.77 µm**. The reliability-controlling quantity is **# stacked grains per layer = d/grain ≈ 11–12 for 25 V BME**, roughly independent of thickness — feeding the [[bme-reliability-model|`φ = (1−(r̄/d)^α)^N` structural factor]].

| ID | electrode | d µm | grain µm | grains/layer |
|---|---|---|---|---|
| A08X22525 | BME | 3.5 | 0.31 | 11.3 (all shorted in HALT) |
| B06X22425 | BME | 4.2 | 0.34 | 12.4 |
| C06X10525 | BME | 3.1 | 0.44 | 7.1 |
| A06X10425 | BME | 7.6 | 0.47 | 16.2 |
| D08X10425 | PME | 20.2 | 0.61 | 33.1 (no HALT failures) |

## Richest single record (full construction + reliability)
[CARTS 2013 Failure Analysis](https://nepp.nasa.gov/files/24303/CARTS2013_Liu_FailureAnalysis.pdf) Table I — **B08X56416** (0.56 µF/16 V/0805 BME): end margin 170, side margin 100, cover **365 µm**, **N=82**, d=4.2 µm, grain 0.36/0.40 µm, grain-stacking 11.67, `R=(1−(r̄/d)^6)^N = 99.994%`.

## Contradictions (reproduced as printed)
> [!warning] Cross-paper inconsistencies
> - A06X10425 dielectric: **7.6 µm** (2011/2012) vs **7.9 µm** (2011 Table II) vs **7.89 µm** (2013 HALST).
> - D06X10405 grain: **0.68 µm** (Table IV) vs **0.77 µm** (Table V).

## Gaps
No chip outer L×W×H (only EIA codes) — filled from vendor data in [[avx-automotive-mlcc-kam-kaf]] / [[mil-prf-32535-spec]]. Inner-electrode thickness only as the Table II parentheticals.

## Entities & concepts
- [[donhang-liu]], [[michael-sampson]], [[nasa-nepp]]
- [[case-size-geometry]], [[mlcc-margin-cover-design-rules]], [[electrode-overlap-and-registration]]
- [[dielectric-layer-thickness-floor]], [[bme-reliability-model]], [[bme-vs-pme]]
- [[mlcc-dimensional-tolerance]], [[mlcc-capacitance-equation]]

## References
- Raw: `resources/literature/nasa-gsfc-liu-mlcc-construction-2011.md`
- [[nasa-nepp-bme-mlcc-reliability]] — 2013 EEE-Bulletin reliability synthesis (companion)
- [[gsfc-mlcc-space-specs]] — the design-rule envelope these parts are measured against
