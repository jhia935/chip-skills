---
title: DC Bias Derating (VCC)
type: concept
created: 2026-05-19
updated: 2026-05-19
status: complete
importance: high
sources:
  - vishay-x7r-cap-drift-dc-bias.md
  - psma-ceramic-capacitor-basics.md
  - murata-grm-series-tcc-data.md
  - epci-high-cv-mlcc-bias-aging.md
tags:
  - paper
---

# DC Bias Derating (VCC)

Applying a DC voltage to a Class II MLCC reduces its effective capacitance. This is the **single most important non-ideality** for the design simulator — at rated voltage on a high-cap part you can lose more than half the nameplate µF.

The proper independent variable is the **field** `E = V_DC / d`, not the voltage itself. Two parts with the same `V_DC` but different layer thickness see different fields.

## Mechanism
The ferroelectric [[batio3]] domains in a Class II dielectric carry a spontaneous polarization. AC measurement samples how easily those domains reorient — high `εr`. A DC field **pins** the domains aligned with itself; small-signal AC can no longer flip them. `εr` drops, and with it `C`.

The polarization vs field is a hysteresis loop ([[vishay-x7r-cap-drift-dc-bias]] Fig. 1). The slope of that loop is `εr`, which drops with increasing DC bias as the loop saturates.

## Typical Class II VCC curve
From [[vishay-x7r-cap-drift-dc-bias]] Fig. 2:

| E (V/µm) | ΔC (%) |
|---:|---:|
| 0 | 0 |
| 2 | −10 |
| 4 | −25 |
| 6 | −45 |
| 10 | −60 |
| 15 | −75 |
| 20 | −85 |

## Vendor variation
For the **same** nominal part (0805 X7R 10 µF 6.3 V), three competing vendors show capacitance change from **−35 % to −65 %** at rated voltage, and **−12 % to −32 %** at 3.3 V derated ([[epci-high-cv-mlcc-bias-aging]]). This is why a simulator must model VCC per **specific part**, not per dielectric class generically.

## Case-size effect
For a given capacitance value, a larger case lets you use thicker `d`, lowering `E` at the same `V_DC`. [[psma-ceramic-capacitor-basics]] shows a 1210 X7R 10 µF 6.3 V drops only ~10 % at 6.3 V while a 0805 X7R 10 µF 6.3 V drops ~60 %.

## Heuristic fit for the simulator
A sigmoid form fits empirical curves well:
$$
f_\text{VCC}(E) \;=\; \frac{1}{1 + (E/E_0)^p}
$$
- X7R: `E₀ ≈ 5 V/µm`, `p ≈ 1.3`
- Y5V: `E₀ ≈ 1.5 V/µm`, `p ≈ 1.0` (drops near −90 % at rated V — [[murata-grm-series-tcc-data]])
- C0G: `f_VCC ≈ 1` (paraelectric, no domain effect)

## Recipe-specific calibration from academic literature

Class-generic `(E₀, p)` underestimates the bias robustness of modern engineered formulations. See [[empirical-c-t-vdc-academic-measurements]] for the full table. Highlights:

| Recipe | E₀ (V/µm) | Source |
|---|---|---|
| X7R, Dy + Mg, 180 nm grain (bulk ceramic) | **7.0** | [[he-2022-dy-ho-batio3-dc-bias]] |
| X7S finished MLCC, core-shell + Ni-electrode optimized | **6.0** | [[hwang-2024-coreshell-electrode-dc-bias]] |
| X5R 1210, Dy + Ho coated, ~150 nm grain | **~6.5** | [[wang-2023-x5r-ni-mlcc-combined-out-field]] |
| BaTi₀.₉₆Ca₀.₀₄O₃ (PNR composition) | **~10** | [[he-2025-bsite-ca-batio3-pnr]] |

Bulk-ceramic measurements systematically **under-state** finished-MLCC bias loss because the MLCC's thinner dielectric concentrates field near the electrode interfaces (Hwang 2024: bulk −17 % vs MLCC −28 %, same composition at 4 kV/mm).

## Recovery
The VCC effect is **reversible**: removing the bias allows capacitance to recover, immediately for the "instant VCC" part and slowly (hours to days) for any [[dc-bias-aging]] component. Full recovery requires de-aging above [[curie-temperature]].

## Temperature dependence of f_V (the f_V vs T axis)

The bias-derating sigmoid parameters `(E_0, p)` are **mildly temperature-dependent** but `f_V(V_DC)` is approximately **T-independent** over the working range for typical X5R/X7R parts (the [[empirical-c-t-vdc-academic-measurements|EPCI 2024 empirical finding]] — normalized curves track tightly from −5 to +70 °C).

Where T-dependence enters non-trivially:

1. **[[field-induced-curie-shift|Curie peak shift under bias]]**: T_C moves up by ~130 mK per V/µm of DC field. For T close to (T_C − bias-shift), the bias loss is amplified beyond what `f_V(V_DC)` alone predicts. Documented in [[lim-cho-2010-batio3-mlcc-field-induced|Lim & Cho 2010]] for X7R MLCCs.
2. **Above T_C**: in the paraelectric phase, `f_V ≈ 1` (no domains to align). `α' → 0` per [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023]].
3. **Near T_C and below**: the [[tetragonality-c-a-ratio|c/a ratio]] approaches 1, which **enhances** bias-pulled dielectric response along the c-axis ([[yoon-kim-2020-batio3-tetragonality-dc-bias|Yoon 2020]]) — so `f_V` at fixed E actually **rises slightly** with T toward T_C. This is opposite the usual intuition that high T compounds bias loss.

So `f_V(V_DC, T)` is a mildly non-separable function with a complex T-dependence that depends on **where the part's T_C sits relative to the operating range**:

| Class | T_C range | f_V × T behavior |
|---|---|---|
| C0G (paraelectric) | N/A | `f_V ≈ 1` always |
| X7R/X5R, T_C ≫ T_op | 110–130 °C | Approximately T-independent in operating range; multiplicative model OK |
| X8R/X8L | 70–90 °C | T-dependent; multiplicative model OK with +1.3 K/(V/µm) T_C correction |
| Y5V | T_C in operating range | Strongly coupled; multiplicative model unreliable |

## Cross-references
- [[dc-bias-aging]] — long-term time-dependent capacitance drift under continuous DC bias
- [[aging-class-2]] — unbiased aging (separate phenomenon)
- [[eia-rs-198-dielectric-classes]]
- [[mlcc-capacitance-equation]]
- [[temperature-coefficient-of-capacitance]] — temperature side of the same problem
- [[tcc-dc-bias-interaction]] — how the two derating factors couple under combined T + V_DC operation

## References
- [[vishay-x7r-cap-drift-dc-bias]]
- [[psma-ceramic-capacitor-basics]]
- [[murata-grm-series-tcc-data]]
- passive-components.eu — "High CV MLCC DC BIAS and AGEING Capacitance Loss Explained"
