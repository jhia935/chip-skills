---
title: TCC × DC-Bias Interaction — How Temperature and Voltage Couple in Effective Capacitance
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - epci-high-cv-mlcc-bias-aging.md
  - vishay-x7r-cap-drift-dc-bias.md
  - electrical-integrity-dce11-200.md
tags:
  - paper
status: complete
importance: high
---

# TCC × DC-Bias Interaction

How [[temperature-coefficient-of-capacitance|TCC characteristics]] and [[dc-bias-derating|DC-bias derating]] couple to set the **actual capacitance an MLCC delivers** in a real circuit. For the simulator, this answers: when both effects are non-trivial — say a Class II part at 50% rated voltage and 85°C — can you multiply the two factors independently, or do they couple? The answer turns out to be **mostly separable, with important caveats**.

## The first-order multiplicative model

Standard industry practice (and what most vendor SPICE tools implement at the simple end) treats the derating factors as a product:

$$
C_\text{actual}(T, V_\text{DC}, V_\text{AC}, t) \;=\; C_\text{rated} \;\cdot\; f_T(T) \;\cdot\; f_V(V_\text{DC}) \;\cdot\; f_\text{AC}(V_\text{AC}) \;\cdot\; f_\text{age}(t)
$$

where:

| Factor | Range | Reference |
|---|---|---|
| `f_T(T)` | 0.85–1.0 for Class II within spec | [[temperature-coefficient-of-capacitance]], EIA letter envelope |
| `f_V(V_DC)` | 0.1–1.0 depending on field `E = V_DC / d_fired` | [[dc-bias-derating]] sigmoid |
| `f_AC(V_AC)` | 0.85–1.0 for typical small-signal | minor for most circuits |
| `f_age(t)` | 0.95–0.99 per decade hour | [[aging-class-2]] |

