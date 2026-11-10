---
title: AC × DC Capacitance Mapping — The Joint V_AC × V_DC Surface
type: concept
created: 2026-05-28
updated: 2026-11-10
sources:
  - kalbitz-wurth-anp114-mlcc-voltage-frequency.md
  - murata-dynamic-model-hidaka-2016.md
  - ben-yaakov-2025-nonlinear-capacitance-definition.md
  - herb-ma-2020-2022-mlcc-ac-dc-aging.md
  - electrical-integrity-dce11-200.md
  - covaci-gontean-2022-singing-mlcc.md
tags:
  - paper
status: complete
importance: high
---

# AC × DC Capacitance Mapping — The Joint V_AC × V_DC Surface

The **joint dependence of effective MLCC capacitance on simultaneous AC excitation amplitude AND DC bias** — the full 2D surface `C(V_AC, V_DC)` at a fixed temperature. Earlier wiki pages treat the [[dc-bias-derating|V_DC axis]] and [[ac-voltage-coefficient-mlcc|V_AC axis]] separately and note their interaction qualitatively. **This page is about the surface itself** — how to construct it, how to consume it, and how it folds back into [[three-capacitance-definitions|the three distinct capacitance definitions]].

## The underlying quantity: Q(V), not C(V)

For a non-linear ferroelectric MLCC, the **charge function `Q(V_DC)`** is single-valued at the working frequency and is the natural quantity to model. The capacitance is a **derived** quantity that depends on what AC excitation is applied:

$$
C_\text{measured}(V_\text{DC}, V_\text{AC}) \;=\; \frac{1}{2 V_\text{AC,pk}} \int_{V_\text{DC}-V_\text{AC,pk}}^{V_\text{DC}+V_\text{AC,pk}} \frac{dQ}{dV} \, dV \;=\; \frac{Q(V_\text{DC}+V_\text{AC,pk}) - Q(V_\text{DC}-V_\text{AC,pk})}{2 V_\text{AC,pk}}
$$

This is the **large-signal definition** averaged over the AC swing. In the limit `V_AC,pk → 0`, this becomes the **local/small-signal definition** `dQ/dV|_{V_DC}` — the quantity LCR meters and [[murata-dynamic-model-hidaka-2016|Murata's dynamic model]] report.

So the entire `C(V_DC, V_AC)` surface is **derivable from a single 1D function Q(V_DC)** — provided you have an analytic or interpolated form. This is the key insight from [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Würth ANP114]] and the basis for Tier 3 of the chip-sim simulator.

## What the joint surface looks like qualitatively

For an X5R/X7R-class MLCC at fixed T = 25 °C, the surface has three regimes:

| Regime | V_DC | V_AC | C_eff behavior |
|---|---|---|---|
| **Low DC, low AC** | < 10 % rated | < 10 mV_rms | C ≈ C_rated; local slope at the peak of Q(V); MAX |
| **Low DC, medium AC** | < 10 % rated | 50–500 mV_rms | C **rises slightly** as AC samples more of the bell-shaped peak (the [[ac-voltage-coefficient-mlcc|standard-condition rise]]) |
| **Low DC, high AC** | < 10 % rated | > 1 V_rms | C **decreases** as AC sweeps across the wings; non-linearity dominates |
| **Mid DC, any AC** | 30–60 % rated | any | C falls per the [[dc-bias-derating|sigmoid `f_V`]]; AC effect is muted |
| **High DC, any AC** | > 60 % rated | any | C ≈ saturating tail; AC effect **vanishes** (all AC swing lies in the flat saturated region) |
| **Very high AC at any DC** | any | > V_coercive | Hysteresis branches; small-signal C undefined; need large-signal definition |

The two diagonals of this 2D map:
- **Pure DC sweep at V_AC = 0.5 V_rms (standard)**: the published bias-derating curve
- **Pure AC sweep at V_DC = 0**: the [[ac-voltage-coefficient-mlcc|non-monotonic curve]] from [[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020]] and [[electrical-integrity-dce11-200|Novak 2011]]

## Three ways to compute the joint surface

### 1. Charge integration (rigorous, the Kalbitz path)

Compute `Q(V)` from an analytic model (e.g., the bell-shaped [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz form]] integrated against `dV`), then compute either:
- `C_local(V_DC) = dQ/dV|_{V_DC}` for any AC excitation
- `C_large(V_DC, V_AC) = [Q(V_DC + V_AC) − Q(V_DC − V_AC)] / (2 V_AC)` for finite AC

**Pros**: rigorous; gives all three [[three-capacitance-definitions|capacitance definitions]] for free; handles ferroelectric hysteresis if Q is multi-branch.
**Cons**: requires analytic Q(V) or fine-grained measured data; numerical integration cost.

### 2. Murata "Dynamic Model" interpolation

The [[murata-dynamic-model-hidaka-2016|Murata Dynamic Model]] interpolates an internal `(C, ESR)(T, V_DC)` table at the operating point. Returns only `C_local`. Does not natively integrate over an AC waveform — the AC effect must be added by the user or simulator.

**Pros**: vendor-blessed; matches the part's actual measured behavior.
**Cons**: closed-source; only C_local; no AC axis.

### 3. Static-model SPICE swap (the LTspice trick)

