---
title: "Hidaka / Murata 2016 — MLCC Dynamic Model for Circuit Simulations"
type: source
created: 2026-05-28
updated: 2026-05-28
sources:
  - murata-dynamic-model-hidaka-2016.md
tags:
  - paper
status: complete
importance: high
---

# Hidaka / Murata 2016 — MLCC Dynamic Model Supports Circuit Simulations

**Source**: Hidaka, S. (Dec 2016). **MLCC Dynamic Model Supports Circuit Simulations**. *Murata Manufacturing Co. Ltd. — Technical article*. CAD/CAE Technology Dept., Fundamental Technology Center, Technology & Business Development Unit.
[URL](https://article.murata.com/en-us/article/mlcc-dynamic-model-supports-circuit-simulations)

## Summary

Official Murata description of the **MLCC Dynamic Model** — the SPICE-export format underlying [[murata-spice-library-and-curves|Murata SimSurfing]]. The Dynamic Model is the only widely-deployed vendor model that handles **combined `T × V_DC`** automatically, via a behavioral current source connected in parallel to a passive RLC equivalent circuit.

Important nuance for the chip-sim simulator's [[ac-dc-capacitance-mapping|AC × DC mapping]] story: the Dynamic Model handles **`T × V_DC`** explicitly, but the **`V_AC` axis is still handled implicitly** by the small-signal-slope `dQ/dV` at the operating point — it does not natively integrate over a finite AC waveform. For applications where the AC swing is a significant fraction of the coercive field, the dynamic model's prediction still requires a Tier 3 [[kalbitz-wurth-anp114-mlcc-voltage-frequency|charge-based integration over the AC cycle]].

## Static vs Dynamic — the two model classes

### Static model
- **Composition**: pure passive RLC equivalent circuit (R_ESR, R_ins, L, C). No active elements.
- **Operating point**: a snapshot at one specified `(T, V_DC)` — typically 25 °C / 0 V_DC for the default download.
- **Use case**: simulators that don't support behavioral sources (older PSpice, classic Saber), or when calculation speed is critical and the operating point is well-known.
- **Limitation**: cannot respond to operating-point changes during simulation. If `V_DC` sweeps during transient analysis, the static model stays at its fixed `(T, V_DC)` snapshot.

### Dynamic model
- **Composition**: same passive RLC stack **plus** a **behavioral current source** in parallel.
- **Operating point**: the behavioral source **automatically computes the C and ESR changes** from the instantaneous T and V_DC.
- **Use case**: detailed transient and AC analyses where the operating point shifts during simulation (e.g., LDO start-up, switching power converter analysis).
- **Equivalence**: at a fixed `(T, V_DC)`, the dynamic model is **precisely identical** to the static model exported at that point.

## How the dynamic model handles combined T × V_DC

The behavioral source uses Murata's internal measurement database to look up `C(T, V_DC)` and `R_ESR(T, V_DC)` at the operating point. Internally this is presumably a 2D-surface interpolation over Murata's measured data — Murata has not publicly disclosed the interpolation method (though patent US 8,718,987 and the more recent US 10,650,180 describe the equivalent-circuit construction process).

What the user gets:
- **Capacitance value** that varies with both T and V_DC during the simulation
- **ESR value** that varies similarly
- **No explicit handling of V_AC** — the model gives `dQ/dV` at the operating point, not the cycle-averaged large-signal capacitance.

## What the dynamic model does NOT do

Three limitations relevant for the chip-sim:

1. **No explicit V_AC dependence**. The small-signal capacitance returned at the operating point is the local `dQ/dV` slope. For circuits where V_AC swings are a significant fraction of the coercive field (e.g., resonant converters), the cycle-averaged effective capacitance differs from this local slope — see [[three-capacitance-definitions]] for the formal distinction (local vs large-signal vs total).
2. **No handling of [[dc-bias-aging|long-term DC-bias aging]]**. The dynamic model gives instant-VCC capacitance under a steady DC bias; it does not include the slow time-dependent drift after hours/days of bias.
3. **No piezoelectric / electrostrictive strain feedback**. The model is purely electrical — the [[mlcc-acoustic-noise|singing-capacitor strain]] coupling is not captured (though it's secondary for capacitance prediction).

## Implications for the chip-sim simulator

For Tier 2 simulator-fidelity (`±5–10 %`), the dynamic model is exactly the right format. The chip-sim's recipe-to-capacitance pipeline can output a dynamic-model-equivalent (R, L, C + behavioral source) for every predicted part.

For Tier 3 (full precision), the chip-sim should integrate the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz analytic Q(V) model]] over the full AC waveform, which captures the V_AC axis the dynamic model misses.

## Entities Mentioned

- [[seiji-hidaka]] — author, Murata CAD/CAE *(stub)*
- [[murata]] — vendor
- [[murata-spice-library-and-curves]] — overall Murata SimSurfing infrastructure

## Concepts Discussed

- [[ac-dc-capacitance-mapping]] — central topic
- [[vendor-spice-models]] — Murata is the "coupled" example in the vendor split
- [[three-capacitance-definitions]] — local vs large-signal divergence
- [[murata-spice-library-and-curves]] — sibling reference

## Notable Quotes

> "The dynamic model adds a current source model referred to as a behavior power source, which is connected in parallel to [the] equivalent circuit model."

> "[The static model is] precisely identical to the dynamic model under uniquely specified conditions."

## References

_Murata technical article, publicly accessible._