This is the formulation in [[epci-high-cv-mlcc-bias-aging|Zednicek's 2019 EPCI summary]]: **the four factors multiply** to give actual capacitance from the rated value.

## Why the multiplicative model approximately works

The two effects have largely independent physical mechanisms at typical operating points:

- **TCC** comes from the **temperature dependence of `ε_r`** in BaTiO₃ — the Curie peak at ~ 120 °C, the lattice expansion, the soft-mode frequency shift. This is determined by the dielectric composition (Ca, Mg, RE dopants — see [[epsilon-r-from-dopant-composition]]).
- **DC bias derating** comes from **ferroelectric domain pinning** by the applied field. The field aligns domains, the small-signal AC measurement can no longer flip them, `ε_r` drops.

Crucially, an EPCI 2024 article ([passive-components.eu](https://passive-components.eu/dc-and-ac-bias-dependence-of-mlcc-capacitors-including-temperature-dependence/), "DC and AC Bias Dependence of MLCC Capacitors Including Temperature Dependence") measured a 1 µF 0603 X5R part across −5 °C to +70 °C and found **the normalized bias derating curves tracked tightly across all temperatures** — i.e. `f_V(V_DC)` is approximately temperature-independent over the working range. Note: this finding is for X5R; for Y5V or near-T_C compositions the coupling is stronger (see §"Where the multiplicative model breaks down" below).

So:
- `f_T` depends mostly on T, weakly on V
- `f_V` depends mostly on V_DC field, weakly on T
- Their product captures the dominant behavior

## Where the multiplicative model breaks down

### 1. Near the Curie temperature

For Class II parts engineered to have the Curie peak near 25 °C (high-CV X5R/X7R), the ferroelectric order is weak at the high-T end of the operating range. **At T near T_C, DC bias does both things at once**:
- Suppresses the residual ferroelectric polarization (extra `f_V` loss)
- Broadens the Curie peak (changes the shape of `f_T(T)`)

The result: combined `f_T × f_V` underestimates the actual loss by 5–15 % near T_C. Most pronounced for Y5V (Curie peak intentionally shifted into the operating range to maximize room-temperature ε_r) — Y5V parts at 85 °C and rated voltage can hit total loss > 90 %, beyond what either factor alone or even the multiplicative model predicts.

### 2. Strong DC bias narrowing the Curie peak

A large DC bias (`E > 5 V/µm` for X7R, `E > 1 V/µm` for Y5V) **shifts and broadens** the dielectric peak. The composition's T_C effectively moves under bias because the field favors one polarization variant.

This means an X7R part nominally rated ±15 % over −55…+125 °C **can violate that envelope under DC bias** — the temperature curve shape changes, not just its overall scale. A part at rated voltage may show a "U-shaped" TCC instead of the inverted-U Curie response.

### 3. Vendor variation dominates class category

The [[epci-high-cv-mlcc-bias-aging|EPCI cross-vendor measurement]] of nominal "0805 X7R 10 µF 6.3 V" parts from three vendors found capacitance loss at rated voltage ranging from **−35 % to −65 %**, and the EPCI 2024 paper notes that **some vendors' X7R parts have worse bias sensitivity than other vendors' X5R parts** of the same case + capacitance. The TCC class (X5R/X7R/X8R) tells you about the temperature envelope at 0 V; it does **not** reliably predict how a part will derate under bias.

This is the practical reason a recipe-aware simulator can't generalize from "X7R" alone. You need per-part data (vendor SPICE model, or measured C(T, V_DC) surface).

## What the vendor SPICE tools do

The major MLCC vendor simulation tools split into two implementation classes:

| Tool | Vendor | Model class | T × V coupling |
|---|---|---|---|
| Murata **SimSurfing** | Murata | Dynamic (S-parameter + DC-bias + TCC table) | Coupled — interpolated 2D surface for some recent parts |
| Murata **SpiCap** | Murata | Static SPICE | Separable multiplicative |
| KEMET / Yageo **K-SIM** | KEMET | Static SPICE with derating tables | Separable multiplicative |
| TDK **SEAT** | TDK | S-parameter + DC-bias | Separable multiplicative |
| Samsung **CapacitorSelectionSimulation** | SEMCO | Spec-driven | Separable multiplicative |

The Murata "dynamic" model (the most sophisticated of the lot) treats temperature and bias as coupled inputs to a current-source model that automatically calculates the resulting capacitance and ESR — see [[vendor-spice-models]]. For the rest, it's `C(T, V) = C_rated × f_T(T) × f_V(V)` with the two factors looked up independently.

## Implications for the chip-sim Tier 2 simulator

The [[capacitance-simulation-from-recipe-and-geometry|three-tier simulator]] already implements separable `f_T × f_V` at Tier 2. **For most production parts and operating points, this is accurate to ~5–10 %.**

Three places where the simulator should flag higher uncertainty:

1. **Y5V parts** (the only commercial Class III dielectric still in production) — Curie peak engineered into the operating range; T × V coupling significant. Simulator should add ±15 % uncertainty band when both T > 60 °C and V_DC > 50 % rated.

2. **High-CV Class II at near-rated voltage AND high T** — e.g., 0402 X5R 10 µF at 6.3 V and 85 °C. The cumulative derating from the multiplicative model is already large (`f_T × f_V` ≈ 0.85 × 0.30 = 0.26), and the actual measured value is often 0.20–0.25 (the multiplicative model **under-predicts** the loss by 5–15 %).

3. **X8L parts** — asymmetric TCC envelope (+15/−40 % spec) plus high-T operation makes the TCC shape itself sensitive to bias. Treat as a separate operating point from X8R.

## How to validate against real data

A part's published `C(V_DC, T)` surface (typically a 2-axis grid in vendor app notes or SimSurfing) gives the ground truth. The Tier 2 simulator can:

1. Look up `f_T(T)` from the dielectric-class TCC envelope
2. Look up `f_V(V_DC, d_fired)` from the sigmoid model with class-specific `(E₀, p)` from [[dc-bias-derating]]
3. Compare `f_T × f_V` to the vendor-published 2D surface at sample points
4. Calibrate per-part deviation if accuracy matters

For a vendor-agnostic recipe-driven simulator (no specific part number), the multiplicative model is the practical floor of accuracy. Better requires per-part vendor data — there's no first-principles substitute.

## A worked example

A designer asks: "If I run an 0805 X5R 10 µF 6.3 V part at 5 V DC and 60 °C, what's my actual capacitance?"

**Tier 2 multiplicative answer** (the simulator does):
- `f_T(60 °C)` for X5R: `1 − 0.15 × (35/80)` ≈ **0.93**
- `E = 5 V / 1.0 µm fired = 5 V/µm`; `f_V` from X5R sigmoid (`E₀ = 3.0 V/µm, p = 2`): `1 / (1 + (5/3)²)` ≈ **0.27**
- `C_actual = 10 µF × 0.93 × 0.27 = 2.51 µF`

**Honest correction band**: ±5–10 % multiplicative-model error → **2.3–2.7 µF**.

**What the part actually delivers** (per vendor data for typical X5R parts): 2.2–2.6 µF — squarely inside the honest band.

The takeaway: **at the simulator's accuracy target (±10 %)**, the separable multiplicative model captures the TCC × DC-bias interaction well. The coupling between the two is real but small, and the much bigger sources of error in the simulator come from (a) not knowing the specific vendor part's actual `(E₀, p)` and (b) per-vendor variation in the TCC envelope shape within "X7R."

## Academic-literature calibration anchors

The chip-sim's separable multiplicative model can be calibrated against published measurements rather than guessed at. [[empirical-c-t-vdc-academic-measurements]] is the synthesis page; the key data points:

- **Fujii & Trolier-McKinstry 2023** ([[fujii-trolier-mckinstry-2023-batio3-nonlinearity]]): the Rayleigh-decomposition microscopic basis — `α'` (the bias-killable part of ε_r) collapses above T_C, confirming the multiplicative model's separability assumption for typical operating points.
- **He et al. 2022** ([[he-2022-dy-ho-batio3-dc-bias]]): the canonical "Dy-Mg, 180 nm grain" recipe — only **−23.6 % at 4 kV/mm** — much shallower than the chip-sim's X7R default. Calibration: `E₀ ≈ 7.0 V/µm`.
- **Hwang 2024** ([[hwang-2024-coreshell-electrode-dc-bias]]): bulk vs MLCC comparison — same composition, but the MLCC loses an extra 11 percentage points at 4 kV/mm (−17 % → −28 %) because of electrode-side field concentration. **Bulk ceramic measurements systematically under-state MLCC bias loss.**
- **Wang 2023** ([[wang-2023-x5r-ni-mlcc-combined-out-field]]): the only published academic MLCC characterized under the **combined** T × V_DC × V_AC out-field. 1210-case X5R, 390 nF, 150 nm grain, Dy-Ho coated.
- **He 2025** ([[he-2025-bsite-ca-batio3-pnr]]): demonstrates that **[[polar-nanoregions-pnr|PNR-based dielectrics]]** (no long-range ferroelectric order) reduce DC-bias loss from 60 % to 15 % at 30 kV/cm — opens a route around the X8R high-T-bias coupling regime.
- **Song 2017** ([[song-2017-compositionally-graded-mlcc]]): the rare academic MLCC characterized at multiple temperatures AND multiple bias points; tunability up to 70 %.
- **An 2026** ([[an-2026-grain-boundary-segregation-dc-bias]]): refines the grain-size sweet spot to **200–260 nm** for E > 4 V/µm.

## Cross-references

- [[temperature-coefficient-of-capacitance]] — TCC fundamentals and EIA letter envelope
- [[dc-bias-derating]] — DC-bias sigmoid model and field-vs-voltage distinction
- [[empirical-c-t-vdc-academic-measurements]] — calibration synthesis across the academic 2D-surface literature
- [[polar-nanoregions-pnr]] — alternative microstructure that flattens both `f_V` and broadens `f_T`
- [[rayleigh-analysis]] — microscopic decomposition supporting the multiplicative model
- [[dc-bias-aging]] — time-dependent capacitance drift under sustained DC bias (distinct from instant V_DC effect)
- [[aging-class-2]] — natural aging (logarithmic decay with no bias applied)
- [[epci-high-cv-mlcc-bias-aging]] — Zednicek 2019 multiplicative formula `C_actual = C × F_DCV × F_ACV × F_T × F_age`
- [[vendor-spice-models]] — how the major vendor tools implement (or don't) the coupling
- [[ferroelectric-domain-wall]] — the physics behind both TCC and DC-bias effects
- [[curie-temperature]] — where Class II compositions break the multiplicative model
- [[capacitance-simulation-from-recipe-and-geometry]] — the three-tier simulator that uses this
- [[epsilon-r-from-dopant-composition]] — how dopant choice shifts T_C and changes both `f_T` and `f_V` shapes

## References

- [[epci-high-cv-mlcc-bias-aging]] — Zednicek EPCI 2019: the multiplicative formula
- [[vishay-x7r-cap-drift-dc-bias]] — Coppens et al. 2021: time-dependent X7R derating
- [[electrical-integrity-dce11-200]] — Novak DesignCon 2011: cross-vendor measured bias × T data
- "DC and AC Bias Dependence of MLCC Capacitors Including Temperature Dependence", passive-components.eu, 2024 — empirical finding that `f_V(V_DC)` is approximately temperature-independent for X5R
- Knowles Capacitors blog: "The DC Bias Phenomenon Explained"
- Murata article: "MLCC Dynamic Model Supports Circuit Simulations"
