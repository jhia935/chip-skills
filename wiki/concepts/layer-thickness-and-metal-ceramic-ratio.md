---
title: Layer Thickness and Metal/Ceramic Ratio in BME MLCC
type: concept
created: 2026-05-21
updated: 2026-05-21
sources:
  - yan-thesis-2013-mlcc-sintering-nanotomography.md
  - sugimura-hirao-2009-batio3-additive-ni-electrode.md
tags:
  - paper
status: complete
importance: high
---

# Layer Thickness and Metal/Ceramic Ratio in BME MLCC

How thin the dielectric and electrode layers are, and how much of the stack is **metal vs ceramic**, are the two most important geometric variables for shrinkage prediction in an alternating Ni / BT stack. Both are pushed hard by the miniaturization roadmap, and both directly control the magnitudes of every effect on [[dielectric-shrinkage-in-mlcc-stack]] and [[metal-electrode-shrinkage-effect]].

This page consolidates the quantitative scaling: three thickness scales (chip / layer / particle), three definitions of "metal/ceramic ratio" (in-paste / per-layer / stack-level), and how each maps onto shrinkage behavior.

## Historical thickness evolution

Generations of BME MLCC dielectric / electrode thickness ([[yan-thesis-2013-mlcc-sintering-nanotomography|Yan thesis (2013) Ch. 1]] Fig 1.7 + 2025 industry):

| Era | Dielectric `h_BT` | Electrode `h_Ni` | Layer count `N_e` | Typical part |
|---|---|---|---|---|
| Mid-1990s PME | 10–15 µm | 2–5 µm Pd | 20–50 | 0805 / 1 µF |
| Late-1990s BME (Gen 1) | 4–6 µm | 1.5–2 µm Ni | 50–100 | 0805 / 4.7 µF |
| 2000s mainstream BME | 2–3 µm | 1.0–1.5 µm Ni | 100–300 | 0805 / 22 µF |
| **2010s+ thin-layer BME** | **0.5–1.0 µm** | **0.5–1.0 µm Ni** | 300–600 | 0603 / 22 µF |
| 2020s leading edge | **0.3 µm** | 0.3–0.5 µm Ni | 600–1000+ | 0402 / 22 µF, 0201 / 1 µF |

Two things matter for shrinkage:
1. **`h_BT` is approaching the BaTiO₃ grain size**. The "3–5 grains per dielectric layer" rule ([[core-shell-batio3]]) sets the floor; modern parts use 50–100 nm BT grains to keep `h_BT / d_grain ≥ 3`.
2. **`h_Ni` is approaching the Ni particle size**. State-of-the-art 0.3 µm Ni layer is only **1–3 Ni particles thick**. This is the regime where every microstructural heterogeneity matters.

## h_BT (dielectric layer thickness) — physical scaling

As `h_BT` decreases at fixed `h_Ni`:

| Effect | Direction |
|---|---|
| Dielectric layer compliance (mechanical) | ↓ (thinner = stiffer per unit cross-section) |
| Interface-region density "skin" fraction | ↑ (skin thickness is roughly fixed at ~ 100 nm; for `h_BT = 0.5 µm`, skin is 40 % of the layer) |
| Strain anisotropy of BT layer | ↑ (more constraint per unit volume) |
| Number of BT grains across thickness | ↓ (limits dielectric reliability) |
| Capacitance density (per volume) | ↑ (C ∝ 1/h_BT in [[mlcc-capacitance-equation]]) |
| Pore-population effect on dielectric breakdown | ↑ (a single elongated pore is now a significant fraction of the path) |

**Concrete scaling**: for `h_BT` going from 2 µm to 0.5 µm with no other changes:
- BT effective layer density rises 5–10 % (the interface densification skin is now a larger volume fraction; see [[dielectric-shrinkage-in-mlcc-stack]] §4).
- Per-layer strain anisotropy `ε_a − ε_r` rises from ~0.07 to ~0.15.
- Capacitance per layer rises 4×; chip capacitance density rises 4× if `N_e` is held constant, or 16× if `N_e` is also scaled to fill the same chip height.

