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
  // MLCC part-number decoder (CL-style surface-mount grammar)
  // 11 fields, 15 characters total:
  //   CL <size 2c> <tcc 1c> <cap 3c> <tol 1c> <volt 1c>
  //      <thick 1c> <plating 1c> <control 1c> <reserved 1c> <packaging 1c>
  // (Multi-vendor part decoding lives in the mlcc-part skill; this is a
  //  self-contained convenience decoder for the common CL-prefixed format.)
  // ============================================================

  // Size code → simulator case ID
  const PN_SIZE_CODES = {
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

  // TCC code → simulator class ID. Some codes (e.g. X6S, U2J)
  // don't map to a class we model — decoded but flagged with cls: null.
  const PN_TCC_CODES = {
    'A': 'X5R',
    'B': 'X7R',
    'X': null,   // X6S — not in our CLASSES set
    'F': 'Y5V',
    'C': 'C0G',
    // Class I sub-codes (all map to C0G family in our model)
    'P': 'C0G', 'R': 'C0G', 'S': 'C0G', 'T': 'C0G', 'U': 'C0G',
  };

  // Voltage letter → V rating
  const PN_VOLTAGE_CODES = {
    'S': 2.5, 'R': 4.0, 'Q': 6.3, 'P': 10, 'O': 16, 'A': 25, 'L': 35,
    'B': 50,  'T': 75,  'C': 100, 'D': 200, 'E': 250, 'G': 500,
    'H': 630, 'I': 1000, 'J': 2000, 'K': 3000,
  };

  // Tolerance letter → text
  const PN_TOL_CODES = {
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

  function parsePartNumber(pn) {
    if (typeof pn !== 'string') throw new Error(`expected string, got ${typeof pn}`);
    if (!pn.startsWith('CL')) throw new Error(`not a CL-style part number: "${pn}"`);
    if (pn.length !== 15) throw new Error(`CL-style part number must be 15 chars, got ${pn.length}: "${pn}"`);

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

    if (!(sizeCode in PN_SIZE_CODES))
      throw new Error(`unknown size code "${sizeCode}" in "${pn}"`);
    if (!(tccCode in PN_TCC_CODES))
      throw new Error(`unknown TCC code "${tccCode}" in "${pn}"`);
    if (!(voltCode in PN_VOLTAGE_CODES))
      throw new Error(`unknown voltage code "${voltCode}" in "${pn}"`);

    const C_F = decodeCapCode(capCode);

    return {
      prefix: 'CL',
      sizeCode, case: PN_SIZE_CODES[sizeCode],
      tccCode,  cls:  PN_TCC_CODES[tccCode],
      capCode,  C_F,  C_uF: C_F * 1e6,
      tolCode,  tol:  PN_TOL_CODES[tolCode] || null,
      voltCode, V:    PN_VOLTAGE_CODES[voltCode],
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
    // Shrinkage may be ANISOTROPIC: in-plane (s_xy, applied to the print pattern /
    // footprint) and thickness (s_z, applied to d and h_Ni) can differ — in a
    // constrained stack the in-plane shrinkage is suppressed and the thickness
    // enhanced (see shrinkageModel / wiki constrained-sintering-mlcc). Default is
    // isotropic: both = sTotal, so existing callers are byte-identical.
    const s_xy = inp.sXY != null ? inp.sXY : inp.sTotal;
    const s_z  = inp.sZ  != null ? inp.sZ  : inp.sTotal;
    let overlapL_fired_um, overlapW_fired_um, overlapL_green_um, overlapW_green_um;
    if (inp.overlapL != null && inp.overlapW != null) {
      overlapL_green_um = inp.overlapL;
      overlapW_green_um = inp.overlapW;
      overlapL_fired_um = overlapL_green_um * (1 - s_xy);
      overlapW_fired_um = overlapW_green_um * (1 - s_xy);
    } else {
      overlapL_fired_um = c.L - 2 * em;
      overlapW_fired_um = c.W - 2 * sm;
      overlapL_green_um = overlapL_fired_um / (1 - s_xy);   // implied green pattern
      overlapW_green_um = overlapW_fired_um / (1 - s_xy);
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
    const d_fired_um    = inp.hBT * (1 - s_z);
    const hNi_fired_um  = inp.hNi * (1 - s_z);
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
      caseRec: c, clsRec: cls, em, sm, Hmax_eff, s_xy, s_z,
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
    { id: 'yan-2013-1206', src: 'yan-thesis-2013', case: '1206_3216', cls: 'X7R', V: 50, C_uF: null,
      d_fired_um: 2.5, h_Ni_fired_um: 1.2, N_a: null, grain_um: null,
      note: 'Samsung production MLCC, cross-sectioned. N_e not disclosed.' },
    { id: 'yan-2013-0603', src: 'yan-thesis-2013', case: '0603_1608', cls: 'X7R', V: 25, C_uF: null,
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
  // Calibration layer — evolve toward real measured parts
  // ============================================================
  //
  // The physics in compute() is transparent and uncalibrated. The gap between
  // computed capacitance and REAL product behaviour (mostly the uncontrolled
  // effective ε_r, plus lumped geometry/coverage error) is captured here as a
  // multiplicative **effective-ε_r correction**, learned from a set of real
  // measured parts and APPLIED ONLY in the design-suggestion layer
  // (suggestDesign / optimizeDesign). Add real parts → recalibrate → the
  // suggestions move toward reality, while the physics stays pure.
  //
  // Default is identity (no correction), so the engine and all physics tests are
  // unchanged until a calibration is explicitly loaded (e.g. by the CLI).
  const CALIBRATION_IDENTITY = {
    version: 1, source: 'default-identity', updated: null, n_parts: 0,
    er_scale_global: 1, er_scale_byClass: {}, sigma_ln: 0, sigma_pct: 0,
  };
  let CALIBRATION = { ...CALIBRATION_IDENTITY };

  // Return a copy so callers can't mutate the live global calibration state.
  function getCalibration() { return { ...CALIBRATION, er_scale_byClass: { ...CALIBRATION.er_scale_byClass } }; }
  function setCalibration(c) {
    CALIBRATION = c ? { ...CALIBRATION_IDENTITY, ...c } : { ...CALIBRATION_IDENTITY };
    return CALIBRATION;
  }
  // Effective-ε_r scale for a class: per-class if learned, else global, clamped.
  function calScale(cls) {
    const s = (CALIBRATION.er_scale_byClass && CALIBRATION.er_scale_byClass[cls] != null)
      ? CALIBRATION.er_scale_byClass[cls]
      : (CALIBRATION.er_scale_global != null ? CALIBRATION.er_scale_global : 1);
    return Math.max(0.3, Math.min(3, isFinite(s) && s > 0 ? s : 1));
  }

  // Assumed coverage / discontinuity of a real measured part (rarely disclosed).
  // Holding them fixed makes the learned scale a clean ε_r ratio, independent of
  // the design grade's own coverage/disc applied later in the suggester — so a
  // real part's coverage/disc is modelled here, the design's is modelled there,
  // with no double-count.
  const CAL_REF_COVERAGE = 0.90, CAL_REF_DISC = 0.15;

  // Model capacitance (µF) for a real part using its MEASURED recipe + the class
  // ε_r — the reference against which the real rated C residual is measured.
  // Total (never throws): skips a part with missing/invalid case or class so one
  // malformed row can't abort a whole recalibration.
  function predictRealPartC(p) {
    const N = p.N != null ? p.N : p.N_a;
    if (!(p.C_uF > 0) || !(p.d_fired_um > 0) || !(N > 0)) return null;
    const c = CASES.find(x => x.id === p.case);
    if (!c || !CLASSES.find(x => x.id === p.cls)) return null;
    const s = 0.14;
    let r;
    try {
      r = compute({
        case: p.case, cls: p.cls,
        hBT: p.d_fired_um / (1 - s),
        hNi: (p.h_Ni_fired_um != null ? p.h_Ni_fired_um : Math.max(0.5, 0.6 * p.d_fired_um)) / (1 - s),
        Ne: N,
        em: p.em_um != null ? p.em_um : c.em,
        sm: p.sm_um != null ? p.sm_um : c.sm,
        cover: p.cover_um != null ? p.cover_um : 60,
        coverage: CAL_REF_COVERAGE, disc: CAL_REF_DISC, sTotal: s, tier2: false, vdc: 0, top: 25,
      });
    } catch (e) { return null; }
    return r.C_nominal_F * 1e6;
  }

  // Learn the effective-ε_r correction from a set of real parts. Each usable part
  // needs {case, cls, V, C_uF, d_fired_um, N|N_a}. Returns a calibration object
  // (geomean residual globally + per class with ≥ minClassCount parts) and the
  // residual spread σ — the model's honest part-to-part uncertainty.
  function calibrateFromReal(parts, opts = {}) {
    const minClass = opts.minClassCount != null ? opts.minClassCount : 4;
    const recs = [];
    for (const p of (parts || [])) {
      const Cp = predictRealPartC(p);
      if (Cp == null || !(Cp > 0)) continue;
      recs.push({ cls: p.cls, ln: Math.log(p.C_uF / Cp) });
    }
    const n = recs.length;
    const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
    const ln = recs.map(r => r.ln);
    const muG = n ? mean(ln) : 0;
    const sigma = n > 1 ? Math.sqrt(ln.reduce((x, y) => x + (y - muG) ** 2, 0) / (n - 1)) : 0;
    const byClass = {};
    for (const cl of [...new Set(recs.map(r => r.cls))]) {
      const arr = recs.filter(r => r.cls === cl).map(r => r.ln);
      byClass[cl] = arr.length >= minClass ? Math.exp(mean(arr)) : Math.exp(muG);
    }
    return {
      version: 1, source: opts.source || 'calibrateFromReal', updated: opts.date || null,
      n_parts: n, er_scale_global: n ? Math.exp(muG) : 1, er_scale_byClass: byClass,
      sigma_ln: sigma, sigma_pct: (Math.exp(sigma) - 1) * 100,
    };
  }
  // Convenience: calibrate against the engine's built-in real-part seed.
  function calibrateFromKnown(opts = {}) {
    return calibrateFromReal(KNOWN_PARTS, { source: 'KNOWN_PARTS', ...opts });
  }

  // ============================================================
  // Shrinkage model — green→fired, optionally anisotropic & data-fitted
  // ============================================================
  //
  // Green→fired shrinkage is isotropic (s_xy = s_z = sTotal ≈ 0.14) by default.
  // With enough REAL paired green↔fired data it becomes a fitted function of
  // process args — the two strongest, cleanest predictors:
  //   • thickness s_z rises as the green sheet thins:  s_z ≈ s_z0 + b/h_BT_green
  //   • in-plane s_xy is suppressed by electrode constraint:  s_xy = s_z·(1 − k·h_Ni/h_BT)
  // (wiki: green-tape-shrinkage-anisotropy, constrained-sintering-mlcc,
  //  metal-electrode-shrinkage-effect, skorohod-olevsky-viscous-sintering.)
  //
  // Default is IDENTITY (isotropic) until calibrateShrinkage() is fed paired data
  // and the result is loaded via setShrinkage() — the physics path stays pure,
  // exactly like the ε_r calibration.
  const SHRINKAGE_DEFAULT = { fitted: false, source: 'default-isotropic', sTotal: 0.14 };
  let SHRINKAGE = { ...SHRINKAGE_DEFAULT };
  function getShrinkage() { return { ...SHRINKAGE, coeff: SHRINKAGE.coeff ? { ...SHRINKAGE.coeff } : undefined }; }
  function setShrinkage(m) { SHRINKAGE = m ? { ...SHRINKAGE_DEFAULT, ...m } : { ...SHRINKAGE_DEFAULT }; return SHRINKAGE; }

  // Predict {s_xy, s_z} for a part's process args. Identity until a fitted model is
  // loaded. args: { h_BT_green_um, h_Ni_green_um, sTotal? }.
  function shrinkageModel(args = {}) {
    const m = SHRINKAGE;
    const s0 = args.sTotal != null ? args.sTotal : (m.sTotal != null ? m.sTotal : 0.14);
    if (!m.fitted || !m.coeff) return { s_xy: s0, s_z: s0 };
    const cf = m.coeff;
    const hbt = args.h_BT_green_um > 0 ? args.h_BT_green_um : null;
    let s_z = cf.s_z0 + (cf.b_hbt || 0) * (hbt ? 1 / hbt : 0);
    s_z = Math.max(0.02, Math.min(0.45, s_z));
    const ratio = (args.h_Ni_green_um > 0 && hbt) ? args.h_Ni_green_um / hbt : 0;
    let s_xy = s_z * (1 - (cf.k_constraint || 0) * ratio);
    s_xy = Math.max(0.02, Math.min(s_z, s_xy));   // constrained: in-plane ≤ thickness
    return { s_xy, s_z };
  }

  // Ordinary least-squares y = slope·x + intercept (+ residual σ).
  function _linfit(xs, ys) {
    const n = xs.length;
    const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
    let sxx = 0, sxy = 0;
    for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); }
    const slope = sxx > 0 ? sxy / sxx : 0;
    const intercept = my - slope * mx;
    let ss = 0; for (let i = 0; i < n; i++) { const e = ys[i] - (slope * xs[i] + intercept); ss += e * e; }
    return { slope, intercept, sigma: n > 2 ? Math.sqrt(ss / (n - 2)) : 0 };
  }

  // Fit a low-order anisotropic shrinkage model from real paired green↔fired parts.
  // Each usable part needs the GREEN cast/print dims AND the FIRED measured dims:
  //   thickness : h_BT_green_um + d_fired_um   → s_z = 1 − d_fired/h_BT_green
  //   in-plane  : (overlapL_green_um | footprint_L_green_um) + fired counterpart
  //               + h_Ni_green_um              → s_xy, anisotropy vs h_Ni/h_BT
  // Returns a model object for setShrinkage(); identity (with a note) if < 3 pairs.
  function calibrateShrinkage(parts, opts = {}) {
    const z = [], a = [];
    for (const p of (parts || [])) {
      const hbtG = p.h_BT_green_um, dF = p.d_fired_um;
      if (!(hbtG > 0) || !(dF > 0) || !(dF < hbtG)) continue;
      const s_z = 1 - dF / hbtG;
      z.push({ x: 1 / hbtG, s_z });
      const gIn = p.overlapL_green_um != null ? p.overlapL_green_um : p.footprint_L_green_um;
      const fIn = p.overlapL_fired_um != null ? p.overlapL_fired_um : p.footprint_L_fired_um;
      if (gIn > 0 && fIn > 0 && fIn < gIn && p.h_Ni_green_um > 0 && s_z > 0) {
        a.push({ ratio: p.h_Ni_green_um / hbtG, oneMinusK: 1 - (1 - fIn / gIn) / s_z });
      }
    }
    if (z.length < 3) {
      return { fitted: false, source: opts.source || 'calibrateShrinkage', updated: opts.date || null,
               sTotal: opts.sTotal || 0.14, n_pairs: z.length,
               note: 'need ≥3 green↔fired thickness pairs (h_BT_green_um + d_fired_um); using isotropic default' };
    }
    const fz = _linfit(z.map(r => r.x), z.map(r => r.s_z));
    let k_constraint = 0, sigma_aniso = 0;
    if (a.length >= 3) {
      const fk = _linfit(a.map(r => r.ratio), a.map(r => r.oneMinusK));
      k_constraint = Math.max(0, Math.min(0.6, fk.slope));
      sigma_aniso = fk.sigma;
    }
    return {
      fitted: true, source: opts.source || 'calibrateShrinkage', updated: opts.date || null,
      n_pairs: z.length, n_aniso: a.length,
      coeff: { s_z0: fz.intercept, b_hbt: fz.slope, k_constraint },
      sigma_z: fz.sigma, sigma_z_pct: fz.sigma * 100, sigma_aniso,
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

  // Grade geometry + grain/ε_r at a given fired dielectric thickness `d`, for a
  // grade + case. SINGLE source of the grade's geometry, so gradeDesignPoint and
  // optimizeDesign can never drift. Margins / A_eff are d-independent; h_Ni, grain
  // and the layer pitch follow `d`. Nominal footprint keeps the compute()
  // round-trip exact; the max-footprint (build-to-tolerance) gain is reported
  // separately via cmaxEnvelope.
  function gradeGeometry(g, c, cls, V, d) {
    const h_Ni_fired = Math.max(0.30, g.eRatio * d);
    const em = Math.min(gradeMargin(g, V, c.L, 'end'),  0.45 * c.L);
    const sm = Math.min(gradeMargin(g, V, c.W, 'side'), 0.45 * c.W);
    const overlapL_fired = c.L - 2 * em;
    const overlapW_fired = c.W - 2 * sm;
    const A_overlap_um2 = overlapL_fired * overlapW_fired;
    // Grain target from the grains-per-layer reliability rule, bounded by the
    // powder floor (~0.10 µm) and the ε_r-optimum (~0.8 µm).
    const grain_um = Math.max(0.10, Math.min(0.80, d / g.gpl));
    return {
      em, sm, overlapL_fired, overlapW_fired, A_overlap_um2,
      A_eff_um2: A_overlap_um2 * g.coverage * (1 - g.disc),
      h_Ni_fired, grain_um, er_grain: erGrain(cls.id, grain_um),
      layer_pitch: d + h_Ni_fired,
    };
  }

  // The grade's design point for (case, class, V): geometry + grain/ε_r targets
  // at the grade's minimum (thinnest, max-CV) dielectric.
  function gradeDesignPoint(spec) {
    const g   = GRADES[spec.grade] || GRADES.commercial;
    const c   = CASES.find(x => x.id === spec.case);
    const cls = CLASSES.find(x => x.id === spec.cls);
    if (!c)   throw new Error(`Unknown case id: ${spec.case}`);
    if (!cls) throw new Error(`Unknown class id: ${spec.cls}`);
    const sTotal = spec.sTotal != null ? spec.sTotal : 0.14;

    const d_fired_um = gradeDMin(g, spec.V);
    const geo = gradeGeometry(g, c, cls, spec.V, d_fired_um);
    const Hmax_eff  = c.Hmax + ((spec.Ttol != null ? spec.Ttol : (c.Ttol || 0)) - (c.Ttol || 0));
    const N_e_max   = Math.min(g.Nmax, Math.floor((Hmax_eff - 2 * g.cover) / geo.layer_pitch));
    return {
      g, c, cls, sTotal, d_fired_um, h_Ni_fired: geo.h_Ni_fired,
      h_Ni_green: geo.h_Ni_fired / (1 - sTotal), h_BT_green: d_fired_um / (1 - sTotal),
      em: geo.em, sm: geo.sm, coverage: g.coverage, disc: g.disc, cover: g.cover,
      A_overlap_um2: geo.A_overlap_um2, A_eff_um2: geo.A_eff_um2,
      grain_um: geo.grain_um, er_grain: geo.er_grain, er_class: cls.er,
      layer_pitch: geo.layer_pitch, Hmax_eff, N_e_max,
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
    // Effective ε_r = class ε_r × the learned real-data correction (identity by
    // default). Back-solve N with it so suggestions track real product designs.
    // NOTE: under a non-identity calibration the recipe no longer round-trips
    // through compute() (which uses the raw class ε_r) — the calibration is a
    // suggestion-layer correction only, never applied to the physics path.
    const er_eff = dp.er_class * calScale(spec.cls);
    const N_needed = (C_target_F * d_m) / (er_eff * EPS0 * A_m);
    const N_actual = Math.min(N_needed, dp.N_e_max);
    const feasible = N_needed <= dp.N_e_max;
    const C_grade_max_uF = er_eff * EPS0 * A_m * dp.N_e_max / d_m * 1e6;
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
      er_effective: er_eff, calibration: { source: CALIBRATION.source, n_parts: CALIBRATION.n_parts, scale: calScale(spec.cls), sigma_pct: CALIBRATION.sigma_pct },
      em: dp.em, sm: dp.sm, coverage: dp.coverage, disc: dp.disc, cover: dp.cover,
      N_e_needed: Math.round(N_needed), N_e_actual: Math.round(N_actual), N_e_max: dp.N_e_max,
      H_stack_um, H_max_um: dp.Hmax_eff, H_pct: H_stack_um / dp.Hmax_eff * 100,
      C_target_uF: spec.C_target_uF, C_grade_max_uF, C_typical_uF, C_frontier_uF,
      fill_grade_pct: spec.C_target_uF / C_grade_max_uF * 100,
      feasible, overflow: !feasible,
      needs_engineered_dielectric: (dp.er_grain / er_eff) < 0.85,
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
  // optimizeDesign — full GREEN build recipe for a target spec
  // ============================================================
  //
  // Given a target (capacitance + fired body + class + V + grade), optimize the
  // design parameters and emit the GREEN (as-built / as-printed) recipe a process
  // engineer actually needs: green dielectric thickness, green Ni thickness, the
  // screen-print pattern dimensions (green active overlap), per-side margins,
  // layer count, and cover — plus the resulting fired body and feasibility.
  //
  // Body is either a standard `case`, or custom fired dims (L_um, W_um, Hmax_um).
  // Objective:
  //   'reliability'     (default) — thickest dielectric (most grains/layer, most
  //                     robust) whose stack still fits the body height.
  //   'max_capacitance' — thinnest manufacturable dielectric (grade floor): the
  //                     densest design, maximum CV headroom in the body.
  const D_MAX_DESIGN = 25;   // µm — realistic upper bound on a fired dielectric layer

  function optimizeDesign(spec) {
    if (!(spec.C_target_uF > 0)) throw new Error('optimizeDesign needs spec.C_target_uF (positive µF)');
    const g   = GRADES[spec.grade] || GRADES.commercial;
    const cls = CLASSES.find(x => x.id === spec.cls);
    if (!cls) throw new Error(`Unknown class id: ${spec.cls}`);

    let c, custom = false;
    if (spec.case) {
      c = CASES.find(x => x.id === spec.case);
      if (!c) throw new Error(`Unknown case id: ${spec.case}`);
    } else if (spec.L_um > 0 && spec.W_um > 0 && spec.Hmax_um > 0) {
      c = { id: 'custom', label: `custom ${spec.L_um}×${spec.W_um}×${spec.Hmax_um} µm`,
            L: spec.L_um, W: spec.W_um, Hmax: spec.Hmax_um, Ltol: 0, Wtol: 0, Ttol: 0 };
      custom = true;
    } else {
      throw new Error('optimizeDesign needs spec.case or (L_um, W_um, Hmax_um)');
    }

    const sTotal    = spec.sTotal != null ? spec.sTotal : 0.14;
    const V         = spec.V;
    const objective = spec.objective || 'reliability';
    // Effective ε_r = class ε_r × learned real-data correction (identity default).
    const er        = cls.er * calScale(spec.cls);
    const cover     = g.cover;
    const Hmax_eff  = c.Hmax + ((spec.Ttol != null ? spec.Ttol : (c.Ttol || 0)) - (c.Ttol || 0));

    // Grade geometry at the floor dielectric — margins / A_eff are d-independent,
    // and this is the SAME helper gradeDesignPoint uses (no drift between the two
    // suggesters). h_Ni / pitch follow `d` inside evalD below.
    const d_floor = gradeDMin(g, V);
    const geo0 = gradeGeometry(g, c, cls, V, d_floor);
    const em = geo0.em, sm = geo0.sm;
    const overlapL_fired = geo0.overlapL_fired, overlapW_fired = geo0.overlapW_fired;
    if (overlapL_fired <= 0 || overlapW_fired <= 0) throw new Error('margins exceed body footprint');
    const A_eff_m2 = geo0.A_eff_um2 * 1e-12;
    const C_F = spec.C_target_uF * 1e-6;

    // For a candidate fired dielectric d, hit C by choosing the layer count.
    const evalD = (d) => {
      const N     = Math.max(1, Math.round(C_F * (d * 1e-6) / (er * EPS0 * A_eff_m2)));
      const hNi   = Math.max(0.30, g.eRatio * d);
      const pitch = d + hNi;
      const height = N * pitch + 2 * cover;
      const C_ach = er * EPS0 * A_eff_m2 * N / (d * 1e-6) * 1e6;
      return { d, N, hNi, pitch, height, C_ach_uF: C_ach };
    };
    const fitsBody = (e) => e.height <= Hmax_eff && e.N <= g.Nmax;

    // Thinnest (max-CV) design and whether it even fits the body.
    const thin = evalD(d_floor);
    const feasible = fitsBody(thin);

    // Thickest dielectric that still fits (max reliability), found by bisection on
    // the monotonically-rising height(d) — exact, O(log), no float accumulation.
    let thick = thin;
    if (feasible) {
      let a = d_floor, b = D_MAX_DESIGN;
      if (fitsBody(evalD(b))) { a = b; }                       // whole range fits
      else { for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (fitsBody(evalD(m))) a = m; else b = m; } }
      const e = evalD(a);
      if (fitsBody(e)) thick = e;
    }

    const chosen = !feasible ? thin : (objective === 'max_capacitance' ? thin : thick);

    // Body capacitance ceiling: most C this body/grade can hold (thinnest d, fill height).
    const pitchFloor  = geo0.layer_pitch;
    const N_floor_max = Math.min(g.Nmax, Math.floor((Hmax_eff - 2 * cover) / pitchFloor));
    const C_ceiling_uF = er * EPS0 * A_eff_m2 * N_floor_max / (d_floor * 1e-6) * 1e6;

    // Grain target + realistic ε_r at the chosen dielectric (same geometry helper).
    const chosenGeo = gradeGeometry(g, c, cls, V, chosen.d);
    const grain_um  = chosenGeo.grain_um;
    const er_grain  = chosenGeo.er_grain;
    // Green = fired / (1 − s). Anisotropic (thickness s_z vs in-plane s_xy) when a
    // fitted shrinkage model is loaded; isotropic sTotal by default → kz = kxy = k.
    const sh = shrinkageModel({
      h_BT_green_um: chosen.d   / (1 - sTotal),   // first-pass green estimate
      h_Ni_green_um: chosen.hNi / (1 - sTotal),
      sTotal,
    });
    const kz  = 1 / (1 - sh.s_z);     // thickness dims
    const kxy = 1 / (1 - sh.s_xy);    // in-plane dims (print pattern, margins, footprint)

    return {
      grade: GRADES[spec.grade] ? spec.grade : 'commercial', gradeLabel: g.label,
      objective, caseRec: c, clsRec: cls, custom, sTotal, s_xy: sh.s_xy, s_z: sh.s_z,
      // ---- GREEN build recipe (what you cast / print) ----
      hBT_green_um:           chosen.d   * kz,
      hNi_green_um:           chosen.hNi * kz,
      print_overlapL_green_um: overlapL_fired * kxy,
      print_overlapW_green_um: overlapW_fired * kxy,
      margin_end_green_um:    em * kxy,
      margin_side_green_um:   sm * kxy,
      green_unit_cell_L_um:   c.L * kxy,
      green_unit_cell_W_um:   c.W * kxy,
      N_e:                    chosen.N,
      cover_um:               cover,
      coverage:               g.coverage,
      disc:                   g.disc,
      // ---- fired result ----
      d_fired_um: chosen.d, hNi_fired_um: chosen.hNi, layer_pitch_um: chosen.pitch,
      em_fired_um: em, sm_fired_um: sm,
      overlapL_fired_um: overlapL_fired, overlapW_fired_um: overlapW_fired,
      fired_L_um: c.L, fired_W_um: c.W, fired_T_um: chosen.height, Hmax_um: Hmax_eff,
      height_fill_pct: chosen.height / Hmax_eff * 100,
      // ---- dielectric / reliability ----
      grain_um, grains_per_layer: chosen.d / grain_um, er_class: cls.er, er_effective: er, er_grain,
      needs_engineered_dielectric: (er_grain / er) < 0.85,
      calibration: { source: CALIBRATION.source, n_parts: CALIBRATION.n_parts, scale: calScale(spec.cls), sigma_pct: CALIBRATION.sigma_pct },
      // ---- target vs achieved ----
      C_target_uF: spec.C_target_uF, C_achieved_uF: chosen.C_ach_uF,
      C_body_ceiling_uF: C_ceiling_uF,
      feasible, overflow: !feasible,
      body_oversized: feasible && (chosen.height / Hmax_eff < 0.5),
      // Target so small the layer count floored at 1 and the design overshoots C.
      c_overshoot: feasible && chosen.C_ach_uF > 1.15 * spec.C_target_uF,
    };
  }

  // ============================================================
  // Export
  // ============================================================

  const api = {
    CASES, CLASSES, DCBIAS, TCC_RANGES, EPS0, VENDOR_PARTS, KNOWN_PARTS,
    PN_SIZE_CODES, PN_TCC_CODES, PN_VOLTAGE_CODES, PN_TOL_CODES,
    tccFactor, dcBiasFactor, compute,
    parsePartNumber, decodeCapCode,
    fmtCap, fmt, defaultInputs,
    eDesign, dFiredFromV, hNiFromD, predictCMax, cmaxEnvelope, solveRecipe,
    suggestDesign, gradeDesignPoint, optimizeDesign, GRADES,
    getCalibration, setCalibration, calScale, predictRealPartC, calibrateFromReal, calibrateFromKnown,
    getShrinkage, setShrinkage, shrinkageModel, calibrateShrinkage,
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
