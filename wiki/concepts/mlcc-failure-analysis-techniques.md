---
title: MLCC Failure Analysis Techniques
type: concept
created: 2026-06-24
updated: 2026-06-24
status: complete
importance: high
sources:
  - resources/literature/acoustic-microscopy-tight-delaminations-mlcc.md
  - resources/literature/x-ray-crack-detection-mlcc.md
  - resources/literature/acoustic-ml-crack-detection-mlcc.md
  - resources/literature/nasa-cracking-low-voltage-mlcc.md
tags:
  - paper
---

# MLCC Failure Analysis Techniques

How you find the defects in [[failure-modes-mlcc]] — cracks, [[mlcc-delamination|delamination]], voids, electrode discontinuity, and IR shorts. No single method is sufficient: the right modality depends on **what kind of defect** and **how open it is**. The governing principle is a workflow, not a tool: **non-destructive imaging → electrical confirmation → targeted destructive analysis**, sequenced so that each non-destructive step guides where to cut.

## The defect-openness principle

The single most useful framing (from [[acoustic-microscopy-tight-delaminations-mlcc]] and [[x-ray-crack-detection-mlcc]]): a defect's **openness**, not just its size, decides which method can see it.

| Defect state | What works | Why |
|---|---|---|
| **Open** crack/void with density contrast | X-ray / CT | attenuation contrast against dielectric |
| **Tightly closed** delamination / crack | C-SAM, Rayleigh-wave acoustic | acoustic waves respond to the *interface*, not density |
| Need **root cause / composition** | DPA cross-section + SEM-EDX | direct microstructure + chemistry |
| **Mechanical consequence** on assembled part | functional acoustic (electromechanical) | part's own vibration shifts when cracked |

A tightly closed crack can be **radiographically invisible** (no density contrast) *and* **inconclusive after sectioning** (the gap collapses) — which is exactly why acoustic methods exist.

## Non-destructive methods

### Scanning acoustic microscopy (C-SAM)
The **preferred method for delamination detection** ([[acoustic-microscopy-tight-delaminations-mlcc]]). An immersion ultrasonic scan images internal interfaces; reflections at a delamination/crack/void invert in phase. Resolves gaps **down to ~0.1 µm**. Limitation: it flags an anomaly but **cannot give root cause** — it still drives a subsequent cut.

### X-ray (2D radiography and 3D CT)
Reveals **open cracks, voids, termination disconnects, and electrode registration/overlap** geometry. 3D CT gives orientation-independent virtual sectioning. Quantified in [[x-ray-crack-detection-mlcc]] (300 bent MLCCs): **tightly closed flex cracks are difficult** to see in 2D; CT helps. Same modality used non-destructively for construction metrology (see [[okuma-2021-mlcc-electrode-nanoct]] nano-CT of electrodes, [[electrode-overlap-and-registration]]).

### Optical microscopy + vicinal illumination
External and (after potting/sectioning) internal inspection. **Vicinal (grazing) illumination** brings out tightly spaced surface cracks that flat lighting washes out; delamination can show as **discoloration** (per [[nasa-cracking-low-voltage-mlcc]]).

### Thermography (thermal imaging under bias)
Bias the part and image hot spots to **localize a leakage/short site** before sectioning. Must limit voltage/current to avoid enlarging the very defect under study.

## Electrical methods

- **Insulation resistance (IR) / leakage** — confirms a low-IR or short condition; the BME reliability proxy ([[insulation-resistance]]). Does not localize.
- **Surface-clean + re-measure** — clean and re-test IR to separate **external** (surface contamination, electromigration, flux) from **internal** bridging.
- **Breakdown / curve-trace** — V–I signature of the failure path ([[dielectric-breakdown]]).
- **Functional acoustic screen** — [[acoustic-ml-crack-detection-mlcc]]: drive a soldered part with an **AC frequency sweep**, record its emitted vibration (the [[mlcc-acoustic-noise]] effect used as a diagnostic), and classify cracked-vs-intact with an **SVM**. A population *screen*, not a localizer.

## Destructive physical analysis (DPA)

- **Cross-section + SEM-EDX** — pot in epoxy, grind/polish perpendicular to the terminations, image electrode layers; EDX gives composition (electromigration deposits, contamination, second phases). The root-cause workhorse. **Caution: the brittle ceramic cracks during sectioning** — preparation artifacts can masquerade as failures, so non-destructive evidence must come first.
- **Rayleigh-wave imaging on the sectioned face** — recovers **tightly closed delaminations** that optical/SEM miss post-section ([[acoustic-microscopy-tight-delaminations-mlcc]]); used to *verify* C-SAM calls.
- DPA correlates well with non-destructive evaluation **in most cases** — the documented exception is tightly closed delaminations.

## The standard FA sequence

1. **Electrical** capture of the failure signature (IR/short, V–I); surface-clean to bin internal vs external.
2. **Non-destructive imaging** (C-SAM for delamination; X-ray/CT for open cracks/voids/registration; thermography to localize a hot spot).
3. **Targeted destructive** cross-section to the plane the imaging fingered; SEM-EDX for root cause; Rayleigh-wave on the face if a tight delamination is suspected.

The recurring caution across the literature: **identical end states (low IR / short) have many different root causes**, so construction knowledge and failure history are essential to interpret the images.

## See also
- [[failure-modes-mlcc]] — the defects these methods find
- [[mlcc-delamination]] — the defect that drives the acoustic-vs-X-ray distinction
- [[nasa-cracking-low-voltage-mlcc]] — Teverovsky's crack-revealing chapter (optical/electrical)
- [[us-8713770-kemet-flex-crack-voids]] — flex cracks & voids in a patent FA context
- [[nasa-gsfc-liu-construction-database-2011]] — DPA construction metrology

## References
- [[acoustic-microscopy-tight-delaminations-mlcc]]
- [[x-ray-crack-detection-mlcc]]
- [[acoustic-ml-crack-detection-mlcc]]
- [[nasa-cracking-low-voltage-mlcc]]
