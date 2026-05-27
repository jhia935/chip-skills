---
title: "US 9,799,451 — Park, Kim, Kim, Kim (Samsung) — Na-Substituted BaTiO₃ for X5R/X7R/X8R (2017)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: medium
---

# US 9,799,451 — Samsung's Na-substituted BaTiO₃ (2017)

A different attack on the same fundamental problem ([[us-6043974-philips-dy-stabilizer|DC-bias degradation in BME MLCC]]): instead of adding rare-earth dopants at the A-site, **partially substitute the A-site Ba²⁺ with a smaller alkali cation — Na⁺**. The lattice distortion from the size mismatch suppresses oxygen vacancy migration, improving DC-field robustness without diluting the dielectric with rare-earth dopants.

This is the chemistry behind some of Samsung Electro-Mechanics' high-V industrial X7R lines. It targets X5R, X7R, **and X8R** characteristics from a single base formulation by adjusting stoichiometry within the claimed window.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 9,799,451 B2 |
| Title | "Dielectric composition and multilayer ceramic capacitor containing the same" |
| Assignee | Samsung Electro-Mechanics Co., Ltd. |
| Inventors | Jae Sung Park, Jin Seong Kim, Doo Young Kim, Chang Hoon Kim |
| Filed | 2016-07-05 |
| Granted | 2017-10-24 |

## What it claims

The dielectric main-ingredient composition (Claim 1):

$$
(\text{Ba}_{1-x}\text{Na}_x)\text{TiO}_3
$$

with constraints:
- **x range**: 0.005 ≤ x ≤ 0.035 (i.e., 0.5%–3.5% Na substitution at the Ba site)
- **A/B ratio**: 0.994 < (Ba₁₋ₓNaₓ)/Ti < 1.003 (near stoichiometric, slightly Ti-rich allowed)

Variants in the dependent claims swap Na for Ca, or combine Na + Ca.

## The mechanism

Na⁺ has ionic radius 1.39 Å (CN-12), smaller than Ba²⁺ at 1.61 Å. Substituting Na for Ba at the A-site introduces:

1. **Lattice distortion** — the smaller cation pulls neighbouring oxygens inward, tilting the perovskite octahedra
2. **Charge mismatch** — Na⁺ replacing Ba²⁺ means a +1 charge deficit per substitution; the lattice compensates by forming oxygen vacancies or adjusting the Ti⁴⁺/Ti³⁺ ratio
3. **Suppressed oxygen vacancy migration** — the distorted lattice presents higher barriers to V_O hopping, which is the dominant degradation path under DC bias at elevated T

The patent emphasizes that this is achievable **without nonstoichiometric Ba/Ti ratios** — earlier approaches relied on Ba-excess (m > 1.0, per the [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978]] formula). Na substitution decouples the reliability gain from the stoichiometry knob.

## Why this exists alongside the Dy + Nb chemistry

SEMCO operates parallel chemistry tracks:
- **Dy + Nb co-doping** ([[us-11222749-samsung-dy-nb-thin-layer|US 11,222,749]]) for ultra-thin (≤ 0.4 µm) high-CV X5R/X7R
- **Na substitution** (this patent) for higher-voltage / X8R industrial lines where the dielectric is thicker but the DC-bias load is high

The cost picture differs too — Dy is an expensive rare earth; Na is dirt-cheap. The Na-substitution chemistry is the more cost-friendly route when the thin-layer reliability margin isn't critical.

## Connection to the modern wiki

- [[us-6043974-philips-dy-stabilizer]] — rival approach using A-site Dy as the stabilizer
- [[us-11222749-samsung-dy-nb-thin-layer]] — same SEMCO program's sibling patent for thin-layer parts
- [[dopant-site-occupancy-batio3]] — A-site cation substitution chemistry framework
- [[oxygen-vacancy-migration]] — the degradation mechanism this composition addresses
- [[bme-reliability-model]] — Liu framework for V_O-driven IR degradation
- [[x8r-x8l-x9r-high-temperature-dielectrics]] — X8R is part of this patent's claimed scope; the Na substitution helps with the higher temperature spec
- [[samsung-electro-mechanics]] — assignee

## References

- Google Patents: [US 9,799,451 B2](https://patents.google.com/patent/US9799451B2/en)
