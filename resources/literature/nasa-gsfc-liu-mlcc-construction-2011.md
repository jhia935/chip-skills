# NASA GSFC — Liu & Sampson, MLCC Construction/DPA Database (raw extract)

Raw, verbatim extraction of the construction-analysis tables. Source of truth for the
synthesized wiki page `wiki/sources/nasa-gsfc-liu-construction-database-2011.md`.

MEASUREMENT STATE: ALL dimensions below are FIRED (after sintering) — measured by
destructive physical analysis (cross-section) of finished parts. NOT green/pre-sinter.
Green dimensions are larger: in-plane green = fired/(1−s_xy) (chip-level s ≈ 12%), more in z.

## Primary source
Liu, D. (Donhang) & Sampson, M.J., "Reliability Evaluation of Base-Metal-Electrode
Multilayer Ceramic Capacitors for Potential Space Applications," CARTS USA 2011, NASA
GSFC Code 562 Parts Analysis Laboratory.
URL: https://nepp.nasa.gov/files/21703/GSFC_Liu_Sampson_Reliability_Eval_BME_Multilayer_Ceramic.pdf

Companion: Liu, D., "Failure Mechanisms in BaTiO3-based MLCCs," CARTS 2012
(https://nepp.nasa.gov/files/24291/carts2012_liu_batio3.pdf); Liu, "Failure Analysis of
Dielectric Breakdowns in BME," CARTS 2013
(https://nepp.nasa.gov/files/24303/CARTS2013_Liu_FailureAnalysis.pdf).

ID nomenclature: `[mfr letter][case][X=X7R/C=C0G][cap code][rated V]`. Mfr A/B/C = BME
suppliers, D = PME/military. Dielectric thickness given as fired thickness; electrode
thickness in parentheses.

## Table II — full construction analysis (CARTS 2011), VERBATIM

| Capacitor ID | Dielectric (Electrode) thickness µm | No. dielectric layers | Cover plate µm | Side margin µm | End margin µm |
|---|---|---|---|---|---|
| A04C33116 | 4.5 (1.8) | 46 | 100 | 100 | 100 |
| A04C33125 | 10.0 (2.2) | 29 | 70 | 140 | 110 |
| A06X47425 | 4.2 (1.3) | 150 | 60 | 125 | 100 |
| A06X10425 | 7.9 (2.5) | 62 | 85 | 160 | 100 |
| A06C10225 | 12.0 (2.2) | 36 | 130 | 175 | 175 |
| A08X22525 | 4.4 (2.0) | 275 | 62 | 135 | 150 |
| A12X22606 | 2.0 (1.3) | 750 | 75 | 160 | 140 |
| A12X10616 | 3.5 (1.4) | 300 | 65 | 190 | 150 |
| A12X47425 | 10.5 (2.3) | 75 | 175 | 340 | 220 |
| B04X10406 | 2.5 (1.5) | 70 | 85 | 110 | 110 |
| B04X10416 | 2.0 (2.2) | 65 | 100 | 95 | 95 |
| B04X47325 | 4.0 (2.2) | 49 | 125 | 125 | 110 |
| B04X18325 | 6.2 (1.6) | 33 | 130 | 120 | 120 |
| B06X22425 | 4.2 (1.8) | 120 | 100 | 140 | 120 |
| B08X10525 | 4.6 (1.6) | 150 | 80 | 120 | 120 |
| B08X33425 | 5.8 (1.8) | 110 | 120 | 140 | 115 |
| B12X10606 | 3.5 (1.3) | 250 | 75 | 120 | 115 |
| C04X10410 | 2.6 (1.7) | 77 | 65 | 105 | 90 |
| C04X10416 | 3.4 (1.5) | 80 | 60 | 105 | 95 |
| C04X47325 | 4.4 (1.7) | 60 | 55 | 105 | 90 |
| C04C10250 | 4.0 (1.0) | 77 | 65 | 105 | 100 |
| C08X10606 | 2.0 (1.2) | 575 | 75 | 65 | 105 |
| C06X10525 | 3.1 (1.2) | 150 | 75 | 125 | 110 |
| C06C39250 | 3.5 (1.2) | 150 | 75 | 190 | 165 |
| C08X56425 | 4.0 (1.4) | 170 | 80 | 120 | 110 |
| C08X47516 | 2.5 (1.5) | 250 | 110 | 105 | 100 |
| D04X10310 (PME) | 15.1 (2.0) | 22 | 65 | 100 | 120 |
| D06X10405 (PME) | 12.4 (2.2) | 24 | 80 | 120 | 160 |
| D08X10425 (PME) | 20.2 (2.2) | 23 | 120 | 260 | 220 |
| D12X39350 (PME) | 22.5 (2.4) | 22 | 150 | 350 | 350 |

EDX: BME inner electrodes = pure Ni; PME = Pd/Ag. BME volumetric efficiency ~27× the PME
on same case (Fig.2 0402 BME 6.2 µm vs Fig.3 1206 PME 22.5 µm).

## Table V — microstructure + grain-stacking (CARTS 2011), VERBATIM (selected)

| ID | Electrode | d (µm) | grain (µm) | grains/layer (d/grain) | MTTF (yrs) |
|---|---|---|---|---|---|
| A08X22525 | BME | 3.5 | 0.31 | 11.29 | all shorted in HALT |
| A08X15425 | BME | 9.8 | 0.46 | 21.30 | 7.6e9 |
| A06X10425 | BME | 7.6 | 0.47 | 16.17 | 1.84e10 |
| B06X22425 | BME | 4.2 | 0.34 | 12.35 | 6.11e5 |
| B08X33425 | BME | 5.8 | 0.42 | 13.81 | 1.73e12 |
| B08X10525 | BME | 4.6 | 0.40 | 11.50 | 3.39e7 |
| C06X10525 | BME | 3.1 | 0.44 | 7.05 | 9.72e11 |
| C08X56425 | BME | 4.0 | 0.39 | 10.26 | 1.11e11 |
| D06X10405 | PME | 12.4 | 0.77 | 16.11 | 2.62e5 |
| D04X10310 | PME | 15.1 | 0.68 | 22.21 | 3.81e12 |
| D08X10425 | PME | 20.2 | 0.61 | 33.11 | no HALT failures |

(CARTS 2012 Table II repeats d + grain for the 25 V set; C08X22525 BME 4.0 µm / 0.32 µm.)
Rule: # stacked grains per layer ≈ constant ~11–12 for 25 V BME, ~independent of d.

## CARTS 2013 Failure Analysis — Table I, single richest record (B08X56416)
0.56 µF, 16 V, 0805, mfr B, BME: end margin 170 µm, side margin 100 µm, cover plate
365 µm, N=82 layers, d=4.2 µm, grain 0.36/0.40 µm (avg/max), grain-stacking 11.67,
R=(1−(r̄/d)^6)^N = 99.994%.

## Construction-margin minimum (Table I, CARTS 2011, per EIA-469D §5.1.3)
Side margin ≥25 µm, end margin ≥40 µm, cover plate ≥40 µm (for ≤25 V). Every part
examined had margins ≥2× these minimums.

## Cross-paper contradictions (reproduced as printed, unreconciled)
- A06X10425 dielectric: 7.6 µm (2011/2012) vs 7.9/7.89 µm (2011 Table II / 2013 HALST).
- D06X10405 grain: 0.68 µm (Table IV) vs 0.77 µm (Table V).

## Gaps
No chip outer L×W×H tabulated; inner-electrode thickness only as the Table II parentheticals.
