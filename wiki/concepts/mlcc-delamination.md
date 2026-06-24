---
title: MLCC Delamination
type: concept
created: 2026-06-24
updated: 2026-06-24
status: complete
importance: high
sources:
  - resources/literature/hygrothermal-reflow-delamination-mlcc.md
  - resources/literature/acoustic-microscopy-tight-delaminations-mlcc.md
tags:
  - paper
---

# MLCC Delamination

**Delamination** is interfacial separation inside the monolith — most often between a **nickel electrode and the surrounding [[batio3|BaTiO₃]] dielectric**, or within the **cover/margin** region, or at the **termination interface**. Unlike a [[failure-modes-mlcc|crack]], it runs *along* an interface rather than across the ceramic. It is one of the three defects (with cracks and voids) that drive the [[mlcc-failure-analysis-techniques|FA-technique]] choice, and it is notoriously hard to detect when **tightly closed**.

## Where delamination comes from

Two distinct origins — important to separate, because the fix differs:

### 1. Intrinsic (process) delamination
Born during **binder burnout and co-firing**. Drivers:
- **[[binder-burnout-debinding|Debinding]] mismatch** — trapped pyrolysis gas, too-fast burnout.
- **Electrode/dielectric shrinkage mismatch** during sintering — the Ni layer and ceramic densify on different schedules, opening the interface (see [[ni-batio3-cosintering-interface]], [[constrained-sintering-mlcc]], [[metal-electrode-shrinkage-effect]]).
- **Poor green lamination / low green density** ([[green-density-vs-shrinkage]]).

Thicker electrodes and thinner dielectric layers raise the constraint mismatch, so aggressive thin-layer designs are more delamination-prone.

### 2. Hygrothermal / reflow delamination
A **field-assembly** defect, not a build defect. Quantified in [[hygrothermal-reflow-delamination-mlcc]]:

- Absorbed **moisture** (preconditioning/storage) flashes to steam during **reflow**, generating **6.23 MPa vapor pressure** — which **exceeds the ~6 MPa adhesion strength** of the adhesive/substrate interface → "popcorn"-type delamination.
- Combined with **CTE / thermal mismatch** stress at reflow temperature.
- Measured defect geometry: **voids 0.15–0.55 µm** (Cu / Cu-epoxy interface), **delamination 0.05–0.21 mm** long, **cracks up to ~3.56 µm** thick post-reflow.
- Mitigation: moisture-sensitivity-level (MSL) handling and **bake-out**, adhesion-strength margin.

## Why it's hard to detect

Delamination is the canonical **defect-openness** problem ([[mlcc-failure-analysis-techniques]]):

- **Open enough** → visible by X-ray/CT (density contrast) and obvious in cross-section.
- **Tightly closed** → **X-ray sees nothing** (no density contrast) and **post-section optical/SEM is inconclusive** (the thin gap collapses when cut).
- The reliable routes for closed delamination are **C-SAM** (preferred non-destructive screen, resolves ~0.1 µm gaps) and **Rayleigh-wave imaging on the sectioned face** for verification ([[acoustic-microscopy-tight-delaminations-mlcc]]). Optically, it can show as **discoloration** of the affected layer.

## Consequence

A delamination is a built-in stress concentrator and moisture trap: it can **stay latent**, then propagate into a crack under thermal cycling or bias, ending as an **IR drop or short**. It also reduces the active interface area (a capacitance / [[electrode-overlap-and-registration|overlap]] loss) and can disconnect electrodes from the [[termination-and-plating|termination]].

## See also
- [[failure-modes-mlcc]] — delamination among the broader failure set
- [[mlcc-failure-analysis-techniques]] — how it's detected
- [[ni-batio3-cosintering-interface]] — the co-firing interface where intrinsic delamination nucleates
- [[mlcc-acoustic-noise]] — same interfaces, vibration-driven fatigue path

## References
- [[hygrothermal-reflow-delamination-mlcc]]
- [[acoustic-microscopy-tight-delaminations-mlcc]]
