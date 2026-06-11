---
title: Field-Induced Curie Temperature Shift
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - dulkin-roth-2020-batio3-curie-shift.md
  - lim-cho-2010-batio3-mlcc-field-induced.md
  - yoon-kim-2020-batio3-tetragonality-dc-bias.md
status: complete
importance: high
---

# Field-Induced Curie Temperature Shift

Applying a DC electric field to a [[batio3|BaTiO₃]]-based ferroelectric **shifts its [[curie-temperature|Curie temperature]] (T_C) upward** while simultaneously **suppressing the peak dielectric constant**. This is the central physical mechanism behind the **DC-bias dependency of the [[temperature-coefficient-of-capacitance|TCC]] curve** in Class II MLCCs.

Both effects come from the same Landau-type free-energy expansion: a positive (or "biasing") electric field stabilizes the ferroelectric phase against thermal disordering (raising T_C) but also pulls the system into a saturating-polarization state that flattens `dP/dE` (reducing peak ε_r). This T_C-shift is the **`∂²σ/∂T∂E` cross-term** of the single [[landau-devonshire-permittivity-model|εᵣ(T,E,t) surface]] — the coupling the separable multiplicative model drops.

## Quantitative T_C shift in BaTiO₃ single crystals

[[dulkin-roth-2020-batio3-curie-shift|Dul'kin & Roth 2020]] consolidate four independent measurements:

| Method | dT_C/dE | Range |
|---|---|---|
| Hysteresis loops | **+1.42 °C/(kV/cm)** | E ≤ 6 kV/cm, linear |
| Birefringence | +1.25 °C/(kV/cm) avg | E ≤ 12 kV/cm, nonlinear at high E |
| Acoustic emission | +1.5 °C/(kV/cm) | E ≤ 2 kV/cm, linear |
| Electrocaloric | +0.85 °C/(kV/cm) avg | E ≤ 10 kV/cm, nonlinear |

**MLCC engineering rule of thumb**:

$$
\frac{\Delta T_C}{\Delta E} \;\approx\; +1.3 \;\frac{\text{°C}}{\text{kV/cm}} \;=\; +130 \;\frac{\text{mK}}{\text{V/µm}}
$$

For typical MLCC operating fields:

| Operating field | ΔT_C |
|---|---|
| 1 V/µm | +130 mK (negligible) |
| 5 V/µm | +650 mK (X7R operating field at half rated V) |
| 10 V/µm | +1.3 K (high-CV thin-layer parts at rated V) |
| 20 V/µm | +2.6 K (rare; deep bias derating) |

## Pressure–field equivalence

The same paper establishes that **uniaxial pressure and DC field shift T_C in identical ways**, with conversion factor `p/E ≈ 23.8 (bar·cm/kV)`. This is the deep reason why:

1. **[[piezoelectricity-batio3|Piezoelectric]] and [[electrostriction|electrostrictive]] strain coupling** can produce the same effective T_C shift as a direct DC bias — they're two terms in the same Landau expansion.
2. **[[soft-termination-mlcc|Soft-terminated MLCCs]] should show smaller T_C shifts** in flex-loaded boards than standard-termination parts — the soft termination decouples strain from the ceramic.

## Why the peak ε_r decreases simultaneously

In the Landau picture, the dielectric peak height is set by the curvature of the free energy at the order parameter's equilibrium value. Under DC bias, the equilibrium polarization moves away from the symmetric ferroelectric phase toward a field-aligned, partially saturated state. The free-energy minimum is **deeper** (more stable → higher T_C) AND **stiffer** (larger curvature → lower ε_r = 1/curvature at the minimum).

Net: T_C goes up; peak ε_r goes down. The two effects are not independent — they are conjugate manifestations of bias-induced polarization saturation.

## Two-mechanism hysteresis in MLCCs (not just single crystals)

[[lim-cho-2010-batio3-mlcc-field-induced|Lim & Cho 2010]] measured this on a finished X7R MLCC and identified **two distinct hysteresis mechanisms**:

1. **Ferroelectric domain-switching hysteresis** — the classical mechanism familiar from single crystals.
2. **Injected-charge hysteresis** — electrode-side space-charge accumulation under sustained DC field. Distinct from the ferroelectric loop; produces a baseline tilt + asymmetry.

The chip-sim's [[dc-bias-derating|sigmoid `f_V` model]] captures mechanism 1; mechanism 2 is a low-amplitude correction that grows with sustained bias time (overlapping with the [[dc-bias-aging|DC-bias aging]] domain).

## Structural anchor: tetragonality (c/a)

[[yoon-kim-2020-batio3-tetragonality-dc-bias|Yoon, Kim, & Kim 2020]] linked the field-induced T_C shift to the **structural [[tetragonality-c-a-ratio|tetragonality]]** of the ceramic. Lower c/a (induced by fine grain, Ba excess, or proximity to T_C) means:

- **Smaller field-induced T_C shift** (less stiff Landau response)
- **Larger ε_r under high DC bias** (more headroom along the c-axis)
- **Flatter `f_V(V_DC)` curve** (slower saturation)

This is the structural-parameter knob that ties the academic single-crystal physics to the chip-sim simulator's recipe input.

## What the shift means for the TCC curve at non-zero DC bias

Combining the amplitude collapse (the `f_V` factor) and the peak shift (this concept), the [[temperature-coefficient-of-capacitance|TCC curve]] under DC bias has **two simultaneous deformations**:

1. The whole `ε_r(T)` curve scales down by the factor `f_V(V_DC)` (amplitude collapse).
2. The peak position moves to higher T by `ΔT_C ≈ +1.3 (°C/kV·cm) · E` (peak shift).

The [[tcc-dc-bias-interaction|chip-sim's separable multiplicative model]] handles deformation 1 but **does not shift the peak position**. For high-CV / sub-µm-dielectric parts at high bias, this is a known source of 5–10 % underestimation of TCC excursion near T_C.

Mitigations:
- For [[x7r-dielectric|X7R]] (T_C around 120 °C, well above operating range): the shift is small relative to the distance from T_C; negligible practical impact.
- For [[x8r-x8l-x9r-high-temperature-dielectrics|X8R / X8L]] (T_C engineered into the upper operating range): the shift is significant; the simulator should apply a +1.3 K/(V/µm) correction to the T_C parameter in its TCC model when `V_DC > 30 %` of rated.
- For [[y5v-z5u-class-iii-dielectric|Y5V]] (T_C in the middle of operating range): both deformations are large; the multiplicative model is unreliable; flag higher uncertainty band.

## Cross-references

- [[curie-temperature]] — the parameter being shifted
- [[tcc-dc-bias-interaction]] — the central engineering consequence
- [[temperature-coefficient-of-capacitance]] — what the shift reshapes
- [[dc-bias-derating]] — partner amplitude-collapse mechanism
- [[tetragonality-c-a-ratio]] — structural anchor
- [[batio3]] — host material
- [[ferroelectric-domain-wall]] — switching under bias
- [[electrostriction]], [[piezoelectricity-batio3]] — pressure-equivalent strain coupling
- [[dulkin-roth-2020-batio3-curie-shift]] — quantitative single-crystal anchor
- [[lim-cho-2010-batio3-mlcc-field-induced]] — MLCC-level measurement
- [[yoon-kim-2020-batio3-tetragonality-dc-bias]] — structural-parameter mechanism

## References

- [[dulkin-roth-2020-batio3-curie-shift]]
- [[lim-cho-2010-batio3-mlcc-field-induced]]
- [[yoon-kim-2020-batio3-tetragonality-dc-bias]]
