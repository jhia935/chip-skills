---
title: Rayleigh Analysis (Dielectric Nonlinearity)
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - fujii-trolier-mckinstry-2023-batio3-nonlinearity.md
tags:
  - paper
status: draft
importance: medium
---

# Rayleigh Analysis

A measurement method that **decomposes the AC dielectric response into reversible and irreversible contributions** by sweeping the AC field amplitude at fixed frequency. Standard tool in [[ferroelectric-domain-wall|ferroelectric domain-wall physics]] and increasingly used to characterize [[batio3|BaTiO₃]] MLCCs.

## Pseudo-Rayleigh form

For ferroelectric ceramics, the dielectric permittivity scales **linearly** with AC field amplitude up to the sub-coercive regime:

$$
\varepsilon'(E_\text{AC}) = \varepsilon'_\text{init} + \alpha' E_{\text{AC},0-\text{pk}}
$$

- `ε'_init` — reversible contribution (intrinsic ionic + electronic + reversible domain-wall vibration). Independent of E_AC at small signal.
- `α'` — irreversible Rayleigh coefficient. Slope of ε' vs E_AC. Comes entirely from **irreversible domain-wall motion** — the wall jumps past pinning sites.

## Why this matters for the MLCC design rules

The irreversible α' is the part of ε_r that **DC bias suppresses by pinning the walls**. Decomposing measured ε_r into ε'_init + α' tells you:

1. How much of your zero-bias capacitance is "soft" (will fade under DC bias) vs "hard" (won't).
2. How temperature affects each component independently — the basis for understanding [[tcc-dc-bias-interaction]].

[[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii & Trolier-McKinstry 2023]] showed that α' collapses above the [[curie-temperature]] (paraelectric phase, no domains to move) and that **formulated X7R-class BaTiO₃ has its α' substantially suppressed** versus pure BT — exactly because the Dy + Mg + Mn dopant package pins the walls.

## Limits of the linear form

The Rayleigh law is empirical and applies for `E_AC < E_coercive / ~3`. Beyond that, ε'(E_AC) becomes nonlinear and a higher-order expansion is needed. For typical MLCC small-signal characterization at 1 V rms / 1 kHz, the Rayleigh regime is comfortably valid.

## Cross-references

- [[ferroelectric-domain-wall]] — the object Rayleigh analysis quantifies
- [[temperature-coefficient-of-capacitance]] — Rayleigh tells you which of ε_r's components carries the T dependence
- [[dc-bias-derating]] — Rayleigh tells you which component DC bias kills
- [[tcc-dc-bias-interaction]] — Rayleigh's separation of ε'_init from α' is the microscopic basis of the multiplicative model

## References

- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] — temperature-resolved Rayleigh study on BaTiO₃ ceramics and model MLCCs
