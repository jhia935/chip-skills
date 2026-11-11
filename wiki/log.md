---
title: Activity Log
type: log
created: 2026-05-19
updated: 2026-11-11
---

# Activity Log

Chronological record of wiki operations. Newest entries first.

---

## [2026-11-11] ingest | MLCC process equipment & line sequence (10 steps)

Equipment and step-order survey to back the 3D process pages in `visualizations/`. Raw notes are `resources/manufacturing/eq-01-powder.md` … `eq-10-test-sort-pack.md`. There are about 150 sources: mostly apparatus patents (Murata, TDK, SEMCO, Taiyo Yuden, KYOCERA, ESI/Palomar, Sakai) and equipment-maker pages (KEKO, HIMA, Micro Tech, Tipton, Sintokogio, Hosokawa, Shibuya, Tokyo Weld). They are equipment specs and patent embodiments, not production settings.

**Source page created:** [[mlcc-process-equipment-research-notes]].
**Pages updated:**
- [[mlcc-process-substeps-and-equipment]]: new "line sequence in detail" section, and several (g) rows are now sourced.
- [[barrel-chamfering-mlcc]]: chamfering is mostly done on green chips; added centrifugal-barrel equipment.
- [[slurry-preparation-mlcc]]: milling-order variants.
- [[internal-electrode-printing]]: electrode → intermediate dry → step-compensation print → main dry.
- [[mlcc-manufacturing-process]]: step 11 note.

**Contradictions logged:**
- wet vs dry chamfering ([us6367134] vs [jp2010283164a]);
- SEMCO milling order vs the earlier wiki sequence;
- solid-state calcination temperature 900–1000 vs 1100–1400 °C;
- re-oxidation PO₂;
- side-margin thermo-compression temperature.

**Still open:** `resources/bibliography.md` does not exist, so the new keys are traceable only through the raw-notes Sources tables.

## [2026-11-10] query | MLCC process sub-steps and equipment

Filed [[mlcc-process-substeps-and-equipment]]: the 16-step process broken into sub-steps, each with its equipment. Items not yet backed by corpus sources are marked (g). Also linked from [[mlcc-manufacturing-process]].

## [2026-11-10] ingest | MLCC manufacturing process, step by step (slurry → test/sort)

Gap-filling ingest for RESEARCH_PLAN pillar 1. The corpus already had powder, dopant coating, debinding, sintering, re-oxidation, Ni paste, and a short termination page. Missing steps were researched with parallel web extraction, and raw notes were stored as `resources/manufacturing/{10,20,30,40,60,80}-*.md`. Sources are mostly granted patents (TDK, SEMCO, Murata, Taiyo Yuden, Rohm, Lintec, Nan Ya), plus NASA NEPP (Teverovsky, Brusse), vendor pages (Murata, ESI Allegro XP, Johanson), and one 2026 journal paper. No Tier-1 vendor publishes per-step production parameters, so most numbers are patent embodiments. This is flagged on each page.

**Concept pages created (8):** [[slurry-preparation-mlcc]], [[tape-casting-mlcc]], [[internal-electrode-printing]], [[step-height-compensation]], [[stacking-and-lamination-mlcc]], [[green-chip-cutting-and-side-margin]], [[barrel-chamfering-mlcc]] (draft), [[production-test-and-screening-mlcc]].

**Source pages created (4):** [[mlcc-slurry-tape-casting-research-notes]], [[mlcc-printing-lamination-research-notes]], [[mlcc-termination-plating-research-notes]], [[mlcc-test-sort-packaging-research-notes]].

**Updated:**
- [[mlcc-manufacturing-process]]: step → page table and patent-range caveats.
- [[termination-and-plating]]: paste, firing, and glass windows; plating-H and band-width defects.
- [[mlcc-margin-cover-design-rules]]: attached side margins of ~2–11 µm.
- [[electrode-overlap-and-registration]]: quantified registration.
- [[dielectric-layer-thickness-floor]]: tape-casting gate.
- index.

**Contradictions flagged:**
1. Ni barrier thickness: 2–3 µm (training deck) vs 3–10 µm (patents/NASA, thick Ni implicated in delamination), on [[termination-and-plating]].
2. Whisker mitigation: a vendor claim vs NASA observations.
3. Attached side-margin definitions differ between patents, on [[green-chip-cutting-and-side-margin]]. A spot-check against the patent text corrected an extraction error (the 5–15 µm range is not the margin width).

**Maintenance in the same pass:** added the missing `tags` frontmatter field to 21 concept pages (`paper`, matching the existing concept-page convention). The 2026-06-24 lint had reported frontmatter as passing; that was incorrect.

## [2026-06-24] lint | Wiki health check

Found: 1 error, 0 actionable warnings, 0 actionable suggestions (234 pages). **Auto-fixed 1 item:** 3 broken links in [[tdk]] — external `mlcc-part` skill-doc pointers were written as `[[…]]` wikilinks with a wrong relative path (`../../skills/…`, missing `.claude/`); converted to standard markdown links targeting `../../.claude/skills/mlcc-part/`. Clean otherwise: 0 orphans, index fully consistent both directions, 0 contradictions, all entity pages carry exactly one classification tag, 0 over-tagged/duplicate tags. Frontmatter passes the project CLAUDE.md schema on all pages (the skill-default `status`/`importance` fields are absent on 4 person entities + overview — left as-is, optional here). Tag-promotion flags `paper`/`patent` are legitimate source-format markers — not promoted.

## [2026-06-24] ingest | MLCC defect-analysis publications & failure-analysis techniques

Web-research ingest of MLCC defect-analysis literature. **2 concept pages created:** [[mlcc-failure-analysis-techniques]] (C-SAM / X-ray-CT / DPA cross-section+SEM-EDX / thermography / functional-acoustic screening, organized around the *defect-openness* principle and the non-destructive→electrical→destructive sequence) and [[mlcc-delamination]] (intrinsic co-firing origin vs hygrothermal reflow origin; why tightly closed delamination evades both X-ray and post-section SEM). **4 source pages created:** [[acoustic-microscopy-tight-delaminations-mlcc]] (Rayleigh-wave imaging for tight delaminations), [[x-ray-crack-detection-mlcc]] (Andersson & Ingman et al., Microelectronics Reliability 2016 — 300 bent MLCCs, 2D/3D X-ray + cross-section), [[acoustic-ml-crack-detection-mlcc]] (IEEE 2017/18 — AC-sweep acoustic response + SVM classifier), [[hygrothermal-reflow-delamination-mlcc]] (Microelectronics Reliability 2023 — moisture→6.23 MPa steam > 6 MPa adhesion; voids 0.15–0.55 µm, delamination 0.05–0.21 mm; X-FEM/ABAQUS). **Updated:** [[failure-modes-mlcc]] (added firing/knit-line crack types, a delamination-and-voids section, and an FA-methods backlink), [[mlcc-acoustic-noise]] (diagnostic-use backlink), index. Raw notes captured under `resources/literature/`.

## [2026-06-13] maintenance | De-brand the part-number decoder (vendor-neutral)

Generalized SEMCO-specific *naming/framing* so the shared repo doesn't read as a single-vendor employee project. Code: simulator symbols `parseSemcoCL`→`parsePartNumber`, `SEMCO_{SIZE,TCC,VOLTAGE,TOL}_CODES`→`PN_*`, comments/errors de-branded (343 tests pass). Wiki tool-framing generalized on [[case-size-geometry]] ("the simulator's SEMCO encoder" → part-number encoding lives in the multi-vendor mlcc-part skill, not the vendor-neutral simulator), [[samsung-cl-series]] ("the simulator's resolver" → the case-size resolver), and the [[chun-2024-screp-batio3-mlcc-degradation]] simulator-note (dropped the stale `VENDOR_ER_X7R` per-vendor-constant suggestion → grain-curve + calibration). Kept all factual research: SEMCO/Samsung as a cited vendor, datasheets, the CL part-number scheme as domain knowledge, and the multi-vendor mlcc-part skill. 228 pages, 0 dangling.

## [2026-06-13] query | Does Landau–Devonshire cover cutting-edge multi-additive MLCC?

Follow-up (what is LD; does it cover complex-additive / distributed-grain parts). Rather than a duplicate query page, folded the one new insight — the **modeling hierarchy** (homogeneous LD → chemistry-shifted coefficients → Ginzburg–Landau/phase-field → effective-medium core-shell → relaxor/random-field → empirical+calibration) and the "no model predicts a finished multi-additive part from recipe → measure-then-calibrate" punchline — into a *Scope & limits* section on [[landau-devonshire-permittivity-model]]. Added a backlink from [[capacitance-simulation-from-recipe-and-geometry]] explaining this is why the chip-sim looks up/calibrates εᵣ rather than computing it from theory. No new page; 228 pages, 0 dangling.

## [2026-06-11] query | Permittivity ↔ TCC ↔ DC-bias: one equation, and the εᵣ-vs-stability trade-off

Question thread: the three higher-capacitance options and the trade-off of raising εᵣ; whether permittivity, TCC and DC-bias relate by a single equation, and whether they live in one space. Synthesized the answer into two concept pages.

Created: [[landau-devonshire-permittivity-model]] — the single εᵣ(T,E,t) surface (σ = ln εᵣ); permittivity is its value, TCC `∂σ/∂T`, DC-bias `σ(T,E)−σ(T,0)`, aging `−∂σ/∂ln t`; Curie–Weiss (`TCC=−εᵣ/C_cw`) + Johnson tunability (`∝ εᵣ(0)³`); the field-induced Curie shift is the `∂²σ/∂T∂E` cross-term; the industry multiplicative model is the log-additive (separable) linearisation. [[permittivity-stability-tradeoff]] — the qualitative consequence: high εᵣ ⇄ poor T/V/t/grain stability, all from domain-wall mobility; C0G contrast; class ladder; core-shell partial escape. Backlinked from [[field-induced-curie-shift]], [[tcc-dc-bias-interaction]], [[ferroelectric-domain-wall]], [[mlcc-capacitance-equation]]; standard Landau/Curie–Weiss/Johnson theory supplied where the corpus had only the framing. 228 pages, 0 dangling.

## [2026-06-05] ingest | NASA + MIL + AVX MLCC qualification & internal-structure data

Collected the MLCC qualification "database" the user asked about and ingested it as a three-tier internal-structure dataset: **measured DPA** (NASA GSFC / Liu), **qualification design rules** (MIL/GSFC specs), and **vendor dimensions** (AVX automotive). Web-research via parallel extraction agents over the NEPP/GSFC corpus, the MIL specs, and the KYOCERA AVX automotive datasheets.

Key finds: the [[nasa-gsfc-liu-construction-database-2011|Liu & Sampson 2011]] 30-part construction table (per-part fired d, electrode thickness, layer count, cover, margins) is the measured core; [[mil-prf-32535-spec|MIL-PRF-32535]] supplies voltage-scaled margin/cover tables (no fixed dielectric thickness) and a VBR ≥ 6×VR screen; [[gsfc-mlcc-space-specs|GSFC S-311-P-838]] adds ≤300 layers + the grains-per-layer reliability gate; [[avx-automotive-mlcc-kam-kaf|AVX KAM/KAF]] datasheets fill the chip L×W×T dimension/tolerance gap the NASA data lacked.

Pages created (8): sources [[nasa-gsfc-liu-construction-database-2011]], [[mil-prf-123-spec]], [[mil-prf-32535-spec]], [[gsfc-mlcc-space-specs]], [[avx-automotive-mlcc-kam-kaf]]; concept [[mlcc-margin-cover-design-rules]]; entity stubs [[michael-sampson]], [[alexander-teverovsky]]. Updated (6): [[kyocera-avx]] (automotive + space-qual), [[dielectric-layer-thickness-floor]] (spec min-d-vs-V table), [[case-size-geometry]] + [[mlcc-dimensional-tolerance]] (real AVX/MIL dimensions & tolerances), [[index]]. Raw tables stored in `resources/literature/`, `resources/design-rules/`, `resources/market/avx/`. 226 pages, 0 dangling.

## [2026-05-31] ingest | Electrode-overlap pattern geometry, print registration & L/W/T dimensional tolerance

Grounded the simulator's geometry-model refinements (print-pattern overlap parameterization, in-plane shrinkage of the active area, and independent L/W/T dimensional tolerances) in the literature, then ingested the supporting physics.

Lit search confirmed: capacitance ∝ inner-electrode **overlap area** (not footprint); inner-electrode screen-printing is "one level higher than general thick-film printing" — print position/shape/flatness set performance; thickness is **layer-count-dependent** so case charts give a *thickness max* rather than a tight ± (height is application-specific); in-plane shrinkage is real and **anisotropic, tied to the tape-casting direction** (Okuma 2021 nano-CT); dimensional tolerances per EIA RS-198 / IEC 60384-1/-21/-22 / JIS C 5101.

Pages created: [[okuma-2021-mlcc-electrode-nanoct]] (source — synchrotron nano-CT of Ni electrode sintering, TDK/Tokyo Tech), [[electrode-overlap-and-registration]] (concept — print unit cell, 2-D coverage, registration tolerance, in-plane shrinkage, electrode discontinuity), [[mlcc-dimensional-tolerance]] (concept — L/W/T tolerance, why T differs, build-to-max-footprint), [[gaku-okuma]] + [[fumihiro-wakai]] (entity stubs). Updated: [[case-size-geometry]] (registration note + dimensional-tolerance subsection + cross-refs), [[green-tape-shrinkage-anisotropy]] (nano-CT confirmation of in-plane anisotropy), [[index]]. 218 pages, 0 dangling.

## [2026-05-29] simulator+ingest | Dielectric thickness floor — fix C_max envelope for small high-CV parts

Triggered by a real part: Samsung CL03A475 (0201, X5R, 4.7 µF, 6.3 V). The simulator claimed an 0201 "tops ~200 nF" — wrong by ~25×. Root-caused two compounding bugs and a stale assumption, fixed the code, and ingested the underlying manufacturing physics.

Root causes:
1. **Constant margins don't scale** — `em=125, sm=100 µm` consume 67 % of a 0.3 mm-wide 0201 (vs ~3.3× more active area with realistic ~35–50 µm margins).
2. **No dielectric thickness floor** — `predictCMax` used `d = V/E_design` (0.63 µm at 6.3 V) with no manufacturing limit; the real driver of thin layers is the grains-per-layer rule + tape-casting rheology, not voltage.
3. **Stale volumetric ceiling** — the "4 µF/mm³" I cited was ~2012 NASA-era; modern parts hit ~40 µF/mm³.

