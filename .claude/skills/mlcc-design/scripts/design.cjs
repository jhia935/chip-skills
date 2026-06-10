#!/usr/bin/env node
'use strict';
// mlcc-design CLI — turn a target MLCC spec into an optimized GREEN build recipe.
// Wraps the simulator engine (simulator/tier1.js, the project source of truth).

const path = require('path');
const fs = require('fs');

// ── Locate the simulator engine (walk up to the repo root) ──────────────────
function findTier1() {
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const p = path.join(dir, 'simulator', 'tier1.js');
    if (fs.existsSync(p)) return p;
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  throw new Error('Could not locate simulator/tier1.js (expected somewhere above this skill).');
}
const t = require(findTier1());

// Apply the learned real-data calibration if present (else physics defaults).
let CALMETA = null;
try {
  const calPath = path.join(__dirname, '..', 'data', 'calibration.json');
  if (fs.existsSync(calPath)) { CALMETA = JSON.parse(fs.readFileSync(calPath, 'utf8')); t.setCalibration(CALMETA); }
} catch (e) { /* fall back to physics defaults */ }

// ── Arg parsing (--k v / --k=v / --flag) ────────────────────────────────────
function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    let tok = argv[i];
    if (!tok.startsWith('--')) continue;
    tok = tok.slice(2);
    if (tok.includes('=')) { const idx = tok.indexOf('='); a[tok.slice(0, idx)] = tok.slice(idx + 1); }
    else { const nxt = argv[i + 1]; if (nxt !== undefined && !nxt.startsWith('--')) { a[tok] = nxt; i++; } else a[tok] = true; }
  }
  return a;
}

// ── Resolve a case token (full id, EIA, or metric) → CASES id ───────────────
function resolveCase(token) {
  if (!token) return null;
  const tok = String(token).trim();
  if (t.CASES.some(c => c.id === tok)) return tok;
  for (const c of t.CASES) {
    const [eia, metric] = c.id.split('_');
    if (tok === eia || tok === metric) return c.id;
  }
  return null;
}

const num = (v) => (v === undefined || v === true ? NaN : parseFloat(v));
const mm2um = (v) => num(v) * 1000;
const r0 = (x) => Math.round(x);
const r2 = (x) => (Math.round(x * 100) / 100);

function help() {
  console.log(`mlcc-design — optimize MLCC design parameters for a target spec.

Usage:
  design.cjs --case <size> --cls <class> --V <volts> --C <uF> [--grade g] [--objective o]
  design.cjs --L <mm> --W <mm> --T <mm> --cls <class> --V <volts> --C <uF> [...]

Target spec:
  --case   standard size: 0201|0402|0603|0805|1206|1210|1812|2220  (EIA, or a
           full id like 0805_2012, or metric like 2012). OR give a custom fired
           body with --L/--W/--T (millimetres).
  --L --W --T   custom FIRED body length / width / max thickness, in mm.
  --cls    dielectric class: C0G | X5R | X7R | X8R | Y5V          (default X7R)
  --V      rated voltage, V
  --C      target capacitance, µF

Options:
  --grade      commercial | automotive | space                    (default commercial)
  --objective  reliability  (thickest dielectric that fits — most robust)  [default]
               max_capacitance (thinnest dielectric — densest / max CV headroom)
  --json       machine-readable output
  --help

Examples:
  design.cjs --case 0805 --cls X7R --V 50 --C 1.0
  design.cjs --case 0201 --cls X5R --V 6.3 --C 4.7 --grade commercial
  design.cjs --L 2.0 --W 1.25 --T 0.85 --cls X7R --V 25 --C 2.2 --objective max_capacitance
  design.cjs --case 1206 --cls X7R --V 100 --C 1.0 --grade space`);
}

// ── Main ────────────────────────────────────────────────────────────────────
const args = parseArgs(process.argv.slice(2));
if (args.help) { help(); process.exit(0); }

const spec = {
  cls: String(args.cls || args.class || 'X7R').toUpperCase(),
  V: num(args.V !== undefined ? args.V : args.v),
  C_target_uF: num(args.C !== undefined ? args.C : args.c),
  grade: String(args.grade || 'commercial').toLowerCase(),
  objective: args.objective || (args.maxc ? 'max_capacitance' : 'reliability'),
};

if (args.case) {
  const id = resolveCase(args.case);
  if (!id) { console.error(`Unknown case "${args.case}". Valid: ${t.CASES.map(c => c.id.split('_')[0]).join(', ')}`); process.exit(1); }
  spec.case = id;
} else if (args.L !== undefined && args.W !== undefined && args.T !== undefined) {
  spec.L_um = mm2um(args.L); spec.W_um = mm2um(args.W); spec.Hmax_um = mm2um(args.T);
} else {
  console.error('Need --case <size>  OR  --L --W --T (mm) for a custom body.\n'); help(); process.exit(1);
}

