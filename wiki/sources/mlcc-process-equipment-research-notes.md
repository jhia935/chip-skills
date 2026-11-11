---
title: "MLCC Process Equipment & Line Sequence Research Notes (equipment survey, 2026-11-11)"
type: source
created: 2026-11-11
updated: 2026-11-11
sources:
  - resources/manufacturing/eq-01-powder.md
  - resources/manufacturing/eq-02-slurry.md
  - resources/manufacturing/eq-03-tape-casting.md
  - resources/manufacturing/eq-04-printing.md
  - resources/manufacturing/eq-05-stacking.md
  - resources/manufacturing/eq-06-cutting.md
  - resources/manufacturing/eq-07-firing.md
  - resources/manufacturing/eq-08-chamfering.md
  - resources/manufacturing/eq-09-termination-plating.md
  - resources/manufacturing/eq-10-test-sort-pack.md
tags:
  - patent
  - survey
status: complete
importance: high
---

# MLCC Process Equipment & Line Sequence Research Notes

**Type:** compiled research notes (2026-11-11), one file per process step (`eq-01` … `eq-10`). The question was: **what equipment does each step use, and in what order do the operations run?** The notes were collected to back the 3D process pages in `visualizations/`.

**Sources: about 150 in total.**
- **Mostly granted patents** that describe apparatus or step order. Murata, TDK, SEMCO, Taiyo Yuden, KYOCERA, ESI/Palomar, Sakai and Ferro are the main assignees.
- **Equipment-maker pages and datasheets** (T6): KEKO, HIMA, Micro Tech, Tipton, Sintokogio, Hosokawa, Shibuya, Tokyo Weld, Yasui, Noritake and others.
- **A few papers:** KSNVE 2014 (MLCC stacker), KAIS 2013 (roller-hearth kiln chamber), Micromeritics 2025 (Taiyo Yuden), 粉砕 2011 (Murata author).

Most numbers are patent embodiments or equipment specifications, not production settings. Several makers' datasheets list LTCC/HTCC rather than MLCC. Facts seen only in a search snippet are marked "(snippet)" in the notes.

## Key claims per step

