---
name: mlcc-design
description: "Synthesize/optimize the internal construction of an MLCC (multi-layer ceramic capacitor) from a target spec. Use whenever the user wants to DESIGN or BUILD an MLCC, or get its design/recipe/internal-construction parameters — green dielectric thickness, green Ni inner-electrode thickness, screen-print pattern dimensions, active layer count, per-side margins, cover plate — for a target capacitance, fired body size, voltage and dielectric class ('design a 0805 1uF 50V X7R', 'what dielectric thickness and how many layers for 4.7uF in a 0201', 'can I fit 10uF in a 1206', 'optimize an MLCC design for max capacitance / max reliability', custom body 'L x W x T mm'). Supports commercial/automotive/space design grades and reports feasibility. This is the inverse of mlcc-part: mlcc-part DECODES existing part numbers; mlcc-design INVENTS the construction. Usage: node scripts/design.cjs --case <size> --cls <class> --V <volts> --C <uF> [--grade g] [--objective reliability|max_capacitance]."
---

# MLCC design skill

Turns a **target MLCC spec** (capacitance, fired body size, voltage, dielectric class)
into an **optimized green build recipe** — the design parameters a process engineer
actually needs: green dielectric thickness, green Ni inner-electrode thickness, the
screen-print pattern dimensions (green active overlap), per-side margins, active layer
count, and cover-plate thickness. Backed by the simulator engine in
`simulator/tier1.js` (`optimizeDesign` / `suggestDesign`).

This is the **inverse / synthesis** counterpart to the `mlcc-part` skill: `mlcc-part`
decodes existing vendor part numbers; **`mlcc-design` invents the internal construction**
for a spec you give it.

## When this skill triggers

