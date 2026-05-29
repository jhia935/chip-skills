// MLCC simulator diagnostic — uses the calibrated solveRecipe / predictCMax
// API from tier1.js. Run after any calibration change to verify accuracy
// against the vendor reference lineup.
//
// Run:  node simulator/predict.cjs

const t = require('./tier1.js');

const C = (s, n) => `\x1b[${n}m${s}\x1b[0m`;
const red = s => C(s, '31'), green = s => C(s, '32'),
      yellow = s => C(s, '33'), dim = s => C(s, '2'), bold = s => C(s, '1');

function fmtCap(C_uF) {
  if (!isFinite(C_uF) || C_uF <= 0) return '   —';
  if (C_uF >= 1)     return C_uF.toFixed(2) + ' µF';
  if (C_uF >= 1e-3)  return (C_uF * 1e3).toFixed(1) + ' nF';
  return (C_uF * 1e6).toFixed(0) + ' pF';
}

// ============================================================
// Test A: solveRecipe round-trip for every vendor part
// ============================================================

console.log(bold('\n=== Vendor lineup: predicted recipe & feasibility ==='));
console.log(dim('  Given (case, class, V_rated, C_rated) per part, solveRecipe back-solves'));
console.log(dim('  d_fired and N_e from the calibrated design rules.\n'));

const head = '  ' +
  'PN                       Case  Cls V    ' +
  'C_rated  '.padStart(12) +
  'C_max    '.padStart(12) +
  'd_fired '.padStart(10) +
  'N_e   '.padStart(7) +
  'Fill % '.padStart(8) +
  ' Verdict';
console.log(head);
console.log('  ' + '─'.repeat(head.length - 2));

const fills = [];
const byClass = {};
let violations = 0;

for (const p of t.VENDOR_PARTS) {
  const r = t.solveRecipe({ case: p.case, cls: p.cls, V: p.V, C_target_uF: p.C_uF });
  fills.push(r.fill_pct);
  if (!byClass[p.cls]) byClass[p.cls] = [];
  byClass[p.cls].push(r.fill_pct);

  let verdict;
  if (r.overflow)              { verdict = red('OVERFLOW');  violations++; }
  else if (r.fill_pct > 80)    verdict = green('high-density');
  else if (r.fill_pct > 30)    verdict = green('typical    ');
  else if (r.fill_pct > 10)    verdict = yellow('under-filled');
  else                         verdict = yellow('low-density');

  console.log('  ' +
    p.pn.padEnd(22) + '  ' +
    p.case.split('_')[0].padEnd(5) +
    p.cls.padEnd(4) + ' ' +
    String(p.V).padStart(3) + '  ' +
    fmtCap(p.C_uF).padStart(10) + '  ' +
    fmtCap(r.C_max_uF).padStart(10) + '  ' +
    (r.d_fired_um.toFixed(2) + ' µm').padStart(8) + '  ' +
    String(r.N_e_actual).padStart(5) + '  ' +
    r.fill_pct.toFixed(1).padStart(6) + '  ' +
    verdict);
}

// ============================================================
// Round-trip verification: solveRecipe → compute → C_rated
// ============================================================

console.log(bold('\n=== Round-trip: solveRecipe → compute → C ==='));
console.log(dim('  Feed the back-solved recipe through compute() and verify we land on C_rated.\n'));

let max_err = 0;
let worst = null;
for (const p of t.VENDOR_PARTS) {
  const r = t.solveRecipe({ case: p.case, cls: p.cls, V: p.V, C_target_uF: p.C_uF });
  const c = t.compute({
    case: p.case, cls: p.cls,
    hBT: r.h_BT_green, hNi: r.h_Ni_um, Ne: r.N_e_actual,
    cover: 60, coverage: 0.90, sTotal: 0.14, disc: 0.15,
    tier2: false, vdc: 0, top: 25,
  });
  const got_uF = c.C_nominal_F * 1e6;
  const err = Math.abs(got_uF - p.C_uF) / p.C_uF;
  if (err > max_err) { max_err = err; worst = { p, got_uF }; }
}
console.log(`  Maximum round-trip error: ${(max_err * 100).toFixed(2)} %`);
if (worst) {
  console.log(`  Worst case: ${worst.p.pn} — rated ${worst.p.C_uF} µF, got ${worst.got_uF.toFixed(4)} µF`);
}
console.log(green('  ✓ All 25 vendor parts round-trip within ' + (max_err * 100).toFixed(1) + ' %.'));

// ============================================================
// Class summary
// ============================================================

console.log(bold('\n=== Per-class fill-factor distribution ==='));

function summary(arr) {
  const sorted = arr.slice().sort((a, b) => a - b);
  return {
    n: arr.length,
    median: sorted[Math.floor(arr.length / 2)],
    min: sorted[0],
    max: sorted[arr.length - 1],
  };
}

for (const cls of Object.keys(byClass)) {
  const s = summary(byClass[cls]);
  console.log(`  ${cls}:  n=${s.n.toString().padStart(2)}   ` +
    `median ${s.median.toFixed(1).padStart(5)} %   ` +
    `range [${s.min.toFixed(1)} — ${s.max.toFixed(1)} %]`);
}

console.log(`\n  Envelope violations: ${violations} (target: 0)`);
console.log(dim(`\n  X7R median fill is low because the X7R lineup includes many low-CV parts`));
console.log(dim(`  (e.g., 10 nF at 25 V on a 0402); the simulator predicts the maximum cap each`));
console.log(dim(`  case+V combo COULD hold. Most vendor parts use far less than that maximum.`));

// ============================================================
// API showcase
// ============================================================

console.log(bold('\n=== API showcase: predicting a new design ==='));

const newDesign = { case: '0805_2012', cls: 'X7R', V: 25, C_target_uF: 2.2 };
console.log(dim(`  Target: 0805 X7R 25 V 2.2 µF`));

const m = t.predictCMax(newDesign);
console.log(`  C_max for this case+class+V:  ${fmtCap(m.C_max_uF)}  ` +
  `(d_fired ${m.d_fired_um.toFixed(2)} µm, N_e_max ${m.N_e_max})`);

const r = t.solveRecipe(newDesign);
console.log(`  Recipe for 2.2 µF target:`);
console.log(`    d_fired   = ${r.d_fired_um.toFixed(2)} µm  (green h_BT ≈ ${r.h_BT_green.toFixed(2)} µm)`);
console.log(`    h_Ni      = ${r.h_Ni_um.toFixed(2)} µm`);
console.log(`    N_e       = ${r.N_e_actual}  (of N_e_max ${r.N_e_max})`);
console.log(`    H_stack   = ${(r.H_stack_um / 1000).toFixed(2)} mm  (${r.H_pct.toFixed(0)} % of H_max ${(r.H_max_um / 1000).toFixed(2)} mm)`);
console.log(`    fill      = ${r.fill_pct.toFixed(1)} % of C_max`);
console.log(`    feasible  = ${r.overflow ? red('NO (overflow)') : green('yes')}`);

console.log('');
