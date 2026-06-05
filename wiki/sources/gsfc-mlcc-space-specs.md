---
title: "NASA GSFC MLCC Space Specs — S-311-P-838 / S-311-P-829 / EEE-INST-002"
type: source
created: 2026-06-05
updated: 2026-06-05
sources:
  - gsfc-mlcc-space-spec-requirements.md
tags:
  - standard
status: complete
importance: high
---

# NASA GSFC MLCC Space Specs — S-311-P-838 / S-311-P-829 / EEE-INST-002

The NASA Goddard space-level qualification layer above the DoD MIL specs: **S-311-P-838** (BME), **S-311-P-829** (PME), and **EEE-INST-002** (parts selection + derating). Together they form the *design-rule envelope* that the [[nasa-gsfc-liu-construction-database-2011|measured-DPA database]] is judged against.

Sources: [S-311-P-838B](https://nepp.nasa.gov/files/30348/S-311-P-838B.pdf), [S-311-P-829K](https://nepp.nasa.gov/files/30344/S-311-P-829_K.pdf), [EEE-INST-002](https://s3vi.ndc.nasa.gov/ssri-kb/static/resources/EEE-INST-002_add1.pdf). Raw: `resources/design-rules/gsfc-mlcc-space-spec-requirements.md`.

## S-311-P-838 (BME X7R) — the space BME spec
Builds on [[mil-prf-32535-spec|MIL-PRF-32535]] and adds two structural gates the DoD spec lacks. Only qualified supplier to date: [[kyocera-avx|KYOCERA AVX]].

**Minimum fired dielectric thickness vs rated V** ("measured after firing" — all S-311-P-838/829 geometry limits, including margins and cover, are **fired/post-sinter** values; constant across 0603–1812):

| Rated V | min d |
|---|---|
| 16 / 25 V | 0.28 mil = **7.1 µm** |
| 50 V | 0.33 mil = **8.4 µm** |
| 100 V | 0.60 mil = **15.2 µm** |

- **Dielectric layers ≤ 300.**
- **Grains-per-layer reliability gate (Eq. 1):** `Ft = 1 − [1 − (r̄/d)^α]^N < 1e-5`, with **α = 6 (VR ≤ 100 V), α = 5 (VR > 100 V)**; grain size by Linear Intercept (ASTM E112-10). This is the [[bme-reliability-model|structural-reliability factor]] turned into an acceptance criterion.
- Void limit ≤30 % of thickness; breakdown screen `VBR ≥ 6×VR`; DWV 2.5×VR; life 2×VR/125 °C.
- Margin/cover floors and the EIA-469 deference → see [[mlcc-margin-cover-design-rules]]. Case 0402–1812, X7R, 16/25/50/100 V, Ni electrodes.

## S-311-P-829 (PME NP0/X7R) — the space PME spec
Mirrors [[mil-prf-123-spec|MIL-PRF-123]]: min d 0.8 mil (≤50 V) / 1.0 mil (100 V), with a per-type Table I (X7R thinner at low V: 0.25–0.4 mil @5–6.3 V). **Max K = 4000 (X7R) / 100 (NP0)**, void ≤50 %, no layer cap, no PRVT (BME-only). Covers reverse-geometry low-inductance styles (0306/0508/0612/0912), 5–100 V.

## EEE-INST-002 — derating
Ceramic (CCR/CKS/CKR/CDR): **voltage-derate factor 0.60, max ambient 110 °C**, applied to (DC + peak AC ripple). For <10 Vdc applications, use parts rated **≥100 Vdc** (Level 1; Level 2 may use <100 V with MIL-PRF-123 Group B HSSLV). No thickness/K/margin geometry rules — those live in 838/829.

## Cross-references
- [[mil-prf-32535-spec]] / [[mil-prf-123-spec]] — the DoD specs these extend
- [[mlcc-margin-cover-design-rules]] — margin/cover floors
- [[nasa-gsfc-liu-construction-database-2011]] — measured parts vs this envelope
- [[bme-reliability-model]] — the `(1−(r̄/d)^α)^N` gate; [[dielectric-layer-thickness-floor]]
- [[donhang-liu]], [[alexander-teverovsky]], [[nasa-nepp]], [[kyocera-avx]]

## References
- `resources/design-rules/gsfc-mlcc-space-spec-requirements.md`