- The user asks to **design / build / construct** an MLCC for a target ("design a 0805
  1 µF 50 V X7R", "what does the inside of a 0201 4.7 µF look like").
- The user asks for **design parameters / a recipe / internal construction** from a spec:
  green dielectric thickness, electrode thickness, **layer count**, **print/screen pattern**,
  **margins**, cover — for a given capacitance and/or body size.
- The user asks **"can I fit X µF in a Y body?"**, **"how thin must the dielectric be"**,
  **"how many layers"**, or to **optimize** an MLCC design / trade reliability vs density.
- The user gives a **custom fired body** (L × W × T in mm) and a target C.

If the user instead types an existing **part number** or wants a cross-vendor equivalent,
use **`mlcc-part`**, not this skill.

## Operation

One CLI, one call:

```
node scripts/design.cjs --case <size> --cls <class> --V <volts> --C <uF> [--grade g] [--objective o]
node scripts/design.cjs --L <mm> --W <mm> --T <mm> --cls <class> --V <volts> --C <uF> [...]
```

- `--case` — standard size: `0201 0402 0603 0805 1206 1210 1812 2220` (EIA; also accepts a
  full id like `0805_2012` or the metric code `2012`). **Or** give a custom fired body with
  `--L --W --T` in **millimetres**.
- `--cls` — `C0G | X5R | X7R | X8R | Y5V` (default `X7R`).
- `--V` — rated voltage (V). `--C` — target capacitance (**µF**).
- `--grade` — `commercial` (default) | `automotive` | `space`.
- `--objective` — `reliability` (default: thickest dielectric that fits → most grains per
  layer, most robust) | `max_capacitance` (thinnest manufacturable dielectric → densest,
  maximum CV headroom).
- `--json` for machine-readable output; `--help` for usage.

## Mapping natural language → flags

| User says | Flags |
|---|---|
| "0805 X7R 1 µF 50 V" | `--case 0805 --cls X7R --V 50 --C 1.0` |
| "10 nF" / "470 pF" | convert to µF: `--C 0.01` / `--C 0.00047` |
| "automotive grade" / "150 °C" | `--grade automotive` (use `--cls X8R/X8L` for 150 °C) |
| "space / hi-rel / S-311-P-838 / MIL" | `--grade space` |
| "densest" / "max capacitance" / "smallest part" | `--objective max_capacitance` |
| "most reliable" / "robust" / "automotive-rugged" | `--objective reliability` (default) |
| "in a 2.0 × 1.25 × 0.85 mm body" | `--L 2.0 --W 1.25 --T 0.85` |

If the user is vague on grade/objective, use the defaults (`commercial`, `reliability`) and
say so. If they omit V or C, ask — both are required to solve a recipe.

## The three grades (design-rule sets, grounded in the wiki)

- **commercial** — consumer high-CV: dielectric floored at the manufacturing limit (~0.25 µm),
  tight size-scaled margins, coverage 0.92. See `wiki/concepts/dielectric-layer-thickness-floor.md`.
- **automotive** — AEC-Q200: thicker dielectric floor (~0.45 µm), robust 100–125 µm margins.
  See `wiki/sources/avx-automotive-mlcc-kam-kaf.md`.
- **space** — NASA S-311-P-838 / MIL-PRF-32535: **spec-minimum fired dielectric** (7.1 µm
  ≤25 V, 8.4 µm 50 V, 15.2 µm 100 V), ≤300 layers, voltage-scaled margins. This is why a
  high-CV part is often **infeasible** at space grade — that's a real qualification limit, not
  a bug. See `wiki/sources/gsfc-mlcc-space-specs.md`, `wiki/concepts/mlcc-margin-cover-design-rules.md`.

## Reading the output

- **GREEN BUILD RECIPE** — the as-cast / as-printed numbers (green = fired ÷ (1−s)). These are
  what you set the tape caster and print screen to. `green unit cell` is the dicing pitch.
- **FIRED RESULT** — what the sintered part becomes, incl. the achieved capacitance vs target
  and the body-height fill %.
- **DIELECTRIC / RELIABILITY** — grain-size target, grains-per-layer, and the class vs
  grain-realistic ε_r. A **"needs engineered high-ε_r (core-shell)"** flag means the thin-layer
  grain penalty drops ε_r below the class value, so the target only works with an engineered
  dielectric (as real frontier parts use).
- **body capacitance ceiling** — the most C this body/grade can hold (thin-dielectric limit);
  the headroom above the target. A **"body oversized"** note suggests a smaller case fits the C.
- **INFEASIBLE** — target C exceeds the body ceiling; the message suggests bigger body, lower
  grade, or lower V.

## Real-data calibration (evolving the model)

The model **closes the loop with real measured parts**. The physics in `compute()` is
uncalibrated; the gap between *computed* capacitance and *real product* behaviour (mostly
the uncontrolled effective ε_r plus lumped geometry error) is learned from real measured
parts and applied as an **effective-ε_r correction** in the suggestion layer. As you add
real parts, suggestions move toward real product design parameters.

> **Data governance — real-part data lives OUTSIDE this skill.** Measured-part data is
> private and potentially large/proprietary, so it must never be committed into this
> version-controlled skill. It lives in an external directory: **`$MLCC_DATA_DIR`** (set this
> to a company/private path), defaulting to **`~/.mlcc-design`**. Only a small **public
> example seed** (`data/real_parts.seed.json`, NASA GSFC Liu DPA) ships with the skill, plus
> the engine's public `KNOWN_PARTS`. `data/.gitignore` blocks the live files from ever being
> committed. In a company, point `MLCC_DATA_DIR` at your private/shared store.

- **Store** — `$MLCC_DATA_DIR/real_parts.json` (external, private, never committed): real
  measured parts (case, class, V, C, fired dielectric thickness, layer count; margins/grain/
  electrode optional). Baseline = engine `KNOWN_PARTS` + the bundled public seed.
- **Learn** — `node scripts/calibrate.cjs recalibrate` reads `KNOWN_PARTS` + seed + your private
  store, fits the computed-vs-real gap (a geomean effective-ε_r scale, global and per dielectric
  class) and the residual spread σ, and writes `$MLCC_DATA_DIR/calibration.json`.
- **Apply** — `design.cjs` loads the external `calibration.json` if present; otherwise it computes
  one from the **public seed** so it still works out of the box. Its report shows whether the
  correction came from *your dataset* or the *public seed*.
- **Commands**:
  - `calibrate.cjs where` — print the resolved data directory and what's in it.
  - `calibrate.cjs add --case .. --cls .. --V .. --C .. --d <fired µm> --N <layers> [--hNi --em --sm --cover --grain --source --date --id]` — append a real part to the **private** store, then recalibrate.
  - `calibrate.cjs recalibrate` — refit and persist the correction.
  - `calibrate.cjs list` / `calibrate.cjs status` — show the dataset / current correction.

When a user shares a real part's measured construction (DPA cross-section, vendor disclosure,
academic paper), **offer to `add` it** (it goes to the private external store, not the repo) so
the model improves. The more parts — especially in the user's own case/class/voltage family —
the tighter the per-class correction and σ.

