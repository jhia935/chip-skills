---
title: "NASA / Liu — A General Reliability Model for Ni-BaTiO₃ MLCCs (CARTS 2014)"
type: source
created: 2026-05-19
updated: 2026-05-19
sources:
  - resources/literature/nasa-general-reliability-model-ni-batio3.md
tags:
  - paper
status: complete
importance: high
---

# NASA / Liu — A General Reliability Model for Ni-BaTiO₃ MLCCs (CARTS 2014)

**Source:** `resources/literature/nasa-general-reliability-model-ni-batio3.md` (PDF: `resources/literature/pdf/nasa-general-reliability-model-ni-batio3.pdf`)
**Author:** Donhang (David) Liu ([[donhang-liu]]), AS and D Inc., for NASA Goddard
**Venue:** CARTS, Santa Clara CA, April 1–3 2014

## Summary

A consolidation paper that re-presents the three-factor reliability framework from [[nasa-nepp-bme-mlcc-reliability]] and [[nasa-batio3-mlcc-failure-mechanisms]] in a single, unified form, with one critical new addition: **direct quantitative evidence for the breakdown of single-mode Prokopowicz-Vaskas** on BME parts.

Table V reports the single-mode P-V fit to a specific sample (C08X47516, an 0805 X7 47nF):
- Fitted **n = 4.524** (the voltage acceleration exponent)
- Fitted **E_a = 2.60 eV** (the activation energy)
- Predicted MTTF @ 135 °C / 72 V: **2111 hours**
- Actually measured MTTF: **318 hours** — **6.6× shorter** than P-V predicts

Liu uses this as the empirical justification for the two-mode (catastrophic + slow degradation) acceleration model: when individual TTF data are separated by failure mode (using leakage-current curves to classify catastrophic vs slow), each subset fits its own acceleration function — catastrophic to a power law, slow degradation to an exponential — and the combined model reproduces the measured lifetime.

## Table III: 24 commercial MLCCs with fully disclosed geometry

The single most valuable extraction from this paper for the [[capacitance-simulation-from-recipe-and-geometry|chip-sim simulator]]: Table III lists **24 commercial Ni-BaTiO₃ MLCCs with full disclosed (d_fired, N_a, grain size)** — a rarity in the literature. Vendors are anonymized as **A / B / C / P**, but the part metadata in the CAP ID (`<mfr><case><class><cap_code><V>`) gives the case, class, capacitance and voltage rating.

| CAP ID | Case | C | V | grain (µm) | d_fired (µm) | N_a | 1000-h HALT |
|---|---|---|---|---|---|---|---|
| A08X22525 | 0805 | 2.2 µF | 25 V | 0.305 | 3.89  | 211 | fail |
| B08X33425 | 0805 | 330 nF | 25 V | 0.420 | 5.80  | 74  | pass |
| A08X15425 | 0805 | 150 nF | 25 V | 0.460 | 9.80  | 43  | pass |
| C06X10525 | 0603 | 1.0 µF | 25 V | 0.440 | 3.20  | 150 | fail |
| A06X10425 | 0603 | 100 nF | 25 V | 0.470 | 7.89  | 62  | pass |
| A12X47425 | 1206 | 470 nF | 25 V | 0.492 | 10.40 | 58  | pass |
| C04X47325 | 0402 | 47 nF  | 25 V | 0.386 | 4.40  | 60  | fail |
| B12X47525 | 1206 | 4.7 µF | 25 V | 0.376 | 4.34  | 260 | fail |
| P08X10425 | 0805 | 100 nF | 25 V | 0.790 | 20.20 | 23  | pass |
| B06X10516 | 0603 | 1.0 µF | 16 V | 0.273 | 2.29  | 179 | fail |
| A08X47416 | 0805 | 470 nF | 16 V | 0.319 | 3.75  | 208 | fail |
| B12X68416 | 1206 | 680 nF | 16 V | 0.375 | 6.21  | 64  | pass |
| C08X22516 | 0805 | 2.2 µF | 16 V | 0.224 | 3.81  | 212 | pass |
| B08X22516 | 0805 | 2.2 µF | 16 V | 0.340 | 3.23  | 230 | fail |
| B08X56416 | 0805 | 560 nF | 16 V | 0.373 | 4.21  | 80  | pass |
| C08X47516 | 0805 | 4.7 µF | 16 V | 0.230 | 2.49  | 260 | pass |
| B12X10516 | 1206 | 1.0 µF | 16 V | 0.475 | 7.82  | 99  | pass |
| B04X10416 | 0402 | 100 nF | 16 V | 0.342 | 3.05  | 67  | fail |
| B12X10606 | 1206 | 10 µF  | 6.3 V| 0.365 | 3.11  | 348 | fail |
| B04X10406 | 0402 | 100 nF | 6.3 V| 0.323 | 2.50  | 70  | fail |
| B08X22506 | 0805 | 2.2 µF | 6.3 V| 0.419 | 3.42  | 230 | fail |
| A08X10406 | 0805 | 100 nF | 6.3 V| 0.490 | 12.50 | 34  | pass |
| B06X22406 | 0603 | 220 nF | 6.3 V| 0.373 | 4.01  | 67  | pass |
| P06X10405 | 0603 | 100 nF | 50 V | 0.770 | 12.60 | 24  | pass |

