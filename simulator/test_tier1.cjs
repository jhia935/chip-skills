// Layer 1 test suite for the Tier 1 capacitance estimator.
// Runs the pure math in tier1.js against:
//   - geometric / multiplicative invariants
//   - TCC and DC-bias envelope edges
//   - warning trigger thresholds
//   - vendor-part order-of-magnitude calibration
//
// Run:  node simulator/test_tier1.cjs

const t = require('./tier1.js');

let passed = 0, failed = 0;
const failures = [];

function ok(name, cond, detail) {
  if (cond) { passed++; }
  else { failed++; failures.push(`✗ ${name}${detail ? ` — ${detail}` : ''}`); }
}

function near(a, b, frac) {
  // True when |a - b| / |b| <= frac
  if (b === 0) return Math.abs(a) <= frac;
  return Math.abs(a - b) / Math.abs(b) <= frac;
}

const inp0 = t.defaultInputs();

// ============================================================
// 1. Geometric / multiplicative invariants
// ============================================================

(function geometricInvariants() {
  const r0 = t.compute({ ...inp0, tier2: false });

  // C scales linearly with N_e
  const rNe2 = t.compute({ ...inp0, tier2: false, Ne: inp0.Ne * 2 });
  ok('C ∝ N_e (linear)',
    near(rNe2.C_nominal_F, 2 * r0.C_nominal_F, 1e-9),
    `expected 2× C, got ${(rNe2.C_nominal_F / r0.C_nominal_F).toFixed(4)}×`);

  // C scales inversely with d_fired (drives via h_BT)
  const rHBT2 = t.compute({ ...inp0, tier2: false, hBT: inp0.hBT * 2 });
  ok('C ∝ 1/h_BT (inverse)',
    near(rHBT2.C_nominal_F, r0.C_nominal_F / 2, 1e-9),
    `expected 0.5× C, got ${(rHBT2.C_nominal_F / r0.C_nominal_F).toFixed(4)}×`);

  // Coverage is now OPTIONAL: omitted → 1.0 (overlap is the active area).
  const rCovDefault = t.compute({ ...inp0, tier2: false });            // no coverage
  const rCov1 = t.compute({ ...inp0, tier2: false, coverage: 1.0 });
  ok('coverage omitted defaults to 1.0', near(rCovDefault.C_nominal_F, rCov1.C_nominal_F, 1e-12));
  // C still scales linearly with coverage when supplied.
  const rCovHalf = t.compute({ ...inp0, tier2: false, coverage: 0.5 });
  ok('C ∝ coverage (when supplied)', near(rCovHalf.C_nominal_F, rCov1.C_nominal_F / 2, 1e-9));

  // C scales with (1 - discontinuity)
  const rD0 = t.compute({ ...inp0, tier2: false, disc: 0 });
  const rD5 = t.compute({ ...inp0, tier2: false, disc: 0.5 });
  ok('C ∝ (1 - discontinuity)',
    near(rD5.C_nominal_F, rD0.C_nominal_F * 0.5, 1e-9),
    `expected 0.5×, got ${(rD5.C_nominal_F / rD0.C_nominal_F).toFixed(4)}×`);

  // Margin overrides: with no em/sm in input, compute() uses CASES defaults;
  // supplying them overrides and is reflected in the returned em/sm.
  const cBase = t.CASES.find(x => x.id === inp0.case);
  ok('compute() defaults margins to CASES values',
    r0.em === cBase.em && r0.sm === cBase.sm);
  const rMar = t.compute({ ...inp0, tier2: false, em: cBase.em / 2, sm: cBase.sm / 2 });
  ok('compute() honors em/sm overrides (returned values)',
    rMar.em === cBase.em / 2 && rMar.sm === cBase.sm / 2);
  // Smaller margins → larger overlap area → larger C (monotonic, same sign).
  ok('Smaller margins → larger C', rMar.C_nominal_F > r0.C_nominal_F);

  // Shrinkage may now be swept up to ~0.7; C ∝ 1/(1-s) and stays finite.
  const rHiS = t.compute({ ...inp0, tier2: false, sTotal: 0.6 });
  ok('High shrinkage (0.6) computes finitely and raises C',
    isFinite(rHiS.C_nominal_F) && rHiS.C_nominal_F > r0.C_nominal_F);

  // Pattern overlap is GREEN and shrinks in-plane by (1−s). A green pattern
  // sized so the FIRED overlap fills the case must equal case mode exactly:
  //   green = (case − 2·margin) / (1 − s)  →  fired = case − 2·margin.
  const cb = t.CASES.find(x => x.id === inp0.case);
  const s = inp0.sTotal;
  const rPat = t.compute({ ...inp0, tier2: false,
    overlapL: (cb.L - 2 * cb.em) / (1 - s), overlapW: (cb.W - 2 * cb.sm) / (1 - s),
    em: cb.em, sm: cb.sm });
  ok('Pattern mode (green→fired fills case) == case mode',
    near(rPat.C_nominal_F, r0.C_nominal_F, 1e-9));
  ok('Pattern mode derives fired chip footprint = case',
    near(rPat.L_chip_um, cb.L, 1e-6) && near(rPat.W_chip_um, cb.W, 1e-6));
  ok('Pattern in-plane shrinkage applied (fired < green overlap)',
    rPat.overlapL_fired_um < rPat.overlapL_green_um);

  // C scales with green overlap area (fired area ∝ green area).
  const rHalf = t.compute({ ...rPat_inputs(cb, s, inp0), overlapL: (cb.L - 2*cb.em) / (1 - s) / 2 });
  ok('Pattern C ∝ overlap area', near(rHalf.C_nominal_F, rPat.C_nominal_F / 2, 1e-9));

  function rPat_inputs(cb, s, base) {
    return { ...base, tier2: false,
      overlapL: (cb.L - 2*cb.em) / (1 - s), overlapW: (cb.W - 2*cb.sm) / (1 - s),
      em: cb.em, sm: cb.sm };
  }

  // Higher shrinkage with a FIXED green pattern → smaller fired part → less C
  // (in-plane area loss ∝ (1−s)² beats the thickness gain ∝ 1/(1−s); net ∝ (1−s)).
  const rLoS = t.compute(rPat_inputs(cb, s, { ...inp0, sTotal: 0.10 }));
  const rHiS2 = t.compute(rPat_inputs(cb, s, { ...inp0, sTotal: 0.25 }));
  ok('Pattern mode: higher shrinkage → lower C (fixed green pattern)',
    rHiS2.C_nominal_F < rLoS.C_nominal_F);

  // Green pattern bigger than case/(1−s) → fired chip exceeds envelope → PATTERN_OVER.
  const rBig = t.compute({ ...inp0, tier2: false,
    overlapL: cb.L / (1 - s), overlapW: cb.W / (1 - s), em: cb.em, sm: cb.sm });
  ok('Over-size pattern flags PATTERN_OVER',
    rBig.warnings.some(w => w.code === 'PATTERN_OVER'));

  // Dimensional tolerance: a fired chip at the MAX footprint (nominal + tol) is
  // allowed — no PATTERN_OVER. Design green so fired chip = exactly max.
  const tol = t.CASES.find(x => x.id === '0201_0603');
  const grnL = (tol.L + tol.Ltol - 2 * tol.em) / (1 - s);
  const grnW = (tol.W + tol.Wtol - 2 * tol.sm) / (1 - s);
  const rTolMax = t.compute({ ...inp0, tier2: false, case: '0201_0603',
    em: tol.em, sm: tol.sm, overlapL: grnL, overlapW: grnW });
  ok('Fired chip at max tolerance is within spec (no PATTERN_OVER)',
    !rTolMax.warnings.some(w => w.code === 'PATTERN_OVER') &&
    near(rTolMax.L_chip_um, tol.L + tol.Ltol, 1e-6));
  // Just beyond max → PATTERN_OVER.
  const rTolOver = t.compute({ ...inp0, tier2: false, case: '0201_0603',
    em: tol.em, sm: tol.sm, overlapL: grnL + 200, overlapW: grnW });
  ok('Fired chip beyond max tolerance flags PATTERN_OVER',
    rTolOver.warnings.some(w => w.code === 'PATTERN_OVER'));

  // cmaxEnvelope uses the max footprint → strictly larger than a nominal-only
  // envelope would be (more area available).
  ok('cmaxEnvelope reflects max-footprint area gain',
    t.cmaxEnvelope({ case: '0201_0603', cls: 'X5R', V: 6.3 }).C_max_uF > 6.0);

  // C scales with ε_r — derive the expected ratio from CLASSES so the test
  // stays correct if the calibrated ε_r values are tuned later.
  const rC0G = t.compute({ ...inp0, tier2: false, cls: 'C0G' });
  const erC0G = t.CLASSES.find(x => x.id === 'C0G').er;
  const erX7R = t.CLASSES.find(x => x.id === 'X7R').er;
  ok('C ∝ ε_r (C0G vs X7R from CLASSES table)',
    near(rC0G.C_nominal_F / r0.C_nominal_F, erC0G / erX7R, 1e-9));

  // Case area scales A_overlap: 0805 vs 0402
  const r0402 = t.compute({ ...inp0, tier2: false, case: '0402_1005' });
  const c0805 = t.CASES.find(c => c.id === '0805_2012');
  const c0402 = t.CASES.find(c => c.id === '0402_1005');
  const expectedRatio =
    ((c0402.L - 2*c0402.em) * (c0402.W - 2*c0402.sm)) /
    ((c0805.L - 2*c0805.em) * (c0805.W - 2*c0805.sm));
  ok('C ∝ A_overlap (0402 vs 0805 area ratio)',
    near(r0402.C_nominal_F / r0.C_nominal_F, expectedRatio, 1e-9));

  // Shrinkage: d_fired = h_BT × (1 - s), so C ∝ 1 / (1 - s).
  // C(s=0) × 1.0 = C(s=s) × (1-s) → C(s=s) = C(s=0) / (1-s).
  const rS0 = t.compute({ ...inp0, tier2: false, sTotal: 0 });
  ok('Higher s_total → smaller d_fired → larger C (factor 1/(1-s))',
    near(r0.C_nominal_F * (1 - inp0.sTotal), rS0.C_nominal_F, 1e-9),
    `expected ${(rS0.C_nominal_F).toExponential(4)}, got ${(r0.C_nominal_F * (1 - inp0.sTotal)).toExponential(4)}`);
})();

