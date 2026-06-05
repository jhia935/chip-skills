---
title: Green-Tape Shrinkage Anisotropy
type: concept
created: 2026-05-20
updated: 2026-05-20
sources:
  - heunisch-2010-tape-cast-anisotropic-shrinkage.md
  - yan-thesis-2013-mlcc-sintering-nanotomography.md
  - okuma-2021-mlcc-electrode-nanoct.md
tags:
  - paper
status: complete
importance: high
---

# Green-Tape Shrinkage Anisotropy

When a tape-cast ceramic green sheet is dried, debound, and sintered, it does **not shrink the same amount in all three directions**. Thickness shrinkage is typically **2–4× the in-plane shrinkage**, and the in-plane shrinkage itself differs between the casting (x) and transverse (y) directions. This anisotropy is set during the casting + drying step and **cannot be removed later** by adjusting the sintering profile.

For MLCC engineering, anisotropy matters because the final fired dimensions (and hence achievable layer thickness, electrode coverage, dielectric thickness `d`, and case-size envelope) are decoupled from the green-sheet dimensions through these direction-dependent shrinkage factors.

## The three contributors to total shrinkage

Total green-to-fired linear shrinkage is the sum of three roughly additive stages:

| Stage | Mechanism | Magnitude | Anisotropy |
|---|---|---|---|
| **Drying** | Solvent evaporation; capillary forces pull particles together as the binder skin contracts | ~2–4% linear | Mild — set by particle alignment in the wet film |
| **Binder burnout** | 5–10 wt% organic volume removed at 200–600 °C | ~1–3% linear, see [[binder-burnout-debinding]] | Mild — the powder skeleton is not yet sintered, so it can rearrange in any direction |
| **Sintering** | Particle-neck growth and grain growth | ~10–15% linear (the dominant component) | **Strong** — particle orientation locked in during casting governs this |

Free sintering of an isotropic powder compact would give ~17% linear in all three directions; **constrained sintering** in a multilayer reduces lateral shrinkage and dumps the deficit into thickness — see [[constrained-sintering-mlcc]].

## What drives anisotropy: particle shape, alignment, layer thickness

[[heunisch-2010-tape-cast-anisotropic-shrinkage|Heunisch, Dellert, Roosen (2010)]] designed a clean factorial experiment that ranked the contributors:

### 1. Powder morphology — dominant lever
At fixed d₅₀ ≈ 4 µm:

| Powder shape | Anisotropy factor K_xy | x-shrinkage | y-shrinkage | z-shrinkage |
|---|---|---|---|---|
| Platelet | **12.7** | 2.7–3.9% | 3.0–4.0% | ~11% (150 µm gap) |
| Standard (irregular) | 8.4 | similar in-plane | | |
| Spherical | **1.9** | ~isotropic | ~isotropic | ~6–11% |

**Spherical or pseudo-spherical powder gives the least anisotropy.** Plates (mica-like, or solid-state-milled-into-flakes BT) align in the casting shear field and force directional shrinkage. Hydrothermally synthesized BT is closer to equiaxed and is the practical choice for low-anisotropy MLCC dielectric tapes.

### 2. Tape thickness (blade gap) — secondary lever
Thinner tapes shrink more in thickness:
- 150 µm blade gap → ~11% z-shrinkage
- 450 µm blade gap → ~6% z-shrinkage

The mechanism is the *areal density of aligned particles*: thinner films lock in stronger in-plane orientation because the shear field at the blade dominates over relaxation in the wet layer. For sub-µm MLCC dielectric layers, this means thinner = more anisotropic.

### 3. Binder MW and casting speed — weak levers
Heunisch tested PVB binders ranging from 19 to 150 × 10³ g/mol and casting speeds from 10 to 250 mm/s. **Both had only minor influence** within the tested ranges. Binder choice matters for tape *handling* (strength, flexibility) and for [[binder-burnout-debinding|burnout chemistry]], not for shrinkage anisotropy.

