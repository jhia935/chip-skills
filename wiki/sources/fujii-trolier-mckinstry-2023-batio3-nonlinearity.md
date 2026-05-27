---
title: "Fujii & Trolier-McKinstry 2023 — Temperature Dependence of Dielectric Nonlinearity in BaTiO₃"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - fujii-trolier-mckinstry-2023-batio3-nonlinearity.md
tags:
  - paper
status: complete
importance: high
---

# Fujii & Trolier-McKinstry 2023 — Temperature Dependence of Dielectric Nonlinearity in BaTiO₃ Ceramics

**Source**: Fujii, I. & Trolier-McKinstry, S. (2023). **Temperature dependence of dielectric nonlinearity of BaTiO₃ ceramics**. *Microstructures*, **3**, 2023045.
DOI: [10.20517/microstructures.2023.43](https://doi.org/10.20517/microstructures.2023.43)
Open access via OAE Publishing.

## Summary

The cleanest published academic decomposition of how the **[[ferroelectric-domain-wall|domain-wall contribution to ε_r]] varies with temperature** in pure and formulated [[batio3|BaTiO₃]]. The authors apply a [[rayleigh-analysis|pseudo-Rayleigh analysis]] — fitting ε'(E_AC) to a linear-plus-irreversible model — to disentangle:

- **ε'_init** — the reversible (intrinsic + reversible-wall) contribution; what shows up at low AC field
- **α'** — the irreversible Rayleigh coefficient; the slope of ε' vs E_AC; entirely from irreversible domain-wall motion (extrinsic)

This decomposition over a wide temperature range (−180 to +150 °C) is exactly what the chip-sim's [[tcc-dc-bias-interaction|TCC × DC-bias coupling model]] needs to predict where the multiplicative model breaks down.

## Key Points

- **Pseudo-Rayleigh form**:
  $$
  \varepsilon'(E_\text{AC}) = \varepsilon'_\text{init} + \alpha' E_{\text{AC},0-\text{pk}}
  $$
- **Temperature range**: −180 °C → +150 °C on cooling (covers the entire Class II EIA envelope and beyond).
- **AC field amplitudes**: up to 4 kV/cm for undoped ceramic; 12–15 kV/cm for model MLCCs.
- **Above the Curie temperature** (~125 °C): "very limited dependence on the amplitude of the ac electric field" — i.e., **α' → 0** in the paraelectric phase. The nonlinearity that drives DC-bias derating IS the ferroelectric domain-wall population.
- **Below T_C**: large mobile domain-wall population produces significant α'. **DC bias suppresses α'** by pinning the walls.
- **Grain size effect**: fine-grained materials (1.2 µm) suppress extrinsic α' relative to coarse-grained (76 µm) — same grain-size mechanism as [[nano-grain-batio3-epsilon-r]].
- **Formulated BaTiO₃ ceramics** (with the standard X7R RE + Mg + Mn dopant package) **substantially suppress irreversible contributions** — the engineered core-shell microstructure pins domain walls.

## Implications for TCC × DC-bias coupling

This paper supplies the **microscopic basis** for the [[tcc-dc-bias-interaction|separability claim]]:

1. The intrinsic (paraelectric, soft-mode) contribution to ε_r depends on T but **not** on E_AC or E_DC (in the small-signal limit) — this gives `f_T`.
2. The irreversible domain-wall contribution depends on both T (collapses above T_C) and on E_DC (collapses at high bias). When this contribution is **small** (formulated dielectrics, fine grains, above T_C), the multiplicative model `f_T × f_V` works well.
3. When this contribution is **large** (pure BaTiO₃ near T_C, coarse grains, low-doped commercial Y5V), `f_T × f_V` under-predicts loss because both factors act on the same domain-wall population.

This explains the empirical observation in [[epci-high-cv-mlcc-bias-aging|EPCI 2024]] that the multiplicative model is more accurate for fine-grain, well-doped X5R/X7R than for legacy Y5V.

## Entities Mentioned

- [[ichiro-fujii]] — first author
- [[susan-trolier-mckinstry]] — senior author, Penn State; major name in ferroelectric thin films
- [[penn-state]] — institution
- [[batio3]] — material

## Concepts Discussed

- [[ferroelectric-domain-wall]] — the central object whose mobility this paper measures
- [[rayleigh-analysis]] — the decomposition method
- [[curie-temperature]] — the boundary above which α' vanishes
- [[temperature-coefficient-of-capacitance]] — the field-zero counterpart of this work
- [[dc-bias-derating]] — the field-nonzero counterpart of this work
- [[core-shell-batio3]] — engineered suppression of α'
- [[tcc-dc-bias-interaction]] — the integrated model this paper supports

## Notable Quotes

> "Above the Curie temperature, the dielectric permittivity shows very limited dependence on the amplitude of the ac electric field."

> "Irreversible contributions to the permittivity were substantially suppressed."

## References

_Original source: Microstructures, OAE Publishing (open access)._
