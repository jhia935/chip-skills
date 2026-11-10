---
title: AC Voltage Coefficient of Capacitance (ACC / F_ACV)
type: concept
created: 2026-05-27
updated: 2026-11-10
sources:
  - herb-ma-2020-2022-mlcc-ac-dc-aging.md
  - electrical-integrity-dce11-200.md
  - kalbitz-wurth-anp114-mlcc-voltage-frequency.md
  - covaci-gontean-2022-singing-mlcc.md
  - epci-high-cv-mlcc-bias-aging.md
tags:
  - paper
status: complete
importance: high
---

# AC Voltage Coefficient of Capacitance (ACC / F_ACV)

The **dependence of effective MLCC capacitance on the amplitude of the small-signal AC excitation** used to probe (or operate) the part. The third derating factor in the [[epci-high-cv-mlcc-bias-aging|Zednicek multiplicative formula]] alongside [[temperature-coefficient-of-capacitance|TCC]] and [[dc-bias-derating|DC-bias derating]]:

$$
C_\text{actual} \;=\; C_\text{rated} \cdot f_T(T) \cdot f_V(V_\text{DC}) \cdot f_\text{AC}(V_\text{AC}) \cdot f_\text{age}(t)
$$

But the cleanly-separable form is **the weakest** for `f_AC` — it has the strongest known cross-couplings with both `V_DC` and `T`. See [[tcc-ac-coupling]] for the TCC × AC coupling story.

## Standard measurement conditions

Per **EIA-198-1F / JIS C 5101**: the canonical small-signal test condition is `V_AC = 0.5 V_rms` at `f = 1 kHz`, **zero DC bias**, room temperature. Some legacy datasheets use `1 V_rms / 1 kHz` instead.

The standard condition matters because **the entire published TCC envelope and DC-bias curve are measured at this AC level**. Operating the part at a different AC level changes both the nominal capacitance AND the apparent TCC/DC-bias curves.

## Non-monotonic shape of `f_AC`

The defining characteristic of ACC is that **capacitance is non-monotonic in AC amplitude**:

| AC amplitude | Behavior |
|---|---|
| ~ 0 mV_rms (DC-only) | C = local `dq/dV` at the operating point (lowest measured value) |
| 10 mV_rms | ~ 4 % below standard-condition C ([[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020]]) |
| 50 mV_rms | C starts to rise; entering the [[electrical-integrity-dce11-200|Novak 2011]] sensitive regime |
| 100–500 mV_rms | C rises with AC up to a maximum; this is the "standard condition" plateau |
| > 0.5–1 V_rms | C decreases as the AC waveform sweeps across the saturating tails of the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|bell-shaped C(V) curve]] |

The peak position depends on the part's `V_C` (coercive voltage) and the dielectric class — typically 100–500 mV_rms for X5R/X7R, lower for Y5V, much lower (~mV) for relaxor compositions.

## The AC × DC interaction (non-trivial coupling)

This is where `f_AC` and `f_V` are emphatically **NOT separable**. Per [[electrical-integrity-dce11-200|Novak 2011]] and [[herb-ma-2020-2022-mlcc-ac-dc-aging|Ma 2020/2022]]:

| DC bias | AC sensitivity |
|---|---|
| 0 V | **Maximum** — varying AC can swing C by ~30 % |
| 1–3 V (X5R 6.3 V part) | Moderate — the 4 % example case |
| ≥ 50 % of rated V (already > 50 % bias loss) | **Minimal** — dipoles are pinned, AC has nothing left to move |

