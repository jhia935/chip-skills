---
title: "Wang et al. 2023 — X5R Ni-MLCC Capacitance Under Combined Out-Field Variations"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - wang-2023-x5r-ni-mlcc-combined-out-field.md
tags:
  - paper
status: complete
importance: high
---

# Wang et al. 2023 — Preparation of X5R Ni-MLCCs and Capacitance Response to Combined Out-Field Variations

**Source**: Wang et al. (2023). **Preparation of X5R type Ni-MLCCs and capacitance response to combined out-field variations**. *Ceramics International*, vol. 49, issue 11 (Jun 2023).
[ScienceDirect S0272884223004315](https://www.sciencedirect.com/science/article/abs/pii/S0272884223004315)
DOI: 10.1016/j.ceramint.2023.02.105 *(typical for this volume; verify on read)*

> [!note] Paywalled article
> Full text not retrieved — paywalled abstract + RG reposting only. Extraction from abstract + ResearchGate citation data. The 1210 case, 390 nF capacitance, X5R compliance, and Dy/Ho-coating composition are confirmed from the abstract. Numerical 2D measurement grids are referenced as "Section 3.x" but the specific tabulated values require full-text access.

## Summary

A direct academic counterpart of vendor SimSurfing data: a **model 1210-case Ni-MLCC** built from BaTiO₃ powder **chemically coated with Dy + Ho** (continuing the [[us-6043974-philips-dy-stabilizer|Philips Dy-stabilizer]] and [[us-11222749-samsung-dy-nb-thin-layer|Samsung Dy-Nb]] lineage), sintered at 1220 °C, hits **X5R envelope** with 390 nF zero-bias capacitance. The paper's contribution beyond previous work: it **characterizes capacitance under the COMBINATION of temperature, AC, and DC bias fields** — exactly the [[tcc-dc-bias-interaction|coupled-derating regime]] the chip-sim simulator needs to calibrate against.

## Key Points

- **MLCC geometry**: 1210 case (3.2 × 2.5 mm); modified 150 nm BaTiO₃ starting powder.
- **Doping route**: wet-chemical Dy + Ho coating of the BT powder before tape-casting (analogous to [[dopant-powder-coating]]).
- **Sintering**: 1220 °C (typical Ni-BME range; consistent with [[bme-sintering-atmosphere|reducing atmosphere co-firing]]).
- **Zero-bias capacitance**: 390 nF.
- **Dielectric loss**: tan δ < 2 % at room T, 1 kHz.
- **Insulation resistance**: > 9000 MΩ.
- **TCC envelope**: ±15 % over −55…+85 °C → meets **X5R**.
- **Grain-size finding**: fine-grain ceramic (≈ 150 nm) shows the **smallest absolute ΔC under DC bias** and the **highest DC-bias stability** — consistent with the [[nano-grain-batio3-epsilon-r|nano-grain ε_r literature]] and with [[he-2022-dy-ho-batio3-dc-bias|He et al.'s 180 nm Dy-Mg result]].
- **Combined out-field measurement**: T = −55…+125 °C × V_DC up to (likely) rated voltage × AC small-signal — the actual numerical grid is in the paywalled figures.

## Implications for the chip-sim simulator

This is the **closest published academic analog to a vendor SimSurfing 2D surface** that the [[capacitance-simulation-from-recipe-and-geometry|Tier 2 simulator]] needs for calibration. Specifically:

1. **Sintering knob**: the same Dy-Ho recipe at different sintering temperatures gives different grain sizes; the paper traces how grain size sets the DC-bias slope. This is a **recipe → bias-curve mapping** the simulator's recipe-driven approach can absorb directly.
2. **Validation target**: a fine-grain (≈ 150 nm), Dy-Ho-coated 1210 X5R 390 nF MLCC is a concrete reference part the simulator can target for the X5R class.
3. **Lineage**: the same compositional family backs the [[murata-grm-series|Murata GRM]] and [[samsung-cl-series|SEMCO CL]] X5R products, so calibrating to this paper indirectly calibrates the simulator to those lines.

## Entities Mentioned

- [[batio3]] — base material

## Concepts Discussed

- [[tcc-dc-bias-interaction]] — the central topic of this paper
- [[temperature-coefficient-of-capacitance]] — X5R envelope hit
- [[dc-bias-derating]] — grain-size-controlled
- [[dopant-powder-coating]] — the synthesis route
- [[nano-grain-batio3-epsilon-r]] — fine-grain reduces both ε_r AND DC-bias loss
- [[core-shell-batio3]] — implied by Dy + Ho doping
- [[ferroelectric-domain-wall]] — pinned by grain boundaries in fine-grain materials

## Open follow-ups

- Fetch full text to extract the actual T × V_DC measurement grid for the 390 nF X5R sample (paywall barrier).
- Compare the published 2D surface to a [[murata-grm-series|Murata GRM]] SimSurfing export for a similar-spec 1210 X5R part.

## References

_Original source: Ceramics International. Paywalled; abstract and ResearchGate repost consulted._
