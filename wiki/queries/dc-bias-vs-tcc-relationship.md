---
title: "How does DC-bias capacitance derating and TCC capacitance derating relate?"
type: query
created: 2026-05-27
updated: 2026-05-27
sources:
  - epci-high-cv-mlcc-bias-aging.md
  - vishay-x7r-cap-drift-dc-bias.md
  - psma-ceramic-capacitor-basics.md
tags:
  - paper
status: complete
importance: medium
---

# How does DC-bias capacitance derating and TCC capacitance derating relate?

They are **two of the four multiplicative derating factors** that together set the actual capacitance an MLCC delivers in a circuit. The standard industry formula ([[epci-high-cv-mlcc-bias-aging|Zednicek 2019]]) is:

$$
C_\text{actual} \;=\; C_\text{rated} \;\cdot\; f_T(T) \;\cdot\; f_V(V_\text{DC}) \;\cdot\; f_\text{AC}(V_\text{AC}) \;\cdot\; f_\text{age}(t)
$$

The relationship is **multiplicative and (at first order) separable**. The detailed synthesis is in [[tcc-dc-bias-interaction]].

## What each side captures

| | [[temperature-coefficient-of-capacitance]] (TCC) | [[dc-bias-derating]] (VCC) |
|---|---|---|
| What changes ε_r | Lattice expansion + [[curie-temperature\|BaTiO₃ Curie peak]] shift with T | [[ferroelectric-domain-wall\|Ferroelectric domain pinning]] by DC field |
| Independent variable | Temperature (°C) | **Field** `E = V_DC / d_fired`, not just voltage |
| Class I (C0G) | Small linear `ppm/°C` | ≈ 0 (paraelectric — no domains) |
| Class II (X7R/X5R) | [[eia-rs-198-dielectric-classes\|EIA letter envelope]] (e.g., ±15 % over rated range) | Sigmoid `f_V = 1 / (1 + (E/E₀)^p)` |
| Reversibility | Reversible | Reversible (distinct from [[dc-bias-aging]] which is slow) |

## Why the multiplicative model approximately works

The two effects come from **largely independent physical mechanisms**:
- TCC ← temperature dependence of ε_r in [[batio3]] (Curie peak, lattice expansion, soft-mode shift)
- DC-bias derating ← field-driven [[ferroelectric-domain-wall|domain pinning]]

An EPCI 2024 measurement of a 1 µF 0603 X5R across −5 to +70 °C showed that **the normalized bias-derating curves track tightly across temperature** — i.e. `f_V(V_DC)` is approximately T-independent over the working range. So `f_T × f_V` captures the dominant behavior for typical X5R/X7R parts within **±5–10 %**.

## Where the coupling becomes significant

Per [[tcc-dc-bias-interaction]]:

1. **Near the Curie temperature** — for compositions engineered with T_C inside the operating range (high-CV X5R/X7R and especially Y5V), DC bias both suppresses residual polarization (extra `f_V` loss) and **broadens/shifts the Curie peak** (changes `f_T(T)` shape). Multiplicative model under-predicts loss by 5–15 %.
2. **Strong DC bias** (`E > 5 V/µm` for X7R) — shifts the dielectric peak; an X7R part can violate its nominal ±15 % envelope under heavy bias.
3. **Y5V** — Curie peak is intentionally inside the operating range; T × V coupling is the strongest of any commercial class. Total loss > 90 % possible at 85 °C + rated V.
4. **X8L** — asymmetric envelope (+15 / −40 %) makes the TCC shape itself bias-sensitive.

## Vendor variation dominates class label

A practical caveat from the [[epci-high-cv-mlcc-bias-aging|EPCI cross-vendor study]]: nominal "0805 X7R 10 µF 6.3 V" parts from three vendors showed bias loss from **−35 % to −65 %** at rated voltage. **The TCC class (X5R/X7R/X8R) describes the temperature envelope at 0 V; it does not reliably predict bias behavior.** Some vendors' X7R have worse bias than other vendors' X5R of the same case + capacitance.

## Worked example (the simulator's Tier 2 path)

0805 X5R 10 µF 6.3 V at 5 V DC and 60 °C:
- `f_T(60 °C)` for X5R ≈ **0.93**
- `f_V` at `E = 5 V/µm` (X5R sigmoid `E₀ = 3, p = 2`) ≈ **0.27**
- `C_actual = 10 µF × 0.93 × 0.27 ≈ 2.51 µF`

Measured for typical parts: 2.2–2.6 µF — inside the ±10 % honest band of the multiplicative model.

## Vendor SPICE tools split into two camps

| Tool | Coupling treatment |
|---|---|
| Murata SimSurfing | **Coupled** 2D-surface interpolation |
| Murata SpiCap, KEMET K-SIM, TDK SEAT, SEMCO CSS | **Separable** multiplicative |

See [[vendor-spice-models]].

## Short answer

DC-bias and TCC are **two independent fractional derating factors** that multiply: `f_T(T) × f_V(V_DC)`. They're tied together physically because both ride on the same [[batio3|BaTiO₃]] ferroelectric ε_r, but the **temperature dependence at zero bias** and the **bias dependence at fixed temperature** decouple cleanly for typical X5R/X7R operating points. Coupling becomes significant near T_C, at high bias, and for Y5V — which is why a recipe-driven simulator (see [[capacitance-simulation-from-recipe-and-geometry]]) should flag higher uncertainty in those regimes.

## Cross-references

- [[tcc-dc-bias-interaction]] — central synthesis page
- [[temperature-coefficient-of-capacitance]]
- [[dc-bias-derating]]
- [[dc-bias-aging]] — distinct, slow time-dependent companion to instant DC-bias derating
- [[aging-class-2]] — unbiased logarithmic aging (separate phenomenon)
- [[epci-high-cv-mlcc-bias-aging]] — Zednicek 2019 multiplicative formula
- [[batio3]], [[curie-temperature]], [[ferroelectric-domain-wall]] — underlying physics
- [[capacitance-simulation-from-recipe-and-geometry]] — three-tier simulator using this model
- [[vendor-spice-models]] — how vendor tools handle (or skip) the coupling

## References

- [[epci-high-cv-mlcc-bias-aging]] — Zednicek 2019 EPCI: multiplicative formula
- [[vishay-x7r-cap-drift-dc-bias]] — Coppens et al. 2021: X7R derating curves
- [[psma-ceramic-capacitor-basics]]
- "DC and AC Bias Dependence of MLCC Capacitors Including Temperature Dependence", passive-components.eu, 2024 — empirical finding that `f_V(V_DC)` is approximately T-independent for X5R
