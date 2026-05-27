---
title: "An et al. 2026 Adv. Mater. — Grain-Boundary Segregation for DC-Bias Stability"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - an-2026-grain-boundary-segregation-dc-bias.md
tags:
  - paper
status: complete
importance: high
---

# An et al. 2026 — Microstructure Optimization via Grain-Boundary Segregation to Enhance DC Bias Dielectric Performance of BaTiO₃ MLCCs

**Source**: An et al. (2026). **Microstructure Optimization via Grain-Boundary Segregation to Enhance DC Bias Dielectric Performance of BaTiO₃ Multilayer Ceramic Capacitors**. *Advanced Materials*.
DOI: [10.1002/adma.202507233](https://advanced.onlinelibrary.wiley.com/doi/10.1002/adma.202507233)

> [!note] Paywalled article
> Full text not retrieved (HTTP 402). Extraction from abstract + search-engine summary only.

## Summary

Recent (2026) *Advanced Materials* paper demonstrating that **deliberate grain-boundary segregation of selected dopants** establishes the optimal microstructure for DC-bias dielectric performance in [[batio3|BaTiO₃]] MLCCs. The headline finding: **under DC field > 4 V/µm, the maximum permittivity occurs at grain size 200–260 nm** — a tighter window than the previous "anywhere sub-300 nm is fine" rule of thumb.

## Key Points

- **Optimal grain size window**: **200–260 nm** at DC field > 4 V/µm.
- **Mechanism**: GB segregation of dopants pins domain walls AND maintains a paraelectric shell around each grain — both contributions to lower bias loss.
- **Stated design target**: future MLCCs with ~200 nm dielectric layer thickness AND ~200 nm grain size, "simultaneously satisfying high DC-bias capacitance, low dissipation loss over a wide frequency range, and exceptional temperature stability."

## Implications for the chip-sim simulator

1. **Recipe parameter narrowing**: when the recipe targets sub-300 nm grain, the simulator should bias toward **200–260 nm** specifically — outside that range, ε_r drops faster than the simple [[nano-grain-batio3-epsilon-r|nano-grain ε_r curve]] would predict at non-zero bias.
2. **Layer-vs-grain coupling**: the modern design target of [[layer-thickness-and-metal-ceramic-ratio|h_BT ≈ grain size]] means the dielectric is **essentially a single-grain-thick layer**. The bias response is dominated by individual grain behavior, not by an ensemble average. Tier 2 and 3 simulator paths should reflect this when h_BT < 500 nm.

## Entities Mentioned

- [[batio3]] — base material

## Concepts Discussed

- [[grain-growth-dopant-pinning]] — GB segregation is the mechanism
- [[core-shell-batio3]] — implied microstructure
- [[dc-bias-derating]] — central property
- [[nano-grain-batio3-epsilon-r]] — refines the sub-300 nm bias-stability sweet spot
- [[layer-thickness-and-metal-ceramic-ratio]] — h_BT → grain-size design target
- [[us-11222749-samsung-dy-nb-thin-layer]] — related SEMCO patent (Dy + Nb for sub-0.5 µm layers)

## References

_Original source: Advanced Materials. Paywalled; abstract + search snippet only consulted._
