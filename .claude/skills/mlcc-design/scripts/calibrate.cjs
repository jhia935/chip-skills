#!/usr/bin/env node
'use strict';
// mlcc-design calibration — evolve the model toward real measured parts.
//   recalibrate : learn the computed-vs-real gap from the real-data store + the
//                 engine seed, and persist it to data/calibration.json.
//   add         : append a real measured part to data/real_parts.json.
//   list        : show the stored real parts.
//   status      : show the current calibration.
// The design CLI loads calibration.json and applies the correction.

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

const DATA = path.join(__dirname, '..', 'data');
const REAL = path.join(DATA, 'real_parts.json');
const CAL  = path.join(DATA, 'calibration.json');

function loadReal() {
  if (!fs.existsSync(REAL)) return { parts: [] };
  return JSON.parse(fs.readFileSync(REAL, 'utf8'));
}
function saveReal(obj) { fs.writeFileSync(REAL, JSON.stringify(obj, null, 2) + '\n'); }

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

// Combined real-data set: engine seed (KNOWN_PARTS) + user store (real_parts.json).
function allRealParts() {
  const store = loadReal().parts || [];
  const seed = t.KNOWN_PARTS.filter(k => k.C_uF > 0 && k.d_fired_um > 0 && k.N_a > 0)
    .map(k => ({ id: k.id, source: k.src || 'KNOWN_PARTS', case: k.case, cls: k.cls, V: k.V,
                 C_uF: k.C_uF, d_fired_um: k.d_fired_um, h_Ni_fired_um: k.h_Ni_fired_um, N: k.N_a, grain_um: k.grain_um }));
  // de-dupe by id (store wins)
  const byId = new Map();
  for (const p of seed) byId.set(p.id, p);
  for (const p of store) byId.set(p.id, p);
  return [...byId.values()];
}

const cmd = process.argv[2] || 'recalibrate';
const args = parseArgs(process.argv.slice(3));

if (cmd === 'list') {
  const parts = allRealParts();
  console.log(`Real parts in calibration set: ${parts.length} (store ${ (loadReal().parts||[]).length } + engine seed)`);
  for (const p of parts) console.log(`  ${p.id.padEnd(12)} ${p.case} ${p.cls} ${p.V}V ${p.C_uF}µF · d ${p.d_fired_um}µm · N ${p.N}${p.grain_um ? ' · grain ' + p.grain_um + 'µm' : ''}  [${p.source}]`);
  process.exit(0);
}

if (cmd === 'status') {
  if (!fs.existsSync(CAL)) { console.log('No calibration yet — run: calibrate.cjs recalibrate'); process.exit(0); }
  const c = JSON.parse(fs.readFileSync(CAL, 'utf8'));
  console.log(`Calibration (${c.source}, updated ${c.updated || 'n/a'})`);
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
  if (args.hNi  !== undefined) rec.h_Ni_fired_um = num(args.hNi);
  if (args.em   !== undefined) rec.em_um = num(args.em);
  if (args.sm   !== undefined) rec.sm_um = num(args.sm);
  if (args.cover!== undefined) rec.cover_um = num(args.cover);
  if (args.grain!== undefined) rec.grain_um = num(args.grain);
  if (!rec.case || !(rec.V > 0) || !(rec.C_uF > 0) || !(rec.d_fired_um > 0) || !(rec.N > 0)) {
    console.error('add needs --case --cls --V --C --d --N (minimum). Optional: --hNi --em --sm --cover --grain --source --date --id');
    process.exit(1);
  }
  const obj = loadReal();
  obj.parts = obj.parts || [];
  obj.parts = obj.parts.filter(p => p.id !== rec.id);
  obj.parts.push(rec);
  saveReal(obj);
  console.log(`Added ${rec.id} (${obj.parts.length} user parts). Now run: calibrate.cjs recalibrate`);
  process.exit(0);
}

// default: recalibrate
{
  const parts = allRealParts();
  const before = fs.existsSync(CAL) ? JSON.parse(fs.readFileSync(CAL, 'utf8')) : null;
  const cal = t.calibrateFromReal(parts, { source: 'real_parts.json + KNOWN_PARTS', date: args.date || null });
  fs.writeFileSync(CAL, JSON.stringify(cal, null, 2) + '\n');

  console.log(`Recalibrated against ${cal.n_parts} real parts.`);
  console.log(`  global effective-ε_r correction: ${r2(cal.er_scale_global)}  (computed × this ≈ real)`);
  console.log(`  residual spread σ ≈ ±${r2(cal.sigma_pct)}%  — the model's honest part-to-part uncertainty`);
  const bc = cal.er_scale_byClass || {};
  for (const k of Object.keys(bc)) console.log(`  ${k}: ${r2(bc[k])}`);
  if (before) console.log(`  (was: scale ${r2(before.er_scale_global)} over ${before.n_parts} parts)`);
  console.log(`\nWrote ${path.relative(process.cwd(), CAL)}. The design CLI now applies this correction.`);
}
