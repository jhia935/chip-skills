---
title: Piezoelectricity in BaTiO₃ MLCC
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - covaci-gontean-2022-singing-mlcc.md
tags:
  - paper
status: draft
importance: medium
---

# Piezoelectricity in BaTiO₃ MLCC

**Linear** mechanical strain response to electric field: `s = d · E`. Active **only below T_C** in a non-centrosymmetric phase. [[batio3|BaTiO₃]] in its tetragonal ferroelectric phase has a piezoelectric coefficient `d_33` ≈ 90 pm/V (single crystal); poly-domain ceramic d_33 is lower because the random domain orientations partly cancel. In Class II MLCCs, the macroscopic d_33 emerges from **net DC-bias-induced poling**: even small DC fields preferentially orient domains and switch on a finite d_33.

## Distinction from [[electrostriction]]

Piezoelectricity is the linear effect; electrostriction is the quadratic effect. Above T_C, piezoelectricity collapses (BaTiO₃ becomes cubic / paraelectric) while electrostriction survives. Within the typical operating range of an X7R / X5R (−55 to +85/125 °C), both contribute to the strain coupling that feeds back into the [[ac-voltage-coefficient-mlcc|AC voltage coefficient]] and the [[mlcc-acoustic-noise|acoustic emission]].

## Sign convention and DC poling

`d_33` of a freshly fabricated MLCC is small/random because domains are not aligned. After **DC bias is applied** (even briefly), a net polarization develops and `d_33` jumps to its single-domain-aligned value. This is why:

- A part being measured for the first time after manufacture shows small piezo response
- The same part after [[aging-class-2|aging]] in service shows larger response
- The same part after de-aging above T_C resets

## Relation to TCC × AC coupling

Because `d_33 → 0` as T → T_C, the piezoelectric strain contribution to small-signal ε_r **collapses near and above T_C**. This is the temperature mechanism behind the strain-driven contribution to [[tcc-ac-coupling|TCC × AC coupling]]: AC dependence of the TCC curve is **strongest at low T and decreases near T_C** for the piezoelectric piece (while remaining for the electrostriction piece).

## Cross-references

- [[electrostriction]] — quadratic counterpart
- [[batio3]] — host material
- [[ferroelectric-domain-wall]] — DC bias aligns domains, switching on `d_33`
- [[curie-temperature]] — where d_33 collapses
- [[ac-voltage-coefficient-mlcc]] — strain contribution to AC sensitivity
- [[mlcc-acoustic-noise]] — fundamental-frequency vibration source
- [[covaci-gontean-2022-singing-mlcc]] — primary review

## References

- [[covaci-gontean-2022-singing-mlcc]]
