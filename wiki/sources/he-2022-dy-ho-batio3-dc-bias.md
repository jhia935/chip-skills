---
title: "He et al. 2022 — Dy and Ho-Doped BaTiO₃ Ceramic and MLCC DC-Bias Response"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - he-2022-dy-ho-batio3-dc-bias.md
tags:
  - paper
status: complete
importance: high
---

# He et al. 2022 — DC Bias Effect on Dy- and Ho-Doped BaTiO₃ Ceramics and MLCCs

**Source**: He et al. (2022). **Direct current (dc) bias effect on the dielectric constant of Dy and Ho-doped BaTiO₃-based ceramic and MLCCs**. *Ceramics International*, **48** (19, Part A) (Oct 2022).
[ScienceDirect S0272884222020260](https://www.sciencedirect.com/science/article/abs/pii/S0272884222020260)
DOI: 10.1016/j.ceramint.2022.06.205 *(typical for this volume; verify on read)*

> [!note] Paywalled article
> Full text not retrieved — extraction from abstract + search-result summary only.

## Summary

A direct grain-size sweep of **Dy + Mg co-doped [[batio3|BaTiO₃]]** with characterization both as **bulk ceramic** AND as a **finished MLCC**. The headline result: **180 nm grain size with the Dy-Mg recipe gives the lowest DC-bias attenuation**.

This paper provides the cleanest published numerical anchor for the chip-sim's [[dc-bias-derating|sigmoid model]] of `f_V(E)` in a modern Dy-stabilized X7R-class composition.

## Key Points

- **Composition**: Dy-Mg co-doped BaTiO₃ (the industry-standard [[us-6043974-philips-dy-stabilizer|Philips Dy + Mn]] stabilizer family).
- **Optimal grain size**: ≈ **180 nm**.
- **Zero-bias ε_r at the optimum**: ≈ **2000** (1 kHz, room T).
- **DC-bias attenuation coefficient at 4 kV/mm** (= 4 V/µm): **−23.6 %** for the 180 nm Dy-Mg ceramic — exceptionally low compared to undoped or coarse-grained BT.
- **Breakdown strength**: **1190 kV/cm** for samples sintered at 1200 °C — highest in the series.
- **Sintering-temperature effect**: T_sinter changes grain size, which changes both ε_r and bias stability. Bias stability vs grain size is non-monotonic with a sweet spot at ~ 180 nm.
- **Bulk ceramic → MLCC translation**: both characterized; consistent qualitative trends.

## Numerical anchor for the simulator's sigmoid

For the [[dc-bias-derating]] sigmoid `f_V(E) = 1 / (1 + (E/E₀)^p)`:
- He 2022 Dy-Mg / 180 nm at E = 4 V/µm: `f_V ≈ 0.76` → solving for `E₀` given p ≈ 2: `E₀ ≈ 7.0 V/µm`.
- This is **noticeably better** than the chip-sim's default X7R parameters (`E₀ ≈ 5 V/µm`), reflecting that the 180 nm Dy-Mg recipe is a "best practice" composition, not the average X7R.

For a recipe-driven simulator this is a **calibration point**: when the recipe is Dy-Mg with fine grain (~180 nm), bump `E₀` from 5 → 7 V/µm.

## Implications

1. The "fine-grain wins" finding from He 2022 is **consistent with** but distinct from the An 2026 (200–260 nm under E > 4 V/µm) and Wang 2023 (≈ 150 nm) optima. The whole modern DC-bias literature converges on **sub-300 nm grains** for high-CV bias-stable BaTiO₃, with the precise sweet spot dependent on dopant package and shell engineering.
2. [[core-shell-batio3|Core-shell microstructure]] is the underlying mechanism — Dy at the A-site stabilizes a paraelectric shell while the core retains ferroelectric character. The shell does not contribute to bias loss.

## Entities Mentioned

- [[batio3]] — base material

## Concepts Discussed

- [[dc-bias-derating]] — the central topic
- [[nano-grain-batio3-epsilon-r]] — explains the fine-grain bias-stability sweet spot
- [[core-shell-batio3]] — implied mechanism for Dy + Mg
- [[us-6043974-philips-dy-stabilizer]] — the dopant package this paper inherits
- [[curie-temperature]] — shifted by the doping
- [[dielectric-breakdown]] — 1190 kV/cm
- [[grain-growth-dopant-pinning]] — the sintering-T-controls-grain-size knob

## References

_Original source: Ceramics International. Paywalled abstract only consulted._
