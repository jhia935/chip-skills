---
title: "Aqueous Tape Casting of BaTiO₃ for Ultrathin MLCC + Nanopowder Casting Limits"
type: source
created: 2026-05-29
updated: 2026-05-29
sources:
  - aqueous-tape-casting-ultrathin-batio3-2025.md
tags:
  - paper
status: complete
importance: medium
---

# Aqueous Tape Casting of BaTiO₃ + Nanopowder Casting Limits

**Sources** (a small cluster of tape-casting process papers consulted together):
- "Fabrication of High Performance BaTiO₃ Films via Aqueous Tape Casting for ultrathin MLCC applications," *Ceramics International* (2025). [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0272884225040416)
- "Formulation and Rheology of Tape Casting Suspensions Based on BaTiO₃ Nanopowders," Springer (2015).
- "BaTiO₃ films for multilayer devices by tape casting," *OAJ Materials and Devices* (open access). [link](http://caip.co-ac.com/index.php/materialsanddevices/article/view/117)
- Review context: "Ceramic tape casting: a review … rheological behaviour and flow analysis," *Ceram. Int.* 2017.

## Summary

The processing basis for the [[dielectric-layer-thickness-floor]]. These papers establish (a) the powder/binder/solid-loading constraints of tape casting and (b) what is actually achievable in fired dielectric thickness, both in production and in the lab.

## Key quantitative points

- **Production powder**: BaTiO₃ mean particle size **180–300 nm** for castable aqueous/solvent slurries. A representative aqueous formulation: 180 nm BT, ammonium-polycarboxylate dispersant, polyacrylic-emulsion binder, dibutyl-phthalate plasticizer.
- **Solid loading**: quality tapes form at **~50–55 vol % solids**; binder content **~35–43 vol %**; plasticizer/binder ≈ 0.5. Powder volume fractions explored 0.05–0.30 in studies; standard cast-tape thickness 100–250 µm before thinning.
- **Production fired dielectric floor**: state-of-the-art **~400 nm**; routine thin-layer parts **< 2 µm**. Below ~1 µm "can only be produced if nanosized dielectric powders are applied and deposited by techniques more advanced than tape casting and screen printing."
- **Lab frontier**: with **20–25 nm nanoparticles + a special pre-cooling casting method**, tapes "less than 1 µm" were demonstrated — but this is a research result, not volume-manufacturable, and still not sub-0.3 µm.
- **The rheological wall**: nanosized powders have huge specific surface area → require suitable dispersant chemistry and high binder fraction → limit the achievable solid loading; nano-BT suspension rheology is the documented bottleneck for thinner tapes.

## The powder → binder → thickness coupling

The papers make the coupling explicit:
1. Thinner fired layer ⇒ finer grain (to keep ≥3 grains/layer, see [[dielectric-layer-thickness-floor]]).
2. Finer powder ⇒ higher surface area ⇒ more binder/dispersant needed ⇒ lower castable solid loading.
3. Lower solids ⇒ lower green density and more defects ⇒ a practical floor where the cast sheet can't be made reliably thinner.

This is why the dielectric thickness floor (~0.3–0.5 µm mainstream) is a *materials/process* limit, not a voltage or electrical-design limit.

## Implications for the simulator

Confirms the chip-sim's `D_FLOOR_FRONTIER = 0.25 µm` and the mainstream ~0.4–0.5 µm floor. Validates that the earlier unbounded `d = V/E_design` (which let low-voltage parts go to 0.15 µm) was unphysical.

## Concepts Discussed

- [[dielectric-layer-thickness-floor]] — the concept this sources
- [[batio3-powder-synthesis]] — where 180–300 nm production powder comes from
- [[green-density-vs-shrinkage]] — solid loading → green density
- [[mistler-twiname-tape-casting-textbook]] — tape-casting reference
- [[ni-electrode-paste-formulation]] — analogous paste/loading constraints
- [[green-tape-shrinkage-anisotropy]] — downstream of the cast tape

## References

_Ceramics International (2025, 2017), Springer (2015), OAJ Materials and Devices (open access)._
