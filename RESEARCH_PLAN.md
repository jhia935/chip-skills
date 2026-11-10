# MLCC Research Plan

> Companion to [AGENTS.md](./AGENTS.md). Defines **what** to research, **where** to look, **how** to record findings, and **in what order**. Tick boxes (`[ ]` → `[x]`) as items complete.

---

## 0. Conventions

### 0.1 Source quality tiers (cite the highest available)
1. **T1 — Manufacturer datasheet / official catalog** (Murata, SEMCO, TDK, Taiyo Yuden, Yageo, …). Record revision/date.
2. **T2 — Standards documents** (EIA RS-198, IEC 60384-1/-21/-22, AEC-Q200, JIS C 5101, JEDEC).
3. **T3 — Peer-reviewed papers** (J. Am. Ceram. Soc., J. Eur. Ceram. Soc., JJAP, IEEE TCPMT, Acta Materialia).
4. **T4 — Granted patents** (USPTO, EPO, KIPRIS, JPO via Google Patents / Espacenet).
5. **T5 — Industry whitepapers, conference proceedings** (CARTS, PCNS, ECTC, IMAPS).
6. **T6 — Vendor app notes, technical blogs** (use only as pointers; verify against T1–T4).

### 0.2 File conventions
- One topic per Markdown file; lowercase-kebab filename.
- YAML front matter on every note:
  ```yaml
  ---
  title: ...
  pillar: manufacturing | market | literature | design-rules
  sources: [{tier: T1, ref: "Murata GRM datasheet rev. K, 2024-09"}]
  tags: [BaTiO3, X7R, ...]
  updated: YYYY-MM-DD
  ---
  ```
- Cross-link with `[[note-name]]` for wiki-style graph (compatible with the `/wiki` skill if we ingest later).
- Numeric values: always include unit; prefer SI; keep original-unit value in parentheses if datasheet uses something else.

### 0.3 Working glossary
Maintain `resources/glossary.md` — single authoritative source for abbreviations (BME, NME, TCC, DF, IR, …) and term definitions. Add a term the **first time** it appears in any note.

### 0.4 Bibliography
Maintain `resources/bibliography.md` — append-only registry of every source consulted, keyed by short citation (`[murata-grm-2024]`, `[moulson-herbert-2003]`, `[us10937593-2021]`). Notes reference by key.

---

## 1. Pillar 1 — Manufacturing process

**Goal:** Produce a process-step map with parameters, equipment, and dominant defect modes per step. This is the foundation for understanding *why* design rules look the way they do.

### 1.1 Research questions
- What are the canonical process steps from raw powder to finished chip?
- What are typical parameter ranges (sintering temp/atmosphere, dielectric green-tape thickness, electrode wet-print thickness, lamination pressure) per step?
- Which steps gate the achievable **layer count**, **dielectric thickness**, **case-size shrinkage**, and **electrode continuity**?
- What are the dominant **failure / yield-loss modes** per step (cracks, delamination, voids, electrode discontinuity, segregation)?
- BME (Ni-electrode, reducing atmosphere) vs NME (Pd/Ag) process trade-offs.

### 1.2 Files to produce in `resources/manufacturing/`
- [ ] `00-overview.md` — end-to-end process diagram (ASCII or mermaid) + one paragraph per step.
- [x] `10-powder-and-slurry.md` — BaTiO₃ powder synthesis routes (solid-state, hydrothermal, oxalate), particle size distribution, slurry rheology.
- [x] `20-tape-casting.md` — doctor-blade casting, green-tape thickness control, binder/plasticizer chemistry.
- [x] `30-electrode-printing.md` — screen / gravure printing, Ni paste rheology, wet/dry thickness, alignment.
- [x] `40-lamination-and-dicing.md` — stack-up, isostatic pressing, cutting blade vs laser dicing.
- [ ] `50-binder-burnout-and-sintering.md` — atmosphere control (PO₂, reducing for BME), shrinkage matching, microstructure development.
- [x] `60-termination-and-plating.md` — Cu termination paste, Ni barrier, Sn finish; thickness specs.
- [x] `80-test-sort-and-packaging.md` — end-of-line sort, screening, tape & reel (added 2026-11-10).
- [ ] `70-defects-and-yield.md` — cracking, delamination, voids, IR fail mechanisms with images/diagrams.

### 1.3 Sources to mine
- Moulson & Herbert, *Electroceramics* (textbook).
- Pepin, *Multilayer Ceramic Capacitors* (industry reference).
- Murata / TDK / SEMCO technology disclosure pages and IR presentations.
- JACerS / JECS review articles on BME MLCC and thin-layer dielectrics.

---

## 2. Pillar 2 — Market & product lineups