Mechanistically: AC sensitivity comes from the [[ferroelectric-domain-wall|domain-wall]] contribution to ε_r ([[rayleigh-analysis|the Rayleigh α' term]]). DC bias **pins those domain walls**, so it removes the source of AC sensitivity at the same time as it reduces nominal capacitance. The two effects are negatively correlated.

## Three mechanisms contributing to `f_AC`

1. **Rayleigh / domain-wall nonlinearity** ([[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023]], [[rayleigh-analysis]])
   - ε'(E_AC) = ε'_init + α' · E_AC (sub-coercive limit)
   - α' depends on the population of mobile, irreversibly-pinned domain walls
   - α' → 0 above T_C (paraelectric, no domains)
   - DC bias suppresses α' by pinning walls

2. **Bell-shaped C(V) integration** ([[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz ANP114]])
   - Measured C with finite AC = average of C(V) over the swept range
   - For a bell-shaped C(V) peaked at V_C, the average sweep across the peak rises until you start sampling the saturating wings
   - Pure dielectric/electrical origin

3. **Piezoelectric + electrostrictive strain coupling** ([[covaci-gontean-2022-singing-mlcc|Covaci & Gontean 2022]])
   - Strain `s_z = d_33 E + M_33 E²`
   - Drives mechanical vibration that feeds back into measured ε_r
   - Same root cause as the "singing capacitor" acoustic emission

All three mechanisms peak below T_C and **collapse above T_C** — converging the AC-dependence and AC-independence regimes in the paraelectric phase.

## What `f_AC` looks like quantitatively

Approximate values from the cross-paper consensus (X5R/X7R reference part, room T, no DC bias):

| V_AC / V_rms | f_AC (= C / C_nominal) |
|---|---|
| 0.001 (small-signal DC-like) | 0.93–0.96 |
| 0.01 (10 mV) | 0.95–0.97 |
| 0.05 (50 mV) | 0.97–0.99 |
| 0.1 (100 mV) | 0.99–1.01 |
| 0.5 (500 mV; standard) | **1.00** (definition) |
| 1.0 (1 V) | ~ 1.00–1.05 (vendor- and class-dependent) |
| 2.0+ | < 1.0 again; high-AC fall-off |

For Y5V the curve is **much** more pronounced (swings of 20–30 % across this range). For C0G ([[c0g-npo-dielectric|paraelectric Class I]]) `f_AC ≈ 1` for all relevant amplitudes — no domain walls to move.

## Implications for the chip-sim simulator

The chip-sim's current model uses only `f_T × f_V × f_age` (assumes `f_AC = 1`). The Tier 2 simulator should:

1. **Add a `V_AC` input** to the capacitance-prediction call. Default 0.5 V_rms (= the standard measurement condition).
2. **Apply class-specific `f_AC` look-ups** for low-AC operation. Conservative default: `f_AC = 0.95` for X5R/X7R if user does not specify AC level and the application is high-frequency decoupling (where AC swings can be < 10 mV across a single cap).
3. **For high-fidelity Tier 3**, integrate the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz bell-shaped C(V)]] over the AC waveform. The Wurth analytic form makes this fast.
4. **Flag AC × DC coupling** with higher uncertainty band (±5 %) when AC > 50 mV_rms AND DC bias < 30 % of rated.

## Cross-references

- [[temperature-coefficient-of-capacitance]] — sibling derating factor; coupled to AC via Rayleigh α'(T)
- [[dc-bias-derating]] — sibling derating factor; AC sensitivity collapses at high DC
- [[tcc-ac-coupling]] — the dedicated synthesis page for AC × TCC interaction
- [[ac-dc-capacitance-mapping]] — the full joint `C(V_AC, V_DC)` surface; this page's AC axis at fixed V_DC = 0
- [[three-capacitance-definitions]] — local vs total vs large-signal C; resolves "what does measured C mean" at finite AC
- [[ferroelectric-domain-wall]] — the underlying object whose mobility drives all three contributing mechanisms
- [[rayleigh-analysis]] — small-signal decomposition supporting `f_AC`
- [[electrostriction]] — strain-mechanism contributor
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — the SPICE-friendly analytic model
- [[epci-high-cv-mlcc-bias-aging]] — Zednicek's multiplicative formula puts `f_AC` in context
- [[vendor-spice-models]] — which vendor tools expose `V_AC` as an input variable

## References

- [[herb-ma-2020-2022-mlcc-ac-dc-aging]] — quantitative SEMCO writeup; ~30 % at zero DC bias claim
- [[electrical-integrity-dce11-200]] — Novak DesignCon 2011; sensitivity-vs-DC and 50 mV_rms threshold
- [[kalbitz-wurth-anp114-mlcc-voltage-frequency]] — Würth ANP114; bell-shaped C(V) model
- [[covaci-gontean-2022-singing-mlcc]] — strain-mechanism review
- [[epci-high-cv-mlcc-bias-aging]] — Zednicek 2019; multiplicative formula
