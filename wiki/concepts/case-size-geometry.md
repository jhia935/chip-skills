---
title: MLCC Case Sizes & Internal Geometry
type: concept
created: 2026-05-19
updated: 2026-05-20
status: complete
importance: high
sources:
  - nasa-nepp-bme-mlcc-reliability.md
  - samsung-cl-series-mlcc-ds.md
tags:
  - paper
---

# MLCC Case Sizes & Internal Geometry

The outer case size sets a hard envelope on `L`, `W`, `H`. Internal geometry — end margin, side margin, electrode overlap area, cover (passivation) thickness, dielectric layer thickness, electrode thickness, active layer count — has to fit inside that envelope. The active overlap area `A` and the maximum `N` are derived quantities, not free parameters.

## EIA case codes vs metric
| EIA | Metric (mm) | Typical L × W (mm) |
|---|---|---|
| 008004 | 0201 | 0.25 × 0.125 |
| 01005  | 0402 | 0.4 × 0.2 |
| 0201   | 0603 | 0.6 × 0.3 |
| 0402   | 1005 | 1.0 × 0.5 |
| 0603   | 1608 | 1.6 × 0.8 |
| 0805   | 2012 | 2.0 × 1.25 |
| 1206   | 3216 | 3.2 × 1.6 |
| 1210   | 3225 | 3.2 × 2.5 |
| 1812   | 4532 | 4.5 × 3.2 |
| 2220   | 5750 | 5.7 × 5.0 |

Source: [[samsung-cl-series-mlcc-ds]] §2.

### The naming-convention pitfall
The **same digits in EIA and metric encode different physical sizes**. EIA codes derive from **0.01-inch units** (`0805` = 0.080" × 0.050"); metric codes derive from **0.1-mm units** (`2012` = 2.0 × 1.2 mm — which happens to be the same physical part as EIA `0805`). The collision becomes dangerous because **`0603` exists in both schemes with very different meanings**:

| Bare digits | EIA reading | Metric reading | Volume ratio |
|---|---|---|---|
| `0201` | 0.6 × 0.3 mm | 0.2 × 0.1 mm | **27×** |
| `0402` | 1.0 × 0.5 mm | 0.4 × 0.2 mm | **31×** |
| `0603` | **1.6 × 0.8 mm** (workhorse) | **0.6 × 0.3 mm** (ultra-tiny) | **~7×** |
| `0805` | 2.0 × 1.25 mm | 0.8 × 0.5 mm | **6×** |
| `1206` | 3.2 × 1.6 mm | 1.2 × 0.6 mm | **11×** |

A BOM or datasheet that says `"0603"` without context has bitten plenty of engineers.

### Recommended disambiguation: `i` / `m` suffix (default = JIS metric)
**No suffix means JIS metric.** Suffixes `i` (inch-derived EIA) and `m` (metric) make the intent explicit. The resolver warns when bare input is ambiguous and refuses bare input that is only valid as EIA.

| Input | Resolves to | Notes |
|---|---|---|
| `2012` | EIA 0805 (= 2012m) | bare → assumed JIS metric, no collision |
| `2012m` | EIA 0805 | explicit metric, same physical part |
| `0805i` | EIA 0805 | explicit EIA (workhorse, 2.0 × 1.25 mm) |
| `0805` | **ERROR** | not a standard JIS metric size; hint: use `0805i` or `2012` |
| `0603` | EIA 0201 (= 0603m) | bare → assumed JIS metric (0.6 × 0.3 mm); **warning** because `0603i` is a real different size |
| `0603m` | EIA 0201 | explicit metric, tiny 0.6 × 0.3 mm |
| `0603i` | EIA 0603 | explicit workhorse cap, 1.6 × 0.8 mm |
| `1608` | EIA 0603 (= 1608m) | unambiguous metric form for the workhorse |
| `1206` | **ERROR** | not standard JIS metric; hint: use `1206i` or `3216` |

The simulator's size-resolver follows this convention:
- **Default = JIS metric.** Bare 4-digit input is read as a metric code.
- **Warns** for the collision-prone bare codes (`0201`, `0402`, `0603`) where both EIA and metric readings exist with different physical sizes — the user should disambiguate.
- **Rejects** bare codes that are only valid as EIA (`0805`, `1206`, `1210`, `1812`, `2220`) with a helpful hint pointing at the `i` suffix or metric equivalent.
- Explicit `i` / `m` suffixed input never warns.

