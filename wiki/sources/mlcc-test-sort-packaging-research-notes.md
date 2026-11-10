---
title: "MLCC Test, Sort, Screening & Packaging Research Notes (vendor + NASA survey, 2026-11)"
type: source
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/80-test-sort-and-packaging.md
tags:
  - survey
status: complete
importance: medium
---

# MLCC Test, Sort, Screening & Packaging Research Notes

**Type:** compiled research notes (2026-11-10) listing 12 sources. Nine were read in full:
- the ESI/MKS Allegro XP handler datasheet (2020)
- Murata's measurement-technology page, capacitor guide, and space-MLCC flow paper
- three NASA NEPP documents by Teverovsky (2012 COTS screening guidelines, a cracking/MIL-spec deck, and a 2022 burn-in deck)
- the Johanson tape-and-reel note
- a DigiKey measurement checklist

Three sources are known only from search summaries and are unverified: a TDK measurement FAQ, an older Allegro page, and a YAGEO grade table.

## Key claims
- 100% sort is standard. Murata runs at >10,000 units/min. The Allegro XP handles up to 16,666 parts/min with 25 stations measuring at 120 Hz, 1 kHz, and 1 MHz, and has 7 tolerance bins, 7 reject bins, and 1 retest bin.
- High-rel voltage conditioning runs at 2×V_R and 125 °C for 168, 96, or 48 h. Pass limit: end-of-test leakage <10 nA or <150% of the 1 h value. Allowed lot defect rate (PDA) is 10, 15, or 20%.
- Screens miss cracks. DWV at 2.5×V_R is far below the 10–100×V_R breakdown, so only about 20% of gross-defect parts fail it. Capacitance and DF are nearly insensitive to cracks.
- Paper tape is used for EIA 0603 and smaller. A 0402 reel holds 10k parts; a 0201 reel holds 15k.

## Conflicts / gaps
- Allegro bin counts differ between generations.
- No source confirms production IR soak or DWV dwell times, Class I measurement conditions, or AOI and PAT details.
- No source explains how inline sorting corrects for Class II aging.

## Concepts
- [[production-test-and-screening-mlcc]] · [[aging-class-2]] · [[insulation-resistance]] · [[failure-modes-mlcc]]

## References
_Original source: `resources/manufacturing/80-test-sort-and-packaging.md`_
