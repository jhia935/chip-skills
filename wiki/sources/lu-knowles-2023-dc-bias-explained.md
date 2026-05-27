---
title: "Lu (Knowles Capacitors) 2023 — The DC Bias Phenomenon Explained"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - lu-knowles-2023-dc-bias-explained.md
tags:
  - paper
status: complete
importance: medium
---

# Lu (Knowles Capacitors) 2023 — The DC Bias Phenomenon Explained

**Source**: Lu, V. (Feb 22, 2023). **The DC Bias Phenomenon Explained**. *Knowles Capacitors blog*.
[URL](https://blog.knowlescapacitors.com/blog/the-dc-bias-phenomenon-explained)

## Summary

A practitioner-oriented blog post by Knowles application engineering laying out the standard story of **how DC bias and temperature combine to limit effective capacitance** for an X7R high-voltage MLCC. Most directly useful: a **concrete numerical worked example** for an X7R 200 V part that shows the **worst-case multiplicative combination of bias and temperature derating** (+15 % / −30 % combined envelope).

This is the [[knowles-capacitors|Knowles]] / [[kemet|KEMET]]-adjacent application engineer's restatement of the standard model — useful both as a teaching reference and as a representative-vendor data point.

## Key Points — worked X7R 200 V example

- **Part**: 0.1 µF, 200 V_DC rated, X7R.
- **Construction**: 35 active dielectric layers × **1.8 mil fired thickness each** ≈ 45 µm per layer (≈ 4.4 V/µm at rated V).
- **Quoted field at rated V**: 111 V/mil = ~4.4 V/µm (consistent).
- **Voltage coefficient (VC) at rated V**: −15 % capacitance change.
- **Temperature coefficient (TCC)** (X7R envelope): ±15 % over −55…+125 °C.
- **Worst-case combined envelope**: +15 % to **−30 %** ΔC — i.e. the part can lose up to 30 % under simultaneous high T AND high V_DC.

The combined envelope is the **linear sum** of the two single-axis maxima, not a multiplicative compounding. For a Class II part where each effect is ~15 %, the multiplicative model `f_T × f_V` would give `0.85 × 0.85 = 0.72` — i.e., a maximum 28 % loss, very close to the additive sum. The two interpretations agree to ~2 % at this operating point because both are in the linear regime of small individual losses.

## Key Points — physical picture

> "When DC voltage is applied to the material in ambient temperature, spontaneous polarization is connected to the direction of the electric field from DC voltage, and the reversal of spontaneous polarization occurs."

This is a paraphrase of the [[ferroelectric-domain-wall|domain-wall pinning]] mechanism — DC bias preferentially aligns the spontaneous polarization with itself, and the small-signal AC measurement can no longer reverse a polarization that's been pinned by DC. Consistent with [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe]] and the standard ferroelectric model of [[dc-bias-derating]].

## Key Points — temperature × DC bias interaction

> "Capacitance loss will be even greater at certain applied temperatures and DC voltages."

The post doesn't publish a numerical T × V_DC grid — same gap as the rest of the vendor-blog literature. Refers readers to vendor simulation tools for combined-condition data. Consistent with the [[empirical-c-t-vdc-academic-measurements|wiki's empirical-2D-surface]] observation: no public 2D surface for a commercial part exists in the academic literature; vendor SimSurfing remains the only path.

## Implications

1. **Linear-sum vs multiplicative envelopes agree at small loss**: for parts where each individual derating is ≤ ~15 %, the linear-sum estimate and the multiplicative model differ by < 5 %. For larger derating (e.g., 0805 X5R at rated V losing 60 %), the multiplicative model `0.85 × 0.40 = 0.34` predicts much worse loss than the linear sum `1 − 0.15 − 0.60 = 0.25` — a 9-percentage-point divergence. **The chip-sim should use the multiplicative form for high-bias parts**.
2. **High-voltage X7R parts** (200–630 V rated) like the Knowles example sit in the comfortable linear regime where the simple linear-sum estimate is fine. Most chip-sim use cases will be high-CV low-voltage parts where the multiplicative form is needed.

## Entities Mentioned

- [[victor-lu]] — author *(stub)*
- [[knowles-capacitors]] — publisher *(stub)*

## Concepts Discussed

- [[dc-bias-derating]] — main topic
- [[temperature-coefficient-of-capacitance]] — combined with VCC
- [[tcc-dc-bias-interaction]] — implicit
- [[ferroelectric-domain-wall]] — mechanism
- [[batio3]] — material

## Notable Quotes

> "Combined maximum effect: +15 % to −30 % ΔC."

> "Spontaneous polarization is connected to the direction of the electric field from DC voltage, and the reversal of spontaneous polarization occurs."

## References

_Knowles Capacitors blog. Publicly accessible._
