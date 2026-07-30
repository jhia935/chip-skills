---
title: Dielectric Breakdown
type: concept
created: 2026-05-19
updated: 2026-06-24
status: complete
importance: medium
sources:
  - escies-bme-mlcc-high-reliability.md
  - psma-ceramic-capacitor-basics.md
tags:
  - paper
---

# Dielectric Breakdown

The catastrophic loss of insulating capability of a dielectric when the electric field exceeds a material-specific threshold. For MLCCs, breakdown manifests as a low-resistance short across one dielectric layer (intrinsic) or as surface arcing between terminations (extrinsic). Sets the **upper hard limit on operating voltage**.

## Two regimes

### Intrinsic dielectric breakdown
Bulk-driven, set by the **dielectric strength** of the material in V/µm. Mechanisms:
- **Avalanche / impact ionization**: at very high fields (~ 10² V/µm) free carriers gain enough energy to ionize lattice atoms, creating more carriers in a runaway cascade.
- **Thermal runaway**: leakage current heats a local region, which raises its conductivity (negative dV/dT), which raises current further → local melt-through.
- **Defect-localized**: a pre-existing extrinsic defect (pore, second-phase inclusion, grain-boundary irregularity) concentrates the field locally → breakdown happens there well below the bulk intrinsic limit. This is the dominant mode in real MLCCs.

### Surface arcing (creepage)
Discharge **across the surface** between opposite-polarity terminations or between a termination and an internal-electrode edge. Drivers:
- Humidity (water film raises surface conductivity)
- Surface contamination (flux, dust)
- **Creepage distance** = chip length minus 2× end-margin
- Local field intensification at sharp terminations / electrode edges

Surface arcing happens at fields **much lower** than bulk intrinsic breakdown — typically 1–3 V/µm of surface gap vs 50–200 V/µm of bulk dielectric strength.

## Typical numbers (BaTiO₃-based BME X7R)
| Quantity | Value |
|---|---|
| Intrinsic bulk breakdown | 80–150 V/µm (laboratory) |
| Defect-localized breakdown | 25–50 V/µm (real parts) |
| **Rated field for commercial X7R BME** | ≈ 25 V/µm (typical) |
| Withstanding voltage test (250 % rated V, 1–5 s) | implicit field 60+ V/µm |
| [[bme-c0g|BME C0G CaZrO₃]] breakdown at 150 °C | **> 200 V/µm** (much higher than BaTiO₃-based) |

The CaZrO₃ advantage at high T is one of the key reasons BME C0G works for energy-storage and pulse applications.

## Withstanding voltage test (per AEC-Q200 Table 2B)
For both Class I and Class II/III: **250 % of rated voltage applied for 1–5 s** at 25 °C without dielectric breakdown or mechanical breakdown. Current limited to < 50 mA. This is the standard production-screen and qualification test.

## Mitigation
- **Increase dielectric thickness `d`** — directly raises voltage capability proportionally. Trade-off: fewer layers → lower capacitance.
- **Improve defect control** — narrower powder distribution, better tape casting, no agglomerates. Pushes the defect-localized breakdown closer to intrinsic.
- **Serial / cascade electrode designs** — split chip into N series sub-caps so each sees V/N (KEMET historical HV approach, before [[kemet-arcshield|ArcShield]]).
- **Shield electrodes** — [[kemet-arcshield]] redistributes the surface field to lengthen the effective creepage path.
- **Conformal coating** — low-K coating over the chip lengthens creepage path and suppresses surface ionization. Drawbacks: damage / voids defeat protection.

## Design field (V/µm) is a technology-node parameter, not a fixed constant

A subtle but important point for any design tool (see [[dielectric-layer-thickness-floor]] and the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]] `mlcc-design` skill): the **per-µm field used to *size* the dielectric** (`E_design`, the code's `eField`) is **not the intrinsic dielectric strength**. It is a **derated working field set by the lifetime-reliability target**, and it therefore **drifts upward with every technology generation**.

- **Two different fields, don't conflate them:**
  - *Intrinsic / breakdown field* (BDV): 80–150 V/µm bulk, 25–50 V/µm defect-limited — the short-term "it shorts here" limit. A near-material property.
  - *Design (rated) working field*: ≈ 25 V/µm for commercial X7R BME — chosen **well below** breakdown so the part survives its rated life. Set by **[[insulation-resistance|IR]]-degradation reliability** ([[oxygen-vacancy-migration]] field acceleration, the [[prokopowicz-vaskas-equation]], [[weibull-distribution]] TTF, and the [[bme-reliability-model|grains-per-layer gate]]), **not** by the breakdown limit.
- **Why it moves:** material improvement (core-shell RE-doped [[core-shell-batio3|BaTiO₃]], tighter defect control), process improvement (better tape casting, sintering uniformity, thickness control), and design changes (floating-electrode, series) all let the **same rated voltage run at a thinner `d`** → the usable design field **rises**. The intrinsic↔rated gap is the reliability/defect margin, and it **narrows as the technology matures**.
- **Consequence — a hard-coded `V/µm` per grade encodes a snapshot.** A frozen `eField` will over-thicken next-gen materials (under-predicting achievable CV) and over-thin weaker ones. The criterion itself is still needed (you must cap the field to size `d`), but it should be a **measured / calibrated, node-dependent parameter** — the same *measure-then-calibrate* stance the sim already uses for effective ε_r — or **derived from the reliability model** so material/process gains flow through automatically.
- **How real data exposes this:** datasheets publish **rated V and thickness `d`, never V/µm**. Plotting measured `V/d` across a real lineup shows the node dependence directly — the fixed grade values (`commercial 30`, `automotive 22`) are revealed as single points on a moving distribution.

> [!note] Simulator status
> `simulator/tier1.js` currently hard-codes the design field in **two** places — `GRADES[*].eField` (grade-aware path) and the voltage-banded `eDesign()` (legacy `solveRecipe`). Both are flagged in-code as node-dependent assumptions to be replaced by a calibrated/reliability-derived field. This is a known limitation, surfaced to skill users in the CLI output and `SKILL.md`.

## Implications for the simulator
- Rated voltage `V_r = E_rated · d`. For X7R BME, `E_rated ≈ 25 V/µm`. For BME C0G, can go higher.
- Surface arcing check: `V_r / (chip_length − 2·m_end) < E_creepage_limit` (≈ 1–3 V/µm depending on coating).
- High-V parts (≥ 100 V) need explicit serial or shield designs — surface limit, not bulk limit, becomes the constraint.

## Cross-references
- [[failure-modes-mlcc]]
- [[case-size-geometry]]
- [[kemet-arcshield]]
- [[cazro3]]
- [[batio3]]
- [[insulation-resistance]]

## References
- [[escies-bme-mlcc-high-reliability]] — quantitative BDV(T) for BME C0G
- [[psma-ceramic-capacitor-basics]] — surface arcing physics
- [[aec-q200-rev-e-2023]] — withstanding voltage test conditions