// ============================================================
// 2. TCC envelope edges
// ============================================================

(function tccEdges() {
  // f_T = 1 at T = 25 °C (the reference) for all classes
  for (const cls of ['C0G', 'X5R', 'X7R', 'X8R', 'Y5V']) {
    ok(`TCC at 25 °C is unity (${cls})`, near(t.tccFactor(cls, 25), 1, 1e-9));
  }

  // C0G is essentially flat: ±0.5 % over full operating range
  ok('C0G is flat over [-55, 150]',
    Math.abs(t.tccFactor('C0G', -55) - 1) < 0.005 && Math.abs(t.tccFactor('C0G', 150) - 1) < 0.005);

  // X5R hits ±15 % limit at +85 °C and -55 °C (asymmetric range, both endpoints).
  ok('X5R at +85 °C = 0.85',  near(t.tccFactor('X5R', 85),  0.85, 1e-9));
  ok('X5R at -55 °C = 0.85',  near(t.tccFactor('X5R', -55), 0.85, 1e-9));

  // X7R hits ±15 % at +125 °C and -55 °C.
  ok('X7R at +125 °C = 0.85', near(t.tccFactor('X7R', 125), 0.85, 1e-9));
  ok('X7R at -55 °C = 0.85',  near(t.tccFactor('X7R', -55), 0.85, 1e-9));

  // X8R hits ±15 % at +150 °C and -55 °C.
  ok('X8R at +150 °C = 0.85', near(t.tccFactor('X8R', 150), 0.85, 1e-9));
  ok('X8R at -55 °C = 0.85',  near(t.tccFactor('X8R', -55), 0.85, 1e-9));

  // Y5V at +85 °C drops to ~18 % (-82 % spec)
  ok('Y5V at +85 °C ≈ 0.18',  near(t.tccFactor('Y5V', 85), 0.18, 0.05));

  // Y5V at -30 °C drops by ~22 % below nominal
  ok('Y5V at -30 °C ≈ 0.78',  near(t.tccFactor('Y5V', -30), 0.78, 0.05));
})();