**There's a floor**: when `h_BT < ~ 4 d_grain`, the dielectric loses Schottky-barrier integrity ([[heywang-jonker-model]]) and reliability degrades catastrophically. Current limit is `h_BT ≈ 0.3 µm` with 50–80 nm BT grains. The floor is not just electrical — it is also set by **tape-casting slurry rheology**: finer powder needs more binder, lowering castable solid loading. See [[dielectric-layer-thickness-floor]] for the full grains-per-layer + powder/binder + casting analysis (mainstream floor ~0.4–0.5 µm, bleeding-edge frontier ~0.25 µm, sub-0.2 µm unreachable in volume tape casting).

## h_Ni (electrode thickness) — DEM-quantified

From [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan thesis Ch. 7.7]] DEM, BT layer fixed at 2.4 µm:

| `h_Ni` (µm) | Ni particle layers (for 0.2 µm Ni) | Electrode discontinuity |
|---|---|---|
| 0.2 | **1** | 24.3 % |
| 0.4 | 2 | 8.0 % |
| 0.6 | 3 | 4.6 % |
| 1.0 | **5** | 2.3 % |

Below ~ 3 particle layers, particle rearrangement is geometrically impossible (every particle is constrained by the BT on both sides simultaneously). Heterogeneity is locked in from the green state. **Yan explicitly observes**:

> "In a thin electrode, almost each single particle is constrained by the top and bottom layers simultaneously. Hence, the rearrangement of particles is almost impossible."

This is the **fundamental limit on electrode thinning**: below ~ 3 × d_Ni, discontinuity is set by the printing/lamination heterogeneity, not by sintering physics. Modern industry holds `h_Ni / d_Ni ≥ 3–5` by combining smaller Ni powders (down to 80 nm) with the thinner electrodes.

**Industry-side correction**: real MLCC pastes contain ~10 mass% nano-BT additive ([[sugimura-hirao-2009-batio3-additive-ni-electrode|Sugimura-Hirao 2009]]), so the effective `h_Ni / d_Ni` for *contacts* is even smaller because the BT particles substitute for Ni-Ni contacts. The thin-electrode regime is even harder than the pure-Ni DEM suggests.

## h_Ni / h_BT ratio (per-layer)

The per-layer electrode-to-dielectric thickness ratio sets the constraint stiffness directly. From Jean-Chang and Bordia-Scherer:

| `h_Ni / h_BT` | Regime | Effect on BT layer |
|---|---|---|
| << 0.1 | Thin-film electrode | BT shrinks nearly freely; Ni is a passive marker |
| ~ 0.3 | Mainstream BME (2000s) | Modest BT lateral suppression |
| **~ 0.5–1.0** | **Modern thin-layer** | **Strong bilateral constraint; maximum strain anisotropy** |
| >> 1 | Embedded inductor / via | Ni dominates the laminate; BT lateral shrinkage approaches zero |

Modern thin-layer MLCC sits at `h_Ni / h_BT = 0.5–1.0` — close to the **maximum-constraint regime** that the Jean-Chang formula identifies (the camber sensitivity in a bilayer peaks near `h_1 = h_2`). Every layer in a 300+ stack is co-fired in this regime.

**Mitigation**: the only practical way to relax the constraint is to keep `h_Ni / h_BT < 1` — but conductivity requirements set a floor on `h_Ni`. State of the art currently lives at `h_Ni / h_BT ≈ 0.5–1.0` and accepts the stress.

## Metal/ceramic ratio inside the electrode layer (in-paste)

The electrode is not pure metal — it's a Ni-BT-pore composite. From [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan]] paste recipe:

