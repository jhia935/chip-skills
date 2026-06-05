---
title: MLCC Margin & Cover-Plate Design Rules
type: concept
created: 2026-06-05
updated: 2026-06-05
sources:
  - mil-spec-mlcc-requirements.md
  - gsfc-mlcc-space-spec-requirements.md
  - nasa-gsfc-liu-mlcc-construction-2011.md
status: complete
importance: high
---

# MLCC Margin & Cover-Plate Design Rules

The **side margin**, **end margin**, and **cover-plate thickness** are the keep-outs that protect an MLCC's active stack: side/end margins separate the buried electrodes from the side walls and the opposite-polarity termination; cover plates are the passive ceramic above/below the stack. They set how much of the [[case-size-geometry|footprint]] becomes [[electrode-overlap-and-registration|active overlap]], so they are first-order inputs to the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]] (`em`, `sm`, `cover`). This page collects the **quantitative minimums** from the military/space specs and the **as-built values** measured by DPA.

> [!note] All margin/cover values here are FIRED (post-sintering). The spec minimums are DPA acceptance criteria checked on finished cross-sections; the as-built numbers are measured on fired parts. Green (pre-sinter) margins are larger by ~`1/(1−s_xy)` — the simulator treats `em`/`sm` as fired keep-outs ([[green-tape-shrinkage-anisotropy]]).

## The voltage-scaled minimums (MIL-PRF-32535, BME)

[[mil-prf-32535-spec|MIL-PRF-32535]] is unusual: instead of fixing a dielectric thickness, it controls geometry through margin/cover tables keyed to **rated voltage** (Tables VIII / IX / X):

| Rated V | Side margin min | End margin min | Cover-plate min |
|---|---|---|---|
| 4–6.3 V | 15 µm (0.0006″) | 25 µm (0.0010″) | 25 µm (0.0010″) |
| 10–16 V | 20 µm (0.0008″) | 36 µm (0.0014″) | 36 µm (0.0014″) |
| 25 V | 25 µm (0.0010″) | 40 µm (0.0016″) | 40 µm (0.0016″) |
| >25–50 V | 40 µm (0.0016″) | 50 µm (0.0020″) | 50 µm (0.0020″) |
| >50–200 V | 50 µm (0.0020″) | 75 µm (0.0030″) | 75 µm (0.0030″) |

End margin and cover are held equal and ~1.5–2× the side margin — the end margin guards against arc-over to the opposite termination, the cover against surface flashover and handling damage.

## Space-grade floors (GSFC S-311-P-838) and the commercial baseline (EIA-469)

[[gsfc-mlcc-space-specs|S-311-P-838]] floors: side 15 µm (<25 V) / 25.4 µm (≥25 V); end 25 µm / 40.6 µm; cover 25.4 µm / 40.6 µm — at ≥25 V it defers to **ANSI/ECA-469** Tables 6/7/8. The older EIA-469 commercial baseline (cited in the [[nasa-gsfc-liu-construction-database-2011|Liu DPA report]]) is looser: side ≥25 µm, end ≥40 µm, cover ≥40 µm for ≤25 V. Vendor practice scales up by grade: commercial ~75 µm, automotive 100–125 µm, space 110–170 µm.

## As-built reality (measured DPA)

The [[nasa-gsfc-liu-construction-database-2011|Liu & Sampson 30-part DPA]] found every part ran margins **≥2× the EIA-469 minimum**: side **65–340 µm**, end **90–350 µm**, cover **55–175 µm** (BME), with PME military parts at the high end (D12X39350: 350/350 µm margins). So the *spec minimum* is a floor far below the *as-built* values — manufacturers spend margin for yield and registration headroom (see [[electrode-overlap-and-registration]]).

## Why margins scale with size (and the small-case squeeze)

A fixed registration + dicing budget is a larger fraction of a tiny chip, so small cases historically carried disproportionately large fractional margins. The simulator encodes this as **size-scaled margins** (`em ≈ 0.12·L`, `sm ≈ 0.10·W`, with floors/caps) rather than a constant absolute value — see [[case-size-geometry]]. The voltage-scaled spec minimums above are the *lower bound* the size-scaled value must clear.

## How the simulator uses these
- `em` / `sm` default to the size-scaled value; the spec tables here are the floor a custom value must not violate.
- `cover` (per side) defaults ~40–60 µm — consistent with the 25–75 µm spec range and the 55–175 µm as-built range.
- A high-CV design pushes margins toward these minimums to maximize [[electrode-overlap-and-registration|active overlap]]; the [[mlcc-dimensional-tolerance|build-to-max-footprint]] tolerance is the complementary lever.

## Cross-references
- [[case-size-geometry]] — footprint, size-scaled margins, the case table
- [[electrode-overlap-and-registration]] — margins → active overlap area
- [[mlcc-dimensional-tolerance]] — the L/W/T tolerance lever
- [[mil-prf-32535-spec]], [[mil-prf-123-spec]], [[gsfc-mlcc-space-specs]] — the source specs
- [[nasa-gsfc-liu-construction-database-2011]] — measured as-built margins
- [[avx-automotive-mlcc-kam-kaf]] — vendor automotive margin grade (100–125 µm)
- [[dielectric-layer-thickness-floor]] — the companion thickness limit

## References
- `resources/design-rules/mil-spec-mlcc-requirements.md`
- `resources/design-rules/gsfc-mlcc-space-spec-requirements.md`
- `resources/literature/nasa-gsfc-liu-mlcc-construction-2011.md`
