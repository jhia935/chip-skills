---
title: "He et al. 2026 — B-site Ca Doping Disrupting Long-Range Order in BaTiO₃ for DC-Bias Stability"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - he-2025-bsite-ca-batio3-pnr.md
tags:
  - paper
status: complete
importance: medium
---

# He et al. 2026 — B-site Ca Doping Induced Long-Range Order Disruption for Enhanced DC-Bias Stability

**Source**: He, Z., Chen, X., Liu, Z., et al. (2026). **Enhanced DC-bias stability and reliability in BaTiO₃ ceramics via B-site Ca doping induced long-range order disruption**. *Microstructures*, **6**, 2026034.
DOI: [10.20517/microstructures.2025.66](https://doi.org/10.20517/microstructures.2025.66)
Open access via OAE Publishing.

## Summary

Demonstrates that **substituting Ca²⁺ at the B-site (Ti) of [[batio3|BaTiO₃]]** — not the A-site, as in the more conventional [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978 Ca substitution]] — disrupts the long-range ferroelectric order. The microstructure becomes a matrix of [[polar-nanoregions-pnr|polar nanoregions (PNRs)]] embedded in a paraelectric matrix. This makes the dielectric **much more stable under DC bias** because the PNRs have lower coherent polarization to suppress than full ferroelectric domains.

## Key Points

- **Sample**: BTC4 = `Ba(Ti₀.₉₆Ca₀.₀₄)O₃` (4 mol% Ca at Ti site).
- **ε_r at room T, 1 kHz**: ~2200 (decent for an X7R-class candidate composition).
- **DC-bias stability coefficient α** (defined as fractional ε_r loss):
  - Undoped BaTiO₃: 60 % at 30 kV/cm (3 V/µm).
  - BTC4: **15 % at 30 kV/cm** — a 4× improvement in DC-bias robustness.
- **Curie temperature shift**: 129 °C (pure BT) → 60 °C (BTC4). The peak is also broadened, not just shifted.
- **Activation energy for IR degradation**: 1.23 eV (BTC4) vs 1.0 eV (BT). Higher E_a → slower [[oxygen-vacancy-migration|V_O migration]] → better [[bme-reliability-model|reliability]].
- **Breakdown strength**: 243.5 kV/cm.
- **Temperature characterization range**: −55 °C to +200 °C.

## Implications

1. The Ca-at-B-site approach is **distinct from** and **additive to** the A-site Ca substitution path of [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe]] and the RE-at-A-site path of [[us-6043974-philips-dy-stabilizer|Philips]] — there is room in the design space to combine all three.
2. The **PNR mechanism** explains the strong DC-bias stability: the size of the polar regions is set by short-range correlations rather than by the macroscopic ferroelectric order, so domain-wall pinning (which is what DC bias does) acts on a much smaller population. See [[ferroelectric-domain-wall]] and [[polar-nanoregions-pnr]].
3. **Trade-off**: Curie T_C drops from 129 → 60 °C, so the X8R / X8L envelope is *harder* to hit with this composition. Good for X5R / X6S / X7R; not for high-T automotive.

## Entities Mentioned

- [[batio3]] — base material

## Concepts Discussed

- [[polar-nanoregions-pnr]] — the new short-range-order microstructure
- [[dc-bias-derating]] — the property being engineered
- [[curie-temperature]] — drops 69 K with 4 mol% Ca-at-B
- [[oxygen-vacancy-migration]] — slowed (higher E_a) by the PNR matrix
- [[bme-reliability-model]] — improved by higher E_a
- [[dopant-site-occupancy-batio3]] — establishes that B-site Ca is a viable design lever

## Notable Quotes

> "Disrupts the long-range ferroelectric order, leading to the formation of polar nanoregions (PNRs) interconnected and embedded within a non-polar matrix."

## References

_Original source: Microstructures, OAE Publishing (open access)._
