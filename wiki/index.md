---
title: Wiki Index
type: index
created: 2026-05-19
updated: 2026-06-05
---

# Wiki Index

A catalog of all pages in this wiki, organized by category. See [[overview]] for a high-level synthesis and [[log]] for chronological activity.

## Entities

### Companies
- [[murata]] — World's largest MLCC manufacturer; BME pioneer (1982); ~100 nm BaTiO₃ powder.
- [[samsung-electro-mechanics]] — Largest Korean MLCC house (SEMCO); active Tb-Dy dopant patent activity.
- [[tdk]] — Japanese Tier-1, broad commercial + automotive lineup; full C-series dimensional table now captured.
- [[taiyo-yuden]] — Japanese Tier-1, miniaturization leadership at small case sizes *(stub)*.
- [[kemet]] — Yageo subsidiary; ArcShield HV MLCC; canonical training references.
- [[vishay]] — Vitramon-brand PME X7R; Tier-1 publisher of DC-bias-aging data.
- [[kyocera-avx]] — Cu-electrode RF MLCCs; classic decoupling-design paper.
- [[yageo]] — Taiwanese parent of KEMET; AEC-Q200 spec contributor *(stub)*.
- [[rohm]] — Switching-regulator IC vendor; MLCC application-note authority *(stub)*.
- [[intel]] — CPU OEM whose 2010 thin-layer MLCC reliability report triggered the Liu NASA NEPP framework *(stub)*.
- [[wurth-elektronik]] — German passive-components manufacturer; publisher of analytical-depth ANP114 polarization model.
- [[knowles-capacitors]] — High-reliability MLCC specialist for aerospace, defense, medical, HV; practitioner blog publisher.
- [[hebrew-university-jerusalem]] — Israel; Dul'kin/Roth Department of Applied Physics; BaTiO₃ Curie-shift literature synthesis.
- [[ben-gurion-university]] — Israel; Ben-Yaakov power-electronics group; non-linear-capacitor theory.

### Product series
- [[murata-grm-series]] — General-purpose Murata MLCC; GRM03 through GRM55.
- [[samsung-cl-series]] — General-purpose SEMCO MLCC; 11-field part number.
- [[kemet-arcshield]] — KEMET patented HV MLCC with internal shield electrodes.
- [[bme-c0g]] — KEMET CaZrO₃-based Class I BME family; PME-killer in C0G/NP0 territory.
- [[tdk-cga-series]] — TDK AEC-Q200-qualified automotive MLCC family (C0G/X7R/X8R; 0402–2220).

### Materials
- [[batio3]] — Barium titanate; the dominant Class II/III dielectric base.
- [[cazro3]] — Calcium zirconate; modern Class I BME C0G dielectric base.
- [[srtio3]] — Strontium titanate; Curie-point shifter in BST formulations, reliability-physics reference.
- [[nanbo3]] — Sodium niobate; lead-free X8R/X9R extension, antiferroelectric energy-storage material.

### People
- [[donhang-liu]] — NASA Goddard NEPP capacitor reliability specialist; authored the BME reliability framework.
- [[susan-trolier-mckinstry]] — Penn State; major ferroelectrics name; co-authored T-resolved Rayleigh-analysis of BaTiO₃ (2023).
- [[shashank-priya]] — Penn State / formerly Virginia Tech; senior author on the 2017 compositionally-graded MLCC paper.
- [[ichiro-fujii]] — first author on the 2023 Rayleigh-analysis BaTiO₃ paper.
- [[rene-kalbitz]] — Würth Elektronik; author of ANP114 polarization model.
- [[herb-te-jen-ma]] — Samsung Electro-Mechanics application engineer; AC × DC × aging quantitative writeup.
- [[ciprian-covaci]], [[aurel-gontean]] — Politehnica Timișoara; singing-MLCC review co-authors.
- [[evgeniy-dulkin]], [[michael-roth]] — Hebrew University of Jerusalem; Curie-shift literature synthesis.
- [[victor-lu]] — Knowles Capacitors application engineer; DC-bias phenomenon blog.
- [[marco-deluca]] — Materials Center Leoben; trace-doping ferroelectrics researcher.
- [[hiroshi-yabuta]] — Canon Inc.; Bi/Mn double-doping researcher.
- [[sam-ben-yaakov]] — Ben-Gurion University; power-electronics theorist; three-capacitance-definitions framework.
- [[seiji-hidaka]] — Murata CAD/CAE Technology; author of MLCC Dynamic Model documentation.
- [[seok-hyun-yoon]] — SEMCO MLCC research lead; author on Yoon 2020 + Chun 2024.
- [[jinhyuk-chun]] — SEMCO researcher; first author Chun 2024.
- [[ana-maria-hernandez-lopez]] — KEMET Charged; first author Hernández-López 2018.
- [[gaku-okuma]] — TDK / Tokyo Tech; nano-CT of MLCC electrode sintering; first author Okuma 2021.
- [[fumihiro-wakai]] — Tokyo Tech; continuum sintering-mechanics theorist; senior author Okuma 2021.
- [[michael-sampson]] — NASA GSFC parts engineer; co-author of the 2011 BME MLCC construction/DPA database.
- [[alexander-teverovsky]] — NASA GSFC/NEPP; most prolific author of the MLCC characterization corpus (rating, leakage, breakdown, cracking, mechanics).

