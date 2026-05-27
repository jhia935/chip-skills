---
title: Empirical C(T, V_DC) Surfaces from Academic MLCC Literature
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - song-2017-compositionally-graded-mlcc.md
  - fujii-trolier-mckinstry-2023-batio3-nonlinearity.md
  - wang-2023-x5r-ni-mlcc-combined-out-field.md
  - he-2022-dy-ho-batio3-dc-bias.md
  - he-2025-bsite-ca-batio3-pnr.md
  - an-2026-grain-boundary-segregation-dc-bias.md
  - hwang-2024-coreshell-electrode-dc-bias.md
status: complete
importance: high
---

# Empirical C(T, V_DC) Surfaces from Academic MLCC Literature

Synthesis of **published academic measurements** that capture MLCC capacitance jointly as a function of **temperature** AND **DC bias field** — i.e., the empirical 2D surfaces the chip-sim's [[tcc-dc-bias-interaction|TCC × DC-bias multiplicative model]] is calibrated against. Counterpart to vendor SimSurfing-style data tables, but with the advantage that the academic papers disclose **composition, grain size, and processing** so the model can be calibrated against material recipe rather than just part number.

## What "2D characterization" means in the academic literature

Very few MLCC papers publish a full N×M grid of `ε_r(T_i, E_j)`. The common patterns are:

1. **Two 1D sweeps with one parameter varied**: e.g., `ε_r(T)` at several DC bias levels, plus `ε_r(E)` at several temperatures. Reading the two figures together approximates a 2D map.
2. **Single 1D bias sweep at room T**: by far the most common; useless for TCC × bias coupling.
3. **Rayleigh decomposition** across T: gives `ε_init(T)` and `α'(T)` — a microscopic 2D characterization, equivalent to two parameter surfaces.

| Paper | Style | Composition | T range | E_DC range | Notes |
|---|---|---|---|---|---|
| [[song-2017-compositionally-graded-mlcc]] | Two 1D sweeps | Graded BTS-BCN | −55…+125 °C | 0–50 kV/cm | Tunable-device design; 70 % tunability at room T |
| [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] | Rayleigh, two surfaces | Pure + formulated BaTiO₃ | −180…+150 °C | small AC; sub-coercive | Rayleigh α'(T), no DC bias sweep |
| [[wang-2023-x5r-ni-mlcc-combined-out-field]] | Combined sweep | Dy + Ho-coated 150 nm BT (X5R) | −55…+125 °C | up to rated | 1210 case, 390 nF; paywalled |
| [[he-2022-dy-ho-batio3-dc-bias]] | 1D bias + grain-size sweep | Dy + Mg, 180 nm grain | room T | up to 4 kV/mm | ε_r 2000, −23.6 % at 4 kV/mm |
| [[hwang-2024-coreshell-electrode-dc-bias]] | 1D bias + comp sweep | Core-shell + Ni-electrode | room T | up to 4 kV/mm | MLCC: ε_r 2300, −28 % at 4 kV/mm; X7S |
| [[an-2026-grain-boundary-segregation-dc-bias]] | Grain-size optimum | GB-segregation engineered | room T | E > 4 V/µm | Optimal grain 200–260 nm |
| [[he-2025-bsite-ca-batio3-pnr]] | 1D bias + composition sweep | BaTi₀.₉₆Ca₀.₀₄O₃ (PNR) | −55…+200 °C | up to 30 kV/cm | α dropped 60 % → 15 % |

## Cross-paper convergence: what these measurements agree on

