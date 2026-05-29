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
// Interpretation
// ============================================================

console.log(bold('\n=== Interpretation ==='));
console.log(`
  ${bold('What this shows:')}
  - Geomean ratio of ${gm.toFixed(2)}× across 24 commercial X7R parts with
    fully-disclosed geometry. Within ±20 % for ${(ok20/ratios.length*100).toFixed(0)}% of the parts.
  - The 1σ spread of ${(Math.exp(lnstd)*100-100).toFixed(0)}% reflects real vendor-to-vendor
    variation in ε_r (different dopant packages give different ε_r at the same
    nominal class). The simulator's single class-default ε_r value can't
    capture per-vendor differences.

  ${bold('Practical accuracy:')}
  - Roughly ±20 % at the geomean ratio (after the calibration update).
  - To go tighter, the simulator would need PER-VENDOR ε_r tuning. Liu's data
    suggests ε_r ranges from ~2000 (vendor C, fine grain) to ~3500 (vendor B,
    coarser grain) within the X7R class.

  ${bold('Adding more parts to the catalog:')}
  - Liu CARTS 2014 Table III alone covers 24 parts — already in tier1.js
    KNOWN_PARTS.
  - Hernández-López 2018 (KEMET X7R, 68 layers × 7.5 µm) — could be added.
  - Liu's other NASA NEPP papers may have additional sample tables.
  - The Liu 2014 sample table covers X7R only; X5R / X8R / Y5V calibration
    points still come from research vehicles (Polotai, Yoon, Song).
`);