### Organizations
- [[nasa-nepp]] — NASA Electronic Parts and Packaging program; primary public sponsor of BME reliability research.
- [[aec-council]] — Automotive Electronics Council; publisher of AEC-Q200 automotive passive qualification spec.
- [[penn-state]] — Center for Dielectrics and Piezoelectrics; primary US academic hub for ferroelectric ceramics.
- [[virginia-tech]] — CEHMS; past institutional home of Priya, dielectric composites research.

## Concepts

- [[mlcc-capacitance-equation]] — `C = εr·ε₀·N·A/d` and what each factor is.
- [[eia-rs-198-dielectric-classes]] — Letter-code decoder for C0G, X7R, X5R, X8L, Y5V, etc.
- [[dc-bias-derating]] — VCC effect, field-not-voltage, sigmoid fit for the simulator.
- [[aging-class-2]] — Logarithmic capacitance decay; de-aging above Curie.
- [[bme-vs-pme]] — Base-metal vs precious-metal electrode trade-offs.
- [[bme-reliability-model]] — Liu's three-factor model: structure × acceleration × Weibull.
- [[case-size-geometry]] — EIA case codes, margins, overlap area, height/N budget.
- [[electrode-overlap-and-registration]] — Print-pattern unit cell; active overlap = footprint − margins; registration tolerance; in-plane shrinkage & electrode discontinuity (simulator pattern parameterization).
- [[mlcc-dimensional-tolerance]] — L/W/T case tolerances (EIA/IEC/JIS); why T is a layer-count-dependent "max"; build-to-max-footprint adds ~+25–50 % active area on small cases.
- [[mlcc-margin-cover-design-rules]] — quantitative side/end-margin & cover-plate minimums (MIL-PRF-32535 voltage-scaled tables, GSFC, EIA-469) vs measured as-built values.
- [[esr-esl-srf]] — Parasitics, equivalent-circuit impedance, decoupling rules.
- [[failure-modes-mlcc]] — Cracks (mechanical/thermal/flex), arcing, mitigation hierarchy.
- [[core-shell-batio3]] — Rare-earth-doped microstructure that makes thin-layer BME work.
- [[core-shell-formation-mechanism]] — Dissolution-reprecipitation vs solid-state diffusion; the firing-stage kinetics.
- [[dopant-site-occupancy-batio3]] — A vs B site, amphoteric rare-earths, Y/Ho/Dy/Er ionic-radius window.
- [[dopant-powder-coating]] — Material-stage wet-chemical / sol-gel dopant delivery onto BaTiO₃ particles.
- [[dc-bias-aging]] — Slow capacitance drift under continuous DC bias, distinct from natural aging and from VCC.
- [[oxygen-vacancy-migration]] — Schottky-barrier-collapse mechanism behind BME IR degradation.
- [[ferroelectric-domain-wall]] — Where most of MLCC εr comes from; explains VCC, aging, and grain-size effects.
- [[mlcc-manufacturing-process]] — End-to-end process map from powder to packaged chip.
- [[bme-sintering-atmosphere]] — Reducing-atmosphere co-firing with PO₂ control.
- [[re-oxidation-anneal]] — Post-sinter step that refills oxygen vacancies and raises IR.
- [[batio3-powder-synthesis]] — Hydrothermal, solid-state, oxalate, sol-gel routes; size distribution control.
- [[sintering-kinetics-batio3]] — Mass-transport mechanisms, densification rate, activation-energy hierarchy.
- [[grain-growth-dopant-pinning]] — Normal/abnormal grain growth, solute drag, Zener pinning, co-doping strategy.
- [[defect-chemistry-batio3]] — Kröger-Vink notation, V_O equilibria, donor/acceptor compensation.
- [[ni-batio3-cosintering-interface]] — Interfacial (Ni,Ba,Ti) liquid alloy, electrode discontinuity physics.
- [[cubic-tetragonal-transition]] — T_C cooldown physics: domain formation, twinning, stress relief vs grain size.
- [[sintering-aids-glass]] — BBS, ZBS, PBS glass systems; lowering sintering T for Cu BME and LTCC.
- [[sintering-profile-mlcc]] — Industrial heating-rate / multi-stage profile (200 → 3000 °C/h study, 1250 °C peak).
- [[two-step-sintering]] — Chen-Wang TSS-CW method; density without grain growth (BaTiO₃ at 35 nm grain).
- [[constrained-sintering-mlcc]] — In-plane vs thickness shrinkage anisotropy; camber/warpage origin.
- [[spark-plasma-sintering]] — SPS / FAST; 99 % density in minutes, ~doubled εr.
- [[cold-sintering]] — Sub-300 °C densification with transient liquid phase (Randall group).
- [[master-sintering-curve]] — Su-Johnson MSC; activation energies for BaTiO₃; breaks down above 1200 °C.
- [[binder-burnout-debinding]] — First firing step (200–600 °C); PVB kinetics; Ar+1%O₂ window; BBO defect modes.
- [[tcc-dc-bias-interaction]] — How TCC and DC-bias derating couple; multiplicative f_T × f_V model is accurate to ±5–10 % for X5R/X7R, breaks down for Y5V and near-T_C compositions.
- [[empirical-c-t-vdc-academic-measurements]] — Synthesis of academic 2D-surface measurements; recipe-specific (E₀, p) calibration table for the Tier 2 simulator.
- [[polar-nanoregions-pnr]] — Short-range polar order in a non-polar matrix; route to high ε_r with low DC-bias loss without long-range ferroelectric order.
- [[rayleigh-analysis]] — Linear ε'(E_AC) decomposition into reversible ε'_init plus irreversible α'; basis for understanding TCC × bias coupling.
- [[dielectric-tunability]] — Same physics as DC-bias derating, opposite sign convention; how the relaxor/varactor literature frames the effect.
- [[relaxor-ferroelectric]] — Material class with broadened, frequency-dependent dielectric peak; no long-range ferroelectric order.
- [[ac-voltage-coefficient-mlcc]] — Third derating factor (`f_AC`); non-monotonic in AC level; strongest cross-coupling to DC bias of the four Zednicek factors.
- [[tcc-ac-coupling]] — How AC excitation level reshapes the TCC curve; Rayleigh α'(T) makes coupling explicit.
- [[electrostriction]] — Quadratic E²→strain; one of three contributors to AC voltage coefficient.
- [[piezoelectricity-batio3]] — Linear E→strain in BaTiO₃; vanishes above T_C.
- [[mlcc-acoustic-noise]] — "Singing capacitors"; same strain mechanism as AC voltage coefficient.
- [[soft-termination-mlcc]] — Recipe-level toggle for strain decoupling; suppresses both acoustic noise and AC-coefficient.
- [[field-induced-curie-shift]] — DC bias shifts BaTiO₃ T_C upward by ~130 mK/(V/µm); the central mechanism behind the DC bias × TCC coupling.
- [[tetragonality-c-a-ratio]] — c/a lattice ratio; structural parameter that controls DC-bias robustness and T_C shift magnitude.
- [[class-specific-tc-engineering]] — Why each MLCC class has its own T_C; dopant-slope table (Zr −4.1, Sr −3, Pb +4, BiYbO₃ +10 K at 0.005 mol%) and class-by-class compositional summary.
- [[bi-lone-pair-doping]] — Bi³⁺ 6s² lone-pair drives local distortion; Pb²⁺-equivalent T_C-up shifter without Pb; foundation of modern X8R/X9R compositions.
- [[dielectric-layer-thickness-floor]] — Why fired dielectric can't go below ~0.25–0.5 µm: grains-per-layer rule + powder/binder/solid-loading wall + tape-casting limit. 0.15–0.2 µm is unreachable in volume.
- [[ac-dc-capacitance-mapping]] — Joint `C(V_AC, V_DC)` surface; charge-based Q(V) formulation; three regimes; recipe-aware Tier 3 simulator path.
- [[three-capacitance-definitions]] — Local `dQ/dV`, total `Q/V`, large-signal `ΔQ/ΔV`; diverge by up to 30 % for non-linear MLCCs; application chooses the right one.
- [[green-tape-shrinkage-anisotropy]] — Drying + burnout + sintering shrinkage stages; powder shape, tape thickness, binder/metal content trade-offs.
- [[green-density-vs-shrinkage]] — Mass-conservation `1 − (ρ_g/ρ_f)^(1/3)` relation; binder content sets green density which sets sintering shrinkage.
- [[skorohod-olevsky-viscous-sintering]] — Continuum sintering model: `dε_i/dt = σ'/(2ηφ) + (tr σ − 3P_L)/(18ηψ)·I`; predicts free + constrained shrinkage.
- [[cofiring-camber-bilayer]] — Jean-Chang camber formula; two-stage camber generation (BBO + sintering); SOVS-FE prediction.
- [[zero-shrinkage-ltcc]] — Sacrificial-layer, self-constrained, HeraLock, and pressure-assisted approaches to suppress lateral shrinkage.
- [[bordia-scherer-composite-sintering]] — Foundational rigid-inclusion-retardation model (1987-1988); first-order bound `\dot ε_c/\dot ε_m = 1 − v_i`.
- [[metal-electrode-shrinkage-effect]] — How Ni / Cu inner electrodes drive in-plane vs thickness shrinkage in BME MLCC; four engineering knobs (nano-BT additive, refractory-metal dopants, Ni particle size, h_Ni / h_BT ratio).
- [[ni-electrode-paste-formulation]] — Industry-standard Ni paste recipe (55 vol% Ni, 7 wt% nano-BT, 41 vol% terpineol); five formulation axes.
- [[cu-electrode-mlcc]] — Cu-electrode base-metal MLCC (mostly Class I C0G); sintering 900-960 °C with glass-aided dielectric; KYOCERA-AVX / Murata RF lineups.
- [[dielectric-shrinkage-in-mlcc-stack]] — How alternating Ni/BT lamination reshapes the ceramic layer's shrinkage: macroscopic anisotropy, stress reversal, pore orientation, through-thickness density gradient, layer-position effects.
- [[edge-vs-internal-layer-effects]] — Top/bottom cover layers vs internal layers; one-sided vs bilateral constraint; cover-layer design as designed compensation.
- [[layer-thickness-and-metal-ceramic-ratio]] — Quantitative scaling: historical h_BT/h_Ni evolution, three metal/ceramic ratio definitions (in-paste / per-layer / stack-level), Yan DEM data on Ni green density sweet spot (D₀ ≈ 0.55), modern thin-layer benchmark.
- [[epsilon-r-from-dopant-composition]] — Three routes for predicting ε_r and T_C from dopant package: DFT, ionic-radius empirical correlations, ML on measured datasets; Sm slopes +1,950 / mol% ε_r and −17 °C / mol% T_C.