// ============================================================
// 3. DC bias envelope edges
// ============================================================

(function dcBiasEdges() {
  for (const cls of ['C0G', 'X5R', 'X7R', 'X8R', 'Y5V']) {
    ok(`DC bias at 0 V/µm is unity (${cls})`, t.dcBiasFactor(cls, 0) === 1);
  }
  // C0G stays > 0.999 even at 100 V/µm
  ok('C0G DC-bias derating negligible at 100 V/µm', t.dcBiasFactor('C0G', 100) > 0.999);

  // X7R at field = E0 → exactly 0.5 (sigmoid midpoint, any E0)
  ok('X7R f_V at E = E0 is exactly 0.5',
    near(t.dcBiasFactor('X7R', t.DCBIAS['X7R'].E0), 0.5, 1e-9));

  // X7R at 2× E0 → 1/(1+2^p) for whatever p is configured (param-agnostic)
  const px7r = t.DCBIAS['X7R'].p;
  ok('X7R f_V at 2× E0 matches sigmoid',
    near(t.dcBiasFactor('X7R', 2 * t.DCBIAS['X7R'].E0), 1 / (1 + Math.pow(2, px7r)), 1e-9));

  // Y5V derates dramatically at low field — compare to its own sigmoid params
  const y5v = t.DCBIAS['Y5V'];
  const expected = 1 / (1 + Math.pow(5 / y5v.E0, y5v.p));
  ok('Y5V f_V at 5 V/µm matches sigmoid',
    near(t.dcBiasFactor('Y5V', 5), expected, 1e-9));

  // Monotonic decrease with V for all non-C0G
  for (const cls of ['X5R', 'X7R', 'X8R', 'Y5V']) {
    const fA = t.dcBiasFactor(cls, 1);
    const fB = t.dcBiasFactor(cls, 5);
    const fC = t.dcBiasFactor(cls, 20);
    ok(`${cls} f_V is monotonically decreasing in V`, fA > fB && fB > fC);
  }
})();

// ============================================================
// 4. Warning trigger thresholds
// ============================================================

function warningCodes(inp) {
  return t.compute(inp).warnings.map(w => w.code);
}

(function warnings() {
  // Grain-size floor: h_BT × (1 - s_total) < 0.3 µm. With s_total=0.12, threshold ≈ 0.34 µm
  const trigger = warningCodes({ ...inp0, hBT: 0.3, sTotal: 0.12 });
  ok('h_BT 0.3 µm fires grain-size-floor warning', trigger.includes('D_GRAIN_FLOOR'));

  const noTrigger = warningCodes({ ...inp0, hBT: 1.0 });
  ok('h_BT 1.0 µm does NOT fire grain-size warning', !noTrigger.includes('D_GRAIN_FLOOR'));

  // 3-particle electrode floor: h_Ni fired < 0.3 µm
  const niTrig = warningCodes({ ...inp0, hNi: 0.3 });
  ok('h_Ni 0.3 µm fires 3-particle floor warning', niTrig.includes('NI_PARTICLE_FLOOR'));

  // H_max exceeded: 1000 layers × default thicknesses in an 0805 (H_max 1.35 mm)
  const big = warningCodes({ ...inp0, Ne: 1000 });
  ok('N_e 1000 on 0805 exceeds H_max', big.includes('H_OVER'));

  // h_Ni / h_BT < 0.3 → thin-Ni info
  const thinNi = warningCodes({ ...inp0, hNi: 0.5, hBT: 5.0 });
  ok('h_Ni/h_BT = 0.1 fires THIN_NI info', thinNi.includes('THIN_NI'));

  // h_Ni / h_BT > 2.0 → thick-Ni info
  const thickNi = warningCodes({ ...inp0, hNi: 2.5, hBT: 1.0 });
  ok('h_Ni/h_BT = 2.5 fires THICK_NI info', thickNi.includes('THICK_NI'));

  // Coverage is now an optional efficiency de-rating (default 1.0); high
  // coverage is normal and no longer emits a warning. Shorting risk is governed
  // by the footprint-vs-tolerance (PATTERN_OVER) and margin geometry instead.
  const cov96 = warningCodes({ ...inp0, coverage: 0.96 });
  ok('Coverage 0.96 emits no COVERAGE_HIGH warning', !cov96.includes('COVERAGE_HIGH'));
})();

