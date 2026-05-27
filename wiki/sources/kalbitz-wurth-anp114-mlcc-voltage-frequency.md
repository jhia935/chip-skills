---
title: "Kalbitz / Würth ANP114 — Voltage and Frequency Dependence of Ferroelectric Class 2 MLCCs"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - kalbitz-wurth-anp114-mlcc-voltage-frequency.md
tags:
  - paper
status: complete
importance: high
---

# Kalbitz — Würth Elektronik ANP114 — Voltage and Frequency Dependence of Ferroelectric Class 2 MLCCs

**Source**: Kalbitz, R. **Würth Elektronik Application Note ANP114** — *Voltage and Frequency Dependence of Ferroelectric Class 2 Multilayer Ceramic Capacitors*.
[ANP114 PDF (Würth)](https://www.we-online.com/components/media/o753710v410%20ANP114a_Polarization%20DC%20Bias%20MLCC_EN.pdf)

Local copy: `resources/literature/_tmp/wurth-anp114.txt` (extracted from PDF, 840 lines).

## Summary

A vendor application note that **fits an analytic polarization model to measured C(V, f) data** on Würth MLCCs and derives both:

1. A **voltage-dependent capacitance** form `C(V) = Cs + Cp · sech²((V − Vc) / b)` *(approx; bell-shaped peak on linear baseline)*.
2. A **voltage-and-frequency-dependent impedance**: `Z(ω, V) = R_ESR + [iωC(V) + R_ins⁻¹]⁻¹ + iωL`.

The model parameters reduce to two fitting constants (saturation factor `a`, peak width `b`) plus the linear baseline `Cs`, coercive voltage `Vc`, and standard parasitic stack (ESR, ESL, R_ins). The note's contribution is the **SPICE-friendly analytic form** — usable directly in simulation without lookup tables.

## Key Points

- **Standard test conditions used**: V_AC = 1 V_rms, f = 1 kHz, **20 h pre-conditioning** at the DC voltage before each frequency sweep — important: the 20 h soak puts the part into a [[dc-bias-aging|DC-biased-aged]] state before measurement, so the model captures *steady-state* C(V, f), not the instantaneous response.
- **Equipment**: Keysight E4980A LCR meter with 16034G test fixture.
- **Physical picture**: a Class II MLCC has ferroelectric domains whose dipoles align under DC bias; under increasing DC field, dipole reorientation freezes out and `dq/dV` (= small-signal C) drops.
- **AC probing assumption**: model is most accurate "when the AC voltage is small" — i.e., the LCR meter perturbs but does not move the domain walls macroscopically. Above ~ 50 mVrms AC the assumption starts to break ([[electrical-integrity-dce11-200|Novak 2011]] confirms this independently).
- **Frequency caveat**: the model assumes the same f-dependence for `Cs` and `Cp` (the linear and peak contributions). In real MLCCs the bell-shaped peak (domain-wall contribution) has stronger frequency dispersion than the linear part — so the model is most accurate near the 1 kHz characterization point.
- **Above T_C**: dipole alignment is destroyed, the bell-shaped peak vanishes, and the model collapses to a linear `C ≈ Cs`. Consistent with [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii & Trolier-McKinstry's finding]] that α' → 0 in the paraelectric phase.

## The Kalbitz analytic form (SPICE-friendly)

The note derives:

$$
C(V) \;=\; C_s + a \,\text{sech}^2\!\left(\frac{V - V_c}{b}\right) + a \,\text{sech}^2\!\left(\frac{V + V_c}{b}\right)
$$

where:
- `Cs` — voltage-independent linear capacitance (intrinsic + reversible-wall contribution; analogous to ε'_init in Rayleigh)
- `a` — peak amplitude (proportional to saturation polarization; analogous to α'·E_AC integrated)
- `Vc` — coercive voltage; the V_DC at which the hysteresis loop's slope is steepest
- `b` — peak width; sets the field range over which the bell-shaped peak falls off

The two bell terms (at `+V_c` and `−V_c`) capture the symmetric hysteresis. For a typical Class II MLCC under monotonic DC bias the negative-V term is residual; for a part used in a circuit with both polarities (rare in DC-link applications) both terms matter.

## Comparison with the chip-sim's sigmoid

The chip-sim's [[dc-bias-derating|sigmoid f_V model]] `f_V(E) = 1 / (1 + (E/E₀)^p)` is a one-parameter-pair (E₀, p) compression of the same physics:

| Feature | Kalbitz | chip-sim sigmoid |
|---|---|---|
| At V = 0 | `C(0) = Cs + 2a` (peak) | `f_V(0) = 1` (peak) |
| Falloff | `sech²` (gaussian-like) | `1 / (1 + x^p)` (algebraic) |
| Asymptote at high V | `C → Cs` (linear capacitance) | `f_V → 0` (zero) |
| Captures hysteresis | yes (two ±Vc bells) | no |
| SPICE-importable | yes | yes (after integration) |

The Kalbitz form is **more accurate** because it asymptotes to a finite `Cs` rather than zero (real MLCCs retain ~10–20 % of their zero-bias capacitance even at very high field — the linear electronic + ionic contribution). The chip-sim model could be upgraded by adding a `+ C_lin` floor.

## Implications for AC dependency of the TCC curve

While ANP114 doesn't explicitly map TCC vs AC level, the model's structure makes the AC dependency mechanism clear:

1. The **bell-shaped peak (`a · sech²`) contribution shrinks with rising temperature** (broadens and lowers as the Curie peak smears). The **linear `Cs` contribution is approximately T-flat**.
2. **At low AC (< 50 mVrms)**, you're sampling a small slice of the C-V curve very close to the operating point — capacitance reads close to the local `dq/dV`.
3. **At high AC (> 0.5 Vrms)**, you sweep across more of the bell-shaped peak per cycle — capacitance reads the *average*, which is higher than the local `dq/dV` away from the peak. This is why measured `C` **increases** with AC amplitude up to a saturation point.
4. **Above T_C, the bell shrinks to zero**, so AC dependence vanishes — exactly the [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Rayleigh finding]] that α' → 0 in the paraelectric phase.

So the **TCC curve flattens at low AC and steepens at high AC** — the Curie peak appears smaller in a low-AC measurement.

## Entities Mentioned

- [[rene-kalbitz]] — author *(stub)*
- [[wurth-elektronik]] — publisher *(stub)*
- [[batio3]] — material

## Concepts Discussed

- [[dc-bias-derating]] — the central effect
- [[ac-voltage-coefficient-mlcc]] — secondary effect treated by the model
- [[temperature-coefficient-of-capacitance]] — implicit T-dependence of `a` and `Cs`
- [[tcc-ac-coupling]] — where this model's T-extension would live
- [[ferroelectric-domain-wall]] — what `a · sech²` represents
- [[vendor-spice-models]] — Kalbitz model is a SPICE-friendly variant
- [[rayleigh-analysis]] — sibling decomposition

## Notable Quotes

> "The integral of the capacitance-voltage model only contains basic trigonometric mathematical expressions, it can be easily implemented in software requiring functions of charge instead of capacitance, such as SPICE simulation software."

> "Above the Curie temperature, which is specific for each ferroelectric material, this collective alignment is destroyed."

## References

_Würth Elektronik ANP114 — application note (publicly downloadable PDF). Local extraction in `resources/literature/_tmp/wurth-anp114.txt`._
