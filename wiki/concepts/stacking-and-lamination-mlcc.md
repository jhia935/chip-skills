---
title: Stacking & Lamination (Sheet Transfer, Warm Isostatic Pressing)
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/40-lamination-and-dicing.md
tags:
  - paper
status: complete
importance: high
---

# Stacking & Lamination

The electrode-printed [[tape-casting-mlcc|green sheets]] are stacked into a block of hundreds of layers, with [[mlcc-margin-cover-design-rules|cover]] sheets top and bottom, and pressed into one monolithic green body. Steps 5–6 of the [[mlcc-manufacturing-process|process map]]. According to Murata, stacking has to be done with almost no misalignment and without damaging the thin sheets; the vendor page gives no numbers [murata-gs-web].

## Stacking methods

- **Sheet transfer (one layer at a time).** The sheet sits on its PET carrier. It is pressed with a heated plate or heated roll onto the stage-fixed stack, and then the film is peeled off. This repeats up to the target layer count. Pins through the film or a die provide alignment [us6485591].
  - Example: 80 °C at a 15 kg/cm line load, against a conventional 80 °C and 500 kg/cm² [us6485591].
  - Example: TDK-type roll transfer at 40–100 °C and 0.2–15 MPa (for instance 80 °C, 1 MPa), using a 0.02–0.3 µm adhesive layer [us7641727].
- **Sub-block lamination.** 75- or 150-layer sub-laminates are built first. They are trimmed, peeled from the film, and stacked on cover layers of up to ~160 µm [us5935365].
- **Vision alignment.** Target marks printed with each layer are read by cameras, giving 8–13 µm maximum misalignment [us5935365]. See [[internal-electrode-printing]].

## Final press

| Parameter | Value | Source |
|---|---|---|
| Temperature | 40–100 °C; warm isostatic press (WIP) example ~85 °C | [us7641727], [us8953300] |
| Pressure | 10–200 MPa; WIP example 1000 kgf/cm² (≈98 MPa) | [us7641727], [us8953300] |
| Time | **not stated in any source** | — |
| Press type | Rigid (uniaxial) or isostatic. A constant-thickness resin sheet on top spreads pressure into electrode-free regions | [us10573466] |

Uniaxial press units cycle above 100 kgf/cm² every few seconds. Bolt fatigue and plate deflection in those units deform the green bar [us7861759].

## Layer counts in the literature

- 100–1000 layers; example 560 layers in a 1.13 × 0.85 × 0.75 mm body [us10573466]
- ≥400 layers in 0603 (0.6 × 0.3 × 0.3 mm) side-margin embodiments [us11348730], [us11600441]

## Cover thickness

15–70 µm per side [us10573466], ≤20 µm [us11348730], and ≥30 µm lower cover [us11600441] all appear. They reflect different design intents (standard vs ultra-thin high-CV), so they are not true conflicts. Spec minimums are on [[mlcc-margin-cover-design-rules]].

## Defect modes

| Defect | Cause / mitigation |
|---|---|
| Delamination | Margin step under-compression → [[step-height-compensation]]; trapped air; reduced by smoother sheets and stable transfer [us6485591]. See [[mlcc-delamination]] |
| Electrode distortion, stack deformation | Press-unit deflection [us7861759]; level-difference fill [us7641727] |
| Misalignment | Static-charge wrinkling [us7641727]; accumulated registration error [us5935365] |
| Thickness non-uniformity across the block | 5–10 µm at 51 layers, 7–15 µm at 101 layers (thick-electrode case) [us6485591] |

## Gating role

Step height and accumulated misalignment limit how many layers can be stacked unless they are compensated. Lamination quality also sets the green density that drives [[green-density-vs-shrinkage|sintering shrinkage]] and [[constrained-sintering-mlcc|constrained sintering]] behavior.

## Cross-references
- [[internal-electrode-printing]] (upstream) · [[green-chip-cutting-and-side-margin]] (downstream)
- [[step-height-compensation]] · [[electrode-overlap-and-registration]] · [[mlcc-delamination]]
- [[binder-burnout-debinding]]: next thermal step after cutting

## References
- [[mlcc-printing-lamination-research-notes]]
