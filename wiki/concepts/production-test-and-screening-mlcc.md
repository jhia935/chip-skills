---
title: Production Test, Sort, Screening & Packaging of MLCCs
type: concept
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/80-test-sort-and-packaging.md
tags:
  - paper
status: complete
importance: high
---

# Production Test, Sort, Screening & Packaging

The end of the line: every plated chip is measured, sorted into tolerance bins or rejected, optionally screened further for high-reliability grades, and taped onto reels. Steps 15–16 of the [[mlcc-manufacturing-process|process map]]. Qualification specs (what a *part family* must pass) are covered on [[aec-q200-rev-e-2023]], [[mil-prf-123-spec]], [[mil-prf-32535-spec]], and [[gsfc-mlcc-space-specs]]. This page covers the *per-part production flow*.

## Flow by grade

Murata's published flow: casting → cutting → printing → stacking/pressing → firing → termination → termination firing → plating → **sorting → outgoing inspection** (automotive grade ends here). Space grade adds hot-solder dip, C-SAM, burn-in, a second sort, Group A inspection, and periodic QCI [murata-space-2019].

## 100% electrical sort

Murata states that capacitance, impedance, and ESR are measured on **100% of parts even in mass production**, at **>10,000 units/min**. Defect modes and trends in characteristic variation are fed back to upstream processes [murata-meas-web].

A representative commercial handler, the ESI Allegro XP (rotary turret, pulse-actuated contacts) [esi-allegro-xp-2020]:

| Item | Spec |
|---|---|
| Throughput | up to **16,666 parts/min (1.0 M/h)**, 0603–1210 |
| Stations | up to 25: C/DF, IR pre-charge, IR pre-soak, IR/current, flash |
| C/DF frequencies | 120 Hz / 1 kHz / 1 MHz |
| Flash / IR source | 2–600 V (1000 V option); charge current 2–250 mA; measures 1 pA – 2 mA |
| Bins | up to 7 tolerance + 7 reject + 1 retest |

Search summaries also mention ~20,000 parts/min for small chips down to 0201, and an older 5+3+1 bin layout. Both are unverified.

### Measurement conditions (Class II)

- ≤10 µF: 1 kHz ±10%, 1.0 ±0.2 Vrms. >10 µF: 120 Hz ±20%, 0.5 ±0.2 Vrms (EIA-198-1F / JIS C 5101, via TDK FAQ, *search summary only*) [tdk-faq-0008].
- High-C parts load the meter source. Without automatic level control the applied voltage sags and C reads low (one example: 10.08 µF with ALC vs 7.24 µF without) [tdk-faq-0008] (unverified).
- **De-aging** for reference measurements: 150 °C (+0/−10) for 1 h, then a 24 ±2 h rest. Class II only [digikey-mlcc-meas]. See [[aging-class-2]].

> [!note] Inline-sort vs de-aged value
> A handler measures each chip at some point on its [[aging-class-2|aging curve]], counted from the last excursion above T_C (firing, termination firing, plating bake). No source explains how factories reconcile that reading with the spec's de-aged value. This is a plausible systematic bias in sort bins and remains an open question.

Class I (1 MHz) conditions and production IR/flash voltage and dwell times were **not confirmed** in any read source.

## High-reliability screens

| Screen | Conditions | Source |
|---|---|---|
| Voltage conditioning / burn-in (NEPP COTS) | 2×V_R, 125 °C, **168 / 96 / 48 h** (Level 1/2/3) | [nepp-guidelines-2012] |
| BI pass criterion | end current < 10 nA or < 150% of the 1 h value; lot PDA 10 / 15 / 20% | [nepp-guidelines-2012] |
| MIL burn-in | M123 and M32535: 168–264 h at 125 °C, 2×V_R; M55681: 100 h at T_max, 2×V_R | [nepp-crack-teverovsky] |
| IR screen | at V_R after 2.0 ±0.1 min; a 3σ out-of-family rule works because lot leakage is tight | [nepp-guidelines-2012] |
| DWV (flash) | 2.5×V_R | [nepp-guidelines-2012] |
| C-SAM | 100% for MIL-PRF-123; screen for M32535 T-case ≥0805 | [nepp-crack-teverovsky] |
| Optical inspection | dimensions, shape, color unevenness; down to 0.4 × 0.2 mm parts | [murata-meas-web] |

The model in [nepp-guidelines-2012] equates 96 h at 125 °C and 2×V_R to more than 1000 years at 50 °C and 0.5×V_R ([[prokopowicz-vaskas-equation|P-V model]], n = 4–9, Ea 1–1.8 eV). See [[bme-reliability-model]].

## What screens miss (escape modes)

- **Cracks.** Capacitance is the least sensitive parameter to cracks; a crack raises DF only by ~15%. Short-time IR detects cracks poorly, and raising temperature or voltage does not help. Long electrification (≥1000 s) and current monitoring during BI work far better [nepp-crack-teverovsky].
- **DWV is weak.** Low-voltage MLCCs break down at **10–100×V_R**, so a 2.5×V_R flash does not stress defects [nepp-guidelines-2012]. Only ~20% of grossly defective parts failed DWV. In 19 of 30 damaged lots, the DWV failure probability was below 1% [nepp-crack-teverovsky].
- **Cracked parts can pass BI** without shorting, unless current is monitored [nepp-crack-teverovsky].
- **Post-solder cracking** is now the majority failure source, and no factory screen addresses it [nepp-crack-teverovsky]. See [[failure-modes-mlcc]] and [[mlcc-failure-analysis-techniques]].
- High-voltage BI raises infant-mortality failures. 3 of 8 COTS+ lots had BI failures [nepp-etw-2022].

## Tape & reel

8 mm tape per EIA-481: **paper** for EIA 0603 and smaller or thin chips, **embossed plastic** for thicker or larger chips. Reels are 5", 7", or 13" [johanson-tape-reel].

| Case | Qty/reel |
|---|---|
| 01005 | 20,000 / 30,000 |
| 0201 | 15,000 |
| 0402 | 10,000 |
| 0603 | 4,000 or 10,000 |
| 0805 | 4,000 / 10,000 |

(Values from [johanson-tape-reel]. Pocket pitch was not labelled on the page read.)

## Open questions
- Production IR soak and flash dwell per part; AOI defect classes and escape rates; PAT for automotive lines. No vendor source was found for any of these.

## Cross-references
- [[insulation-resistance]] · [[dielectric-breakdown]] · [[aging-class-2]] · [[weibull-distribution]]
- [[termination-and-plating]] (upstream) · [[failure-modes-mlcc]] · [[mlcc-failure-analysis-techniques]]

## References
- [[mlcc-test-sort-packaging-research-notes]]
- [[nasa-cracking-low-voltage-mlcc]]