Code (`tier1.js`): added `cmaxEnvelope()` — the absolute manufacturing ceiling using bleeding-edge geometry: `d = max(D_FLOOR_FRONTIER=0.25 µm, V/E_MAX_FIELD=30)`, size-scaled margins (`em=max(35, 0.06·L)`, `sm=max(25, 0.06·W)`), thin electrode, high coverage. Kept `predictCMax`/`solveRecipe`/`compute` untouched (additive) so the grain-ε_r and held-out validations are unaffected. UI tile switched to `cmaxEnvelope`. Tests 259 → **293**. Now: 0201 X5R 6.3 V envelope ≈ 5.8 µF → CL03A475 (4.7 µF) feasible ✓; KYOCERA 0201 10 µF correctly flagged as beyond-frontier; 0 violations across all VENDOR_PARTS.

Wiki ingest — the manufacturing-physics basis:
- [[dielectric-layer-thickness-floor]] (new concept) — three coupled constraints: (1) ≥3–5 grains/layer reliability rule → 0.3–0.5 µm with 100 nm grain; (2) powder→binder→solid-loading wall (finer powder needs more binder, lowers castable solids); (3) tape casting tops out ~400 nm production, sub-1 µm only with 20–25 nm nanopowder. Floor: ~0.4–0.5 µm mainstream, ~0.25 µm frontier, **<0.2 µm unreachable in volume**.
- [[kyocera-thin-mlcc-roadmap]] (new source) — KYOCERA 0201 10 µF (4 V, 0.45 µm electrode, >90 % coverage); bleeding-edge frontier anchor.
- [[aqueous-tape-casting-ultrathin-batio3-2025]] (new source) — 180–300 nm production powder, 50–55 vol% solids / 35–43 vol% binder, ~400 nm fired floor.
- [[layer-thickness-and-metal-ceramic-ratio]] updated with the rheology floor + cross-ref.

Honest correction recorded: my "0.15–0.2 µm dielectric" reconciliation of the KYOCERA part was unphysical — the user was right. Real CL03A475 sits at ~0.3 µm; the lever for tiny high-CV is tighter margins + thinner electrodes + more layers down to the floor, not sub-0.2 µm dielectric. Wiki 213 pages, 0 dangling.

**Follow-up (same day):** user found `compute()` still gave only ~456 nF for a realistic 0201 recipe while the envelope tile said 5.8 µF — because I'd fixed margins only in `cmaxEnvelope`, not in `compute()`/the CASES table. Root cause: the CASES margins were near-constant absolute values (`em=125, sm=100`) that consume a 0201 (only 15 % active area). Fixed globally: CASES margins are now **size-scaled** (`em≈0.12·L` cap 350, `sm≈0.10·W` cap 250), used by `compute`/`predictCMax`/`solveRecipe`/UI alike. Refit the grain-ε_r curve for the new areas (`−681 + 10467·grain`, was `−600 + 10600`); Liu LOO-CV stays centered (geomean 1.01×, σ 45 %). Now `compute()` 0201 X5R gives 1.4 µF at d=0.5 µm / N=300 and 3.6 µF at d=0.3 µm / N=450 — consistent with the 5.8 µF envelope. [[case-size-geometry]] margin table updated. Tests stay 293 green.

---

## [2026-05-29] simulator | Critical review fixes: grain-size ε_r, held-out validation, DC-bias benchmark

Critical performance review of the simulator surfaced three problems; all fixed.

1. **Overfit per-vendor ε_r → grain-size physics curve.** The `VENDOR_ER_X7R` lookup (A/B/C/P → ε_r) was 4 params fit to the 24 Liu parts it was scored on, and could never apply to a real part (anonymous vendor bands). Diagnostic: corr(grain, implied-ε_r) = 0.76, R² = 0.57 — the vendor bands were a grain-size proxy. Replaced with `erGrain(grain) = clamp(−600 + 10600·grain_µm, 2000, 9000)`; falls back to class default when grain unknown (the honest real-world path).

2. **Train-on-test → held-out validation + leave-one-out CV.** Old "39 % accuracy" was measured on the calibration set. Now: LOO-CV of the grain curve gives geomean 1.00×, **1σ ≈ 43 %** (the honest out-of-sample number); Hernández/Chun held out (grain unknown → class default). The true generalization spread is ~40 %, dominated by ε_r variation the model can't see without grain data — NOT the overfit 18 %.

3. **DC-bias `f_V` never validated → benchmark vs measured curve.** `simulator/dc_bias_bench.cjs` checks `f_V` against the [[vishay-x7r-cap-drift-dc-bias|Vishay Fig. 2]] curve (plotted in V/µm, no d_fired assumption). The shipped X7R sigmoid (`E₀=4, p=2`) **over-predicted bias loss ~2×** — gave −50 % at 4 V/µm vs measured −25 %; RMS-log-error 0.94 and OUT of the EPCI envelope. Recalibrated to **`E₀=7.6, p=1.45`** (measured fit, ±3 pp, RMS-log-error 0.037, inside EPCI band). [[dc-bias-derating]] updated with a superseded-values warning.

Code: `tier1.js` (erGrain replaces VENDOR_ER_X7R; DCBIAS recalibrated), `test_tier1.cjs` (249→259 tests: held-out split, erGrain sanity, DC-bias-vs-Vishay ground-truth lock), new `dc_bias_bench.cjs`, `known_parts.cjs` (LOO-CV + held-out sections).

Wiki: [[dc-bias-derating]] params corrected + warning; [[capacitance-simulation-from-recipe-and-geometry]] validation-status section (honest ±40 % headline). 210 pages, 0 dangling.

---

## [2026-05-29] simulator | Per-vendor ε_r calibration + 30 known-geometry parts

Major chip-sim accuracy upgrade. User asked: "Are there any product with known geometry design?" Answer: yes — extracted Liu CARTS 2014 Table III (24 commercial Ni-BaTiO₃ MLCCs with disclosed grain / d_fired / N_a) plus four single-source academic disclosures (Polotai 2007, Yoon 2020, Song 2017, Yan thesis 2013), then added Chun 2024 (3 SEMCO X7R) and Hernández-López 2018 (3 KEMET X7R).

Total: **30 MLCCs with publicly-disclosed geometry** now in `simulator/tier1.js` as the `KNOWN_PARTS` table, with `computeFromKnown(k)` API for forward-prediction benchmarking.

Per-vendor ε_r calibration (Liu Mfr A/B/C/P pattern):
- Mfr A → ε_r = 3500 (was 3000)
- Mfr B → ε_r = 3000 (centered at default)
- Mfr C → ε_r = 3600 (fine-grain high-ε_r)
- Mfr P → ε_r = 9000 (coarse 0.77 µm grain in the BT ε_r peak regime)

Accuracy improvement: geomean ratio across 24 Liu samples went **0.91× → 1.06×**, 1σ spread **57 % → 39 %**, ±20 % hit rate **46 % → 71 %**, ±50 % hit rate **88 % → 92 %**. The remaining spread reflects irreducible vendor-to-vendor ε_r variation.

Source pages updated:
- [[nasa-general-reliability-model-ni-batio3]] — added full Table III with vendor-pattern commentary

Source pages created:
- [[chun-2024-screp-batio3-mlcc-degradation]] — Sci. Rep. 2024 Chun, Heo, Lee, Ye, Kang, Yoon. 3 SEMCO X7R prototypes (0805 4.7 µF/50V, 0402 0.22 µF/25V, 0805 10 µF/25V). Implied ε_r ≈ 6000 for modern Dy-Nb thin-layer.
- [[hernandez-lopez-2018-kemet-x7r-halt]] — Materials 2018 Hernández-López et al. 3 KEMET HV X7R (1.8×0.8×0.8 mm ≈ 0603, 100 nF, ~200 V, 7.5 µm × 68 layers) with Ca doping 0/2.8/8.1 mol%.

Entity stubs (3): [[jinhyuk-chun]], [[seok-hyun-yoon]], [[ana-maria-hernandez-lopez]].

Simulator updates:
- `tier1.js`: added KNOWN_PARTS (30 entries), VENDOR_ER_X7R map, computeFromKnown(), erForKnown()
- `test_tier1.cjs`: 13 new regression tests covering KNOWN_PARTS calibration (geomean band, per-vendor band, hit-rate floors, Song round-trip)
- Tests: 236 → **249 passing**

Wiki state: 210 pages (was 205, +5), 0 dangling wikilinks.

---

## [2026-05-28] ingest | AC × DC capacitance mapping — 7 pages (2 concepts, 3 entities, 2 sources, 2 concept updates)

User asked to search for the relation between capacitance under combined AC voltage and DC field together — the "AC-DC mapping" (joint `C(V_AC, V_DC)` surface). Previous ingests covered each axis separately; this ingest is about the joint surface itself.

Sources ingested (2):
- [[murata-dynamic-model-hidaka-2016]] — Murata 2016 technical article (Hidaka). Behavioral-source SPICE model handles `T × V_DC` automatically; returns only C_local (not C_large). Static model is a snapshot of the dynamic at one (T, V_DC) point.
- [[ben-yaakov-2025-nonlinear-capacitance-definition]] — EPCI 2025 (Ben-Yaakov, Ben-Gurion U). **Three distinct definitions of capacitance** for non-linear MLCCs: local `dQ/dV` (ripple/LCR), total `Q/V` (charge transfer), large-signal `ΔQ/ΔV` (resonant). Diverge by 10-30 % for high-bias-loss Class II parts.

Concept pages (2):
- [[ac-dc-capacitance-mapping]] — central new synthesis. Charge-based Q(V) formulation gives all three definitions for free. Three regimes (low-DC / mid-DC / high-DC × low-AC / mid-AC / high-AC). AC sensitivity collapses at high DC because operating point sits on saturating tail. Tier 3 simulator path: integrate Kalbitz Q(V) over operating AC swing.
- [[three-capacitance-definitions]] — companion concept page. Energy formula `E = ∫V·dQ` (NOT ½CV²) for non-linear caps. Vendor models: only Kalbitz analytic Q(V) gives all three definitions for free.

Entity stubs (3): [[seiji-hidaka]] (Murata), [[sam-ben-yaakov]] (Ben-Gurion), [[ben-gurion-university]].

Concept pages updated (2):
- [[ac-voltage-coefficient-mlcc]] — added cross-refs to new mapping and definitions pages.
- [[dc-bias-derating]] — added cross-refs.

Key findings:
1. **Capacitance is application-dependent** for non-linear MLCCs. Same Q(V) curve yields three different "capacitance" numbers depending on whether you're computing ripple (C_local), charge transfer (C_total), or resonant frequency (C_large).
2. **The joint AC × DC surface derives from a single 1D Q(V) function**. The Kalbitz analytic form gives the full surface implicitly.
3. **AC × DC interaction is NOT separable** in the simple multiplicative sense. At high DC, the operating point sits on the saturating tail of Q(V), so AC excursions sample a flat region and AC sensitivity collapses. This is the empirical observation of [[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020/2022]] explained at the model level.
4. **Vendor SPICE models split into three classes**:
   - Murata Dynamic Model: returns C_local automatically over (T, V_DC); no AC axis
   - Static Models: C_local at one fixed (T, V_DC); no AC axis
   - Kalbitz analytic Q(V): all three definitions; both axes
5. **The energy formula `E = ½CV²` is wrong for non-linear MLCCs**; for X5R 10 µF 6.3 V charged to 5 V, the gap can be 30 %. Matters for high-CV energy-buffer applications.

Wiki state: 205 pages (was 198, +7), 0 dangling wikilinks.

---

## [2026-05-28] ingest | Class-specific T_C engineering — 8 pages (1 synthesis concept, 1 stub concept, 4 sources, 2 entities)

User asked to search for the reason why T_C for each MLCC dielectric class is different, from academic publications. This is the **compositional engineering** explanation of why C0G is paraelectric, X7R sits at ~125 °C, X8R/X9R extends to 150-200 °C, Y5V puts T_C at room temperature.

Sources ingested (4):
- [[deluca-2018-biybo3-batio3-doping]] — J. Mater. Chem. A 2018. Trace BiYbO₃ at 0.005 mol% shifts T_C **+10 K** (very high leverage). T-O transition drops 50 K. Mechanism: Bi³⁺ stereochemically-active 6s² lone-pair.
- [[yabuta-2017-bi-mn-batio3-tetragonality]] — Sci. Rep. 2017. Bi+Mn co-doping at 0.1-0.5 mol%; Bi recovers Mn-induced T_C reduction; c/a increases with Bi content.
- [[x9r-batio3-bimg-nanbo3-2022]] — Crystals 2022. `0.5BT–0.25BMT–0.25NaNbO₃` ternary system hits X9R: ε_r ≈ 630 ± 15 % across −70 to +220 °C. Demonstrates the **multi-end-member** approach.
- [[cazro3-x8r-batio3-2015]] — Cer. Int. 2015. CaZrO₃ + Y₂O₃ doping creates **internal-stress core-shell** that shifts T_C upward via tensile-stress stabilization of tetragonal phase (chemical analog of the [[field-induced-curie-shift|E-field shift]] via the pressure-field equivalence).

Concept pages (2):
- [[class-specific-tc-engineering]] — **central new synthesis**. Dopant slope table (Zr −4.1, Sr −3, Pb +4, BiYbO₃ +10 K at 0.005 mol%). Two-knob framework (peak-shifter + peak-broadener). Class-by-class compositional summary. Three orthogonal mechanisms for T_C up-shift (lone-pair, internal-stress, acceptor/donor).
- [[bi-lone-pair-doping]] — central mechanism stub; Bi³⁺ 6s² lone-pair = Pb²⁺-equivalent without environmental restriction. Multi-cation Bi-based shifters table (BiYbO₃, BMT, BiScO₃, NBT).

Entities (2): [[marco-deluca]], [[hiroshi-yabuta]].

Key findings:
1. **T_C engineering uses dopant slopes**: Zr → Ti at −4.1 °C/mol%; Sr → Ba at ~ −3 °C/mol%; Pb → Ba at ~ +4 °C/mol%; trace Bi-based compounds at ~ +2000 effective °C/mol% (saturating above 0.01 mol%).
2. **Two-knob framework**: every class composition combines a **peak-shifter** (moves T_C up/down) AND a **peak-broadener** (flattens dε_r/dT around T_C).
3. **Three orthogonal up-shift mechanisms**: lone-pair (Bi-based, highest leverage), internal-stress (CaZrO₃ core-shell), acceptor/donor compensation (Bi/Mn). Modern X8R/X9R combines at least two.
4. **Y5V uniquely puts T_C inside operating range** (~25 °C) and relies entirely on relaxor/PNR broadening — opposite design philosophy from X7R.
5. **C0G uses a non-BaTiO₃ base** (CaZrO₃, Ba-Nd-Ti) — paraelectric throughout; no T_C in operating range.