1. **Grain-size sweet spot for DC-bias stability**: ~150–260 nm with appropriate dopant package. Below ~100 nm the [[nano-grain-batio3-epsilon-r|nano-grain ε_r collapse]] takes over; above ~500 nm the bias loss rises sharply.
2. **Dy at the A-site is the workhorse dopant** for DC-bias stability across two decades of literature (since [[us-6043974-philips-dy-stabilizer|Philips 2000]] up to [[wang-2023-x5r-ni-mlcc-combined-out-field|Wang 2023]]).
3. **Bias loss at 4 kV/mm (= 4 V/µm)** for well-engineered modern X7R/X7S formulations: **15–30 %** in bulk ceramic; **25–40 %** in finished MLCC (extra loss from electrode-induced field concentration and shell-region thinning). Below the simulator's current X7R default (`E₀ = 5 V/µm` → ~50 % at 4 V/µm).
4. **Curie peak suppression mechanisms split into two camps**:
   - **Core-shell** ([[core-shell-batio3]]): paraelectric shell around ferroelectric core. Hwang 2024, He 2022.
   - **Polar nanoregions** ([[polar-nanoregions-pnr]]): no long-range order, only short-range correlations. He 2025.
   - These can be combined in principle but no published MLCC does both at high CV yet.
5. **Above T_C, α' → 0** (Fujii 2023): the dielectric becomes nearly bias-independent. This is the **microscopic basis** for the chip-sim's separable multiplicative model `f_T × f_V`.

## How to use this for chip-sim Tier 2 calibration

The chip-sim simulator's [[dc-bias-derating]] sigmoid `f_V(E) = 1 / (1 + (E/E₀)^p)` has class-default parameters. Academic measurements let us **upgrade those defaults from class-typical to recipe-specific**:

| Recipe class | E₀ (V/µm) | p | Source |
|---|---|---|---|
| X5R generic (default) | 3.0 | 2 | chip-sim default |
| X7R generic (default) | 5.0 | 1.3 | chip-sim default |
| **X7R, Dy+Mg, 180 nm grain** | **7.0** | **2** | [[he-2022-dy-ho-batio3-dc-bias]] |
| **X7S, core-shell-engineered MLCC** | **6.0** | **2** | [[hwang-2024-coreshell-electrode-dc-bias]] |
| **X5R, Dy+Ho coated, 150 nm grain, 1210** | **~6.5** | **2** | [[wang-2023-x5r-ni-mlcc-combined-out-field]] (estimate from abstract) |
| **Relaxor-PNR (4 mol% Ca-at-B BT)** | **~10** | **1.5** | [[he-2025-bsite-ca-batio3-pnr]] |
| **Graded BTS-BCN, tunable** | **0.7** | **1.0** | [[song-2017-compositionally-graded-mlcc]] (high tunability target — opposite of MLCC) |

The simulator's recipe parser can dispatch to these calibrations when the input recipe matches.

## Gap: no public 2D surface for a commercial reference part

> [!info] Open gap
> None of the academic papers above publish a clean `ε_r(T, V_DC)` grid for a **commercial vendor part** (e.g., a Murata GRM188R71E105KA). The closest is [[wang-2023-x5r-ni-mlcc-combined-out-field|Wang 2023]] for a lab-built X5R analog. For a clean reference-part 2D surface, the only public source remains **vendor SimSurfing exports** — see [[vendor-spice-models]]. The chip-sim project should consider an "ingest vendor SimSurfing → calibration JSON" pass.

## Cross-references

- [[tcc-dc-bias-interaction]] — the model these measurements calibrate
- [[dc-bias-derating]] — `f_V` parameter targets above
- [[temperature-coefficient-of-capacitance]] — `f_T` is well-published for class envelopes
- [[capacitance-simulation-from-recipe-and-geometry]] — the three-tier simulator that consumes these calibrations
- [[core-shell-batio3]] — central design lever in modern compositions
- [[polar-nanoregions-pnr]] — emerging alternative microstructure
- [[nano-grain-batio3-epsilon-r]] — grain-size scaling
- [[vendor-spice-models]] — the vendor-data path

## References

- [[song-2017-compositionally-graded-mlcc]]
- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]]
- [[wang-2023-x5r-ni-mlcc-combined-out-field]]
- [[he-2022-dy-ho-batio3-dc-bias]]
- [[hwang-2024-coreshell-electrode-dc-bias]]
- [[an-2026-grain-boundary-segregation-dc-bias]]
- [[he-2025-bsite-ca-batio3-pnr]]