// ============================================================
// 5. Vendor calibration (loose — just order-of-magnitude sanity)
// ============================================================

(function vendorCalibration() {
  // For each scenario: set realistic recipe inputs and check that
  // the predicted C is within 2× of the rated value (very loose because
  // we don't know exact vendor h_BT, N_e). The point is to flag if a
  // refactor breaks the math by orders of magnitude.

  // Recipe inputs (h_BT, h_Ni, N_e) are engineering-plausible guesses, not the actual
  // proprietary vendor specs. The voltage rating is the main constraint on d_fired
  // (rule of thumb: d_fired ≥ V_rated / 50 µm for X7R/X5R, looser for C0G), and the
  // target C plus case A_overlap determines roughly how many layers fit.
  //
  // Tolerance ±2.5× catches math regressions (wrong scaling, wrong constants, wrong
  // case-area lookup). A real Tier-2 fit to vendor parts would require unknown recipe
  // details these tests deliberately do not pretend to know.
  //
  // Span: 7 of 8 case sizes (0402 → 2220), 4 classes (C0G/X5R/X7R/X8R),
  // voltages 6.3–250 V, capacitances 100 pF → 22 µF (5+ decades).
  const scenarios = [
    // ===== 0402 — small SMD =====
    { name: '0402 X5R 1 µF 6.3 V (smartphone bypass)',
      input: { case: '0402_1005', cls: 'X5R', hBT: 0.6, hNi: 0.4, Ne: 150 },
      target_uF: 1.0, tol: 2.5 },
    { name: '0402 X7R 10 nF 25 V',
      input: { case: '0402_1005', cls: 'X7R', hBT: 3.0, hNi: 0.8, Ne: 6 },
      target_uF: 0.010, tol: 2.5 },

    // ===== 0603 — common SMD =====
    { name: 'Murata GRM188R71H104K (0603 X7R 0.1 µF 50 V)',
      input: { case: '0603_1608', cls: 'X7R', hBT: 4.0, hNi: 1.2, Ne: 50 },
      target_uF: 0.1, tol: 2.5 },
    { name: 'Murata GRM188R71C105K (0603 X7R 1 µF 16 V)',
      input: { case: '0603_1608', cls: 'X7R', hBT: 1.5, hNi: 0.8, Ne: 200 },
      target_uF: 1.0, tol: 2.5 },
    { name: '0603 X5R 10 µF 6.3 V (high-CV)',
      input: { case: '0603_1608', cls: 'X5R', hBT: 0.6, hNi: 0.5, Ne: 440 },
      target_uF: 10.0, tol: 2.5 },
    { name: '0603 C0G 100 pF 50 V (RF timing)',
      input: { case: '0603_1608', cls: 'C0G', hBT: 10.0, hNi: 1.5, Ne: 10 },
      target_uF: 0.0001, tol: 2.5 },
    { name: '0603 C0G 1 nF 50 V',
      input: { case: '0603_1608', cls: 'C0G', hBT: 5.0, hNi: 1.0, Ne: 30 },
      target_uF: 0.001, tol: 2.5 },

    // ===== 0805 — workhorse =====
    { name: 'Murata GRM21BR71H475K (0805 X7R 4.7 µF 50 V)',
      input: { case: '0805_2012', cls: 'X7R', hBT: 1.2, hNi: 0.8, Ne: 350 },
      target_uF: 4.7, tol: 2.5 },
    { name: 'Murata GRM21BR61E106K (0805 X5R 10 µF 25 V)',
      input: { case: '0805_2012', cls: 'X5R', hBT: 0.8, hNi: 0.7, Ne: 450 },
      target_uF: 10.0, tol: 2.5 },
    { name: 'Samsung CL21B105KAFNNNE (0805 X7R 1 µF 25 V — verified Mouser/LCSC)',
      input: { case: '0805_2012', cls: 'X7R', hBT: 1.8, hNi: 1.0, Ne: 120 },
      target_uF: 1.0, tol: 2.5 },
    { name: '0805 X7R 1 µF 100 V (industrial)',
      input: { case: '0805_2012', cls: 'X7R', hBT: 3.0, hNi: 1.2, Ne: 200 },
      target_uF: 1.0, tol: 2.5 },
    { name: 'Murata GRM2165C2A103J (0805 C0G 10 nF 100 V)',
      input: { case: '0805_2012', cls: 'C0G', hBT: 4.0, hNi: 1.2, Ne: 200 },
      target_uF: 0.01, tol: 3.0 },
    { name: 'Murata GCM21BR71H105KA73 (0805 X8R 1 µF 50 V automotive)',
      input: { case: '0805_2012', cls: 'X8R', hBT: 2.0, hNi: 1.0, Ne: 150 },
      target_uF: 1.0, tol: 2.5 },

    // ===== 1206 — mid-large =====
    { name: 'Murata GRM31CR71H106K (1206 X7R 10 µF 50 V)',
      input: { case: '1206_3216', cls: 'X7R', hBT: 1.2, hNi: 0.8, Ne: 300 },
      target_uF: 10.0, tol: 2.5 },
    { name: 'Murata GRM31MR71H105K (1206 X7R 1 µF 50 V)',
      input: { case: '1206_3216', cls: 'X7R', hBT: 2.0, hNi: 1.0, Ne: 60 },
      target_uF: 1.0, tol: 2.5 },
    { name: 'TDK C3216X7R2A224K (1206 X7R 220 nF 100 V)',
      input: { case: '1206_3216', cls: 'X7R', hBT: 3.0, hNi: 1.2, Ne: 10 },
      target_uF: 0.22, tol: 2.5 },
    { name: '1206 X7R 100 nF 250 V (high-voltage)',
      input: { case: '1206_3216', cls: 'X7R', hBT: 10.0, hNi: 1.5, Ne: 20 },
      target_uF: 0.1, tol: 2.5 },

    // ===== 1210 — large =====
    { name: 'Murata GRM32ER61E226M (1210 X5R 22 µF 25 V)',
      input: { case: '1210_3225', cls: 'X5R', hBT: 1.0, hNi: 0.8, Ne: 350 },
      target_uF: 22.0, tol: 2.5 },

    // ===== 1812 / 2220 — HV and bulk =====
    { name: 'TDK C4532X7R1H475K (1812 X7R 4.7 µF 50 V)',
      input: { case: '1812_4532', cls: 'X7R', hBT: 2.0, hNi: 1.2, Ne: 40 },
      target_uF: 4.7, tol: 2.5 },
    { name: 'Murata GRM55ER71H226K (2220 X7R 22 µF 50 V)',
      input: { case: '2220_5750', cls: 'X7R', hBT: 1.5, hNi: 1.0, Ne: 100 },
      target_uF: 22.0, tol: 2.5 },
  ];

  for (const s of scenarios) {
    // Real manufactured parts have partial electrode coverage; supply a realistic
    // 0.90 here (coverage now defaults to 1.0 = "overlap is the active area").
    const r = t.compute({ ...t.defaultInputs(), tier2: false, coverage: 0.90, ...s.input });
    const got_uF = r.C_nominal_F * 1e6;
    const ratio  = got_uF / s.target_uF;
    const pass   = ratio >= 1 / s.tol && ratio <= s.tol;
    ok(s.name,
      pass,
      `predicted ${got_uF.toFixed(3)} µF vs rated ${s.target_uF} µF → ratio ${ratio.toFixed(2)}× (tol ±${s.tol}×)`);
  }
})();