Wiki state: 198 pages (was 190, +8), 0 dangling wikilinks.

---

## [2026-05-27] ingest | DC bias × TCC reshape mechanism — 11 pages (2 concepts, 5 entities, 4 sources, 3 concept updates)

User asked to search for **DC bias dependency of TCC curve** (how V_DC reshapes ε_r(T)) and **temperature dependency of DC bias effective capacitance** (how T modulates f_V(V_DC)). These are the two halves of the same T × V_DC coupling. Earlier ingests covered the empirical 2D-surface academic measurements and the multiplicative coupling model; this ingest focuses on the **underlying mechanism** — field-induced Curie shift.

Sources ingested (4):
- [[dulkin-roth-2020-batio3-curie-shift]] — arXiv 2020 (Hebrew U Jerusalem). Quantitative anchor: four independent single-crystal techniques converge on **dT_C/dE ≈ +1.3 °C/(kV/cm) = +130 mK/(V/µm)**. Pressure-field equivalence (p/E ≈ 23.8 bar·cm/kV) — the deep reason piezo/electrostriction couple identically.
- [[lim-cho-2010-batio3-mlcc-field-induced]] — Ferroelectrics 2010. **Validates the T_C shift in a finished X7R MLCC** (not just single crystal). Identifies a second hysteresis mechanism from injected charge alongside the classical ferroelectric switching.
- [[yoon-kim-2020-batio3-tetragonality-dc-bias]] — J. Mater. Chem. C 2020. **Structural anchor**: c/a tetragonality controls DC-bias performance. Lower c/a → better bias robustness AND smaller field-induced T_C shift. Mechanism: fine grain, Ba excess, or proximity to T_C all reduce c/a; the chip-sim simulator's recipe (T_sinter, A/B ratio, dopants) maps directly to c/a.
- [[lu-knowles-2023-dc-bias-explained]] — Knowles 2023 blog. Practitioner worked example: 200 V X7R 0.1 µF, +15 % / −30 % worst-case combined envelope. Linear-sum vs multiplicative model agreement at small individual losses.

New concept pages (2):
- [[field-induced-curie-shift]] — central new synthesis. T_C shifts upward, ε_r peak decreases; two faces of bias-induced polarization saturation. Multiplicative model handles amplitude collapse but not peak shift — under-predicts excursion near T_C for X8R/X8L parts.
- [[tetragonality-c-a-ratio]] — structural-parameter stub; the operative knob in the chip-sim recipe-to-bias-curve map.

Entity stubs (5):
- [[evgeniy-dulkin]], [[michael-roth]], [[hebrew-university-jerusalem]], [[victor-lu]], [[knowles-capacitors]].

Concept pages updated (3):
- [[tcc-dc-bias-interaction]] — added quantitative T_C shift anchor (+1.3 °C/(kV/cm)) and cross-refs to the three new sources + [[field-induced-curie-shift]].
- [[dc-bias-derating]] — added "Temperature dependence of f_V" section explaining the three T-dependence regimes (above T_C, near T_C, well below T_C) and tabulating by dielectric class (C0G/X7R/X8R/Y5V).
- [[empirical-c-t-vdc-academic-measurements]] — added "Additional anchor" section pointing to the three new field-induced-Curie-shift sources.

