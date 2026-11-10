---
title: Step-Height Compensation (Electrode Level-Difference Absorption)
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/30-electrode-printing.md
  - resources/manufacturing/40-lamination-and-dicing.md
tags:
  - paper
status: complete
importance: medium
---

# Step-Height Compensation

**Problem.** A printed inner electrode adds its thickness (~0.5–1 µm) only over the electrode area. The margins do not get it. After hundreds of layers, the electrode region of the green stack stands taller than the margins. When the stack is pressed, the margin region is under-compressed and can delaminate, crack, or pull electrodes apart [us9001493], [us7641727].

**How big it gets.** With 4 µm electrodes, the stack's center-to-edge thickness difference exceeded 20 µm after ~10 layers in prior art. A transfer process measured 5–10 µm at 51 layers and 7–15 µm at 101 layers. About 3 µm of surface irregularity was treated as acceptable [us6485591]. Modern electrodes are ~0.5 µm but stacks reach 400–1000 layers [us10573466], so the same physics applies.

## Three approaches found

1. **Blank (inverse) pattern printing.** A ceramic "level-difference absorbing" paste is printed into the electrode-free areas at about the electrode thickness (1 µm example), which flattens each layer [us7641727].
   - Viscosity 4–30 Pa·s (pref. 7–15) at 25 °C and 8 s⁻¹. Below 4 Pa·s the paste flows through the mesh; at 30 Pa·s and above it levels poorly.
   - Ceramic content 30–55 wt%. Binder polymerization degree ≥1400 and at least that of the green-sheet binder.
2. **High-viscosity cover over a recessed margin.** The stack is built without in-plane fill. A cover slurry of 10,000–300,000 cps (cover sheet 300,000–1,000,000 cps) is then pressed onto the top and bottom so it flows into the recess. Target recession ratio 0–0.15 [us9001493].
3. **Margin dielectric printing** at or below electrode thickness. This is cited as prior art that needs separately tuned pastes [us9001493]. The Korean prior-art patent itself was not read.

A fourth route removes the side-margin step entirely: cut the stack so the electrodes run to the side faces, then add the side margin afterwards. See [[green-chip-cutting-and-side-margin]].

> [!note] Possible downside
> A search excerpt of [us9001493] suggests that margin dielectric filled in afterwards may differ in grain size or density from the active region, which could lower BDV. This was not confirmed in the fetched text.

## Cross-references
- [[internal-electrode-printing]] · [[stacking-and-lamination-mlcc]] · [[green-chip-cutting-and-side-margin]]
- [[mlcc-delamination]] · [[mlcc-margin-cover-design-rules]] · [[edge-vs-internal-layer-effects]]

## References
- [[mlcc-printing-lamination-research-notes]]