// ============================================================
// 6. Tier 2 overlay sanity
// ============================================================

(function tier2Overlay() {
  // X7R at 25 °C, 0 V → derated == nominal
  const r = t.compute({ ...inp0, vdc: 0, top: 25 });
  ok('Tier 2 with V=0, T=25 → derated == nominal',
    near(r.C_derated_F, r.C_nominal_F, 1e-9));

  // X7R at 25 V on 2.0 µm h_BT (1.76 fired) → E ≈ 14.2 V/µm → strong derating
  const r2 = t.compute({ ...inp0, vdc: 25, top: 25 });
  ok('X7R at 25 V, 25 °C shows derating', r2.C_derated_F < r.C_nominal_F * 0.5);

  // C0G at 25 V should derate by <1 %
  const r3 = t.compute({ ...inp0, cls: 'C0G', vdc: 25, top: 25 });
  ok('C0G at 25 V, 25 °C barely derates', r3.f_V > 0.99);

  // Toggling tier2 off bypasses corrections
  const rOff = t.compute({ ...inp0, vdc: 50, top: 150, tier2: false });
  ok('tier2:false bypasses TCC/V_DC',
    near(rOff.C_derated_F, rOff.C_nominal_F, 1e-9));
})();

// ============================================================
// 7. SEMCO part-number decoder
// ============================================================

(function decoderDirect() {
  // Verified-real part from Mouser / LCSC / TME web lookup.
  const a = t.parseSemcoCL('CL21B105KAFNNNE');
  ok('CL21B105KAFNNNE: case = 0805_2012', a.case === '0805_2012');
  ok('CL21B105KAFNNNE: cls = X7R',         a.cls === 'X7R');
  ok('CL21B105KAFNNNE: C = 1 µF',          near(a.C_uF, 1.0, 1e-6));
  ok('CL21B105KAFNNNE: tol = ±10%',        a.tol === '±10%');
  ok('CL21B105KAFNNNE: V = 25',            a.V === 25);
  ok('CL21B105KAFNNNE: plating N (BME)',   a.platingCode === 'N');
  ok('CL21B105KAFNNNE: control N',         a.controlCode === 'N');

  // Wiki canonical example (samsung-cl-series.md).
  const b = t.parseSemcoCL('CL10B104KB8NNNC');
  ok('CL10B104KB8NNNC: case = 0603_1608',  b.case === '0603_1608');
  ok('CL10B104KB8NNNC: cls = X7R',         b.cls === 'X7R');
  ok('CL10B104KB8NNNC: C = 100 nF',        near(b.C_uF, 0.1, 1e-6));
  ok('CL10B104KB8NNNC: V = 50',            b.V === 50);
  ok('CL10B104KB8NNNC: tol = ±10%',        b.tol === '±10%');

  // High-voltage Class I encoding (C = C0G TCC, B = 50 V).
  const c = t.parseSemcoCL('CL31B106KAHNNNE');
  ok('CL31B106KAHNNNE: case = 1206_3216',  c.case === '1206_3216');
  ok('CL31B106KAHNNNE: C = 10 µF',         near(c.C_uF, 10.0, 1e-6));
  ok('CL31B106KAHNNNE: V = 25',            c.V === 25);

  // 0402 X5R from open-access spec sheet (CL05A105KQ5NNNC = 1 µF 6.3V).
  const d = t.parseSemcoCL('CL05A105KQ5NNNC');
  ok('CL05A105KQ5NNNC: case = 0402_1005',  d.case === '0402_1005');
  ok('CL05A105KQ5NNNC: cls = X5R',         d.cls === 'X5R');
  ok('CL05A105KQ5NNNC: V = 6.3',           d.V === 6.3);
  ok('CL05A105KQ5NNNC: C = 1 µF',          near(d.C_uF, 1.0, 1e-6));
})();