For each operating point of interest, **export a separate static SPICE model** from SimSurfing (different (T, V_DC) parameter) and run the simulation with the corresponding static model. The simulator handles AC analysis around that static point.

**Pros**: works with any SPICE simulator; no behavioral source needed.
**Cons**: doesn't handle operating-point changes during transient; one model per (T, V_DC) point.

## Three contributing mechanisms to the AC × DC interaction

Per the earlier ingest ([[ac-voltage-coefficient-mlcc]]), three mechanisms govern the AC axis of this surface. Each has its own dependence on the DC operating point:

| Mechanism | Source | DC dependence |
|---|---|---|
| **Rayleigh / domain-wall** | [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023]] | α' shrinks with V_DC (walls pinned); strongest at V_DC = 0 |
| **Bell-shape integration** | [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz ANP114]] | The bell peaks near V_DC = V_coercive; widest swing impact there |
| **Piezo-electrostriction** | [[covaci-gontean-2022-singing-mlcc|Covaci & Gontean]] | Strain × ε coupling at fundamental scales `∝ E_DC · E_AC` — vanishes at V_DC = 0 |

So the AC effect on capacitance is largest at **low V_DC** for mechanisms 1 and 2, and **largest at moderate V_DC** for mechanism 3. The overall AC × DC interaction profile is the sum of these three.

## Quantitative pivot: the [[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020]] reference point

For an X5R 1 µF 6.3 V part:

| V_DC | V_AC | C_eff (µF) | Note |
|---|---|---|---|
| 0 | 0.5 V_rms | ~1.00 | Datasheet condition |
| 0 | 0.01 V_rms | ~0.95 | Low-AC condition; AC sensitivity highest at V_DC = 0 |
| 3 V (47 % rated) | 0.5 V_rms | 0.36 | Heavy bias loss |
| 3 V | 0.01 V_rms | **0.32** | Extra 4 % beyond bias alone |
| 6 V (rated) | any | ~0.20 | AC has minimal impact; DC dominates |

The pattern: **AC sensitivity collapses at high DC bias** because the operating point is on the saturating tail where `dQ/dV` is small AND nearly flat — small AC excursions sample only the flat tail.

## Where the chip-sim simulator slots in

Tier 1 (linear cap, geometric only): no AC × DC dependence.
Tier 2 (separable multiplicative `f_T · f_V · f_AC`): treats the three derating factors as independent; works to ±10 % at small individual losses but mispredicts the AC × DC interaction in the high-DC regime.
Tier 3 (Q(V) integration): use the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz form]] or an equivalent analytic Q(V) per the chip-sim's predicted recipe, then compute C_local, C_total, C_large on demand for the user's application. This captures the joint AC × DC surface in one consistent model.

## Practical guidance for circuit designers

- **Decoupling caps** (small ripple, near 0 DC): use C_local at the standard 0.5 V_rms test condition (= datasheet C). Tier 2 accuracy.
- **Buck-converter output cap** (small ripple, moderate DC bias): use C_local at the actual operating V_DC. Apply [[dc-bias-derating|f_V]] derating.
- **Resonant LLC half-bridge cap** (large AC swing, varying DC): use C_large integrated over the actual swing. **Tier 3 required**.
- **Energy-storage hold-up cap** (large DC, infrequent discharge): use `E = ∫V·dQ` not ½CV². **Q(V) function required**.

## Open gaps

1. **No vendor-public Q(V) export** exists for commercial parts — Murata, KEMET, etc. all give C-vs-V curves, not Q-vs-V. The user must integrate (numerically) the published C(V) curve to get Q(V). This is the chip-sim's opportunity: emit Q(V) as a first-class output.
2. **Y5V and X8L large-signal AC behavior** is essentially undocumented. The chip-sim should flag higher uncertainty (±20 %) for these classes when V_AC > 0.5 V_coercive.
3. **Frequency dependence** of Q(V) — the Q-V loop narrows as frequency rises ([[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz noted]] this caveat). For switching frequencies above ~ 100 kHz a corrected Q(V, f) form is needed.

## Cross-references

- [[three-capacitance-definitions]] — the three definitions the surface produces
- [[dc-bias-derating]] — the V_DC axis at fixed V_AC = 0.5 V_rms
- [[ac-voltage-coefficient-mlcc]] — the V_AC axis at fixed V_DC = 0
- [[tcc-dc-bias-interaction]] — the T axis at fixed AC = standard
- [[tcc-ac-coupling]] — T × AC sibling
- [[empirical-c-t-vdc-academic-measurements]] — academic 2D surface anchors
- [[vendor-spice-models]] — the vendor-tool landscape
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — the analytic Q(V) model
- [[murata-dynamic-model-hidaka-2016]] — vendor-side surface
- [[ben-yaakov-2025-nonlinear-capacitance-definition]] — the definitions framework
- [[capacitance-simulation-from-recipe-and-geometry]] — the three-tier simulator
- [[ferroelectric-domain-wall]] — underlying physics

## References

- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]]
- [[murata-dynamic-model-hidaka-2016]]
- [[ben-yaakov-2025-nonlinear-capacitance-definition]]
- [[herb-ma-2020-2022-mlcc-ac-dc-aging]]
- [[electrical-integrity-dce11-200]]
- [[covaci-gontean-2022-singing-mlcc]]
