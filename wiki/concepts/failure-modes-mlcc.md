---
title: MLCC Failure Modes
type: concept
created: 2026-05-19
updated: 2026-06-24
status: complete
importance: high
sources:
  - kemet-mlcc-design-and-characteristics.md
  - psma-ceramic-capacitor-basics.md
  - resources/literature/hygrothermal-reflow-delamination-mlcc.md
  - resources/literature/x-ray-crack-detection-mlcc.md
tags:
  - paper
---

# MLCC Failure Modes

Ceramic is brittle, strong in compression, weak in tension. Most MLCC field failures are mechanical, not electrical. The major modes ([[kemet-mlcc-design-and-characteristics]]):

## Cracking
Cracks split into **assembly/handling** cracks (introduced after the part leaves the factory) and **manufacturing** cracks (born in the build). The as-manufactured crack probability is relatively low; most field cracks come from assembly, handling, and test ([[nasa-cracking-low-voltage-mlcc]]).

| Mode | Origin | Root cause | Where in part | Common case sizes |
|---|---|---|---|---|
| **Mechanical-damage crack** | assembly | Pick-and-place impact, hand mishandling | corner / surface | any |
| **Thermal-shock crack** | assembly | Rapid ΔT during hand-soldering or wave soldering; CTE mismatch | parallel-plate (perpendicular to length) | large cases (>0805) more sensitive |
| **Flex crack** | assembly | PCB bend stress after mounting | initiates near termination, propagates diagonally into active | >0805 |
| **Firing crack** | manufacturing | sintering shrinkage / thermal-gradient stress | runs **perpendicular to the electrodes** | any |
| **Knit-line crack** | manufacturing | green-lamination knit-line weakness | from an **electrode end toward the opposite termination** | any |

Failure mode is **not always immediate** — a crack can be latent and surface as a short or open later under thermal cycling. Flex cracks specifically are **hard to detect when tightly closed** (see [[mlcc-failure-analysis-techniques]]; [[x-ray-crack-detection-mlcc]] bent 300 MLCCs to map this).

### Flex-crack mitigation levels
[[psma-ceramic-capacitor-basics]] catalogs four protection levels:

| Level | Technology | Flex capability | Failure mode |
|---|---|---|---|
| 0 | Standard MLCC | up to 2 mm | fail-short |
| 1 | Open-mode or floating-electrode design | up to 2 mm | fail-open (crack doesn't reach active area) |
| 2 | Flexible termination (FT-CAP, conductive epoxy in termination) | up to 5 mm | fail-short |
| 3 | Hybrid: flexible termination + floating electrode | up to 5 mm | fail-open |

Cost climbs with level; volumetric efficiency drops (the protection structures take space).

## Delamination and voids
Interfacial separation (electrode–dielectric, cover, or termination) and porosity-driven voids — covered in depth on [[mlcc-delamination]]. Two origins: **intrinsic** (binder-burnout / co-firing shrinkage mismatch, [[ni-batio3-cosintering-interface]]) and **hygrothermal/reflow** ([[hygrothermal-reflow-delamination-mlcc]]: absorbed moisture flashes to **6.23 MPa** steam at reflow, exceeding ~6 MPa interface adhesion → "popcorn" delamination; defects measured at voids 0.15–0.55 µm, delamination 0.05–0.21 mm). **Inter-electrode voids** from ceramic porosity reduce active overlap area and concentrate field. Like cracks, delamination can stay latent and later propagate into a short.

## Surface arcing
At high voltage (>500 V typical), discharge can occur **outside** the part — across the surface between opposite-polarity terminations or between a termination and an exposed internal electrode of opposite polarity ([[kemet-mlcc-design-and-characteristics]]).

Drivers:
- Humidity (water film raises surface conductivity)
- Contamination (flux residue, dust)
- Creepage distance (limited by chip length minus end margins)
- Local electric field strength

Mitigations:
- **Surface coatings** (low-K conformal): increase creepage path, suppress air ionization. Drawback: any damage / void breaks the protection.
- **Serial electrode design**: split the chip into multiple in-series sub-capacitors, distributing the voltage. Drawback: 1/N effective capacitance.
- **Shield design** (e.g., [[kemet-arcshield]]): add "shield" electrodes that lengthen the field path between opposite-polarity electrodes without sacrificing as much capacitance.

## Insulation resistance degradation
Long-term electrochemical mode, dominant in BME parts: oxygen vacancies migrate under DC bias, accumulate at the cathode-side electrode, and reduce the band gap locally → leakage. Models in [[bme-reliability-model]].

## Implications for simulator
The simulator should flag:
- High-V parts (>100 V) for arcing risk and require a creepage check.
- Large cases (>0805) for flex-crack risk and recommend flex termination or open-mode design.
- Hand-soldering / wave-soldering process choice → thermal-shock margin check (CTE mismatch limit on size and rated voltage).

## Finding these defects
Detection and root-cause methods (C-SAM, X-ray/CT, DPA cross-section, functional acoustic screening, electrical) are cataloged on [[mlcc-failure-analysis-techniques]]. Key principle: a defect's **openness** decides the modality — tightly closed cracks/delaminations need acoustic methods, not X-ray.

## References
- [[kemet-mlcc-design-and-characteristics]]
- [[psma-ceramic-capacitor-basics]]
- [[mlcc-failure-analysis-techniques]]
- [[mlcc-delamination]]
- [[hygrothermal-reflow-delamination-mlcc]]
- [[x-ray-crack-detection-mlcc]]
