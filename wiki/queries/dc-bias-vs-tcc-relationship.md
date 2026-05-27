---
title: "How does DC-bias capacitance derating and TCC capacitance derating relate?"
type: query
created: 2026-05-27
updated: 2026-05-27
sources:
  - epci-high-cv-mlcc-bias-aging.md
  - vishay-x7r-cap-drift-dc-bias.md
  - psma-ceramic-capacitor-basics.md
  - fujii-trolier-mckinstry-2023-batio3-nonlinearity.md
  - he-2022-dy-ho-batio3-dc-bias.md
  - hwang-2024-coreshell-electrode-dc-bias.md
  - song-2017-compositionally-graded-mlcc.md
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

### Microscopic basis (Rayleigh decomposition)

[[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii & Trolier-McKinstry 2023]] decomposed ε_r into reversible (ε'_init) plus irreversible ([[rayleigh-analysis|Rayleigh]] α') contributions across −180 to +150 °C. Key finding: **α' collapses above T_C** — there are no mobile domain walls in the paraelectric phase to suppress with DC bias. This is the **microscopic justification** for the separable multiplicative model — the same domain-wall population that TCC modulates is the population DC bias kills, and where that population is small (above T_C, in formulated X7R with engineered shells, or in fine-grain compositions) the multiplicative model is most accurate.

## Where the coupling becomes significant

Per [[tcc-dc-bias-interaction]]:

1. **Near the Curie temperature** — for compositions engineered with T_C inside the operating range (high-CV X5R/X7R and especially Y5V), DC bias both suppresses residual polarization (extra `f_V` loss) and **broadens/shifts the Curie peak** (changes `f_T(T)` shape). Multiplicative model under-predicts loss by 5–15 %.
2. **Strong DC bias** (`E > 5 V/µm` for X7R) — shifts the dielectric peak; an X7R part can violate its nominal ±15 % envelope under heavy bias.
3. **Y5V** — Curie peak is intentionally inside the operating range; T × V coupling is the strongest of any commercial class. Total loss > 90 % possible at 85 °C + rated V.
4. **X8L** — asymmetric envelope (+15 / −40 %) makes the TCC shape itself bias-sensitive.

## Vendor variation dominates class label

A practical caveat from the [[epci-high-cv-mlcc-bias-aging|EPCI cross-vendor study]]: nominal "0805 X7R 10 µF 6.3 V" parts from three vendors showed bias loss from **−35 % to −65 %** at rated voltage. **The TCC class (X5R/X7R/X8R) describes the temperature envelope at 0 V; it does not reliably predict bias behavior.** Some vendors' X7R have worse bias than other vendors' X5R of the same case + capacitance.

## Academic-literature calibration (recipe-specific sigmoid)

Recent academic work (2022–2026) gives recipe-specific values of the DC-bias sigmoid `f_V(E) = 1 / (1 + (E/E₀)^p)` that are **substantially shallower** than the chip-sim's class-generic defaults. Full table in [[empirical-c-t-vdc-academic-measurements]]; highlights:

| Recipe | E₀ (V/µm) | Bias loss at 4 V/µm | Source |
|---|---|---|---|
| X7R generic default | 5.0 | ~50 % | chip-sim |
| Dy-Mg, 180 nm grain (bulk ceramic) | **7.0** | −23.6 % | [[he-2022-dy-ho-batio3-dc-bias]] |
| Core-shell + Ni-electrode X7S MLCC | 6.0 | −28 % | [[hwang-2024-coreshell-electrode-dc-bias]] |
| GB-engineered 200–260 nm grain | — | — | [[an-2026-grain-boundary-segregation-dc-bias]] |
| 4 mol% Ca-at-B (PNR composition) | **~10** | −15 % at 30 kV/cm | [[he-2025-bsite-ca-batio3-pnr]] |

Two practical observations from this corpus:

1. **The grain-size sweet spot for DC-bias robustness converges to 150–260 nm** across three independent groups ([[he-2022-dy-ho-batio3-dc-bias|He 2022]], [[wang-2023-x5r-ni-mlcc-combined-out-field|Wang 2023]], [[an-2026-grain-boundary-segregation-dc-bias|An 2026]]) — narrower than the pre-2022 "anywhere sub-300 nm" rule.
2. **Bulk-ceramic measurements systematically under-state finished-MLCC bias loss by ~10 percentage points** ([[hwang-2024-coreshell-electrode-dc-bias|Hwang 2024]]: bulk −17 % vs MLCC −28 % at 4 kV/mm, same composition). The MLCC's thinner dielectric concentrates field near the electrode interfaces.

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
- [[empirical-c-t-vdc-academic-measurements]] — academic-literature calibration table
- [[temperature-coefficient-of-capacitance]]
- [[dc-bias-derating]]
- [[rayleigh-analysis]] — the ε'_init + α' decomposition method
- [[polar-nanoregions-pnr]] — microstructure that flattens f_V while broadening f_T
- [[core-shell-batio3]] — the dominant industrial mechanism
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
- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] — Microstructures 2023: Rayleigh decomposition of ε_r across T
- [[he-2022-dy-ho-batio3-dc-bias]] — Cer. Int. 2022: Dy-Mg 180 nm grain calibration anchor
- [[hwang-2024-coreshell-electrode-dc-bias]] — ACS AMI 2024: bulk vs MLCC bias loss gap
- [[song-2017-compositionally-graded-mlcc]] — Sci. Rep. 2017: rare academic 2D characterisation T × V_DC
- [[he-2025-bsite-ca-batio3-pnr]] — Microstructures 2026: PNR-based bias-stable dielectric
