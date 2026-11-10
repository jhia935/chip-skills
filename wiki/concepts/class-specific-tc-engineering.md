---
title: Class-Specific T_C Engineering — Why Each MLCC Dielectric Class Has Its Own Curie Temperature
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - deluca-2018-biybo3-batio3-doping.md
  - yabuta-2017-bi-mn-batio3-tetragonality.md
  - x9r-batio3-bimg-nanbo3-2022.md
  - cazro3-x8r-batio3-2015.md
  - liu-2019-sm-mn-codoped-batio3-permittivity.md
  - epsilon-r-from-dopant-composition.md
tags:
  - paper
status: complete
importance: high
---

# Class-Specific T_C Engineering

Why does **[[y5v-z5u-class-iii-dielectric|Y5V]]** have its [[curie-temperature|Curie peak]] near room temperature, **[[x7r-dielectric|X7R]]** at ~125 °C, **[[x8r-x8l-x9r-high-temperature-dielectrics|X8R]]** at ~150 °C, and **[[c0g-npo-dielectric|C0G]]** not in the operating range at all? Each class corresponds to a **deliberate compositional engineering** of the underlying [[batio3|BaTiO₃]] dielectric — with the engineering goal of placing T_C **exactly where the EIA TCC envelope requires it**.

This page synthesizes the academic literature on how dopant chemistry sets T_C across the major dielectric classes.

## Why T_C placement matters

The peak of `ε_r(T)` is at T_C. For useful high-CV operation, the **EIA-letter envelope** requires `ε_r` to stay within a tolerance band across the operating range. The two ways to satisfy this are:

1. **Put T_C OUTSIDE the operating range** and rely on the **shoulder** of the Curie peak:
   - C0G: paraelectric throughout — no T_C in range, intrinsically flat
   - X7R / X5R: T_C ~120-130 °C — operating range is on the **rising shoulder** below T_C
   - X8R / X9R: T_C ~150-200 °C — same approach, just shifted up

2. **Put T_C INSIDE the operating range** and rely on a **broadened peak**:
   - Y5V: T_C near room T (≈ 25 °C) to maximize zero-bias ε_r at use temperature; peak broadened to meet ±82/+22 % envelope
   - Compositionally graded MLCCs ([[song-2017-compositionally-graded-mlcc|Song 2017]]): stack of compositions with staggered T_C to flatten the effective `ε_r(T)`

Each EIA class is **one of these two strategies** with a particular T_C placement.

## Two design knobs: peak-shifter + peak-broadener

Academic literature splits MLCC dopants into two functional categories:

| Knob | What it does | Common dopants |
|---|---|---|
| **Peak-shifter** | Moves T_C up or down without dramatically changing peak shape | Sr²⁺, Ca²⁺, Sn⁴⁺, Zr⁴⁺, Pb²⁺, Bi³⁺, La³⁺ |
| **Peak-broadener** | Flattens / smears the peak (`d²ε/dT²` smaller) | Core-shell architecture, RE (Y/Dy/Ho), PNR-inducer (NaNbO₃, KNN), Mg/Mn |

X-class engineering is **always a combination** of both:
- X7R = BaTiO₃ + light shifter to keep T_C ~125 °C + core-shell + RE + Mg + Mn for broadening
- Y5V = BaTiO₃ + heavy down-shifter (Zr, Sr) to put T_C ~25 °C + relaxor/PNR broadening
- X8R = BaTiO₃ + up-shifter (Bi-based or core-shell-stress) + RE + Mg + Mn

## Quantitative dopant slopes (T_C shift)

Consolidated from the wiki's source corpus and the broader literature:

### A-site substitution (replacing Ba²⁺)

| Dopant | Direction | Slope dT_C/dx | Mechanism | Reference |
|---|---|---|---|---|
| Sr²⁺ (r = 1.44 Å vs Ba 1.61 Å) | ↓ | ~ **−3 °C/mol%** (linear) | Smaller ion → smaller unit cell → less tetragonal distortion | BST canonical literature |
| Ca²⁺ (r = 1.34 Å) | ≈ neutral on T_C; ↓ c/a | "Slight" | Off-centering, cell-volume effect | [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978]], multiple |
| Pb²⁺ (r = 1.49 Å) | ↑↑ | ~ **+3-4 °C/mol%** | PbTiO₃ has T_C = 490 °C; lone-pair stabilizes tetragonal | Legacy PMN-PT / X7R-Pb |
| Bi³⁺ (with charge-balance dopant) | ↑ | **+10 K at 0.005 mol% BiYbO₃** (saturating) | 6s² lone-pair drives local strain | [[deluca-2018-biybo3-batio3-doping|Deluca 2018]] |
| La³⁺ (donor) | ↓ slight | Small, varies with compensation | A-site donor with B-site V_Ti | [[epsilon-r-from-dopant-composition]] |

