// Tier-2 DC-bias validation — the first benchmark of the f_V derating model
// against measured capacitance-vs-field data.
//
// Until now the Tier-2 overlay (f_V, f_T) was only tested for internal
// self-consistency (does f_V match its own sigmoid formula?). Nothing checked
// it against a real measured DC-bias curve. This script closes that gap.
//
// GROUND TRUTH (no d_fired assumption needed — these curves are plotted as
// ΔC vs field E in V/µm, which is exactly dcBiasFactor's argument):
//
//   [G1] Vishay "Capacitance Drift of X7R MLCC under DC Bias", Fig. 2 — the
//        canonical generic Class-II VCC curve. wiki/sources/
//        vishay-x7r-cap-drift-dc-bias.md and wiki/concepts/dc-bias-derating.md.
//
//   [G2] EPCI cross-vendor envelope for a real 0805 X7R 10 µF 6.3 V part:
//        −35 % to −65 % at rated (≈ 6–8 V/µm), −12 % to −32 % at 3.3 V.
//        wiki/concepts/dc-bias-derating.md / epci-high-cv-mlcc-bias-aging.
//
// Run:  node simulator/dc_bias_bench.cjs

const t = require('./tier1.js');

const C = (s, n) => `\x1b[${n}m${s}\x1b[0m`;
const red = s => C(s, '31'), green = s => C(s, '32'),
      yellow = s => C(s, '33'), dim = s => C(s, '2'), bold = s => C(s, '1');

// ============================================================
// [G1] Vishay Fig. 2 — generic Class-II / X7R DC-bias curve
// ============================================================
// E in V/µm → fractional capacitance remaining (f_V = 1 + ΔC/100)
const VISHAY_X7R = [
  { E: 2,  fV: 0.90 },   // −10 %
  { E: 4,  fV: 0.75 },   // −25 %
  { E: 6,  fV: 0.55 },   // −45 %
  { E: 10, fV: 0.40 },   // −60 %
  { E: 20, fV: 0.20 },   // −80 %
];

function rmsLogErr(model) {
  // RMS of ln(model/measured) across the curve — scale-free fit metric
  let s = 0;
  for (const p of VISHAY_X7R) s += Math.log(model(p.E) / p.fV) ** 2;
  return Math.sqrt(s / VISHAY_X7R.length);
}

console.log(bold('\n=== [G1] f_V vs Vishay Fig. 2 measured X7R curve ==='));
console.log(dim('  Field plotted directly in V/µm — no d_fired assumption.\n'));
console.log('  E (V/µm)   measured   current model   Δ(model−meas)');
console.log('  ' + '─'.repeat(52));

const currentModel = E => t.dcBiasFactor('X7R', E);
for (const p of VISHAY_X7R) {
  const m = currentModel(p.E);
  const dpp = (m - p.fV) * 100;
  const flag = Math.abs(dpp) < 8 ? green('ok') : Math.abs(dpp) < 15 ? yellow('drift') : red('OFF');
  console.log('  ' +
    String(p.E).padStart(6) + '     ' +
    (p.fV * 100).toFixed(0).padStart(4) + ' %     ' +
    (m * 100).toFixed(0).padStart(6) + ' %       ' +
    (dpp >= 0 ? '+' : '') + dpp.toFixed(0).padStart(3) + ' pp   ' +
    flag);
}
const curParams = t.DCBIAS['X7R'];
console.log(`\n  Current X7R params: E0 = ${curParams.E0}, p = ${curParams.p}`);
console.log(`  RMS log-error vs Vishay: ${rmsLogErr(currentModel).toFixed(3)}`);

