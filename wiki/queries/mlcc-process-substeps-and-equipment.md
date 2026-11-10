---
title: MLCC Process — Sub-steps and Equipment per Sub-step
type: query
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/10-powder-and-slurry.md
  - resources/manufacturing/20-tape-casting.md
  - resources/manufacturing/30-electrode-printing.md
  - resources/manufacturing/40-lamination-and-dicing.md
  - resources/manufacturing/60-termination-and-plating.md
  - resources/manufacturing/80-test-sort-and-packaging.md
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
| Classification, drying, powder QC | Sieve/classifier **(g)**; particle-size analyzer (DLS), XRD **(g)** |

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
| Sheet inspection | Thickness gauge **(g)**, roughness tester, pinhole inspection, tensile tester |

## 4. Internal-electrode printing ([[internal-electrode-printing]], [[ni-electrode-paste-formulation]])
| Sub-step | Equipment |
|---|---|
| Ni paste make-up | Mixer + three-roll mill **(g)**, filter |
| Pattern printing | Screen printer (SUS mesh) or gravure printer (engraved roll, doctor blade, back roll); inkjet (research) |
| Step-compensation print | Second print of a blank-pattern ceramic paste ([[step-height-compensation]]) |
| Registration | Multi-camera vision + X-Y-θ stage, target marks |
| Drying | Hot-air / IR belt dryer |

## 5–6. Stacking & lamination ([[stacking-and-lamination-mlcc]])
| Sub-step | Equipment |
|---|---|
| Sheet transfer stacking | Heated plate / heated roll transfer laminator, film peeler, pin or vision alignment |
| Cover sheets, step cover | Same laminator; high-viscosity cover slurry coater |
| Final press | Uniaxial press or warm isostatic press (WIP), with vacuum bagging **(g)** |

## 7. Cutting & side margin ([[green-chip-cutting-and-side-margin]])
| Sub-step | Equipment |
|---|---|
| Cutting the green block | Rotary dicing saw; push-cut (guillotine) cutter; laser (named, unverified) |
| Cut-position check | Microscope / camera inspection of blank marks |
| Attached side margin (high-CV) | Side-margin sheet applicator with rubber/PDMS punching pad, chip rotation jig, adhesive-tape re-holding |

## 8–10. Thermal processing ([[binder-burnout-debinding]], [[sintering-profile-mlcc]], [[bme-sintering-atmosphere]], [[re-oxidation-anneal]])
| Sub-step | Equipment |
|---|---|
| Chip loading | Ceramic setters/saggers **(g)** |
| Binder burnout | Batch or belt debinding furnace with atmosphere control |
| Co-firing | Pusher (tunnel) furnace with N₂/H₂/H₂O, ZrO₂ O₂ sensor + MFC closed-loop PO₂ |
| Re-oxidation | Same furnace's re-ox zone or a separate anneal furnace |

## 11. Chamfering ([[barrel-chamfering-mlcc]])
| Sub-step | Equipment |
|---|---|
| Corner rounding | Rotary or vibratory barrel polisher with media (alumina/WC) + liquid |
| Separation, wash, dry | Media separator, washer, dryer **(g)** |

## 12–14. Termination & plating ([[termination-and-plating]])
| Sub-step | Equipment |
|---|---|
| Cu paste dip (both ends) | Dip coater with paste plate, chip carrier plate **(g)**; blotting |
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

## Gaps
- No Tier-1 vendor equipment lists or capacities were found, apart from the ESI handler and the Murata sort-speed claim.
- Equipment for the **(g)** items should be confirmed with vendor or equipment-maker sources in a later ingest.