**Goal:** Build a normalized **lineup matrix** across the top vendors so design choices can be cross-shopped on real specs.

### 2.1 Vendors to cover
- **Tier 1:** Murata, Samsung Electro-Mechanics (SEMCO), TDK, Taiyo Yuden.
- **Tier 2:** Yageo (incl. KEMET, Pulse), Walsin, Vishay, KYOCERA AVX.
- **Tier 3 / China:** Fenghua, Eyang, Three-Circle (CCTC), NIC.

### 2.2 Lineup matrix axes (normalize across vendors)
| Axis | Values to capture |
|---|---|
| Case size (EIA / metric) | 008004/0201, 01005/0402, 0201/0603, 0402/1005, 0603/1608, 0805/2012, 1206/3216, 1210/3225, 1812/4532, 2220/5750 |
| Dielectric class | C0G/NP0 (Class I), X5R, X6R, X7R, X7S, X7T, X8R, X8L, Y5V/Z5U (legacy) |
| Capacitance range | per (case × class × Vr) |
| Rated voltage Vr | 2.5 / 4 / 6.3 / 10 / 16 / 25 / 35 / 50 / 100 / 250 / 500 / 1000 V and HV (≥ 1 kV) |
| Tolerance | ±1 %, ±5 %, ±10 %, ±20 %, +80/−20 % |
| Qualification | commercial, AEC-Q200 grade, MIL, medical |
| Series | Murata GRM/GCM/GJM; SEMCO CL; TDK C-series; TY Y-series; etc. |

### 2.3 Files to produce in `resources/market/`
- [ ] `00-vendor-overview.md` — capsule per vendor: HQ, key fabs, market share estimate, hero series, AEC-Q200 / HV / high-cap leadership.
- [ ] `10-lineup-matrix.csv` — one row per (vendor, series, case, class, cap, Vr, tol, qualification). Source datasheet rev. column.
- [ ] `20-datasheets/` — `vendor-series-rev.pdf` collected files (or URLs in a `README.md` if not downloading binaries).
- [ ] `30-flagship-comparisons.md` — head-to-head: e.g., 0402 X7R 1 µF 6.3 V across the four T1 vendors (cap-vs-DC-bias, ESR, ESL, height).
- [ ] `40-trends.md` — case-size miniaturization, high-cap (≥ 10 µF in 0603), high-voltage (≥ 100 V in 0603), automotive (X8R/X8L), HBC/SBC, supply-chain notes.

### 2.4 Sources
- Vendor product-search portals (Murata Component Search, SEMCO myCAP, TDK Product Center, TY Component Search, Yageo eCatalog).
- Investor-day decks & annual reports for market-share and capacity figures.
- Paumanok, TTI, ECIA market reports (cite tier T5).

---

## 3. Pillar 3 — Academic publications & patents

**Goal:** A curated reading list keyed to the design-rule questions we actually need answered. Quality > breadth.

### 3.1 Subtopics (each gets its own note)
- **Dielectric materials:** BaTiO₃ doping with rare earths (Y, Ho, Dy, Er) + Mg/Mn; core-shell microstructure; relaxor / linear dielectrics for HV; thin-layer (< 1 µm) dielectrics.
- **Electrodes:** Ni-BME paste, anti-oxidation additives, shrinkage matching to dielectric, electrode connectivity/discontinuity at thin layers, Cu termination.
- **Reliability physics:** TDDB / HALT modeling, IR degradation (oxygen vacancy migration), mechanical (flex crack, thermal shock), ESD.
- **Process:** hydrothermal BaTiO₃ synthesis, doctor-blade rheology, atmosphere control (PO₂), low-temp co-firing.
- **Measurement & metrology:** TCC, DF, ESR/ESL extraction, DC-bias characterization, HALT/HAST.

### 3.2 Files to produce in `resources/literature/`
- [ ] `00-reading-list.md` — prioritized list keyed to subtopic.
- [ ] `10-dielectric-materials.md` — annotated notes per paper.
- [ ] `20-electrodes-bme.md`
- [ ] `30-reliability.md`
- [ ] `40-process.md`
- [ ] `50-patents.md` — table of granted patents (assignee, number, priority date, claim summary).

### 3.3 Search strategy
- **Papers:** Google Scholar + Semantic Scholar (for recommendations) + IEEE Xplore, ScienceDirect, Wiley (JACerS, JECS), JJAP, Acta Mater. Search seeds: "MLCC BaTiO3 rare earth doping core shell", "Ni internal electrode shrinkage matching", "thin layer MLCC TDDB", "MLCC flex crack reliability".
- **Patents:** Google Patents + Espacenet; filter by assignee = Murata / SEMCO / TDK / Taiyo Yuden, CPC class **H01G 4/12** (ceramic dielectric capacitors) and **H01G 4/30** (stacked capacitors). KIPRIS for Korean filings (SEMCO).

