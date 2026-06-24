---
title: "Acoustic Detection of Cracks and Delamination in MLCCs (IEEE 2017/2018)"
type: source
created: 2026-06-24
updated: 2026-06-24
sources:
  - resources/literature/acoustic-ml-crack-detection-mlcc.md
tags:
  - paper
  - 2018
status: complete
importance: medium
---

# Acoustic Detection of Cracks and Delamination in MLCCs

**Venue:** IEEE — conference (2017) and journal (2018).
**Type:** T3 peer-reviewed paper — non-destructive electromechanical screening + machine learning.

## Summary

A **fast, non-destructive acoustic screen** for mechanically damaged MLCCs that uses the part's **own electromechanically excited vibration** rather than an external acoustic-microscope scan. **Soldered 2220-size MLCCs** are driven with **AC voltage frequency sweeps**, making them vibrate (the same electrostrictive/piezo effect behind [[mlcc-acoustic-noise]]). The **acoustic response is recorded before and after severe board bending**; cracks and delaminations produce **characteristic spectral changes**. A **support-vector-machine (SVM) classifier** trained on the responses **reliably separated damaged from intact parts**.

## Significance

A **functional / in-circuit** FA modality, complementary to imaging methods (X-ray, C-SAM, DPA). Where imaging localizes a defect, this detects the *mechanical consequence* of a defect on the assembled part — useful for **screening** populations after a mechanical-stress step. Establishes machine-learning classification on acoustic signatures as a viable screen. Cataloged on [[mlcc-failure-analysis-techniques]].

> Distinguish from **C-SAM** ([[acoustic-microscopy-tight-delaminations-mlcc]]): C-SAM is an immersion *scanning acoustic microscope* that images the internal interfaces; this method listens to the part *singing* under AC drive.

## Concepts discussed
- [[mlcc-failure-analysis-techniques]]
- [[mlcc-acoustic-noise]] (same electromechanical excitation, used here as a diagnostic)
- [[failure-modes-mlcc]] (flex crack, delamination)

## References
_Original source: `resources/literature/acoustic-ml-crack-detection-mlcc.md`_
