---
title: Barrel Chamfering (Corner Rounding) of MLCC Chips
type: concept
created: 2026-11-10
updated: 2026-11-11
sources:
  - resources/manufacturing/eq-08-chamfering.md
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

## Position in the line: green or fired (2026-11-11 survey)

Most apparatus patents found polish **green (unsintered) chips**, between cutting and binder burnout:
- TDK: green chips → horizontal centrifugal barrel → water wash → dry → binder removal → firing [us11978592]. Also a withdrawn application with a urethane-lined hex container, 2 mm alumina/silica media at a media/chip mass ratio of 0.1–6, and 3–25 G [jp2010283164a].
- Taiyo Yuden: laminate → barrel → sinter. Media is 0.1–0.3 × chip thickness, 1–60 min. Corner radii Ra/Rb are measured on a mid-L cross-section of 50 samples; Rb/Ra > 3 gave 0% chipping [us11037731]. A sealed container is used, and side margins wear at the corners [us11049660].
- Murata: dry centrifugal polishing of unsintered bodies, target R ≈ 70 µm after sintering [us6367134].

Polishing fired chips is also documented [us5712758], and [us10020117] allows either.

**Equipment.** Centrifugal barrels are the type named for MLCC: a turret with 4 tanks rotating opposite to it. One device runs two stages, low G (0.3–1.0 G) and then high G (1.5–6.0 G) [us9687954]. Machine safety uses lid clamps, a lid check, an interlock, and a slow check turn before full speed [us12103132]. Media is separated on a meshed sieve [us10957489].

> [!warning] Contradiction: wet vs dry polishing
> [us6367134] (Murata) reports delamination and IR drop with wet (water) polishing and prefers dry. [jp2010283164a] (TDK) polishes green chips with water: it notes Ba leaching when wet and chipping when dry. [us11978592] washes with water after polishing. The sources do not settle which is standard.

## Pitfall: green-chip polishing with attached side margins

Before sintering, an [[green-chip-cutting-and-side-margin|attached side margin]] is less dense than the body. Barrel-polishing at that stage can crack or peel the chip-to-margin interface [us10020117].

## Open questions
- No production media, time, or corner-radius data for 0402 and smaller cases. A 30–70 µm ridge radius appeared only in a search snippet.

## Cross-references
- [[termination-and-plating]] · [[failure-modes-mlcc]] · [[green-chip-cutting-and-side-margin]]

## References
- [[mlcc-termination-plating-research-notes]]
- [[mlcc-process-equipment-research-notes]]
