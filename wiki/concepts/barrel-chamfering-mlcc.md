---
title: Barrel Chamfering (Corner Rounding) of MLCC Chips
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/60-termination-and-plating.md
tags:
  - paper
status: draft
importance: medium
---

# Barrel Chamfering (Corner Rounding)

The chip bodies, a polishing medium, and a liquid are loaded into a barrel that is **rotated or vibrated** until the corners and ridges are rounded [us10020117]. This is step 11 of the [[mlcc-manufacturing-process|process map]] and comes before [[termination-and-plating|termination]].

## Why

- **Chipping and cracking during handling.** Sharp corners chip or crack when bodies collide in later handling [us10020117].
- **Thermal-shock life.** Corner radius has a measurable effect. On a 2.0 × 1.25 × 0.6 mm fired chip, R ≥ 0.10 mm (preferred 0.13–0.15 mm) cut thermal-shock rejects. R = 0.13 mm together with a dual-layer termination gave **0 rejects after 1000 cycles** (−55/125 °C), while unchamfered or R = 0.08 mm parts failed within several hundred cycles [us5712758].
- **Electrode exposure.** The process overview (and the older [[termination-and-plating]] page) also states that rounding exposes the internal-electrode ends. No fetched source states this explicitly, so it is unverified.

## Parameters (single example)

| Parameter | Value | Source |
|---|---|---|
| Media | 50/50 electrofused alumina + tungsten carbide, 40 mesh | [us5712758] |
| Time / speed | 12 h at 78 rpm → R 0.13 mm; 6 h → R 0.08 mm | [us5712758] |
| State | Green (unsintered) or fired bodies | [us10020117] |

## Pitfall: green-chip polishing with attached side margins

Before sintering, an [[green-chip-cutting-and-side-margin|attached side margin]] is less dense than the body. Barrel-polishing at that stage can crack or peel the chip-to-margin interface [us10020117].

## Open questions
- No production media, time, or corner-radius data for 0402 and smaller cases. A 30–70 µm ridge radius appeared only in a search snippet.

## Cross-references
- [[termination-and-plating]] · [[failure-modes-mlcc]] · [[green-chip-cutting-and-side-margin]]

## References
- [[mlcc-termination-plating-research-notes]]