### Dielectric class deep-dives
- [[c0g-npo-dielectric]] — Class I ultra-stable; CaZrO₃ or BaNd-titanate base; the only "textbook ideal" cap.
- [[x7r-dielectric]] — Class II workhorse; ±15 % over −55…+125 °C; BaTiO₃ core-shell.
- [[x5r-dielectric]] — Class II lower-T; ±15 % to +85 °C; consumer-dominant.
- [[x8r-x8l-x9r-high-temperature-dielectrics]] — Above-125 °C extensions; automotive standard; X0U / X9V for 175–200 °C.
- [[y5v-z5u-class-iii-dielectric]] — Class III high-K; +22/−82 %; legacy, being phased out.

### Primitives (foundational concepts)
- [[permittivity]] — Dielectric constant εᵣ; the fundamental material property.
- [[polarization-mechanisms]] — Electronic / ionic / dipolar / space-charge polarization.
- [[perovskite-structure]] — ABO₃ crystal framework underlying every MLCC dielectric.
- [[curie-temperature]] — Ferroelectric-to-paraelectric transition; the aging-clock reset point.
- [[temperature-coefficient-of-capacitance]] — TCC; Class I letter-code, Class II envelope.
- [[dissipation-factor]] — DF / tan δ; dielectric loss spec.
- [[dielectric-breakdown]] — Intrinsic vs defect-limited vs surface arcing.
- [[insulation-resistance]] — IR(t, V, T); the BME reliability proxy.
- [[heywang-jonker-model]] — Schottky double-depletion grain-boundary barrier model.
- [[prokopowicz-vaskas-equation]] — Single-mode reliability-acceleration equation.
- [[weibull-distribution]] — Two-parameter Weibull for TTF statistics.
- [[termination-and-plating]] — Cu/Ni/Sn external electrode stack.