// ============================================================
// 8. SEMCO decoder error handling
// ============================================================

(function decoderErrors() {
  function throws(name, fn) {
    try { fn(); failed++; failures.push(`✗ ${name} — should have thrown`); }
    catch (e) { passed++; }
  }
  throws('rejects non-CL prefix',     () => t.parseSemcoCL('GRM21BR71H105KA'));
  throws('rejects too short',         () => t.parseSemcoCL('CL21B105'));
  throws('rejects too long',          () => t.parseSemcoCL('CL21B105KAFNNNEXTRA'));
  throws('rejects unknown size code', () => t.parseSemcoCL('CL99B105KAFNNNE'));
  throws('rejects unknown TCC code',  () => t.parseSemcoCL('CL21Z105KAFNNNE'));
  throws('rejects unknown V code',    () => t.parseSemcoCL('CL21B105K?FNNNE'));
  throws('rejects bad cap code',      () => t.parseSemcoCL('CL21BABCKAFNNNE'));
})();

// ============================================================
// 9. Cross-check: every SEMCO part in VENDOR_PARTS must decode
//    to the same case / cls / V / C as its metadata claims.
//    This is what would have caught the V=50 → V=25 mistake
//    on CL21B105KAFNNNE.
// ============================================================

(function crossCheckVendor() {
  const semcoParts = t.VENDOR_PARTS.filter(p => p.mfr === 'Samsung' && p.pn.startsWith('CL'));
  ok('At least 4 Samsung CL parts in VENDOR_PARTS', semcoParts.length >= 4);

  for (const p of semcoParts) {
    let d;
    try { d = t.parseSemcoCL(p.pn); }
    catch (e) {
      ok(`${p.pn}: decodes without error`, false, e.message);
      continue;
    }
    ok(`${p.pn}: decoded case = metadata case`,
       d.case === p.case,  `decoded ${d.case} vs metadata ${p.case}`);
    ok(`${p.pn}: decoded cls = metadata cls`,
       d.cls === p.cls,    `decoded ${d.cls} vs metadata ${p.cls}`);
    ok(`${p.pn}: decoded V = metadata V`,
       d.V === p.V,        `decoded ${d.V} V vs metadata ${p.V} V`);
    ok(`${p.pn}: decoded C ≈ metadata C`,
       near(d.C_uF, p.C_uF, 1e-4),
       `decoded ${d.C_uF} µF vs metadata ${p.C_uF} µF`);
  }
})();

// ============================================================
// 10. solveRecipe — inverse predictor
// ============================================================

(function solveRecipeTests() {
  // Round-trip: solveRecipe → compute should give back C_target ≈ exactly,
  // because solveRecipe back-solves N_e from C_target.
  for (const p of t.VENDOR_PARTS) {
    let r;
    try {
      r = t.solveRecipe({ case: p.case, cls: p.cls, V: p.V, C_target_uF: p.C_uF });
    } catch (e) {
      ok(`solveRecipe ${p.pn}: throws`, false, e.message);
      continue;
    }
    ok(`solveRecipe ${p.pn}: feasible (N_e_actual ≤ N_e_max)`,
       r.N_e_actual <= r.N_e_max);
    ok(`solveRecipe ${p.pn}: no overflow`,
       !r.overflow,
       r.overflow ? `C_target ${p.C_uF} µF > C_max ${r.C_max_uF.toFixed(2)} µF` : '');
    ok(`solveRecipe ${p.pn}: H_stack within budget`,
       r.H_stack_um <= r.H_max_um);
    ok(`solveRecipe ${p.pn}: d_fired ≥ 0.5 µm`,
       r.d_fired_um >= 0.5);
  }

  // Round-trip with compute: feed the recipe back through compute() and verify
  // we get C_target.
  const part = t.VENDOR_PARTS.find(p => p.pn === 'GRM21BR71H475K'); // 0805 X7R 4.7 µF 50 V
  const r = t.solveRecipe({ case: part.case, cls: part.cls, V: part.V, C_target_uF: part.C_uF });
  const inp = {
    case: part.case, cls: part.cls,
    hBT: r.h_BT_green,
    hNi: r.h_Ni_um,
    Ne:  r.N_e_actual,
    cover:    60,
    coverage: 0.90,
    sTotal:   0.14,
    disc:     0.15,
    tier2:    false,
    vdc: 0, top: 25,
  };
  const c = t.compute(inp);
  ok('solveRecipe → compute round-trip within ±2 %',
    near(c.C_nominal_F * 1e6, part.C_uF, 0.02),
    `expected ${part.C_uF} µF, got ${(c.C_nominal_F * 1e6).toFixed(3)} µF`);
})();

// ============================================================
// 11. predictCMax — forward upper-bound predictor
// ============================================================

