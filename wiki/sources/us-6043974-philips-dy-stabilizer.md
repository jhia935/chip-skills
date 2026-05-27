---
title: "US 6,043,974 — Chen, Lee, Tseng (Philips → Phycomp) — Dy-Stabilized Ni-Electrode BaTiO₃ (2000)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: medium
---

# US 6,043,974 — Philips/Phycomp: Dy as DC-field-degradation stabilizer (2000)

A non-Murata, non-Samsung patent that crystallises one of the most important dopant findings in MLCC history: **a small amount of Dy at the Ba site dramatically suppresses DC-field-induced insulation-resistance degradation** at elevated temperatures. The patent ties Dy substitution to the Mn-charge-stabilisation chemistry, giving a coherent picture for why Dy ended up as the workhorse rare-earth dopant in commercial X7R and X5R BME MLCC.

Although the assignee path runs Philips → Phycomp Holding (Yageo's predecessor on the MLCC business line), the underlying chemistry is now industry-standard across every major vendor.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 6,043,974 A |
| Title | "Ceramic (multilayer) capacitor and ceramic composition for use in such capacitor" |
| Assignee | Philips Electronics N.V. → Phycomp Holding BV |
| Inventors | Zhien C. Chen, Wen-Hsi Lee, Tseung-Yuen Tseng |
| Filed | 1998-05-20 |
| Granted | 2000-03-28 |

## What it claims

A doped BaTiO₃ ceramic composition:

$$
(\text{Ba}_{1-a-b}\text{Ca}_a\text{Dy}_b)(\text{Ti}_{1-c-d-e-f}\text{Zr}_c\text{Mn}_d\text{Nb}_e)_f\text{O}_{3+\delta}
$$

with constrained ranges for each dopant. The key novel feature is the **Dy at the Ba site** (parameter `b`), described as "a small amount of Dy" that "significantly increases the resistance of the material against degradation of its electrical properties under DC field application at high temperatures."

## Why it matters

The patent identifies the failure mode now called **DC-bias-driven IR degradation** ([[nasa-ir-degradation-ni-batio3-2015|Liu NASA NEPP framework]] later quantified it in detail): under sustained DC voltage at elevated temperature, oxygen vacancies migrate, accumulate at the cathode interface, collapse the Schottky depletion layer, and short the capacitor. Mn is added as an acceptor to suppress V_O concentration, but Mn itself is amphoteric — under reducing atmospheres it picks up donor character.

Chen et al.'s insight: **Dy at the A-site fixes the Mn charge state by acting as a donor counter-balance**, stabilising the local defect chemistry. The composition operates in the [[dopant-site-occupancy-batio3|amphoteric window]] for rare-earth ionic radii — Dy (CN-12 ionic radius 103.7 pm) sits near the Y³⁺/Ho³⁺ crossover and behaves as a soft A-site donor.

This is the dopant strategy that became universal:
- **Mn at the B-site** as acceptor to suppress V_O
- **Dy at the A-site** to fix Mn's charge and improve DC-bias robustness
- **Ca + Sr at the A-site** for Ti reduction suppression (the [[us-4115493-murata-sakabe-1978-bme-foundational|Sakabe 1978]] base)

Most modern X7R BME formulations carry some variant of all three. The Samsung [[liu-2019-sm-mn-codoped-batio3-permittivity|Sm-Mn co-doping]] paper from 2019 shows the same Mn-charge-fixing principle with Sm instead of Dy.

## Connection to the modern wiki

- [[dopant-site-occupancy-batio3]] — the ionic-radius / site-occupancy framework Dy sits inside
- [[defect-chemistry-batio3]] — the V_O equilibria and donor/acceptor compensation
- [[oxygen-vacancy-migration]] — the DC-bias failure mechanism this composition addresses
- [[bme-reliability-model]] — Liu's framework that quantifies the reliability gain
- [[us-4115493-murata-sakabe-1978-bme-foundational]] — predecessor; this patent adds Dy to the Sakabe Ca-doped base
- [[core-shell-batio3]] — Dy is one of the rare earths that segregates to the shell in modern MLCC microstructure

## References

- Google Patents: [US 6,043,974 A](https://patents.google.com/patent/US6043974A/en)
- Hennings 1987 *Int. J. High Tech. Ceram.* — empirical RE doping survey that established the chemistry foundation
