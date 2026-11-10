---
title: Dielectric Tunability
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - song-2017-compositionally-graded-mlcc.md
tags:
  - paper
status: draft
importance: low
---

# Dielectric Tunability

The **fractional decrease in dielectric permittivity (or capacitance) under an applied DC bias field** — the same physical phenomenon as [[dc-bias-derating]], but with the sign convention flipped and the design intent reversed. For MLCC engineers it's a problem (effective capacitance loss). For tunable-device engineers (varactors, phase shifters, tunable filters) it's the entire raison d'être.

$$
\eta(\%) = \frac{\varepsilon_r(0) - \varepsilon_r(E)}{\varepsilon_r(0)} \times 100
$$

Same as `(1 − f_V) × 100` in the chip-sim's notation.

## Where it matters in the academic MLCC literature

Papers on **[[relaxor-ferroelectric|relaxor]] and BST (Ba₁₋ₓSrₓTiO₃) compositions** routinely report tunability as a positive figure of merit. The numbers can be massive: [[song-2017-compositionally-graded-mlcc|Song et al. 2017]] reported **70 % tunability** at 200 V (50 kV/cm) in a graded BTS-BCN MLCC. Translated to MLCC-engineer language: "this composition loses 70 % of its capacitance at 50 V/µm."

So when reading an MLCC paper that brags about high tunability, recognize it as **the opposite design goal** from a Class II decoupling capacitor.

## Cross-references

- [[dc-bias-derating]] — the same effect, opposite sign convention
- [[batio3]] — the host
- [[curie-temperature]] — tunability peaks near T_C where the dielectric is "softest"
- [[song-2017-compositionally-graded-mlcc]] — uses compositional grading to enhance tunability for tunable-device applications
- [[relaxor-ferroelectric]] — material class with high tunability

## References

- [[song-2017-compositionally-graded-mlcc]]
