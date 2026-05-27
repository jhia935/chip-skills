---
title: Three Capacitance Definitions for Non-Linear MLCCs
type: concept
created: 2026-05-28
updated: 2026-05-28
sources:
  - ben-yaakov-2025-nonlinear-capacitance-definition.md
  - kalbitz-wurth-anp114-mlcc-voltage-frequency.md
status: complete
importance: high
---

# Three Capacitance Definitions for Non-Linear MLCCs

For a non-linear ferroelectric MLCC, the single word "capacitance" has **three distinct meanings**. The right one depends on the application; using the wrong one mispredicts circuit behavior by 10–30 % for high-bias-loss Class II parts.

| Definition | Formula | Geometric picture | Use case |
|---|---|---|---|
| **Total** | $C_\text{total} = \frac{Q(V)}{V}$ | Chord from origin to `(V, Q)` | Charge-balance, energy comparison |
| **Local / small-signal** | $C_\text{local} = \frac{dQ}{dV}\big|_V$ | Tangent slope at `(V, Q)` | Buck-converter ripple, LCR meter measurement |
| **Large-signal** | $C_\text{large} = \frac{Q(V_2) - Q(V_1)}{V_2 - V_1}$ | Chord between two distant points | Resonant converters, energy storage |

For a linear capacitor all three are equal. For [[batio3|BaTiO₃]]-based Class II MLCCs they diverge — particularly at high DC bias where the Q(V) curve is strongly non-linear.

## Why the divergence matters

The Q-V curve of a ferroelectric MLCC under DC bias has these features:
- **Concave at low V**: `dQ/dV` is high (peak `ε_r`)
- **Inflection near coercive field V_C**: domain switching makes the curve almost linear
- **Saturating at high V**: `dQ/dV` drops as domains align fully (`f_V` collapse)

At a high-DC operating point (e.g., 60 % of rated V for an X5R):
- `C_local` ≈ 0.4 × `C_rated` (the local tangent has dropped)
- `C_total` ≈ 0.7 × `C_rated` (the chord from origin is still steeper than the local tangent)
- `C_large` (for ±0.5 V AC excursion) ≈ 0.45 × `C_rated`

So **what number to use depends on what you're computing**:

| Calculation | Use |
|---|---|
| Voltage ripple `ΔV = I·Δt / C` for small ripple | C_local |
| Charge balance across a switch event | C_total |
| Resonant frequency `f_0 = 1/(2π√LC)` for tank circuit | C_large at the swing amplitude |
| Energy stored on the cap | $E = \int_0^V V' dQ$ — **not** ½CV² |

## Direct relation to vendor SPICE models

| Model class | Returns |
|---|---|
| Murata "Dynamic Model" ([[murata-dynamic-model-hidaka-2016]]) | C_local at the operating point |
| Murata "Static Model" | C_local at a single specified `(T, V_DC)` snapshot |
| KEMET K-SIM / TDK SEAT | C_local interpolated from datasheet curves |
| Würth ANP114 ([[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz model]]) | C_local from `dQ/dV` of analytic Q(V); gives charge function so the user can compute all three |

**Only the Kalbitz analytic Q(V) form gives all three definitions for free.** The other vendor models report only C_local; computing C_large or C_total requires the user to integrate their dynamic model over the operating swing manually.

## Implications for the chip-sim simulator

The chip-sim's Tier 2 output should be **three numbers per operating point**, not one:

1. **C_local(T, V_DC)** — default; matches LCR meter and vendor SPICE
2. **C_total(T, V_DC)** — for charge / energy applications
3. **C_large(T, V_DC, V_AC,peak-peak)** — for resonant or large-AC applications

The internal representation should be the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Q(V) function]] (not the C(V) curve), with all three derived definitions computed on demand.

## Energy storage formula (the corrected version)

The familiar `E = ½CV²` formula only works for linear capacitors. For non-linear MLCCs:

$$
E = \int_0^V V' \, dQ \;=\; \int_0^V V' \, C_\text{local}(V') \, dV'
$$

For an X5R 10 µF 6.3 V cap charged to 5 V with C_local(0) = 10 µF and C_local(5) = 3 µF:
- `½ × 10 µF × 25 V² = 125 µJ` (wrong; uses C_local at V = 0)
- `½ × 3 µF × 25 V² = 37.5 µJ` (wrong; uses C_local at V = 5)
- True integral ≈ 70 µJ (somewhere in between, computed from the actual Q(V))

The gap can be 30 %+ for high-bias-loss parts. For [[us-11222749-samsung-dy-nb-thin-layer|Samsung high-CV thin-layer parts]] used as energy buffers, this is the difference between a working buck converter and an unstable one.

## Cross-references

- [[ac-dc-capacitance-mapping]] — the joint AC × DC story this concept underpins
- [[dc-bias-derating]] — fraction of capacitance lost at a given V_DC
- [[ac-voltage-coefficient-mlcc]] — AC-amplitude axis
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — analytic Q(V) form
- [[murata-dynamic-model-hidaka-2016]] — returns C_local
- [[vendor-spice-models]] — vendor model comparison
- [[ben-yaakov-2025-nonlinear-capacitance-definition]] — primary source

## References

- [[ben-yaakov-2025-nonlinear-capacitance-definition]]
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]]