| Step | Line sequence found | Key keys |
|---|---|---|
| Powder | Hydrothermal: Ti source (TiCl₄ neutralisation, wash) → Ba(OH)₂ charge under N₂ → autoclave → optional CO₂ Ba-fixing → wash/filter → dry → optional heat treatment. Solid-state: weigh → ball mill (72 h example) → spray dry → rotary kiln 600–700 °C → batch furnace 900–1000 °C → pulverise. Calcined lumps are de-agglomerated by impact/jet mill. | [us9771274], [us6129903], [us4643984], [us20090264276], [hosokawa-bt-web], [us5783165] |
| Slurry | Four published orders. One patent runs bead mill → binder → basket mill → high-pressure (HP) disperser → 1–2 µm filter. Binder solution is refluxed and filtered (≤2 µm) separately. HP treatment can come before most of the binder is added. | [sem-us7229035], [murata-us6511564], [murata-us6579394], [tdk-us7744711], [nakamura-2011-funsai] |
| Tape casting | Unwind (constant tension) → carrier cleaning on a support roll → slurry feed: tank → filter → pump → flow control → flow meter, with a density meter → die or doctor-blade head on a backup roll → wet area-weight gauge (X-ray/β) → zoned dryer (top hot air + bottom heat) → dry thickness gauge with flow feedback → defect inspection → wind | [us6096370], [us6869482], [us6605241], [cn1201869c], [us5316602] |
| Printing | Vehicle → premix → three-roll / ball / HP dispersion → ≤5 µm filter → unwind with dancer → screen (vacuum table, X-Y-θ camera) or gravure → **intermediate dry → step-compensation print → main dry** → EPC, destaticizer, take-up | [us7661361], [cn102254585], [wo2017018228], [us20050016661], [us7739950] |
| Stacking | Sheet route: cut to size (half-cut, ceramic only) → vacuum peel from PET → move → align → per-layer heat press (pressure rise, then hold). Alternative: transfer then film peel. Then covers → pre-lamination press → vacuum pack → WIP in heated water (or uniaxial press in a die cavity) → unpack. | [kosnve-2014-stacker], [keko-st], [keko-sw], [keko-ils], [keko-tpr], [us4749421] |
| Cutting | Fix block on holding sheet → trim the edge to expose marks → read marks (side camera or top CCD) → press (knife) cut, pitch by pitch → turn 90° → second cut set → expand sheet ~160% → (attached side margin: tumble 90° → punch sheet on elastic body → thermo-compress → repeat) → release (heat-foam tape) | [us8795454], [us6892616], [us5233669], [us9039859], [hima-8012-web], [microtec-mtc0402-web] |
| Firing | Chips onto zirconia setters → setters stacked in tiers → 1st burnout in box batch furnace → 2nd burnout in belt furnace, or integrated in a long pusher → pusher or roller-hearth kiln (humidified N₂/H₂) → re-oxidation in the kiln's zone or a separate furnace → cool, unload | [hengli-3dincites-2026], [us6185087], [us12374492], [lee-2013-rhk-kais], [us6461156] |
| Chamfering | Most sources polish **green chips before firing** in a centrifugal barrel (two-stage low G → high G in one device), then wash/dry, then debind and fire. Polishing fired chips is also used. | [us11978592], [us11037731], [us6367134], [jp2010283164a], [us9687954], [us12103132] |
| Termination / plating | Carrier plate loaded by vibration + vacuum and pin-press. Each end: levelling-blade paste film → dip → blot → dry. Between the ends the plate is inverted and the chips are pushed through. Then push-out → belt-furnace firing (N₂/wet N₂) → barrel loaded with chips + steel-ball media → pre-treatment → Ni → Sn → separate media (magnetic) → XRF / solderability | [us4381321], [us5248340], [us5551979], [us11602766], [us6558524], [us7379288], [us5887728] |
| Test / sort / pack | Handler: C/DF → flash → low-V IR → rated soak → IR → C recheck (one patent order); air-valve ejection to bins. Then glass-disk appearance inspection (4 cameras + laser thickness) with 3-way sort. Taping: re-measure → air insertion → pocket camera → cover-tape heat seal → seal camera → reel; peel test on samples; reel label (EIA-556) | [us5842579], [us6448525], [us6479777], [us9404732], [us6820401], [kemet-pack] |

## Conflicts
- **Chamfering, wet vs dry.** [us6367134] (Murata) reports that wet polishing gives delamination and an IR drop, and prefers dry centrifugal polishing. [jp2010283164a] (TDK) polishes green chips with water. It notes Ba leaching when wet and chipping when dry. See [[barrel-chamfering-mlcc]].
- **Slurry milling order.** [sem-us7229035] runs bead mill → binder → basket mill. The earlier wiki sequence (and the 3D page before 2026-11-11) had basket mill → bead mill → binder. See [[slurry-preparation-mlcc]].
- **Solid-state calcination.** The patent example gives 900–1000 °C [us20090264276]; the wiki gives 1100–1400 °C [[batio3-powder-synthesis]].
- **Re-oxidation PO₂.** One patent gives 10⁻⁵–10⁻⁴ atm [us6185087]; the wiki gives a lower value on [[re-oxidation-anneal]].
- **Side-margin thermo-compression.** One patent gives ≤200 °C [us8795454], another 50–100 °C [us10453615].
- **Equipment specs.** KEKO's ILS datasheet and web page disagree: 80 vs 70 MPa.
- **Tape cover-seal temperature.** Machine set points are 90–160 °C [vtek-tm401]. Tape datasheets give 150–230 °C, but that range comes from a snippet only.

## Gaps
- No production values for: press/WIP hold time, 2nd-burnout temperature, belt speeds, dew-point set points, flash/soak dwell in production, peel-test sampling frequency, or screen mesh for sub-µm Ni electrodes.
- No source found for: chip loading/unloading machinery around the kiln, magnetic separation of powder, or green-chip appearance inspection.
- Many equipment shapes in the 3D pages remain general practice (g).

## References
- [[mlcc-process-substeps-and-equipment]] · [[mlcc-manufacturing-process]] · [[barrel-chamfering-mlcc]] · [[slurry-preparation-mlcc]] · [[internal-electrode-printing]] · [[stacking-and-lamination-mlcc]] · [[green-chip-cutting-and-side-margin]] · [[production-test-and-screening-mlcc]]
