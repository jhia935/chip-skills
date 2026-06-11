---
title: MLCC Capacitance Equation
type: concept
created: 2026-05-19
updated: 2026-05-19
status: complete
importance: high
sources:
  - kemet-mlcc-design-and-characteristics.md
  - psma-ceramic-capacitor-basics.md
  - nasa-nepp-bme-mlcc-reliability.md
  - knowles-fundamentals-3 (web)
tags:
  - paper
---

# MLCC Capacitance Equation

The nominal capacitance of a multilayer ceramic capacitor is the parallel-plate formula multiplied by the active layer count:

$$
C \;=\; \varepsilon_r \cdot \varepsilon_0 \cdot \frac{A \cdot N}{d}
$$

| Symbol | Meaning |
|---|---|
| `εr` | relative permittivity of the dielectric (material- and class-dependent) — see [[eia-rs-198-dielectric-classes]] |
| `ε₀` | vacuum permittivity, 8.854 × 10⁻¹² F/m |
| `A` | **effective overlap area** between opposing internal electrodes |
| `N` | number of active dielectric layers (some sources use N−1 for the edge correction) |
| `d` | dielectric (sheet) thickness post-sintering |

The cited sources agree on this form; [[nasa-nepp-bme-mlcc-reliability]] uses `S` for area and `N` for layer count, [[kemet-mlcc-design-and-characteristics]] uses `A, n`. The (N−1) form appears in the older [[psma-ceramic-capacitor-basics]] handout — the difference is negligible at modern N > 50.

## Effective area
`A` is **not** the outer footprint. It is the overlap of opposing internal electrodes, which is the outer length × width **minus margins**:

$$
A \;=\; (L - 2 m_\text{end})(W - 2 m_\text{side})
$$

Reference margins are tabulated in [[case-size-geometry]].

## Equivalent parallel network
Each dielectric layer is functionally a single-plate capacitor, and the stack is a parallel network:
$$
C_\text{total} = C_1 + C_2 + \dots + C_N = N \cdot C_i
$$
This is why both layer **thinning** (smaller `d`) and **stacking** (larger `N`) increase capacitance. See [[bme-reliability-model]] for the corollary cost on reliability.

## Volumetric efficiency
A useful corollary ([[nasa-batio3-mlcc-failure-mechanisms]] Eq. 3):
$$
\frac{C}{V_\text{chip}} \;\approx\; \varepsilon_0 \cdot \frac{\varepsilon_r}{d^2} \;\approx\; 8.854\times 10^{-8} \cdot \frac{\varepsilon_r}{d^2} \;[\mu F/cm^3]
$$
This drives the entire MLCC industry roadmap: **decrease d, raise εr**. Both have physical floors — see [[core-shell-batio3]] for the εr-vs-grain-size collapse below `r̄ ≈ 200 nm`, and [[permittivity-stability-tradeoff]] for why the `raise εr` lever costs temperature/DC-bias/aging stability (all gradients of the [[landau-devonshire-permittivity-model|single εᵣ(T,E,t) surface]]).

## What this equation does not capture
- Field-dependent `εr` collapse under DC bias → [[dc-bias-derating]]
- AC-bias, temperature, frequency dependence of `εr`
- Aging (logarithmic time decay of `εr` in Class II) → [[aging-class-2]]
- Parasitic ESR/ESL → [[esr-esl-srf]]

These are layered on top of the nominal `C` as multiplicative correction factors. The full simulator model is in `resources/design-rules/simulator-model.md`.

## References

- [[kemet-mlcc-design-and-characteristics]]
- [[psma-ceramic-capacitor-basics]]
- [[nasa-nepp-bme-mlcc-reliability]]
- [[nasa-batio3-mlcc-failure-mechanisms]]
