// MLCC Tier 1 capacitance estimator — pure math + lookup tables.
// Browser: loads as <script src="tier1.js"></script>, exposes window.tier1.
// Node:    require('./tier1.js') returns the same namespace.
// No DOM dependencies in this file.

(function (root) {
  'use strict';

  // ============================================================
  // Lookup tables (traced to wiki concept pages)
  // ============================================================

  // Case dimensions in µm — wiki/concepts/case-size-geometry.md
  //
  // L, W are the NOMINAL footprint. Real MLCCs ship oversized within a
  // dimensional tolerance (Ltol/Wtol = ± from nominal); a high-CV part is built
  // to the MAX footprint (nominal + tol) to capture the extra electrode area —
  // e.g. a "0603 metric" (0.6 × 0.3) part legitimately measures up to ~0.65 ×
  // 0.35 mm. The capacitance envelope and the pattern-fit check use the MAX;
  // the calibration/known-parts path keeps using nominal. Tolerances below are
  // datasheet-typical (IEC 60384 / vendor) — larger-tolerance series exist.
  //
  // Margins (em = end set-back, sm = side margin) are SIZE-SCALED:
  //   em ≈ 0.12·L (cap 350 µm, floor 40),  sm ≈ 0.10·W (cap 250 µm, floor 25).
  const CASES = [
    { id: '0201_0603', label: 'EIA 0201 / metric 0603 (0.6 × 0.3 mm)', L: 600,  W: 300,  em: 72,  sm: 30,  Hmax: 330,  Ltol: 50,  Wtol: 50,  Ttol: 30 },
    { id: '0402_1005', label: 'EIA 0402 / metric 1005 (1.0 × 0.5 mm)', L: 1000, W: 500,  em: 120, sm: 50,  Hmax: 550,  Ltol: 50,  Wtol: 50,  Ttol: 50 },
    { id: '0603_1608', label: 'EIA 0603 / metric 1608 (1.6 × 0.8 mm)', L: 1600, W: 810,  em: 192, sm: 81,  Hmax: 900,  Ltol: 100, Wtol: 90,  Ttol: 100 },
    { id: '0805_2012', label: 'EIA 0805 / metric 2012 (2.0 × 1.25 mm)', L: 2010, W: 1250, em: 240, sm: 125, Hmax: 1350, Ltol: 200, Wtol: 200, Ttol: 150 },
    { id: '1206_3216', label: 'EIA 1206 / metric 3216 (3.2 × 1.6 mm)', L: 3200, W: 1600, em: 350, sm: 160, Hmax: 1800, Ltol: 200, Wtol: 200, Ttol: 200 },
    { id: '1210_3225', label: 'EIA 1210 / metric 3225 (3.2 × 2.5 mm)', L: 3200, W: 2500, em: 350, sm: 250, Hmax: 2800, Ltol: 300, Wtol: 300, Ttol: 300 },
    { id: '1812_4532', label: 'EIA 1812 / metric 4532 (4.5 × 3.2 mm)', L: 4500, W: 3200, em: 350, sm: 250, Hmax: 3500, Ltol: 300, Wtol: 300, Ttol: 300 },
    { id: '2220_5750', label: 'EIA 2220 / metric 5750 (5.7 × 5.0 mm)', L: 5700, W: 5000, em: 350, sm: 250, Hmax: 3500, Ltol: 400, Wtol: 400, Ttol: 400 },
  ];
  // Ttol = thickness (T) tolerance; the buildable max height is Hmax + (Ttol −
  // Ttol_default), so the shipped Ttol just reproduces Hmax. Thickness is the
  // loosest MLCC dimension and its tolerance often differs from L/W — exposing
  // it lets a looser-spec part stack more layers (taller part → more C).

  // ε_r,nominal — wiki/concepts/eia-rs-198-dielectric-classes.md
  // Calibrated 2026-05-28 against the 25-part vendor lineup. Original conservative
  // values (X7R=2200, X5R=2500) systematically under-predicted modern thin-layer
  // parts whose fine-grain core-shell raises effective ε_r. New values track
  // published measurements: Hwang 2024 MLCC ε_r=2300 (X7S), Murata GRM 2800-3500
  // for thin-layer X5R/X7R, Liu 2019 Sm-Mn BT up to 15000 (relaxor).
  const CLASSES = [
    { id: 'C0G', label: 'C0G / NP0 (Class I, ultra-stable)',      er: 35    },
    { id: 'X5R', label: 'X5R (Class II, −55…+85 °C, ±15 %)',      er: 3200  },
    { id: 'X7R', label: 'X7R (Class II, −55…+125 °C, ±15 %)',     er: 3000  },
    { id: 'X8R', label: 'X8R (Class II, −55…+150 °C, ±15 %)',     er: 1800  },
    { id: 'Y5V', label: 'Y5V (Class III, −30…+85 °C, +22/−82 %)', er: 12000 },
  ];

  // DC-bias sigmoid params: f_V = 1 / (1 + (E/E0)^p), E in V/µm
  // wiki/concepts/dc-bias-derating.md
  //
  // RECALIBRATED 2026-05-29 against the Vishay Fig. 2 measured X7R curve
  // (simulator/dc_bias_bench.cjs). The previous X7R (E0=4, p=2) over-predicted
  // bias loss ~2×: it gave −50 % at 4 V/µm where the measured curve shows −25 %,
  // and RMS-log-error 0.935 vs the measured points. The best-fit (E0=7.6, p=1.45)
  // matches Vishay Fig. 2 to ±3 pp and lands inside the EPCI cross-vendor
  // envelope (−35…−65 % at rated) for a real 0805 X7R 10 µF 6.3 V part.
  //
  // X7R is the only class validated against a measured curve. X5R/X8R/Y5V are
  // reasoned offsets (X5R worse, X8R better, Y5V much worse) pending per-class
  // measured C(V_DC) data — they share the validated p = 1.45 shape.
  const DCBIAS = {
    'C0G': { E0: 1e9, p: 1 },      // paraelectric — effectively no derating
    'X5R': { E0: 5.7, p: 1.45 },   // X7R × 0.75 on E0 (thinner/higher-CV → worse)
    'X7R': { E0: 7.6, p: 1.45 },   // measured fit to Vishay Fig. 2
    'X8R': { E0: 9.5, p: 1.45 },   // X7R × 1.25 (automotive margin → better)
    'Y5V': { E0: 2.0, p: 1.30 },   // much worse; rough — no measured curve yet
  };

  const EPS0 = 8.854187817e-12; // F/m

  // ============================================================
  // SEMCO CL-series part-number decoder
  // 11 fields, 15 characters total:
  //   CL <size 2c> <tcc 1c> <cap 3c> <tol 1c> <volt 1c>
  //      <thick 1c> <plating 1c> <control 1c> <reserved 1c> <packaging 1c>
  // Wiki ref: wiki/entities/samsung-cl-series.md
  // ============================================================

  // Size code → simulator case ID
  const SEMCO_SIZE_CODES = {
    '03': '0201_0603',
    '05': '0402_1005',
    '10': '0603_1608',
    '18': '0612_1632',   // wide-aspect (less common; not in our CASES yet)
    '21': '0805_2012',
    '31': '1206_3216',
    '32': '1210_3225',
    '42': '2010_5025',   // not in our CASES yet
    '43': '1812_4532',
    '55': '2220_5750',
  };

  // TCC code → simulator class ID. Some SEMCO codes (e.g. X6S, U2J)
  // don't map to a class we model — decoded but flagged with cls: null.
  const SEMCO_TCC_CODES = {
    'A': 'X5R',
    'B': 'X7R',
    'X': null,   // X6S — not in our CLASSES set
    'F': 'Y5V',
    'C': 'C0G',
    // Class I sub-codes (all map to C0G family in our model)
    'P': 'C0G', 'R': 'C0G', 'S': 'C0G', 'T': 'C0G', 'U': 'C0G',
  };

  // Voltage letter → V rating
  const SEMCO_VOLTAGE_CODES = {
    'S': 2.5, 'R': 4.0, 'Q': 6.3, 'P': 10, 'O': 16, 'A': 25, 'L': 35,
    'B': 50,  'T': 75,  'C': 100, 'D': 200, 'E': 250, 'G': 500,
    'H': 630, 'I': 1000, 'J': 2000, 'K': 3000,
  };

  // Tolerance letter → text
  const SEMCO_TOL_CODES = {
    'B': '±0.1 pF', 'C': '±0.25 pF', 'D': '±0.5 pF',
    'F': '±1%',  'G': '±2%',  'J': '±5%', 'K': '±10%',
    'M': '±20%', 'Z': '+80/-20%',
  };

  // Decode the 3-character capacitance code.
  // Standard form: D1 D2 M → (D1·10 + D2) × 10^M pF.
  // R-form: 'R' acts as a decimal point for sub-pF values (1R0 = 1.0 pF, R47 = 0.47 pF).
  function decodeCapCode(threeChars) {
    if (threeChars.length !== 3) throw new Error(`cap code must be 3 chars, got "${threeChars}"`);
    if (threeChars.includes('R')) {
      const pf = parseFloat(threeChars.replace('R', '.'));
      if (!isFinite(pf)) throw new Error(`bad R-form cap code: "${threeChars}"`);
      return pf * 1e-12;
    }
    if (!/^\d{3}$/.test(threeChars)) throw new Error(`cap code must be 3 digits or contain R: "${threeChars}"`);
    const d1 = parseInt(threeChars[0], 10);
    const d2 = parseInt(threeChars[1], 10);
    const m  = parseInt(threeChars[2], 10);
    return (d1 * 10 + d2) * Math.pow(10, m) * 1e-12;
  }

  function parseSemcoCL(pn) {
    if (typeof pn !== 'string') throw new Error(`expected string, got ${typeof pn}`);
    if (!pn.startsWith('CL')) throw new Error(`not a SEMCO CL part: "${pn}"`);
    if (pn.length !== 15) throw new Error(`SEMCO CL part must be 15 chars, got ${pn.length}: "${pn}"`);

    const sizeCode      = pn.substring(2, 4);
    const tccCode       = pn[4];
    const capCode       = pn.substring(5, 8);
    const tolCode       = pn[8];
    const voltCode      = pn[9];
    const thickCode     = pn[10];
    const platingCode   = pn[11];
    const controlCode   = pn[12];
    const reservedCode  = pn[13];
    const packagingCode = pn[14];

    if (!(sizeCode in SEMCO_SIZE_CODES))
      throw new Error(`unknown SEMCO size code "${sizeCode}" in "${pn}"`);
    if (!(tccCode in SEMCO_TCC_CODES))
      throw new Error(`unknown SEMCO TCC code "${tccCode}" in "${pn}"`);
    if (!(voltCode in SEMCO_VOLTAGE_CODES))
      throw new Error(`unknown SEMCO voltage code "${voltCode}" in "${pn}"`);

    const C_F = decodeCapCode(capCode);

    return {
      prefix: 'CL',
      sizeCode, case: SEMCO_SIZE_CODES[sizeCode],
      tccCode,  cls:  SEMCO_TCC_CODES[tccCode],
      capCode,  C_F,  C_uF: C_F * 1e6,
      tolCode,  tol:  SEMCO_TOL_CODES[tolCode] || null,
      voltCode, V:    SEMCO_VOLTAGE_CODES[voltCode],
      thickCode, platingCode, controlCode, reservedCode, packagingCode,
    };
  }


  // Vendor reference parts — for the UI's vendor lookup table and as anchors
  // for the test suite's order-of-magnitude calibration. Mostly Murata/TDK/Samsung
  // standard part numbers. Not exhaustive; covers ~20 common case+class+V+C combos.
  const VENDOR_PARTS = [
    // 0402
    { case: '0402_1005', cls: 'X5R', V: 6.3, C_uF: 1.0,    mfr: 'Samsung', pn: 'CL05A105KQ5NNNC' },
    { case: '0402_1005', cls: 'X7R', V: 16,  C_uF: 0.1,    mfr: 'Samsung', pn: 'CL05B104KO5NNNC' },
    { case: '0402_1005', cls: 'X7R', V: 25,  C_uF: 0.010,  mfr: 'Murata',  pn: 'GRM155R71E103KA' },
    { case: '0402_1005', cls: 'C0G', V: 50,  C_uF: 0.0001, mfr: 'Murata',  pn: 'GRM1555C1H101J' },
    // 0603
    { case: '0603_1608', cls: 'X7R', V: 50,  C_uF: 0.1,    mfr: 'Murata',  pn: 'GRM188R71H104K' },
    { case: '0603_1608', cls: 'X7R', V: 16,  C_uF: 1.0,    mfr: 'Murata',  pn: 'GRM188R71C105K' },
    { case: '0603_1608', cls: 'X5R', V: 6.3, C_uF: 10,     mfr: 'Murata',  pn: 'GRM188R60J106M' },
    { case: '0603_1608', cls: 'C0G', V: 50,  C_uF: 0.0001, mfr: 'Murata',  pn: 'GRM1885C1H101J' },
    { case: '0603_1608', cls: 'C0G', V: 50,  C_uF: 0.001,  mfr: 'Murata',  pn: 'GRM1885C1H102J' },
    // 0805
    { case: '0805_2012', cls: 'X7R', V: 50,  C_uF: 0.47,   mfr: 'Murata',  pn: 'GRM21BR71H474K' },
    { case: '0805_2012', cls: 'X7R', V: 50,  C_uF: 4.7,    mfr: 'Murata',  pn: 'GRM21BR71H475K' },
    { case: '0805_2012', cls: 'X5R', V: 25,  C_uF: 10,     mfr: 'Murata',  pn: 'GRM21BR61E106K' },
    { case: '0805_2012', cls: 'X7R', V: 25,  C_uF: 1.0,    mfr: 'Samsung', pn: 'CL21B105KAFNNNE' },
    { case: '0805_2012', cls: 'X7R', V: 100, C_uF: 1.0,    mfr: 'Murata',  pn: 'GRM21BR72A105K' },
    { case: '0805_2012', cls: 'C0G', V: 100, C_uF: 0.01,   mfr: 'Murata',  pn: 'GRM2165C2A103J' },
    { case: '0805_2012', cls: 'X8R', V: 50,  C_uF: 1.0,    mfr: 'Murata',  pn: 'GCM21BR71H105KA73' },
    // 1206
    { case: '1206_3216', cls: 'X7R', V: 50,  C_uF: 1.0,    mfr: 'Murata',  pn: 'GRM31MR71H105K' },
    { case: '1206_3216', cls: 'X7R', V: 100, C_uF: 0.22,   mfr: 'TDK',     pn: 'C3216X7R2A224K' },
    { case: '1206_3216', cls: 'X7R', V: 50,  C_uF: 10,     mfr: 'Murata',  pn: 'GRM31CR71H106K' },
    { case: '1206_3216', cls: 'X7R', V: 25,  C_uF: 10,     mfr: 'Samsung', pn: 'CL31B106KAHNNNE' },
    { case: '1206_3216', cls: 'X7R', V: 250, C_uF: 0.1,    mfr: 'TDK',     pn: 'C3216X7R2E104K' },
    // 1210
    { case: '1210_3225', cls: 'X5R', V: 25,  C_uF: 22,     mfr: 'Murata',  pn: 'GRM32ER61E226M' },
    { case: '1210_3225', cls: 'X7R', V: 100, C_uF: 10,     mfr: 'TDK',     pn: 'C3225X7R2A106K' },
    // 1812 / 2220 — HV / bulk
    { case: '1812_4532', cls: 'X7R', V: 50,  C_uF: 4.7,    mfr: 'TDK',     pn: 'C4532X7R1H475K' },
    { case: '2220_5750', cls: 'X7R', V: 50,  C_uF: 22,     mfr: 'Murata',  pn: 'GRM55ER71H226K' },
  ];

  // ============================================================
  // Pure functions
  // ============================================================

  // Class II TCC ranges: asymmetric span from 25 °C to each spec endpoint.
  // The function hits the ±15 % limit at exactly the spec boundary.
  const TCC_RANGES = {
    'X5R': { plus: 60,  minus: 80 },   // [-55, +85]   → ΔT_max = 60 up, 80 down
    'X7R': { plus: 100, minus: 80 },   // [-55, +125]
    'X8R': { plus: 125, minus: 80 },   // [-55, +150]
  };

  function tccFactor(cls, T) {
    const dT = T - 25;
    if (cls === 'C0G') return 1 + 30e-6 * dT;
    if (cls === 'Y5V') {
      if (dT < 0) return 1 + 0.22 * Math.max(-1, dT / 55);  // -30 °C → -22 %
      return 1 - 0.82 * Math.min(1, dT / 60);               // +85 °C → -82 %
    }
    const r = TCC_RANGES[cls];
    if (!r) return 1;
    const span = dT >= 0 ? r.plus : r.minus;
    return 1 - 0.15 * Math.min(1, Math.abs(dT) / span);
  }

  function dcBiasFactor(cls, E_V_per_um) {
    const p = DCBIAS[cls] || DCBIAS['X7R'];
    return 1 / (1 + Math.pow(E_V_per_um / p.E0, p.p));
  }

  // Main estimator. Returns derived values + warnings array.
  function compute(inp) {
    const c   = CASES.find(x => x.id === inp.case);
    const cls = CLASSES.find(x => x.id === inp.cls);
    if (!c)   throw new Error(`Unknown case id: ${inp.case}`);
    if (!cls) throw new Error(`Unknown class id: ${inp.cls}`);

    // Margins: use per-call overrides if supplied (UI sliders), else the
    // case-default size-scaled values from CASES.
    const em = inp.em != null ? inp.em : c.em;
    const sm = inp.sm != null ? inp.sm : c.sm;
    // Thickness tolerance shifts the buildable height ceiling: at the default
    // Ttol the ceiling equals the nominal Hmax; a looser spec raises it.
    const TtolUsed = inp.Ttol != null ? inp.Ttol : (c.Ttol || 0);
    const Hmax_eff = c.Hmax + (TtolUsed - (c.Ttol || 0));

    // Geometry — two equivalent parameterizations. Shrinkage (s) applies to
    // BOTH the in-plane print pattern and the thickness: the printed (green)
    // electrode shrinks in x-y during sintering, just as the green tape shrinks
    // in z. (Tier-1 treats shrinkage as isotropic; constrained-sintering makes
    // the in-plane component slightly smaller than thickness — see
    // wiki/concepts/constrained-sintering-mlcc.md.)
    //   PATTERN mode: caller supplies the AS-PRINTED (green) overlap; it shrinks
    //     to fired = green·(1−s). Margins are treated as final (fired) keep-outs.
    //     Chip footprint (fired) = overlap_fired + 2·margin.
    //   CASE mode (fallback): no overlap supplied → the fired overlap is the
    //     case L,W minus margins (case dims are datasheet/fired). Unchanged, so
    //     the calibration/known-parts path and all tests are byte-identical.
    const s = inp.sTotal;
    let overlapL_fired_um, overlapW_fired_um, overlapL_green_um, overlapW_green_um;
    if (inp.overlapL != null && inp.overlapW != null) {
      overlapL_green_um = inp.overlapL;
      overlapW_green_um = inp.overlapW;
      overlapL_fired_um = overlapL_green_um * (1 - s);
      overlapW_fired_um = overlapW_green_um * (1 - s);
    } else {
      overlapL_fired_um = c.L - 2 * em;
      overlapW_fired_um = c.W - 2 * sm;
      overlapL_green_um = overlapL_fired_um / (1 - s);   // implied green pattern
      overlapW_green_um = overlapW_fired_um / (1 - s);
    }
    const L_chip_um = overlapL_fired_um + 2 * em;   // fired chip footprint
    const W_chip_um = overlapW_fired_um + 2 * sm;

    const A_overlap_um2 = overlapL_fired_um * overlapW_fired_um;   // fired area
    // Coverage is now an OPTIONAL de-rating. The overlap (above) is the primary,
    // default geometry input — when it is the real active-electrode overlap, the
    // active area is fully accounted for and coverage = 1.0 (no extra haircut).
    // Supply coverage < 1 only to model extra print-fidelity / partial-fill loss
    // on top of `disc`. Omitted → 1.0.
    const coverage      = inp.coverage != null ? inp.coverage : 1.0;
    const A_eff_um2     = A_overlap_um2 * coverage * (1 - inp.disc);
    const d_fired_um    = inp.hBT * (1 - s);
    const hNi_fired_um  = inp.hNi * (1 - s);
    const H_active_um   = inp.Ne * (d_fired_um + hNi_fired_um);
    const H_stack_um    = H_active_um + 2 * inp.cover;

    const A_eff_m2    = A_eff_um2 * 1e-12;
    const d_fired_m   = d_fired_um * 1e-6;
    const C_nominal_F = cls.er * EPS0 * A_eff_m2 * inp.Ne / d_fired_m;

    const E_applied   = inp.vdc / d_fired_um;
    const f_T         = tccFactor(inp.cls, inp.top);
    const f_V         = dcBiasFactor(inp.cls, E_applied);
    const C_derated_F = inp.tier2 ? (C_nominal_F * f_T * f_V) : C_nominal_F;

    const chip_vol_mm3 = (L_chip_um / 1000) * (W_chip_um / 1000) * (H_stack_um / 1000);
    const vol_density  = (C_derated_F * 1e6) / chip_vol_mm3;

    const warnings = [];
    // Pattern footprint vs the selected case TOLERANCE band [nominal ± tol].
    // Real parts run oversized within tolerance, so the ceiling is the MAX
    // (nominal + tol), not the nominal value.
    const Ltol = inp.Ltol != null ? inp.Ltol : (c.Ltol || 0);
    const Wtol = inp.Wtol != null ? inp.Wtol : (c.Wtol || 0);
    const Lmax = c.L + Ltol, Wmax = c.W + Wtol, Lmin = c.L - Ltol, Wmin = c.W - Wtol;
    if (L_chip_um > Lmax + 1 || W_chip_um > Wmax + 1) {
      warnings.push({ level: 'error', code: 'PATTERN_OVER',
        msg: `Pattern footprint ${(L_chip_um/1000).toFixed(2)} × ${(W_chip_um/1000).toFixed(2)} mm exceeds the ${c.label.split('(')[0].trim()} max tolerance ${(Lmax/1000).toFixed(2)} × ${(Wmax/1000).toFixed(2)} mm. Shrink the overlap or margins.` });
    } else if (L_chip_um < Lmin - 1 || W_chip_um < Wmin - 1) {
      warnings.push({ level: 'info', code: 'PATTERN_UNDER',
        msg: `Pattern footprint ${(L_chip_um/1000).toFixed(2)} × ${(W_chip_um/1000).toFixed(2)} mm is below the ${c.label.split('(')[0].trim()} min ${(Lmin/1000).toFixed(2)} × ${(Wmin/1000).toFixed(2)} mm — wasted area; enlarge the overlap.` });
    }
    if (H_stack_um > Hmax_eff) {
      warnings.push({ level: 'error', code: 'H_OVER',
        msg: `Stack H = ${(H_stack_um/1000).toFixed(2)} mm exceeds H_max ${(Hmax_eff/1000).toFixed(2)} mm for ${c.label.split('(')[0].trim()}. Reduce N_e, h_BT, h_Ni, or cover.` });
    }
    if (d_fired_um < 0.3) {
      warnings.push({ level: 'warn', code: 'D_GRAIN_FLOOR',
        msg: `d_fired = ${d_fired_um.toFixed(2)} µm is below ~0.3 µm grain-size floor — reliability degrades sharply (see core-shell-batio3).` });
    }
    if (hNi_fired_um < 0.3) {
      warnings.push({ level: 'warn', code: 'NI_PARTICLE_FLOOR',
        msg: `h_Ni fired = ${hNi_fired_um.toFixed(2)} µm is near the 3-particle floor (~0.3 µm for 100 nm Ni) — electrode discontinuity will be high.` });
    }
    const ratio = inp.hNi / inp.hBT;
    if (ratio < 0.3) {
      warnings.push({ level: 'info', code: 'THIN_NI',
        msg: `h_Ni/h_BT = ${ratio.toFixed(2)} (thin-electrode regime) — weak in-plane constraint; near-isotropic shrinkage.` });
    }
    if (ratio > 2.0) {
      warnings.push({ level: 'info', code: 'THICK_NI',
        msg: `h_Ni/h_BT = ${ratio.toFixed(2)} (electrode-dominated) — metal volume fraction high; check stack stiffness assumptions.` });
    }

    return {
      caseRec: c, clsRec: cls, em, sm, Hmax_eff,
      overlapL_fired_um, overlapW_fired_um, overlapL_green_um, overlapW_green_um,
      L_chip_um, W_chip_um,
      A_overlap_um2, A_eff_um2, d_fired_um, hNi_fired_um, H_active_um, H_stack_um,
      C_nominal_F, C_derated_F, f_T, f_V, E_applied,
      chip_vol_mm3, vol_density, warnings,
    };
  }

  // ============================================================
  // Formatting helpers (used by both UI and tests)
  // ============================================================

  function fmtCap(C) {
    if (!isFinite(C) || C <= 0) return '—';
    if (C >= 1e-6)  return (C / 1e-6).toPrecision(3) + ' µF';
    if (C >= 1e-9)  return (C / 1e-9).toPrecision(3) + ' nF';
    if (C >= 1e-12) return (C / 1e-12).toPrecision(3) + ' pF';
    return C.toExponential(2) + ' F';
  }

  function fmt(x, dec, suf) {
    if (dec === undefined) dec = 2;
    if (suf === undefined) suf = '';
    return (isFinite(x) ? x.toFixed(dec) : '—') + suf;
  }

  // Default-input factory: handy for tests and the UI's reset action.
  // Calibrated 2026-05-28 to match modern thin-layer vendor parts. Old defaults
  // (cover=40, coverage=0.85, disc=0.20) were pessimistic vs current production
  // margins; updated to match the vendor lineup.
  //
  // Geometry is OVERLAP-primary: with no overlapL/overlapW the fired overlap is
  // derived from the case (case − 2·margin), so switching `case` re-scales the
  // active area automatically. `coverage` is OPTIONAL and omitted here → it
  // defaults to 1.0 in compute() (the overlap is the active area); add it back
  // only to model extra print-fidelity loss.
  function defaultInputs() {
    return {
      case: '0805_2012',
      cls:  'X7R',
      hBT:  2.0,
      hNi:  1.0,
      Ne:   300,
      cover:    60,
      sTotal:   0.14,
      disc:     0.15,
      tier2:    true,
      vdc:      0,
      top:      25,
    };
  }

  // ============================================================
  // Known-geometry MLCCs — academic / NASA disclosures
  // ============================================================
  //
  // These parts have publicly-disclosed FULL recipe (dielectric thickness,
  // electrode thickness, layer count, grain size) — extracted from academic
  // papers and NASA technical reports. Manufacturers are often anonymized
  // (A/B/C/P) in the original sources.
  //
  // Use these for forward-direction calibration: given the disclosed recipe,
  // does compute() produce a capacitance close to the rated value?
  //
  // Source key:
  //   liu-carts2014       — NASA Liu CARTS 2014, Table III (24 commercial samples)
  //   polotai-2007        — Penn State 0805 thin-layer demo
  //   yoon-2020-jmcc      — research X7R model MLCC
  //   song-2017-screp     — compositionally graded BTS-BCN MLCC
  //   yan-thesis-2013     — SEMCO 1206/0603 production parts
  //
  // d_fired and h_Ni are FIRED dimensions in µm. C_rated is the cap a part of
  // these specs would carry on a datasheet (decoded from the original part ID).

  // Grain-size permittivity curve — replaces the earlier per-vendor ε_r lookup.
  //
  // WHY: the old VENDOR_ER_X7R lookup (A/B/C/P → ε_r) was overfit — 4 free
  // parameters fit to the same 24 Liu samples it was scored on, and it could
  // never be applied to a real part (you don't know which anonymous band a
  // Murata/TDK/Samsung part falls in). Diagnostic analysis showed the vendor
  // bands were really a proxy for GRAIN SIZE: corr(grain, implied-ε_r) = 0.755,
  // R² = 0.57. The "Mfr P → ε_r 9000" patch was just coarse 0.77 µm grain
  // sitting on the rising limb of the BaTiO₃ grain-size ε_r curve.
  //
  // This curve is a least-squares fit of implied-ε_r vs grain over the 24 Liu
  // X7R parts (excluding the A08X47416 transcription outlier), recomputed after
  // the 2026-05-29 size-scaled margin update:
  //     ε_r,X7R(g) ≈ clamp(−681 + 10467·g_µm, 2000, 9000)
  // Solving ε_r = 3000 gives g ≈ 0.35 µm — consistent with the modern
  // thin-layer X7R grain used for the class default. See
  // wiki/concepts/nano-grain-batio3-epsilon-r.md.
  //
  // It is a RISING-limb fit only (data spans 0.22–0.79 µm). Beyond ~0.9 µm the
  // real curve peaks then declines toward bulk; we clamp at 9000 rather than
  // extrapolate. Grain is unknown for most real parts → callers fall back to
  // the class-default ε_r, which is honest (no per-vendor magic).
  function erGrain(cls, grain_um) {
    const base = CLASSES.find(c => c.id === cls).er;
    if (cls === 'C0G') return base;          // paraelectric — grain-independent
    if (grain_um == null) return base;        // no grain info → class default
    const erX7R = Math.max(2000, Math.min(9000, -681 + 10467 * grain_um));
    const X7R_DEFAULT = 3000;                 // CLASSES X7R.er
    return erX7R * base / X7R_DEFAULT;         // scale other classes by their ratio
  }

  const KNOWN_PARTS = [
    // ===== Liu CARTS 2014 Table III — 24 commercial samples =====
    // ID format: <mfr><case><class><cap><V>
    { id: 'A08X22525', src: 'liu-carts2014', vendor: 'A', case: '0805_2012', cls: 'X7R', V: 25,  C_uF: 2.2,    d_fired_um: 3.89,  h_Ni_fired_um: 1.0, N_a: 211, grain_um: 0.305, halt: 'fail' },
    { id: 'B08X33425', src: 'liu-carts2014', vendor: 'B', case: '0805_2012', cls: 'X7R', V: 25,  C_uF: 0.33,   d_fired_um: 5.80,  h_Ni_fired_um: 1.0, N_a: 74,  grain_um: 0.420, halt: 'pass' },
    { id: 'A08X15425', src: 'liu-carts2014', vendor: 'A', case: '0805_2012', cls: 'X7R', V: 25,  C_uF: 0.15,   d_fired_um: 9.80,  h_Ni_fired_um: 1.0, N_a: 43,  grain_um: 0.460, halt: 'pass' },
    { id: 'C06X10525', src: 'liu-carts2014', vendor: 'C', case: '0603_1608', cls: 'X7R', V: 25,  C_uF: 1.0,    d_fired_um: 3.20,  h_Ni_fired_um: 1.0, N_a: 150, grain_um: 0.440, halt: 'fail' },
    { id: 'A06X10425', src: 'liu-carts2014', vendor: 'A', case: '0603_1608', cls: 'X7R', V: 25,  C_uF: 0.1,    d_fired_um: 7.89,  h_Ni_fired_um: 1.0, N_a: 62,  grain_um: 0.470, halt: 'pass' },
    { id: 'A12X47425', src: 'liu-carts2014', vendor: 'A', case: '1206_3216', cls: 'X7R', V: 25,  C_uF: 0.47,   d_fired_um: 10.40, h_Ni_fired_um: 1.0, N_a: 58,  grain_um: 0.492, halt: 'pass' },
    { id: 'C04X47325', src: 'liu-carts2014', vendor: 'C', case: '0402_1005', cls: 'X7R', V: 25,  C_uF: 0.047,  d_fired_um: 4.40,  h_Ni_fired_um: 1.0, N_a: 60,  grain_um: 0.386, halt: 'fail' },
    { id: 'B12X47525', src: 'liu-carts2014', vendor: 'B', case: '1206_3216', cls: 'X7R', V: 25,  C_uF: 4.7,    d_fired_um: 4.34,  h_Ni_fired_um: 1.0, N_a: 260, grain_um: 0.376, halt: 'fail' },
    { id: 'P08X10425', src: 'liu-carts2014', vendor: 'P', case: '0805_2012', cls: 'X7R', V: 25,  C_uF: 0.1,    d_fired_um: 20.20, h_Ni_fired_um: 1.0, N_a: 23,  grain_um: 0.790, halt: 'pass' },
    { id: 'B06X10516', src: 'liu-carts2014', vendor: 'B', case: '0603_1608', cls: 'X7R', V: 16,  C_uF: 1.0,    d_fired_um: 2.29,  h_Ni_fired_um: 1.0, N_a: 179, grain_um: 0.273, halt: 'fail' },
    { id: 'A08X47416', src: 'liu-carts2014', vendor: 'A', case: '0805_2012', cls: 'X7R', V: 16,  C_uF: 0.47,   d_fired_um: 3.75,  h_Ni_fired_um: 1.0, N_a: 208, grain_um: 0.319, halt: 'fail', note: 'Outlier — predicted 3× rated; likely transcription error in original table.' },
    { id: 'B12X68416', src: 'liu-carts2014', vendor: 'B', case: '1206_3216', cls: 'X7R', V: 16,  C_uF: 0.68,   d_fired_um: 6.21,  h_Ni_fired_um: 1.0, N_a: 64,  grain_um: 0.375, halt: 'pass' },
    { id: 'C08X22516', src: 'liu-carts2014', vendor: 'C', case: '0805_2012', cls: 'X7R', V: 16,  C_uF: 2.2,    d_fired_um: 3.81,  h_Ni_fired_um: 1.0, N_a: 212, grain_um: 0.224, halt: 'pass' },
    { id: 'B08X22516', src: 'liu-carts2014', vendor: 'B', case: '0805_2012', cls: 'X7R', V: 16,  C_uF: 2.2,    d_fired_um: 3.23,  h_Ni_fired_um: 1.0, N_a: 230, grain_um: 0.340, halt: 'fail' },
    { id: 'B08X56416', src: 'liu-carts2014', vendor: 'B', case: '0805_2012', cls: 'X7R', V: 16,  C_uF: 0.56,   d_fired_um: 4.21,  h_Ni_fired_um: 1.0, N_a: 80,  grain_um: 0.373, halt: 'pass' },
    { id: 'C08X47516', src: 'liu-carts2014', vendor: 'C', case: '0805_2012', cls: 'X7R', V: 16,  C_uF: 4.7,    d_fired_um: 2.49,  h_Ni_fired_um: 1.0, N_a: 260, grain_um: 0.230, halt: 'pass' },
    { id: 'B12X10516', src: 'liu-carts2014', vendor: 'B', case: '1206_3216', cls: 'X7R', V: 16,  C_uF: 1.0,    d_fired_um: 7.82,  h_Ni_fired_um: 1.0, N_a: 99,  grain_um: 0.475, halt: 'pass' },
    { id: 'B04X10416', src: 'liu-carts2014', vendor: 'B', case: '0402_1005', cls: 'X7R', V: 16,  C_uF: 0.1,    d_fired_um: 3.05,  h_Ni_fired_um: 1.0, N_a: 67,  grain_um: 0.342, halt: 'fail' },
    { id: 'B12X10606', src: 'liu-carts2014', vendor: 'B', case: '1206_3216', cls: 'X7R', V: 6.3, C_uF: 10,     d_fired_um: 3.11,  h_Ni_fired_um: 1.0, N_a: 348, grain_um: 0.365, halt: 'fail' },
    { id: 'B04X10406', src: 'liu-carts2014', vendor: 'B', case: '0402_1005', cls: 'X7R', V: 6.3, C_uF: 0.1,    d_fired_um: 2.50,  h_Ni_fired_um: 1.0, N_a: 70,  grain_um: 0.323, halt: 'fail' },
    { id: 'B08X22506', src: 'liu-carts2014', vendor: 'B', case: '0805_2012', cls: 'X7R', V: 6.3, C_uF: 2.2,    d_fired_um: 3.42,  h_Ni_fired_um: 1.0, N_a: 230, grain_um: 0.419, halt: 'fail' },
    { id: 'A08X10406', src: 'liu-carts2014', vendor: 'A', case: '0805_2012', cls: 'X7R', V: 6.3, C_uF: 0.1,    d_fired_um: 12.50, h_Ni_fired_um: 1.0, N_a: 34,  grain_um: 0.490, halt: 'pass' },
    { id: 'B06X22406', src: 'liu-carts2014', vendor: 'B', case: '0603_1608', cls: 'X7R', V: 6.3, C_uF: 0.22,   d_fired_um: 4.01,  h_Ni_fired_um: 1.0, N_a: 67,  grain_um: 0.373, halt: 'pass' },
    { id: 'P06X10405', src: 'liu-carts2014', vendor: 'P', case: '0603_1608', cls: 'X7R', V: 50,  C_uF: 0.1,    d_fired_um: 12.60, h_Ni_fired_um: 1.0, N_a: 24,  grain_um: 0.770, halt: 'pass' },

    // ===== Chun et al. 2024 Sci. Rep. — 3 SEMCO X7R prototypes =====
    // Citation: Chun, Heo, Lee, Ye, Kang, Yoon (2024) Sci. Rep. 14, 616
    // DOI: 10.1038/s41598-024-51254-w
    // N_a not disclosed; predicted from disclosed C, d, A using class-default ε_r.
    { id: 'chun-2024-S1', src: 'chun-2024-screp', vendor: 'SEMCO', case: '0805_2012', cls: 'X7R', V: 50, C_uF: 4.7,  d_fired_um: 4.2, h_Ni_fired_um: 1.0, N_a: null, note: 'SEMCO modern rare-earth-doped X7R; layer count not disclosed.' },
    { id: 'chun-2024-S2', src: 'chun-2024-screp', vendor: 'SEMCO', case: '0402_1005', cls: 'X7R', V: 25, C_uF: 0.22, d_fired_um: 4.5, h_Ni_fired_um: 1.0, N_a: null },
    { id: 'chun-2024-S3', src: 'chun-2024-screp', vendor: 'SEMCO', case: '0805_2012', cls: 'X7R', V: 25, C_uF: 10,   d_fired_um: 3.2, h_Ni_fired_um: 1.0, N_a: null },

    // ===== Hernandez-Lopez et al. 2018 (Materials) — KEMET HV X7R =====
    // Citation: Hernandez-Lopez et al. (2018) Materials 11(10), 1900
    // DOI: 10.3390/ma11101900
    // 1.8 × 0.8 × 0.8 mm chip is closest to 0603 (1.6 × 0.8); rated V inferred from
    // d_fired = 7.5 µm and HALT 400-600 V → V_rated ≈ 200 V.
    { id: 'hernandez-2018-mlcc1', src: 'hernandez-2018', vendor: 'KEMET', case: '0603_1608', cls: 'X7R', V: 200, C_uF: 0.1, d_fired_um: 7.5, h_Ni_fired_um: 1.0, N_a: 68, grain_um: null, note: 'KEMET HV 0603-class; Y 1.05 wt% Ca <0.01 mol% (MLCC-1).' },
    { id: 'hernandez-2018-mlcc2', src: 'hernandez-2018', vendor: 'KEMET', case: '0603_1608', cls: 'X7R', V: 200, C_uF: 0.1, d_fired_um: 7.5, h_Ni_fired_um: 1.0, N_a: 68, grain_um: null, note: 'Same as MLCC-1 but Ca ≈ 2.8 mol% (MLCC-2).' },
    { id: 'hernandez-2018-mlcc3', src: 'hernandez-2018', vendor: 'KEMET', case: '0603_1608', cls: 'X7R', V: 200, C_uF: 0.1, d_fired_um: 7.5, h_Ni_fired_um: 1.0, N_a: 68, grain_um: null, note: 'Same as MLCC-1 but Ca ≈ 8.1 mol% (MLCC-3).' },

    // ===== Penn State demo =====
    { id: 'polotai-0805-thin', src: 'polotai-2007', case: '0805_2012', cls: 'X7R', V: 16, C_uF: null,
      d_fired_um: 1.0, h_Ni_fired_um: 1.0, N_a: 300, grain_um: null,
      note: 'Penn State / Randall group thin-layer demonstrator; rated C not disclosed.' },

    // ===== Yoon, Kim, Kim 2020 research X7R =====
    { id: 'yoon-2020-x7r', src: 'yoon-2020-jmcc', case: '0805_2012', cls: 'X7R', V: 50, C_uF: null,
      d_fired_um: 7.7, h_Ni_fired_um: 1.0, N_a: 10, grain_um: 0.28,
      note: 'Research model MLCC for grain-size vs c/a study; rated C not stated.' },

    // ===== Song 2017 compositionally graded =====
    // Custom case (4.5×4×2 mm); place in 1812 with active-area override
    { id: 'song-2017-graded', src: 'song-2017-screp', case: '1812_4532', cls: 'X7R', V: 200, C_uF: 0.348,
      d_fired_um: 40, h_Ni_fired_um: 3, N_a: 48, grain_um: null,
      A_eff_override_mm2: 16, er_override: 2050,
      note: 'BTS-BCN graded composition; non-standard 4×4 mm² active area; ε_r ≈ 2050 back-fit.' },

    // ===== Yan thesis 2013 SEMCO (N_a not disclosed) =====
    { id: 'yan-semco-1206', src: 'yan-thesis-2013', case: '1206_3216', cls: 'X7R', V: 50, C_uF: null,
      d_fired_um: 2.5, h_Ni_fired_um: 1.2, N_a: null, grain_um: null,
      note: 'Samsung production MLCC, cross-sectioned. N_e not disclosed.' },
    { id: 'yan-semco-0603', src: 'yan-thesis-2013', case: '0603_1608', cls: 'X7R', V: 25, C_uF: null,
      d_fired_um: 2.5, h_Ni_fired_um: 1.2, N_a: null, grain_um: null,
      note: 'Samsung production MLCC, same study, smaller case.' },
  ];

  // Resolve the ε_r to use for a KNOWN_PARTS entry. Priority:
  //   1. k.er_override — explicit per-part override (e.g., Song 2017 BTS-BCN back-fit)
  //   2. erGrain(cls, grain_um) — physics curve when grain size is disclosed
  //   3. CLASSES default for k.cls (when grain unknown — the honest fallback)
  function erForKnown(k) {
    if (k.er_override != null) return k.er_override;
    return erGrain(k.cls, k.grain_um);
  }

  // Forward-compute the predicted C for a KNOWN_PARTS entry using its disclosed recipe.
  // Returns null if N_a is not disclosed.
  function computeFromKnown(k) {
    if (k.N_a == null) return null;

    const sTotal = 0.14;
    const h_BT_green = k.d_fired_um / (1 - sTotal);
    const h_Ni_green = k.h_Ni_fired_um / (1 - sTotal);
    const er = erForKnown(k);

    if (k.A_eff_override_mm2 != null) {
      // Non-standard active area
      const A_eff_m2 = k.A_eff_override_mm2 * 1e-6;
      const d_fired_m = k.d_fired_um * 1e-6;
      const C_F = er * EPS0 * A_eff_m2 * k.N_a / d_fired_m;
      return { C_pred_F: C_F, C_pred_uF: C_F * 1e6, er_used: er, override: true };
    }

    const r = compute({
      case: k.case, cls: k.cls,
      hBT: h_BT_green, hNi: h_Ni_green, Ne: k.N_a,
      cover: 60, coverage: 0.90, sTotal: sTotal, disc: 0.15,
      tier2: false, vdc: 0, top: 25,
    });
    // Apply ε_r override if different from the class default
    const stockEr = CLASSES.find(x => x.id === k.cls).er;
    const C_pred_F = r.C_nominal_F * er / stockEr;
    return { C_pred_F, C_pred_uF: C_pred_F * 1e6, er_used: er };
  }

  // ============================================================
  // Inverse predictor (solveRecipe): given specs, derive the recipe
  // ============================================================
  //
  // The forward compute() needs (h_BT, h_Ni, N_e, ...) — a recipe that's
  // not publicly known for any vendor part. solveRecipe inverts that:
  // given the four publicly available specs (case, class, V_rated, C_target)
  // it derives a physically-feasible recipe using MLCC engineering rules.
  //
  //   d_fired = V_rated / E_design     # voltage-derate rule per class
  //   h_Ni    = max(0.5, 0.7 · d_fired) # Ni-paste manufacturability floor
  //   N_e     = C_target · d_fired / (ε_r · ε_0 · A_eff)   # back-solve
  //   capped at N_e_max = (H_max - 2·cover) / (d_fired + h_Ni_fired)
  //
  // Returns the recipe + a feasibility verdict.

  // E_design (V/µm) — design rule for dielectric voltage-to-thickness scaling.
  // Empirically calibrated against the 25-part vendor lineup so that
  // back-solved N_e values land in the 1-500 range with H_stack < 50 % of H_max.
  function eDesign(cls, V_rated) {
    let E;
    if      (V_rated <= 6.3) E = 10;
    else if (V_rated <= 16)  E = 18;
    else if (V_rated <= 25)  E = 25;
    else if (V_rated <= 50)  E = 28;
    else if (V_rated <= 100) E = 33;
    else                     E = 35;
    if (cls === 'C0G') E *= 1.2; // Class I has higher intrinsic breakdown
    return E;
  }

  function dFiredFromV(cls, V_rated) {
    return Math.max(0.5, V_rated / eDesign(cls, V_rated));
  }

  function hNiFromD(cls, d_fired) {
    return Math.max(0.5, 0.7 * d_fired);
  }

  // ── Manufacturing limits for the absolute capacitance envelope ──
  // The thinnest fired dielectric is set NOT by voltage but by the powder /
  // tape-casting / grains-per-layer floor (see
  // wiki/concepts/dielectric-layer-thickness-floor.md):
  //   • reliability needs ≥ 3 grains across a layer;
  //   • production BaTiO₃ grain is ~100 nm and tape casting can't reliably cast
  //     finer without the slurry rheology collapsing (finer powder → more
  //     surface area → more binder → lower solid loading → defects);
  //   → fired-d frontier ≈ 0.25 µm (KYOCERA 2023-class), mainstream ≈ 0.4–0.5 µm.
  // Below ~0.3 µm requires deposition beyond tape casting; 0.15–0.2 µm is NOT
  // reachable in a volume MLCC.
  const D_FLOOR_FRONTIER = 0.25;  // µm — absolute bleeding-edge fired dielectric
  const E_MAX_FIELD = 30;          // V/µm — aggressive max-CV working field

  // Absolute capacitance envelope — the MOST capacitance physically achievable
  // in a case/class/V using best-in-class construction: dielectric thinned to
  // the frontier floor (or the breakdown-field limit, whichever is thicker),
  // tight SIZE-SCALED margins, thin electrodes, high coverage. This is the
  // honest "can a part with this spec exist?" ceiling.
  //
  // Distinct from predictCMax() below, which reports the ceiling at a TYPICAL
  // (conservative) design point and is what solveRecipe() builds against.
  function cmaxEnvelope(spec) {
    const c   = CASES.find(x => x.id === spec.case);
    const cls = CLASSES.find(x => x.id === spec.cls);
    if (!c)   throw new Error(`Unknown case id: ${spec.case}`);
    if (!cls) throw new Error(`Unknown class id: ${spec.cls}`);

    // Thinnest manufacturable fired dielectric at rated V.
    const d_fired_um = Math.max(D_FLOOR_FRONTIER, spec.V / E_MAX_FIELD);
    const h_Ni_fired = Math.max(0.30, 0.6 * d_fired_um);   // thin frontier electrode
    // Build to the MAX footprint (nominal + dimensional tolerance): a high-CV
    // part legitimately ships oversized to capture the extra electrode area.
    // Tolerance can be overridden per-call (UI), else uses the case default.
    const Ltol = spec.Ltol != null ? spec.Ltol : (c.Ltol || 0);
    const Wtol = spec.Wtol != null ? spec.Wtol : (c.Wtol || 0);
    const Lmax = c.L + Ltol, Wmax = c.W + Wtol;
    // Build to the max thickness too (Ttol shifts the height ceiling).
    const TtolUsed = spec.Ttol != null ? spec.Ttol : (c.Ttol || 0);
    const Hmax_eff = c.Hmax + (TtolUsed - (c.Ttol || 0));
    // Tight margins that SCALE with case size (the bug fix): constants like the
    // CASES em/sm consume a tiny 0201 but are fine on an 0805.
    const em = Math.max(35, 0.06 * Lmax);
    const sm = Math.max(25, 0.06 * Wmax);
    const coverage = 0.92, disc = 0.08, cover = 40;

    const A_eff_um2 = (Lmax - 2 * em) * (Wmax - 2 * sm) * coverage * (1 - disc);
    const N_e_max   = Math.floor((Hmax_eff - 2 * cover) / (d_fired_um + h_Ni_fired));
    const C_max_F   = cls.er * EPS0 * A_eff_um2 * 1e-12 * N_e_max / (d_fired_um * 1e-6);

    return {
      caseRec: c, clsRec: cls,
      d_fired_um, h_Ni_fired, em, sm, N_e_max,
      A_eff_um2, C_max_F, C_max_uF: C_max_F * 1e6,
    };
  }

  // Given (case, class, V_rated), forward-predict C_max at the part's TYPICAL
  // design point (conservative per-case margins + eDesign dielectric thickness).
  // For the absolute "best achievable" ceiling use cmaxEnvelope() instead.
  function predictCMax(spec) {
    const c   = CASES.find(x => x.id === spec.case);
    const cls = CLASSES.find(x => x.id === spec.cls);
    if (!c)   throw new Error(`Unknown case id: ${spec.case}`);
    if (!cls) throw new Error(`Unknown class id: ${spec.cls}`);

    const d_fired_um = dFiredFromV(spec.cls, spec.V);
    const h_Ni_um    = hNiFromD(spec.cls, d_fired_um);
    const sTotal     = spec.sTotal     != null ? spec.sTotal   : 0.14;
    const coverage   = spec.coverage   != null ? spec.coverage : 0.90;
    const disc       = spec.disc       != null ? spec.disc     : 0.15;
    const cover      = spec.cover      != null ? spec.cover    : 60;

    const h_Ni_fired = h_Ni_um * (1 - sTotal);
    const A_overlap_um2 = (c.L - 2 * c.em) * (c.W - 2 * c.sm);
    const A_eff_um2     = A_overlap_um2 * coverage * (1 - disc);
    const A_eff_m2      = A_eff_um2 * 1e-12;

    const H_active_max = c.Hmax - 2 * cover;
    const layer_pitch  = d_fired_um + h_Ni_fired;
    const N_e_max      = Math.floor(H_active_max / layer_pitch);

    const d_fired_m = d_fired_um * 1e-6;
    const C_max_F   = cls.er * EPS0 * A_eff_m2 * N_e_max / d_fired_m;

    return {
      caseRec: c, clsRec: cls,
      d_fired_um, h_Ni_um, h_BT_green: d_fired_um / (1 - sTotal),
      N_e_max, layer_pitch, C_max_F, C_max_uF: C_max_F * 1e6,
      A_eff_um2,
    };
  }

  // ============================================================
  // Grade-aware design suggester (suggestDesign / solveRecipe)
  // ============================================================
  //
  // Design-rule grades grounded in the wiki ingest:
  //   • commercial — consumer high-CV, thin-layer frontier
  //       (dielectric-layer-thickness-floor: fired-d → ~0.25 µm)
  //   • automotive — AEC-Q200, robust margins 100–125 µm
  //       (avx-automotive-mlcc-kam-kaf, mlcc-margin-cover-design-rules)
  //   • space — NASA S-311-P-838 / MIL-PRF-32535: spec-min fired d, ≤300 layers,
  //       voltage-scaled margins (gsfc-mlcc-space-specs, mil-prf-32535-spec)
  //
  // Each grade fixes the design point; suggestDesign() back-solves the layer
  // count for a target C and reports a feasibility BAND (typical → frontier).
  const GRADES = {
    commercial: { label: 'commercial (consumer high-CV, thin-layer)', eField: 30, dFloor: 0.25, eRatio: 0.6, coverage: 0.92, disc: 0.08, cover: 40, Nmax: 1000, gpl: 3,  emK: 0.06, smK: 0.06, emFloor: 35,  smFloor: 25 },
    automotive: { label: 'automotive (AEC-Q200, robust margins)',     eField: 22, dFloor: 0.45, eRatio: 0.7, coverage: 0.90, disc: 0.12, cover: 60, Nmax: 600,  gpl: 4,  emK: 0.10, smK: 0.10, emFloor: 100, smFloor: 100 },
    space:      { label: 'space (NASA S-311-P-838 / MIL-PRF-32535)',              eRatio: 0.7, coverage: 0.85, disc: 0.15, cover: 75, Nmax: 300,  gpl: 12, specMinD: true, milMargin: true },
  };

  // Minimum fired dielectric thickness (µm) the grade allows at rated V.
  function gradeDMin(g, V) {
    if (g.specMinD) { if (V <= 25) return 7.1; if (V <= 50) return 8.4; return 15.2; } // S-311-P-838
    return Math.max(g.dFloor, V / g.eField);    // manufacturing floor vs breakdown-field
  }
  // Minimum margin (µm). MIL grades are voltage-scaled; others scale with the dimension.
  function gradeMargin(g, V, dim, which) {
    if (g.milMargin) {                          // MIL-PRF-32535 Tables VIII (side) / IX (end)
      if (which === 'side') { if (V <= 6.3) return 15; if (V <= 16) return 20; if (V <= 25) return 25; if (V <= 50) return 40; return 50; }
      if (V <= 6.3) return 25; if (V <= 16) return 36; if (V <= 25) return 40; if (V <= 50) return 50; return 75;
    }
    const k = which === 'end' ? g.emK : g.smK;
    const f = which === 'end' ? g.emFloor : g.smFloor;
    return Math.max(f, k * dim);
  }

  // The grade's design point for (case, class, V): geometry + grain/ε_r targets.
  function gradeDesignPoint(spec) {
    const g   = GRADES[spec.grade] || GRADES.commercial;
    const c   = CASES.find(x => x.id === spec.case);
    const cls = CLASSES.find(x => x.id === spec.cls);
    if (!c)   throw new Error(`Unknown case id: ${spec.case}`);
    if (!cls) throw new Error(`Unknown class id: ${spec.cls}`);
    const sTotal = spec.sTotal != null ? spec.sTotal : 0.14;

    const d_fired_um = gradeDMin(g, spec.V);
    const h_Ni_fired = Math.max(0.30, g.eRatio * d_fired_um);
    // Nominal footprint keeps the compute() round-trip exact; the max-footprint
    // (build-to-tolerance) gain is reported separately via cmaxEnvelope.
    const Leff = c.L, Weff = c.W;
    const em = Math.min(gradeMargin(g, spec.V, Leff, 'end'),  0.45 * Leff);
    const sm = Math.min(gradeMargin(g, spec.V, Weff, 'side'), 0.45 * Weff);
    const A_overlap_um2 = (Leff - 2 * em) * (Weff - 2 * sm);
    const A_eff_um2     = A_overlap_um2 * g.coverage * (1 - g.disc);
    // Grain target from the grains-per-layer reliability rule, bounded by the
    // powder floor (~0.10 µm) and the ε_r-optimum (~0.8 µm).
    const grain_um  = Math.max(0.10, Math.min(0.80, d_fired_um / g.gpl));
    const er_grain  = erGrain(spec.cls, grain_um);
    const layer_pitch = d_fired_um + h_Ni_fired;
    const Hmax_eff  = c.Hmax + ((spec.Ttol != null ? spec.Ttol : (c.Ttol || 0)) - (c.Ttol || 0));
    const N_e_max   = Math.min(g.Nmax, Math.floor((Hmax_eff - 2 * g.cover) / layer_pitch));
    return {
      g, c, cls, sTotal, d_fired_um, h_Ni_fired,
      h_Ni_green: h_Ni_fired / (1 - sTotal), h_BT_green: d_fired_um / (1 - sTotal),
      em, sm, coverage: g.coverage, disc: g.disc, cover: g.cover,
      A_overlap_um2, A_eff_um2, grain_um, er_grain, er_class: cls.er,
      layer_pitch, Hmax_eff, N_e_max,
    };
  }

  // Given (case, class, V, C_target_uF, grade?), suggest a full design recipe.
  // Returns the recipe (d, green h_BT, h_Ni, N, grain, ε_r, margins, cover) plus
  // a feasibility band: typical (predictCMax) → frontier (cmaxEnvelope) ceilings.
  function suggestDesign(spec) {
    if (spec.C_target_uF == null || !isFinite(spec.C_target_uF) || spec.C_target_uF <= 0) {
      throw new Error('suggestDesign needs spec.C_target_uF (positive number, in µF)');
    }
    const dp = gradeDesignPoint(spec);
    const d_m = dp.d_fired_um * 1e-6;
    const A_m = dp.A_eff_um2 * 1e-12;
    const C_target_F = spec.C_target_uF * 1e-6;
    // Back-solve N with the CLASS ε_r (the value compute() applies) so the recipe
    // round-trips exactly; er_grain is the realistic-dielectric advisory.
    const N_needed = (C_target_F * d_m) / (dp.er_class * EPS0 * A_m);
    const N_actual = Math.min(N_needed, dp.N_e_max);
    const feasible = N_needed <= dp.N_e_max;
    const C_grade_max_uF = dp.er_class * EPS0 * A_m * dp.N_e_max / d_m * 1e6;
    const H_stack_um = N_actual * dp.layer_pitch + 2 * dp.cover;
    const grade = GRADES[spec.grade] ? spec.grade : 'commercial';
    const C_typical_uF  = predictCMax({ case: spec.case, cls: spec.cls, V: spec.V }).C_max_uF;
    const C_frontier_uF = cmaxEnvelope({ case: spec.case, cls: spec.cls, V: spec.V,
      Ltol: spec.Ltol, Wtol: spec.Wtol, Ttol: spec.Ttol }).C_max_uF;
    return {
      grade, gradeLabel: dp.g.label, caseRec: dp.c, clsRec: dp.cls,
      d_fired_um: dp.d_fired_um, h_BT_green: dp.h_BT_green,
      h_Ni_um: dp.h_Ni_green, h_Ni_fired_um: dp.h_Ni_fired,
      grain_um: dp.grain_um, er_class: dp.er_class, er_grain: dp.er_grain,
      em: dp.em, sm: dp.sm, coverage: dp.coverage, disc: dp.disc, cover: dp.cover,
      N_e_needed: Math.round(N_needed), N_e_actual: Math.round(N_actual), N_e_max: dp.N_e_max,
      H_stack_um, H_max_um: dp.Hmax_eff, H_pct: H_stack_um / dp.Hmax_eff * 100,
      C_target_uF: spec.C_target_uF, C_grade_max_uF, C_typical_uF, C_frontier_uF,
      fill_grade_pct: spec.C_target_uF / C_grade_max_uF * 100,
      feasible, overflow: !feasible,
      needs_engineered_dielectric: (dp.er_grain / dp.er_class) < 0.85,
    };
  }

  // Given (case, class, V_rated, C_target_uF, grade?), back-solve the recipe.
  // Thin wrapper over suggestDesign that keeps the legacy field names the UI and
  // tests use, and exposes the grade geometry so a compute() round-trip is exact.
  function solveRecipe(spec) {
    if (spec.C_target_uF == null || !isFinite(spec.C_target_uF) || spec.C_target_uF <= 0) {
      throw new Error('solveRecipe needs spec.C_target_uF (positive number, in µF)');
    }
    const s = suggestDesign(spec);
    return {
      caseRec: s.caseRec, clsRec: s.clsRec, grade: s.grade,
      d_fired_um: s.d_fired_um, h_BT_green: s.h_BT_green, h_Ni_um: s.h_Ni_um,
      grain_um: s.grain_um, er_class: s.er_class, er_grain: s.er_grain,
      em: s.em, sm: s.sm, coverage: s.coverage, disc: s.disc, cover: s.cover,
      N_e_needed: s.N_e_needed, N_e_actual: s.N_e_actual, N_e_max: s.N_e_max,
      C_max_uF: s.C_grade_max_uF, C_typical_uF: s.C_typical_uF, C_frontier_uF: s.C_frontier_uF,
      C_target_uF: spec.C_target_uF,
      H_stack_um: s.H_stack_um, H_max_um: s.H_max_um, H_pct: s.H_pct,
      fill_pct: spec.C_target_uF / s.C_grade_max_uF * 100,
      overflow: s.overflow,
      needs_engineered_dielectric: s.needs_engineered_dielectric,
    };
  }

  // ============================================================
  // Export
  // ============================================================

  const api = {
    CASES, CLASSES, DCBIAS, TCC_RANGES, EPS0, VENDOR_PARTS, KNOWN_PARTS,
    SEMCO_SIZE_CODES, SEMCO_TCC_CODES, SEMCO_VOLTAGE_CODES, SEMCO_TOL_CODES,
    tccFactor, dcBiasFactor, compute,
    parseSemcoCL, decodeCapCode,
    fmtCap, fmt, defaultInputs,
    eDesign, dFiredFromV, hNiFromD, predictCMax, cmaxEnvelope, solveRecipe,
    suggestDesign, gradeDesignPoint, GRADES,
    computeFromKnown, erForKnown, erGrain,
    D_FLOOR_FRONTIER, E_MAX_FIELD,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  if (typeof root !== 'undefined') {
    root.tier1 = api;
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
