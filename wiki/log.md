---
title: Activity Log
type: log
created: 2026-05-19
updated: 2026-05-27
---

# Activity Log

Chronological record of wiki operations. Newest entries first.

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
