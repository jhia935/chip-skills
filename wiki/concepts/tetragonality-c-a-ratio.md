---
title: Tetragonality (c/a Ratio) of BaTiO₃
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - yoon-kim-2020-batio3-tetragonality-dc-bias.md
tags:
  - paper
status: draft
importance: medium
---

# Tetragonality (c/a Ratio) of BaTiO₃

The ratio of the long lattice parameter `c` to the short parameter `a` of the **tetragonal phase** of [[batio3|BaTiO₃]]. In the cubic (paraelectric) phase above T_C, `c = a` and `c/a = 1`. Below T_C, the tetragonal distortion has `c > a` and `c/a > 1`. For room-temperature single-crystal BaTiO₃, `c/a ≈ 1.011`.

In MLCC ceramics, the **actual c/a** of the dielectric is reduced from the single-crystal ideal by:

- **Fine grain size**: nano-grain ceramics show smaller c/a (the surface-pinned domain walls don't allow full tetragonal strain to develop).
- **Excess Ba (A/B > 1)**: shifts c/a toward 1.
- **High measurement temperature** (approaching T_C): c/a → 1 at T_C.
- **Dopants** (Sn, Zr, Ca on B-site; rare earths): mostly reduce c/a.

## Why tetragonality matters for MLCC engineering

[[yoon-kim-2020-batio3-tetragonality-dc-bias|Yoon, Kim, & Kim 2020]] established **lower c/a → better DC-bias dielectric performance**:

- **Higher ε_r under high DC bias**: more headroom for the field-aligned dielectric response along the c-axis.
- **Flatter `f_V(V_DC)` curve**: slower saturation under bias.
- **Smaller [[field-induced-curie-shift|field-induced T_C shift]]**: stiffer/less responsive Landau expansion.

The trade-off: at zero bias, lower c/a typically means **lower peak ε_r** at T_C. So there's a Pareto curve between zero-bias capacitance and bias-robustness, with c/a as the slider.

## Quantitative scale

| State | c/a |
|---|---|
| Cubic (above T_C, paraelectric) | 1.000 |
| Single-crystal BaTiO₃ at room T | ~1.011 |
| Coarse-grain ceramic (~5 µm) at room T | ~1.010 |
| Fine-grain ceramic (~200 nm) at room T | ~1.005–1.007 |
| Near nano-grain limit (~50 nm) | ~1.001 (approaching cubic) |

The fine-grain X7R operating range (200–260 nm per [[an-2026-grain-boundary-segregation-dc-bias|An 2026]]) corresponds to `c/a ≈ 1.005–1.007` — the sweet spot for combined ε_r and bias robustness.

## Cross-references

- [[batio3]] — host material
- [[curie-temperature]] — c/a → 1 at T_C
- [[field-induced-curie-shift]] — c/a sets the shift magnitude
- [[dc-bias-derating]] — c/a sets `f_V` shape
- [[nano-grain-batio3-epsilon-r]] — grain-size scaling of c/a
- [[core-shell-batio3]] — shell has higher c/a than core
- [[yoon-kim-2020-batio3-tetragonality-dc-bias]] — central source
- [[cubic-tetragonal-transition]] — phase transition that establishes finite c/a
- [[epsilon-r-from-dopant-composition]] — dopants modulate c/a

## References

- [[yoon-kim-2020-batio3-tetragonality-dc-bias]]
