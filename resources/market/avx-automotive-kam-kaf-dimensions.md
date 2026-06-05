# KYOCERA AVX automotive MLCC (KAM / KAF) — dimensions & envelope (raw extract)

Source of truth for `wiki/sources/avx-automotive-mlcc-kam-kaf.md`.

MEASUREMENT STATE: all L×W×T/band dimensions are FIRED, finished-part (post-sinter,
including plated terminations) — catalog outer dimensions. Not green/pre-sinter. Raw datasheet PDFs +
`pdftotext` dumps under `resources/market/avx/` (full cap-range×voltage grids preserved
in the `.txt` files — too large/error-prone to re-key in full).

Docs: KAM = "Automotive MLCC, KAM Series" TDS-SMDMLCC-0033 Rev 20
(https://datasheets.kyocera-avx.com/AutoMLCCKAM.pdf, plated Ni/Sn, BME);
KAF = "Automotive MLCC with FLEXITERM, KAF Series" TDS-SMDMLCC-0034 Rev 17
(https://datasheets.kyocera-avx.com/AutoMLCCKAF.pdf, soft-term, BME, AEC-Q200 + VW 80808);
legacy AutoMLCC TDS-0005; FLEXITERM TDS-0016.

## Chip outer dimensions — KAM X7R (TDS-0033 p.8), VERBATIM (mm)
| | 0201 | 0402 | 0603 | 0805 | 1206 | 1210 | 1812 | 2220 |
|---|---|---|---|---|---|---|---|---|
| L | 0.6±0.09 | 1.0±0.10 | 1.6±0.15 | 2.01±0.20 | 3.2±0.2 | 3.2±0.2 | 4.5±0.3 | 5.7±0.5 |
| W | 0.3±0.09 | 0.5±0.10 | 0.81±0.15 | 1.25±0.20 | 1.6±0.2 | 2.5±0.2 | 3.2±0.2 | 5.0±0.4 |
| t (band) | 0.18±0.09 | 0.25±0.15 | 0.35±0.15 | 0.5±0.25 | 0.5±0.25 | 0.5±0.25 | 0.61±0.36 | 0.64±0.39 |

C0G footnote variants: 0603 → 1.6±0.2 × 0.8±0.2; 1206 → 3.2±0.4 × 1.6±0.3; 1210 → 3.2±0.4 × 2.5±0.3.
KAF FLEXITERM dimension tables are dimensionally identical to KAM for every shared size.

## Thickness (T, max) letter codes (legacy chart, mm)
A 0.33 · C 0.56 · E 0.71 · G 0.90 · J 0.94 · K 1.02 · M 1.27 · N 1.40 · P 1.52 · Q 1.78 ·
X 2.29 · Y 2.54 · Z 2.79 · 7 3.30. (KAM/KAF give size-specific max T per C/V cell; T is the
layer-count-dependent dimension, not a tight nominal.) Packaging: ≤Q paper tape, ≥X embossed.

## Dielectric classes / temperature (KAM TDS-0033 p.3)
| Dielectric | T range °C | ΔC |
|---|---|---|
| X7R | -55…+125 | ±15% |
| X7T | -55…+125 | +22/-33% |
| X8R | -55…+150 | ±15% |
| X8L | -55…+125 / +125…+150 | ±15% / +15/-40% |
| X8G | -55…+150 | 0±30 ppm/°C |
| NP0/C0G | -55…+125 | 0±30 ppm/°C |

## Voltage codes / envelope
2.5 V (0E) … 3000 V (3U). HV 630–3000 V only on 1206/1210/1808/1812/2220.

## Capacitance envelope (cell = thickness letter at that C/V; full grids in .txt)
- KAM C0G: 0.5 pF–0.1 µF (0402–1812, 25–1000 V).
- KAM X7R: 100 pF–22 µF (0201–2220, 2.5–500 V); 10 µF at 0805/1206/1210, 22 µF at 1210/2220.
- KAM X7R HV: 100 pF–1 µF (630–3000 V).
- KAM X8R: 270 pF–1 µF (0402/0603/0805/1206; 25/50/100 V).
- KAM X8L: 270 pF–22 µF (0603/0805/1206/1210/2220; 10–250 V).
- KAM X8G: 0.5 pF–10 nF (0402/0603/0805; 25–250 V).

## Termination / FLEXITERM
KAM = plated Nickel/Tin (Ni barrier + Sn). KAF FLEXITERM = soft/flexible termination,
BME system. NOT given numerically: a Cu/conductive-polymer/Ni/Sn layer stack or any layer
thicknesses ("soft/flexible BME termination" is described only functionally).

## AEC-Q200 flexure & temperature-cycling
- Board bend (90 mm span, FR4, 20 pcs, AEC-Q200 min 2 mm): conventional 0603/0805/1206 >2 mm; FLEXITERM >5 mm (2–4× improvement); beyond 5 mm fails "open"; soft-term tested to 10 mm @1 mm/s; >5 mm guaranteed even at +150 °C.
- Temp cycling (-55…+125 °C, 77 pcs, AEC-Q200 1000 cycles): FLEXITERM 0% fail / no ESR change to 3000 cycles.

## Gaps
No µm margin/cover/active-dielectric numbers; no FLEXITERM layer thicknesses; no internal electrode count per size.