### A note on BaTiO₃ specifically
The Heunisch results were measured on **alumina**. Surveys of tape-cast BaTiO₃ tapes report that BT — when fabricated from hydrothermally synthesized pseudo-spherical powder — **does not exhibit the anisotropy seen in alumina** under the same casting conditions. The most likely reason is that commercial BT powder is closer to equiaxed than the platelet-shaped α-Al₂O₃ used in Heunisch's worst case.

Source: Raj 1999 (*J. Am. Ceram. Soc.* 82:1199 — "Anisotropic Shrinkage in Tape-Cast Alumina"), and recent aqueous-tape-cast BT MLCC reports. So for BME MLCC dielectric tape, **the powder-shape contribution to anisotropy is small** in practice — the lateral/thickness asymmetry that does occur is more often driven by [[constrained-sintering-mlcc|lamination constraint]] than by intrinsic green-tape anisotropy.

## Quantitative MLCC dielectric data

From the [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan thesis (2013)]] dilatometry of Samsung X5R BT-based MLCC chips:

| Chip stage | Linear shrinkage |
|---|---|
| 25 → 950 °C | ~0% — Ni electrode densifies but is constrained; BT has not started |
| 950 → 1150 °C | **6–7%** linear — BT initial-stage sintering |
| 1150 °C, 0–30 min hold | additional ~5–6% → **~12% total** |
| > 30 min hold | flat, no further shrinkage |

So in a finished MLCC, the **chip-level fired-to-green linear shrinkage is ~12%** end-to-end, dominated by the BT skeleton.

## Shrinkage vs binder content — the engineering trade-off

A higher binder loading in the green tape:
- **Drying shrinkage ↑** — more volume to lose as the binder skin contracts.
- **Burnout shrinkage ↑** — more organic volume removed at 200–600 °C (per [[binder-burnout-debinding]], binder is 5–15 vol% of the green tape).
- **Sintering shrinkage stays roughly the same** at fixed powder packing — most of the sintering shrinkage is set by green density (powder volume fraction), not binder.
- **Green-tape strength ↑** — handling and lamination are easier.

Conversely a lower binder loading:
- Less drying + burnout shrinkage; lower **total** shrinkage budget if measured green-to-fired.
- Weaker green tape, harder to handle.
- Higher risk of binder-burnout cracking ([[binder-burnout-debinding]]) because the polymer-rich pockets that buffer gas evolution are smaller.

Practical industry tape recipes hold binder + plasticizer at ~9 wt% of the total slurry (e.g., Heunisch standard: 4.73 wt% PVB + 4.47 wt% plasticizer) and tune powder volume fraction (`solids loading`) to control green density and thus shrinkage magnitude.

## Shrinkage vs metal/inclusion content in pastes (Ni paste, not the BT tape)

A **separate** but parallel trade-off lives in the Ni electrode paste. The user's question — "relation between shrinkage and binder/metal ratio in green sheet" — turns out to split into two regimes:

1. **For the dielectric tape**: binder content sets drying + burnout shrinkage; powder loading sets green density which sets sintering shrinkage. Powder *shape* governs anisotropy.
2. **For the Ni electrode paste**: the binder/Ni ratio sets paste rheology for printing, but the engineering knob for *sintering* shrinkage is the **nano-BT additive content** (BT inclusions retard Ni densification). See [[ni-batio3-cosintering-interface]].

### Nano-BT additive retardation of Ni sintering (Yan thesis, Ch. 6 DEM)
Quantitative effect of BT-in-Ni inclusion content on Ni matrix densification rate, at relative density `D` = 0.70:

| BT inclusion vol % | BT particle size | Retarding factor (free-Ni / composite rate) |
|---|---|---|
| 0 | — | 1.0 |
| 5 | 60 nm | ~1.5 |
| 20 | 300 nm | 2 |
| 20 | 100 nm | ~4 |
| 20 | 60 nm | **7** |