### SEMCO internal size code
[[samsung-electro-mechanics|SEMCO]] CL-series part numbers use a **2-digit internal index** (field 2 of the 11-field PN) that's independent of either EIA or metric digits:

| SEMCO field | EIA | Metric | mm |
|---|---|---|---|
| `03` | 0201 | 0603 | 0.6 × 0.3 |
| `05` | 0402 | 1005 | 1.0 × 0.5 |
| `10` | 0603 | 1608 | 1.6 × 0.8 |
| `21` | 0805 | 2012 | 2.0 × 1.25 |
| `31` | 1206 | 3216 | 3.2 × 1.6 |
| `32` | 1210 | 3225 | 3.2 × 2.5 |
| `43` | 1812 | 4532 | 4.5 × 3.2 |
| `55` | 2220 | 5750 | 5.7 × 5.0 |

The simulator's [[samsung-cl-series|SEMCO]] encoder takes either user-side notation (with or without `i`/`m` suffix) and emits the correct 2-digit SEMCO field.

## Margins & overlap area
For BME construction, [[nasa-nepp-bme-mlcc-reliability]] Table II:

Margins are **size-scaled**, not constant: `end margin em ≈ 0.12·L` (floor 40, cap 350 µm) and `side margin sm ≈ 0.10·W` (floor 25, cap 250 µm). A constant absolute margin (the simulator's original `em=125, sm=100`) is fine for 0805+ but **consumes a 0201** — on a 0.3 mm-wide chip `sm=100` leaves only 100 µm of overlap (15 % active area), which under-predicts small high-CV parts ~3×. The corrected values:

| Case | L (µm) | W (µm) | End margin (µm) | Side margin (µm) | Overlap A (mm²) |
|---|---|---|---|---|---|
| 0201 | 600  | 300  | 72  | 30  | 0.124 |
| 0402 | 1000 | 500  | 120 | 50  | 0.352 |
| 0603 | 1600 | 810  | 192 | 81  | 0.788 |
| 0805 | 2010 | 1250 | 240 | 125 | 1.530 |
| 1206 | 3200 | 1600 | 350 | 160 | 3.277 |
| 1210 | 3200 | 2500 | 350 | 250 | 5.000 |
| 1812 | 4500 | 3200 | 350 | 250 | 10.508 |
| 2220 | 5700 | 5000 | 350 | 250 | 22.275 |

The **end margin** is the keep-out between the buried internal electrode tip and the termination of opposite polarity (anti-arcing distance). The **side margin** is the keep-out between the electrode edge and the chip side wall (anti-delamination, mechanical robustness). Both have an absolute floor (handling/insulation) and saturate for large cases — hence the fractional-with-cap rule rather than a pure percentage. See [[dielectric-layer-thickness-floor]] for the companion limit on layer count.

## Height & layer count budget
Total external height:
$$
H \;=\; 2 d_\text{cover} \;+\; N (d + d_e)
$$
With `d_e ≈ 0.5–1.0 µm` for inner Ni/Cu electrodes and `d_cover ≈ 30–50 µm` per side (mechanical robustness + dielectric strength margin to the surface).

Typical published `H_max` ([[samsung-cl-series-mlcc-ds]] §7):

| Case | H_max (mm) |
|---|---|
| 0201 (0603) | 0.33 |
| 0402 (1005) | 0.55 |
| 0603 (1608) | 0.90 |
| 0805 (2012) | 1.35 |
| 1206 (3216) | 1.80 |
| 1210 (3225) | 2.80 |
| 1812 (4532) | 3.50 (option L = 3.2) |
| 2220 (5750) | 3.50 (option L = 3.2) |

Working backward: a 0805 with `d = 1 µm`, `d_e = 1 µm`, `d_cover = 50 µm/side` allows `N ≤ (1350 − 100) / 2 = 625` layers — comfortably above the 300-layer state-of-the-art commercial value.

## Volumetric-efficiency ceiling
[[nasa-batio3-mlcc-failure-mechanisms]] Fig. 2 shows that volumetric efficiency saturates around **3000–4000 µF/cm³** as `d → 0.5 µm` because `εr` collapses with grain size. Sub-µm dielectrics need [[core-shell-batio3]] microstructure engineering to keep `εr` from falling apart.

## Related
- [[mlcc-capacitance-equation]] — uses `A` and `N`
- [[bme-reliability-model]] — uses `S` (chip-size scale factor)
- [[failure-modes-mlcc]] — larger cases (>0805) are more susceptible to flex crack

## References
- [[nasa-nepp-bme-mlcc-reliability]]
- [[samsung-cl-series-mlcc-ds]]
