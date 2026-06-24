'use strict';
// Data-location policy for the mlcc-design skill.
//
// Real measured-part data is PRIVATE and potentially large/proprietary, so it must
// NOT live inside this version-controlled skill. It lives in an external directory:
//
//   $MLCC_DATA_DIR        (set this to a company/private path)
//   ~/.mlcc-design        (default if the env var is unset)
//
// Only a small PUBLIC example seed (NASA GSFC Liu DPA) is bundled with the skill,
// as data/real_parts.seed.json — immutable, for demo/baseline. Your measured parts
// and the derived calibration go to the external dir and are never committed.

const path = require('path');
const fs = require('fs');
const os = require('os');

const DATA_DIR = process.env.MLCC_DATA_DIR || path.join(os.homedir(), '.mlcc-design');
const REAL   = path.join(DATA_DIR, 'real_parts.json');                     // private writable store
const CAL    = path.join(DATA_DIR, 'calibration.json');                    // derived: ε_r correction
const SHRINK = path.join(DATA_DIR, 'shrinkage.json');                      // derived: shrinkage model
const SEED = path.join(__dirname, '..', 'data', 'real_parts.seed.json');   // bundled PUBLIC example

function readJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; } }
function loadSeedParts()  { const o = readJson(SEED); return (o && o.parts) || []; }
function loadStoreParts() { const o = readJson(REAL); return (o && o.parts) || []; }

function saveStore(parts) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(REAL, JSON.stringify({
    _README: 'Private real measured-part store for mlcc-design (NOT in the repo). Edit MLCC_DATA_DIR to relocate.',
    parts,
  }, null, 2) + '\n');
}
function saveCalibration(cal) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(CAL, JSON.stringify(cal, null, 2) + '\n');
}
function saveShrinkage(model) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(SHRINK, JSON.stringify(model, null, 2) + '\n');
}

// Engine public seed (KNOWN_PARTS) → usable calibration records.
function knownParts(t) {
  return t.KNOWN_PARTS
    .filter(k => k.C_uF > 0 && k.d_fired_um > 0 && k.N_a > 0)
    .map(k => ({ id: k.id, source: k.src || 'KNOWN_PARTS', case: k.case, cls: k.cls, V: k.V,
                 C_uF: k.C_uF, d_fired_um: k.d_fired_um, h_Ni_fired_um: k.h_Ni_fired_um, N: k.N_a, grain_um: k.grain_um }));
}

// Full calibration set: engine KNOWN_PARTS + bundled public seed + external private
// store; de-duped by id (private store wins, then seed, then engine).
function allRealParts(t) {
  const byId = new Map();
  for (const p of knownParts(t))    byId.set(p.id, p);
  for (const p of loadSeedParts())  byId.set(p.id, p);
  for (const p of loadStoreParts()) byId.set(p.id, p);
  return [...byId.values()];
}

module.exports = {
  DATA_DIR, REAL, CAL, SHRINK, SEED,
  readJson, loadSeedParts, loadStoreParts, saveStore, saveCalibration, saveShrinkage,
  knownParts, allRealParts,
};
