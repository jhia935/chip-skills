---
title: "Hygrothermally Induced Failures in MLCCs During Thermal Reflow (Microelectronics Reliability 2023)"
type: source
created: 2026-06-24
updated: 2026-06-24
sources:
  - resources/literature/hygrothermal-reflow-delamination-mlcc.md
tags:
  - paper
  - 2023
status: complete
importance: high
---

# Hygrothermally Induced Failures in MLCCs During Thermal Reflow

**Venue:** *Microelectronics Reliability* 146 (2023) 115028.
**Type:** T3 peer-reviewed paper — root-cause + numerical-modeling study.
_(Authors not fully resolved in capture — cite by title/venue.)_

## Summary

A root-cause investigation of **moisture-driven delamination and voiding** in MLCC assemblies during **thermal reflow**. Combines **SEM** defect imaging (~2 µm resolution) with **extended-finite-element (X-FEM) modeling in ABAQUS** to explain how absorbed moisture + CTE mismatch nucleate and propagate the defects.

## Quantitative findings

| Defect | Geometry (measured) |
|---|---|
| Voids at Cu / Cu-epoxy interface | **0.15 – 0.55 µm** width |
| Interfacial delamination | **0.05 – 0.21 mm** length |
| Largest cracks (post-reflow) | **≈ 3.56 µm** thick |

**Failure criterion:** absorbed moisture generated **6.23 MPa vapor pressure** during reflow, **exceeding the 6 MPa adhesion strength** of the adhesive/substrate interface → delamination ("popcorn"-type). Root causes: **moisture contamination** (preconditioning) and **thermal mismatch**.

## Significance

The quantitative anchor for the **reflow / hygrothermal delamination** path — distinct from intrinsic firing delamination (a co-firing / binder-burnout defect). The vapor-pressure-vs-adhesion inequality is a directly actionable design/handling criterion (MSL bake-out, adhesion margin). Feeds [[mlcc-delamination]] and [[failure-modes-mlcc]].

## Concepts discussed
- [[mlcc-delamination]]
- [[failure-modes-mlcc]] (thermal-shock / reflow context)
- [[mlcc-failure-analysis-techniques]] (SEM, cross-section)
- [[binder-burnout-debinding]] (contrast: intrinsic delamination origin)

## References
_Original source: `resources/literature/hygrothermal-reflow-delamination-mlcc.md`_
