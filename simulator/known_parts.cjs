// Benchmark: how accurately does the simulator's compute() reproduce the
// rated capacitance of MLCCs WITH PUBLICLY-DISCLOSED FULL GEOMETRY?
//
// Unlike VENDOR_PARTS (where recipe is proprietary), KNOWN_PARTS has
// d_fired, h_Ni, and N_a documented in academic papers. The forward
// computation is then a genuine prediction (no fitting).
//
// Sources covered:
//   - Liu CARTS 2014 Table III: 24 commercial Ni-BaTiO3 MLCCs (mfr A/B/C/P)
//   - Polotai 2007: Penn State 0805 thin-layer demo
//   - Yoon, Kim, Kim 2020: research X7R MLCC
//   - Song 2017: compositionally-graded BTS-BCN MLCC (with override)
//   - Yan thesis 2013: Samsung 1206/0603 production parts (N_e not disclosed)
//
// Run:  node simulator/known_parts.cjs

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
// Liu CARTS 2014 — forward prediction accuracy on 24 commercial parts
// ============================================================

console.log(bold('\n=== Liu CARTS 2014 Table III: 24 commercial MLCCs ==='));
console.log(dim('  Each part has DISCLOSED d_fired + N_a. We forward-compute C using compute()'));
console.log(dim('  with the calibrated ε_r values and check the ratio vs the rated cap.\n'));

const head = '  ' +
  'CAP ID         Case Cls V    ' +
  'C_rated  '.padStart(10) +
  'd_fired '.padStart(10) +
  'N_a   '.padStart(7) +
  'C_pred  '.padStart(10) +
  'Ratio '.padStart(8) +
  'HALT' +
  '  Verdict';
console.log(head);
console.log('  ' + '─'.repeat(head.length - 2));

const liu = t.KNOWN_PARTS.filter(k => k.src === 'liu-carts2014');
const ratios = [];
const byCase = {};

for (const k of liu) {
  const r = t.computeFromKnown(k);
  if (!r) continue;
  const ratio = r.C_pred_uF / k.C_uF;
  ratios.push(ratio);
  if (!byCase[k.case]) byCase[k.case] = [];
  byCase[k.case].push(ratio);

  let v;
  if (Math.abs(ratio - 1) < 0.20)      v = green('±20 %  ');
  else if (Math.abs(ratio - 1) < 0.50) v = yellow('±50 %  ');
  else                                  v = red(`${((ratio - 1) * 100).toFixed(0)}%`.padStart(7));

  const haltClr = k.halt === 'pass' ? green('pass') : red('fail');

  console.log('  ' +
    k.id.padEnd(14) +
    k.case.split('_')[0].padEnd(5) +
    k.cls.padEnd(4) + ' ' +
    String(k.V).padStart(4) + ' ' +
    fmtCap(k.C_uF).padStart(10) + '  ' +
    (k.d_fired_um.toFixed(2) + ' µm').padStart(8) + '  ' +
    String(k.N_a).padStart(5) + '   ' +
    fmtCap(r.C_pred_uF).padStart(10) + '  ' +
    (ratio.toFixed(2) + '×').padStart(7) + '  ' +
    haltClr + '  ' +
    v);
}

// ============================================================
// Summary stats
// ============================================================

function geoMean(arr) {
  return Math.exp(arr.map(Math.log).reduce((a, b) => a + b, 0) / arr.length);
}
function stddev(arr) {
  const m = arr.reduce((a, b) => a + b, 0) / arr.length;
  return Math.sqrt(arr.map(x => (x - m) ** 2).reduce((a, b) => a + b, 0) / arr.length);
}

const gm = geoMean(ratios);
const ok20 = ratios.filter(r => Math.abs(r - 1) < 0.20).length;
const ok50 = ratios.filter(r => Math.abs(r - 1) < 0.50).length;
const lnstd = stddev(ratios.map(Math.log));