### Application-layer design rules
- [[vendor-spice-models]] — Murata SimSurfing, K-SIM, SpiCap, SEAT: static vs dynamic SPICE models, how a simulator consumes them.
- [[murata-spice-library-and-curves]] — Practical: netlist structure + digitized DC-bias / TCC / aging values from GRM Series data.
- [[kemet-k-sim-tool]] — KEMET / Yageo K-SIM; what it exposes vs SimSurfing; built-in lifetime model for non-ceramic capacitors.
- [[decoupling-design-rules]] — PDN target impedance, "myth of 3 cap values", same-value-paralleled approach, ESR-controlled damping.
- [[mlcc-pcb-layout-rules]] — IPC-7351 pad design, anti-tombstoning, flex-zone exclusion, reflow profile.
- [[s-parameter-de-embedding-mlcc]] — How to separate chip ESL from fixture parasitics; chip-vs-mounting ESL hierarchy.
- [[nano-grain-batio3-epsilon-r]] — Quantitative εr vs grain size 5 µm → 10 nm; critical size; dead-layer model.

## Sources

- [[kemet-mlcc-design-and-characteristics]] — KEMET/PSMA 2019, construction + failure modes + ArcShield.
- [[psma-ceramic-capacitor-basics]] — KEMET/PSMA 2017, dense quantitative reference deck.
- [[vishay-x7r-cap-drift-dc-bias]] — Coppens et al. 2021, DC-bias aging benchmark.
- [[kyocera-avx-esr-esl-decoupling]] — Cain CARTS 1997, SPICE study of decoupling.
- [[murata-grm-series-tcc-data]] — Murata reference curves for the GRM family.
- [[samsung-cl-series-mlcc-ds]] — SEMCO datasheet, Rosetta stone for vendor codes.
- [[nasa-nepp-bme-mlcc-reliability]] — Liu 2013 framework paper.
- [[nasa-batio3-mlcc-failure-mechanisms]] — Liu & Sampson CARTS 2012 (Outstanding Paper).
- [[nasa-general-reliability-model-ni-batio3]] — Liu CARTS 2014, BME P-V fitted n=4.5 evidence.
- [[electrical-integrity-dce11-200]] — Novak DesignCon 2011, cross-vendor measured DC/AC bias data.
- [[epci-high-cv-mlcc-bias-aging]] — Zednicek 2019, multiplicative-factor formula `C_actual = C·F_DCV·F_ACV·F_T·F_age`.
- [[aec-q200-rev-e-2023]] — Official AEC-Q200 Rev E ceramic-capacitor stress qualification table.
- [[rohm-ceramic-cap-app-note]] — ROHM 2020, MLCC size/thickness/V_r DC-bias comparison.
- [[escies-bme-mlcc-high-reliability]] — Gurav et al. KEMET, BME C0G + X7R high-reliability synthesis.
- [[nasa-ir-degradation-ni-batio3-2015]] — Liu IEEE TCPMT, Schottky barrier model on 3 commercial BME parts.
- [[nasa-time-dependent-ir-2013-prb]] — Liu PRB manuscript, exponential leakage law derivation + E_k 1.6/2.8 eV fits.
- [[arxiv-batio3-domain-wall-motion]] — Gurung et al. arXiv 2024, Landau-Ginzburg domain-wall dielectric response.
- [[nasa-cracking-low-voltage-mlcc]] — Teverovsky NASA NEPP 2018, encyclopedic cracking & process review.
- [[octopart-tdk-cga8l3c0g-product-guide]] — TDK 2012 full MLCC product line-up (C-series + CGA + CKC).
- [[epfl-ceramics-sintering-microstructure]] — EPFL TP3 lab guide; canonical solid-state sintering physics.
- [[arxiv-electron-localization-cation-diffusion]] — Yu et al. 2018, DFT showing why reducing atmosphere accelerates BaTiO₃ grain growth.
- [[arxiv-batio3-cubic-to-tetragonal-md]] — First-principles MD of the cubic↔tetragonal phase transition.
- [[nasa-time-dependent-ir-2013-prb]] — Liu PRB 2013, exponential IR-degradation law derivation + E_k 1.6/2.8 eV fits.
- [[cold-sintering-annual-review-mse]] — Guo, Randall et al. 2019, authoritative cold-sintering review.
- [[llnl-particle-rigid-body-sintering]] — LLNL, rigid-body particle rearrangement in early-stage sintering.
- [[arxiv-batio3-silica-interdiffusion]] — Nuzhnyy et al. 2011, BaTiO₃@SiO₂ core-shell composites; interdiffusion creates strong THz dielectric dispersion.
- [[taiyo-yuden-mlcc-whitepaper]] — TY mid-2010s flagship; documents 100-470 µF MLCC commercialization, MTTF 10⁴-10⁶ yr claims, acoustic-noise dielectric.
- [[srep-batio3-grain-size-unfolding]] — Sci. Rep. 9953 (2015), cross-method survey: εr peak at 0.8-1.1 µm, drops below 1000 at 50 nm, c/a → 1.000 at 100 nm.
- [[aec-q104-rev-a-2025]] — Official AEC-Q104 Rev A (Nov 2025); MCM qualification framework for capacitors-embedded-in-modules.
- [[epj-in-situ-xray-tomography-dem]] — Yan/Martin/Bouvard et al. EPJ Web Conf 2017; coupling in-situ synchrotron tomography with DEM for high-T sintering of Cu + Ni-BaTiO₃ MLCC.
- [[yan-thesis-2013-mlcc-sintering-nanotomography]] — Full Yan PhD thesis (TU Darmstadt / Grenoble 2013, 235 pp); chip-scale 12% shrinkage, Ni-vs-BT 450 °C onset gap, DEM retardation factor table.
- [[heunisch-2010-tape-cast-anisotropic-shrinkage]] — Heunisch/Dellert/Roosen JECS 2010; particle shape dominates green-tape shrinkage anisotropy (K_xy 1.9–12.7).
- [[okuma-2021-mlcc-electrode-nanoct]] — Okuma et al. Acta Mater. 2021 (TDK/Tokyo Tech, SPring-8 nano-CT); in-plane shrinkage anisotropy tied to casting direction + sub-µm Ni electrode discontinuity.
- [[nasa-gsfc-liu-construction-database-2011]] — Liu & Sampson CARTS 2011; measured DPA construction table for 30 BME/PME parts (d, electrode, N, cover, margins) + grain-stacking.
- [[mil-prf-123-spec]] — DoD PME high-rel MLCC spec; fixed min dielectric (0.8/1.0 mil), K ≤ 3000, Ni prohibited.
- [[mil-prf-32535-spec]] — DoD BME high-rel MLCC spec; no fixed d, voltage-scaled margin/cover tables, VBR ≥ 6×VR, cube-law life.
- [[gsfc-mlcc-space-specs]] — NASA GSFC S-311-P-838 (BME) / S-311-P-829 (PME) / EEE-INST-002 derating; ≤300 layers + grains-per-layer gate.
- [[avx-automotive-mlcc-kam-kaf]] — KYOCERA AVX KAM/KAF automotive MLCC; chip L×W×T dimension tables, 150 °C dielectrics, FLEXITERM.
- [[mistler-twiname-tape-casting-textbook]] — Mistler & Twiname (ACerS/Wiley 2000); standard practitioner reference for tape casting.
- [[rahaman-ceramic-processing-sintering-textbook]] — Rahaman textbooks; canonical graduate sintering science incl. constrained-sintering chapters.
- [[shi-2023-jecs-sovs-bilayer-modeling]] — Shi/Giuntini et al. JECS 2023; efficient FE-implementation of SOVS model with solid-like shell elements and Aquilanti-Mundim viscosity; bilayer warpage benchmarks at 4-8% error.
- [[hagymasi-ltcc-ferrite-dielectric-cofiring]] — Hagymási/Roosen Electroceramics conf; DuPont 951 + BaFe₁₂O₁₉ self-constrained sintering with 12.8%→33.1% thickness redistribution.
- [[lester-2017-sandia-sovs-verification]] — Sandia SAND2017-12933R; implicit-scheme SOVS verification of bilayer bars.
- [[polotai-2007-cr-doping-ni-electrode-mlcc]] — Penn State 2007; 1 wt% Cr in Ni decouples shrinkage from continuity by suppressing the (Ni,Ba,Ti) interfacial alloy without changing densification kinetics.
- [[sugimura-hirao-2009-batio3-additive-ni-electrode]] — Noritake industry paper; 30 nm BT at 10 mass% achieves > 75 % Ni film coverage on the dielectric.
- [[garcia-vanderbilt-1998-batio3-dft-er]] — arXiv 1998; first-principles ε_r(T) of BaTiO₃ via effective Hamiltonian + Monte Carlo; reproduces Curie-Weiss and tetragonal-phase anisotropy.
- [[liu-2019-sm-mn-codoped-batio3-permittivity]] — *Materials* 2019; quantitative Sm 2-7 mol% + Mn 1 mol% in BT; ε_r,peak 5,500 → 15,000 and T_C 105 → 20 °C slopes.
- [[song-2017-compositionally-graded-mlcc]] — Sci. Rep. 2017; BTS-BCN graded MLCC, 70 % tunability at 50 kV/cm, −55…+125 °C × 0–50 kV/cm measurement.
- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] — Microstructures 2023; Rayleigh-analysis ε'_init + α' decomposition of BaTiO₃ from −180 to +150 °C.
- [[he-2025-bsite-ca-batio3-pnr]] — Microstructures 2026; B-site 4 mol% Ca in BT → PNR microstructure, bias loss 60 % → 15 % at 30 kV/cm.
- [[wang-2023-x5r-ni-mlcc-combined-out-field]] — Cer. Int. 2023; 1210-case Dy/Ho-coated X5R Ni-MLCC characterized under combined T × V_DC × V_AC.
- [[he-2022-dy-ho-batio3-dc-bias]] — Cer. Int. 2022; Dy-Mg co-doped BaTiO₃ with 180 nm grain, ε_r 2000, −23.6 % at 4 kV/mm.
- [[hwang-2024-coreshell-electrode-dc-bias]] — ACS AMI 2024; core-shell + Ni-electrode optimization; bulk −17 % vs MLCC −28 % at 4 kV/mm.
- [[an-2026-grain-boundary-segregation-dc-bias]] — Adv. Mater. 2026; GB-segregation engineering; optimal grain 200–260 nm under E > 4 V/µm.
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — Würth ANP114; SPICE-friendly analytic C(V, f) polarization model with bell-shaped peak `sech²((V−Vc)/b)`.
- [[herb-ma-2020-2022-mlcc-ac-dc-aging]] — SEMCO 2020/2022; quantifies AC × DC interaction (30 % swing at zero DC; 4 % extra loss at 10 mV_rms vs 500 mV_rms).
- [[covaci-gontean-2022-singing-mlcc]] — Sensors 2022; piezo + electrostriction strain model `s = d_33 E + M_33 E²` for MLCC acoustic noise.
- [[dulkin-roth-2020-batio3-curie-shift]] — arXiv 2020; consolidates dT_C/dE ≈ +1.3 °C/(kV/cm) from four single-crystal methods; pressure-field equivalence.
- [[lim-cho-2010-batio3-mlcc-field-induced]] — Ferroelectrics 2010; field-induced phase transition in X7R MLCC; two-mechanism hysteresis.
- [[yoon-kim-2020-batio3-tetragonality-dc-bias]] — J. Mater. Chem. C 2020; tetragonality (c/a) controls DC-bias performance; lower c/a → better bias robustness.
- [[lu-knowles-2023-dc-bias-explained]] — Knowles 2023; practitioner worked example: 200 V X7R, +15 % / −30 % combined T × V_DC envelope.
- [[deluca-2018-biybo3-batio3-doping]] — J. Mater. Chem. A 2018; trace BiYbO₃ (0.005 mol%) shifts T_C +10 K via Bi³⁺ lone-pair; T-O transition drops 50 K.
- [[yabuta-2017-bi-mn-batio3-tetragonality]] — Sci. Rep. 2017; Bi/Mn co-doping increases c/a and stabilizes tetragonal phase; Mn-T_C-reduction recovered by Bi.
- [[x9r-batio3-bimg-nanbo3-2022]] — Crystals 2022; X9R MLCC at `0.5BT-0.25BMT-0.25NN`; ε_r ≈ 630±15 % over −70 to +220 °C.
- [[cazro3-x8r-batio3-2015]] — Cer. Int. 2015; CaZrO₃ + Y₂O₃ co-doping for X8R via internal-stress core-shell shift.
- [[murata-dynamic-model-hidaka-2016]] — Murata 2016 technical article; behavioral-source SPICE model handling `T × V_DC` automatically; returns C_local only.
- [[ben-yaakov-2025-nonlinear-capacitance-definition]] — EPCI 2025; three distinct capacitance definitions (local, total, large-signal) for non-linear MLCCs; application chooses.
- [[chun-2024-screp-batio3-mlcc-degradation]] — Sci. Rep. 2024; three SEMCO X7R prototypes with disclosed case + cap + V + d_fired; implies ε_r ≈ 6000 for modern thin-layer.
- [[hernandez-lopez-2018-kemet-x7r-halt]] — Materials 2018; KEMET 0603-class HV X7R with full geometry (7.5 µm × 68 layers) + Ca doping variants.
- [[kyocera-thin-mlcc-roadmap]] — KYOCERA roadmap + 2023 0201 10 µF (4 V, 0.45 µm electrode, > 90 % coverage); bleeding-edge thin-layer frontier.
- [[aqueous-tape-casting-ultrathin-batio3-2025]] — tape-casting powder/binder/solid-loading limits; 180–300 nm production powder, ~400 nm fired floor, sub-1 µm only with 20–25 nm nanopowder.

