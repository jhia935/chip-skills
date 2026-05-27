---
title: Temperature Coefficient of Capacitance (TCC)
type: concept
created: 2026-05-19
updated: 2026-05-19
status: complete
importance: high
sources:
  - psma-ceramic-capacitor-basics.md
  - samsung-cl-series-mlcc-ds.md
tags:
  - paper
---

# Temperature Coefficient of Capacitance (TCC)

The **fractional change in capacitance per kelvin** of temperature, evaluated relative to a reference temperature (usually 25 °C). For Class I (paraelectric) dielectrics, TCC is a small linear constant in ppm/°C and is the **primary spec parameter**. For Class II/III (ferroelectric) dielectrics, the capacitance change with temperature is too large and nonlinear to be described by a single coefficient — instead the spec is an **EIA letter-coded envelope** (e.g., X7R = ±15 % over −55 to +125 °C).

## Definition (Class I)
$$
\text{TCC} \;=\; \frac{1}{C_0} \cdot \frac{dC}{dT} \quad [\text{ppm/°C}]
$$

For [[samsung-cl-series-mlcc-ds|measurement per Samsung CL series]] (and JIS):
$$
\text{TCC} \;=\; \frac{C_2 - C_1}{C_1 \cdot \Delta T} \times 10^6 \;[\text{ppm/°C}]
$$
- `C₁` = capacitance at 25 °C
- `C₂` = capacitance at 85 °C
- `ΔT` = 60 °C

## EIA RS-198 Class I letter decoder (see [[eia-rs-198-dielectric-classes]])
| Code | TCC (ppm/°C) | Tolerance (ppm/°C) |
|---|---|---|
| C0G / NP0 | 0 | ±30 |
| P2H | −150 | ±60 |
| R2H | −220 | ±60 |
| S2H | −330 | ±60 |
| T2H | −470 | ±60 |
| U2J | −750 | ±120 |
| S2L | +350 to −1000 | (industry, broader) |

Negative TCC (capacitance decreases with rising T) is the norm — driven by lattice expansion lowering the dipole density.

## Why Class II can't use a TCC number
For [[batio3|BaTiO₃-based]] Class II dielectrics, εr is non-monotonic and follows the [[curie-temperature|Curie peak]] near 120 °C. A linear TCC would be wildly misleading: a part at 25 °C might have +10 % at 50 °C, peak at +30 % near 120 °C, then drop to −10 % at 150 °C. The EIA letter envelope (e.g., R = ±15 %) captures the **worst-case excursion within the operating range** instead.

The full curve looks like a flattened Curie peak — engineered by adding dopants (Zr, Sr, rare earths) to **shift T_C inside the operating range and broaden the peak**.

## Measurement protocol
Per [[samsung-cl-series-mlcc-ds]] and JIS/IEC standards:
1. Stabilize at 25 °C, measure C (call it C₁ or C_ref).
2. Cool to T_min ± 2 °C, soak, measure.
3. Return to 25 °C, soak, measure (verify recovery).
4. Heat to T_max ± 2 °C, soak, measure.
5. Return to 25 °C, soak, measure.

For Class II:
$$
\Delta C \;=\; \frac{C_2 - C_1}{C_1} \times 100 \;[\%]
$$
reported at both T_min and T_max.

## Implications for the simulator
- Class I: `f_T(T) = 1 + \text{TCC} \cdot (T − 25)` with TCC from the letter code.
- Class II: piecewise table or smooth fit to the published curve (Murata SimSurfing, vendor datasheets). For X7R the simplest model is the ±15 % box; for higher fidelity, fit a quadratic with maximum near T_C.

## Coupling with DC bias

TCC is the temperature dependence of `ε_r` at **zero DC bias**. Under non-trivial DC bias, the temperature curve **shifts and reshapes** — most dramatically near the Curie peak. The simulator's separable multiplicative model `f_T(T) × f_V(V_DC)` is correct to ~5–10 % for most production X5R/X7R parts but breaks down for Y5V or compositions engineered near room-temperature T_C. See [[tcc-dc-bias-interaction]] for the full coupling story, the where-it-breaks-down regimes, and how vendor SPICE tools handle (or don't handle) the coupling.

## Cross-references
- [[eia-rs-198-dielectric-classes]]
- [[curie-temperature]]
- [[batio3]]
- [[cazro3]]
- [[mlcc-capacitance-equation]]
- [[dc-bias-derating]]
- [[tcc-dc-bias-interaction]] — how the two factors couple under combined T + V_DC operation

## References
- [[psma-ceramic-capacitor-basics]]
- [[samsung-cl-series-mlcc-ds]]
- [[murata-grm-series-tcc-data]]