Headline findings:
1. **Quantitative T_C shift rule of thumb**: dT_C/dE ≈ +1.3 °C/(kV/cm) = +130 mK/(V/µm), from cross-method consolidation in BaTiO₃ single crystals (Dul'kin & Roth 2020).
2. **Pressure-field equivalence**: 23.8 bar·cm/kV — the same Landau response governs both, which is why piezo + electrostriction strain coupling produces equivalent T_C shifts and why soft-terminated MLCCs should show smaller bias-induced TCC reshaping in flex-loaded boards.
3. **Two simultaneous deformations under DC bias**: peak amplitude collapses (the `f_V` factor in the multiplicative model) AND peak position shifts upward (NOT captured by the multiplicative model). Combined model needs both.
4. **Structural origin**: lower c/a tetragonality → smaller shift, flatter `f_V`, higher ε_r under bias. Fine-grain (200–260 nm) X7R compositions have low c/a, explaining the cross-paper grain-size convergence.
5. **Practical impact**:
   - X7R (T_C ~ 120 °C, well above operating range): peak shift negligible; multiplicative model excellent.
   - X8R/X8L (T_C ~ 70-90 °C): +1.3 K/(V/µm) correction needed when V_DC > 30 % rated.
   - Y5V (T_C in operating range): multiplicative model unreliable; flag uncertainty.

Wiki state: 190 pages (was 179, +11), 0 dangling wikilinks.

---

## [2026-05-27] ingest | AC dependency of TCC curve — 14 pages (5 concepts, 4 entities, 3 sources, 2 concept updates)

User asked to "search for AC dependency of TCC curve" — the third leg of the ε_r(T, V_DC, V_AC) surface. Previous ingests covered the T axis and V_DC axis individually plus T × V_DC; this ingest covers the V_AC axis and the T × V_AC coupling.

Sources ingested (3):
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — Würth ANP114 by R. Kalbitz: SPICE-friendly analytic C(V) = Cs + a·sech²((V−Vc)/b) polarization model; 1 V_rms / 1 kHz / 20 h preconditioning test conditions. PDF extracted to resources/literature/_tmp/wurth-anp114.txt.
- [[herb-ma-2020-2022-mlcc-ac-dc-aging]] — Samsung Electro-Mechanics (Herb Ma) 2020 Microwaves & RF + 2022 EPCI: quantifies AC × DC × aging interaction. Key data: 0.5 V_rms / 1 kHz is the EIA-198-1F standard test; reducing AC to 10 mV_rms costs an additional 4 % capacitance loss; at zero DC bias AC level swings C by up to 30 %; at heavy DC the AC effect collapses.
- [[covaci-gontean-2022-singing-mlcc]] — Sensors 2022 review: strain `s_z = d_33·E + M_33·E²`; piezoelectricity gives fundamental-frequency vibration ∝ E_AC, electrostriction at fundamental gives `∝ E_DC · E_AC`, electrostriction at 2ω gives `∝ E_AC²/2`. SPL = 0.57·V_cb + 127.30 empirical correlation.

Concepts created (5):
- [[ac-voltage-coefficient-mlcc]] — central new synthesis; three mechanisms (Rayleigh, bell-shape integration, piezo+electrostriction); non-monotonic in AC amplitude; AC × DC NOT separable in the naive multiplicative sense.
- [[tcc-ac-coupling]] — dedicated treatment of how AC level reshapes the TCC curve via `dα'/dT · E_AC`; all curves converge above T_C; ~3-5 % working-point shift across the standard 0.01 to 1.0 V_rms range.
- [[electrostriction]] — quadratic E²→strain; universal; survives above T_C; gives second-harmonic strain.
- [[piezoelectricity-batio3]] — linear E→strain; requires non-centrosymmetric phase; vanishes above T_C; needs DC poling for finite d_33.
- [[mlcc-acoustic-noise]] — "singing capacitors"; same root mechanism as AC voltage coefficient.
- [[soft-termination-mlcc]] — recipe-level toggle; KEMET FT-CAP / FO-CAP, Murata ZRB, TDK MEGACAP, JCC soft-term lines.

Entities created (5):
- [[rene-kalbitz]] (Würth), [[wurth-elektronik]], [[herb-te-jen-ma]] (SEMCO), [[ciprian-covaci]] + [[aurel-gontean]] (Politehnica Timișoara).

Concepts updated (2):
- [[temperature-coefficient-of-capacitance]] — added "Coupling with AC level" section; cross-refs to ac-voltage-coefficient-mlcc and tcc-ac-coupling.
- [[tcc-dc-bias-interaction]] — added AC-axis cross-refs.

Key findings:
1. **AC dependence is non-monotonic**: C rises with AC amplitude up to ~50-500 mV_rms then falls — sweeping the bell-shaped C(V) curve. At very low AC (~10 mV_rms) C is ~4 % below standard-condition.
2. **AC × DC is NOT separable**: at zero DC bias AC level can swing C by 30 %; at heavy DC the AC effect collapses to negligible. The Zednicek multiplicative formula `C = C_rated · f_T · f_V · f_AC · f_age` is approximate.
3. **Three contributing mechanisms**, each with its own T-dependence: Rayleigh α'(T) collapses above T_C (Fujii 2023); bell-shape amplitude `a(T)` shrinks with T (Kalbitz); piezoelectric `d_33` drops near T_C while electrostriction `M_33` survives (Covaci & Gontean).
4. **TCC curve depends on AC level**: dε'/dT|_E_AC has an explicit `+ dα'/dT · E_AC` term, so the same part traces different TCC curves at 10 mV_rms vs 500 mV_rms — all curves converge above T_C.
5. **Standard test conditions**: EIA-198-1F mandates **0.5 V_rms / 1 kHz / room T / no DC bias**. Published TCC envelopes are valid at this condition; real-circuit operating conditions can shift effective TCC by 3-5 %.

Wiki state: 179 pages (was 165, +14), 0 dangling wikilinks.

---

## [2026-05-27] query | TCC × DC-bias relation (re-asked) — existing query page updated with new academic anchors

Question: "describe relation between TCC and DC-bias cap". Same question as earlier "how does DC-bias cap and TCC cap related?" — but asked after the academic-bias-TCC ingest, so the answer is much richer. Updated existing filed page [[dc-bias-vs-tcc-relationship]] in place rather than creating a duplicate. Added: Rayleigh microscopic-basis subsection, academic-literature calibration table (E₀ values from He 2022, Hwang 2024, He 2025, etc.), grain-size convergence note, bulk-vs-MLCC gap caveat. Pages consulted: [[tcc-dc-bias-interaction]], [[empirical-c-t-vdc-academic-measurements]], plus all 7 academic source pages from the prior ingest.

---

## [2026-05-27] ingest | Academic bias-TCC measurements + empirical 2D-surface synthesis

User asked to look for bias-TCC measurements from academic publications and "include suggestion 1" (empirical T × V_DC surface for a reference part).

Searched the academic literature (Adv. Mater., Sci. Rep., Cer. Int., Microstructures, ACS AMI). The closest analog to a vendor SimSurfing 2D surface in the published academic literature is [[wang-2023-x5r-ni-mlcc-combined-out-field]], a 1210-case Dy/Ho-coated X5R Ni-MLCC explicitly characterized under combined T × V_DC × V_AC fields. The cleanest microscopic decomposition is [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] (Rayleigh α' across −180 to +150 °C). The richest cross-axis measurement is [[song-2017-compositionally-graded-mlcc]] (T −55 to +125 °C × E 0 to 50 kV/cm on a graded BTS-BCN MLCC).

Pages created (7 source + 5 concept + 5 entity = 17):

Sources:
- [[song-2017-compositionally-graded-mlcc]] — Sci. Rep. 2017, 70 % tunability
- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] — Rayleigh decomposition, T-resolved
- [[he-2025-bsite-ca-batio3-pnr]] — Microstructures 2026, B-site Ca → PNR
- [[wang-2023-x5r-ni-mlcc-combined-out-field]] — Cer. Int. 2023, combined out-field X5R
- [[he-2022-dy-ho-batio3-dc-bias]] — Cer. Int. 2022, Dy-Mg 180 nm, −23.6 % at 4 V/µm
- [[hwang-2024-coreshell-electrode-dc-bias]] — ACS AMI 2024, core-shell + electrode, X7S MLCC
- [[an-2026-grain-boundary-segregation-dc-bias]] — Adv. Mater. 2026, 200–260 nm sweet spot

Concept synthesis + stubs:
- [[empirical-c-t-vdc-academic-measurements]] — central synthesis; cross-paper convergence + recipe-specific (E₀, p) calibration table for the chip-sim's [[dc-bias-derating]] sigmoid
- [[polar-nanoregions-pnr]] — promotes the He 2025 microstructure to a first-class concept
- [[rayleigh-analysis]] — promotes the measurement method from a tag to a page
- [[dielectric-tunability]] — same physics as bias derating, varactor-literature sign convention
- [[relaxor-ferroelectric]] — material class anchor
- [[susan-trolier-mckinstry]], [[ichiro-fujii]], [[shashank-priya]], [[penn-state]], [[virginia-tech]] — person/org stubs from these papers

Pages updated:
- [[tcc-dc-bias-interaction]] — added "Academic-literature calibration anchors" section pointing at the new sources.
- [[dc-bias-derating]] — added "Recipe-specific calibration from academic literature" with the (E₀, p) table.
- [[core-shell-batio3]] — promoted three references to wikilinks pointing at the new source pages.

Key cross-paper findings:
1. **Grain-size sweet spot for DC-bias robustness converges to 150–260 nm** with Dy-based dopant package. (He 2022, Wang 2023, An 2026).
2. **Bulk ceramic measurements systematically under-state finished-MLCC bias loss** by ~10 percentage points (Hwang 2024: −17 % bulk vs −28 % MLCC, same composition at 4 kV/mm).
3. **Above T_C, α' → 0** (Fujii 2023) — provides the microscopic basis for the separable multiplicative model used in [[tcc-dc-bias-interaction]].
4. **PNR-based dielectrics open a route around the X8R high-T-bias coupling regime** (He 2025: bias loss 60 % → 15 %, T_C shift from 129 → 60 °C).
5. **Calibration values for the simulator's sigmoid**: Dy-Mg 180 nm → `E₀ ≈ 7 V/µm`; PNR composition → `E₀ ≈ 10 V/µm`. Both are substantially shallower than the chip-sim's current X7R default of 5 V/µm.

Wiki state: 165 pages (was 148, +17), 0 dangling wikilinks.

---

## [2026-05-27] query | DC-bias vs TCC relationship

Question: "how does DC-bias cap and TCC cap related?" Filed as [[dc-bias-vs-tcc-relationship]]. Key pages consulted: [[tcc-dc-bias-interaction]], [[temperature-coefficient-of-capacitance]], [[dc-bias-derating]], [[epci-high-cv-mlcc-bias-aging]]. Short answer: two independent multiplicative derating factors `f_T(T) × f_V(V_DC)` of the Zednicek formula; separable for typical X5R/X7R within ±5–10 %; couples significantly near T_C, at high bias, and for Y5V.

---

## [2026-05-27] ingest | TCC × DC-bias interaction — new concept page synthesizing the coupling

User asked to crawl for TCC characteristics and their relation to DC-bias effective capacitance. Audited existing coverage first: solid pages on each topic individually ([[temperature-coefficient-of-capacitance]], [[dc-bias-derating]], [[aging-class-2]], [[dc-bias-aging]]) but **the coupling between them was under-documented**.

Crawled vendor app notes (Murata, Wurth ANP114), industry articles (EPCI / passive-components.eu, Knowles blog), and academic measurements (X5R bias vs T from −5 to +70 °C). Key findings synthesized into the new concept page:

- [[tcc-dc-bias-interaction]] — central new synthesis:
  1. **Multiplicative model** `C_actual = C_rated × f_T × f_V × f_AC × f_age` is the standard industry approach (Zednicek/EPCI). Approximately correct for typical operating points.
  2. **The two factors are largely independent**: EPCI 2024 measurement showed normalized bias curves track tightly across −5 to +70 °C for X5R, i.e. `f_V(V_DC)` is approximately T-independent over the working range.
  3. **Where it breaks down**: (a) Y5V (Curie peak in operating range — strongest coupling), (b) X5R/X7R at high V_DC and high T near T_C (multiplicative model under-predicts loss by 5–15 %), (c) X8L asymmetric envelope.
  4. **Vendor variation dominates class category**: EPCI cross-vendor measurement of "0805 X7R 10 µF 6.3 V" found bias loss ranging from −35 % to −65 % across three vendors; some vendors' X7R parts have worse bias than other vendors' X5R. Class label (X5R/X7R/X8R) doesn't reliably predict bias robustness.
  5. **Vendor SPICE tool implementations**: split into "dynamic" (Murata SimSurfing — 2D coupled lookup) vs separable multiplicative (Murata SpiCap, K-SIM, SEAT, SEMCO CSS).
  6. **Worked example** for the chip-sim Tier 2: 0805 X5R 10 µF 6.3 V at 5 V DC and 60 °C → `f_T × f_V = 0.93 × 0.27 = 0.25` → 2.51 µF predicted vs 2.2–2.6 µF measured. Multiplicative model lands inside the ±10 % accuracy target.

Updates:
- [[temperature-coefficient-of-capacitance]] — added "Coupling with DC bias" section pointing at the new page, plus cross-ref.
- [[dc-bias-derating]] — added "Coupling with temperature (TCC)" section, plus cross-ref.

Wiki state: 147 pages (was 146), still 0 dangling wikilinks. Total concept-page count for the temperature-and-voltage derating cluster: 5 ([[temperature-coefficient-of-capacitance]], [[dc-bias-derating]], [[aging-class-2]], [[dc-bias-aging]], [[tcc-dc-bias-interaction]]).

---

## [2026-05-27] ingest | Patent corpus expansion — 4 new patents, 2 drafts promoted

User asked to expand the patent corpus and to look for dangling / draft documents to enrich. Audited the wiki first:
- 142 total pages, **0 dangling wikilinks** (clean).
- 8 pages with `status: draft`. Highest-referenced: [[tdk]] (15 incoming), [[bordia-scherer-composite-sintering]] (10), [[nanbo3]] (7), [[rahaman-ceramic-processing-sintering-textbook]] (7), [[srtio3]] (7).

Ingested four more US patents:
- [[us-6043974-philips-dy-stabilizer]] — Chen/Lee/Tseng (Philips → Phycomp Holding) 2000. The Dy-at-A-site insight that became universal X7R BME doping practice. Composition `(Ba₁₋ₐ₋ᵦCaₐDyᵦ)(Ti₁₋ᶜ₋ᵈ₋ₑ₋ƒZrᶜMnᵈNbₑ)ƒO₃₊δ`. Mechanism: Dy donor at the Ba site fixes Mn's charge state, suppresses DC-bias-driven IR degradation under high T.
- [[us-7670981-kemet-c0g-bme]] — Randall, Pinceloup, Gurav, Burn et al. (KEMET) 2010. Evolved Ca-Sr zirconium titanate base with **composition-vs-thickness rule**: transition-metal oxides (Mn) below 4.5 µm dielectric thickness, Group III/IV oxides (Si, Ge) above. The modern KEMET C0G BME chemistry.
- [[us-9799451-samsung-na-substituted-batio3]] — Park et al. (SEMCO) 2017. Partial Na substitution at the Ba site (x = 0.005–0.035) as the lattice-distortion route to V_O suppression. Alternative to RE doping for X5R/X7R/X8R; cost-friendlier (Na ≪ Dy).
- [[us-11222749-samsung-dy-nb-thin-layer]] — Kim et al. (SEMCO) 2022. Dy + Nb co-doping at 0.2–1.5 mol% per 100 mol Ti for sub-0.5 µm dielectric layers. Nb segregates to grain boundaries; Dy partitions through the grain — complementary site occupancy. The modern thin-layer high-CV BT chemistry. Family includes US 11,127,532 / 11,735,361 / 11,776,748 / 11,295,894 (Nd variant).

Promoted two drafts from `status: draft` to `status: complete`:
- [[tdk]] — fleshed out the TDK entity page. Added the C / CGA / CGJ / CKG / CNA series breakdown, the metric-size-code convention, the CeraLink anti-ferroelectric line from EPCOS heritage, the part-number format with a worked example, and a candid note that the wiki's patent corpus has a TDK gap (Google Patents search returns mostly Samsung/KEMET/Murata for MLCC; TDK patents skew Japanese-filing).
- [[bordia-scherer-composite-sintering]] — expanded from a stub to a full concept page. Now covers the core physics (back-stress + contact substitution + anisotropic strain), the linear bound `(1 − v_i)` vs the empirically observed 7× retardation factor in real Ni-BT pastes, the three-paper structure (Paper I constitutive, II Skorohod comparison, III rigid inclusions), and four limits of the model.

Wiki state: 146 total pages (was 142), 6 drafts remaining (down from 8), still 0 dangling wikilinks.

Remaining drafts (low-priority — minor entity stubs and a textbook bibliographic page):
- [[nanbo3]], [[srtio3]] (material pages)
- [[intel]], [[rohm]] (peripheral company stubs)
- [[mistler-twiname-tape-casting-textbook]], [[rahaman-ceramic-processing-sintering-textbook]] (textbook reference pages — intentional stubs since the books themselves aren't ingested)

Coverage gaps still standing:
- TDK MLCC-specific patents (search keeps returning Samsung)
- Murata sub-µm thin-layer manufacturing patents (post-2010)
- Murata GCM automotive AEC-Q200 specific patents
- KEMET FT-CAP soft-termination patent (US 7,670,981 turned out to be the C0G BME patent, not soft-termination — soft-term is a different number not yet identified)

---

## [2026-05-27] ingest | Foundational MLCC patents — 4 sources

User asked to fill the wiki with patent data. Searched Google Patents and USPTO for the foundational and most-influential MLCC patents across the major vendors. Ingested four with detailed bibliographic data, claims, and connection to existing wiki concepts:

- [[us-4115493-murata-sakabe-1978-bme-foundational]] — Murata's foundational BME patent (Yukio Sakabe & Hiroshi Seno, filed 1977, granted 1978, expired 1997). The Ca-doped BaTiO₃ non-reducing dielectric `{(Ba₁₋ₓCaₓ)O}ₘ(Ti₁₋ᵧZrᵧ)O₂` that enabled mass-production Ni-electrode MLCC starting in 1982 and cut MLCC dielectric/electrode cost 60-80%.
- [[us-7172985-kemet-non-reducible-dielectric]] — KEMET 2007 update: Ca-Sr zirconium titanate primary (94-99.9 wt%) + SiO₂-B₂O₃-Li-MO glass (0.1-5 wt%). Anchors the [[bme-c0g]] Class I BME product family.
- [[us-8713770-kemet-flex-crack-voids]] — KEMET 2014 (John Prymak): sacrificial pre-channel material printed into the green stack burns out during firing, leaving designed voids that route flex cracks toward non-active regions. Basis for KEMET's FO-CAP / Open Mode line.
- [[us-9336947-samsung-low-temp-sintering-dielectric]] — Samsung Electro-Mechanics 2016 (Lim, Yoon, Kim, Kim): B₂O₃-BaO sintering aid at 0.1-2 mol% loading drops the BT densification window to 1050-1150 °C, enabling sub-µm dielectric layers without runaway grain growth.

Each page links into the existing concept pages ([[core-shell-batio3]], [[bme-sintering-atmosphere]], [[ni-batio3-cosintering-interface]], [[layer-thickness-and-metal-ceramic-ratio]], [[failure-modes-mlcc]], etc.) showing how the patented inventions map onto the design rules and process knobs the simulator and wiki are already tracking.

Coverage gaps (deferred):
- Foundational SEMCO core-shell BaTiO₃ patents (we have a low-T sintering one but not the core-shell formulation patent itself).
- TDK Y-doped / Mg-co-doped X7R patents.
- Murata sub-µm thin-layer manufacturing patents (post-2010).
- KEMET FT-CAP soft-termination patent (US 7,670,981 — referenced but not yet ingested).
- Murata GCM/GJM automotive AEC-Q200 specific patents.

---

## [2026-05-21] ingest | ε_r and T_C from BaTiO₃ dopant composition

Per the previous query's identified gap: "Predicting `ε_r,nominal` from dopant composition" was flagged as the biggest blocker for Tier 3 of the capacitance simulator. This ingest closes that gap with two foundational sources plus a synthesis concept page.

New sources (2):
- [[garcia-vanderbilt-1998-batio3-dft-er]] — arXiv cond-mat/9802208 (open access). First-principles DFT + effective Hamiltonian + Monte Carlo calculation of ε_r(T) for BaTiO₃, reproducing Curie-Weiss form and tetragonal-phase anisotropy without empirical adjustment beyond a linear T-rescaling. Methodology basis for any future doped-BaTiO₃ first-principles route.
- [[liu-2019-sm-mn-codoped-batio3-permittivity]] — *Materials* 12 (2019) 678 (open access, PMC). Quantitative (Ba₁₋ₓSmₓ)(Ti₀.₉₉Mn₀.₀₁)O₃ sweep: ε_r,peak rises from 5,480 to 15,220 and T_C drops from 105 to 20 °C as Sm rises 2 → 7 mol%. Mechanism: charge-neutral 2 Sm_Ba• — Mn_Ti″ defect complex suppresses space-charge polarization. Gives recipe-actionable slopes α_Sm ≈ +1,950 / mol% and β_Sm ≈ −17 °C / mol%.

New concept page:
- [[epsilon-r-from-dopant-composition]] — synthesizes three prediction routes:
  1. **DFT + effective Hamiltonian + MC** (García-Vanderbilt) — gold standard for pure BT, combinatorially hard for multi-dopant.
  2. **Empirical ionic-radius + valence correlations** — production-ready when calibrated. Table of RE ionic radius vs site preference vs T_C direction: La/Sm/Nd (large, A-site donor, lower T_C); Y/Ho/Dy (amphoteric, near 117 pm crossover); Yb/Lu/Er (small, B-site acceptor, raise T_C). Linear-superposition empirical model `ε_r ≈ ε_r⁰ + Σ α_i x_i`, `T_C ≈ T_C⁰ + Σ β_i x_i`.
  3. **Machine learning on measured datasets** — emerging path (Random Forest / XGBoost / SVR on lab-scale CaZrO3+Y2O3 datasets); bottleneck is dataset availability since vendor data is proprietary.

Updates:
- [[dopant-site-occupancy-batio3]] — cross-ref to ε_r prediction and Liu source.
- [[core-shell-batio3]] — cross-ref to the new synthesis page.

Bottom line: the wiki now has the **conceptual scaffolding to predict ε_r,nominal from a BaTiO₃ recipe at Tier-2 fidelity** using empirical ionic-radius + valence correlations plus the Liu Sm slopes as one quantitative calibration point. A practical Tier-3 ML predictor needs 5-10 more co-doping studies ingested as additional calibration data. First-principles Route 1 remains research-only — combinatorially intractable for multi-dopant MLCC recipes.

---

## [2026-05-21] query | Capacitance simulation from recipe + geometry

Question: "given ni paste, bto green sheet with some additive composition, sheet thickness, overlap, and stack layers count, capacitance of mlcc can be simulated?" Filed as [[capacitance-simulation-from-recipe-and-geometry]]. Key pages consulted: [[mlcc-capacitance-equation]], [[dielectric-shrinkage-in-mlcc-stack]], [[layer-thickness-and-metal-ceramic-ratio]], [[skorohod-olevsky-viscous-sintering]], [[shi-2023-jecs-sovs-bilayer-modeling]], [[ni-electrode-paste-formulation]], [[green-density-vs-shrinkage]], [[dc-bias-derating]], [[vendor-spice-models]], [[bme-reliability-model]], [[case-size-geometry]].

Answer: yes, in three accuracy tiers — (1) geometric back-of-envelope `C = εr · ε0 · A · N / d` with default 20 % discontinuity allowance gets ±15-20 %; (2) material-corrected adds DC-bias / TCC / aging / grain-size sub-models for ±10 % (same fidelity as commercial vendor SPICE tools); (3) SOVS-coupled process-physics with per-recipe `η(T)` calibration gets ±5 % and is the research frontier. The wiki has the conceptual scaffolding for all three. Gaps: predicting `εr,nominal` from dopant composition (needs DFT or vendor calibration), and predicting reliability from recipe (needs accelerated-life-test calibration of the Liu BME framework constants). Bottleneck for Tier 3 isn't modeling capability — it's the irreducible measurement of `η(T)` from free-tape dilatometry per recipe.

---

## [2026-05-21] update | Layer thickness and metal/ceramic ratio detail

User-requested follow-up to the alternating-layer ingest: add the quantitative scaling on layer thickness and metal/ceramic ratio.

New concept page:
- [[layer-thickness-and-metal-ceramic-ratio]] — historical h_BT / h_Ni evolution table (PME 1990s → 2020s leading edge); h_BT physical scaling (5 effects of thinning); Yan Ch. 7.7 h_Ni discontinuity table (0.2 → 1.0 µm); h_Ni/h_BT per-layer constraint regimes; three definitions of metal/ceramic ratio (in-paste / per-layer / stack-level); Yan Ch. 7.5 green-density sweet spot (D₀ = 0.55, non-monotonic); modern thin-layer benchmark (h_BT 0.3-0.5 µm, h_Ni 0.4-0.7 µm, stack Ni vol fraction 35-45 %).

Updates:
- [[dielectric-shrinkage-in-mlcc-stack]] — one-line pointer at the new page.
- [[metal-electrode-shrinkage-effect]] — one-line pointer at the new page.

Key new numbers surfaced: **the stack Ni volume fraction in a modern thin-layer MLCC is 35-45 %**, vs ~20 % in legacy parts. Almost half the active stack is metal. The chip-scale shrinkage trajectory is no longer dominated by the BT — it's a Ni/BT average weighted by volume. Stack stiffness during cooldown is closer to bulk Ni than to bulk BT.

Also captured the **non-monotonic green-density effect** (Yan Ch. 7.5): D₀ = 0.40 (7.0 % discontinuity) → D₀ = 0.55 (2.3 %, sweet spot) → D₀ = 0.60 (3.1 %, worse again). Below 0.55 too much initial heterogeneity seeds discontinuity; above 0.55 faster sintering creates more shrinkage mismatch.

---

## [2026-05-21] ingest | Effect of metal electrode on ceramic shrinkage in the alternating-layer MLCC stack

Per `/wiki ingest investigate effect of metal electrode to shrinkage of ceramic in alternating layer structure in bme mlcc sintering`.

This drilled into how the alternating Ni / BT / Ni / BT … lamination specifically reshapes the **ceramic layer's** shrinkage (not the metal's). Re-mined Chapters 4, 5, and 7 of the existing [[yan-thesis-2013-mlcc-sintering-nanotomography|Yan thesis]] for primary data, supplemented by Olevsky 2013 JACerS multilayer-porous-structure framework, Tzeng-Jean 2002 alumina/glass/alumina sandwich, and Bouvard-Martin 2014 JECS follow-up (search snippets; not fetched).

Key primary data from Yan thesis Ch. 4 + 5 + 7:
1. **Strain anisotropy** of BT dielectric layer ~0.1 absolute (axial − radial) after the cycle — in-plane suppression, thickness enhancement via Poisson coupling.
2. **Stress reversal**: BT compressive in Stage A (Ni shrinking, BT cold) → BT tensile in Stage C (after 1050 °C, BT densifying). Compressive-then-tensile reversal accelerates BT particle rearrangement early and constrains it late.
3. **Pore orientation in BT** (FIB-nT): preferentially elongated parallel to the layer plane; fraction along casting direction rises from 3 % (green) to 11 % (sintered).
4. **Density gradient in BT**: surface/interface region denser (~60 %) than middle (~39 %) in the green layer — the OPPOSITE of free thin-film-on-rigid-substrate behavior, because in MLCC the "substrate" (Ni) is itself shrinking and compressing the BT interface region.
5. **Edge vs internal layer**: top edge electrode discontinuity 56.1 % vs internal 60.4 %; explicitly noted by Yan that small-sample experiments systematically underestimate constraint anisotropy.
6. **DEM electrode-thickness sensitivity** (Yan Ch. 7.7): h_Ni 0.2 µm → 24.3 % discontinuity vs 1.0 µm → 2.3 %.
7. **DEM heating-rate sensitivity** (Ch. 7.4): 1 °C/min → 14.5 % vs 50 °C/min → 1.1 % discontinuity.
8. **Particle-pair anisotropy** (Ch. 7.9): BT-BT vertical contacts grow more than horizontal; Ni-Ni vertical contacts grow less than horizontal. The metal-and-ceramic anisotropy are inverted at the particle scale.

New concept pages (2):
- [[dielectric-shrinkage-in-mlcc-stack]] — central new concept. Synthesizes the five mechanisms above with quantitative tables. Companion to [[metal-electrode-shrinkage-effect]] — that page was electrode-centric, this one is dielectric-centric.
- [[edge-vs-internal-layer-effects]] — position-dependent constraint asymmetry; cover-layer design as engineered compensation; epistemic warning about extrapolating small-sample data.

Updates:
- [[constrained-sintering-mlcc]] — added Yan Ch. 7 DEM table (heating rate / electrode thickness / green density / BT additive effect on Ni discontinuity) plus the BT-BT vs Ni-Ni inverted pair anisotropy.
- [[metal-electrode-shrinkage-effect]] — cross-ref to the new dielectric-centric page.

Bottom line: the **alternating layer structure** transforms the ceramic layer's shrinkage in five qualitatively distinct ways — (1) macroscopic anisotropy (ε_a > ε_r by ~0.1), (2) stress-reversal during the cycle, (3) in-plane pore alignment, (4) interface-region densification rather than thin-film-style depletion, (5) layer-position asymmetry. Free-tape sintering is **not predictive** of stack-scale dielectric shrinkage; constrained-sintering physics (SOVS or Bordia-Scherer) is required to capture all five.

---

## [2026-05-21] ingest | Metal-electrode effect on BME MLCC shrinkage

Per `/wiki ingest investigate effect of metal electrode to shrinkage in bme mlcc sintering`.

Two new sources captured:
- Polotai, Jeong, Yang, Dickey, Randall, Pinceloup, Gurav, *J. Electroceramics* 18 (2007), DOI 10.1007/s10832-007-9124-4 — Cr-1 wt% addition to Ni electrode. Extracted via academia.edu HTML.
- Sugimura & Hirao, *J. Ceram. Soc. Jpn.* 117 (2009) 1039 — BT nanoparticle additive effect on Ni paste. Captured via J-STAGE WebFetch citation; Noritake industry paper.

Key extracted findings:
- **Polotai 2007 decoupling**: Ni-1 wt% Cr and pure Ni have **identical densification curves** but Cr-doped MLCCs have markedly better electrode continuity. Cr's mechanism is **interfacial segregation that chemically suppresses the (Ni,Ba,Ti) liquid alloy layer**, not a shrinkage-rate change. ~8 nm interfacial alloy seen in undoped samples is absent where Cr segregates at the interface (6.8 at% Cr / 93.2 at% Ni). Tested on 0805 / 300 layer / 1 µm dielectric+electrode MLCC at 1200-1250 °C / 5 h.
- **Sugimura-Hirao 2009 sweet spot**: 30 nm BT at 10 mass% loading in 0.2 µm Ni paste → > 75 % Ni film coverage. Smaller BT outperforms larger BT dramatically at the same mass% — 50 nm and 100 nm require much higher loadings to reach the same coverage.

New wiki source pages (2):
- [[polotai-2007-cr-doping-ni-electrode-mlcc]] — full mechanism, VC-SEM / HR-TEM / EELS methodology, decoupling between shrinkage and continuity.
- [[sugimura-hirao-2009-batio3-additive-ni-electrode]] — empirical industry recipe + onset-temperature shift mechanism.

New wiki concept pages (3):
- [[metal-electrode-shrinkage-effect]] — central new concept: the four engineering knobs (nano-BT additive / refractory-metal dopant / Ni particle size / electrode thickness ratio) and how the metal electrode constrains lateral but not thickness shrinkage in the stack. Three sintering regimes (stage 1 tensile / stage 2 transition / stage 3 compressive) and the Ni-vs-BT 450 °C onset gap.
- [[ni-electrode-paste-formulation]] — recipe-level details: 55 vol% Ni + 7 wt% nano-BT + 41 vol% terpineol + 4 vol% resin. Five axes: powder size, BT additive, refractory dopants, organic vehicle, anti-oxidation.
- [[cu-electrode-mlcc]] — Cu-electrode base-metal class (mostly Class I C0G); sintering window 900-960 °C with glass-aided BT/CZT dielectric; KYOCERA-AVX / Murata RF lineups; reoxidation step largely absent.

Updates:
- [[ni-batio3-cosintering-interface]] — added Cr-doping counter-measure as item 0 with explicit Polotai decoupling note (Cr suppresses interfacial alloy without changing shrinkage curve).

Bottom-line answer to user's question: in BME MLCC, the metal electrode affects shrinkage through **four largely independent levers**: (1) nano-BT additive content / size — Bordia-Scherer composite-sintering retardation, dominant lever for shifting Ni shrinkage onset; (2) refractory-metal dopants like Cr — interfacial chemistry only, no shrinkage effect; (3) Ni particle size — sets shrinkage onset T and additive sensitivity; (4) electrode/dielectric thickness ratio h_Ni/h_BT — geometric constraint. The metal electrode is **the structural source of lateral-vs-thickness shrinkage asymmetry** in the finished chip (suppresses lateral by ~4×, enhances thickness by ~2.5× per Hagymási analog data).

---

## [2026-05-20] query | Shrinkage shape-dependence of BaTiO₃ vs alumina

Question: "is shrinkage less related to material shape with batio3?" Filed as [[shrinkage-shape-dependence-batio3-vs-alumina]]. Key pages consulted: [[green-tape-shrinkage-anisotropy]], [[heunisch-2010-tape-cast-anisotropic-shrinkage]], [[hagymasi-ltcc-ferrite-dielectric-cofiring]], [[batio3-powder-synthesis]], [[constrained-sintering-mlcc]].

Answer: yes — BaTiO₃ is meaningfully less sensitive to powder-shape-driven shrinkage anisotropy than alumina under similar tape-casting conditions. The reason traces to BT synthesis (hydrothermal/oxalate produce equiaxed grains) and crystal habit, not sintering physics. The Heunisch K_xy = 1.9-12.7 alumina range does not transfer to BT — Raj 1999 measured BT anisotropy at ~1 under conditions that gave alumina K_xy ≫ 1. In a finished MLCC, the dominant anisotropy source is constrained sintering in the laminate (lateral suppressed 4×, thickness enhanced 2.5×, per Hagymási), not intrinsic green-tape powder anisotropy.

---

## [2026-05-20] ingest | Extended shrinkage coverage — SOVS, camber, zero-shrinkage LTCC

Per `/wiki ingest extend the understandings on shrinkage of mlcc. Do more web search and ingest`.

Three open-access sources downloaded and processed:
- Shi, Giuntini, van Dommelen, Geers, Remmers — *J. Eur. Ceram. Soc.* 43 (2023) 4939-4949 — open access (CC BY), 29 pp. Efficient FE implementation of SOVS for bilayers.
- Hagymási, Roosen, Karmazin, Dernovsek, Haas — SEE Electroceramics conf. (~2008), 8 pp. DuPont 951 + BaFe₁₂O₁₉ constrained sintering with quantitative free vs constrained shrinkage data.
- Lester (Sandia) — SAND2017-12933R, public-domain US government report, 6 pp. SOVS implicit-scheme verification.

Web-search snippets supplemented additional sources (Jean-Chang 1997 camber theory; Raj 1999 alumina anisotropic shrinkage; DuPont US 5,474,741 zero-shrink patent; HeraLock HL2000 technology). All paywalled to direct fetch — captured via search-snippet synthesis.

New wiki source pages (3):
- [[shi-2023-jecs-sovs-bilayer-modeling]] — full SOVS equations (`dε_i/dt = σ'/(2ηφ) + (trσ − 3P_L)/(18ηψ)·I`); φ(ρ)=ρ², ψ(ρ)=(2/3)ρ³/(1−ρ), P_L(ρ)=(3α/r_p)ρ²; bilayer warpage benchmarks; **CPU cost reduction 3 orders of magnitude** over legacy McHugh-Riedel.
- [[hagymasi-ltcc-ferrite-dielectric-cofiring]] — definitive source for the "12.8%→33.1% thickness redistribution" numbers. Green densities 72%/53% with organic content 11.4/18.0 wt%. Two-stage camber: BBO-driven (binder gradient) suppressed by 0.5 K/min ramp + sintering-driven (η-mismatch).
- [[lester-2017-sandia-sovs-verification]] — short Sandia memo confirming new implicit scheme resolves bilayer-bar warpage that legacy McHugh-Riedel required unrealistic meshes to capture.

New wiki concept pages (4):
- [[skorohod-olevsky-viscous-sintering]] — full constitutive equation, viscosity-function options (quadratic / Arrhenius / Aquilanti-Mundim), free vs constrained-shrinkage predictions, validated benchmarks, simulator-implementation recipe.
- [[cofiring-camber-bilayer]] — Jean-Chang formula `κ ∝ Δε̇·t·h₁h₂(h₁+h₂)/(h₁+h₂)³·f(η_ratio,h_ratio)`; two camber-generation stages (BBO + sintering); mitigation hierarchy.
- [[zero-shrinkage-ltcc]] — four approaches (sacrificial alumina tape, self-constrained windows, HeraLock HL2000, pressure-assisted); table comparing achievable lateral shrinkage (HeraLock 0.2%, sacrificial <0.5%, self-constrained 2-4%).
- [[green-density-vs-shrinkage]] — derives `s_linear = 1 − (ρ_g/ρ_f)^(1/3)` from mass conservation; populates the full ρ_g 0.45→0.80 table; validates against Hagymási numbers (DT 72% → 12.8% z-shrinkage measured matches 10% predicted + 2-3% drying/burnout).

Updates:
- [[constrained-sintering-mlcc]] — replaced unattributed "12.7/13.9/12.8 %" data with sourced Hagymási numbers; added SOVS thickness-amplification factor `1/(1−2ν_v)` derivation; added Jean-Chang camber cross-ref.
- [[green-tape-shrinkage-anisotropy]] — added Raj 1999 caveat that **BaTiO₃ does NOT show the anisotropy that alumina does** under similar casting conditions (BT powder is closer to equiaxed than platelet α-Al₂O₃); added Hagymási free→constrained numbers; added SOVS cross-ref.

Bottom-line synthesis of all shrinkage learnings now in the wiki:
- **Total green→fired linear shrinkage** ≈ drying (2-4%) + burnout (1-3%) + sintering (`1 − (ρ_g/ρ_f)^(1/3)`, 9-15% typical) ≈ **12-22%** for typical tapes.
- **Constrained sintering redistributes** that budget: in-plane suppressed by ~4×, thickness enhanced by ~2.5× (Hagymási). The volume integral is conserved.
- **Predictive modeling**: SOVS + FE (Shi 2023) gives chip-scale dimensional prediction with bilayer warpage at 4-8% error on a laptop.
- **Engineering levers** (ranked by leverage): green density (set by binder content + powder packing) → shrinkage matching of cofired layers (set by sintering-aid + electrode-paste BT-additive) → BBO ramp rate (suppresses binder-gradient camber) → lamination pressure → external constraint.

---

## [2026-05-20] ingest | Web search — MLCC/ceramic shrinkage + binder/metal ratio

Per `/wiki ingest web search for academic publications and text book for mlcc/ceramic shrinkage. Also look for relation between shrinkage and binder/metal ratio in green sheet`.

Web searches surfaced one full-text open-access source (TU Darmstadt PhD thesis by Z. Yan, the methodological foundation behind the existing [[epj-in-situ-xray-tomography-dem]] conference paper) and one paywalled paper that fetched cleanly via academia.edu (Heunisch, Dellert, Roosen JECS 2010 — particle shape dominates anisotropic shrinkage). Other top hits (Fu 2015 JACerS, Sugimura-Hirao 2009 J. Ceram. Soc. Jpn, Kang 2008 Ceram. Int., Co-firing behaviors 2016) were paywalled / 403-Forbidden on direct fetch — captured via search snippets and Yan-thesis cross-references.

New raw sources:
- `resources/literature/pdf/tu-darmstadt-mlcc-sintering-thesis.pdf` (Yan, 2013; 235 pp; CC-BY 4.0 via TUprints) + extracted `.md`.
- `resources/literature/heunisch-dellert-roosen-2010-anisotropic-shrinkage.md` (WebFetch summary of the JECS 2010 paper from academia.edu).

New wiki source pages (4):
- [[yan-thesis-2013-mlcc-sintering-nanotomography]] — full thesis behind the Grenoble + Argonne MLCC sintering imaging program. Quantitative dilatometry: Ni paste densifies 450–950 °C, BT 950–1150 °C (450 °C onset gap); 1206 chip linear shrinkage **~12% total**, of which 6–7% from 950→1150 °C ramp and 5–6% from 30-min hold at 1150 °C. DEM Ch. 6 quantifies BT-in-Ni inclusion retardation: at 20 vol% / 60 nm BT, retarding factor is **7×**.
- [[heunisch-2010-tape-cast-anisotropic-shrinkage]] — anisotropy factor K_xy = **1.9 (spherical) / 8.4 (standard) / 12.7 (platelet)** powders, all at d₅₀ ≈ 4 µm. Thickness shrinkage 6–11% vs in-plane 2.7–4%, depending on blade gap. Binder MW had only minor effect — powder shape dominates.
- [[mistler-twiname-tape-casting-textbook]] — bibliographic page for the standard ACerS/Wiley 2000 reference (chapter outline; not raw-ingested).
- [[rahaman-ceramic-processing-sintering-textbook]] — bibliographic page for the standard graduate sintering textbooks (constrained sintering Ch. 10/11; not raw-ingested).

New concept page:
- [[green-tape-shrinkage-anisotropy]] — synthesizes the three additive shrinkage stages (drying 2–4% / burnout 1–3% / sintering 6–12% linear) and splits the binder/metal-ratio question into two regimes: (1) dielectric tape — binder loading sets drying + burnout contributions, powder vol% sets sintering shrinkage, powder *shape* sets anisotropy; (2) Ni paste — binder/Ni ratio is a rheology knob, but the shrinkage knob is the nano-BT inclusion content (5–15 vol% well-dispersed 10–30 nm BT in industry pastes).

Updates to existing concept pages:
- [[ni-batio3-cosintering-interface]] — added the Yan DEM retardation-factor table (5 vol% / 60 nm → 1.5×; 20 vol% / 60 nm → **7×**) and replaced the qualitative "Ni shrinks 25–35%, BT shrinks 15–20%" paragraph with the quantitative onset table from Yan dilatometry.
- [[constrained-sintering-mlcc]] — added Bordia-Scherer linear bound `\dot ε_c / \dot ε_m,free = 1 − v_i` plus the Yan DEM-quantified retardation table; added the textbook reference pages to cross-refs.
- [[binder-burnout-debinding]] — added "Binder content vs shrinkage" section with the three-stage shrinkage budget (2–4% drying + 1–3% burnout + 6–12% sintering).
- [[sintering-profile-mlcc]] — added a "Shrinkage budget through the profile" table mapping linear shrinkage to each profile stage.

Key user-facing answer to the original question ("relation between shrinkage and binder/metal ratio in green sheet"):
1. **Dielectric tape (BaTiO₃):** binder loading mainly affects drying + burnout shrinkage (~3–7 % combined). Sintering shrinkage (~6–12 %) is set by green density (powder vol%) rather than binder. Powder **shape** — not binder MW — dominates shrinkage **anisotropy** (Heunisch K_xy: 1.9 spherical vs 12.7 platelet).
2. **Ni electrode paste:** the binder/Ni ratio is primarily a printing-rheology knob. The sintering-shrinkage engineering knob is the **nano-BT additive content** (Bordia-Scherer composite-sintering theory). Quantitatively (Yan DEM): a few vol% 60 nm BT gives ~1.5× retardation; 20 vol% 60 nm BT gives **7×**. Smaller and better-dispersed inclusions amplify the effect dramatically.

---

## [2026-05-20] update | Size-code default flipped to JIS metric

Reversed the resolver default per user direction ("Default to metric. No suffix means JIS. With warning of course"). Bare 4-digit input is now read as a **JIS metric** code, not EIA.

New resolver behavior:
- **No suffix → assumed JIS metric.** `2012` → EIA 0805 (workhorse, 2.0 × 1.25 mm). `1608` → EIA 0603. `0603` → EIA 0201 (with warning, since `0603i` is also a real EIA size).
- **`Xi` suffix → explicit EIA** (`0805i` → 2.0 × 1.25 mm, `0603i` → 1.6 × 0.8 mm).
- **`Xm` suffix → explicit metric** (redundant with bare but unambiguous).
- **Warning** fires on bare collision-prone codes (`0201`, `0402`, `0603`) where both EIA and metric readings exist with different physical sizes.
- **Rejects** bare codes that only have an EIA reading (`0805`, `1206`, `1210`, `1812`, `2220`) with a helpful hint pointing at `Xi` or the metric equivalent — under the new default, bare `0805` is *not* a standard JIS metric size, so silently falling back to EIA would defeat the convention.

Updates:
- [[case-size-geometry]] — "Recommended disambiguation" table rewritten to reflect JIS-metric default; added ERROR rows for `0805` / `1206` to make the strictness explicit.
- [[samsung-cl-series]] — disambiguation paragraph rewritten; explains that the SEMCO 2-digit field is consumed from whichever resolved EIA equivalent the user input maps to.

Rationale: JIS metric is the global engineering standard outside the US, and the bare "0805" / "0603" notation is the most common source of cross-team confusion. Defaulting to metric pushes ambiguous bare codes into either an explicit warning (for the `0201`/`0402`/`0603` triple, where both readings exist) or an outright error (for the larger EIA-only codes). This is stricter than the previous EIA default — by design.

---

## [2026-05-20] update | Size-code i/m disambiguation convention

Documented the EIA-vs-metric size-code collision and the `i`/`m` suffix disambiguation convention used by the MLCC simulator's size resolver.

Updates:
- [[case-size-geometry]] — added "naming-convention pitfall" section with collision table (digits `0201`/`0402`/`0603`/`0805`/`1206` have 6–31× volume mismatch between EIA and metric readings). Added "Recommended disambiguation" section with `i` / `m` suffix rules. Added SEMCO 2-digit internal code table (separately from EIA/metric — independent index).
- [[samsung-cl-series]] — extended size-code table with metric column; added cross-reference to disambiguation convention.

Rationale: the bare `0603` notation is ambiguous (EIA = 1.6 × 0.8 mm workhorse vs metric = 0.6 × 0.3 mm ultra-tiny), and BOMs / engineering tools without disambiguation have caused real production mix-ups. The simulator's resolver now accepts `0603` (assumed EIA, with warning), `0603i` (explicit EIA), or `0603m` (explicit metric) — and the wiki documents the convention for future engineers.

---

## [2026-05-20] ingest | Sintering/firing publications — 2 concept pages + 1 source

Per `/wiki ingest` directive to add more sintering/firing research papers and publications. Most Wiley / ScienceDirect papers were paywalled but one open-access EPJ Web of Conferences paper covers both DEM simulation and synchrotron nano-CT of MLCC sintering — the methodological foundation for the bigger 2021 Acta Mater paper.

New raw source:
- Yan, Martin, Bouvard et al. (EPJ Web Conf. 140, 13006, 2017) — open access (CC-BY 4.0). Couples in-situ X-ray tomography with DEM simulation; demonstrates on Cu powder (ESRF) and Ni-BaTiO₃ MLCC (Argonne nano-CT). Quantitative Parhami-McMeeking contact force model.

New wiki concept pages (2):
- [[master-sintering-curve]] — Su-Johnson MSC framework (*JACerS* 1996) built on Hansen et al. combined-stage model. Density-independent normalized curve via `Θ = ∫(1/T)·exp(-Q/RT)dt`. Activation energies for BaTiO₃ from Lee *et al.* 2026: 350–500 kJ/mol below 1200 °C, breaks down above 1200 °C as final-stage mechanism transitions. Limitations + Reed-Hill 2017 critique.
- [[binder-burnout-debinding]] — first firing step (200–600 °C). PVB / PMMA / PVA polymer chemistry; zero/first-order Arrhenius kinetics (Eₐ ≈ 150–250 kJ/mol for PVB); diffusion-limited gas evolution; Ar + 1 vol % O₂ atmosphere as BME-compatible compromise (74% binder removal, ~1600 ppm O on Ni). BBO defect-mode catalog: bloating, parallel-plate crack, delamination, residual carbon, NiO scale. References 2024 *Appl. Thermal Eng.* CFD paper.

New wiki source page:
- [[epj-in-situ-xray-tomography-dem]] — Grenoble + ESRF + Argonne + Jülich collaboration's open-access methodological paper. Companion to the Okuma 2021 *Acta Mater.* MLCC nano-CT paper.

Key insights: (1) Master Sintering Curve is the industrial benchmark methodology but **breaks down above ~1200 °C** for BaTiO₃ — exactly where industrial MLCC sintering happens; (2) **binder burnout** is the most under-credited firing-stage failure source — many defects that look like sintering problems trace back to BBO atmosphere or rate choices; (3) Ni-BaTiO₃ MLCC discontinuity is set **early in sintering** by initial powder packing heterogeneity, not just the peak-T mechanism — DEM + synchrotron nano-CT confirm this.

Updated `wiki/index.md` (2 new concept entries + 1 new source). 0 broken wikilinks (verified).

Wiki: **112 pages** across 6 categories.

---

## [2026-05-20] lint | Wiki health check + frontmatter cleanup

Scan summary:
- 0 broken wikilinks (verified)
- 0 orphan pages (every non-index/log/overview page has at least one inbound wikilink)
- 0 unresolved contradictions
- 0 index inconsistencies (every page indexed; no dangling index references)
- 0 entity classification tag violations (every `type: entity` page carries exactly one of `company | series | material | standard | person | org`)
- 56 pages were missing `status:` and `importance:` frontmatter fields

Auto-fix applied (option 2 — fix + audit):
- Added `status: complete` to all 56 pages that needed it.
- Added `importance: high` to **24 simulator-core pages**: mlcc-capacitance-equation, eia-rs-198-dielectric-classes, dielectric-class-comparison, dc-bias-derating, aging-class-2, bme-reliability-model, case-size-geometry, esr-esl-srf, core-shell-batio3, x7r-dielectric, c0g-npo-dielectric, mlcc-manufacturing-process, bme-sintering-atmosphere, failure-modes-mlcc, dc-bias-aging, curie-temperature, temperature-coefficient-of-capacitance, vendor-spice-models, decoupling-design-rules, heywang-jonker-model, oxygen-vacancy-migration, bme-vs-pme, permittivity, insulation-resistance.
- Added `importance: medium` to the remaining 32 pages (supporting concepts).

Final distribution: **52 importance:high**, **51 importance:medium**, **3 importance:low**, **101 status:complete**, **5 status:draft** (intentional entity stubs: nanbo3, srtio3, intel, rohm, tdk).

Tag hygiene unchanged: 84 `paper` tags, 10 `company`, 5 `series`, 4 `material`, 2 `org`, 1 `person`. All within Tag Policy bounds.

Suggestions logged (not auto-fixed):
- 5 entity stubs (`nanbo3`, `srtio3`, `intel`, `rohm`, `tdk`) could be expanded with more research.
- 23 concept pages have ≤ 1 `sources:` frontmatter entry while having multiple references in the body — could be polished by lifting body references into frontmatter.
- Some "Murata"/"KEMET" mentions inside markdown URL captions (e.g., `[Murata WO...](url)`) appear as unlinked entity references to the lint scan. Most are intentional citation captions.

---

## [2026-05-20] ingest | Final-pass gap-filling — all remaining suggestions

Per `/wiki ingest` directive to continue with the remaining gap-filling suggestions surfaced in the previous query.

New raw sources:
- AEC-Q104 Rev A (Nov 28, 2025) — official AEC MCM qualification standard
- Sci. Rep. 9953 (2015) "Unfolding grain size effects in BaTiO₃ ferroelectric ceramics" — open-access cross-method survey

New wiki concept pages (5):
- [[murata-spice-library-and-curves]] (**High priority**) — practical bridge: SPICE netlist structure example + digitized DC-bias / TCC / aging tables from the public Murata GRM Series Data PDF. Concrete values for C0G/X7R/Y5V at 50 V; SRF lookup by case+value+class.
- [[kemet-k-sim-tool]] (**Medium**) — KEMET / Yageo K-SIM characterization tool. Broader cap-type coverage than SimSurfing (ceramic + tantalum + polymer + film + Al-electrolytic). Built-in lifetime model `L = L_rated · (V_r/V)^n · 2^((T_r-T)/10)` for non-ceramic.
- [[s-parameter-de-embedding-mlcc]] (**Medium**) — TRL / OST / series-pair de-embedding methodology. Quantitative ESL hierarchy: 0.05–0.1 nH (LICC) to 1.0–2.5 nH (1206 standard mount). Mounting-loop ESL dominates chip ESL for cases ≤ 1206.
- [[nano-grain-batio3-epsilon-r]] (**Low**) — quantitative εr vs grain size in the 5 µm → 10 nm range. εr peak at 0.8–1.1 µm (~5000–6000), drops below 1000 at 50 nm, c/a → 1.000 at 100 nm. Critical size for ferroelectric collapse: 10–30 nm. Dead-layer model.

New wiki source pages (2):
- [[srep-batio3-grain-size-unfolding]] — Sci. Rep. 2015 cross-method study.
- [[aec-q104-rev-a-2025]] — AEC-Q104 framework for MCM-embedded MLCCs (30×3 lot sample sizes; "H" category MCM-specific tests; VISM thermal-shock migration).

Key insights: (1) Murata static SPICE = simple R-L-C-R series (typical 10µF/10V/X7R/0805: 9.85µF + 8.5mΩ ESR + 0.43nH ESL + 1.2GΩ IR); dynamic adds behavioral current source for V_DC + T; (2) K-SIM has lifetime model for non-ceramic, defers to AEC-Q200 for MLCC; (3) mounting-loop ESL **dominates** chip ESL for cases ≤ 1206; (4) εr falls below 1000 at 50 nm grain — quantitative reason for thin-layer scaling ceiling; (5) AEC-Q104 matters when MLCCs embedded in automotive power modules.

Updated `wiki/index.md` (5 new app-layer concept entries + 2 new source entries). 0 broken wikilinks (verified).

Wiki now: **114 pages** across 6 categories. The v0–v0.3 simulator-model.md gaps are essentially all documented.

---

## [2026-05-20] ingest | P0–P3 gap-filling per senior-engineer priority

Per `/wiki ingest` directive to research and ingest gap-fillers prioritized as a senior MLCC engineer would: vendor sim-tool docs (P0), application-layer design rules (P1), PCB layout (P2), and underserved Tier-1 vendor coverage (P3).

New raw source:
- Taiyo Yuden MLCC Whitepaper (mid-2010s flagship) — documents 100–470 µF commercialization, MTTF 10⁴–10⁶ yr claims, acoustic-noise-suppression dielectric, soft-termination, full product family naming.

New wiki concept pages:
- [[vendor-spice-models]] (**P0**) — Murata SimSurfing, K-SIM, SpiCap, SEAT-MLCC, myCAP. Static R-L-C vs dynamic (R-L-C + behavioral current source for V_DC + T) models. How a simulator should consume them: direct SPICE bridge / parameter extraction / Touchstone. Lists what vendor models do NOT capture (aging, reliability, mechanical) — i.e., what our simulator must add.
- [[decoupling-design-rules]] (**P1**) — PDN target impedance Z_target = ΔV_max / I_max; "myth of three capacitor values" debunked (modern MLCC ESL is geometry-not-value); same-value parallel approach; anti-resonance ESR damping `ESR_req ≥ √(L_1/C_2)`; mounting-via inductance dominance; Bandini Mountain on-die resonance.
- [[mlcc-pcb-layout-rules]] (**P2**) — IPC-7351 pad geometry (Levels A/B/C); anti-tombstoning rules (symmetric pads, identical thermal mass); flex-zone exclusion (no MLCCs >0805 within 5 mm of cutouts/screws); soft-termination decision rules; JEDEC J-STD-020E reflow profile; MSL bake-out. Concrete pad-dimension table for 0402–2220.

New wiki source page:
- [[taiyo-yuden-mlcc-whitepaper]] — quantitative anchors for TY's 100–470 µF MLCC technology; product family naming (PMK/AMK/JMK/LMK/EMK/GMK/TMK/HMK); soft-termination + acoustic-noise-suppression details.

Updated entity pages:
- [[taiyo-yuden]] — promoted from stub to complete with full product family table, milestones (330 µF in 2013, 470 µF in 2014, 1200+ layers in 1812), differentiated technologies.
- [[yageo]] — promoted from stub to complete with full automotive product portfolio (AC, AS, AQ, AC Array, AC HiCap, AC HiTemp), KEMET-brand continuation, AEC-Q200 sub-committee role, quality framework details.

Notable findings: (1) **Murata's dynamic SPICE model** is unique — static R-L-C plus behavioral current source for runtime adjustment to V_DC and T; reproduces measured DC/DC ripple "very nearly identical to measured"; (2) the **"3-capacitor-value rule" is obsolete** for MLCC because ESL doesn't scale with capacitance value in modern parts (mounting geometry dominates); same-value paralleled banks avoid anti-resonance; (3) **Taiyo Yuden documented MTTF 10⁴–10⁶ years** for premium high-CV parts — consistent with the Liu reliability framework at the high-quality end; (4) Yageo's AC/AS/AQ series structure exposes a useful boardflex / RF / general decomposition pattern.

Updated `wiki/index.md` (new "Application-layer design rules" section + new source entry). 0 broken wikilinks (verified).

Wiki now has **107 pages** across 6 categories.

---

## [2026-05-20] ingest | Full TCC family — comparison table + per-class deep dives

Per `/wiki ingest` directive to expand temperature characteristics beyond X7R to all ranges and investigate TCC.

New wiki comparison page:
- [[dielectric-class-comparison]] — master reference table covering every commercially significant TCC code:
  - **Class I**: C0G/NP0 (±30 ppm/°C), P2H (−150), R2H (−220), S2H (−330), T2H (−470), U2J (−750), S2L, X8G (high-T Class I)
  - **Class II**: X5R, X6S, X7R, X7S, X7T, X7U, X7P, X8R, X8L, X0U (175 °C, new), X9R (200 °C research), X9V (Vishay HOTcap 200 °C)
  - **Class III**: Y5V, Z5U (high-K legacy)
  - **Mil hi-rel**: BP, BX, BR (MIL-C-55681)
  - With εr ranges, max ΔC, aging %/decade, DF max, material basis, and application notes.

New per-class concept deep-dive pages:
- [[c0g-npo-dielectric]] — Class I ultra-stable; CaZrO₃ BME (εr ≈ 31) or BaNd-titanate PME (εr ≈ 70); only "textbook ideal" cap. Extended-range Class I (P2H to U2J) gets εr up to ~500 with linear negative TCC for temperature-compensation use.
- [[x7r-dielectric]] — Class II workhorse; BaTiO₃ core-shell with Sr/Zr Curie-shifting; X7R/X7S/X7T/X7U cousin tradeoffs (more εr for relaxed tolerance); 1–2 %/decade aging spec.
- [[x5r-dielectric]] — Class II consumer-dominant; chemistry essentially same as X7R but less doped → higher peak εr, less stable, ~5 %/decade aging.
- [[x8r-x8l-x9r-high-temperature-dielectrics]] — above-125 °C: X8R (±15 % to 150 °C), X8L (asymmetric drift, automotive standard), X8G (Class I, rare), X9R (200 °C research), X0U (new 175 °C automotive), X9V (Vishay HOTcap 200 °C with +22/−82 %). Chemistry: Sr/Zr/Bi shift, NaNbO₃/BiMg-titanate solid solutions to broaden Curie peak.
- [[y5v-z5u-class-iii-dielectric]] — Class III; +22/−82 % Y5V, +22/−56 % Z5U; aging 5–7 %/decade; combined operating-point CV can fall to 5–10 % of nameplate; **being phased out** by modern X5R.

Key insights: (1) the X7-family proliferation (R/S/T/U/P) is a single εr-vs-tolerance tradeoff axis at the same −55…+125 °C range; (2) high-T extensions (X8R etc.) work by **flattening the Curie peak** rather than shifting it past T_max — the cost is lower peak εr; (3) **X0U is the newest 2024-era automotive code** for 175 °C operation with asymmetric tolerance allowed above 125 °C; (4) Y5V is being deprecated industry-wide as X5R catches up on εr.

Updated `wiki/index.md` with new "Dielectric class deep-dives" section and the first entry in the previously-empty Comparisons category.

---

## [2026-05-20] ingest | Core-shell structure deep-dive — chemistry, kinetics, coating, electrical link

Per `/wiki ingest` directive to search for core-shell structure and its relation to characteristics, MLCC process (especially material stage and firing).

New raw source:
- arXiv:1111.3738 (Nuzhnyy et al. 2011) "High-Frequency Dielectric Spectroscopy of BaTiO₃ Core–Silica Shell Nanocomposites: Problem of Interdiffusion" — three sintering routes (standard, SPS, two-step) on the same BaTiO₃@SiO₂ powder; THz dielectric dispersion correlates with interdiffusion gradient layer thickness.

New wiki concept pages:
- [[dopant-site-occupancy-batio3]] — A-site (donor) vs B-site (acceptor) substitution; ionic-radius hierarchy (La 1.36 → Yb 1.12 Å); amphoteric window for Dy/Y/Ho/Er at ~1.16 Å gives the modern co-doping playbook.
- [[core-shell-formation-mechanism]] — solid-state diffusion vs dissolution-reprecipitation debate. Modern consensus (Jeon JACerS 2012, Chen JACerS 2020): dissolution-reprecipitation dominates at high dopant loadings, with a narrow kinetic window that must be hit by sintering recipe.
- [[dopant-powder-coating]] — material-stage preparation: dry mechanical mixing (legacy) vs wet-chemical surface modification (modern standard) vs co-precipitation (no shell) vs ALD (research). Coating method matters more than total dopant content for shell uniformity.

Updated existing page:
- [[core-shell-batio3]] — substantially expanded with quantitative shell thickness (10–50 nm), rare-earth concentration in shell (~3–10 mol%), Mg/RE molar ratio (0.5–2), and a detailed table linking shell properties to each electrical characteristic (εr(T) flattening, DC-bias stability, IR/MTTF, aging, DF).

New wiki source page:
- [[arxiv-batio3-silica-interdiffusion]] — quantitative process anchors for three sintering routes; fresnoite formation in TSS; THz spectroscopy probes interdiffusion gradient layer.

Key insights: (1) **amphoteric rare-earth window** (Dy/Y/Ho/Er, ionic radius ~1.16 Å) is the chemistry sweet spot — same dopant produces donor + acceptor populations in a tuned ratio for automatic carrier compensation; (2) **core-shell forms by dissolution-reprecipitation**, not Fickian diffusion — sintering recipe matters far more than just hold time; (3) **dopant coating method** is one of the biggest Tier-1 vs Tier-2 differentiators (wet-chemical 3–10 nm coating vs dry-mixed bulk dopant); (4) the same nominal "X7R 10 µF" can have wildly different DC-bias / aging behavior depending on shell quality — explains the [[vishay-x7r-cap-drift-dc-bias|3-vendor benchmark]] variation.

Updated `wiki/index.md` (3 new concept entries + 1 new source).

---

## [2026-05-20] ingest | MLCC sintering process — 5 new concept pages, 2 new source pages

Per `/wiki ingest` directive to search for MLCC process material, especially sintering. Targeted gaps not covered in the earlier sintering-physics pass: industrial process recipes, alternative methods, equipment-aware modeling.

New wiki concept pages:
- [[sintering-profile-mlcc]] — multi-stage profile (binder burnout → pre-sinter → fast ramp → peak hold → cooldown → re-oxidation), heating-rate effect on Ni electrode continuity (Polotai JACerS 2007 study: 200–3000 °C/h sweep, 1250 °C / 60 °C/min optimum).
- [[two-step-sintering]] — Chen-Wang TSS-CW method: ramp to 1300 °C for partial density, drop to 1100 °C and hold; achieves 96 % density at 35 nm grain in BaTiO₃ (vs 1–5 µm grain conventional).
- [[constrained-sintering-mlcc]] — in-plane shrinkage suppressed by electrode constraint, thickness absorbs slack; LTCC-style 12.7 / 13.9 / 12.8 % anisotropy. Camber/warpage from sintering-kinetics mismatch.
- [[spark-plasma-sintering]] — SPS / FAST; 99 % density in minutes; εr ≈ 3500 (vs 2000 conventional) due to GB defect reduction.
- [[cold-sintering]] — Randall group's <300 °C process with transient liquid phase; cold-sintered BaTiO₃ at 90–95 % density.

New wiki source pages:
- [[cold-sintering-annual-review-mse]] — Guo, Randall et al. *Annu. Rev. Mater. Res.* 2019.
- [[llnl-particle-rigid-body-sintering]] — LLNL paper on rigid-body particle rearrangement.

Key insights: (1) heating rate is the dominant industrial knob — 60 °C/min through the 1000–1100 °C interfacial-liquid window optimizes Ni-electrode continuity; (2) two-step sintering (Chen-Wang) is the foundation of fine-grain BaTiO₃; (3) constrained sintering creates anisotropic shrinkage in the multilayer stack and residual stress that superposes with the cooldown phase transition; (4) SPS / cold sintering are research frontier but not yet competitive for production MLCC.

Updated `wiki/index.md` (5 new concepts + 2 new sources).

---

## [2026-05-20] lint | Wiki health check — promote primitives, fix broken links

Per `/wiki lint` directive to investigate need for more primitive concepts/entities.

**Scan results (before fix):**
- 11 truly broken wikilinks identified after sort-order correction (LC_ALL=C):
  - Primitive concepts missing: `curie-temperature`, `temperature-coefficient-of-capacitance`, `heywang-jonker-model`, `termination-and-plating`
  - Entities missing: `tdk-cga-series`, `intel`
  - Typos/aliases: `cazro3-dielectric` → `cazro3`, `c0g-dielectric` (drop)
  - Web-only refs treated as wikilinks: `adv-mater-2026-grain-boundary`, `knowles-fundamentals-8`, `passive-components-eu-mlcc-loss`, `btu-international`

**Auto-fix applied — Created 12 new primitive pages:**
- Concepts: [[curie-temperature]], [[temperature-coefficient-of-capacitance]], [[heywang-jonker-model]], [[termination-and-plating]], [[perovskite-structure]], [[permittivity]], [[polarization-mechanisms]], [[dissipation-factor]], [[dielectric-breakdown]], [[insulation-resistance]], [[prokopowicz-vaskas-equation]], [[weibull-distribution]]
- Entities: [[tdk-cga-series]], [[intel]]

**Broken-link cleanup:**
- `cazro3-dielectric` → `cazro3` (all occurrences in oxygen-vacancy-migration and escies-bme-mlcc-high-reliability)
- `c0g-dielectric` → drop the broken alias, inline-link `cazro3` instead (in eia-rs-198-dielectric-classes and batio3)
- `adv-mater-2026-grain-boundary` → replace with full citation + DOI link (in core-shell-batio3 and batio3)
- `knowles-fundamentals-8` → replace with markdown link to the Knowles blog post (in eia-rs-198-dielectric-classes)
- `passive-components-eu-mlcc-loss` → redirect to existing [[epci-high-cv-mlcc-bias-aging]] page (in dc-bias-derating)
- `btu-international` → plain-text reference to BTU International OEM (in bme-sintering-atmosphere)

**Re-scan after fix:** 0 broken wikilinks remaining.

Updated `wiki/index.md` with new "Primitives (foundational concepts)" section + new entities.

---

## [2026-05-19] ingest | Sintering-physics pass — 5 new sources, 6 new concept pages

Directive: research the physics of dielectric material during the sintering process. Targeted five sub-topics — mass transport, grain growth, defect chemistry, Ni co-sintering, phase transition.

New raw sources (in `resources/literature/`):
- [[epfl-ceramics-sintering-microstructure]] — EPFL TP3 lab guide. The clean teaching reference for solid-state sintering physics: 4 mass-transport mechanisms, Q_surf < Q_GB < Q_volume activation energy hierarchy (α-Al₂O₃ 399/464/616 kJ/mol, ZnO 158/282/376), Young-Laplace curvature driving force, dilatometry protocol.
- [[arxiv-electron-localization-cation-diffusion]] — Yu et al. arXiv:1808.05198. DFT explanation for why reducing atmosphere accelerates BaTiO₃ grain growth: Ti⁴⁺ → Ti³⁺ + electron localization lowers cation migration barrier 30–50 %.
- [[arxiv-batio3-cubic-to-tetragonal-md]] — arXiv:1010.6147. First-principles MD of the T_C transition; soft-phonon precursor region above T_C explains εr peak.
- LLNL particle rigid-body motion in sintering, Cold sintering Annual Review (in resources/literature/, source pages pending).

New wiki concept pages (the deliverable):
- [[sintering-kinetics-batio3]] — Mass-transport framework + BaTiO₃-specific activation energies (Q ≈ 119–172 kJ/mol for grain growth).
- [[grain-growth-dopant-pinning]] — Normal vs abnormal grain growth; solute drag, Zener pinning; lanthanide-donor vs acceptor-cation grain-growth behaviors; the Y+Mg co-doping consensus.
- [[defect-chemistry-batio3]] — Kröger-Vink notation, O₂ ⇌ V_O + 2e' equilibrium, Ti³⁺/Ti⁴⁺ redox, donor/acceptor compensation strategies. The chemistry layer under the BME atmosphere recipe.
- [[ni-batio3-cosintering-interface]] — The interfacial (Ni, Ba, Ti) liquid alloy at 1000–1100 °C that drives electrode discontinuity; NiO 0.13 wt% solubility limit in BaTiO₃ pins GBs.
- [[cubic-tetragonal-transition]] — Cooldown through T_C; 90° twin domains relieve stress in coarse grain; **fine grains lack room for 90° twins → εr collapses below ~200 nm** (structural origin of the grain-size cliff).
- [[sintering-aids-glass]] — BaO-B₂O₃-SiO₂ / ZnO-B₂O₃-SiO₂ glass aids; reduce BaTiO₃ sintering T from 1300 °C to 900 °C; essential for BME Cu C0G firing below Cu melting point.

New wiki source pages: 3 ([[epfl-ceramics-sintering-microstructure]], [[arxiv-electron-localization-cation-diffusion]], [[arxiv-batio3-cubic-to-tetragonal-md]]).

Updated `resources/design-rules/simulator-model.md` §9 (sintering physics anchors), §10 (source registry extended). Updated `wiki/index.md` (new concept and source entries).

Key insights: (1) the entire "core-shell + dopant" engineering effort is downstream of one defect-chemistry fact — Ti³⁺/Ti⁴⁺ equilibrium under reducing atmosphere creates V_O and accelerates cation diffusion; (2) the εr-vs-grain-size cliff at ~200 nm has a clean structural cause (no room for 90° twins to relieve cooldown stress); (3) Ni electrode discontinuity in thin-layer BME isn't a tape/printing defect — it's a Rayleigh-Plateau instability driven by a thin liquid (Ni, Ba, Ti) alloy that forms at 1000–1100 °C.

---

## [2026-05-19] ingest | Deep-research pass — materials, physics, processes (12+ new sources)

Directive: do a comprehensive web search across MLCC materials, physical behavior, and processes (academic papers + product spec sheets + manufacturer/association technical reports). Eleven major documents collected and ingested. Focus on closing the §9 gaps in `simulator-model.md`.

New raw sources in `resources/literature/` and `resources/market/`:
- [[escies-bme-mlcc-high-reliability]] — Gurav et al. (KEMET, ESA ESCIES archive). BME C0G (CaZrO₃) vs PME C0G (BaNd-titanate); 13× HALT MTTF improvement. **Source for CaZrO₃ Class I BME data.**
- [[nasa-ir-degradation-ni-batio3-2015]] — Liu (IEEE TCPMT 2015). Schottky double-depletion / Heywang-Jonker mechanism for IR degradation; 3 commercial BME 0.47 µF / 50 V / 0805 parts cross-compared with explicit layer counts (98–103), thicknesses (5.8–8.1 µm), grain sizes (0.33–0.40 µm).
- [[nasa-time-dependent-ir-2013-prb]] — Liu (PRB manuscript 2013). Derives exponential leakage law `I(t) = I₀·exp((t-t₀)/τ_SD)`, exponential barrier collapse `φ(t) = φ(0)·exp(-2Kt)`, K Arrhenius with **E_k ≈ 1.6 eV (commercial BME) vs 2.8 eV (automotive BME)** — direct quantitative anchors for the simulator slow-degradation branch.
- [[nasa-cracking-low-voltage-mlcc]] — Teverovsky (NASA NEPP 2018). 200+ pages encyclopedic cracking + qualification + processes survey.
- [[arxiv-batio3-domain-wall-motion]] — Gurung et al. (UConn / arXiv 2024). Landau-Ginzburg domain wall dielectric response in BaTiO₃; DW contribution ~2 orders of magnitude > intrinsic; DW relaxation 10 GHz vs intrinsic 500 GHz.
- [[octopart-tdk-cga8l3c0g-product-guide]] — TDK 2012 full MLCC product line-up, 62 pages (via Octopart). Closes the TDK side of the case-size geometry table.
- Murata SimSurfing documents (overview + measurement conditions) → `resources/market/murata-simsurfing-*.md`.
- IEC 60384-9-1:2005 standard preview (Class II ceramic capacitor blank detail spec) — `resources/design-rules/iec-60384-9-1-2005-sample.md`.
- ESCIES BME reliability evaluation for space + Wuerth (Zednicek) 2025 capacitor degradation paper.
- KEMET C1100 CAS-SMD automotive datasheet (`resources/market/kemet-c1100-cas-smd.md`).
- TDK MLCC temperature characteristics application guide (`resources/market/tdk-mlcc-temperature-characteristics-guide.md`).

New wiki concept pages:
- [[oxygen-vacancy-migration]] — IR-degradation root mechanism.
- [[ferroelectric-domain-wall]] — DW physics (the seat of MLCC εr).
- [[mlcc-manufacturing-process]] — End-to-end process map.
- [[bme-sintering-atmosphere]] — Reducing atmosphere + PO₂ window (10⁻¹⁰ to 10⁻¹² atm at peak sinter).
- [[re-oxidation-anneal]] — Post-sinter O-vacancy refill.
- [[batio3-powder-synthesis]] — Hydrothermal / solid-state / oxalate / sol-gel routes.

New wiki entity pages:
- Materials: [[cazro3]], [[srtio3]], [[nanbo3]].
- Series: [[bme-c0g]].

New wiki source pages: 6 (one per major new document).

Updated `resources/design-rules/simulator-model.md` §9 (more gaps closed: CaZrO₃ Class I path, BME E_k 1.6/2.8 eV from Liu PRB, BaTiO₃ powder hierarchy, DW physics, atmosphere recipe), §10 (source registry extended), and `wiki/index.md` (new materials/series/concepts/sources sections).

Key insights: (1) the v0 simulator can now handle Class I (CaZrO₃) separately with `f_VCC ≈ f_AC ≈ f_age ≈ 1, f_T = TCC·(T-25)`; (2) **vendor identity matters** — automotive BME runs E_k ~2.8 eV vs commercial 1.6 eV, an order of magnitude difference in degradation rate at 165 °C; (3) the entire MLCC εr observed at MHz is **DW contribution** — once DWs are pinned (by DC bias), εr drops to the intra-domain intrinsic value, which is ~2 orders of magnitude smaller. This is the mechanistic origin of the sigmoid VCC curve.

---

## [2026-05-19] ingest | Gap-filling pass — 5 new sources

Directive: comprehensive web search to fill the open gaps documented in `resources/design-rules/simulator-model.md` §9. Five new authoritative documents collected and ingested:

- [[aec-q200-rev-e-2023]] — official Automotive Electronics Council Q200 Rev E (March 2023) ceramic-capacitor stress qualification table. Closes Gap 6.
- [[electrical-integrity-dce11-200]] — Novak et al. (Oracle, DesignCon East 2011) measured DC/AC bias dependence across 5 vendors. Closes Gap 1 with quantitative VCC anchors.
- [[epci-high-cv-mlcc-bias-aging]] — Zednicek (EPCI / PCNS 2019) packaged multiplicative-factor formula `C_actual = C · F_DCV · F_ACV · F_T · F_age`. Reinforces Gap 1.
- [[nasa-general-reliability-model-ni-batio3]] — Liu (NASA Goddard / CARTS 2014) — direct evidence of BME single-mode P-V over-prediction (6.6× at one sample), with fitted **n = 4.524**, **E_a = 2.60 eV**. Closes Gap 3.
- [[rohm-ceramic-cap-app-note]] — ROHM AN 62AN089E (Jan 2020) DC-V comparisons across case size, thickness, and rated voltage on 10 µF B-char parts. Reinforces Gap 1.

New entity pages: [[aec-council]], [[yageo]] (draft), [[rohm]] (draft).
Updated: [[index]], [[log]], `resources/design-rules/simulator-model.md` §9 (gaps marked closed/partial with new data inline) and §10 (source registry extended).

Gaps closed: 1 (VCC fit), 3 (BME n), 4 (εr vs grain size — quantitative anchors), 5 (TDK case-size dimensions), 6 (AEC-Q200).
Gaps still open: 2 (frequency-dependent εr(T) digitized curves for X7R), partial 5 (Murata + Taiyo Yuden thickness option tables — vendor PDFs still blocked by anti-bot).

Key new insight: the single most authoritative quantitative anchor for BME-MLCC reliability — Liu's measured n = 4.524 for sample C08X47516 — is the public reference value the simulator should use for **single-mode** BME P-V approximations, while still recommending the two-mode model for accurate lifetime prediction.

---

## [2026-05-19] ingest | Batch: 8 sources + simulator spec

Goal: collect enough MLCC knowledge to design a simulator predicting electrical/reliability behavior from material, sheet thickness, layer count, overlap area, chip size.

Web research collected 8 foundational documents into `resources/{design-rules, literature, market}/` (raw PDFs in `<topic>/pdf/`, pdftotext-extracted `.md` alongside):
- KEMET/PSMA 2019 "MLCCs Design and Characteristics" → [[kemet-mlcc-design-and-characteristics]]
- KEMET/PSMA 2017 "Ceramic Capacitor Basics" → [[psma-ceramic-capacitor-basics]]
- Vishay 2021 "Time-Dependent Capacitance Drift of X7R MLCCs" → [[vishay-x7r-cap-drift-dc-bias]]
- KYOCERA AVX 1997 "Effects of ESR and ESL" → [[kyocera-avx-esr-esl-decoupling]]
- Murata GRM Series Data (TCC, DC bias, AC bias, aging, impedance) → [[murata-grm-series-tcc-data]]
- Samsung CL Series datasheet → [[samsung-cl-series-mlcc-ds]]
- NASA NEPP 2013 BME reliability → [[nasa-nepp-bme-mlcc-reliability]]
- NASA CARTS 2012 BaTiO₃ failure mechanisms → [[nasa-batio3-mlcc-failure-mechanisms]]

Synthesis deliverable: [`resources/design-rules/simulator-model.md`](../resources/design-rules/simulator-model.md) — full input/output/equation specification for the MLCC design simulator, with a worked example reproducing published 0805 X7R 10 µF / 6.3 V vendor envelopes.

Pages created (this batch):
- Concepts: [[mlcc-capacitance-equation]], [[eia-rs-198-dielectric-classes]], [[dc-bias-derating]], [[aging-class-2]], [[bme-reliability-model]], [[case-size-geometry]], [[bme-vs-pme]], [[esr-esl-srf]], [[failure-modes-mlcc]], [[core-shell-batio3]].
- Sources: 8 source-summary pages (one per document above).
- Entities — companies: [[murata]], [[samsung-electro-mechanics]], [[kemet]], [[vishay]], [[kyocera-avx]], [[tdk]] (draft), [[taiyo-yuden]] (draft).
- Entities — series: [[murata-grm-series]], [[samsung-cl-series]], [[kemet-arcshield]].
- Entities — material/person/org: [[batio3]], [[donhang-liu]], [[nasa-nepp]].
- Index + overview updated.

Key takeaways: (1) field `E = V/d`, not voltage, is the right driver for all Class-II non-idealities; (2) the N-amplifier `(per-layer reliability)^N` makes thin-layer high-N parts only viable with tightly controlled defect density and engineered grain microstructure; (3) [[murata]] (Tb/Dy/Re patents) and [[samsung-electro-mechanics]] (Tb-Dy molar ratio patents) are still patenting dopant ratios in 2024–2025, indicating live competition on dielectric chemistry.

Contradictions: none; sources align on the framework but disagree on quantitative DC-bias-aging rates by vendor (Vishay PME at ~5 %/decade vs BME competitors at 7–10 %/decade — captured in [[dc-bias-aging]] candidate page).

Pending: drop TDK / Taiyo Yuden full catalogs into `resources/market/` (blocked during this batch by anti-bot); digitize Murata/Samsung VCC curves for empirical (E₀, p) sigmoid fits; deepen `resources/manufacturing/` for process-yield-style simulation.

---

## [2026-05-19] init | Wiki initialized

Wiki created for: **MLCC (Multi-Layer Ceramic Capacitor) research** — manufacturing, market & product lineups, academic literature & patents, design rules & specs.

Directories created: `resources/assets/`, `wiki/entities/`, `wiki/concepts/`, `wiki/sources/`, `wiki/comparisons/`, `wiki/queries/`.
Existing `resources/{manufacturing,market,literature,design-rules}/` retained as raw drop zones.
Schema generated: `CLAUDE.md` (merged with pointers to `AGENTS.md` and `RESEARCH_PLAN.md`).
Vault config: `vault_path=null` (local mode); `sources_dir=resources`; `wiki_dir=wiki`.