### Shrinkage (green→fired) calibration

Green→fired shrinkage is **isotropic `s = 0.14`** by default. With enough **paired green↔fired**
real data it becomes a fitted **anisotropic** model — `compute()` splits into in-plane `s_xy`
(print pattern / footprint) and thickness `s_z` (`d`, `h_Ni`), and `optimizeDesign` emits the
green recipe with each axis converted separately. The fitted form (low-order, not overfit):

```
s_z  = s_z0 + b / h_BT_green                 # thickness shrinks more as the sheet thins
s_xy = s_z · (1 − k · h_Ni/h_BT)             # in-plane suppressed by electrode constraint
```

- **Paired-data schema** — a record in the private store may carry, in addition to the fired
  fields, the GREEN cast/print dims so shrinkage can be fit:
  `h_BT_green_um`, `h_Ni_green_um`, `overlapL_green_um` (or `footprint_L_green_um`),
  `overlapL_fired_um` (or `footprint_L_fired_um`). Thickness fit needs `h_BT_green_um` +
  `d_fired_um`; the in-plane/anisotropy fit also needs the green↔fired in-plane pair + `h_Ni_green_um`.
- **Commands**:
  - `calibrate.cjs add ... --hBTgreen <µm> --hNigreen <µm> --olGreen <µm> --olFired <µm>` — attach green dims.
  - `calibrate.cjs shrinkage` — fit + persist `$MLCC_DATA_DIR/shrinkage.json` (≥3 thickness pairs; else stays isotropic with a note).
  - `design.cjs` auto-loads it and reports `shrinkage: anisotropic …` / `isotropic …`.
- **The catch (state it):** the **green** side is proprietary process data that **only a
  manufacturer has** — all the public/DPA data we ingested is fired-only, so a fired-only dataset
  cannot identify shrinkage. Until paired data exists, the isotropic 0.14 default holds (same
  measure-then-calibrate stance as ε_r).

## Caveats (state these when relevant)

- **Tier-1 model**: shrinkage is treated as isotropic (`s ≈ 0.14`); in a real constrained stack
  the in-plane shrinkage is smaller than the thickness shrinkage (see
  `wiki/concepts/green-tape-shrinkage-anisotropy.md`). Green in-plane dims are therefore a
  Tier-1 estimate.
- The recipe is **one feasible/optimized design point**, not a unique vendor recipe — the
  inverse problem is under-determined.
- ε_r and the grain curve are calibrated against a ~30-part lineup (σ ≈ 45 % part-to-part); treat
  outputs as engineering estimates, not guarantees.

## Files in this skill

- `scripts/design.cjs` — design CLI (Node). Wraps `simulator/tier1.js` (`optimizeDesign`,
  `suggestDesign`/`solveRecipe`/`compute`); applies the external (or public-seed) calibration; console output.
- `scripts/calibrate.cjs` — calibration CLI (where / add / recalibrate / shrinkage / list / status).
- `scripts/_data.cjs` — shared data-location policy: resolves `$MLCC_DATA_DIR` (default `~/.mlcc-design`),
  loads engine `KNOWN_PARTS` + bundled seed + the external private store.
- `data/real_parts.seed.json` — **public** example seed (NASA GSFC DPA); immutable demo baseline (tracked).
- `data/.gitignore` — blocks the live private files (`real_parts.json`, `calibration.json`) from being committed.
- **Not in the repo:** `$MLCC_DATA_DIR/real_parts.json` (private store), `calibration.json` (ε_r), and `shrinkage.json` (anisotropic green→fired model) — all derived/private.

The engine itself (`simulator/tier1.js`) is the source of truth — the calibration logic
(`calibrateFromReal`, `setCalibration`, `calScale`, `optimizeDesign`) is covered by
`simulator/test_tier1.cjs`.