---

## 4. Pillar 4 — Design rules & specs

**Goal:** The deliverable the engineer is building toward — a synthesized **design-rule guide** that maps application requirements onto MLCC selection and PCB integration.

### 4.1 Sub-deliverables in `resources/design-rules/`
- [ ] `00-fundamentals.md` — `C = εᵣε₀ · A · N / d`; relation to layer count, dielectric thickness, area; effective capacitance under DC bias for Class II.
- [ ] `10-dielectric-classes.md` — EIA RS-198 codes decoded (X7R = −55…+125 °C, ±15 %; X5R, X6S, X7S, X7T, X8L …). Class I (C0G/NP0) vs Class II vs Class III/IV trade-offs.
- [ ] `20-voltage-derating.md` — DC-bias derating curves by class & case size; AC voltage rules; ripple current; transient (surge) limits.
- [ ] `30-frequency-domain.md` — ESR & ESL vs frequency; self-resonant frequency; parallel-cap network design.
- [ ] `40-aging-and-temperature.md` — aging rate (%/decade-hour) for Class II; temp coefficient of capacitance (TCC) charts; recovery on re-heating above Curie.
- [ ] `50-reliability-derating.md` — voltage derating for automotive/medical; AEC-Q200 stress sequence; HALT-derived lifetime models.
- [ ] `60-pcb-and-mechanical.md` — pad/landing geometry, anti-tombstoning, board-flex crack mitigation (soft termination, open-mode designs), reflow profile, conformal coat stress.
- [ ] `70-standards-reference.md` — pointers to EIA RS-198, IEC 60384-1 / -21 / -22, AEC-Q200, JIS C 5101 with which sections cover which rules.
- [ ] `90-design-rule-checklist.md` — **the synthesized output**: a flowchart / checklist a designer can run to pick an MLCC for a given (cap, V, freq, temp range, reliability grade) tuple.

### 4.2 Sources
- T1 + T2 above. Datasheets for DC-bias curves; standards docs for the codes.

---

## 5. Sequencing

Execution order (each item assumes the previous is at least scaffolded — don't wait for completeness):

1. **Foundation** — write `glossary.md`, `bibliography.md` stubs; ingest **EIA RS-198** and **IEC 60384-1** decoded into `design-rules/10-dielectric-classes.md` and `70-standards-reference.md`.
2. **Manufacturing skeleton** — `manufacturing/00-overview.md` end-to-end map (one paragraph per step). Defer parameter ranges to later passes.
3. **Market matrix v0** — collect Murata + SEMCO catalogs into `market/10-lineup-matrix.csv` for case sizes 0402–1206 across X7R/X5R/C0G. Expand to TDK + TY in v1, others in v2.
4. **Design fundamentals** — `design-rules/00-fundamentals.md`, `20-voltage-derating.md`, `30-frequency-domain.md`, `40-aging-and-temperature.md`. Use Murata's DC-bias data and app notes as primary T1 sources.
5. **Literature first pass** — `literature/00-reading-list.md` with ~30 prioritized papers across the four subtopics; full annotations come in later passes.
6. **Patent first pass** — table of top-10 patents per major assignee from the last decade.
7. **Manufacturing parameter pass** — fill the per-step files with actual ranges and defect-mode catalogs.
8. **Design rule synthesis** — `design-rules/90-design-rule-checklist.md`: turn the corpus into an executable selection procedure.
9. **Iterate** — Tier-2/3 vendors, deep patent reading, reliability physics deep-dive.

Stop and reassess after each milestone — don't fall into a single rabbit hole.

---

## 6. Success criteria

The plan is "done enough to be useful" when:
- The **lineup matrix** covers all T1 vendors across 0402–1206 and the three workhorse dielectric classes (C0G / X5R / X7R).
- The **design-rule checklist** can be applied to a new design without re-deriving from datasheets — it cites them.
- A new reader can answer, from `resources/` alone: *"Why does a 0402 X7R 10 µF 6.3 V part only deliver ~3 µF at 5 V DC bias, and what would I substitute if I need 8 µF at that bias?"*

---

## 7. Tooling notes

- The `/wiki` skill (if loaded) can ingest `resources/` into a graph-linked knowledge base — useful once the corpus crosses ~30 notes. Until then, manage manually with `[[wiki-links]]`.
- Web/PDF gathering will happen in subsequent turns via `WebFetch` / `WebSearch`; do not download large binaries into the repo — store URLs in `market/20-datasheets/README.md` and only pull PDFs that are critical.
- Keep every note short enough to be a "page in a binder" — split rather than letting any file exceed ~400 lines.
