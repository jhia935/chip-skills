---
title: TCC × AC-Level Coupling — How AC Excitation Reshapes the Temperature Coefficient Curve
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - fujii-trolier-mckinstry-2023-batio3-nonlinearity.md
  - herb-ma-2020-2022-mlcc-ac-dc-aging.md
  - kalbitz-wurth-anp114-mlcc-voltage-frequency.md
  - electrical-integrity-dce11-200.md
  - covaci-gontean-2022-singing-mlcc.md
status: complete
importance: high
---

# TCC × AC-Level Coupling

How the **AC excitation amplitude** affects the **shape of an MLCC's temperature-coefficient-of-capacitance ([[temperature-coefficient-of-capacitance|TCC]]) curve**. The TCC envelope on a datasheet — e.g. X7R = ±15 % over −55…+125 °C — is **measured at a specific AC level** (typically 0.5 V_rms / 1 kHz per EIA-198-1F). At a different operating AC level the same part traces out a **different ε_r(T) curve**. This page synthesizes how and why.

## The published TCC envelope is one slice of a 3D surface

The full small-signal capacitance of a Class II MLCC is:

$$
C(T, V_\text{DC}, V_\text{AC})
$$

A datasheet TCC curve fixes V_DC = 0 (or some specified bias) and V_AC = 0.5 V_rms, and plots `ΔC/C` vs T. The full surface has another axis the datasheet doesn't show.

The [[ac-voltage-coefficient-mlcc|AC voltage coefficient]] page treats the V_AC axis at fixed T. **This page treats the cross-coupling: how the V_AC axis affects the shape of the T axis.**

## Why TCC depends on AC level: the Rayleigh decomposition

[[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii & Trolier-McKinstry 2023]] supplies the cleanest microscopic basis. Below the coercive AC field, ε'(E_AC) is a [[rayleigh-analysis|Rayleigh-form]] sum of two parts:

$$
\varepsilon'(T, E_\text{AC}) \;=\; \varepsilon'_\text{init}(T) \;+\; \alpha'(T) \cdot E_\text{AC}
$$

- `ε'_init(T)` — the **reversible** contribution; intrinsic ionic + electronic + reversible-domain-wall vibration. Smooth, follows the Curie-Weiss-like T-dependence.
- `α'(T)` — the **irreversible Rayleigh coefficient**; entirely from irreversible domain-wall motion. Has its own T-dependence — **peaks below T_C** and **collapses above T_C**.

So:

$$
\frac{\partial \varepsilon'}{\partial T}\bigg|_{E_\text{AC}} \;=\; \frac{d\varepsilon'_\text{init}}{dT} \;+\; \frac{d\alpha'}{dT} \cdot E_\text{AC}
$$

The slope `dε'/dT` — i.e., the **local TCC** — has an **explicit linear-in-E_AC contribution** from the irreversible term. The TCC curve at one AC level differs from the TCC at another AC level by a multiple of `dα'/dT`.

## How the TCC curve reshapes with AC level (qualitative)

For a typical Class II BaTiO₃-based MLCC with T_C above the operating range:

| AC level | TCC curve shape |
|---|---|
| Very low (< 10 mV_rms) | Reads close to `dε'_init/dT` only — relatively **flat**; close to the intrinsic dielectric response |
| Standard (0.5 V_rms) | Datasheet curve — includes the standard α' contribution |
| Higher (> 1 V_rms) | TCC steeper near T_C (more α' contribution); may **violate the published envelope** at low T where `dα'/dT` is large |

Above T_C, **all curves converge**: α'→0, so the AC dependence of TCC vanishes.

## Three contributing mechanisms (same as the V_AC axis itself)

The mechanisms that drive the AC voltage coefficient ([[ac-voltage-coefficient-mlcc]]) each have a T-dependence, and that T-dependence is what creates the TCC × AC coupling:

| Mechanism | T-dependence | TCC × AC coupling sign |
|---|---|---|
| **Rayleigh / domain-wall** ([[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023]]) | α'(T) peaks below T_C, drops sharply above | Steepens TCC near T_C at high AC |
| **Bell-shape integration** ([[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz]]) | Bell amplitude (`a`) decreases with T; width (`b`) increases | Decreases TCC slope at higher T |
| **Piezo-electrostriction** ([[covaci-gontean-2022-singing-mlcc|Covaci & Gontean]]) | d_33 drops sharply near T_C; M_33 ~ T-flat | Sharp TCC change near T_C, low- and zero-DC |

All three converge above T_C — that's the "anchor point" where TCC curves at all AC levels meet.

## Quantitative anchor: Fujii 2023 model MLCC

Fujii & Trolier-McKinstry 2023 measured a model BaTiO₃-based MLCC up to 12–15 kV/cm AC. At the room-T peak:

- `ε'_init` ≈ constant with AC amplitude → no AC dependence at the linear-only term
- `α' · E_AC` grows linearly until the AC amplitude exceeds about 1/3 of the coercive field

So at room temperature, between V_AC = 10 mV_rms and V_AC = 500 mV_rms (= 30 V/cm to 1.5 kV/cm for a 5 µm dielectric), the linear-Rayleigh contribution to ε' grows roughly **proportional to E_AC**. For a typical X5R, this is the **~4 % swing** [[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020]] reports between standard-condition and low-AC measurements.

## Quantitative anchor: low-AC vs standard-AC TCC curves

Combining the above with the standard X5R envelope ±15 % gives a rough rule of thumb for `f_T(T)` shape vs AC level (room-T-normalized, V_DC = 0):

| AC level | f_T(85 °C) | f_T(125 °C) | Comment |
|---|---|---|---|
| 0.5 V_rms (standard) | 0.85 | — | Datasheet X5R lower bound at 85 °C |
| 0.01 V_rms (low) | 0.81–0.83 | — | TCC curve **steeper** at low AC; this is where Ma's 4 % extra loss lives |
| 1 V_rms (above standard) | 0.87 | — | Slightly flatter; closer to bulk ceramic measurement |
| Above T_C (~ 125–140 °C) | — | all converge | α' vanishes |

These are within the X5R ±15 % envelope but **shift the working-point capacitance by ±3–5 %** at the AC-level extremes.

## Where the multiplicative model breaks down — extended

The [[tcc-dc-bias-interaction|multiplicative f_T × f_V model]] is a useful first approximation but assumes `f_AC = 1` (constant), `f_T` independent of `V_DC` and `V_AC`. Real-part deviations:

- **TCC × AC coupling at low DC, high AC**: Adding `f_AC(V_AC, T)` with the Rayleigh form captures this without abandoning the multiplicative structure (just promotes `f_AC` from a scalar to a `(V_AC, T)` lookup).
- **Three-way TCC × DC × AC coupling near T_C**: All three axes interact. Multiplicative model fails by ~10 % near 0.85 · T_C with finite DC and finite AC. Tier 3 (full SPICE / [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz polarization model]]) is required for that regime.
- **Y5V**: All bets off — Y5V's Curie peak is engineered into the operating range and α' is large across the whole window.

## Implications for the chip-sim simulator

1. **Document AC level in the simulator output**. Currently the simulator returns `C_effective(T, V_DC)`; it should return `C_effective(T, V_DC, V_AC)` with V_AC defaulting to 0.5 V_rms (the standard).
2. **Add an "AC = small-signal" warning band** when the application operating AC is below 50 mV_rms — flag the additional 3–5 % loss for typical X5R/X7R.
3. **Tier 3 path**: ingest the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz analytic C(V)]] and integrate over the operating AC waveform — gives a single C_eff value that captures both the V_DC operating point and the AC-amplitude-driven averaging.
4. **Calibration target**: a published TCC curve at 0.5 V_rms is one slice; calibrating against a second AC level (10 mV_rms low-signal LCR meas, if available) would pin down both `ε'_init(T)` and `α'(T)` separately. This is what [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023]] does for model MLCCs; vendor TCC curves don't publish this — second opportunity gap.

## Cross-references

- [[ac-voltage-coefficient-mlcc]] — the V_AC axis at fixed T
- [[temperature-coefficient-of-capacitance]] — the T axis at fixed V_AC
- [[tcc-dc-bias-interaction]] — the T × V_DC coupling
- [[rayleigh-analysis]] — the ε'_init + α' decomposition that makes the coupling explicit
- [[dc-bias-derating]] — coupled to AC via the shared domain-wall mechanism
- [[empirical-c-t-vdc-academic-measurements]] — sister synthesis on the V_DC × T academic measurements
- [[electrostriction]], [[piezoelectricity-batio3]] — strain-coupling contributors
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — analytic model that captures TCC × AC implicitly via `a(T)` and `b(T)`
- [[ferroelectric-domain-wall]] — underlying physics
- [[curie-temperature]] — the convergence point above which AC dependence vanishes

## References

- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] — Rayleigh α'(T) for BaTiO₃ ceramics
- [[herb-ma-2020-2022-mlcc-ac-dc-aging]] — SEMCO quantification of AC × DC interaction
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — Würth ANP114 polarization model
- [[electrical-integrity-dce11-200]] — Novak 2011 cross-vendor AC bias measurements
- [[covaci-gontean-2022-singing-mlcc]] — strain-mechanism review