(function predictCMaxTests() {
  // Every vendor part should have its rated C ≤ C_max.
  // (= no envelope violations under the calibrated design rules)
  for (const p of t.VENDOR_PARTS) {
    const m = t.predictCMax({ case: p.case, cls: p.cls, V: p.V });
    ok(`predictCMax ${p.pn}: rated ${p.C_uF} µF ≤ C_max ${m.C_max_uF.toFixed(2)} µF`,
       p.C_uF <= m.C_max_uF);
  }

  // C_max scales correctly: doubling case area roughly doubles C_max
  const m0805 = t.predictCMax({ case: '0805_2012', cls: 'X7R', V: 50 });
  const m1210 = t.predictCMax({ case: '1210_3225', cls: 'X7R', V: 50 });
  ok('C_max larger for bigger case',
     m1210.C_max_uF > m0805.C_max_uF * 1.5);

  // Higher V_rated → thicker d_fired → smaller C_max
  const mLowV  = t.predictCMax({ case: '0805_2012', cls: 'X7R', V: 25 });
  const mHighV = t.predictCMax({ case: '0805_2012', cls: 'X7R', V: 100 });
  ok('C_max smaller for higher V_rated',
     mHighV.C_max_uF < mLowV.C_max_uF * 0.7);
})();

// ============================================================
// 11b. cmaxEnvelope — absolute manufacturing ceiling (bleeding-edge geometry
//      + grain/casting d-floor). Fixes the 0201 high-CV under-prediction.
// ============================================================

(function cmaxEnvelopeTests() {
  // Real catalog part: Samsung CL03A475 = 0201 X5R 4.7 µF 6.3 V. The envelope
  // MUST admit it (the old predictCMax wrongly capped 0201 at ~0.2 µF).
  const e = t.cmaxEnvelope({ case: '0201_0603', cls: 'X5R', V: 6.3 });
  ok(`cmaxEnvelope admits CL03A475 (0201 X5R 4.7µF): C_max ${e.C_max_uF.toFixed(2)} µF ≥ 4.7`,
     e.C_max_uF >= 4.7);

  // Envelope must be ≥ the typical-design predictCMax for the same spec.
  const typ = t.predictCMax({ case: '0201_0603', cls: 'X5R', V: 6.3 });
  ok('cmaxEnvelope ≥ predictCMax (frontier ≥ typical)',
     e.C_max_uF >= typ.C_max_uF);

  // Dielectric never goes below the physical frontier floor.
  for (const V of [2.5, 4, 6.3, 10]) {
    const ev = t.cmaxEnvelope({ case: '0402_1005', cls: 'X5R', V });
    ok(`cmaxEnvelope d_fired ≥ frontier floor at ${V} V (got ${ev.d_fired_um.toFixed(3)} µm)`,
       ev.d_fired_um >= t.D_FLOOR_FRONTIER - 1e-9);
  }

  // High voltage is breakdown-field-limited, not floored.
  const hv = t.cmaxEnvelope({ case: '1206_3216', cls: 'X7R', V: 200 });
  ok('cmaxEnvelope d_fired tracks V/E_MAX at high voltage (200 V → ~6.7 µm)',
     Math.abs(hv.d_fired_um - 200 / t.E_MAX_FIELD) < 1e-6);

  // Margins scale with case size (the bug fix): a 0201 has smaller absolute
  // margins than an 0805.
  const e0201 = t.cmaxEnvelope({ case: '0201_0603', cls: 'X7R', V: 16 });
  const e0805 = t.cmaxEnvelope({ case: '0805_2012', cls: 'X7R', V: 16 });
  ok('cmaxEnvelope margins scale with case (0201 sm < 0805 sm)',
     e0201.sm < e0805.sm);

  // No real vendor part may exceed its absolute envelope.
  for (const p of t.VENDOR_PARTS) {
    const env = t.cmaxEnvelope({ case: p.case, cls: p.cls, V: p.V });
    ok(`cmaxEnvelope admits ${p.pn} (${p.C_uF} µF ≤ ${env.C_max_uF.toFixed(1)})`,
       p.C_uF <= env.C_max_uF);
  }

  // Bigger case → bigger envelope.
  ok('cmaxEnvelope larger for bigger case',
     t.cmaxEnvelope({ case: '1210_3225', cls: 'X7R', V: 25 }).C_max_uF >
     t.cmaxEnvelope({ case: '0805_2012', cls: 'X7R', V: 25 }).C_max_uF);
})();

// ============================================================
// 12. KNOWN_PARTS calibration (regression coverage for the
//     forward-prediction accuracy against documented academic parts)
// ============================================================

