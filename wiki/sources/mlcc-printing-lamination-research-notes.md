---
title: "MLCC Electrode Printing, Stacking & Cutting Research Notes (patent survey, 2026-11)"
type: source
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/30-electrode-printing.md
  - resources/manufacturing/40-lamination-and-dicing.md
tags:
  - patent
  - survey
status: complete
importance: high
---

# MLCC Electrode Printing, Stacking & Cutting Research Notes

**Type:** compiled research notes (2026-11-10). The notes cover **one Murata technology page and about 17 granted patents**, including US10449795 (gravure plate), US6485591 (sheet transfer), US5935365 (vision registration), US7641727 (TDK level-difference paste), US9001493 (step-compensation cover), US10573466, US8953300, US7861759, US10460876, US11348730, and US11600441 (attached side margin), plus US7505247 and US6979416 (inkjet). No peer-reviewed or NASA process source was found. All values are patent embodiments, and several patent pages were truncated at about 100k characters.

## Key claims
- Gravure printing runs at 5–150 m/min with 1–100 µm cells. One screen example uses 400 mesh with a 10 µm emulsion.
- Modern electrodes are 0.4–0.7 µm thick. Stacks reach 100–1000 layers (example: 560 layers).
- Vision registration plus extrusion coating cut misalignment from about 250 µm to 8–13 µm and the shorting rate from 33.2% to 0.4–1.0%.
- Final press conditions are 40–100 °C and 10–200 MPa. A WIP example ran about 85 °C at about 98 MPa. **Press time is not stated anywhere.**
- Attached side margins are 2–10 µm [us11348730] or ~11 µm in examples [us11600441] in 0603 parts with ≥400 layers. The 5–15 µm range in [us11600441] refers to a thickness-direction dimension. Printed margins sit at ≥20 µm. Attached sheets keep the A1/A uniformity ratio at 0.9–1.0.
- Step-height compensation uses either a blank-pattern paste (4–30 Pa·s) or a high-viscosity cover (10k–1M cps).

## Conflicts / gaps
- The two patents define side-margin dimensions differently (2–10 µm average vs ~11 µm example width). So does cover thickness (15–70 vs ≤20 µm).
- There is no cutting accuracy or kerf data, no press dwell, and no production print thickness.

## Concepts
- [[internal-electrode-printing]] · [[step-height-compensation]] · [[stacking-and-lamination-mlcc]] · [[green-chip-cutting-and-side-margin]]

## References
_Original source: `resources/manufacturing/30-electrode-printing.md`, `resources/manufacturing/40-lamination-and-dicing.md`_
