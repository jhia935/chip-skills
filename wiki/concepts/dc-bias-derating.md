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

## Recovery
The VCC effect is **reversible**: removing the bias allows capacitance to recover, immediately for the "instant VCC" part and slowly (hours to days) for any [[dc-bias-aging]] component. Full recovery requires de-aging above [[curie-temperature]].

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
