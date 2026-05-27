---
title: "Yoon, Kim, Kim 2020 — Tetragonality (c/a) and DC-Bias Characteristics of BaTiO₃ MLCCs"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - yoon-kim-2020-batio3-tetragonality-dc-bias.md
tags:
  - paper
status: complete
importance: high
---

# Yoon, Kim, Kim 2020 — Correlation Between Tetragonality (c/a) and DC-Bias Characteristics of BaTiO₃-Based MLCCs

**Source**: Yoon, S., Kim, M., & Kim, D. (2020). **Correlation between tetragonality (c/a) and direct current (dc) bias characteristics of BaTiO₃-based multi-layer ceramic capacitors (MLCC)**. *Journal of Materials Chemistry C*, **8**, 9373–9381.
DOI: [10.1039/D0TC02067B](https://doi.org/10.1039/D0TC02067B)

## Summary

A direct measurement of how the **[[tetragonality-c-a-ratio|tetragonality]] (the c/a lattice-parameter ratio)** of [[batio3|BaTiO₃]] in finished X7R-class MLCCs **controls DC-bias capacitance performance AND its temperature dependence**. This is the structural-parameter counterpart to the [[dulkin-roth-2020-batio3-curie-shift|Dul'kin & Roth single-crystal Curie-shift]] story: where Dul'kin & Roth measure the field-induced shift, Yoon et al. measure how the **structural state of the dielectric** (its tetragonality, set by sintering and stoichiometry) sets both the zero-bias ε_r AND its bias-degradation behavior across temperature.

**Key insight**: lower tetragonality → larger intrinsic ε_r along the c-axis → larger ε_r under high DC bias (where domains align with c parallel to field). So the recipe knob is **sintering-temperature-controlled grain size + A/B stoichiometry**, both of which set c/a.

## Key Points — sample geometry and composition

- **Model X7R MLCC**: 10 active dielectric layers × **7.7 µm fired thickness** × Ni internal electrodes.
- **Three samples** differing only in sintering temperature → different grain sizes:
  - 0.28 ± 0.1 µm (fine)
  - 0.36 ± 0.1 µm
  - 0.39 ± 0.1 µm (coarse)
- A/B (Ba/Ti) ratio also varied (excess Ba reduces tetragonality at fixed grain size)

## Key Points — central findings

1. **Tetragonality scales with grain size**: smaller grains have lower c/a. Tetragonality also decreases with rising temperature (toward T_C) and with rising A/B ratio.
2. **DC-bias dielectric performance scales INVERSELY with tetragonality**:
   - Fine-grain samples (lower c/a) → **higher ε_r under high DC bias**, across the entire T < T_C range.
   - Coarse-grain samples (higher c/a) → lower ε_r under DC bias.
3. **Temperature trend under bias**:
   - **Fine-grain**: ε_r under high DC bias increases only **slightly** with T (peak broadens because c/a was already low to start with).
   - **Coarse-grain**: ε_r under DC bias increases **systematically** with T (tetragonality dropping toward zero approaches the paraelectric phase).
4. **Mechanism**: Under high DC bias, ferroelectric domains preferentially align with the c-axis parallel to the applied field. The smaller the residual tetragonality, the larger the **intrinsic dielectric response along c** — i.e., the part has more headroom for the field-aligned dielectric response that the bias-aligned state probes.

## Implications for the DC-bias × TCC coupling

The Yoon paper supplies the **structural mechanism** behind the empirical observation that **fine-grain X7R compositions are bias-robust across temperature**:

- Fine grain → low c/a → less ferroelectric distortion → less to "kill" with DC bias → flatter `f_V(V_DC)` curves
- Fine grain → less change in c/a with T → flatter `f_T(T)` shape under bias

This is consistent with the cross-paper convergence in [[empirical-c-t-vdc-academic-measurements]]:
- [[he-2022-dy-ho-batio3-dc-bias|He 2022]]: optimum at ~180 nm Dy-Mg grain
- [[wang-2023-x5r-ni-mlcc-combined-out-field|Wang 2023]]: 150 nm Dy-Ho-coated grain
- [[an-2026-grain-boundary-segregation-dc-bias|An 2026]]: 200–260 nm grain via GB segregation
- **Yoon 2020**: explains *why* — low c/a is the operative structural parameter

## Key Points — Ba/Ti stoichiometry knob

Independent of grain size, **excess Ba (A/B > 1) reduces tetragonality** in the same sample. This is the structural reason why BME-MLCC formulations use **slight Ba excess** rather than stoichiometric Ba/Ti = 1: it tilts the lattice toward lower c/a, improving bias robustness with no other change in chemistry.

## Implications for the chip-sim simulator

A first-class recipe parameter for the chip-sim simulator should be **target tetragonality** (or equivalently, **target grain size at given Ba/Ti**). Both can be derived from the sintering recipe (T_sinter, time, atmosphere, dopant package, A/B ratio). The simulator can then predict:

- Zero-bias `ε_r` from c/a via dielectric-theory scaling (`ε_r ∝ 1/(c-a)/a` near the Curie peak, qualitatively)
- DC-bias `f_V` shape parameters `(E_0, p)` from c/a
- TCC slope `dε_r/dT` from c/a

This is the structural-parameter bridge between the chip-sim's recipe input and the empirical f_T × f_V calibration anchors in [[empirical-c-t-vdc-academic-measurements]].

## Entities Mentioned

- [[batio3]] — host

## Concepts Discussed

- [[tetragonality-c-a-ratio]] — central structural parameter
- [[dc-bias-derating]] — primary effect studied
- [[temperature-coefficient-of-capacitance]] — secondary effect
- [[tcc-dc-bias-interaction]] — the coupling explained at structural level
- [[batio3]] — material
- [[grain-growth-dopant-pinning]] — how grain size is controlled
- [[dopant-site-occupancy-batio3]] — Ba/Ti ratio knob
- [[ferroelectric-domain-wall]] — alignment under bias
- [[nano-grain-batio3-epsilon-r]] — grain-size scaling

## Notable Quotes

> "The reduction of tetragonality increases the intrinsic dielectric constants along the c-axis direction, and thus is a crucial factor for the enhancement of dielectric constant under a high dc-bias field condition."

> "Fine grain samples showed higher dielectric constants than those of coarse grain samples under a high dc-bias field over the entire temperature range below Curie temperature."

## References

_Royal Society of Chemistry — open abstract; full paper paywalled. Search-result summary consulted for body text._
