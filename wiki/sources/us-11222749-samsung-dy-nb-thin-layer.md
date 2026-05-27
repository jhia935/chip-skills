---
title: "US 11,222,749 — Kim, Baik, Kwon, Jo (Samsung) — Dy-Nb Dielectric for Ultra-Thin MLCC (2022)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: high
---

# US 11,222,749 — Samsung's Dy + Nb dielectric for ≤ 0.4 µm layers (2022)

The chemistry that lets [[samsung-electro-mechanics|SEMCO]] hit **sub-0.5 µm dielectric layers** while still meeting reliability targets. The key innovation: **co-doping with dysprosium and niobium** in a precise stoichiometric window — 0.2 mol% < (Dy + Nb) ≤ 1.5 mol% per 100 mol of Ti. Nb partitions to the grain boundaries; Dy partitions through the grain; together they suppress oxygen-vacancy migration in regimes where the [[us-6043974-philips-dy-stabilizer|Philips Dy-alone strategy]] hits its limit at thinner dielectric layers.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 11,222,749 B2 |
| Title | "Dielectric ceramic composition and multilayer ceramic capacitor comprising the same" |
| Assignee | Samsung Electro-Mechanics Co., Ltd. |
| Inventors | Hyoung Uk KIM, Seung In BAIK, Hyung Soon KWON, Ji Hong Jo |
| Filed | 2020-02-27 |
| Granted | 2022-01-11 |

## What it claims

The dielectric composition (Claim 1):

- **Main ingredient**: BaTiO₃ base material
- **First accessory ingredient**: **Dysprosium (Dy) + Niobium (Nb)**
- **Total Dy + Nb loading**: > 0.2 mol and ≤ 1.5 mol per 100 mol of Ti
- (Subsidiary claims add Mn, Mg, Si, Ba/Ca shell-formation rare-earths)

The patent is part of a family — see also US 11,127,532, US 11,735,361, US 11,776,748, US 11,295,894 (Nd variant) — all from the same SEMCO MLCC Design Lab team, all targeting the sub-0.5 µm thin-layer regime.

## Why this works for ≤ 0.4 µm layers

At dielectric thicknesses below ~0.5 µm, [[failure-modes-mlcc|insulation-resistance degradation]] under DC bias becomes the dominant failure mode. The [[us-6043974-philips-dy-stabilizer|Dy-alone approach]] from 1998 handles thicker layers well but loses effectiveness as the dielectric grain count across the thickness drops to 3-5 (per [[core-shell-batio3|the 3-5 grains rule]]).

The Dy + Nb pairing addresses this by:

1. **Dy at the A-site** (Ba²⁺ replacement) — A-site donor that fixes Mn charge state, same role as in the Philips patent.
2. **Nb at the B-site** (Ti⁴⁺ replacement) — also a donor (Nb⁵⁺), but **preferentially segregates to grain boundaries** rather than dissolving uniformly in the grain.

The grain-boundary Nb⁵⁺ creates a high-resistance shell **at the boundaries themselves**, not just within the grains. For thin-layer parts where the grain-boundary density per dielectric column is high (5+ GBs per 0.4 µm), this matters disproportionately — most of the DC-bias-driven leakage path runs through GBs.

The stoichiometric window (>0.2, ≤1.5 mol per 100 mol Ti) is tight: too little Nb and the GB segregation is incomplete; too much and the GB phase becomes its own conduction path or wrecks ε_r.

## Connection to the modern wiki

- [[layer-thickness-and-metal-ceramic-ratio]] — the simulator's framework for thin-layer behavior; this patent is the modern dielectric chemistry that goes with `h_BT ≤ 0.5 µm` regime
- [[epsilon-r-from-dopant-composition]] — the slopes/coefficient framework for predicting ε_r and T_C from recipe
- [[core-shell-batio3]] — Nb's GB segregation is a key part of how modern shell formation is engineered
- [[dopant-site-occupancy-batio3]] — Dy at A-site, Nb at B-site, both donors, complementary
- [[us-6043974-philips-dy-stabilizer]] — predecessor Dy-only strategy
- [[us-9336947-samsung-low-temp-sintering-dielectric]] — the same SEMCO program's earlier patent on the low-T sintering aid that enables thin layers; combines with this dielectric chemistry
- [[bme-reliability-model]] — the Liu framework which gets sharper acceleration constants for these thin-layer parts

## Related Samsung family patents (not separately ingested)

| Patent | Variant | Notes |
|---|---|---|
| US 11,127,532 | Dy + Nb total ≤ 1.5 mol | Range refinement |
| US 11,735,361 | Dy + Nb total ≤ 1.5 mol | Composition variant |
| US 11,776,748 | Dy + Nb >0.2, ≤1.5 mol | Range refinement |
| US 11,295,894 | **Dy + Nd** (instead of Nb) | Alternative donor pair |

These are the dopant chemistries in modern SEMCO CL-series thin-layer high-CV parts (e.g., CL05A106MQ5NUNC and similar 0402 X5R 10 µF families).

## References

- Google Patents: [US 11,222,749 B2](https://patents.google.com/patent/US11222749B2/en)
- [[samsung-electro-mechanics]] — assignee
- [[samsung-cl-series]] — product line implementing this dielectric chemistry
