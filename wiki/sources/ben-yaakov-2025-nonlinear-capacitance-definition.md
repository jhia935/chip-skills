---
title: "Ben-Yaakov 2025 — Capacitance Definition of Non-Linear Voltage-Dependent Capacitors"
type: source
created: 2026-05-28
updated: 2026-05-28
sources:
  - ben-yaakov-2025-nonlinear-capacitance-definition.md
tags:
  - paper
status: complete
importance: high
---

# Ben-Yaakov 2025 — Capacitance Definition of Non-Linear Voltage-Dependent Capacitors

**Source**: Ben-Yaakov, S. (Jun 2025). **Capacitance Definition of Non-Linear Voltage-Dependent Capacitors**. *EPCI / passive-components.eu*.
[URL](https://passive-components.eu/capacitance-definition-of-non-linear-voltage-dependent-capacitors/)

## Summary

A short EPCI article by ferroelectric-capacitor theorist Sam Ben-Yaakov (Ben-Gurion University of the Negev) laying out the **three distinct definitions of capacitance** that apply to a non-linear ferroelectric MLCC. The single word "capacitance" has at least three different meanings — and **the right one depends on the application**, not on the part. This is the conceptual cornerstone for the chip-sim's [[ac-dc-capacitance-mapping]] story.

## The three definitions

For a non-linear capacitor with charge-voltage curve `Q(V)`, the three distinct quantities all called "capacitance":

### 1. Total capacitance C_total = Q/V
- Geometric meaning: chord from the origin `(0, 0)` to the operating point `(V, Q(V))`.
- Use case: total charge stored on the capacitor; used when comparing charge transfer between non-linear and linear capacitors.
- Equation:
  $$C_\text{total}(V) = \frac{Q(V)}{V}$$
- For a linear capacitor this equals C; for a ferroelectric MLCC at high bias it can be much larger than `dQ/dV`.

### 2. Local / small-signal capacitance C_local = dQ/dV
- Geometric meaning: slope of the tangent at the operating point.
- Use case: circuits with a DC operating point and small AC ripple — e.g., the output cap of a **buck converter** with small output ripple.
- Equation:
  $$C_\text{local}(V) = \frac{dQ}{dV}\bigg|_V$$
- This is what an LCR meter measures with a small AC excitation. It is what [[murata-dynamic-model-hidaka-2016|Murata's dynamic model]] returns at the operating point.

### 3. Large-signal capacitance C_large = ΔQ/ΔV
- Geometric meaning: chord between two distant points on the Q-V curve, over the actual operating swing.
- Use case: circuits with significant AC swing — **resonant converters**, energy-storage caps, snubber circuits.
- Equation:
  $$C_\text{large}(V_1, V_2) = \frac{Q(V_2) - Q(V_1)}{V_2 - V_1}$$
- For a non-linear cap with large AC swing, the **resonant frequency** `f_0 = 1/(2π√(LC))` should use `C_large`, NOT `C_local`. Treating `C_local` as `C_large` mispredicts resonant frequency by tens of percent for high-bias-loss Class II parts.

## Why these matter for the AC × DC mapping

The three definitions **diverge as the AC swing grows relative to V_DC**:

| AC amplitude / DC bias | Which definition matches measured behavior |
|---|---|
| AC ≪ V_DC, AC ≪ V_coercive (high-frequency ripple) | C_local matches |
| AC ~ V_DC, AC < V_coercive (medium-signal) | Need to integrate; neither extreme matches |
| AC ≫ V_DC (large-signal AC, e.g. resonant) | C_large matches |

This is the fundamental reason why **f_AC × f_V is not separable** in the simple multiplicative-derating sense ([[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020/2022]] reported the empirical version): the user's application chooses **which definition of capacitance is operative**, and that choice changes the effective C(V_DC, V_AC) function.

## Practical impact on the chip-sim simulator

The chip-sim's predicted C should expose all three numbers, not a single "effective capacitance":

1. **C_local(T, V_DC)** — what an LCR meter or vendor SimSurfing returns. The default chip-sim output.
2. **C_total(T, V_DC)** — for charge-balance and energy-comparison analyses.
3. **C_large(T, V_DC, V_AC,peak-peak)** — for resonant-converter and large-signal-AC applications. Computed by integrating the predicted Q(V) over the operating swing.

For Class I C0G these are all equal (linear). For high-bias-loss Class II at high V_DC, they can differ by ~30 %.

## Implications: energy storage in non-linear MLCCs

The familiar `E = ½CV²` formula is for linear capacitors. For non-linear MLCCs:

$$
E = \int_0^V V' \, dQ \;=\; \int_0^V V' \, \frac{dQ}{dV'} \, dV'
$$

Using `C_local(V')` inside the integral gives the correct energy, **not** `½C_local(V) V²`. This matters for energy-storage MLCC design (e.g., [[us-11222749-samsung-dy-nb-thin-layer|Samsung high-CV thin-layer parts]] used as energy buffers) where the gap between `½CV²` and the true integrated energy is 10–30 %.

## Entities Mentioned

- [[sam-ben-yaakov]] — author, Ben-Gurion University *(stub)*
- [[ben-gurion-university]] — institution *(stub)*

## Concepts Discussed

- [[three-capacitance-definitions]] — central topic; promotes to its own concept page
- [[ac-dc-capacitance-mapping]] — combined-bias context
- [[dc-bias-derating]] — relevant to all three definitions
- [[ac-voltage-coefficient-mlcc]] — captures the AC-amplitude axis
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — analytic Q(V) used for the integrations
- [[murata-dynamic-model-hidaka-2016]] — provides C_local; sibling vendor approach

## Notable Quotes

> "Total Capacitance: the ratio of charge to voltage at any given point. It's represented as a straight line from the origin to a point on the Q-V curve."

> "Local Capacitance is crucial in circuits with DC bias and ripple voltage, such as buck converters."

> "Large-Signal Capacitance is important for resonant converters and circuits with significant AC currents."

## References

_EPCI / passive-components.eu (open access)._
