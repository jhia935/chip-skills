---
title: Termination & Plating (External Electrode Stack)
type: concept
created: 2026-05-19
updated: 2026-11-10
status: complete
importance: medium
sources:
  - psma-ceramic-capacitor-basics.md
  - kemet-mlcc-design-and-characteristics.md
  - resources/manufacturing/60-termination-and-plating.md
tags:
  - paper
---

# Termination & Plating

The three-metal-layer external electrode stack on each end of an MLCC chip. Provides electrical contact to all the internal-electrode tabs of one polarity, mechanical anchor to the PCB pad, and a solderable finish that survives oven reflow.

## Standard BME stack (modern Tier-1)

```
Sn finish (5–10 µm matte, electrolytic)
    └──── solderability + corrosion protection
Ni barrier (2–3 µm electrolytic)
    └──── prevents Sn-Cu intermetallic & solder-leaching
Cu paste sintered termination (10–30 µm)
    └──── ohmic contact to internal Ni electrodes; structural backbone
└── Internal Ni electrode tabs exposed at chip end after dicing/rounding
```

For **PME parts** ([[bme-vs-pme|legacy noble-metal electrode]]): the termination layer is **Ag-Pd or Ag** instead of Cu, again with a Ni barrier and Sn finish.

## Process sequence
1. **Corner rounding**: barrel-tumble the chips with media to break sharp corners; see [[barrel-chamfering-mlcc]] for the radius-vs-thermal-shock data.
2. **Termination dipping**: dip each end into a Cu (or Ag-based) thick-film paste of metal powder, glass frit, and organic vehicle.
3. **Termination sintering**: bake at ~700–900 °C, well below the BaTiO₃ peak sintering temperature. The glass frit melts, wets the dielectric and electrode tabs, and bonds the Cu layer.
4. **Ni barrier plating**: electrolytic Watts-bath nickel; typically 2–3 µm over the termination Cu.
5. **Sn finish plating**: matte tin (or SnPb for legacy applications); 5–10 µm.

### Process parameters (2026-11 patent/NASA survey)

| Parameter | Value | Source |
|---|---|---|
| Cu paste composition | Cu 45–85 wt%, glass frit **5–15 wt%** (pref. 8–12, borosilicate, softening 500–650 °C), oxide additive 0.1–10 wt% to stop glass rising to the surface | [us7083744] |
| Older Cu paste | Cu/frit 75–97 / 3–25 wt% of solids, frit softening 425–550 °C | [us4517155] |
| Firing | N₂ with **30–180 ppm O₂**: dry 85–120 °C, burnout 300–500 °C, sinter **600–900 °C (pref. 650–750)** for 15–70 min | [us4517155] |
| Newer firing windows | 700–770 °C N₂ [us7083744]; ≤750 °C to avoid connection defects with inner electrodes [us8941971]; ~800 °C [murata-guide] | — |
| Fired glass/Cu ratio | 0.4–2.0; glass area 35–80% at mid-thickness | [us8941971] |
| Fired Cu thickness | 3–30 µm (pref. ≥5); dip-coating struggles below ~12 µm | [us8941971], [us8953300] |
| Band-width uniformity | Paste creeps in a half-moon shape. A Si/F surface coating held the band ratio at 1.0–1.12 (1608) | [us9336952] |
| Conductive-resin (soft) layer | thermoset, cured at 150–200 °C (<300 °C), then plated with Ni/Sn | [us9336952] |

**Glass window.** Too little frit gives a porous film that lets plating solution in and degrades IR. Too much frit makes glass rise to the surface and causes plating defects. In one test, glass/Cu = 2.1 produced 726 IR failures per 10,000, against 2 per 10,000 at 0.3 [us8941971]. Glass area of 90% gave 184 plating defects per 2000 parts [us8941971].

