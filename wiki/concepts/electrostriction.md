---
title: Electrostriction
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - covaci-gontean-2022-singing-mlcc.md
status: draft
importance: medium
---

# Electrostriction

A **quadratic** mechanical strain response to an applied electric field: `s = M · E²`. Universal — present in every dielectric — but typically tiny except in materials with high polarizability. In [[batio3|BaTiO₃]]-based MLCCs, the electrostriction coefficient `M_33` is large enough that the AC-driven mechanical strain is **audible** ([[covaci-gontean-2022-singing-mlcc|"singing capacitors"]]) and **modulates the measured small-signal capacitance** through strain feedback into ε_r.

## Distinction from piezoelectricity

Both effects couple electric field to mechanical strain, but:

| Property | [[piezoelectricity-batio3|Piezoelectricity]] | Electrostriction |
|---|---|---|
| Field dependence | Linear (`s = d · E`) | Quadratic (`s = M · E²`) |
| Symmetry requirement | Non-centrosymmetric (needs broken symmetry) | Universal (all materials) |
| Active in paraelectric phase | No | Yes |
| Active above T_C | No | Yes |
| Sign | Can be either | Always same sign as E² |
| Magnitude in BaTiO₃ MLCC | Large below T_C | Comparable, smaller |

For a combined `E(t) = E_DC + E_AC sin(ωt)` excitation:
- **Piezo** produces strain at `ω` proportional to `d · E_AC`
- **Electrostriction** produces strain at `ω` proportional to `2 · M · E_DC · E_AC` (fundamental, only with non-zero DC bias)
- **Electrostriction** also produces strain at `2ω` proportional to `M · E_AC²/2` (second-harmonic)

This second-harmonic strain at 2ω is the audible 2 kHz tone when a 1 kHz AC excites an MLCC even at zero DC bias.

## Relevance to AC voltage coefficient

The strain feedback `Δε_r = (dε_r/ds) · s` modulates the measured small-signal capacitance. Since `s = M·E²` is quadratic, the **AC contribution to ε_r is quadratic in E_AC** — a non-trivial extra term beyond the [[rayleigh-analysis|linear Rayleigh α'·E_AC]] from domain-wall motion.

This is one of three contributing mechanisms to the [[ac-voltage-coefficient-mlcc|MLCC AC voltage coefficient]] (alongside Rayleigh nonlinearity and bell-shaped-C(V) integration).

## Cross-references

- [[piezoelectricity-batio3]] — the linear counterpart
- [[covaci-gontean-2022-singing-mlcc]] — primary source
- [[ac-voltage-coefficient-mlcc]] — where this contributes
- [[mlcc-acoustic-noise]] — the visible manifestation
- [[soft-termination-mlcc]] — hardware mitigation
- [[batio3]]

## References

- [[covaci-gontean-2022-singing-mlcc]]