| Component | Wet paste vol% | Dried & debound vol% (estimated) |
|---|---|---|
| Ni powder (0.2 µm) | 55 | ≈ 55 |
| Nano-BT additive (Ni:BT = 100:7 wt) | ≈ 3 vol% wet (≈ 7 vol% of solids) | ≈ 7 |
| Terpineol (solvent) | 41 | 0 (evaporates) |
| Resin (binder) | 4 | 0 (burns out) |
| Pore (after BBO) | 0 | ≈ 38 |

So the **green Ni electrode layer after BBO is ~55 vol% Ni + ~7 vol% BT + ~38 vol% pore**. The Ni mass fraction is even higher because Ni density (8.9 g/cm³) >> BaTiO₃ density (6.0 g/cm³):

- Mass fraction Ni / (Ni + BT) in solids ≈ `55 × 8.9 / (55 × 8.9 + 7 × 6.0)` = **92 wt%** Ni / 8 wt% BT.

This is the Sugimura-Hirao industry sweet-spot recipe.

### Effect of varying the in-paste Ni/BT ratio

The BT-additive volume fraction in the Ni paste is the primary lever for **shrinkage retardation** of the metal layer (see [[bordia-scherer-composite-sintering]] and [[ni-electrode-paste-formulation]]):

| BT in Ni paste (vol% of solids) | Effect |
|---|---|
| 0 | Pure Ni; catastrophic break-up; not used in production |
| 5–10 | Industry sweet spot ([[sugimura-hirao-2009-batio3-additive-ni-electrode|Sugimura-Hirao 30 nm at 10 mass% → > 75 % coverage]]) |
| 15–20 | Diminishing returns on shrinkage retardation; conductivity starts dropping |
| > 25 | Below percolation threshold for Ni; resistance rises sharply |

Going **above ~ 20 vol% BT in the metal layer** breaks the metal's electrical function. The effective metal/ceramic ratio inside the electrode is therefore bounded: **metal vol% in the dried green electrode ∈ [50, 65]**.

### Effect of varying the green density of the Ni layer

From [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan thesis Ch. 7.5]] — DEM with BT/Ni/BT trilayer at constant electrode thickness, varying Ni green density `D₀`:

| `D₀` (Ni green relative density) | Electrode discontinuity |
|---|---|
| 0.40 | **7.0 %** (worst — too many initial pores) |
| 0.45 | 3.5 % |
| 0.50 | 3.4 % |
| **0.55** | **2.3 %** (sweet spot) |
| 0.60 | 3.1 % (worse — denser → faster sintering → more mismatch) |

**Non-monotonic** with a clear sweet spot at `D₀ ≈ 0.55`. Lower density → more initial heterogeneity (which becomes the seed for discontinuity); higher density → faster sintering kinetics and more shrinkage mismatch with the BT (which generates more tensile stress in the Ni and amplifies break-up).

The industry sweet spot is reached by **lamination pressure** (compacting the green Ni layer) plus **paste solids loading** (set in the slurry recipe).

## Stack-level metal/ceramic volume ratio

Across the whole MLCC, the **fraction of metal in the active stack** is:
$$
V_\text{Ni}/V_\text{stack} \;=\; \frac{N_e \cdot h_\text{Ni} \cdot A_\text{coverage}}{N_e \cdot (h_\text{Ni} + h_\text{BT}) \cdot A_\text{chip}}
$$

Where `A_coverage / A_chip` is the electrode coverage area fraction (typically 0.8–0.9 for an MLCC with a small margin). For typical modern thin-layer:

| Configuration | `h_Ni` / `h_BT` | `A_coverage` | Stack Ni vol fraction | Mass fraction Ni |
|---|---|---|---|---|
| Legacy 2000s mainstream | 1.0 / 3.0 µm = 0.33 | 0.85 | **21 %** | 30 % |
| Modern thin-layer (typical) | 0.8 / 1.0 µm = 0.8 | 0.85 | **38 %** | 50 % |
| Modern thin-layer (aggressive) | 0.5 / 0.5 µm = 1.0 | 0.85 | **43 %** | 55 % |

