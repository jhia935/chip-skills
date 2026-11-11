---
title: Internal-Electrode Printing (Screen / Gravure / Inkjet)
type: concept
created: 2026-11-10
updated: 2026-11-11
sources:
  - resources/manufacturing/eq-04-printing.md
  - resources/manufacturing/30-electrode-printing.md
tags:
  - paper
status: complete
importance: high
---

# Internal-Electrode Printing

The [[ni-electrode-paste-formulation|Ni paste]] is printed as a pattern of electrodes onto each [[tape-casting-mlcc|green sheet]], or onto a carrier film for later transfer. Step 4 of the [[mlcc-manufacturing-process|process map]]. This page covers the **printing process and equipment**. Paste chemistry is on [[ni-electrode-paste-formulation]]; the geometry of the printed unit cell is on [[electrode-overlap-and-registration]].

## Printing methods

| Method | How it works | Published parameters |
|---|---|---|
| **Screen** | Stainless mesh + emulsion; squeegee pushes paste through | 400-mesh SUS, 10 µm emulsion, IR-belt dry ~125 °C (single example) [us6485591] |
| **Gravure** | Engraved roll dips in paste; a doctor blade wipes excess; a back roll presses the sheet onto the roll | Roll Ø 30–300 mm, **5–150 m/min**, cell depth 1–100 µm, wall width 1–25 µm [us10449795]. Said to be "widely used" for productivity [us10449795] |
| **Inkjet** | Separate heads print Ni electrode ink and BaTiO₃ dielectric ink | ≤2 poise, 0.001–10 µm particles, 720 dpi [us6979416]; electrode + dielectric co-printing [us7505247]. Patent proposals only; **no evidence of volume use** |

Gravure plate geometry (bent vs straight cell walls, notches) controls paste transfer and thickness uniformity. Bent-wall plates make transfer depend on paste viscosity [us10449795]. A conventional impression cylinder can damage electrodes printed in earlier passes [us6485591].

## Direct print vs transfer

Solvent-based electrode inks (for example ~30 wt% diethylene glycol monobutyl ether) swell or attack the green sheet. One patent reports shorts on sheets ≤15 µm [us6979416]. Two workarounds appear:
- **Print on a carrier film, then transfer** the electrode to the sheet [us6485591].
- **Water-based** electrode ink [us6979416].

## Electrode thickness

| Era / source | Thickness |
|---|---|
| Early generation (16–20 µm sheets) | 4 µm [us6485591] |
| General patent range | 0.1–2 µm (pref. 0.1–1.0) [us7641727]; 0.2–1.0 µm [us9001493] |
| Modern high-layer-count | **0.4–0.7 µm**, example 0.55 µm × 560 layers [us10573466] |

Production wet and dry print thickness for sub-µm electrodes was **not found** in any vendor or peer-reviewed source.

## Registration

Electrode patterns are aligned with camera-read target marks and an X-Y-θ stage. Second marks printed with each layer guide [[stacking-and-lamination-mlcc|stacking]] [us5935365]. In that patent, vision registration cut maximum misalignment from **~250 µm to 8–13 µm**, the **shorting rate from 33.2% to 0.4–1.0%**, and raised yield from 33% to 90–92%. The examples are thick-layer (2.5–8 µm) parts, and the gain combines vision alignment with an extrusion-coating head, so it cannot be credited to registration alone (verified 2026-11-10). Misregistration accumulates through the stack, so it sets the minimum margin budget; see [[electrode-overlap-and-registration]] and [[mlcc-margin-cover-design-rules]].

## Drying

Electrode and blank paste dry at 70–120 °C for 1–10 min [us7641727]; hot air at 45–80 °C [us5935365].

**Order on the line (2026-11-11).** Three patents print the electrode first, dry it (TDK example: 75 °C, 1.5 min), then print the step-compensation ceramic paste and dry again (90 °C) [us7661361], [us20050016661], [us7739950]. [us7661361] predicts that the reverse order works too. The line runs: unwind → dancer → printer → intermediate dry → second printer → buffer loop → main dryer → inspection → EPC → destaticizer → take-up [us7661361]. Details: [[mlcc-process-equipment-research-notes]].

## Step height

Each electrode layer adds thickness only where the electrode is. Stacking hundreds of layers therefore builds a **step** between the electrode region and the margins. This is the main print-related cause of delamination and is handled by [[step-height-compensation]].

## Defect modes

- Paste flow-out through the mesh (low viscosity); poor leveling and film breakage (high viscosity) [us7641727]
- Gravure thickness non-uniformity and shape error from cell-wall geometry [us10449795]
- Sheet attack and shorts from solvent inks on thin sheets [us6979416], [us6485591]
- Static charge wrinkles the sheet and degrades stacking accuracy [us7641727]
- Misregistration → shorts, lower BDV (150 V prior art vs 230 V for 8 µm sheets in [us5935365]; its 2.5 µm-sheet examples gave 80–90 V)

## Open questions
- Whether Tier-1 makers print sub-µm electrodes by screen or by gravure is not established by fetched sources.
- No production mesh, emulsion, or print-speed data. All values are single patent embodiments.

## Cross-references
- [[ni-electrode-paste-formulation]] · [[electrode-overlap-and-registration]] · [[step-height-compensation]]
- [[tape-casting-mlcc]] (upstream) · [[stacking-and-lamination-mlcc]] (downstream)
- [[metal-electrode-shrinkage-effect]] · [[mlcc-delamination]]

## References
- [[mlcc-process-equipment-research-notes]]
- [[mlcc-printing-lamination-research-notes]]
- [[okuma-2021-mlcc-electrode-nanoct]]