if (!t.CLASSES.some(c => c.id === spec.cls)) { console.error(`Unknown class "${spec.cls}". Valid: ${t.CLASSES.map(c => c.id).join(', ')}`); process.exit(1); }
if (!(spec.V > 0)) { console.error('Need a positive --V (rated voltage).'); process.exit(1); }
if (!(spec.C_target_uF > 0)) { console.error('Need a positive --C (target capacitance in µF).'); process.exit(1); }
if (!t.GRADES[spec.grade]) { console.error(`Unknown grade "${spec.grade}". Valid: ${Object.keys(t.GRADES).join(', ')}`); process.exit(1); }

let o;
try { o = t.optimizeDesign(spec); }
catch (e) { console.error('design error: ' + e.message); process.exit(1); }

if (args.json) { console.log(JSON.stringify(o, null, 2)); process.exit(o.feasible ? 0 : 2); }

// ── Human-readable report ────────────────────────────────────────────────────
const body = o.custom
  ? `${r2(o.fired_L_um / 1000)} × ${r2(o.fired_W_um / 1000)} mm (custom, T_max ${r2(o.Hmax_um / 1000)} mm)`
  : `${o.caseRec.label}`;
console.log(`\nMLCC DESIGN — target ${o.C_target_uF} µF · ${o.clsRec.id} · ${spec.V} V`);
console.log(`  body   : ${body}`);
console.log(`  grade  : ${o.grade}  (${o.gradeLabel})`);
console.log(`  objective: ${o.objective}`);
if (CALMETA && o.calibration && o.calibration.n_parts)
  console.log(`  calibration: real-data-adjusted vs ${o.calibration.n_parts} parts (effective ε_r ×${r2(o.calibration.scale)}, ±${r0(o.calibration.sigma_pct)}%)`);
else
  console.log(`  calibration: none (physics defaults) — run calibrate.cjs recalibrate to fit real data`);

if (!o.feasible) {
  console.log(`\n  ✗ INFEASIBLE — ${o.C_target_uF} µF exceeds what this body/grade can hold`);
  console.log(`    body capacitance ceiling ≈ ${r2(o.C_body_ceiling_uF)} µF (thinnest dielectric, full height).`);
  console.log(`    → use a larger body, a lower grade (thinner dielectric), or lower V_rated.\n`);
  process.exit(2);
}

console.log(`\n  GREEN BUILD RECIPE  (as-cast / as-printed — multiply fired by 1/(1−s), s=${o.sTotal})`);
console.log(`    dielectric (green h_BT)   : ${r2(o.hBT_green_um)} µm   → fires to ${r2(o.d_fired_um)} µm`);
console.log(`    Ni electrode (green h_Ni) : ${r2(o.hNi_green_um)} µm   → fires to ${r2(o.hNi_fired_um)} µm`);
console.log(`    print overlap (green L×W) : ${r0(o.print_overlapL_green_um)} × ${r0(o.print_overlapW_green_um)} µm`);
console.log(`    end margin / side margin  : ${r0(o.margin_end_green_um)} / ${r0(o.margin_side_green_um)} µm  (green, per side)`);
console.log(`    green unit cell (dice pitch): ${r0(o.green_unit_cell_L_um)} × ${r0(o.green_unit_cell_W_um)} µm`);
console.log(`    active layers N           : ${o.N_e}`);
console.log(`    cover plate / side        : ${r0(o.cover_um)} µm · coverage ${o.coverage} · electrode discontinuity ${o.disc}`);

console.log(`\n  FIRED RESULT`);
console.log(`    dielectric d_fired        : ${r2(o.d_fired_um)} µm · layer pitch ${r2(o.layer_pitch_um)} µm`);
console.log(`    fired body                : ${r2(o.fired_L_um/1000)} × ${r2(o.fired_W_um/1000)} × ${r2(o.fired_T_um/1000)} mm  (${r0(o.height_fill_pct)}% of T_max)`);
console.log(`    fired margins end/side    : ${r0(o.em_fired_um)} / ${r0(o.sm_fired_um)} µm`);
console.log(`    capacitance               : ${r2(o.C_achieved_uF)} µF achieved vs ${o.C_target_uF} µF target`);

console.log(`\n  DIELECTRIC / RELIABILITY`);
console.log(`    grain size target         : ${r2(o.grain_um)} µm  → ${r2(o.grains_per_layer)} grains per layer`);
console.log(`    ε_r class / effective / grain-real : ${o.er_class} / ${r0(o.er_effective)} / ${r0(o.er_grain)}`);
if (o.needs_engineered_dielectric)
  console.log(`    ⚠ grain-realistic ε_r is well below the class value — needs an engineered`);
if (o.needs_engineered_dielectric)
  console.log(`      high-ε_r (core-shell) dielectric to hit this in the chosen geometry.`);

console.log(`\n  body capacitance ceiling ≈ ${r2(o.C_body_ceiling_uF)} µF (headroom: thin the dielectric for more C)`);
if (o.body_oversized)
  console.log(`  note: stack fills only ${r0(o.height_fill_pct)}% of the body — a smaller case would suit this C.`);
console.log('');