In a state-of-the-art chip, **almost half the active-stack volume is metal**. This is a remarkable shift from the legacy regime where metal was a thin marker between thick dielectric layers.

Consequences:
- **Total stack shrinkage budget**: ~ 50 % of the volume now belongs to Ni, which has a different (and earlier) shrinkage curve. The chip-scale shrinkage is no longer dominated by the BT — it's a Ni / BT average weighted by volume.
- **Stack stiffness during cooldown**: high Ni vol fraction means the stack stiffness is much closer to bulk Ni than to bulk BT. TEC mismatch stresses are accordingly modified.
- **Conductive cross-section** scales with `h_Ni × A_coverage`; ESR/ESL design rides on this.

## Modern thin-layer regime (state-of-the-art)

A useful benchmark for the simulator (year 2025 leading-edge):

| Parameter | Value |
|---|---|
| Case size | 0402 (1005m), 0201 (0603m) |
| Dielectric `h_BT` | 0.3–0.5 µm |
| BT grain size | 70–100 nm |
| `h_BT / d_grain` | 4–5 |
| Electrode `h_Ni` | 0.4–0.7 µm |
| Ni particle size | 80–150 nm |
| `h_Ni / d_Ni` | 4–5 |
| Per-layer `h_Ni / h_BT` | 0.8–1.5 |
| Electrode coverage | 0.85 |
| Active layer count `N_e` | 600–1200 |
| Cover layer thickness | 30–50 µm per side |
| Stack Ni vol fraction | 35–45 % |

At this scale, **the metal layer is no longer a thin film between thick dielectric layers** — both layers are at comparable thinness and the system behaves as a two-phase periodic laminate. The shrinkage prediction must treat the metal and ceramic layers symmetrically.

## How to use this in the simulator

For each of the four cases below the simulator should produce different shrinkage outputs:

| Case | `h_Ni / h_BT` per layer | Stack Ni vol% | Predicted ε_lateral / ε_thickness |
|---|---|---|---|
| Legacy thick layers | 0.3 | 20 % | Weak anisotropy; ~10% / ~12% |
| Modern mainstream | 0.7 | 35 % | Strong anisotropy; ~3% / ~25% |
| Modern aggressive | 1.0 | 45 % | Maximum anisotropy; ~2% / ~30% |
| Embedded inductor (via) | 3.0 | 70 % | Lateral nearly zero; thickness ~ 40% |

The simulator's [[skorohod-olevsky-viscous-sintering|SOVS]] solver takes `h_BT`, `h_Ni`, `h_Ni / h_BT`, BT-additive vol%, Ni green density, and coverage area as inputs, plus `η_BT(T)`, `η_Ni(T)`. Output is the full per-layer shrinkage trajectory.

## Cross-references

- [[dielectric-shrinkage-in-mlcc-stack]] — the five qualitative mechanisms; this page is the quantitative scaling of two of them.
- [[metal-electrode-shrinkage-effect]] — electrode-centric companion view.
- [[ni-electrode-paste-formulation]] — in-paste recipe details (the metal/ceramic ratio inside the electrode).
- [[edge-vs-internal-layer-effects]] — layer-position dependence (a separate axis).
- [[constrained-sintering-mlcc]] — the constraint physics.
- [[skorohod-olevsky-viscous-sintering]] — the FE framework that ingests all these parameters.
- [[case-size-geometry]] — chip-scale `H_max` budget that limits how thin the whole stack can go.
- [[core-shell-batio3]] — sets the d_grain floor that limits how thin `h_BT` can go.

## References

- [[yan-thesis-2013-mlcc-sintering-nanotomography]] — Ch. 1.1.4 thickness evolution; Ch. 7.5 green density effect; Ch. 7.7 electrode thickness effect.
- [[sugimura-hirao-2009-batio3-additive-ni-electrode]] — BT additive sweet spot at 30 nm / 10 mass%.
- Industry roadmaps from [[murata]], [[samsung-electro-mechanics]], [[tdk]] for 2020s-era thicknesses and layer counts.