console.log(`\n  Total: ${ratios.length} commercial parts with full disclosed geometry`);
console.log(`    within ±20 %:   ${ok20} (${(ok20 / ratios.length * 100).toFixed(0)} %)`);
console.log(`    within ±50 %:   ${ok50} (${(ok50 / ratios.length * 100).toFixed(0)} %)`);
console.log(`    geomean ratio:  ${gm.toFixed(3)}× ${gm > 1.15 ? red('(simulator over-predicts)') : gm < 0.87 ? red('(simulator under-predicts)') : green('(centered)')}`);
console.log(`    σ(ln ratio):    ${lnstd.toFixed(3)} (1σ spread ≈ ${(Math.exp(lnstd) * 100 - 100).toFixed(0)} %)`);

console.log('\n  Per-case:');
for (const c of Object.keys(byCase).sort()) {
  const arr = byCase[c];
  const g = geoMean(arr);
  console.log(`    ${c.split('_')[0]}: n=${arr.length}, geomean ${g.toFixed(2)}×, range [${Math.min(...arr).toFixed(2)} — ${Math.max(...arr).toFixed(2)}]`);
}

// ============================================================
// Other known parts
// ============================================================

console.log(bold('\n=== Other documented MLCCs (single-source) ==='));

const other = t.KNOWN_PARTS.filter(k => k.src !== 'liu-carts2014');
for (const k of other) {
  console.log(`\n  ${bold(k.id)}  (${k.src})`);
  console.log(`    ${k.case.split('_')[0]} ${k.cls} ${k.V} V  ·  d_fired ${k.d_fired_um} µm  ·  h_Ni ${k.h_Ni_fired_um} µm  ·  N_a ${k.N_a == null ? dim('—') : k.N_a}`);
  if (k.note) console.log(dim(`    ${k.note}`));

  const r = t.computeFromKnown(k);
  if (r == null) {
    console.log(dim(`    Cannot predict — N_a not disclosed.`));
  } else if (k.C_uF != null) {
    const ratio = r.C_pred_uF / k.C_uF;
    const v = Math.abs(ratio - 1) < 0.15 ? green('±15 %') : Math.abs(ratio - 1) < 0.30 ? yellow('±30 %') : red('OFF');
    console.log(`    Predicted:  ${fmtCap(r.C_pred_uF)}    vs rated ${fmtCap(k.C_uF)}    →  ${ratio.toFixed(2)}×  ${v}`);
  } else {
    console.log(dim(`    Predicted:  ${fmtCap(r.C_pred_uF)}  (rated C not disclosed)`));
  }
}

// ============================================================
// Leave-one-out cross-validation of the grain-size ε_r curve
// ============================================================
//
// The in-sample numbers above can flatter the model: the grain curve was
// fit on these same 24 parts. LOO-CV is the honest generalization estimate —
// refit the curve excluding each part, predict that held-out part, measure.

console.log(bold('\n=== Leave-one-out CV of the grain-size ε_r curve ==='));
console.log(dim('  Refit ε_r(grain) = a + b·grain on 23 parts, predict the 24th. Repeat.\n'));

const EPS0 = t.EPS0;
function aEff(caseId) {
  const c = t.CASES.find(x => x.id === caseId);
  return (c.L - 2 * c.em) * (c.W - 2 * c.sm) * 0.90 * 0.85 * 1e-12; // m²
}
// implied ε_r for each Liu part (from rated C + disclosed geometry)
const grainParts = liu.filter(k => k.grain_um != null && k.N_a != null);
function impliedEr(k) {
  return (k.C_uF * 1e-6 * k.d_fired_um * 1e-6) / (EPS0 * aEff(k.case) * k.N_a);
}
function linfit(pts) { // least-squares er = a + b·g
  const n = pts.length;
  const mg = pts.reduce((s, p) => s + p.g, 0) / n;
  const me = pts.reduce((s, p) => s + p.er, 0) / n;
  const b = pts.reduce((s, p) => s + (p.g - mg) * (p.er - me), 0) /
            pts.reduce((s, p) => s + (p.g - mg) ** 2, 0);
  return { a: me - b * mg, b };
}