### B-site substitution (replacing Ti⁴⁺)

| Dopant | Direction | Slope dT_C/dx | Mechanism | Reference |
|---|---|---|---|---|
| Zr⁴⁺ (r = 0.72 Å vs Ti 0.605 Å) | ↓ | **−4.1 °C/mol%** (linear) | Larger ion suppresses Ti off-centering | BZT canonical literature |
| Sn⁴⁺ (r = 0.69 Å) | ↓ | Similar magnitude to Zr | Same mechanism as Zr | Ba(Sn,Ti)O₃ literature |
| Hf⁴⁺ (r = 0.71 Å) | ↓ | Similar to Zr | Same | — |
| Ce⁴⁺ (r = 0.87 Å) | ↓↓ strong | Stronger than Zr | Larger ionic radius | — |
| Nb⁵⁺ (donor) | ↓ small | Charge-compensation drives V_Ba | [[epsilon-r-from-dopant-composition]] |

### Multi-cation peak-shifters

| Component | Role | Reference |
|---|---|---|
| BiYbO₃ | A-site Bi³⁺ + B-site Yb³⁺ at 0.005-0.02 mol% | [[deluca-2018-biybo3-batio3-doping|Deluca 2018]]: +10 K at 0.005 mol% |
| BiMg₁/₂Ti₁/₂O₃ (BMT) | A-site Bi³⁺ + B-site Mg½Ti½ | [[x9r-batio3-bimg-nanbo3-2022|BT-BMT-NN]] X9R |
| BiScO₃ | A-site Bi³⁺ + B-site Sc³⁺ | BiScO₃-BT-KNbO₃ X8R |
| NaNbO₃ (NN) | A-site Na⁺ + B-site Nb⁵⁺; PNR inducer | [[x9r-batio3-bimg-nanbo3-2022]] |
| KNbO₃ | A-site K⁺ + B-site Nb⁵⁺; peak-broadener | KNN-BT lead-free |
| CaZrO₃ | A-site Ca + B-site Zr in core-shell stress mode | [[cazro3-x8r-batio3-2015]] |
| Bi₀.₅Na₀.₅TiO₃ (NBT) | Bi+Na at A-site; relaxor base | NBT-based lead-free X8R/X9R |

## Three orthogonal mechanisms for T_C up-shift

For X8R/X9R targeting T_C > 125 °C without using Pb:

1. **Lone-pair-driven local strain**: trace Bi³⁺ ([[deluca-2018-biybo3-batio3-doping|Deluca 2018]]'s BiYbO₃; BMT, BiScO₃). Highest leverage — 10 K at 0.005 mol%. Sintering challenge: Bi volatility.
2. **Internal-stress core-shell**: CaZrO₃ diffusion creating tensile-strained core ([[cazro3-x8r-batio3-2015|Y2-O3 / CaZrO₃ X8R]]). Chemical analog of the electric-field [[field-induced-curie-shift|Curie shift]] (Dul'kin & Roth's pressure-field equivalence: 23.8 bar·cm/kV).
3. **Acceptor/donor compensation**: Bi + Mn co-doping ([[yabuta-2017-bi-mn-batio3-tetragonality|Yabuta 2017]]). Modest T_C shift; primarily increases c/a and slows aging.

Modern post-2010 X8R formulations **combine at least two** of these.

## Class-by-class compositional summary

| Class | T_C target | Peak shifter | Broadener | Example composition |
|---|---|---|---|---|
| [[c0g-npo-dielectric\|C0G / NP0]] | Outside operating range (paraelectric) | N/A | N/A | CaZrO₃, Ba(Nd,Ti)O₃, [[us-7172985-kemet-non-reducible-dielectric\|Ca-Sr-Zr titanate]] |
| [[x5r-dielectric\|X5R]] | ~ 120 °C | Light Sr or none | Standard core-shell + RE + Mg + Mn | BT + Dy + Ho + Mg + Mn ([[wang-2023-x5r-ni-mlcc-combined-out-field\|Wang 2023]]) |
| [[x7r-dielectric\|X7R]] | ~ 125 °C | Trace Bi-based or none | Core-shell + RE + Mg + Mn | BT + Y/Dy/Ho + Mg + Mn ([[he-2022-dy-ho-batio3-dc-bias\|He 2022]]) |
| X7S (broader envelope) | ~ 125 °C | None | More aggressive core-shell | [[hwang-2024-coreshell-electrode-dc-bias\|Hwang 2024]] |
| [[x8r-x8l-x9r-high-temperature-dielectrics\|X8R]] (150 °C) | ~ 140 °C | Bi³⁺ lone-pair OR CaZrO₃ stress | Core-shell + RE | BT + BMT (BMT-NN), BT + CaZrO₃ + Y₂O₃ |
| X8L (150 °C asymm) | ~ 140 °C | Same as X8R | PNR inducer (NaNbO₃, KNbO₃) | BT + BMT + NN |
| **X9R (200 °C)** | ~ 180 °C | Multiple Bi-based shifters | NaNbO₃ + relaxor | `0.5BT-0.25BMT-0.25NN` ([[x9r-batio3-bimg-nanbo3-2022\|BT-BMT-NN]]) |
| [[y5v-z5u-class-iii-dielectric\|Y5V]] | ~ 25 °C (in operating range) | Heavy Zr⁴⁺ or Sr²⁺ | Relaxor/PNR via random doping | Ba(Ti,Zr)O₃, Ba₀.₉Sr₀.₁(Ti,Zr)O₃ |

## What chip-sim's recipe-to-T_C map should look like

The simulator's recipe input includes dopant identities and mol%. The T_C output should be:

$$
T_C = T_{C,0} + \sum_i \left(\frac{dT_C}{dx_i}\right) \cdot x_i + \text{(nonlinear cross-terms)}
$$

For first-order Tier 2 accuracy, the linear-sum form using the slope table above is sufficient. Specific calibration values:

| Dopant | dT_C/dx (°C / mol%) |
|---|---|
| Sr²⁺ → Ba | −3.0 |
| Zr⁴⁺ → Ti | **−4.1** (canonical) |
| Sn⁴⁺ → Ti | ~ −4.0 |
| Hf⁴⁺ → Ti | ~ −3.5 |
| Ca²⁺ → Ba (low %) | ~ −0.5 (small) |
| Pb²⁺ → Ba | +3 to +4 |
| BiYbO₃ trace | +2000 (effective at 0.005 mol%) |
| Bi/Mn co-doped | +1 (modest) |
| RE (Y, Dy, Ho, Mg/Mn) at typical 0.5-2 mol% | < |±2| K total |
| CaZrO₃ via core-shell stress | +3 to +6 K (process-dependent) |

The **trace Bi-based dopants have anomalous leverage** (~ 1000× higher slope than the others) and saturate above ~0.01 mol% — must be handled with a separate non-linear model, not the linear sum.

## Open gaps for the chip-sim simulator

1. **No machine-readable dopant-to-T_C database** exists publicly. Each entry above came from a different paper with non-uniform measurement protocols. A simulator should treat the dopant slopes as **uncertain to ~30 %** unless calibrated against a vendor part with known recipe.
2. **Cross-terms** (e.g., simultaneous Zr + Sr substitution) are NOT necessarily additive — the BCZT (`Ba₁₋ₓCaₓTi₁₋ᵧZrᵧO₃`) literature shows the joint effect deviates from the linear sum near the morphotropic phase boundary.
3. **Sintering profile dependence**: the same nominal composition with different sintering atmosphere/temperature can show different T_C because dopant site-occupancy (A vs B) shifts (see [[dopant-site-occupancy-batio3]]). The simulator should treat T_C as `f(composition, sintering)`, not `f(composition)` alone.

## Cross-references

- [[curie-temperature]] — what's being engineered
- [[temperature-coefficient-of-capacitance]] — the engineered observable (TCC envelope)
- [[eia-rs-198-dielectric-classes]] — letter-code definitions of the envelopes
- [[c0g-npo-dielectric]], [[x5r-dielectric]], [[x7r-dielectric]], [[x8r-x8l-x9r-high-temperature-dielectrics]], [[y5v-z5u-class-iii-dielectric]] — class pages
- [[batio3]] — host
- [[epsilon-r-from-dopant-composition]] — sibling synthesis on ε_r at peak
- [[dopant-site-occupancy-batio3]] — A vs B site partitioning
- [[core-shell-batio3]] — broadening mechanism
- [[polar-nanoregions-pnr]] — alternative broadening
- [[relaxor-ferroelectric]] — Y5V, X9R route
- [[field-induced-curie-shift]] — pressure-field-equivalent mechanism
- [[tetragonality-c-a-ratio]] — structural parameter that scales with T_C distance
- [[bi-lone-pair-doping]] — central mechanism for Bi-shifters

## References

- [[deluca-2018-biybo3-batio3-doping]] — trace Bi-based T_C up-shift
- [[yabuta-2017-bi-mn-batio3-tetragonality]] — Bi/Mn co-doping
- [[x9r-batio3-bimg-nanbo3-2022]] — BT-BMT-NN X9R formulation
- [[cazro3-x8r-batio3-2015]] — internal-stress X8R mechanism
- [[liu-2019-sm-mn-codoped-batio3-permittivity]] — Sm slope for X8R candidate
- [[epsilon-r-from-dopant-composition]] — sibling ε_r-engineering synthesis
- [[us-4115493-murata-sakabe-1978-bme-foundational]] — Ca-doped BT foundation
- [[song-2017-compositionally-graded-mlcc]] — graded-composition broadening
