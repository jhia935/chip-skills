---
title: KYOCERA AVX
type: entity
created: 2026-05-19
updated: 2026-06-05
sources:
  - kyocera-avx-esr-esl-decoupling.md
  - avx-automotive-kam-kaf-dimensions.md
tags:
  - company
status: complete
importance: medium
---

# KYOCERA AVX

Formed in 2020 when Kyocera fully integrated AVX Corporation (originally American Technical Ceramics legacy). US/Japan operations; broad passive product portfolio including MLCCs, tantalum, film, antennas.

## MLCC focus
KYOCERA AVX MLCC product families include high-Q RF ceramic capacitors (CDR/CBR series, Cu electrode, C0G) and bulk decoupling parts. The KYOCERA AVX "Decoupling and Low Inductance" application materials — notably the 1997 Cain CARTS paper [[kyocera-avx-esr-esl-decoupling]] — are widely cited for ripple-voltage modeling.

## Automotive MLCC (KAM / KAF)
The [[avx-automotive-mlcc-kam-kaf|KAM and KAF series]] are the AEC-Q200 automotive lines — KAM (plated Ni/Sn) and KAF (with [[soft-termination-mlcc|FLEXITERM]] soft termination, also VW 80808 approved). BME (Ni) construction, cases 0201–2220, 2.5 V–3000 V, to 22 µF, dielectrics C0G/X7R/X7T/**X8R/X8L (150 °C)**/X8G. FLEXITERM gives >5 mm board flex (vs >2 mm standard) and 0 % fail to 3000 temp cycles. Their datasheets are the wiki's primary source for chip **L×W×T dimensional tolerances**.

## High-reliability / space
KYOCERA AVX is the **first and (to date) only supplier qualified to NASA [[gsfc-mlcc-space-specs|S-311-P-838]]** (space-level BME X7R MLCC), and a major supplier under [[mil-prf-32535-spec|MIL-PRF-32535]].

## See also
- [[esr-esl-srf]]
- [[avx-automotive-mlcc-kam-kaf]], [[mil-prf-32535-spec]], [[gsfc-mlcc-space-specs]]
- [[mlcc-dimensional-tolerance]], [[mlcc-margin-cover-design-rules]]