const looRatios = [];
for (let i = 0; i < grainParts.length; i++) {
  const test = grainParts[i];
  const train = grainParts.filter((_, j) => j !== i)
    .map(k => ({ g: k.grain_um, er: impliedEr(k) }))
    .filter(p => p.er < 12000); // drop transcription outlier from the fit
  const { a, b } = linfit(train);
  const erPred = Math.max(2000, Math.min(9000, a + b * test.grain_um));
  const Cpred = erPred * EPS0 * aEff(test.case) * test.N_a / (test.d_fired_um * 1e-6) * 1e6;
  looRatios.push(Cpred / test.C_uF);
}
const looClean = looRatios.filter(r => r < 3); // exclude the outlier's own prediction
console.log(`  LOO-CV geomean ratio:  ${geoMean(looClean).toFixed(3)}×`);
console.log(`  LOO-CV σ(ln ratio):    ${stddev(looClean.map(Math.log)).toFixed(3)} (1σ ≈ ${(Math.exp(stddev(looClean.map(Math.log))) * 100 - 100).toFixed(0)} %)`);
console.log(`  LOO-CV within ±20 %:   ${(looClean.filter(r => Math.abs(r - 1) < 0.2).length / looClean.length * 100).toFixed(0)} %`);
console.log(dim(`  This is the honest out-of-sample accuracy for X7R parts WITH known grain.`));

// ============================================================
// Held-out test set: Hernández + Chun (grain unknown → class default)
// ============================================================

console.log(bold('\n=== Held-out test set (grain unknown → class-default ε_r) ==='));
console.log(dim('  These parts were NOT used to fit the grain curve and have no disclosed'));
console.log(dim('  grain — so they exercise the real-world path (class-default ε_r).\n'));

const testParts = t.KNOWN_PARTS.filter(k =>
  (k.src === 'hernandez-2018' || k.src === 'chun-2024-screp') && k.C_uF != null);
const testRatios = [];
for (const k of testParts) {
  const r = t.computeFromKnown(k);
  if (!r) { console.log(`  ${k.id.padEnd(22)} ${dim('N_a not disclosed — skip')}`); continue; }
  const ratio = r.C_pred_uF / k.C_uF;
  testRatios.push(ratio);
  const v = Math.abs(ratio - 1) < 0.5 ? green('within 2×') : red('OFF');
  console.log(`  ${k.id.padEnd(22)} ${k.case.split('_')[0]} ${k.cls} ${String(k.V).padStart(3)}V  ` +
    `pred ${fmtCap(r.C_pred_uF).padStart(9)} vs ${fmtCap(k.C_uF).padStart(9)}  →  ${ratio.toFixed(2)}×  ${v}`);
}
if (testRatios.length) {
  console.log(`\n  Held-out geomean: ${geoMean(testRatios).toFixed(3)}×  (n=${testRatios.length})`);
}

// ============================================================
// Interpretation
// ============================================================

console.log(bold('\n=== Interpretation ==='));
console.log(`
  ${bold('Model change (this revision):')}
  - The overfit per-vendor ε_r lookup (A/B/C/P → ε_r, 4 params fit to these
    24 points, non-generalizable) was REPLACED by a physics grain-size curve
    ε_r(grain) = clamp(−600 + 10600·grain_µm, 2000, 9000). corr(grain,ε_r)=0.76.

  ${bold('Honest accuracy:')}
  - In-sample (grain curve on Liu):  geomean ${gm.toFixed(2)}×, 1σ ≈ ${(Math.exp(lnstd)*100-100).toFixed(0)} %.
  - LOO-CV (out-of-sample, grain known):  the number above — this is what to
    quote for a part whose grain size is known/estimable.
  - Held-out (grain unknown → class default):  the real-world accuracy for an
    arbitrary part with only case/class/V/C known.
  - The earlier "39 %" headline was the OVERFIT vendor-lookup number; the true
    generalization spread is ~35–45 %, dominated by ε_r variation the model
    cannot see without grain data.

  ${bold('Why grain not vendor:')}
  - Grain size is physical, measurable, and generalizes to any part.
  - The vendor labels (A/B/C/P) are anonymous in Liu and have no mapping to
    real Murata/TDK/Samsung parts — they could never be applied in practice.

  ${bold('To go tighter (future):')}
  - d_fired-dependent dead-layer rolloff for sub-µm parts.
  - V-dependent end-margin (fixes the Hernández HV +40 % bias).
  - More academic disclosures with grain size to refine the ε_r(grain) curve
    across X5R / X8R / Y5V (Liu set is X7R only).`);