### Patents
- [[us-4115493-murata-sakabe-1978-bme-foundational]] — Sakabe & Seno 1978; the foundational Ca-doped BaTiO₃ non-reducing dielectric that enabled Ni-electrode MLCC; expired 1997. Composition `{(Ba₁₋ₓCaₓ)O}ₘ(Ti₁₋ᵧZrᵧ)O₂` with m=1.005-1.03, x=0.02-0.22.
- [[us-6043974-philips-dy-stabilizer]] — Chen, Lee, Tseng (Philips → Phycomp) 2000; Dy at the Ba site stabilizes Mn charge and suppresses DC-bias-driven IR degradation; the industry-standard Dy-Mn co-doping recipe traces here.
- [[us-7172985-kemet-non-reducible-dielectric]] — Pinceloup & Beeson (KEMET) 2007; Ca-Sr zirconium titanate + silica-boron-Li glass enabling Class I BME C0G — KEMET's [[bme-c0g]] product line.
- [[us-7670981-kemet-c0g-bme]] — Randall et al. (KEMET) 2010; evolved C0G BME with composition-vs-thickness rule (Mn below 4.5 µm; Si/Ge above). Ten inventors including Ian Burn.
- [[us-8713770-kemet-flex-crack-voids]] — Prymak (KEMET) 2014; sacrificial-pattern voids in the green stack route flex cracks toward non-active regions; technical basis for FO-CAP / OpenMode.
- [[us-9336947-samsung-low-temp-sintering-dielectric]] — Lim et al. (SEMCO) 2016; B₂O₃-BaO sintering aid (0.1-2 mol%) drops BT densification window to 1050-1150 °C, enabling sub-µm dielectric layers without runaway grain growth.
- [[us-9799451-samsung-na-substituted-batio3]] — Park, Kim, Kim, Kim (SEMCO) 2017; Na partially substituted at the Ba site (x = 0.005-0.035) distorts lattice and suppresses V_O migration; alternative to RE doping for X5R/X7R/X8R.
- [[us-11222749-samsung-dy-nb-thin-layer]] — Kim, Baik, Kwon, Jo (SEMCO) 2022; Dy + Nb co-doping at 0.2-1.5 mol% per 100 mol Ti, with Nb segregating to grain boundaries; the chemistry behind sub-0.5 µm dielectric layers.

## Comparisons

- [[dielectric-class-comparison]] — Master table covering every commercially significant TCC code (Class I C0G/U2J/extended; Class II X5R/X7R/X8R/X8L/X0U/X9R; Class III Y5V/Z5U) with εr ranges, tolerances, T_op, aging, applications.

## Queries

- [[dc-bias-vs-tcc-relationship]] — How DC-bias and TCC derating relate: independent multiplicative factors (`f_T × f_V`) of the Zednicek formula; couples significantly near T_C, at high bias, and for Y5V.
- [[shrinkage-shape-dependence-batio3-vs-alumina]] — BaTiO₃ does not show the powder-shape-driven anisotropy that alumina does (Heunisch K_xy 1.9-12.7 vs BT ≈ 1); finished-MLCC anisotropy comes from lamination constraint, not green-tape powder shape.
- [[capacitance-simulation-from-recipe-and-geometry]] — Three-tier pipeline from recipe + geometry to predicted capacitance (Tier 1 geometric ±20 %; Tier 2 material-corrected ±10 %; Tier 3 SOVS-process-coupled ±5 %).
