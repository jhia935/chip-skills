# NASA GSFC MLCC space-qualification specs — internal-structure requirements (raw extract)

Source of truth for `wiki/sources/gsfc-mlcc-space-specs.md`.

MEASUREMENT STATE: all dimensions FIRED / post-sinter (dielectric thickness "measured
after firing"; margins/cover are DPA acceptance on the finished part). Not green.

## S-311-P-838 (BME X7R, space-level) — builds on MIL-PRF-32535
Source: https://nepp.nasa.gov/files/30348/S-311-P-838B.pdf ; CARTS 2015 Liu presentation
https://nepp.nasa.gov/files/27821/NEPP-CP-2015-Liu-Pres-CMSE-BME-TN21196.pdf .
Only qualified supplier: KYOCERA AVX.

### Minimum FIRED dielectric thickness vs rated V (Table II; "measured after firing"), constant across sizes
| Rated V | min d (mil) | µm |
|---|---|---|
| 16 / 25 V | 0.28 | 7.1 |
| 50 V | 0.33 | 8.4 |
| 100 V | 0.60 | 15.2 |

### Allowable C/V by size (CARTS 2015 slide 7) — min d per size/voltage
0603/0805/1206/1210/1812; 16/25 V → 7.11 µm; 50 V → 8.38 µm; 100 V → 15.24 µm. Cap range
e.g. 0603 2.2–180 nF (16/25 V) up to 1812 0.15–8.2 µF (16/25 V). Tolerance ±5/10/20%.

### PRVT construction-measurement requirements (slide 9)
- Dielectric thickness sample avg: >50 V → 7.11 µm (0.28 mil) min.
- Side margin: <25 V → 15 µm min; ≥25 V per EIA/ECA-469 Table 6.
- End margin: <25 V → 25 µm min; ≥25 V per EIA/ECA-469 Table 7.
- Cover plate: <25 V → 25 µm min; ≥25 V per EIA/ECA-469 Table 8.
- **Dielectric layers: ≤ 300.**
- Grain size by Linear Intercept (ASTM E112-10 §13).
- Reliability gate (Eq.1): Ft = 1 − [1 − (r̄/d)^α]^N < 1e-5, with **α = 6 for VR ≤ 100 V, α = 5 for VR > 100 V**. r̄=avg grain, d=avg dielectric thickness, N=total layers.
- Void limit: ≤30% of dielectric thickness (838); breakdown screen VBR ≥ 6×VR; DWV 2.5×VR; life 2×VR/125 °C.

### Margin/cover floors (838 §3.2.1.2–4)
| Feature | <25 V | ≥25 V |
|---|---|---|
| Side margin | 0.6 mil (15.2 µm) | 1.0 mil (25.4 µm) |
| End margin | 1 mil (25 µm) | 1.6 mil (40.6 µm) |
| Cover plate | 1.0 mil (25.4 µm) | 1.6 mil (40.6 µm) |

Case sizes 0402–1812; X7R only; 16/25/50/100 V. Nickel electrodes; Sn/Pb ≥3% Pb.

## S-311-P-829 (PME NP0/X7R, space-level)
Source: https://nepp.nasa.gov/files/30344/S-311-P-829_K.pdf
- Min fired d (§3.2.1): general 0.8 mil (20.3 µm) ≤50 V; 1.0 mil (25.4 µm) 100 V — unless Table I overrides.
- Table I (by type/V): X7R 5–6.3 V → 0.25–0.4 mil; 10 V → 0.3 mil; 16 V → 0.4 mil; 25/50 V → 0.8 mil; 100 V → 1.0 mil. NP0 25 V → 0.6 mil; 50 V → 0.7 mil; 100 V → 1.0 mil.
- Void limit: ≤50% thickness. Max K: X7R 4000 / NPO 100.
- Margins <25 V: side 0.015 mm, end 0.025 mm, cover 0.025 mm; ≥25 V per ANSI/EIA-469 Tables 6/7/8.
- No max layer count, no PRVT formula (BME-only). DWV 2.5×VR. Precious-metal electrodes.
- Case sizes 0402–2225 incl. reverse-geometry low-inductance (0306/0508/0612/0912); 5–100 V.

## EEE-INST-002 — voltage derating (Section C1, Table 4)
- Ceramic (CCR/CKS/CKR/CDR): voltage derate factor **0.60**, max ambient **110 °C**.
- Derate factor applies to (peak AC ripple + DC). <10 Vdc apps: use parts rated ≥100 Vdc (Level 1; Level 2 may use <100 V with MIL-PRF-123 Group B HSSLV).
- Glass 0.50; plastic film 0.60; solid tantalum 0.50/0.30. No dielectric-thickness/K/margin rules in EEE-INST-002 (those live in 838/829/MIL-PRF-123).
Source: https://s3vi.ndc.nasa.gov/ssri-kb/static/resources/EEE-INST-002_add1.pdf