(function knownPartsRegression() {
  const liu = t.KNOWN_PARTS.filter(k => k.src === 'liu-carts2014');
  ok('Liu Table III: 24 documented MLCCs in KNOWN_PARTS', liu.length === 24);

  function geoMean(arr) {
    return Math.exp(arr.map(Math.log).reduce((a, b) => a + b, 0) / arr.length);
  }

  // --- TRAIN set: Liu parts (the grain curve was fit on these) ---
  const ratios = [];
  for (const k of liu) {
    const r = t.computeFromKnown(k);
    if (!r) continue;
    ratios.push(r.C_pred_uF / k.C_uF);
  }

  const gm = geoMean(ratios);
  ok(`Liu train set: geomean ratio centered (got ${gm.toFixed(3)}×, want 0.85–1.20)`,
     gm >= 0.85 && gm <= 1.20);

  // Honest hit-rate floors with the grain curve (no longer the overfit
  // vendor lookup). The true 1σ spread is ~34 %, so we expect ~40 % within
  // ±20 % and ~85 % within ±50 %.
  const ok20 = ratios.filter(r => Math.abs(r - 1) < 0.20).length / ratios.length;
  const ok50 = ratios.filter(r => Math.abs(r - 1) < 0.50).length / ratios.length;
  ok(`Liu train set: ≥ 35 % within ±20 % (got ${(ok20 * 100).toFixed(0)} %)`,
     ok20 >= 0.35);
  ok(`Liu train set: ≥ 75 % within ±50 % (got ${(ok50 * 100).toFixed(0)} %)`,
     ok50 >= 0.75);

  // --- HELD-OUT test set: parts the grain curve was NOT fit on. These have
  //     no disclosed grain → fall through to the class-default ε_r, which is
  //     exactly how a real (unknown-grain) part is handled. This is the
  //     honest out-of-sample generalization check. ---
  const heldOut = t.KNOWN_PARTS.filter(k =>
    (k.src === 'hernandez-2018' || k.src === 'chun-2024-screp') &&
    k.N_a != null && k.C_uF != null);
  ok('Held-out test set is non-empty', heldOut.length >= 1);
  for (const k of heldOut) {
    const r = t.computeFromKnown(k);
    if (!r) continue;
    const ratio = r.C_pred_uF / k.C_uF;
    // Held-out parts should still land within the model's honest ±2× band.
    ok(`Held-out ${k.id}: prediction within 0.5–2.0× (got ${ratio.toFixed(2)}×)`,
       ratio >= 0.5 && ratio <= 2.0);
  }

  // Song 2017 graded part should round-trip exactly (it's a back-fit calibration)
  const song = t.KNOWN_PARTS.find(k => k.id === 'song-2017-graded');
  ok('Song 2017 graded part exists in KNOWN_PARTS', !!song);
  if (song) {
    const r = t.computeFromKnown(song);
    ok('Song 2017 graded part round-trips within 1 %',
       Math.abs(r.C_pred_uF - song.C_uF) / song.C_uF < 0.01,
       `predicted ${r.C_pred_uF.toFixed(3)} µF vs rated ${song.C_uF} µF`);
  }

  // --- erGrain physics curve sanity ---
  ok('erGrain rises with grain size',
     t.erGrain('X7R', 0.3) < t.erGrain('X7R', 0.6));
  ok('erGrain clamps floor at fine grain (≥ 2000)',
     t.erGrain('X7R', 0.1) >= 2000);
  ok('erGrain clamps ceiling at coarse grain (≤ 9000)',
     t.erGrain('X7R', 1.5) <= 9000);
  ok('erGrain falls back to class default when grain unknown',
     t.erGrain('X7R', null) === t.CLASSES.find(c => c.id === 'X7R').er);
  ok('erGrain is grain-independent for C0G (paraelectric)',
     t.erGrain('C0G', 0.3) === t.erGrain('C0G', 0.8));

  // erForKnown dispatch: a part with disclosed grain uses the grain curve
  const grainPart = liu.find(k => k.grain_um != null && !k.er_override);
  if (grainPart) {
    ok('erForKnown uses grain curve for parts with disclosed grain',
       t.erForKnown(grainPart) === t.erGrain(grainPart.cls, grainPart.grain_um));
  }
})();

// ============================================================
// 13. Tier-2 DC-bias model validated against Vishay Fig. 2 measured curve
//     (locks the f_V calibration so it can't silently regress; see
//      simulator/dc_bias_bench.cjs for the full benchmark)
// ============================================================

(function dcBiasGroundTruth() {
  // E (V/µm) → measured f_V from Vishay "Cap Drift of X7R under DC Bias" Fig. 2
  const measured = [
    { E: 2,  fV: 0.90 }, { E: 4, fV: 0.75 }, { E: 6, fV: 0.55 },
    { E: 10, fV: 0.40 }, { E: 20, fV: 0.20 },
  ];
  // Each point must be within 8 percentage-points of measured.
  for (const m of measured) {
    const pred = t.dcBiasFactor('X7R', m.E);
    ok(`X7R f_V at ${m.E} V/µm within 8 pp of measured (${(m.fV*100).toFixed(0)} %)`,
       Math.abs(pred - m.fV) < 0.08,
       `predicted ${(pred*100).toFixed(0)} %`);
  }
  // RMS-log-error guard: must stay well below the old (E0=4,p=2) value of 0.94.
  const rms = Math.sqrt(measured.reduce((s, m) =>
    s + Math.log(t.dcBiasFactor('X7R', m.E) / m.fV) ** 2, 0) / measured.length);
  ok(`X7R DC-bias RMS-log-error < 0.10 (got ${rms.toFixed(3)})`, rms < 0.10);

  // Class ordering: at a fixed field, X8R should retain more C than X7R,
  // which retains more than X5R, which retains more than Y5V.
  const E = 5;
  ok('DC-bias class ordering X8R > X7R > X5R > Y5V at 5 V/µm',
     t.dcBiasFactor('X8R', E) > t.dcBiasFactor('X7R', E) &&
     t.dcBiasFactor('X7R', E) > t.dcBiasFactor('X5R', E) &&
     t.dcBiasFactor('X5R', E) > t.dcBiasFactor('Y5V', E));
})();

// ============================================================
// Report
// ============================================================

console.log(`\n${passed + failed} test cases.`);
console.log(`  passed: ${passed}`);
console.log(`  failed: ${failed}`);
if (failed > 0) {
  console.log('\nFailures:');
  failures.forEach(f => console.log('  ' + f));
  process.exit(1);
}
console.log('\nAll green.');
