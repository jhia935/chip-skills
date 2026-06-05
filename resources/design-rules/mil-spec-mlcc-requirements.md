# MIL-spec MLCC internal-structure requirements (raw extract)

Source of truth for `wiki/sources/mil-prf-123-spec.md` and `wiki/sources/mil-prf-32535-spec.md`.

MEASUREMENT STATE: all dimensional requirements (dielectric thickness, margins, cover,
chip L/W/T) are FIRED / finished-part values — specs state thickness is "measured after
firing" and margins/cover are DPA acceptance criteria on the sintered part. Not green.

## MIL-PRF-123 (PME, precious-metal electrode)
Source: MIL-PRF-123D w/Amendment 2 (Presidio copy)
https://www.presidiocomponents.com/products/MIL-PRF-123-specification.pdf ;
KEMET datasheet https://content.kemet.com/datasheets/KEM_C1115_MIL-PRF-123.pdf

- Min fired dielectric thickness (§3.4.1): **0.8 mil (20.3 µm) for 50 V; 1.0 mil (25.4 µm) for >50 V**. Only 50 V and 100 V ratings exist.
- Void limit (§3.4.1): voids shall not reduce total dielectric thickness by **>50%**.
- Max dielectric constant (§3.4.1): **3000**.
- Electrodes (§3.4.2): **Ni prohibited** (PME, Ag/Pd).
- Cover/side/end margins: NOT tabulated; delegated to **ECIA/EIA-469** (§3.6, §4.6.11) + Appendix B visual.
- Max layers / grains-per-layer / PRVT: **none**. Reliability by life test: +125 °C, 2×VR, 4000 h (qual)/1000 h (group B), assumed acceleration 8:1.
- Termination (Table IV): C=Cu solder-coated 60 µin min; G=Ag-Ni-Au; M=Pd/Ag; Z=base-metal-barrier Sn/Pb (≥4% Pb). Pure tin prohibited; Sn ≤96% by mass.
- DWV (§3.13): **250–400% of rated V**, 5±1 s, surge 30–50 mA. No separate VBR screen.
- IR (§3.14): +25 °C ≥100,000 MΩ or 1000 MΩ·µF (lesser); +125 °C ≥10,000 MΩ or 100 MΩ·µF.
- DF max (§3.12): BX/BR 2.5%; BP 0.15% (0.25% <10 pF); BG 0.05%.
- Dielectrics: BP (NP0-type, ±30 ppm/°C), BX/BR (±15%), BG. Voltages 50 V, 100 V.

### MIL-PRF-123 chip outer dimensions (KEMET, in (mm))
| Chip | Mil style | L | W | T max | Band B |
|---|---|---|---|---|---|
| 0805 | CKS51 | 2.03±0.38 | 1.27±0.38 | 1.40 | 0.51±0.25 |
| 1206 | CKS55 | 3.05±0.38 | 1.52±0.38 | 1.65 | 0.51±0.25 |
| 1210 | CKS52 | 3.05±0.38 | 2.54±0.38 | 1.65 | 0.51±0.25 |
| 1808 | CKS53 | 4.57±0.38 | 2.03±0.38 | 1.65 | 0.51±0.25 |
| 1812 | CKS56 | 4.57±0.38 | 3.18±0.38 | 2.03 | 0.51±0.25 |
| 1825 | CKS57 | 4.57±0.38 | 6.35±0.38 | 2.03 | 0.51±0.25 |
| 2225 | CKS54 | 5.59±0.38 | 6.35±0.38 | 1.78 | 0.51±0.25 |

## MIL-PRF-32535B (BME, base-metal/Ni electrode)
Source: MIL-PRF-32535B (DLA); AVX datasheet https://datasheets.kyocera-avx.com/AVX-MIL-PRF-32535.pdf

- Min fired dielectric thickness: **NOT fixed**. For d ≤ 7 µm a SEM provision distinguishes true voids from DPA artifacts (§3.12d(1)). Geometry controlled by margin/cover tables instead.
- Void limit (§3.12d(1)): >50% reduction rejectable (SEM re-eval if d ≤7 µm).
- Max K: **not specified**.

### Table VIII — side margins (min, §3.12b) VERBATIM
| Rated V | min side margin |
|---|---|
| 4–6.3 | 0.0006″ (0.015 mm) |
| 10–16 | 0.0008″ (0.020 mm) |
| 25 | 0.0010″ (0.025 mm) |
| >25–50 | 0.0016″ (0.040 mm) |
| >50–200 | 0.0020″ (0.050 mm) |

### Table IX — end margins (min) VERBATIM
| Rated V | min end margin |
|---|---|
| 4–6.3 | 0.0010″ (0.025 mm) |
| 10–16 | 0.0014″ (0.036 mm) |
| 25 | 0.0016″ (0.040 mm) |
| >25–50 | 0.0020″ (0.050 mm) |
| >50–200 | 0.0030″ (0.075 mm) |

### Table X — cover plate thickness (min) VERBATIM
| Rated V | min cover plate |
|---|---|
| 4–6.3 | 0.0010″ (0.025 mm) |
| 10–16 | 0.0014″ (0.036 mm) |
| 25 | 0.0016″ (0.040 mm) |
| >25–50 | 0.0020″ (0.050 mm) |
| >50–200 | 0.0030″ (0.075 mm) |

- Delamination reject (§3.12a): single delam >20% of interface AND >0.127 mm (>0603) / >0.051 mm (≤0603); active-area delam displacing adjacent layer >50% of avg dielectric thickness.
- Max layers / grains-per-layer: none in 32535 (those are GSFC S-311-P-838 add-ons).
- Reliability (§4.6.3.2): cube-law `Ttest = A/(Etest/Erated)^3`, 2·Er < Etest < 4·Er, A=1344(T)/800(M), accel 8:1, exponent n=3. Voltage conditioning 2×VR/125 °C 168–264 h. Life test 4000 h(T)/1000 h(M) at 2×VR/125 °C.
- Breakdown screen (§3.21/§4.6.17): **VBR ≥ 6×VR or 1200 V, whichever less**; ramp ≤175 V/s to 5 mA. Qual n=30 accept 0.
- DWV (§3.9): 250–400% VR, 5±1 s.
- Dielectric classes (Table I): BG, BP, E1=C0G, BR, BX, BZ, BN, E2=X7R, E3=X7S.

### MIL-PRF-32535 chip outer dimensions (AVX, mm)
| | 0402 | 0603 | 0805 | 1206 | 1210 | 1812 | 2220 |
|---|---|---|---|---|---|---|---|
| L min–max | 0.92–1.12 | 1.45–1.75 | 1.79–2.26 | 3.00–3.45 | 2.94–3.45 | 4.19–4.80 | 5.2–6.1 |
| W min–max | 0.41–0.61 | 0.66–0.97 | 1.01–1.52 | 1.35–1.85 | 2.25–2.74 | 2.89–3.50 | 4.59–5.41 |
| T max | 0.61 | 0.99 | 1.52 | 1.78 | 2.80 | 2.80 | 2.80 |
| t (band) min–max | 0.1–0.30 | 0.20–0.61 | 0.25–0.75 | 0.15–0.86 | 0.15–0.86 | 0.15–1.1 | 0.17–1.09 |

Case 0402–2220, 16–100 V, 2.2 nF–22 µF, X7R (E2). M-level (std) / T-level (space).

## MIL-PRF-55681 — referenced only (PME companion). 123 Appendix E maps CKS↔CDR styles by similarity.
