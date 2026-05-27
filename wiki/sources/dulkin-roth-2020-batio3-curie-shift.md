---
title: "Dul'kin & Roth 2020 — Pressure and Electric Field Shifting the Curie Temperature in BaTiO₃"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - dulkin-roth-2020-batio3-curie-shift.md
tags:
  - paper
status: complete
importance: high
---

# Dul'kin & Roth 2020 — Establishing the Relationship Between Uniaxial Pressure and Electric Field Shifting the Curie Temperature in BaTiO₃ Crystals

**Source**: Dul'kin, E., & Roth, M. (2020). **Establishing relationship between an uniaxial pressure and an electric field shifting the Curie temperature in BaTiO₃ crystals**. *arXiv preprint*.
[arXiv: 2008.00790](https://arxiv.org/abs/2008.00790)
Authors at Hebrew University of Jerusalem, Department of Applied Physics.

Local copy: `resources/literature/_tmp/arxiv-batio3-curie-shift.txt` (full text extracted).

## Summary

A short literature-comparison paper showing that **uniaxial pressure** and **DC electric field** shift the BaTiO₃ Curie temperature by **identical mechanisms** up to a scale factor. Its value for this wiki is as **a quantitative anchor**: it consolidates dT_C/dE measurements from four independent techniques on BaTiO₃ single crystals, giving the cleanest published number for "how much does DC bias shift T_C?" — the key mechanism behind the DC-bias dependency of the TCC curve.

For MLCC engineering: the field shifts the Curie peak **upward**, so a DC bias actually **enhances** the dielectric envelope's T_max — but at the cost of **lowering ε_r at the peak**. The two effects partially cancel in the operating temperature range but interact non-trivially near T_C.

## Key Points — quantitative T_C shift measurements

Four independent measurement techniques on BaTiO₃ single crystals, with their reported T_C shifts (`ΔT_C`) under applied DC field (`E`):

| Method | Source | ΔT_C | E_max | Linear in E? | dT_C/dE |
|---|---|---|---|---|---|
| Hysteresis loops (Remeika crystals) | Ref [1] | +8.5 °C | 6 kV/cm | **Linear** | **+1.42 °C/(kV/cm)** |
| Birefringence (Remeika crystals) | Ref [2] | +15 °C | 12 kV/cm | Nonlinear, linearizes at low E | +1.25 °C/(kV/cm) avg |
| Acoustic emission (melt-grown) | Ref [3] | +3 °C | 2 kV/cm | Linear | +1.5 °C/(kV/cm) |
| Electrocaloric effect (melt-grown) | Ref [4] | +8.5 °C | 10 kV/cm | Nonlinear | +0.85 °C/(kV/cm) avg |

The hysteresis and acoustic-emission values **agree well** (linear, ~1.4–1.5 °C/(kV/cm)); the birefringence and electrocaloric values **agree well** (nonlinear at high E). The two pairs differ in absolute slope but both confirm that **DC bias shifts T_C upward** (enhances it).

**Practical rule of thumb for MLCC engineering**:

$$
\Delta T_C \;\approx\; +1.3 \;\frac{\text{°C}}{\text{kV/cm}} \cdot E \;=\; +130 \;\frac{\text{mK}}{\text{V/µm}} \cdot E_\text{V/µm}
$$

So at typical MLCC operating fields:
- `E = 1 V/µm` (light operation): ΔT_C ≈ +130 mK — negligible
- `E = 5 V/µm` (standard X7R operating field): ΔT_C ≈ +650 mK — small but measurable
- `E = 10 V/µm` (high-CV/thin-layer parts at rated V): ΔT_C ≈ +1.3 K — affects X8R/X8L envelope compliance
- `E = 20 V/µm` (rare; deep into bias derating): ΔT_C ≈ +2.6 K — significant near T_C

## Key Points — pressure–field equivalence

The paper's central result is the equivalence:

> "Such perfect coincidence unambiguously proves that both p and E shift the T_C in the same manner."

Both `T_C(p)` and `T_C(E)` are well-approximated by saturating curves (effectively sigmoidal). The conversion ratio is:

$$
\frac{p}{E} \;\approx\; 23.8 \;\frac{\text{bar·cm}}{\text{kV}}
$$

So a 1000 bar uniaxial pressure produces the same T_C shift as an electric field of ~42 kV/cm. For MLCCs this means **the strain-coupled contribution to the TCC shift** ([[piezoelectricity-batio3|piezoelectric]] and [[electrostriction|electrostrictive]] coupling) and the **direct electric-field contribution** are physically interchangeable — they're two faces of the same Landau-energy free-energy expansion.

## Implications for MLCC design rules

1. **Direct field-induced T_C shift** is the cleanest mechanism behind the [[tcc-dc-bias-interaction|DC bias × TCC coupling]]: under bias, the dielectric peak moves higher, so the ε_r(T) curve shape moves higher.
2. **For X8R / X8L parts** (with T_C around 70–90 °C, near room T): the +1 K shift from typical operating bias is in the same direction as the bias-induced amplitude collapse — partial mutual cancellation. Effective `f_T(T) × f_V(V_DC)` works better here than the naive prediction would suggest.
3. **For Y5V** (T_C in the operating range): the shift moves T_C across the operating envelope while bias amplifies the loss — the two effects compound rather than cancel.
4. **For X7R / X5R** (T_C ~ 120 °C, above the operating range): the bias-induced shift is small relative to the distance from T_C; bias loss is dominated by amplitude collapse, not peak shift.
5. **Strain-coupled origin**: the pressure-equivalence means [[soft-termination-mlcc|soft-termination MLCCs]] (which decouple ceramic from PCB strain) should show a smaller bias-induced T_C shift than standard-termination parts in flex-loaded boards.

## Entities Mentioned

- [[evgeniy-dulkin]] — first author *(stub)*
- [[michael-roth]] — co-author *(stub)*
- [[hebrew-university-jerusalem]] — institution *(stub)*
- [[batio3]] — material studied

## Concepts Discussed

- [[field-induced-curie-shift]] — the central topic
- [[curie-temperature]] — quantitative shift values
- [[batio3]] — the test material (single-crystal)
- [[tetragonality-c-a-ratio]] — related structural parameter
- [[ferroelectric-domain-wall]] — underlying physics
- [[electrostriction]], [[piezoelectricity-batio3]] — strain-field-equivalence partners
- [[tcc-dc-bias-interaction]] — the MLCC-engineering consequence
- [[dc-bias-derating]] — direct manifestation in `f_V`

## Notable Quotes

> "Shifting the Tc on 8.5 °C, detected from the hysteresis loops of BaTiO₃ crystals grown by the Remeika method, was found to be linear as E enhances up to 6 kV/cm."

> "Both these dependencies perfectly coincide when adjusting the scale. […] This perfect coincidence unambiguously proves that both p and E shift the T_C in the same manner."

## References

_arXiv preprint, open access._