CAP ID decode: letter = manufacturer (A/B/C/P), 2-digit = EIA case (04 = 0402, 06 = 0603, 08 = 0805, 12 = 1206), X = X7R, 3-digit = EIA cap code (e.g., 225 = 22 × 10⁵ pF = 2.2 µF), 2-digit suffix = rated voltage (06 = 6.3 V, 16 = 16 V, 25 = 25 V, 05 = 50 V).

### Vendor patterns

- **Mfr A**: thicker dielectric per V (good HALT margin, less aggressive design). Mostly pass.
- **Mfr B**: thinner dielectric + higher N_a (more aggressive CV stacking). Mostly fail HALT under accelerated stress.
- **Mfr C**: extreme thin dielectric (2.2-3.8 µm) + finest grain (0.22-0.44 µm). Mixed pass/fail.
- **Mfr P**: thick dielectric + low N_a + coarse grain. All pass. Conservative design philosophy.

### Predictive accuracy

Chip-sim's compute() forward-predicts these 24 parts with **geomean ratio 0.91× and σ(ln ratio) = 0.45** when fed the disclosed (d_fired, N_a) — i.e. the ε_r = 3000 X7R default is well-centered, with ~57 % 1σ spread reflecting real vendor-to-vendor ε_r variation. See `simulator/known_parts.cjs` for the per-part breakdown.

The two largest outliers are Mfr P (predicted ~0.33× of rated; suggests Mfr P uses ε_r ≈ 1000, characteristic of legacy / non-thin-layer dielectric or PME-style composition) and one Mfr B sample (A08X47416) that predicts 3.4× over rated — possibly a transcription error in the original table (the disclosed d_fired × N_a implies a part 3× larger than 470 nF).

## Quantitative anchors for the simulator

| Parameter | Value | Source |
|---|---|---|
| BME single-mode P-V `n` | 4.524 (one sample, but consistent with 2.5–6 lit range) | Liu 2014 Table V |
| BME P-V activation energy `E_a` | 2.60 eV (this sample) | Liu 2014 Table V |
| Discrepancy: P-V prediction vs measurement | **6.6× over-prediction** at 135 °C / 72 V | Liu 2014 |
| α (structural exponent) | 6 for V ≤ 50 V, 5 for V > 50 V | Liu 2014 Eq. 11 (= same as 2013) |
| Commercial BME typical N | > 250 layers | Liu 2014 |

This is the **closest answer we have for the simulator's open gap on BME catastrophic `n`**: ~3 for PME, ~4.5 for BME single-mode fits, **but use the two-mode model** if you actually care about predicted lifetime.

## Cross-reference notes
The N-amplifier 5-year reliability table (Ri vs N) is reproduced verbatim here from [[nasa-batio3-mlcc-failure-mechanisms]]. Equations (5)–(12) are the same as in [[nasa-nepp-bme-mlcc-reliability]].

## Concepts discussed
- [[bme-reliability-model]]
- [[mlcc-capacitance-equation]]
- [[bme-vs-pme]]
- [[core-shell-batio3]]
- [[capacitance-simulation-from-recipe-and-geometry]] — uses Table III as calibration anchors
- [[layer-thickness-and-metal-ceramic-ratio]] — Table III spans 2.29–20.20 µm dielectric range

## Entities mentioned
- [[donhang-liu]]
- [[nasa-nepp]]

## References
_Original source: `resources/literature/nasa-general-reliability-model-ni-batio3.md`_