Smaller inclusions are dramatically more effective. **Both** the volume fraction and the size matter, and **agglomeration kills the effect** — well-dispersed nano-BT at 5–20 vol% gives the strongest shrinkage retardation per gram of additive.

Practical Ni-MLCC pastes use **5–15 vol% nano-BT** (10–30 nm) added to micron Ni so that the Ni shrinkage curve overlaps the BT-dielectric shrinkage curve and the cofiring mismatch is minimized.

## Free vs constrained shrinkage

The numbers above are for **free-tape sintering** (dilatometer measurement of a single tape). In a real MLCC stack:
- In-plane: constrained by the BT matrix all the way around → lateral shrinkage is *suppressed* relative to free.
- Thickness: under-constrained, free to absorb the difference → z-shrinkage is *enhanced* relative to free.

LTCC measurements quantify this directly: [[hagymasi-ltcc-ferrite-dielectric-cofiring|Hagymási]]'s DT/FT/DT sandwich was 12.7 % (x) / 13.9 % (y) / 12.8 % (z) free, but 3.25 % / 2.97 % / **33.1 %** when constrained — lateral suppressed ~4× and thickness enhanced ~2.5×. The total volume shrinkage is approximately conserved. For a symmetric MLCC stack with electrodes top and bottom, the camber cancels by symmetry but the lateral suppression / thickness enhancement remains.

This redistribution is predicted directly by the [[skorohod-olevsky-viscous-sintering|SOVS continuum model]] via the viscous Poisson ratio `ν_v`. See [[zero-shrinkage-ltcc]] for the most extreme constrained case (lateral ~0.2 %).

### Direct 3-D confirmation by nano-CT
[[okuma-2021-mlcc-electrode-nanoct|Okuma et al. (2021, *Acta Materialia* 206)]] imaged a real co-fired Ni-BaTiO₃ MLCC by synchrotron X-ray nano-CT and found that **both the electrode and the pore structure carry an in-plane anisotropy tied to the tape-casting direction** — direct 3-D evidence that the in-plane shrinkage (not just the thickness) is directional and that the casting step leaves a lasting signature in the fired part. This grounds the in-plane (x-y) shrinkage of the printed electrode overlap that the simulator applies to the active area (see [[electrode-overlap-and-registration]]).

## Implications for the simulator

The simulator's [[case-size-geometry|green→fired shrinkage]] logic should:
- Treat lateral and thickness shrinkage as **independent** factors, not a single isotropic scaling.
- Allow a powder-shape parameter (sphericity) to set K_xy.
- Allow nano-BT additive content as a knob on Ni paste shrinkage, with retardation calibrated from Yan's DEM curve.
- Use 12% as the baseline total chip-level linear shrinkage for X5R/X7R BME tapes (Yan / Samsung 1206).
- Apply 1.0–1.3× thickness enhancement and 0.7–0.9× lateral suppression for the constrained-multilayer correction.

## References

- [[heunisch-2010-tape-cast-anisotropic-shrinkage]]
- [[hagymasi-ltcc-ferrite-dielectric-cofiring]]
- [[yan-thesis-2013-mlcc-sintering-nanotomography]]
- [[okuma-2021-mlcc-electrode-nanoct]]
- [[shi-2023-jecs-sovs-bilayer-modeling]]
- [[mistler-twiname-tape-casting-textbook]]
- [[rahaman-ceramic-processing-sintering-textbook]]
- [[binder-burnout-debinding]]
- [[constrained-sintering-mlcc]]
- [[ni-batio3-cosintering-interface]]
- [[green-density-vs-shrinkage]]
- [[skorohod-olevsky-viscous-sintering]]
- Raj, "Anisotropic Shrinkage in Tape-Cast Alumina: Role of Processing Parameters and Particle Shape", *J. Am. Ceram. Soc.* 82 (1999) 1199.
