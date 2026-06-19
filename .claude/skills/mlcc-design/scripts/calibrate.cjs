#!/usr/bin/env node
'use strict';
// mlcc-design calibration — evolve the model toward real measured parts.
//   recalibrate : learn the computed-vs-real gap from the data set, persist calibration.
//   add         : append a real measured part to the PRIVATE store ($MLCC_DATA_DIR).
//   list        : show the parts in the calibration set.
//   status      : show the current calibration + where data lives.
//   where       : print the resolved data directory.
//
// Real-part data and the derived calibration live OUTSIDE this skill, in
// $MLCC_DATA_DIR (default ~/.mlcc-design) — never committed. Only the public
// example seed (data/real_parts.seed.json) ships with the skill.

const path = require('path');
const fs = require('fs');

function findTier1() {
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const p = path.join(dir, 'simulator', 'tier1.js');
    if (fs.existsSync(p)) return p;
    const up = path.dirname(dir); if (up === dir) break; dir = up;
  }
  throw new Error('Could not locate simulator/tier1.js.');
}
const t = require(findTier1());
const D = require('./_data.cjs');

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    let tok = argv[i]; if (!tok.startsWith('--')) continue; tok = tok.slice(2);
    if (tok.includes('=')) { const k = tok.indexOf('='); a[tok.slice(0, k)] = tok.slice(k + 1); }
    else { const n = argv[i + 1]; if (n !== undefined && !n.startsWith('--')) { a[tok] = n; i++; } else a[tok] = true; }
  }
  return a;
}
const num = (v) => (v === undefined || v === true ? undefined : parseFloat(v));
const r2 = (x) => Math.round(x * 100) / 100;

const cmd = process.argv[2] || 'recalibrate';
const args = parseArgs(process.argv.slice(3));

if (cmd === 'where') {
  console.log(`Data directory (set MLCC_DATA_DIR to change): ${D.DATA_DIR}`);
  console.log(`  private store : ${D.REAL}${fs.existsSync(D.REAL) ? '' : '  (none yet)'}`);
  console.log(`  calibration   : ${D.CAL}${fs.existsSync(D.CAL) ? '' : '  (none yet)'}`);
  console.log(`  bundled seed  : ${D.SEED}  (public example, read-only)`);
  process.exit(0);
}

if (cmd === 'list') {
  const parts = D.allRealParts(t);
  console.log(`Calibration set: ${parts.length} parts  (engine seed + bundled seed ${D.loadSeedParts().length} + private store ${D.loadStoreParts().length} @ ${D.DATA_DIR})`);
  for (const p of parts) console.log(`  ${String(p.id).padEnd(14)} ${p.case} ${p.cls} ${p.V}V ${p.C_uF}µF · d ${p.d_fired_um}µm · N ${p.N}${p.grain_um ? ' · grain ' + p.grain_um + 'µm' : ''}  [${p.source}]`);
  process.exit(0);
}

if (cmd === 'status') {
  const c = D.readJson(D.CAL);
  if (!c) { console.log(`No calibration yet at ${D.CAL}\nRun: calibrate.cjs recalibrate`); process.exit(0); }
  console.log(`Calibration (${c.source}, updated ${c.updated || 'n/a'}) @ ${D.CAL}`);
  console.log(`  parts: ${c.n_parts} · global ε_r scale: ${r2(c.er_scale_global)} · σ ≈ ±${r2(c.sigma_pct)}%`);
  const bc = c.er_scale_byClass || {};
  for (const k of Object.keys(bc)) console.log(`  ${k}: ε_r scale ${r2(bc[k])}`);
  process.exit(0);
}

if (cmd === 'add') {
  const rec = {
    id: args.id || `user-${Date.now()}`,
    source: args.source || 'user', date: args.date || null,
    case: args.case, cls: String(args.cls || 'X7R').toUpperCase(),
    V: num(args.V), C_uF: num(args.C),
    d_fired_um: num(args.d), N: num(args.N),
  };
  if (args.hNi   !== undefined) rec.h_Ni_fired_um = num(args.hNi);
  if (args.em    !== undefined) rec.em_um = num(args.em);
  if (args.sm    !== undefined) rec.sm_um = num(args.sm);
  if (args.cover !== undefined) rec.cover_um = num(args.cover);
  if (args.grain !== undefined) rec.grain_um = num(args.grain);
  if (!rec.case || !(rec.V > 0) || !(rec.C_uF > 0) || !(rec.d_fired_um > 0) || !(rec.N > 0)) {
    console.error('add needs --case --cls --V --C --d --N (minimum). Optional: --hNi --em --sm --cover --grain --source --date --id');
    process.exit(1);
  }
  const parts = D.loadStoreParts().filter(p => p.id !== rec.id);
  parts.push(rec);
  D.saveStore(parts);
  console.log(`Added ${rec.id} → ${D.REAL} (${parts.length} private parts).`);
  console.log(`Now run: calibrate.cjs recalibrate`);
  process.exit(0);
}

// default: recalibrate
{
  const parts = D.allRealParts(t);
  const before = D.readJson(D.CAL);
  const cal = t.calibrateFromReal(parts, { source: 'KNOWN_PARTS + seed + private store', date: args.date || null });
  D.saveCalibration(cal);

  console.log(`Recalibrated against ${cal.n_parts} parts (private store: ${D.loadStoreParts().length} @ ${D.DATA_DIR}).`);
  console.log(`  global effective-ε_r correction: ${r2(cal.er_scale_global)}  (computed × this ≈ real)`);
  console.log(`  residual spread σ ≈ ±${r2(cal.sigma_pct)}%  — the model's honest part-to-part uncertainty`);
  const bc = cal.er_scale_byClass || {};
  for (const k of Object.keys(bc)) console.log(`  ${k}: ${r2(bc[k])}`);
  if (before) console.log(`  (was: scale ${r2(before.er_scale_global)} over ${before.n_parts} parts)`);
  console.log(`\nWrote ${D.CAL}. The design CLI now applies this correction.`);
}
