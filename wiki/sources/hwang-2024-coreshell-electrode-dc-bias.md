---
title: "ACSAMI 2024 — Core-Shell + Electrode Optimization for DC-Bias Stability"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - hwang-2024-coreshell-electrode-dc-bias.md
tags:
  - paper
status: complete
importance: medium
---

# 2024 ACS Applied Materials & Interfaces — High DC-Bias Stability and Reliability in BaTiO₃ MLCCs: The Role of Core-Shell Structure and the Electrode

**Source**: (2024). **High DC-Bias Stability and Reliability in BaTiO₃-Based Multilayer Ceramic Capacitors: The Role of the Core-Shell Structure and the Electrode**. *ACS Applied Materials & Interfaces*.
DOI: [10.1021/acsami.3c16740](https://pubs.acs.org/doi/10.1021/acsami.3c16740)
PubMed: [38145417](https://pubmed.ncbi.nlm.nih.gov/38145417/)

> [!note] Paywalled article
> Full text not retrieved — extraction from abstract + PubMed indexing summary only.

## Summary

A **two-knob optimization** — dielectric formulation (shell ratio and shell-dopant concentration in [[core-shell-batio3|core-shell BaTiO₃]]) **plus** Ni-electrode optimization — for high DC-bias stability and reliability in commercial-class MLCCs. The paper demonstrates a **finished MLCC** (not just bulk ceramic) hitting **EIA X7S** with a substantial dielectric constant.

## Key Points

- **Bulk ceramic optimum**: ε_r = 1800 at 1 kHz, room T; **−17 % ε_r change at 4 kV/mm** (= 4 V/µm).
- **Finished MLCC**: ε_r = 2300; **−28 % at 4 kV/mm**; passes [[x7r-dielectric|X7S envelope]] (±22 % over −55…+125 °C).
- **Optimization variables**:
  - **Shell ratio**: the fractional volume of paraelectric shell around the ferroelectric core. Larger shell → better DC-bias stability but lower ε_r.
  - **Effective shell doping concentration**: sets where the shell's Curie peak sits and how broad it is.
  - **Electrode**: the second knob — Ni paste formulation affects [[ni-batio3-cosintering-interface|the electrode-dielectric interface]], which affects effective dielectric thickness and field.
- **Reliability**: improved alongside DC-bias stability (the two scale together because both are limited by [[oxygen-vacancy-migration|V_O migration]] in the shell).

## Implications

1. **Cap-vs-stability Pareto curve**: shell engineering trades ε_r for `f_V`. The MLCC reaches **higher ε_r (2300 vs 1800) at the cost of worse `f_V` (−28 % vs −17 %)** — because the MLCC geometry forces a thinner layer with higher field at the same V_DC. This is a quantitative example of the [[case-size-geometry|case-size vs DC-bias trade-off]].
2. The **electrode also matters** — not just the ceramic. The chip-sim simulator's recipe input must include the Ni paste formulation as a first-class parameter, not just dielectric composition.

## Entities Mentioned

- [[batio3]] — base material

## Concepts Discussed

- [[core-shell-batio3]] — central design variable
- [[dc-bias-derating]] — the property being engineered
- [[ni-batio3-cosintering-interface]] — the electrode-side mechanism
- [[ni-electrode-paste-formulation]] — the second knob
- [[oxygen-vacancy-migration]] — reliability mechanism
- [[bme-reliability-model]] — improved alongside bias stability

## References

_Original source: ACS Applied Materials & Interfaces. Paywalled; abstract + PubMed only consulted._
