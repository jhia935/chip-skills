---
title: "US 7,670,981 — Randall et al. (KEMET) — C0G Multi-Layered Ceramic Capacitor (2010)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: medium
---

# US 7,670,981 — KEMET's evolved C0G BME formulation (Randall et al., 2010)

A second-generation evolution of [[us-7172985-kemet-non-reducible-dielectric|KEMET's 2007 Ca-Sr zirconium titanate dielectric]] with a key new design rule: **the dopant chemistry depends on the dielectric layer thickness**. Above 4.5 µm, Group III/IV oxide additives (Si, Ge) optimize the formulation; below 4.5 µm, transition-metal oxides (especially Mn) take over. This is the patent behind KEMET's [[bme-c0g|Class I BME C0G product line]] in its modern, thin-layer form.

Ten inventors including Mike Randall, Pascal Pinceloup, Abhijit Gurav, James Beeson — the KEMET dielectric R&D team plus, notably, **Ian Burn**, the long-time MLCC dielectric R&D leader (originally at Philips, Erie, then KEMET).

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 7,670,981 B2 |
| Title | "C0G multi-layered ceramic capacitor" |
| Assignee | KEMET Electronics Corporation |
| Inventors | Mike Randall, Corey Antoniades, Daniel Barber, Xilin Xu, James Beeson, Pascal Pinceloup, Abhijit Gurav, Thomas Poole, Azizuddin Tajuddin, **Ian Burn** |
| Filed | 2008-10-24 |
| Granted | 2010-03-02 |

## What it claims

The composition (Claim 1, method form):

$$
\{[(\text{CaO})_t(\text{SrO})_{1-t}]_m[(\text{ZrO}_2)_v(\text{TiO}_2)_{1-v}]\}_{1-s-x}\,A_s\,E_x
$$

- Primary lattice: Ca/Sr zirconium titanate (same backbone as the 2007 patent)
- `A` = transition-metal oxide dopants (Mn, Co, Ni, …)
- `E` = Group III/IV oxide dopants (Si, Ge, B, …)
- `s, x` ranges define the dopant loadings

**Process steps** (also claimed):
1. Mill precursor materials to **sub-µm size**
2. Combine with transition-metal oxide and Si/Ge in precise ratios
3. Tape-cast, screen-print Ni electrodes, laminate
4. **Fire in reducing atmosphere at 1200–1350 °C**
5. Add terminations

## The key composition-vs-thickness rule

For dielectric thickness > 4.5 µm: **Group III/IV oxides (Si, Ge) dominate the optimisation**. They form a low-melting glass phase at grain boundaries, lower the sintering temperature, improve density at modest temperatures.

For dielectric thickness ≤ 4.5 µm: **transition-metal oxides (notably Mn) take over**. The glass-phase route is no longer optimal at sub-µm grain sizes because the glass percolates and reduces breakdown strength. Mn at the B-site stabilizes the defect chemistry without diluting the BT.

This thickness-dependent dopant strategy is a real engineering insight — it explains why high-volumetric-efficiency thin-layer C0G parts from KEMET use a different chemistry under the hood than the legacy thick-layer parts, even though both are labelled "C0G".

## Why this evolved from the 2007 patent

The [[us-7172985-kemet-non-reducible-dielectric|2007 patent]] established the Ca-Sr-Zr-Ti base + Si-B-Li-MO glass. Three years of production experience surfaced limitations:
- At ≤ 4.5 µm, the glass-phase fraction (≥ 0.1 wt%) was too high relative to the dielectric volume; ε_r dropped.
- The glass-phase composition spec (0.1–5 wt%) didn't optimize independently for thin vs thick.
- Mn doping had emerged from research as the better thin-layer answer.

The 2010 patent splits the dopant strategy by thickness — and that's how KEMET ships modern C0G BME parts today.

## Connection to the modern wiki

- [[bme-c0g]] — the product family this evolved-formulation patent underpins
- [[us-7172985-kemet-non-reducible-dielectric]] — the 2007 predecessor; same base chemistry, simpler dopant strategy
- [[layer-thickness-and-metal-ceramic-ratio]] — the simulator's framework for thickness-dependent behavior
- [[sintering-aids-glass]] — the BBS/ZBS glass family this uses for thick-layer parts
- [[grain-growth-dopant-pinning]] — Mn as a grain-growth suppressor in the thin-layer regime
- [[kemet]] — assignee entity page

## References

- Google Patents: [US 7,670,981 B2](https://patents.google.com/patent/US7670981B2/en)
- Industry context: Ian Burn's papers on Ag-Pd to Ni transition in the 1990s
