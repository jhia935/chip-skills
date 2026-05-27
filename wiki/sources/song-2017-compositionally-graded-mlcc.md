---
title: "Song et al. 2017 — Compositionally Graded Multilayer Ceramic Capacitors"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - song-2017-compositionally-graded-mlcc.md
tags:
  - paper
status: complete
importance: high
---

# Song et al. 2017 — Compositionally Graded Multilayer Ceramic Capacitors

**Source**: Song, H.-C., Zhou, J. E., Maurya, D., Yan, Y., Wang, Y. U., & Priya, S. (2017). **Compositionally Graded Multilayer Ceramic Capacitors**. *Scientific Reports*, **7**, 12353.
DOI: [10.1038/s41598-017-12402-7](https://doi.org/10.1038/s41598-017-12402-7)
PMC: [PMC5617893](https://pmc.ncbi.nlm.nih.gov/articles/PMC5617893/)

## Summary

A demonstration MLCC with **deliberately graded composition** across its 48 active dielectric layers — eight variants of `0.975BaTi₁₋ₓSnₓO₃ – 0.025Ba(Cu₁/₃Nb₂/₃)O₃` (BTS-BCN) with Sn fraction from x = 0.01 to x = 0.08, stacked two layers per composition × three repeats. The grading **broadens the Curie peak across the operating range** by stacking sub-layers with different T_C values, and the internal compositional discontinuities **generate a built-in DC bias field** that enhances [[dielectric-tunability]].

This is one of the few academic papers that **explicitly measures dielectric response across both T and V_DC for the same MLCC structure**, making it a calibration touchstone for [[tcc-dc-bias-interaction|the TCC × DC-bias multiplicative model]].

## Key Points

- **Temperature range**: −55 °C to +125 °C (covers the X-letter EIA window).
- **DC-bias field range**: 0 to 200 V (≈ 0 to 50 kV/cm given the 40 µm layer thickness).
- **Frequency range**: 1 kHz to 50 kHz (capacitance reported at 1 kHz for the main figures).
- **Active geometry**: 16 mm² electrode area (4 mm × 4 mm), ~40 µm dielectric layer, ~3 µm Ni electrode, 48 active layers.
- **Maximum capacitance at zero bias**: ~348 nF at 25 °C, 1 kHz.
- **Maximum tunability**: ~70 % at room temperature and 200 V DC bias (= 50 kV/cm).
- **Loss**: tan δ < 2.5 % across −55…+125 °C, < 1 % at room temperature with zero bias.
- **Tunability definition used**:
  $$
  \text{Tunability (\%)} = \frac{C_{E=0} - C_E}{C_{E=0}} \times 100
  $$
- **Mechanism for enhanced tunability**: compositional grading creates non-zero internal bias even at V_DC = 0, raising the small-signal slope `dε/dE`.

## Why this paper matters for the chip-sim simulator

Most published DC-bias-derating curves are measured **at room temperature only**. Most published TCC curves are measured **at zero bias only**. Song 2017 is a rare case where the SAME MLCC has been characterized across the full T × V_DC operating envelope, and figures 4(a) (C(T) at multiple bias) and 4(d) (C(V_DC) at multiple T) together act as a 2D map.

Concretely, for the chip-sim [[capacitance-simulation-from-recipe-and-geometry|three-tier simulator]]:
- Tier 2 (separable multiplicative `f_T(T) × f_V(V_DC)`) can be calibrated against this 2D map for the BTS-BCN composition class.
- The paper's graded architecture is **special** — its Curie peak is broadened by composition rather than by core-shell formation — so its `f_T × f_V` shape differs from a typical [[core-shell-batio3]] X7R. The simulator should NOT use Song 2017 calibration parameters for non-graded parts.

## Entities Mentioned

- [[shashank-priya]] — last author (Penn State, then Virginia Tech)
- [[penn-state]] — institution
- [[batio3]] — base composition family
- [[virginia-tech]] — second-author affiliation

## Concepts Discussed

- [[dielectric-tunability]] — 70 % at 50 kV/cm, room T
- [[curie-temperature]] — engineered shift via Sn substitution
- [[temperature-coefficient-of-capacitance]] — peak broadening via compositional grading
- [[dc-bias-derating]] — the basic mechanism the paper exploits
- [[tcc-dc-bias-interaction]] — implicit 2D characterization

## Notable Quotes

> "The compositional grading resulted in generation of internal bias field which enhanced the tunability due to increased nonlinearity."

> "Enhanced dielectric tunability (70 %) along with small dielectric losses (<2.5 %) over the required temperature ranges."

## References

_Original source: Scientific Reports (open access)._
