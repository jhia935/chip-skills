---
title: "Herb Ma (SEMCO) 2020–2022 — Diagnosing Class II MLCC Effective Capacitance and Aging Under DC Bias"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - herb-ma-2020-2022-mlcc-ac-dc-aging.md
tags:
  - paper
status: complete
importance: high
---

# Herb Te-Jen Ma (SEMCO) 2020 / 2022 — Diagnosing Class II MLCC Effective Capacitance and Aging Under DC Bias

**Sources**: Two closely-related Samsung Electro-Mechanics application notes by Herb Te-Jen Ma:

- **Ma, H. T.-J.** (Jul 2020). *Diagnosing Class II MLCC Effective Capacitance and Aging Under DC Bias*. **Microwaves & RF**. [URL](https://www.mwrf.com/technologies/components/article/21135736/diagnosing-class-ii-mlcc-effective-capacitance-and-aging-under-dc-bias) (also Electronic Design 2020).
- **Ma, H. T.-J.** (Jan 2022). *Impact of DC Bias to MLCC Class II DC Effective Capacitance and Aging*. **EPCI / passive-components.eu**. [URL](https://passive-components.eu/impact-of-dc-bias-to-mlcc-class-ii-dc-effective-capacitance-and-aging/)

Same author, two venues, overlapping content. The 2022 EPCI version expands the DC × aging interaction.

## Summary

Direct industry-side counterpart to the [[epci-high-cv-mlcc-bias-aging|Zednicek EPCI synthesis]] — a [[samsung-electro-mechanics|SEMCO]] application engineer's quantitative writeup of how AC voltage level, DC bias, and aging interact to set the **effective capacitance** of a Class II MLCC. The article's most valuable contribution: it **quantifies the AC × DC interaction** in a way that the rest of the industry literature only describes qualitatively.

## Key Points — standard measurement conditions

- **EIA-198-1F and JIS C 5101** standard test: **0.5 V_rms (= 500 mV_rms) AC at 1 kHz**, room temperature, no DC bias.
- **Alternative (Murata legacy)**: 1 V_rms / 1 kHz / room T / no DC bias.
- Datasheets sometimes quote at "0.5 V_rms" without saying so explicitly — important for the simulator.

## Key Points — example reference part: 1 µF 6.3 V X5R

- **Zero bias, 0.5 V_rms / 1 kHz**: 1.00 µF (nominal).
- **+3 V DC bias** (= 47 % of rated V), same AC: **0.36 µF** — a **64 % drop** from nominal.
- **+3 V DC bias, reduce AC from 500 mV_rms to 10 mV_rms**: **0.32 µF** — an **additional 4 % loss** below the standard-condition number.

This 4 % extra loss is **invisible in standard-condition characterization** but is exactly what a real circuit sees if its small-signal swing across the capacitor is much less than 0.5 V_rms (typical for high-frequency decoupling).

## Key Points — non-monotonic AC dependence

The relationship between measured C and AC amplitude is **non-monotonic**:

- **0 mV_rms (DC only)**: C is the local `dq/dV` slope at the operating point.
- **Rising AC** (up to ~50–500 mV_rms): C **increases** because the AC sweeps over more of the bell-shaped peak per cycle.
- **High AC** (above ~ a few hundred mV_rms): C **decreases** because the AC waveform starts to span the saturating tails on both sides of the peak — the dipole motion becomes amplitude-limited.

This is consistent with [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz's bell-shaped model]] and with [[electrical-integrity-dce11-200|Novak's measurements]] showing AC sensitivity largest at zero DC bias.

## Key Points — AC × DC interaction

The strongest claim in the 2020/2022 articles, and the one that breaks the naive multiplicative model:

| DC bias level | AC dependency on effective C |
|---|---|
| 0 V | **Strongest** — AC variation can swing C by up to **30 %** |
| Moderate DC (1–3 V) | Significant — the 4 % loss example above is in this regime |
| Heavy DC (> 50 % of rated, causing > 50 % capacitance loss) | **Negligible** — the dipoles are already pinned, AC has nothing to move |

> "The level of DC bias also impacts the effect of AC voltage dependency on effective capacitance […] when the DC bias already reduces capacitance by over 50 %, the additional loss from AC signals becomes negligible." (Ma 2022, paraphrased from extracted summary)

This means **f_AC and f_V are NOT independent** in the naive sense — at low DC the bias-loss is more sensitive to AC than the simple multiplicative model would predict. The first-order Zednicek formula `C = C_rated · f_T · f_V · f_AC · f_age` is correct only when each factor's regime is well-separated. For a circuit operating at low DC bias with significant AC swing, a 2D `(V_DC, V_AC)` lookup or the [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz `C(V)` integration over the AC cycle]] is more accurate.

## Key Points — aging × DC bias coupling

The 2022 article extends the 2020 results to time-aging under bias. Headline:

> "The effective capacitance of MLCC aging under DC bias drops below the linear sum [of separate DC and aging effects]."

i.e., **DC bias accelerates aging-style dipole pinning**, so the total loss is super-additive. Page [[dc-bias-aging]] already covers this; Ma 2022 provides the numerical illustration on the 1 µF X5R reference part.

## Implications for AC dependency of the TCC curve

The Ma articles don't publish a TCC × AC 2D map directly, but combining their findings with [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023's]] α'(T) data gives the picture:

- **At T < T_C** (typical operating range for X5R/X7R): TCC curve depends on AC level — the same `1 µF` part measured at 10 mV_rms vs 500 mV_rms looks like two different parts with the same dielectric letter.
- **At T → T_C**: AC dependence shrinks because α' shrinks. Different-AC TCC curves converge.
- **At T > T_C**: TCC curves at all AC levels coincide (no domains to move).

So **the published TCC envelope (X5R = ±15 %, etc.) is only accurate at the measurement-standard AC level**. A different operating AC level can push the part outside its envelope, especially near room temperature where α' is largest.

## Entities Mentioned

- [[herb-te-jen-ma]] — author *(stub)*
- [[samsung-electro-mechanics]] — author's employer

## Concepts Discussed

- [[ac-voltage-coefficient-mlcc]] — central topic
- [[dc-bias-derating]] — interacts with AC dependency
- [[tcc-ac-coupling]] — implied; not explicitly published
- [[dc-bias-aging]] — quantified for the 1 µF X5R reference
- [[ferroelectric-domain-wall]] — underlying mechanism
- [[epci-high-cv-mlcc-bias-aging]] — sibling Zednicek synthesis
- [[temperature-coefficient-of-capacitance]] — modulated by AC level

## Notable Quotes

> "The standard signal condition for DC bias measurement is 500 mV_rms at 1 kHz."

> "If the AC level in the standard measurement condition is reduced from 500 mV_rms to 10 mV_rms while maintaining the same 1-kHz frequency and 3-V DC biasing, the effective capacitance will further drop to 0.32 µF, an additional 4 % reduction."

> "When the DC bias is minimal, AC voltage dependency becomes much more prominent and the effective capacitance may drop as much as 30 %."

## References

_Microwaves & RF (July 2020) and EPCI / passive-components.eu (January 2022) — both publicly accessible._
