---
title: MLCC Acoustic Noise ("Singing Capacitors")
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - covaci-gontean-2022-singing-mlcc.md
status: draft
importance: low
---

# MLCC Acoustic Noise ("Singing Capacitors")

Class II MLCCs emit **audible sound** when driven by AC voltages in the human-hearing range (~ 20 Hz – 20 kHz), because the AC field drives mechanical strain via [[piezoelectricity-batio3|piezoelectricity]] (linear) and [[electrostriction|electrostriction]] (quadratic), which vibrates the part and the PCB it's soldered to. The board itself acts as a sounding plate, amplifying the emission.

Same root mechanism as the [[ac-voltage-coefficient-mlcc|AC voltage coefficient]] — strain coupling to ε_r — but the externally-visible problem is the acoustic emission rather than the small-signal capacitance modulation.

## Empirical correlation from [[covaci-gontean-2022-singing-mlcc|Covaci & Gontean 2022]]

$$
\text{SPL}\,[\text{dB}] = 0.57 \cdot V_\text{cb} + 127.30
$$

where `V_cb` is PCB vibration RMS velocity.

## Mitigation strategies (relevant to chip-sim recipe selection)

- **[[soft-termination-mlcc|Soft termination]]** — decouples strain from PCB. Patented as FO-CAP ([[us-8713770-kemet-flex-crack-voids]]), OpenMode (KEMET, KYOCERA-AVX), JCC.
- **Stacked-pair counterphase** — paired capacitors with opposite poling cancel fundamental-frequency vibration in the plane of the PCB.
- **Non-uniform dielectric layers** (US 9,330,849) — design-level mechanical decoupling.
- **Class change** Y5V → X5R — reduces both d_33 and ε_r, dropping the d_33·ε_r product that sets emission.

## Cross-references

- [[piezoelectricity-batio3]], [[electrostriction]] — physical mechanisms
- [[ac-voltage-coefficient-mlcc]] — sibling small-signal manifestation
- [[soft-termination-mlcc]] — mitigation
- [[covaci-gontean-2022-singing-mlcc]] — review

## References

- [[covaci-gontean-2022-singing-mlcc]]