// ============================================================
// Grid-search a better (E0, p) fit to the measured curve
// ============================================================
let best = { E0: curParams.E0, p: curParams.p, err: rmsLogErr(currentModel) };
for (let E0 = 2; E0 <= 12; E0 += 0.1) {
  for (let p = 1.0; p <= 2.5; p += 0.05) {
    const model = E => 1 / (1 + Math.pow(E / E0, p));
    const err = rmsLogErr(model);
    if (err < best.err) best = { E0: +E0.toFixed(1), p: +p.toFixed(2), err };
  }
}
console.log(`\n  Best-fit X7R params:  E0 = ${best.E0}, p = ${best.p}  (RMS log-err ${best.err.toFixed(3)})`);

const fitModel = E => 1 / (1 + Math.pow(E / best.E0, best.p));
console.log('\n  Best-fit model vs measured:');
for (const p of VISHAY_X7R) {
  const m = fitModel(p.E);
  const dpp = (m - p.fV) * 100;
  console.log('  ' + String(p.E).padStart(6) + ' V/µm   meas ' + (p.fV*100).toFixed(0).padStart(3) +
    ' %   fit ' + (m*100).toFixed(0).padStart(3) + ' %   (' + (dpp>=0?'+':'') + dpp.toFixed(0) + ' pp)');
}

// ============================================================
// [G2] Cross-check against EPCI real-part envelope
// ============================================================
console.log(bold('\n=== [G2] Cross-check vs EPCI 0805 X7R 10 µF 6.3 V envelope ==='));
console.log(dim('  Real part: −35 % to −65 % at rated, −12 % to −32 % at 3.3 V.'));
console.log(dim('  Assume d_fired ≈ 0.8 µm (10 µF / 0805 thin-layer) → field = V / 0.8.\n'));

const dFired = 0.8;
for (const [V, lo, hi] of [[6.3, 0.35, 0.65], [3.3, 0.12, 0.32]]) {
  const E = V / dFired;
  const cur = currentModel(E);
  const fit = fitModel(E);
  const band = `[−${(hi*100).toFixed(0)}% … −${(lo*100).toFixed(0)}%]`;
  const inBand = x => (1 - x) >= lo && (1 - x) <= hi;
  console.log(`  ${V} V (E=${E.toFixed(1)} V/µm)  measured ${band}`);
  console.log(`     current (E0=${curParams.E0},p=${curParams.p}): −${((1-cur)*100).toFixed(0)}%  ${inBand(cur)?green('in band'):red('OUT of band')}`);
  console.log(`     best-fit (E0=${best.E0},p=${best.p}): −${((1-fit)*100).toFixed(0)}%  ${inBand(fit)?green('in band'):red('OUT of band')}`);
}

// ============================================================
// Verdict
// ============================================================
console.log(bold('\n=== Verdict ==='));
const improved = best.err < rmsLogErr(currentModel) * 0.7;
console.log(`
  ${bold('Finding:')} the Tier-2 DC-bias model had NEVER been checked against a
  measured curve — only against its own formula. This benchmark does it.

  ${improved ? red('The current X7R sigmoid mis-predicts.') : 'The current X7R sigmoid is acceptable.'}
  - Current (E0=${curParams.E0}, p=${curParams.p}) RMS-log-error vs Vishay Fig. 2: ${rmsLogErr(currentModel).toFixed(3)}
  - Best-fit (E0=${best.E0}, p=${best.p}) RMS-log-error: ${best.err.toFixed(3)}
  ${improved ? `  → recommend updating DCBIAS['X7R'] to E0=${best.E0}, p=${best.p}.` : ''}

  ${bold('Scope caveat:')} Vishay Fig. 2 is a generic Class-II curve assigned to
  X7R. X5R/X8R/Y5V params are reasoned offsets from X7R (X8R better, X5R worse,
  Y5V much worse), NOT independently validated — no per-class measured curve is
  in the wiki yet. Ingesting class-specific C(V_DC) curves is the next step.
`);

// Exit non-zero if the shipped X7R params are materially off — turns this
// into a guard the test runner / CI can gate on.
process.exit(rmsLogErr(currentModel) > 0.20 ? 1 : 0);
