---
title: "KYOCERA — Road to Thinner MLCCs + 0201 10 µF (2023)"
type: source
created: 2026-05-29
updated: 2026-05-29
sources:
  - kyocera-thin-mlcc-roadmap.md
tags:
  - reference
status: complete
importance: medium
---

# KYOCERA — The Road to Thinner MLCCs + EIA 0201 10 µF

**Source**: KYOCERA Electronic Components technical articles + 2023 press release.
- ["The Road to Thinner MLCCs and New Product Development"](https://ele.kyocera.com/en/technical/cap_devstory/)
- ["EIA 0201 Size MLCCs with the Industry's Highest Capacitance of 10 µF"](https://ele.kyocera.com/en/technical/cap_0603jis10uf/)
- [Press release (Sep 2023)](https://global.kyocera.com/newsroom/news/2023/000715.html)

## Summary

KYOCERA's account of pushing MLCC dielectric and electrode layers thinner, culminating in a **2023 EIA 0201 (0.6 × 0.3 mm) part with 10 µF** — the industry's highest capacitance at that size, roughly 2× the prior record. Useful as a *bleeding-edge frontier* data point for the [[dielectric-layer-thickness-floor|dielectric thickness floor]] and the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]] envelope.

## Key disclosed figures

| Parameter | Value |
|---|---|
| Case | EIA 0201 (0.6 × 0.3 mm; metric/JIS 0603) |
| Capacitance | **10 µF** |
| Rated voltage | **4.0 V** (low V is what buys the thin-dielectric headroom) |
| Temperature char. | X5R (−55…+85 °C, ±15 %) |
| Internal electrode thickness | **0.45 µm** |
| Electrode coverage | raised from "80 % range to 90 % range" at the same thickness ratio |
| DF | 10 % max |

The dielectric thickness and layer count are **not disclosed** (proprietary), but the construction implies **d ≈ 0.2–0.25 µm** dielectric + a high-ε_r (~5000) composition to reach 10 µF in 0.054 mm³ — beyond what conventional tape casting reaches in mainstream production.

## Why it matters

1. **Sets the absolute frontier** for the [[dielectric-layer-thickness-floor]]: ~0.2–0.25 µm fired dielectric is the 2023 bleeding edge, not the mainstream (~0.4–0.5 µm). It does NOT support sub-0.2 µm.
2. **Electrode continuity is the real wall**: KYOCERA frames the thin-layer problem as electrode coverage/continuity (0.45 µm Ni at > 90 % coverage), echoing [[polotai-2007-cr-doping-ni-electrode-mlcc|Polotai 2007]] and [[ni-batio3-cosintering-interface]] — as layers thin, electrode unevenness, coarse particles, and defects dominate shorts.
3. **Calibration anchor**: in the chip-sim, a default-ε_r X5R envelope for 0201/4 V is ~5.8 µF; KYOCERA's 10 µF correctly sits *above* it (needs the special high-ε_r composition), flagging it as a record rather than a routine design.

## Entities Mentioned

- [[kyocera-avx]] — manufacturer
- [[batio3]] — dielectric

## Concepts Discussed

- [[dielectric-layer-thickness-floor]] — frontier data point
- [[layer-thickness-and-metal-ceramic-ratio]] — 0.45 µm electrode benchmark
- [[ni-batio3-cosintering-interface]] — electrode-continuity limit
- [[capacitance-simulation-from-recipe-and-geometry]] — envelope calibration

## Notable Quotes

> "Making the dielectric layer thinner reduced the continuity of internal electrodes … as layers became thinner, unevenness in internal electrodes, coarse particles, impurities, and defects became larger, leading to increased short circuits and reduced reliability."

> Internal electrode thickness 0.45 µm; coverage raised from the 80 % range to the 90 % range.

## References

_KYOCERA technical articles + press release, publicly accessible._
