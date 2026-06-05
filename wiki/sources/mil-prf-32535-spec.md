---
title: "MIL-PRF-32535 — High-Reliability BME MLCC Specification"
type: source
created: 2026-06-05
updated: 2026-06-05
sources:
  - mil-spec-mlcc-requirements.md
tags:
  - standard
status: complete
importance: high
---

# MIL-PRF-32535 — High-Reliability BME MLCC Specification

The U.S. DoD performance spec for **base-metal-electrode (Ni)** military/space MLCCs — the modern counterpart to the PME [[mil-prf-123-spec|MIL-PRF-123]]. It enables thin BME dielectrics (much higher CV in a given case) while holding MIL reliability via a geometry + breakdown + life-model regime. The NASA space spec [[gsfc-mlcc-space-specs|S-311-P-838]] is built on top of it.

Source: MIL-PRF-32535B (DLA) + [KYOCERA AVX M32535 datasheet](https://datasheets.kyocera-avx.com/AVX-MIL-PRF-32535.pdf). Raw: `resources/design-rules/mil-spec-mlcc-requirements.md`.

## Key structural philosophy
Unlike [[mil-prf-123-spec|123]], **32535 does not fix a minimum dielectric thickness**. It instead:
1. controls internal geometry via **voltage-scaled side/end margin and cover-plate tables** (Tables VIII/IX/X — see [[mlcc-margin-cover-design-rules]]);
2. screens every part with a **destructive breakdown test** — `VBR ≥ 6×VR or 1200 V`, whichever is less;
3. proves life with a **cube-law voltage-acceleration model** `T_test = A/(E_test/E_rated)³`, with `2·E_r < E_test < 4·E_r`, `A = 1344 (T-level) / 800 (M-level)`, acceleration 8:1, exponent **n = 3**.

For thin layers (`d ≤ 7 µm`) a **SEM provision** distinguishes true voids from DPA-induced artifacts; voids may not reduce thickness by >50 %. **No max dielectric constant** is stated (contrast 123's K ≤ 3000). Max layer count is *not* in 32535 — the ≤300-layer cap and the grains-per-layer PRVT gate are [[gsfc-mlcc-space-specs|S-311-P-838]] add-ons.

## Dielectric classes (Table I)
BG, BP, **E1 = C0G** (Class I, 0±30 ppm/°C), BR/BX/BZ/BN (Class II ±15 %, differing %-rated-V steps), **E2 = X7R**, **E3 = X7S** (±22 %). Electrodes are nickel; Sn/Pb plating ≥3 % Pb (pure tin prohibited).

## Envelope & dimensions (AVX M32535)
Case **0402–2220**, **16–100 V**, **2.2 nF–22 µF**, X7R. **M-level** (standard) / **T-level** (space). Dielectric thickness is specified "measured after firing"; the margin/cover Tables VIII/IX/X and the chip L×W×T below are likewise **fired / finished-part** values (DPA acceptance on the sintered part), not green. Chip L×W×T (mm):

| | 0402 | 0603 | 0805 | 1206 | 1210 | 1812 | 2220 |
|---|---|---|---|---|---|---|---|
| L | 0.92–1.12 | 1.45–1.75 | 1.79–2.26 | 3.00–3.45 | 2.94–3.45 | 4.19–4.80 | 5.2–6.1 |
| W | 0.41–0.61 | 0.66–0.97 | 1.01–1.52 | 1.35–1.85 | 2.25–2.74 | 2.89–3.50 | 4.59–5.41 |
| T max | 0.61 | 0.99 | 1.52 | 1.78 | 2.80 | 2.80 | 2.80 |

DWV 250–400 % VR. Delamination reject: single delam >20 % of interface AND >0.127 mm (>0603) / >0.051 mm (≤0603).

## Cross-references
- [[mil-prf-123-spec]] — the PME predecessor (fixed-thickness regime)
- [[gsfc-mlcc-space-specs]] — NASA S-311-P-838 layered on this spec
- [[mlcc-margin-cover-design-rules]] — Tables VIII/IX/X reproduced
- [[bme-vs-pme]], [[dielectric-layer-thickness-floor]], [[mlcc-dimensional-tolerance]]
- [[kyocera-avx]] — only qualified S-311-P-838 supplier; major 32535 vendor
- [[aec-q200-rev-e-2023]] — automotive analogue spec family

## References
- `resources/design-rules/mil-spec-mlcc-requirements.md`
