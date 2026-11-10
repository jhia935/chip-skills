---
title: Tape Casting of MLCC Dielectric Green Sheets
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/20-tape-casting.md
tags:
  - paper
status: complete
importance: high
---

# Tape Casting (Green-Sheet Formation)

[[slurry-preparation-mlcc|Slurry]] is coated onto a moving PET carrier film and dried into a **green sheet**. The green sheet becomes one dielectric layer of the stack. Its thickness, uniformity, and defect density pass almost unchanged into the fired dielectric (after [[green-tape-shrinkage-anisotropy|shrinkage]]). Step 3 of the [[mlcc-manufacturing-process|process map]].

## Carrier film and release layer: the hidden enabler

For sheets of a few µm and below, the **release-coated PET carrier** matters as much as the slurry:

| Property | Value | Source |
|---|---|---|
| PET base thickness | 10–300 µm (examples 30–38 µm) | [lintec-us20150086749], [nanya-us9932452] |
| Release layer | UV-cured acrylate/siloxane 0.3–2 µm [lintec-us20150086749]; silicone 0.04–0.8 µm [nanya-us9932452]; 0.05–1.0 µm [murata-us5520994] | — |
| Release-surface smoothness | **Ra ≤ 8 nm, Rp ≤ 50 nm** | [lintec-us20150086749] |
| Back-coat roughness | Ra 5–40 nm. Too rough imprints the sheet when wound (thin spots, shorts); too smooth causes blocking | [lintec-us20150086749] |
| Peel electrostatic charge | 0.8–1.6 kV (inventive) vs 2–12 kV (comparative) | [nanya-us9932452] |

Sheets of 0.5–1.0 µm stick to conventional release films and tear on peel [nanya-us9932452]. Peel static also wrinkles the sheet, so antistatic agents go into the slurry or the release layer [tdk-us7632369].

## Coating head

- **Doctor blade**: the blade gap sets the wet thickness. This is the classic method for thicker tapes [ieee-technav].
- **Slot-die, lip, or microgravure**: used for tapes thinner than ~50 µm, coating from the side or from below rather than from above [wiki-tc]. Lintec's 1 µm test sheet was die-coated [lintec-us20150086749]. TDK's 2 µm example used a **wire-bar coater at 50 m/min** [tdk-us7632369].

Whether Tier-1 lines run slot-die or gravure for 0.5–1 µm sheets is **not confirmed** by any vendor source.

## Drying

- The sheet dries from the exposed face only. Uncontrolled solvent loss causes cracking and curl [wiki-tc].
- Examples: 60–70 °C for 2 min (range 50–100 °C, 1–20 min) [tdk-us7632369]; 100 °C for 4 min [murata-us5520994].
- **Dry thickness = 5–25% of wet thickness** in a low-solids wire-bar coat [tdk-us7632369].
- Zoned drying tunnel design: the first zone removes ~80–90% of the solvent, at which point the slurry gels; the second zone finishes [steinmueller-us6682598]. Prior-art tunnels run up to 35 m.

## Thickness range

| Scope | Thickness | Source |
|---|---|---|
| MLCC green sheet (patent claim) | 0.5–30 µm; ≤3 µm preferred | [tdk-us7632369] |
| Ultrathin focus | 0.5–2 µm (test target 1 µm) | [lintec-us20150086749] |
| General ceramics tape casting | 20 µm – 1 mm | [ikts-tc], [ieee-technav] |
| Textbook "as thin as" | 5 µm; first sub-5 µm in 1996 | [wiki-tc] citing [[mistler-twiname-tape-casting-textbook]] |

> [!note] Not a contradiction, but stale
> The textbook "5 µm" floor reflects the 2000-era state of the art. MLCC patents from 2003 onward describe 0.5–2 µm green sheets, and fired layers reach ~0.4 µm today (see [[dielectric-layer-thickness-floor]]).

## Green-sheet acceptance targets

- Tensile strength ≥ 15 MPa, elongation 15–25% [yang-2026-pvb]
- Pinhole criterion: depressions ≥500 nm deep; ≥4 counted is "poor" [lintec-us20150086749]
- Sheet-to-release peel strength: 5–6 g/25 mm (organic) to 12 g/25 mm (aqueous) [murata-us5520994]

## Defect modes

| Defect | Cause |
|---|---|
| Cracks, curl | Uneven or too-fast drying [wiki-tc] |
| Streaks | Slip flow at the blade [wiki-tc] |
| Pinholes, thin spots → shorts | Slurry aggregates or bubbles [ieee-technav]; rough carrier back-coat imprint [lintec-us20150086749] |
| Tearing or wrinkling on peel | Electrostatic charge, release force too high [nanya-us9932452], [tdk-us7632369] |
| Roughness | Poor dispersion, excess binder, water, or aromatic solvent [tdk-us7632369] |
| Later delamination or warp | Layer-to-layer shrinkage mismatch [ieee-technav]; see [[mlcc-delamination]] |

## Gating role

Tape casting sets the **minimum dielectric thickness** (with the powder and slurry) and the **thickness uniformity** that the voltage rating has to cover. No T1–T4 source in the corpus quantifies production thickness uniformity (±%). That gap matters for the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]] d-tolerance.

## Cross-references
- [[slurry-preparation-mlcc]] (upstream) · [[internal-electrode-printing]] (downstream)
- [[dielectric-layer-thickness-floor]] · [[green-tape-shrinkage-anisotropy]] · [[green-density-vs-shrinkage]]
- [[aqueous-tape-casting-ultrathin-batio3-2025]] · [[heunisch-2010-tape-cast-anisotropic-shrinkage]]

## References
- [[mlcc-slurry-tape-casting-research-notes]]
- [[mistler-twiname-tape-casting-textbook]]
