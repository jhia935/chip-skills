---
title: MLCC Dimensional Tolerance (L / W / T)
type: concept
created: 2026-05-31
updated: 2026-11-10
sources:
  - okuma-2021-mlcc-electrode-nanoct.md
  - avx-automotive-kam-kaf-dimensions.md
  - mil-spec-mlcc-requirements.md
tags:
  - paper
status: complete
importance: medium
---

# MLCC Dimensional Tolerance (L / W / T)

An MLCC's case-size code (0201, 0402, 0805 …) names a **nominal** footprint; the real part ships within a **dimensional tolerance** on each of its three dimensions — length `L`, width `W`, and thickness `T`. The tolerances matter for the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]] because a high-CV part is designed to the **maximum** footprint to capture extra electrode area, and because thickness behaves differently from L/W.

## Governing standards

- **EIA RS-198** ([[eia-rs-198-dielectric-classes]]) — US imperial case codes (0805 = 0.08 × 0.05 in) and tolerances.
- **IEC / EN 60384-1** and the MLCC-specific **-21** (Class 1) / **-22** (Class 2) — metric (JEDEC) dimensions and tolerances.
- **JIS C 5101** — Japanese equivalent.

The case code is the same nominal across vendors; the *tolerance* is a per-series datasheet value and varies (tighter for precision/automotive series, looser for commodity).

## L and W tolerance

Length and width are diced dimensions, set by the print pattern and the dicing-lane position. Real vendor tolerances (from the [[avx-automotive-mlcc-kam-kaf|KYOCERA AVX automotive X7R]] dimension table — **fired, finished-part** values) scale with size and are roughly symmetric (±):

| Case (metric) | nominal L × W (mm) | AVX ± tol (mm) |
|---|---|---|
| 0201 (0603) | 0.6 × 0.3 | L ±0.09 · W ±0.09 |
| 0402 (1005) | 1.0 × 0.5 | L ±0.10 · W ±0.10 |
| 0603 (1608) | 1.6 × 0.81 | L ±0.15 · W ±0.15 |
| 0805 (2012) | 2.01 × 1.25 | L ±0.20 · W ±0.20 |
| 1206 (3216) | 3.2 × 1.6 | L ±0.20 · W ±0.20 |
| 1210 (3225) | 3.2 × 2.5 | L ±0.20 · W ±0.20 |
| 1812 (4532) | 4.5 × 3.2 | L ±0.30 · W ±0.20 |
| 2220 (5750) | 5.7 × 5.0 | L ±0.50 · W ±0.40 |

([[mil-prf-32535-spec|MIL-PRF-32535]] military parts run comparable or slightly tighter, e.g. 0603 = 1.45–1.75 × 0.66–0.97 mm.) A part built to the **max** footprint (nominal + tol) has more electrode overlap → more capacitance. E.g., an 0201 at 0.69 × 0.39 mm vs nominal 0.6 × 0.3 mm carries ~**+50 %** active area, and a 0603 at 1.75 × 0.96 mm vs 1.6 × 0.81 mm ~**+30 %** — part of why real high-CV parts beat a nominal-geometry estimate.

## Thickness (T) tolerance is different

Thickness is the **odd dimension out**, for a structural reason: `L` and `W` are fixed by the cut, but `T` is the *stacked* dimension — it grows with the number of active layers, which is set by the **capacitance target**, not by the case. Consequences:

- **T is application/layer-count-dependent**, so case charts list it as **"thickness max"** rather than a tight nominal ± — "height dimensions aren't provided … because height is application specific, as it depends on the number of layers" (EPCI / distributor size charts).
- The thickness **tolerance is usually looser** than L/W and often one-sided (a max), because layer count and per-layer fired thickness both vary.
- A looser T spec lets a part **stack more layers** (taller chip within the max) → more capacitance. This is the lever the simulator exposes as `Ttol`: the buildable height ceiling shifts with the thickness tolerance.

## Effect on capacitance (and why the simulator exposes all three)

`C ∝ A_active · N / d`. The dimensional tolerances move two of these:

- **L, W tol → A_active**: build to the max footprint for max overlap area.
- **T tol → N (layer count)**: a taller allowed stack fits more layers.

So a vendor maximizing CV uses the **max of all three** tolerances. The chip-sim therefore exposes `Ltol`, `Wtol`, and `Ttol` as inputs (defaulting to datasheet-typical per case): the C_max envelope and the fit-check use the max footprint and the tolerance-shifted height ceiling. See [[case-size-geometry]] and [[dielectric-layer-thickness-floor]].

## In-plane shrinkage caveat

The diced L/W are *fired* dimensions; the *green* print pattern is larger and shrinks in-plane to the fired size (anisotropically — [[okuma-2021-mlcc-electrode-nanoct|Okuma 2021]]). Dimensional tolerance is a spec on the **fired** part; the green pattern and dicing must be designed so the fired chip lands within the tolerance band. See [[electrode-overlap-and-registration]].

## Cross-references

- [[case-size-geometry]] — nominal dimensions, margins, the case table the simulator uses
- [[electrode-overlap-and-registration]] — how the (fired) footprint maps to active area
- [[mlcc-margin-cover-design-rules]] — the margin/cover side of internal geometry
- [[avx-automotive-mlcc-kam-kaf]] — vendor L×W×T dimension tables (source of the tolerances above)
- [[mil-prf-32535-spec]] — military dimensional ranges
- [[dielectric-layer-thickness-floor]] — what limits layer count (and thus thickness)
- [[eia-rs-198-dielectric-classes]] — EIA standard family
- [[capacitance-simulation-from-recipe-and-geometry]] — uses Ltol/Wtol/Ttol
- [[mlcc-capacitance-equation]]

## References

- [[okuma-2021-mlcc-electrode-nanoct]] — fired vs green / in-plane shrinkage
- EIA RS-198, IEC 60384-1/-21/-22, JIS C 5101 (dimensional-tolerance standards)