> [!warning] Contradiction: Ni barrier thickness
> This page's "2–3 µm" (KEMET/PSMA training material) conflicts with other sources:
> - Rohm's patent example uses Ni ~3 µm (range 3–5) [us5712758].
> - Whiskered NASA parts carried 6–6.5 µm Ni [brusse-whisker-2002].
> - The field-failed CDR35 lot had **6–10 µm Ni**, against 4–6 µm in a good lot. NASA links thick Ni to termination delamination via the CTE mismatch (Ni 13.4 vs ceramic ~9.6 ppm/K) and plating hydrogen [teverovsky-cdr35-2017].
>
> No source gives a production optimum. Treat 2–10 µm as the observed range, with the thick end implicated in cracking.

## Why three layers
- **Cu termination alone**: would dissolve into the molten solder during reflow ("leaching"), exposing the BaTiO₃ and breaking the contact.
- **Cu + Sn (no Ni barrier)**: Sn-Cu intermetallics (Cu₆Sn₅, Cu₃Sn) grow at the interface and embrittle the joint over time.
- **Cu + Ni + Sn (full stack)**: Ni is a slow-diffusion barrier that limits Cu-Sn IMC growth; Sn provides clean solderability; Cu provides bulk conductivity and mechanical anchor.

## Flexible (soft) termination variants
For flex-crack mitigation ([[failure-modes-mlcc]]), some manufacturers insert a **conductive epoxy layer** between Cu and Ni barrier:
- KEMET FT-CAP
- TDK soft-termination CC-Cap
- Murata GRT series

The epoxy is silver-filled (so still conductive) and elastomeric — it absorbs PCB-flex stress that would otherwise crack the rigid ceramic-Cu interface. Bends rated to **5 mm PCB flex** vs **2 mm** for standard termination.

## Defect modes
| Mode | Cause |
|---|---|
| **Termination void** | Cu paste not fully wetting the dielectric/electrode tab — open circuit |
| **Solder leaching** | Excessive reflow heating → Cu termination dissolves into solder; Ni barrier insufficient or porous |
| **Sn whisker** | Pure Sn under compressive stress grows whiskers that short adjacent terminations — mitigated by SnPb (legacy) or Sn-matte + post-anneal |
| **Plating crack** | Improper plating chemistry → cracked Ni/Sn layers admit moisture |
| **Dewetting** | Solder doesn't wet the Sn surface, usually because of oxide contamination from poor storage |
| **Plating-solution ingress** | Thin or porous termination, especially at corners where the dipped film is thinnest → IR degradation [us8941971], [us8953300] |
| **Plating hydrogen** | H from Ni/Sn electroplating diffuses into the ceramic. Flux is highest at corners. In PME parts H reduces PdO → delamination; one CDR35 lot had up to ~50% termination-area cracks or delaminations [teverovsky-cdr35-2017] |
| **Band-width defects** | Oversized bands → pick-up and tombstone defects; undersized bands → weak adhesion [us9336952] |

> [!warning] Contradiction: whisker mitigation
> Manufacturers claimed that a Ni underlayer of more than 2 µm plus matte Sn prevents whiskers. NASA nevertheless observed whiskers up to 240 µm on Ni-barrier MLCCs [brusse-whisker-2002]. No post-2004 data is in the corpus.

## Implications for the simulator
- Termination contributes a fixed (small) series resistance to the part's ESR — typically < 5 mΩ for modern parts.
- Termination geometry sets the **BW (bandwidth)** dimension in datasheets ([[samsung-cl-series-mlcc-ds]] field 8): the lateral extent of the termination wrap-around. Affects ESL and solderability margin.
- Flex termination reduces ESL slightly (resin layer is poorer conductor) but moves the flex-crack failure point outside the ceramic active area.

## Cross-references
- [[mlcc-manufacturing-process]]
- [[barrel-chamfering-mlcc]] · [[production-test-and-screening-mlcc]] (downstream)
- [[failure-modes-mlcc]]
- [[bme-vs-pme]]
- [[esr-esl-srf]]
- [[case-size-geometry]]

## References
- [[mlcc-termination-plating-research-notes]]: 2026-11 patent + NASA survey (paste, firing, plating, chamfer)
- [[psma-ceramic-capacitor-basics]]
- [[kemet-mlcc-design-and-characteristics]]
- [[octopart-tdk-cga8l3c0g-product-guide]]
- [[nasa-cracking-low-voltage-mlcc]] (Section 2.3 termination materials)
