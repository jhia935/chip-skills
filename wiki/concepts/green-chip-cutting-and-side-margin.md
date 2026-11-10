---
title: Green-Chip Cutting & Attached Side Margins
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/40-lamination-and-dicing.md
tags:
  - paper
status: complete
importance: high
---

# Green-Chip Cutting & Attached Side Margins

The laminated block is cut into individual green chips. Step 7 of the [[mlcc-manufacturing-process|process map]]. Cuts run along two orthogonal line sets (C1, C2) through the centers of the electrode overlap. On the end faces, the electrodes then alternate polarity and are exposed for the [[termination-and-plating|termination]] [us11348730], [us11600441].

## Cutting methods

- **Dicing** with a rotary blade is used in a recent example [us10573466].
- **Push (press) cutting** and **laser** cutting are also named in patent lists. This was seen only in search excerpts and is unverified.
- **Cut-position inspection.** A partial blank in the electrode pattern at the cut line makes positional shift visible. Shift matters because it moves the electrodes off the design and hurts insulation [us6091598]. This came from a search excerpt only.

No source gave a numeric cutting accuracy or blade kerf. Cut-position tolerance is part of the margin budget on [[electrode-overlap-and-registration]].

## Attached side margin: the high-CV route

The conventional route prints the side margin as an electrode-free strip on every layer. The high-CV route works differently:

1. Cut the bar so that the **electrodes run all the way to both side faces**. This also removes the side-margin [[step-height-compensation|step]].
2. Press a ceramic **side-margin sheet** onto each side face against a rubber, PDMS, or silicone punching pad, so the sheet wraps to the corner. Trim the excess and rotate the body 90° or 180° for the other side [us11348730], [us11600441].
3. Variant: press the chip into an elastic body covered with the sheet, so shear force cuts off a piece that stays on the side face. Gaps ("entry portions") are kept to ≤30% of the end-margin dimension [us10460876].
4. Fire as usual.

**Why do this.** Margins coated or printed from slurry vary in width, thicker at the center. The thickness-uniformity ratio A1/A then falls below 0.9 and active area is wasted. Attached sheets hold A1/A at 0.9–1.0 [us11600441].

| Parameter | Value | Source |
|---|---|---|
| Attached side margin (average) | **2–10 µm** | [us11348730] |
| Attached side margin | width A = **11 µm** in most test chips (20 µm comparison). The 5–15 µm range (10–15 preferred) applies to a margin dimension along the thickness direction, not to A | [us11600441] (verified 2026-11-10) |
| Printed-margin comparison | ≥20 µm | [us11348730] |
| Limits | <2 µm: weak, moisture-prone, shorts. >10–15 µm: capacitance loss | [us11348730], [us11600441] |

> [!warning] Contradiction: different patents, same 0603 case
> [us11348730] gives an average attached margin of 2–10 µm. [us11600441] uses ~11 µm width in its examples; its 5–15 µm range refers to a different dimension. The patents are not directly comparable, and neither is a production specification.

Compare this with the ≥15–25 µm spec minimums and the 65–340 µm as-built values on [[mlcc-margin-cover-design-rules]]. The attached-margin route is how sub-0603 high-CV parts reclaim footprint for [[electrode-overlap-and-registration|active overlap]].

## Defect modes

- Voids at the body/side-margin interface → field concentration, lower BDV. A lower-density sintered margin → poorer moisture resistance [us11348730].
- Thin margins fail humidity bias tests (IR <10 MΩ at 45 °C / 95% RH / 10 V). Keeping entry portions below the end-margin size held failures to ≤10% [us10460876].
- Barrel-polishing *green* chips can crack or peel the chip-to-side-margin interface, because the margin is less dense before sintering [us10020117]. See [[barrel-chamfering-mlcc]].

## Implications for the simulator

The chip-sim's size-scaled `sm` default (≈0.10·W) represents printed margins. An attached-margin design would use `sm` ≈ 2–11 µm *fired*. This is a separate design grade, not an extrapolation of the printed rule. See [[case-size-geometry]].

## Cross-references
- [[stacking-and-lamination-mlcc]] (upstream) · [[binder-burnout-debinding]] (downstream)
- [[mlcc-margin-cover-design-rules]] · [[electrode-overlap-and-registration]] · [[case-size-geometry]]

## References
- [[mlcc-printing-lamination-research-notes]]
