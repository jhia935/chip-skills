---
title: MLCC Process — Sub-steps and Equipment per Sub-step
type: query
created: 2026-11-10
updated: 2026-11-11
sources:
  - resources/manufacturing/10-powder-and-slurry.md
  - resources/manufacturing/20-tape-casting.md
  - resources/manufacturing/30-electrode-printing.md
  - resources/manufacturing/40-lamination-and-dicing.md
  - resources/manufacturing/60-termination-and-plating.md
  - resources/manufacturing/80-test-sort-and-packaging.md
  - resources/manufacturing/eq-01-powder.md … eq-10-test-sort-pack.md (2026-11-11 equipment survey)
tags:
  - survey
---

# MLCC Process: Sub-steps and Equipment

**Question (2026-11-10):** List the detailed sub-steps of each main MLCC process and the equipment each sub-step needs.

**Evidence marks.** Unmarked items are backed by corpus sources (the linked concept pages cite them). Items marked **(g)** are general industry practice that no source in the corpus documents yet; treat them as unverified.

## 1. Powder ([[batio3-powder-synthesis]], [[dopant-powder-coating]])
| Sub-step | Equipment |
|---|---|
| BaTiO₃ synthesis (hydrothermal / solid-state / oxalate) | Hydrothermal autoclave; ball mill + calcining furnace (solid-state); precipitation reactor (oxalate) |
| Dopant addition / coating | Ball mill (dry mix); wet-chemistry reactor + dryer + calciner; fluidized-bed ALD (research only) |
| Drying, de-agglomeration | Flash/spray dryer; jet mill or impact mill with classifier ([[mlcc-process-equipment-research-notes]]: [hosokawa-bt-web], [us5783165]) |
| Classification, powder QC | Sieve/classifier **(g)**; laser-diffraction PSD, XRD c/a, BET, ICP/XRF Ba/Ti ([us9771274], [us20090264276]) |

## 2. Slurry ([[slurry-preparation-mlcc]])
| Sub-step | Equipment |
|---|---|
| Premix (powder + solvent + dispersant) | Stirred tank (e.g. 300 rpm) |
| Primary dispersion | Basket mill or ball mill (ZrO₂ media) |
| Deagglomeration | Bead mill, 0.2–0.3 mm ZrO₂ beads |
| Binder/plasticizer solution prep + addition | Dissolution tank, filter, re-mill |
| High-pressure dispersion | High-pressure disperser (10–25 kpsi) |
| Filtration, de-airing | 1–2 µm cartridge filters; vacuum or standing de-aeration |
| QC | Rotational viscometer, DLS particle sizer |

## 3. Tape casting ([[tape-casting-mlcc]])
| Sub-step | Equipment |
|---|---|
| Carrier preparation | Release-coated PET film (bought-in) |
| Coating | Doctor-blade caster; slot-die / lip / micro-gravure / wire-bar coater (thin sheets) |
| Drying | Zoned hot-air drying tunnel |
| Winding, static control | Winder; antistatic measures, static meter |
| Sheet inspection | Wet area-weight gauge (X-ray/β) before the dryer, dry thickness gauge with flow feedback ([us6869482], [us6096370]); roughness, pinhole, tensile tests |

## 4. Internal-electrode printing ([[internal-electrode-printing]], [[ni-electrode-paste-formulation]])
| Sub-step | Equipment |
|---|---|
| Ni paste make-up | Vehicle dissolver; mixer; three-roll mill, ball mill or high-pressure homogenizer; ≤5 µm filter; vacuum de-air ([cn102254585], [wo2017018228]) |
| Pattern printing | Screen printer (SUS mesh) or gravure printer (engraved roll, doctor blade, back roll); inkjet (research) |
| Step-compensation print | Second print of a blank-pattern ceramic paste ([[step-height-compensation]]) |
| Registration | Multi-camera vision + X-Y-θ stage, target marks |
| Drying | Hot-air / IR belt dryer |

## 5–6. Stacking & lamination ([[stacking-and-lamination-mlcc]])
| Sub-step | Equipment |
|---|---|
| Sheet transfer stacking | Heated plate / heated roll transfer laminator, film peeler, pin or vision alignment |
| Cover sheets, step cover | Same laminator; high-viscosity cover slurry coater |
| Final press | Pre-lamination press; then uniaxial press (die cavity) or warm isostatic press (heated water vessel) after vacuum packing ([keko-st], [keko-tpr], [keko-ils], [us4749421]) |

## 7. Cutting & side margin ([[green-chip-cutting-and-side-margin]])
| Sub-step | Equipment |
|---|---|
| Cutting the green block | Rotary dicing saw; push-cut (guillotine) cutter; laser (named, unverified) |
| Cut-position check | Microscope / camera inspection of blank marks |
| Attached side margin (high-CV) | Side-margin sheet applicator with rubber/PDMS punching pad, chip rotation jig, adhesive-tape re-holding |

## 8–10. Thermal processing ([[binder-burnout-debinding]], [[sintering-profile-mlcc]], [[bme-sintering-atmosphere]], [[re-oxidation-anneal]])
| Sub-step | Equipment |
|---|---|
| Chip loading | Zirconia-surfaced setters stacked in tiers ([us6461156], [murata-ht-web]); loading machinery **(g)** |
| Binder burnout | Batch or belt debinding furnace with atmosphere control |
| Co-firing | Pusher (tunnel) furnace with N₂/H₂/H₂O, ZrO₂ O₂ sensor + MFC closed-loop PO₂ |
| Re-oxidation | Same furnace's re-ox zone or a separate anneal furnace |

