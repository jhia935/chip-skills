---
title: "US 7,172,985 — Pinceloup & Beeson (KEMET) — Non-Reducible Ca-Sr Zirconium Titanate Dielectric (2007)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: medium
---

# US 7,172,985 — KEMET's BME C0G dielectric (Pinceloup & Beeson, 2007)

A 30-year update to the [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978 idea]]: a non-reducible dielectric that lets MLCC fire below 1300 °C in a reducing atmosphere with Ni electrodes, but built on a **Ca-Sr zirconium titanate** base instead of Ba-Ca titanate. This composition family is what underwrites [[bme-c0g|KEMET's Class I BME C0G product line]] — the only mainstream way to get C0G temperature stability without Pd or Ag-Pd electrodes.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 7,172,985 B2 |
| Title | "Dielectric Ceramic Capacitor Comprising Non-Reducible Dielectric" |
| Assignee | KEMET Electronics Corporation |
| Inventors | Pascal G. Pinceloup, James J. Beeson |
| Filed | 2005-06-07 |
| Granted | 2007-02-06 |

## What it claims

The dielectric composition has two parts:

**Primary component** (94–99.9 wt%) — a calcium-strontium zirconium titanate solid solution:

$$
[(\text{Ca}_{1-x}\text{Sr}_x)\text{O}]_m (\text{Zr}_{1-y}\text{Ti}_y)\text{O}_2
$$

This is a **Class I (paraelectric, near-linear ε_r)** base, distinct from Sakabe's ferroelectric Class II Ba-Ca titanate.

**Secondary glass-phase component** (0.1–5 wt%) — silica-boron-lithium alkaline-earth oxide glass that:
- Lowers the sintering temperature to < 1300 °C (Ni-compatible)
- Promotes liquid-phase sintering at the grain boundaries
- Tunes the resistivity / leakage behavior at the GB

## Why it matters

Class I (C0G / NP0) MLCC are traditionally **the last bastion of precious-metal electrode** MLCC — the BaTiO₃ chemistries that work for X5R/X7R BME don't deliver the temperature-stable paraelectric ε_r needed for C0G. The Ca-Sr zirconium titanate base sidesteps the Ba-Ti redox problem entirely because **there's no Ti to reduce** (or only Ti-poor compositions on the Zr-rich end of the solid solution).

The secondary glass component is the practical enabler: pure CaZrO₃ alone sinters at > 1500 °C, well above Ni's melting point (1453 °C) and well above what's practical for cofiring. The 0.1–5 wt% SiO₂-B₂O₃-Li₂O-MO glass drops the sintering window into the 1100–1250 °C range.

## Vendor positioning

KEMET's [[bme-c0g|BME C0G product family]] is one of the few commercially available Class I BME MLCC lines and is positioned as a direct competitor to Murata's GJM (high-Q RF) series. The fundamental Ca-Sr-Zr-Ti chemistry traces directly to this patent.

## Connection to the modern wiki

- [[bme-c0g]] — the product family this patent underpins
- [[sintering-aids-glass]] — discusses BBS / ZBS / PBS glass systems for low-T sintering
- [[us-4115493-murata-sakabe-1978-bme-foundational]] — predecessor; same redox-stability problem, different solution chemistry
- [[bme-sintering-atmosphere]] — the reducing PO₂ window this composition tolerates

## References

- Google Patents: [US 7,172,985 B2](https://patents.google.com/patent/US7172985B2/en)
- KEMET KEM_C1003_C0G_SMD product datasheet (commercial implementation)
