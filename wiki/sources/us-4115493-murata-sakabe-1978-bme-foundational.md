---
title: "US 4,115,493 — Sakabe & Seno (Murata) — Non-Reducing Dielectric for Nickel-Electrode MLCC (1978)"
type: source
created: 2026-05-27
updated: 2026-05-27
sources: []
tags:
  - patent
status: complete
importance: high
---

# US 4,115,493 — Murata's foundational BME patent (Sakabe & Seno, 1978)

The patent that opened the door for **base-metal electrode (BME) MLCC**. Filed by Yukio Sakabe and Hiroshi Seno at Murata in August 1977 and granted September 1978; commercial mass production followed in 1982. The composition it claims is the technological ancestor of every Ni-electrode MLCC made in the past forty years.

**Status**: expired in 1997 (20-year US patent term from grant); no licensing restrictions apply.

## Bibliographic data

| Field | Value |
|---|---|
| Patent number | US 4,115,493 A |
| Title | "Method for making monolithic ceramic capacitor employing non-reducing dielectric ceramic composition" |
| Assignee | Murata Manufacturing Co., Ltd. |
| Inventors | **Yukio Sakabe**, Hiroshi Seno |
| Filed | 1977-08-19 |
| Granted | 1978-09-19 |
| Status | Expired 1997 |

## What it claims

A solid-solution dielectric ceramic with the formula:

$$
\{(\text{Ba}_{1-x}\text{Ca}_x)\text{O}\}_m \cdot (\text{Ti}_{1-y}\text{Zr}_y)\text{O}_2
$$

with compositional windows:

| Parameter | Range | Meaning |
|---|---|---|
| `m` | **1.005 – 1.03** | A/B ratio, slightly Ba-rich (excess A-site cation suppresses reduction-induced electronic conduction) |
| `x` | **0.02 – 0.22** | Ca substitution at Ba site (the key acceptor doping) |
| `y` | **0.00 – 0.20** | Zr substitution at Ti site (optional, fine-tunes T_C) |

Fired in **neutral or reducing atmospheres** (compatible with un-oxidising Ni, Fe, or Co electrodes), the composition maintains high insulation resistance and avoids the aging problems that earlier Mn-based "non-reducible" formulations had.

## Why it mattered

Before this patent, MLCC inner electrodes were Pd or Ag-Pd alloy. The noble metals **made up 20–50 % of the total chip cost** at the time. Replacing them with Ni dropped per-chip cost by 60–80 % at the dielectric/electrode level — the single biggest unit-cost reduction in MLCC history. Combined with the layer-thinning that became feasible once the electrode was no longer cost-rationed, this is what enabled the multi-decade growth of MLCC from a $1B niche to a $20B+ industry.

The IEEE recognised the commercialisation (1982) as a Milestone in Electrical Engineering and Computing in its History Wiki; Sakabe individually received the American Ceramic Society's Fulrath Award in 1986 for the body of work this patent anchored.

## How the chemistry beats the reduction problem

Standard BaTiO₃ fired in H₂ / N₂ reduces:
- Ti⁴⁺ → Ti³⁺ (electronic conduction → low IR, bad)
- O²⁻ vacancies form (V_O electronic donors, also bad)

Sakabe's two-pronged compensation:

1. **Ca²⁺ at the Ba²⁺ site** — slightly smaller ionic radius (Ca²⁺ 1.34 Å vs Ba²⁺ 1.61 Å, 12-coord). Locks the perovskite lattice against the Ti³⁺ Jahn-Teller distortion that would otherwise propagate electronic conduction.
2. **Ba-excess (m > 1)** — pushes equilibrium away from V_Ba formation, keeping the perovskite stoichiometric on the Ti site.

The Zr substitution (y) is an independent knob to shift T_C downward without changing the redox stability.

## Connection to the modern wiki

- The dopant philosophy in this 1978 filing is the **direct ancestor** of [[core-shell-batio3]] core-shell formulations and [[dopant-site-occupancy-batio3]] rare-earth amphoteric doping.
- [[bme-sintering-atmosphere]] discusses the reducing PO₂ window that this composition makes viable.
- [[bme-vs-pme]] explains the cost-driven shift this patent enabled.
- The 2010s sequel patents ([[us-9336947-samsung-low-temp-sintering-dielectric]], [[us-7172985-kemet-non-reducible-dielectric]]) refine the same core idea with low-T sintering aids and Ca-Sr zirconium titanate variants.

## References

- IEEE Engineering and Technology History Wiki: ["Commercialization of Multilayer Ceramic Capacitors with Nickel Electrodes, 1982"](https://ethw.org/Milestones:Commercialization_of_Multilayer_Ceramic_Capacitors_with_Nickel_Electrodes,_1982)
- Google Patents: [US 4,115,493 A](https://patents.google.com/patent/US4115493A/en)
- Buessem Award biography of Yukio Sakabe (NCSU Center for Dielectrics and Piezoelectrics)
- Niimi 2007 *J. Am. Ceram. Soc.*, "Influence of Ba/Ti Ratio on PTC Resistivity of Ca-Doped Semiconducting BaTiO₃" — academic follow-up exploring the same Ba/Ti excess regime