## 11. Chamfering ([[barrel-chamfering-mlcc]])
| Sub-step | Equipment |
|---|---|
| Corner rounding | Rotary or vibratory barrel polisher with media (alumina/WC) + liquid |
| Separation, wash, dry | Meshed sieve ([us10957489]); water wash and dry ([us11978592]); centrifugal dryer (vendor page [rosler-dryers-pfi]) |

## 12–14. Termination & plating ([[termination-and-plating]])
| Sub-step | Equipment |
|---|---|
| Cu paste dip (both ends) | Carrier plate (metal + silicone rubber) loaded by vibration/vacuum and pin press; levelling-blade paste platen; dip head; blot plate ([us4381321], [us5248340], [us5551979], [us11602766]) |
| Dry | Dryer (85–120 °C) |
| Termination firing | Belt/batch furnace, N₂ + ppm-O₂ control |
| (Optional) conductive-resin layer | Dip + cure oven (150–200 °C) |
| Ni plating, Sn plating | Barrel electroplating line (Ni bath, Sn bath), rinse, dryer |
| Plating check | XRF thickness gauge, solder-pot test |

## 15–16. Test, sort, packaging ([[production-test-and-screening-mlcc]])
| Sub-step | Equipment |
|---|---|
| (Class II) de-aging bake for reference measurement | Oven (150 °C) |
| C/DF, IR, flash test + binning | Rotary test handler (e.g. Allegro XP class) with LCR meters and source-measure units |
| Visual inspection | Optical/AOI image-inspection system |
| High-rel screens | Burn-in ovens with current-monitored racks; C-SAM (acoustic microscope) |
| Taping & reeling | Taping machine; paper or embossed tape (EIA-481); reels |

## Line sequence in detail (2026-11-11 equipment survey)

Added from [[mlcc-process-equipment-research-notes]]. Each line gives the operations in order, as found in patents and equipment-maker sources. A slash marks an alternative route.

1. **Powder.** Hydrothermal route: Ti source prep (TiCl₄ neutralise, wash) → Ba(OH)₂ charge under N₂ → autoclave → (CO₂ Ba fixing) → wash/filter → dry → (heat treatment). Solid-state route: weigh → wet ball mill → spray dry → rotary kiln → batch furnace. Both routes then go through jet mill → dopant coating → classify/QC.
2. **Slurry.** Weigh → premix. Then one of two routes:
   - bead mill (passes) → filtered binder vehicle → basket mill → (high-pressure dispersion) → filter → vacuum de-air → storage/QC → feed;
   - two-stage ball mill.
3. **Tape casting.** Unwind → edge-position control and destatic → carrier cleaning → slurry feed (filter, flow control, flow/density meters) → die / doctor-blade coating on backup roll → wet area-weight gauge → zoned dryer, with exhaust to solvent recovery running in parallel → dry thickness gauge (feedback to flow) → defect camera → wind.
4. **Printing.** Paste: vehicle → premix → disperse → filter → de-air. Line: unwind/dancer → screen print (vacuum table, X-Y-θ camera) / gravure → **intermediate dry → step-compensation print → main dry** → inspection → EPC → destatic → wind. All three sources print the electrode first; one says the reverse order should work too ([us7661361]).
5. **Stacking.** Cut sheet to size (half-cut) → per layer: vision → vacuum peel → move/align → heat press (↻). Alternative per layer: transfer → film peel. Then covers → pre-lamination press → vacuum pack → WIP / uniaxial press → unpack.
6. **Cutting.** Fix block → trim edge → read marks and correct θ → press cut, pitch by pitch → turn 90° → second cut set (or blade dicing) → expand. For attached side margins: tumble → punch → thermo-compress → repeat for the other side. Then release from heat-foam tape.
7. **Firing.** Load setters → stack tiers → 1st burnout (box) → 2nd burnout (belt) or integrated in a long pusher → pusher / roller-hearth kiln → re-ox in the kiln / in a separate furnace → cool → unload/sieve.
8. **Chamfering.** Charge tank (chips + media + water/compound) → lid and mount → low-G pre-polish → high-G main polish. Rotary or vibratory barrels are the alternatives. Then discharge → separate media → wash → dry → cross-section and R/chipping check. **Usually done on green chips before firing**; see [[barrel-chamfering-mlcc]].
9. **Termination and plating.** Load carrier → film/dip/blot end 1 → dry → invert, push through → dip/blot end 2 → dry → push out → belt-furnace fire → (soft-termination resin) → barrel loading with steel balls + pre-treatment → Ni → Sn → rinse/dry → magnetic media separation → XRF/solderability.
10. **Test, sort and packing.** Feed → C/DF → IR charge/measure → flash → bins → appearance (4 cameras + thickness) → (high-rel: burn-in → 2nd sort) → taping: re-measure → pocket insert → pocket camera → cover-tape seal → seal camera/reel → peel test (sample) → label/pack.

## Gaps
- Production settings (press/WIP hold, 2nd-burnout temperature, belt speeds, dwell times) are still missing. The 2026-11-11 survey added equipment-maker specs and patent apparatus, not production data.
- Equipment for the **(g)** items should be confirmed with vendor or equipment-maker sources in a later ingest.
