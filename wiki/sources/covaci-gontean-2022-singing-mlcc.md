---
title: "Covaci & Gontean 2022 — Singing MLCC Review"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - covaci-gontean-2022-singing-mlcc.md
tags:
  - paper
status: complete
importance: medium
---

# Covaci & Gontean 2022 — "Singing" Multilayer Ceramic Capacitors and Mitigation Methods: A Review

**Source**: Covaci, C., & Gontean, A. (2022). **"Singing" multilayer ceramic capacitors and mitigation methods—A review**. *Sensors*, **22** (10), 3869.
DOI: [10.3390/s22103869](https://doi.org/10.3390/s22103869)
Open access via MDPI / PMC: [PMC9147252](https://pmc.ncbi.nlm.nih.gov/articles/PMC9147252/)

## Summary

A review of **acoustic-noise emission from Class II MLCCs under AC excitation**. While the visible problem is audible noise (board buzz, "singing"), the underlying mechanism — **AC-induced mechanical strain via piezoelectricity plus electrostriction** — is also the dominant source of the **non-monotonic AC-voltage dependence of effective capacitance**. This review is the most cited mechanistic treatment of MLCC strain-coupled dielectric response.

## Key Points — the strain mechanism

The mechanical strain `s_z` in the dielectric stack direction under an applied field `E_z` has two terms:

$$
s_z = d_{33} \cdot E_z + M_{33} \cdot E_z^2
$$

- `d_33` — piezoelectric coefficient. **Linear in E**; active only when the material has macroscopic polarization (i.e., ferroelectric phase below T_C).
- `M_33` — electrostrictive coefficient. **Quadratic in E**; present in both ferroelectric and paraelectric phases.

For a combined AC + DC excitation `E_z(t) = E_DC + E_AC sin(ωt)`:

- The **piezoelectric term** produces vibration at `ω` proportional to `d_33 · E_AC`.
- The **electrostriction term** produces vibration at **`ω` proportional to `2 · M_33 · E_DC · E_AC`** and **at `2ω` proportional to `M_33 · E_AC² / 2`**.

The key consequence for AC-dependent capacitance: **the fundamental-frequency vibration is influenced by both piezoelectricity and electrostriction**, but **the electrostrictive contribution at ω requires non-zero DC bias** (it scales as `E_DC · E_AC`). At zero DC, only the piezoelectric term survives at the fundamental — and piezoelectricity requires non-zero macroscopic polarization, which is suppressed at the nominal "unpoled" state.

## Why this matters for the AC dependency of TCC

The piezoelectric + electrostrictive coupling means the **dielectric response to small-signal AC is not pure electrical** — it also drives a mechanical strain that **feeds back into ε_r through the strain-derivative of permittivity**. The composite small-signal response is:

$$
\varepsilon_r^\text{measured}(E_{AC}, E_{DC}, T) \;=\; \varepsilon_r^\text{pure-dielectric} + (\text{piezo and electrostriction strain coupling terms})
$$

Both correction terms depend on:
- **Temperature** (piezoelectric coefficients drop sharply above T_C; electrostriction is more T-flat)
- **DC bias** (electrostriction at fundamental is `∝ E_DC`)
- **AC amplitude** (both terms are E_AC-proportional in the small-signal limit, but quadratic in E_AC at larger amplitudes)

So the measured TCC curve is not a "pure" dielectric quantity at finite AC — it has a strain-mechanical admixture that depends on the AC level. This is one mechanism behind the non-monotonic AC dependence reported by [[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020/2022]] and the dispersion captured by [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz's bell-shaped model]].

## Key Points — temperature stability of the strain mechanism

> "The BaTiO₃ material does not present significant variations up to the Curie temperature, around 130 °C."

i.e., within the typical operating range (−55 to +125 °C for X7R), `d_33` and `M_33` are relatively flat, so the AC-strain admixture to ε_r doesn't change dramatically with temperature *until* you approach T_C. Above T_C the piezoelectric term collapses (no polarization to couple to) — leaving only the smaller electrostriction.

## Empirical correlation

The review reports a **measured SPL-to-vibration relation**:

$$
\text{SPL}\,[\text{dB}] = 0.57 \cdot V_\text{cb} + 127.30
$$

where `V_cb` is the PCB-vibration RMS velocity. Useful for predicting acoustic noise from the same strain that creates the AC capacitance dependence — same root mechanism.

## Mitigation strategies discussed (relevant to chip-sim recipe parameters)

The review surveys hardware-side mitigation:

- **Soft-termination** ([[us-8713770-kemet-flex-crack-voids|FO-CAP / OpenMode]] families) — decouples the strain from the PCB.
- **Stacked-pair counterphase capacitors** — cancels the fundamental-frequency vibration in PCB plane.
- **Non-uniform dielectric layer architectures** (US 9,330,849 referenced in search results) — suppresses the AC-driven strain at design level.
- **Y5V → X5R substitution** — Y5V has the highest `d_33` × `ε_r` product, so the worst singing; switching to X5R reduces both.

These same modifications **reduce the AC dependency of effective capacitance** because they suppress the strain feedback term. The chip-sim simulator could expose "soft-term / standard-term" as a recipe parameter that toggles this contribution.

## Entities Mentioned

- [[ciprian-covaci]] — first author *(stub)*
- [[aurel-gontean]] — second author *(stub)*
- [[batio3]] — material
- [[us-8713770-kemet-flex-crack-voids]] — related KEMET patent

## Concepts Discussed

- [[electrostriction]] — central mechanism *(stub)*
- [[piezoelectricity-batio3]] — partner mechanism *(stub)*
- [[ac-voltage-coefficient-mlcc]] — implied
- [[tcc-ac-coupling]] — implied
- [[ferroelectric-domain-wall]] — strain coupling here
- [[curie-temperature]] — where piezo collapses
- [[mlcc-acoustic-noise]] — the visible problem *(stub)*
- [[soft-termination-mlcc]] — mitigation *(stub)*

## Notable Quotes

> "The vibration at the fundamental frequency is influenced both by piezoelectricity and electrostriction."

> "The nonlinear characteristic of the MLCC is present only when the DC electric field is not zero."

> "SPL = 0.57 · V_cb + 127.30"

## References

_Open access via MDPI Sensors / PMC._
