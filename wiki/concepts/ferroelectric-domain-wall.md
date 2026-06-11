---
title: Ferroelectric Domain Wall (DW)
type: concept
created: 2026-05-19
updated: 2026-05-19
status: complete
importance: medium
sources:
  - arxiv-batio3-domain-wall-motion.md
  - vishay-x7r-cap-drift-dc-bias.md
tags:
  - paper
---

# Ferroelectric Domain Wall (DW)

A **domain wall** is the boundary between two regions of a ferroelectric crystal that have different orientations of spontaneous polarization `Pₛ`. In tetragonal [[batio3|BaTiO₃]], 6 polar variants exist along the C₄ axes, and the most common DWs are **180°** (anti-parallel) and **90°** (perpendicular).

DWs are the physical seat of most of the **εr** that MLCC engineering cares about.

## Why MLCC engineers care
[[arxiv-batio3-domain-wall-motion]] (Gurung et al. 2024) shows by Landau-Ginzburg simulation that:
- **Extrinsic εr from DW motion is ~2 orders of magnitude larger** than the intrinsic intra-domain contribution.
- DW response gets bigger as `T → T_C` (= 393 K = 120 °C for bulk BaTiO₃).
- The DW vibration decomposes into a **sliding** mode (rigid translation, lower frequency) and a **breathing** mode (profile-thickness oscillation, higher frequency).

This is the microscopic root of the [[permittivity-stability-tradeoff|permittivity–stability trade-off]]: the high `εr` *is* DW mobility, so anything that suppresses DWs (field, time, fine grain) both crashes `εr` and is itself a derating axis. Three things in MLCC physics suppress DWs:

1. **DC bias** → pins DWs along the field direction → `εr` drops. This is the mechanism of [[dc-bias-derating]].
2. **Aging** → DWs relax to lower-energy positions, becoming harder to move → `εr` slowly decays. This is [[aging-class-2]].
3. **Fine grains** below ~200 nm → DWs are absent because the grain is below the critical size for ferroelectricity → `εr` collapses. This is the [[core-shell-batio3]] thin-layer limit.

## Characteristic frequencies
| Phenomenon | Frequency (BaTiO₃ at room T) |
|---|---|
| Intra-domain dipole response (intrinsic) | ~500 GHz |
| 180° DW vibration | **~10 GHz** |
| 90° DW vibration | not in the same paper |

The "MLCC `εr` is roughly flat from DC to 100 MHz" observation in datasheets is consistent with the DW relaxation being above the operating band.

## Hysteresis vs DW motion
The P–E hysteresis loop has two regimes:
- **Reversible** (small AC field): DWs vibrate around their pinned position — gives the linear `εr`.
- **Irreversible** (above coercive field): DWs nucleate, grow, and switch entire domain orientations — gives the hysteresis.

The "reversible vibration" regime is what an MLCC operates in. DC bias plus AC ripple = small displacements around a biased equilibrium.

## Implications for the simulator
- The simulator should treat `εr(f)` as roughly flat below ~1 GHz with a rolloff toward GHz where DW relaxation finishes.
- Aging factor `f_age(t)` is the slow-relaxation tail of DW re-positioning.
- DC bias factor `f_VCC(E)` is DW pinning — sigmoid because once all DWs are aligned with `E`, no further `εr` drop is possible.
- Grain-size effect on DW count: smaller grains → fewer DWs per grain → less DW contribution → lower bulk `εr` (the sub-200 nm cliff in [[batio3]]).

## Cross-references
- [[batio3]]
- [[dc-bias-derating]]
- [[aging-class-2]]
- [[core-shell-batio3]]
- [[curie-temperature]]

## References
- [[arxiv-batio3-domain-wall-motion]]
- [[vishay-x7r-cap-drift-dc-bias]] (Fig. 1 hysteresis loop)
