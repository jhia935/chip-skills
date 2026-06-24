---
title: TDK Corporation
type: entity
created: 2026-05-19
updated: 2026-06-24
sources: []
tags:
  - company
status: complete
importance: high
---

# TDK Corporation

Japanese passive-component manufacturer headquartered in Tokyo. **One of the three Tier-1 global MLCC vendors** alongside [[murata]] (the volume leader) and [[samsung-electro-mechanics]]. TDK's strength is in automotive and industrial MLCCs, particularly at the higher-voltage and higher-reliability tiers where their AEC-Q200-qualified CGA/CGJ lines compete directly with Murata GCM.

Founded 1935 (originally TDK Corporation, originally Tokyo Denki Kagaku Kogyo). Acquired EPCOS in 2009, expanding into capacitors and inductors for European automotive and industrial markets.

## MLCC product portfolio

### General purpose

- **C-series** — workhorse commercial MLCC. Case codes use the **metric** size (C1005, C1608, C2012, C3216, C3225, C4532, C5750 → EIA 0402, 0603, 0805, 1206, 1210, 1812, 2220). Spans C0G, X5R, X6S, X7R, X7S, X7T, X8L, X8R, Y5V, plus NP0 and U2J Class I sub-codes.
- **C1005 / C1608 / C2012 thin-layer** — high-CV variants in 0402 / 0603 / 0805.

### Automotive (AEC-Q200)

- **CGA** — automotive-qualified equivalent of the C-series. Same field grammar as C; the `CGA` prefix triggers the AEC-Q200 spec book (tighter thermal cycling, vibration, longevity).
- **CGJ** — high-reliability. Single-digit size code (CGJ2 = 0402, CGJ3 = 0603, CGJ4 = 0805) — different field grammar from C/CGA. Not yet covered by the [mlcc-part skill](../../.claude/skills/mlcc-part/SKILL.md) decoder.

### Specialty

- **CKG** — open-mode design for flex-crack mitigation (analogous to [[us-8713770-kemet-flex-crack-voids|KEMET's FO-CAP]]). Single-digit size code.
- **CNA** — soft-termination / flexible-termination for board-flex protection.
- **CeraLink** — **anti-ferroelectric capacitors** for high-current power electronics. PbLaZrTi (PLZT)-based — NOT BaTiO₃-family. Sub-MHz switching DC-link replacement for electrolytic caps. From EPCOS heritage.

## Part-number format

Documented in [the skill's vendor-formats reference](../../.claude/skills/mlcc-part/references/vendor-formats.md). The C-series uses the metric size code, spells the dielectric class **literally** (X7R, not the 2-char code Murata/SEMCO use), and a 2-char voltage code (1H = 50 V, 2A = 100 V, etc).

Worked example: **`C1005X5R0J106M050BC`** = C-series / 0402 / X5R / 6.3 V / 10 µF / ±20 % / 0.85 mm thick.

## Catalog references

- "MULTILAYER CERAMIC CHIP CAPACITORS" commercial general catalog (May 2025) — full lineup matrix.
- TDK MLCC part-number description sheet — official decoder for the C/CGA family naming.
- Mid-voltage catalog — 100 V to 1000 V parts.
- Open-mode and soft-termination catalogs — flex-crack mitigation lines.

## Patent presence

TDK's MLCC patent portfolio is large but more concentrated in Japanese filings than US filings, which makes Google Patents searches return relatively few TDK results compared to KEMET or Samsung. Verified-real TDK patents in the wiki:

> (none ingested yet — TDK patents have been harder to surface via the search tools used so far; this is a known coverage gap in the wiki's patent collection.)

The adjacent BME chemistry patents the wiki does have — [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978]], [[us-6043974-philips-dy-stabilizer|Philips Dy stabilizer]], [[us-7670981-kemet-c0g-bme|KEMET C0G BME]], [[us-9336947-samsung-low-temp-sintering-dielectric|Samsung low-T sintering]], [[us-11222749-samsung-dy-nb-thin-layer|Samsung Dy+Nb thin-layer]] — describe the chemistries that TDK also uses in its production MLCC, by virtue of the industry-wide convergence on Ca-doped + RE-doped + Mn-co-doped BaTiO₃.

## See also

- [[bme-vs-pme]]
- [[case-size-geometry]]
- [[ni-batio3-cosintering-interface]]
- [[layer-thickness-and-metal-ceramic-ratio]]
- [mlcc-part skill](../../.claude/skills/mlcc-part/SKILL.md) — decoder for TDK C-series part numbers
